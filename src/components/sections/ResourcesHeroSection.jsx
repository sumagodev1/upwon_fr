import HeroSlider from '../ui/HeroSlider.jsx';

/*
  Resources Hero Section
  Dedicated 3-slide hero for: /resources

  Each slide takes one angle on the hub — the playbooks, the named proof,
  and the guides operators actually download. Headlines split on an em-dash
  so the setup sits lighter and the payoff carries the weight, matching the
  product and industry pages.
*/

const EYEBROW = 'RESOURCES FOR FOOD & FMCG LEADERS';
const ACCENT = '#E85A2A';

/*
  The three backdrops the page's previous hero carried, kept as they were.
  They are remote (Unsplash) rather than local files like most heroes on the
  site — swap in local webp when dedicated artwork exists.
*/
const UNSPLASH = 'https://images.unsplash.com/photo-';

const BG_READING = `${UNSPLASH}1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=60`;

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore What UpWon Does',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline: 'Insights, Playbooks and Real Benchmarks — In One Place.',

    subhead:
      'Blog, case studies, gated guides, a video shelf and the tools to build your business case. Everything a food or FMCG leader needs while evaluating how their operations should run.',

    bg: BG_READING,

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function ResourcesHeroSection() {
  return (
    <HeroSlider
      slides={heroSlides}
      variant="dark"
      intervalMs={5000}
      minHeight="min-h-[520px] sm:min-h-[560px] md:min-h-[620px]"
      topPad="pt-32 md:pt-40"
    />
  );
}
