import { useEffect, useState } from 'react';
import { sections } from '../navigation';

export default function usePagePosition() {
  const [position, setPosition] = useState({ activeIndex: 0, progress: 0 });
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 240);
      let activeIndex = 0;
      sections.forEach(({ id }, index) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top + window.scrollY <= marker) activeIndex = index;
      });
      if (maxScroll > 0 && window.scrollY >= maxScroll - 2) activeIndex = sections.length - 1;
      const progress = maxScroll > 0 ? Math.min(100, Math.max(0, window.scrollY / maxScroll * 100)) : 0;
      setPosition(previous => previous.activeIndex === activeIndex && Math.abs(previous.progress - progress) < 0.05 ? previous : { activeIndex, progress });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return position;
}
