import { useEffect, useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock, Filter, Sparkles } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import HeadingLines from '../../components/shared/HeadingLines/HeadingLines.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import SectionIntro from '../../components/shared/SectionIntro/SectionIntro.jsx';
import {
  SORTED_POSTS,
  CATEGORIES_WITH_COUNTS,
  formatPostDate,
} from '../../data/blog.js';
import { fetchBlogHero, fetchBlogIndex, fetchBlogTopics } from '../../lib/blog.js';
import { blogIcon } from '../../lib/blogIcons.js';

// Brief §18.2 — the Blog. A filterable grid of operator playbooks (not vendor
// marketing) across six SEO-targeted categories, fronted by a featured
// latest-article hero card (§18.1). Posts deep-link to /blog/:slug.
//
// Authored in the admin panel under Resource Page → Blog: the hero slides, the
// "Insights by Topic" intro, the category chips and the posts all come from
// lib/blog.js once the API answers. Until then — and for good whenever it
// cannot answer — the page is the built-in one below and in data/blog.js,
// which is also exactly what the prerender bakes in, so hydration always
// matches. See lib/blog.js for the three rules every read follows.

const HERO_ACCENT = '#E85A2A';

/* Hero backdrop — the site’s shared hero artwork: the built-in slide's, and
   the one a published slide with no picture of its own falls back to. */
const HERO_BG_A = '/images/hero%20bg.webp';

/* Hero buttons — the same two on every slide, built-in or published. They
   are not authored in the admin panel. */
const HERO_CTA = { label: 'Request a Demo', to: '/demo' };
const HERO_SECONDARY_CTA = { label: 'Browse the Knowledgebase', to: '/knowledgebase' };

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
    cta: HERO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
];

/*
  The published slides in the shape of HERO_SLIDES.

  Only the words and the pictures are authored; the accent and the two buttons
  are the page's own and stay put. A field lib/blog.js could not vouch for
  arrives as null and takes its built-in value — the eyebrow the built-in
  slide's, the backdrop HERO_BG_A.
*/
function toHeroSlides(published) {
  if (!published) return HERO_SLIDES;

  const [builtIn] = HERO_SLIDES;
  return published.map((slide) => ({
    eyebrow: slide.eyebrow ?? builtIn.eyebrow,
    headline: slide.heading,
    subhead: slide.subtext,
    bg: slide.image ?? HERO_BG_A,
    // Null means no phone crop; HeroSlider then serves `bg` to every viewport.
    mobileBg: slide.mobileImage,
    accent: HERO_ACCENT,
    cta: HERO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  }));
}

/*
  The topic intro's built-in copy, in the shape lib/blog.js's fetchBlogTopics
  returns — the heading as lines of `{ text, accent }` parts — so the built-in
  intro and a published one take the one path through HeadingLines.
*/
const FALLBACK_TOPICS = {
  eyebrow: 'Insights by Topic',
  headingLines: [
    [
      { text: 'Pick the Lane ', accent: false },
      { text: 'You Operate In.', accent: true },
    ],
  ],
  subtext: 'Each category publishes operator playbooks built from real deployments.',
};

/*
  The listing in one shape, whichever source it came from: `categories` are
  `{ id, label, icon, count }` with `icon` a lucide COMPONENT — the shape
  data/blog.js's CATEGORIES_WITH_COUNTS already has — and `posts` are cards
  newest first.

  WHICH LIST WINS. The published one whenever the blog HAS posts — and that
  includes an empty list. `hasPosts` is the API saying whether any post row
  exists at all, ACTIVE or not, so "every post is switched off" (render the
  empty listing — somebody chose that) stops being the same answer as "no post
  row exists" (nothing authored, keep the built-in listing). See lib/blog.js.

  Categories and posts swap as one unit, keyed off the posts: a post cannot
  exist without its category, and API chips over built-in cards (or the
  reverse) would file cards under chips that do not match them.

  A published category's icon arrives as a NAME and is resolved here through
  lib/blogIcons.js, so every render site below handles one shape. Its count is
  taken from the list actually rendered rather than from the server's tally,
  so a chip always says how many cards clicking it shows — which is also how
  data/blog.js computes the built-in counts.
*/
const BUILT_IN_LISTING = { categories: CATEGORIES_WITH_COUNTS, posts: SORTED_POSTS };

