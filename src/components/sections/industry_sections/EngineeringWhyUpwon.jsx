import { m as motion, useReducedMotion } from 'framer-motion';
import { ShoppingCart, Settings, Database, Truck } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const LEFT_POINTS = [
  {
    title: 'Raw-Material Procurement Visibility',
    detail:
      'Source raw materials, manage suppliers, and keep procurement activities fully visible.',
    Icon: ShoppingCart,
  },
  {
    title: 'Production Process Coordination',
    detail:
      'Plan and coordinate production with accurate bill of materials and connected visibility.',
    Icon: Settings,
  },
];

const RIGHT_POINTS = [
  {
    title: 'Inventory & Warehouse Control',
    detail:
      'Track stock, manage warehouse operations, and maintain visibility across locations.',
    Icon: Database,
  },
  {
    title: 'Finished-Goods Handling & Dispatch',
    detail:
      'Manage finished products, sales orders, and dispatch to keep deliveries on track.',
    Icon: Truck,
  },
];

export default function EngineeringWhyUpwon() {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const pointFrom = (offset) => ({
    hidden: { opacity: 0, x: d(offset) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  });

  const renderPoint = ({ title, detail, Icon }, offset) => (
    <motion.div
      key={title}
      variants={pointFrom(offset)}
      className="flex min-w-0 items-start gap-4"
    >
      <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#fdece0]">
        <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.7} />
      </span>

      <div className="min-w-0">
        <h3 className="h-display text-[15.5px] font-bold leading-snug text-navy-950">
          {title}
        </h3>

        <p className="mt-2 text-[13px] leading-relaxed text-navy-600">
          {detail}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fdf8f4] to-white py-10 sm:py-12 lg:py-14">
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
            <Eyebrow className="justify-center">WHY UPWON</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Built to Keep Manufacturing Operations{' '}
            <span className="gradient-text-orange">Moving as One.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            In engineering and manufacturing operations, disconnected
            procurement, production, quality, inventory, warehouse, sales,
            dispatch, and reporting workflows can create delays and reduce
            visibility. UpWon brings these workflows closer together—helping
            teams operate with greater coordination and control.
          </motion.p>
        </motion.div>

        {/* ================= POINTS AROUND THE FLOOR ================= */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.74fr_1.92fr_0.74fr] lg:gap-5 xl:gap-7">
          {/* ---------- Left ---------- */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="order-2 grid min-w-0 gap-8 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-14"
          >
            {LEFT_POINTS.map((point) => renderPoint(point, -18))}
          </motion.div>

          {/* ---------- Shop floor ---------- */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative order-1 min-w-0 lg:order-2"
          >
            <img
              src="/images/eng_why_upwon.webp"
              alt="A production line running through an engineering plant"
              width={1263}
              height={877}
              loading="lazy"
              decoding="async"
              className="relative block h-auto w-full rounded-[18px]"
            />

            <motion.div
              variants={fadeUp}
              /* Straddles the photo's lower-right corner, as in the layout */
              className="relative -mt-10 ml-auto w-[75%] rounded-[14px] bg-white p-4 shadow-[0_16px_40px_rgba(25,35,55,0.14)] sm:w-[62%] lg:absolute lg:left-[62%] lg:top-[66%] lg:mt-0 lg:w-[59%]"
            >
              <span
                aria-hidden="true"
                className="block h-[3px] w-8 rounded-full bg-orange-500"
              />

              <p className="mt-2.5 h-display text-[15px] font-bold leading-snug text-navy-950">
                One connected platform.
              </p>

              <p className="mt-1.5 text-[13px] leading-snug text-navy-600">
                From raw materials to finished product delivery.
              </p>
            </motion.div>
          </motion.div>

          {/* ---------- Right ---------- */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="order-3 grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-14"
          >
            {RIGHT_POINTS.map((point) => renderPoint(point, 18))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
