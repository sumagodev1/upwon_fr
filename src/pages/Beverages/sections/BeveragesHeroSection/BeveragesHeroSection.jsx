import { useEffect, useState } from 'react';
import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';
import { fetchBeverageHeroSlides } from '../../../../lib/beveragePage.js';

/*
  Beverages & Juices Hero Section
  Dedicated 4-slide hero for:
  /industries/beverage

  Each slide carries its own artwork and takes one angle on the vertical —
  the opener, then production and product visibility, quality and control, and
  scale. Headlines split on an em-dash so the setup sits lighter and the
  payoff carries the weight, matching the product pages.
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
      'From Ingredients to Every Bottle — Keep Your Beverage Operations Connected.',

    subhead:
      'Connect procurement, ingredients, recipes, production, quality, inventory, packaging, warehouses, sales, distribution, and business operations through one platform built to bring greater visibility and coordination to growing beverage and juice businesses.',

    bg: '/images/bev_from_ingredients_to_every_bottle.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Ingredient, Every Batch — Every Bottle Movement Connected.',

    subhead:
      'Connect procurement, ingredients, recipes, production, quality, packaging, inventory, warehouses, sales, and distribution through one platform—so teams can maintain better visibility as beverage products move from production to every sales channel.',

    bg: '/images/bev_production_and_product_visibility.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Every Batch, Warehouse and Product Movement — In One Connected View.',

    subhead:
      'Bring procurement, raw-material stores, recipe workflows, production, quality inspection, inventory, packaging, sales, and dispatch together in one connected platform. Gain better visibility across operations and make faster decisions as products move through your business.',

    bg: '/images/bev_quality_operational_control.webp',

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
      'Produce Smarter, Move Faster — Manage Every Channel in One Flow.',

    subhead:
      'Simplify the journey from ingredient procurement through production, packaging, storage, sales, and distribution with one connected platform designed to help beverage and juice businesses stay coordinated as they grow.',

    bg: '/images/bev_scale_and_growth.webp',

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },
];

export default function BeveragesHeroSection() {
  const [cmsSlides, setCmsSlides] = useState(null);

  /*
    The fetch lives here rather than on the page, because this section only
    renders on /industries/beverage. The built-in slides above are the
    fallback: shown during the SSG build, while the fetch is in flight, and
    whenever the API is unreachable or has nothing published.
  */
  useEffect(() => {
    let cancelled = false;

    fetchBeverageHeroSlides().then((slides) => {
      if (!cancelled && slides.length > 0) setCmsSlides(slides);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // The accent is the page's, not the slide's, so it is applied to whichever
  // list is in play.
  const slides = cmsSlides ? cmsSlides.map((s) => ({ accent: ACCENT, ...s })) : heroSlides;

  return (
    <HeroSlider
      slides={slides}
      variant="dark"
      intervalMs={5000}
      minHeight="min-h-[520px] sm:min-h-[560px] md:min-h-[620px]"
      topPad="pt-32 md:pt-40"
    />
  );
}
