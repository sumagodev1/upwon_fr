import HeroSlider from '../ui/HeroSlider.jsx';

/*
  Operations Insider Hero Section
  Dedicated 3-slide hero for: /newsletter and /newsletter/:issueSlug

  Each slide takes one angle on the newsletter — what it is, what ships in
  it, and why it lands on operators' desks. Headlines split on an em-dash so
  the setup sits lighter and the payoff carries the weight, matching the
  product and industry pages.

  The eyebrow carries the issue being viewed, so the hero still says which
  issue you are on the way the old issue chip did.
*/

const ACCENT = '#E85A2A';

/*
  The three backdrops the page's previous hero carried, kept as they were.
  They are remote (Unsplash) rather than local files like most heroes on the
  site — swap in local webp when dedicated artwork exists.
*/
const UNSPLASH = 'https://images.unsplash.com/photo-';

const BG_DESK = `${UNSPLASH}1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=60`;

export default function InsiderHeroSection({ issue, footer = null }) {
  const eyebrow = issue
    ? `${issue.label} · ISSUE ${issue.issueNumber}`
    : 'OPERATIONS INSIDER';

  const heroSlides = [
    {
      eyebrow,

      headline:
        'The UpWon Operations Insider — Monthly Intelligence for Food & FMCG Operators.',

      subhead:
        "Product updates, industry shifts, compliance changes, and what's actually working on the ground. One email a month, written for the people who run the plant, the counter and the route.",

      bg: BG_DESK,

      accent: ACCENT,
    },
  ];

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
