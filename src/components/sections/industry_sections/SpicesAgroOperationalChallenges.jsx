import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Sprout,
  ClipboardCheck,
  Cog,
  Package,
  Warehouse,
  MapPin,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

// The filename carries a space, hence the encoded path
const BACKGROUND = '/images/agro_operational%20challenge_bg.webp';

const CHALLENGES = [
  {
    number: '01',
    title: 'Raw Material Procurement & Availability',
    description:
      'Maintain better visibility across supplier requirements, incoming materials, purchase activity, and raw-material availability for processing.',
    Icon: Sprout,
  },
  {
    number: '02',
    title: 'Quality Inspection & Batch Visibility',
    description:
      'Keep quality checkpoints and batch-level operational visibility closer to procurement, production, and finished-product workflows.',
    Icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'Production & Processing Coordination',
    description:
      'Connect raw-material requirements, processing activities, production planning, and finished-product movement.',
    Icon: Cog,
  },
  {
    number: '04',
    title: 'Inventory & Stock Tracking',
    description:
      'Track raw materials, work-in-process items, packaging materials, and finished products with better visibility across operational locations.',
    Icon: Package,
  },
  {
    number: '05',
    title: 'Storage & Warehouse Coordination',
    description:
      'Coordinate material receipt, storage, transfers, stock movement, and dispatch across warehouses and processing locations.',
    Icon: Warehouse,
  },
  {
    number: '06',
    title: 'Multi-Location Operations',
    description:
      'Maintain better visibility across plants, processing units, warehouses, depots, and other operational locations.',
    Icon: MapPin,
  },
];

export default function SpicesAgroOperationalChallenges() {
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
    hidden: { opacity: 0, y: d(20) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fdfaf6] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      {/* The artwork carries the spice sacks and plant along its lower left,
          so the wash holds solid where the copy runs and clears toward the
          cards on the right */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={BACKGROUND}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-white/62 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-white/88 from-18% via-white/42 via-48% to-white/15 lg:block" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-10 xl:gap-14">
          {/* ================= LEFT — COPY ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>OPERATIONAL CHALLENGES</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[34px] xl:text-[36.8px]"
            >
              Many Moving Parts.{' '}
              <span className="gradient-text-orange">
                Bigger Coordination Challenges.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              From raw materials and quality checks to production, warehousing,
              and multi-location operations, spices and agro-processing
              businesses manage a highly interconnected value chain. Each stage
              brings its own operational challenges.
            </motion.p>
          </motion.div>

          {/* ================= RIGHT — CHALLENGE CARDS ================= */}
          <motion.div
            variants={cardsGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid min-w-0 auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          >
            {CHALLENGES.map(({ number, title, description, Icon }) => (
              <motion.article
                key={number}
                variants={cardVariants}
                whileHover="hover"
                className="flex h-full min-w-0 flex-col rounded-[16px] border border-navy-950/[0.05] bg-white p-5 shadow-[0_10px_30px_rgba(25,35,55,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,35,55,0.14)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff2e6]">
                    <Icon
                      className="h-6 w-6 text-orange-500"
                      strokeWidth={1.6}
                    />
                  </span>

                  {/* Number with the short rule that drops from it */}
                  <span className="flex flex-col items-center">
                    <span className="h-display text-[19px] font-bold leading-none text-orange-400">
                      {number}
                    </span>

                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-7 w-px bg-orange-300/70"
                    />
                  </span>
                </div>

                {/* Two lines' worth of height whether the title wraps or not,
                    so every description starts on the same line */}
                <h3 className="mt-4 h-display min-h-[44px] text-[16px] font-semibold leading-snug text-navy-950">
                  {title}
                </h3>

                <p className="mt-2.5 text-[13px] leading-relaxed text-navy-600">
                  {description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
