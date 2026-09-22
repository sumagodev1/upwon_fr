import { Navigate } from 'react-router-dom';
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




export default function VmsPage() {

  return (
    <>

      <VmsHeroSection />

      <VmsProofStrip />

      <VmsRecognition />

      <VmsOperationalReality />

      <VmsApproch />

      <VmsCoreCapabilities />

      <VmsConnectedDesign />

      {/* <VmsOneSuite /> */}

      <VmsImplementationAndPartnership />
      
      <VmsSecureAccountableSection />

      <VmsCustomerOutcomeSection />

      <VmsFaqSection />

      <VmsCtaSection />

    </>
  );
}
