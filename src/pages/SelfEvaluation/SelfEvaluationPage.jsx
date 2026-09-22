import { useMemo, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  RefreshCcw,
  ShieldCheck,
  AlertTriangle,
  Hourglass,
} from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';

// Brief §1.8 — "Step 1: Do you really need software? An honest evaluation."
// This page asks 8 yes/no questions about the user's current state. Each YES
// adds weight toward "you would benefit from a platform"; the result groups
// the user into one of three tiers with a recommended next step.
//
// Designed to feel like an honest assessment, not a sales funnel — the lowest
// tier explicitly recommends NOT buying software yet.
const QUESTIONS = [
  {
    id: 'q1',
    // Content update (Self-Evaluation SEO doc) — old text: 'Do you currently run production, sales or finance on spreadsheets that more than one person edits?'
    text: 'Do you run production, sales or finance on spreadsheets more than one person edits?',
    weight: 2,
    // Content update (Self-Evaluation SEO doc) — old why: 'Multi-person spreadsheets are the single most common source of silent data errors in mid-market operations.'
    why: 'Multi-person spreadsheets are the top source of silent data errors in mid-market operations.',
  },
  {
    id: 'q2',
    // Content update (Self-Evaluation SEO doc) — old text: 'Does your team take more than 7 days to close monthly books?'
    text: 'Does closing your monthly books take more than 7 days?',
    weight: 2,
    // Content update (Self-Evaluation SEO doc) — old why: 'A 7+ day close usually means month-end stitching across disconnected systems — not a process problem, a tools problem.'
    why: 'A 7+ day close usually means stitching disconnected systems — a tools problem, not a process one.',
  },
  {
    id: 'q3',
    // Content update (Self-Evaluation SEO doc) — old text: 'Do salesmen / distributors send orders over WhatsApp or phone calls?'
    text: 'Do salesmen or distributors order over WhatsApp or phone calls?',
    weight: 1,
    // Content update (Self-Evaluation SEO doc) — old why: 'Verbal / chat-based ordering creates unrecoverable data: scheme disputes, missed orders, lost outlets.'
    why: 'Chat-based ordering creates unrecoverable data — scheme disputes, missed orders, lost outlets.',
  },
  {
    id: 'q4',
    // Content update (Self-Evaluation SEO doc) — old text: 'Have you been surprised by wastage, stockouts, or expiry write-offs at month-end in the last quarter?'
    text: 'Were you surprised by wastage, stockouts or expiry write-offs at month-end last quarter?',
    weight: 2,
    // Content update (Self-Evaluation SEO doc) — old why: 'Surprise losses mean you don\'t have real-time visibility into the things that cost you money.'
    why: 'Surprise losses mean no real-time visibility into what\'s actually costing you money.',
  },
  {
    id: 'q5',
    // Content update (Self-Evaluation SEO doc) — old text: 'Do you have more than 25 employees and process payroll on Excel?'
    text: 'Do you have 25+ employees and run payroll on Excel?',
    weight: 2,
    // Content update (Self-Evaluation SEO doc) — old why: 'Excel payroll above 25 employees usually means statutory exposure (PF/ESIC/PT) is being managed by memory.'
    why: 'Excel payroll past 25 staff usually means PF/ESIC/PT exposure managed by memory.',
  },
  {
    id: 'q6',
    text: 'Do you operate from more than one location (plant, warehouse, outlet)?',
    weight: 1,
    // Content update (Self-Evaluation SEO doc) — old why: 'Multi-location is where most spreadsheet stacks finally break — different teams, different versions, no single truth.'
    why: 'Multi-location is where spreadsheet stacks break — different teams, versions, no single truth.',
  },
  {
    id: 'q7',
    // Content update (Self-Evaluation SEO doc) — old text: 'Are you planning to grow your revenue, outlet count or distribution network by 30%+ this year?'
    text: 'Are you planning 30%+ growth in revenue, outlets or distribution this year?',
    weight: 1,
    // Content update (Self-Evaluation SEO doc) — old why: 'Scaling a broken process makes the brokenness 30% worse. Better to fix the process before adding the volume.'
    why: 'Scaling a broken process only makes it 30% worse — fix it before adding the volume.',
  },
  {
    id: 'q8',
    // Content update (Self-Evaluation SEO doc) — old text: 'Do you spend 5+ hours a week chasing data, status updates or reconciliations across teams?'
    text: 'Do you spend 5+ hours a week chasing data, status updates or reconciliations?',
    weight: 2,
    // Content update (Self-Evaluation SEO doc) — old why: 'Owner / leadership time spent on coordination is the highest-cost time in the business.'
    why: 'Leadership time lost to coordination is the most expensive time in the business.',
  },
];

