import { m as motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
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
      'Source agricultural inputs, spices, ingredients, raw materials, and packaging materials based on production requirements and inventory needs.',
    photo: '/images/agro_procure.webp',
  },
  {
    number: '02',
    title: 'Receive & Inspect',
    description:
      'Record incoming materials and connect receiving activity with quality inspection and the appropriate processing or storage location.',
    photo: '/images/agro_receive_inspect.webp',
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized visibility across raw materials, packaging materials, inventory locations, and stock availability.',
    photo: '/images/agro_store_manage.webp',
  },
  {
    number: '04',
    title: 'Process & Produce',
    description:
      'Coordinate processing and production activities as materials move toward finished products.',
    photo: '/images/agro_process_produce.webp',
  },
  {
    number: '05',
    title: 'Quality & Batch Visibility',
    description:
      'Maintain visibility across quality checkpoints and product or batch-related operational workflows.',
    photo: '/images/agro_batch_visibility.webp',
  },
  {
    number: '06',
    title: 'Store & Dispatch',
    description:
      'Coordinate finished-product storage, warehouse movement, order fulfillment, dispatch, and distribution activities.',
    photo: '/images/agro_store_dispatch.webp',
  },
  {
    number: '07',
    title: 'Sell & Replenish',
    description:
      'Manage product movement to distributors, retailers, customers, and other sales channels while supporting ongoing inventory and replenishment decisions.',
    photo: '/images/agro_sell_replenish.webp',
  },
];

export default function SpicesAgroRawToSales() {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fdf6ee] via-white to-[#fdf6ee] py-12 sm:py-16 lg:py-20">
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
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            A Connected Flow for{' '}
            <span className="gradient-text-orange">
              Every Processing Movement
            </span>
          </motion.h2>
        </motion.div>
      </Container>

      {/* ================= FLOW ================= */}
      {/* Wider than the shared Container so seven steps fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative mt-8">
          {/* The rail runs through the middle of the photo circles */}
          <span
            aria-hidden="true"
            className="absolute left-[6%] right-[6%] top-16 hidden border-t-2 border-dashed border-orange-300 xl:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4">
            {STEPS.map(({ number, title, description, photo }, index) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: d(24) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.55, ease: EASE, delay: delay(index) }}
                className="relative flex min-w-0 flex-col items-center"
              >
                {/* Photo circle, with its number badge riding the top edge */}
                <div className="relative z-10">
                  <img
                    src={photo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="block h-32 w-32 rounded-full border-[3px] border-white object-cover object-center shadow-[0_10px_28px_rgba(25,35,55,0.14)]"
                  />

                  <span className="absolute -top-3 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-orange-500 text-[12px] font-bold text-white shadow-[0_6px_16px_rgba(232,90,42,0.35)]">
                    {number}
                  </span>
                </div>

                {/* The card tucks under the circle, as in the layout */}
                <div className="-mt-10 flex h-full w-full flex-col rounded-[16px] bg-white px-4 pb-5 pt-12 text-center shadow-[0_10px_30px_rgba(25,35,55,0.08)]">
                  <h3 className="h-display text-[14.5px] font-semibold leading-snug text-navy-950">
                    {title}
                  </h3>

                  <p className="mt-2.5 text-[12px] leading-relaxed text-navy-600">
                    {description}
                  </p>
                </div>

                {/* Step arrows sit on the rail, so only on the one-row layout */}
                {index < STEPS.length - 1 && (
                  <span className="absolute -right-2 top-16 z-20 hidden h-7 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-orange-500 shadow-[0_6px_16px_rgba(232,90,42,0.35)] xl:flex">
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
