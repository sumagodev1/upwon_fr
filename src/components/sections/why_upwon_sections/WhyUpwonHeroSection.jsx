import { m as motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Container from '../../ui/Container.jsx';

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

export default function WhyUpwonHeroSection() {
  const reduceMotion = useReducedMotion();

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
          srcSet="/images/why_hero_desktop.webp"
          width={1983}
          height={793}
        />
        <img
          src="/images/why_hero_mobile.webp"
          alt="The UpWon dashboard on a laptop, surrounded by floating tiles for real-time data, connected teams, automated workflows and complete visibility"
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
        <motion.div
          variants={group}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:max-w-[46%] xl:max-w-[48%]"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy-600"
          >
            WHY UPWON
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 h-display text-balance text-[2rem] leading-[1.05] tracking-tightest text-navy-950 sm:text-[2.4rem] md:text-5xl lg:text-[2.5rem] xl:text-[2.9rem]"
          >
            Why Growing Manufacturers{' '}
            <span className="gradient-text-orange">Choose UpWon.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-navy-700 md:text-lg lg:text-base"
          >
            Manufacturing businesses need more than disconnected software and
            manual processes. UpWon brings your critical workflows, teams, and
            business data together in one connected platform.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
          >
            <Link to="/what-is-upwon" className="btn-primary-glow !px-6 !py-3.5">
              Explore UpWon
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link to="/demo" className="btn-secondary !px-6 !py-3.5">
              See How It Works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
