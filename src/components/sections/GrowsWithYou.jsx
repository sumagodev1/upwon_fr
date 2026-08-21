import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, UserRound, MapPin, Warehouse, Share2 } from 'lucide-react';
import Container from '../ui/Container.jsx';

/*
  "Grows With You" — the phased SFA → DMS → Suite adoption path shown as three
  packages (pricing-table style, but no prices). Each package builds on the one
  before it, so a buyer can start with the field team and add distributor
  control when ready — no big-bang rollout. No package is highlighted.
*/

const EASE = [0.22, 1, 0.3, 1];

// Field sales rep — person with a location pin (no single lucide icon for it).
function FieldRepIcon({ className }) {
  return (
    <span className="relative inline-flex">
      <UserRound className={className} strokeWidth={1.7} />
      <MapPin className="absolute -bottom-1 -right-2 h-4 w-4" strokeWidth={1.7} />
    </span>
  );
}

const PACKAGES = [
  {
    key: 'sfa',
    stage: 'Stage 1',
    title: 'SFA',
    subtitle: 'For Your Field Team',
    desc: 'Empower your field team to sell smarter and cover more.',
    color: '#22A45D',
    tint: 'rgba(34,164,93,0.1)',
    icon: FieldRepIcon,
    featuresLabel: 'Key features',
    features: [
      'Beat & PJP route planning',
      'Order booking & call reporting',
      'Real-time secondary sales capture',
      'Van sales & pre-sales',
      'Cash collection tracking',
      'Attendance & GPS-tagged visits',
      'Target vs achievement MIS',
      'Works offline, syncs on network',
    ],
  },
  {
    key: 'dms',
    stage: 'Stage 2',
    title: 'DMS',
    subtitle: 'For Distributor Control',
    desc: 'Bring distributor operations into view and manage with confidence.',
    color: '#0F9E96',
    tint: 'rgba(15,158,150,0.1)',
    icon: Warehouse,
    featuresLabel: 'Everything in SFA, plus',
    features: [
      'Distributor stock & inventory visibility',
      'Distributor billing & GST e-invoicing',
      'Scheme & claim automation',
      'Credit & outstanding tracking',
      'Secondary-sales settlement',
      'Primary order management',
      'Distributor performance dashboards',
    ],
  },
  {
    key: 'suite',
    stage: 'Complete',
    title: 'SFA + DMS Suite',
    subtitle: 'The Complete Connected Solution',
    desc: 'One connected system from field to distributor — and into your ERP.',
    color: '#7C5CFC',
    tint: 'rgba(124,92,252,0.1)',
    icon: Share2,
    featuresLabel: 'Everything in DMS, plus',
    features: [
      'Shared data model with UpWon ERP',
      'Production → inventory → distribution visibility',
      'Modern Trade module & planogram compliance',
      'Advanced analytics & AI insights',
      'Multi-region, multi-beat rollout',
      'Priority implementation & support',
    ],
  },
];

export default function GrowsWithYou() {
  return (
    <section className="relative overflow-hidden bg-cream-100 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-orange-500/60" />
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-600">
              Grows With You
            </p>
            <span className="h-px w-6 bg-orange-500/60" />
          </div>
 <h2 className="mt-4 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            Start With Your Field Team.{' '}
            <span className="gradient-text-orange">Add Distributor Control When You&apos;re Ready.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            SFA and DMS can be adopted in sequence, region by region or beat by beat — not a forced
            simultaneous rollout across every distributor on day one.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
          {PACKAGES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                className="flex flex-col rounded-3xl border border-cream-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-enterprise md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl"
                    style={{ background: p.tint, color: p.color }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span
                    className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: p.color, borderColor: `${p.color}33` }}
                  >
                    {p.stage}
                  </span>
                </div>

                <h3 className="mt-4 h-display text-2xl tracking-tight text-navy-950">{p.title}</h3>
                <p className="mt-1 text-sm font-bold" style={{ color: p.color }}>
                  {p.subtitle}
                </p>
                <p className="mt-3 min-h-[44px] text-[14px] leading-relaxed text-navy-600">
                  {p.desc}
                </p>

                <Link
                  to="/demo"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-950"
                >
                  Talk to a specialist
                </Link>

                <div className="mt-6 border-t border-cream-300 pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-500">
                    {p.featuresLabel}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-navy-800">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: p.color }}
                          strokeWidth={2.6}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
