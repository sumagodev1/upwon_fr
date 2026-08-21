import { m as motion } from 'framer-motion';
import { CheckCircle2, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ComparisonMatrix from '../components/sections/ComparisonMatrix.jsx';
import DemoCtaCompact from '../components/sections/DemoCtaCompact.jsx';
import Seo from '../components/common/Seo.jsx';

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

export default function VsTallyPage() {
  return (
    <>
      <Seo
        title="UpWon vs Tally + Zoho — When You Outgrow Tally"
        description="What breaks when you scale past Tally + Zoho — and what UpWon gives you instead, without re-platforming. Honest read for growing food and FMCG businesses."
        canonical="https://upwon.in/compare/upwon-vs-tally"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Compare' },
          { label: 'UpWon vs Tally + Zoho' },
        ]}
        eyebrow="When you outgrow Tally"
        title={
          <>
            UpWon vs Tally + Zoho —{' '}
            <span className="gradient-text-orange">when accounting isn't enough.</span>
          </>
        }
        description="Tally is an excellent accounting tool. So is Zoho. Neither was built to run a food manufacturing or FMCG distribution operation. Here's where the line is."
      />

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="The honest question"
            title="Are you running a business on Tally — or building one despite it?"
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
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <Container className="relative">
          <h2 className="text-center h-display text-3xl text-balance md:text-4xl">
            Already using Tally? <br />
            <span className="gradient-text-orange">
              UpWon connects to it from day one.
            </span>
          </h2>
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
