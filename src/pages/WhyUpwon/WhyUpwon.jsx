import Seo from '../../components/shared/Seo/Seo.jsx';
import WhyUpwonHeroSection from './sections/WhyUpwonHeroSection/WhyUpwonHeroSection.jsx';
import WhyUpwonProblemSection from './sections/WhyUpwonProblemSection/WhyUpwonProblemSection.jsx';
import WhyUpwonDifference from './sections/WhyUpwonDifference/WhyUpwonDifference.jsx';
import WhyUpwonComparison from './sections/WhyUpwonComparison/WhyUpwonComparison.jsx';
import WhyUpwonProductProof from './sections/WhyUpwonProductProof/WhyUpwonProductProof.jsx';
import WhyUpwonResults from './sections/WhyUpwonResults/WhyUpwonResults.jsx';
import WhyUpwonIndustryTrust from './sections/WhyUpwonIndustryTrust/WhyUpwonIndustryTrust.jsx';
import WhyUpwonCustomerTrust from './sections/WhyUpwonCustomerTrust/WhyUpwonCustomerTrust.jsx';
import WhyUpwonCtaSection from './sections/WhyUpwonCtaSection/WhyUpwonCtaSection.jsx';

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
