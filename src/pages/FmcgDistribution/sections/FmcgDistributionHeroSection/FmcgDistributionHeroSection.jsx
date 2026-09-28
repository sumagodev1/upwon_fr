import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';

/*
  FMCG Distribution Hero Section
  /industries/fmcg-distribution

  CMS-only: the slides come from the CMS via the page. With no published
  slides - nothing active, or the API unreachable - the section renders
  nothing rather than falling back to built-in copy.
*/

const ACCENT = '#E85A2A';

/**
 * @param {{ slides?: Array | null }} props - the published slides. The accent
 *   is the page's, not the slide's, so it is applied to each one.
 */
export default function FmcgDistributionHeroSection({ slides = null }) {
  if (!Array.isArray(slides) || slides.length === 0) return null;

  return (
    <HeroSlider
      slides={slides.map((slide) => ({ accent: ACCENT, ...slide }))}
      variant="dark"
      intervalMs={5000}
      minHeight="min-h-[520px] sm:min-h-[560px] md:min-h-[620px]"
      topPad="pt-32 md:pt-40"
    />
  );
}
