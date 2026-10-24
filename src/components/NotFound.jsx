import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Home } from 'lucide-react';
import FuzzyText from './FuzzyText';
import BrandLogo from './BrandLogo';
import { profile } from '../data';

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '404 · 页面未找到 — 王金龙';
    return () => { document.title = previousTitle; };
  }, []);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.assign('/#home');
  };

  return <div className="flex min-h-svh flex-col bg-white text-[#111111]">
    <a className="skip-link" href="#not-found">跳至正文</a>
    <header className="shell flex min-h-24 items-center justify-between gap-6 border-b border-neutral-100">
      <BrandLogo href="/#home" />
      <span className="eyebrow text-neutral-400">A SMALL DETOUR.</span>
    </header>

    <main id="not-found" className="shell flex flex-1 flex-col items-center justify-center py-14 text-center md:py-20">
      <p className="eyebrow mb-8 text-neutral-500">ERROR / PAGE NOT FOUND</p>
      <h1 className="sr-only">404 — 页面未找到</h1>
      <div aria-hidden="true" className="mb-9 flex w-full justify-center select-none" data-no-splash>
        <FuzzyText
          fontSize="clamp(5.5rem, 22vw, 20rem)"
          fontWeight={800}
          color="#111111"
          colorSplit={0}
          baseIntensity={0.08}
          hoverIntensity={0.4}
          fuzzRange={22}
          fps={30}
          transitionDuration={8}
          trigger="hover"
          intro
          introDuration={1100}
        >404</FuzzyText>
      </div>
      <h2 className="text-2xl font-medium tracking-tight md:text-4xl">这个页面走丢了。</h2>
      <p className="mt-4 max-w-sm text-sm leading-7 text-[#666666] md:text-base">你访问的页面不存在，<br className="sm:hidden" />或已被移至其他位置。</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <a href="/#home" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#111111] px-6 text-sm text-white transition-colors hover:bg-neutral-700">
          <Home size={16} strokeWidth={1.5} aria-hidden="true" />返回首页
        </a>
        <button type="button" onClick={goBack} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-neutral-200 px-6 text-sm transition-colors hover:bg-neutral-50">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />返回上一页
        </button>
      </div>
    </main>

    <footer className="shell flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 py-7 text-xs text-neutral-500">
      <p>© 2026 Jinlong Wang.</p>
      <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-[#111111]">GitHub<ArrowUpRight size={14} aria-hidden="true" /></a>
    </footer>
  </div>;
}
