import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import Seo, { breadcrumbJsonLd, websiteJsonLd } from '../../components/shared/Seo/Seo.jsx';
import {
  KB_CATEGORIES,
  getArticlesByCategory,
} from '../../data/knowledgebase.js';
import { fetchKbCategories, fetchKbHero } from '../../lib/knowledgebase.js';
import { blogIcon } from '../../lib/blogIcons.js';

// Knowledgebase hub — lists every category with its article count. Crawlable
// internal links to each category and a clean H1 → H2 → H3 hierarchy.
//
// Authored in the admin panel under Resource Page → Knowledgebase: the hero
// slides and the category cards come from lib/knowledgebase.js once the API
// answers. Until then — and for good whenever it cannot answer — the page is
// the built-in one below and in data/knowledgebase.js, which is also exactly
// what the prerender bakes in, so hydration always matches. See
// lib/knowledgebase.js for the three rules every read follows.
const trail = [
  { name: 'Home', to: '/' },
  { name: 'Knowledgebase' },
];

const HERO_ACCENT = '#E85A2A';

/* The backdrop the page's previous hero carried, kept as it was — the
   built-in slide's, and the one a published slide with no picture of its own
   falls back to. */
const HERO_BG =
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=60';

/* Hero buttons — the same two on every slide, built-in or published. They
   are not authored in the admin panel. */
const HERO_CTA = { label: 'Request a Demo', to: '/demo' };
const HERO_SECONDARY_CTA = { label: 'Read the Blog', to: '/blog' };

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'KNOWLEDGEBASE',
    headline: 'Operations Guides for Food & FMCG Teams.',
    subhead:
      'Practical, vendor-neutral guides on inventory, compliance and distribution — written by the team that implements UpWon.',
    bg: HERO_BG,
    accent: HERO_ACCENT,
    cta: HERO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
];

/*
  The published slides in the shape of HERO_SLIDES.

  Only the words and the pictures are authored; the accent and the two buttons
  are the page's own and stay put. A field lib/knowledgebase.js could not vouch
  for arrives as null and takes its built-in value — the eyebrow the built-in
  slide's, the backdrop HERO_BG.
*/
function toHeroSlides(published) {
  if (!published) return HERO_SLIDES;

  const [builtIn] = HERO_SLIDES;
  return published.map((slide) => ({
    eyebrow: slide.eyebrow ?? builtIn.eyebrow,
    headline: slide.heading,
    subhead: slide.subtext,
    bg: slide.image ?? HERO_BG,
    // Null means no phone crop; HeroSlider then serves `bg` to every viewport.
    mobileBg: slide.mobileImage,
    accent: HERO_ACCENT,
    cta: HERO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  }));
}

/*
  The category cards in one shape, whichever source they came from:
  `{ slug, name, description, icon, count }` with `icon` a lucide COMPONENT —
  data/knowledgebase.js's KB_CATEGORIES already carry one; a published
  category's arrives as a NAME and is resolved here through lib/blogIcons.js.

  WHICH LIST WINS. The published one whenever the knowledgebase HAS categories
  — and that includes an empty list. `hasCategories` is the API saying whether
  any category row exists at all, ACTIVE or not, so "every category is
  switched off" (render no cards — somebody chose that) stops being the same
  answer as "no category row exists" (nothing authored, keep the built-in
  cards). See lib/knowledgebase.js.

  The built-in count is the built-in guides filed under the category, as the
  page always counted them; a published one is the server's count of its
  ACTIVE guides — the ones its category page lists.
*/
const BUILT_IN_CATEGORIES = KB_CATEGORIES.map((cat) => ({
  slug: cat.slug,
  name: cat.name,
  description: cat.description,
  icon: cat.icon,
  count: getArticlesByCategory(cat.slug).length,
}));

function toCategories(index) {
  if (!index?.hasCategories) return BUILT_IN_CATEGORIES;

  return index.categories.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    description: cat.description,
    icon: blogIcon(cat.icon),
    count: cat.count,
  }));
}

export default function KnowledgebasePage() {
  /*
    Each section starts as the built-in one and is swapped for the published
    one once the API answers — the same order as the blog. Every fetch
    resolves to null for every failure (unconfigured, offline, CORS, nothing
    authored), and null means "keep what you have". The two are independent,
    so each lands on its own.
  */
  const [hero, setHero] = useState(null);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchKbHero().then((published) => {
      if (!cancelled && published) setHero(published);
    });
    fetchKbCategories().then((published) => {
      if (!cancelled && published) setIndex(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const heroSlides = useMemo(() => toHeroSlides(hero), [hero]);
  const categories = useMemo(() => toCategories(index), [index]);

  return (
    <>
      <Seo
        title="Knowledgebase — Food & FMCG Operations Guides"
        description="Practical guides on inventory, FSSAI compliance and FMCG distribution for food manufacturers and distributors — from the UpWon operations team."
        keywords="food erp knowledgebase, inventory guides, FSSAI compliance guides, FMCG distribution guides"
        canonical="https://upwon.in/knowledgebase"
        jsonLd={[websiteJsonLd, breadcrumbJsonLd(trail)]}
      />

      <HeroSlider
        slides={heroSlides}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      {/* CATEGORIES */}
      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const { count } = cat;
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  to={`/knowledgebase/${cat.slug}`}
                  className="group flex flex-col rounded-2xl border border-cream-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-enterprise"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-100 text-orange-600">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <h2 className="mt-4 font-display text-lg font-bold text-navy-950">
                    {cat.name}
                  </h2>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-navy-600">
                    {cat.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600">
                    {count} {count === 1 ? 'guide' : 'guides'}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
            {/* Only reachable once a published knowledgebase has had every
                category switched off; the built-in one always has cards. */}
            {categories.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-navy-500">
                No guides published yet — check back soon.
              </p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
