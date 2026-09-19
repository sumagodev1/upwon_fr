import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import HeroSlider from '../components/ui/HeroSlider.jsx';
import Seo, { breadcrumbJsonLd, websiteJsonLd } from '../components/common/Seo.jsx';
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

const HERO_ACCENT = '#E85A2A';

/* The backdrop the page's previous hero carried, kept as it was. */
const HERO_BG =
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=60';

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'KNOWLEDGEBASE',
    headline: 'Operations Guides for Food & FMCG Teams.',
    subhead:
      'Practical, vendor-neutral guides on inventory, compliance and distribution — written by the team that implements UpWon.',
    bg: HERO_BG,
    accent: HERO_ACCENT,
    cta: { label: 'Request a Demo', to: '/demo' },
    secondaryCta: { label: 'Read the Blog', to: '/blog' },
  },
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

      <HeroSlider
        slides={HERO_SLIDES}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      {/* CATEGORIES */}
      <section className="bg-white py-10 sm:py-12 lg:py-14">
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
