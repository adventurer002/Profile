import { useEffect, useState } from 'react';

/** Start decorative GPU work only after page resources load and the browser is idle. */
export default function useIdleAfterLoad(query) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    let idle = 0;
    let timer = 0;
    let disposed = false;
    const cancel = () => {
      if (idle) window.cancelIdleCallback?.(idle);
      clearTimeout(timer);
      idle = 0;
      timer = 0;
      window.removeEventListener('load', schedule);
    };
    const schedule = () => {
      if (disposed || !media.matches || idle || timer) return;
      const finish = () => { idle = 0; timer = 0; if (!disposed && media.matches) setReady(true); };
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(finish, { timeout: 2000 });
      else timer = window.setTimeout(finish, 300);
    };
    const update = () => {
      cancel();
      if (!media.matches) { setReady(false); return; }
      if (document.readyState === 'complete') schedule();
      else window.addEventListener('load', schedule, { once: true });
    };
    media.addEventListener('change', update);
    update();
    return () => { disposed = true; cancel(); media.removeEventListener('change', update); };
  }, [query]);
  return ready;
}
