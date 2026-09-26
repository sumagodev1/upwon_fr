import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import Seo, {
  articleJsonLd,
  breadcrumbJsonLd,
} from '../../components/shared/Seo/Seo.jsx';
import Faq from '../../components/shared/Faq/Faq.jsx';
import {
  getCategory,
  findArticle,
  getRelatedArticles,
  formatKbDate,
} from '../../data/knowledgebase.js';
import {
  fetchKbArticle,
  fetchKbCategories,
  fetchKbCategory,
} from '../../lib/knowledgebase.js';

const SITE_URL = 'https://upwon.in';

export default function KnowledgebaseArticlePage() {
  const { categorySlug, articleSlug } = useParams();

  /*
    The built-in guide renders first — it is the copy the sitemap vouches for
    (seo/routes.js and App.jsx's getStaticPaths enumerate
    data/knowledgebase.js's slugs), what the prerender bakes in, and what
    renders if the API is unreachable — and the guide published through the
    admin panel's Resource Page → Knowledgebase → Articles tab replaces it once
    the API answers. BlogPostPage's order, for the same reasons.

    Three calls, because they answer different questions:
      - fetchKbArticle carries the guide itself: its body, its FAQs, its
        category's name and the server's pick of related guides;
      - fetchKbCategory lists the category's LIVE guides, which is how a guide
        switched off in the panel (a 404, so null above) is told apart from an
        API that could not be reached (also null);
      - fetchKbCategories does the same one level up, for a category that was
        switched off — its own read then 404s too.
    All three resolve to null for every failure — see lib/knowledgebase.js.

    The answer is stored with the URL it was for, so a slow reply for the
    previous guide can never paint over the next one.
  */
  const key = `${categorySlug}/${articleSlug}`;
  const [published, setPublished] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchKbArticle(categorySlug, articleSlug),
      fetchKbCategory(categorySlug),
      fetchKbCategories(),
    ]).then(([found, live, index]) => {
      if (cancelled) return;
      setPublished({ key: `${categorySlug}/${articleSlug}`, found, live, index });
    });
    return () => {
      cancelled = true;
    };
  }, [categorySlug, articleSlug]);

  const settled = published?.key === key;
  const fetched = settled ? published : null;
  const builtInCategory = getCategory(categorySlug);
  const builtIn = builtInCategory ? findArticle(categorySlug, articleSlug) : null;

  /*
    What the API says is live — the same rule the hub and the category page
    use. When the knowledgebase HAS categories (`hasCategories`, see
    lib/knowledgebase.js) and this category is not among them, or the
    category's own read answered and this guide is not among its cards, the
    guide was switched off, moved or deleted in the admin panel, so a built-in
    copy of it stops rendering once the API has said so rather than living on
    at a URL nothing links to any more. With no answer — API unreachable,
    unconfigured, no category rows at all — the built-in copy stands.
  */
  const listed = fetched?.index?.hasCategories ? fetched.index : null;
  const live = fetched?.live ?? null;
  const unpublished =
    (Boolean(listed) && !listed.categories.some((c) => c.slug === categorySlug)) ||
    (Boolean(live) && !live.articles.some((a) => a.slug === articleSlug));

  // The published guide when there is one; otherwise the built-in one, unless
  // the API says it is gone.
  const article = fetched?.found ?? (builtIn && !unpublished ? builtIn : null);
  const isPublished = Boolean(article) && article === fetched?.found;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [categorySlug, articleSlug]);

  // Not a built-in guide and the API has not answered yet: hold the hero's
  // frame rather than flashing "not found" at a guide that exists only in the
  // admin panel.
  if (!article && !settled) {
    return (
      <section
        aria-busy="true"
        className="relative flex min-h-[52vh] items-center overflow-hidden bg-navy-950 pt-32 pb-12 md:min-h-[56vh] md:pt-40 md:pb-16"
      >
        <span className="sr-only">Loading guide…</span>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="bg-cream-100 pt-40 pb-24 text-center">
        <Container>
          <h1 className="h-display text-3xl text-navy-900">Article not found</h1>
          <Link to="/knowledgebase" className="btn-primary mt-7 inline-flex">
            <ArrowLeft className="h-4 w-4" />
            Back to the knowledgebase
          </Link>
        </Container>
      </section>
    );
  }

  /*
    The category's name — the hero's eyebrow, the breadcrumb and the Article
    schema's section. A published guide carries its own; a built-in one takes
    the published category's when that read answered, so a name renamed in
    the panel shows here as it does on the hub, and its built-in category's
    otherwise.
  */
  const categoryName = isPublished
    ? article.categoryName
    : (live?.category.name ?? builtInCategory.name);

  const url = `${SITE_URL}/knowledgebase/${categorySlug}/${article.slug}`;
  const trail = [
    { name: 'Home', to: '/' },
    { name: 'Knowledgebase', to: '/knowledgebase' },
    { name: categoryName, to: `/knowledgebase/${categorySlug}` },
    { name: article.title },
  ];

  // The server's pick for a published guide (same category first, then the
  // rest, newest first, never the guide itself) and the built-in pick for a
  // built-in one.
  const related = isPublished ? article.related : getRelatedArticles(article, 3);

  /*
    The panel authors no SEO copy: a published guide's description is its
    excerpt, and both schema dates are its "Updated" date (lib/knowledgebase.js
    carries the API's `updatedOn` as `dateModified`; a published guide has no
    `datePublished`). Its keywords are its built-in twin's (the slug never
    changes), and one that exists only in the panel takes the site default.
  */
  const description = article.description ?? article.excerpt;

  return (
    <>
      <Seo
        title={`${article.title} — UpWon Knowledgebase`}
        description={description}
        keywords={article.keywords ?? builtIn?.keywords}
        canonical={url}
        type="article"
        jsonLd={[
          breadcrumbJsonLd(trail),
          articleJsonLd({
            title: article.title,
            description,
            url,
            datePublished: article.datePublished ?? article.dateModified,
            dateModified: article.dateModified,
            section: categoryName,
          }),
        ]}
      />

      {/* HERO — full-bleed background image + centered copy, matching the
          knowledgebase hub and blog-post hero treatment. */}
      <section className="relative flex min-h-[52vh] items-center overflow-hidden bg-navy-950 pt-32 pb-12 md:min-h-[56vh] md:pt-40 md:pb-16">
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
              {categoryName}
            </p>
            <h1 className="mt-3 h-display text-balance text-[1.9rem] leading-[1.1] tracking-tightest text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-[2.5rem] lg:text-[2.9rem]">
              {article.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-orange-300" />
                Updated {formatKbDate(article.dateModified || article.datePublished)}
              </span>
              {article.readTime && (
                <>
                  <span className="text-white/50">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-orange-300" />
                    {article.readTime}
                  </span>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* BODY */}
      <section className="bg-white section-pad">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_240px]">
            <article>
              <p className="text-balance border-l-2 border-orange-500 pl-5 text-lg font-medium leading-relaxed text-navy-800 md:text-xl">
                {article.excerpt}
              </p>
              <div className="mt-8">
                {article.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>

              {/* Per-page FAQ — reusable component, emits FAQPage schema. */}
              {article.faqs?.length > 0 && (
                <Faq
                  faqs={article.faqs}
                  heading="Frequently asked"
                  className="mt-12"
                />
              )}

              {/* Demo CTA — the page's own, not authored in the admin panel. */}
              <div className="mt-12 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50/40 p-6 md:p-8">
                <h2 className="font-display text-xl font-bold leading-tight text-navy-950 md:text-2xl">
                  See this working on your own operations.
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-700">
                  A 30-minute live demo, mapped to your plants and outlets.
                </p>
                <Link to="/demo" className="btn-primary-glow mt-5 !px-5 !py-3 !text-[14px]">
                  Book Free Demo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            {/* Sidebar — related guides (internal linking) */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {related.length > 0 && (
                <div className="rounded-2xl border border-cream-300 bg-cream-100 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-navy-500">
                    Related guides
                  </p>
                  <ul className="mt-3 space-y-3">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          to={`/knowledgebase/${r.category}/${r.slug}`}
                          className="group block text-[14px] font-semibold leading-snug text-navy-800 hover:text-orange-700"
                        >
                          {r.title}
                          <ArrowRight className="ml-1 inline h-3 w-3 text-orange-500 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-700">
                  Browse the knowledgebase
                </p>
                <Link
                  to="/knowledgebase"
                  className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
                >
                  All categories
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

// Body block renderer — mirrors the blog renderer (h2 / ul / quote / p) so the
// heading hierarchy stays semantic (one H1 in the hero, H2s in the body). A
// quote's attribution is drawn only when a published guide carries one (the
// panel's body editor is the blog's, which offers it); no built-in guide does.
function Block({ block }) {
  if (block.type === 'h2') {
    return (
      <h2 className="mt-9 h-display text-2xl font-bold leading-tight text-navy-950 md:text-[1.7rem]">
        {block.text}
      </h2>
    );
  }
  if (block.type === 'ul') {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
            <span className="text-[15.5px] leading-relaxed text-navy-700 md:text-[16.5px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="my-8 rounded-r-xl border-l-4 border-orange-500 bg-cream-100 py-5 pl-6 pr-5">
        <p className="text-balance font-display text-lg font-semibold leading-snug text-navy-950 md:text-xl">
          “{block.text}”
        </p>
        {block.cite && (
          <footer className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-500">
            — {block.cite}
          </footer>
        )}
      </blockquote>
    );
  }
  return (
    <p className="mt-5 text-balance text-[15.5px] leading-relaxed text-navy-700 md:text-[16.5px]">
      {block.text}
    </p>
  );
}
