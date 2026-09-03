import { m as motion, useReducedMotion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

export default function NonFoodFmcgWhyUpwon() {
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
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#f9fbfe] py-14 sm:py-20 lg:py-28 xl:py-32">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 xl:gap-20">
          {/* ================= LEFT — COPY ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>WHY UPWON</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              Built to Keep Fast-Moving FMCG Operations{' '}
              <span className="gradient-text-orange">Moving as One.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              In non-food FMCG operations, disconnected inventory, warehouse,
              sales, distribution, and field workflows can quickly create delays
              and reduce operational visibility. UpWon brings these workflows
              together—helping teams operate with greater coordination and
              control.
            </motion.p>

            {/* Closing statement, as in the reference */}
            <motion.div
              variants={fadeUp}
              className="mt-7 inline-flex items-center gap-4 rounded-[16px] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(25,35,55,0.08)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff1e8]">
                <Share2 className="h-5 w-5 text-orange-500" strokeWidth={1.8} />
              </span>

              <p className="h-display min-w-0 text-[13.5px] font-semibold leading-snug text-navy-950 sm:text-[14px]">
                One connected platform.
                <br />
                From product movement to{' '}
                <span className="text-orange-600">every sales channel.</span>
              </p>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT — ILLUSTRATION ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/non_fmcg_why_upwon.webp"
              alt="UpWon connecting warehouses, retail, distribution, field teams and sales channels"
              width={1568}
              height={1003}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
