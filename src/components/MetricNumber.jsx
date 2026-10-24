import { memo, useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';

/** Final values live in the link label; only the decorative digits count. */
function MetricNumber({ from = 0, to, prefix = '', suffix = '%', delay = 0 }) {
  const root = useRef(null);
  const inView = useInView(root, { once: true, amount: 0.5 });
  const reduced = useReducedMotion() === true;
  const value = useMotionValue(reduced ? to : from);
  const rounded = useTransform(value, number => Math.round(number));
  const played = useRef(false);
  const digits = Math.max(String(from).length, String(to).length);

  useEffect(() => {
    if (reduced) {
      played.current = true;
      value.set(to);
      return;
    }
    if (!inView || played.current) return;
    played.current = true;
    const controls = animate(value, to, { duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduced, value, to, delay]);

  return <span ref={root} className="metric-number" aria-hidden="true">
    {prefix && <span className="metric-number-prefix">{prefix}</span>}
    <motion.span className="metric-number-digits" style={{ width: `${digits}ch` }}>{rounded}</motion.span>
    <span>{suffix}</span>
  </span>;
}

export default memo(MetricNumber);
