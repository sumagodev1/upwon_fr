import { Navigate } from 'react-router-dom';
import HeroSlider from '../components/ui/HeroSlider.jsx';
import VmsProofStrip from '../components/sections/VmsProofStrip.jsx';
import VmsRecognition from '../components/sections/VmsRecognition.jsx';
import VmsOperationalReality from '../components/sections/VmsOperationalReality.jsx';
import VmsApproch from '../components/sections/VmsApproch.jsx';
import VmsCoreCapabilities from '../components/sections/VmsCoreCapabilities.jsx';
import Seo, { productJsonLd, breadcrumbJsonLd } from '../components/common/Seo.jsx';
import { getPlatformTheme, findProductBySlug } from '../data/modules.js';

/*
  Dedicated UPWON WMS landing page — its own page (like PosPage / HrmsPage /
  ErpPage / FmsPage) so the food/FMCG warehouse story (batch, shelf life, FEFO,
  cold-chain) can be built out section by section, independent of the shared
  dynamic ProductPage. Routed at /products/wms. Each section is its own
  component under components/sections (WmsXxx.jsx).
*/

export default function VmsPage() {
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
      <VmsProofStrip />

      <VmsRecognition />

      <VmsOperationalReality />

      <VmsApproch />

      <VmsCoreCapabilities />

    </>
  );
}
