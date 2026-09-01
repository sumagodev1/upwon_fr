import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

/*
  Each artwork is a complete card — white panel with the navy or orange icon
  corner already drawn — so only the title is overlaid. They all share roughly
  a 440x263 frame, so the copy is positioned with percentage padding (which
  resolves against width) and sized in cqw, keeping it identical on every card.

  One filename carries a space and brackets, so its path is percent-encoded.
*/
const BENEFITS = [
  {
    title: 'Raw material and ingredient visibility',
    art: '/images/raw_material%20(1).webp',
  },
  {
    title: 'Production and inventory coordination',
    art: '/images/production_and_inventory.webp',
  },
  {
    title: 'Batch and quality visibility',
    art: '/images/batch_quality.webp',
  },
  {
    title: 'Finished-goods movement',
    art: '/images/finished_goods.webp',
  },
  {
    title: 'Warehouse and stock management',
    art: '/images/warehouse_and_stock.webp',
  },
  {
    title: 'Outlet and distributor coordination',
    art: '/images/outlet_and_distributor.webp',
  },
  {
    title: 'Multi-location operational visibility',
    art: '/images/multi_location_operational.webp',
  },
  {
    title: 'Sales and order management',
    art: '/images/sales_and_order.webp',
  },
  {
    title: 'Access to real-time business insights',
    art: '/images/access_to_real_time.webp',
  },
];

export default function SweetsBenefitsSection() {
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
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(24), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[100px] h-[420px] w-[420px] rounded-full bg-[#ffe6d5]/40 blur-[110px]" />
        <div className="absolute bottom-[80px] right-[-180px] h-[420px] w-[420px] rounded-full bg-[#dce6f5]/50 blur-[110px]" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid items-end gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"
        >
          <div className="min-w-0">
            <motion.div variants={fadeIn}>
              <Eyebrow>BENEFITS SECTION</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              Greater Control Over Every Batch.{' '}
              <span className="gradient-text-orange">
                Better Visibility Across Every Location.
              </span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="min-w-0 text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            With UpWon, sweets and namkeen businesses can connect their core
            operations and reduce the complexity of managing ingredients,
            production, inventory, outlets, distributors, and sales channels
            across multiple teams and locations.
          </motion.p>
        </motion.div>

        {/* ================= BENEFIT CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-9 grid gap-5 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFITS.map(({ title, art }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover="hover"
              className="group relative aspect-[440/263] [container-type:inline-size]"
            >
              <img
                src={art}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-fill drop-shadow-[0_8px_18px_rgba(25,35,55,0.10)] transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_28px_rgba(25,35,55,0.16)]"
              />

              {/* Title sits beside the icon corner, centred in the card */}
              <div className="absolute inset-0 flex items-center pl-[47%] pr-[7%]">
                <h4 className="h-display font-semibold leading-snug text-navy-950 [font-size:clamp(13px,4.3cqw,19px)]">
                  {title}
                </h4>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
