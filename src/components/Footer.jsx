import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { profile } from '../data';
import Reveal from './Reveal';
import { lazy, Suspense } from 'react';
import useNearViewport from '../hooks/useNearViewport';
import './ShatterHeadline.css';
import LazyContentBoundary from './LazyContentBoundary';

const ShatterHeadline = lazy(() => import('./ShatterHeadline'));
function ContactHeadlinePlaceholder() {
  return <div className="shatter-headline-group">
    <h2 className="contact-title shatter-base"><span className="shatter-line">Let's build</span><span className="shatter-line shatter-line-secondary">AI applications.</span></h2>
    <p className="shatter-hint" aria-hidden="true"><span className="shatter-hint-dot" /><span className="shatter-hint-desktop">悬停浮现裂纹 · </span>点击打碎，片刻重组</p>
  </div>;
}

export default function Footer() {
  const [headlineRef, near] = useNearViewport('200px');
  return <footer id="contact" className="isolate flex min-h-screen flex-col overflow-hidden border-t border-neutral-200 bg-[#fafafa]">
    <div className="shell flex flex-1 flex-col">
      <div className="section-label pt-12"><span>05 / LET’S CONNECT</span><span>从一次对话开始。</span></div>
      <Reveal className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow mb-8 text-neutral-500">IDEAS INTO APPLICATIONS.</p>
        <div ref={headlineRef} className="w-full"><LazyContentBoundary fallback={<ContactHeadlinePlaceholder />}><Suspense fallback={<ContactHeadlinePlaceholder />}>
          {near ? <ShatterHeadline text={"Let's build\nAI applications."} /> : <ContactHeadlinePlaceholder />}
        </Suspense></LazyContentBoundary></div>
        <a href={`mailto:${profile.email}`} className="mt-12 inline-flex items-center gap-5 border-b border-neutral-300 pb-4 text-[clamp(1rem,2.4vw,2rem)] tracking-tight transition hover:border-black">{profile.email}<ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.25} /></a>
      </Reveal>
      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-neutral-200 py-8 text-xs text-neutral-500"><span>© 2026 Jinlong Wang. All rights reserved.</span><div className="flex items-center gap-6"><a className="nav-link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a className="nav-link" href={profile.blog} target="_blank" rel="noreferrer">Blog</a><a className="rounded-full border border-neutral-200 p-3 transition hover:bg-white" href="#home" aria-label="回到顶部"><ArrowUp size={16} /></a></div></div>
    </div>
  </footer>;
}
