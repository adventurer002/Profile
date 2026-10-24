import { Workflow, Database, BrainCircuit, Server, Network, Layers3, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { capabilities } from '../data';
import ScrollFloat from './ScrollFloat';
import InteractiveSurface from './InteractiveSurface';
import './Capabilities.css';

const icons = { workflow: Workflow, database: Database, brain: BrainCircuit, server: Server, network: Network, layers: Layers3 };

export default function Capabilities() {
  const trackRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    const media = window.matchMedia('(max-width: 767px)');
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!media.matches) { setActive(0); return; }
      const origin = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
      const cards = Array.from(track.children);
      let nearest = 0;
      cards.forEach((card, index) => {
        if (Math.abs(card.getBoundingClientRect().left - origin) < Math.abs(cards[nearest].getBoundingClientRect().left - origin)) nearest = index;
      });
      setActive(nearest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const update = () => { setMobile(media.matches); schedule(); };
    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    media.addEventListener('change', update);
    track.addEventListener('scroll', schedule, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener('change', update);
      track.removeEventListener('scroll', schedule);
    };
  }, []);

  const select = index => {
    const track = trackRef.current;
    const card = track.children[index];
    const left = track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left - parseFloat(getComputedStyle(track).paddingLeft);
    track.scrollTo({ left, behavior: reduced ? 'instant' : 'smooth' });
  };

  return <section id="capabilities" className="shell section-space">
    <div className="section-label"><span>04 / CAPABILITIES</span><span>DEPTH MEETS DELIVERY</span></div>
    <div className="capabilities-heading">
      <ScrollFloat lines={[{ text: '系统思考，' }, { text: '端到端构建。', className: 'text-neutral-400' }]} />
      <p>从模型、数据到应用与部署，<br />把技术连接成完整的交付能力。</p>
    </div>
    <nav className="capabilities-index" aria-label="技能分类定位">
      {capabilities.map((item, index) => <a key={item.id} href={`#skill-${item.id}`} aria-current={mobile && index === active ? 'true' : undefined}
        onClick={event => { if (mobile && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); select(index); } }}>
        <span aria-hidden="true">0{index + 1}</span>{item.label}
      </a>)}
    </nav>
    <div ref={trackRef} id="capabilities-track" className="capabilities-track" role="region" aria-label="六项技术能力" aria-roledescription={mobile ? '轮播' : undefined}
      tabIndex={mobile ? 0 : undefined}
      onKeyDown={event => {
        if (!mobile || event.target !== event.currentTarget) return;
        const destination = { ArrowLeft: Math.max(0, active - 1), ArrowRight: Math.min(capabilities.length - 1, active + 1), Home: 0, End: capabilities.length - 1 }[event.key];
        if (destination !== undefined) { event.preventDefault(); select(destination); }
      }}>
      {capabilities.map((item, index) => {
        const Icon = icons[item.icon];
        return <motion.div key={item.id} id={`skill-${item.id}`} className="capability-entry" tabIndex={-1}
          initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: mobile ? 0 : (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}>
          <InteractiveSurface className="capability-card" aria-labelledby={`skill-${item.id}-title`}>
            <div className="capability-card-top"><Icon className="capability-icon" size={25} strokeWidth={1.3} aria-hidden="true" /><span aria-hidden="true">0{index + 1} / 06</span></div>
            <h3 id={`skill-${item.id}-title`}>{item.title}</h3>
            <p className="capability-description">{item.desc}</p>
            <ul className="capability-tags" aria-label={`${item.title}技术栈`}>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            <a href={item.href} className="capability-link" aria-label={`${item.title}，${item.linkLabel}`}>{item.linkLabel}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </InteractiveSurface>
        </motion.div>;
      })}
    </div>
    {mobile && <div className="capabilities-controls">
      <p className="capabilities-status" aria-live="polite" aria-atomic="true"><span className="sr-only">当前技能：</span><strong>0{active + 1}</strong><span>/ 06</span><span className="capabilities-current">{capabilities[active].label}</span></p>
      <div className="flex gap-2">
        <button type="button" aria-label="上一项技能" aria-controls="capabilities-track" disabled={active === 0} onClick={() => select(active - 1)}><ArrowLeft size={17} strokeWidth={1.5} /></button>
        <button type="button" aria-label="下一项技能" aria-controls="capabilities-track" disabled={active === capabilities.length - 1} onClick={() => select(active + 1)}><ArrowRight size={17} strokeWidth={1.5} /></button>
      </div>
    </div>}
    <div className="capabilities-footnote"><span>六个技术方向，一条完整的交付链路。</span><span>MODEL → DATA → APPLICATION → DELIVERY</span></div>
  </section>;
}
