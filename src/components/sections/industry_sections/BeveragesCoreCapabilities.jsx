import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Package,
  ShoppingCart,
  FileText,
  ShieldCheck,
  Boxes,
  PieChart,
  Warehouse,
  BarChart3,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CAPABILITIES = [
  {
    number: '01',
    title: 'Centralized Ingredient & Inventory Control',
    description:
      'Get a clearer view of ingredients, concentrates, sweeteners, additives, packaging materials, work-in-process items, finished products, and stock movement across plants and warehouses.',
    Icon: Package,
  },
  {
    number: '02',
    title: 'Connected Procurement Workflows',
    description:
      'Bring supplier requirements, purchasing activity, incoming materials, inspection touchpoints, and inventory availability closer together.',
    Icon: ShoppingCart,
  },
  {
    number: '03',
    title: 'Recipe & Production Management',
    description:
      'Connect recipe requirements, bills of materials, ingredient availability, production activities, and finished-product movement with better visibility across operations.',
    Icon: FileText,
  },
  {
    number: '04',
    title: 'Quality Inspection & Product Control',
    description:
      'Maintain connected visibility across quality inspection touchpoints, product records, and operational requirements throughout procurement and production.',
    Icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'Packaging & Finished Goods Coordination',
    description:
      'Coordinate packaging materials, production outputs, finished-product inventory, storage, warehouse movement, and dispatch workflows.',
    Icon: Boxes,
  },
  {
    number: '06',
    title: 'Inventory & Shelf-Life Visibility',
    // The brief's copy for this one ended with an internal note asking for the
    // exact platform capabilities to be validated before publication; that
    // clause is left out here rather than published.
    description:
      'Maintain better visibility across stock availability, product movement, and freshness-related inventory workflows.',
    Icon: PieChart,
  },
  {
    number: '07',
    title: 'Warehouse & Distribution Operations',
    description:
      'Support material receipt, storage, transfers, stock tracking, picking, dispatch, and product movement across warehouses and distribution workflows.',
    Icon: Warehouse,
  },
  {
    number: '08',
    title: 'Real-Time Business Insights',
    description:
      'Access dashboards and reports that provide visibility into procurement, production, inventory, stock movement, sales, location activity, and overall business operations.',
    Icon: BarChart3,
  },
];

export default function BeveragesCoreCapabilities() {
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
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(20) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/bev_core_capability_bg.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">CORE CAPABILITIES</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Built for Every Step of Your{' '}
            <span className="gradient-text-orange">Beverage Business</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From ingredients to finished products, UpWon helps you manage,
            monitor, and connect your entire beverage and juice operations with
            ease.
          </motion.p>
        </motion.div>

        {/* ================= CAPABILITY CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5"
        >
          {CAPABILITIES.map(({ number, title, description, Icon }, index) => (
            <motion.article
              key={number}
              variants={cardVariants}
              whileHover="hover"
              className="relative flex h-full min-w-0 flex-col rounded-[16px] border border-navy-950/[0.05] bg-white p-5 shadow-[0_10px_30px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,35,55,0.12)]"
            >
              <div className="flex items-center gap-3">
                <p className="h-display text-[26px] font-extrabold leading-none tracking-tight text-orange-500">
                  {number}
                </p>

                <span
                  aria-hidden="true"
                  className="h-7 w-px bg-navy-950/[0.12]"
                />

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fdf0e4]">
                  <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
                </span>
              </div>

              {/* Two lines' worth of height either way, so every description
                  starts on the same line */}
              <h3 className="mt-4 h-display min-h-[42px] text-[15px] font-semibold leading-snug text-navy-950">
                {title}
              </h3>

              <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-600">
                {description}
              </p>

              {/* Connector dots between the cards, as in the layout */}
              {index % 4 !== 3 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-[13px] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-orange-500 lg:block"
                />
              )}
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
