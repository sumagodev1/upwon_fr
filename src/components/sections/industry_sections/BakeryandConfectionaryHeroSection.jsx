import HeroSlider from '../../ui/HeroSlider.jsx';

/*
  Bakery & Confectionery Hero Section
  Dedicated 3-slide hero for:
  /industries/bakery-and-confectionery
*/

const heroSlides = [
  {
    eyebrow: 'BAKERY & CONFECTIONERY',

    headline: 'Bake Better. Manage Smarter — Deliver Fresh Every Time.',

    subhead:
      'From ingredient procurement and batch production to inventory, sales, and delivery, UpWon helps bakeries and confectionery businesses bring every operation into one connected system.',

    bg: '/images/bakertandconfenary1.webp',

    accent: '#E85A2A',

    cta: {
      label: 'Book Free Demo',
      to: '/demo',
    },

    secondaryCta: {
      label: 'Explore UpWon',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: 'BAKERY & CONFECTIONERY',

    headline:
      'From Fresh Ingredients to Finished Delights — Keep Every Operation Connected.',

    subhead:
      'Manage procurement, inventory, production, batch planning, and multi-location operations through one connected platform built to bring greater visibility, control, and efficiency to your bakery business.',

    bg: '/images/bakertandconfenary2.webp',

    accent: '#E85A2A',

    cta: {
      label: 'Book Free Demo',
      to: '/demo',
    },

    secondaryCta: {
      label: 'Explore UpWon',
      to: '/what-is-upwon',
    },
  },

  {
    eyebrow: 'BAKERY & CONFECTIONERY',

    headline: 'Bake More. Waste Less — Grow with Better Control.',

    subhead:
      'UpWon helps bakery and confectionery businesses streamline ingredient management, production planning, inventory movement, and daily operations—so every batch, product, and business decision stays on track.',

    bg: '/images/bakertandconfenary3.webp',

    accent: '#E85A2A',

    cta: {
      label: 'Book Free Demo',
      to: '/demo',
    },

    secondaryCta: {
      label: 'Explore UpWon',
      to: '/what-is-upwon',
    },
  },
];

export default function BakeryandConfectionaryHeroSection() {
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