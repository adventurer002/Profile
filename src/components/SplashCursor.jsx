import { lazy, memo, Suspense, useEffect, useState } from 'react';

const FluidCursor = lazy(() => import('./SplashCursorEngine'));
const PALETTE = ['#000000b0'];

/** Decorative enhancement: load GPU code only on eligible desktop devices. */
function SplashCursor() {
  const [enabled, setEnabled] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(desktop.matches && !reducedMotion.matches);

    update();
    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || activated) return;
    const activate = event => { if (event.pointerType !== 'touch') setActivated(true); };
    window.addEventListener('pointermove', activate, { passive: true });
    window.addEventListener('pointerdown', activate, { passive: true });
    return () => {
      window.removeEventListener('pointermove', activate);
      window.removeEventListener('pointerdown', activate);
    };
  }, [enabled, activated]);

  if (!enabled || !activated) return null;

  return <Suspense fallback={null}>
    <FluidCursor
      colors={PALETTE}          // 流体颜色调色板（hex 格式，多色会循环渐变；不支持 rgba()）
      rainbow={false}           // 是否启用彩虹色（true 时忽略 colors）
      theme="light"             // 主题：light 会反转颜色以适配浅色背景
      intensity={0.9}           // 墨水浓度/整体亮度
      size={0.65}                // 单个笔触的粗细
      force={0.55}               // 鼠标推动流体的力度
      swirl={3}                  // 漩涡强度（涡度）
      trail={0.6}                // 拖尾残留时长（越大留得越久）
      momentum={0.5}             // 流体惯性
      shading={0.30}             // 明暗立体感
      glow={0}                   // 辉光/bloom 强度
      quality="low"              // 渲染分辨率：low / medium / high（low 最省性能）
      intro={false}              // 是否播放入场动画
      clickSplash                // 点击时是否产生溅射效果
      zIndex={20}                // 层级
      style={{ opacity: 0.6 }}   // 整体透明度
    />
  </Suspense>;
}

export default memo(SplashCursor);
