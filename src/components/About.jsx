import { ArrowUpRight, Github, Globe } from 'lucide-react';
import { profile } from '../data';
import Reveal from './Reveal';
import ScrollFloat from './ScrollFloat';
import ProfileCard from './ProfileCard';
import MetricNumber from './MetricNumber';

const metrics = [
  { value: '15s → 2s', from: 15, to: 2, prefix: '15s → ', suffix: 's', label: 'TTFT 延迟压缩', href: '#project-voice' },
  { value: '75%', from: 0, to: 75, suffix: '%', label: 'RAG 存储降低', href: '#project-voice' },
  { value: '99%', from: 0, to: 99, suffix: '%', label: '视频切片上传体积减免', href: '#project-clips' },
];

export default function About() {
  return <section id="about" className="shell section-space">
    <div className="section-label"><span>02 / ABOUT & EXPERIENCE</span><span>从模型能力，到业务价值。</span></div>
    <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
      <ProfileCard
        avatarUrl="/images/profile-portrait-relaxed-882.webp"
        avatarSrcSet="/images/profile-portrait-relaxed-480.webp 480w, /images/profile-portrait-relaxed-882.webp 882w"
        avatarSizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 600px, 38vw"
        avatarWidth={882}
        avatarHeight={930}
        name={profile.name}
        title="AI 应用开发工程师"
        handle="adventurer002"
        githubUrl={profile.github}
        contactHref="#contact"
      />
      <div>
        <p className="eyebrow mb-6 text-neutral-500">BACKEND MINDSET. END-TO-END OWNERSHIP.</p>
        <ScrollFloat breakLines lines={[{ text: "让智能，" }, { text: "真正落地。", className: "text-neutral-400" }]} />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-base leading-[2] text-neutral-600 md:text-lg">{profile.intro}</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <a className="social-link" href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> adventurer002 <ArrowUpRight size={14} /></a>
            <a className="social-link" href={profile.blog} target="_blank" rel="noreferrer"><Globe size={17} /> rffj.top <ArrowUpRight size={14} /></a>
          </div>
          <div className="metrics-grid mt-12 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-8">
            {metrics.map(({ value, label, href, ...counter }, index) => <a className="metric-link" href={href} key={label} aria-label={`${label} ${value}，查看相关项目`}>
              <strong className="block whitespace-nowrap text-[clamp(1.3rem,2.7vw,3rem)] font-medium tracking-[-0.06em]"><MetricNumber {...counter} delay={index * 0.08} /></strong>
              <span className="mt-3 block text-xs leading-relaxed text-neutral-500">{label}</span>
              <ArrowUpRight className="metric-arrow" size={14} aria-hidden="true" />
            </a>)}
          </div>
        </Reveal>
      </div>
    </div>
  </section>;
}
