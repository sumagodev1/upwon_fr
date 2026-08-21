import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import Seo, {
  articleJsonLd,
  breadcrumbJsonLd,
} from '../components/common/Seo.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import Faq from '../components/common/Faq.jsx';
import {
  getCategory,
  findArticle,
  getRelatedArticles,
  formatKbDate,
} from '../data/knowledgebase.js';

const SITE_URL = 'https://upwon.in';

export default function KnowledgebaseArticlePage() {
  const { categorySlug, articleSlug } = useParams();
  const category = getCategory(categorySlug);
  const article = findArticle(categorySlug, articleSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [categorySlug, articleSlug]);

  if (!category || !article) {
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

  const url = `${SITE_URL}/knowledgebase/${category.slug}/${article.slug}`;
  const trail = [
    { name: 'Home', to: '/' },
    { name: 'Knowledgebase', to: '/knowledgebase' },
    { name: category.name, to: `/knowledgebase/${category.slug}` },
    { name: article.title },
  ];
  const related = getRelatedArticles(article, 3);

  return (
    <>
      <Seo
        title={`${article.title} — UpWon Knowledgebase`}
        description={article.description}
        keywords={article.keywords}
        canonical={url}
        type="article"
        jsonLd={[
          breadcrumbJsonLd(trail),
          articleJsonLd({
            title: article.title,
            description: article.description,
            url,
            datePublished: article.datePublished,
            dateModified: article.dateModified,
            section: category.name,
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
          <div className="flex justify-center">
            <Breadcrumbs items={trail} className="[&_ol]:text-white/80 [&_[aria-current]]:text-white [&_svg]:text-white/50 [&_a:hover]:text-orange-300" />
          </div>
          <div className="mx-auto mt-6 max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
              {category.name}
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

              {/* Demo CTA */}
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
// heading hierarchy stays semantic (one H1 in the hero, H2s in the body).
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
      </blockquote>
    );
  }
  return (
    <p className="mt-5 text-balance text-[15.5px] leading-relaxed text-navy-700 md:text-[16.5px]">
      {block.text}
    </p>
  );
}
