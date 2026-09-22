import { m as motion } from 'framer-motion';
import { CheckCircle2, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/shared/Container/Container.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import SectionIntro from '../../components/shared/SectionIntro/SectionIntro.jsx';
import ComparisonMatrix from '../../components/shared/ComparisonMatrix/ComparisonMatrix.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';

const OUTGROW = [
  'You\'re running multi-plant operations but reconciling on Excel',
  'Distributor secondary sales are invisible to you',
  'You can\'t run franchise outlet operations from one system',
  'Wastage is happening and you have no batch-level visibility',
  'Recipe and BOM management is on personal notebooks',
  'Compliance (FSSAI, GST e-invoice) is paperwork-heavy',
];

const KEEP_TALLY = [
  'You only need basic accounting and statutory filing',
  'No manufacturing, distribution or franchise operations',
  'Revenue under ₹2 Cr with no scaling plans',
];


const HERO_ACCENT = '#E85A2A';

/* Hero backdrops — the site’s shared hero artwork. This page has never
   had dedicated hero photography of its own; drop a local webp in here
   when it does and nothing else needs to change. */
const HERO_BG_A = '/images/hero%20bg%202.webp';

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'WHEN YOU OUTGROW TALLY',
    headline:
      'UpWon vs Tally + Zoho — When Accounting Isn\'t Enough.',
    subhead:
      'Tally is an excellent accounting tool. So is Zoho. Neither was built to run a food manufacturing or FMCG distribution operation. Here\'s where the line is.',
    bg: HERO_BG_A,
    accent: HERO_ACCENT,
    cta: { label: 'Request a Demo', to: '/demo' },
    secondaryCta: { label: 'Calculate Your ROI', to: '/roi-calculator' },
  },
];

export default function VsTallyPage() {
  return (
    <>
      <Seo
        title="UpWon vs Tally + Zoho — When You Outgrow Tally"
        description="What breaks when you scale past Tally + Zoho — and what UpWon gives you instead, without re-platforming. Honest read for growing food and FMCG businesses."
        canonical="https://upwon.in/compare/upwon-vs-tally"
      />
      <HeroSlider
        slides={HERO_SLIDES}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionIntro
            eyebrow="The honest question"
            title={
              <>
                Are You Running a Business on Tally —{' '}
                <span className="gradient-text-orange">Or Building One Despite It?</span>
              </>
            }
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-orange-300 bg-orange-50 p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                You've outgrown Tally if…
              </p>
              <ul className="mt-5 space-y-3 text-sm text-navy-900">
                {OUTGROW.map((w) => (
                  <li key={w} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                    {w}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="rounded-2xl border border-cream-300 bg-white p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-700">
                Stay on Tally / Zoho if…
              </p>
              <ul className="mt-5 space-y-3 text-sm text-navy-700">
                {KEEP_TALLY.map((w) => (
                  <li key={w} className="flex items-start gap-2.5">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] italic text-navy-600">
                If any of the bullets on the left are true — UpWon is the right next step.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <ComparisonMatrix subset={['upwon', 'odoo', 'erpnext', 'zoho']} />

      {/* Migration friendly */}
      <section className="relative overflow-hidden bg-navy-950 py-10 text-white sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <Container className="relative">
          <SectionIntro
            variant="dark"
            eyebrow="MIGRATION"
            title={
              <>
                Already Using Tally?{' '}
                <span className="gradient-text-orange">
                  UpWon Connects to It From Day One.
                </span>
              </>
            }
          />
          <p className="mx-auto mt-5 max-w-2xl text-center text-base text-cream-100/80">
            UpWon doesn't force a rip-and-replace. Keep Tally for accounting if you want — UpWon
            handles manufacturing, distribution, franchise, HR and warehouse, all integrated.
          </p>
          <div className="mt-10 text-center">
            <Link to="/demo" className="btn-primary-glow">
              See how UpWon + Tally work together
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* <DemoCtaCompact /> */}
    </>
  );
}
