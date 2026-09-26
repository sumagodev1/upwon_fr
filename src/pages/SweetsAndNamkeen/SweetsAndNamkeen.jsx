import { useEffect, useState } from 'react';
import SweetsAndNamkeenHeroSection from './sections/SweetsAndNamkeenHeroSection/SweetsAndNamkeenHeroSection.jsx';
import SweetsProofStripSection from './sections/SweetsProofStripSection/SweetsProofStripSection.jsx';
import SweetsChallengeSection from './sections/SweetsChallengeSection/SweetsChallengeSection.jsx';
import SweetsOperationalRealitySection from './sections/SweetsOperationalRealitySection/SweetsOperationalRealitySection.jsx';
import SweetsConnectedTechSection from './sections/SweetsConnectedTechSection/SweetsConnectedTechSection.jsx';
import SweetsHowUpwonHelps from './sections/SweetsHowUpwonHelps/SweetsHowUpwonHelps.jsx';
import SweetsCoreCapabilities from './sections/SweetsCoreCapabilities/SweetsCoreCapabilities.jsx';
import SweetsIngredientsToSales from './sections/SweetsIngredientsToSales/SweetsIngredientsToSales.jsx';
import SweetsBenefitsSection from './sections/SweetsBenefitsSection/SweetsBenefitsSection.jsx';
import SweetsWhyUpwon from './sections/SweetsWhyUpwon/SweetsWhyUpwon.jsx';
import SweetsFaqSection from './sections/SweetsFaqSection/SweetsFaqSection.jsx';
import SweetsCtaSection from './sections/SweetsCtaSection/SweetsCtaSection.jsx';
import {
  fetchSweetsCtaSection,
  fetchSweetsFaqSection,
  fetchSweetsHeroSlides,
  fetchSweetsPlatformSection,
  fetchSweetsTrustSection,
} from '../../lib/sweetsPage.js';

/**
 * The five CMS-backed sections are read here rather than inside their
 * components, the same arrangement as the other industry pages: one place that
 * knows which sections come from the API, and components that simply render
 * what they are handed.
 *
 * The page is CMS-only: there is no built-in fallback copy. A section with
 * nothing published - or whose fetch failed - stays null and renders nothing.
 * The fetches are guarded inside lib/sweetsPage.js and never run during the
 * SSG build, so these sections appear once the browser has loaded them.
 */
export default function SweetsAndNamkeen() {
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

    fetchSweetsHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setHeroSlides(slides);
    });
    fetchSweetsTrustSection().then(keep(setTrust));
    fetchSweetsPlatformSection().then(keep(setPlatform));
    fetchSweetsFaqSection().then(keep(setFaq));
    fetchSweetsCtaSection().then(keep(setCta));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <SweetsAndNamkeenHeroSection slides={heroSlides} />
      <SweetsProofStripSection section={trust} />
      <SweetsChallengeSection />
      <SweetsOperationalRealitySection />
      <SweetsConnectedTechSection section={platform} />
      <SweetsHowUpwonHelps />
      <SweetsCoreCapabilities />
      <SweetsIngredientsToSales />
      <SweetsBenefitsSection />
      <SweetsWhyUpwon />
      <SweetsFaqSection section={faq} />
      <SweetsCtaSection section={cta} />
    </>
  );
}
