// HomePage section order maps every section to one stage of the buyer journey
// (the funnel table in the UX brief):
//
//   AWARENESS  — name the pain, show you understand their world
//                → hero · trust strip · pain-recognition / "what it is"
//   INTEREST   — educate, demonstrate domain depth, build trust
//                → UpWon Universe · module deck · differentiator · video · social proof
//   EVALUATION — proof, help them build the business case
//                → case studies · ROI calculator + vendor comparison + self-eval
//   CONVERSION — remove friction, reduce risk: book demo · call · WhatsApp
//                → handled site-wide (sticky bar, footer CTA, floating actions in
//                  RootLayout) plus the inline demo CTAs every section carries.
//
// Sections intentionally left out of this funnel (awards/testimonials/industry-
// expertise duplicated another section's job; implementation-timeline /
// integrations live at the wrong stage) still render on their dedicated pages.
import { lazy, Suspense } from 'react';
// Above-the-fold sections stay eager — they paint immediately (HeroSection is
// the LCP). Everything below the fold is code-split and mounted off the
// critical path via <Deferred> (idle / first scroll), so the initial bundle
// stays small and the below-fold framer-motion trees don't hydrate on load.
import HeroSection from '../components/sections/HeroSection.jsx';
// Old trust sections — replaced by the combined <TrustSection/> below.
import HeroStatsBand from '../components/sections/HeroStatsBand.jsx';
// import TrustStripText from '../components/sections/TrustStripText.jsx';
import TrustSection from '../components/sections/TrustSection.jsx';
import WhatIsUpwonIntro from '../components/sections/WhatIsUpwonIntro.jsx';
import IndustryFaq from '../components/sections/IndustryFaq.jsx';
import { FAQS } from '../components/sections/FaqSection.jsx';
import PlatformIntegrationsHub from '../components/sections/PlatformIntegrationsHub.jsx';
import ComparisonSection from '../components/sections/ComparisonSection.jsx';
import Deferred from '../components/common/Deferred.jsx';
import Seo, { orgJsonLd, localBusinessJsonLd } from '../components/common/Seo.jsx';

// Lazy chunks, declared in render (= funnel) order.
const ConcentricRings = lazy(() => import('../components/sections/ConcentricRings.jsx'));
const MarketFragmentationBars = lazy(() => import('../components/sections/MarketFragmentationBars.jsx'));
const AiPlatformFinder = lazy(() => import('../components/sections/AiPlatformFinder.jsx'));
const IndustriesVideoIntro = lazy(() => import('../components/sections/IndustriesVideoIntro.jsx'));
const ValuesWorkCulture = lazy(() => import('../components/sections/ValuesWorkCulture.jsx'));
const HomeCtaSection = lazy(() => import('../components/sections/HomeCtaSection.jsx'));
const WhoWeAreSection = lazy(() => import('../components/sections/WhoWeAreSection.jsx'));
const IndustrySolutionsSection = lazy(() => import('../components/sections/IndustrySolutionsSection.jsx'));
const IndustrySelector = lazy(() => import('../components/sections/IndustrySelector.jsx'));
const ModuleShowcaseSection = lazy(() => import('../components/sections/ModuleShowcaseSection.jsx'));
const WhyUpWonZigzag = lazy(() => import('../components/sections/WhyUpWonZigzag.jsx'));
const VideoShowcaseSection = lazy(() => import('../components/sections/VideoShowcaseSection.jsx'));
const MetricsSection = lazy(() => import('../components/sections/MetricsSection.jsx'));
const CaseStudyHighlight = lazy(() => import('../components/sections/CaseStudyHighlight.jsx'));
const InteractiveToolsSection = lazy(() => import('../components/sections/InteractiveToolsSection.jsx'));
const VideoTestimonials = lazy(() => import('../components/sections/VideoTestimonials.jsx'));
const HomeFinalCta = lazy(() => import('../components/sections/HomeFinalCta.jsx'));

