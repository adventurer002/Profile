import { ArrowRight, ArrowUpRight, Github, Mail, Link, Mouse, Code2, Box, Lightbulb, Rocket } from 'lucide-react';
import { ResumeLink } from './Navbar';
import Reveal from './Reveal';
import ShinyText from './ShinyText';
import SpecularButton from './SpecularButton';
import { profile } from '../data';

const headlineShine = {
  color: '#111111',
  shineColor: '#64748B',
  speed: 2.6,
  delay: 5,
  shineWidth: 20,
  softness: 0.95,
  trigger: 'loop',
  direction: 'right',
  glow: 0,
};

const features = [
  { href: '#projects', Icon: Code2, title: 'AI 应用开发', lines: ['基于大模型的 AI 应用', '开发与落地实践'] },
  { href: '#project-clips', Icon: Box, title: '全栈开发能力', lines: ['熟悉前后端技术栈', '具备完整项目开发能力'] },
  { href: '#about', Icon: Lightbulb, title: '产品思维', lines: ['关注真实用户需求', '注重体验与可用性'] },
  { href: '#capabilities', Icon: Rocket, title: '持续学习', lines: ['保持对前沿技术的热情', '持续探索与实践'] },
];
export default function Hero() {
  return <section id="home" className="portrait-hero">
    <div className="shell hero-shell">
      <div className="portrait-stage">
        <div className="portrait-signature" aria-hidden="true">Wang<br /><span>Jinlong</span></div>
        <img className="hero-person" src="/images/portrait-cutout-800.webp" srcSet="/images/portrait-cutout-480.webp 480w, /images/portrait-cutout-800.webp 800w, /images/portrait-cutout-1085.webp 1085w" sizes="(max-width: 767px) 90vw, (min-width: 1700px) 800px, 53vw" width="1085" height="1450" decoding="async" alt="王金龙的立体卡通形象，身穿黑色上衣，抬头望向左上方" fetchPriority="high" />
        <Reveal className="portrait-copy">
          <p className="hello-label">HELLO, I'M</p>
          <h1><ShinyText text="王金龙" {...headlineShine} /></h1>
          <h2><ShinyText text="AI 应用开发工程师" {...headlineShine} /></h2>
          <p className="portrait-description">用技术解决真实问题，<br />让 AI 更好地服务每一个普通人。</p>
          <div className="hero-actions">
            <SpecularButton
              className="project-cta"
              href="#projects"
              radius={15}
              tint="#111111"
              tintOpacity={1}
              textColor="#F5F5F5"
              lineColor="#E2E8F0"
              baseColor="#3F3F46"
              intensity={1.25}
              idleIntensity={0.2}
              shineSize={18}
              shineFade={42}
              thickness={1.6}
              glow={0.65}
              proximity={180}
              followMouse
              autoAnimate={false}
            >查看我的项目 <ArrowRight size={21} strokeWidth={1.5} aria-hidden="true" /></SpecularButton>
            <ResumeLink className="resume-secondary" />
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="访问 GitHub"><Github size={21} /></a>
            <a href={`mailto:${profile.email}`} aria-label="发送邮件"><Mail size={22} /></a>
            <a href={profile.blog} target="_blank" rel="noreferrer" aria-label="访问个人博客"><Link size={21} /></a>
          </div>
        </Reveal>
        <a className="portrait-scroll" href="#about"><Mouse size={23} strokeWidth={1.15} /><span>向下探索</span></a>
        <span className="hero-bottom-note">BUILDING<br />WITH<br />INTELLIGENCE</span>
      </div>
      <Reveal className="hero-feature-bar" delay={0.15}>
        {features.map(({ Icon, title, lines, href }) => <a href={href} className="hero-feature" key={title}><div className="hero-feature-icon"><Icon size={33} strokeWidth={1.5} /></div><div><h3>{title}<ArrowUpRight className="feature-arrow" size={14} aria-hidden="true" /></h3><p>{lines[0]}<br />{lines[1]}</p></div></a>)}
      </Reveal>
    </div>
  </section>;
}
