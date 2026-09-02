import { useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

const TABS = [
  {
    tab: 'Procurement & Purchasing',
    points: [
      'Purchase requirements raised against production plans, not guesswork',
      'Supplier records, rates and incoming materials held in one place',
      'Receipts posted straight into stock as materials arrive',
    ],
    title: 'Source materials against what production actually needs',
    description:
      'Keep purchase requirements, suppliers, and incoming materials connected to production plans and stock levels, so buying decisions are made against real requirements rather than estimates.',
    image: '/images/procurement_and_purchasing.webp',
  },
  {
    tab: 'Production Operations',
    points: [
      'Recipes and bills of materials held centrally and versioned',
      'Material requirements checked against what is actually available',
      'Output and finished-product movement recorded against each run',
    ],
    title: 'Run production against real stock',
    description:
      'Bring recipes, material requirements, and production activities together, so plans reflect what is actually available and finished-product movement stays visible through the run.',
    image: '/images/prod_operation.webp',
  },
  {
    tab: 'Quality Management',
    points: [
      'Inspection touchpoints tied to the production batch they belong to',
      'Results recorded as they happen rather than reconstructed later',
      'Batch history available when a recall or audit needs it',
    ],
    title: 'Quality checks that stay on the record',
    description:
      'Track quality inspection touchpoints alongside production batches, so what was checked, when, and against which batch stays visible instead of living in separate registers.',
    image: '/images/quality_management.webp',
  },
  {
    tab: 'Inventory Management',
    points: [
      'Raw materials, work in progress, packaging and finished goods in one view',
      'Stock position held per plant, warehouse and storage location',
      'Transfers and adjustments tracked between every location',
    ],
    title: 'One view of stock across every location',
    description:
      'See raw materials, work in progress, packaging, and finished goods across plants, warehouses, and other locations in one place, with movement tracked between them.',
    image: '/images/inventory_mgmt.webp',
  },
  {
    tab: 'Warehouse Operations',
    points: [
      'Receipt, putaway and storage recorded on the floor',
      'Transfers, dispatch and returns tracked end to end',
      'Stock position reflects what actually moved, not what was planned',
    ],
    title: 'Every movement tracked end to end',
    description:
      'Support day-to-day receipt, storage, transfers, dispatch, and returns with a record of each movement, so stock position reflects what has actually happened on the floor.',
    image: '/images/warehouse_operations.webp',
  },
  {
    tab: 'Sales & Distribution',
    points: [
      'Customer, distributor and channel orders in one queue',
      'Picking and dispatch coordinated against available stock',
      'Visibility from order creation through to fulfillment',
    ],
    title: 'From finished goods to the customer',
    description:
      'Manage orders and dispatch across customers, distributors, and channels through connected workflows, with visibility from order creation through to fulfillment.',
    image: '/images/sales_distribution.webp',
  },
];

export default function FoodProcessingWhyUpwon() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  const active = TABS[activeIndex];

  const step = (delta) =>
    setActiveIndex((current) => (current + delta + TABS.length) % TABS.length);

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

  /* Panel swap — each part eases in from the left, one after the other, so
     the new tab reads across rather than appearing all at once. */
  const panelGroup = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger(0.12) } },
  };

  const columnGroup = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger(0.09) } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: d(-45) },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: EASE },
    },
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
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">WHY UPWON</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Built to Keep Complex Food Processing Operations{' '}
            <span className="gradient-text-orange">Moving as One.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            In food processing operations, disconnected procurement, production,
            inventory, quality, warehouse, sales, and distribution workflows can
            quickly create delays and reduce operational visibility. UpWon brings
            these workflows together—helping teams operate with greater
            coordination and control.
          </motion.p>
        </motion.div>

        {/* ================= TABS ================= */}
        <motion.div
          initial={{ opacity: 0, y: d(20) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-9 sm:mt-11"
        >
          {/* Prev / next, as in the reference */}
          <div className="mb-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous capability"
              className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-navy-950/10 bg-white text-navy-900 transition-colors duration-300 hover:bg-navy-950 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.4} />
            </button>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next capability"
              className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-navy-950 text-white transition-colors duration-300 hover:bg-navy-900"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
            </button>
          </div>

          <div
            role="tablist"
            aria-label="Why UpWon"
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-center lg:overflow-visible lg:pb-0"
          >
            {TABS.map(({ tab }, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 rounded-full px-5 py-3 text-center text-[13px] font-semibold leading-snug transition-colors duration-300 sm:text-sm ${
                    isActive
                      ? 'bg-navy-950 text-white'
                      : 'bg-[#f1f4f9] text-navy-800 hover:bg-[#e6ebf3]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* ================= PANEL ================= */}
          {/* A keyed div swaps old for new in one commit, so the panel is
              never empty mid-transition, and the fixed-ratio image frame
              holds its box — together that stops the section jumping when a
              tab is clicked. Children then ease in from the left in turn. */}
          <div className="mt-8 lg:mt-10">
            <motion.div
              key={active.tab}
              variants={panelGroup}
              initial="hidden"
              animate="visible"
              className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <motion.div variants={columnGroup} className="min-w-0">
                <motion.h3
                  variants={slideInLeft}
                  className="h-display text-[22px] font-semibold leading-tight text-navy-950 sm:text-[26px] lg:text-[30px]"
                >
                  {active.title}
                </motion.h3>

                <motion.p
                  variants={slideInLeft}
                  className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
                >
                  {active.description}
                </motion.p>

                <motion.ul variants={columnGroup} className="mt-6 space-y-3.5">
                  {active.points.map((point) => (
                    <motion.li
                      key={point}
                      variants={slideInLeft}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      <span className="min-w-0 text-[14px] leading-relaxed text-navy-700 sm:text-[14.5px]">
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div variants={slideInLeft} className="min-w-0">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[18px]">
                  <img
                    src={active.image}
                    alt={`UpWon ${active.tab}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
