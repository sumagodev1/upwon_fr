import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import FmsProofStrip from './sections/FmsProofStrip/FmsProofStrip.jsx';
import FranchiseCategories from './sections/FranchiseCategories/FranchiseCategories.jsx';
import IndustriesVideoIntro from '../../components/shared/IndustriesVideoIntro/IndustriesVideoIntro.jsx';
import UpwonApproach from './sections/UpwonApproach/UpwonApproach.jsx';
import PlatformIntegrationsHub from '../../components/shared/PlatformIntegrationsHub/PlatformIntegrationsHub.jsx';
import FmsConnectedFlow from './sections/FmsConnectedFlow/FmsConnectedFlow.jsx';
import FmsGrowthPath from './sections/FmsGrowthPath/FmsGrowthPath.jsx';
import FmsImplementation from './sections/FmsImplementation/FmsImplementation.jsx';
import FmsSecurity from './sections/FmsSecurity/FmsSecurity.jsx';
import FmsVsAlternatives from './sections/FmsVsAlternatives/FmsVsAlternatives.jsx';
import FmsCustomerOutcomes from './sections/FmsCustomerOutcomes/FmsCustomerOutcomes.jsx';
import IndustryFaq from '../../components/shared/IndustryFaq/IndustryFaq.jsx';
import FmsFinalCta from './sections/FmsFinalCta/FmsFinalCta.jsx';
import Seo, { productJsonLd, breadcrumbJsonLd } from '../../components/shared/Seo/Seo.jsx';
import HeadingLines from '../../components/shared/HeadingLines/HeadingLines.jsx';
import { getPlatformTheme, findProductBySlug } from '../../data/modules.js';
import {
  fetchFmsCtaSection,
  fetchFmsFaqSection,
  fetchFmsHeroSlides,
} from '../../lib/fmsPage.js';

/*
  Dedicated UPWON FMS landing page — its own page (like ErpPage / SfaDmsPage) so
  the franchise-management experience can be built out section by section,
  independent of the shared dynamic ProductPage. Routed at /products/fms.
*/

// Objections pulled from franchisor ICP research — price-as-add-on framing,
// rollout-disruption fear, franchisee tech-resistance, data security, phasing.
//
// The fallback now: the published list is the CMS's, and this is what the page
// shows while the fetch is in flight, during the SSG build, and whenever the
// API is unreachable.
const FMS_FAQS = [
  {
    q: 'We already pay for a POS — why do we need this too?',
    a: 'A POS rings up sales at one counter. UpWon FMS is the franchise operating system around it — royalty and brand-fee capture, outlet-level P&L, replenishment from your central kitchen, SOP and brand-standard scoring, and network-wide visibility. The POS becomes one connected piece of that picture, not the whole thing. If your POS already works, we connect to it rather than rip it out.',
  },
  {
    q: 'Will our outlets face any billing disruption during rollout?',
    a: 'No. Rollout is phased outlet by outlet, and each outlet keeps billing on its current setup until its go-live is confirmed. We run the new flow in parallel, reconcile the numbers, then switch over — so there is no day where an outlet cannot take an order or raise a bill.',
  },
  {
    q: 'Our franchisees have very different comfort levels with technology — will onboarding work for all of them?',
    a: 'Yes. Outlet and field staff get a guided, mostly tap-based app that works offline and syncs when there is network. We onboard region by region with hands-on training, in-app help and a hyper-care period after each launch — so a tech-shy franchisee and a tech-savvy one both reach the same place.',
  },
  {
    q: 'Is our royalty and franchisee financial data secure?',
    a: 'Royalty and franchisee financials sit behind role-based access, encrypted in transit and at rest, with a full audit trail of who viewed or changed what. Each franchisee sees only their own numbers; head office sees the network. Nobody sees data they are not entitled to.',
  },
  {
    q: 'Can we start with just POS and add royalty/compliance later?',
    a: 'Yes — that is the intended path. Many networks start with POS and outlet visibility, then switch on royalty, compliance scoring and central-kitchen replenishment when they are ready. Because everything shares one data model, adding a module later is a configuration step, not a re-implementation.',
  },
  {
    q: 'How fast can you adapt as our franchise model evolves?',
    a: 'Most changes are configuration, not custom code — new royalty structures, fee slabs, outlet formats (COCO / FOFO / COFO / FOCO), regions and SOP checklists are settings you adjust as you grow. When something genuinely new comes up, our team turns it around without a ground-up rebuild.',
  },
];

/**
 * The three CMS-backed sections are read here rather than inside their
 * components: HeroSlider and IndustryFaq are shared with several other pages,
 * and FmsFinalCta only renders here - so keeping the fetch on the page is what
 * stops this page's content following the shared components elsewhere.
 *
 * Each section falls back on its own. An empty slide list keeps the built-in
 * slider; a null FAQ or band keeps the copy the page ships. The fetches are
 * guarded inside lib/fmsPage.js, so the SSG build never makes them and the
 * prerendered HTML stays the site's own content.
 */
