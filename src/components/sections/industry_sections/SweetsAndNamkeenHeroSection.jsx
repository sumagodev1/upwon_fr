import HeroSlider from '../../ui/HeroSlider.jsx';

/*
  Sweets & Namkeen Hero Section
  Dedicated 3-slide hero for:
  /industries/sweets-namkeen

  Slides follow the three angles the segment actually buys on — heritage
  recipe control, the festive surge, and outlet-to-outlet consistency.
*/

const EYEBROW = 'SWEETS & NAMKEEN';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore UpWon for Sweets & Namkeen',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline: 'Generations of Recipe. Modern Operations.',

    subhead:
      'Manage perishable inventory, festive production, counter billing, and multi-outlet operations through one connected platform built for mithai and namkeen brands.',

    bg: '/images/namkeen.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline: 'Plan the Festive Surge Before It Arrives.',

    subhead:
      'Diwali, Eid, and Onam can lift demand several times over. Plan production, packing, and outlet stock ahead of the season instead of running the rush from memory.',

    bg: '/images/sweets_and_namkeen.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline: 'Every Counter, Every Outlet, One Consistent Brand.',

    subhead:
      'Weight-based counter billing across multi-size SKUs, controlled recipe versions, and central-kitchen to outlet flows—so quality and pricing stay consistent everywhere you sell.',

    bg: '/images/namkeens.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function SweetsAndNamkeenHeroSection() {
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
