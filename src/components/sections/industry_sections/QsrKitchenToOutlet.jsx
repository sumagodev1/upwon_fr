import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Truck,
  Package,
  ChefHat,
  Store,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.12 };

// Seconds between one step landing and the next
const STEP_DELAY = 0.14;

/*
  The steps sit on a shallow arc at xl, the way the reference layout reads.
  The offsets are written out as whole class strings so Tailwind can see them.
*/
const STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source ingredients, raw materials, packaging materials, and operational supplies based on production and outlet requirements.',
    photo: '/images/qsr_procure_img.webp',
    Icon: ShoppingCart,
    tint: 'bg-[#fff3ec]',
    ink: 'text-orange-500',
    offset: 'xl:mt-0',
  },
  {
    number: '02',
    title: 'Receive',
    description:
      'Record incoming materials and bring inventory into the right warehouse, central kitchen, or operational location.',
    photo: '/images/qsr_receive_img.webp',
    Icon: Truck,
    tint: 'bg-[#eef4fd]',
    ink: 'text-[#2f6fed]',
    offset: 'xl:mt-6',
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized visibility across ingredients, packaging materials, inventory levels, and operational locations.',
    photo: '/images/qsr_store_manage_img.webp',
    Icon: Package,
    tint: 'bg-[#eef8f1]',
    ink: 'text-[#1f9d55]',
    offset: 'xl:mt-11',
  },
  {
    number: '04',
    title: 'Produce & Prepare',
    description:
      'Coordinate recipes, production activities, ingredient consumption, and the preparation of products for outlets.',
    photo: '/images/qsr_produce_prepare_img.webp',
    Icon: ChefHat,
    tint: 'bg-[#fff3ec]',
    ink: 'text-orange-500',
    offset: 'xl:mt-14',
  },
  {
    number: '05',
    title: 'Supply & Transfer',
    description:
      'Coordinate stock movement and supply from central kitchens or warehouses to outlets based on operational requirements.',
    photo: '/images/qsr_supply_transfer_img.webp',
    Icon: Truck,
    tint: 'bg-[#eef4fd]',
    ink: 'text-[#2f6fed]',
    offset: 'xl:mt-16',
  },
  {
    number: '06',
    title: 'Sell & Serve',
    description:
      'Manage outlet operations, customer orders, and sales activity across dine-in, takeaway, delivery, and other channels.',
    photo: '/images/qsr_sell_serve_img.webp',
    Icon: Store,
    tint: 'bg-[#fdeef4]',
    ink: 'text-[#d6336c]',
    offset: 'xl:mt-12',
  },
  {
    number: '07',
    title: 'Monitor & Replenish',
    description:
      'Track operational activity, inventory movement, outlet requirements, and performance while supporting ongoing replenishment decisions.',
    photo: '/images/qsr_monitor_img.webp',
    Icon: BarChart3,
    tint: 'bg-[#f4eefd]',
    ink: 'text-[#7c3aed]',
    offset: 'xl:mt-9',
  },
];

export default function QsrKitchenToOutlet() {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fffaf6] to-white py-12 sm:py-16 lg:py-20">
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
              FROM CENTRAL KITCHEN TO EVERY OUTLET
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            A Connected Flow for{' '}
            <span className="gradient-text-orange">
              Every Food Business Movement
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From procurement to production and from supply to sales—UpWon
            connects every step of your food business movement in one unified
            platform.
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= FLOW ================= */}
      {/* Wider than the shared Container so seven steps fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4">
          {STEPS.map(
            (
              { number, title, description, photo, Icon, tint, ink, offset },
              index
            ) => (
              <motion.article
                key={number}
                initial={{ opacity: 0, y: d(24) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.55, ease: EASE, delay: delay(index) }}
                className={`relative flex min-w-0 flex-col ${offset}`}
              >
                <div className="rounded-[14px] border border-navy-950/[0.06] bg-white p-4 shadow-[0_10px_28px_rgba(25,35,55,0.06)] xl:min-h-[188px]">
                  <div className="flex items-start justify-between gap-2">
                    <p className="h-display text-[24px] font-extrabold leading-none tracking-tight text-orange-500">
                      {number}
                    </p>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tint}`}
                    >
                      <Icon className={`h-4 w-4 ${ink}`} strokeWidth={1.8} />
                    </span>
                  </div>

                  <h3 className="mt-2.5 h-display text-[14px] font-semibold leading-snug text-navy-950">
                    {title}
                  </h3>

                  <p className="mt-2 text-[11.5px] leading-relaxed text-navy-600">
                    {description}
                  </p>
                </div>

                {/* The artwork carries its own podium, so it sits straight
                    under the card with a little overlap. The step arrow is
                    anchored to this box rather than the card, so it lands on
                    the podiums either side of it and the connector reaches
                    both — only on the one-row layout. */}
                <div className="relative -mt-2">
                  <img
                    src={photo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />

                  {index < STEPS.length - 1 && (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute right-0 top-[80%] hidden h-[2px] w-4 -translate-y-1/2 translate-x-full bg-orange-500/35 xl:block"
                      />

                      <span className="absolute -right-2 top-[80%] z-10 hidden h-7 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-orange-500 shadow-[0_6px_16px_rgba(232,90,42,0.35)] xl:flex">
                        <ChevronRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-white"
                          strokeWidth={2.6}
                        />
                      </span>
                    </>
                  )}
                </div>
              </motion.article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
