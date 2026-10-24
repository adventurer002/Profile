import { useLayoutEffect, useRef } from 'react';
import { motion, usePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { profile } from '../data';
import ProjectVisual from './ProjectVisual';

export default function ProjectDialog({ project, index, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const backdropPress = useRef(false);
  const [isPresent, safeToRemove] = usePresence();
  const reduced = useReducedMotion();
  const duration = reduced ? 0 : 0.28;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return <motion.dialog
    ref={dialogRef}
    id="project-dialog"
    className="project-dialog"
    aria-modal="true"
    aria-labelledby="project-dialog-title"
    initial={{ opacity: 0 }}
    animate={{ opacity: isPresent ? 1 : 0 }}
    transition={{ duration }}
    onAnimationComplete={() => { if (!isPresent) safeToRemove?.(); }}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(event.currentTarget.querySelectorAll('button:not([disabled]), a[href], [tabindex="0"]'))
        .filter(element => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === event.currentTarget)) {
        event.preventDefault();
        first?.focus();
      }
    }}
    onPointerDown={event => { backdropPress.current = event.target === event.currentTarget; }}
    onClick={event => { if (event.target === event.currentTarget && backdropPress.current) onClose(); }}
  >
    <motion.div className="project-dialog-panel"
      initial={reduced ? false : { y: 24, scale: 0.97 }}
      animate={{ y: isPresent ? 0 : 16, scale: isPresent ? 1 : 0.98 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}>
      <div className="project-dialog-bar">
        <span className="font-mono text-[10px] tracking-[.14em] text-neutral-500">PROJECT 0{index + 1} <span className="mx-3 text-neutral-300">/</span> {project.category}</span>
        <button ref={closeRef} type="button" className="project-dialog-close" aria-label="关闭项目详情" onClick={onClose}><X size={20} strokeWidth={1.5} /></button>
      </div>
      <div className="project-dialog-scroll" tabIndex={0} role="region" aria-label="项目详情内容">
        <header className="project-dialog-heading">
          <h2 id="project-dialog-title">{project.name}</h2>
          <p>{project.summary}</p>
        </header>
        <div className="project-dialog-columns">
          <div className="min-w-0">
            <section aria-labelledby="project-overview-title" className="project-dialog-section">
              <h3 id="project-overview-title">项目介绍</h3>
              <p>{project.context}</p>
            </section>
            <figure className="project-dialog-diagram">
              <ProjectVisual kind={project.id} />
              <figcaption>架构概念示意 · 非产品实际截图</figcaption>
            </figure>
            <section aria-labelledby="project-implementation-title" className="project-dialog-section">
              <h3 id="project-implementation-title">关键实现</h3>
              <ol className="project-implementation-list">
                {project.details.map((detail, i) => <li key={detail}>
                  <span className="project-step-index" aria-hidden="true">0{i + 1}</span>
                  <div><h4>{project.detailLabels[i]}</h4><p>{detail}</p></div>
                </li>)}
              </ol>
            </section>
          </div>
          <aside className="project-dialog-aside" aria-label="项目成果与技术栈">
            <div className="project-result-highlight"><span>核心成果 / 能力</span><strong>{project.highlight.value}</strong><p>{project.highlight.label}</p></div>
            <section className="project-dialog-section"><h3>项目成果</h3><ul className="project-outcome-list">{project.outcomes.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section className="project-dialog-section"><h3>技术栈</h3><ul className="project-tech-list">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></section>
            <a className="project-github-link" href={profile.github} target="_blank" rel="noreferrer">访问我的 GitHub <ArrowUpRight size={15} /></a>
          </aside>
        </div>
      </div>
    </motion.div>
  </motion.dialog>;
}
