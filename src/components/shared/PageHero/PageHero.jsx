import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container/Container.jsx';
import HeroRatingPills from '../HeroRatingPills/HeroRatingPills.jsx';
import { srcSet } from '../../../lib/img.js';

const SLIDE_MS = 5000;

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb = [],
  meta = null,
  // Sitewide credibility row — OFF by default. The rating pills now live in a
  // single place (the home-page hero) per the home-page design review, which
  // flagged the same rating block repeating across Why UpWon / Clients / About.
  // Pass `ratings` to re-enable on a specific inner page if ever needed.
  ratings = false,
  // Optional crossfading background-image slideshow (same behaviour as the
  // homepage hero). Pass an array of image URLs to turn the flat ambient
  // backdrop into a rotating photo backdrop under a warm cream overlay that
  // keeps the navy heading text readable. Omit it for the default ambient look.
  bgImages = [],
}) {
  const hasSlideshow = bgImages.length > 0;

  // Auto-advance the slideshow only while on screen + when the visitor hasn't
  // asked for reduced motion — same gating the homepage hero uses so we don't
  // burn rAF/repaint work off-screen or fight an accessibility preference.
  const [bgIdx, setBgIdx] = useState(0);
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!hasSlideshow) return undefined;
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches;
    if (prefersReduced) return undefined; // static first slide
    const el = sectionRef.current;
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
  }, [hasSlideshow]);

  useEffect(() => {
    if (!animate || !hasSlideshow) return undefined;
    const id = setInterval(() => {
      setBgIdx((i) => (i + 1) % bgImages.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [animate, hasSlideshow, bgImages.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream-200 pt-32 pb-10 md:pt-40 md:pb-12"
    >
      {/* Crossfading photo backdrop (only when bgImages provided). Sits under
          everything; a warm cream overlay below keeps the navy text crisp. */}
      {hasSlideshow && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={bgIdx}
              src={bgImages[bgIdx]}
              srcSet={srcSet(bgImages[bgIdx])}
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
      )}

      {/* Layered ambient backdrop — warms up what was previously a flat
          slate gradient. Order (back → front):
            1. Warm cream-to-orange-tinted base (becomes a translucent overlay
               over the photo when a slideshow is active).
            2. Two floating, blurred brand-tinted blobs.
            3. Soft radial glow centred behind the title.
            4. Faint dot lattice for texture (replaces the grid).
            5. Top sheen — a thin orange line that brackets the section. */}
      {hasSlideshow ? (
        // Dark navy scrim (inline rgba so it never depends on a Tailwind
        // opacity-modifier being generated) — keeps the photo clearly visible
        // while the white heading + body copy stay legible over any image.
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,21,53,0.55) 0%, rgba(15,21,53,0.62) 45%, rgba(15,21,53,0.78) 100%)',
          }}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-cream-100 via-orange-50/30 to-cream-200"
        />
      )}

      {/* Floating ambient blobs — kept low-opacity + heavy blur so the
          eye picks up warmth without registering them as shapes. */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 18, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-orange-300/30 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -16, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-32 -right-20 h-[460px] w-[460px] rounded-full bg-navy-300/25 blur-[130px]"
      />

      {/* Soft radial halo behind the title — adds a focal warm centre. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[35%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(232,90,42,0.10) 0%, rgba(232,90,42,0.05) 35%, transparent 65%)',
        }}
      />

      {/* Faint dot lattice for texture — gentler than the hard grid. */}
      <div
        aria-hidden
        className="absolute inset-0 mask-fade-b opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(30,36,97,0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Thin warm hairline at the very top of the section — same trick
          used on enterprise marketing pages to suggest a "stage" edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
      />

      <Container className="relative">
        {breadcrumb.length > 0 && (
          <nav className="mb-5 text-center text-[14px]">
            <ol
              className={`inline-flex items-center gap-1.5 ${
                hasSlideshow ? 'text-white/60' : 'text-navy-500'
              }`}
            >
              {breadcrumb.map((b, i) => (
                <li key={i} className="inline-flex items-center gap-1.5">
                  {b.to ? (
                    <Link to={b.to} className={hasSlideshow ? 'hover:text-white' : 'hover:text-navy-950'}>
                      {b.label}
                    </Link>
                  ) : (
                    <span className={hasSlideshow ? 'text-white' : 'text-navy-950'}>{b.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <ArrowRight className={`h-3 w-3 ${hasSlideshow ? 'text-white/40' : 'text-navy-400'}`} />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={`mx-auto mt-4 h-display text-balance text-[2rem] leading-[1.08] md:text-[2.8rem] lg:text-5xl ${
              hasSlideshow ? 'text-white' : 'text-navy-950'
            }`}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`mx-auto mt-3 max-w-2xl text-balance text-base leading-relaxed md:text-lg ${
                hasSlideshow ? 'text-white/85' : 'text-navy-700'
              }`}
            >
              {description}
            </motion.p>
          )}

          {ratings && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6"
            >
              <HeroRatingPills />
            </motion.div>
          )}

          {meta && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-navy-600"
            >
              {meta}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
