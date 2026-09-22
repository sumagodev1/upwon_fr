import { lazy, Suspense, memo, useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, PlayCircle, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../../../components/shared/Container/Container.jsx';
import HeroRatingPills from '../../../../components/shared/HeroRatingPills/HeroRatingPills.jsx';
// import HeroProductShowcase from '../HeroProductShowcase/HeroProductShowcase.jsx';

// BrochureModal pulls the full module catalogue (modules.js, ~150 KB) and only
// opens on a CTA click, so it's code-split out of the homepage critical path
// and mounted on first open (then kept mounted so its open/close animation
// still plays).
const BrochureModal = lazy(() => import('../../../../components/shared/BrochureModal/BrochureModal.jsx'));

// Same lazy-on-first-open treatment as the brochure modal — the video player
// chunk only downloads when the visitor actually clicks "Watch 2-Min Product
// Video", then stays mounted so the open/close animation keeps playing.
const VideoModal = lazy(() => import('../../../../components/shared/VideoModal/VideoModal.jsx'));

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

// Orange headline accent.
function ScribbleAccent({ children }) {
  return <span className="gradient-text-orange">{children}</span>;
}

// 4 hero slides per brief §1.2 — one per primary ICP (Food Mfg / FMCG Dist /
// Franchise) plus a Universal closer that names the full platform suite for
// first-time visitors who don't yet self-identify into an ICP.
const HERO_SLIDES = [
  {
    eyebrow: 'Byte Elephant Presents',
    image:
      'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1280&q=45',
    headline: (
      <>
        UPWON - The Business Growth Suite for <br />
        Ambitious Food & FMCG Brands{' '}
        <ScribbleAccent>Ready to Scale</ScribbleAccent>.
      </>
    ),
    subhead:
      'Built for food manufacturers, FMCG distributors and franchise brands to run production, distribution, HR and finance in one integrated platform.',
  },
  {
    eyebrow: 'Built for Franchises',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1280&q=45',
    headline: (
      <>
        The 200th outlet should be as easy to  <br />
        run as the first.Now{' '}
        <ScribbleAccent>run the system</ScribbleAccent> that makes it so.
      </>
    ),
    subhead:
      'Open new outlets without operational challenges. One platform handles ordering, kitchens, billing, royalty and Swiggy / Zomato — across every store.',
  },
  {
    eyebrow: 'Scale Without Chaos',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1280&q=45',
    headline: (
      <>
        Your 200th outlet should feel like your first. <br />
        Now run the{' '}
        <ScribbleAccent>system that makes</ScribbleAccent> it so.
      </>
    ),
    subhead:
      'Open new outlets without opening new headaches. One platform handles ordering, kitchens, billing, royalty and Swiggy / Zomato — across every store.',
  },
  {
    // Universal closer — brief §1.1.4. For visitors who haven't yet picked an
    // ICP lane. Names every platform so the deck-of-cards Module Showcase
    // below feels like a natural continuation.
    eyebrow: 'One Suite · Seven Platforms',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1280&q=45',
    headline: (
      <>
        One suite. Seven platforms. <br />
        Your{' '}
        <ScribbleAccent>entire business</ScribbleAccent> — covered.
      </>
    ),
    subhead:
      'ERP · SFA-DMS · FMS · POS · HRMS · WMS · Vendor Portal — choose one platform or deploy the full suite. Same data layer, zero reconciliation.',
  },
  {
    // AI slide — the headline carries the animated text shine (see `shine`).
    eyebrow: 'AI-Powered From Day One',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1280&q=45',
    shine: true,
    headline: <>AI Built-In. Smarter From Day One.</>,
    subhead:
      'Every solution ships with AI at its core — automating workflows, surfacing insights and helping you make faster, smarter decisions from day one.',
  },
];
const SLIDE_MS = 5000;

// --- Static foreground blocks ---------------------------------------------
// These don't depend on the rotating slide/shot indices, so they're each their
// own memo() component with NO props — meaning React skips them entirely on the
// hero's every-5s background tick. Previously they were inline JSX that React
// re-rendered (and framer re-diffed) on every tick for no reason.

// Dual CTA + brochure modal trigger. Owns the brochure open/mounted state
// locally so toggling it only re-renders this little block, not the whole hero.
const HeroCtas = memo(function HeroCtas() {
  const [brochuresOpen, setBrochuresOpen] = useState(false);
  // Mount the lazy modal on first open and keep it mounted thereafter, so its
  // chunk only downloads when actually needed but the enter/exit animation
  // still runs on subsequent toggles.
  const [brochureMounted, setBrochureMounted] = useState(false);

  // Video modal — same open/mounted split as the brochure modal above.
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoMounted, setVideoMounted] = useState(false);

  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7, delay: 0.18 }}
      className="mt-9 flex flex-col items-center gap-3"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/demo" className="btn-primary-glow !px-6 !py-3.5">
          Book Free 30-Min Demo
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={() => {
            setVideoMounted(true);
            setVideoOpen(true);
          }}
          aria-haspopup="dialog"
          aria-expanded={videoOpen}
          className="btn-secondary group !px-6 !py-3.5"
        >
          {/* Play icon goes white on hover — btn-secondary's background turns
              orange on hover, so an orange icon would disappear. */}
          <PlayCircle className="h-4 w-4 text-orange-500 group-hover:text-white" />
          Watch 2-Min Product Video
        </button>
      </div>

      {/* Brochure picker — a full modal pop-up via BrochureModal. Lets the
          visitor pick one of the 7 product brochures + the full Suite overview,
          captures their email as a lead, then delivers the PDF in a new tab. */}
      {/* <button
        type="button"
        onClick={() => {
          setBrochureMounted(true);
          setBrochuresOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={brochuresOpen}
        className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-700 hover:text-navy-950"
      >
        <Download className="h-3.5 w-3.5 text-orange-500" />
        Download Product Brochure (PDF)
        <ArrowUpRight className="h-3 w-3 text-navy-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-500" />
      </button> */}
      {brochureMounted && (
        <Suspense fallback={null}>
          <BrochureModal open={brochuresOpen} onClose={() => setBrochuresOpen(false)} />
        </Suspense>
      )}
      {videoMounted && (
        <Suspense fallback={null}>
          <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
        </Suspense>
      )}
    </motion.div>
  );
});

