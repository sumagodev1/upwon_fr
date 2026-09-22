import { m as motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '../Container/Container.jsx';
import Eyebrow from '../Eyebrow/Eyebrow.jsx';

/*
  "UpWon vs the Alternatives" (SFA-DMS) — a star-rating capability matrix
  (same visual system as the ERP ComparisonMatrix): UpWon against the standalone
  SFA / DMS point solutions field teams usually stitch together.

  PUBLICATION FLAG: competitor names and per-capability ratings below are a
  positioning proposal — confirm/adjust with sign-off before launch.
*/

const EASE = [0.22, 1, 0.3, 1];

// Column order: UpWon first, then the standalone SFA-DMS point solutions.
const COLS = [
  { key: 'upwon', label: 'UpWon' },
  { key: 'c1', label: 'Bizom' },
  { key: 'c2', label: 'FieldAssist' },
  { key: 'c3', label: 'Ivy Mobility' },
];

// Each row: capability + a star score per column (0 = not available natively → dash).
const ROWS = [
  { cap: 'Shares one data model with your ERP', s: { upwon: 5, c1: 1, c2: 1, c3: 2 } },
  { cap: 'Food & FMCG batch, expiry & FEFO built in', s: { upwon: 5, c1: 2, c2: 2, c3: 1 } },
  { cap: 'GT + MT distribution (India model)', s: { upwon: 5, c1: 4, c2: 4, c3: 3 } },
  { cap: 'Secondary sales — no exports, no reconciliation', s: { upwon: 5, c1: 3, c2: 3, c3: 2 } },
  { cap: 'Distributor claims & scheme settlement', s: { upwon: 5, c1: 3, c2: 3, c3: 3 } },
  { cap: 'Mobile-first field app (works offline)', s: { upwon: 5, c1: 4, c2: 4, c3: 4 } },
  { cap: 'Route / beat planning & optimization', s: { upwon: 5, c1: 4, c2: 3, c3: 3 } },
  { cap: 'Retailer e-ordering app', s: { upwon: 5, c1: 3, c2: 3, c3: 2 } },
  { cap: 'Van sales / direct store delivery', s: { upwon: 4, c1: 3, c2: 2, c3: 2 } },
  { cap: 'AI / demand forecasting', s: { upwon: 4, c1: 2, c2: 2, c3: 1 } },
  { cap: 'One connected system, field to finance', s: { upwon: 5, c1: 1, c2: 1, c3: 1 } },
];

// 3-year total cost of ownership summary per column.
const TCO = {
  upwon: { l: 'BEST', cls: 'text-orange-700 bg-orange-100' },
  c1: { l: 'MEDIUM', cls: 'text-navy-700 bg-cream-100' },
  c2: { l: 'MEDIUM', cls: 'text-navy-700 bg-cream-100' },
  c3: { l: 'LOW-MED', cls: 'text-emerald-700 bg-emerald-50' },
};

const GRID = {
  gridTemplateColumns: `minmax(140px, 1.6fr) repeat(${COLS.length}, minmax(64px, 1fr))`,
};

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
  const total = 5;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < count ? 'fill-orange-500 text-orange-500' : 'text-cream-400'}`}
        />
      ))}
    </span>
  );
}

export default function UpwonVsAlternatives() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">UpWon vs the Alternatives</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            A Smarter App for Your Field Team Is Not the Same as{' '}
            <span className="gradient-text-orange">One Connected System.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Out-of-the-box capability, rated capability by capability — UpWon against the standalone
            SFA / DMS point solutions field teams usually stitch together.
          </p>
        </motion.div>

        {/* Capability matrix */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-cream-300 bg-white shadow-enterprise [scrollbar-width:thin]">
          <div className="min-w-[560px] md:min-w-[820px]">
            {/* Header row */}
            <div className="grid gap-px bg-cream-300" style={GRID}>
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

            {/* Capability rows */}
            {ROWS.map((row, i) => (
              <motion.div
                key={row.cap}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 12) * 0.025 }}
                className="grid gap-px bg-cream-300"
                style={GRID}
              >
                <div className="sticky left-0 z-10 flex items-center bg-white px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                  <p className="text-[14px] text-navy-900">{row.cap}</p>
                </div>
                {COLS.map((c) => (
                  <div
                    key={c.key}
                    className={`flex items-center justify-center px-2 py-3.5 sm:px-3 ${
                      c.key === 'upwon' ? 'bg-orange-50' : 'bg-white'
                    }`}
                  >
                    <StarRating count={row.s[c.key]} />
                  </div>
                ))}
              </motion.div>
            ))}

            {/* TCO row */}
            <div className="grid gap-px bg-cream-300" style={GRID}>
              <div className="sticky left-0 z-10 bg-cream-100 px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                <p className="text-[14px] font-semibold text-navy-950">
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
