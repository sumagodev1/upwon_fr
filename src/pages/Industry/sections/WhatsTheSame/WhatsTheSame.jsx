import { m as motion } from 'framer-motion';
import { Check, X, Lightbulb, Layers, Zap } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import SectionHeading from '../../../../components/shared/SectionHeading/SectionHeading.jsx';
import { PARITY_ROWS } from '../../../../data/industryExtras.js';

export default function WhatsTheSame({
  leftLabel = 'Food FMCG',
  rightLabel = 'Non-Food FMCG',
  eyebrow = 'The Core Insight',
  title,
  insightTitle = 'Non-Food FMCG and Food FMCG are operationally identical. So is the solution.',
  insightBody = 'The operational challenges of distributing personal care across 5,000 kirana outlets are indistinguishable from distributing biscuits or dairy across the same outlets. Beat plans, distributor claims, secondary sales, field force compliance — same problem. UpWon solves both.',
}) {
  return (
    <section className="relative overflow-hidden bg-cream-200 section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow={eyebrow}
          title={title || `${rightLabel} and ${leftLabel} share identical operational DNA.`}
          description="UpWon was built to solve these challenges at the category level — and what works for one applies to the other."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-enterprise"
          >
            <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-px bg-cream-300">
              <div className="bg-navy-950 px-5 py-3.5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-orange-400">
                  Operational Challenge
                </p>
              </div>
              <div className="bg-navy-950 px-3 py-3.5 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{leftLabel}</p>
              </div>
              <div className="bg-orange-500 px-3 py-3.5 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{rightLabel}</p>
              </div>
            </div>

            {PARITY_ROWS.map((row, i) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.6fr_1fr_1fr] gap-px bg-cream-300"
              >
                <div className={`px-5 py-3 text-[14px] font-semibold text-navy-950 ${i % 2 ? 'bg-cream-100' : 'bg-white'}`}>
                  {row.label}
                </div>
                <div className={`flex items-center justify-center px-3 py-3 ${i % 2 ? 'bg-cream-100' : 'bg-white'}`}>
                  {row.food ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-rose-500" />}
                </div>
                <div className={`flex items-center justify-center px-3 py-3 ${i % 2 ? 'bg-orange-50' : 'bg-orange-50/70'}`}>
                  {row.nonFood ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-rose-500" />}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Insight body */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
              The Core Insight
            </p>
            <h3 className="mt-3 h-display text-balance text-2xl text-navy-950 md:text-3xl">
              {insightTitle}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-charcoal">{insightBody}</p>

            <div className="mt-7 space-y-3">
              {[
                { icon: Lightbulb, t: 'Industry-specific configuration, not separate software', d: 'SFA, DMS and WMS configured for your category — without a new product.' },
                { icon: Layers, t: 'Your field force and distributor network in one view', d: 'Coverage, secondary sales, distributor stock and claims — unified across every category.' },
                { icon: Zap, t: '30-day go-live — same as food FMCG', d: 'No new product, no extended implementation. Same speed as our food customers.' },
              ].map((c) => (
                <div
                  key={c.t}
                  className="flex items-start gap-3 rounded-xl border border-cream-300 bg-white p-4 transition-colors hover:border-orange-500/40"
                >
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-orange-100 text-orange-600">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-950 font-display">{c.t}</p>
                    <p className="mt-0.5 text-[14px] text-charcoal">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
