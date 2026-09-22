import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';

/*
  Contact Hero Section
  /contact

  Two crops are supplied, so the layout follows each one rather than
  stretching a single file across both:

  · Desktop (1672x941) puts the agent and the "Questions / Ideas / Support"
    panel on the right and leaves the world map and open space on the left,
    so the copy sits in that left half over a soft white scrim.

  · Mobile (1055x1491) is a full portrait composition with its own baked-in
    copy, and nothing is left over to write into — so below `lg` it runs as
    a banner and the page copy sits underneath it, the same way the industry
    CTA sections handle their portrait art.

  Both crops are bright, so the type stays navy rather than reversing out.
*/

const EASE = [0.16, 1, 0.3, 1];

const BG_DESKTOP = '/images/contact_us_desktop.webp';
const BG_MOBILE = '/images/contact_us_mobile.webp';

const HEADING = (
  <>
    Let&rsquo;s Talk About Your{' '}
    <span className="gradient-text-orange">Operations.</span>
  </>
);

const SUBTEXT =
  'Tell us your industry and your biggest pain point. A solution lead from the UpWon team will get back to you within 2 business hours.';

export default function ContactHeroSection() {
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

  const copy = (
    <motion.div
      variants={group}
      initial="hidden"
      animate="visible"
      className="max-w-2xl lg:max-w-[44%] xl:max-w-[42%]"
    >
      <motion.p
        variants={fadeUp}
        className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy-600"
      >
        GET IN TOUCH
      </motion.p>

      <motion.h1
        variants={fadeUp}
        className="mt-5 h-display text-balance text-[2rem] leading-[1.05] tracking-tightest text-navy-950 sm:text-[2.4rem] lg:text-[2.5rem] xl:text-[2.9rem]"
      >
        {HEADING}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-5 max-w-xl text-balance text-[15px] leading-relaxed text-navy-700 md:text-base"
      >
        {SUBTEXT}
      </motion.p>
    </motion.div>
  );

  return (
    <>
      {/* ================= DESKTOP ================= */}
      {/* Height is set directly rather than with an aspect ratio: a ratio plus
          a max-height lets the browser derive the WIDTH back from the capped
          height, which stops the section short of the viewport edge. The
          photograph is object-cover, so it fills whatever width it is given. */}
      <section className="relative isolate hidden w-full overflow-hidden bg-white lg:flex lg:min-h-[600px] xl:min-h-[660px] 2xl:min-h-[700px]">
        <img
          src={BG_DESKTOP}
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          fetchpriority="high"
          decoding="async"
          /* Anchored right so the agent and the message panel survive when
             the section is wider than the file's own ratio. */
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right"
        />

        {/* Scrim — kept deliberately light so the photograph reads at full
            strength. The left of the crop is already near-white behind the
            map, so the navy copy needs very little help to stay legible. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white/45 via-white/10 to-transparent"
        />

        <Container className="relative z-10 flex w-full flex-col justify-center pt-24">
          {copy}
        </Container>
      </section>

      {/* ================= MOBILE / TABLET ================= */}
      <section className="relative block w-full bg-cream-100 lg:hidden">
        {/* The portrait file is 1:1.4 — far too tall to run whole — so it is
            cropped to a banner that keeps the map, the agent and the
            "We're Here to Help" bubble in frame. */}
        <div className="relative h-[300px] w-full overflow-hidden sm:h-[380px]">
          <img
            src={BG_MOBILE}
            alt=""
            aria-hidden="true"
            width={1055}
            height={1491}
            fetchpriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[center_28%]"
          />

          {/* Fades the crop into the copy panel below it */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream-100 to-transparent"
          />
        </div>

        <Container className="relative z-10 pb-10 pt-6 sm:pb-12">{copy}</Container>
      </section>
    </>
  );
}
