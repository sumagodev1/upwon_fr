import { m as motion, useReducedMotion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The artwork draws the ring and all nine numbered pills, labels included, so
  nothing is laid over it. They are listed here so the copy still reaches
  screen readers through the artwork's alt text.
*/
const BENEFITS = [
  'Ingredient and raw-material visibility',
  'Multi-location operational visibility',
  'Recipe and production coordination',
  'Quality inspection visibility',
  'Packaging and finished-goods coordination',
  'Inventory and stock tracking',
  'Shelf-life related operational visibility',
  'Warehouse and storage coordination',
  'Sales and distribution coordination',
];

// The tenth sits beside the copy, as in the layout
const HIGHLIGHT = 'Access to real-time business insights';

export default function BeveragesBenefitsSection() {
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
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fdf8f3] to-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 xl:gap-12">
          {/* ================= LEFT — COPY ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>BENEFITS</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[34px]"
            >
              Greater Control Over{' '}
              <span className="gradient-text-orange">Every Batch.</span> Better
              Visibility Across Every{' '}
              <span className="gradient-text-orange">Product Movement.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              With UpWon, beverage and juice businesses can connect their core
              operations and reduce the complexity of managing procurement,
              ingredients, recipes, production, quality, packaging, inventory,
              warehouses, sales, and distribution across multiple teams and
              locations.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 inline-flex items-center gap-4 rounded-full bg-white py-3 pl-3 pr-6 shadow-[0_12px_30px_rgba(25,35,55,0.1)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500">
                <BarChart3 className="h-6 w-6 text-white" strokeWidth={1.8} />
              </span>

              <span className="h-display min-w-0 max-w-[180px] text-[14px] font-semibold leading-snug text-navy-950">
                {HIGHLIGHT}
              </span>
            </motion.div>
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
              src="/images/bev_benefit_section.webp"
              alt={`Nine connected benefits ringed around UpWon: ${BENEFITS.join(
                ', '
              )}`}
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
