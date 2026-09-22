import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  FileText,
  Settings,
  ShieldCheck,
  Database,
  Warehouse,
  Activity,
  BarChart3,
} from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The artwork draws the plant, the connectors and eight empty cards — icons
  included — so the copy is laid into those cards. Each rect is a percentage
  of the 1531x1027 artwork, the title row clears the icon the artwork already
  draws, and the type scales with the artwork through a container query.
*/
const CAPABILITIES = [
  {
    number: '01',
    title: 'Centralized Procurement & Raw Material Control',
    description:
      'Suppliers, purchase activity, incoming materials, and raw-material availability in one view.',
    Icon: ShoppingCart,
    tint: 'bg-[#fdf0e6]',
    ink: 'text-orange-500',
    rect: { left: '2.6%', top: '8.6%', width: '26%', height: '18.1%' },
  },
  {
    number: '02',
    title: 'Bill of Materials & Production Planning',
    description:
      'Bill of materials, material requirements, and production planning kept connected.',
    Icon: FileText,
    tint: 'bg-[#e9f1fd]',
    ink: 'text-[#2f6fed]',
    rect: { left: '31.6%', top: '8.6%', width: '25.3%', height: '18.1%' },
  },
  {
    number: '03',
    title: 'Connected Production Management',
    description:
      'Production requirements, material availability, work progress, and product movement together.',
    Icon: Settings,
    tint: 'bg-[#e8f7ed]',
    ink: 'text-[#1f9d55]',
    rect: { left: '59.2%', top: '8.6%', width: '26.6%', height: '18.1%' },
  },
  {
    number: '04',
    title: 'Quality Inspection & Product Control',
    description:
      'Quality inspection touchpoints, material checks, and product records across production.',
    Icon: ShieldCheck,
    tint: 'bg-[#fdeef0]',
    ink: 'text-[#dc2626]',
    rect: { left: '77.6%', top: '35.6%', width: '22.4%', height: '20.3%' },
  },
  {
    number: '05',
    title: 'Inventory & Stock Management',
    description:
      'Raw materials, components, work-in-process, and finished products across every location.',
    Icon: Database,
    tint: 'bg-[#f2ecfd]',
    ink: 'text-[#7c3aed]',
    rect: { left: '1.6%', top: '71.4%', width: '22.7%', height: '19.3%' },
  },
  {
    number: '06',
    title: 'Warehouse & Material Movement',
    description:
      'Receiving, storage, transfers, picking, packing, and dispatch across warehouses.',
    Icon: Warehouse,
    tint: 'bg-[#fdf6e0]',
    ink: 'text-[#c8820a]',
    rect: { left: '26.2%', top: '71.4%', width: '23.2%', height: '19.3%' },
  },
  {
    number: '07',
    title: 'Asset & Operational Visibility',
    description:
      'Operational assets and business activity visible for better coordination and reporting.',
    Icon: Activity,
    tint: 'bg-[#e6f6f4]',
    ink: 'text-[#0d9488]',
    rect: { left: '51%', top: '71.4%', width: '23.4%', height: '19.3%' },
  },
  {
    number: '08',
    title: 'Real-Time Business Insights',
    description:
      'Dashboards covering procurement, production, inventory, quality, sales, and operations.',
    Icon: BarChart3,
    tint: 'bg-[#fdecf3]',
    ink: 'text-[#d6336c]',
    rect: { left: '76%', top: '71.4%', width: '23.4%', height: '19.3%' },
  },
];

const NUMBER_SIZE = 'clamp(7.5px, 0.9cqw, 12px)';
const TITLE_SIZE = 'clamp(9.5px, 1.28cqw, 16.5px)';
const DETAIL_SIZE = 'clamp(8px, 1.05cqw, 13.5px)';

export default function EngineeringCoreCapabilities() {
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
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  const labelGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.3 },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.45, ease: EASE } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      {/* Wider than the shared Container so the artwork's cards stay legible */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-8 xl:gap-10">
          {/* ================= LEFT — COPY ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>CORE CAPABILITIES</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[34px] xl:text-[36.8px]"
            >
              Built to Power Every Part of Your{' '}
              <span className="gradient-text-orange">
                Manufacturing Operations
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              From procurement to production, inventory to insights — UpWon
              brings all critical operations together in one connected platform,
              helping you operate with greater clarity, control, and efficiency.
            </motion.p>
          </motion.div>

          {/* ================= RIGHT — CONNECTED PLANT ================= */}
          {/* Container query unit, so the overlaid copy tracks the artwork */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative hidden min-w-0 [container-type:inline-size] lg:block"
          >
            <img
              src="/images/eng_core_capbabilities.webp"
              alt="A connected plant running procure, plan, produce, move, store and analyze through one platform"
              width={1531}
              height={1027}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />

            <motion.div
              variants={labelGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="absolute inset-0"
            >
              {CAPABILITIES.map(({ number, title, description, rect }) => (
                <motion.div
                  key={number}
                  variants={labelVariants}
                  className="absolute"
                  style={rect}
                >
                  {/* The title row clears the icon tile the artwork draws in
                      the card's top-left corner */}
                  <p
                    className="pl-[33%] pr-[6%] pt-[6%] leading-none text-navy-950/40"
                    style={{ fontSize: NUMBER_SIZE }}
                  >
                    {number}
                  </p>

                  <p
                    className="h-display pl-[33%] pr-[6%] pt-[2%] font-bold leading-tight text-navy-950"
                    style={{ fontSize: TITLE_SIZE }}
                  >
                    {title}
                  </p>

                  <p
                    className="px-[6%] pt-[4%] leading-snug text-navy-600"
                    style={{ fontSize: DETAIL_SIZE }}
                  >
                    {description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------- The artwork's cards are unreadable at these widths,
               so the same eight capabilities stack instead ---------- */}
          <motion.div
            variants={labelGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:hidden"
          >
            {CAPABILITIES.map(
              ({ number, title, description, Icon, tint, ink }) => (
                <motion.article
                  key={number}
                  variants={cardVariants}
                  className="flex h-full min-w-0 flex-col rounded-[14px] border border-navy-950/[0.05] bg-white p-4 shadow-[0_10px_28px_rgba(25,35,55,0.07)]"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] ${tint}`}
                    >
                      <Icon className={`h-5 w-5 ${ink}`} strokeWidth={1.7} />
                    </span>

                    <div className="min-w-0">
                      <p className="h-display text-[12px] font-bold leading-none text-navy-950/35">
                        {number}
                      </p>

                      <h3 className="mt-1.5 h-display text-[13.5px] font-bold leading-snug text-navy-950">
                        {title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3 text-[12px] leading-relaxed text-navy-600">
                    {description}
                  </p>
                </motion.article>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
