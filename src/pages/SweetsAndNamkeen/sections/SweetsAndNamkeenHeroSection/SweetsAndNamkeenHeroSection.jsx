import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';

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

    headline:
      'From Raw Ingredients to Every Shelf — Keep Operations Connected.',

    subhead:
      'Bring procurement, production, inventory, warehouse operations, sales, and distribution together so every product moves through your business with greater visibility and control.',

    bg: '/images/sweet_hero_1.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline: 'Make More. Move Faster — Manage Everything in One Flow.',

    subhead:
      'Connect every stage of your sweets and namkeen operations—from raw materials and production to stock, outlets, distributors, and sales—through one integrated platform.',

    bg: '/images/sweet_hero_2.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Batch, Location, and Sales Channel — One Connected System.',

    subhead:
      'Keep production, inventory, warehouses, outlets, distributors, and business operations working from connected information—so your teams can move faster with better visibility across the business.',

    bg: '/images/sweet_hero_3.webp',

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
