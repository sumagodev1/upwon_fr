import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Leaf,
  ClipboardList,
  ScanSearch,
  Package,
  Warehouse,
  Truck,
  MapPin,
  ClipboardCheck,
  TrendingUp,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const BENEFITS = [
  {
    title: 'Raw material and ingredient visibility',
    description: 'Track and trace every ingredient from source to production.',
    Icon: Leaf,
  },
  {
    title: 'Recipe and production coordination',
    description: 'Standardize recipes and streamline production across teams.',
    Icon: ClipboardList,
  },
  {
    title: 'Batch, quality, and shelf-life visibility',
    description:
      'Maintain quality standards and monitor shelf-life with complete visibility.',
    Icon: ScanSearch,
  },
  {
    title: 'Packaging and finished-goods movement',
    description: 'Track packaging and finished goods across every stage.',
    Icon: Package,
  },
  {
    title: 'Warehouse and stock management',
    description: 'Optimize stock levels and manage inventory across warehouses.',
    Icon: Warehouse,
  },
  {
    title: 'Sales and distribution coordination',
    description: 'Coordinate sales orders and distribution for timely deliveries.',
    Icon: Truck,
  },
  {
    title: 'Multi-location operational visibility',
    description:
      'Gain real-time visibility across multiple plants, warehouses, and locations.',
    Icon: MapPin,
  },
  {
    title: 'Order and fulfillment management',
    description: 'Manage orders efficiently and ensure accurate order fulfillment.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Access to real-time business insights',
    description:
      'Make data-driven decisions with real-time dashboards and analytics.',
    Icon: TrendingUp,
  },
];

export default function FoodProcessingBenefitsSection() {
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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
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

  return (
    <section className="relative overflow-hidden bg-[#f8fafd] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        {/* ================= COPY ================= */}
        {/* Held above the row below, so the illustration and the cards sit in
            one grid — that is what keeps their top and bottom edges level. */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="min-w-0 lg:max-w-[54%]"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>BENEFITS</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Greater Control Over Every Process.{' '}
            <span className="gradient-text-orange">
              Better Visibility Across Every Product Movement.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            With UpWon, food processing businesses can connect their core
            operations and reduce the complexity of managing materials,
            production, quality, inventory, warehouses, sales, and distribution
            across multiple teams and locations.
          </motion.p>
        </motion.div>

        {/* ================= ILLUSTRATION + CARDS ================= */}
        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
          <motion.img
            initial={imageVariants.hidden}
            whileInView={imageVariants.visible}
            viewport={VIEWPORT}
            src="/images/food_benefits_sec.webp"
            alt="UpWon connecting raw materials, production, quality, packaging, warehousing and distribution"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full min-w-0 self-start"
          />

          {/* ================= BENEFIT CARDS ================= */}
          <motion.div
            variants={cardsGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid min-w-0 gap-4 sm:grid-cols-2 lg:content-between xl:grid-cols-3"
          >
            {BENEFITS.map(({ title, description, Icon }) => (
              <motion.article
                key={title}
                variants={cardVariants}
                whileHover="hover"
                className="flex h-full min-h-[200px] min-w-0 flex-col rounded-[16px] bg-white p-4 shadow-[0_10px_30px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(25,35,55,0.11)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1e8]">
                  <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
                </span>

                <h3 className="mt-3 h-display text-[13.5px] font-semibold leading-snug text-navy-950">
                  {title}
                </h3>

                <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-navy-600">
                  {description}
                </p>

                <span className="mt-3 block h-[2px] w-8 rounded-full bg-orange-500/70" />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
