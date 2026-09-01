import HeroSlider from '../../ui/HeroSlider.jsx';

/*
  FMCG Distribution Hero Section
  Dedicated 4-slide hero for:
  /industries/fmcg-distribution

  Each slide carries one angle — speed, confidence, visibility, scale — with
  the artwork that was written for it.
*/

const EYEBROW = 'FMCG DISTRIBUTION';
const ACCENT = '#E85A2A';

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const heroSlides = [
  {
    eyebrow: EYEBROW,

    headline: 'Move Products Faster — Keep Every Channel Connected.',

    subhead:
      'Manage procurement, inventory, warehouses, distributors, sales orders, and deliveries through one connected platform built to bring greater visibility, control, and efficiency to your FMCG distribution operations.',

    bg: '/images/move_product_faster.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'Explore UpWon for FMCG Distribution',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: EYEBROW,

    headline:
      'From Procurement to Delivery — Move Every Order with Confidence.',

    subhead:
      'Connect procurement, inventory, warehouses, distributors, orders, and deliveries in one platform—so your teams can reduce delays, improve visibility, and keep products moving efficiently across every channel.',

    bg: '/images/procument_to_delivery.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'Explore UpWon for FMCG Distribution',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: EYEBROW,

    headline: 'Your Entire Distribution Network — One Connected View.',

    subhead:
      'Bring products, inventory, warehouses, distributors, sales orders, and deliveries together in one connected platform. Gain the visibility and control you need to make faster decisions and keep your distribution operation on track.',

    bg: '/images/one_connected_view.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'See How UpWon Connects FMCG Distribution',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: EYEBROW,

    headline: 'A Faster, Smarter Distribution Operation — Built to Scale.',

    subhead:
      'Simplify the flow from procurement to delivery with one connected platform for managing inventory, warehouses, distributors, sales orders, and fulfillment—helping your FMCG business operate efficiently as it grows.',

    bg: '/images/build_a_faster.webp',

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'Explore UpWon for FMCG Distribution',
      to: '/what-is-upwon',
    },
  },
];

export default function FmcgDistributionHeroSection() {
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
