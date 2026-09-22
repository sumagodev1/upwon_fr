import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import PageHero from '../../components/shared/PageHero/PageHero.jsx';
import SectionHeading from '../../components/shared/SectionHeading/SectionHeading.jsx';
import HeroDashboard from './sections/HeroDashboard/HeroDashboard.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';
import MasterBrandStatement from './sections/MasterBrandStatement/MasterBrandStatement.jsx';
import { COMPANY } from '../../data/company.js';
import { PLATFORM_MODULES } from '../../data/modules.js';
import Seo from '../../components/shared/Seo/Seo.jsx';

export default function WhatIsUpwonPage() {
  return (
    <>
      <Seo
        title="What is UpWon — The Enterprise Suite for Indian Food & FMCG"
        description="Production, distribution, HR, finance and outlet operations — purpose-built for Indian food and FMCG. Live in 30-45 days, across 10 states."
        canonical="https://upwon.in/what-is-upwon"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'What is UpWon' },
        ]}
        eyebrow="The 5-minute introduction"
        title={
          <>
            What is UpWon? <br />
            <span className="gradient-text-orange">Everything you need to know.</span>
          </>
        }
        description="UpWon is a Business Growth Suite — seven integrated platforms purpose-built for food manufacturers, FMCG companies and franchise networks. Below is the complete picture."
      />

      {/* Mission Control preview — what running on UpWon looks like */}
      <section className="relative overflow-hidden bg-white pt-6 pb-12 md:pb-16">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-orange-600">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
              Mission Control · Live
            </p>
            <h2 className="mt-3 h-display text-balance text-[1.8rem] leading-[1.1] text-navy-950 md:text-3xl lg:text-4xl">
              This is what running on{' '}
              <span className="gradient-text-orange">UpWon looks like.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-base leading-relaxed text-navy-600 md:text-lg">
              One dashboard, every plant, every outlet — production yield,
              wastage, secondary sales and ops alerts in real time.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative mt-10"
          >
            <div className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-3xl bg-gradient-to-tr from-orange-500/15 via-transparent to-orange-500/10 blur-2xl" />
            <div className="relative">
              <HeroDashboard />
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
                The product
              </p>
              <h2 className="mt-4 h-display text-3xl text-navy-950 md:text-4xl">
                Seven platforms. <br />
                <span className="gradient-text-orange">One operating system.</span>
              </h2>
              <p className="mt-5 text-sm text-charcoal md:text-base">
                UpWon is not a generic ERP with food modules bolted on. Every workflow, every data
                model, every screen is designed around the specific operational reality of food and
                FMCG businesses — perishable inventory, recipe-driven production, regulatory
                compliance, multi-channel distribution, seasonal variability.
              </p>
              <p className="mt-3 text-sm text-charcoal md:text-base">
                Adopt one platform. Add more as you grow. Everything is integrated natively — no
                re-integration cost, no double entry, no data silos.
              </p>
            </div>

            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                The 5 Pillars
              </p>
              <ul className="mt-4 space-y-3">
                {COMPANY.pillars.map((p) => (
                  <li
                    key={p.title}
                    className="flex items-start gap-3 rounded-xl border border-cream-300 bg-white p-4 shadow-sm"
                  >
                    <span className="num-display grid h-9 w-9 shrink-0 place-items-center rounded-md bg-orange-100 text-sm text-orange-600">
                      {p.no}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy-950">{p.title}</p>
                      <p className="mt-0.5 text-[14px] text-charcoal">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 7 platforms quick view */}
      <section className="relative overflow-hidden bg-white section-pad">
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="The 7 platforms"
            title="Each platform does one thing exceptionally well."
            description="Pick any to learn more."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_MODULES.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              >
                <Link
                  to={`/products/${p.slug}`}
                  className="group block h-full rounded-2xl border border-cream-300 bg-white p-5 shadow-sm transition-all hover:border-orange-500/40 hover:shadow-enterprise"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange-100 text-orange-600">
                    <p.icon className="h-4.5 w-4.5" />
                  </div>
                  <p className="mt-4 text-[14px] font-semibold text-navy-950">{p.code}</p>
                  <p
                    className="mt-1 text-[14px] italic text-orange-600 line-clamp-2"
                    style={{
                      fontFamily: '"Calibri Light", "Arial", "Helvetica Neue", sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    {p.hero}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <MasterBrandStatement />
      <DemoCtaCompact />
    </>
  );
}
