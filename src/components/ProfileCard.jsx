import { memo, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, UserRound } from 'lucide-react';
import './ProfileCard.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** Light variant adapted from the user-provided React Bits ProfileCard source. */
function ProfileCard({
  avatarUrl,
  avatarSrcSet,
  avatarSizes,
  avatarWidth,
  avatarHeight,
  name,
  title = 'AI 应用开发工程师',
  handle,
  githubUrl,
  contactHref = '#contact',
  contactText = '联系我',
  status = '欢迎交流',
  tiltStrength = 4,
  parallax = 3,
  glare = 0.15,
  intro = true,
}) {
  const rootRef = useRef(null);
  const introPlayed = useRef(false);
  const settingsRef = useRef({ tiltStrength, parallax, intro });
  settingsRef.current = { tiltStrength, parallax, intro };
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    const mobile = matchMedia('(max-width: 767px)');
    const x = { p: 0, v: 0, target: 0 };
    const y = { p: 0, v: 0, target: 0 };
    const light = { p: 0, target: 0 };
    let visible = false;
    let raf = 0;
    let last = 0;
    let slowUntil = 0;
    const enabled = () => !reduced.matches && finePointer.matches && !mobile.matches;

    const write = () => {
      const { tiltStrength: strength, parallax: depth } = settingsRef.current;
      const active = enabled();
      root.style.setProperty('--pc-light-x', `${((x.p + 1) * 50).toFixed(2)}%`);
      root.style.setProperty('--pc-light-y', `${((y.p + 1) * 50).toFixed(2)}%`);
      root.style.setProperty('--pc-rotate-x', `${(active ? y.p * strength : 0).toFixed(3)}deg`);
      root.style.setProperty('--pc-rotate-y', `${(active ? -x.p * strength : 0).toFixed(3)}deg`);
      root.style.setProperty('--pc-shift-x', `${(active ? x.p * depth : 0).toFixed(2)}px`);
      root.style.setProperty('--pc-shift-y', `${(active ? y.p * depth : 0).toFixed(2)}px`);
      root.style.setProperty('--pc-active', active ? light.p.toFixed(4) : '0');
      root.dataset.motion = active ? 'enabled' : 'static';
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      for (const axis of [x, y]) { axis.p = 0; axis.v = 0; axis.target = 0; }
      light.p = 0;
      light.target = 0;
      root.dataset.animating = 'false';
      write();
    };
    const frame = now => {
      if (!visible || !enabled() || document.hidden) { reset(); return; }
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      const stiffness = slow ? 24 : 120;
      const damping = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h = dt / steps;
      for (let step = 0; step < steps; step++) {
        for (const axis of [x, y]) {
          axis.v += (stiffness * (axis.target - axis.p) - damping * axis.v) * h;
          axis.p += axis.v * h;
        }
      }
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / (light.target > light.p ? 0.18 : slow ? 0.8 : 0.4)));
      write();
      const moving = [x, y].some(axis => Math.abs(axis.target - axis.p) > 0.0005 || Math.abs(axis.v) > 0.0005)
        || Math.abs(light.target - light.p) > 0.002;
      if (moving) raf = requestAnimationFrame(frame);
      else {
        x.p = x.target;
        y.p = y.target;
        light.p = light.target;
        write();
        root.dataset.animating = 'false';
        raf = 0;
      }
    };
    const wake = () => {
      if (raf || !visible || !enabled()) return;
      root.dataset.animating = 'true';
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const aim = (nx, ny, on = true) => {
      if (!enabled()) return;
      x.target = clamp(nx, -1, 1);
      y.target = clamp(ny, -1, 1);
      light.target = on ? 1 : 0;
      slowUntil = 0;
      wake();
    };
    const point = event => {
      if (event.pointerType !== 'mouse' || !enabled()) return;
      // Measure the untransformed root so the card's own tilt never feeds back into pointer coordinates.
      const rect = root.getBoundingClientRect();
      if (rect.width && rect.height) aim((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1);
    };
    const release = () => aim(0, 0, false);
    const focus = () => aim(0, 0, true);
    const blur = event => { if (!root.contains(event.relatedTarget)) release(); };
    const visibility = () => { if (document.hidden) reset(); };
    root.addEventListener('pointerenter', point);
    root.addEventListener('pointermove', point);
    root.addEventListener('pointerleave', release);
    root.addEventListener('pointercancel', release);
    root.addEventListener('focusin', focus);
    root.addEventListener('focusout', blur);
    document.addEventListener('visibilitychange', visibility);
    for (const media of [reduced, finePointer, mobile]) media.addEventListener('change', reset);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { reset(); return; }
      if (entry.intersectionRatio >= 0.3 && !introPlayed.current && enabled() && settingsRef.current.intro) {
        introPlayed.current = true;
        x.p = 0.45;
        y.p = -0.35;
        light.p = 0.8;
        slowUntil = performance.now() + 1100;
        write();
        wake();
      }
    }, { threshold: [0, 0.3] });
    intersection.observe(root);
    write();
    return () => {
      cancelAnimationFrame(raf);
      intersection.disconnect();
      root.removeEventListener('pointerenter', point);
      root.removeEventListener('pointermove', point);
      root.removeEventListener('pointerleave', release);
      root.removeEventListener('pointercancel', release);
      root.removeEventListener('focusin', focus);
      root.removeEventListener('focusout', blur);
      document.removeEventListener('visibilitychange', visibility);
      for (const media of [reduced, finePointer, mobile]) media.removeEventListener('change', reset);
    };
  }, []);

  return <article ref={rootRef} className="profile-card" aria-label={`${name}的个人名片`} style={{ '--pc-glare': clamp(glare, 0, 1) }}>
    <div className="profile-card-body">
      <div className="profile-card-photo">
        <span className="profile-card-index" aria-hidden="true">JINLONG WANG <span>PROFILE</span></span>
        {imageFailed
          ? <div className="profile-card-fallback"><UserRound size={64} strokeWidth={0.8} /><span>JINLONG WANG</span></div>
          : <img className="profile-card-avatar" src={avatarUrl} srcSet={avatarSrcSet} sizes={avatarSizes} width={avatarWidth} height={avatarHeight} decoding="async" alt={`${name}的个人形象插画`} loading="lazy" draggable={false} onError={() => setImageFailed(true)} />}
        <div className="profile-card-scrim" aria-hidden="true" />
        <div className="profile-card-identity"><h3>{name}</h3><p>{title}</p></div>
        <div className="profile-card-photo-rim" aria-hidden="true" />
      </div>
      <div className="profile-card-footer">
        <div className="profile-card-meta">
          <a href={githubUrl} target="_blank" rel="noreferrer" aria-label={`访问${name}的 GitHub`}>@{handle}<ArrowUpRight size={12} aria-hidden="true" /></a>
          <span className="profile-card-status"><i aria-hidden="true" />{status}</span>
        </div>
        <a className="profile-card-contact" href={contactHref}><Mail size={16} strokeWidth={1.6} aria-hidden="true" />{contactText}</a>
      </div>
      <div className="profile-card-glare" aria-hidden="true" />
      <div className="profile-card-rim" aria-hidden="true" />
    </div>
  </article>;
}

export default memo(ProfileCard);
