import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

/*
  The artwork already draws all ten benefits around the ring, so they are not
  repeated over it. They are listed here so the copy still reaches screen
  readers, and so the small screens — where the ring's labels would be far too
  small to read — have something legible to show instead.
*/
const BENEFITS = [
  'Central kitchen and outlet coordination',
  'Recipe and production visibility',
  'Ingredient and inventory control',
  'Multi-outlet operational visibility',
  'Franchise and location-level coordination',
  'Warehouse and stock movement',
  'Workforce and shift visibility',
  'Sales and order coordination',
  'Replenishment and supply workflows',
  'Access to real-time business insights',
];

export default function QsrBenefitsSection() {
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
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  const listGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: d(12) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 xl:gap-14">
          {/* ================= LEFT — COPY ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>THE BENEFITS</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              Greater Control Across Every Outlet.{' '}
              <span className="gradient-text-orange">
                Better Visibility Across Every Operation.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              With UpWon, QSR and franchise-led F&amp;B businesses can connect
              their core operations and reduce the complexity of managing
              procurement, central kitchens, recipes, inventory, outlets,
              people, sales, and franchise operations across multiple teams and
              locations.
            </motion.p>

            {/* The ring is shown at every width, but its baked-in labels are
                far too small to read on a phone — so the same ten benefits
                also list out below the copy there */}
            <motion.ul
              variants={listGroup}
              className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:hidden"
            >
              {BENEFITS.map((benefit) => (
                <motion.li
                  key={benefit}
                  variants={itemVariants}
                  className="flex min-w-0 items-start gap-2.5 text-[13.5px] leading-snug text-navy-800"
                >
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  {benefit}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ================= RIGHT — BENEFIT RING ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/qsr_benefits_section.webp"
              alt="Ten connected benefits ringed around a chef using UpWon: central kitchen and outlet coordination, recipe and production visibility, ingredient and inventory control, multi-outlet operational visibility, franchise and location-level coordination, warehouse and stock movement, workforce and shift visibility, sales and order coordination, replenishment and supply workflows, and access to real-time business insights"
              width={1254}
              height={1254}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-[620px]"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
