import { m as motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Container from '../shared/Container/Container.jsx';
import SectionHeading from '../shared/SectionHeading/SectionHeading.jsx';
import { GLOBAL_MARKETS, GLOBAL_READINESS } from '../../data/company.js';

const STATUS_STYLES = {
  orange: 'border-orange-300 bg-orange-100 text-orange-700',
  amber: 'border-amber-300 bg-amber-100 text-amber-700',
  slate: 'border-navy-200 bg-navy-50 text-navy-700',
};

export default function GlobalAmbitionSection() {
  return (
    <section className="relative overflow-hidden bg-slate-soft section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-50" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Global Ambition"
          title="Built in India. Designed for the world."
          description="Food & FMCG businesses scale across borders — and so does UpWon. Indian-origin enterprise suite, global-grade architecture."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Readiness */}
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
              Why UpWon is ready for global markets
            </p>
            <div className="mt-5 space-y-3">
              {GLOBAL_READINESS.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4 shadow-sm transition-colors hover:border-orange-500/40"
                >
                  <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{r.title}</p>
                    <p className="mt-1 text-[14px] text-navy-700">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Markets */}
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
              Target expansion markets
            </p>
            <div className="mt-5 space-y-3">
              {GLOBAL_MARKETS.map((m, i) => (
                <motion.div
                  key={m.region}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-4 w-4 text-orange-600" />
                      <p className="font-semibold text-navy-950">{m.region}</p>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        STATUS_STYLES[m.statusColor] || STATUS_STYLES.slate
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] text-navy-700">{m.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
