import HeroSlider from '../../ui/HeroSlider.jsx';

/*
  Beverages & Juices Hero Section
  Dedicated 4-slide hero for:
  /industries/beverage

  No dedicated hero artwork was supplied for this vertical, so these use the
  largest beverage and processing images already in public/images. Copy is
  drawn from the beverages entry in data/industries.js — blend formulation,
  Brix and pH testing, fill-line scheduling, returnable containers and
  distribution — so nothing new is claimed here.
*/

const EYEBROW = 'BEVERAGES & JUICES';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore UpWon for Beverages & Juices',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline:
      'From Concentrate to Every Bottle — Keep Your Beverage Operations Connected.',

    subhead:
      'Manage procurement, ingredients, blending, production, quality, inventory, warehouses, returnable containers, sales, and distribution through one connected platform built to bring greater visibility and control to beverage and juice operations.',

    bg: '/images/beverages.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline: 'Brix, pH and Batch — Tracked, Not Estimated.',

    subhead:
      'Bring blend ratios, quality readings, batch records, and fill-line activity into the same system as production and inventory—so what was blended, under which batch, and how it tested stay together instead of living across separate registers.',

    bg: '/images/food_fruits_processing.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every SKU, Every Line and Every Crate — In One Connected View.',

    subhead:
      'Bring formulation, fill-line scheduling, inventory, returnable bottles and crates, warehouses, sales, and dispatch together in one platform. Gain better visibility across plants as products move from blending to the shelf.',

    bg: '/images/food_dairy_processing.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'See How UpWon Connects Your Operations',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: EYEBROW,

    headline: 'Run More SKUs, Move Faster — Manage Every Plant in One Flow.',

    subhead:
      'Simplify the journey from ingredient procurement through blending, filling, storage, and sales to distributor and retail dispatch with one connected platform designed to help beverage businesses stay coordinated as they grow.',

    bg: '/images/multi_plant_distribution.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function BeveragesHeroSection() {
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
