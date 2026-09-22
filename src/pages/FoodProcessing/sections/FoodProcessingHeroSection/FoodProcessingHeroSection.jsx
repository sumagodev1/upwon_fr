import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';

/*
  Food Processing Hero Section
  Dedicated 4-slide hero for:
  /industries/food-processing

  Each slide carries one angle — connected processes, batch traceability,
  visibility, and scale — with the artwork written for it.
*/

const EYEBROW = 'FOOD PROCESSING';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore UpWon for Food Processing',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline:
      'From Raw Materials to Finished Products — Keep Every Process Connected.',

    subhead:
      'Manage procurement, production, recipes, inventory, quality, warehouses, sales, distribution, and business operations through one connected platform built to bring greater visibility, control, and coordination to your food processing business.',

    bg: '/images/food_process_hero_1.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline: 'Every Ingredient. Every Batch — Every Movement Connected.',

    subhead:
      'Connect raw materials, recipes, production, quality, inventory, shelf-life, packaging, and finished-goods movement through one platform—so your teams can maintain clearer visibility across every stage of food processing.',

    bg: '/images/food_process_hero_2.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Batch, Location, and Product Movement — One Connected View.',

    subhead:
      'Bring procurement, production, inventory, quality, warehouses, sales, and distribution together in one connected platform. Gain better visibility across operations and make faster, more informed decisions as products move through your business.',

    bg: '/images/food_process_hero_3.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'See How UpWon Connects Your Operations',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: EYEBROW,

    headline: 'Process More. Move Faster — Manage Everything in One Flow.',

    subhead:
      'Simplify the journey from incoming materials and production to storage, finished goods, sales, and distribution with one connected platform designed to help food processing operations stay coordinated as they grow.',

    bg: '/images/food_process_hero_4.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function FoodProcessingHeroSection() {
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
