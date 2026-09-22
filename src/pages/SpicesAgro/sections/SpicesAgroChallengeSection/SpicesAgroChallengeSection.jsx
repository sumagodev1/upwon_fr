import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Leaf,
  Truck,
  Search,
  Cog,
  Boxes,
  Warehouse,
  FileSpreadsheet,
  Share2,
  Users,
  Eye,
  FileCheck,
  ChevronRight,
} from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const STAGES = [
  {
    number: '01',
    title: 'Suppliers',
    detail: 'Raw material coordination',
    photo: '/images/agro_suppliers.webp',
    Icon: Leaf,
  },
  {
    number: '02',
    title: 'Procurement',
    detail: 'Purchase & receipt',
    photo: '/images/agro_procurement.webp',
    Icon: Truck,
  },
  {
    number: '03',
    title: 'Quality',
    detail: 'Inspection & validation',
    photo: '/images/agro_quality.webp',
    Icon: Search,
  },
  {
    number: '04',
    title: 'Processing',
    detail: 'Production & batch movement',
    photo: '/images/agro_processing.webp',
    Icon: Cog,
  },
  {
    number: '05',
    title: 'Inventory',
    detail: 'Stock availability & requirements',
    photo: '/images/agro_inventary.webp',
    Icon: Boxes,
  },
  {
    number: '06',
    title: 'Warehouse',
    detail: 'Storage & location visibility',
    photo: '/images/agro_warehouse.webp',
    Icon: Warehouse,
  },
  {
    number: '07',
    title: 'Distribution',
    detail: 'Dispatch & final delivery',
    photo: '/images/agro_distribution.webp',
    Icon: Truck,
  },
];

const REALITY = [
  {
    title: 'Spreadsheets',
    detail: 'Siloed data and manual tracking',
    Icon: FileSpreadsheet,
  },
  {
    title: 'Disconnected Systems',
    detail: 'Information scattered across tools',
    Icon: Share2,
  },
  {
    title: 'Manual Coordination',
    detail: 'More dependencies across teams',
    Icon: Users,
  },
  {
    title: 'Limited Visibility',
    detail: 'Hard to track real-time stock and batches',
    Icon: Eye,
  },
  {
    title: 'Reconciliation',
    detail: 'More time spent on reports and mismatches',
    Icon: FileCheck,
  },
];

export default function SpicesAgroChallengeSection() {
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
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(20) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fdfaf5] py-12 sm:py-16 lg:pb-14 lg:pt-28">
      {/* ================= BACKGROUND ================= */}
      {/* The artwork carries the field and spice scene, so the wash sits
          heaviest on the left where the copy runs and clears to the right */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/agro_the_challenge.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-white/72 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-white/92 from-20% via-white/60 via-52% to-white/40 lg:block" />
      </div>

      {/* Wider than the shared Container so seven stages fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start lg:gap-8 xl:gap-10">
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
              Complex Inputs. Multiple Batches.{' '}
              <span className="gradient-text-orange">
                Constant Movement to Coordinate.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              Spices and agro-processing businesses need seamless coordination across procurement, 
              processing, inventory, quality, and distribution.Disconnected systems can make tracking 
              operations and maintaining visibility more time-consuming.
            </motion.p>

          </motion.div>

          {/* ================= RIGHT — STAGE CHAIN ================= */}
          <motion.div
            variants={chainGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid min-w-0 auto-rows-fr grid-cols-2 content-start gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 xl:gap-2.5"
          >
            {STAGES.map(
              ({ number, title, detail, photo, Icon }, index) => (
                <motion.article
                  key={number}
                  variants={cardVariants}
                  whileHover="hover"
                  /* Equal rows plus h-full keeps every card the same box, and
                     mt-auto on the photo lines them all up at the bottom */
                  className="relative flex h-full min-h-[266px] min-w-0 flex-col rounded-[14px] border border-navy-950/[0.06] bg-white p-3 shadow-[0_10px_28px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(25,35,55,0.12)]"
                >
                  <p className="h-display text-[11px] font-bold leading-none text-orange-400">
                    {number}
                  </p>

                  <Icon
                    className="mt-2.5 h-6 w-6 text-orange-500"
                    strokeWidth={1.7}
                  />

                  <h3 className="mt-2.5 h-display text-[13.5px] font-semibold leading-snug text-navy-950">
                    {title}
                  </h3>

                  <p className="mt-1 text-[10.5px] leading-tight text-navy-600">
                    {detail}
                  </p>

                  <img
                    src={photo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="mt-auto block h-[108px] w-full rounded-[10px] object-cover object-center"
                  />

                  {/* Chain arrows sit in the gutters, so only on the one-row
                      layout */}
                  {index < STAGES.length - 1 && (
                    <span className="absolute -right-2.5 top-1/2 hidden w-2.5 -translate-y-1/2 justify-center xl:flex">
                      <ChevronRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-orange-500"
                        strokeWidth={2.6}
                      />
                    </span>
                  )}
                </motion.article>
              )
            )}
          </motion.div>
        </div>

        {/* ================= THE OPERATIONAL REALITY ================= */}
        <motion.div
          variants={chainGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid items-center gap-6 rounded-[18px] border border-navy-950/[0.06] bg-white/95 px-5 py-6 shadow-[0_12px_34px_rgba(25,35,55,0.07)] backdrop-blur-[2px] lg:ml-auto lg:mt-28 lg:w-[84%] lg:grid-cols-[0.22fr_1fr] lg:gap-7 lg:px-7 xl:w-[80%]"
        >
          <motion.p
            variants={fadeUp}
            className="h-display text-[17px] font-bold leading-snug text-navy-950 sm:text-[18px]"
          >
            The Operational Reality
          </motion.p>

          <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {REALITY.map(({ title, detail, Icon }, index) => (
              <motion.div
                key={title}
                variants={cardVariants}
                className="relative flex min-w-0 items-start gap-3 px-1"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#fff2e9]">
                  <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
                </span>

                <div className="min-w-0">
                  <p className="h-display text-[12.5px] font-semibold leading-snug text-navy-950">
                    {title}
                  </p>

                  <p className="mt-1 text-[11px] leading-tight text-navy-600">
                    {detail}
                  </p>
                </div>

                {index < REALITY.length - 1 && (
                  <ChevronRight
                    aria-hidden="true"
                    className="absolute -right-2 top-2.5 hidden h-3.5 w-3.5 text-orange-400 lg:block"
                    strokeWidth={2.6}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
