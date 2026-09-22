import { m as motion, useReducedMotion } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The two lists run in parallel: row n on the left is answered by row n on
  the right. Both use the same fixed row height so the pairs stay on the
  same line across the arrow.
*/
const TRADITIONAL = [
  'Multiple disconnected tools',
  'Manual data entry',
  'Delayed reporting',
  'Data silos between departments',
  'Difficult workflow coordination',
  'Limited operational visibility',
];

const UPWON = [
  'One connected platform',
  'Automated workflows',
  'Real-time visibility',
  'Shared business information',
  'Connected processes',
  'Centralized insights',
];

export default function WhyUpwonComparison() {
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

  const from = (offset) => ({
    hidden: { opacity: 0, x: d(offset) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
  });

  const rowsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.18 },
    },
  };

  const rowFrom = (offset) => ({
    hidden: { opacity: 0, x: d(offset) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fafbff] to-white py-10 sm:py-12 lg:py-14">
      {/* Soft light behind the two visuals, as in the layout */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[#eef2fb] opacity-60 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[560px] w-[560px] rounded-full bg-[#eef3fd] opacity-70 blur-[90px]"
      />

      <Container className="relative z-10 !max-w-[1700px]">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">THE DIFFERENCE</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Stop Managing Disconnected Tools.
            <br className="hidden sm:block" />{' '}
            <span className="gradient-text-orange">
              Start Managing One Connected Business.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            Traditional systems often create fragmented workflows and isolated
            data. UpWon helps bring critical operations together into one
            connected environment.
          </motion.p>
        </motion.div>

        {/* ================= COMPARISON ================= */}
        {/* Five tracks at xl — visual, list, arrow, list, visual. At lg the
            two lists pair up and the visuals take a full row each. */}
        <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-6 xl:grid-cols-[1.08fr_0.95fr_auto_0.95fr_1.18fr] xl:gap-5">
          {/* ---------------- LEFT VISUAL ---------------- */}
          <motion.div
            variants={from(-24)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="order-1 min-w-0 lg:col-span-2 xl:col-span-1"
          >
            <img
              src="/images/why_multiple_tools.webp"
              alt="Multiple tools scattered across a business, tangled together by messy connections"
              width={1210}
              height={1300}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-[460px] xl:max-w-none"
            />
          </motion.div>

          {/* ---------------- TRADITIONAL ---------------- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="order-2 min-w-0 rounded-[22px] border border-navy-950/[0.05] bg-gradient-to-b from-[#fbfcfd] to-white p-6 shadow-[0_14px_44px_rgba(25,35,55,0.06)] lg:p-7"
          >
            <h3 className="h-display text-[19px] font-bold leading-tight tracking-tight text-navy-950 sm:text-[21px]">
              Traditional Systems
            </h3>

            <motion.ul
              variants={rowsGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-5 space-y-2"
            >
              {TRADITIONAL.map((label) => (
                <motion.li
                  key={label}
                  variants={rowFrom(-14)}
                  className="flex min-h-[46px] min-w-0 items-center gap-3 rounded-[10px] border border-navy-950/[0.04] bg-white px-3.5 py-2.5"
                >
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#fdeaea]">
                    <X className="h-3 w-3 text-[#dd4a3f]" strokeWidth={3.2} />
                  </span>

                  <span className="min-w-0 text-[14px] leading-snug text-navy-700 sm:text-[14.5px]">
                    {label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------------- ARROW ---------------- */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="order-3 hidden xl:flex xl:w-[76px] xl:items-center xl:justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-navy-950/[0.06] bg-white shadow-[0_10px_26px_rgba(25,35,55,0.12)]">
              <ArrowRight className="h-5 w-5 text-orange-500" strokeWidth={2.2} />
            </span>
          </motion.div>

          {/* ---------------- UPWON ---------------- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="order-4 min-w-0 rounded-[22px] bg-[#e8f1fe] p-6 shadow-[0_14px_44px_rgba(37,86,190,0.09)] lg:p-7"
          >
            <h3 className="h-display text-[19px] font-bold leading-tight tracking-tight text-navy-950 sm:text-[21px]">
              UpWon
            </h3>

            <motion.ul
              variants={rowsGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-5 space-y-2"
            >
              {UPWON.map((label) => (
                <motion.li
                  key={label}
                  variants={rowFrom(14)}
                  className="flex min-h-[46px] min-w-0 items-center gap-3 rounded-[10px] bg-white/80 px-3.5 py-2.5"
                >
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#2f6fed]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3.4} />
                  </span>

                  <span className="min-w-0 text-[14px] font-medium leading-snug text-navy-800 sm:text-[14.5px]">
                    {label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------------- RIGHT VISUAL ---------------- */}
          <motion.div
            variants={from(24)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="order-5 min-w-0 lg:col-span-2 xl:col-span-1"
          >
            <img
              src="/images/why_one_platform.webp"
              alt="Sales, finance, operations, HR, inventory and marketing all connected to UpWon at the centre"
              width={1250}
              height={1290}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-[480px] xl:max-w-none"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
