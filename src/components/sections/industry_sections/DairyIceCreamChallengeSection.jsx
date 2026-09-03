import { m as motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const STAGES = [
  {
    number: '01',
    label: 'Sourcing & Procurement',
    photo: '/images/dairy_source.webp',
  },
  {
    number: '02',
    label: 'Receiving',
    photo: '/images/dairy_receving.webp',
  },
  {
    number: '03',
    label: 'Raw Material Management',
    photo: '/images/dairy_raw_material.webp',
  },
  {
    number: '04',
    label: 'Processing & Production',
    photo: '/images/dairy_processing_prodction.webp',
  },
  {
    number: '05',
    label: 'Quality Checks',
    photo: '/images/dairy_quality_cheks.webp',
  },
  {
    number: '06',
    label: 'Storage & Cold Chain',
    photo: '/images/dairy_cold_chain.webp',
  },
  {
    number: '07',
    label: 'Warehouse & Dispatch',
    photo: '/images/dairy_warehouse.webp',
  },
  {
    number: '08',
    label: 'Distribution',
    photo: '/images/dairy_distribution.webp',
  },
  {
    number: '09',
    label: 'Sales & Delivery',
    photo: '/images/dairy_sales_distrbution.webp',
  },
];

const PAIN_POINTS = [
  { label: 'Reliance on Spreadsheets', icon: '/images/reliance_spredsheet.webp' },
  { label: 'Disconnected Systems', icon: '/images/disconnected_system.webp' },
  { label: 'Limited Production Visibility', icon: '/images/limited_production.webp' },
  { label: 'Difficult Inventory Tracking', icon: '/images/difficult_inventary.webp' },
  {
    label: 'Delayed Coordination & Communication',
    icon: '/images/delayed_cooridination.webp',
  },
  { label: 'Higher Risk of Stockouts', icon: '/images/dairy_higher_risk.webp' },
  {
    label: 'Impact on Freshness, Quality & Performance',
    icon: '/images/impact_on_freshness.webp',
  },
];

export default function DairyIceCreamChallengeSection() {
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

  const productVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const chainGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.1 },
    },
  };

  const stageVariants = {
    hidden: { opacity: 0, y: d(20) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.28, ease: EASE } },
  };

  const painVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12">
      {/* Wider than the shared Container so all nine stages fit one row at xl.
          The heading rides the same wrapper so its edges match the chain's. */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* ================= HEADING ================= */}
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
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
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[34px] xl:text-[36.8px]"
            >
              Perishable Products.
              {/* Breaks after the first sentence once there is room for the
                  rest of the headline on one line, as in the layout */}
              <br className="hidden xl:block" />{' '}
              Fast Movement.{' '}
              <span className="gradient-text-orange">
                Constant Coordination.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              Milk, ingredients, and finished products move quickly through
              procurement, production, quality checks, cold storage, and
              distribution—and when those stages run on spreadsheets and
              disconnected systems, teams spend more time chasing information
              than managing operations.
            </motion.p>
          </motion.div>

          <motion.div
            variants={productVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/dairy_the_chall_head_back.webp"
              alt="Milk, curd, cheese and ice cream"
              width={657}
              height={553}
              loading="lazy"
              decoding="async"
              className="ml-auto block h-auto w-full lg:h-[300px] lg:w-auto xl:h-[330px]"
            />
          </motion.div>
        </div>

        {/* ================= STAGE CHAIN ================= */}
          <motion.div
            variants={chainGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 xl:gap-x-6"
          >
            {STAGES.map(({ number, label, photo }, index) => (
              <motion.article
                key={number}
                variants={stageVariants}
                whileHover="hover"
                className="relative flex min-w-0 flex-col rounded-[12px] border border-navy-950/[0.06] bg-white p-2.5 shadow-[0_8px_24px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(25,35,55,0.11)]"
              >
                <div className="flex min-w-0 items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                    {number}
                  </span>

                  <p className="min-w-0 text-[11px] font-semibold leading-tight text-navy-950">
                    {label}
                  </p>
                </div>

                <div className="mt-2.5 overflow-hidden rounded-[10px]">
                  <img
                    src={photo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="block h-[140px] w-full object-cover object-center xl:h-[150px]"
                  />
                </div>

                {/* Chain arrows sit in the gutters, so only on the one-row layout */}
                {index < STAGES.length - 1 && (
                  <span className="absolute -right-6 top-1/2 hidden w-6 -translate-y-1/2 justify-center xl:flex">
                    <ChevronRight
                      aria-hidden="true"
                      className="h-4 w-4 text-orange-500"
                      strokeWidth={2.6}
                    />
                  </span>
                )}
              </motion.article>
            ))}
          </motion.div>

          {/* ================= WHAT IT COSTS ================= */}
          <motion.div
            variants={chainGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-5 grid grid-cols-2 gap-y-6 rounded-[16px] bg-[#fdf2e8] px-4 py-5 sm:grid-cols-3 sm:px-6 lg:grid-cols-4 xl:grid-cols-7"
          >
            {PAIN_POINTS.map(({ label, icon }, index) => (
              <motion.div
                key={label}
                variants={painVariants}
                className={`flex min-w-0 flex-col items-center px-3 text-center ${
                  index < PAIN_POINTS.length - 1
                    ? 'xl:border-r xl:border-orange-500/15'
                    : ''
                }`}
              >
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-[54px] w-[54px] object-contain"
                />

                <p className="mt-2.5 text-[12px] font-medium leading-snug text-navy-800 sm:text-[12.5px]">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
    </section>
  );
}
