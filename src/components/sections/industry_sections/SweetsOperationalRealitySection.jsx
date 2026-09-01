import { m as motion, useReducedMotion } from 'framer-motion';
import {
  X,
  AlertTriangle,
  TrendingDown,
  Package,
  Clock,
  Frown,
  Target,
} from 'lucide-react';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

// Two of the source files carry a space in their name, so the paths are
// percent-encoded here rather than passed through raw.
const CARDS = [
  {
    title: 'Ingredient and Raw-Material Visibility Gaps',
    icon: '/images/ingredient_and%20raw_material_top.webp',
    art: '/images/ingredient_and%20raw_material_bottom.webp',
    points: [
      'Unclear availability across suppliers and locations',
      'Quality inconsistencies',
      'No real-time consumption visibility',
    ],
  },
  {
    title: 'Production Planning Disconnected from Actual Stock',
    icon: '/images/production_planning_disconnected_top.webp',
    art: '/images/production_planning_disconnected_bottom.webp',
    points: [
      'Plans created without real-time stock accuracy',
      'Overproduction or underproduction',
      'Constant plan changes and delays',
    ],
  },
  {
    title: 'Finished Goods Moving Without One Operational View',
    icon: '/images/finished_goods_top.webp',
    art: '/images/finished_goods_bottom.webp',
    points: [
      'No end-to-end visibility from production to outlets',
      'Stock in transit is untracked',
      'Difficulty identifying actual available stock',
    ],
  },
  {
    title: 'Late Outlet, Distributor, and Field-Sales Information',
    icon: '/images/late_outlet_distributor_top.webp',
    art: '/images/late_outlet_distributor_bottom.webp',
    points: [
      'Information reaches late',
      'Stockouts and overstocking at outlets',
      'Missed sales and unhappy customers',
    ],
  },
  {
    title: 'Manual Billing and Reconciliation',
    icon: '/images/manual_billing_reconciliation_top.webp',
    art: '/images/manual_billing_reconciliation_bottom.webp',
    points: [
      'Manual data entry and billing',
      'Errors in invoices and calculations',
      'Time-consuming reconciliation',
    ],
  },
  {
    title: 'Management Chasing Reports Across People and Systems',
    icon: '/images/management_chasing_top.webp',
    art: '/images/management_chasing_bottom.webp',
    points: [
      'Reports scattered across people and tools',
      'No real-time insights',
      'Slower decisions, lost opportunities',
    ],
  },
];

const IMPACTS = [
  { label: 'Higher operational costs', Icon: TrendingDown },
  { label: 'Inventory imbalances', Icon: Package },
  { label: 'Delayed deliveries', Icon: Clock },
  { label: 'Unhappy customers & lost sales', Icon: Frown },
  { label: 'Limited visibility. Slower growth.', Icon: Target },
];

// Pointed tag on the left of the impact strip
const TAG_SHAPE =
  'polygon(0 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 0 100%)';

function IconCircle({ src, className = '' }) {
  return (
    <span
      className={`flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-full border border-[#f0e2d6] bg-white/90 shadow-[0_6px_18px_rgba(120,70,35,0.07)] ${className}`}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="h-[46px] w-[46px] object-contain"
      />
    </span>
  );
}

export default function SweetsOperationalRealitySection() {
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

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.09), delayChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(26), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fdfaf6] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/sweet_oper_reality_back.webp')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#fdfaf6]/70" />
      </div>

      {/* Wider than the shared Container so six columns stay readable */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={headingGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">OPERATIONAL REALITY</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Production Here. Stock Somewhere Else.{' '}
            <span className="gradient-text-orange">
              Sales Somewhere Else Again.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            When procurement, production, inventory, outlets, distributors,
            billing, and management reporting run on separate tools or manual
            follow-ups, friction builds at every step.
          </motion.p>
        </motion.div>

        {/* ================= CONNECTOR ROW (xl only) ================= */}
        {/* Six equal cells match the six card columns below, so each circle
            sits over its own card. */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 hidden gap-5 xl:grid xl:grid-cols-6"
        >
          {CARDS.map(({ title, icon }, index) => (
            <motion.div
              key={`link-${title}`}
              variants={fadeIn}
              className="relative flex justify-center"
            >
              <IconCircle src={icon} />

              {index < CARDS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 flex w-[calc(100%+1.25rem)] -translate-y-1/2 items-center gap-2 px-[50px]"
                >
                  <span className="h-px flex-1 border-t border-dashed border-[#e3b79c]" />

                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                    <X className="h-3 w-3" strokeWidth={3} />
                  </span>

                  <span className="h-px flex-1 border-t border-dashed border-[#e3b79c]" />
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ================= CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:mt-4 xl:grid-cols-6"
        >
          {CARDS.map(({ title, icon, art, points }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover="hover"
              className="flex min-w-0 flex-col rounded-[18px] border border-[#f0e4d8] bg-white/90 p-5 shadow-[0_10px_30px_rgba(120,70,35,0.06)] backdrop-blur-[2px] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(120,70,35,0.11)]"
            >
              {/* The connector row carries the icons at xl, so the in-card
                  circle is only shown below that breakpoint. */}
              <IconCircle src={icon} className="mx-auto mb-4 xl:hidden" />

              <h3 className="h-display min-h-[44px] text-center text-[15px] font-semibold leading-snug text-navy-950 lg:min-h-[48px] xl:min-h-[64px]">
                {title}
              </h3>

              <span className="mx-auto mt-3 block h-[2px] w-8 rounded-full bg-orange-500" />

              <div className="mt-4 flex min-h-[132px] items-center justify-center">
                <img
                  src={art}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="max-h-[128px] w-auto max-w-full object-contain"
                />
              </div>

              <ul className="mt-4 space-y-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                    <span className="min-w-0 text-[12.5px] leading-relaxed text-navy-600">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        {/* ================= IMPACT STRIP ================= */}
        <motion.div
          initial={{ opacity: 0, y: d(18) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-6 overflow-hidden rounded-[14px] bg-[#fdf3ea] sm:mt-8"
        >
          <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
            {/* Pointed tag */}
            <div
              className="flex shrink-0 items-center gap-2.5 bg-[#e02020] px-5 py-4 lg:pr-10"
              style={{ clipPath: TAG_SHAPE }}
            >
              <AlertTriangle className="h-5 w-5 text-white" strokeWidth={2} />
              <span className="h-display text-[13px] font-bold uppercase tracking-[0.14em] text-white sm:text-sm">
                The Impact
              </span>
            </div>

            {/* Impact items */}
            <div className="grid flex-1 grid-cols-1 gap-y-4 px-5 py-5 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between lg:gap-0 lg:py-4">
              {IMPACTS.map(({ label, Icon }, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 lg:flex-1 lg:justify-center lg:px-4 ${
                    index !== 0 ? 'lg:border-l lg:border-[#eddbc9]' : ''
                  }`}
                >
                  <Icon
                    className="h-6 w-6 shrink-0 text-orange-500"
                    strokeWidth={1.7}
                  />
                  <span className="min-w-0 text-[12.5px] font-medium leading-snug text-navy-700 sm:text-[13px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