function toListing(index) {
  if (!index?.hasPosts) return BUILT_IN_LISTING;

  return {
    categories: index.categories.map((category) => ({
      id: category.slug,
      label: category.label,
      icon: blogIcon(category.icon),
      count: index.posts.filter((post) => post.category === category.slug).length,
    })),
    posts: index.posts,
  };
}

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('all');

  /*
    Each section starts as the built-in one and is swapped for the published
    one once the API answers — the same order as every other authored page on
    the site. Every fetch resolves to null for every failure (unconfigured,
    offline, CORS, nothing authored), and null means "keep what you have".
    The three are independent, so each lands on its own.
  */
  const [hero, setHero] = useState(null);
  const [topics, setTopics] = useState(null);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchBlogHero().then((published) => {
      if (!cancelled && published) setHero(published);
    });
    fetchBlogTopics().then((published) => {
      if (!cancelled && published) setTopics(published);
    });
    fetchBlogIndex().then((published) => {
      if (!cancelled && published) setIndex(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const heroSlides = useMemo(() => toHeroSlides(hero), [hero]);
  const intro = topics ?? FALLBACK_TOPICS;
  const { categories, posts } = useMemo(() => toListing(index), [index]);

  // A chip picked from the built-in listing may not exist in the published
  // one; the grid then shows All rather than an empty lane nobody can see lit.
  const selectedCat =
    activeCat === 'all' || categories.some((c) => c.id === activeCat) ? activeCat : 'all';

  // Featured = the newest post of whichever list is in use. Null only when a
  // published listing has been emptied on purpose; the card is then left out.
  const featured = posts[0] ?? null;
  const featuredSlug = featured?.slug ?? null;

  // Featured post leads the hero; the grid shows the rest (filtered).
  const gridPosts = useMemo(() => {
    const rest = posts.filter((p) => p.slug !== featuredSlug);
    if (selectedCat === 'all') return rest;
    return rest.filter((p) => p.category === selectedCat);
  }, [posts, selectedCat, featuredSlug]);

  const categoryOf = (id) => categories.find((c) => c.id === id) ?? null;
  const featuredCat = featured ? categoryOf(featured.category) : null;

  return (
    <>
      <Seo
        title="Blog — Operator Playbooks for Food & FMCG"
        description="Operator playbooks, benchmark numbers and real wins for food manufacturers, FMCG distributors and franchise networks — across ERP, distribution, warehouse, HR and compliance."
        canonical="https://upwon.in/blog"
      />
      <HeroSlider
        slides={heroSlides}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      {/* ========== FEATURED (latest) ARTICLE — brief §18.1 ========== */}
      {featured && (
        <section className="relative overflow-hidden bg-white pt-12 md:pt-16">
          <Container className="relative">
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-enterprise transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-enterprise-lg lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                {/* A published post can have no image (none set, or an upload
                    deleted out from under it); a navy panel then holds the
                    card's shape. Every built-in post has one. The landscape
                    desktop image on every screen: a post's phone crop is a
                    portrait for the post page's top image only. */}
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    fetchpriority="high"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-950"
                  />
                )}
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
                  {/* Read time is optional on a published post. */}
                  {featured.readTime && (
                    <>
                      <span className="text-navy-300">·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-orange-500" />
                        {featured.readTime}
                      </span>
                    </>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 font-semibold text-orange-600">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* ========== CATEGORY FILTER + POST GRID ========== */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        <Container className="relative">
          <SectionIntro
            // Blank is not reachable from the panel — the server requires an
            // eyebrow — so this only covers a row that somehow lost one.
            eyebrow={intro.eyebrow ?? FALLBACK_TOPICS.eyebrow}
            title={<HeadingLines lines={intro.headingLines} />}
            description={intro.subtext}
          />

          {/* Filter tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCat('all')}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition-all ${
                selectedCat === 'all'
                  ? 'border-orange-500 bg-orange-500 text-white'
                  : 'border-cream-300 bg-white text-navy-700 hover:border-orange-200'
              }`}
            >
              <Filter className="h-3 w-3" />
              All
            </button>
            {categories.map((c) => {
              const active = selectedCat === c.id;
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
              const cat = categoryOf(p.category);
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
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="h-full w-full bg-gradient-to-br from-navy-900 to-navy-950"
                        />
                      )}
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
                        {/* An empty span keeps "Read" on the right when a
                            published post has no read time. */}
                        {p.readTime ? (
                          <span className="inline-flex items-center gap-1.5 text-[14px] text-navy-500">
                            <Clock className="h-3 w-3" />
                            {p.readTime}
                          </span>
                        ) : (
                          <span />
                        )}
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
                {/* The two "All" answers are only reachable once a published
                    listing has been thinned out or emptied; the built-in one
                    always has posts beyond the featured card. */}
                {selectedCat !== 'all'
                  ? 'No posts in this category yet — try another lane.'
                  : featured
                    ? 'More playbooks are on the way — the latest one is above.'
                    : 'No playbooks published yet — check back soon.'}
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
