import HeroSlider from '../../ui/HeroSlider.jsx';

/*
  Dairy & Ice Cream Hero Section
  Dedicated 4-slide hero for:
  /industries/dairy

  Each slide carries its own artwork and takes one angle on the vertical —
  the opener, then production and freshness, visibility and control, and
  scale. Headlines split on an em-dash so the setup sits lighter and the
  payoff carries the weight, matching the product pages.
*/

const EYEBROW = 'DAIRY & ICE CREAM';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore UpWon for Dairy & Ice Cream',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline:
      'From Fresh Production to Every Cold-Chain Movement — Keep Every Operation Connected.',

    subhead:
      'Manage procurement, raw materials, production, quality, inventory, cold storage, warehouses, sales, distribution, and business operations through one connected platform built to bring greater visibility, control, and coordination to your dairy and ice cream business.',

    bg: '/images/dairy_hero_freshness_visibility.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Batch, Every Product — Every Temperature-Sensitive Movement Connected.',

    subhead:
      'Connect milk procurement, ingredients, production, quality, inventory, cold storage, finished products, sales, and distribution through one platform—so your teams can maintain better visibility across every stage of your dairy and ice cream operations.',

    bg: '/images/dairy_hero_every_batch.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Batch, Location and Product Movement — In One Connected View.',

    subhead:
      'Bring procurement, production, inventory, quality, cold storage, warehouses, sales, and distribution together in one connected platform. Gain better visibility across operations and make faster, more informed decisions as products move through your business.',

    bg: '/images/dairy_hero_visibility_control.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'See How UpWon Connects Your Operations',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: EYEBROW,

    headline: 'Produce Fresh, Move Faster — Manage Everything in One Flow.',

    subhead:
      'Simplify the journey from milk and ingredient procurement through production, storage, sales, and distribution with one connected platform designed to help dairy and ice cream businesses stay coordinated as they grow.',

    bg: '/images/dairy_hero_scale_growth.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function DairyIceCreamHeroSection() {
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
