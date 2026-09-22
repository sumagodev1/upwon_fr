import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import useCountUp from '../../../../hooks/useCountUp.js';

/*
  SECTION 9 — "UPWON ERP – Benefits for Everyone".
  Core ERP only: Production, Quality, Inventory & Stores, Procurement, Sales &
  Billing (plant-side), Finance & Accounts, Compliance.

  monday.com "difference" layout: a left highlight list (Operator → Manager →
  CTO → CFO → CEO) synced to a right-hand proof panel — a headline metric, the
  measurable (tangible) outcomes, and the beyond-the-numbers (non-tangible) wins.

  Desktop: hover / click a row to activate it; the panel morphs. Auto-advances
  until the visitor interacts. Mobile / reduced-motion: a lightweight accordion.
*/

const EASE = [0.22, 1, 0.3, 1];
const AUTOPLAY_MS = 5500;

const PERSONAS = [
  {
    eyebrow: 'For the Operator · Plant floor, QC, stores & gate',
    title: 'Cut wastage, bill same-day',
    desc: 'The plant floor, QC, stores, billing and gate recorded in-system — not on paper, not revalidated by hand.',
    metric: { num: 18, suffix: '%' },
    metricLabel: 'wastage reduction within the first year (Kaka Foods)',
    author: 'Plant Operations Head',
    authorOrg: 'Kaka Foods',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=70',
    avatarColor: '#C8820A',
    tangible: [
      'Credit notes cut from 5–6 days and 3 staff to same-day (Kaka Foods)',
      '18% wastage reduction within the first year (Kaka Foods)',
      'Billing 48% faster at the point of dispatch (Kaka Foods)',
      'Batch and expiry tracked automatically via FEFO — no manual log',
    ],
    intangible: [
      'Recipe/BOM and batch costing calculated by the system, not revalidated by hand',
      'In-process QC and batch hold/release built into the workflow, not a separate paper trail',
      'Vendor GRN matched against PO and quality gate automatically',
      'Gate entry, exit and dispatch recorded digitally instead of a logbook',
    ],
  },
  {
    eyebrow: 'For the Manager · Production, QC & Finance',
    title: 'See every plant in real time',
    desc: 'No real-time view of yield or quality holds, multi-plant stock invisible from one place, month-end close taking weeks.',
    metric: { text: '50–80%' },
    metricLabel: 'reduction in operational leakage within plant operations',
    author: 'Production & QC Manager',
    authorOrg: 'Kaka Foods',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70',
    avatarColor: '#006D77',
    tangible: [
      '50–80% reduction in operational leakage within plant operations',
      '20–35% higher dispatch and fulfilment accuracy from the plant',
      'Month-end close taken from weeks to a single, real-time process (Kaka Foods)',
      'Cost per batch and per SKU visible same-day, not reconstructed at month-end',
    ],
    intangible: [
      'Multi-plant inventory and production visible from one screen',
      'Quality holds and rejects flagged in real time, not discovered after dispatch',
      'Wastage and yield variance visible by batch, shift and SKU',
      'Cost Centre and Asset Management tracked in-system, not on parallel spreadsheets',
    ],
  },
  {
    eyebrow: 'For the CTO · Technology & data architecture',
    title: 'One connected data model',
    desc: 'Stitched-together point systems, unclear data architecture and mounting integration debt.',
    metric: { num: 10 },
    metricLabel: 'connected modules on one data model',
    author: 'Technology Lead',
    authorOrg: 'Live UPWON deployment',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=70',
    avatarColor: '#2E7D32',
    tangible: [
      '10 connected modules — Procurement, Production, Quality, Inventory, Dispatch, Sales & Billing, Finance, Cost Centre, Gate, Asset Management — on one data model',
      '3,500+ daily ERP users live today — proven at real transaction volume, not a pilot',
      'FSSAI, GST and e-invoice compliance built into the core data model, not a bolt-on',
      'Live accounting-system interoperability with Tally, SAP, Oracle and MS Dynamics',
    ],
    intangible: [
      'One data model across procurement through finance — no separate systems to sync',
      'Production numbers flow into inventory and finance automatically, no manual reconciliation',
      'SOP-documented go-live process, not an ad hoc customisation project',
      'Working toward ISO 27001 readiness and DPDP Act alignment (in progress, not yet certified)',
    ],
  },
  {
    eyebrow: 'For the CFO · Cost, compliance & return',
    title: 'Live cost and margin visibility',
    desc: 'Unclear ROI, statutory risk, and working capital tied up in slow reconciliation.',
    metric: { text: '8–18%' },
    metricLabel: 'profitability improvement within 6–12 months',
    author: 'Finance Director',
    authorOrg: 'Kaka Foods',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=70',
    avatarColor: '#E85A2A',
    tangible: [
      '8–18% profitability improvement within 6–12 months',
      '50–80% reduction in plant-level operational leakage',
      'Credit note cycle: 5–6 days and 3 staff, down to same-day (Kaka Foods)',
      'A fraction of the 3-year total cost of ownership of SAP B1 or Oracle NetSuite at comparable ERP depth',
    ],
    intangible: [
      'Cost per batch and per SKU visible in real time, not reconstructed at month-end',
      'GST, e-invoice and FSSAI compliance native — lower statutory and audit exposure',
      'Asset Management and Cost Centre MIS remove the need for parallel finance trackers',
      'Faster, more predictable close instead of a multi-week scramble',
    ],
  },
  {
    eyebrow: 'For the CEO / Founder · Scaling the plant',
    title: 'Scale without the chaos',
    desc: 'A new plant adds headcount and chaos before it adds output; production truth scattered across registers, Excel and memory.',
    metric: { num: 8, suffix: ' yrs' },
    metricLabel: 'of live production deployment — proven, not a first-time bet',
    author: 'Founder & CEO',
    authorOrg: 'Kaka Foods',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=70',
    avatarColor: '#1565C0',
    tangible: [
      '8–18% profitability improvement within 6–12 months',
      '18% wastage reduction within the first year at a live plant (Kaka Foods)',
      '3,500+ people running the ERP daily, across live plants',
      '8 years of live production deployment — proven, not a first-time bet',
    ],
    intangible: [
      'A new plant can be added without adding proportional back-office headcount',
      'Production, quality and finance trusted as one source, not reconciled from silos',
      'Margin visible at the batch level, not discovered at month-end',
      'Leadership time shifts from firefighting the plant to running the business',
    ],
  },
];

