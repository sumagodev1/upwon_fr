import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CHALLENGES = [
  {
    number: '01',
    title: 'Raw Material Procurement & Availability',
    description:
      'Maintain better visibility across suppliers, purchase requirements, incoming materials, and raw-material availability for planned production.',
    photo: '/images/eng_raw_material.webp',
    tint: 'bg-[#fdf0e6]',
  },
  {
    number: '02',
    title: 'Bill of Materials & Production Planning',
    description:
      'Keep bill of materials, material requirements, production planning, and manufacturing activities better connected.',
    photo: '/images/eng_bill_of_material.webp',
    tint: 'bg-[#eef3fb]',
  },
  {
    number: '03',
    title: 'Inventory & Stock Coordination',
    description:
      'Track raw materials, work-in-process items, components, consumables, and finished products with better visibility across operational locations.',
    photo: '/images/eng_stock_coordination.webp',
    tint: 'bg-[#fdf0e6]',
  },
  {
    number: '04',
    title: 'Quality Inspection & Product Control',
    description:
      'Maintain visibility across quality inspection touchpoints and product-related workflows throughout procurement and production.',
    photo: '/images/eng_quality_inspection.webp',
    tint: 'bg-[#eef3fb]',
  },
  {
    number: '05',
    title: 'Warehouse & Material Movement',
    description:
      'Coordinate receiving, storage, transfers, stock movement, picking, finished-goods handling, and dispatch across warehouses and plants.',
    photo: '/images/eng_material_movement.webp',
    tint: 'bg-[#fdf0e6]',
  },
  {
    number: '06',
    title: 'Multi-Department & Multi-Location Operations',
    description:
      'Maintain better visibility across plants, production units, warehouses, offices, and other operational locations.',
    photo: '/images/eng_multi_department.webp',
    tint: 'bg-[#eef3fb]',
  },
];

export default function EngineeringOperationalChallenges() {
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
    <section className="relative overflow-hidden bg-[#fbfcfe] py-10 sm:py-12 lg:py-14">
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
            <Eyebrow>OPERATIONAL CHALLENGES</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Many moving parts.{' '}
            <span className="gradient-text-orange">
              Real operational challenges.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            From materials to manufacturing, quality to dispatch — engineering
            and manufacturing businesses manage complex, interconnected
            operations. Here are key areas where challenges often arise.
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
          {CHALLENGES.map(({ number, title, description, photo, tint }) => (
            <motion.article
              key={number}
              variants={cardVariants}
              whileHover="hover"
              className="relative flex h-full min-w-0 overflow-hidden rounded-[16px] border border-navy-950/[0.05] bg-white shadow-[0_10px_30px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(25,35,55,0.12)]"
            >
              {/* The artwork sits on its own tinted panel down the card's
                  right side, as in the layout */}
              <div
                className={`absolute inset-y-0 right-0 flex w-[42%] items-center justify-center ${tint}`}
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

              <div className="relative z-10 w-[62%] p-5">
                <p className="h-display text-[26px] font-bold leading-none tracking-tight text-navy-950/25">
                  {number}
                </p>

                {/* Two lines' worth of height either way, so every description
                    starts on the same line */}
                <h3 className="mt-3 h-display min-h-[42px] text-[15px] font-bold leading-snug text-navy-950">
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
