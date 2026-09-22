import { m as motion, useReducedMotion } from 'framer-motion';
import { ChevronsRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const NAVY = '#12234a';
const ORANGE = '#f26522';

/*
  Each medallion carries its own number badge and arc, so only the card beneath
  is built here. Accents alternate navy/orange along the flow, as in the
  reference, and drive the title, rule, foot dot and the arrow that follows.
*/
const STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source raw materials, ingredients, and packaging materials based on production requirements and inventory needs.',
    icon: '/images/food_pro_procure.webp',
  },
  {
    number: '02',
    title: 'Receive',
    description:
      'Record incoming materials and bring inventory into the right warehouse, store, or production location.',
    icon: '/images/food_pro_receive.webp',
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized inventory with better visibility across ingredients, raw materials, packaging materials, and locations.',
    icon: '/images/food_pro_store_manage.webp',
  },
  {
    number: '04',
    title: 'Process & Produce',
    description:
      'Coordinate recipes, production activities, and the movement of materials into semi-finished and finished products.',
    icon: '/images/food_pro_process_produce.webp',
  },
  {
    number: '05',
    title: 'Quality & Batch Control',
    description:
      'Maintain visibility across production batches and quality inspection touchpoints throughout the processing journey.',
    icon: '/images/food_pro_quality_batch_control.webp',
  },
  {
    number: '06',
    title: 'Pack, Store & Dispatch',
    description:
      'Coordinate packaging, finished-goods storage, warehouse movement, and dispatch activities.',
    icon: '/images/food_pro_pack_store.webp',
  },
  {
    number: '07',
    title: 'Sell & Replenish',
    description:
      'Manage movement to distributors, retailers, customers, and other sales channels while supporting ongoing replenishment decisions.',
    icon: '/images/food_pro_sell.webp',
  },
];

export default function FoodProcessingRawToSales() {
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

  const stepsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.09), delayChildren: 0.12 },
    },
  };

  const stepVariants = {
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
    <section className="relative overflow-hidden bg-[#f8fafd] py-12 sm:py-16 lg:py-20">
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
              FROM RAW MATERIALS TO EVERY SALES CHANNEL
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
            Every stage—from incoming materials through production to the final
            sale—runs on the same platform, so teams can see where products are
            and what happens next.
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= FLOW ================= */}
      {/* Wider than the shared Container so seven steps fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stepsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:flex xl:items-stretch xl:gap-0"
        >
          {STEPS.map(({ number, title, description, icon }, index) => {
            const accent = index % 2 === 0 ? NAVY : ORANGE;

            return (
              <motion.div
                key={number}
                variants={stepVariants}
                whileHover="hover"
                className="flex min-w-0 xl:flex-1"
              >
                <div className="flex min-w-0 flex-1 flex-col items-center">
                  {/* Medallion — number badge and arc are part of the artwork */}
                  <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 block h-[92px] w-auto object-contain sm:h-[104px]"
                  />

                  <article className="-mt-8 flex w-full flex-1 flex-col rounded-[16px] bg-white px-4 pb-6 pt-12 text-center shadow-[0_10px_30px_rgba(25,35,55,0.07)]">
                    <h3
                      className="h-display text-[15px] font-semibold leading-snug sm:text-base"
                      style={{ color: accent }}
                    >
                      {title}
                    </h3>

                    <span
                      className="mx-auto mt-2.5 block h-[2px] w-7 rounded-full"
                      style={{ backgroundColor: accent }}
                    />

                    <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                      {description}
                    </p>

                    <span
                      className="mx-auto mt-4 block h-2 w-2 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                  </article>
                </div>

                {/* Arrow between steps — only where the row is horizontal */}
                {index < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 items-start px-1 pt-[38px] xl:flex"
                  >
                    <ChevronsRight
                      className="h-5 w-5"
                      strokeWidth={2.6}
                      style={{ color: accent }}
                    />
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
