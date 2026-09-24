import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  FMS "Module Versions & Growth Path" — tiered packages shown as pricing-style
  plan cards. Start with outlet billing (CORE), grow into royalty/network (PRO),
  then governance at scale (PLUS) — no switching systems. "Talk to us", no
  prices; scope descriptors instead of seat counts.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the row the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';

/*
  The built-in content, written in the shape the API sends so that a CMS
  section and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Module Versions & Growth Path';
const HEADING_LINES = [
  [
    { text: 'Start With Your Counter. ', accent: false },
    { text: 'Grow Into Full Franchise Control.', accent: true },
  ],
];
const SUBTEXT =
  'A three-tier structure built from our FMS & POS sub-systems — start with outlet billing and expand into royalty and compliance as the network grows.';
const FOOTNOTE =
  'No setup fees · Free data migration · Dedicated onboarding · Phased, outlet-by-outlet rollout';

const TIERS = [
  {
    slug: 'core',
    name: 'CORE',
    lead: 'Talk to us',
    tagline: 'Run outlet operations digitally',
    scope: 'Outlet billing → operations',
    inheritsLabel: null,
    buttonLabel: 'Get Started',
    buttonHref: '/demo',
    isPopular: false,
    features: [
      'Franchisee Onboarding',
      'Outlet POS Billing',
      'KOT System',
      'Central Order Processing',
      'Menu & recipe management',
      'Daily sales & outlet reports',
    ],
  },
  {
    slug: 'pro',
    name: 'PRO',
    lead: 'Talk to us',
    tagline: 'Automate royalty & see the network',
    scope: 'Royalty + network visibility',
    inheritsLabel: 'Everything in Core, plus:',
    buttonLabel: 'Book a Demo',
    buttonHref: '/demo',
    isPopular: true,
    features: [
      'Royalty Management',
      'Brand-fee & billing automation',
      'Hub-Spoke Dispatch',
      'Multi-outlet stock visibility',
      'Swiggy / Zomato order sync',
      'Franchise MIS',
    ],
  },
  {
    slug: 'plus',
    name: 'PLUS',
    lead: 'Talk to us',
    tagline: 'Govern, comply & scale with confidence',
    scope: 'Governance + ERP connect',
    inheritsLabel: 'Everything in Pro, plus:',
    buttonLabel: 'Contact Sales',
    buttonHref: '/contact',
    isPopular: false,
    features: [
      'SOP Audit & Compliance Scoring',
      'Grievance Management',
      'Outlet-level P&L & network dashboards',
      'Role-based access & full audit trail',
      'Multi-region rollout controls',
      'Full connection into central-kitchen production data via UpWon ERP',
    ],
  },
];

function CheckItem({ children, bold }) {
  return (
    <li className="flex items-start gap-2.5">
      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ORANGE }} strokeWidth={3} />
      <span
        className={`text-[14px] leading-snug ${bold ? 'font-bold text-navy-900' : 'text-navy-700'}`}
      >
        {children}
      </span>
    </li>
  );
}

function TierCard({ t, index }) {
  const popular = t.isPopular;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white ${
        popular ? 'border-orange-300 shadow-enterprise' : 'border-cream-300 shadow-sm'
      }`}
    >
      {popular && (
        <div
          className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-b-xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
          style={{ background: ORANGE }}
        >
          <Sparkles className="h-3 w-3" />
          Most Popular
        </div>
      )}

      {/* Top — label + lead + scope */}
      <div className={`px-7 pb-6 pt-9 ${popular ? 'bg-orange-50/70' : ''}`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-400">{t.name}</p>
        <p className="mt-3 h-display text-[1.7rem] font-black leading-none tracking-tight text-navy-950">
          {t.lead}
        </p>
        <p className="mt-2 text-[14px] leading-snug text-navy-500">{t.tagline}</p>
        <span className="mt-4 inline-block rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-[14px] font-semibold text-navy-700">
          {t.scope}
        </span>
      </div>

      {/* Features + CTA */}
      <div className="flex flex-1 flex-col border-t border-cream-200 px-7 pb-7 pt-6">
        <ul className="space-y-3">
          {t.inheritsLabel && <CheckItem bold>{t.inheritsLabel}</CheckItem>}
          {t.features.map((f) => (
            <CheckItem key={f}>{f}</CheckItem>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link
            to={t.buttonHref}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-colors ${
              popular
                ? 'text-white hover:opacity-95'
                : 'border border-orange-300 text-orange-600 hover:bg-orange-50'
            }`}
            style={popular ? { background: ORANGE } : undefined}
          >
            {t.buttonLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FmsGrowthPath({ section }) {
  /*
    A published section replaces the built-in one wholesale rather than filling
    in around it: a half-CMS, half-shipped row would compare tiers nobody
    authored against ones somebody did.
  */
  const tiers = section && section.tiers && section.tiers.length > 0 ? section.tiers : TIERS;
  const eyebrow = section?.eyebrow ?? EYEBROW;
  const headingLines = section?.headingLines ?? HEADING_LINES;
  const subtext = section?.subtext || SUBTEXT;
  // Undefined means "no CMS section"; null means one that turned the line off.
  const footnote = section ? section.footnote : FOOTNOTE;

  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <TierCard key={t.slug} t={t} index={i} />
          ))}
        </div>

        {/* Reassurance line */}
        {footnote && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mx-auto mt-10 text-center text-[14px] font-semibold text-navy-600"
          >
            {footnote}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
