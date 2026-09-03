import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The illustrations vary from 926x808 to 1538x1448, so each sits in a fixed
  4:3 frame with object-contain — that keeps every card the same height
  without cropping or stretching any of the artwork.

  One filename carries a space and brackets, so its path is percent-encoded.
*/
const CHALLENGES = [
  {
    number: '01',
    title: 'Product & Inventory Visibility',
    description:
      'Maintain better visibility of products and inventory across warehouses, distributors, branches, and other business locations.',
    art: '/images/inventory_visibility%20(1).webp',
  },
  {
    number: '02',
    title: 'Sales & Distribution Coordination',
    description:
      'Keep sales orders, distributor activity, inventory availability, and product movement better connected across channels.',
    art: '/images/distrib_cord.webp',
  },
  {
    number: '03',
    title: 'Multi-Channel Order Management',
    description:
      'Manage orders and fulfillment across distributors, retailers, direct customers, and other sales channels.',
    art: '/images/multi_order.webp',
  },
  {
    number: '04',
    title: 'Warehouse & Stock Movement',
    description:
      'Track stock receipt, storage, transfers, dispatch, returns, and replenishment with greater operational visibility.',
    art: '/images/stock_movement.webp',
  },
  {
    number: '05',
    title: 'Field Sales & Market Execution',
    description:
      'Maintain better visibility into sales teams, market visits, retailer activity, order collection, and on-ground execution.',
    art: '/images/market_execution.webp',
  },
  {
    number: '06',
    title: 'Multi-Location Operations',
    description:
      'Track inventory, sales, distribution activity, and business performance across warehouses, branches, distributors, and operational locations.',
    art: '/images/multi_location_operation.webp',
  },
];

export default function NonFoodFmcgOperationalChallenges() {
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
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
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
            <Eyebrow className="justify-center">OPERATIONAL CHALLENGES</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Key Operational Challenges in{' '}
            <span className="gradient-text-orange">Non-Food FMCG</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From products and inventory to channels, field teams, and locations,
            fast-moving consumer goods operations depend on many parts staying
            in step with each other.
          </motion.p>
        </motion.div>

        {/* ================= CHALLENGE CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-9 grid gap-5 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CHALLENGES.map(({ number, title, description, art }) => (
            <motion.article
              key={number}
              variants={cardVariants}
              whileHover="hover"
              className="relative flex min-w-0 flex-col rounded-[20px] bg-white px-5 pb-6 pt-7 text-center shadow-[0_12px_35px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(25,35,55,0.12)] sm:px-6"
            >
              {/* Number badge — overlaps the card's top-left corner */}
              <span className="absolute -left-2 -top-3 flex h-11 w-11 items-center justify-center rounded-[12px] bg-orange-500 text-[15px] font-bold leading-none text-white shadow-[0_6px_16px_rgba(232,90,42,0.3)] sm:h-12 sm:w-12 sm:text-base">
                {number}
              </span>

              <div className="flex h-[168px] items-center justify-center sm:h-[186px]">
                <img
                  src={art}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="max-h-full w-auto max-w-full object-contain"
                />
              </div>

              <h3 className="mt-4 h-display text-[16px] font-semibold leading-snug text-navy-950 sm:text-[17px]">
                {title}
              </h3>

              <span className="mx-auto mt-3 block h-[2px] w-8 rounded-full bg-orange-500" />

              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-navy-600 sm:text-[13.5px]">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
