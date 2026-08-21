import { useCallback, useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Croissant,
  Milk,
  Cookie,
  Factory,
  Truck,
  Store,
  UtensilsCrossed,
  Cog,
  Calculator,
  TrendingUp,
  Package,
  Users,
  LayoutDashboard,
  CheckCircle2,
  ShieldCheck,
  ClipboardCheck,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// "Find Your Priority Platform" — an AI-consultant styled recommender.
// Two questions (industry + one pain/vision) → analyzing → a "Your System"
// result card. Light / premium theme. JSX + framer-motion + lucide.
// ---------------------------------------------------------------------------

const EASE = [0.16, 1, 0.3, 1];

// --- STEP 1 · "I run a..." --------------------------------------------------

const INDUSTRIES = [
  { id: 'bakery', name: 'Bakery & Confectionery', desc: 'Breads, cakes & confections', icon: Croissant },
  { id: 'dairy', name: 'Dairy & Milk Processing', desc: 'Milk, curd & cold chain', icon: Milk },
  { id: 'sweets', name: 'Sweets, Namkeen & Snacks', desc: 'Mithai, namkeen & snacks', icon: Cookie },
  { id: 'manufacturing', name: 'Food / FMCG Manufacturing', desc: 'Processed & packaged foods', icon: Factory },
  { id: 'distribution', name: 'FMCG Distribution', desc: 'Distributors & super-stockists', icon: Truck },
  { id: 'franchise', name: 'Franchise or Retail Chain', desc: 'Multi-outlet & franchise', icon: Store },
  { id: 'qsr', name: 'QSR & Food Chains', desc: 'Quick-service & cloud kitchens', icon: UtensilsCrossed },
  { id: 'other', name: 'Other Manufacturing', desc: 'Engineering & discrete mfg.', icon: Cog },
];

// --- STEP 2 · one pain to remove / one vision to chase (same order routes to
//     the same system) --------------------------------------------------------

const OPTIONS = [
  { icon: Calculator, pain: "I don't know my real production cost or wastage", vision: 'I want profit visibility — per product, per plant, per day' },
  { icon: Store, pain: 'My outlets / franchisees are out of my control', vision: 'I want to scale from 10 outlets to 100+ without chaos' },
  { icon: TrendingUp, pain: 'My field sales team and distributors are invisible to me', vision: 'I want my brand on every retail shelf in my state' },
  { icon: Package, pain: 'Stock never matches — across godowns, plants, outlets', vision: 'I want same-day, zero-error dispatch from every location' },
  { icon: Users, pain: "HR, attendance and payroll eat my team's time", vision: 'I want a team that runs on KRAs — not my follow-ups' },
  { icon: LayoutDashboard, pain: 'My business runs on Excel, Tally and WhatsApp — I have no single view', vision: 'I want my entire business on one screen — running on autopilot' },
];

// --- STEP 3 · result cards (routed 1:1 by the chosen option index) ----------

const RESULTS = [
  {
    id: 'erp',
    name: 'UpWon ERP',
    img: '/icons/ERP.svg',
    gradient: 'from-orange-500 to-amber-400',
    glow: 'rgba(245,158,11,0.35)',
    href: '/products/erp',
    headline: 'Know your true cost — of every batch, every product, every day.',
    changes: [
      'Live production costing from raw material to dispatch',
      'Wastage tracked and attacked, batch by batch',
      'Month-end closing in days, not weeks',
    ],
    proof: 'Kaka Halwai (est. 1892) cut wastage 18% in Year 1 and made billing 48% faster.',
  },
  {
    id: 'fms',
    name: 'UpWon FMS + POS',
    img: '/icons/FMS-OPS.svg',
    gradient: 'from-fuchsia-500 to-purple-600',
    glow: 'rgba(192,90,255,0.32)',
    href: '/products/fms-pos',
    headline: 'Run 10 outlets or 200 — same visibility, same control.',
    changes: [
      "Every outlet's sales, stock and compliance on one screen",
      'Central order processing, royalty and SOP audits automated',
      'Franchisees grow your brand, not their shortcuts',
    ],
    proof: 'Monginis scaled 35 → 200+ outlets on UpWon — with the same back-office team.',
  },
  {
    id: 'sfa',
    name: 'UpWon SFA-DMS',
    img: '/icons/SFA-DMS.svg',
    gradient: 'from-sky-500 to-blue-600',
    glow: 'rgba(56,132,255,0.32)',
    href: '/products/sfa-dms',
    headline: 'See every beat, every order, every distributor — live.',
    changes: [
      "Field team's routes, visits and orders on your phone",
      'Distributor stock and secondary sales, no more guessing',
      'Schemes and claims managed, not leaked',
    ],
    proof: 'FMCG brands run their entire distribution network on UpWon — GT and MT together.',
  },
  {
    id: 'wms',
    name: 'UpWon WMS',
    img: '/icons/WMS.svg',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.32)',
    href: '/products/wms',
    headline: 'Stock that matches — every location, every time.',
    changes: [
      'FEFO / barcode-driven picking, near-zero expiry losses',
      'Real-time stock across plants, godowns and hubs',
      'Dispatch planned, tracked, error-free',
    ],
    proof: 'UpWon processes ₹16 Cr+ of transactions daily across multi-location operations.',
  },
  {
    id: 'hr',
    name: 'UpWon HREasy',
    img: '/icons/HRMS.svg',
    gradient: 'from-rose-500 to-orange-400',
    glow: 'rgba(244,63,94,0.3)',
    href: '/products/hreasy',
    headline: 'From hiring to payroll to performance — on autopilot.',
    changes: [
      'Biometric attendance to payslip with zero manual work',
      'PF, ESIC, PT compliance built in, not bolted on',
      'KRA-KPI scorecards that run performance for you',
    ],
    proof: '36,500+ employees clock in on UpWon platforms every single day.',
  },
  {
    id: 'suite',
    name: 'Full UpWon Suite',
    img: '/icons/upwon_circle.png',
    gradient: 'from-indigo-500 to-violet-600',
    glow: 'rgba(99,102,241,0.32)',
    href: '/products',
    headline: 'One database. One login. Your entire business on one screen.',
    changes: [
      'ERP, sales, outlets, warehouse, HR — all talking to each other',
      'No re-entry, no reconciliation, no version confusion',
      'Works alongside Tally — nothing breaks on day one',
    ],
    proof: '50+ businesses replaced 5–10 scattered tools with one suite.',
  },
];

