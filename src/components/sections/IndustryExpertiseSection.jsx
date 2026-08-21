import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import {
  INDUSTRIES,
  INDUSTRY_IMAGES,
  INDUSTRY_FALLBACK_IMAGE,
} from '../../data/industries.js';
import { srcSet } from '../../lib/img.js';

/**
 * Homepage industry grid — minimal magazine-style cards.
 * Photo dominates, one metric and a name only. No descriptions, no
 * workflow chips. Hover reveals an Explore arrow.
 */
function MiniIndustryCard({ industry, index }) {
  const image = INDUSTRY_IMAGES[industry.id] || INDUSTRY_FALLBACK_IMAGE;
  const metric = industry.metrics?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link
        to="/industries"
        className="relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-enterprise transition-all duration-500 hover:shadow-enterprise-lg"
      >
        {/* Full-bleed photo */}
        <img
          src={image}
          srcSet={srcSet(image)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={industry.name}
          loading="lazy" decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
        />

        {/* Dark gradient bottom-up for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />

        {/* Subtle orange wash on hover */}
        <div className="absolute inset-0 bg-orange-500/0 transition-colors duration-500 group-hover:bg-orange-500/10" />

        {/* Top row: icon + tag */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/30 bg-white/95 text-orange-600 shadow-sm backdrop-blur">
            <industry.icon className="h-5 w-5" />
          </div>
          <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            {industry.tag}
          </span>
        </div>

        {/* Bottom block: title + metric + explore arrow */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <h3 className="font-display text-xl font-bold leading-tight text-white md:text-2xl">
            {industry.name}
          </h3>

          {metric && (
            <div className="mt-3 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="num-display text-2xl font-bold text-orange-300 md:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-0.5 truncate text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  {metric.label}
                </p>
              </div>

              {/* Explore arrow — slides in on hover */}
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function IndustryExpertiseSection() {
  // Homepage features 6 of the 10 verticals
  const featured = INDUSTRIES.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-slate-soft section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-60" />
      <Container className="relative">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <SectionHeading
            variant="light"
            eyebrow="Sector Expertise"
            title={
              <>
                Engineered for every corner of{' '}
                <span className="gradient-text-orange">Food &amp; FMCG.</span>
              </>
            }
          />
          <Link
            to="/industries"
            className="hidden items-center gap-1.5 text-sm font-semibold text-navy-950 hover:text-orange-600 md:inline-flex"
          >
            All 10 industries
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((ind, i) => (
            <MiniIndustryCard key={ind.id} industry={ind} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
