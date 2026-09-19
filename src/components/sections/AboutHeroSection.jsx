import HeroSlider from '../ui/HeroSlider.jsx';

/*
  About Hero Section
  Dedicated 3-slide hero for: /about

  Each slide takes one angle on the company — the lived experience the
  product came out of, what was built from it, and where it was built.
  Headlines split on an em-dash so the setup sits lighter and the payoff
  carries the weight, matching the product and industry pages.
*/

const EYEBROW = 'ABOUT UPWON & BYTE ELEPHANTS TECHNOLOGIES';
const ACCENT = '#E85A2A';

/*
  The three backdrops the page's previous hero carried, kept as they were.
  They are remote (Unsplash) rather than local files like most heroes on the
  site — swap in local webp when dedicated artwork exists.
*/
const UNSPLASH = 'https://images.unsplash.com/photo-';

const BG_TEAM = `${UNSPLASH}1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=60`;
const BG_WORKSHOP = `${UNSPLASH}1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=60`;
const BG_PLANT = `${UNSPLASH}1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1600&q=60`;

const DEMO_CTA = {
  label: 'Talk to Our Team',
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
      'We Build Software That Understands Your Business — Because We Have Lived In It.',

    subhead:
      'UpWon is a bootstrapped Food & FMCG ERP built in Nashik by people who ran factory floors, delivery routes and franchise counters long before writing a line of code.',

    bg: BG_TEAM,

    accent: ACCENT,

    cta: DEMO_CTA,
    secondaryCta: EXPLORE_CTA,
  },

  {
    eyebrow: EYEBROW,

    headline: 'Seven Integrated Platforms — On One Data Spine.',

    subhead:
      'ERP, SFA-DMS, FMS, POS, HRMS, WMS and Vendor Portal, built to work as one system rather than seven that need stitching together. A product house shipping enterprise software since 2016.',

    bg: BG_WORKSHOP,

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'Meet Our Clients',
      to: '/clients',
    },
  },

  {
    eyebrow: EYEBROW,

    headline:
      'Bootstrapped, Customer-Funded and Nashik-Born — Built to Outlast the Hype.',

    subhead:
      'No outside money and no growth-at-any-cost roadmap. The product is funded by the operators who use it, which keeps what we build answerable to the plant floor rather than to a term sheet.',

    bg: BG_PLANT,

    accent: ACCENT,

    cta: DEMO_CTA,

    secondaryCta: {
      label: 'Join Us',
      to: '/careers',
    },
  },
];

export default function AboutHeroSection() {
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