export default function HomePage() {
  return (
    <>
      <Seo
        title="Outdo. Scale. Win. — Enterprise Suite for Food & FMCG"
        description="UpWon is India's enterprise suite for food manufacturers, FMCG companies and franchise networks. Production, distribution, HR and finance on one platform — built for food, live in 30 days."
        canonical="https://upwon.in/"
        jsonLd={[orgJsonLd, localBusinessJsonLd]}
      />

      {/* ===== AWARENESS — name the pain, show you understand their world.
              Above the fold, eager (HeroSection is the LCP). ===== */}
      <HeroSection />              {/* Hero slider — 4 ICP slides */}
      <TrustSection />            {/* Trust — rating + brand marquee + stats */}
      {/* <HeroStatsBand />           Scale stats — relocated out of the hero */}
      {/* <TrustStripText />          Customer brand strip — plain-text marquee */}

      {/* UPWON Universe — orbit diagram + ring cards, side by side. */}
      {/* <Deferred>
        <Suspense fallback={null}>
          <ConcentricRings />
        </Suspense>
      </Deferred> */}


      {/* Below the fold — code-split + deferred off the critical path. Mounts
          on idle / first scroll, so by the time the visitor reaches these
          they're already rendered. ===== */}


      {/* Chaos-vs-unified draggable comparison. */}
      <ComparisonSection />

      {/* Fragmented market — five category leaders, none do all five. */}
      <Deferred>
        <Suspense fallback={null}>
          <MarketFragmentationBars />
        </Suspense>
      </Deferred>

      {/* Industries video intro — heading + product video, above "Your System". */}
      <Deferred>
        <Suspense fallback={null}>
          <IndustriesVideoIntro />
        </Suspense>
      </Deferred>

      {/* AI platform finder — conversational 3-question recommender ("Your System"). */}
      <Deferred>
        <Suspense fallback={null}>
          <AiPlatformFinder />
        </Suspense>
      </Deferred>

      {/* Case studies — "The proof is in the numbers." */}
      {/* <Deferred>
        <Suspense fallback={null}>
          <CaseStudyHighlight />
        </Suspense>
      </Deferred> */}

    

      {/* Industry solutions — "Built for the way your business actually runs." */}
      <Deferred>
        <Suspense fallback={null}>
          <IndustrySolutionsSection />
        </Suspense>
      </Deferred>

      {/* Values & work culture — "Our customers appreciate us." */}
      <Deferred>
        <Suspense fallback={null}>
          <ValuesWorkCulture />
        </Suspense>
      </Deferred>

        {/* Who we are — Made in India, for the world (world-map artwork). */}
      <Deferred>
        <Suspense fallback={null}>
          <WhoWeAreSection />
        </Suspense>
      </Deferred>



      {/* Platform integrations hub — sits above the FAQ. */}
      <PlatformIntegrationsHub />

      {/* Plain white gap before the dark case-studies section. */}
      <div className="h-14 bg-white md:h-24" />

      {/* Case studies — "The proof is in the numbers." */}
      <Deferred>
        <Suspense fallback={null}>
          <CaseStudyHighlight />
        </Suspense>
      </Deferred>



      {/* Video testimonials — customer stories carousel, above the FAQ. */}
      <Deferred>
        <Suspense fallback={null}>
          <VideoTestimonials />
        </Suspense>
      </Deferred>

      {/* FAQ — buyer questions, directly above the stats band. */}
      <IndustryFaq
        faqs={FAQS}
        eyebrow="UpWon · Questions Before You Commit"
        title={
          <>
            The questions buyers ask us about this{' '}
            <span className="gradient-text-orange">platform.</span>
          </>
        }
      />

      {/* Report-download CTA — sits below the FAQ, above the footer. */}
      <Deferred>
        <Suspense fallback={null}>
          <HomeFinalCta />
        </Suspense>
      </Deferred>

      {/* Scale stats band — sits directly above the site-wide footer. */}
      {/* <HeroStatsBand /> */}

      {/* Final CTA — sits directly above the site-wide footer. */}
      {/* <Deferred>
        <Suspense fallback={null}>
          <HomeCtaSection />
        </Suspense>
      </Deferred> */}

      {/* ===== CONVERSION — book demo / call / WhatsApp. Rendered site-wide by
              RootLayout (sticky "Book Demo" bar, footer CTA, WhatsApp + Phone
              floating actions) and reinforced by the inline demo CTA each
              section above already carries. ===== */}
    </>
  );
}





// // HomePage section order maps every section to one stage of the buyer journey
// // (the funnel table in the UX brief):
// //
// //   AWARENESS  — name the pain, show you understand their world
// //                → hero · trust strip · pain-recognition / "what it is"
// //   INTEREST   — educate, demonstrate domain depth, build trust
// //                → UpWon Universe · module deck · differentiator · video · social proof
// //   EVALUATION — proof, help them build the business case
// //                → case studies · ROI calculator + vendor comparison + self-eval
// //   CONVERSION — remove friction, reduce risk: book demo · call · WhatsApp
// //                → handled site-wide (sticky bar, footer CTA, floating actions in
// //                  RootLayout) plus the inline demo CTAs every section carries.
// //
// // Sections intentionally left out of this funnel (awards/testimonials/industry-
// // expertise duplicated another section's job; implementation-timeline /
// // integrations live at the wrong stage) still render on their dedicated pages.
// import { lazy, Suspense } from 'react';
// // Above-the-fold sections stay eager — they paint immediately (HeroSection is
// // the LCP). Everything below the fold is code-split and mounted off the
// // critical path via <Deferred> (idle / first scroll), so the initial bundle
// // stays small and the below-fold framer-motion trees don't hydrate on load.
// import HeroSection from '../components/sections/HeroSection.jsx';
// // Old trust sections — replaced by the combined <TrustSection/> below.
// import HeroStatsBand from '../components/sections/HeroStatsBand.jsx';
// // import TrustStripText from '../components/sections/TrustStripText.jsx';
// import TrustSection from '../components/sections/TrustSection.jsx';
// import WhatIsUpwonIntro from '../components/sections/WhatIsUpwonIntro.jsx';
// import IndustryFaq from '../components/sections/IndustryFaq.jsx';
// import { FAQS } from '../components/sections/FaqSection.jsx';
// import PlatformIntegrationsHub from '../components/sections/PlatformIntegrationsHub.jsx';
// import ComparisonSection from '../components/sections/ComparisonSection.jsx';
// import Deferred from '../components/common/Deferred.jsx';
// import Seo, { orgJsonLd, localBusinessJsonLd } from '../components/common/Seo.jsx';

