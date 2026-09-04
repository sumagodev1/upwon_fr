import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CATEGORIES = [
  {
    label: 'Spices & Seasonings',
    photo: '/images/agro_indust_spices_seasoning.webp',
  },
  {
    label: 'Whole & Ground Spices',
    photo: '/images/agro_indust_ground_spices.webp',
  },
  { label: 'Spice Blends', photo: '/images/agro_indust_spice_blends.webp' },
  {
    label: 'Private Label & Co-Packing Operations',
    photo: '/images/agro_indust_copacking_oper.webp',
  },
  {
    label: 'Grain & Pulse Processing',
    photo: '/images/agro_indust_grain_pulse.webp',
  },
  {
    label: 'Flour & Milling Operations',
    photo: '/images/agro_indust_flour_milling.webp',
  },
  {
    label: 'Oilseed & Edible Oil Processing',
    photo: '/images/agro_indust_adible_oil_processing.webp',
  },
  {
    label: 'Fruit & Vegetable Processing',
    photo: '/images/agro_indust_vegetabel_processing.webp',
  },
  {
    label: 'Dehydrated & Dried Products',
    photo: '/images/agro_indust_dried_products.webp',
  },
  {
    label: 'Herbs & Botanical Products',
    photo: '/images/agro_indust_botanical_products.webp',
  },
  {
    label: 'Packaged Agro Products',
    photo: '/images/agro_indust_package_agro_product.webp',
  },
  {
    label: 'Multi-Location Processing Businesses',
    photo: '/images/agro_indust_business_processing.webp',
  },
];

export default function SpicesAgroIndustryCoverage() {
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
    hidden: { opacity: 0, y: d(18), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: EASE },
    },
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
          className="min-w-0"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>INDUSTRY COVERAGE</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Built for a Wide Range of
            {/* Held to two lines rather than one long run at desktop widths */}
            <br className="hidden sm:block" />{' '}
            <span className="gradient-text-orange">
              Spices &amp; Agro Processing Businesses.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            UpWon can support connected workflows across processing and
            value-added product categories, including:
          </motion.p>
        </motion.div>

        {/* ================= CATEGORIES ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-5"
        >
          {CATEGORIES.map(({ label, photo }) => (
            <motion.article
              key={label}
              variants={cardVariants}
              whileHover="hover"
              className="flex h-full min-w-0 flex-col items-center rounded-[16px] border border-navy-950/[0.05] bg-white p-4 text-center shadow-[0_10px_28px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,35,55,0.13)]"
            >
              <img
                src={photo}
                alt={label}
                loading="lazy"
                decoding="async"
                className="block aspect-square w-full max-w-[132px] rounded-full object-cover object-center"
              />

              <h3 className="mt-4 h-display text-[13px] font-semibold leading-snug text-navy-950 sm:text-[13.5px]">
                {label}
              </h3>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
