import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  X,
  Minus,
  Building2,
  Receipt,
  Cloud,
  Wrench,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import SectionHeading from '../../components/shared/SectionHeading/SectionHeading.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';

// Four competitor *categories* using fully-dummy vendor names. Each one
// maps to a real-market archetype so informed buyers immediately recognise
// the bucket — without UpWon legally naming the actual players.
const CATEGORIES = [
  {
    key: 'globalis',
    name: 'Vendor Globalis',
    archetype: 'Global Enterprise Suite',
    archetypeShort: 'SAP / NetSuite-class',
    icon: Building2,
    color: 'sky',
    blurb:
      'Tier-1 global ERP suites. Genuinely enterprise-grade and globally proven — but priced and timed for billion-dollar conglomerates, not Indian Food/FMCG SMBs.',
    shineAt: [
      'Multi-country / multi-currency enterprises',
      'Mature finance teams who can afford 18-month rollouts',
    ],
    upwonWins: [
      'Live in 30–45 days vs 6–18 months',
      'Native FSSAI + Indian compliance out of the box',
    ],
  },
  {
    key: 'ledger',
    name: 'Vendor Ledger',
    archetype: 'Indian Billing Software',
    archetypeShort: 'Tally / Marg-class',
    icon: Receipt,
    color: 'amber',
    blurb:
      'Default Indian SMB accounting / billing tools. Cheap, familiar, GST-savvy — but stop at the trial balance. No production, no field sales, no franchise ops.',
    shineAt: [
      'Simple invoicing for small shops',
      'CA-friendly GST workflows',
    ],
    upwonWins: [
      'Manages production, distribution and franchise — not just books',
      'Built for 50+ outlets without breaking',
    ],
  },
  {
    key: 'cloudwave',
    name: 'Vendor Cloudwave',
    archetype: 'Generic Cloud SaaS',
    archetypeShort: 'Zoho / Odoo / ERPNext-class',
    icon: Cloud,
    color: 'violet',
    blurb:
      'Horizontal cloud ERPs that try to serve every industry. Affordable and quick to demo — but you build your food / FMCG workflows from scratch every time.',
    shineAt: [
      'Tech-light services businesses',
      'Companies with strong in-house IT to customise',
    ],
    upwonWins: [
      'Food-specific BOM, FEFO, allergen flagging native',
      'Indian SFA-DMS model built in — not bolted on',
    ],
  },
  {
    key: 'stitchworks',
    name: 'Vendor Stitchworks',
    archetype: 'Custom / Agency-Built',
    archetypeShort: 'In-house or local dev shop',
    icon: Wrench,
    color: 'rose',
    blurb:
      'Bespoke software stitched together by a local agency or in-house team. Fits the spec on day one — then ages badly. Single-developer risk, no roadmap, no community.',
    shineAt: [
      'Truly unique processes nothing covers',
      'Companies happy to own forever-maintenance',
    ],
    upwonWins: [
      'Maintained product with continuous updates',
      'No bus-factor-of-one risk — full vendor team behind it',
    ],
  },
];

// Capability rows. Score 0–5 per vendor. Rendered as filled dots so the
// reader instantly sees the shape rather than reading numbers.
const MATRIX = [
  { capability: 'Food / FMCG vertical depth',           upwon: 5, globalis: 3, ledger: 1, cloudwave: 1, stitchworks: 2 },
  { capability: 'FSSAI compliance · native',            upwon: 5, globalis: 0, ledger: 0, cloudwave: 0, stitchworks: 1 },
  { capability: 'Indian statutory compliance',          upwon: 5, globalis: 2, ledger: 4, cloudwave: 3, stitchworks: 3 },
  { capability: 'AI / demand forecasting',              upwon: 4, globalis: 3, ledger: 0, cloudwave: 2, stitchworks: 1 },
  { capability: 'Time to go-live',                      upwon: 5, globalis: 1, ledger: 4, cloudwave: 3, stitchworks: 2 },
  { capability: 'SFA-DMS · India GT/MT model',          upwon: 5, globalis: 0, ledger: 0, cloudwave: 1, stitchworks: 2 },
  { capability: 'Franchise / outlet management',        upwon: 5, globalis: 0, ledger: 0, cloudwave: 1, stitchworks: 2 },
  { capability: 'Indian pricing affordability',         upwon: 5, globalis: 1, ledger: 5, cloudwave: 4, stitchworks: 3 },
  { capability: 'Mobile-first SFA',                     upwon: 5, globalis: 2, ledger: 1, cloudwave: 3, stitchworks: 2 },
  { capability: 'Sub-vertical editions (bakery/dairy)', upwon: 5, globalis: 2, ledger: 0, cloudwave: 0, stitchworks: 1 },
];