// // Lazy chunks, declared in render (= funnel) order.
// const ConcentricRings = lazy(() => import('../components/sections/ConcentricRings.jsx'));
// const IndustrySelector = lazy(() => import('../components/sections/IndustrySelector.jsx'));
// const ModuleShowcaseSection = lazy(() => import('../components/sections/ModuleShowcaseSection.jsx'));
// const WhyUpWonZigzag = lazy(() => import('../components/sections/WhyUpWonZigzag.jsx'));
// const VideoShowcaseSection = lazy(() => import('../components/sections/VideoShowcaseSection.jsx'));
// const MetricsSection = lazy(() => import('../components/sections/MetricsSection.jsx'));
// const CaseStudyHighlight = lazy(() => import('../components/sections/CaseStudyHighlight.jsx'));
// const InteractiveToolsSection = lazy(() => import('../components/sections/InteractiveToolsSection.jsx'));

// export default function HomePage() {
//   return (
//     <>
//       <Seo
//         title="Outdo. Scale. Win. — Enterprise Suite for Food & FMCG"
//         description="UpWon is India's enterprise suite for food manufacturers, FMCG companies and franchise networks. Production, distribution, HR and finance on one platform — built for food, live in 30 days."
//         canonical="https://upwon.in/"
//         jsonLd={[orgJsonLd, localBusinessJsonLd]}
//       />

//       {/* ===== AWARENESS — name the pain, show you understand their world.
//               Above the fold, eager (HeroSection is the LCP). ===== */}
//       <HeroSection />              {/* Hero slider — 4 ICP slides */}
//       {/* <HeroStatsBand />           Scale stats — relocated out of the hero */}
//       {/* <TrustStripText />          Customer brand strip — plain-text marquee */}
//       {/* <TrustSection />            Combined trust — rating + brands + stats */}
//       <WhatIsUpwonIntro />        {/* Pain Recognition + "what UpWon is" */}

//       {/* Below the fold — code-split + deferred off the critical path. Mounts
//           on idle / first scroll, so by the time the visitor reaches these
//           they're already rendered. ===== */}
//       <Deferred>
//         <Suspense fallback={null}>
//           {/* ===== INTEREST — educate, demonstrate domain depth, build trust ===== */}
//           <ConcentricRings />        {/* UpWon Universe — deepest in food */}
//           <IndustrySelector />       {/* Industry selector — relevance engine */}
//           <ModuleShowcaseSection />  {/* Module-level deep dive — educate */}
//           <WhyUpWonZigzag />         {/* Differentiator — why not SAP / Tally */}
//           <VideoShowcaseSection />   {/* Watch video — product tour + customer stories */}
//           {/* <MetricsSection />         Social proof — counters + logos + rating */}

//           {/* ===== EVALUATION — proof, build the business case ===== */}
//           <CaseStudyHighlight />     {/* Case studies — the proof in numbers */}
//           <InteractiveToolsSection />
//         </Suspense>
//       </Deferred>

//       {/* Chaos-vs-unified draggable comparison. */}
//       <ComparisonSection />

//       {/* Platform integrations hub — sits above the FAQ. */}
//       <PlatformIntegrationsHub />

//       {/* FAQ — buyer questions, directly above the stats band. */}
//       <IndustryFaq
//         faqs={FAQS}
//         eyebrow="UpWon · Questions Before You Commit"
//         title={
//           <>
//             The questions buyers ask us about this{' '}
//             <span className="gradient-text-orange">platform.</span>
//           </>
//         }
//       />

//       {/* Scale stats band — sits directly above the site-wide footer. */}
//       <HeroStatsBand />

//       {/* ===== CONVERSION — book demo / call / WhatsApp. Rendered site-wide by
//               RootLayout (sticky "Book Demo" bar, footer CTA, WhatsApp + Phone
//               floating actions) and reinforced by the inline demo CTA each
//               section above already carries. ===== */}
//     </>
//   );
// }
