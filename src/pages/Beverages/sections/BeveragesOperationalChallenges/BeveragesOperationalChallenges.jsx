import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Leaf,
  FlaskConical,
  ShieldCheck,
  Package,
  Warehouse,
  Truck,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CHALLENGES = [
  {
    number: '01.',
    title: 'Ingredient & Raw Material Visibility',
    description:
      'Maintain better visibility across ingredients, concentrates, sweeteners, additives, packaging materials, and other production inputs.',
    photo: '/images/bev_material_visibility.webp',
    Icon: Leaf,
  },
  {
    number: '02.',
    title: 'Recipe & Production Coordination',
    description:
      'Keep recipes, production requirements, material availability, and production activities better connected.',
    photo: '/images/bev_recipe_production.webp',
    Icon: FlaskConical,
  },
  {
    number: '03.',
    title: 'Quality & Product Consistency',
    description:
      'Maintain visibility across quality inspection touchpoints and product-related workflows throughout production and dispatch.',
    photo: '/images/bev_quality_product.webp',
    Icon: ShieldCheck,
  },
  {
    number: '04.',
    title: 'Packaging & Finished Goods Movement',
    description:
      'Coordinate packaging materials, finished products, inventory movement, storage, and dispatch workflows.',
    photo: '/images/bev_goods_movement.webp',
    Icon: Package,
  },
  {
    number: '05.',
    title: 'Inventory, Shelf-Life & Stock Coordination',
    description:
      'Maintain better visibility across inventory, stock availability, product movement, and freshness-related operational requirements.',
    photo: '/images/bev_inventary_shelflife.webp',
    Icon: Warehouse,
  },
  {
    number: '06.',
    title: 'Distribution & Multi-Location Operations',
    description:
      'Track operational activity across plants, warehouses, depots, distributors, and other business locations.',
    photo: '/images/bev_multi_loc_oper.webp',
    Icon: Truck,
  },
];

// The photo takes the card's right side behind a slanted edge, as in the
// layout — the copy keeps the straight side.
const PHOTO_CLIP = 'polygon(22% 0, 100% 0, 100% 100%, 0 100%)';

export default function BeveragesOperationalChallenges() {
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
    <section className="relative overflow-hidden bg-[#fdfbf8] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      {/* The artwork carries the bottles and fruit down its left side, so the
          wash clears there and holds behind the cards */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/bev_oper_challenge_bg.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-white/25" />
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
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Many SKUs. Many Stages.{' '}
            <span className="gradient-text-orange">
              Bigger Coordination Challenges.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From ingredients and recipes to production, packaging, inventory,
            and distribution, beverage and juice businesses manage a
            fast-moving value chain. Each stage brings its own operational
            challenges.
          </motion.p>
        </motion.div>

        {/* ================= CHALLENGE CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CHALLENGES.map(({ number, title, description, photo, Icon }) => (
            <motion.article
              key={number}
              variants={cardVariants}
              whileHover="hover"
              className="relative h-full min-h-[228px] min-w-0 overflow-hidden rounded-[16px] bg-white shadow-[0_10px_30px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(25,35,55,0.13)]"
            >
              <div
                className="absolute inset-y-0 right-0 w-[46%]"
                style={{ clipPath: PHOTO_CLIP }}
              >
                <img
                  src={photo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <span className="absolute right-[38%] top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#fdf0e4]">
                <Icon className="h-5 w-5 text-navy-900" strokeWidth={1.6} />
              </span>

              <div className="relative z-10 w-[60%] p-5">
                <p className="h-display text-[24px] font-extrabold leading-none tracking-tight text-orange-500">
                  {number}
                </p>

                {/* Two lines' worth of height either way, so every description
                    starts on the same line */}
                <h3 className="mt-3 h-display min-h-[42px] text-[15px] font-semibold leading-snug text-navy-950">
                  {title}
                </h3>

                <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-600">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