const COLS = [
  { key: 'upwon',       label: 'UpWon',             accent: 'orange' },
  { key: 'globalis',    label: 'Vendor Globalis',    accent: 'sky' },
  { key: 'ledger',      label: 'Vendor Ledger',      accent: 'amber' },
  { key: 'cloudwave',   label: 'Vendor Cloudwave',   accent: 'violet' },
  { key: 'stitchworks', label: 'Vendor Stitchworks', accent: 'rose' },
];

// Color-class lookup for the dummy-vendor "type" indicator.
const COLOR_MAP = {
  sky: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    dot: 'bg-sky-500',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    dot: 'bg-violet-500',
  },
  rose: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
  },
};

// Renders a 5-dot score with the active dots filled.
function ScoreDots({ score, accent = 'orange' }) {
  const fillColor =
    accent === 'orange'
      ? 'bg-orange-500'
      : accent === 'sky'
      ? 'bg-sky-500'
      : accent === 'amber'
      ? 'bg-amber-500'
      : accent === 'violet'
      ? 'bg-violet-500'
      : accent === 'rose'
      ? 'bg-rose-500'
      : 'bg-navy-400';
  return (
    <div className="inline-flex items-center gap-1" aria-label={`Score ${score} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < score ? fillColor : 'bg-navy-100'
          }`}
        />
      ))}
    </div>
  );
}

