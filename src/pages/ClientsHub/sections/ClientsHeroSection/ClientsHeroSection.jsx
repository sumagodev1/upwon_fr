import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';

/*
  Clients Hero Section
  Dedicated 4-slide hero for: /clients

  Each slide takes one angle on the roster — the scale of it, the named
  operators behind it, the footprint it covers, and the outcomes the case
  studies record. Headlines split on an em-dash so the setup sits lighter
  and the payoff carries the weight, matching the product and industry
  pages.
*/

const EYEBROW = 'CLIENTS & CASE STUDIES';
const ACCENT = '#E85A2A';

/*
  The three backdrops the page's previous hero carried, kept as they were.
  They are remote (Unsplash) rather than local files like every other hero
  on the site — swap in local webp when dedicated artwork exists.
*/
const UNSPLASH = 'https://images.unsplash.com/photo-';

const BG_KITCHEN = `${UNSPLASH}1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=60`;

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

    headline:
      'The ERP 50+ Food & FMCG Enterprises Chose — Over Everything Else They Tried.',

    subhead:
      'Bakery chains, dairy brands, beverage manufacturers, FMCG distributors and QSR networks run their day on UpWon. Not pilots or proofs of concept — live operations, across 10 states and counting.',

    bg: BG_KITCHEN,

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function ClientsHeroSection() {
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
