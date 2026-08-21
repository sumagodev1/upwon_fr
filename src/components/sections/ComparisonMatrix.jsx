import { m as motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { COMPETITORS, COMPETITOR_LABELS, COMPETITOR_KEYS } from '../../data/metrics.js';

function StarRating({ count }) {
  // Zero = "not available natively" → show only the dash. Mixing 5 dim
  // stars + a trailing "—" made empty cells look visually equivalent to
  // filled cells on narrow screens, so the contrast between "supported"
  // and "not supported" was lost.
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
          className={`h-3 w-3 ${
            i < count ? 'fill-orange-500 text-orange-500' : 'text-cream-400'
          }`}
        />
      ))}
    </span>
  );
}

export default function ComparisonMatrix({ subset }) {
  // subset can be an array of competitor keys to include (other than upwon)
  const keys = subset || COMPETITOR_KEYS;
  const labels = keys.map((k) => COMPETITOR_LABELS[COMPETITOR_KEYS.indexOf(k)]);

  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Capability comparison"
          title="UpWon vs the market — capability by capability."
          description="Star ratings reflect out-of-the-box capability, not what can be built with custom development."
        />

        {/* Grid layout notes for mobile (≤ 320 px):
              - Outer scroll container carries the rounded card so we can
                use position:sticky on the first cell of each row without
                overflow-hidden clipping it.
              - Capability column ratio drops to 1.6fr on mobile / 2fr on
                desktop, giving competitor columns more breathing room.
              - Inner min-width drops to 520 px on mobile so a 320 px
                viewport only has to scroll ~200 px instead of ~280 px.
              - First cell of every row sticks to the scroll-left edge
                with a soft shadow so the row label is always visible. */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-cream-300 bg-white shadow-enterprise [scrollbar-width:thin]">
          <div className="min-w-[520px] md:min-w-[800px]">
            <div
              className="grid gap-px bg-cream-300"
              style={{
                gridTemplateColumns: `minmax(140px, 1.6fr) repeat(${keys.length}, minmax(64px, 1fr))`,
              }}
            >
              <div className="sticky left-0 z-20 bg-navy-950 px-3 py-4 shadow-[6px_0_10px_-6px_rgba(0,0,0,0.25)] sm:px-5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                  Capability
                </p>
              </div>
              {labels.map((l) => (
                <div
                  key={l}
                  className={`px-2 py-4 text-center sm:px-3 ${
                    l === 'UpWon' ? 'bg-orange-500 text-white' : 'bg-navy-950 text-white'
                  }`}
                >
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] sm:text-[11px]">{l}</p>
                </div>
              ))}
            </div>

            {COMPETITORS.map((row, i) => (
              <motion.div
                key={row.capability}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 12) * 0.025 }}
                className="grid gap-px bg-cream-300"
                style={{
                  gridTemplateColumns: `minmax(140px, 1.6fr) repeat(${keys.length}, minmax(64px, 1fr))`,
                }}
              >
                <div className="sticky left-0 z-10 flex items-center bg-white px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                  <p className="text-[14px] text-navy-900 sm:text-[14px]">{row.capability}</p>
                </div>
                {keys.map((k) => (
                  <div
                    key={k}
                    className={`flex items-center justify-center px-2 py-3.5 sm:px-3 ${
                      k === 'upwon' ? 'bg-orange-50' : 'bg-white'
                    }`}
                  >
                    <StarRating count={row[k]} />
                  </div>
                ))}
              </motion.div>
            ))}

            {/* TCO row */}
            <div
              className="grid gap-px bg-cream-300"
              style={{
                gridTemplateColumns: `minmax(140px, 1.6fr) repeat(${keys.length}, minmax(64px, 1fr))`,
              }}
            >
              <div className="sticky left-0 z-10 bg-cream-100 px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                <p className="text-[14px] font-semibold text-navy-950 sm:text-[14px]">
                  Total Cost of Ownership (3 yr)
                </p>
              </div>
              {keys.map((k) => {
                const tco = {
                  upwon: { l: 'BEST', cls: 'text-orange-700 bg-orange-100' },
                  sap: { l: 'HIGHEST', cls: 'text-rose-700 bg-rose-50' },
                  netsuite: { l: 'VERY HIGH', cls: 'text-rose-700 bg-rose-50' },
                  odoo: { l: 'MEDIUM', cls: 'text-navy-700 bg-cream-100' },
                  erpnext: { l: 'LOW', cls: 'text-emerald-700 bg-emerald-50' },
                  zoho: { l: 'LOW-MED', cls: 'text-emerald-700 bg-emerald-50' },
                }[k];
                return (
                  <div
                    key={k}
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