export default function FmsPage() {
  const product = findProductBySlug('fms');

  const [cmsSlides, setCmsSlides] = useState(null);
  const [faq, setFaq] = useState(null);
  const [cta, setCta] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchFmsHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setCmsSlides(slides);
    });
    fetchFmsFaqSection().then((section) => {
      if (!cancelled && section) setFaq(section);
    });
    fetchFmsCtaSection().then((section) => {
      if (!cancelled && section) setCta(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!product) return <Navigate to="/platform" replace />;

  const theme = getPlatformTheme('fms');
  // The accent is the platform's, not the slide's, so it is applied to whichever
  // list is in play.
  const heroSlides = (cmsSlides ?? product.heroSlides ?? []).map((s) => ({
    accent: theme.accent,
    ...s,
  }));

  const seoTitle = product.seoTitle || `${product.code} — ${product.hero}`;
  const seoDesc = product.metaDescription || product.description;
  const breadcrumbItems = [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/platform' },
    { name: product.code, to: '/products/fms' },
  ];

  return (
    <div className="fms-wide">
      <Seo
        title={seoTitle}
        description={seoDesc}
        canonical="https://upwon.in/products/fms"
        type="product"
        jsonLd={[
          productJsonLd({ name: product.code, description: seoDesc, slug: 'fms' }),
          breadcrumbJsonLd(breadcrumbItems),
        ]}
      />

      {/* ========== HERO — 4 rotating franchise value lines over fms_hero art ========== */}
      <HeroSlider slides={heroSlides} variant="dark" intervalMs={4000} topPad="pt-32 md:pt-40" />

      {/* ========== PROOF STRIP — brand wall + franchise stat cards ========== */}
      <FmsProofStrip />

      {/* ========== RECOGNITION — franchise sub-category models ========== */}
      <FranchiseCategories />

      {/* ========== VIDEO PRESENTATION — the franchise operating system in action ========== */}
      <IndustriesVideoIntro
        eyebrow="See It in Action"
        heading={
          <>
            It&apos;s Not Just Software —{' '}
            <span className="gradient-text-orange">It&apos;s Your Franchise Operating System.</span>
          </>
        }
        subtext="See how one system runs ordering, royalty, replenishment and brand standards across every outlet — with head office in full control."
        video="/video/video_test.mp4"
      />

      {/* ========== UPWON'S APPROACH — models · stages · ecosystem · integrations ========== */}
      <UpwonApproach />

      {/* ========== PLATFORM INTEGRATIONS — pre-built integration sphere ========== */}
      <PlatformIntegrationsHub
        eyebrow="Platform Integrations"
        title={
          <>
            One System —{' '}
            <span className="gradient-text-orange">with Pre-Built Integrations.</span>
          </>
        }
        description="UpWon FMS connects out of the box to the payments, delivery, accounting and enterprise systems your network already runs on — so franchise operations, royalty and reporting all draw from one connected source of truth."
      />

      {/* ========== CONNECTED BY DESIGN — one sale through four stages ========== */}
      <FmsConnectedFlow />

      {/* ========== MODULE VERSIONS & GROWTH PATH — CORE / PRO / PLUS tiers ========== */}
      <FmsGrowthPath />

      {/* ========== IMPLEMENTATION & PARTNERSHIP — phased rollout stepper ========== */}
      <FmsImplementation />

      {/* ========== SECURE, COMPLIANT, ACCOUNTABLE — data protection & compliance ========== */}
      <FmsSecurity />

      {/* ========== UPWON VS THE ALTERNATIVES — honest comparison ========== */}
      <FmsVsAlternatives />

      {/* ========== CUSTOMER OUTCOMES — named case-study carousel ========== */}
      <FmsCustomerOutcomes />

      {/* ========== FAQ — franchisor objections ========== */}
      {faq ? (
        <IndustryFaq
          faqs={faq.faqs}
          {...(faq.eyebrow ? { eyebrow: faq.eyebrow } : {})}
          title={<HeadingLines lines={faq.headingLines} />}
          description={faq.subtext}
        />
      ) : (
        <IndustryFaq
          faqs={FMS_FAQS}
          eyebrow="FAQ"
          title={
            <>
              Questions Franchisors{' '}
              <span className="gradient-text-orange">Ask Before They Commit.</span>
            </>
          }
          description="Pulled straight from the objections franchisors raise — price-as-add-on, rollout disruption, franchisee resistance — not generic FAQ boilerplate."
        />
      )}

      {/* ========== FINAL CTA — 30-minute conversation ========== */}
      <FmsFinalCta section={cta} />
    </div>
  );
}
