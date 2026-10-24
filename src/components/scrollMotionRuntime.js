// This module and GSAP are fetched only as a scroll heading approaches the viewport.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
let users = 0;
let observer;
let timer = 0;
let frame = 0;
let waitingForScroll = false;
const afterScroll = () => {
  waitingForScroll = false;
  ScrollTrigger.removeEventListener('scrollEnd', afterScroll);
  scheduleRefresh();
};
const refreshWhenResting = () => {
  if (!users) return;
  if (ScrollTrigger.isScrolling()) {
    if (!waitingForScroll) {
      waitingForScroll = true;
      ScrollTrigger.addEventListener('scrollEnd', afterScroll);
    }
    return;
  }
  // Safe refresh avoids cancelling a browser's native smooth anchor navigation.
  ScrollTrigger.refresh(true);
};
const scheduleRefresh = () => {
  clearTimeout(timer);
  cancelAnimationFrame(frame);
  timer = window.setTimeout(() => {
    frame = requestAnimationFrame(refreshWhenResting);
  }, 120);
};
const watchLayout = () => {
  if (users++ === 0) {
    observer = new ResizeObserver(scheduleRefresh);
    observer.observe(document.body);
  }
  return () => {
    if (--users === 0) {
      observer?.disconnect();
      observer = null;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      ScrollTrigger.removeEventListener('scrollEnd', afterScroll);
      waitingForScroll = false;
    }
  };
};

export function createScrollFloat(element, options) {
  const { scrollStart, scrollEnd, smoothing, distance, direction, stretch, animationDuration, stagger, ease } = options;
  const release = watchLayout();
  const media = gsap.matchMedia();
  let alive = true;
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const timeline = gsap.timeline({ scrollTrigger: {
      id: `scroll-float-${element.closest('section')?.id || 'heading'}`,
      trigger: element,
      start: `clamp(${scrollStart})`,
      end: `clamp(${scrollEnd})`,
      scrub: smoothing > 0 ? smoothing : true,
      invalidateOnRefresh: true,
      onUpdate: self => { element.dataset.floatProgress = self.progress.toFixed(3); },
    } });
    timeline.fromTo(element.querySelectorAll('[data-float-char]'), {
      opacity: 0, yPercent: distance * (direction === 'down' ? -1 : 1), scaleY: stretch,
      scaleX: stretch > 0 ? stretch ** -0.43 : 1, transformOrigin: direction === 'down' ? '50% 100%' : '50% 0%',
    }, { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, duration: animationDuration, stagger, ease });
  });
  document.fonts?.ready.then(() => { if (alive) scheduleRefresh(); });
  scheduleRefresh();
  return () => { alive = false; media.revert(); release(); };
}