// Trust row: rating pills + brand-initial avatars + "50+" link + the stat strip.
const HeroTrust = memo(function HeroTrust() {
  return (
    <>
      {/* Rating badges — shared `HeroRatingPills` so the same trust row
          also appears on every PageHero (inner-page hero) sitewide. */}
      {/* <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.22 }} className="mt-6">
        <HeroRatingPills />
      </motion.div> */}

      {/* Scale trust-by line — stacked brand-initial avatars anchor the
          "50+" number so the scale claim reads visually, not just textually. */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-7 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          to="/clients"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-navy-950"
        >
          Trusted by{' '}
          <span className="num-display text-base font-bold text-orange-600">50+</span>{' '}
          leading Food &amp; FMCG brands
        </Link>
      </motion.div>
    </>
  );
});

// Parent-brand attribution line below the hero.
const HeroParentBrand = memo(function HeroParentBrand() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-10 flex justify-center"
    >
      <span className="inline-flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 rounded-full border border-cream-300 bg-white/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy-700 shadow-sm backdrop-blur sm:gap-x-2 sm:gap-y-1 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]">
        <span className="text-navy-600">Powered by</span>
        <span className="font-bold text-navy-950">Byte Elephants Technologies</span>
        <span className="hidden text-navy-400 sm:inline">·</span>
        <span className="hidden font-semibold text-teal-700 sm:inline">Technology &amp; Beyond</span>
        <span className="hidden text-navy-400 sm:inline">·</span>
        <span className="hidden text-navy-700 sm:inline">Nashik, Maharashtra</span>
      </span>
    </motion.p>
  );
});

