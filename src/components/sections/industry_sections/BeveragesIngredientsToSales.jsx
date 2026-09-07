import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  ClipboardCheck,
  Warehouse,
  FlaskConical,
  Award,
  PackageCheck,
  Store,
  ChevronRight,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.12 };

// Seconds between one step landing and the next
const STEP_DELAY = 0.14;

const STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source ingredients, concentrates, raw materials, packaging materials, and production supplies based on production requirements and inventory needs.',
    Icon: ShoppingCart,
  },
  {
    number: '02',
    title: 'Receive & Inspect',
    description:
      'Record incoming materials and connect receiving activity with quality inspection and the appropriate production or storage location.',
    Icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized visibility across ingredients, packaging materials, inventory locations, and stock availability.',
    Icon: Warehouse,
  },
  {
    number: '04',
    title: 'Blend & Produce',
    description:
      'Coordinate recipe requirements, ingredient consumption, production activities, and product movement through the production process.',
    Icon: FlaskConical,
  },
  {
    number: '05',
    title: 'Quality & Pack',
    description:
      'Maintain visibility across quality checkpoints, packaging workflows, and finished-product handling.',
    Icon: Award,
  },
  {
    number: '06',
    title: 'Store & Dispatch',
    description:
      'Coordinate finished-product storage, warehouse movement, order fulfillment, dispatch, and distribution activities.',
    Icon: PackageCheck,
  },
  {
    number: '07',
    title: 'Sell & Replenish',
    description:
      'Manage movement to distributors, retailers, customers, and other sales channels while supporting ongoing inventory and replenishment decisions.',
    Icon: Store,
  },
];

export default function BeveragesIngredientsToSales() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const delay = (index) => (reduceMotion ? 0 : index * STEP_DELAY);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
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

  return (
    <section className="relative overflow-hidden bg-[#fdfaf6] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/bev_ing_to_sales.webp"
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
            <Eyebrow className="justify-center">
              FROM INGREDIENTS TO EVERY SALES CHANNEL
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            A Connected Flow for Every{' '}
            <span className="gradient-text-orange">Beverage Movement</span>
          </motion.h2>

          <motion.span
            variants={fadeUp}
            aria-hidden="true"
            className="mx-auto mt-4 block h-[3px] w-12 rounded-full bg-orange-500"
          />
        </motion.div>
      </Container>

      {/* ================= FLOW ================= */}
      {/* Wider than the shared Container so seven steps fit a row at xl */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* The ribbon runs through the middle of the badges */}
          <span
            aria-hidden="true"
            className="absolute left-[7%] right-[7%] top-[62px] hidden h-3 -translate-y-1/2 rounded-full bg-[#fde3cd] xl:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 xl:gap-3">
            {STEPS.map(({ number, title, description, Icon }, index) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: d(24) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.55, ease: EASE, delay: delay(index) }}
                className="relative flex min-w-0 flex-col items-center text-center"
              >
                <span className="relative z-10 flex h-[124px] w-[124px] items-center justify-center rounded-full border-[6px] border-[#fdece0] bg-white shadow-[0_12px_30px_rgba(25,35,55,0.1)]">
                  <Icon
                    className="h-11 w-11 text-orange-500"
                    strokeWidth={1.5}
                  />
                </span>

                <p className="mt-5 h-display text-[22px] font-extrabold leading-none tracking-tight text-orange-500">
                  {number}
                </p>

                <h3 className="mt-2 h-display text-[15px] font-semibold leading-snug text-navy-950">
                  {title}
                </h3>

                <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-600">
                  {description}
                </p>

                {/* Step arrows sit on the ribbon, so only on the one-row
                    layout */}
                {index < STEPS.length - 1 && (
                  <span className="absolute -right-1.5 top-[62px] z-20 hidden h-7 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-orange-500 shadow-[0_6px_16px_rgba(232,90,42,0.35)] xl:flex">
                    <ChevronRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-white"
                      strokeWidth={2.6}
                    />
                  </span>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
