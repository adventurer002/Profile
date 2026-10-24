import { ArrowUpRight } from 'lucide-react';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { projects, profile } from '../data';
import Reveal from './Reveal';
import ScrollFloat from './ScrollFloat';
import ProjectVisual from './ProjectVisual';
import useNearViewport from '../hooks/useNearViewport';
import LazyContentBoundary from './LazyContentBoundary';

const loadProjectDialog = () => import('./ProjectDialog');
const ProjectDialog = lazy(loadProjectDialog);
import './Projects.css';

function ProjectCard({ project, index, onOpen }) {
  const reduced = useReducedMotion();
  return <motion.article id={`project-${project.id}`} className="project-entry"
    initial={reduced ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.58, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}>
    <div className="project-card">
      <button type="button" className="project-card-hitarea" aria-label={`查看${project.name}项目详情`} aria-haspopup="dialog" onPointerEnter={() => { loadProjectDialog().catch(() => {}); }} onFocus={() => { loadProjectDialog().catch(() => {}); }} onClick={() => onOpen(index)} />
      <div className="project-card-cover">
        <div className="project-cover-caption"><span>0{index + 1} / {project.category}</span><span>概念示意</span></div>
        <ProjectVisual kind={project.id} />
      </div>
      <div className="project-card-body">
        <h3>{project.name}</h3>
        <p className="project-card-summary">{project.summary}</p>
        <div className="project-card-bottom">
          <div className="project-card-result"><strong>{project.highlight.value}</strong><span>{project.highlight.label}</span></div>
          <span className="project-card-action" aria-hidden="true"><span>查看项目</span><span className="project-card-arrow"><ArrowUpRight size={20} strokeWidth={1.4} /></span></span>
        </div>
      </div>
    </div>
  </motion.article>;
}

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const closeDialog = useCallback(() => setSelectedIndex(null), []);
  const [sectionRef, near] = useNearViewport('400px');
  useEffect(() => { if (near) loadProjectDialog().catch(() => {}); }, [near]);
  return <section ref={sectionRef} id="projects" className="border-y border-neutral-200/70 bg-[#fafafa] section-space">
    <div className="shell">
      <div className="section-label"><span>03 / FEATURED PROJECTS</span><span>SELECTED WORK · 04</span></div>
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <ScrollFloat breakLines lines={[{ text: '复杂问题。' }, { text: '清晰解法。', className: 'text-neutral-400' }]} />
        <Reveal><p className="max-w-sm text-sm leading-7 text-neutral-500">从共享服务到实时对话，<br />构建可用、可扩展的 AI 应用。</p></Reveal>
      </div>
      <div className="grid gap-7 md:grid-cols-2 lg:gap-9">
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedIndex} />)}
      </div>
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-7 text-xs text-neutral-500"><span>将前沿技术，转化为可衡量的结果。</span><a className="social-link text-[#111]" href={profile.github} target="_blank" rel="noreferrer">探索 GitHub <ArrowUpRight size={16} /></a></div>
    </div>
    <LazyContentBoundary resetKey={selectedIndex} fallback={<div className="project-loading" role="alert">详情暂时无法加载，请刷新后重试。<button type="button" onClick={closeDialog}>关闭</button></div>}>
    <Suspense fallback={<div className="project-loading" role="status">正在加载项目详情…<button type="button" onClick={closeDialog}>取消</button></div>}>
    <AnimatePresence>
      {selectedIndex !== null && <ProjectDialog key={projects[selectedIndex].id} project={projects[selectedIndex]} index={selectedIndex} onClose={closeDialog} />}
    </AnimatePresence>
    </Suspense>
    </LazyContentBoundary>
  </section>;
}
