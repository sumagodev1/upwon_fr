import Seo from '../components/common/Seo.jsx';
import WhyUpwonHeroSection from '../components/sections/why_upwon_sections/WhyUpwonHeroSection.jsx';
import WhyUpwonProblemSection from '../components/sections/why_upwon_sections/WhyUpwonProblemSection.jsx';
import WhyUpwonDifference from '../components/sections/why_upwon_sections/WhyUpwonDifference.jsx';
import WhyUpwonComparison from '../components/sections/why_upwon_sections/WhyUpwonComparison.jsx';

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
    </>
  );
}
