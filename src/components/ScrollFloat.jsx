import { useLayoutEffect, useMemo, useRef } from 'react';
import './ScrollFloat.css';

const punctuation = /^[，。！？、：；…）》」』】]/u;
const graphemes = text => typeof Intl.Segmenter === 'function'
  ? Array.from(new Intl.Segmenter('zh', { granularity: 'grapheme' }).segment(text), item => item.segment)
  : Array.from(text);

function Characters({ text }) {
  // Allow Chinese text to wrap, while keeping closing punctuation with the preceding character.
  const groups = [];
  graphemes(text).forEach(char => {
    if (punctuation.test(char) && groups.length) groups[groups.length - 1].push(char);
    else groups.push([char]);
  });
  return groups.map((group, index) => <span className="scroll-float-unit" key={index}>
    {group.map((char, charIndex) => <span data-float-char className="scroll-float-char" key={charIndex}>{char === ' ' ? '\u00a0' : char}</span>)}
  </span>);
}

/** Float variant adapted from the user-provided React Bits ScrollFloat source. */
export default function ScrollFloat({
  lines,
  breakLines = false,
  containerClassName = '',
  direction = 'up',
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'top bottom-=5%',
  scrollEnd = 'bottom bottom-=35%',
  stagger = 0.02,
  distance = 35,
  stretch = 1.08,
  smoothing = 0.3,
}) {
  const heading = useRef(null);
  // Depend on line content, not an inline array's identity: page scroll updates must not recreate triggers.
  const signature = JSON.stringify(lines);
  const segments = useMemo(() => JSON.parse(signature), [signature]);
  const accessibleText = segments.map(line => line.text).join('');

  useLayoutEffect(() => {
    const element = heading.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let alive = true;
    let loading = false;
    let near = false;
    let cleanup;
    const initialize = async () => {
      if (!near || loading || cleanup || motion.matches) return;
      loading = true;
      try {
        const { createScrollFloat } = await import('./scrollMotionRuntime');
        if (alive && !motion.matches) {
          cleanup = createScrollFloat(element, { scrollStart, scrollEnd, smoothing, distance, direction, stretch, animationDuration, stagger, ease });
          observer?.disconnect();
        }
      } catch {
        // Network failure leaves the complete, readable heading in place.
      } finally { loading = false; }
    };
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { near = true; initialize(); }
    }, { rootMargin: '200px' }) : null;
    if (observer) observer.observe(element);
    else { near = true; initialize(); }
    motion.addEventListener('change', initialize);
    return () => { alive = false; observer?.disconnect(); motion.removeEventListener('change', initialize); cleanup?.(); };
  }, [signature, direction, animationDuration, ease, scrollStart, scrollEnd, stagger, distance, stretch, smoothing, breakLines]);

  return <h2 ref={heading} className={`scroll-float section-title ${containerClassName}`}>
    <span className="sr-only">{accessibleText}</span>
    <span aria-hidden="true" className="scroll-float-text">
      {segments.map((line, index) => <span key={index} className={`scroll-float-line ${breakLines ? 'scroll-float-block' : ''} ${line.className || ''}`}>
        <Characters text={line.text} />
      </span>)}
    </span>
  </h2>;
}
