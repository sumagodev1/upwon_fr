import { useEffect, useState } from 'react';
import NonFoodFmcgHeroSection from './sections/NonFoodFmcgHeroSection/NonFoodFmcgHeroSection.jsx';
import NonFoodFmcgProofStrip from './sections/NonFoodFmcgProofStrip/NonFoodFmcgProofStrip.jsx';
import NonFoodFmcgChallengeSection from './sections/NonFoodFmcgChallengeSection/NonFoodFmcgChallengeSection.jsx';
import NonFoodFmcgOperationalChallenges from './sections/NonFoodFmcgOperationalChallenges/NonFoodFmcgOperationalChallenges.jsx';
import NonFoodFmcgHowUpwonHelps from './sections/NonFoodFmcgHowUpwonHelps/NonFoodFmcgHowUpwonHelps.jsx';
import NonFoodFmcgCoreCapabilities from './sections/NonFoodFmcgCoreCapabilities/NonFoodFmcgCoreCapabilities.jsx';
import NonFoodFmcgProductToSales from './sections/NonFoodFmcgProductToSales/NonFoodFmcgProductToSales.jsx';
import NonFoodFmcgConnectedTechSection from './sections/NonFoodFmcgConnectedTechSection/NonFoodFmcgConnectedTechSection.jsx';
import NonFoodFmcgBenefitsSection from './sections/NonFoodFmcgBenefitsSection/NonFoodFmcgBenefitsSection.jsx';
import NonFoodFmcgWhyUpwon from './sections/NonFoodFmcgWhyUpwon/NonFoodFmcgWhyUpwon.jsx';
import NonFoodFmcgIndustryCoverage from './sections/NonFoodFmcgIndustryCoverage/NonFoodFmcgIndustryCoverage.jsx';
import NonFoodFmcgFaqSection from './sections/NonFoodFmcgFaqSection/NonFoodFmcgFaqSection.jsx';
import NonFoodFmcgCtaSection from './sections/NonFoodFmcgCtaSection/NonFoodFmcgCtaSection.jsx';
import {
  fetchNonFoodFmcgBenefitsSection,
  fetchNonFoodFmcgCapabilitiesSection,
  fetchNonFoodFmcgCoverageSection,
  fetchNonFoodFmcgCtaSection,
  fetchNonFoodFmcgFaqSection,
  fetchNonFoodFmcgHeroSlides,
  fetchNonFoodFmcgPlatformSection,
  fetchNonFoodFmcgTrustSection,
} from '../../lib/nonFoodFmcgPage.js';

/**
 * The eight CMS-backed sections are read here rather than inside their
 * components, the same arrangement as the other industry pages: one place that
 * knows which sections come from the API, and components that simply render
 * what they are handed.
 *
 * The page is CMS-only: there is no built-in fallback copy. A section with
 * nothing published - or whose fetch failed - stays null and renders nothing.
 * The fetches are guarded inside lib/nonFoodFmcgPage.js and never run during
 * the SSG build, so these sections appear once the browser has loaded them.
 */
export default function NonFoodFmcg() {
  const [heroSlides, setHeroSlides] = useState(null);
  const [trust, setTrust] = useState(null);
  const [capabilities, setCapabilities] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const [coverage, setCoverage] = useState(null);
  const [faq, setFaq] = useState(null);
  const [cta, setCta] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const keep = (setter) => (value) => {
      if (!cancelled && value) setter(value);
    };

    fetchNonFoodFmcgHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setHeroSlides(slides);
    });
    fetchNonFoodFmcgTrustSection().then(keep(setTrust));
    fetchNonFoodFmcgCapabilitiesSection().then(keep(setCapabilities));
    fetchNonFoodFmcgPlatformSection().then(keep(setPlatform));
    fetchNonFoodFmcgBenefitsSection().then(keep(setBenefits));
    fetchNonFoodFmcgCoverageSection().then(keep(setCoverage));
    fetchNonFoodFmcgFaqSection().then(keep(setFaq));
    fetchNonFoodFmcgCtaSection().then(keep(setCta));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <NonFoodFmcgHeroSection slides={heroSlides} />
      <NonFoodFmcgProofStrip section={trust} />
      <NonFoodFmcgChallengeSection />
      <NonFoodFmcgOperationalChallenges />
      <NonFoodFmcgHowUpwonHelps />
      <NonFoodFmcgCoreCapabilities section={capabilities} />
      <NonFoodFmcgProductToSales />
      <NonFoodFmcgConnectedTechSection section={platform} />
      <NonFoodFmcgBenefitsSection section={benefits} />
      <NonFoodFmcgWhyUpwon />
      <NonFoodFmcgIndustryCoverage section={coverage} />
      <NonFoodFmcgFaqSection section={faq} />
      <NonFoodFmcgCtaSection section={cta} />
    </>
  );
}
