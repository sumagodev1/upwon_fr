import HeroSlider from '../../ui/HeroSlider.jsx';

/*
  Engineering & Manufacturing Hero Section
  Dedicated 4-slide hero for:
  /industries/engineering-manufacturing

  No dedicated hero artwork was supplied for this vertical, so these use the
  largest manufacturing, production, quality and distribution images already
  in public/images. Swap them for the real artwork when it lands.
*/

const EYEBROW = 'ENGINEERING & MANUFACTURING';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore UpWon for Engineering & Manufacturing',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline:
      'From Raw Materials to Finished Products — Keep Every Manufacturing Operation Connected.',

    subhead:
      'Connect procurement, raw materials, bill of materials, production planning, quality, inventory, warehouses, sales, dispatch, people, and business operations through one platform built to bring greater visibility and coordination to growing engineering and manufacturing businesses.',

    bg: '/images/vms_contract_manufacturing.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Material, Every Process — Every Production Movement Connected.',

    subhead:
      'Connect procurement, raw materials, bill of materials, production planning, quality, inventory, warehouses, finished goods, sales, and dispatch through one platform—so teams can maintain better visibility as materials move through every stage of manufacturing.',

    bg: '/images/prod_operation.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Material, Process, Warehouse and Product Movement — In One Connected View.',

    subhead:
      'Bring procurement, raw-material stores, bill of materials, production, quality inspection, inventory, warehouses, sales, and dispatch together in one connected platform. Gain better visibility across operations and make faster decisions as products move through your business.',

    bg: '/images/vms_deliver_quality.webp',

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
      'Plan Better, Produce Smarter — Manage Every Manufacturing Movement in One Flow.',

    subhead:
      'Simplify the journey from raw-material procurement through production, quality, storage, sales, and dispatch with one connected platform designed to help engineering and manufacturing businesses stay coordinated as they grow.',

    bg: '/images/wms_auto_components_spare_parts_distribution.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function EngineeringHeroSection() {
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
