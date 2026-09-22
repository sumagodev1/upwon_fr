import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Boxes,
  Warehouse,
  ClipboardList,
  Truck,
  BarChart3,
  Package,
  MapPin,
  PackageCheck,
  ChevronRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

const LEFT_FEATURES = [
  {
    title: 'Procurement',
    description: 'Streamline buying and supplier management.',
    Icon: ShoppingCart,
  },
  {
    title: 'Inventory',
    description: 'Real-time stock visibility across all locations.',
    Icon: Boxes,
  },
  {
    title: 'Warehousing',
    description: 'Efficient warehouse operations and control.',
    Icon: Warehouse,
  },
];

const RIGHT_FEATURES = [
  {
    title: 'Orders',
    description: 'Faster order processing and fulfillment.',
    Icon: ClipboardList,
  },
  {
    title: 'Distribution',
    description: 'Smarter delivery planning and tracking.',
    Icon: Truck,
  },
  {
    title: 'Visibility & Control',
    description: 'End-to-end visibility for smarter decisions.',
    Icon: BarChart3,
  },
];

const FLOW_CHAIN = [
  { label: 'Procurement', Icon: ShoppingCart },
  { label: 'Inventory', Icon: Package },
  { label: 'Warehousing', Icon: Warehouse },
  { label: 'Orders', Icon: ClipboardList },
  { label: 'Distribution', Icon: Truck },
  { label: 'Delivery', Icon: MapPin },
];

export default function FmcgWhyUpwon() {
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
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 1.04 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const fromLeft = {
    hidden: { opacity: 0, x: d(-20) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  };

  const fromRight = {
    hidden: { opacity: 0, x: d(20) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  };

  const chainGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.1 },
    },
  };

  const chainItem = {
    hidden: { opacity: 0, y: d(12) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  /* ================= SHARED FEATURE ROW ================= */

  const renderFeature = ({ title, description, Icon }, variants) => (
    <motion.div
      key={title}
      variants={variants}
      className="flex items-start gap-4 py-5 first:pt-0 last:pb-0 lg:py-6"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff2e9]">
        <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.6} />
      </span>

      <div className="min-w-0">
        <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
          {title}
        </h3>

        <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
          {description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[120px] h-[420px] w-[420px] rounded-full bg-[#ffe6d5]/40 blur-[120px]" />
        <div className="absolute bottom-[80px] right-[-180px] h-[420px] w-[420px] rounded-full bg-[#dce6f5]/50 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-7xl rounded-[24px] border border-navy-950/[0.07] bg-white p-5 shadow-[0_18px_55px_rgba(25,35,55,0.09)] sm:rounded-[28px] sm:p-8 lg:p-10"
        >
          {/* ================= HEADING ================= */}
          <div className="mx-auto max-w-4xl text-center">
            <motion.div variants={fadeIn}>
              <Eyebrow className="justify-center">WHY UPWON</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[26px] leading-[1.14] tracking-tight text-navy-950 sm:text-[30px] lg:text-[34px]"
            >
              Built to Keep Fast-Moving Distribution Operations{' '}
              <span className="gradient-text-orange">Moving Forward.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-3xl text-[14px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              In FMCG distribution, delays, stock inaccuracies, and disconnected
              workflows can quickly affect service levels and business
              performance. UpWon brings procurement, inventory, warehousing,
              orders, and distribution workflows together—helping teams operate
              with greater visibility and control.
            </motion.p>
          </div>

          {/* ================= FEATURES + CENTRE IMAGE ================= */}
          {/* The artwork carries the dotted connectors and their end dots, which
              line up with the three feature rows on each side. */}
          <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-[1fr_minmax(0,1.25fr)_1fr] lg:gap-6 xl:gap-8">
            {/* Left column */}
            <div className="order-2 divide-y divide-navy-950/10 lg:order-1">
              {LEFT_FEATURES.map((feature) => renderFeature(feature, fromLeft))}
            </div>

            {/* Centre image */}
            <motion.div variants={imageVariants} className="order-1 lg:order-2">
              <img
                src="/images/fmcg_why_upwon.webp"
                alt="UpWon team member checking stock on a tablet while a delivery vehicle is loaded"
                loading="lazy"
                decoding="async"
                className="mx-auto block h-auto w-full max-w-[620px]"
              />
            </motion.div>

            {/* Right column */}
            <div className="order-3 divide-y divide-navy-950/10">
              {RIGHT_FEATURES.map((feature) => renderFeature(feature, fromRight))}
            </div>
          </div>

          {/* ================= BOTTOM FLOW STRIP ================= */}
          <motion.div
            variants={chainGroup}
            className="mt-8 flex flex-col gap-6 rounded-[18px] bg-[#fff5ee] px-5 py-6 lg:mt-10 lg:flex-row lg:items-center lg:gap-8 lg:px-8"
          >
            {/* Statement */}
            <motion.div
              variants={chainItem}
              className="flex items-center gap-4 lg:shrink-0 lg:border-r lg:border-orange-500/20 lg:pr-8"
            >
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_18px_rgba(232,90,42,0.14)]">
                <Package className="h-7 w-7 text-navy-950" strokeWidth={1.5} />
                <PackageCheck className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-orange-500 p-1 text-white" />
              </span>

              <p className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                One connected platform.
                <br />
                From <span className="text-orange-600">incoming stock</span> to{' '}
                <span className="text-orange-600">final delivery.</span>
              </p>
            </motion.div>

            {/* Chain */}
            <div className="flex min-w-0 flex-1 flex-wrap items-start justify-center gap-y-4 lg:flex-nowrap lg:justify-between">
              {FLOW_CHAIN.map(({ label, Icon }, index) => (
                <motion.div
                  key={label}
                  variants={chainItem}
                  className="flex items-center"
                >
                  <div className="flex w-[86px] flex-col items-center text-center sm:w-[100px]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(25,35,55,0.08)]">
                      <Icon className="h-5 w-5 text-navy-950" strokeWidth={1.6} />
                    </span>

                    <span className="mt-2 text-[11px] font-medium leading-tight text-navy-700 sm:text-[12px]">
                      {label}
                    </span>
                  </div>

                  {index < FLOW_CHAIN.length - 1 && (
                    <ChevronRight
                      className="mb-5 h-4 w-4 shrink-0 text-orange-500"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
