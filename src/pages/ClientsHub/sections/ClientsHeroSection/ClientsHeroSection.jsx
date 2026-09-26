import { useEffect, useState } from 'react';
import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';
import { fetchClientsHeroSlides } from '../../../../lib/clientsPage.js';

/*
  Clients Hero Section
  Dedicated hero for: /clients

  Headlines split on an em-dash so the setup sits lighter and the payoff
  carries the weight, matching the product and industry pages.

  The slides are authored in the admin panel (Clients → Hero Section). The
  eyebrow and the two CTAs belong to the page rather than a slide, so they
  stay here and every published slide carries them.
*/

const EYEBROW = 'CLIENTS & CASE STUDIES';
const ACCENT = '#E85A2A';

/*
  The backdrop the page's previous hero carried. It is remote (Unsplash)
  rather than a local file like most heroes on the site. It is also the
  backdrop for any published slide that carries no image of its own.
*/
const UNSPLASH = 'https://images.unsplash.com/photo-';

const BG_KITCHEN = `${UNSPLASH}1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=60`;

const DEMO_CTA = {
  label: 'Request a Demo',
  to: '/demo',
};

const EXPLORE_CTA = {
  label: 'Explore What UpWon Does',
  to: '/what-is-upwon',
};

/*
  The built-in slide.

  This is the fallback, not the source of truth: slides published through the
  admin panel replace it at runtime. It is what the SSG build bakes into the
  prerendered HTML and what renders if the API is unreachable. Written in the
  shape lib/clientsPage.js returns, so both share one mapping below.
*/
const FALLBACK_SLIDES = [
  {
    headline:
      'The ERP 50+ Food & FMCG Enterprises Chose — Over Everything Else They Tried.',

    subhead:
      'Bakery chains, dairy brands, beverage manufacturers, FMCG distributors and QSR networks run their day on UpWon. Not pilots or proofs of concept — live operations, across 10 states and counting.',

    bg: BG_KITCHEN,

    mobileBg: null,
  },
];

export default function ClientsHeroSection() {
  /*
    Slides start as the built-in one and are swapped for the published ones
    once the API answers — the headline is the LCP element and the page is
    prerendered, so the first paint must come from markup that already exists.
    fetchClientsHeroSlides resolves to null for every failure, and null means
    "keep what you have".
  */
  const [slides, setSlides] = useState(FALLBACK_SLIDES);

  useEffect(() => {
    let cancelled = false;
    fetchClientsHeroSlides().then((published) => {
      if (cancelled || !published) return;
      setSlides(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const heroSlides = slides.map((slide) => ({
    eyebrow: EYEBROW,

    headline: slide.headline,

    subhead: slide.subhead,

    bg: slide.bg || BG_KITCHEN,

    // Only a published slide can carry one; HeroSlider ignores null.
    mobileBg: slide.mobileBg,

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  }));

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
