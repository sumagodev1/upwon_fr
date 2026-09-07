import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Settings,
  Factory,
  Wrench,
  Bot,
  Cpu,
  Car,
  Cog,
  Layers,
  WashingMachine,
  Package,
  Handshake,
  Building2,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CATEGORIES = [
  { label: 'Engineering Components Manufacturing', Icon: Settings },
  { label: 'Industrial Equipment Manufacturing', Icon: Factory },
  { label: 'Machine & Machinery Manufacturing', Icon: Wrench },
  { label: 'Fabrication & Assembly Operations', Icon: Bot },
  { label: 'Electrical & Electronic Components', Icon: Cpu },
  { label: 'Automotive & Auto Components', Icon: Car },
  { label: 'Industrial Parts Manufacturing', Icon: Cog },
  { label: 'Metal & Engineering Products', Icon: Layers },
  { label: 'Consumer Durables Manufacturing', Icon: WashingMachine },
  { label: 'Industrial Goods Manufacturing', Icon: Package },
  { label: 'Contract & Job-Based Manufacturing', Icon: Handshake },
  { label: 'Multi-Plant Manufacturing Businesses', Icon: Building2 },
];

export default function EngineeringIndustryCoverage() {
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

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fbfcfe] py-10 sm:py-12 lg:py-14">
      {/* ================= BACKGROUND ================= */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="pointer-events-none absolute right-0 top-0 hidden w-[52%] lg:block xl:w-[48%]"
      >
        <img
          src="/images/eng_indust_cover.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />

        {/* Feathered into the page on its left and lower edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfcfe] via-[#fbfcfe]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#fbfcfe] to-transparent" />
      </motion.div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <div className="grid items-center gap-8">
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0 lg:max-w-[52%]"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>INDUSTRY COVERAGE</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              Built for a Wide Range of{' '}
              <span className="gradient-text-orange">
                Engineering &amp; Manufacturing Businesses.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              UpWon can support connected workflows across a wide range of
              engineering and manufacturing environments, including:
            </motion.p>
          </motion.div>
        </div>

        {/* ================= CATEGORIES ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {CATEGORIES.map(({ label, Icon }) => (
            <motion.article
              key={label}
              variants={cardVariants}
              whileHover="hover"
              className="flex h-full min-w-0 items-center gap-4 rounded-[14px] border border-navy-950/[0.05] bg-white p-5 shadow-[0_8px_24px_rgba(25,35,55,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(25,35,55,0.11)]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fdf0e6]">
                <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.6} />
              </span>

              <h3 className="h-display min-w-0 text-[14px] font-semibold leading-snug text-navy-950 sm:text-[14.5px]">
                {label}
              </h3>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
