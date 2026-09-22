import { m as motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.12 };

// Seconds between one step landing and the next
const STEP_DELAY = 0.14;

const STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source raw materials, components, consumables, and operational supplies based on production requirements and inventory needs.',
    photo: '/images/eng_procure.webp',
  },
  {
    number: '02',
    title: 'Receive & Inspect',
    description:
      'Record incoming materials and connect receiving activity with quality inspection and the appropriate storage or production location.',
    photo: '/images/eng_receive_inspect.webp',
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized visibility across raw materials, components, inventory locations, and stock availability.',
    photo: '/images/eng_store_manage.webp',
  },
  {
    number: '04',
    title: 'Plan & Produce',
    description:
      'Connect bill of materials, material requirements, production planning, and manufacturing activities as products move through production.',
    photo: '/images/eng_plan_procure.webp',
  },
  {
    number: '05',
    title: 'Inspect & Control Quality',
    description:
      'Maintain visibility across quality checkpoints and product-related operational workflows.',
    photo: '/images/eng_inspect_quality.webp',
  },
  {
    number: '06',
    title: 'Store & Dispatch',
    description:
      'Coordinate finished-product storage, warehouse movement, order fulfillment, dispatch, and logistics activities.',
    photo: '/images/eng_store_dispatch.webp',
  },
  {
    number: '07',
    title: 'Sell & Monitor',
    description:
      'Manage customer orders and finished-product movement while maintaining visibility into inventory, sales, operational activity, and business performance.',
    photo: '/images/eng_sell_monitor.webp',
  },
];

export default function EngineeringRawToDelivery() {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fbfcfe] to-white py-10 sm:py-12 lg:py-14">
      {/* Wider than the shared Container, so the heading's left edge matches
          the flow below it */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* ================= HEADING ================= */}
        {/* Heading left, its subtext alongside — as in the layout */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-10"
        >
          <div className="min-w-0">
            <motion.div variants={fadeIn}>
              <Eyebrow>FROM RAW MATERIALS TO FINISHED PRODUCT DELIVERY</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              A Connected Flow for Every{' '}
              <span className="gradient-text-orange">
                Manufacturing Movement
              </span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="min-w-0 border-l-2 border-navy-950/[0.1] pl-5 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            UpWon connects every step of your manufacturing operations from
            sourcing raw materials to delivering finished products — bringing
            clarity, control, and efficiency across the entire value chain.
          </motion.p>
        </motion.div>
      </div>

      {/* ================= FLOW ================= */}
      {/* Wider than the shared Container so seven steps fit a row at xl */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* The rail runs through the middle of the photo circles */}
          <span
            aria-hidden="true"
            className="absolute left-[7%] right-[7%] top-[74px] hidden border-t-2 border-dashed border-orange-300 xl:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4">
            {STEPS.map(({ number, title, description, photo }, index) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: d(24) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.55, ease: EASE, delay: delay(index) }}
                className="relative flex min-w-0 flex-col items-center text-center"
              >
                {/* The artwork carries its own ring, so the badge is all the
                    card adds to it */}
                <div className="relative z-10">
                  <img
                    src={photo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="block h-[148px] w-[148px] max-w-full object-contain"
                  />

                  <span className="absolute -top-1 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-orange-500 text-[12px] font-bold text-white shadow-[0_6px_16px_rgba(232,90,42,0.35)]">
                    {number}
                  </span>
                </div>

                <h3 className="mt-3 h-display min-h-[22px] text-[15px] font-semibold leading-snug text-navy-950">
                  {title}
                </h3>

                <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-600">
                  {description}
                </p>

                {/* Step arrows sit on the rail, so only on the one-row layout */}
                {index < STEPS.length - 1 && (
                  <span className="absolute -right-2 top-[74px] z-20 hidden h-7 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-orange-500 shadow-[0_6px_16px_rgba(232,90,42,0.35)] xl:flex">
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
