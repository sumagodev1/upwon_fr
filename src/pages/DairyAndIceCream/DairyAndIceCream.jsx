import { useEffect, useState } from 'react';
import DairyIceCreamHeroSection from './sections/DairyIceCreamHeroSection/DairyIceCreamHeroSection.jsx';
import DairyProofStrip from './sections/DairyProofStrip/DairyProofStrip.jsx';
import DairyIceCreamChallengeSection from './sections/DairyIceCreamChallengeSection/DairyIceCreamChallengeSection.jsx';
import DairyIceCreamOperationalChallenges from './sections/DairyIceCreamOperationalChallenges/DairyIceCreamOperationalChallenges.jsx';
import DairyIceCreamHowUpwonHelps from './sections/DairyIceCreamHowUpwonHelps/DairyIceCreamHowUpwonHelps.jsx';
import DairyIceCreamCoreCapabilities from './sections/DairyIceCreamCoreCapabilities/DairyIceCreamCoreCapabilities.jsx';
import DairyRawToSales from './sections/DairyRawToSales/DairyRawToSales.jsx';
import DairyIceCreamConnectedTechSection from './sections/DairyIceCreamConnectedTechSection/DairyIceCreamConnectedTechSection.jsx';
import DairyIceCreamBenefitsSection from './sections/DairyIceCreamBenefitsSection/DairyIceCreamBenefitsSection.jsx';
import DairyIceCreamWhyUpwon from './sections/DairyIceCreamWhyUpwon/DairyIceCreamWhyUpwon.jsx';
import DairyIndustryCoverage from './sections/DairyIndustryCoverage/DairyIndustryCoverage.jsx';
import DairyIceCreamFaqSection from './sections/DairyIceCreamFaqSection/DairyIceCreamFaqSection.jsx';
import DairyIceCreamCtaSection from './sections/DairyIceCreamCtaSection/DairyIceCreamCtaSection.jsx';
import {
  fetchDairyBenefitsSection,
  fetchDairyCapabilitiesSection,
  fetchDairyCoverageSection,
  fetchDairyCtaSection,
  fetchDairyFaqSection,
  fetchDairyHeroSlides,
  fetchDairyPlatformSection,
  fetchDairyTrustSection,
} from '../../lib/dairyPage.js';

/**
 * The eight CMS-backed sections are read here rather than inside their
 * components, the same arrangement as the other industry pages: one place that
 * knows which sections come from the API, and components that simply render
 * what they are handed.
 *
 * The page is CMS-only: there is no built-in fallback copy. A section with
 * nothing published - or whose fetch failed - stays null and renders nothing.
 * The fetches are guarded inside lib/dairyPage.js and never run during
 * the SSG build, so these sections appear once the browser has loaded them.
 */
export default function DairyAndIceCream() {
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

    fetchDairyHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setHeroSlides(slides);
    });
    fetchDairyTrustSection().then(keep(setTrust));
    fetchDairyCapabilitiesSection().then(keep(setCapabilities));
    fetchDairyPlatformSection().then(keep(setPlatform));
    fetchDairyBenefitsSection().then(keep(setBenefits));
    fetchDairyCoverageSection().then(keep(setCoverage));
    fetchDairyFaqSection().then(keep(setFaq));
    fetchDairyCtaSection().then(keep(setCta));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <DairyIceCreamHeroSection slides={heroSlides} />
      <DairyProofStrip section={trust} />
      <DairyIceCreamChallengeSection />
      <DairyIceCreamOperationalChallenges />
      <DairyIceCreamHowUpwonHelps />
      <DairyIceCreamCoreCapabilities section={capabilities} />
      <DairyRawToSales />
      <DairyIceCreamConnectedTechSection section={platform} />
      <DairyIceCreamBenefitsSection section={benefits} />
      <DairyIceCreamWhyUpwon />
      <DairyIndustryCoverage section={coverage} />
      <DairyIceCreamFaqSection section={faq} />
      <DairyIceCreamCtaSection section={cta} />
    </>
  );
}