// Company-wide proof points shown as a compact 3-up row under the big metric.
const MINI_STATS = [
  { value: '3,500+', label: 'Daily ERP users' },
  { value: '10', label: 'Connected modules' },
  { value: '8 yrs', label: 'Live deployment' },
];

// A number that counts up once it scrolls into view (or on remount).
function Counter({ num, suffix = '' }) {
  const { value, ref } = useCountUp(num, { duration: 1300 });
  return (
    <span ref={ref}>
      {Math.round(value).toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

// Avatar with image + initials fallback.
function Avatar({ src, name, color }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  if (failed || !src) {
    return (
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[15px] font-bold text-white"
        style={{ background: color }}
      >
        {initials}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-12 w-12 shrink-0 rounded-full object-cover"
    />
  );
}

// The right-hand proof: person + outcome metric + tangible + non-tangible list.
function Proof({ item }) {
  return (
    <div>
      {/* Headline metric + company-wide proof — 4 uniform stats */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-b border-navy-900/10 pb-5 sm:grid-cols-4">
        {[
          {
            node:
              item.metric.num != null ? (
                <Counter num={item.metric.num} suffix={item.metric.suffix} />
              ) : (
                item.metric.text
              ),
            label: item.metricLabel,
          },
          ...MINI_STATS.map((s) => ({ node: s.value, label: s.label })),
        ].map((s, i) => (
          <div key={i}>
            <p
              className="num-display leading-none text-navy-950"
              style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}
            >
              {s.node}
            </p>
            <p className="mt-1.5 text-[14px] leading-snug text-navy-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Who it's from */}
      <div className="mt-5 flex items-center gap-3">
        <Avatar src={item.avatar} name={item.author} color={item.avatarColor} />
        <div>
          <p className="text-[15px] font-bold text-navy-950">{item.author}</p>
          <p className="text-[14px] text-navy-600">{item.authorOrg}</p>
        </div>
      </div>

      <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">
        Measurable outcomes
      </p>
      <ul className="mt-3 space-y-2.5">
        {item.tangible.map((t) => (
          <li key={t} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.25} />
            <span className="text-[14px] leading-snug text-navy-800 md:text-sm">{t}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">
        Beyond the numbers
      </p>
      <ul className="mt-3 space-y-2">
        {item.intangible.map((t) => (
          <li key={t} className="flex items-start gap-2.5">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-orange-500" />
            <span className="text-[14px] leading-snug text-navy-600">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// One row in the left highlight list.
function PersonaRow({ item, active, onActivate }) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-current={active ? 'true' : undefined}
      className={`group relative block w-full rounded-2xl px-5 py-3 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/70 md:px-6 md:py-3.5 ${
        active
          ? 'border border-white bg-white shadow-md shadow-navy-900/5'
          : 'border border-transparent hover:bg-white/40'
      }`}
    >
      <span
        className={`block text-[12px] font-semibold tracking-wide transition-colors ${
          active ? 'text-orange-600' : 'text-navy-500 group-hover:text-orange-600'
        }`}
      >
        {item.eyebrow}
      </span>
      <span
        className={`mt-0.5 block h-display leading-tight tracking-tight transition-colors ${
          active ? 'text-navy-950' : 'text-navy-900'
        }`}
        style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)' }}
      >
        {item.title}
      </span>

      {/* Description — reveals when active */}
      <motion.div
        initial={false}
        animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="max-w-md pt-2 text-[14px] leading-relaxed text-navy-700 md:text-sm">
          {item.desc}
        </p>
      </motion.div>

      {/* Mobile-only inline proof for the active row */}
      <div className="lg:hidden">
        <motion.div
          initial={false}
          animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="mt-4 rounded-xl border border-cream-300 bg-white p-4">
            <Proof item={item} />
          </div>
        </motion.div>
      </div>
    </button>
  );
}

export default function ErpBenefitsJourney() {
  const [active, setActive] = useState(0);
  const hovering = useRef(false); // pause the auto-cycle while the pointer is over the list

  // Auto-advance one by one; pauses on hover, resumes when the pointer leaves.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const id = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % PERSONAS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const select = (i) => setActive(i);

  return (
    <section className="bg-white px-3 py-8 sm:px-5 md:px-8 md:py-10">
      <div
        className="relative overflow-hidden rounded-[2rem] py-12 md:rounded-[2.75rem] md:py-16"
        style={{ backgroundColor: '#E7F0FD' }}
      >
        <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-30" />

        <Container className="relative">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <Eyebrow className="justify-center">From Plant Floor to Boardroom</Eyebrow>
 <h2 className="mt-2 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
              UPWON ERP — Benefits for{' '}
              <span className="gradient-text-orange">Everyone</span>
            </h2>
            <p className="mx-auto mt-2.5 max-w-xl text-[14px] leading-relaxed text-navy-600 md:text-[15px]">
              Tangible and intangible outcomes from the core UPWON ERP — from the plant
              floor to the boardroom.
            </p>
          </motion.div>

          {/* Highlight list + synced proof */}
          <div
            className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-[1fr_1fr] lg:gap-14"
            onMouseEnter={() => {
              hovering.current = true;
            }}
            onMouseLeave={() => {
              hovering.current = false;
            }}
          >
            {/* LEFT — persona highlight list */}
            <div className="space-y-1">
              {PERSONAS.map((item, i) => (
                <PersonaRow
                  key={item.title}
                  item={item}
                  active={i === active}
                  onActivate={() => select(i)}
                />
              ))}
            </div>

            {/* RIGHT — proof panel (desktop). Divider echoes the reference. */}
            <div className="hidden lg:block lg:border-l lg:border-navy-900/25 lg:pl-14">
              <div className="lg:sticky lg:top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={PERSONAS[active].title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Proof item={PERSONAS[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
