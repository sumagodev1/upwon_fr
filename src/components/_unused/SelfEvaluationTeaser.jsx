import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calculator, ShieldQuestion } from 'lucide-react';
import Container from '../shared/Container/Container.jsx';

// Brief §1.8 — two-step on-ramp on the homepage.
// Step 1 ("Do you really need software?") routes to the self-evaluation page;
// Step 2 ("If yes, what will be investment and ROI?") routes to the ROI
// calculator. Sits BEFORE the deeper ROI/metric sections so visitors take the
// honest evaluation before being pulled into the value-quantification flow.
export default function SelfEvaluationTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy-950 section-pad text-white">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-20 right-[-10%] h-[500px] w-[500px] rounded-full bg-orange-500/12 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[400px] w-[400px] rounded-full bg-orange-500/8 blur-[140px]" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
            <ShieldQuestion className="h-3 w-3" />
            Before You Even Look at Pricing
          </p>
 <h2 className="mt-5 h-display text-[36.8px] text-balance leading-[1.1]">
            Do you actually <span className="gradient-text-orange">need software</span> right now?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-cream-100/75 md:text-lg">
            Most ERP vendors will sell to anyone. We won&rsquo;t. Run the 8-question honest
            evaluation first — if you don&rsquo;t need a platform yet, we&rsquo;ll tell you so.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Step 1 — Self-evaluation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all hover:border-orange-500/40 hover:bg-white/[0.06] md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-orange-500 text-white">
                1
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                Step 1 · Honest evaluation
              </p>
            </div>
            <h3 className="mt-5 h-display text-2xl font-bold leading-snug">
              Do you really need software? Take the 8-question self-assessment.
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-cream-100/70">
              No email required. No follow-up call. Honest verdict — including
              when the answer is &ldquo;not yet&rdquo;.
            </p>
            <Link
              to="/self-evaluation"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-[14px] font-bold text-white shadow-enterprise hover:bg-orange-600"
            >
              Start Self-Evaluation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Step 2 — ROI calc */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all hover:border-orange-500/40 hover:bg-white/[0.06] md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.08] text-cream-100">
                2
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-100/70">
                Step 2 · Investment &amp; ROI
              </p>
            </div>
            <h3 className="mt-5 h-display text-2xl font-bold leading-snug">
              If yes — what will it cost, and what will you save?
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-cream-100/70">
              Pick your business type, move four sliders, see your annual
              savings and payback period in seconds.
            </p>
            <Link
              to="/roi-calculator"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-orange-500/40 bg-transparent px-5 py-3 text-[14px] font-bold text-orange-300 hover:bg-orange-500/10"
            >
              <Calculator className="h-4 w-4" />
              Run the ROI Calculator
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