const TIERS = [
  {
    min: 0,
    max: 4,
    name: 'Not yet — and that\'s the honest answer',
    icon: ShieldCheck,
    color: 'emerald',
    // Content update (Self-Evaluation SEO doc) — old body:
    // 'Your current setup likely still serves you. Software at this stage tends to add overhead before it adds value. Revisit this when 2-3 of these factors change — and skip the demo until then.'
    body:
      'Your current setup still serves you; a platform now would add overhead before value. Revisit when 2-3 of these factors change.',
    cta: { label: 'Subscribe to our monthly insider', to: '/newsletter' },
  },
  {
    min: 5,
    max: 9,
    name: 'You\'re on the edge — start exploring',
    icon: Hourglass,
    color: 'amber',
    body:
      'You\'re hitting the early signals that a platform would pay back. Don\'t commit yet — get a free audit, understand the gaps, and then decide. No-cost, no-pressure.',
    cta: { label: 'Book a Free Business Audit', to: '/free-audit' },
  },
  {
    min: 10,
    max: 13,
    name: 'You need a system — and the cost of waiting is high',
    icon: AlertTriangle,
    color: 'orange',
    body:
      'At this score, the operational tax of staying on spreadsheets and disconnected tools is almost certainly higher than the cost of UpWon. Run the ROI calculator next — or book a demo configured for your business.',
    cta: { label: 'Calculate your ROI', to: '/roi-calculator' },
  },
];

