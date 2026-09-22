import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container.jsx';

// Render a headline string: the setup before the em-dash sits a little smaller,
// and the emphasis phrase after the em-dash is bold. Headlines without an
// em-dash (or non-string headlines) render unchanged.
function renderHeadline(headline) {
  if (typeof headline !== 'string') return headline;
  const i = headline.indexOf('—');
  if (i === -1) return headline;
  const before = headline.slice(0, i + 1); // includes the em-dash
  const after = headline.slice(i + 1).replace(/^\s+/, '');
  if (!after) return headline;
  return (
    <>
      <span className="text-[0.84em] font-medium">{before}</span>{' '}
      <span className="font-extrabold">{after}</span>
    </>
  );
}

// Reusable horizontal auto-scroll hero slider — brief §1.1, §2.1, §X.1.
// Every product + industry microsite opens with this. Each slide is a
// precision-targeted message for a specific sub-segment; the slider is
// NOT a carousel of random brand statements.
//
// Props
//   slides[]         — { eyebrow?, headline, subhead, cta:{label,to}, secondaryCta?, bg, accent? }
//   intervalMs       — auto-advance interval (default 5000ms per brief)
//   variant          — 'dark' (default — navy bg w/ photo overlay) | 'light'
//   minHeight        — tailwind class for min height (default tall hero)
export default function HeroSlider({
  slides = [],
  intervalMs = 5000,
  variant = 'dark',
  minHeight = 'min-h-[320px] sm:min-h-[380px] md:min-h-[500px]',
  topPad = 'pt-32 md:pt-40',
  breadcrumb = null,
  // Optional node rendered where the CTAs would sit — for heroes whose call
  // to action is something other than a pair of links (e.g. the Insider
  // hero's subscribe form). Shown beneath the CTAs when a slide has both.
  footer = null,
}) {
  const [idx, setIdx] = useState(0);

  // Above-the-fold LCP guard: Framer Motion bakes `initial` into the prerendered
  // (vite-react-ssg) markup, so an `initial={{ opacity: 0 }}` would ship the hero
  // headline — the LCP element — invisible until JS hydrates and animates it in,
  // delaying LCP by the whole JS chain (and the translateY adds CLS). We only
  // arm the entrance animations after the first client paint: on SSR + first
  // render `mounted` is false → `initial={false}` → the text paints immediately
  // at its final position. Slide-to-slide transitions still animate (mounted is
  // true by then), so the carousel motion is unchanged.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  if (!slides.length) return null;
  const slide = slides[idx];
  const accent = slide.accent || '#E85A2A';

  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-navy-950';
  const subColor = isDark ? 'text-cream-100/85' : 'text-navy-700';
  const eyebrowColor = isDark ? 'text-white' : 'text-navy-600';

  return (
    <section
      className={`relative overflow-hidden ${
        isDark ? 'bg-navy-950' : 'bg-cream-100'
      } ${topPad} pb-10 md:pb-12`}
    >
      {/* Slide background image — crossfades. Slight blur keeps copy readable. */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence mode="sync">
          {slide.bg && (
            <motion.img
              key={`bg-${idx}`}
              src={slide.bg}
              alt=""
              aria-hidden
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.1, ease: 'easeInOut' },
                scale: { duration: intervalMs / 1000 + 1.2, ease: 'linear' },
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Overlay — deepened so the white headline stays legible even when the
          background photo has bright zones at the H1's vertical band. The
          middle stop (where the H1 sits) is the most important; raise it if
          you see headlines washing out on any new hero photo. */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-navy-950/92 via-navy-950/88 to-navy-950/95'
            : 'bg-gradient-to-b from-cream-100/95 via-cream-100/90 to-cream-100/98'
        }`}
      />
      {/* Extra contrast wash directly behind the headline band — sits between
          y≈30%–70% of the hero so it darkens only where the H1/subhead are.
          Keeps the photo visible at top/bottom edges. */}
      {isDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,21,53,0.55),transparent_65%)]"
        />
      )}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark ? 'grid-bg' : 'grid-bg-light'
        } opacity-40`}
      />

      {/* Accent glow tied to the active slide's accent color */}
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full blur-[140px] transition-colors duration-700"
        style={{ background: `${accent}26` }}
      />

      <Container className={`relative ${minHeight} flex items-center`}>
        <div className="mx-auto w-full max-w-3xl text-center">
          {/* Breadcrumb — centered, above the eyebrow */}
          {breadcrumb && (
            <nav className={`mb-6 text-[14px] ${isDark ? 'text-cream-100/60' : 'text-navy-700'}`}>
              {breadcrumb}
            </nav>
          )}
          {/* Eyebrow — segment tag */}
          <AnimatePresence mode="wait">
            {slide.eyebrow && (
              <motion.p
                key={`eb-${idx}`}
                initial={mounted ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className={`text-[11px] font-bold uppercase tracking-[0.22em] ${eyebrowColor}`}
                style={isDark ? { textShadow: '0 1px 10px rgba(15, 21, 53, 0.75)' } : undefined}
              >
                {slide.eyebrow}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h-${idx}`}
              initial={mounted ? { opacity: 0, y: 18 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`mt-5 h-display text-balance text-[2rem] leading-[1.05] tracking-tightest sm:text-[2.4rem] md:text-5xl lg:text-[3.2rem] ${textColor}`}
              style={isDark ? { textShadow: '0 2px 16px rgba(15, 21, 53, 0.55)' } : undefined}
            >
              {renderHeadline(slide.headline)}
            </motion.h1>
          </AnimatePresence>

          {/* Subhead */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`s-${idx}`}
              initial={mounted ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed md:text-lg ${subColor}`}
            >
              {slide.subhead}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          {(slide.cta || slide.secondaryCta) && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`c-${idx}`}
              initial={mounted ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3"
            >
              {slide.cta && (
                <Link to={slide.cta.to} className="btn-primary-glow !px-6 !py-3.5">
                  {slide.cta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
              {slide.secondaryCta && (
                <Link
                  to={slide.secondaryCta.to}
                  className={
                    isDark
                      ? 'btn-secondary-dark !px-6 !py-3.5'
                      : 'btn-secondary !px-6 !py-3.5'
                  }
                >
                  {slide.secondaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
          )}

          {/* Custom call to action — rendered in the CTAs' place when a hero
              needs something other than a pair of links. */}
          {footer && (
            <motion.div
              initial={mounted ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col items-center"
            >
              {footer}
            </motion.div>
          )}

          {/* Micro-trust line — optional, sits just beneath the CTAs. */}
          {slide.microTrust && (
            <AnimatePresence mode="wait">
              <motion.p
                key={`mt-${idx}`}
                initial={mounted ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className={`mt-5 text-xs font-semibold tracking-wide ${
                  isDark ? 'text-white' : 'text-navy-600'
                }`}
                style={isDark ? { textShadow: '0 1px 10px rgba(15, 21, 53, 0.75)' } : undefined}
              >
                {slide.microTrust}
              </motion.p>
            </AnimatePresence>
          )}

          {/* Dot indicators — mobile + touchable */}
          {slides.length > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Show slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx
                      ? 'w-7 bg-orange-500'
                      : isDark
                      ? 'w-1.5 bg-white/30 hover:bg-white/60'
                      : 'w-1.5 bg-navy-300 hover:bg-navy-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
