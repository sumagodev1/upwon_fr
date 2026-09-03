import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Factory,
  ShieldCheck,
  PackageCheck,
  Warehouse,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The artwork draws the whole map — seven pill cards, their icons, the circle
  and the dotted connectors — with the card bodies left empty. The copy is laid
  into those empty areas, so every position below is a percentage of the
  1672x941 artwork and the type scales with it through container queries.
*/
const LEFT_WORKFLOWS = [
  {
    title: 'Procurement',
    description: 'Plan and procure raw materials and packaging.',
    Icon: ShoppingCart,
    top: '9.4%',
    height: '18.5%',
  },
  {
    title: 'Production',
    description: 'Plan production with visibility across each stage.',
    Icon: Factory,
    top: '32.4%',
    height: '18.4%',
  },
  {
    title: 'Quality',
    description: 'Keep quality checks tied to the batches they cover.',
    Icon: ShieldCheck,
    top: '54%',
    height: '18.1%',
  },
  {
    title: 'Inventory & Storage',
    description: 'Track inventory and cold storage movement.',
    Icon: PackageCheck,
    top: '74.9%',
    height: '18.4%',
  },
];

const RIGHT_WORKFLOWS = [
  {
    title: 'Warehouse',
    description: 'Coordinate warehouse operations and stock movement.',
    Icon: Warehouse,
    top: '9.8%',
    height: '19.4%',
  },
  {
    title: 'Sales',
    description: 'Manage orders, pricing, and customer activity.',
    Icon: ShoppingBag,
    top: '39.5%',
    height: '18.4%',
  },
  {
    title: 'Distribution',
    description: 'Coordinate dispatch and delivery across channels.',
    Icon: Truck,
    top: '65.9%',
    height: '18.6%',
  },
];

// Where the copy sits inside a pill, clear of the icon the artwork draws
const LEFT_ZONE = { left: '11.6%', width: '16.3%' };
const RIGHT_ZONE = { left: '84%', width: '14.5%' };

const TITLE_SIZE = 'clamp(11px, 1.05cqw, 17px)';
const BODY_SIZE = 'clamp(9px, 0.86cqw, 13.5px)';

export default function DairyIceCreamWhyUpwon() {
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

  const labelGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.35 },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: d(8) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  /* ================= OVERLAID COPY ================= */

  const label = ({ title, description, top, height }, zone, isLeft) => (
    <motion.div
      key={title}
      variants={labelVariants}
      className="absolute flex flex-col justify-center"
      style={{ ...zone, top, height }}
    >
      <p
        className={`h-display font-semibold leading-tight ${
          isLeft ? 'text-navy-800' : 'text-orange-600'
        }`}
        style={{ fontSize: TITLE_SIZE }}
      >
        {title}
      </p>

      <p
        className="mt-[0.4em] leading-snug text-navy-600"
        style={{ fontSize: BODY_SIZE }}
      >
        {description}
      </p>
    </motion.div>
  );

  /* ================= STACKED COPY ================= */

  const card = ({ title, description, Icon }, isLeft) => (
    <motion.div
      key={title}
      variants={cardVariants}
      className="flex min-w-0 items-start gap-3.5 rounded-[16px] border border-navy-950/[0.06] bg-white p-4 shadow-[0_10px_28px_rgba(25,35,55,0.06)]"
    >
      <span
        className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] ${
          isLeft ? 'bg-[#eef2fb]' : 'bg-[#fff2e9]'
        }`}
      >
        <Icon
          className={`h-6 w-6 ${isLeft ? 'text-navy-800' : 'text-orange-500'}`}
          strokeWidth={1.6}
        />
      </span>

      <div className="min-w-0 flex-1">
        <h3
          className={`h-display text-[15px] font-semibold leading-snug ${
            isLeft ? 'text-navy-800' : 'text-orange-600'
          }`}
        >
          {title}
        </h3>

        <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-600">
          {description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:pb-2 lg:pt-20">
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
            Built to Keep Perishable Product Operations{' '}
            <span className="gradient-text-orange">Moving as One.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            In dairy and ice cream operations, disconnected procurement,
            production, inventory, quality, storage, warehouse, sales, and
            distribution workflows can quickly create delays and reduce
            operational visibility. UpWon brings these workflows together—helping
            teams operate with greater coordination and control.
          </motion.p>
        </motion.div>

        {/* ================= WORKFLOW MAP ================= */}
        {/* Container query unit, so the overlaid copy tracks the artwork */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative hidden w-full [container-type:inline-size] lg:-mb-[2%] lg:-mt-[2.5%] lg:block"
        >
          <img
            src="/images/why_upwon_dairy.webp"
            alt="A dairy bottling line at the centre of UpWon's connected procurement, production, quality, storage, warehouse, sales and distribution workflows"
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />

          <motion.div
            variants={labelGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="absolute inset-0"
          >
            {LEFT_WORKFLOWS.map((workflow) => label(workflow, LEFT_ZONE, true))}
            {RIGHT_WORKFLOWS.map((workflow) =>
              label(workflow, RIGHT_ZONE, false)
            )}
          </motion.div>
        </motion.div>

        {/* ---------- The map is unreadable at these widths, so the same
             workflows stack instead ---------- */}
        <motion.div
          variants={labelGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {LEFT_WORKFLOWS.map((workflow) => card(workflow, true))}
          {RIGHT_WORKFLOWS.map((workflow) => card(workflow, false))}
        </motion.div>

      </Container>
    </section>
  );
}
