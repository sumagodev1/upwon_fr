import { m as motion } from 'framer-motion';
import {
  Factory,
  Package,
  Monitor,
  BarChart3,
  UserRound,
  ClipboardCheck,
  Truck,
  PieChart,
  Building2,
  ShieldCheck,
  Settings,
  Check,
  UserPlus,
  Rocket,
  Activity,
  TrendingUp,
  Network,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  FMS "UpWon's Approach" — the pivot section. Establishes that FMS is a franchise
  operating system (POS is one connected piece, not the reverse), told across four
  separate representations:
    1. Every franchise MODEL   — COCO / FOFO / COFO / FOCO ownership types
    2. Every franchise STAGE   — onboarding → renew & expand lifecycle
    3. The connected ecosystem — all 7 UpWon platforms around one data core
    4. Pre-built integrations  — the outside world plugs in
  Icon-led (no photos) and orange-themed to match the rest of the FMS page.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';
const TINT = 'rgba(232,90,42,0.1)';

/* ---------------------------------------------------------------- 1. TYPES */

const TYPES = [
  {
    code: 'COCO',
    name: 'Company Owned, Company Operated',
    img: '/images/coco.webp',
    points: [
      { icon: Factory, title: 'Production Control', desc: 'Central planning and real-time monitoring.' },
      { icon: Package, title: 'Inventory Visibility', desc: 'Real-time stock across all outlets.' },
      { icon: Monitor, title: 'POS Integration', desc: 'Orders flow directly into operations.' },
      { icon: BarChart3, title: 'Profitability Tracking', desc: 'Track sales, costs, margins in real-time.' },
    ],
  },
  {
    code: 'FOFO',
    name: 'Franchisee Owned, Franchisee Operated',
    img: '/images/fofo.webp',
    points: [
      { icon: UserRound, title: 'Franchisee Control', desc: 'Franchisee manages daily operations.' },
      { icon: ClipboardCheck, title: 'Standardized SOPs', desc: 'Follow brand processes for consistency.' },
      { icon: Truck, title: 'Inventory & Replenishment', desc: 'Efficient stock management and timely replenishment.' },
      { icon: PieChart, title: 'Sales & Profit Tracking', desc: 'Real-time visibility of sales, profitability and insights.' },
    ],
  },
  {
    code: 'COFO',
    name: 'Company Owned, Franchisee Operated',
    img: '/images/cofo.webp',
    points: [
      { icon: Building2, title: 'Company Owned Assets', desc: 'Company owns the outlet and infrastructure.' },
      { icon: UserRound, title: 'Franchisee Operates', desc: 'Franchisee manages operations and staff.' },
      { icon: ShieldCheck, title: 'SOP & Quality Control', desc: 'Company ensures SOP adherence and quality.' },
      { icon: BarChart3, title: 'Performance Oversight', desc: 'Company monitors performance and provides support.' },
    ],
  },
  {
    code: 'FOCO',
    name: 'Franchisee Owned, Company Operated',
    img: '/images/foco.webp',
    points: [
      { icon: Building2, title: 'Franchisee Owned Outlet', desc: 'Franchisee owns the outlet and assets.' },
      { icon: Settings, title: 'Company Operates', desc: 'Company manages operations, staff and day-to-day.' },
      { icon: ClipboardCheck, title: 'Process & Brand Control', desc: 'Company ensures brand standards and excellence.' },
      { icon: BarChart3, title: 'Financial Visibility', desc: 'Franchisee gets complete visibility of performance.' },
    ],
  },
];

function TypeCard({ type, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
      className="flex flex-col overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-sm transition-shadow hover:shadow-enterprise md:flex-row"
    >
      {/* Photo with code badge — on md+ the image fills its column via absolute
          positioning so the card height is driven by the content (no blank
          space), not by the image's natural aspect ratio. */}
      <div className="relative shrink-0 md:w-[44%]">
        <img
          src={type.img}
          alt={`${type.code} — ${type.name}`}
          loading="lazy"
          decoding="async"
          className="h-48 w-full object-cover md:absolute md:inset-0 md:h-full"
        />
        <span
          className="absolute left-4 top-4 inline-flex rounded-lg px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white shadow-sm"
          style={{ background: ORANGE }}
        >
          {type.code}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 md:p-6">
        <h3 className="h-display text-2xl tracking-tight" style={{ color: ORANGE }}>
          {type.code}
        </h3>
        <p className="mt-1 text-[15px] font-bold text-navy-950">{type.name}</p>
        <span className="mt-2.5 block h-[3px] w-10 rounded-full" style={{ background: ORANGE }} />

        <div className="mt-4 grid gap-x-5 gap-y-4 sm:grid-cols-2">
          {type.points.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                  style={{ background: TINT, color: ORANGE }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.9} />
                </span>
                <p className="text-[14px] font-bold leading-snug text-navy-950">{p.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------------------- 2. STAGES */

const STAGES = [
  {
    n: '01',
    icon: UserPlus,
    img: '/images/onboarding1.webp',
    title: 'Onboarding',
    tag: 'Introduction',
    points: [
      'Franchise partner onboarding',
      'Documentation & agreement',
      'SOP & training setup',
      'Roles, access & system setup',
    ],
  },
  {
    n: '02',
    icon: Rocket,
    img: '/images/launching.webp',
    title: 'Launching',
    tag: 'Hyper Care',
    points: [
      'Pre-launch readiness checklist',
      'Initial inventory & supply setup',
      'Team training & activation',
      'Launch support & monitoring',
    ],
  },
  {
    n: '03',
    icon: Activity,
    img: '/images/daily_operation.webp',
    title: 'Daily Operations',
    tag: 'Smooth & Defined',
    points: [
      'Order & sales management',
      'Inventory & stock control',
      'Staff & workflow management',
      'Real-time MIS & dashboards',
    ],
  },
  {
    n: '04',
    icon: ClipboardCheck,
    img: '/images/audit.webp',
    title: 'Audit',
    tag: 'Knowing Facts',
    points: [
      'Audit checklists & scorecards',
      'Operational compliance tracking',
      'Variance identification',
      'Correction & action tracking',
    ],
  },
  {
    n: '05',
    icon: TrendingUp,
    img: '/images/grow_performance.webp',
    title: 'Grow Performance',
    tag: 'Growth Tools',
    points: [
      'Sales & profitability analysis',
      'Performance benchmarking',
      'Marketing & promotion tools',
      'Targets & incentive management',
    ],
  },
  {
    n: '06',
    icon: Network,
    img: '/images/renew_expand.webp',
    title: 'Renew & Expand',
    tag: 'Key Indicators',
    points: [
      'Renewal tracking & alerts',
      'Expansion opportunity insights',
      'Network performance overview',
      'Data-driven decision support',
    ],
  },
];

// Interleaved per-column timing: node 1 → card 1 → node 2 → card 2 → …
// The point advances to a column, that column's card appears, then the next.
const NODE_START = 0.15;
const COL_STEP = 0.7; // time to advance from one column to the next
const NODE_TO_CARD = 0.32; // gap between a node landing and its card appearing

function StageColumn({ stage, i }) {
  const nodeDelay = NODE_START + i * COL_STEP;
  const cardDelay = nodeDelay + NODE_TO_CARD;
  return (
    <div className="flex h-full flex-col items-center text-center">
      {/* node + labels — reveal one-by-one along the line */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 6 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: nodeDelay, ease: EASE }}
        className="flex flex-col items-center"
      >
        <span
          className="relative z-10 hidden h-4 w-4 rounded-full ring-4 ring-[#f5f6fa] xl:block"
          style={{ background: ORANGE }}
        />
        <span className="num-display mt-0 text-[1.7rem] xl:mt-4" style={{ color: ORANGE }}>
          {stage.n}
        </span>
        <h3 className="mt-1 text-[15px] font-bold uppercase tracking-tight text-navy-950">
          {stage.title}
        </h3>
        <p className="text-[14px] font-semibold" style={{ color: ORANGE }}>
          {stage.tag}
        </p>
      </motion.div>

      {/* card — appears after all nodes are placed */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: cardDelay, ease: EASE }}
        className="mt-4 flex w-full flex-1 flex-col overflow-hidden rounded-3xl border border-cream-300 bg-white text-left shadow-sm"
      >
        {/* stage photo */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={stage.img}
            alt={`${stage.title} — ${stage.tag}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <ul className="flex-1 space-y-2.5 p-5">
          {stage.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[14px] leading-snug text-navy-700">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: ORANGE }} strokeWidth={2.6} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {/* bottom accent bar */}
        <span className="block h-1.5 w-full" style={{ background: ORANGE }} />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------ 3. ECOSYSTEM */

const RING = ['ERP', 'POS', 'HRMS', 'WMS', 'SFA-DMS', 'VMS', 'FMS'];

/* ------------------------------------------------------------------- ROOT */

function BlockHeading({ eyebrow, lead, accent, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mx-auto max-w-3xl text-center"
    >
      <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
        {lead} <span className="gradient-text-orange">{accent}</span>
      </h2>
      {sub && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
          {sub}
        </p>
      )}
    </motion.div>
  );
}

export default function UpwonApproach() {
  return (
    <>
      {/* 1 — FRANCHISE MODELS ------------------------------------------------ */}
      <section className="relative overflow-hidden bg-white py-10 md:py-14">
        <Container>
          <BlockHeading
            eyebrow="UpWon's Approach"
            lead="One System —"
            accent="Every Type of the Franchise Model"
            sub="Different ownership. Different operations. One connected system that unifies every franchise model under a single operational truth."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {TYPES.map((t, i) => (
              <TypeCard key={t.code} type={t} i={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* 2 — FRANCHISE STAGES ------------------------------------------------ */}
      <section className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-24">
        <Container>
          <BlockHeading
            eyebrow="One System"
            lead="Mapped Every Stage of the"
            accent="Franchise Development"
            sub="From onboarding to expansion — UpWon supports every step with the right tools, insights, and control."
          />
          <div className="relative mt-12">
            {/* animated dashed connector line running through the node dots (xl only) */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: NODE_START + 5 * COL_STEP, ease: 'linear' }}
              className="pointer-events-none absolute left-[8.33%] right-[8.33%] top-2 hidden origin-left border-t-2 border-dashed border-orange-300 xl:block"
            />
            <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {STAGES.map((s, i) => (
                <StageColumn key={s.n} stage={s} i={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3 — CONNECTED ECOSYSTEM -------------------------------------------- */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <Container>
          <BlockHeading
            eyebrow="One System"
            lead="Covering Future Needs"
            accent="of Your Business"
            sub="UpWon FMS shares its data model with UpWon ERP — royalty, brand-standard scoring and outlet billing all draw from the same production and cost truth as the central kitchen."
          />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <motion.img
              src="/images/one_Systems.webp"
              alt="UpWon connected ecosystem — ERP, POS, HRMS, WMS, SFA-DMS, VMS and FMS around one data core"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mx-auto w-full max-w-[480px]"
            />
            <div>
              <p className="text-[15px] font-bold text-navy-950">One data core. Every platform connected.</p>
              <p className="mt-3 text-[14px] leading-relaxed text-navy-600">
                Most franchise networks run on ERP, POS, HRMS and WMS — and grow into SFA-DMS, VMS
                and FMS as they scale. On UpWon they aren&apos;t seven disconnected tools stitched
                together; they share one data model, so production cost, royalty, inventory and outlet
                performance all speak the same truth.
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {RING.map((label) => (
                  <li key={label} className="flex items-center gap-2 text-[14px] text-navy-800">
                    <Check className="h-4 w-4 shrink-0" style={{ color: ORANGE }} strokeWidth={2.6} />
                    <span>UpWon {label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

    </>
  );
}
