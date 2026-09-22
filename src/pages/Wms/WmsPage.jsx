import { Navigate } from 'react-router-dom';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import WmsProofStrip from './sections/WmsProofStrip/WmsProofStrip.jsx';
import WmsRecognition from './sections/WmsRecognition/WmsRecognition.jsx';
import WmsOperationalReality from './sections/WmsOperationalReality/WmsOperationalReality.jsx';
import WmsApproach from './sections/WmsApproach/WmsApproach.jsx';
import WmsCoreCapabilities from './sections/WmsCoreCapabilities/WmsCoreCapabilities.jsx';
import WmsConnectedByDesign from './sections/WmsConnectedByDesign/WmsConnectedByDesign.jsx';
import WmsCategoryDepth from './sections/WmsCategoryDepth/WmsCategoryDepth.jsx';
import WmsFaqSection from './sections/WmsFaqSection/WmsFaqSection.jsx';
import WmsSectionReady from './sections/WmsSectionReady/WmsSectionReady.jsx';
import WmsCta from './sections/WmsCta/WmsCta.jsx';
import WmsClientRecognition from './sections/WmsClientRecognition/WmsClientRecognition.jsx';
import Seo, { productJsonLd, breadcrumbJsonLd } from '../../components/shared/Seo/Seo.jsx';
import { getPlatformTheme, findProductBySlug } from '../../data/modules.js';

/*
  Dedicated UPWON WMS landing page — its own page (like PosPage / HrmsPage /
  ErpPage / FmsPage) so the food/FMCG warehouse story (batch, shelf life, FEFO,
  cold-chain) can be built out section by section, independent of the shared
  dynamic ProductPage. Routed at /products/wms. Each section is its own
  component under components/sections (WmsXxx.jsx).
*/

export default function WmsPage() {
  const product = findProductBySlug('wms');
  if (!product) return <Navigate to="/platform" replace />;

  const theme = getPlatformTheme('wms');
  const heroSlides = (product.heroSlides || []).map((s) => ({ accent: theme.accent, ...s }));

  const seoTitle = product.seoTitle || `${product.code} — ${product.hero}`;
  const seoDesc = product.metaDescription || product.description;
  const breadcrumbItems = [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/platform' },
    { name: product.code, to: '/products/wms' },
  ];

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDesc}
        canonical="https://upwon.in/products/wms"
        type="product"
        jsonLd={[
          productJsonLd({ name: product.code, description: seoDesc, slug: 'wms' }),
          breadcrumbJsonLd(breadcrumbItems),
        ]}
      />

      {/* ========== HERO — 5 rotating food/FMCG warehouse value lines ========== */}
      <HeroSlider slides={heroSlides} variant="dark" intervalMs={4000} topPad="pt-32 md:pt-40" />

      {/* ========== PROOF STRIP — vertically auto-scrolling sourced stat cards ========== */}
      <WmsProofStrip />

      {/* ========== RECOGNITION — warehouse-type category map ========== */}
      <WmsRecognition />

      {/* ========== OPERATIONAL REALITY — automate promise + daily pain-points ========== */}
      <WmsOperationalReality />

      {/* ========== UPWON'S APPROACH — food-grade warehouse flow ========== */}
      <WmsApproach />

      <WmsCoreCapabilities/>

      <WmsConnectedByDesign/>

      <WmsSectionReady />

      <WmsCategoryDepth />

      <WmsClientRecognition />

      <WmsFaqSection />

      <WmsCta />
    </>
  );
}
