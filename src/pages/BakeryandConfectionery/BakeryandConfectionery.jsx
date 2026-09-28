import { useEffect, useState } from 'react';
import BakeryandConfectionaryHeroSection from './sections/BakeryandConfectionaryHeroSection/BakeryandConfectionaryHeroSection.jsx';
import BakeryProofStripSection from './sections/BakeryProofStripSection/BakeryProofStripSection.jsx';
import BakeryChallenge from './sections/BakeryChallenge/BakeryChallenge.jsx';
import BakeryOperationalChallenge from './sections/BakeryOperationalChallenge/BakeryOperationalChallenge.jsx';
import BakeryConnectedTechSection from './sections/BakeryConnectedTechSection/BakeryConnectedTechSection.jsx';
import BakeryHowUpwonHelps from './sections/BakeryHowUpwonHelps/BakeryHowUpwonHelps.jsx';
import BakeryCoreCapabilities from './sections/BakeryCoreCapabilities/BakeryCoreCapabilities.jsx';
import BakeryIngrediantstoStore from './sections/BakeryIngrediantstoStore/BakeryIngrediantstoStore.jsx';
import BakeryBenefitsSection from './sections/BakeryBenefitsSection/BakeryBenefitsSection.jsx';
import BakeryWhyUpwon from './sections/BakeryWhyUpwon/BakeryWhyUpwon.jsx';
import BakeryFaqSection from './sections/BakeryFaqSection/BakeryFaqSection.jsx';
import BakeryCtaSection from './sections/BakeryCtaSection/BakeryCtaSection.jsx';
import {
  fetchBakeryCtaSection,
  fetchBakeryFaqSection,
  fetchBakeryHelpsSection,
  fetchBakeryHeroSlides,
  fetchBakeryPlatformSection,
  fetchBakeryTrustSection,
} from '../../lib/bakeryPage.js';

/**
 * The six CMS-backed sections are read here rather than inside their
 * components, the same arrangement as FmsPage: one place that knows which
 * sections come from the API, and components that simply render what they are
 * handed.
 *
 * The page is CMS-only: there is no built-in fallback copy. A section with
 * nothing published - or whose fetch failed - stays null and renders nothing.
 * The fetches are guarded inside lib/bakeryPage.js and never run during the
 * SSG build, so these sections appear once the browser has loaded them.
 */
export default function BakeryAndConfectionery() {
  const [heroSlides, setHeroSlides] = useState(null);
  const [trust, setTrust] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [helps, setHelps] = useState(null);
  const [faq, setFaq] = useState(null);
  const [cta, setCta] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const keep = (setter) => (value) => {
      if (!cancelled && value) setter(value);
    };

    fetchBakeryHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setHeroSlides(slides);
    });
    fetchBakeryTrustSection().then(keep(setTrust));
    fetchBakeryPlatformSection().then(keep(setPlatform));
    fetchBakeryHelpsSection().then(keep(setHelps));
    fetchBakeryFaqSection().then(keep(setFaq));
    fetchBakeryCtaSection().then(keep(setCta));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <BakeryandConfectionaryHeroSection slides={heroSlides} />

      <BakeryProofStripSection section={trust} />

      <BakeryChallenge />

      <BakeryOperationalChallenge />

      <BakeryConnectedTechSection section={platform} />

      <BakeryHowUpwonHelps section={helps} />

      <BakeryCoreCapabilities />

      <BakeryIngrediantstoStore />

      <BakeryBenefitsSection />

      <BakeryWhyUpwon />

      <BakeryFaqSection section={faq} />

      <BakeryCtaSection section={cta} />
    </>
  );
}
