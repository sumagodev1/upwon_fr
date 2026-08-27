import { Navigate } from 'react-router-dom';
import VmsHeroSection from '../components/sections/VmsHeroSection.jsx';
import VmsProofStrip from '../components/sections/VmsProofStrip.jsx';
import VmsRecognition from '../components/sections/VmsRecognition.jsx';
import VmsOperationalReality from '../components/sections/VmsOperationalReality.jsx';
import VmsApproch from '../components/sections/VmsApproch.jsx';
import VmsCoreCapabilities from '../components/sections/VmsCoreCapabilities.jsx';
import VmsConnectedDesign from '../components/sections/VmsConnectedDesign.jsx';
// import VmsOneSuite from '../components/sections/VmsOneSuite.jsx';




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

    </>
  );
}
