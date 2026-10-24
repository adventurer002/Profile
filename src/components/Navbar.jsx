import { memo, useEffect, useRef, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { sections } from '../navigation';
import BrandLogo from './BrandLogo';
import GooeyNav from './GooeyNav';

const navItems = sections.map(({ label, id }) => ({ label, href: `#${id}` }));

export function ResumeLink({ className = '' }) {
  return <a href="/jinlong-wang-resume.pdf" download="王金龙-AI应用开发工程师-简历.pdf" className={className}>下载简历 <Download size={18} strokeWidth={1.6} /></a>;
}

function Navbar({ activeIndex, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    if (!menuOpen) return;
    const close = event => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const desktop = matchMedia('(min-width: 1024px)');
    const resize = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener('keydown', close);
    desktop.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', close); desktop.removeEventListener('change', resize); };
  }, [menuOpen]);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    {menuOpen && <button className="menu-backdrop" aria-label="关闭导航菜单" onClick={() => setMenuOpen(false)} tabIndex={-1} />}
    <div className="shell">
      <div className="portrait-header">
        <BrandLogo onClick={() => setMenuOpen(false)} />
        <div className="desktop-gooey-nav hidden lg:block">
          <GooeyNav
            items={navItems}
            activeIndex={activeIndex}
            theme="light"
            color="#111111"
            activeTextColor="#ffffff"
            frame={false}
            particleCount={5}
            spread={16}
            animationTime={420}
            timeVariance={80}
            gooeyness={0.25}
            wobble={0.15}
            style={{ '--gn-muted': '#666666', '--gn-x': '18px', '--gn-y': '12px', '--gn-gap': '8px' }}
          />
        </div>
        <div className="flex items-center gap-3">
          <ResumeLink className="resume-top" />
          <button ref={menuButton} className="menu-toggle lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? '关闭导航' : '打开导航'}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav id="mobile-nav" aria-label="移动端导航" className="mobile-nav">{sections.map(({ label, id }, index) => <a key={id} href={`#${id}`} aria-current={index === activeIndex ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}<span aria-hidden="true">0{index + 1}</span></a>)}</nav>}
      </div>
    </div>
  </header>;
}

export default memo(Navbar);
