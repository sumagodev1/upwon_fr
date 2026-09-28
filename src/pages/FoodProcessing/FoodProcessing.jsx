import { useEffect, useState } from 'react';
import FoodProcessingHeroSection from './sections/FoodProcessingHeroSection/FoodProcessingHeroSection.jsx';
import FoodProcessingProofStrip from './sections/FoodProcessingProofStrip/FoodProcessingProofStrip.jsx';
import FoodProcessingChallengeSection from './sections/FoodProcessingChallengeSection/FoodProcessingChallengeSection.jsx';
import FoodProcessingOperationalChallenges from './sections/FoodProcessingOperationalChallenges/FoodProcessingOperationalChallenges.jsx';
import FoodProcessingHowUpwonHelps from './sections/FoodProcessingHowUpwonHelps/FoodProcessingHowUpwonHelps.jsx';
import FoodProcessingCoreCapabilities from './sections/FoodProcessingCoreCapabilities/FoodProcessingCoreCapabilities.jsx';
import FoodProcessingRawToSales from './sections/FoodProcessingRawToSales/FoodProcessingRawToSales.jsx';
import FoodProcessingConnectedTechSection from './sections/FoodProcessingConnectedTechSection/FoodProcessingConnectedTechSection.jsx';
import FoodProcessingBenefitsSection from './sections/FoodProcessingBenefitsSection/FoodProcessingBenefitsSection.jsx';
import FoodProcessingWhyUpwon from './sections/FoodProcessingWhyUpwon/FoodProcessingWhyUpwon.jsx';
import FoodProcessingIndustryCoverage from './sections/FoodProcessingIndustryCoverage/FoodProcessingIndustryCoverage.jsx';
import FoodProcessingFaqSection from './sections/FoodProcessingFaqSection/FoodProcessingFaqSection.jsx';
import FoodProcessingCtaSection from './sections/FoodProcessingCtaSection/FoodProcessingCtaSection.jsx';
import {
  fetchFoodProcessingCoverageSection,
  fetchFoodProcessingCtaSection,
  fetchFoodProcessingFaqSection,
  fetchFoodProcessingHeroSlides,
  fetchFoodProcessingPlatformSection,
  fetchFoodProcessingTrustSection,
} from '../../lib/foodProcessingPage.js';

/**
 * The six CMS-backed sections are read here rather than inside their
 * components, the same arrangement as the other industry pages: one place that
 * knows which sections come from the API, and components that simply render
 * what they are handed.
 *
 * The page is CMS-only: there is no built-in fallback copy. A section with
 * nothing published - or whose fetch failed - stays null and renders nothing.
 * The fetches are guarded inside lib/foodProcessingPage.js and never run during
 * the SSG build, so these sections appear once the browser has loaded them.
 */
export default function FoodProcessing() {
  const [heroSlides, setHeroSlides] = useState(null);
  const [trust, setTrust] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [coverage, setCoverage] = useState(null);
  const [faq, setFaq] = useState(null);
  const [cta, setCta] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const keep = (setter) => (value) => {
      if (!cancelled && value) setter(value);
    };

    fetchFoodProcessingHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setHeroSlides(slides);
    });
    fetchFoodProcessingTrustSection().then(keep(setTrust));
    fetchFoodProcessingPlatformSection().then(keep(setPlatform));
    fetchFoodProcessingCoverageSection().then(keep(setCoverage));
    fetchFoodProcessingFaqSection().then(keep(setFaq));
    fetchFoodProcessingCtaSection().then(keep(setCta));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <FoodProcessingHeroSection slides={heroSlides} />
      <FoodProcessingProofStrip section={trust} />
      <FoodProcessingChallengeSection />
      <FoodProcessingOperationalChallenges />
      <FoodProcessingHowUpwonHelps />
      <FoodProcessingCoreCapabilities />
      <FoodProcessingRawToSales />
      <FoodProcessingConnectedTechSection section={platform} />
      <FoodProcessingBenefitsSection />
      <FoodProcessingWhyUpwon />
      <FoodProcessingIndustryCoverage section={coverage} />
      <FoodProcessingFaqSection section={faq} />
      <FoodProcessingCtaSection section={cta} />
    </>
  );
}
