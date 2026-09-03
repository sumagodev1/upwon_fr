import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Home,
  Brush,
  Droplet,
  Scissors,
  SprayCan,
  WashingMachine,
  ShieldCheck,
  Baby,
  HeartPulse,
  Layers,
  ShoppingBasket,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CATEGORIES = [
  { label: 'Personal Care Products', Icon: Sparkles },
  { label: 'Home Care Products', Icon: Home },
  { label: 'Cosmetics & Beauty Products', Icon: Brush },
  { label: 'Skincare Products', Icon: Droplet },
  { label: 'Haircare Products', Icon: Scissors },
  { label: 'Household Cleaning Products', Icon: SprayCan },
  { label: 'Detergents & Cleaning Supplies', Icon: WashingMachine },
  { label: 'Hygiene Products', Icon: ShieldCheck },
  { label: 'Baby Care Products', Icon: Baby },
  { label: 'Health & Wellness Consumer Products', Icon: HeartPulse },
  { label: 'Paper & Disposable Products', Icon: Layers },
  { label: 'Household & Everyday Consumer Goods', Icon: ShoppingBasket },
];

export default function NonFoodFmcgIndustryCoverage() {
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
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
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
            <Eyebrow className="justify-center">INDUSTRY COVERAGE</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Built for a Wide Range of{' '}
            <span className="gradient-text-orange">
              Non-Food FMCG Businesses.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            UpWon can support connected workflows across a wide range of
            fast-moving consumer product categories, including:
          </motion.p>
        </motion.div>

        {/* ================= DASHBOARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: d(26), scale: reduceMotion ? 1 : 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-9 max-w-5xl sm:mt-11"
        >
          <img
            src="/images/industry_cov_dashboard.webp"
            alt="UpWon dashboard showing product, inventory, sales and distribution activity"
            width={1598}
            height={984}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </motion.div>

        {/* ================= CATEGORIES ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4"
        >
          {CATEGORIES.map(({ label, Icon }) => (
            <motion.div
              key={label}
              variants={cardVariants}
              whileHover="hover"
              className="flex min-w-0 items-center gap-3.5 rounded-[14px] border border-navy-950/[0.07] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(25,35,55,0.05)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(25,35,55,0.1)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff1e8]">
                <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
              </span>

              <span className="h-display min-w-0 text-[13.5px] font-semibold leading-snug text-navy-950 sm:text-[14px]">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
