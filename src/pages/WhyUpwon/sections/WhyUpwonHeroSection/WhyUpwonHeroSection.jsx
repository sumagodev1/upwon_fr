import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchWhyUpwonHeroSlides } from '../../../../lib/whyUpwonPage.js';

/*
  Why UpWon — Hero Section
  /why-upwon

  Split hero: the artwork carries the laptop and its floating icon tiles,
  the copy sits in the blank half the artwork leaves for it. Two crops are
  supplied — the desktop file keeps that blank half on the left, the mobile
  file stacks it underneath the laptop — so the layout follows suit:
  copy centred on the left from `lg` up, pinned to the bottom below it.

  Type follows HeroSlider's light variant (eyebrow, h-display headline,
  subhead, btn-primary-glow + btn-secondary) so this page opens in the same
  voice as the product and industry heroes — only left-aligned rather than
  centred, because the artwork leaves the room on that side.
*/

const EASE = [0.16, 1, 0.3, 1];

/*
  The built-in hero - the fallback now, and written as a one-slide list so a
  CMS set and the shipped one take the same path through the render below. It
  is what the section shows during the SSG build, while the fetch is in
  flight, and whenever the API is unreachable.
*/
const BG_DESKTOP = '/images/why_hero_desktop.webp';
const BG_MOBILE = '/images/why_hero_mobile.webp';
const IMAGE_ALT =
  'The UpWon dashboard on a laptop, surrounded by floating tiles for real-time data, connected teams, automated workflows and complete visibility';

const BUILT_IN_SLIDES = [
  {
    eyebrow: 'WHY UPWON',
    headingLines: [
      [
        { text: 'Why Growing Manufacturers ', accent: false },
        { text: 'Choose UpWon.', accent: true },
      ],
    ],
    subtext:
      'Manufacturing businesses need more than disconnected software and manual processes. UpWon brings your critical workflows, teams, and business data together in one connected platform.',
    desktopImage: BG_DESKTOP,
    mobileImage: BG_MOBILE,
    imageAlt: IMAGE_ALT,
    primary: { label: 'Explore UpWon', to: '/what-is-upwon' },
    secondary: { label: 'See How It Works', to: '/demo' },
  },
];

/** How long each slide holds before the next comes round. */
const INTERVAL_MS = 6000;

export default function WhyUpwonHeroSection() {
  const reduceMotion = useReducedMotion();
  const [cmsSlides, setCmsSlides] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchWhyUpwonHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setCmsSlides(slides);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const slides = cmsSlides ?? BUILT_IN_SLIDES;

  /*
    Clamped rather than reset: the published set can be shorter than whatever
    is on screen when it arrives, and a stale index would read past its end.
  */
  const active = Math.min(index, slides.length - 1);
  const slide = slides[active];

  /*
    Auto-advance only when there is somewhere to advance to, and never under
    prefers-reduced-motion - a hero that rotates on its own is exactly the
    kind of movement that setting asks us to stop.
  */
  useEffect(() => {
    if (reduceMotion || slides.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, slides.length]);

  const subtext = slide.subtext;
  const primary = slide.primary;
  const secondary = slide.secondary;
  // A slide without artwork of its own keeps the hero's.
  const bgDesktop = slide.desktopImage ?? BG_DESKTOP;
  const bgMobile = slide.mobileImage ?? BG_MOBILE;
  const imageAlt = slide.imageAlt ?? IMAGE_ALT;

  const d = (value) => (reduceMotion ? 0 : value);

  const group = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: 0.05,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section className="relative isolate flex overflow-hidden bg-white lg:aspect-[1983/793] lg:min-h-[580px] xl:min-h-[620px]">
      {/* ---------------- Artwork ---------------- */}
      <picture className="absolute inset-0 -z-10">
        <source
          media="(min-width: 1024px)"
          srcSet={bgDesktop}
          width={1983}
          height={793}
        />
        <img
          src={bgMobile}
          alt={imageAlt}
          width={944}
          height={1665}
          fetchpriority="high"
          decoding="async"
          /* Below lg the laptop stays at the top and the copy runs under it;
             from lg the crop is nudged right so the laptop survives narrow
             desktops while the blank left half keeps its width. */
          className="h-full w-full object-cover object-top lg:object-[72%_center]"
        />
      </picture>

      {/* Scrim — kept deliberately light so the artwork reads at full
          strength. It only lifts contrast where the copy sits: up from the
          bottom on mobile, in from the left on desktop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-white/75 via-white/25 to-transparent lg:bg-gradient-to-r lg:from-white/50 lg:via-white/10 lg:to-transparent"
      />

      {/* ---------------- Copy ---------------- */}
      {/* Below lg the padding-top is a share of the section's own width, so
          the copy always clears the laptop and its podium however wide the
          screen is — the artwork scales with the width, so a fixed pixel
          offset would overlap on some phones and leave a gap on others. */}
      <Container className="relative z-10 flex w-full flex-col justify-end pb-12 pt-[76%] sm:pb-14 lg:justify-center lg:pb-0 lg:pt-24">
        {/* Keyed on the slide so each one animates in as it comes round;
            without it the copy would swap in place while the stagger only
            ever ran on mount. */}
        <motion.div
          key={active}
          variants={group}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:max-w-[46%] xl:max-w-[48%]"
        >
          {slide.eyebrow && (
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy-600"
            >
              {slide.eyebrow}
            </motion.p>
          )}

          <motion.h1
            variants={fadeUp}
            className="mt-5 h-display text-balance text-[2rem] leading-[1.05] tracking-tightest text-navy-950 sm:text-[2.4rem] md:text-5xl lg:text-[2.5rem] xl:text-[2.9rem]"
          >
            <HeadingLines lines={slide.headingLines} />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-navy-700 md:text-lg lg:text-base"
          >
            {subtext}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
          >
            <Link to={primary.to} className="btn-primary-glow !px-6 !py-3.5">
              {primary.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            {secondary && (
              <Link to={secondary.to} className="btn-secondary !px-6 !py-3.5">
                {secondary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </motion.div>

          {/* Only worth drawing with somewhere to go. Buttons rather than
              dots-as-decoration, so the slider is usable without waiting for
              the timer - and the only control there is under reduced motion,
              where it does not advance on its own. */}
          {slides.length > 1 && (
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2">
              {slides.map((item, i) => (
                <button
                  key={item.eyebrow + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show slide ${i + 1} of ${slides.length}`}
                  aria-current={i === active}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 bg-orange-500'
                      : 'w-2 bg-navy-300 hover:bg-navy-400'
                  }`}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
