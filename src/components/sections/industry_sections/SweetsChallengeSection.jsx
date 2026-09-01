import { m as motion, useReducedMotion } from 'framer-motion';
import {
  X,
  FileSpreadsheet,
  EyeOff,
  Clock,
  FileQuestion,
  BarChart3,
  Users,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

const FLOW = [
  { label: 'Raw Materials', art: '/images/sweet_raw_material.webp' },
  { label: 'Production', art: '/images/sweet_production.webp' },
  { label: 'Inventory', art: '/images/sweet_inventory.webp' },
  { label: 'Outlets / Distributors', art: '/images/sweet_outlet.webp' },
  { label: 'Billing & Reporting', art: '/images/sweet_billing.webp' },
];

const FRICTION = [
  { label: 'Scattered data across spreadsheets and multiple tools', Icon: FileSpreadsheet },
  { label: 'Limited visibility across production, stock, and distribution', Icon: EyeOff },
  { label: 'Manual follow-ups cause delays and coordination gaps', Icon: Clock },
  { label: 'Inaccurate reporting affects decision-making', Icon: FileQuestion },
  { label: 'Difficult to track business performance in real time', Icon: BarChart3 },
  { label: 'Teams spend more time managing data than growing the business', Icon: Users },
];

export default function SweetsChallengeSection() {
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

  const flowGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.11), delayChildren: 0.1 },
    },
  };

  const flowItem = {
    hidden: { opacity: 0, y: d(20), scale: reduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
  };

  const frictionItem = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fdf4ea] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/sweet_challange_back.webp')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#fdf4ea]/45" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-3xl"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>THE CHALLENGE</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Traditional Products.{' '}
            <span className="gradient-text-orange">
              Complex, Fast-Moving Operations.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From ingredients and production to inventory, outlets, and
            distribution, every stage depends on the one before it—and when they
            run on spreadsheets and disconnected systems, coordination takes
            longer than the work itself.
          </motion.p>
        </motion.div>

        {/* ================= FLOW ================= */}
        {/* Full width, starting at the left edge of the container */}
        <motion.div
          variants={flowGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid min-w-0 grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:mt-12 lg:flex lg:items-end lg:justify-between lg:gap-0"
        >
            {FLOW.map(({ label, art }) => (
              <motion.div
                key={label}
                variants={flowItem}
                className="flex min-w-0 items-end lg:flex-1"
              >
                <div className="flex min-w-0 flex-1 flex-col items-center">
                  <div className="flex h-[140px] items-end justify-center sm:h-[170px] lg:h-[200px]">
                    <img
                      src={art}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="max-h-[140px] w-auto max-w-full object-contain sm:max-h-[170px] lg:max-h-[200px]"
                    />
                  </div>

                  <span className="mt-4 inline-block rounded-[8px] border border-orange-300/70 bg-white/80 px-3 py-1.5 text-center text-[11px] font-semibold leading-tight text-orange-600 sm:text-[12px] lg:text-[13px]">
                    {label}
                  </span>
                </div>

              </motion.div>
          ))}
        </motion.div>

        {/* ================= FRICTION STRIP ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-9 grid grid-cols-1 overflow-hidden rounded-[20px] border border-[#f0dfcc] bg-white/85 shadow-[0_12px_35px_rgba(120,70,35,0.07)] backdrop-blur-sm sm:mt-11 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {FRICTION.map(({ label, Icon }, index) => (
            <motion.div
              key={label}
              variants={frictionItem}
              className={`flex flex-col items-center px-4 py-6 text-center ${
                index !== FRICTION.length - 1
                  ? 'border-b border-[#f2e5d6] sm:border-b-0 xl:border-r'
                  : ''
              }`}
            >
              <span className="relative">
                <Icon
                  className="h-8 w-8 text-[#c2703a]"
                  strokeWidth={1.5}
                />

                <span className="absolute -bottom-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white">
                  <X className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
              </span>

              <p className="mt-3 text-[12.5px] leading-relaxed text-navy-600">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