function ToggleRow({ q, value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(value === 'yes' ? null : 'yes')}
      className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
        value === 'yes'
          ? 'border-orange-500 bg-orange-50/60 shadow-sm'
          : 'border-cream-300 bg-white hover:border-orange-200 hover:bg-cream-100'
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {value === 'yes' ? (
          <CheckCircle2 className="h-5 w-5 text-orange-500" />
        ) : (
          <Circle className="h-5 w-5 text-navy-300" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14.5px] font-semibold leading-snug text-navy-950">
          {q.text}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-navy-600">
          {q.why}
        </p>
      </div>
      <div
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
          value === 'yes'
            ? 'bg-orange-500 text-white'
            : 'bg-cream-200 text-navy-500'
        }`}
      >
        {value === 'yes' ? 'Yes' : 'No'}
      </div>
    </button>
  );
}


const HERO_ACCENT = '#E85A2A';

/* Hero backdrops — the site’s shared hero artwork. This page has never
   had dedicated hero photography of its own; drop a local webp in here
   when it does and nothing else needs to change. */
const HERO_BG_A = '/images/hero%20bg%202.webp';

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'STEP 1 · HONEST EVALUATION',
    headline:
      'Do You Really Need Software?',
    subhead:
      'Before we talk ROI, let\'s talk truth. This 8-question ERP readiness check tells you honestly whether a food or FMCG business like yours needs a platform now — or can wait.',
    bg: HERO_BG_A,
    accent: HERO_ACCENT,
    cta: { label: 'Request a Demo', to: '/demo' },
    secondaryCta: { label: 'Calculate Your ROI', to: '/roi-calculator' },
  },
];

export default function SelfEvaluationPage() {
  const [answers, setAnswers] = useState({});

  const { score, answered, tier } = useMemo(() => {
    let s = 0;
    let n = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === 'yes') {
        s += q.weight;
        n += 1;
      } else if (answers[q.id] === 'no') {
        n += 1;
      }
    });
    // Tier is decided on the running score; before any answers we show
    // the lowest tier preview so the page never looks empty.
    const t = TIERS.find((r) => s >= r.min && s <= r.max) || TIERS[0];
    return { score: s, answered: n, tier: t };
  }, [answers]);

  const yesAll = () =>
    setAnswers(QUESTIONS.reduce((a, q) => ((a[q.id] = 'yes'), a), {}));
  const reset = () => setAnswers({});

  const tierColor =
    tier.color === 'emerald'
      ? { border: 'border-emerald-300', bg: 'bg-emerald-50', text: 'text-emerald-700', pill: 'bg-emerald-500' }
      : tier.color === 'amber'
      ? { border: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-700', pill: 'bg-amber-500' }
      : { border: 'border-orange-300', bg: 'bg-orange-50', text: 'text-orange-700', pill: 'bg-orange-500' };

  return (
    <>
      {/* Content update (Self-Evaluation SEO doc) — original Seo kept for reference:
      <Seo
        title="Self-Evaluation — Which UpWon Platform Fits You"
        description="Answer 8 honest questions about your operations. We tell you which UpWon platform fits — and the ROI you should expect first."
        canonical="https://upwon.in/self-evaluation"
      />
      */}
      <Seo
        title="Self-Evaluation — Which UpWon Platform Fits You | UpWon"
        description="Answer 8 honest questions about your operations. We tell you whether you need an ERP yet — and the ROI to expect first. Free, no sign-up."
        canonical="https://upwon.in/self-evaluation"
      />
      <HeroSlider
        slides={HERO_SLIDES}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Questions */}
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
                  {answered}/{QUESTIONS.length} answered
                </p>
                <div className="flex items-center gap-2 text-[14px]">
                  <button
                    type="button"
                    onClick={yesAll}
                    className="rounded-full border border-cream-300 bg-white px-3 py-1 font-medium text-navy-700 hover:border-orange-200"
                  >
                    Tick all
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1 rounded-full border border-cream-300 bg-white px-3 py-1 font-medium text-navy-700 hover:border-orange-200"
                  >
                    <RefreshCcw className="h-3 w-3" /> Reset
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {QUESTIONS.map((q) => (
                  <ToggleRow
                    key={q.id}
                    q={q}
                    value={answers[q.id]}
                    onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                  />
                ))}
              </div>
            </div>

            {/* Result panel — sticky on desktop */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className={`rounded-2xl border ${tierColor.border} ${tierColor.bg} p-6 shadow-enterprise`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
                    Your score
                  </p>
                  <p className="num-display mt-2 text-5xl text-navy-950">
                    {score}
                    <span className="text-xl text-navy-400">/13</span>
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white ${tierColor.pill}`}>
                    <tier.icon className="h-3.5 w-3.5" />
                    Verdict
                  </div>
                  <h3 className="mt-3 h-display text-lg font-bold leading-snug text-navy-950">
                    {tier.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-navy-700">
                    {tier.body}
                  </p>
                  <Link
                    to={tier.cta.to}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-950 px-4 py-3 text-[14px] font-semibold text-white hover:bg-navy-900"
                  >
                    {tier.cta.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <p className="mt-3 text-center text-[14px] text-navy-500">
                    No spam. No hard sell. Honest assessment.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Step 2 link — after the verdict, the natural next step */}
          <div className="mt-14 rounded-2xl border border-cream-300 bg-white p-6 text-center shadow-sm md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
              Step 2 · If yes, what&rsquo;s the investment and ROI?
            </p>
            <h3 className="mt-2 h-display text-xl text-navy-950 md:text-2xl">
              Already know you need this? Run your personalised ROI in 3 minutes.
            </h3>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link to="/roi-calculator" className="btn-primary">
                Use the Free ROI Calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/demo" className="btn-secondary">
                Or skip ahead — book a demo
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* <DemoCtaCompact /> */}
    </>
  );
}
