import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Boxes,
  Package,
  Factory,
  ShieldCheck,
  Truck,
  BarChart3,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

const CHALLENGES = [
  {
    title: 'Fragmented Information',
    description:
      'Data spread across multiple sheets and systems with no real-time visibility.',
    Icon: Boxes,
  },
  {
    title: 'Inventory Challenges',
    description:
      'Tracking raw materials, WIP, and finished goods across locations becomes difficult.',
    Icon: Package,
  },
  {
    title: 'Production Inefficiencies',
    description:
      'Limited visibility into batches, capacity, and production progress.',
    Icon: Factory,
  },
  {
    title: 'Quality & Compliance Risks',
    description:
      'Manual checks increase errors and make compliance harder to maintain.',
    Icon: ShieldCheck,
  },
  {
    title: 'Distribution Complexities',
    description:
      'Coordinating dispatches, orders, and deliveries across multiple locations is complex.',
    Icon: Truck,
  },
  {
    title: 'Business Performance Visibility',
    description:
      'Lack of accurate insights affects planning, profitability, and decision-making.',
    Icon: BarChart3,
  },
];

export default function FoodProcessingChallengeSection() {
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
    <section className="relative overflow-hidden bg-navy-950 py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      {/* The plant photo sits to the right; the wash is heaviest on the left
          so the copy stays legible over it. */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/food_process_challenge.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-navy-950/60 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-navy-950/90 via-navy-950/50 to-navy-950/10 lg:block" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-3xl"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow variant="dark">THE CHALLENGE</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-white sm:text-[34px] lg:text-[36.8px]"
          >
            Complex Food Processes. Fast-Moving Operations.{' '}
            <span className="gradient-text-orange">Constant Coordination.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-cream-100/80 sm:text-base"
          >
            Food processing businesses involve multiple connected activities and
            moving parts. Without a unified system, teams struggle with
            visibility, tracking, and coordination across the entire value chain.
          </motion.p>
        </motion.div>

        {/* ================= CHALLENGE CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-9 grid gap-4 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-5"
        >
          {CHALLENGES.map(({ title, description, Icon }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover="hover"
              className="flex min-w-0 flex-col items-center rounded-[18px] bg-white px-4 py-6 text-center shadow-[0_14px_40px_rgba(8,14,35,0.25)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(8,14,35,0.35)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffefe4]">
                <Icon className="h-7 w-7 text-orange-500" strokeWidth={1.7} />
              </span>

              <h3 className="mt-4 h-display text-[14.5px] font-semibold leading-snug text-navy-950 sm:text-[15px]">
                {title}
              </h3>

              <span className="mt-3 block h-[2px] w-8 rounded-full bg-orange-500/70" />

              <p className="mt-3 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
