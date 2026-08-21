import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, FileText, CheckCircle2, XCircle } from 'lucide-react';
import Container from '../ui/Container.jsx';

export default function LeadHookPreview({
  variant = 'checklist', // 'checklist' | 'report' | 'benchmark'
  eyebrow = 'Free Download',
  title,
  subtitle,
  points = [],
  buttonLabel = 'Get Free Download →',
  trustLine = 'No spam. Delivered to your inbox in 60 seconds.',
  preview = {},
  accent = '#E85A2A',
}) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 py-20 text-white md:py-24">
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: `${accent}25` }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-[-10%] h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: `${accent}15` }}
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual preview side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            {variant === 'report' && <ReportPreview preview={preview} accent={accent} />}
            {variant === 'checklist' && <ChecklistPreview preview={preview} accent={accent} />}
            {variant === 'benchmark' && <BenchmarkPreview preview={preview} accent={accent} />}
          </motion.div>

          {/* Content side */}
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: `${accent}50`,
                background: `${accent}15`,
                color: '#FFA070',
              }}
            >
              <FileText className="h-3.5 w-3.5" /> {eyebrow}
            </span>
 <h2 className="mt-5 h-display text-[36.8px] text-balance text-white">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream-100/75">{subtitle}</p>

            <ul className="mt-6 space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-cream-100/80">
                  <span className="mt-0.5 text-base" style={{ color: '#FFA070' }}>→</span>
                  {p}
                </li>
              ))}
            </ul>

            {submitted ? (
              <div className="mt-7 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  On its way to your inbox
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mt-7 flex flex-wrap gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your work email"
                  className="w-full flex-1 min-w-0 rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-cream-100/40 outline-none focus:border-orange-500/40 sm:min-w-[160px]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: accent }}
                >
                  {buttonLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
            <p className="mt-3 text-[14px] text-cream-100/50">{trustLine}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============ Checklist Preview ============ */
function ChecklistPreview({ preview, accent }) {
  const items = preview.items || [
    { ok: true, title: 'Production visibility', sub: 'Can you see real-time batch yield from your phone?' },
    { ok: true, title: 'FEFO compliance', sub: 'Is oldest stock automatically dispatched first?' },
    { ok: false, title: 'Outlet ordering', sub: 'Do outlets still order via WhatsApp or phone?' },
    { ok: false, title: 'Wastage tracking', sub: 'Can you see wastage per SKU per shift today?' },
    { ok: false, title: 'Same-day financials', sub: 'Is your billing data visible before midnight?' },
  ];
  return (
    <div
      className="w-full max-w-[340px] rounded-2xl border bg-white/[0.04] shadow-enterprise-lg backdrop-blur-md"
      style={{ borderColor: `${accent}35` }}
    >
      <div
        className="border-b px-5 py-3.5"
        style={{ borderColor: `${accent}25`, background: `${accent}15` }}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#FFA070' }}>
          {preview.title || 'Readiness Checklist'}
        </p>
        <p className="mt-0.5 text-[14px] text-cream-100/60">
          {preview.sub || '60-point self-assessment · free download'}
        </p>
      </div>
      <div className="space-y-2.5 p-5">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3 text-[14px]">
            <span
              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded"
              style={{
                background: it.ok ? 'rgba(46,125,50,0.18)' : 'rgba(220,38,38,0.18)',
                border: it.ok ? '1px solid rgba(46,125,50,0.4)' : '1px solid rgba(220,38,38,0.4)',
                color: it.ok ? '#4CAF50' : '#EF5350',
              }}
            >
              {it.ok ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
            </span>
            <div>
              <p className="font-semibold text-white">{it.title}</p>
              <p className="text-cream-100/55">{it.sub}</p>
            </div>
          </div>
        ))}
        <div className="flex items-start gap-3 pt-2 opacity-50">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border border-white/15 bg-white/[0.04] text-[14px] text-cream-100/60">
            …
          </span>
          <p className="text-[14px] text-cream-100/50">
            <strong className="text-cream-100/70">55 more points</strong> in the full checklist
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============ Report Cover Preview ============ */
function ReportPreview({ preview, accent }) {
  return (
    <div
      className="w-full max-w-[260px] origin-bottom rounded-md border border-white/10 shadow-enterprise-lg"
      style={{
        background: 'linear-gradient(150deg, #1E2461 0%, #2A3480 100%)',
        transform: 'perspective(800px) rotateY(-14deg) rotateX(2deg)',
      }}
    >
      <div className="border-b border-white/10 p-6">
        <p className="font-display text-sm font-extrabold" style={{ color: accent }}>
          UpWon
        </p>
        <p className="mt-2 h-display text-lg font-extrabold leading-tight text-white">
          {preview.title || '2025 India Food & FMCG Operations Report'}
        </p>
        <p className="mt-2 text-[14px] text-cream-100/50">
          {preview.sub || '32 pages · Industry benchmarks · Real data'}
        </p>
      </div>
      <div className="space-y-2 p-6">
        <div className="h-1.5 w-[60%] rounded-full" style={{ background: `${accent}50` }} />
        <div className="h-1.5 w-full rounded-full bg-white/10" />
        <div className="h-1.5 w-[75%] rounded-full bg-white/10" />
        <div className="h-1.5 w-[45%] rounded-full" style={{ background: `${accent}50` }} />
        <div className="h-1.5 w-[80%] rounded-full bg-white/10" />
        <div className="h-1.5 w-[60%] rounded-full bg-white/10" />
      </div>
      <p className="px-6 pb-5 text-right text-[14px] text-cream-100/40 font-display">32 pages</p>
    </div>
  );
}

/* ============ Benchmark Table Preview ============ */
function BenchmarkPreview({ preview, accent }) {
  const rows = preview.rows || [
    { metric: 'Beat Plan Adherence', top: '94%', avg: '68%', bot: '42%', topGood: true, avgGood: false },
    { metric: 'Secondary Sales Lag', top: 'Same day', avg: '15-20 days', bot: '30-45 days', topGood: true, avgGood: false },
    { metric: 'Scheme Leakage', top: '< 3%', avg: '12-18%', bot: '> 25%', topGood: true, avgGood: false },
    { metric: 'Outlet Coverage Rate', top: '91%', avg: '72%', bot: '55%', topGood: true, avgGood: false },
  ];
  return (
    <div
      className="w-full max-w-[360px] rounded-2xl border bg-white/[0.04] shadow-enterprise-lg"
      style={{ borderColor: `${accent}35` }}
    >
      <div
        className="border-b px-5 py-3.5"
        style={{ borderColor: `${accent}25`, background: `${accent}15` }}
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#FFA070' }}>
          {preview.title || 'Distribution Benchmark Report'}
        </p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] text-[9px] font-semibold uppercase tracking-[0.1em] text-cream-100/50 mb-2 px-2">
          <span>Metric</span>
          <span className="text-center">Top 10%</span>
          <span className="text-center">Average</span>
          <span className="text-center">Bottom</span>
        </div>
        <div className="space-y-1.5">
          {rows.map((r) => (
            <div
              key={r.metric}
              className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-2 text-[14px]"
            >
              <span className="text-white font-medium">{r.metric}</span>
              <span className="text-center font-bold text-emerald-400">{r.top}</span>
              <span className="text-center font-semibold text-amber-300">{r.avg}</span>
              <span className="text-center text-cream-100/60">{r.bot}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[14px] text-cream-100/50">
          {preview.foot || '200+ companies · 28 pages · India-specific'}
        </p>
      </div>
    </div>
  );
}
