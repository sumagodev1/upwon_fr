import { useEffect, useState } from 'react';
import VmsHeroSection from './sections/VmsHeroSection/VmsHeroSection.jsx';
import VmsProofStrip from './sections/VmsProofStrip/VmsProofStrip.jsx';
import VmsRecognition from './sections/VmsRecognition/VmsRecognition.jsx';
import VmsOperationalReality from './sections/VmsOperationalReality/VmsOperationalReality.jsx';
import VmsApproch from './sections/VmsApproch/VmsApproch.jsx';
import VmsCoreCapabilities from './sections/VmsCoreCapabilities/VmsCoreCapabilities.jsx';
import VmsConnectedDesign from './sections/VmsConnectedDesign/VmsConnectedDesign.jsx';
// import VmsOneSuite from './sections/VmsOneSuite/VmsOneSuite.jsx';
import VmsImplementationAndPartnership from './sections/VmsImplementationAndPartnership/VmsImplementationAndPartnership.jsx';
import VmsSecureAccountableSection from './sections/VmsSecureAccountableSection/VmsSecureAccountableSection.jsx';
import VmsCustomerOutcomeSection from './sections/VmsCustomerOutcomeSection/VmsCustomerOutcomeSection.jsx';
import VmsCtaSection from './sections/VmsCtaSection/VmsCtaSection.jsx';
import VmsFaqSection from './sections/VmsFaqSection/VmsFaqSection.jsx';
import {
  fetchVmsCapabilitiesSection,
  fetchVmsCtaSection,
  fetchVmsFaqSection,
  fetchVmsHeroSlides,
  fetchVmsOutcomesSection,
  fetchVmsProofSection,
} from '../../lib/vendorPortalPage.js';

/*
  Dedicated UPWON Vendor Portal (VMS) landing page — its own page (like
  WmsPage / PosPage / HrmsPage / ErpPage / FmsPage) so the procurement story
  (RFQs, rate contracts, vendor self-service, quality scoring) can be built
  out section by section. Routed at /products/vendor-management.

  Six of its sections are CMS-backed — the hero, the proof strip, the
  capability carousel, the customer outcomes, the FAQ and the closing band.
  Each falls back to the copy it ships when nothing is published or the API
  cannot be reached, so the page is never worse off for the CMS existing.
*/

export default function VmsPage() {
  const [heroSlides, setHeroSlides] = useState(null);
  const [proof, setProof] = useState(null);
  const [capabilities, setCapabilities] = useState(null);
  const [outcomes, setOutcomes] = useState(null);
  const [faq, setFaq] = useState(null);
  const [cta, setCta] = useState(null);

  /*
    The fetches live on the page rather than inside the components: the hero
    slider is shared with several other pages, and keeping the fetch here is
    what stops one page's content following a shared component onto another.
  */
  useEffect(() => {
    let cancelled = false;

    fetchVmsHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setHeroSlides(slides);
    });
    fetchVmsProofSection().then((section) => {
      if (!cancelled && section) setProof(section);
    });
    fetchVmsCapabilitiesSection().then((section) => {
      if (!cancelled && section) setCapabilities(section);
    });
    fetchVmsOutcomesSection().then((section) => {
      if (!cancelled && section) setOutcomes(section);
    });
    fetchVmsFaqSection().then((section) => {
      if (!cancelled && section) setFaq(section);
    });
    fetchVmsCtaSection().then((section) => {
      if (!cancelled && section) setCta(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <VmsHeroSection slides={heroSlides} />

      <VmsProofStrip section={proof} />

      <VmsRecognition />

      <VmsOperationalReality />

      <VmsApproch />

      <VmsCoreCapabilities section={capabilities} />

      <VmsConnectedDesign />

      {/* <VmsOneSuite /> */}

      <VmsImplementationAndPartnership />

      <VmsSecureAccountableSection />

      <VmsCustomerOutcomeSection section={outcomes} />

      <VmsFaqSection section={faq} />

      <VmsCtaSection section={cta} />
    </>
  );
}
