import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

/*
  The artwork holds the centre circle and eight icon bubbles but no copy, so
  the capabilities are positioned around it.

  The bubbles sit on a circle, so their horizontal offset changes with their
  vertical position — the middle pair reach furthest out, the top and bottom
  pairs tuck back towards the centre. Each block is therefore anchored to its
  own bubble rather than stacked in a straight column, which is what gives the
  copy its curved inner edge.

  `top` is a percentage of the artwork height (bubble centre minus its ~10%
  radius, so a block starts level with the top of its icon). `edge` is the
  block's inner edge as a percentage of the row — `right` on the left-hand
  side, `left` on the right-hand side.
*/
const LEFT_CAPABILITIES = [
  {
    title: 'Centralized Inventory Control',
    description:
      'Get a clearer view of raw materials, ingredients, finished goods, and inventory movement across plants, warehouses, outlets, and other locations.',
    top: '1.5%',
    edge: '66.6%',
  },
  {
    title: 'Connected Production Management',
    description:
      'Bring production activities closer to inventory and operational requirements with better visibility across materials, workflows, and finished products.',
    top: '24.2%',
    edge: '71.5%',
  },
  {
    title: 'Quality & Batch Visibility',
    description:
      'Maintain better visibility across production batches and quality inspection processes throughout the product journey.',
    top: '49.9%',
    edge: '70.8%',
  },
  {
    title: 'Warehouse Operations',
    description:
      'Support day-to-day warehouse activities including stock receipt, storage, transfers, dispatch, and finished-goods movement.',
    top: '71.8%',
    edge: '63.8%',
  },
];

const RIGHT_CAPABILITIES = [
  {
    title: 'Smarter Sales & Order Management',
    description:
      'Manage customer, outlet, distributor, and other sales orders through connected workflows with greater visibility from order creation to fulfillment.',
    top: '1.5%',
    edge: '66.6%',
  },
  {
    title: 'Connected Multi-Location Operations',
    description:
      'Bring plants, warehouses, outlets, distributors, sales teams, and operational teams onto one connected system.',
    top: '24.4%',
    edge: '71.5%',
  },
  {
    title: 'Distribution & Dispatch Coordination',
    description:
      'Improve visibility into finished-goods movement as products move from production and storage to outlets, distributors, and other sales channels.',
    top: '50%',
    edge: '70.9%',
  },
  {
    title: 'Real-Time Operational Insights',
    description:
      'Access dashboards and reports that provide visibility into production, inventory, sales, location activity, and overall business operations.',
    top: '71.3%',
    edge: '64%',
  },
];

const ALL_CAPABILITIES = [...LEFT_CAPABILITIES, ...RIGHT_CAPABILITIES];

export default function SweetsCoreCapabilities() {
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

  const fromLeft = {
    hidden: { opacity: 0, x: d(-20) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  };

  const fromRight = {
    hidden: { opacity: 0, x: d(20) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  const renderCapability = ({ title, description, top, edge }, side) => (
    <motion.div
      key={title}
      variants={side === 'left' ? fromLeft : fromRight}
      style={side === 'left' ? { top, right: edge } : { top, left: edge }}
      className={`absolute w-[24%] max-w-[360px] ${
        side === 'left' ? 'text-right' : 'text-left'
      }`}
    >
      <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 xl:text-[17px]">
        {title}
      </h3>

      <p className="mt-2 text-[12.5px] leading-relaxed text-navy-600 xl:text-[13px]">
        {description}
      </p>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">CORE CAPABILITIES</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Powering Smarter{' '}
            <span className="gradient-text-orange">
              Sweets &amp; Namkeen Operations
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            Everything you need to manage ingredients, production, inventory,
            outlets, and distribution on one connected platform.
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= DIAGRAM + CAPABILITIES (lg and up) ================= */}
      {/* Wider than the shared Container so the copy either side has room */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1560px] px-6 lg:block lg:px-8">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative mt-10"
        >
          {/* Artwork takes the middle 52%, leaving ~24% either side for copy */}
          <motion.img
            variants={imageVariants}
            src="/images/sweet_core_capabilities.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto w-[52%]"
          />

          {LEFT_CAPABILITIES.map((capability) =>
            renderCapability(capability, 'left')
          )}

          {RIGHT_CAPABILITIES.map((capability) =>
            renderCapability(capability, 'right')
          )}
        </motion.div>
      </div>

      {/* ================= CAPABILITIES (below lg) ================= */}
      {/* The radial arrangement collapses at narrow widths, so the artwork
          leads and the capabilities follow as a plain list. */}
      <Container className="relative z-10 lg:hidden">
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-9 flex justify-center"
        >
          <img
            src="/images/sweet_core_capabilities.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full max-w-[420px]"
          />
        </motion.div>

        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {ALL_CAPABILITIES.map(({ title, description }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              className="rounded-[16px] border border-navy-950/[0.07] bg-white p-5 shadow-[0_10px_30px_rgba(25,35,55,0.06)]"
            >
              <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                {title}
              </h3>

              <p className="mt-2 text-[13px] leading-relaxed text-navy-600">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
