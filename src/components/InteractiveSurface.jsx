/** Pointer light is decorative; real links and buttons keep keyboard semantics. */
export default function InteractiveSurface({ as: Tag = 'article', className = '', children, ...props }) {
  const track = event => {
    if (event.pointerType === 'touch' || !matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--surface-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--surface-y', `${event.clientY - rect.top}px`);
  };

  return <Tag {...props} className={`interactive-surface ${className}`} onPointerMove={track}>{children}</Tag>;
}
