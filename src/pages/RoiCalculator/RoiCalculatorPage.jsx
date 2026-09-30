import { useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  ArrowUpRight,
  CheckCircle2,
  Factory,
  Truck,
  Store,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/shared/Container/Container.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';
import { submitLead } from '../../lib/leads.js';
import { checkRoiReport } from '../../lib/leadFields.js';
import Seo from '../../components/shared/Seo/Seo.jsx';

// Brief §17.2 — three business-type cards each load a different input schema.
// Each schema's calc function produces consistent results: top-line saving,
// payback months, plus breakdown rows for the display column.
const BUSINESS_TYPES = [
  {
    id: 'food-mfg',
    label: 'Food Manufacturer',
    icon: Factory,
    blurb: 'Bakery · Dairy · Sweets · Snacks · Beverages',
  },
  {
    id: 'fmcg-dist',
    label: 'FMCG Distributor',
    icon: Truck,
    blurb: 'Distribution networks · C&F · Super-Stockists · Regional Brands',
  },
  {
    id: 'franchise',
    label: 'QSR / Franchise Chain',
    icon: Store,
    blurb: 'QSR · Bakery-café chains · Sweet shops · Cloud kitchens',
  },
];

const INPUT_SCHEMAS = {
  'food-mfg': [
    { key: 'revenue',  label: 'Monthly production value', prefix: '₹', suffix: ' Cr', min: 0.5, max: 100, step: 0.5, init: 6 },
    { key: 'wastage',  label: 'Current wastage %',         suffix: '%', min: 1, max: 30, step: 0.5, init: 10 },
    { key: 'rmCost',   label: 'Raw material % of revenue', suffix: '%', min: 30, max: 85, step: 1, init: 55 },
    { key: 'employees',label: 'Production employees',       min: 10, max: 2000, step: 10, init: 120 },
    { key: 'currentSystem', label: 'Current system (Tally=1, Excel=2, None=3)', min: 1, max: 3, step: 1, init: 2 },
  ],
  'fmcg-dist': [
    { key: 'revenue',  label: 'Monthly turnover',         prefix: '₹', suffix: ' Cr', min: 0.5, max: 60, step: 0.5, init: 4 },
    { key: 'salesmen', label: 'Number of salesmen',         min: 1, max: 200, step: 1, init: 18 },
    { key: 'schemeBurn', label: 'Monthly scheme value',   prefix: '₹', suffix: ' L', min: 0.5, max: 200, step: 0.5, init: 12 },
    { key: 'outlets',  label: 'Outlets serviced per month', min: 50, max: 20000, step: 50, init: 1200 },
    { key: 'orderMethod', label: 'Order method (WhatsApp=1, Excel=2, App=3)', min: 1, max: 3, step: 1, init: 1 },
  ],
  franchise: [
    { key: 'outlets',     label: 'Number of outlets',       min: 2, max: 500, step: 1, init: 25 },
    { key: 'revPerOutlet',label: 'Monthly revenue / outlet', prefix: '₹', suffix: ' L', min: 1, max: 200, step: 1, init: 12 },
    { key: 'kitchens',    label: 'Central kitchens',         min: 1, max: 50, step: 1, init: 1 },
    { key: 'visibilityLevel', label: 'Current HQ visibility (low=1, mid=2, high=3)', min: 1, max: 3, step: 1, init: 1 },
    { key: 'staffPerOutlet', label: 'Avg staff per outlet',  min: 2, max: 60, step: 1, init: 8 },
  ],
};

// Top-line savings + payback model per business type. Returns rupee values.
function calcSavings(type, v) {
  if (type === 'food-mfg') {
    const monthlyRev = v.revenue * 1_00_00_000;        // Cr → ₹
    const annualRev = monthlyRev * 12;
    const wastageSavings = annualRev * (v.rmCost / 100) * (v.wastage / 100) * 0.45;
    const productivityGains = v.employees * 12 * 3800;
    const procurementSaving = annualRev * (v.rmCost / 100) * 0.025;
    const complianceRisk = annualRev * 0.004 * (v.currentSystem === 3 ? 1.6 : v.currentSystem === 2 ? 1.2 : 0.6);
    const total = wastageSavings + productivityGains + procurementSaving + complianceRisk;
    const cost = 35_00_000 + v.employees * 1_200;
    const payback = Math.max(3, Math.round((cost / Math.max(1, total)) * 12));
    return {
      rows: [
        ['Wastage reduction (45% of current loss)', wastageSavings],
        ['Productivity gains (line + admin)',       productivityGains],
        ['Procurement leakage closed',              procurementSaving],
        ['Compliance / penalty risk averted',       complianceRisk],
      ],
      total,
      payback,
      top3: [
        'Wastage reduction',
        'Productivity gains',
        'Procurement leakage',
      ],
    };
  }
  if (type === 'fmcg-dist') {
    const monthlyRev = v.revenue * 1_00_00_000;
    const annualRev = monthlyRev * 12;
    const schemeLeak = v.schemeBurn * 1_00_000 * 12 * 0.18;     // L → ₹, 18% leak recovered
    const productivityGains = v.salesmen * 12 * 9_000;          // ₹9k/rep/month uplift
    const orderMethodMultiplier = v.orderMethod === 1 ? 1.4 : v.orderMethod === 2 ? 1.0 : 0.5;
    const dataLatency = annualRev * 0.008 * orderMethodMultiplier;
    const dsoImprovement = annualRev * 0.005;
    const total = schemeLeak + productivityGains + dataLatency + dsoImprovement;
    const cost = 18_00_000 + v.salesmen * 12_000;
    const payback = Math.max(3, Math.round((cost / Math.max(1, total)) * 12));
    return {
      rows: [
        ['Scheme leakage recovered',          schemeLeak],
        ['Salesman productivity (40% more)',  productivityGains],
        ['Stale-data decisions eliminated',   dataLatency],
        ['DSO improvement value',             dsoImprovement],
      ],
      total,
      payback,
      top3: [
        'Scheme leakage',
        'Salesman productivity',
        'Real-time secondary sales',
      ],
    };
  }
  // franchise
  const monthlyRevPerOutlet = v.revPerOutlet * 1_00_000;        // L → ₹
  const annualNetwork = monthlyRevPerOutlet * v.outlets * 12;
  const kitchenWastage = annualNetwork * 0.06 * (v.kitchens > 0 ? 1 : 1);
  const visibilityValue = annualNetwork * 0.012 * (4 - v.visibilityLevel);
  const royaltyAccuracy = annualNetwork * 0.008;
  const staffOptimisation = v.outlets * v.staffPerOutlet * 12 * 1_400;
  const total = kitchenWastage + visibilityValue + royaltyAccuracy + staffOptimisation;
  const cost = 12_00_000 + v.outlets * 70_000;
  const payback = Math.max(3, Math.round((cost / Math.max(1, total)) * 12));
  return {
    rows: [
      ['Central kitchen wastage (FEFO)',     kitchenWastage],
      ['Outlet visibility — leakage closed', visibilityValue],
      ['Royalty accuracy uplift',            royaltyAccuracy],
      ['Outlet staff productivity',          staffOptimisation],
    ],
    total,
    payback,
    top3: [
      'Outlet visibility',
      'Royalty automation',
      'Central kitchen FEFO',
    ],
  };
}

function Slider({ schema, value, onChange }) {
  return (
    <div>
      <div className="flex items-end justify-between">
        <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-600">
          {schema.label}
        </label>
        <span className="num-display text-lg text-orange-600">
          {schema.prefix || ''}
          {(typeof value === 'number' ? value : 0).toLocaleString('en-IN')}
          {schema.suffix || ''}
        </span>
      </div>
      <input
        type="range"
        min={schema.min}
        max={schema.max}
        step={schema.step || 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-cream-300 accent-orange-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </div>
  );
}

// Original — dark navy text on the dark navy results panel rendered as
// unreadable "blue". Kept for reference.
// function ResultRow({ label, value, highlight = false }) {
//   return (
//     <div
//       className={`flex items-center justify-between gap-3 border-b py-3 last:border-0 ${
//         highlight ? 'border-orange-200' : 'border-cream-300'
//       }`}
//     >
//       <span className={`text-sm ${highlight ? 'font-semibold text-navy-950' : 'text-navy-700'}`}>
//         {label}
//       </span>
//       <span
//         className={`num-display ${
//           highlight ? 'text-xl text-orange-600' : 'text-base text-navy-950'
//         }`}
//       >
//         {value}
//       </span>
//     </div>
//   );
// }

// Rendered inside the dark navy results panel — use light text so the
// breakdown stays readable (was dark navy-on-navy, i.e. unreadable "blue").
function ResultRow({ label, value, highlight = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-b py-3 last:border-0 ${
        highlight ? 'border-orange-500/30' : 'border-white/10'
      }`}
    >
      <span className={`text-sm ${highlight ? 'font-semibold text-white' : 'text-cream-100/80'}`}>
        {label}
      </span>
      <span
        className={`num-display ${
          highlight ? 'text-xl text-orange-400' : 'text-base text-white'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// Initial state per business type — seeded from the schema's init values.
function initialInputs(type) {
  return INPUT_SCHEMAS[type].reduce((acc, s) => ((acc[s.key] = s.init), acc), {});
}


const HERO_ACCENT = '#E85A2A';

/* Hero backdrops — the site’s shared hero artwork. This page has never
   had dedicated hero photography of its own; drop a local webp in here
   when it does and nothing else needs to change. */
const HERO_BG_A = '/images/hero%20bg3.webp';

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'ROI CALCULATOR',
    headline:
      'Calculate What UpWon Will Save Your Business — In 3 Minutes.',
    subhead:
      'Pick your business type. Move the sliders. See your personalised ROI. Based on outcomes across 50+ deployments.',
    bg: HERO_BG_A,
    accent: HERO_ACCENT,
    cta: { label: 'Request a Demo', to: '/demo' },
    secondaryCta: { label: 'Take the Self-Evaluation', to: '/self-evaluation' },
  },
];

export default function RoiCalculatorPage() {
  const [businessType, setBusinessType] = useState('food-mfg');
  const [inputs, setInputs] = useState(() => initialInputs('food-mfg'));
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', mobile: '' });
  /*
    `attempted` puts every message on screen from the first press; until then a
    field the visitor has not left yet is not reported as wrong.
  */
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = checkRoiReport(form);
  const hasErrors = Object.values(errors).some(Boolean);
  const errorFor = (name) =>
    attempted || touched[name] ? (errors[name] ?? undefined) : undefined;
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const schema = INPUT_SCHEMAS[businessType];
  const results = useMemo(() => calcSavings(businessType, inputs), [businessType, inputs]);

  const fmt = (n) =>
    n >= 1_00_00_000
      ? `₹${(n / 1_00_00_000).toFixed(2)} Cr`
      : n >= 1_00_000
      ? `₹${(n / 1_00_000).toFixed(1)} L`
      : `₹${Math.round(n).toLocaleString('en-IN')}`;

  return (
    <>
      <Seo
        title="ROI Calculator — Calculate Your Savings"
        description="Quantify UpWon's rupee impact across wastage, billing time and finance close — 8 inputs, your numbers, your industry. 2-minute self-serve calculator."
        canonical="https://upwon.in/roi-calculator"
      />
      <HeroSlider
        slides={HERO_SLIDES}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      {/* Brief §17.2 — Business type selector */}
      <section className="relative overflow-hidden bg-white pt-10 pb-4">
        <Container>
          <div className="mx-auto max-w-5xl">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
              Step 1 · Select your business type
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {BUSINESS_TYPES.map((bt) => {
                const active = businessType === bt.id;
                return (
                  <button
                    key={bt.id}
                    type="button"
                    onClick={() => {
                      setBusinessType(bt.id);
                      setInputs(initialInputs(bt.id));
                      setSubmitted(false);
                    }}
                    className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all ${
                      active
                        ? 'border-orange-500 bg-orange-50/40 shadow-enterprise'
                        : 'border-cream-300 bg-white hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-sm'
                    }`}
                  >
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-lg transition-colors ${
                        active ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      <bt.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-base font-bold text-navy-950">
                        {bt.label}
                      </p>
                      <p className="mt-1 text-[14px] text-navy-600">{bt.blurb}</p>
                    </div>
                    {active && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                        <CheckCircle2 className="h-3 w-3" />
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
            Step 2 · Tell us about your business
          </p>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Sliders — schema-driven, change with business type */}
            <div className="rounded-2xl border border-cream-300 bg-white p-7 shadow-enterprise md:p-10">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange-100 text-orange-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-navy-950">Your business inputs</p>
              </div>

              <div className="mt-8 space-y-7">
                {schema.map((s) => (
                  <Slider
                    key={s.key}
                    schema={s}
                    value={inputs[s.key]}
                    onChange={(v) => setInputs((prev) => ({ ...prev, [s.key]: v }))}
                  />
                ))}
              </div>

              <p className="mt-8 text-[14px] text-navy-500">
                Based on average outcomes across 50+ UpWon deployments. Your actual results will vary.
              </p>
            </div>

            {/* Results */}
            <motion.div
              key={businessType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-navy-800 bg-navy-950 p-7 text-white md:p-10"
            >
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                Your projected annual savings
              </p>
              <p className="num-display mt-5 text-5xl text-orange-400 md:text-6xl">
                {fmt(results.total)}
              </p>
              <p className="mt-2 text-sm text-cream-100/70">
                Total operational savings + productivity gains in year 1
              </p>

              {/* Top-3 saving sources — brief §17.4 */}
              <div className="mt-6 flex flex-wrap gap-2">
                {results.top3.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[14px] font-semibold text-orange-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-orange-400" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 space-y-1">
                {results.rows.map(([label, value]) => (
                  <ResultRow key={label} label={label} value={fmt(value)} />
                ))}
                <div className="!border-orange-500/20 border-t border-b py-3">
                  <ResultRow
                    label="Total annual savings"
                    value={fmt(results.total)}
                    highlight
                  />
                </div>
                <ResultRow label="Projected ROI payback" value={`${results.payback} months`} />
              </div>

              {submitted ? (
                <div className="mt-8 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    Your full ROI report is on its way
                  </p>
                  <p className="mt-2 text-[14px] text-cream-100/80">
                    Check {form.email} in the next few minutes. A solution lead will follow up within
                    24 hours.
                  </p>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    setAttempted(true);
                    // Nothing is sent while a field is wrong. setAttempted above
                    // has already put every message on screen.
                    if (hasErrors) return;
                    submitLead('roi_calculator', {
                      name: form.name,
                      email: form.email,
                      mobile: form.mobile,
                      businessType,
                      annualSavings: Math.round(results.total),
                      paybackMonths: results.payback,
                    });
                    setSubmitted(true);
                  }}
                  className="mt-8 space-y-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream-100/60">
                    Get your full ROI report — module-wise breakdown
                  </p>
                  <RoiField
                    name="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    onBlur={() => touch('name')}
                    error={errorFor('name')}
                  />
                  <RoiField
                    name="email"
                    type="email"
                    placeholder="Work email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    onBlur={() => touch('email')}
                    error={errorFor('email')}
                  />
                  <RoiField
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Mobile (10 digits)"
                    value={form.mobile}
                    onChange={(v) => setForm({ ...form, mobile: v })}
                    onBlur={() => touch('mobile')}
                    error={errorFor('mobile')}
                  />
                  <button
                    type="submit"
                    disabled={attempted && hasErrors}
                    className="btn-primary-glow w-full !py-3 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Get My Full ROI Report
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link to="/demo" className="btn-primary">
              Book Free Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/free-audit" className="btn-secondary">
              Free Business Audit
            </Link>
          </div>
        </Container>
      </section>

      {/* <DemoCtaCompact /> */}
    </>
  );
}

/**
 * One field of the ROI-report capture.
 *
 * The three inputs it replaces carried a placeholder and nothing else, so there
 * was no label for a screen reader to read — hence `aria-label` from the
 * placeholder text. The design stays placeholder-only on purpose; this only adds
 * the name the control was always missing, plus the error line.
 */
function RoiField({ name, value, onChange, onBlur, error, type = 'text', placeholder, inputMode }) {
  const id = `roi-${name}`;

  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        required
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-md border bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-cream-100/40 outline-none ${
          error ? 'border-orange-400/70 focus:border-orange-400' : 'border-white/10 focus:border-orange-500/40'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-orange-300">
          {error}
        </p>
      )}
    </div>
  );
}
