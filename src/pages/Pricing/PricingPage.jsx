import { m as motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/shared/Container/Container.jsx';
import PageHero from '../../components/shared/PageHero/PageHero.jsx';
import SectionHeading from '../../components/shared/SectionHeading/SectionHeading.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';

const TIERS = [
  {
    name: 'Starter',
    revenue: '₹2–25 Crore',
    desc: 'For bakeries, sweets, namkeen, dairy and beverage SMBs that need ERP foundations.',
    includes: [
      'UpWon ERP — Core',
      'FSSAI & GST native',
      'Basic SFA · DMS',
      'Standard FEFO inventory',
      'Single plant operations',
      'Standard support',
    ],
    flag: '',
  },
  {
    name: 'Growth',
    revenue: '₹25–200 Crore',
    desc: 'For growing manufacturers scaling distribution and franchise networks.',
    includes: [
      'Everything in Starter',
      'UpWon SFA-DMS — full',
      'UpWon FMS + POS',
      'UpWon WMS — advanced',
      'Multi-plant · multi-depot',
      'Priority support · Dedicated SPOC',
    ],
    flag: 'Most popular',
  },
  {
    name: 'Enterprise',
    revenue: '₹200 Crore+',
    desc: 'For food conglomerates and national FMCG brands with complex operations.',
    includes: [
      'Everything in Growth',
      'UpWon HREasy — full statutory',
      'UpWon Vendor Portal',
      'All Mobile Apps',
      'AI Copilot & forecasting',
      'Custom integrations · 24×7 SLA',
    ],
    flag: 'SAP-grade depth',
  },
];

export default function PricingPage() {
  return (
    <>
      <Seo
        title="Pricing — Tiers for SMB to Enterprise"
        description="Transparent UpWon pricing built for Indian food and FMCG operations — Starter, Growth, Scale and Enterprise tiers, implementation included."
        canonical="https://upwon.in/pricing"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Pricing' },
        ]}
        eyebrow="UpWon Pricing"
        title={
          <>
            Priced for Indian ambition. <br />
            <span className="gradient-text-orange">Built for global ambition.</span>
          </>
        }
        description="UpWon is priced by business size and platform scope. Three editions, transparent inclusions, no hidden consulting fees. Final pricing is shared during demo — based on your specific scope."
      />

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Three editions"
            title="Pick the edition that fits your business today. Grow into the next one tomorrow."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-2xl border p-7 shadow-sm transition-all hover:shadow-enterprise ${
                  i === 1
                    ? 'border-orange-500 bg-white ring-2 ring-orange-500/20'
                    : 'border-cream-300 bg-white'
                }`}
              >
                {t.flag && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full border border-orange-300 bg-orange-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                    <Sparkles className="h-3 w-3" />
                    {t.flag}
                  </span>
                )}
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  UpWon {t.name}
                </p>
                <h3 className="mt-3 h-display text-2xl text-navy-950">{t.revenue}</h3>
                <p className="mt-2 text-sm text-charcoal">{t.desc}</p>

                <ul className="mt-6 space-y-2.5">
                  {t.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-[14px] text-navy-900">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-600" />
                      {inc}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/demo"
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all ${
                    i === 1
                      ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-glow-orange'
                      : 'border border-navy-200 bg-white text-navy-950 hover:bg-cream-200'
                  }`}
                >
                  Get exact pricing
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-navy-700">
            Need custom scope, GCC edition, or partner pricing?{' '}
            <Link to="/proposal" className="font-semibold text-orange-600 hover:text-orange-700">
              Request a formal proposal
            </Link>
          </p>
        </Container>
      </section>

      {/* What's never extra */}
      <section className="relative overflow-hidden bg-white section-pad">
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Always included"
            title="Things that are extras with other ERPs — included with UpWon."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Implementation & data migration',
              'Train-the-trainer for your team',
              '90 days hyper-care after go-live',
              'Indian statutory compliance (GST, FSSAI, PF, ESIC)',
              'Standard integrations (Tally, Pine Labs, Swiggy, Zomato)',
              'Mobile apps — all four',
              'Quarterly business review',
              'Free version upgrades',
              'Dedicated SPOC from kickoff',
            ].map((inc) => (
              <div
                key={inc}
                className="flex items-start gap-3 rounded-xl border border-cream-300 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                <p className="text-sm text-navy-900">{inc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <DemoCtaCompact
        eyebrow="Get exact pricing"
        title="Pricing is best discussed live — let's scope your business."
      />
    </>
  );
}
