import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Wheat,
  ClipboardCheck,
  Search,
  CalendarClock,
  PackageOpen,
  MapPin,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

const CHALLENGES = [
  {
    number: '01',
    title: 'Raw Material & Ingredient Visibility',
    description:
      'Maintain better visibility of raw materials and ingredients across stores, warehouses, and production locations.',
    Icon: Wheat,
    color: '#7c3aed',
    tint: '#f3efff',
  },
  {
    number: '02',
    title: 'Production & Inventory Coordination',
    description:
      'Keep production requirements better connected with available materials, inventory levels, and finished-goods movement.',
    Icon: ClipboardCheck,
    color: '#43a047',
    tint: '#edf7ee',
  },
  {
    number: '03',
    title: 'Recipe, Batch & Quality Visibility',
    description:
      'Maintain greater visibility across recipes, production batches, and quality inspection touchpoints throughout operations.',
    Icon: Search,
    color: '#f26522',
    tint: '#fff1e8',
  },
  {
    number: '04',
    title: 'Shelf-Life & Product Movement',
    description:
      'Track products through storage and movement with clearer visibility into batches, stock, and shelf-life requirements.',
    Icon: CalendarClock,
    color: '#2f80ed',
    tint: '#eaf2fd',
  },
  {
    number: '05',
    title: 'Packaging & Finished Goods Coordination',
    description:
      'Coordinate packaging materials, finished products, storage, dispatch, and fulfillment workflows.',
    Icon: PackageOpen,
    color: '#f5a623',
    tint: '#fff7e6',
  },
  {
    number: '06',
    title: 'Multi-Location Operations',
    description:
      'Track inventory and operational activity across plants, warehouses, distribution points, and other business locations.',
    Icon: MapPin,
    color: '#ec4899',
    tint: '#fdeef5',
  },
];

export default function FoodProcessingOperationalChallenges() {
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
    <section className="relative overflow-hidden bg-[#f6f8fc] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      {/* The artwork is a wide isometric line illustration of the whole value
          chain; the wash only lifts the middle so the cards stay readable. */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/operational_challenges_bg.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f6f8fc]/40 via-[#f6f8fc]/80 to-[#f6f8fc]/40" />
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
            <Eyebrow className="justify-center">OPERATIONAL CHALLENGES</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Key Operational Challenges in{' '}
            <span className="gradient-text-orange">Food Processing</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From raw materials to finished goods, food processing operations
            involve many moving parts that must work together seamlessly.
          </motion.p>
        </motion.div>

        {/* ================= CHALLENGE CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mt-9 grid max-w-5xl gap-5 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CHALLENGES.map(
            ({ number, title, description, Icon, color, tint }) => (
              <motion.article
                key={number}
                variants={cardVariants}
                whileHover="hover"
                className="relative min-w-0 overflow-hidden rounded-[16px] bg-white px-5 pb-7 pt-5 shadow-[0_12px_35px_rgba(25,35,55,0.09)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(25,35,55,0.14)]"
              >
                {/* Number badge */}
                <span
                  className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {number}
                </span>

                {/* Icon */}
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: tint }}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.7} style={{ color }} />
                </span>

                <h3 className="mt-5 h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                  {title}
                </h3>

                <span
                  className="mt-3 block h-[2px] w-8 rounded-full"
                  style={{ backgroundColor: color }}
                />

                <p className="mt-3 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                  {description}
                </p>

                {/* Coloured foot, as in the reference */}
                <span
                  className="absolute inset-x-0 bottom-0 h-[4px]"
                  style={{ backgroundColor: color }}
                />
              </motion.article>
            )
          )}
        </motion.div>
      </Container>
    </section>
  );
}
