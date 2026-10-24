import { useId } from 'react';

// Code-native concept diagrams; these are not product screenshots.
export default function ProjectVisual({ kind, className = '' }) {
  const gridId = useId().replace(/:/g, '');
  const frame = (x, y, w, h, label, dark = false) => <g key={label}>
    <rect x={x} y={y} width={w} height={h} rx="12" fill={dark ? '#17191b' : '#fff'} stroke={dark ? '#17191b' : '#dce0e3'} />
    <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fill={dark ? '#fff' : '#525963'} fontSize="14" fontWeight="500">{label}</text>
  </g>;

  return <svg viewBox="0 0 640 320" className={`project-visual ${className}`} role="img" aria-label={{ mcp: '共享服务架构概念示意：统一网关连接模型、知识库与记忆', voice: '语音客服检索链路概念示意：混合检索、重排与缓存', content: '内容工作流概念示意：节点编排、内容生成与状态持久化', clips: '视频切片链路概念示意：本地音频提取与内容高光解析' }[kind]}>
    <defs><pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="#dce1e5" /></pattern></defs>
    <rect width="640" height="320" fill="#f5f6f7" />
    <rect width="640" height="320" fill={`url(#${gridId})`} opacity=".65" />
    <g fontFamily="Inter, system-ui, sans-serif">
      {kind === 'mcp' && <>
        <g fill="none" stroke="#bfc6cd" strokeWidth="1.4"><path d="M193 105H264V155M447 105H376V155M193 235H264V165M447 235H376V165" /><path d="M320 68V129M320 191V270" strokeDasharray="4 5" /></g>
        {frame(66, 78, 128, 54, 'LLM Gateway')}{frame(446, 78, 128, 54, 'Tenant RAG')}
        {frame(66, 208, 128, 54, 'Session Memory')}{frame(446, 208, 128, 54, 'User Memory')}
        <rect x="244" y="122" width="152" height="76" rx="20" fill="#fff" stroke="#dce0e3" />
        {frame(252, 130, 136, 60, 'MCP', true)}
        <circle cx="320" cy="62" r="5" fill="#a6adb5" /><circle cx="320" cy="276" r="5" fill="#a6adb5" />
      </>}
      {kind === 'voice' && <>
        <rect x="52" y="62" width="536" height="196" rx="18" fill="#fff" stroke="#dce0e3" />
        <text x="78" y="92" fill="#8a929a" fontSize="11" letterSpacing="2">REAL-TIME RESPONSE</text>
        <g stroke="#20252a" strokeWidth="3" strokeLinecap="round">{Array.from({ length: 47 }, (_, i) => { const h = 5 + Math.abs(Math.sin(i * .91) * Math.cos(i * .27)) * 46; return <path key={i} d={`M${88 + i * 10} ${148 - h / 2}v${h}`} opacity={i > 33 ? .2 : .8} />; })}</g>
        <path d="M192 218H448" stroke="#cbd1d7" strokeWidth="1.5" />
        {frame(78, 196, 130, 42, 'HNSW Search')}{frame(254, 196, 130, 42, 'Rerank')}{frame(430, 196, 130, 42, 'Prefix Cache', true)}
      </>}
      {kind === 'content' && <>
        <path d="M94 149H545" stroke="#c6cdd3" strokeWidth="1.5" />
        {[['输入', 62], ['编排', 204], ['生成', 346], ['输出', 488]].map(([label, x], i) => <g key={label}>
          <text x={x + 45} y="104" textAnchor="middle" fill="#929aa3" fontSize="11">0{i + 1}</text>
          {frame(x, 122, 90, 54, label, i === 1)}
          <circle cx={x + 45} cy="215" r="4" fill="#a6adb5" />
          <path d={`M${x + 45} 176V211`} stroke="#c6cdd3" strokeDasharray="3 4" />
        </g>)}
        <path d="M107 215H533" stroke="#c6cdd3" strokeDasharray="3 4" />
        <rect x="221" y="235" width="198" height="32" rx="16" fill="#e9ecef" /><text x="320" y="256" textAnchor="middle" fill="#69737d" fontSize="11">PostgreSQL · Checkpointer</text>
      </>}
      {kind === 'clips' && <>
        <rect x="54" y="64" width="532" height="192" rx="18" fill="#fff" stroke="#dce0e3" />
        <text x="80" y="96" fill="#8a929a" fontSize="11" letterSpacing="2">LONG VIDEO → HIGHLIGHTS</text>
        <rect x="78" y="118" width="484" height="65" rx="8" fill="#f1f3f5" />
        <g stroke="#bcc4cc" strokeWidth="2" strokeLinecap="round">{Array.from({ length: 83 }, (_, i) => { const h = 5 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * .13)) * 40; return <path key={i} d={`M${86 + i * 5.7} ${150 - h / 2}v${h}`} />; })}</g>
        {[110, 279, 453].map((x, i) => <g key={x}><rect x={x} y="113" width="63" height="75" rx="8" fill="#16191c" fillOpacity={i === 1 ? '.94' : '.07'} stroke={i === 1 ? '#16191c' : '#aeb7c0'} /><path d={`M${x + 31} 188V213`} stroke="#c3cbd3" strokeDasharray="3 3" /></g>)}
        <text x="80" y="234" fill="#6c7680" fontSize="12">FFmpeg.wasm</text><text x="560" y="234" textAnchor="end" fill="#6c7680" fontSize="12">FastAPI / DeepSeek</text>
      </>}
    </g>
  </svg>;
}
