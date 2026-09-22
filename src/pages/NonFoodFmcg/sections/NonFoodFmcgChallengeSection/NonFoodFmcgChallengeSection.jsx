import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

export default function NonFoodFmcgChallengeSection() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.1), delayChildren: 0.05 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: d(22), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f8fc] py-12 sm:py-16 lg:pb-20 lg:pt-8">
      {/* ================= BACKGROUND ================= */}
      {/* The artwork carries the stage chain and product shot on its right
          side, so the wash is heaviest on the left where the copy sits and
          clears away toward the right. */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/non_fmcg_challenge_back.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-right-top"
        />

        <div className="absolute inset-0 bg-[#f6f8fc]/65 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#f6f8fc]/85 from-15% via-[#f6f8fc]/30 via-45% to-transparent lg:block" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* ================= LEFT — COPY + ARTWORK ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>THE CHALLENGE</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
            >
              Fast-Moving Products. Multiple Channels.{' '}
              <span className="gradient-text-orange">
                Constant Coordination.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-[540px] text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              Products move fast through procurement, inventory, warehouses,
              sales teams, distributors, and retailers—and when those stages run
              on spreadsheets and disconnected systems, teams spend more time
              coordinating information than managing operations.
            </motion.p>

            <motion.img
              variants={imageVariants}
              src="/images/non_fmcg_challenge_left.webp"
              alt="Scattered information, manual workflows and disconnected systems across an FMCG operation"
              loading="lazy"
              decoding="async"
              className="mt-7 block h-auto w-full rounded-[18px] lg:max-w-[540px]"
            />
          </motion.div>

          {/* The right half is left open for the chain and product shot the
              background artwork already carries. */}
          <div aria-hidden="true" className="hidden lg:block" />
        </div>

      </Container>
    </section>
  );
}
