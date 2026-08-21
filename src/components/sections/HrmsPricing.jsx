import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  HRMS "Module Versions & Growth Path" — HREasy's real Core / Pro / Plus packages
  as a 3-column comparison, consistent with the live pricing page. Start with Core
  HR, grow into full performance management. Navy/minimalist white cards; Pro is
  the highlighted "Most Popular" tier. Orange is the only accent.
*/

const EASE = [0.22, 1, 0.3, 1];

const TIERS = [
  {
    label: 'Core',
    title: 'Core HR & Payroll',
    subtitle: 'Everything a growing team needs to run HR & payroll right.',
    pill: '1 company',
    features: [
      'HR & Staff access roles',
      '3 leave / salary structures',
      'Document management',
      'Attendance & OT workflow',
      'Leave approval, encashment & carry-forward',
      'Payroll & statutory compliance',
      'Employee self-service',
    ],
    cta: { label: 'Get Started', to: '/demo' },
    ctaStyle: 'outlineAccent',
    featured: false,
  },
  {
    label: 'Pro',
    title: 'Multi-Company HR',
    subtitle: 'Onboarding, biometric attendance and a mobile app.',
    pill: 'Up to 5 companies',
    inherit: 'Everything in Core, plus…',
    features: [
      'Multiple access roles',
      '10 leave / salary structures',
      'Employee onboarding',
      'Biometric / web / geo / selfie login',
      'Expense approval workflow',
      'Advanced auto-deduction',
      'Exit & offboarding automation',
      'Mobile app',
    ],
    cta: { label: 'Book a Demo', to: '/demo' },
    ctaStyle: 'filled',
    featured: true,
  },
  {
    label: 'Plus',
    title: 'Full HR Lifecycle',
    subtitle: 'Recruitment, training, performance and appraisals.',
    pill: 'Unlimited companies',
    inherit: 'Everything in Core & Pro, plus…',
    features: [
      'Unlimited leave / salary structures',
      'JD & recruitment',
      'Skill-gap & training workflows',
      'KPA / KPI definition',
      'Appraisal management system',
      'Mobile app',
    ],
    cta: { label: 'Contact Sales', to: '/demo' },
    ctaStyle: 'outlineNavy',
    featured: false,
  },
];

const CTA_CLASS = {
  filled: 'bg-orange-500 text-white hover:bg-orange-600',
  outlineAccent: 'border border-orange-200 text-orange-600 hover:bg-orange-50',
  outlineNavy: 'border border-navy-200 text-navy-900 hover:border-navy-400 hover:bg-navy-50',
};

function TierCard({ tier, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
      className={`relative flex flex-col rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-enterprise ${
        tier.featured
          ? 'border-2 border-orange-500 shadow-enterprise'
          : 'border border-cream-300 shadow-sm'
      }`}
    >
      {/* Most popular badge */}
      {tier.featured && (
        <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
          <Sparkles className="h-3.5 w-3.5" />
          Most Popular
        </span>
      )}

      {/* Header */}
      <div className={`rounded-t-3xl px-7 pb-6 pt-8 ${tier.featured ? 'bg-orange-50' : ''}`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-400">
          {tier.label}
        </p>
        <h3 className="mt-2 h-display text-[1.7rem] leading-tight tracking-tight text-navy-950">
          {tier.title}
        </h3>
        <p className="mt-2 min-h-[2.5rem] text-[14px] leading-snug text-navy-500">{tier.subtitle}</p>
        <span
          className={`mt-4 inline-block rounded-md px-3 py-1.5 text-[12px] font-semibold text-navy-700 ${
            tier.featured ? 'bg-white' : 'bg-navy-900/[0.06]'
          }`}
        >
          {tier.pill}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col border-t border-cream-200 px-7 pb-7 pt-6">
        {tier.inherit && (
          <p className="mb-3 text-[13px] font-semibold italic text-navy-500">{tier.inherit}</p>
        )}
        <ul className="space-y-3.5">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" strokeWidth={3} />
              <span className="text-[14px] leading-snug text-navy-700">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link
            to={tier.cta.to}
            className={`flex w-full items-center justify-center gap-1.5 rounded-xl px-5 py-3.5 text-[15px] font-semibold transition-colors ${CTA_CLASS[tier.ctaStyle]}`}
          >
            {tier.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function HrmsPricing() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Module Versions &amp; Growth Path</Eyebrow>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Start With Core HR.{' '}
            <span className="gradient-text-orange">Grow Into Full Performance Management.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            HREasy&apos;s Core, Pro and Plus packages — start where you are today and add depth as
            you scale, on the same platform.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.label} tier={tier} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
