import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, UserRound, MapPin, Warehouse, Share2 } from 'lucide-react';
import Container from '../Container/Container.jsx';
import HeadingLines from '../HeadingLines/HeadingLines.jsx';
import { sfaIcon, accentTint } from '../../../lib/sfaIcons.jsx';

/*
  "Grows With You" — the phased SFA → DMS → Suite adoption path shown as three
  packages (pricing-table style, but no prices). Each package builds on the one
  before it, so a buyer can start with the field team and add distributor
  control when ready — no big-bang rollout. No package is highlighted.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the copy the site ships.
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

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below. The
  only difference is the icon: these hold the component, while a CMS card holds
  its name and is resolved through sfaIcon().
*/
const EYEBROW = 'Grows With You';
const HEADING_LINES = [
  [
    { text: 'Start With Your Field Team. ', accent: false },
    { text: "Add Distributor Control When You're Ready.", accent: true },
  ],
];
const SUBTEXT =
  'SFA and DMS can be adopted in sequence, region by region or beat by beat — not a forced simultaneous rollout across every distributor on day one.';

const BUTTON = { label: 'Talk to a specialist', href: '/demo' };

const PACKAGES = [
  {
    key: 'sfa',
    stageLabel: 'Stage 1',
    title: 'SFA',
    subtitle: 'For Your Field Team',
    description: 'Empower your field team to sell smarter and cover more.',
    accentColor: '#22A45D',
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
    stageLabel: 'Stage 2',
    title: 'DMS',
    subtitle: 'For Distributor Control',
    description: 'Bring distributor operations into view and manage with confidence.',
    accentColor: '#0F9E96',
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
    stageLabel: 'Complete',
    title: 'SFA + DMS Suite',
    subtitle: 'The Complete Connected Solution',
    description: 'One connected system from field to distributor — and into your ERP.',
    accentColor: '#7C5CFC',
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

export default function GrowsWithYou({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  /*
    A CMS card names its icon and carries its own button; a built-in one holds
    the component and shares the single button above. Normalised here so the
    card markup below has one shape to render.
  */
  const packages = section
    ? section.cards.map((card, index) => ({
        ...card,
        key: `${card.title}-${index}`,
        icon: sfaIcon(card.icon),
      }))
    : PACKAGES.map((p) => ({
        ...p,
        buttonLabel: BUTTON.label,
        buttonHref: BUTTON.href,
      }));

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
          {eyebrow && (
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-6 bg-orange-500/60" />
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-600">
                {eyebrow}
              </p>
              <span className="h-px w-6 bg-orange-500/60" />
            </div>
          )}
 <h2 className="mt-4 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Packages */}
        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
          {packages.map((p, i) => {
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
                    style={{ background: accentTint(p.accentColor, 0.1), color: p.accentColor }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span
                    className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: p.accentColor, borderColor: `${p.accentColor}33` }}
                  >
                    {p.stageLabel}
                  </span>
                </div>

                <h3 className="mt-4 h-display text-2xl tracking-tight text-navy-950">{p.title}</h3>
                <p className="mt-1 text-sm font-bold" style={{ color: p.accentColor }}>
                  {p.subtitle}
                </p>
                <p className="mt-3 min-h-[44px] text-[14px] leading-relaxed text-navy-600">
                  {p.description}
                </p>

                <Link
                  to={p.buttonHref}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-950"
                >
                  {p.buttonLabel}
                </Link>

                {p.features.length > 0 && (
                  <div className="mt-6 border-t border-cream-300 pt-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-500">
                      {p.featuresLabel}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[14px] text-navy-800">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: p.accentColor }}
                            strokeWidth={2.6}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
