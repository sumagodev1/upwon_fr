import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Box,
  Settings,
  ShieldCheck,
  Snowflake,
  Warehouse,
  ShoppingCart,
  MapPin,
  BarChart3,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CAPABILITIES = [
  {
    number: '01',
    title: 'Centralized Raw Material & Inventory Control',
    description:
      'Get a clearer view of milk, ingredients, packaging materials, semi-finished goods, finished products, and inventory movement across plants, cold storage locations, warehouses, and other locations.',
    Icon: Box,
  },
  {
    number: '02',
    title: 'Connected Production Management',
    description:
      'Bring production requirements, recipes, materials, production activities, and finished-product movement closer together with better visibility across operational workflows.',
    Icon: Settings,
  },
  {
    number: '03',
    title: 'Batch & Quality Visibility',
    description:
      'Maintain better visibility across production batches, quality inspection touchpoints, and product movement throughout the production and distribution journey.',
    Icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Cold Storage & Finished Goods Coordination',
    description:
      'Coordinate finished-product storage, inventory movement, warehouse operations, dispatch, and distribution workflows.',
    Icon: Snowflake,
  },
  {
    number: '05',
    title: 'Warehouse Operations',
    description:
      'Support day-to-day warehouse activities including stock receipt, storage, transfers, picking, dispatch, and finished-product movement.',
    Icon: Warehouse,
  },
  {
    number: '06',
    title: 'Smarter Sales & Order Management',
    description:
      'Manage customer and channel orders through connected workflows with greater visibility from order creation to fulfillment.',
    Icon: ShoppingCart,
  },
  {
    number: '07',
    title: 'Connected Multi-Location Operations',
    description:
      'Bring plants, production locations, cold storage facilities, warehouses, distribution points, sales teams, and operational teams onto one connected system.',
    Icon: MapPin,
  },
  {
    number: '08',
    title: 'Real-Time Operational Insights',
    description:
      'Access dashboards and reports that provide visibility into production, inventory, product movement, sales, location activity, and overall business operations.',
    Icon: BarChart3,
  },
];

export default function DairyIceCreamCoreCapabilities() {
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
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(22), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.28fr] lg:gap-12 xl:gap-16">
          {/* ================= LEFT — COPY + COLLAGE ================= */}
          <div className="min-w-0">
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={fadeIn}>
                <Eyebrow>CORE CAPABILITIES</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
              >
                Built to Simplify. Connected to Scale.{' '}
                <span className="gradient-text-orange">
                  Designed for Dairy &amp; Ice Cream Operations.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
              >
                From raw materials to final delivery, UpWon brings all the moving
                parts of your operations together—so you can work smarter, move
                faster, and grow with confidence.
              </motion.p>
            </motion.div>

            <motion.div
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-8 min-w-0"
            >
              <img
                src="/images/dairy_capabilities.webp"
                alt="Dairy bottling line, quality inspection, ice cream scoops and cold storage warehouse"
                width={1231}
                height={1277}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </motion.div>
          </div>

          {/* ================= RIGHT — CAPABILITY CARDS ================= */}
          <motion.div
            variants={cardsGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5"
          >
            {CAPABILITIES.map(({ number, title, description, Icon }) => (
              <motion.article
                key={number}
                variants={cardVariants}
                whileHover="hover"
                className="flex min-w-0 items-center gap-4 rounded-[18px] border border-navy-950/[0.06] bg-white p-5 shadow-[0_10px_30px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,35,55,0.11)] sm:gap-5"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff2e9] sm:h-16 sm:w-16">
                  <Icon
                    className="h-7 w-7 text-orange-500 sm:h-8 sm:w-8"
                    strokeWidth={1.6}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="h-display text-[18px] font-bold leading-none text-orange-500">
                    {number}
                  </p>

                  <h3 className="mt-2 h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                    {title}
                  </h3>

                  <p className="mt-2 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                    {description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
