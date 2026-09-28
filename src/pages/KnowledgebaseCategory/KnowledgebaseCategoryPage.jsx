import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import Seo, { breadcrumbJsonLd } from '../../components/shared/Seo/Seo.jsx';
import {
  getCategory,
  getArticlesByCategory,
  formatKbDate,
} from '../../data/knowledgebase.js';
import { fetchKbCategories, fetchKbCategory } from '../../lib/knowledgebase.js';

export default function KnowledgebaseCategoryPage() {
  const { categorySlug } = useParams();

  /*
    The built-in category renders first — it is the copy the sitemap vouches
    for (seo/routes.js and App.jsx's getStaticPaths enumerate
    data/knowledgebase.js's slugs), what the prerender bakes in, and what
    renders if the API is unreachable — and the category published through the
    admin panel's Resource Page → Knowledgebase replaces it once the API
    answers. BlogPostPage's order, for the same reasons.

    Two calls, because they answer different questions — the same pair
    BlogPostPage makes:
      - fetchKbCategory carries the category itself: its name, description and
        guide cards;
      - fetchKbCategories says which categories are LIVE, which is how a
        category switched off in the panel (a 404, so null above) is told
        apart from an API that could not be reached (also null).
    Both resolve to null for every failure — see lib/knowledgebase.js.

    The answer is stored with the slug it was for, so a slow reply for the
    previous category can never paint over the next one.
  */
  const [published, setPublished] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchKbCategory(categorySlug), fetchKbCategories()]).then(
      ([found, index]) => {
        if (cancelled) return;
        setPublished({ slug: categorySlug, found, index });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  const settled = published?.slug === categorySlug;
  const fetched = settled ? published : null;
  const builtIn = getCategory(categorySlug);

  /*
    The published categories are the authority on what is live — the same
    rule the hub uses to choose its cards. When the knowledgebase HAS
    categories (`hasCategories`, see lib/knowledgebase.js) and this slug is
    not among them, the category was switched off or deleted in the admin
    panel, so a built-in copy of it stops rendering once the API has said so
    rather than living on at a URL the hub no longer links to. With no list —
    API unreachable, unconfigured, no category rows at all — the built-in copy
    stands.
  */
  const listed = fetched?.index?.hasCategories ? fetched.index : null;
  const unpublished =
    Boolean(listed) && !listed.categories.some((c) => c.slug === categorySlug);

  // The published category when there is one; otherwise the built-in one,
  // unless the API says it is gone.
  const found = fetched?.found ?? null;
  const category = found?.category ?? (builtIn && !unpublished ? builtIn : null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [categorySlug]);

  // Not a built-in category and the API has not answered yet: hold the hero's
  // frame rather than flashing "not found" at a category that exists only in
  // the admin panel.
  if (!category && !settled) {
    return (
      <section
        aria-busy="true"
        className="relative flex min-h-[48vh] items-center overflow-hidden bg-navy-950 pt-32 pb-12 md:min-h-[52vh] md:pt-40 md:pb-14"
      >
        <span className="sr-only">Loading category…</span>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="bg-cream-100 pt-40 pb-24 text-center">
        <Container>
          <h1 className="h-display text-3xl text-navy-900">Category not found</h1>
          <Link to="/knowledgebase" className="btn-primary mt-7 inline-flex">
            <ArrowLeft className="h-4 w-4" />
            Back to the knowledgebase
          </Link>
        </Container>
      </section>
    );
  }

  // A published category's own guide cards — possibly none, when every one
  // was switched off — or the built-in ones filed under it.
  const articles = found ? found.articles : getArticlesByCategory(categorySlug);
  const trail = [
    { name: 'Home', to: '/' },
    { name: 'Knowledgebase', to: '/knowledgebase' },
    { name: category.name },
  ];

  return (
    <>
      {/* The panel authors no keywords, so a published category keeps its
          built-in twin's (the slug never changes) and one that exists only in
          the panel takes the site default. */}
      <Seo
        title={`${category.name} — UpWon Knowledgebase`}
        description={category.description}
        keywords={category.keywords ?? builtIn?.keywords}
        canonical={`https://upwon.in/knowledgebase/${category.slug}`}
        jsonLd={breadcrumbJsonLd(trail)}
      />

      {/* HERO — full-bleed background image + centered copy, matching the
          knowledgebase hub and blog-post hero treatment. */}
      <section className="relative flex min-h-[48vh] items-center overflow-hidden bg-navy-950 pt-32 pb-12 md:min-h-[52vh] md:pt-40 md:pb-14">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=60"
          alt="Food &amp; FMCG warehouse operations"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/60 to-navy-950/92" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <Container className="relative w-full">
          <h1 className="mx-auto max-w-3xl text-center h-display text-balance text-[2rem] leading-tight tracking-tightest text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-[2.6rem]">
            {category.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-balance text-base leading-relaxed text-white/80">
            {category.description}
          </p>
        </Container>
      </section>

      <section className="bg-white section-pad">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/knowledgebase/${category.slug}/${a.slug}`}
                className="group flex flex-col rounded-2xl border border-cream-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-enterprise"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600">
                  {a.readTime}
                  {a.dateModified ? ` · Updated ${formatKbDate(a.dateModified)}` : ''}
                </p>
                <h2 className="mt-2 font-display text-lg font-bold leading-snug text-navy-950">
                  {a.title}
                </h2>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-navy-600">
                  {a.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
            {/* Only reachable once a published category has had every guide
                switched off; every built-in category has guides. */}
            {articles.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-navy-500">
                No guides in this category yet — check back soon.
              </p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
