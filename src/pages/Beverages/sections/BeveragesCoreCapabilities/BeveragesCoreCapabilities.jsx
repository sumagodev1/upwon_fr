import { useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CAPABILITIES = [
  {
    title: 'Centralized Ingredient & Inventory Control',
    description:
      'Get a clearer view of ingredients, concentrates, sweeteners, additives, packaging materials, work-in-process items, finished products, and stock movement across plants and warehouses.',
    photo: '/images/bev_centralized_ingredient.webp',
  },
  {
    title: 'Connected Procurement Workflows',
    description:
      'Bring supplier requirements, purchasing activity, incoming materials, inspection touchpoints, and inventory availability closer together.',
    photo: '/images/bev_procurement_workflows.webp',
  },
  {
    title: 'Recipe & Production Management',
    description:
      'Connect recipe requirements, bills of materials, ingredient availability, production activities, and finished-product movement with better visibility across operations.',
    photo: '/images/bev_production_management.webp',
  },
  {
    title: 'Quality Inspection & Product Control',
    description:
      'Maintain connected visibility across quality inspection touchpoints, product records, and operational requirements throughout procurement and production.',
    photo: '/images/bev_quality_inspection.webp',
  },
  {
    title: 'Packaging & Finished Goods Coordination',
    description:
      'Coordinate packaging materials, production outputs, finished-product inventory, storage, warehouse movement, and dispatch workflows.',
    photo: '/images/bev_packaging_finished.webp',
  },
  {
    title: 'Inventory & Shelf-Life Visibility',
    // The brief's copy for this one ended with an internal note asking for the
    // exact platform capabilities to be validated before publication; that
    // clause is left out here rather than published.
    description:
      'Maintain better visibility across stock availability, product movement, and freshness-related inventory workflows.',
    photo: '/images/bev_inventory_shelf.webp',
  },
  {
    title: 'Warehouse & Distribution Operations',
    description:
      'Support material receipt, storage, transfers, stock tracking, picking, dispatch, and product movement across warehouses and distribution workflows.',
    photo: '/images/bev_warehouse_distribution.webp',
  },
  {
    title: 'Real-Time Business Insights',
    description:
      'Access dashboards and reports that provide visibility into procurement, production, inventory, stock movement, sales, location activity, and overall business operations.',
    photo: '/images/bev_business_insights.webp',
  },
];

export default function BeveragesCoreCapabilities() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

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

  const tabsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.12 },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, x: d(-14) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  };

  const capability = CAPABILITIES[active];

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/bev_core_capability_bg.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
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
            <Eyebrow className="justify-center">CORE CAPABILITIES</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Built for Every Step of Your{' '}
            <span className="gradient-text-orange">Beverage Business</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From ingredients to finished products, UpWon helps you manage,
            monitor, and connect your entire beverage and juice operations with
            ease.
          </motion.p>
        </motion.div>

        {/* ================= TABS + PANEL ================= */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 xl:gap-12">
          {/* ---------- Capability list ---------- */}
          <motion.div
            variants={tabsGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex min-w-0 flex-col gap-1.5"
          >
            {CAPABILITIES.map(({ title }, index) => {
              const isActive = index === active;

              return (
                <motion.button
                  key={title}
                  type="button"
                  variants={tabVariants}
                  onClick={() => setActive(index)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative w-full rounded-[10px] px-4 py-3 text-left text-[14px] font-semibold leading-snug transition-colors duration-300 sm:text-[14.5px] ${
                    isActive
                      ? 'bg-[#fdf0e4] text-navy-950'
                      : 'text-navy-700 hover:bg-navy-950/[0.04] hover:text-navy-950'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-orange-500"
                    />
                  )}

                  {title}
                </motion.button>
              );
            })}
          </motion.div>

          {/* ---------- Active capability ---------- */}
          <motion.div
            initial={{ opacity: 0, y: d(18) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="min-w-0"
          >
            {/* Keyed so the copy and screenshot slide in on every change */}
            <motion.p
              key={`copy-${active}`}
              initial={{ opacity: 0, x: d(-20) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mx-auto max-w-2xl text-center text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              {capability.description}
            </motion.p>

            {/* Fixed frame, so switching capabilities never jumps the layout */}
            <div className="mt-6 aspect-[1580/1000] w-full overflow-hidden rounded-[14px] border border-navy-950/[0.06] bg-white shadow-[0_16px_40px_rgba(25,35,55,0.1)]">
              <motion.img
                key={`shot-${active}`}
                initial={{ opacity: 0, x: d(24) }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                src={capability.photo}
                alt={capability.title}
                width={1580}
                height={1000}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
