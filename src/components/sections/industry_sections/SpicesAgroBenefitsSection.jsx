import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The artwork draws the bowl, the ring and all ten badges, but carries no
  labels — so those are laid over it, each anchored beside its own badge.
  Positions are percentages of the 1586x992 artwork and the type scales with
  it through a container query, so they hold their place at any width.

  The badges sit close to the artwork's edges, so the labels are given room
  by rendering the artwork narrower than its column and letting them overhang
  it on both sides.
*/
const BENEFITS = [
  { label: 'Production and processing visibility', side: 'left', x: 19.9, y: 10 },
  { label: 'Quality inspection coordination', side: 'left', x: 12.2, y: 26 },
  { label: 'Raw-material procurement visibility', side: 'left', x: 10.3, y: 46 },
  { label: 'Batch and product movement visibility', side: 'left', x: 12.2, y: 64.5 },
  { label: 'Inventory and stock tracking', side: 'left', x: 19.7, y: 82.3 },
  { label: 'Storage and warehouse coordination', side: 'right', x: 79.6, y: 9.7 },
  { label: 'Sales and distribution coordination', side: 'right', x: 88, y: 26.2 },
  { label: 'Multi-location operational visibility', side: 'right', x: 89.9, y: 46 },
  { label: 'Order and fulfillment workflows', side: 'right', x: 88, y: 64.5 },
  { label: 'Access to real-time business insights', side: 'right', x: 80.7, y: 82 },
];

// Clear of the badge, which is about 5% of the artwork's width across,
// plus breathing room between the badge and its label
const LABEL_GAP = 10;
const LABEL_SIZE = 'clamp(12px, 2.2cqw, 18px)';

export default function SpicesAgroBenefitsSection() {
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

  const labelGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.3 },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fdf8f3] to-white py-12 sm:py-16 lg:py-20">
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
            <Eyebrow className="justify-center">BENEFITS</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Greater Control Over Every Batch.{' '}
            <span className="gradient-text-orange">
              Better Visibility Across Every Product Movement.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            With UpWon, spices and agro-processing businesses can connect their
            core operations and reduce the complexity of managing procurement,
            raw materials, quality, processing, inventory, warehouses, sales,
            and distribution across multiple teams and locations.
          </motion.p>
        </motion.div>

        {/* ================= BENEFIT RING ================= */}
        {/* Container query unit, so the overlaid labels track the artwork */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative mx-auto mt-8 hidden w-[64%] max-w-[720px] [container-type:inline-size] lg:block"
        >
          <img
            src="/images/agro_bene.webp"
            alt="A bowl of spices ringed by ten connected UpWon workflows"
            width={1586}
            height={992}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />

          <motion.div
            variants={labelGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="absolute inset-0"
          >
            {BENEFITS.map(({ label, side, x, y }) => (
              <span
                key={label}
                className={`absolute w-[24%] -translate-y-1/2 ${
                  side === 'left' ? 'text-right' : 'text-left'
                }`}
                style={
                  side === 'left'
                    ? { right: `${100 - x + LABEL_GAP}%`, top: `${y}%` }
                    : { left: `${x + LABEL_GAP}%`, top: `${y}%` }
                }
              >
                <motion.span
                  variants={labelVariants}
                  className="block font-semibold leading-tight text-navy-900"
                  style={{ fontSize: LABEL_SIZE }}
                >
                  {label}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- The ring's labels are unreadable at these widths, so
             the artwork carries the badges and the ten benefits list out
             beneath it ---------- */}
        <div className="lg:hidden">
          <motion.img
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            src="/images/agro_bene.webp"
            alt="A bowl of spices ringed by ten connected UpWon workflows"
            width={1586}
            height={992}
            loading="lazy"
            decoding="async"
            className="mt-8 block h-auto w-full"
          />

          <motion.ul
            variants={labelGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-6 grid gap-2.5 sm:grid-cols-2"
          >
            {BENEFITS.map(({ label }) => (
              <motion.li
                key={label}
                variants={labelVariants}
                className="flex min-w-0 items-start gap-2.5 text-[13.5px] leading-snug text-navy-800"
              >
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-navy-500 sm:text-[12.5px]"
        >
          One Platform. A Stronger Tomorrow.
        </motion.p>
      </Container>
    </section>
  );
}
