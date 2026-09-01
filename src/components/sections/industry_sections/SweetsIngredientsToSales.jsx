import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

/*
  The artwork carries the seven circles, connecting arcs and numbered badges.
  Their centres run from 8.1% to 91.4% of its width in even 13.9% steps, which
  is a seven-column grid inset ~1.1% either side — so the captions below ride
  that grid and stay under their own badge at any width.
*/
const STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source ingredients and raw materials based on production requirements and inventory needs.',
  },
  {
    number: '02',
    title: 'Receive',
    description:
      'Record incoming materials and bring inventory into the right warehouse, store, or production location.',
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized inventory with better visibility across ingredients, raw materials, finished goods, and locations.',
  },
  {
    number: '04',
    title: 'Produce',
    description:
      'Coordinate production activities and manage the movement of materials into finished products.',
  },
  {
    number: '05',
    title: 'Quality & Batch Control',
    description:
      'Maintain visibility across production batches and quality inspection touchpoints.',
  },
  {
    number: '06',
    title: 'Store & Dispatch',
    description:
      'Move finished goods into the right warehouse or storage location and coordinate dispatch activities.',
  },
  {
    number: '07',
    title: 'Sell & Replenish',
    description:
      'Manage movement to outlets, distributors, customers, and other sales channels while supporting ongoing replenishment decisions.',
  },
];

export default function SweetsIngredientsToSales() {
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

  const stepsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.1), delayChildren: 0.1 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: d(20) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.25, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[120px] h-[420px] w-[420px] rounded-full bg-[#ffe6d5]/40 blur-[110px]" />
        <div className="absolute bottom-[80px] right-[-180px] h-[420px] w-[420px] rounded-full bg-[#dce6f5]/50 blur-[110px]" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">
              FROM INGREDIENTS TO EVERY SALES CHANNEL
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            A Connected Flow for{' '}
            <span className="gradient-text-orange">Every Product Movement</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            Every stage—from sourcing ingredients to replenishing outlets—runs on
            the same platform, so teams can see where products are and what
            happens next.
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= DESKTOP FLOW ================= */}
      {/* Wider than the shared Container so seven captions stay readable */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1700px] px-6 lg:block lg:px-8">
        <motion.div
          variants={stepsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10"
        >
          {/* The stems run down to the badges at ~94% of the artwork height,
              so the captions start straight after it. */}
          <motion.img
            variants={fadeUp}
            src="/images/sweets_ingredients_to_every_sales.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />

          {/* Seven equal columns land under the seven badges */}
          <div className="mt-3 grid grid-cols-7 gap-x-3 px-[1.1%]">
            {STEPS.map(({ number, title, description }) => (
              <motion.div
                key={number}
                variants={stepVariants}
                className="min-w-0 px-1 text-center"
              >
                <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 xl:text-base">
                  {title}
                </h3>


                <p className="mx-auto mt-3 max-w-[210px] text-[12.5px] leading-relaxed text-navy-600 xl:text-[13px]">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= MOBILE / TABLET FLOW ================= */}
      {/* The artwork is 2172px wide — its badges and icons are unreadable at
          these widths, so the steps run as a stacked list instead. */}
      <Container className="relative z-10 lg:hidden">
        <motion.div
          variants={stepsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {STEPS.map(({ number, title, description }, index) => (
            <motion.article
              key={number}
              variants={stepVariants}
              whileHover="hover"
              className="flex min-w-0 items-start gap-4 rounded-[16px] border border-[#e4e8ef] bg-white p-4 shadow-[0_10px_30px_rgba(25,35,55,0.06)] sm:p-5"
            >
              {/* Badges alternate navy/orange, as they do in the artwork */}
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  index % 2 === 0 ? 'bg-navy-900' : 'bg-orange-500'
                }`}
              >
                <span className="h-display text-[13px] font-semibold leading-none text-white">
                  {number}
                </span>
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                  {title}
                </h3>


                <p className="mt-3 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
