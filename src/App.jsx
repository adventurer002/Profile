import { MotionConfig } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import SectionRail from './components/SectionRail';
import usePagePosition from './hooks/usePagePosition';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Capabilities from './components/Capabilities';
import Footer from './components/Footer';
import SplashCursor from './components/SplashCursor';

const NotFound = lazy(() => import('./components/NotFound'));

function PageNavigation() {
  const { activeIndex, progress } = usePagePosition();
  return <><Navbar activeIndex={activeIndex} scrolled={progress > 0.1} /><SectionRail activeIndex={activeIndex} progress={progress} /></>;
}

function PortfolioPage() {
  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#about">跳至正文</a>
    <PageNavigation />
    <main>
      <Hero />
      <About />
      <Projects />
      <Capabilities />
    </main>
    <Footer />
    <SplashCursor />
  </MotionConfig>;
}

export default function App() {
  const isHome = ['/', '/index.html'].includes(window.location.pathname);
  if (isHome) return <PortfolioPage />;

  return <Suspense fallback={<main className="min-h-svh bg-white"><p className="sr-only" role="status">正在加载页面</p></main>}>
    <NotFound />
  </Suspense>;
}
