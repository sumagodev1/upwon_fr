import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';

/*
  Non-Food FMCG Hero Section
  Dedicated 4-slide hero for:
  /industries/non-food-fmcg

  Each slide carries one angle — connected operations, market visibility,
  control, and scale — with the artwork written for it. Headlines carry an
  em-dash so HeroSlider renders them with the product-page treatment.
*/

const EYEBROW = 'NON-FOOD FMCG';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore UpWon for Non-Food FMCG',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline:
      'From Production to Every Sales Channel — Keep Your FMCG Operations Connected.',

    subhead:
      'Manage procurement, production, inventory, warehouses, sales, distribution, field operations, finance, and business performance through one connected platform built to bring greater visibility, control, and coordination to your non-food FMCG business.',

    bg: '/images/prod_to_every_sale.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline: 'Every Product. Every Order — Every Market Movement Connected.',

    subhead:
      'Connect products, inventory, warehouses, sales teams, distributors, retailers, orders, and market activity through one platform—so your teams have better visibility across every stage of your FMCG operations.',

    bg: '/images/every_product_order.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Product, Channel, and Business Movement — One Connected View.',

    subhead:
      'Bring procurement, inventory, warehouses, sales, distribution, field teams, and business operations together in one connected platform. Gain better visibility across channels and make faster, more informed decisions as products move through your business.',

    bg: '/images/visibility_and_control.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'See How UpWon Connects Your Operations',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: EYEBROW,

    headline: 'Sell More. Move Faster — Manage Every Channel in One Flow.',

    subhead:
      'Simplify the journey from procurement and inventory to warehousing, sales, distribution, and market execution with one connected platform designed to help growing non-food FMCG businesses stay coordinated across products, teams, channels, and locations.',

    bg: '/images/scale_and_growth.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function NonFoodFmcgHeroSection() {
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
