import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Milk,
  Cog,
  ShieldCheck,
  Snowflake,
  Truck,
  Package,
  Factory,
  ChevronRight,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CHALLENGES = [
  {
    number: '01',
    title: 'Raw Material & Ingredient Visibility',
    description:
      'Maintain better visibility of milk, ingredients, packaging materials, and other production inputs across stores, warehouses, and production locations.',
  },
  {
    number: '02',
    title: 'Production & Inventory Coordination',
    description:
      'Keep production requirements better connected with available materials, inventory levels, and finished-product movement.',
  },
  {
    number: '03',
    title: 'Batch & Quality Visibility',
    description:
      'Maintain greater visibility across production batches and quality inspection touchpoints throughout operations.',
  },
  {
    number: '04',
    title: 'Perishable Product Movement',
    description:
      'Track products through production, storage, and distribution with better visibility across batches, inventory, and movement.',
  },
  {
    number: '05',
    title: 'Cold Storage & Finished Goods Coordination',
    description:
      'Coordinate finished-product storage, warehouse movement, dispatch, and distribution workflows.',
  },
  {
    number: '06',
    title: 'Multi-Location Operations',
    description:
      'Track inventory and operational activity across plants, cold stores, warehouses, distribution points, and other business locations.',
  },
];

// The stage strip and the breakdown below it are drawn from the reference —
// they are not part of the supplied artwork.
const STAGES = [
  { label: 'Raw Materials', detail: 'Milk, Ingredients, Packaging', Icon: Milk },
  { label: 'Production', detail: 'Processing & Manufacturing', Icon: Cog },
  { label: 'Quality', detail: 'Inspection & Compliance', Icon: ShieldCheck },
  { label: 'Cold Storage', detail: 'Temperature Controlled', Icon: Snowflake },
  { label: 'Distribution', detail: 'Dispatch & Delivery', Icon: Truck },
];

const BREAKDOWN = [
  {
    label: 'Raw Materials',
    Icon: Package,
    points: ['Milk Procurement', 'Ingredients', 'Packaging Materials'],
  },
  {
    label: 'Production',
    Icon: Factory,
    points: ['Batch Management', 'Inventory Tracking', 'Quality Control'],
  },
  {
    label: 'Distribution',
    Icon: Truck,
    points: ['Cold Storage', 'Dispatch Management', 'Multi-Location Visibility'],
  },
];

export default function DairyIceCreamOperationalChallenges() {
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

  const rowsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.12 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: d(24) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
    hover: { y: d(-3), transition: { duration: 0.25, ease: EASE } },
  };

  // The photo settles in from a slight zoom
  const photoVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: EASE },
    },
  };

  // Cards that rise in and cascade their own children
  const cardGroup = {
    hidden: { opacity: 0, y: d(18) },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EASE,
        staggerChildren: stagger(0.08),
        delayChildren: 0.1,
      },
    },
  };

  const stageVariants = {
    hidden: { opacity: 0, y: d(12), scale: reduceMotion ? 1 : 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: EASE },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          {/* ================= LEFT — ARTWORK + STAGE CARDS ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_14px_40px_rgba(25,35,55,0.08)] sm:p-5"
          >
            {/* Photo with its badge */}
            <motion.div
              variants={photoVariants}
              className="relative min-h-[240px] flex-1 overflow-hidden rounded-[14px]"
            >
              <img
                src="/images/dairy_operation_challenge.webp"
                alt="Dairy and ice cream production line"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-navy-950 px-3 py-1.5 text-[9.5px] font-bold uppercase leading-tight tracking-[0.1em] text-white sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.14em] md:text-[12px]">
                Dairy &amp; Ice Cream Operations
              </span>
            </motion.div>

            {/* Stage strip */}
            <motion.div
              variants={cardGroup}
              className="mt-4 rounded-[14px] bg-[#fbfcfe] p-4 sm:p-5"
            >
              <div className="grid grid-cols-3 gap-x-2 gap-y-5 sm:flex sm:items-start sm:justify-between sm:gap-1">
                {STAGES.map(({ label, detail, Icon }, index) => (
                  <motion.div
                    key={label}
                    variants={stageVariants}
                    className="flex min-w-0 flex-1 items-start"
                  >
                    <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff2e9] sm:h-12 sm:w-12">
                        <Icon
                          className="h-5 w-5 text-navy-900 sm:h-6 sm:w-6"
                          strokeWidth={1.6}
                        />
                      </span>

                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.06em] text-navy-950 sm:text-[11px]">
                        {label}
                      </p>

                      <p className="mt-1 text-[9.5px] leading-tight text-navy-600 sm:text-[10.5px]">
                        {detail}
                      </p>
                    </div>

                    {index < STAGES.length - 1 && (
                      <ChevronRight
                        aria-hidden="true"
                        className="mt-4 hidden h-4 w-4 shrink-0 text-orange-500 sm:mt-5 sm:block"
                        strokeWidth={2.5}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Breakdown */}
            <motion.div
              variants={cardGroup}
              className="mt-4 grid gap-4 rounded-[14px] bg-[#fbfcfe] p-4 sm:grid-cols-3 sm:p-5"
            >
              {BREAKDOWN.map(({ label, Icon, points }, index) => (
                <motion.div
                  variants={stageVariants}
                  key={label}
                  className={`min-w-0 ${
                    index !== BREAKDOWN.length - 1
                      ? 'sm:border-r sm:border-navy-950/[0.07] sm:pr-4'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className="h-5 w-5 shrink-0 text-orange-500"
                      strokeWidth={1.7}
                    />

                    <p className="h-display text-[11px] font-bold uppercase tracking-[0.08em] text-navy-950">
                      {label}
                    </p>
                  </div>

                  <ul className="mt-2.5 space-y-1.5">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[11px] leading-snug text-navy-600"
                      >
                        <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-orange-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ================= RIGHT — COPY + CHALLENGES ================= */}
          <div className="min-w-0">
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={fadeIn}>
                <Eyebrow>OPERATIONAL CHALLENGES</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
              >
                Managing every stage of dairy &amp; ice cream operations with{' '}
                <span className="gradient-text-orange">greater visibility.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-[15px] leading-relaxed text-navy-600 sm:text-base"
              >
                From incoming milk and ingredients to production, cold storage,
                and distribution, disconnected operations can make it difficult
                to maintain visibility across the product journey.
              </motion.p>
            </motion.div>

            <motion.div
              variants={rowsGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-6 space-y-3 sm:mt-8"
            >
              {CHALLENGES.map(({ number, title, description }) => (
                <motion.article
                  key={number}
                  variants={rowVariants}
                  whileHover="hover"
                  className="flex min-w-0 items-start gap-4 rounded-[14px] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(25,35,55,0.05)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(25,35,55,0.1)] sm:px-5"
                >
                  <span className="h-display shrink-0 text-[24px] font-bold leading-none text-orange-500 sm:text-[26px]">
                    {number}
                  </span>

                  <div className="min-w-0 flex-1 border-l border-navy-950/[0.08] pl-4">
                    <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                      {title}
                    </h3>

                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                      {description}
                    </p>
                  </div>

                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
