import { Navigate } from 'react-router-dom';
import HeroSlider from '../components/ui/HeroSlider.jsx';
import HrmsProofStrip from '../components/sections/HrmsProofStrip.jsx';
import HrmsModules from '../components/sections/HrmsModules.jsx';
import HrmsOperationalReality from '../components/sections/HrmsOperationalReality.jsx';
import HrmsWhyGeneralistFallsShort from '../components/sections/HrmsWhyGeneralistFallsShort.jsx';
import HrmsApproach from '../components/sections/HrmsApproach.jsx';
import HrmsCoreCapabilities from '../components/sections/HrmsCoreCapabilities.jsx';
import HrmsConnectedByDesign from '../components/sections/HrmsConnectedByDesign.jsx';
import HrmsOneSuite from '../components/sections/HrmsOneSuite.jsx';
import HrmsWorkforceTabs from '../components/sections/HrmsWorkforceTabs.jsx';
import HrmsPricing from '../components/sections/HrmsPricing.jsx';
import HrmsImplementation from '../components/sections/HrmsImplementation.jsx';
import HrmsSecurity from '../components/sections/HrmsSecurity.jsx';
import HrmsComparison from '../components/sections/HrmsComparison.jsx';
import HrmsOutcomes from '../components/sections/HrmsOutcomes.jsx';
import HrmsFaq from '../components/sections/HrmsFaq.jsx';
import HrmsFinalCta from '../components/sections/HrmsFinalCta.jsx';
import Seo, { productJsonLd, breadcrumbJsonLd } from '../components/common/Seo.jsx';
import { getPlatformTheme, findProductBySlug } from '../data/modules.js';

/*
  Dedicated UPWON HRMS (HREasy) landing page — its own page (like PosPage /
  ErpPage / FmsPage) so the mixed office-plus-plant workforce story can be built
  out section by section, independent of the shared dynamic ProductPage.
  Routed at /products/hrms.
*/


export default function HrmsPage() {
  const product = findProductBySlug('hrms');
  if (!product) return <Navigate to="/platform" replace />;

  const theme = getPlatformTheme('hrms');
  const heroSlides = (product.heroSlides || []).map((s) => ({ accent: theme.accent, ...s }));

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
      <HrmsProofStrip />

      {/* ========== MODULES — Keka-style scroll-driven recruit-to-retire showcase ========== */}
      <HrmsModules />

      {/* ========== OPERATIONAL REALITY — pre-HRMS pain-point cards ========== */}
      <HrmsOperationalReality />

      {/* ========== WHY GENERALIST TOOLS FALL SHORT — office vs. office+floor ========== */}
      <HrmsWhyGeneralistFallsShort />

      {/* ========== UPWON'S APPROACH — factory + office + franchise → one core ========== */}
      <HrmsApproach />

      {/* ========== CORE CAPABILITIES — 7 lifecycle capability cards ========== */}
      <HrmsCoreCapabilities />

      {/* ========== CONNECTED BY DESIGN — HR ↔ ERP data-model flow ========== */}
      <HrmsConnectedByDesign />

      {/* ========== ONE SUITE, NOT SIX VENDORS — HREasy hub + suite spokes ========== */}
      <HrmsOneSuite />

      {/* ========== BUILT FOR EVERY KIND OF EMPLOYEE — per-workforce tabs ========== */}
      <HrmsWorkforceTabs />

      {/* ========== MODULE VERSIONS & GROWTH PATH — Core / Pro / Plus pricing ========== */}
      <HrmsPricing />

      {/* ========== IMPLEMENTATION & PARTNERSHIP — payroll migration carousel ========== */}
      <HrmsImplementation />

      {/* ========== SECURE, COMPLIANT, ACCOUNTABLE — statutory compliance + carousel ========== */}
      <HrmsSecurity />

      {/* ========== UPWON VS ALTERNATIVES — workforce-shape comparison table ========== */}
      <HrmsComparison />

      {/* ========== CUSTOMER OUTCOMES — named case studies ========== */}
      <HrmsOutcomes />

      {/* ========== FAQ — migration & compliance questions ========== */}
      <HrmsFaq />

      {/* ========== FINAL CTA — low-pressure workforce conversation ========== */}
      <HrmsFinalCta />
    </>
  );
}
