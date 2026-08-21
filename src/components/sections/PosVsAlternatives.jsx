import { m as motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  POS "UpWon vs the Alternatives" — a capability-by-capability star matrix
  (UpWon POS vs billing-first POS tools). Stars reflect out-of-the-box capability.

  FLAG: competitor names + ratings are a proposed comparison — confirm factual
  accuracy and legal sign-off before publishing named claims.
*/

const EASE = [0.22, 1, 0.3, 1];

const COLS = [
  { key: 'upwon', label: 'UpWon POS' },
  { key: 'petpooja', label: 'Petpooja' },
  { key: 'restroworks', label: 'Restroworks' },
  { key: 'gofrugal', label: 'GoFrugal' },
];

const ROWS = [
  { cap: 'Recipe-level inventory accuracy', upwon: 5, petpooja: 2, restroworks: 2, gofrugal: 1 },
  { cap: 'True food cost & margin', upwon: 5, petpooja: 2, restroworks: 3, gofrugal: 1 },
  { cap: 'FSSAI compliance (native)', upwon: 5, petpooja: 3, restroworks: 3, gofrugal: 2 },
  { cap: 'GST & e-invoicing (native)', upwon: 5, petpooja: 4, restroworks: 4, gofrugal: 4 },
  { cap: 'Offline-first billing', upwon: 5, petpooja: 4, restroworks: 3, gofrugal: 4 },
  { cap: 'Kitchen (KOT / KDS)', upwon: 5, petpooja: 5, restroworks: 5, gofrugal: 3 },
  { cap: 'Delivery aggregator integration', upwon: 5, petpooja: 5, restroworks: 4, gofrugal: 3 },
  { cap: 'Loyalty & CRM', upwon: 4, petpooja: 4, restroworks: 4, gofrugal: 3 },
  { cap: 'Multi-outlet / chain control', upwon: 5, petpooja: 3, restroworks: 4, gofrugal: 4 },
  { cap: 'Upgrade path into full ERP', upwon: 5, petpooja: 1, restroworks: 0, gofrugal: 2 },
  { cap: 'Mobile-first / cloud', upwon: 5, petpooja: 4, restroworks: 4, gofrugal: 3 },
];

const TCO = {
  upwon: { l: 'BEST', cls: 'text-orange-700 bg-orange-100' },
  petpooja: { l: 'LOW', cls: 'text-emerald-700 bg-emerald-50' },
  restroworks: { l: 'MEDIUM', cls: 'text-navy-700 bg-cream-100' },
  gofrugal: { l: 'LOW-MED', cls: 'text-emerald-700 bg-emerald-50' },
};

const TEMPLATE = `minmax(150px, 1.8fr) repeat(${COLS.length}, minmax(70px, 1fr))`;

function StarRating({ count }) {
  if (!count) {
    return (
      <span
        className="inline-flex items-center justify-center text-[14px] font-semibold text-navy-300"
        aria-label="Not available natively"
      >
        —
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < count ? 'fill-orange-500 text-orange-500' : 'text-cream-400'}`}
        />
      ))}
    </span>
  );
}

export default function PosVsAlternatives() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />
      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">UpWon vs the Alternatives</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.12] tracking-tight text-navy-950">
            A Faster Till Is Not the Same as a{' '}
            <span className="gradient-text-orange">System You Won&apos;t Outgrow.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Star ratings reflect out-of-the-box capability, not what can be built with custom
            development.
          </p>
        </motion.div>

        {/* Star matrix */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-cream-300 bg-white shadow-enterprise [scrollbar-width:thin]">
          <div className="min-w-[560px] md:min-w-[800px]">
            {/* Header */}
            <div className="grid gap-px bg-cream-300" style={{ gridTemplateColumns: TEMPLATE }}>
              <div className="sticky left-0 z-20 bg-navy-950 px-3 py-4 shadow-[6px_0_10px_-6px_rgba(0,0,0,0.25)] sm:px-5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                  Capability
                </p>
              </div>
              {COLS.map((c) => (
                <div
                  key={c.key}
                  className={`px-2 py-4 text-center sm:px-3 ${
                    c.key === 'upwon' ? 'bg-orange-500 text-white' : 'bg-navy-950 text-white'
                  }`}
                >
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] sm:text-[11px]">
                    {c.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <motion.div
                key={row.cap}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 12) * 0.025 }}
                className="grid gap-px bg-cream-300"
                style={{ gridTemplateColumns: TEMPLATE }}
              >
                <div className="sticky left-0 z-10 flex items-center bg-white px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                  <p className="text-[14px] text-navy-900 sm:text-[14px]">{row.cap}</p>
                </div>
                {COLS.map((c) => (
                  <div
                    key={c.key}
                    className={`flex items-center justify-center px-2 py-3.5 sm:px-3 ${
                      c.key === 'upwon' ? 'bg-orange-50' : 'bg-white'
                    }`}
                  >
                    <StarRating count={row[c.key]} />
                  </div>
                ))}
              </motion.div>
            ))}

            {/* TCO row */}
            <div className="grid gap-px bg-cream-300" style={{ gridTemplateColumns: TEMPLATE }}>
              <div className="sticky left-0 z-10 bg-cream-100 px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                <p className="text-[14px] font-semibold text-navy-950 sm:text-[14px]">
                  Total Cost of Ownership (3 yr)
                </p>
              </div>
              {COLS.map((c) => {
                const tco = TCO[c.key];
                return (
                  <div
                    key={c.key}
                    className={`flex items-center justify-center px-2 py-3.5 sm:px-3 ${
                      tco?.cls || 'bg-cream-100'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] sm:text-[10.5px] sm:tracking-[0.12em]">
                      {tco?.l || '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-navy-600">
          <span className="inline-flex items-center gap-1.5">
            <StarRating count={5} /> Best in class
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StarRating count={3} /> Good
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StarRating count={1} /> Minimal
          </span>
          <span className="text-navy-400">— Not available natively</span>
        </div>
      </Container>
    </section>
  );
}
