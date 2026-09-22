import { useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

const REASONS = [
  {
    tab: 'End-to-end workflow integration',
    title: 'End-to-end workflow integration',
    description:
      'Connect procurement, inventory, production, quality, warehouses, outlets, sales and distribution.',
    image: '/images/end_to_end_workflow_integration.webp',
  },
  {
    tab: 'Greater operational visibility',
    title: 'Greater operational visibility',
    description:
      'Get complete visibility across every stage of your operations.',
    image: '/images/greater_operational_visibility.webp',
  },
  {
    tab: 'Improved coordination',
    title: 'Improved coordination',
    description:
      'Eliminate silos and improve collaboration across all departments.',
    image: '/images/improved_coordination.webp',
  },
  {
    tab: 'Better control & accuracy',
    title: 'Better control & accuracy',
    description:
      'Reduce errors, minimize delays, and maintain quality at every step.',
    image: '/images/better_control_accuracy.webp',
  },
  {
    tab: 'Data-driven decisions',
    title: 'Data-driven decisions',
    description:
      'Access real-time insights to make faster and smarter business decisions.',
    image: '/images/data_driven_decisions.webp',
  },
  {
    tab: 'Operational efficiency',
    title: 'Operational efficiency',
    description:
      'Streamline processes to reduce costs and maximize productivity.',
    image: '/images/operational_efficiency.webp',
  },
  {
    tab: 'Scalable for growth',
    title: 'Scalable for growth',
    description:
      'Built to support your business as you expand across locations and channels.',
    image: '/images/scalable_for_growth.webp',
  },
];

export default function SweetsWhyUpwon() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  const active = REASONS[activeIndex];

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

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-4xl"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>WHY UPWON</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Built to Keep Complex Food Operations{' '}
            <span className="gradient-text-orange">Moving as One.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            In sweets and namkeen operations, disconnected production, inventory,
            sales, and distribution workflows can quickly create delays and
            reduce operational visibility. UpWon brings procurement, inventory,
            production, quality, warehouses, outlets, sales, and distribution
            workflows together—helping teams operate with greater coordination
            and control.
          </motion.p>
        </motion.div>

        {/* ================= TABBED PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, y: d(22) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="mt-9 grid gap-6 sm:mt-11 lg:grid-cols-[280px_1fr] lg:gap-0"
        >
          {/* ---------- Tabs ---------- */}
          {/* Outside the panel, on the section background — the panel starts
              where the content does. Horizontal and scrollable below lg. */}
          <div
            role="tablist"
            aria-label="Why UpWon"
            className="relative z-10 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 lg:pt-4"
          >
            {REASONS.map(({ tab }, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 rounded-[10px] px-4 py-3 text-left text-[14px] font-semibold leading-snug transition-colors duration-300 lg:w-full lg:shrink lg:text-[15px] ${
                    isActive
                      ? 'bg-navy-950 text-white'
                      : 'text-navy-800 hover:bg-navy-950/[0.05]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* ---------- Panel ---------- */}
          <div className="min-w-0 overflow-hidden bg-[#f2f4f7] lg:-ml-7">
            <div>
              <motion.div
                key={active.tab}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid gap-6 p-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8 lg:py-10 lg:pl-16 lg:pr-10"
              >
                <div className="min-w-0">
                  <h3 className="h-display text-[22px] font-semibold leading-tight text-navy-950 sm:text-[26px] lg:text-[28px]">
                    {active.title}
                  </h3>

                  <p className="mt-3 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]">
                    {active.description}
                  </p>
                </div>

                {/* The mockup runs past the panel edge and is clipped by it,
                    the way the reference crops its product screenshot. */}
                <div className="min-w-0">
                  <img
                    src={active.image}
                    alt={`UpWon dashboard — ${active.title}`}
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full lg:w-[132%] lg:max-w-none"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
