import { useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Seo from '../components/common/Seo.jsx';

const MODELS = [
  {
    name: 'Referral Partner',
    rate: '8–10%',
    desc: 'Introduce. We close + implement. You earn on closure + renewals.',
    best: 'CAs, food consultants, industry associations',
    includes: ['Certified partner badge', 'Marketing collateral', 'Deal registration', 'Renewal share'],
  },
  {
    name: 'Sales Partner',
    rate: '15–20%',
    desc: 'You sell. We implement. You earn higher share + renewals.',
    best: 'IT firms with sales teams, ERP resellers',
    includes: ['All Referral benefits', 'Pre-sales support', 'Demo access', 'Higher renewal share'],
  },
  {
    name: 'Implementation Partner',
    rate: '20–25% + 30% impl',
    desc: 'You sell + implement. You earn the most.',
    best: 'Established ERP implementation partners',
    includes: ['All Sales benefits', 'Implementation revenue', 'Tier-1 certification', 'Co-marketing'],
  },
];

export default function PartnersPage() {
  const [deals, setDeals] = useState(5);
  const [avgDeal, setAvgDeal] = useState(8); // ₹ lakh
  const [model, setModel] = useState(1); // index of MODELS

  const earnings = useMemo(() => {
    const rate = [9, 17.5, 22.5][model] / 100;
    const implRate = model === 2 ? 0.3 : 0;
    const renewal = 0.6; // 60% of recurring
    const dealRevenue = deals * avgDeal * 1_00_000;
    const yr1 = dealRevenue * (rate + implRate);
    const yr2 = dealRevenue * rate * renewal + yr1;
    return { yr1, yr2 };
  }, [deals, avgDeal, model]);

  const fmt = (n) => `₹${(n / 1_00_000).toFixed(1)} L`;

  return (
    <>
      <Seo
        title="Partner Program — Refer, Sell & Implement UpWon"
        description="Earn with UpWon's partner program — referral, sales and implementation tiers (8–25% + implementation revenue) for CAs, IT firms and ERP partners across India."
        keywords="UpWon partner program, ERP reseller India, implementation partner, referral commission"
        canonical="https://upwon.in/partners"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Channel Partner Program' },
        ]}
        eyebrow="UpWon Channel Partner Program"
        title={
          <>
            Your clients need this. <br />
            <span className="gradient-text-orange">You can earn from introducing them.</span>
          </>
        }
        description="IT firms, CAs, food consultants, HR advisors and industry associations — introduce UpWon to businesses in your network. You introduce. We close and implement. You earn."
      />

      {/* Three models */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Three partnership models"
            title="Pick the model that fits how you work."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {MODELS.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className={`relative rounded-2xl border p-7 shadow-sm transition-all ${
                  model === i
                    ? 'border-orange-500 bg-white ring-2 ring-orange-500/20'
                    : 'border-cream-300 bg-white hover:border-orange-300'
                } cursor-pointer`}
                onClick={() => setModel(i)}
              >
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  Model {String.fromCharCode(65 + i)}
                </p>
                <h3 className="mt-3 h-display text-xl text-navy-950">{m.name}</h3>
                <p className="num-display mt-4 text-3xl text-orange-600">{m.rate}</p>
                <p className="mt-1 text-[14px] text-navy-500">commission rate</p>
                <p className="mt-4 text-sm text-charcoal">{m.desc}</p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-navy-500">
                  Best for: {m.best}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {m.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-[14px] text-navy-800">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-orange-600" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Earnings calculator */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <Container className="relative">
          <p className="text-center text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-400">
            Earnings calculator · {MODELS[model].name}
          </p>
          <h2 className="mt-3 text-center h-display text-3xl text-balance md:text-4xl">
            Specifically, how much can you earn?
          </h2>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-cream-100/60">
                Your inputs
              </p>
              <div className="mt-6 space-y-7">
                <div>
                  <div className="flex items-end justify-between">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream-100/70">
                      Deals per year
                    </label>
                    <span className="num-display text-lg text-orange-400">{deals}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={deals}
                    onChange={(e) => setDeals(Number(e.target.value))}
                    className="mt-2 w-full accent-orange-500"
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream-100/70">
                      Avg. deal size
                    </label>
                    <span className="num-display text-lg text-orange-400">₹{avgDeal} L</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={50}
                    value={avgDeal}
                    onChange={(e) => setAvgDeal(Number(e.target.value))}
                    className="mt-2 w-full accent-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-7">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                Your projected earnings
              </p>
              <div className="mt-6 grid gap-6">
                <div>
                  <p className="num-display text-4xl text-orange-300 md:text-5xl">
                    {fmt(earnings.yr1)}
                  </p>
                  <p className="mt-1 text-sm text-cream-100/80">Year 1 earnings</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="num-display text-3xl text-white md:text-4xl">{fmt(earnings.yr2)}</p>
                  <p className="mt-1 text-sm text-cream-100/80">Year 2 earnings (with renewals)</p>
                </div>
              </div>
              <a
                href="#apply"
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Apply to join
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" className="relative overflow-hidden bg-cream-100 section-pad">
        <Container className="relative">
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              align="center"
              variant="light"
              eyebrow="Apply"
              title="Apply to the UpWon Channel Partner Program."
              description="Tell us a little about you. We'll respond within 2 business days."
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Application received — we\'ll be in touch within 2 business days.');
              }}
              className="mt-10 grid gap-4 rounded-2xl border border-cream-300 bg-white p-7 shadow-sm sm:grid-cols-2"
            >
              <Input label="Full name" required />
              <Input label="Company" required />
              <Input label="Your role" placeholder="Founder, Practice Lead…" />
              <Input label="Background" placeholder="CA · IT firm · Consultant" />
              <Input label="Mobile" required className="sm:col-span-2" />
              <Input label="Work email" type="email" required className="sm:col-span-2" />
              <button className="btn-primary-glow sm:col-span-2 !py-3" type="submit">
                Apply now
                <TrendingUp className="h-4 w-4" />
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

function Input({ label, required, type = 'text', placeholder, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-600">
        {label}
        {required && <span className="ml-1 text-orange-500">*</span>}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-cream-400 bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
      />
    </label>
  );
}
