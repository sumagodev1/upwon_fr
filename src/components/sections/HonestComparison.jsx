import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

const TONE_CLASS = {
  good: 'text-emerald-700 bg-emerald-50',
  warn: 'text-amber-700 bg-amber-50',
  crit: 'text-rose-700 bg-rose-50',
  neutral: 'text-navy-700 bg-cream-100',
};

export default function HonestComparison({
  rows,
  eyebrow = 'Honest Comparison',
  title,
  // Column labels are now per-platform so the same component can power the
  // ERP-vs-SAP-vs-Tally comparison and the SFA-vs-Bizom-vs-Excel comparison
  // (and equivalents for every other platform). Defaults keep the original
  // ERP behaviour for any caller that doesn't pass them.
  competitorA = 'SAP Business One',
  competitorB = 'Tally + Excel',
  description,
}) {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow={eyebrow}
          title={title || 'An honest comparison — no marketing spin.'}
          description={
            description ||
            `We name who each tool is right for. Not just why we win — but where ${competitorA} wins, and where ${competitorB} is genuinely the right choice.`
          }
        />

        <div className="mt-14 overflow-x-auto">
          <div className="min-w-[640px] md:min-w-[840px] overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-enterprise">
            {/* Header */}
            <div className="grid grid-cols-[1.4fr_1.6fr_1.5fr_1.5fr] gap-px bg-cream-300">
              <div className="bg-navy-950 px-5 py-4">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                  Criteria
                </p>
              </div>
              <div className="bg-orange-500 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  UpWon
                </p>
              </div>
              <div className="bg-navy-950 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  {competitorA}
                </p>
              </div>
              <div className="bg-navy-950 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  {competitorB}
                </p>
              </div>
            </div>

            {/* Rows */}
            {rows.map((r, i) => (
              <motion.div
                key={r.criteria}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                className="grid grid-cols-[1.4fr_1.6fr_1.5fr_1.5fr] gap-px bg-cream-300"
              >
                <div className="bg-cream-100 px-5 py-4">
                  <p className="text-[14px] font-semibold text-navy-950 font-display">
                    {r.criteria}
                  </p>
                </div>
                <div className="bg-orange-50 px-4 py-4">
                  <p className="text-[14px] font-semibold text-emerald-700 leading-snug">
                    {r.upwon}
                  </p>
                </div>
                <div className={`px-4 py-4 ${TONE_CLASS[r.sapTone] || 'bg-white'}`}>
                  <p className="text-[14px] leading-snug">{r.sap}</p>
                </div>
                <div className={`px-4 py-4 ${TONE_CLASS[r.tallyTone] || 'bg-white'}`}>
                  <p className="text-[14px] leading-snug">{r.tally}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
