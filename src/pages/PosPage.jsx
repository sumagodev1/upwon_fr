import { Navigate } from 'react-router-dom';
import HeroSlider from '../components/ui/HeroSlider.jsx';
import PosProofStrip from '../components/sections/PosProofStrip.jsx';
import PosRecognition from '../components/sections/PosRecognition.jsx';
import IndustriesVideoIntro from '../components/sections/IndustriesVideoIntro.jsx';
import PosApproach from '../components/sections/PosApproach.jsx';
import PosCoreCapabilities from '../components/sections/PosCoreCapabilities.jsx';
import PosConnectedByDesign from '../components/sections/PosConnectedByDesign.jsx';
import PosGrowthPath from '../components/sections/PosGrowthPath.jsx';
import PosImplementation from '../components/sections/PosImplementation.jsx';
import PosSecurity from '../components/sections/PosSecurity.jsx';
import PosVsAlternatives from '../components/sections/PosVsAlternatives.jsx';
import PosCustomerOutcomes from '../components/sections/PosCustomerOutcomes.jsx';
import IndustryFaq from '../components/sections/IndustryFaq.jsx';
import PosFinalCta from '../components/sections/PosFinalCta.jsx';
import Seo, { productJsonLd, breadcrumbJsonLd } from '../components/common/Seo.jsx';
import { getPlatformTheme, findProductBySlug } from '../data/modules.js';

/*
  Dedicated UPWON POS landing page — its own page (like ErpPage / FmsPage) so the
  retail/F&B counter experience can be built out section by section, independent
  of the shared dynamic ProductPage. Routed at /products/pos.
*/

// Concrete, counter-level questions a retail / F&B owner actually asks — not
// enterprise-style due diligence.
const POS_FAQS = [
  {
    q: 'What hardware do I need?',
    a: 'Very little. UpWon POS runs on a standard Android tablet or a Windows/Android billing machine you may already own. Add a thermal printer, cash drawer and barcode scanner if you want them — we support common brands like Epson, Zebra, Honeywell and iMin. No proprietary hardware to buy, and no lock-in.',
  },
  {
    q: 'Does it work if my internet goes down?',
    a: 'Yes. Billing keeps running in offline mode, so your counter never stops during a network drop. Sales, stock deduction and reports sync automatically the moment your connection is back — nothing is lost and no one has to re-enter anything.',
  },
  {
    q: 'Can I connect Zomato and Swiggy orders directly?',
    a: 'Yes. Online orders from Zomato and Swiggy flow into the same screen as your counter sales, so your team bills, tracks stock and reads food cost from one place — not three. No separate tablets to watch, no manual re-punching of aggregator orders.',
  },
  {
    q: 'Can I start with just POS and add more later?',
    a: 'That is exactly how it is designed. Start with Core POS today and move up to PRO or PLUS — or into full UpWon ERP and FMS — without re-platforming or re-entering a single record. Your data and history carry forward as you grow.',
  },
  {
    q: 'Is it GST-compliant out of the box?',
    a: 'Yes. GST rules, HSN-wise reporting and e-invoicing are built in, not bolted on. Invoices are compliant by default, so you are not doing manual work at month-end to stay on the right side of tax.',
  },
  {
    q: 'How long does setup actually take?',
    a: 'Most counters go live in days, not months. We handle setup, catalogue and recipe configuration, staff training and go-live with you — then stay on for ongoing support. For a single outlet it is typically a matter of a short, guided onboarding rather than a long IT project.',
  },
];

export default function PosPage() {
  const product = findProductBySlug('pos');
  if (!product) return <Navigate to="/platform" replace />;

  const theme = getPlatformTheme('pos');
  const heroSlides = (product.heroSlides || []).map((s) => ({ accent: theme.accent, ...s }));

  const seoTitle = product.seoTitle || `${product.code} — ${product.hero}`;
  const seoDesc = product.metaDescription || product.description;
  const breadcrumbItems = [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/platform' },
    { name: product.code, to: '/products/pos' },
  ];

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDesc}
        canonical="https://upwon.in/products/pos"
        type="product"
        jsonLd={[
          productJsonLd({ name: product.code, description: seoDesc, slug: 'pos' }),
          breadcrumbJsonLd(breadcrumbItems),
        ]}
      />

      {/* ========== HERO — 5 rotating counter-level value lines over pos_hero art ========== */}
      <HeroSlider slides={heroSlides} variant="dark" intervalMs={4000} topPad="pt-32 md:pt-40" />

      {/* ========== PROOF STRIP — logo marquee + counter-level stats ========== */}
      <PosProofStrip />

      {/* ========== RECOGNITION — counter-type category map ========== */}
      <PosRecognition />

      {/* ========== VIDEO PRESENTATION — retail sales growth engine ========== */}
      <IndustriesVideoIntro
        eyebrow="See It in Action"
        heading={
          <>
            It&apos;s Not Just a POS —{' '}
            <span className="gradient-text-orange">It&apos;s a Retail Sales Growth Engine.</span>
          </>
        }
        subtext="See how one screen runs your counter, your kitchen and your stock — and turns every sale into growth."
        video="/video/video_test.mp4"
      />

      {/* ========== UPWON'S APPROACH — one-data-core flow diagram ========== */}
      <PosApproach />

      {/* ========== CORE CAPABILITIES — tabbed capability explorer ========== */}
      <PosCoreCapabilities />

      {/* ========== CONNECTED BY DESIGN — one sale through connected stages ========== */}
      <PosConnectedByDesign />

      {/* ========== MODULE VERSIONS & GROWTH PATH — CORE / PRO / PLUS tiers ========== */}
      <PosGrowthPath />

      {/* ========== IMPLEMENTATION & PARTNERSHIP — setup-to-success timeline ========== */}
      <PosImplementation />

      {/* ========== SECURE, COMPLIANT, ACCOUNTABLE — compliance + data ownership ========== */}
      <PosSecurity />

      {/* ========== UPWON VS THE ALTERNATIVES — honest comparison ========== */}
      <PosVsAlternatives />

      {/* ========== CUSTOMER OUTCOMES — U2 Cake case study + Kaka Halwai proof ========== */}
      <PosCustomerOutcomes />

      {/* ========== FAQ — practical counter-level objections ========== */}
      <IndustryFaq
        faqs={POS_FAQS}
        eyebrow="FAQ"
        title={
          <>
            Questions Retail &amp; F&amp;B Owners{' '}
            <span className="gradient-text-orange">Ask Before They Commit.</span>
          </>
        }
        description="Concrete, operational answers — hardware, offline billing, aggregator orders, GST and go-live time — not enterprise-style due diligence."
      />

      {/* ========== FINAL CTA — 30-minute counter conversation ========== */}
      <PosFinalCta />
    </>
  );
}