// Trust line shown below the hero CTAs (the logo marquee itself now lives in
// <TrustSection/> beneath the hero).
const HeroTrustMarquee = memo(function HeroTrustMarquee() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-10 w-full"
    >
      <p className="mx-auto max-w-2xl text-center text-sm font-semibold text-navy-700 md:text-base">
        The Enterprise Suite Trusted by{' '}
        <span className="text-orange-600">50+ Growing Food &amp; FMCG Brands</span> Across India.
      </p>
    </motion.div>
  );
});

export default function HeroSection() {
  const [bgIdx, setBgIdx] = useState(0);

  // Only run the auto-advancing background slideshow while the hero is on screen
  // and the visitor hasn't asked for reduced motion. Off-screen / reduced-motion
  // visitors get a static hero — no wasted rAF/repaint work hurting TBT.
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  // The hero headline is the LCP element. Animating it on first paint delays LCP
  // and adds transform jank on top of the web-font swap. So we render the *first*
  // slide statically — `initial={false}` paints it at its final state
  // immediately — and only enable the crossfade entrance once the component has
  // mounted, so subsequent slide changes still animate.
  const hasMounted = useRef(false);
  useEffect(() => {
    hasMounted.current = true;
  }, []);
  const enterInitial = (from) => (hasMounted.current ? from : false);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches;
    if (prefersReduced) return; // leave `animate` false → static hero

    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setAnimate(true); // no observer support → fall back to always-on
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setAnimate(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animate) return;
    const id = setInterval(() => {
      setBgIdx((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [animate]);

  const slide = HERO_SLIDES[bgIdx];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white pt-24 pb-8 md:pt-32 md:pb-10"
    >
      {/* Static background image. */}
      <img
        src="/images/home_hero_bg.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle grid overlay on top of the image */}
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-50" />

      <Container className="relative w-full">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow pill above the headline — cycles with the slide. */}
          <div className="flex min-h-[32px] items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={`eyebrow-${bgIdx}`}
                initial={enterInitial({ opacity: 0, y: 6 })}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700"
              >
                <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                {slide.eyebrow}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Headline — cycles with the slide, crossfading every rotation.
              min-h is sized to comfortably fit the longest slide's headline
              0
              
              at each breakpoint, so the subhead below never gets overlapped. */}
          <div className="relative mt-6 flex min-h-[180px] w-full items-center justify-center sm:min-h-[150px] md:min-h-[200px] lg:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${bgIdx}`}
                initial={enterInitial({ opacity: 0, y: 18 })}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`h-display text-balance text-[1.65rem] leading-[1.1] tracking-tightest sm:text-[2rem] sm:leading-[1.05] md:text-[2.8rem] lg:text-[3.5rem] ${
                  slide.shine ? 'text-shine' : 'text-navy-800'
                }`}
              >
                {slide.headline}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Sub-headline — also crossfades with the slide. The container
              reserves a fixed min-height and the <p> is absolutely positioned
              inside it (same approach as the headline above), so the differing
              line-counts of the slides' subheads never reflow the CTAs below. */}
          <div className="relative mt-3 flex w-full min-h-[96px] items-start justify-center sm:min-h-[80px] md:min-h-[72px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={`subhead-${bgIdx}`}
                initial={enterInitial({ opacity: 0, y: 10 })}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-2xl text-balance text-base leading-relaxed text-navy-700 md:text-lg"
              >
                {slide.subhead}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Static foreground — memoized, so the 5s slide tick above
              doesn't re-render any of it. */}
          <HeroCtas />
          {/* <HeroTrust /> */}
          {/* Trust line stays here; the logo marquee moved to <TrustSection/>. */}
          <HeroTrustMarquee />

          {/* Real product screenshots — commented out per design refresh. */}
          {/* <HeroProductShowcase animate={animate} /> */}
        </div>

        {/* <HeroParentBrand /> */}
      </Container>
    </section>
  );
}
