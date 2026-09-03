import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

// Seconds between one step lighting up and the next
const STEP_DELAY = 0.22;

const STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source products, raw materials, and packaging requirements based on business demand and inventory needs.',
    art: '/images/procure_top.webp',
    icon: '/images/procure_bottom.webp',
    color: '#7c3aed',
  },
  {
    number: '02',
    title: 'Receive',
    description:
      'Record incoming products and bring inventory into the right warehouse, branch, or operational location.',
    art: '/images/receive_top.webp',
    icon: '/images/receive_bottom.webp',
    color: '#0f9b8e',
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized inventory with better visibility across products, stock levels, warehouses, and locations.',
    art: '/images/store_manage_top.webp',
    icon: '/images/store_manage_bottom.webp',
    color: '#2f6fed',
  },
  {
    number: '04',
    title: 'Produce & Prepare',
    description:
      'Coordinate production and product-related workflows where applicable before finished goods move into inventory.',
    art: '/images/produce_prepare_top.webp',
    icon: '/images/produce_prepare_bottom.webp',
    color: '#f26522',
  },
  {
    number: '05',
    title: 'Sell & Capture Orders',
    description:
      'Manage orders from distributors, retailers, customers, and other sales channels through connected workflows.',
    art: '/images/sell_capture_top.webp',
    icon: '/images/sell_capture_bottom.webp',
    color: '#7c3aed',
  },
  {
    number: '06',
    title: 'Pick, Pack & Dispatch',
    description:
      'Coordinate warehouse operations, product picking, dispatch, and movement across distribution channels.',
    art: '/images/pick_pack_top.webp',
    icon: '/images/pick_pack_bottom.webp',
    color: '#0f9b8e',
  },
  {
    number: '07',
    title: 'Distribute & Replenish',
    description:
      'Manage product movement to distributors, retailers, customers, and other locations while supporting ongoing replenishment decisions.',
    art: '/images/replenish_top.webp',
    icon: '/images/replenish_bottom.webp',
    color: '#2f6fed',
  },
];

const TOTAL = STEPS.length * STEP_DELAY;

export default function NonFoodFmcgProductToSales() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const delay = (index) => (reduceMotion ? 0 : index * STEP_DELAY);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.05 },
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
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
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
              FROM PRODUCT TO EVERY SALES CHANNEL
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            A Connected Flow for{' '}
            <span className="gradient-text-orange">Every Product Movement</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From procurement to replenishment, every step is connected to ensure
            smooth product movement across every channel.
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= FLOW ================= */}
      {/* Wider than the shared Container so seven steps fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* Cards reveal one at a time, STEP_DELAY apart */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {STEPS.map(({ number, title, description, art, color }, index) => (
            <motion.article
              key={number}
              initial={{ opacity: 0, y: d(24) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, ease: EASE, delay: delay(index) }}
              className="relative flex min-w-0 flex-col rounded-[14px] border border-navy-950/[0.07] bg-white px-4 py-5 shadow-[0_10px_30px_rgba(25,35,55,0.06)]"
            >
              <p
                className="h-display text-[26px] font-semibold leading-none"
                style={{ color }}
              >
                {number}
              </p>

              <span
                className="mt-3 block h-[2px] w-full rounded-full opacity-40"
                style={{ backgroundColor: color }}
              />

              <h3 className="mt-3 h-display min-h-[38px] text-[14px] font-semibold leading-snug text-navy-950">
                {title}
              </h3>

              <div className="mt-2 flex h-[86px] items-center justify-center">
                <img
                  src={art}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="max-h-[86px] w-auto max-w-full object-contain"
                />
              </div>

              <p className="mt-3 flex-1 text-[12px] leading-relaxed text-navy-600">
                {description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* ================= PROGRESS RAIL (xl only) ================= */}
        {/* The rail fills across the same span of time the cards take to
            appear, and each icon lights up as its card lands. */}
        <div className="relative mt-8 hidden xl:block">
          <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-navy-950/[0.07]" />

          <motion.div
            initial={{ width: reduceMotion ? '100%' : 0 }}
            whileInView={{ width: '100%' }}
            viewport={VIEWPORT}
            transition={{
              duration: reduceMotion ? 0 : TOTAL,
              ease: 'linear',
            }}
            className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 shadow-[0_0_12px_rgba(232,90,42,0.5)]"
          />

          <div className="relative grid grid-cols-7">
            {STEPS.map(({ number, icon, color }, index) => (
              <div key={`rail-${number}`} className="flex justify-center">
                <motion.span
                  initial={{
                    opacity: reduceMotion ? 1 : 0.25,
                    scale: reduceMotion ? 1 : 0.7,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    boxShadow: reduceMotion
                      ? '0 0 0 0 rgba(0,0,0,0)'
                      : [
                          `0 0 0 0 ${color}00`,
                          `0 0 0 12px ${color}22`,
                          `0 0 0 0 ${color}00`,
                        ],
                  }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: delay(index) + 0.1,
                  }}
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 bg-white"
                  style={{ borderColor: color }}
                >
                  <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 object-contain"
                  />
                </motion.span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
