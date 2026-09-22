import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';

/*
  QSR & Franchise F&B Hero Section
  Dedicated 4-slide hero for:
  /industries/qsr-franchise

  Each slide carries its own artwork and takes one angle on the vertical —
  the opener, then multi-outlet control, consistency, and scale. Headlines
  split on an em-dash so the setup sits lighter and the payoff carries the
  weight, matching the product pages.
*/

const EYEBROW = 'QSR & FRANCHISE F&B';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore UpWon for QSR & Franchise F&B',
  to: '/what-is-upwon',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline:
      'From Central Kitchen to Every Outlet — Keep Your F&B Operations Connected.',

    subhead:
      'Manage procurement, recipes, production, inventory, central kitchens, outlets, franchise operations, people, sales, distribution, and business performance through one connected platform built to bring greater visibility, control, and coordination to your growing food business.',

    bg: '/images/qsr_hero_central_kitchan.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Recipe, Every Outlet — Every Operational Movement Connected.',

    subhead:
      'Connect central kitchens, ingredients, recipes, production, inventory, outlets, franchise partners, orders, people, and business operations through one platform—so your teams can maintain better visibility across every location.',

    bg: '/images/qsr_hero_multi_outlet.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Kitchen, Outlet, Franchise and Product Movement — In One Connected View.',

    subhead:
      'Bring procurement, production, inventory, central kitchens, outlets, franchise operations, sales, and reporting together in one connected platform. Gain better visibility across locations and maintain stronger operational coordination as your network grows.',

    bg: '/images/qsr_hero_consistancy_control.webp',

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
      'Open More Outlets, Move Faster — Manage Every Location in One Flow.',

    subhead:
      'Simplify the journey from procurement and central production to outlet inventory, sales, workforce, franchise operations, and business reporting with one connected platform designed to help food brands scale with greater control.',

    bg: '/images/qsr_hero_scale_growth.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function QsrFranchiseHeroSection() {
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
