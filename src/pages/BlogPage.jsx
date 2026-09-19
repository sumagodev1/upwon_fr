import { useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock, Filter, Sparkles } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import HeroSlider from '../components/ui/HeroSlider.jsx';
import Seo from '../components/common/Seo.jsx';
import SectionIntro from '../components/ui/SectionIntro.jsx';
import {
  SORTED_POSTS,
  CATEGORIES_WITH_COUNTS,
  getCategory,
  getFeaturedPost,
  formatPostDate,
} from '../data/blog.js';

// Brief §18.2 — the Blog. A filterable grid of operator playbooks (not vendor
// marketing) across six SEO-targeted categories, fronted by a featured
// latest-article hero card (§18.1). Posts deep-link to /blog/:slug.

const HERO_ACCENT = '#E85A2A';

/* Hero backdrops — the site’s shared hero artwork. This page has never
   had dedicated hero photography of its own; drop a local webp in here
   when it does and nothing else needs to change. */
const HERO_BG_A = '/images/hero%20bg.webp';

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'THE UPWON BLOG',
    headline:
      'Operator Playbooks for Food & FMCG.',
    subhead:
      'Two deep-reads a month across six lanes — the operational fixes that move real numbers. No vendor fluff.',
    bg: HERO_BG_A,
    accent: HERO_ACCENT,
    cta: { label: 'Request a Demo', to: '/demo' },
    secondaryCta: { label: 'Browse the Knowledgebase', to: '/knowledgebase' },
  },
];

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('all');
  const featured = getFeaturedPost();

  // Featured post leads the hero; the grid shows the rest (filtered).
  const gridPosts = useMemo(() => {
    const rest = SORTED_POSTS.filter((p) => p.slug !== featured.slug);
    if (activeCat === 'all') return rest;
    return rest.filter((p) => p.category === activeCat);
  }, [activeCat, featured.slug]);

  const featuredCat = getCategory(featured.category);

  return (
    <>
      <Seo
        title="Blog — Operator Playbooks for Food & FMCG"
        description="Operator playbooks, benchmark numbers and real wins for food manufacturers, FMCG distributors and franchise networks — across ERP, distribution, warehouse, HR and compliance."
        canonical="https://upwon.in/blog"
      />
      <HeroSlider
        slides={HERO_SLIDES}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      {/* ========== FEATURED (latest) ARTICLE — brief §18.1 ========== */}
      <section className="relative overflow-hidden bg-white pt-12 md:pt-16">
        <Container className="relative">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-enterprise transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-enterprise-lg lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <img
                src={featured.image}
                alt={featured.title}
                fetchpriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow">
                <Sparkles className="h-3 w-3" />
                Latest
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700">
                {featuredCat?.icon && <featuredCat.icon className="h-3 w-3" />}
                {featuredCat?.label}
              </span>
              <h2 className="mt-4 h-display text-balance text-[1.7rem] leading-[1.12] text-navy-950 group-hover:text-orange-600 md:text-[2.1rem]">
                {featured.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-700">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-navy-500">
                <span>{formatPostDate(featured.date)}</span>
                <span className="text-navy-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-orange-500" />
                  {featured.readTime}
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-semibold text-orange-600">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* ========== CATEGORY FILTER + POST GRID ========== */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        <Container className="relative">
          <SectionIntro
            eyebrow="Insights by Topic"
            title={
              <>
                Pick the Lane{' '}
                <span className="gradient-text-orange">You Operate In.</span>
              </>
            }
            description="Each category publishes operator playbooks built from real deployments."
          />

          {/* Filter tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCat('all')}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition-all ${
                activeCat === 'all'
                  ? 'border-orange-500 bg-orange-500 text-white'
                  : 'border-cream-300 bg-white text-navy-700 hover:border-orange-200'
              }`}
            >
              <Filter className="h-3 w-3" />
              All
            </button>
            {CATEGORIES_WITH_COUNTS.map((c) => {
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCat(c.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition-all ${
                    active
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-cream-300 bg-white text-navy-700 hover:border-orange-200'
                  }`}
                >
                  <c.icon className="h-3 w-3" />
                  {c.label}
                  <span
                    className={`ml-1 rounded-full px-1.5 text-[14px] font-bold ${
                      active ? 'bg-white/20 text-white' : 'bg-cream-200 text-navy-500'
                    }`}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Post grid */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((p, i) => {
              const cat = getCategory(p.category);
              return (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                >
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-enterprise"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-700 backdrop-blur">
                        {cat?.icon && <cat.icon className="h-3 w-3" />}
                        {cat?.label}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold leading-snug text-navy-950 group-hover:text-orange-600">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-charcoal">
                        {p.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-cream-300 pt-4">
                        <span className="inline-flex items-center gap-1.5 text-[14px] text-navy-500">
                          <Clock className="h-3 w-3" />
                          {p.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-orange-600">
                          Read
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
            {gridPosts.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-navy-500">
                No posts in this category yet — try another lane.
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* ========== CTA STRIP ========== */}
      {/* <section className="relative overflow-hidden bg-navy-950 py-14 text-white">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-orange-500/[0.12] blur-[120px]" />
        <Container className="relative">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="h-display text-2xl font-bold leading-snug md:text-3xl">
                Read enough. Want to see it working?
              </h3>
              <p className="mt-2 text-[14px] text-white/75">
                A 30-minute live demo, mapped to your operations. No slides.
              </p>
            </div>
            <Link to="/demo" className="btn-primary-glow shrink-0 !px-5 !py-3">
              Book Free Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section> */}
    </>
  );
}
