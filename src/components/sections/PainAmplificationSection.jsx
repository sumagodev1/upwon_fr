import { m as motion } from 'framer-motion';
import { AlertTriangle, ArrowDownRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { getPlatformPains } from '../../data/modules.js';

// Brief §2.3 — Pain Amplification.
// LEFT column: "The reality" — amber-tinted card with current pain language.
// RIGHT column: "What it costs you" — financial / operational impact in
// quantified terms.
// Mirrors the brief's intent: visceral, loss-framed, business-advisor voice.
export default function PainAmplificationSection({ slug, productCode }) {
  const pains = getPlatformPains(slug);
  if (!pains || pains.length === 0) return null;

  return (
    <section
      id="pain"
      className="relative overflow-hidden bg-white section-pad scroll-mt-32"
    >
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="The reality, and what it costs"
          title={
            <>
              The hidden cost of running{' '}
              <span className="gradient-text-orange">{productCode}</span> on Excel.
            </>
          }
          description="What we hear, every week, from operators who haven't moved yet. The first column is the day-to-day reality. The second is the money + time leaving the business in the background."
        />

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-enterprise">
          {/* Header */}
          <div className="grid grid-cols-1 gap-px bg-cream-300 md:grid-cols-2">
            <div className="bg-amber-50 px-6 py-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-700">
                The reality
              </p>
              <p className="mt-1 text-[14px] text-amber-800/80">
                What it looks like today — in your own words.
              </p>
            </div>
            <div className="bg-rose-50 px-6 py-4">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-rose-700">
                What it costs you
              </p>
              <p className="mt-1 text-[14px] text-rose-800/80">
                The money + time leaving the business in the background.
              </p>
            </div>
          </div>

          {/* Rows */}
          {pains.map((row, i) => (
            <motion.div
              key={row.reality}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-1 gap-px bg-cream-300 md:grid-cols-2"
            >
              {/* LEFT — the reality (amber accent) */}
              <div className="relative bg-white px-6 py-7 md:px-8">
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-[3px]"
                  style={{ background: 'linear-gradient(180deg,#E0B547,#C4A03A,#9C7E2C)' }}
                />
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <p className="text-[14.5px] font-semibold leading-relaxed text-navy-950">
                    {row.reality}
                  </p>
                </div>
              </div>

              {/* RIGHT — the cost (rose accent, visceral) */}
              <div className="relative bg-rose-50/40 px-6 py-7 md:px-8">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-700 ring-1 ring-rose-200">
                    <ArrowDownRight className="h-4 w-4" />
                  </span>
                  <p className="text-[14px] leading-relaxed text-rose-900">
                    {row.cost}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bridge line down to the solution */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-10 max-w-2xl text-center text-[14px] text-navy-700"
        >
          <span className="font-semibold text-navy-950">
            Sound like your business?
          </span>{' '}
          Here's how {productCode} fixes each of these →
        </motion.p>
      </Container>
    </section>
  );
}
