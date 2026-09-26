import { useEffect, useState } from 'react';
import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';
import { fetchInsiderHeroSlides } from '../../../../lib/insiderPage.js';

/*
  Operations Insider Hero Section
  Dedicated hero for: /newsletter and /newsletter/:issueSlug

  Headlines split on an em-dash so the setup sits lighter and the payoff
  carries the weight, matching the product and industry pages (see
  renderHeadline in HeroSlider).

  The eyebrow always carries the issue being viewed, so the hero still says
  which issue you are on the way the old issue chip did. Slides have no
  eyebrow of their own.
*/

const ACCENT = '#E85A2A';

/*
  The backdrop the page's previous hero carried, kept as it was. It is remote
  (Unsplash) rather than a local file like most heroes on the site — swap in
  local webp when dedicated artwork exists. It is also the backdrop for any
  published slide that carries no image of its own.
*/
const UNSPLASH = 'https://images.unsplash.com/photo-';

const BG_DESK = `${UNSPLASH}1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=60`;

/*
  The built-in slide.

  This is the fallback, not the source of truth: slides published through the
  admin panel's Insider → Hero Section tab replace it at runtime. It still
  matters — it is what the SSG build bakes into the prerendered HTML and what
  renders if the API is unreachable.

  It is written in the shape lib/insiderPage.js returns, so built-in and
  published slides share one mapping below.
*/
const FALLBACK_SLIDES = [
  {
    headline:
      'The UpWon Operations Insider — Monthly Intelligence for Food & FMCG Operators.',

    subhead:
      "Product updates, industry shifts, compliance changes, and what's actually working on the ground. One email a month, written for the people who run the plant, the counter and the route.",

    bg: BG_DESK,

    mobileBg: null,
  },
];

export default function InsiderHeroSection({ issue, footer = null }) {
  const issueEyebrow = issue
    ? `${issue.label} · ISSUE ${issue.issueNumber}`
    : 'OPERATIONS INSIDER';

  /*
    Slides start as the built-in one and are swapped for the published ones
    once the API answers — the same order as the home hero, for the same
    reason: the headline is the LCP element and the page is prerendered, so
    the first paint must come from markup that already exists.

    fetchInsiderHeroSlides resolves to null for every failure — unconfigured,
    offline, CORS, nothing published — and null means "keep what you have".
  */
  const [slides, setSlides] = useState(FALLBACK_SLIDES);

  useEffect(() => {
    let cancelled = false;
    fetchInsiderHeroSlides().then((published) => {
      if (cancelled || !published) return;
      setSlides(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const heroSlides = slides.map((slide) => ({
    eyebrow: issueEyebrow,

    headline: slide.headline,

    subhead: slide.subhead,

    bg: slide.bg || BG_DESK,

    // Only a published slide can carry one; HeroSlider ignores null.
    mobileBg: slide.mobileBg,

    accent: ACCENT,
  }));

  return (
    <HeroSlider
      slides={heroSlides}
      variant="dark"
      intervalMs={5000}
      minHeight="min-h-[520px] sm:min-h-[560px] md:min-h-[620px]"
      topPad="pt-32 md:pt-40"
      footer={footer}
    />
  );
}
