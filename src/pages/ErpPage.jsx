import { Navigate } from 'react-router-dom';
import HeroSlider from '../components/ui/HeroSlider.jsx';
import TrustSection from '../components/sections/TrustSection.jsx';
import SpecializedErpSection from '../components/sections/SpecializedErpSection.jsx';
import EverythingInOnePlace from '../components/sections/EverythingInOnePlace.jsx';
import ErpBenefitsJourney from '../components/sections/ErpBenefitsJourney.jsx';
import ErpImplementationTimeline from '../components/sections/ErpImplementationTimeline.jsx';
import AlternativesComparison from '../components/sections/AlternativesComparison.jsx';
import CustomerOutcomes from '../components/sections/CustomerOutcomes.jsx';
import TrustEstablishers from '../components/sections/TrustEstablishers.jsx';
import IndustryFaq from '../components/sections/IndustryFaq.jsx';
import ErpFinalCta from '../components/sections/ErpFinalCta.jsx';
import Seo, { productJsonLd, breadcrumbJsonLd, faqJsonLd } from '../components/common/Seo.jsx';
import { getPlatformTheme, findProductBySlug } from '../data/modules.js';

/*
  Dedicated UPWON ERP landing page. Extracted out of the shared dynamic
  ProductPage so the ERP experience can evolve independently of the other six
  platform microsites. Routed at /products/erp (a more-specific route than
  products/:slug), so all existing links and SEO stay intact.
*/

export default function ErpPage() {
  const product = findProductBySlug('erp');
  if (!product) return <Navigate to="/platform" replace />;

  const theme = getPlatformTheme('erp');

  // Hero slides carry the platform accent so the hero glow tints match the
  // Recommended palette (same treatment ProductPage applied).
  const baseSlides =
    product.heroSlides && product.heroSlides.length
      ? product.heroSlides
      : [
          {
            eyebrow: product.code,
            headline: product.hero,
            subhead: product.description,
            cta: { label: `See ${product.code} in 30 min`, to: '/demo' },
            secondaryCta: { label: 'Download datasheet', to: '/resources' },
            bg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=70',
          },
        ];
  const heroSlides = baseSlides.map((s) => ({ accent: theme.accent, ...s }));

  const seoTitle = product.seoTitle || `${product.code} — ${product.hero}`;
  const seoDesc = product.metaDescription || product.description;
  const breadcrumbItems = [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/platform' },
  ];

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDesc}
        canonical="https://upwon.in/products/erp"
        type="product"
        jsonLd={[
          productJsonLd({ name: product.code, description: seoDesc, slug: 'erp' }),
          breadcrumbJsonLd(breadcrumbItems),
          faqJsonLd(ERP_COMMIT_FAQS),
        ]}
      />

      {/* ========== HERO — auto-scroll slider ========== */}
      <HeroSlider
        slides={heroSlides}
        variant="dark"
        intervalMs={5000}
        topPad="pt-32 md:pt-40"
      />

      {/* ========== PROOF STRIP — scale stats + rating + brand marquee ========== */}
      <TrustSection
        eyebrow="Numbers from businesses running UPWON today"
        title={
          <>
            Numbers From Businesses{' '}
            <span className="gradient-text-orange">Running UPWON Today.</span>
          </>
        }
      />

      {/* ========== SPECIALIZED-vs-GENERIC ERP — industry switcher ========== */}
      <SpecializedErpSection />

      {/* ========== EVERYTHING IN ONE PLACE — product-showcase collage ========== */}
      <EverythingInOnePlace />

      {/* ========== BENEFITS FOR EVERYONE — persona highlight list ========== */}
      <ErpBenefitsJourney />

      {/* ========== IMPLEMENTATION & PARTNERSHIP — 5-stage go-live timeline ========== */}
      <ErpImplementationTimeline />

      {/* ========== UPWON VS THE ALTERNATIVES — plain-language comparison ========== */}
      <AlternativesComparison />

      {/* ========== CUSTOMER OUTCOMES — operational proof + testimonials ========== */}
      <CustomerOutcomes />

      {/* ========== TRUST ESTABLISHERS — compliance badges + integrations ========== */}
      <TrustEstablishers />

      {/* ========== FAQ — due-diligence questions before the CTA ========== */}
      <IndustryFaq
        faqs={ERP_COMMIT_FAQS}
        eyebrow="FAQ"
        title={
          <>
            Questions Buyers Ask{' '}
            <span className="gradient-text-orange">Before They Commit.</span>
          </>
        }
        description="Straight answers to the cost, migration, compliance, customisation and support questions — before you commit."
      />

      {/* ========== FINAL CTA — low-pressure invitation over erp_cta background ========== */}
      <ErpFinalCta />
    </>
  );
}

// ERP due-diligence FAQ — verbatim to how buyers actually ask, answered
// ERP-specific. Rendered below Trust Establishers, above the site-wide CTA.
const ERP_COMMIT_FAQS = [
  {
    q: 'What exactly is UPWON ERP, and which businesses is it built for?',
    a: 'UPWON ERP is the operational backbone for food and FMCG manufacturers — production, quality, inventory & stores, procurement, plant-side sales & billing, finance and compliance on one data model. It is built specifically for bakery & confectionery, dairy, sweets & namkeen, snacks, beverages and spices — not a generic ERP retrofitted for food.',
  },
  {
    q: 'How much does it cost?',
    a: 'It lands at a fraction of the 3-year total cost of ownership of SAP Business One or Oracle NetSuite at comparable ERP depth — with no long, expensive implementation bill. Exact pricing depends on plants, users and modules, so we scope a firm number against your operation on a short call.',
  },
  {
    q: 'Do you handle data migration from our current system?',
    a: 'Yes. Moving, cleaning and validating your existing data — item masters, opening stock, ledgers — is a defined stage of the rollout (roughly Day 16–25), with validation checkpoints before go-live. You are never handed a blank system to fill in yourself.',
  },
  {
    q: 'Is it FSSAI, GST and e-invoicing compliant?',
    a: 'Compliance is native, not a bolt-on. FSSAI dossiers are auto-generated per batch, and GST and e-invoicing are built into the core data model — so audits become a one-click export rather than a month-end scramble.',
  },
  {
    q: 'What support do we get after go-live?',
    a: 'You stay connected to the team that actually builds the product — direct implementation and support access, not layers of SI partners and tickets. Support continues as an ongoing partnership after launch, not a hand-off.',
  },
  {
    q: 'Can it be customised to our specific workflow?',
    a: 'UPWON is configured around your existing processes during rollout (roughly Day 6–15) using business-specific workflows — so it fits how your plant already runs, without an open-ended, costly custom-build project.',
  },
];
