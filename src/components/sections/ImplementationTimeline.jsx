import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { IMPLEMENTATION_PHASES } from '../../data/implementation.js';

// Looping timeline cadence (seconds)
const WARMUP = 0.4;   // brief blank moment at the start of each cycle
const STEP_GAP = 1.2; // gap between successive step activations
const HOLD = 1.8;     // how long the whole sequence stays lit after the last step
const RESET = 0.6;    // fade-out before the next cycle begins
const TOTAL = IMPLEMENTATION_PHASES.length;
const CYCLE = WARMUP + STEP_GAP * (TOTAL - 1) + HOLD + RESET;

// Normalised times within one cycle (0..1) shared by every step
const tLineFull = (WARMUP + STEP_GAP * (TOTAL - 1)) / CYCLE;
const tHoldEnd = (WARMUP + STEP_GAP * (TOTAL - 1) + HOLD) / CYCLE;

// Build the keyframe times for step `i`. Order: cycle start → just before activation
// → snap to active → end of hold → cycle end (back to dim).
const stepTimes = (i) => {
  const tActivate = (WARMUP + i * STEP_GAP) / CYCLE;
  return [0, Math.max(0, tActivate - 0.01), Math.min(1, tActivate + 0.03), tHoldEnd, 1];
};

// Pulse-ring times: a quick expand right after activation
const pulseTimes = (i) => {
  const tActivate = (WARMUP + i * STEP_GAP) / CYCLE;
  return [
    0,
    Math.max(0, tActivate - 0.01),
    Math.min(1, tActivate + 0.12),
    Math.min(1, tActivate + 0.32),
    1,
  ];
};

const loopTransition = (i) => ({
  duration: CYCLE,
  repeat: Infinity,
  ease: 'easeOut',
  times: stepTimes(i),
});

export default function ImplementationTimeline() {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-50" />
      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Implementation Promise"
          title={
            <>
              From contract signed to fully live —{' '}
              <span className="gradient-text-orange">in 30 to 45 days.</span>
            </>
          }
          description="93% of our projects go live on time. Here is what happens at every stage."
        />

        <div className="relative mt-16">
          {/* Static rail (background) */}
          <div className="absolute left-0 right-0 top-[44px] hidden h-0.5 bg-cream-300 lg:block" />

          {/* Looping progress line — fills left-to-right then resets each cycle */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 0, 1, 1, 0] }}
            transition={{
              duration: CYCLE,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, WARMUP / CYCLE, tLineFull, tHoldEnd, 1],
            }}
            style={{ transformOrigin: '0% 50%' }}
            className="absolute left-0 right-0 top-[44px] hidden h-0.5 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-300 lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-4">
            {IMPLEMENTATION_PHASES.map((p, i) => (
              <div key={p.id} className="relative">
                {/* Icon plate with pulse */}
                <div className="relative mx-auto h-[88px] w-[88px]">
                  {/* Expanding ring pulse — fires once per cycle when this step lights up */}
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 0.8, 1.55, 1.55, 0.8],
                      opacity: [0, 0, 0.6, 0, 0],
                    }}
                    transition={{
                      duration: CYCLE,
                      repeat: Infinity,
                      ease: 'easeOut',
                      times: pulseTimes(i),
                    }}
                    className="absolute inset-0 rounded-2xl border-2 border-orange-500"
                  />

                  <motion.div
                    initial={{ scale: 0.85, opacity: 0.45 }}
                    animate={{
                      scale: [0.85, 0.85, 1, 1, 0.85],
                      opacity: [0.45, 0.45, 1, 1, 0.45],
                    }}
                    transition={loopTransition(i)}
                    className="relative z-10 grid h-[88px] w-[88px] place-items-center rounded-2xl border border-cream-300 bg-white shadow-enterprise"
                  >
                    <p.icon className="h-7 w-7 text-orange-600" />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 0, 1, 1, 0] }}
                      transition={loopTransition(i)}
                      className="absolute -top-2.5 right-2 grid h-6 w-6 place-items-center rounded-full bg-navy-950 text-[14px] font-bold text-white shadow"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>
                  </motion.div>
                </div>

                {/* Text block dims/brightens with the icon */}
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 0.5, 1, 1, 0.5] }}
                  transition={loopTransition(i)}
                  className="mt-5 text-center lg:text-left"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                    {p.week}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-navy-950">{p.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-snug text-navy-600">
                    {p.deliverables[0]}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges — these stay static once the page loads */}
        <div className="mt-12 grid gap-3 md:grid-cols-4">
          {[
            'Dedicated SPOC from Day 1',
            'Implementation Included in Contract',
            'Free User Training',
            '90-Day Post Go-Live Support',
          ].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2 rounded-xl border border-cream-300 bg-cream-100 px-4 py-3 text-[14px] font-medium text-navy-900"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-600" />
              {t}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/implementation" className="btn-secondary">
            Full implementation process
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
