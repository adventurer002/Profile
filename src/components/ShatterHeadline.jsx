import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { createShards } from './shatterGeometry';
import './ShatterHeadline.css';

const SHARDS = createShards();
const REST = { x: 0, y: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, opacity: 1 };
const EASE = [0.22, 1, 0.36, 1];

function HeadlineCopy({ lines }) {
  return lines.map((line, index) => <span key={`${index}-${line}`} className={`shatter-line ${index ? 'shatter-line-secondary' : ''}`}>{line}</span>);
}

function Shard({ shard, lines, controls, pointerX, pointerY, size }) {
  const transform = useTransform([pointerX, pointerY], ([px, py]) => {
    const dx = shard.cx / 100 * size.width - px;
    const dy = shard.cy / 100 * size.height - py;
    const distance = Math.hypot(dx, dy);
    const radius = Math.min(140, Math.max(65, size.width * 0.13));
    const strength = Math.pow(Math.max(0, 1 - distance / radius), 1.5);
    const displacement = strength * 7;
    const length = distance || 1;
    return `translate3d(${dx / length * displacement}px, ${dy / length * displacement}px, 0) rotate(${shard.spin * strength * 1.5}deg)`;
  });
  return <motion.span className="shatter-flight" custom={shard} initial={{ opacity: 0 }} animate={controls}
    style={{ transformOrigin: `${shard.cx}% ${shard.cy}%` }}>
    <motion.span className="shatter-surface" style={{ clipPath: shard.clipPath, transform, transformOrigin: `${shard.cx}% ${shard.cy}%` }}>
      <span className="contact-title shatter-copy"><HeadlineCopy lines={lines} /></span>
    </motion.span>
  </motion.span>;
}

/** Original project component. CSS clip-path provides the fragments; Motion animates them. */
export default function ShatterHeadline({ text = "Let's build\nAI applications." }) {
  const lines = text.split('\n');
  const root = useRef(null);
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const inView = useInView(root, { once: true, amount: 0.6 });
  const [phase, setPhase] = useState('waiting');
  const [size, setSize] = useState({ width: 1, height: 1 });
  const phaseRef = useRef('waiting');
  const run = useRef(0);
  const pointerX = useMotionValue(-10000);
  const pointerY = useMotionValue(-10000);
  const smoothX = useSpring(pointerX, { stiffness: 280, damping: 30 });
  const smoothY = useSpring(pointerY, { stiffness: 280, damping: 30 });

  const changePhase = useCallback(next => { phaseRef.current = next; setPhase(next); }, []);
  const clearPointer = useCallback(() => {
    pointerX.jump(-10000);
    pointerY.jump(-10000);
    smoothX.jump(-10000);
    smoothY.jump(-10000);
  }, [pointerX, pointerY, smoothX, smoothY]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize(previous => previous.width === width && previous.height === height ? previous : { width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const token = ++run.current;
    if (reduced) { changePhase('idle'); return; }
    if (!inView) return;
    changePhase('assembling');
    controls.set(shard => ({
      x: (shard.cx - 50) * 1.2 * shard.spread,
      y: (shard.cy - 50) * 0.9 - 18,
      rotate: shard.spin * 18,
      rotateX: shard.spin * 45,
      rotateY: shard.spin * 30,
      scale: 0.94,
      opacity: 0,
    }));
    controls.start(shard => ({ ...REST, transition: { duration: 1.05, delay: 0.1 + shard.delay + Math.abs(shard.cx - 50) * 0.003, ease: EASE } }))
      .then(() => { if (run.current === token) changePhase('idle'); });
    return () => { run.current++; controls.stop(); };
  }, [inView, reduced, controls, changePhase]);

  const move = event => {
    if (reduced || event.pointerType === 'touch' || !['idle', 'hover'].includes(phaseRef.current)) return;
    const rect = root.current.getBoundingClientRect();
    if (phaseRef.current === 'idle') changePhase('hover');
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };
  const leave = () => {
    clearPointer();
    if (phaseRef.current === 'hover') changePhase('idle');
  };
  const shatter = async event => {
    if (reduced || !['idle', 'hover'].includes(phaseRef.current)) return;
    const rect = root.current.getBoundingClientRect();
    const origin = event.detail === 0
      ? { x: rect.width / 2, y: rect.height / 2 }
      : { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const token = ++run.current;
    clearPointer();
    changePhase('shattering');
    await controls.start(shard => {
      const dx = shard.cx / 100 * rect.width - origin.x;
      const dy = shard.cy / 100 * rect.height - origin.y;
      const distance = Math.hypot(dx, dy) || 1;
      const impact = Math.max(0.22, 1 - distance / (rect.width * 0.8));
      const burst = Math.min(210, rect.width * 0.25) * impact * shard.spread;
      return {
        x: dx / distance * burst,
        y: dy / distance * burst + 18 * shard.spin,
        rotate: shard.spin * 45 * impact,
        rotateX: shard.spin * 90 * impact,
        rotateY: -shard.spin * 65 * impact,
        scale: 0.88 + impact * 0.08,
        opacity: 0.24 + (1 - impact) * 0.45,
        transition: { duration: 0.48, delay: shard.delay * 0.6, ease: [0.16, 1, 0.3, 1] },
      };
    });
    if (run.current !== token) return;
    changePhase('restoring');
    await controls.start(shard => ({ ...REST, transition: { duration: 0.95, delay: 0.32 + shard.delay, ease: EASE } }));
    if (run.current === token) changePhase('idle');
  };

  const staticText = reduced || phase === 'idle';
  return <div className="shatter-headline-group">
    <div ref={root} className="shatter-headline" data-phase={reduced ? 'static' : phase} onPointerMove={move} onPointerLeave={leave} onPointerCancel={leave}>
      <h2 className="contact-title shatter-base" style={{ opacity: staticText ? 1 : 0 }}><HeadlineCopy lines={lines} /></h2>
      {!reduced && <>
        <div className="shatter-fragments" aria-hidden="true" style={{ visibility: staticText || phase === 'waiting' ? 'hidden' : 'visible' }}>
          {SHARDS.map(shard => <Shard key={shard.id} shard={shard} lines={lines} controls={controls} pointerX={smoothX} pointerY={smoothY} size={size} />)}
        </div>
        <button className="shatter-trigger" onClick={shatter} aria-label="打碎并重组标题" aria-describedby="shatter-hint" aria-disabled={!['idle', 'hover'].includes(phase)} />
      </>}
    </div>
    {!reduced && <p id="shatter-hint" className="shatter-hint"><span className="shatter-hint-dot" aria-hidden="true" /><span className="shatter-hint-desktop">悬停浮现裂纹 · </span>点击打碎，片刻重组</p>}
  </div>;
}
