import { ArrowDown, ArrowUp } from 'lucide-react';
import { sections } from '../navigation';

export default function SectionRail({ activeIndex, progress }) {
  const active = sections[activeIndex];
  const next = sections[(activeIndex + 1) % sections.length];
  const seek = event => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    // Pointer and keyboard seeking must follow the control directly, without smooth-scroll lag.
    window.scrollTo({ top: maxScroll * Number(event.target.value) / 100, behavior: 'instant' });
  };
  return <aside className="section-rail" aria-label="页面位置与快速导航">
    <a className="rail-count" href={`#${next.id}`} aria-label={`当前第 ${activeIndex + 1} 节，共 5 节；前往${next.label}`} title={`前往${next.label}`}><strong>0{activeIndex + 1}</strong><span>/ 05</span></a>
    <span className="rail-current">{active.shortLabel}</span>
    <input className="rail-range" type="range" min="0" max="100" step="0.1" value={progress} onChange={seek} aria-label="页面滚动进度" aria-orientation="vertical" aria-valuetext={`${active.label}，全页 ${Math.round(progress)}%`} title="拖动滚动页面，也可使用方向键" />
    <a className="rail-next" href={`#${next.id}`} aria-label={`前往${next.label}`} title={next.label}>{activeIndex === sections.length - 1 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}</a>
    <nav className="rail-jumps" aria-label="分区快捷导航">{sections.map(({ id, label }, index) => <a key={id} href={`#${id}`} aria-label={label} aria-current={index === activeIndex ? 'location' : undefined}><span className="rail-dot" /><span className="rail-tooltip">{label}</span></a>)}</nav>
  </aside>;
}
