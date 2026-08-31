import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

const FLOW_STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source products and materials based on business demand and inventory requirements.',
  },
  {
    number: '02',
    title: 'Receive',
    description:
      'Record incoming stock and bring inventory into the right warehouse or distribution location.',
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized inventory with better visibility across products, batches, and locations.',
  },
  {
    number: '04',
    title: 'Process Orders',
    description:
      'Manage orders from distributors, retailers, customers, and sales channels.',
  },
  {
    number: '05',
    title: 'Pick & Dispatch',
    description:
      'Coordinate warehouse fulfillment and dispatch operations with greater accuracy.',
  },
  {
    number: '06',
    title: 'Track & Analyze',
    description:
      'Monitor inventory movement, fulfillment activity, sales performance, and operational trends.',
  },
];

export default function FmcgWarehouseToSales() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const headingGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.12), delayChildren: 0.05 },
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
      transition: { staggerChildren: stagger(0.12), delayChildren: 0.1 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: d(24) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.25, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[120px] h-[420px] w-[420px] rounded-full bg-[#dce6f5]/40 blur-[100px]" />
        <div className="absolute bottom-[80px] right-[-180px] h-[420px] w-[420px] rounded-full bg-[#e8eefb]/50 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* ================= SECTION HEADING ================= */}
        <motion.div
          variants={headingGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">
              FROM WAREHOUSE TO EVERY SALES CHANNEL
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-4 h-display text-[30px] leading-[1.12] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            A Connected Flow for{' '}
            <span className="gradient-text-orange">Every Product Movement</span>
          </motion.h2>
        </motion.div>

        {/* ================= DESKTOP FLOW — DIAGRAM + ALIGNED CAPTIONS ================= */}
        <motion.div
          variants={stepsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative mx-auto mt-10 hidden max-w-7xl lg:block"
        >
          {/* The artwork carries the diamonds, icons and connectors, and its
              stems already run down to their end dots at ~91% of its height —
              so the captions start straight after it, with no negative pull. */}
          <motion.img
            variants={fadeUp}
            src="/images/warehouse_to_sell.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />

          {/* Six equal columns land under the six stems */}
          <div className="mt-2 grid grid-cols-6 gap-x-3">
            {FLOW_STEPS.map(({ number, title, description }) => (
              <motion.div
                key={number}
                variants={stepVariants}
                className="min-w-0 px-1 text-center"
              >
                <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                  {title}
                </h3>

                <span className="mx-auto mt-3 block h-[2px] w-7 rounded-full bg-navy-800" />

                <p className="mx-auto mt-3 max-w-[210px] text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= MOBILE / TABLET FLOW ================= */}
        {/* The diagram is 2048px wide — below lg its numbers and icons become
            unreadable, so the same steps run as a stacked list instead. */}
        <motion.div
          variants={stepsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {FLOW_STEPS.map(({ number, title, description }) => (
            <motion.article
              key={number}
              variants={stepVariants}
              whileHover="hover"
              className="flex min-w-0 items-start gap-4 rounded-[16px] border border-[#e4e8ef] bg-white p-4 shadow-[0_10px_30px_rgba(25,35,55,0.06)] sm:p-5"
            >
              {/* Diamond badge — echoes the shapes in the desktop diagram */}
              <span className="mt-1 flex h-10 w-10 shrink-0 rotate-45 items-center justify-center rounded-[9px] border-2 border-navy-800 bg-white">
                <span className="-rotate-45 h-display text-[12px] font-semibold leading-none text-navy-800">
                  {number}
                </span>
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                  {title}
                </h3>

                <span className="mt-3 block h-[2px] w-7 rounded-full bg-navy-800" />

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
