import { useEffect, useState } from 'react';
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
import {
  fetchWmsCapabilitiesSection,
  fetchWmsCtaSection,
  fetchWmsFaqSection,
  fetchWmsHeroSlides,
  fetchWmsOutcomesSection,
  fetchWmsProofSection,
  fetchWmsRecognitionSection,
} from '../../lib/wmsPage.js';

/*
  Dedicated UPWON WMS landing page — its own page (like PosPage / HrmsPage /
  ErpPage / FmsPage) so the food/FMCG warehouse story (batch, shelf life, FEFO,
  cold-chain) can be built out section by section, independent of the shared
  dynamic ProductPage. Routed at /products/wms. Each section is its own
  component under components/sections (WmsXxx.jsx).
*/

export default function WmsPage() {
  const product = findProductBySlug('wms');

  const [cmsSlides, setCmsSlides] = useState(null);
  const [faq, setFaq] = useState(null);
  const [cta, setCta] = useState(null);
  const [proof, setProof] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [capabilities, setCapabilities] = useState(null);
  const [outcomes, setOutcomes] = useState(null);

  /*
    The fetches live on the page rather than inside the components themselves:
    HeroSlider is shared with several other pages, and keeping the fetch here
    is what stops one page's content following a shared component onto another.
  */
  useEffect(() => {
    let cancelled = false;

    fetchWmsHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setCmsSlides(slides);
    });
    fetchWmsProofSection().then((section) => {
      if (!cancelled && section) setProof(section);
    });
    fetchWmsRecognitionSection().then((section) => {
      if (!cancelled && section) setRecognition(section);
    });
    fetchWmsCapabilitiesSection().then((section) => {
      if (!cancelled && section) setCapabilities(section);
    });
    fetchWmsOutcomesSection().then((section) => {
      if (!cancelled && section) setOutcomes(section);
    });
    fetchWmsFaqSection().then((section) => {
      if (!cancelled && section) setFaq(section);
    });
    fetchWmsCtaSection().then((section) => {
      if (!cancelled && section) setCta(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);
  if (!product) return <Navigate to="/platform" replace />;

  const theme = getPlatformTheme('wms');
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
      <WmsProofStrip section={proof} />

      {/* ========== RECOGNITION — warehouse-type category map ========== */}
      <WmsRecognition section={recognition} />

      {/* ========== OPERATIONAL REALITY — automate promise + daily pain-points ========== */}
      <WmsOperationalReality />

      {/* ========== UPWON'S APPROACH — food-grade warehouse flow ========== */}
      <WmsApproach />

      <WmsCoreCapabilities section={capabilities} />

      <WmsConnectedByDesign/>

      <WmsSectionReady />

      <WmsCategoryDepth />

      <WmsClientRecognition section={outcomes} />

      <WmsFaqSection section={faq} />

      <WmsCta section={cta} />
    </>
  );
}
