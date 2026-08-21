import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import Seo, { breadcrumbJsonLd } from '../components/common/Seo.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import {
  getCategory,
  getArticlesByCategory,
  formatKbDate,
} from '../data/knowledgebase.js';

export default function KnowledgebaseCategoryPage() {
  const { categorySlug } = useParams();
  const category = getCategory(categorySlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [categorySlug]);

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

  const articles = getArticlesByCategory(categorySlug);
  const trail = [
    { name: 'Home', to: '/' },
    { name: 'Knowledgebase', to: '/knowledgebase' },
    { name: category.name },
  ];

  return (
    <>
      <Seo
        title={`${category.name} — UpWon Knowledgebase`}
        description={category.description}
        keywords={category.keywords}
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
          <div className="flex justify-center">
            <Breadcrumbs items={trail} className="[&_ol]:text-white/80 [&_[aria-current]]:text-white [&_svg]:text-white/50 [&_a:hover]:text-orange-300" />
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-center h-display text-balance text-[2rem] leading-tight tracking-tightest text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-[2.6rem]">
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
          </div>
        </Container>
      </section>
    </>
  );
}
