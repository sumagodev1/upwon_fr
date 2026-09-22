import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Factory,
  Workflow,
  Rocket,
  Sparkles,
} from 'lucide-react';
import Container from '../shared/Container/Container.jsx';
import SectionHeading from '../shared/SectionHeading/SectionHeading.jsx';

// Brief §1.7 — Differentiator Section ("Why UpWon").
// Three alternating zigzag blocks that pre-empt the visitor's
// "why not SAP / Tally / ERPNext" objection:
//
//   Block 1 — Industry-Specific Workflows (text LEFT, visual RIGHT)
//   Block 2 — One Data Layer (text RIGHT, visual LEFT)
//   Block 3 — Go Live in 30 Days (text LEFT, visual RIGHT)
//
// Visuals are inline SVG mocks rather than screenshots so the section
// renders fast and stays brand-consistent without needing real product
// captures. Drop real screenshots in later by replacing each <Visual />.
const BLOCKS = [
  {
    eyebrow: 'Block 01 · Industry-built',
    icon: Factory,
    title: 'Industry-specific workflows — not generic modules renamed.',
    body: 'Batch management, recipe costing, FSSAI compliance, franchise POS, scheme leakage detection — these are not bolt-ons. They are how the platform was conceived. A generic ERP cannot retrofit nine years of food-belt domain.',
    bullets: [
      'Batch + recipe + yield engine — out of the box',
      'FSSAI / FoSCoS compliance native to every dispatch',
      'Hub-spoke franchise architecture from day one',
      'Scheme engine + secondary sales — same data layer',
    ],
    ctaLabel: 'See the food ERP in action',
    ctaTo: '/products/erp',
    visual: 'industry',
  },
  {
    eyebrow: 'Block 02 · One data layer',
    icon: Workflow,
    title: 'One data layer. Seven platforms. Zero reconciliation.',
    body: "Your ERP talks to your salesman app talks to your franchise POS talks to your warehouse. Same lot, same MRP, same scheme — read and written once. No nightly batch jobs. No spreadsheet bridges. No 'wait for Monday' reports.",
    bullets: [
      'Master data managed once, consumed everywhere',
      'Live primary → secondary → tertiary sales chain',
      'No third-party connector tax or integration build',
      'Open API + webhook surface for anything external',
    ],
    ctaLabel: 'See the architecture',
    ctaTo: '/platform',
    visual: 'data-layer',
  },
  {
    eyebrow: 'Block 03 · Mid-market delivery',
    icon: Rocket,
    title: 'Go live in 30 days. Not 18 months.',
    body: 'Our mid-market implementation model includes data migration, role-based training and dedicated go-live support. You see value in weeks, not quarters. Most food + FMCG customers are live in 30–45 days. SAP customers are still mapping their first BOM at that point.',
    bullets: [
      '5-stage rollout — discover, configure, migrate, train, go-live',
      'Dedicated CSM through go-live + first quarterly review',
      'Tally / existing-system kept live during cutover',
      'Fixed-price contract — no surprise change requests',
    ],
    ctaLabel: 'See the rollout playbook',
    ctaTo: '/implementation',
    visual: 'timeline',
  },
];

export default function WhyUpWonZigzag() {
  return (
    <section
      id="why-upwon"
      className="relative overflow-hidden bg-white scroll-mt-32"
    >
      <div className="absolute inset-0 grid-bg-light opacity-20" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[440px] w-[440px] rounded-full bg-orange-500/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[380px] w-[380px] rounded-full bg-navy-500/[0.05] blur-[140px]" />

      <Container className="relative">
        <div className="section-pad">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Why UpWon · Not SAP, not Tally"
            title={
              <>
                Three reasons buyers stop comparing and{' '}
                <span className="gradient-text-orange">start with us.</span>
              </>
            }
            description="The objections we hear most — and the contrarian, specific, defensible answers we give every time."
          />
        </div>

        {BLOCKS.map((block, i) => (
          <ZigzagBlock key={block.title} block={block} flipped={i % 2 === 1} index={i} />
        ))}

        {/* Footer CTA — brief: "Book a Demo to See All Three" */}
        <div className="pb-20 text-center md:pb-24">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-navy-500">
            Three differentiators · One conversation
          </p>
          <Link to="/demo" className="btn-primary mt-4 !px-6 !py-3 !text-[14px]">
            <Sparkles className="h-4 w-4" />
            Book a demo to see all three
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-[14px] text-navy-500">
            No slides. 30 minutes. Your industry, your modules.
          </p>
        </div>
      </Container>
    </section>
  );
}

