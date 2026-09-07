import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  FileText,
  Factory,
  ShieldCheck,
  Database,
  Warehouse,
  Truck,
  Users,
  MapPin,
  BarChart3,
} from 'lucide-react';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const BENEFITS = [
  {
    number: '01',
    title: 'Procurement Visibility',
    callout: 'Improve raw-material procurement visibility',
    Icon: ShoppingCart,
    panel: 'bg-[#fdf3ea]',
    ink: 'text-orange-500',
  },
  {
    number: '02',
    title: 'Production Planning Coordination',
    callout: 'Improve bill of materials and production planning coordination',
    Icon: FileText,
    panel: 'bg-[#eef3fd]',
    ink: 'text-[#2f6fed]',
  },
  {
    number: '03',
    title: 'Production Process Visibility',
    callout: 'Improve production process visibility',
    Icon: Factory,
    panel: 'bg-[#eaf7ef]',
    ink: 'text-[#1f9d55]',
  },
  {
    number: '04',
    title: 'Quality Inspection Coordination',
    callout: 'Improve quality inspection coordination',
    Icon: ShieldCheck,
    panel: 'bg-[#fdeef1]',
    ink: 'text-[#dc2626]',
  },
  {
    number: '05',
    title: 'Inventory and Stock Tracking',
    callout: 'Improve inventory and stock tracking',
    Icon: Database,
    panel: 'bg-[#f3edfd]',
    ink: 'text-[#7c3aed]',
  },
  {
    number: '06',
    title: 'Warehouse and Material Movement',
    callout: 'Improve warehouse and material movement',
    Icon: Warehouse,
    panel: 'bg-[#fdf6e3]',
    ink: 'text-[#c8820a]',
  },
  {
    number: '07',
    title: 'Finished-goods Handling and Dispatch',
    callout: 'Improve finished-goods handling and dispatch',
    Icon: Truck,
    panel: 'bg-[#eaf2fd]',
    ink: 'text-[#2f6fed]',
  },
  {
    number: '08',
    title: 'Vendor and Supplier Coordination',
    callout: 'Improve vendor and supplier coordination',
    Icon: Users,
    panel: 'bg-[#eaf7ef]',
    ink: 'text-[#1f9d55]',
  },
  {
    number: '09',
    title: 'Multi-location Operational Visibility',
    callout: 'Improve multi-location operational visibility',
    Icon: MapPin,
    panel: 'bg-[#fdecf2]',
    ink: 'text-[#d6336c]',
  },
  {
    number: '10',
    title: 'Real-time Business Insights',
    callout: 'Improve access to real-time business insights',
    Icon: BarChart3,
    panel: 'bg-[#fdf3ea]',
    ink: 'text-orange-500',
  },
];

export default function EngineeringBenefitsSection() {
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
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
    hover: { y: d(-4), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      {/* Wider than the shared Container so ten steps fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">BENEFITS</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Greater Control Over Every Production Process.{' '}
            <span className="gradient-text-orange">Better Visibility</span>{' '}
            Across Every Product Movement.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            With UpWon, engineering and manufacturing businesses can connect
            their core operations and reduce the complexity of managing
            procurement, materials, production planning, quality, inventory,
            warehouses, sales, dispatch, and workforce activity across multiple
            teams and locations.
          </motion.p>
        </motion.div>

        {/* ================= CHAIN ================= */}
        {/* The artwork carries the whole chain — cards, numbers, titles,
            callouts and arrows — so nothing is drawn over it */}
        <motion.img
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
          src="/images/eng_bene_sec.webp"
          alt={`Ten connected benefits: ${BENEFITS.map((b) => b.title).join(
            ', '
          )}`}
          width={2202}
          height={714}
          loading="lazy"
          decoding="async"
          className="mt-10 hidden h-auto w-full xl:block"
        />

        {/* ---------- The chain is far too tight at these widths, so the same
             ten benefits stack as cards ---------- */}
        <motion.div
          variants={chainGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:hidden"
        >
          {BENEFITS.map(({ number, title, callout: line, Icon, panel, ink }) => (
            <motion.article
              key={number}
              variants={cardVariants}
              className={`flex h-full min-w-0 items-start gap-3.5 rounded-[14px] p-4 ${panel}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80">
                <Icon className={`h-5 w-5 ${ink}`} strokeWidth={1.7} />
              </span>

              <div className="min-w-0">
                <p className={`h-display text-[13px] font-bold leading-none ${ink}`}>
                  {number}
                </p>

                <h3 className="mt-1.5 h-display text-[13.5px] font-bold leading-snug text-navy-950">
                  {title}
                </h3>

                <p className="mt-1.5 text-[12px] leading-snug text-navy-700">
                  {line}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
