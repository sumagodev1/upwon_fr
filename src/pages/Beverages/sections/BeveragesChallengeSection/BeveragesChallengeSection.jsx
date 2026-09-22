import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Truck,
  Leaf,
  FileText,
  FlaskConical,
  Search,
  Package,
  Boxes,
  BarChart3,
  Eye,
  Settings,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const STAGES = [
  { title: 'Suppliers', detail: 'Source materials', Icon: Truck },
  { title: 'Ingredients', detail: 'Receive & manage', Icon: Leaf },
  { title: 'Recipes', detail: 'Plan formulation', Icon: FileText },
  { title: 'Production', detail: 'Manufacture', Icon: FlaskConical },
  { title: 'Quality Check', detail: 'Ensure consistency', Icon: Search },
  { title: 'Packaging', detail: 'Pack & label', Icon: Package },
  { title: 'Inventory', detail: 'Store & track', Icon: Boxes },
  { title: 'Sales', detail: 'Create demand', Icon: BarChart3 },
  { title: 'Distribution', detail: 'Dispatch & deliver', Icon: Truck },
];

const OUTCOMES = [
  { label: 'Better Visibility', Icon: Eye },
  { label: 'Smoother Operations', Icon: Settings },
  { label: 'Strong Business Performance', Icon: BarChart3 },
  { label: 'Consistent Product Quality', Icon: ShieldCheck },
];

export default function BeveragesChallengeSection() {
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

  const chainGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    hover: { y: d(-4), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white pb-12 sm:pb-16 lg:pb-20">
      {/* ================= HEADING BAND ================= */}
      {/* The banner carries the bottles and fruit on its right, so the copy
          runs in the clear space the artwork leaves on the left */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/bev_challenge_bg.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover object-right"
          />

          <div className="absolute inset-0 bg-white/60 lg:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-white/95 from-22% via-white/45 via-52% to-transparent lg:block" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0 lg:max-w-[62%]"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>THE CHALLENGE</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              High-Volume Production. Fast Movement.{' '}
              <span className="gradient-text-orange">
                Constant Coordination.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              Beverage and juice businesses depend on close coordination between
              suppliers, ingredients, recipes, production, quality inspection,
              packaging, inventory, warehouses, sales, and distribution.
              Products move through multiple stages—from procurement and receipt
              to production, quality checks, packaging, storage, dispatch, and
              final delivery—while teams must also maintain visibility into
              inventory availability, product consistency, shelf-life
              requirements, production needs, and business performance.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-3.5 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              When these workflows operate through spreadsheets and disconnected
              systems, production visibility becomes harder, stock movement is
              more difficult to track, and teams can spend more time
              coordinating information than managing operations.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ================= STAGE CHAIN ================= */}
      {/* Wider than the shared Container so nine stages fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={chainGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 xl:gap-2.5"
        >
          {STAGES.map(({ title, detail, Icon }, index) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover="hover"
              className="relative flex h-full min-w-0 flex-col items-center rounded-[14px] border border-navy-950/[0.05] bg-white px-3 py-4 text-center shadow-[0_8px_24px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(25,35,55,0.11)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fdf0e4]">
                <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.6} />
              </span>

              <h3 className="mt-3 h-display text-[13.5px] font-semibold leading-snug text-navy-950">
                {title}
              </h3>

              <p className="mt-1 text-[11.5px] leading-tight text-navy-600">
                {detail}
              </p>

              {/* Chain arrows sit in the gutters, so only on the one-row
                  layout */}
              {index < STAGES.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden w-2 -translate-y-1/2 justify-center xl:flex">
                  <ChevronRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-orange-400"
                    strokeWidth={2.6}
                  />
                </span>
              )}
            </motion.article>
          ))}
        </motion.div>

        {/* ================= OUTCOMES ================= */}
        <motion.div
          variants={chainGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-4 rounded-[16px] bg-[#fdf1e6] px-5 py-6 lg:px-8"
        >
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {OUTCOMES.map(({ label, Icon }, index) => (
              <motion.div
                key={label}
                variants={cardVariants}
                className={`flex min-w-0 items-center gap-3 px-1 sm:px-3 ${
                  index > 0 ? 'sm:border-l sm:border-orange-500/20' : ''
                }`}
              >
                <Icon
                  className="h-6 w-6 shrink-0 text-orange-500"
                  strokeWidth={1.7}
                />

                <span className="h-display min-w-0 max-w-[130px] text-[13px] font-semibold leading-snug text-navy-950">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