// --- Ambient background (light) --------------------------------------------

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37.6) % 100,
  top: (i * 61.3) % 100,
  size: 2 + ((i * 7) % 5),
  delay: (i % 10) * 0.6,
  duration: 6 + ((i * 3) % 7),
}));

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Responsive section background — mobile & tablet (<lg) · laptop (lg–2xl)
          · desktop (2xl+, wide monitors). */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
        style={{ backgroundImage: 'url(/images/mobile%20view.webp)' }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat lg:block 2xl:hidden"
        style={{ backgroundImage: 'url(/images/laptop.webp)' }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat 2xl:block"
        style={{ backgroundImage: 'url(/images/platform_finder.webp)' }}
      />
      <motion.div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.16), transparent 70%)' }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 top-1/3 h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(56,132,255,0.14), transparent 70%)' }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-160px] left-1/3 h-[480px] w-[480px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-slate-400/40"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -26, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// --- Small building blocks -------------------------------------------------

function GlassCard({ children, className = '', ...rest }) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl ${className}`}
      style={{ boxShadow: '0 24px 60px -30px rgba(15,23,42,0.28), inset 0 1px 0 rgba(255,255,255,0.9)' }}
      {...rest}
    >
      {children}
    </div>
  );
}

function ConsultantLine({ text }) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex items-center justify-center gap-3"
    >
      <p className="text-[15px] font-medium text-slate-700 md:text-base">{text}</p>
    </motion.div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500"
        initial={false}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </div>
  );
}

// CTA button — stable (no cursor-follow), just a colour hover.
function MagneticButton({ children, primary, className = '', as: Tag = 'a', ...rest }) {
  return (
    <Tag
      className={`group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-colors ${
        primary
          ? 'bg-orange-500 text-white shadow-[0_12px_30px_-8px_rgba(245,158,11,0.6)] hover:bg-orange-600'
          : 'border-2 border-navy-900 bg-white text-navy-900 shadow-sm hover:bg-slate-50'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// --- Industry tile ---------------------------------------------------------

function IndustryCard({ item, selected, onSelect }) {
  const Icon = item.icon;
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item.id)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={`group relative flex flex-col items-start gap-2 overflow-hidden rounded-2xl border p-3.5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
        selected ? 'border-amber-400 bg-amber-50/70' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
      }`}
      style={selected ? { boxShadow: '0 0 0 1px rgba(245,158,11,0.35), 0 24px 55px -28px rgba(245,158,11,0.6)' } : undefined}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
          selected ? 'bg-gradient-to-br from-orange-500 to-amber-400 text-white' : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-[14px] font-semibold leading-tight text-navy-950">{item.name}</span>
        <span className="mt-0.5 block text-[14px] leading-snug text-slate-500">{item.desc}</span>
      </span>
      {selected && <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-amber-500" />}
    </motion.button>
  );
}

// --- Pain / vision toggle + option row --------------------------------------

function ModeToggle({ mode, onChange }) {
  const opts = [
    { id: 'pain', label: 'Remove a pain' },
    { id: 'vision', label: 'Chase a vision' },
  ];
  return (
    <div className="mx-auto mb-6 flex w-full max-w-md items-center rounded-full border border-slate-200 bg-slate-50 p-1">
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`relative flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            mode === o.id ? 'text-white' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {mode === o.id && (
            <motion.span
              layoutId="mode-pill"
              className="absolute inset-0 rounded-full bg-orange-500"
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

function OptionCard({ text, icon: Icon, selected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 ${
        selected ? 'border-amber-400 bg-amber-50/70' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
          selected ? 'bg-gradient-to-br from-orange-500 to-amber-400 text-white' : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex-1 text-[14px] font-medium leading-snug text-navy-950">{text}</span>
      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

// --- Analyzing state -------------------------------------------------------

function Analyzing() {
  const lines = ['Analyzing your business…', 'Matching pain to system…', 'Finding your priority platform…'];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % lines.length), 900);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col items-center py-16 text-center"
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-amber-400/30 border-t-amber-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-3 rounded-full border-2 border-sky-400/25 border-b-sky-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_-6px_rgba(245,158,11,0.45)]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/icons/upwon_circle.png" alt="UPWON" className="h-14 w-14 object-contain" />
        </motion.span>
      </div>

      <div className="mt-8 flex h-16 items-end gap-1.5">
        {[40, 65, 50, 80, 60, 95, 72].map((h, idx) => (
          <motion.span
            key={idx}
            className="w-2.5 rounded-full bg-gradient-to-t from-orange-500/30 to-amber-400"
            animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`] }}
            transition={{ duration: 1.1, delay: idx * 0.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="mt-8 h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-[15px] font-medium text-slate-500"
          >
            {lines[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- Result card -----------------------------------------------------------

const CONFETTI = Array.from({ length: 42 }, (_, i) => ({
  angle: (i / 42) * Math.PI * 2,
  dist: 120 + ((i * 13) % 160),
  color: ['#f59e0b', '#0ea5e9', '#a855f7', '#10b981', '#fb923c'][i % 5],
  size: 5 + ((i * 3) % 6),
  delay: (i % 6) * 0.03,
}));

function Confetti() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-24 z-20 h-0 w-0">
      {CONFETTI.map((c, i) => (
        <motion.span
          key={i}
          className="absolute rounded-[2px]"
          style={{ width: c.size, height: c.size, background: c.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos(c.angle) * c.dist, y: Math.sin(c.angle) * c.dist + 120, opacity: 0, scale: 0.4, rotate: 260 }}
          transition={{ duration: 1.5, delay: c.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

function ResultCard({ result, onRestart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative"
    >
      <Confetti />

      <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-emerald-600">
        <ShieldCheck className="h-4 w-4" />
        Analysis complete — here&apos;s your match
      </div>

      <GlassCard className="overflow-hidden">
        <div className="relative p-8">
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-70 blur-3xl"
            style={{ background: `radial-gradient(circle, ${result.glow}, transparent 70%)` }}
          />

          {/* Eyebrow */}
          <p className="gradient-text-orange relative text-xs font-semibold uppercase tracking-[0.24em]">Your System</p>

          {/* System name + one-line reversal of their pain */}
          <div className="relative mt-4 flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-lg">
              <img src={result.img} alt={result.name} className="h-9 w-9 object-contain" />
            </span>
            <h3 className="text-2xl font-bold text-navy-950 md:text-[1.75rem]">{result.name}</h3>
          </div>
          <p className="relative mt-4 text-lg font-semibold leading-snug text-navy-950 md:text-xl">
            {result.headline}
          </p>

          {/* Three "what changes" lines */}
          <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
            {result.changes.map((c) => (
              <div key={c} className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span className="text-[14px] leading-snug text-slate-700">{c}</span>
              </div>
            ))}
          </div>

          {/* Proof line */}
          <div className="relative mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-[14px] leading-relaxed text-slate-700">
              <span className="font-semibold text-orange-600">Proof · </span>
              {result.proof}
            </p>
          </div>
        </div>

        {/* Dual CTA */}
        <div className="flex flex-col gap-3 border-t border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" /> Start over
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="/contact">
              <ClipboardCheck className="h-4 w-4" /> Get my Free ROI Assessment
            </MagneticButton>
            <MagneticButton href={result.href} primary>
              See the system <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// --- Section ---------------------------------------------------------------

const STEPS = [
  { key: 'industry', prompt: "First — what do you run?", question: 'I run a…' },
  { key: 'focus', prompt: 'Now — one pain to remove, or one vision to chase?', question: 'Pick the one that hits home.' },
];

export default function AiPlatformFinder() {
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState('quiz'); // quiz | analyzing | result
  const [industry, setIndustry] = useState(null);
  const [mode, setMode] = useState('pain'); // pain | vision
  const [choice, setChoice] = useState(null); // routed option index 0-5
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const total = STEPS.length;
  const progress = phase === 'result' ? 100 : phase === 'analyzing' ? 95 : (stepIndex / total) * 100;
  const secondsLeft = Math.max(3, (total - stepIndex) * 10);

  const selectIndustry = useCallback((id) => {
    setIndustry(id);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStepIndex(1), 420);
  }, []);

  const selectOption = useCallback((index) => {
    setChoice(index);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase('analyzing');
      timerRef.current = setTimeout(() => setPhase('result'), 2700);
    }, 440);
  }, []);

  const back = () => {
    clearTimeout(timerRef.current);
    if (phase === 'result') {
      setPhase('quiz');
      setStepIndex(1);
    } else if (phase === 'quiz' && stepIndex > 0) {
      setStepIndex((s) => s - 1);
    }
  };

  const restart = () => {
    clearTimeout(timerRef.current);
    setIndustry(null);
    setMode('pain');
    setChoice(null);
    setStepIndex(0);
    setPhase('quiz');
  };

  const step = STEPS[stepIndex];

  return (
    <section id="platform-finder" className="relative overflow-hidden bg-white py-10 md:py-14">
      <AmbientBackground />

      <Container className="relative z-10">
        {/* Hero */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Eyebrow>Your System</Eyebrow>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mt-4 h-display text-balance text-[2rem] leading-[1.1] text-navy-950 md:text-[2.5rem]"
          >
            Don&apos;t Explore All 7 Platforms.{' '}
            <span className="gradient-text-orange">Find your One to Start With…</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-navy-600"
          >
            Tell us two things, and in the next 20 seconds we&apos;ll find your Priority Platform —
            start with one platform, integrate the rest as you grow.
          </motion.p>
        </div>

        {/* Console */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mx-auto mt-7 max-w-4xl"
        >
          {phase !== 'result' && (
            <GlassCard className="p-5 md:p-6">
              {/* Conversational prompt */}
              <div className="mb-4 min-h-[2.5rem]">
                <AnimatePresence mode="wait">
                  <ConsultantLine
                    key={phase === 'analyzing' ? 'analyzing' : step.key}
                    text={phase === 'analyzing' ? 'Analyzing your business…' : step.prompt}
                  />
                </AnimatePresence>
              </div>

              {/* Body */}
              <AnimatePresence mode="wait">
                {phase === 'analyzing' ? (
                  <Analyzing key="analyzing" />
                ) : (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <h3 className="mb-4 text-center text-base font-semibold text-navy-950 md:text-lg">
                      {step.question}
                    </h3>

                    {step.key === 'industry' && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {INDUSTRIES.map((item) => (
                          <IndustryCard
                            key={item.id}
                            item={item}
                            selected={industry === item.id}
                            onSelect={selectIndustry}
                          />
                        ))}
                      </div>
                    )}

                    {step.key === 'focus' && (
                      <div>
                        <ModeToggle mode={mode} onChange={setMode} />
                        <div className="grid gap-3 sm:grid-cols-2">
                          {OPTIONS.map((o, i) => (
                            <OptionCard
                              key={i}
                              icon={o.icon}
                              text={mode === 'pain' ? o.pain : o.vision}
                              selected={choice === i}
                              onSelect={() => selectOption(i)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress footer — moved below the body */}
              <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={back}
                  disabled={phase === 'quiz' && stepIndex === 0}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="flex-1">
                  <ProgressBar value={progress} />
                </div>
                <span className="shrink-0 text-[14px] font-medium tabular-nums text-slate-400">
                  {phase === 'analyzing' ? 'Analyzing…' : `${Math.round(progress)}% · ~${secondsLeft}s left`}
                </span>
              </div>
            </GlassCard>
          )}

          {/* Result */}
          <AnimatePresence>
            {phase === 'result' && choice !== null && (
              <ResultCard result={RESULTS[choice]} onRestart={restart} />
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
