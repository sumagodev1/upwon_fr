import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import Eyebrow from '../components/ui/Eyebrow.jsx';
import ClientsHeroSection from '../components/sections/ClientsHeroSection.jsx';
import TestimonialsMarquee from '../components/sections/TestimonialsMarquee.jsx';
import DeploymentMap from '../components/sections/DeploymentMap.jsx';
// Trust marquee swap (design review): the styled colour/font logo marquee now
// anchors the Clients roster; the plain-text version it replaced moved to home.
import TrustStrip, { CLIENT_LOGOS } from '../components/sections/TrustStrip.jsx';
import { ALL_CASES } from '../data/caseStudy.js';
import Seo from '../components/common/Seo.jsx';

/*
  Section heading motion, shared by every heading block on this page so the
  eyebrow / headline / subtext cadence matches the rest of the site.
*/
const EASE = [0.22, 1, 0.3, 1];

const HEADING_VIEWPORT = { once: true, amount: 0.1 };

const HEADING_GROUP = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ClientsHubPage() {
  return (
    <>
      <Seo
        title="Clients & Case Studies — Named Operators on UpWon"
        description="Monginis, Kaka Halwai, U2 Cake, BrownBear, Mr Puff, Gokul Dairy and 40+ more — real outcomes, real numbers, named clients."
        canonical="https://upwon.in/clients"
      />
      <ClientsHeroSection />

      {/* Featured cases */}
      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <motion.div
            variants={HEADING_GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={HEADING_VIEWPORT}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={FADE_IN}>
              <Eyebrow className="justify-center">
                RESULTS THAT SPEAK FOR THEMSELVES
              </Eyebrow>
            </motion.div>

            <motion.h2
              variants={FADE_UP}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              What Growth Actually Looks Like{' '}
              <span className="gradient-text-orange">on UpWon.</span>
            </motion.h2>

            <motion.p
              variants={FADE_UP}
              className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              Three businesses, named and on the record — what each one was
              wrestling with, and what changed once their operations came
              together on one platform.
            </motion.p>
          </motion.div>

          <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-3">
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
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        <Container className="relative">
          <motion.div
            variants={HEADING_GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={HEADING_VIEWPORT}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={FADE_IN}>
              <Eyebrow className="justify-center">THE UPWON ROSTER</Eyebrow>
            </motion.div>

            <motion.h2
              variants={FADE_UP}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              Trusted by India&rsquo;s Leading{' '}
              <span className="gradient-text-orange">
                Food &amp; FMCG Brands.
              </span>
            </motion.h2>

            <motion.p
              variants={FADE_UP}
              className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              Bakery chains, dairy brands, sweet houses, beverage makers, QSR
              networks and FMCG distributors — running live across 10 states
              and counting.
            </motion.p>
          </motion.div>

          {/* Real client artwork rather than TrustStrip's default typographic
              brand marks — this is the roster page, so the logos themselves
              carry it. */}
          <div className="mt-8 lg:mt-10">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-500">
              Trusted by operations leaders at
            </p>
            <div className="mt-6">
              <TrustStrip embedded logos={CLIENT_LOGOS} />
            </div>
          </div>

          {/* Deployment footprint — interactive India map + coverage cards */}
          <DeploymentMap />
        </Container>
      </section>

      <TestimonialsMarquee
        eyebrow="VOICES FROM THE NETWORK"
        title={
          <>
            Real Teams.{' '}
            <span className="gradient-text-orange">Real Outcomes.</span>
          </>
        }
        description="What operations, finance and franchise leaders say about running their business on one connected platform."
      />
    </>
  );
}
