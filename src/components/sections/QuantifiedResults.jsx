import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingDown, TrendingUp, Quote } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

// Two named, quantified case studies. Numbers are pulled from
// data/caseStudy.js so any update there flows through automatically.
//
// Pattern: each card shows TWO huge percentage / multiplier gains side-by-
// side with their direction icon, a short context line, an attributed
// quote, and a deep link to the full case study page.
const RESULTS = [
  {
    brand: 'Kaka Halwai',
    category: 'Heritage Sweets & Namkeen',
    location: 'Pune · 130 Years',
    scale: '25+ Outlets · 5,000+ Invoices/Day',
    slug: 'kaka-halwai',
    accent: 'orange',
    metrics: [
      {
        value: '18%',
        direction: 'down',
        label: 'Inventory wastage',
        context: 'Cut in 60 days · FEFO enforced across 3 plants',
      },
      {
        value: '48%',
        direction: 'up',
        label: 'Billing speed',
        context: 'Counter POS for weight-based sweets pricing',
      },
    ],
    quote:
      'UpWon is the first system that finally speaks our language — sweet by sweet, counter by counter, plant by plant.',
    author: 'Plant Operations Head',
    role: 'Kaka Halwai',
  },
  {
    brand: 'Monginis',
    category: 'Bakery & Confectionery',
    location: 'Sambhajinagar · 16 Plants',
    scale: '200+ Outlets · 5,000+ Orders/Day',
    slug: 'monginis',
    accent: 'navy',
    metrics: [
      {
        value: '5.7×',
        direction: 'up',
        label: 'Outlet expansion',
        context: 'Grew from 35 to 200+ outlets — same back-office headcount',
      },
      {
        value: '₹20 L+',
        direction: 'up',
        label: 'Daily transactions',
        context: 'Unified across 16 plants on one operational spine',
      },
    ],
    quote:
      'UpWon did not just replace software. It rebuilt how we run a bakery business at scale — one operational spine, one source of truth.',
    author: 'Operations Leadership',
    role: 'Monginis',
  },
];

export default function QuantifiedResults() {
  return (
    <section className="relative overflow-hidden bg-cream-100 section-pad">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-navy-700/[0.06] blur-[120px]" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Quantified Results"
          title={
            <>
              The numbers our customers{' '}
              <span className="gradient-text-orange">actually hit.</span>
            </>
          }
          description="Two named brands. Four real percentage gains. Hard outcomes — not soft testimonials."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {RESULTS.map((r, i) => (
            <motion.article
              key={r.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-cream-300 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-enterprise md:p-9"
            >
              {/* Decorative quote mark */}
              <Quote
                className="pointer-events-none absolute -right-3 -top-3 h-32 w-32 text-orange-500/[0.06]"
                aria-hidden
              />

              {/* Brand header */}
              <header className="relative flex flex-wrap items-baseline gap-2">
                <h3 className="font-display text-2xl font-bold leading-tight text-navy-950 md:text-3xl">
                  {r.brand}
                </h3>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  · {r.category}
                </span>
              </header>
              <p className="mt-1 text-[14px] font-medium text-navy-600">
                {r.location} <span className="mx-1.5 text-navy-300">·</span> {r.scale}
              </p>

              {/* TWO BIG METRICS — the punch */}
              <div className="relative mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream-300 bg-cream-300">
                {r.metrics.map((m) => {
                  const TrendIcon = m.direction === 'down' ? TrendingDown : TrendingUp;
                  return (
                    <div
                      key={m.label}
                      className="relative bg-white/95 p-5 backdrop-blur-sm"
                    >
                      <div className="flex items-baseline gap-1.5">
                        <p className="num-display text-[2.4rem] font-extrabold leading-none text-orange-600 md:text-[3.2rem]">
                          {m.value}
                        </p>
                        <TrendIcon
                          className={`h-5 w-5 ${
                            m.direction === 'down'
                              ? 'text-emerald-500'
                              : 'text-emerald-500'
                          }`}
                        />
                      </div>
                      <p className="mt-2 text-sm font-bold text-navy-950">{m.label}</p>
                      <p className="mt-1 text-[14px] leading-snug text-navy-600">
                        {m.context}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <blockquote className="relative mt-6 border-l-2 border-orange-300 pl-4 text-[14px] italic leading-relaxed text-navy-700">
                "{r.quote}"
              </blockquote>
              <p className="mt-2 text-[14px] font-semibold text-navy-900">
                — {r.author},{' '}
                <span className="font-medium text-navy-600">{r.role}</span>
              </p>

              {/* Footer link */}
              <Link
                to={`/clients/${r.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
              >
                Read the full {r.brand} case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Footer line */}
        <p className="mt-12 text-center text-[12px] font-medium uppercase tracking-[0.22em] text-navy-600">
          Numbers attributed to named customers ·{' '}
          <Link to="/clients" className="text-orange-600 hover:text-orange-700">
            See all 50+ deployments →
          </Link>
        </p>
      </Container>
    </section>
  );
}
