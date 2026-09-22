import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The illustrations share a 338px height but vary in width (350-456), so each
  sits in a fixed-height frame with object-contain — every card lines up
  without cropping or stretching the artwork.

  One filename carries a space and brackets, so its path is percent-encoded.
*/
const CAPABILITIES = [
  {
    title: 'Centralized Product & Inventory Control',
    description:
      'Get a clearer view of products, packaging materials, finished goods, inventory levels, and stock movement across warehouses, branches, distributors, and other locations.',
    art: '/images/center_product.webp',
  },
  {
    title: 'Connected Sales & Distribution Management',
    description:
      'Bring sales orders, inventory availability, distributors, retailers, dispatch, and product movement closer together with better visibility across sales and distribution workflows.',
    art: '/images/conn_sales.webp',
  },
  {
    title: 'Smarter Distributor & Channel Management',
    description:
      'Maintain better visibility across distributor operations, orders, stock movement, sales activity, and channel performance.',
    art: '/images/smarter_distribution.webp',
  },
  {
    title: 'Field Sales & Market Execution',
    description:
      'Support sales teams with connected workflows for market visits, order collection, customer activity, sales execution, and on-ground visibility.',
    art: '/images/field_sales_market.webp',
  },
  {
    title: 'Warehouse Operations',
    description:
      'Support day-to-day warehouse activities including stock receipt, storage, transfers, picking, dispatch, returns, and inventory movement.',
    art: '/images/operation_ware.webp',
  },
  {
    title: 'Connected Multi-Location Operations',
    description:
      'Bring warehouses, branches, distributors, sales teams, and operational teams onto one connected system.',
    art: '/images/conn_multi_loc%20(1).webp',
  },
  {
    title: 'Real-Time Operational Insights',
    description:
      'Access dashboards and reports that provide visibility into inventory, sales, orders, distribution, field activity, channel performance, and overall business operations.',
    art: '/images/oper_insights.webp',
  },
];

export default function NonFoodFmcgCoreCapabilities() {
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
    <section className="relative overflow-hidden bg-[#f7f8fa] pb-12 sm:pb-16 lg:pb-20">
      {/* ================= HEADING BAND ================= */}
      {/* The photo sits on the right of the artwork, so the wash holds solid
          behind the copy and clears toward it. */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/non_fmcg_head_back.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover object-right"
          />

          <div className="absolute inset-0 bg-[#f7f8fa]/80 lg:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#f7f8fa] from-30% via-[#f7f8fa]/70 via-52% to-transparent lg:block" />
        </div>

        <Container className="relative z-10 py-12 sm:py-14 lg:py-16">
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="max-w-2xl"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>CORE CAPABILITIES</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
            >
              Everything You Need.{' '}
              <span className="gradient-text-orange">
                One Connected Platform.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              UpWon brings all key operations of your non-food FMCG business
              together in one connected platform.
            </motion.p>
          </motion.div>
        </Container>
      </div>

      {/* ================= CAPABILITY CARDS ================= */}
      {/* calc widths give four on the first row and three centred below */}
      <Container className="relative z-10">
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 flex flex-wrap justify-center gap-5 sm:mt-10"
        >
          {CAPABILITIES.map(({ title, description, art }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover="hover"
              className="flex min-w-0 flex-col rounded-[18px] bg-white px-5 py-6 text-center shadow-[0_12px_35px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(25,35,55,0.12)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
            >
              <div className="flex h-[112px] items-center justify-center">
                <img
                  src={art}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="max-h-[112px] w-auto max-w-full object-contain"
                />
              </div>

              <h3 className="mt-4 h-display min-h-[44px] text-[15px] font-semibold leading-snug text-navy-950 sm:min-h-[48px] sm:text-base">
                {title}
              </h3>

              <span className="mx-auto mt-3 block h-[2px] w-8 rounded-full bg-orange-500" />

              <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
