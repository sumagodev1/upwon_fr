import { m as motion } from 'framer-motion';
import { Briefcase, Boxes, Calendar, Heart } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionIntro from '../ui/SectionIntro.jsx';
import useCountUp from '../../hooks/useCountUp.js';
import TrustStrip, { CLIENT_LOGOS } from './TrustStrip.jsx';
import { PLATFORM_MODULES } from '../../data/modules.js';

// Brief §19.4 — UpWon in Numbers + customer logo strip.
// 4 stats: Businesses Deployed / Platforms / Years Domain Expertise /
// Customer Retention. Each animates a count-up on scroll into view via the
// shared useCountUp hook. Customer logo strip (TrustStrip) is reused from
// the homepage so the brand wall stays consistent across pages.
//
// The platform count pulls live from PLATFORM_MODULES.length so it stays in
// sync if the suite ever changes (currently 7).
const STATS = [
  {
    icon: Briefcase,
    value: 150,
    suffix: '+',
    label: 'Businesses Deployed',
    sub: 'Across food, FMCG and franchise verticals',
    duration: 1800,
  },
  {
    icon: Boxes,
    value: PLATFORM_MODULES.length, // live count — 7 platforms today
    suffix: '',
    label: 'Enterprise Platforms',
    sub: 'ERP · SFA-DMS · FMS · POS · HRMS · WMS · Vendor Portal',
    duration: 1200,
  },
  {
    icon: Calendar,
    value: 12,
    suffix: '+',
    label: 'Years Domain Expertise',
    sub: 'Inside India\'s food belt — 2016 to today',
    duration: 1400,
  },
  {
    icon: Heart,
    value: 98,
    suffix: '%',
    label: 'Customer Retention',
    sub: 'Yearly. Verified across deployed accounts.',
    duration: 2000,
  },
];

export default function AboutNumbersSection() {
  return (
    <section
      id="numbers"
      className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14 scroll-mt-32"
    >
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-orange-500/[0.07] blur-[140px]" />

      <Container className="relative">
        <SectionIntro
          eyebrow="UpWon in numbers"
          title={
            <>
              The numbers behind the company —{' '}
              <span className="gradient-text-orange">honestly defensible.</span>
            </>
          }
          description="We round small numbers, not big ones. Every stat below is something we can pull up in a customer review."
        />

        {/* Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>

        {/* Customer logo strip */}
        <div className="mt-16">
          <p className="text-center text-[10.5px] font-bold uppercase tracking-[0.22em] text-navy-500">
            Trusted by growing food &amp; FMCG businesses across India
          </p>
          <div className="mt-6">
            <TrustStrip embedded logos={CLIENT_LOGOS} />
          </div>
          <div className="mt-8 text-center">
            <a
              href="/clients"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
            >
              Read customer stories →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatCard({ stat, index }) {
  const { ref, value } = useCountUp(stat.value, { duration: stat.duration });
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-enterprise"
    >
      <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/0 blur-2xl transition-colors duration-700 group-hover:bg-orange-500/15" />

      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100 transition-transform duration-500 group-hover:scale-110">
        <stat.icon className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <p className="num-display mt-5 text-5xl font-bold leading-none tracking-tightest text-navy-950">
        {value}
        <span className="text-orange-500">{stat.suffix}</span>
      </p>
      <p className="mt-3 font-display text-[14px] font-bold leading-tight text-navy-900">
        {stat.label}
      </p>
      <p className="mt-1 text-[14px] leading-snug text-navy-600">{stat.sub}</p>
    </motion.article>
  );
}
