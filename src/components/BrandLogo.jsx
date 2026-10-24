export default function BrandLogo({ href = '#home', onClick }) {
  return <a href={href} className="brand-logo" aria-label="WJL · 王金龙 首页" onClick={onClick}>WJL</a>;
}
