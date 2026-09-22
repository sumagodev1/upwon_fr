import { m as motion } from 'framer-motion';
import { CheckCircle2, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/shared/Container/Container.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import SectionIntro from '../../components/shared/SectionIntro/SectionIntro.jsx';
import ComparisonMatrix from '../../components/shared/ComparisonMatrix/ComparisonMatrix.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';

const WINS = [
  'Does 80% of what SAP B1 does for food manufacturers — at 20% of the cost',
  '5-year implementation becomes 30-45 day go-live',
  'No hidden consulting fees — domain depth reduces customisation to near-zero',
  'Indian regulatory compliance native — SAP requires costly Indianisation',
  'Sub-vertical editions for bakery, dairy, spices — unique to UpWon',
  'CEO can call the product team — SAP B1 clients cannot',
];

const WHEN_SAP = [
  'Global multi-currency operations across 20+ countries',
  'Manufacturing at scale beyond food/FMCG (heavy industry, automotive)',
  'A dedicated 10+ person IT team to maintain the deployment',
  'Budget approved at Fortune 500 levels with 18-month rollout patience',
];


const HERO_ACCENT = '#E85A2A';

/* Hero backdrops — the site’s shared hero artwork. This page has never
   had dedicated hero photography of its own; drop a local webp in here
   when it does and nothing else needs to change. */
const HERO_BG_A = '/images/hero%20bg.webp';

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'HONEST COMPARISON',
    headline:
      'UpWon vs SAP Business One — Where Each One Wins.',
    subhead:
      'The straight comparison most vendors won\'t give you. Built for Food & FMCG operators making a real evaluation decision.',
    bg: HERO_BG_A,
    accent: HERO_ACCENT,
    cta: { label: 'Request a Demo', to: '/demo' },
    secondaryCta: { label: 'Calculate Your ROI', to: '/roi-calculator' },
  },
];

export default function VsSapPage() {
  return (
    <>
      <Seo
        title="UpWon vs SAP Business One — Honest Comparison for Food Manufacturers"
        description="Side-by-side on cost, time-to-go-live, food fit and multi-plant — when SAP wins, when UpWon wins. An honest comparison from an Indian food-ERP team."
        canonical="https://upwon.in/compare/upwon-vs-sap"
      />
      <HeroSlider
        slides={HERO_SLIDES}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      {/* Side-by-side honest cards */}
      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionIntro
            eyebrow="The straight answer"
            title={
              <>
                When UpWon Wins. When SAP Wins.{' '}
                <span className="gradient-text-orange">No Spin.</span>
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
                Why food & FMCG operators choose UpWon
              </p>
              <ul className="mt-5 space-y-3 text-sm text-navy-900">
                {WINS.map((w) => (
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
                When SAP B1 is the right choice
              </p>
              <ul className="mt-5 space-y-3 text-sm text-navy-700">
                {WHEN_SAP.map((w) => (
                  <li key={w} className="flex items-start gap-2.5">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] italic text-navy-600">
                For 95% of Indian food & FMCG manufacturers, UpWon is the better fit.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <ComparisonMatrix subset={['upwon', 'sap', 'netsuite']} />

      {/* Cost / Time visual */}
      <section className="relative overflow-hidden bg-navy-950 py-10 text-white sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <Container className="relative">
          <SectionIntro
            variant="dark"
            eyebrow="THE MATH"
            title={
              <>
                SAP B1: 18 Months, ₹2-5 Cr to Go Live.{' '}
                <span className="gradient-text-orange">
                  UpWon: 30-45 Days, a Fraction of the Cost.
                </span>
              </>
            }
            description="The two numbers that decide most evaluations, side by side — before a single feature is compared."
          />

          <div className="mt-8 grid gap-4 lg:mt-10 md:grid-cols-3">
            {[
              { label: 'Time to go-live', upwon: '30-45 days', sap: '12-18 months' },
              { label: 'Customisation depth needed', upwon: 'Near-zero', sap: 'Heavy' },
              { label: 'Ongoing consultant dependency', upwon: 'None', sap: 'Yes' },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-cream-100/60">
                  {row.label}
                </p>
                <p className="num-display mt-3 text-xl text-orange-400">{row.upwon}</p>
                <p className="text-[14px] text-cream-100/50">UpWon</p>
                <div className="mt-3 h-px bg-white/10" />
                {/* <p className="num-display mt-3 text-xl text-cream-100/70">{row.sap}</p> */}
                <p className="num-display mt-3 text-xl text-white/85">{row.sap}</p>
                <p className="text-[14px] text-cream-100/50">SAP B1</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/demo" className="btn-primary-glow">
              See UpWon vs your current ERP — live
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* <DemoCtaCompact title="See the comparison live on your data." /> */}
    </>
  );
}
