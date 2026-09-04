import HeroSlider from '../../ui/HeroSlider.jsx';

/*
  Spices & Agro Processing Hero Section
  Dedicated 4-slide hero for:
  /industries/spices-agro

  Each slide carries its own artwork and takes one angle on the vertical —
  the opener, then traceability and production, quality and control, and
  scale. Headlines split on an em-dash so the setup sits lighter and the
  payoff carries the weight, matching the product pages.
*/

const EYEBROW = 'SPICES & AGRO PROCESSING';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore UpWon for Spices & Agro Processing',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline:
      'From Raw Materials to Finished Products — Keep Every Processing Operation Connected.',

    subhead:
      'Connect procurement, raw materials, quality, production, batch workflows, inventory, warehousing, sales, distribution, and business operations through one platform built to bring greater visibility and coordination to spices and agro-processing businesses.',

    bg: '/images/agro_materials_to_finished_products.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Raw Material, Every Batch — Every Processing Movement Connected.',

    subhead:
      'Connect sourcing, raw materials, quality checks, production, inventory, warehousing, finished goods, sales, and distribution through one platform—so teams can maintain better visibility as products move from origin through processing and into the market.',

    bg: '/images/agro_traceability_production.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Batch, Warehouse and Product Movement — In One Connected View.',

    subhead:
      'Bring procurement, raw-material stores, production, quality inspection, inventory, warehousing, sales, and dispatch together in one connected platform. Gain better visibility across operations and make faster decisions as products move through your business.',

    bg: '/images/agro_quality_operational_control.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'See How UpWon Connects Your Operations',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Source Better, Process Smarter — Manage Every Movement in One Flow.',

    subhead:
      'Simplify the journey from raw-material procurement through processing, quality, storage, sales, and distribution with one connected platform designed to help growing spices and agro-processing businesses stay coordinated.',

    bg: '/images/agro_scale_growth.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function SpicesAgroHeroSection() {
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
