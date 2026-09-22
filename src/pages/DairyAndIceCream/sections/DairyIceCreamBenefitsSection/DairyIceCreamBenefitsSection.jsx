import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Milk,
  Factory,
  ShieldCheck,
  Truck,
  Snowflake,
  Package,
  Users,
  MapPin,
  ClipboardList,
  BarChart3,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const BENEFITS = [
  {
    number: '01',
    title: 'Raw Material & Ingredient Visibility',
    description:
      'Keep milk, ingredients, and packaging materials visible across stores, plants, and warehouses.',
    Icon: Milk,
  },
  {
    number: '02',
    title: 'Production & Inventory Coordination',
    description:
      'Keep production requirements connected with available materials and inventory levels.',
    Icon: Factory,
  },
  {
    number: '03',
    title: 'Batch & Quality Visibility',
    description:
      'Maintain visibility across production batches and quality inspection touchpoints.',
    Icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Finished-Product Movement',
    description:
      'Track finished goods through production, storage, dispatch, and delivery.',
    Icon: Truck,
  },
  {
    number: '05',
    title: 'Cold Storage & Warehouse Coordination',
    description:
      'Coordinate cold storage, warehouse activity, and finished-product movement.',
    Icon: Snowflake,
  },
  {
    number: '06',
    title: 'Stock & Inventory Management',
    description:
      'Manage stock levels and inventory movement across every operating location.',
    Icon: Package,
  },
  {
    number: '07',
    title: 'Sales & Distribution Coordination',
    description:
      'Coordinate distributors, retailers, and sales teams through connected workflows.',
    Icon: Users,
  },
  {
    number: '08',
    title: 'Multi-Location Operational Visibility',
    description:
      'Follow activity across plants, cold stores, warehouses, and sales locations.',
    Icon: MapPin,
  },
  {
    number: '09',
    title: 'Order & Fulfillment Management',
    description:
      'Manage orders from creation through fulfillment across every channel.',
    Icon: ClipboardList,
  },
  {
    number: '10',
    title: 'Access to Real-Time Business Insights',
    description:
      'Reach dashboards and reports covering production, inventory, sales, and operations.',
    Icon: BarChart3,
  },
];

export default function DairyIceCreamBenefitsSection() {
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

  const listGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9fd] via-white to-[#fdf6f0] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-12 xl:gap-16">
          {/* ================= LEFT — COPY + COLLAGE ================= */}
          <div className="min-w-0">
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={fadeIn}>
                <Eyebrow>THE BENEFITS</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
              >
                Greater Control Over Every Batch.{' '}
                <span className="gradient-text-orange">
                  Better Visibility Across Every Product Movement.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
              >
                With UpWon, dairy and ice cream businesses can connect their core
                operations and reduce the complexity of managing raw materials,
                production, quality, inventory, cold storage, warehouses, sales,
                and distribution across multiple teams and locations.
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
                src="/images/dairy_benefits_sec.webp"
                alt="Milk and ingredients, a bottling line, ice cream scoops and a cold storage warehouse"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-[16px]"
              />
            </motion.div>
          </div>

          {/* ================= RIGHT — BENEFIT LIST ================= */}
          {/* Two columns of five, each row separated by a hairline as in the
              layout — the trailing row of each column carries no rule. */}
          <motion.div
            variants={listGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid min-w-0 gap-x-10 sm:grid-cols-2 xl:gap-x-12"
          >
            {BENEFITS.map(({ number, title, description, Icon }, index) => (
              <motion.div
                key={number}
                variants={itemVariants}
                className={`flex min-w-0 items-start gap-4 border-navy-950/[0.07] py-5 ${
                  index < BENEFITS.length - 1 ? 'border-b' : ''
                } ${
                  index >= BENEFITS.length - 2 ? 'sm:border-b-0' : 'sm:border-b'
                }`}
              >
                <span className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_22px_rgba(25,35,55,0.08)]">
                  <Icon
                    className="h-7 w-7 text-navy-800"
                    strokeWidth={1.5}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="h-display text-[14.5px] font-semibold leading-snug text-navy-900 sm:text-[15px]">
                    <span className="font-bold">{number}.</span> {title}
                  </h3>

                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
