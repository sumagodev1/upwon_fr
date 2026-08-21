import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import DemoCtaCompact from '../components/sections/DemoCtaCompact.jsx';
import TestimonialsMarquee from '../components/sections/TestimonialsMarquee.jsx';
import DeploymentMap from '../components/sections/DeploymentMap.jsx';
// Trust marquee swap (design review): the styled colour/font logo marquee now
// anchors the Clients roster; the plain-text version it replaced moved to home.
import TrustStrip from '../components/sections/TrustStrip.jsx';
import { ALL_CASES } from '../data/caseStudy.js';
import Seo from '../components/common/Seo.jsx';

export default function ClientsHubPage() {
  return (
    <>
      <Seo
        title="Clients & Case Studies — Named Operators on UpWon"
        description="Monginis, Kaka Halwai, U2 Cake, BrownBear, Mr Puff, Gokul Dairy and 40+ more — real outcomes, real numbers, named clients."
        canonical="https://upwon.in/clients"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Clients' },
        ]}
        // eyebrow="Client Success Stories"
        eyebrow="TRUSTED BY FOOD BUSINESSES ACROSS INDIA"
        // title={
        //   <>
        //     50+ food & FMCG enterprises run on UpWon. <br />
        //     <span className="gradient-text-orange">Real numbers. Named clients.</span>
        //   </>
        // }

        title={
          <>
            The ERP 50+ food & FMCG <br />
            <span className="gradient-text-orange">enterprises chose over the rest.</span>
          </>
        }
        // description="Bakery chains, dairy brands, beverage manufacturers, FMCG distributors and QSR networks — across 10 states in India."
        description=" From bakery chains and dairy brands to QSR networks and FMCG distributors — operating across 10 states and counting."

        bgImages={[
          'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=60',
          'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=60',
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=60',
        ]}
      />

      {/* Featured cases */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            // eyebrow="Featured case studies"
            eyebrow="RESULTS THAT SPEAK FOR THEMSELVES"
            // title="Operational transformations across food businesses."
            title="What growth actually looks like on UpWon."
            
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {ALL_CASES.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group flex flex-col rounded-2xl border border-cream-300 bg-white p-7 shadow-sm transition-all hover:border-orange-500/40 hover:shadow-enterprise"
              >
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  {c.category}
                </p>
                <h3 className="mt-2 h-display text-2xl text-navy-950">{c.brand}</h3>
                <p className="mt-1 text-[14px] text-navy-600">
                  <MapPin className="mr-1 inline-block h-3 w-3 text-orange-500" />
                  {c.location} · {c.scale}
                </p>
                <p className="mt-5 flex-1 text-[14px] italic text-charcoal">"{c.headline}"</p>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {c.outcomes.slice(0, 3).map((o) => (
                    <div
                      key={o.label}
                      className="rounded-lg border border-cream-300 bg-cream-100 px-2 py-2 text-center"
                    >
                      <p className="num-display text-sm text-orange-600">{o.value}</p>
                      <p className="mt-0.5 text-[14px] leading-tight text-navy-600 line-clamp-2">
                        {o.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/clients/${c.slug}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 group-hover:text-orange-700"
                >
                  Read the full story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Client roster */}
      <section className="relative overflow-hidden bg-white section-pad">
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="The UpWon roster"
            title="Trusted by India's leading food & FMCG brands."
          />

          {/* Styled colour/font brand-logo marquee (swapped in from the home
              page per the design review) — richer than the plain-text rows it
              replaced. */}
          <div className="mt-12">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-500">
              Trusted by operations leaders at
            </p>
            <div className="mt-6">
              <TrustStrip embedded />
            </div>
          </div>

          {/* Deployment footprint — interactive India map + coverage cards */}
          <DeploymentMap />
        </Container>
      </section>

      <TestimonialsMarquee
        eyebrow="Voices from the network"
        title={
          <>
            Real teams.{' '}
            <span className="gradient-text-orange">Real outcomes.</span>
          </>
        }
      />

      {/* <DemoCtaCompact /> */}
    </>
  );
}
