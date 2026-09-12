import HeroSlider from '../../ui/HeroSlider.jsx';

/*
  Why UpWon — Hero Section
  Dedicated 4-slide hero for: /why-upwon

  Each slide takes one angle on the brand-level argument — one connected
  platform, built for how Indian businesses actually run, end-to-end
  visibility, and growing without added complexity. Headlines split on an
  em-dash so the setup sits lighter and the payoff carries the weight,
  matching the product and industry pages.

  PLACEHOLDER: the backgrounds below are the site's generic hero artwork.
  Swap in dedicated Why UpWon imagery when it is available.
*/

const EYEBROW = 'WHY UPWON';
const ACCENT = '#E85A2A';

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
      'Many Systems, One Business — Bring Every Operation Into a Single Connected Platform.',

    subhead:
      'Most growing businesses run on a mix of separate tools, spreadsheets, and manual follow-ups. UpWon brings procurement, production, inventory, warehouses, sales, dispatch, people, and reporting together—so teams work from one connected view instead of chasing information across systems.',

    bg: '/images/hero%20bg.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Built Around Real Operations — Not Retrofitted to Fit Them.',

    subhead:
      'UpWon is shaped by how Indian manufacturing, food, and distribution businesses actually work—batches, multiple locations, field teams, distributors, and everyday compliance. The workflows match what your teams already do, so adoption feels natural rather than forced.',

    bg: '/images/hero%20bg%202.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'From Raw Materials to Final Delivery — Every Movement in One View.',

    subhead:
      'Track materials as they move through purchase, production, quality, storage, sales, and dispatch. With one connected record behind every stage, teams get clearer visibility and can act on what is happening now instead of reconciling reports later.',

    bg: '/images/hero%20bg3.webp',

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
      'Grow Without Adding Complexity — One Platform That Scales With You.',

    subhead:
      'New locations, new products, new channels, and larger teams should not mean another disconnected system. UpWon is built to expand with your business, keeping operations coordinated as scale increases.',

    bg: '/images/home_hero_bg.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function WhyUpwonHeroSection() {
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
