import { m as motion, useReducedMotion } from 'framer-motion';
import {
  PackageSearch,
  ClipboardList,
  Users,
  Warehouse,
  MapPin,
  Truck,
  Globe,
  ClipboardCheck,
  BarChart3,
  Monitor,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const BENEFITS = [
  { label: 'Product and inventory visibility', Icon: PackageSearch },
  { label: 'Sales and order coordination', Icon: ClipboardList },
  { label: 'Distributor and channel visibility', Icon: Users },
  { label: 'Warehouse and stock management', Icon: Warehouse },
  { label: 'Field sales and market execution', Icon: MapPin },
  { label: 'Distribution and dispatch coordination', Icon: Truck },
  { label: 'Multi-location operational visibility', Icon: Globe },
  { label: 'Order and fulfillment management', Icon: ClipboardCheck },
  { label: 'Retail and channel performance visibility', Icon: BarChart3 },
  { label: 'Access to real-time business insights', Icon: Monitor },
];

export default function NonFoodFmcgBenefitsSection() {
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

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.28, ease: EASE } },
  };

  /* ================= SHARED CONTENT ================= */

  const content = (
    <div className="grid h-full w-full gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
      {/* ---------- Copy ---------- */}
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="min-w-0 lg:self-start lg:pt-10 xl:pt-14"
      >
        <motion.div variants={fadeIn}>
          <Eyebrow>BENEFITS</Eyebrow>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
        >
          Greater Control Over Every Channel.{' '}
          <span className="gradient-text-orange">
            Better Visibility Across Every Product Movement.
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
        >
          With UpWon, non-food FMCG businesses can connect their core operations
          and reduce the complexity of managing products, inventory, warehouses,
          sales, distributors, field teams, and distribution across multiple
          teams and locations.
        </motion.p>
      </motion.div>

      {/* ---------- Benefit cards ---------- */}
      {/* calc widths give three per row with the tenth centred below */}
      <motion.div
        variants={cardsGroup}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="flex min-w-0 flex-wrap justify-center gap-4 lg:self-center"
      >
        {BENEFITS.map(({ label, Icon }) => (
          <motion.div
            key={label}
            variants={cardVariants}
            whileHover="hover"
            className="flex min-w-0 items-center gap-4 rounded-[16px] bg-white/95 px-5 py-5 shadow-[0_10px_30px_rgba(25,35,55,0.08)] backdrop-blur-[2px] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(25,35,55,0.13)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] lg:px-6 lg:py-6"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef2fb] lg:h-14 lg:w-14">
              <Icon
                className="h-6 w-6 text-navy-800 lg:h-7 lg:w-7"
                strokeWidth={1.6}
              />
            </span>

            <span className="h-display min-w-0 text-[13.5px] font-semibold leading-snug text-navy-950 sm:text-[14px] lg:text-[15px]">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#f8fafd]">
      {/* =========================================================
          DESKTOP — the artwork renders at its natural 1672x941 ratio
          and drives the section's height, so it fills the frame edge
          to edge with nothing cropped. The copy is laid over it.
      ========================================================= */}
      <div className="relative hidden w-full lg:block">
        <img
          src="/images/non_fmcg_bene.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />

        <div className="absolute inset-0">
          <Container className="flex h-full items-stretch">{content}</Container>
        </div>
      </div>

      {/* =========================================================
          MOBILE / TABLET — the columns stack far taller than the
          artwork, so it sits behind as a cover layer instead.
      ========================================================= */}
      <div className="relative block w-full py-12 sm:py-16 lg:hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/non_fmcg_bene.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover object-left-bottom"
          />

          <div className="absolute inset-0 bg-[#f8fafd]/75" />
        </div>

        <Container className="relative z-10">{content}</Container>
      </div>
    </section>
  );
}