export default function VsOthersPage() {
  return (
    <>
      <Seo
        title="UpWon vs The Rest — 4 Vendor Archetypes Compared"
        description="Honest comparison across SAP, Tally + Zoho, Odoo and ERPNext — pick the archetype, see the side-by-side. For food and FMCG operators evaluating ERPs."
        canonical="https://upwon.in/compare/upwon-vs-others"
      />
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream-100 pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.10] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-navy-700/[0.06] blur-[120px]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow justify-center"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Honest Comparison
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 h-display text-balance text-[2rem] leading-[1.05] tracking-tightest text-navy-900 md:text-[3rem] lg:text-[3.5rem]"
            >
              UpWon vs{' '}
              <span className="gradient-text-orange">the rest of the market.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-5 text-balance text-base leading-relaxed text-navy-700 md:text-lg"
            >
              Four kinds of vendors typically win Food &amp; FMCG ERP evaluations in
              India. Here's where each one shines — and where it lets you down.{' '}
              <span className="text-navy-500">
                Names are illustrative · archetypes are real.
              </span>
            </motion.p>
          </div>
        </Container>
      </section>

      {/* CATEGORY CARDS */}
      <section className="relative bg-white section-pad">
        <Container>
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="The four archetypes"
            title="Pick the bucket. Then read the trade-offs."
            description="Most Indian Food/FMCG businesses end up evaluating one of these four kinds of software. Here's a fair read on each."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {CATEGORIES.map((cat, i) => {
              const colors = COLOR_MAP[cat.color];
              const Icon = cat.icon;
              return (
                <motion.article
                  key={cat.key}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-cream-300 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise"
                >
                  {/* Header — dummy name + real archetype tag */}
                  <header className="flex items-start gap-4">
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border ${colors.border} ${colors.bg} ${colors.text}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="font-display text-xl font-bold leading-tight text-navy-950">
                          {cat.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${colors.border} ${colors.bg} ${colors.text}`}
                        >
                          <span className={`h-1 w-1 rounded-full ${colors.dot}`} />
                          {cat.archetypeShort}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                        Archetype · {cat.archetype}
                      </p>
                    </div>
                  </header>

                  {/* Blurb */}
                  <p className="mt-4 text-sm leading-relaxed text-navy-700">
                    {cat.blurb}
                  </p>

                  {/* Two columns: shines / UpWon wins */}
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-cream-300 bg-cream-100 p-4">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-600">
                        <Sparkles className="h-3 w-3" />
                        Where it shines
                      </p>
                      <ul className="mt-2 space-y-1.5 text-[14px] text-navy-700">
                        {cat.shineAt.map((p) => (
                          <li key={p} className="flex items-start gap-1.5">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-navy-400" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-700">
                        <ShieldCheck className="h-3 w-3" />
                        Where UpWon wins
                      </p>
                      <ul className="mt-2 space-y-1.5 text-[14px] text-navy-800">
                        {cat.upwonWins.map((p) => (
                          <li key={p} className="flex items-start gap-1.5">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CAPABILITY MATRIX */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Capability matrix"
            title={
              <>
                Ten capabilities.{' '}
                <span className="gradient-text-orange">One winner per row.</span>
              </>
            }
            description="Filled dots = vendor scores well on this capability. Empty dots = absent / weak. Hover for a quick read."
          />

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] md:min-w-[860px] border-separate border-spacing-0 rounded-2xl border border-cream-300 bg-white shadow-enterprise">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-white px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
                    Capability
                  </th>
                  {COLS.map((c) => (
                    <th
                      key={c.key}
                      className={`px-4 py-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] ${
                        c.key === 'upwon' ? 'bg-orange-50 text-orange-700' : 'text-navy-700'
                      }`}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, i) => (
                  <tr
                    key={row.capability}
                    className={i % 2 === 1 ? 'bg-cream-100/50' : ''}
                  >
                    <td className="sticky left-0 bg-inherit px-5 py-4 text-left text-[14px] font-semibold text-navy-900">
                      {row.capability}
                    </td>
                    {COLS.map((c) => (
                      <td
                        key={c.key}
                        className={`px-4 py-4 text-center ${
                          c.key === 'upwon' ? 'bg-orange-50/60' : ''
                        }`}
                      >
                        <div className="inline-flex flex-col items-center gap-1">
                          <ScoreDots score={row[c.key]} accent={c.accent} />
                          <span className="text-[14px] font-bold text-navy-500">
                            {row[c.key]} / 5
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Footer row — totals */}
                <tr className="bg-navy-50">
                  <td className="sticky left-0 bg-navy-50 px-5 py-4 text-left text-[12px] font-bold uppercase tracking-[0.14em] text-navy-700">
                    Total
                  </td>
                  {COLS.map((c) => {
                    const total = MATRIX.reduce((sum, r) => sum + r[c.key], 0);
                    return (
                      <td
                        key={c.key}
                        className={`px-4 py-4 text-center ${
                          c.key === 'upwon' ? 'bg-orange-100/60' : ''
                        }`}
                      >
                        <p
                          className={`num-display text-2xl font-extrabold ${
                            c.key === 'upwon' ? 'text-orange-600' : 'text-navy-700'
                          }`}
                        >
                          {total}
                        </p>
                        <p className="text-[14px] font-medium text-navy-500">/ 50</p>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-[14px] text-navy-500">
            Vendor names are illustrative archetypes, not specific products. Scores reflect
            UpWon's view of typical category performance for Indian Food &amp; FMCG
            operators · Last reviewed 2026.
          </p>
        </Container>
      </section>

      {/* VERDICT */}
      <section className="relative bg-white section-pad">
        <Container>
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="The verdict"
            title="When UpWon is the right pick — and when it isn't."
            description="No software wins every fight. Here's the honest cut."
          />

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
            {/* GOOD FIT */}
            <article className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-white p-7 shadow-sm md:p-9">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-navy-950">
                <Check className="h-5 w-5 text-orange-600" />
                Pick UpWon if you are
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-navy-800">
                {[
                  'A Food / FMCG / Beverages / Dairy / Bakery manufacturer doing ₹2 Cr – ₹500 Cr',
                  'Running 25+ outlets, franchises or distributors and outgrowing Tally',
                  'Tired of "ERP in 18 months" and need 30–45 day go-live',
                  'Already evaluating SAP / Oracle and the budget made you flinch',
                  'Indian operations with FSSAI / GST / e-invoicing as table stakes',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* NOT A FIT */}
            <article className="rounded-2xl border border-cream-300 bg-cream-100 p-7 shadow-sm md:p-9">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-navy-950">
                <AlertTriangle className="h-5 w-5 text-navy-500" />
                UpWon is <span className="underline decoration-dotted">not</span> right for
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-navy-700">
                {[
                  'Single-shop kirana stores running just GST billing — Tally / Marg is cheaper and enough',
                  'Multi-country conglomerates needing multi-GAAP consolidation — SAP / NetSuite is still the answer',
                  'Pure software / services / IT businesses — UpWon is built for physical Food & FMCG ops',
                  'Buyers who insist on a 6-month POC before signing — our delivery model is faster than that',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Minus className="mt-1 h-3 w-3 shrink-0 text-navy-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] italic text-navy-600">
                We say no to bad-fit deals. If your shape isn't on the left, tell us and
                we'll point you to a better tool — even a competitor.
              </p>
            </article>
          </div>
        </Container>
      </section>

      {/* CTA FOOTER */}
      <section className="relative overflow-hidden bg-navy-950 section-pad">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.15] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.10] blur-[120px]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="h-display text-balance text-3xl text-white md:text-4xl lg:text-5xl">
              Compared everyone? Now do the{' '}
              <span className="gradient-text-orange">honest test.</span>
            </h2>
            <p className="mt-5 text-balance text-base text-white/70 md:text-lg">
              Book a 30-minute demo and we'll show you exactly how UpWon handles a workflow
              that your current short-list can't.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/demo" className="btn-primary-glow !px-7 !py-4">
                Book Free 30-Min Demo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.04] px-6 py-4 text-[14px] font-semibold text-white transition-colors hover:border-orange-400/40 hover:bg-white/[0.08]"
              >
                Or request a 24-hour quote
              </Link>
            </div>
            <p className="mt-6 text-[14px] text-white/50">
              Already running on{' '}
              <Link
                to="/compare/upwon-vs-sap"
                className="font-medium text-orange-300 hover:text-orange-200"
              >
                SAP?
              </Link>{' '}
              ·{' '}
              <Link
                to="/compare/upwon-vs-tally"
                className="font-medium text-orange-300 hover:text-orange-200"
              >
                Tally?
              </Link>{' '}
              See those head-to-head pages.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
