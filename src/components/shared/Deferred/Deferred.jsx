import { useEffect, useState } from 'react';

/**
 * Mounts its children off the critical path — after the browser goes idle, or
 * as soon as the visitor scrolls / interacts (whichever fires first). Used to
 * keep below-the-fold homepage sections out of the initial render + hydration
 * so LCP/TBT stay low; the idle callback always fires (with a setTimeout
 * fallback) so the content reliably mounts a beat after load even without any
 * interaction — which keeps it available to crawlers and to fast scrollers.
 */
export default function Deferred({ children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return undefined;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShow(true);
    };

    const ric =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb) => window.setTimeout(cb, 200);
    const handle = ric(reveal);

    const opts = { once: true, passive: true };
    window.addEventListener('scroll', reveal, opts);
    window.addEventListener('pointerdown', reveal, opts);
    window.addEventListener('keydown', reveal, opts);

    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('pointerdown', reveal);
      window.removeEventListener('keydown', reveal);
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(handle);
      }
    };
  }, [show]);

  return show ? children : null;
}
