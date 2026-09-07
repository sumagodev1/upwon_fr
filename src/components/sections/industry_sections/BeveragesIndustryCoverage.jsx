import { m as motion, useReducedMotion } from 'framer-motion';
import {
  CupSoda,
  GlassWater,
  Grape,
  Sparkles,
  Wine,
  Zap,
  HeartPulse,
  Droplet,
  Droplets,
  Milk,
  FlaskConical,
  MapPin,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

// The three badge colours cycle through the grid, as in the layout
const TINTS = [
  { tint: 'bg-[#e11d48]', ink: 'text-white' },
  { tint: 'bg-[#0d9488]', ink: 'text-white' },
  { tint: 'bg-[#701a45]', ink: 'text-white' },
];

const CATEGORIES = [
  {
    label: 'Fruit Juices',
    detail:
      'Ingredient sourcing, blending, filling, and batch visibility across juice lines.',
    Icon: CupSoda,
  },
  {
    label: 'Fruit Drinks',
    detail:
      'Recipe ratios, production runs, and packaging workflows kept connected.',
    Icon: GlassWater,
  },
  {
    label: 'Nectars & Juice Blends',
    detail:
      'Blend recipes, ingredient availability, and batch records across multi-fruit ranges.',
    Icon: Grape,
  },
  {
    label: 'Soft Drinks',
    detail:
      'High-volume production, packaging, and stock movement across fast-moving SKUs.',
    Icon: Wine,
  },
  {
    label: 'Carbonated Beverages',
    detail:
      'Production activity, quality checkpoints, and finished-goods handling in one flow.',
    Icon: Sparkles,
  },
  {
    label: 'Energy & Functional Drinks',
    detail:
      'Ingredient records, production activity, and inventory across functional formulations.',
    Icon: Zap,
  },
  {
    label: 'Health & Wellness Beverages',
    detail:
      'Ingredients, recipes, quality touchpoints, and shelf-life related workflows.',
    Icon: HeartPulse,
  },
  {
    label: 'Bottled Water',
    detail:
      'Packaging materials, filling activity, inventory, and dispatch across plants.',
    Icon: Droplet,
  },
  {
    label: 'Flavoured Water',
    detail:
      'Flavour and ingredient tracking alongside production, packaging, and stock visibility.',
    Icon: Droplets,
  },
  {
    label: 'Ready-to-Drink Beverages',
    detail:
      'Recipes, production, packaging, and distribution connected for RTD formats.',
    Icon: Milk,
  },
  {
    label: 'Syrups & Concentrates',
    detail:
      'Concentrate recipes, batch production, storage, and onward supply.',
    Icon: FlaskConical,
  },
  {
    label: 'Multi-Location Beverage Businesses',
    detail:
      'Inventory and operational activity tracked across plants, warehouses, and depots.',
    Icon: MapPin,
  },
];

export default function BeveragesIndustryCoverage() {
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
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(18) },
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
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Built for a Wide Range of{' '}
            <span className="gradient-text-orange">
              Beverage &amp; Juice Businesses.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            UpWon can support connected workflows across beverage and related
            product categories, including:
          </motion.p>
        </motion.div>

        {/* ================= CATEGORIES ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
        >
          {CATEGORIES.map(({ label, detail, Icon }, index) => {
            const { tint, ink } = TINTS[index % TINTS.length];

            return (
              <motion.article
                key={label}
                variants={cardVariants}
                whileHover="hover"
                className="flex h-full min-w-0 flex-col items-center rounded-[14px] border border-navy-950/[0.07] bg-white px-4 py-7 text-center shadow-[0_8px_24px_rgba(25,35,55,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(25,35,55,0.11)]"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${tint}`}
                >
                  <Icon className={`h-6 w-6 ${ink}`} strokeWidth={1.7} />
                </span>

                <h3 className="mt-4 h-display text-[14.5px] font-bold leading-snug text-navy-950 sm:text-[15px]">
                  {label}
                </h3>

                <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-600">
                  {detail}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