function ZigzagBlock({ block, flipped, index }) {
  const Icon = block.icon;
  return (
    <div className="border-t border-cream-200 py-16 md:py-20">
      <div className={`grid items-center gap-10 md:grid-cols-2 md:gap-14`}>
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: flipped ? 28 : -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={flipped ? 'md:order-2' : ''}
        >
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
              <Icon className="h-4 w-4" />
            </span>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-600">
              {block.eyebrow}
            </p>
          </div>

          <h3 className="mt-5 font-display text-balance text-[1.9rem] font-bold leading-[1.1] text-navy-950 md:text-[2.3rem]">
            {block.title}
          </h3>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-700">
            {block.body}
          </p>

          <ul className="mt-6 grid gap-2.5">
            {block.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-[14px] leading-relaxed text-navy-800">
                  {b}
                </span>
              </li>
            ))}
          </ul>

          {/* Primary = orange, secondary = navy outline (per home-page design
              review) so the two CTAs read in the standard brand hierarchy. */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to={block.ctaTo} className="btn-primary !text-[14px]">
              {block.ctaLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/demo" className="btn-secondary !text-[14px]">
              Or see it in a 30-min demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* VISUAL */}
        <motion.div
          initial={{ opacity: 0, x: flipped ? -28 : 28, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.75,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={flipped ? 'md:order-1' : ''}
        >
          <Visual variant={block.visual} index={index} />
        </motion.div>
      </div>
    </div>
  );
}

// Inline SVG mocks per block — kept lightweight and brand-coloured so they
// don't ship as PNGs. Each variant tells the visual story of its block.
function Visual({ variant }) {
  if (variant === 'industry') return <IndustryVisual />;
  if (variant === 'data-layer') return <DataLayerVisual />;
  if (variant === 'timeline') return <TimelineVisual />;
  return null;
}

// Block 1 — a "Batch management" mocked dashboard tile.
function IndustryVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0a0e26] ring-1 ring-white/5">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
        <span className="h-2 w-2 rounded-full bg-green-400/80" />
        <span className="ml-3 text-[14px] font-medium text-white/55">
          app.upwon.in / erp / batch
        </span>
      </div>
      <div className="aspect-[16/10] w-full p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-orange-300">
              Batch · BT-2026-0816
            </span>
            <p className="mt-2 font-display text-base font-bold text-white">
              Vanilla Cake · 800 units
            </p>
          </div>
          <span className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[14px] font-semibold text-emerald-300">
            ● Live
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { k: 'Yield', v: '98.2%', tone: '#3fa1ac' },
            { k: 'RM cost', v: '₹42.6 / pc', tone: '#FF7340' },
            { k: 'Margin', v: '38.4%', tone: '#5BAA5E' },
          ].map((m) => (
            <div
              key={m.k}
              className="min-w-0 rounded-xl border border-white/10 bg-white/[0.04] p-2.5 sm:p-3"
            >
              <p className="truncate text-[9px] font-bold uppercase tracking-[0.16em] text-white/55">
                {m.k}
              </p>
              <p
                className="num-display mt-1 text-sm font-bold sm:text-lg"
                style={{ color: m.tone }}
              >
                {m.v}
              </p>
            </div>
          ))}
        </div>

        {/* Recipe rows */}
        <div className="mt-5 space-y-2">
          {[
            { name: 'Maida', actual: 86, target: 90 },
            { name: 'Butter', actual: 92, target: 88 },
            { name: 'Sugar', actual: 78, target: 80 },
            { name: 'Vanilla extract', actual: 64, target: 66 },
          ].map((ing) => (
            <div key={ing.name} className="flex items-center gap-2">
              <span className="w-20 shrink-0 truncate text-[14px] font-semibold text-white/70 sm:w-32">
                {ing.name}
              </span>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${ing.actual}%`,
                    background:
                      'linear-gradient(90deg, #E85A2A, #FF7340)',
                  }}
                />
                <div
                  className="absolute inset-y-0 w-px bg-white/40"
                  style={{ left: `${ing.target}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-[14px] font-bold text-orange-300">
                {ing.actual}%
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[14px] text-white/50">
          FSSAI batch trace · Allergen flagged · QC sign-off pending
        </p>
      </div>
    </div>
  );
}

// Block 2 — a one-data-layer architecture mock.
function DataLayerVisual() {
  const platforms = [
    { name: 'ERP', x: 50, y: 80, color: '#1565C0' },
    { name: 'SFA-DMS', x: 200, y: 60, color: '#2E7D32' },
    { name: 'FMS', x: 320, y: 110, color: '#6A1B9A' },
    { name: 'POS', x: 320, y: 200, color: '#C62828' },
    { name: 'HRMS', x: 200, y: 240, color: '#00695C' },
    { name: 'WMS', x: 50, y: 200, color: '#E65100' },
    { name: 'Vendor', x: 30, y: 140, color: '#37474F' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0a0e26] p-7 ring-1 ring-white/5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-orange-300">
          One data layer
        </span>
        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[14px] font-semibold text-white/60">
          Live sync
        </span>
      </div>

      <div className="relative mt-5 aspect-[5/4] w-full">
        <svg viewBox="0 0 380 320" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="coreFill" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#FF7340" />
              <stop offset="100%" stopColor="#E85A2A" />
            </radialGradient>
          </defs>

          {/* Connector lines to the core */}
          {platforms.map((p) => (
            <line
              key={`line-${p.name}`}
              x1={p.x}
              y1={p.y}
              x2={190}
              y2={160}
              stroke={p.color}
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
          ))}

          {/* Core data layer */}
          <circle
            cx="190"
            cy="160"
            r="50"
            fill="url(#coreFill)"
            opacity="0.95"
          />
          <circle
            cx="190"
            cy="160"
            r="50"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <text
            x="190"
            y="156"
            textAnchor="middle"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            fontFamily="Sora, sans-serif"
          >
            DATA LAYER
          </text>
          <text
            x="190"
            y="174"
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="9"
          >
            Same lot · Same MRP
          </text>

          {/* Platform nodes */}
          {platforms.map((p) => (
            <g key={p.name}>
              <circle
                cx={p.x}
                cy={p.y}
                r="22"
                fill={p.color}
                fillOpacity="0.18"
                stroke={p.color}
                strokeWidth="1.5"
              />
              <text
                x={p.x}
                y={p.y + 3.5}
                textAnchor="middle"
                fill="#fff"
                fontSize="10"
                fontWeight="700"
                fontFamily="Sora, sans-serif"
              >
                {p.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <ul className="mt-4 space-y-1.5 text-[14px] text-white/65">
        <li>● No connector tax · No ETL · No nightly batch</li>
        <li>● Read + write the same record from any platform</li>
        <li>● Open REST + webhook surface for everything external</li>
      </ul>
    </div>
  );
}

// Block 3 — a 30-day implementation timeline mock.
function TimelineVisual() {
  const milestones = [
    { day: 'Day 0', label: 'Discover', sub: 'Domain calls · system audit' },
    { day: 'Day 7', label: 'Configure', sub: 'Workflows · roles · masters' },
    { day: 'Day 14', label: 'Migrate', sub: 'Tally / Excel cutover plan' },
    { day: 'Day 21', label: 'Train', sub: 'Role-based + floor walk-through' },
    { day: 'Day 30', label: 'Go-live', sub: 'CSM on-site · 14-day hand-hold' },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-cream-100 to-white p-7 ring-1 ring-navy-100">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-500/12 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-orange-700">
          30-day playbook
        </span>
        <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[14px] font-semibold text-emerald-700">
          ● Fixed scope · Fixed price
        </span>
      </div>

      <p className="mt-4 font-display text-[15px] font-bold leading-tight text-navy-950">
        Most food + FMCG customers live in{' '}
        <span className="text-orange-600">30–45 days.</span>
      </p>

      {/* Timeline rail */}
      <div className="relative mt-7">
        <div className="absolute left-3 top-3 h-[calc(100%-24px)] w-[3px] rounded-full bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300" />
        <ul className="space-y-4">
          {milestones.map((m, i) => (
            <li key={m.label} className="relative pl-9">
              <span
                className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full text-[14px] font-bold text-white shadow-md"
                style={{
                  background:
                    'linear-gradient(135deg, #E85A2A, #FF7340)',
                }}
              >
                {i + 1}
              </span>
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-[14px] font-bold text-navy-950">
                  {m.label}
                </p>
                <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-navy-700">
                  {m.day}
                </span>
              </div>
              <p className="mt-0.5 text-[14px] text-navy-600">{m.sub}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-navy-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Compare: SAP food rollouts run 12–24 months
      </p>
    </div>
  );
}
