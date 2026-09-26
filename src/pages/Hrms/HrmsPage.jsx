import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import HrmsProofStrip from './sections/HrmsProofStrip/HrmsProofStrip.jsx';
import HrmsModules from './sections/HrmsModules/HrmsModules.jsx';
import HrmsOperationalReality from './sections/HrmsOperationalReality/HrmsOperationalReality.jsx';
import HrmsWhyGeneralistFallsShort from './sections/HrmsWhyGeneralistFallsShort/HrmsWhyGeneralistFallsShort.jsx';
import HrmsApproach from './sections/HrmsApproach/HrmsApproach.jsx';
import HrmsCoreCapabilities from './sections/HrmsCoreCapabilities/HrmsCoreCapabilities.jsx';
import HrmsConnectedByDesign from './sections/HrmsConnectedByDesign/HrmsConnectedByDesign.jsx';
import HrmsOneSuite from './sections/HrmsOneSuite/HrmsOneSuite.jsx';
import HrmsWorkforceTabs from './sections/HrmsWorkforceTabs/HrmsWorkforceTabs.jsx';
import HrmsPricing from './sections/HrmsPricing/HrmsPricing.jsx';
import HrmsImplementation from './sections/HrmsImplementation/HrmsImplementation.jsx';
import HrmsSecurity from './sections/HrmsSecurity/HrmsSecurity.jsx';
import HrmsComparison from './sections/HrmsComparison/HrmsComparison.jsx';
import HrmsOutcomes from './sections/HrmsOutcomes/HrmsOutcomes.jsx';
import HrmsFaq from './sections/HrmsFaq/HrmsFaq.jsx';
import HrmsFinalCta from './sections/HrmsFinalCta/HrmsFinalCta.jsx';
import Seo, { productJsonLd, breadcrumbJsonLd } from '../../components/shared/Seo/Seo.jsx';
import { getPlatformTheme, findProductBySlug } from '../../data/modules.js';
import {
  fetchHreasyAlternativesSection,
  fetchHreasyCapabilitiesSection,
  fetchHreasyCtaSection,
  fetchHreasyFaqSection,
  fetchHreasyHeroSlides,
  fetchHreasyLifecycleSection,
  fetchHreasyOutcomesSection,
  fetchHreasyPackagesSection,
  fetchHreasyProofSection,
} from '../../lib/hreasyPage.js';

/*
  Dedicated UPWON HRMS (HREasy) landing page — its own page (like PosPage /
  ErpPage / FmsPage) so the mixed office-plus-plant workforce story can be built
  out section by section, independent of the shared dynamic ProductPage.
  Routed at /products/hrms.
*/

export default function HrmsPage() {
  const product = findProductBySlug('hrms');

  const [cmsSlides, setCmsSlides] = useState(null);
  const [proof, setProof] = useState(null);
  const [capabilities, setCapabilities] = useState(null);
  const [lifecycle, setLifecycle] = useState(null);
  const [packages, setPackages] = useState(null);
  const [alternatives, setAlternatives] = useState(null);
  const [outcomes, setOutcomes] = useState(null);
  const [faq, setFaq] = useState(null);
  const [cta, setCta] = useState(null);

  /*
    The fetches live on the page rather than inside the components themselves:
    HeroSlider is shared with several other pages, and keeping the fetch here
    is what stops one page's content following a shared component onto another.
  */
  useEffect(() => {
    let cancelled = false;

    fetchHreasyHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setCmsSlides(slides);
    });
    fetchHreasyProofSection().then((section) => {
      if (!cancelled && section) setProof(section);
    });
    fetchHreasyCapabilitiesSection().then((section) => {
      if (!cancelled && section) setCapabilities(section);
    });
    fetchHreasyLifecycleSection().then((section) => {
      if (!cancelled && section) setLifecycle(section);
    });
    fetchHreasyPackagesSection().then((section) => {
      if (!cancelled && section) setPackages(section);
    });
    fetchHreasyAlternativesSection().then((section) => {
      if (!cancelled && section) setAlternatives(section);
    });
    fetchHreasyOutcomesSection().then((section) => {
      if (!cancelled && section) setOutcomes(section);
    });
    fetchHreasyFaqSection().then((section) => {
      if (!cancelled && section) setFaq(section);
    });
    fetchHreasyCtaSection().then((section) => {
      if (!cancelled && section) setCta(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);
  if (!product) return <Navigate to="/platform" replace />;

  const theme = getPlatformTheme('hrms');
  // The accent is the platform's, not the slide's, so it is applied to
  // whichever list is in play.
  const heroSlides = (cmsSlides ?? product.heroSlides ?? []).map((s) => ({
    accent: theme.accent,
    ...s,
  }));

  const seoTitle = product.seoTitle || `${product.code} — ${product.hero}`;
  const seoDesc = product.metaDescription || product.description;
  const breadcrumbItems = [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/platform' },
    { name: product.code, to: '/products/hrms' },
  ];

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDesc}
        canonical="https://upwon.in/products/hrms"
        type="product"
        jsonLd={[
          productJsonLd({ name: product.code, description: seoDesc, slug: 'hrms' }),
          breadcrumbJsonLd(breadcrumbItems),
        ]}
      />

      {/* ========== HERO — 5 rotating mixed-workforce value lines, no breadcrumb ========== */}
      <HeroSlider slides={heroSlides} variant="dark" intervalMs={4000} topPad="pt-32 md:pt-40" />

      {/* ========== PROOF STRIP — named-client bento (logos + stats + proof) ========== */}
      <HrmsProofStrip section={proof} />

      {/* ========== MODULES — Keka-style scroll-driven recruit-to-retire showcase ========== */}
      <HrmsModules section={capabilities} />

      {/* ========== OPERATIONAL REALITY — pre-HRMS pain-point cards ========== */}
      <HrmsOperationalReality />

      {/* ========== WHY GENERALIST TOOLS FALL SHORT — office vs. office+floor ========== */}
      <HrmsWhyGeneralistFallsShort />

      {/* ========== UPWON'S APPROACH — factory + office + franchise → one core ========== */}
      <HrmsApproach />

      {/* ========== CORE CAPABILITIES — 7 lifecycle capability cards ========== */}
      <HrmsCoreCapabilities section={lifecycle} />

      {/* ========== CONNECTED BY DESIGN — HR ↔ ERP data-model flow ========== */}
      <HrmsConnectedByDesign />

      {/* ========== ONE SUITE, NOT SIX VENDORS — HREasy hub + suite spokes ========== */}
      <HrmsOneSuite />

      {/* ========== BUILT FOR EVERY KIND OF EMPLOYEE — per-workforce tabs ========== */}
      <HrmsWorkforceTabs />

      {/* ========== MODULE VERSIONS & GROWTH PATH — Core / Pro / Plus pricing ========== */}
      <HrmsPricing section={packages} />

      {/* ========== IMPLEMENTATION & PARTNERSHIP — payroll migration carousel ========== */}
      <HrmsImplementation />

      {/* ========== SECURE, COMPLIANT, ACCOUNTABLE — statutory compliance + carousel ========== */}
      <HrmsSecurity />

      {/* ========== UPWON VS ALTERNATIVES — workforce-shape comparison table ========== */}
      <HrmsComparison section={alternatives} />

      {/* ========== CUSTOMER OUTCOMES — named case studies ========== */}
      <HrmsOutcomes section={outcomes} />

      {/* ========== FAQ — migration & compliance questions ========== */}
      <HrmsFaq section={faq} />

      {/* ========== FINAL CTA — low-pressure workforce conversation ========== */}
      <HrmsFinalCta section={cta} />
    </>
  );
}
