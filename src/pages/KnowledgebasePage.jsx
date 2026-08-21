import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import Seo, { breadcrumbJsonLd, websiteJsonLd } from '../components/common/Seo.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import {
  KB_CATEGORIES,
  getArticlesByCategory,
} from '../data/knowledgebase.js';

// Knowledgebase hub — lists every category with its article count. Crawlable
// internal links to each category and a clean H1 → H2 → H3 hierarchy.
const trail = [
  { name: 'Home', to: '/' },
  { name: 'Knowledgebase' },
];

export default function KnowledgebasePage() {
  return (
    <>
      <Seo
        title="Knowledgebase — Food & FMCG Operations Guides"
        description="Practical guides on inventory, FSSAI compliance and FMCG distribution for food manufacturers and distributors — from the UpWon operations team."
        keywords="food erp knowledgebase, inventory guides, FSSAI compliance guides, FMCG distribution guides"
        canonical="https://upwon.in/knowledgebase"
        jsonLd={[websiteJsonLd, breadcrumbJsonLd(trail)]}
      />

      {/* HERO — full-bleed background image + centered copy, matching the
          blog-post hero treatment. */}
      <section className="relative flex min-h-[58vh] items-center overflow-hidden bg-navy-950 pt-32 pb-14 md:min-h-[62vh] md:pt-40 md:pb-16">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=60"
          alt="Food &amp; FMCG warehouse operations"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Legibility overlay — lightened so the warehouse photo reads as a photo
            (not a flat navy block) while the drop-shadowed white heading stays legible. */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/60 to-navy-950/92" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/45 to-navy-950/80" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <Container className="relative w-full">
          <div className="flex justify-center">
            <Breadcrumbs items={trail} className="[&_ol]:text-white/80 [&_[aria-current]]:text-white [&_svg]:text-white/50 [&_a:hover]:text-orange-300" />
          </div>
          <div className="mx-auto mt-6 max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-200 backdrop-blur">
              <BookOpen className="h-3.5 w-3.5" />
              Knowledgebase
            </p>
            <h1 className="mt-5 h-display text-balance text-[2rem] leading-[1.08] tracking-tightest text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-[2.8rem] lg:text-[3.2rem]">
              Operations guides for{' '}
              {/* <span className="gradient-text-orange">food &amp; FMCG teams.</span> */}
              <span className="text-white">food &amp; FMCG teams.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/80 md:text-lg">
              Practical, vendor-neutral guides on inventory, compliance and
              distribution — written by the team that implements UpWon.
            </p>
          </div>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white section-pad">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {KB_CATEGORIES.map((cat) => {
              const count = getArticlesByCategory(cat.slug).length;
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
          </div>
        </Container>
      </section>
    </>
  );
}
