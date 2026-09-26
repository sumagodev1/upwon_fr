import { useEffect, useMemo, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container/Container.jsx';
import HeroRatingPills from '../HeroRatingPills/HeroRatingPills.jsx';
import { srcSet } from '../../../lib/img.js';

const SLIDE_MS = 5000;

/*
 * Up to what width the phone crop is served — NOT the `md` breakpoint (767px) the
 * home hero and HeroSlider use for theirs.
 *
 * Those two bands carry a min-height, so they stay portrait right across that
 * range. This one has no min-height at all: its height is whatever the copy makes
 * it, so its SHAPE changes as the copy reflows. Measured on /partners: 375px →
 * 375x525 (0.71, portrait), 480 → 1.07, 540 → 1.20, 767 → 1.98 — by 767 the band
 * matches the wide crop's own 2:1 target almost exactly, and handing it a 3:4
 * portrait file there would show roughly a third of that file's height while the
 * correctly-shaped wide file was never downloaded (the browser resolves <source>
 * before any of our code runs, so no JS can undo it). The crossover between the
 * two crops is the geometric mean of their ratios — sqrt(0.75 * 2.0) = 1.22 —
 * which this band reaches at about 540px, so the crop stops just below that and
 * the wide file takes over. That still covers every phone held upright.
 *
 * Paired with the numbers in the server's partner-image-spec.ts and the admin
 * panel's lib/partnerImageSpec.ts; changing this means changing both.
 */
const MOBILE_SOURCE_MEDIA = '(max-width: 539px)';

/*
 * One entry of `bgImages`, in either form it may be written.
 *
 * A plain string is the form every caller on the site used before phone crops
 * existed and the form most of them still use: one file for every viewport.
 * An object — `{ src, mobileSrc }` — is a backdrop that also has a portrait crop
 * authored for narrow screens; `mobileSrc` is optional inside it, so a CMS-driven
 * caller can hand over whatever was published without branching on it first.
 *
 * Anything with no usable `src` is dropped rather than rendered as an <img> with
 * no source, which is how a hero whose backdrop was never uploaded (or was
 * deleted out from under the row) keeps its flat ambient background.
 */
function toSlide(entry) {
  if (typeof entry === 'string') return entry ? { src: entry, mobileSrc: null } : null;
  if (!entry || typeof entry !== 'object' || !entry.src) return null;
  return { src: entry.src, mobileSrc: entry.mobileSrc || null };
}

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
  //
  // An entry may also be an object — `{ src, mobileSrc }` — when a portrait crop
  // has been authored for phones; that entry then renders as a <picture> whose
  // narrow-viewport <source> is the crop. `mobileSrc` is optional, and an entry
  // without one behaves exactly as a plain string always has. See `toSlide`.
  bgImages = [],
}) {
  // Normalised once per render so the rest of the component only ever sees
  // `{ src, mobileSrc }`, and so a caller passing plain strings (which is most of
  // them) keeps rendering the very same single <img> it always did.
  const slides = useMemo(() => bgImages.map(toSlide).filter(Boolean), [bgImages]);
  const hasSlideshow = slides.length > 0;

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
      setBgIdx((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [animate, hasSlideshow, slides.length]);

  // Guarded against a slide set that shrinks after mount — a CMS-driven hero
  // swapping in its published backdrop — so the render stays safe in the frame
  // before the interval above wraps the index.
  const slide = hasSlideshow ? slides[bgIdx] ?? slides[0] : null;

  // Shared by both renderings below, so a backdrop with a phone crop crossfades
  // and zooms exactly like one without.
  const bgMotion = {
    initial: { opacity: 0, scale: 1.06 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0 },
    transition: {
      opacity: { duration: 1.2, ease: 'easeInOut' },
      scale: { duration: SLIDE_MS / 1000 + 1.2, ease: 'linear' },
    },
  };

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
            {slide.mobileSrc ? (
              /*
                Opt-in phone crop. <picture> rather than a JS breakpoint, as in
                the home hero and HeroSlider: the browser picks the source before
                any of our code runs, so a phone never downloads the wide desktop
                file, and it works the same in the prerendered HTML. The motion
                wrapper takes the animation because <picture> itself is inline.

                The wide file is a narrow centre sliver of itself on a phone
                (object-cover fills from the centre), which is why authoring a
                portrait crop is worth its own field — and why the crop is served
                only where this band is actually portrait. See
                MOBILE_SOURCE_MEDIA.
              */
              <motion.div key={bgIdx} {...bgMotion} className="absolute inset-0">
                <picture className="block h-full w-full">
                  {/* `srcSet()` only answers for Unsplash URLs; an uploaded crop
                      falls back to its single file, which is the whole source. */}
                  <source
                    media={MOBILE_SOURCE_MEDIA}
                    srcSet={srcSet(slide.mobileSrc) ?? slide.mobileSrc}
                    sizes="100vw"
                  />
                  <img
                    src={slide.src}
                    srcSet={srcSet(slide.src)}
                    sizes="100vw"
                    alt=""
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </motion.div>
            ) : (
              <motion.img
                key={bgIdx}
                src={slide.src}
                srcSet={srcSet(slide.src)}
                sizes="100vw"
                alt=""
                decoding="async"
                {...bgMotion}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
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
