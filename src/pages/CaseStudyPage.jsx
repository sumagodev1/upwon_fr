import { useParams, Navigate, Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { Quote, MapPin, ArrowRight, ArrowUpRight, CheckCircle2, AlertOctagon } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import SectionIntro from '../components/ui/SectionIntro.jsx';
import DemoCtaCompact from '../components/sections/DemoCtaCompact.jsx';
import Seo, { breadcrumbJsonLd } from '../components/common/Seo.jsx';
import { ALL_CASES, MONGINIS_CASE } from '../data/caseStudy.js';
import { CASE_DELIVERABLES } from '../data/industryExtras.js';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const caseData = slug
    ? ALL_CASES.find((c) => c.slug === slug)
    : MONGINIS_CASE; // /case-studies legacy → Monginis

  if (!caseData) return <Navigate to="/clients" replace />;

  const others = ALL_CASES.filter((c) => c.slug !== caseData.slug);

  return (
    <>
      <Seo
        title={`${caseData.brand} — Case Study`}
        description={`${caseData.headline} A UpWon case study for ${caseData.category} in ${caseData.location}.`}
        canonical={`https://upwon.in/clients/${caseData.slug}`}
        type="article"
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', to: '/' },
          { name: 'Clients', to: '/clients' },
          { name: caseData.brand },
        ])}
      />
      <PageHero
        eyebrow={`${caseData.category} · ${caseData.location}`}
        title={<span>{caseData.headline}</span>}
        description={caseData.challengeOneLine}
        meta={
          <>
            <span>{caseData.scale}</span>
            <span className="h-3 w-px bg-navy-200" />
            <span>{caseData.duration}</span>
          </>
        }
      />

      {/* Headline outcomes */}
      <section className="relative overflow-hidden bg-navy-950 py-12 md:py-16 text-white">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <Container className="relative">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
            Headline outcomes
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {caseData.outcomes.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-5"
              >
                <p className="num-display text-2xl text-orange-400 md:text-3xl">{o.value}</p>
                <p className="mt-1 text-[14px] leading-tight text-cream-100/70">{o.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Challenge */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionIntro
                align="left"
                eyebrow="THE CHALLENGE"
                title={
                  <>
                    What {caseData.brand}{' '}
                    <span className="gradient-text-orange">
                      Faced Before UpWon.
                    </span>
                  </>
                }
                description={caseData.hero.challenge}
              />
            </div>
            <div className="space-y-3">
              {caseData.challenges.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-start gap-4 rounded-xl border border-cream-300 bg-white p-5 shadow-sm"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-rose-100 text-rose-600">
                    <AlertOctagon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-950">{c.title}</p>
                    <p className="mt-1 text-sm text-charcoal">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why UpWon */}
      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <SectionIntro
              eyebrow="WHY UPWON"
              title={
                <>
                  How the Decision{' '}
                  <span className="gradient-text-orange">Was Made.</span>
                </>
              }
            />
            <p className="mt-8 rounded-2xl border border-cream-300 bg-white p-7 text-left text-base leading-relaxed text-navy-900 shadow-sm md:p-10 md:text-lg">
              {caseData.whyUpwon}
            </p>
          </div>
        </Container>
      </section>

      {/* What we delivered */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        <Container className="relative">
          <SectionIntro
            eyebrow="THE TRANSFORMATION"
            title={
              <>
                What We Delivered for{' '}
                <span className="gradient-text-orange">
                  {caseData.brand}.
                </span>
              </>
            }
          />
          <div className="mt-8 lg:mt-10">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-cream-300 bg-cream-300 lg:grid-cols-5">
              {caseData.timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-white p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-950 text-[14px] font-bold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                      {t.week}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-navy-950">{t.title}</h3>
                  <p className="mt-2 text-sm text-charcoal">{t.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What UpWon delivered — green deliverables box */}
      {CASE_DELIVERABLES[caseData.slug] && (
        <section className="relative overflow-hidden bg-white py-16 md:py-20">
          <Container className="relative">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-7 md:p-10"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Delivered & Live
                  </span>
                  <h3 className="h-display text-xl font-bold text-emerald-900 md:text-2xl">
                    What UpWon delivered for {caseData.brand}
                  </h3>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {CASE_DELIVERABLES[caseData.slug].map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-[14px] text-emerald-900 leading-relaxed"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                        <CheckCircle2 className="h-3 w-3" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </Container>
        </section>
      )}

      {/* Testimonial */}
      <section className="relative overflow-hidden bg-cream-200 py-10 sm:py-12 lg:py-14">
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl rounded-2xl border border-cream-300 bg-white p-10 shadow-enterprise md:p-14"
          >
            <Quote className="h-12 w-12 text-orange-500/40" />
            <p className="mt-6 h-display text-balance text-2xl leading-snug text-navy-950 md:text-3xl">
              "{caseData.testimonial.quote}"
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-100 text-base font-bold text-orange-700">
                {caseData.brand.slice(0, 1)}
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">
                  {caseData.testimonial.author}
                </p>
                <p className="text-[14px] text-navy-600">{caseData.testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Closing CTA + other cases */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        <Container className="relative">
          <SectionIntro
            eyebrow="MORE UPWON STORIES"
            title={
              <>
                If {caseData.brand} Did This With UpWon —{' '}
                <span className="gradient-text-orange">
                  What Could You Do?
                </span>
              </>
            }
          />

          <div className="mt-8 grid gap-5 lg:mt-10 md:grid-cols-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/clients/${c.slug}`}
                className="group rounded-2xl border border-cream-300 bg-white p-7 shadow-sm transition-all hover:border-orange-500/40 hover:shadow-enterprise"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="h-display text-2xl text-navy-950 group-hover:text-orange-600">
                      {c.brand}
                    </h3>
                    <p className="mt-1 text-[14px] text-navy-600">
                      <MapPin className="mr-1 inline-block h-3 w-3 text-orange-500" />
                      {c.location} · {c.scale}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-orange-600 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-4 text-sm italic text-charcoal">"{c.headline}"</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/demo" className="btn-primary-glow">
              See UpWon working on your business
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/clients" className="btn-secondary">
              All client stories
            </Link>
          </div>
        </Container>
      </section>

      <DemoCtaCompact />
    </>
  );
}
