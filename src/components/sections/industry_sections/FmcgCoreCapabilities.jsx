import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

// Each artwork is a full card template (blue header + icon, blank body,
// illustration at the bottom). The copy below is laid over it.
const CAPABILITIES = [
  {
    number: '01',
    title: 'Centralized Inventory Control',
    description:
      'Get a clearer view of product availability and inventory movement across warehouses, branches, and distribution locations.',
    image: '/images/fmcg_centralized_inventory_control.webp',
  },
  {
    number: '02',
    title: 'Smarter Order Management',
    description:
      'Manage customer and channel orders through structured workflows that improve visibility from order creation to fulfillment.',
    image: '/images/fmcg_smarter_order_management.webp',
  },
  {
    number: '03',
    title: 'Warehouse Operations',
    description:
      'Support day-to-day warehouse activities including stock receipt, putaway, picking, dispatch, transfers, and returns.',
    image: '/images/fmcg_warehouse_operations.webp',
  },
  {
    number: '04',
    title: 'Batch & Expiry Visibility',
    description:
      'Maintain better control over batch-based inventory and expiry-sensitive products throughout the distribution cycle.',
    image: '/images/fmcg_batch_expiry_visibility.webp',
  },
  {
    number: '05',
    title: 'Connected Distribution Network',
    description:
      'Bring warehouses, distributors, sales teams, and operational teams onto one connected system.',
    image: '/images/fmcg_connected_distribution_network.webp',
  },
  {
    number: '06',
    title: 'Demand & Replenishment Planning',
    description:
      'Use inventory and sales data to support better replenishment decisions and maintain healthier stock levels.',
    image: '/images/fmcg_demand_replenishment_planning.webp',
  },
  {
    number: '07',
    title: 'Real-Time Operational Insights',
    description:
      'Access dashboards and reports that provide visibility into inventory, orders, warehouse movement, sales activity, and overall distribution performance.',
    image: '/images/fmcg_real_time_operational_insights.webp',
  },
];

export default function FmcgCoreCapabilities() {
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
      transition: { staggerChildren: stagger(0.1), delayChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(32), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: EASE },
    },
    hover: { y: d(-8), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative isolate overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      {/* Base tint — the artwork is a wide 3200x1132 strip, so it can't cover
          a section this tall without cropping the forklift and truck out of
          frame. It runs full width along the bottom instead, over this tint. */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#f9fbfe] via-[#eef4fc] to-[#e7f0fa]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20">
        <motion.img
          src="/images/fmcg_core_cap_back.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          initial={{ opacity: 0.7, scale: reduceMotion ? 1 : 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.6, ease: EASE }}
          className="block h-auto w-full origin-bottom"
        />

        {/* Blend the strip's top edge into the base tint — the fade has to stay
            shorter than the strip itself, which is only ~113px tall at 320px */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#eef4fc] to-transparent sm:h-16 lg:h-28" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={headingGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">CORE CAPABILITIES</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[25px] md:text-[31px] lg:text-[36.8px]"
          >
            Powering{' '}
            <span className="gradient-text-orange">Smarter Distribution</span>{' '}
            Operations
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base md:text-[17px]"
          >
            Everything you need to manage inventory, orders, warehouses, and
            distribution on one unified platform.
          </motion.p>
        </motion.div>

        {/* ================= CAPABILITY CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mt-9 flex max-w-7xl flex-wrap justify-center gap-5 sm:mt-11 lg:mt-12"
        >
          {CAPABILITIES.map(({ number, title, description, image }) => (
            <motion.article
              key={number}
              variants={cardVariants}
              whileHover="hover"
              className="group relative w-full max-w-[340px] [container-type:inline-size] sm:w-[calc(50%-0.625rem)] sm:max-w-none lg:w-[calc(33.333%-0.834rem)] xl:w-[calc(25%-0.9375rem)]"
            >
              {/* Card artwork — blue header, icon and illustration are baked in.
                  The card's own border sits on the last pixel column of the
                  source, so it resamples away when scaled down; the drop-shadow
                  follows the artwork's alpha silhouette and restores the edge. */}
              <img
                src={image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full drop-shadow-[0_8px_16px_rgba(23,58,115,0.13)] transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_26px_rgba(23,58,115,0.20)]"
              />

              {/* Header copy — sits beside the icon inside the blue band.
                  All seven artworks share a 646px source width but differ in
                  height, so every offset is a percentage of the card WIDTH
                  (padding %, unlike top %, resolves against width) — that way
                  the copy lands identically on each card. */}
              {/* Type is sized in cqw so it scales with the card itself — the
                  copy has to keep clearing the baked-in illustration at every
                  width, from a 272px card at 320px up to 305px at 1440px. */}
              <div className="absolute inset-x-0 top-0 pl-[26%] pr-[6%] pt-[9%]">
                <span className="block h-display font-semibold leading-none text-white [font-size:clamp(11px,4.2cqw,14px)]">
                  {number}
                </span>

                <h3 className="mt-[3%] h-display font-semibold leading-[1.25] text-white [font-size:clamp(11.5px,4.35cqw,14.5px)]">
                  {title}
                </h3>
              </div>

              {/* Body copy — centered in the blank area above the illustration */}
              <div className="absolute inset-x-0 top-0 pl-[12%] pr-[8%] pt-[46%]">
                <p className="leading-[1.6] text-navy-700 [font-size:clamp(10.5px,4.05cqw,12.8px)]">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
