import { useEffect, useState } from 'react';
import FmcgDistributionHeroSection from './sections/FmcgDistributionHeroSection/FmcgDistributionHeroSection.jsx';
import FmcgProofStripSection from './sections/FmcgProofStripSection/FmcgProofStripSection.jsx';
import FmcgChallengeSection from './sections/FmcgChallengeSection/FmcgChallengeSection.jsx';
import OperationalChallengeSection from './sections/OperationalChallengeSection/OperationalChallengeSection.jsx';
import FmcgConnectedTechSection from './sections/FmcgConnectedTechSection/FmcgConnectedTechSection.jsx';
import FmcgHowUpwonHelps from './sections/FmcgHowUpwonHelps/FmcgHowUpwonHelps.jsx';
import FmcgCoreCapabilities from './sections/FmcgCoreCapabilities/FmcgCoreCapabilities.jsx';
import FmcgWarehouseToSales from './sections/FmcgWarehouseToSales/FmcgWarehouseToSales.jsx';
import FmcgBenefitsSection from './sections/FmcgBenefitsSection/FmcgBenefitsSection.jsx';
import FmcgWhyUpwon from './sections/FmcgWhyUpwon/FmcgWhyUpwon.jsx';
import FmcgFaqSection from './sections/FmcgFaqSection/FmcgFaqSection.jsx';
import FmcgCtaSection from './sections/FmcgCtaSection/FmcgCtaSection.jsx';
import {
  fetchFmcgCtaSection,
  fetchFmcgFaqSection,
  fetchFmcgHeroSlides,
  fetchFmcgPlatformSection,
  fetchFmcgTrustSection,
} from '../../lib/fmcgPage.js';

/**
 * The five CMS-backed sections are read here rather than inside their
 * components, the same arrangement as the Bakery & Confectionery page: one
 * place that knows which sections come from the API, and components that
 * simply render what they are handed.
 *
 * The page is CMS-only: there is no built-in fallback copy. A section with
 * nothing published - or whose fetch failed - stays null and renders nothing.
 * The fetches are guarded inside lib/fmcgPage.js and never run during the SSG
 * build, so these sections appear once the browser has loaded them.
 */
export default function FmcgDistribution() {
  const [heroSlides, setHeroSlides] = useState(null);
  const [trust, setTrust] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [faq, setFaq] = useState(null);
  const [cta, setCta] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const keep = (setter) => (value) => {
      if (!cancelled && value) setter(value);
    };

    fetchFmcgHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setHeroSlides(slides);
    });
    fetchFmcgTrustSection().then(keep(setTrust));
    fetchFmcgPlatformSection().then(keep(setPlatform));
    fetchFmcgFaqSection().then(keep(setFaq));
    fetchFmcgCtaSection().then(keep(setCta));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <FmcgDistributionHeroSection slides={heroSlides} />
      <FmcgProofStripSection section={trust} />
      <FmcgChallengeSection />
      <OperationalChallengeSection />
      <FmcgConnectedTechSection section={platform} />
      <FmcgHowUpwonHelps />
      <FmcgCoreCapabilities />
      <FmcgWarehouseToSales />
      <FmcgBenefitsSection />
      <FmcgWhyUpwon />
      <FmcgFaqSection section={faq} />
      <FmcgCtaSection section={cta} />
    </>
  );
}
