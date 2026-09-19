import Seo from '../components/common/Seo.jsx';
import WhyUpwonHeroSection from '../components/sections/why_upwon_sections/WhyUpwonHeroSection.jsx';
import WhyUpwonProblemSection from '../components/sections/why_upwon_sections/WhyUpwonProblemSection.jsx';
import WhyUpwonDifference from '../components/sections/why_upwon_sections/WhyUpwonDifference.jsx';
import WhyUpwonComparison from '../components/sections/why_upwon_sections/WhyUpwonComparison.jsx';
import WhyUpwonProductProof from '../components/sections/why_upwon_sections/WhyUpwonProductProof.jsx';
import WhyUpwonResults from '../components/sections/why_upwon_sections/WhyUpwonResults.jsx';
import WhyUpwonIndustryTrust from '../components/sections/why_upwon_sections/WhyUpwonIndustryTrust.jsx';
import WhyUpwonCustomerTrust from '../components/sections/why_upwon_sections/WhyUpwonCustomerTrust.jsx';
import WhyUpwonCtaSection from '../components/sections/why_upwon_sections/WhyUpwonCtaSection.jsx';

/*
  Why UpWon — /why-upwon

  Rebuilt page. Sections are added one at a time beneath the hero, the same
  way the industry pages are assembled.
*/

export default function WhyUpwon() {
  return (
    <>
      <Seo
        title="Why UpWon — One Connected Platform for Your Whole Operation"
        description="Why growing manufacturing, food, and distribution businesses choose UpWon: one connected platform across procurement, production, inventory, sales, dispatch, and reporting."
        canonical="https://upwon.in/why-upwon"
      />

      <WhyUpwonHeroSection />
      <WhyUpwonProblemSection />
      <WhyUpwonDifference />
      <WhyUpwonComparison />
      <WhyUpwonProductProof />
      <WhyUpwonResults />
      <WhyUpwonIndustryTrust />
      <WhyUpwonCustomerTrust />
      <WhyUpwonCtaSection />
    </>
  );
}
