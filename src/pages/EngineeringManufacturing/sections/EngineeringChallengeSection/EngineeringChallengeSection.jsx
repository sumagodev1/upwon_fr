import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Factory,
  FileText,
  Boxes,
  Warehouse,
  Settings,
  ShieldCheck,
  Package,
  Truck,
  MapPin,
  AlertTriangle,
  Database,
  ChevronRight,
} from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const STAGES = [
  { label: 'Suppliers', Icon: Factory },
  { label: 'Procurement', Icon: FileText },
  { label: 'Raw Materials', Icon: Boxes },
  { label: 'Warehouse', Icon: Warehouse },
  { label: 'Production', Icon: Settings },
  { label: 'Quality Inspection', Icon: ShieldCheck },
  { label: 'Finished Goods', Icon: Package },
  { label: 'Dispatch', Icon: Truck },
  { label: 'Delivery', Icon: MapPin },
];

const FRICTIONS = [
  {
    title: 'Material Shortages',
    detail:
      'Production can slow down when required materials aren’t available at the right time.',
    Icon: AlertTriangle,
    panel: 'bg-[#fdeeee]',
    badge: 'bg-white',
    ink: 'text-[#dc2626]',
  },
  {
    title: 'Overstocking',
    detail:
      'Excess inventory ties up working capital and increases warehouse costs.',
    Icon: Database,
    panel: 'bg-[#fdf4e4]',
    badge: 'bg-orange-500',
    ink: 'text-white',
  },
  {
    title: 'Information Gaps',
    detail:
      'Teams struggle to reconcile data across procurement, production, inventory, and reporting.',
    Icon: FileText,
    panel: 'bg-[#eef3fd]',
    badge: 'bg-white',
    ink: 'text-[#2f6fed]',
  },
];

export default function EngineeringChallengeSection() {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
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
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      {/* Wider than the shared Container so nine stages fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-10 xl:gap-14">
          {/* ================= LEFT — COPY ================= */}
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
              Complex Production. Multiple Materials.{' '}
              <span className="gradient-text-orange">
                Constant Movement to Coordinate.
              </span>
            </motion.h2>

            {/* Trimmed to the short form the layout carries, rather than
                the full brief copy */}
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              Engineering and manufacturing businesses depend on close
              coordination between suppliers, materials, production, quality,
              inventory, warehouses, sales, and dispatch.
            </motion.p>
          </motion.div>

          {/* ================= RIGHT — SHOP FLOOR + CHAIN ================= */}
          <div className="min-w-0">
            <motion.img
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              src="/images/eng_manf_challenge.webp"
              alt="An engineer checking a production line as machined components and packed goods move through the plant"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full rounded-[16px]"
            />

            {/* The chain rides up onto the photo's lower edge, as in the
                layout — but only where all nine fit a row */}
            <motion.div
              variants={chainGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="relative z-10 mt-6 grid auto-rows-fr grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 xl:-mt-[70px] xl:grid-cols-9 xl:gap-2"
            >
              {STAGES.map(({ label, Icon }, index) => (
                <motion.article
                  key={label}
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative flex h-full min-w-0 flex-col items-center rounded-[12px] border border-navy-950/[0.06] bg-white px-2 py-3.5 text-center shadow-[0_10px_26px_rgba(25,35,55,0.1)] transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(25,35,55,0.14)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdf0e4]">
                    <Icon
                      className="h-[18px] w-[18px] text-orange-500"
                      strokeWidth={1.7}
                    />
                  </span>

                  <h3 className="mt-2 h-display text-[11px] font-semibold leading-tight text-navy-950">
                    {label}
                  </h3>

                  {/* Chain arrows sit in the gutters, so only on the one-row
                      layout */}
                  {index < STAGES.length - 1 && (
                    <span className="absolute -right-1.5 top-1/2 hidden w-1.5 -translate-y-1/2 justify-center xl:flex">
                      <ChevronRight
                        aria-hidden="true"
                        className="h-3 w-3 text-navy-400"
                        strokeWidth={2.8}
                      />
                    </span>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ================= WHEN SYSTEMS DON'T CONNECT ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-12"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>WHEN SYSTEMS DON&apos;T CONNECT</Eyebrow>
          </motion.div>

          <motion.div
            variants={chainGroup}
            className="mt-5 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          >
            {FRICTIONS.map(({ title, detail, Icon, panel, badge, ink }) => (
              <motion.article
                key={title}
                variants={cardVariants}
                whileHover="hover"
                className={`flex h-full min-w-0 items-start gap-4 rounded-[16px] p-5 ${panel}`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(25,35,55,0.08)] ${badge}`}
                >
                  <Icon className={`h-6 w-6 ${ink}`} strokeWidth={1.8} />
                </span>

                <div className="min-w-0">
                  <h3 className="h-display text-[15.5px] font-bold leading-snug text-navy-950">
                    {title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-relaxed text-navy-700">
                    {detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
