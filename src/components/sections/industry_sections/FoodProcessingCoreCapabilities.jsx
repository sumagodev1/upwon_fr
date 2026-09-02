import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const NAVY = '#12234a';
const ORANGE = '#f26522';

/*
  Each icon file is a complete medallion — tinted circle, icon and the
  decorative arc — so only the badge, copy and foot rule are built here.
  Accents alternate navy/orange down the row, as in the reference.

  One filename carries a space and brackets, so its path is percent-encoded.
*/
const CAPABILITIES = [
  {
    number: '01',
    title: 'Centralized Raw Material & Inventory Control',
    description:
      'Get a clearer view of ingredients, raw materials, packaging materials, semi-finished goods, finished products, and inventory movement across plants, warehouses, and other locations.',
    icon: '/images/centralized_raw_material.webp',
  },
  {
    number: '02',
    title: 'Connected Recipe & Production Management',
    description:
      'Bring recipes, material requirements, production activities, and finished-product movement closer together with better visibility across operational workflows.',
    icon: '/images/connected_recipe.webp',
  },
  {
    number: '03',
    title: 'Batch, Quality & Shelf-Life Visibility',
    description:
      'Maintain better visibility across production batches, quality inspection touchpoints, product movement, and shelf-life-related operational requirements.',
    icon: '/images/batch_quality%20(1).webp',
  },
  {
    number: '04',
    title: 'Packaging & Finished Goods Coordination',
    description:
      'Manage the operational flow from processed or semi-finished products through packaging, storage, and finished-goods movement.',
    icon: '/images/packaging_finished.webp',
  },
  {
    number: '05',
    title: 'Warehouse Operations',
    description:
      'Support day-to-day warehouse activities including stock receipt, storage, transfers, dispatch, and finished-goods movement.',
    icon: '/images/ware_oper.webp',
  },
  {
    number: '06',
    title: 'Smarter Sales & Order Management',
    description:
      'Manage customer and channel orders through connected workflows with greater visibility from order creation to fulfillment.',
    icon: '/images/smarter_sales.webp',
  },
  {
    number: '07',
    title: 'Connected Multi-Location Operations',
    description:
      'Bring plants, warehouses, distribution points, sales teams, and operational teams onto one connected system.',
    icon: '/images/conn_multi_loc.webp',
  },
  {
    number: '08',
    title: 'Real-Time Operational Insights',
    description:
      'Access dashboards and reports that provide visibility into production, inventory, product movement, sales, location activity, and overall business operations.',
    icon: '/images/real_time_oper.webp',
  },
];

export default function FoodProcessingCoreCapabilities() {
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
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(24), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/food_core_cap.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#f7f9fc]/78" />
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
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Powering Every Step of{' '}
            <span className="gradient-text-orange">Your Operations</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            End-to-end capabilities designed to streamline operations, improve
            visibility, and drive efficiency across your food business.
          </motion.p>
        </motion.div>

        {/* ================= CAPABILITY CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-9 grid gap-5 sm:mt-11 sm:grid-cols-2 xl:grid-cols-4"
        >
          {CAPABILITIES.map(({ number, title, description, icon }, index) => {
            const accent = index % 2 === 0 ? NAVY : ORANGE;

            return (
              <motion.article
                key={number}
                variants={cardVariants}
                whileHover="hover"
                className="flex min-w-0 flex-col rounded-[18px] bg-white p-5 shadow-[0_12px_35px_rgba(25,35,55,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(25,35,55,0.13)] sm:p-6"
              >
                {/* Medallion — circle, icon and arc are baked into the artwork */}
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="mx-auto block h-[104px] w-auto object-contain sm:h-[118px]"
                />

                {/* Number badge sits beside the title, as in the reference */}
                <div className="mt-4 flex items-start gap-3">
                  <span
                    className="flex h-7 w-8 shrink-0 items-center justify-center rounded-[7px] text-[12px] font-bold leading-none text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {number}
                  </span>

                  <h3
                    className="h-display min-w-0 text-[15px] font-semibold leading-snug sm:text-base"
                    style={{ color: accent }}
                  >
                    {title}
                  </h3>
                </div>

                <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                  {description}
                </p>

                <span
                  className="mx-auto mt-5 block h-[3px] w-9 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
