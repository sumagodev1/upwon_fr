import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CHALLENGES = [
  {
    number: '01.',
    title: 'Central Kitchen & Outlet Coordination',
    description:
      'Keep central production, outlet requirements, inventory movement, and product supply better connected.',
    photo: '/images/qsr_central_kitchan.webp',
  },
  {
    number: '02.',
    title: 'Recipe & Food Cost Visibility',
    description:
      'Maintain clearer visibility across recipes, ingredients, consumption, production requirements, and operational costs.',
    // These two artwork files are named the other way round to what they
    // actually draw, so the pairing below looks inverted on purpose.
    photo: '/images/qsr_inventary_control.webp',
  },
  {
    number: '03.',
    title: 'Multi-Outlet Inventory Control',
    description:
      'Track ingredients, packaging, semi-finished goods, and finished products across central kitchens, warehouses, and outlets.',
    photo: '/images/qsr_cost_visibility.webp',
  },
  {
    number: '04.',
    title: 'Franchise & Location-Level Visibility',
    description:
      'Maintain better visibility across franchise partners, company-owned outlets, location activity, and operational performance.',
    photo: '/images/qsr_loc_level_visibility.webp',
  },
  {
    number: '05.',
    title: 'Procurement & Supply Coordination',
    description:
      'Connect purchasing, supplier requirements, incoming materials, inventory availability, and operational demand.',
    photo: '/images/qsr_supply_coordination.webp',
  },
  {
    number: '06.',
    title: 'Workforce & Shift Coordination',
    description:
      'Manage employees across kitchens, outlets, offices, and field operations with better visibility into attendance, shifts, and workforce activity.',
    photo: '/images/qsr_shift_cordination.webp',
  },
];

export default function QsrOperationalChallenges() {
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
    hidden: { opacity: 0, y: d(22), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fbfcfe] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/qsr_oper_challenge_back.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-white/55" />
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
            From Central Kitchen to Counter,{' '}
            <span className="gradient-text-orange">
              Every Location Has to Stay in Step.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            Key operational challenges across QSR &amp; Franchise F&amp;B
            businesses that impact efficiency, cost control, and growth.
          </motion.p>
        </motion.div>

        {/* ================= CHALLENGE CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {CHALLENGES.map(({ number, title, description, photo }) => (
            <motion.article
              key={number}
              variants={cardVariants}
              whileHover="hover"
              className="flex min-w-0 flex-col rounded-[18px] border border-navy-950/[0.06] bg-white p-3 shadow-[0_10px_30px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(25,35,55,0.12)]"
            >
              {/* The artwork already carries the step number and the icon
                  badge — and the badge sits at its very bottom edge, so this
                  is contained in a box cut to the tallest of the six ratios
                  rather than cropped to a fixed height. */}
              <img
                src={photo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="block aspect-[100/61] w-full rounded-[12px] object-contain"
              />

              <div className="px-3 pb-4 pt-5 text-center">
                <h3 className="h-display text-[16px] font-semibold leading-snug text-navy-950">
                  {title}
                </h3>

                <p className="mt-2.5 text-[13px] leading-relaxed text-navy-600">
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
