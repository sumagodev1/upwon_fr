import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

/*
  The artwork holds ten hexagons in an alternating top/bottom run. Their
  centres are evenly spaced 7.26% apart starting at 26.63% of the image width,
  which is exactly a ten-column grid inset by 23% on the left (the UpWon badge)
  and 4.4% on the right — so the labels below are laid out as that grid rather
  than positioned one by one.
*/
const DIAGRAM_LABELS = [
  { number: '01', label: 'Procurement & Purchasing', row: 'top' },
  { number: '02', label: 'Raw Material Management', row: 'bottom' },
  { number: '03', label: 'Inventory Management', row: 'top' },
  { number: '04', label: 'Production Management', row: 'bottom' },
  { number: '05', label: 'Quality Inspection', row: 'top' },
  { number: '06', label: 'Warehouse Operations', row: 'bottom' },
  { number: '09', label: 'Sales & Order Management', row: 'top' },
  { number: '08', label: 'Outlet Operations', row: 'bottom' },
  { number: '11', label: 'Multi-Location Operations', row: 'top' },
  { number: '12', label: 'Finance & Reporting', row: 'bottom' },
];

// The full set, including the two workflows the artwork does not depict.
const WORKFLOWS = [
  'Procurement & Purchasing',
  'Raw Material Management',
  'Inventory Management',
  'Production Management',
  'Quality Inspection',
  'Warehouse Operations',
  'Sales & Order Management',
  'Outlet Operations',
  'Distribution Management',
  'Dispatch & Logistics',
  'Multi-Location Operations',
  'Finance & Reporting',
];

export default function SweetsHowUpwonHelps() {
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

  const chipsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.1 },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, y: d(12) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-navy-950 py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow variant="dark" className="justify-center">
              HOW UPWON HELPS
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-white sm:text-[34px] lg:text-[36.8px]"
          >
            One <span className="gradient-text-orange">Connected Platform</span>{' '}
            for Your Sweets &amp; Namkeen Operations
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-cream-100/80 sm:text-base"
          >
            UpWon connects the key workflows behind your sweets and namkeen
            business—helping teams manage the movement of ingredients, products,
            information, and operations through one unified platform.
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= DIAGRAM (lg and up) ================= */}
      {/* Wider than the shared Container so the hexagon labels have room */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: d(24) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
          className="relative mt-10 hidden [container-type:inline-size] lg:block"
        >
          <img
            src="/images/sweet_how_upwon_help.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />

          {/* Labels sit under their hexagon — cqw keeps them in proportion */}
          <div className="absolute inset-0 pl-[23%] pr-[4.4%]">
            <div className="grid h-full grid-cols-10">
              {DIAGRAM_LABELS.map(({ number, label, row }) => (
                <div key={number} className="relative">
                  <span
                    className="absolute left-1/2 w-full -translate-x-1/2 px-1 text-center font-medium leading-tight text-white [font-size:clamp(9px,0.78cqw,14px)]"
                    style={{ top: row === 'top' ? '46.5%' : '88.5%' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Container className="relative z-10">
        {/* ================= WORKFLOW LIST (below lg only) ================= */}
        {/* The diagram is 2654px wide and unreadable below lg, so the same
            workflows stand in for it there — and they carry the full twelve. */}
        <motion.div
          variants={chipsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 lg:hidden"
        >
          <motion.p
            variants={fadeIn}
            className="text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-orange-400"
          >
            Connected workflows across
          </motion.p>

          <div className="mx-auto mt-5 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WORKFLOWS.map((workflow) => (
              <motion.div
                key={workflow}
                variants={chipVariants}
                className="flex items-center gap-3 rounded-[12px] border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span className="min-w-0 text-[13.5px] leading-snug text-cream-100/85 sm:text-sm">
                  {workflow}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
