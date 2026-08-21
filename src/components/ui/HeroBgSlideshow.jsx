import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { srcSet } from '../../lib/img.js';

// HeroBgSlideshow — a self-contained crossfading background-image slideshow for
// hero sections, with the same gating the homepage hero uses: it only
// auto-advances while on screen and when the visitor hasn't asked for reduced
// motion. Drop it as the first child of a `relative` hero <section>; place a
// colour overlay (light or dark) above it so the foreground text stays legible.
//
//   <section className="relative overflow-hidden ...">
//     <HeroBgSlideshow images={[...]} />
//     <div className="absolute inset-0 bg-navy-950/80" />   // overlay
//     <Container className="relative"> ... </Container>
//   </section>
const SLIDE_MS = 5000;

export default function HeroBgSlideshow({ images = [], className = '' }) {
  const [idx, setIdx] = useState(0);
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!images.length) return undefined;
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches;
    if (prefersReduced) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setAnimate(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setAnimate(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [images.length]);

  useEffect(() => {
    if (!animate || !images.length) return undefined;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [animate, images.length]);

  if (!images.length) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={idx}
          src={images[idx]}
          srcSet={srcSet(images[idx])}
          sizes="100vw"
          alt=""
          decoding="async"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: SLIDE_MS / 1000 + 1.2, ease: 'linear' },
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
