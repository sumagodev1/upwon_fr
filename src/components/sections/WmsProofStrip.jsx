import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  WMS Proof Strip — de-risks the visit with real, sourced operational numbers.
  Three Clay-style cards in a row; each card flips through its own set of stats
  automatically (content slides bottom-to-top and the card tint changes with it),
  so a small footprint carries many proof points. Numbers are best-available
  proxy proof across live UpWon deployments — shown honestly, NOT presented as
  WMS-specific case-study results.
*/

const EASE = [0.22, 1, 0.3, 1];

// Restricted palette — navy, orange and black only.
// tint = soft card background, accent = pill bg + figure colour.
const C = {
  orange: { tint: '#FFF4ED', accent: '#E85A2A' },
  navy: { tint: '#EEF1F8', accent: '#0F1535' },
  black: { tint: '#F2F3F5', accent: '#111111' },
};

const STAT = (pill, num, desc, c) => ({ pill, num, desc, ...C[c] });

// Three cards; each cycles through its own list of stats. Colours rotate through
// orange → navy → black so every card touches all three.
const CARDS = [
  [
    STAT('Wastage', '15–20%', 'Reduction in spoilage and write-offs across live deployments.', 'orange'),
    STAT('Put-Away', '70%', 'Faster put-away via the suggested-bin engine.', 'navy'),
    STAT('Dock-to-Stock', 'Mins', 'GRN to put-away in minutes, not hours.', 'black'),
  ],
  [
    STAT('Fulfilment', '20–35%', 'Higher order fulfilment accuracy after go-live.', 'navy'),
    STAT('Expiry Errors', 'Zero', 'Expiry-related dispatch errors after FEFO enforcement.', 'black'),
    STAT('Traceability', '100%', 'Batches traceable from raw material to dispatch.', 'orange'),
  ],
  [
    STAT('Stock Accuracy', '99.4%', 'Inventory accuracy post barcode and bin rollout.', 'black'),
    STAT('Multi-Site', 'Live', 'Multi-plant, multi-depot inventory in real time.', 'orange'),
    STAT('Shelf Life', 'FEFO', 'Oldest stock moves first, enforced automatically.', 'navy'),
  ],
];

function FlipCard({ stats, step, delay }) {
  const s = stats[step % stats.length];
  return (
    <div
      className="relative h-[280px] overflow-hidden rounded-3xl transition-colors duration-700 md:h-[300px]"
      style={{ background: s.tint }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={s.pill}
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -44 }}
          transition={{ duration: 0.55, ease: EASE, delay }}
          className="absolute inset-0 flex flex-col justify-start p-7 md:p-9"
        >
          <span
            className="inline-block w-fit rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
            style={{ background: s.accent }}
          >
            {s.pill}
          </span>
          <p
            className="num-display mt-5 text-6xl leading-none md:text-7xl"
            style={{ color: s.accent }}
          >
            {s.num}
          </p>
          <p className="mt-6 max-w-[90%] text-[15px] leading-snug text-navy-700">{s.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function WmsProofStrip() {
  const [step, setStep] = useState(0);

  // Advance every card to its next stat on a shared interval, so the three cards
  // flip together like the reference (staggered slightly via per-card delay).
  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Proof Strip</Eyebrow>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Not a Pitch.{' '}
            <span className="gradient-text-orange">Just What&apos;s Already Running.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Real, sourced operational numbers from live UpWon deployments — shown honestly, not
            inflated to win a headline war.
          </p>
        </motion.div>

        {/* Three flipping stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {CARDS.map((stats, i) => (
            <FlipCard key={i} stats={stats} step={step} delay={i * 0.1} />
          ))}
        </motion.div>

        {/* Source note */}
        <p className="mt-8 text-center text-[13px] font-medium text-navy-400">
          Across live UpWon deployments. Figures are indicative ranges, not WMS-specific case-study
          results.
        </p>
      </Container>
    </section>
  );
}
