import { Fragment, useEffect, useMemo, useState } from 'react';
import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';
import { fetchAboutHero } from '../../../../lib/aboutPage.js';

/*
  About Hero Section
  Dedicated hero for: /about

  Authored in the admin panel's About Us → Hero Section tab: the eyebrow, the
  heading, the subtext and the ordered backdrop list. The heading uses the home
  hero's two markers — a newline for a line break, `**like this**` for the orange
  accent — and arrives parsed into `headingLines`, so this file renders it the way
  the home, Contact and Partner heroes do and never has to know the marker
  grammar. The two buttons are behaviour, not content, and stay below.

  WHAT PUBLISHING CHANGES, and it is worth knowing before the tab is saved:

  The built-in hero is three slides, each with its own headline taking one angle
  on the company — the lived experience the product came out of, what was built
  from it, and where it was built. The panel holds ONE set of copy over an ordered
  list of backdrops (about_hero_section is a singleton; the backdrops are a jsonb
  list inside it), so a published hero is one headline over the rotating
  photographs. Two things change the first time the tab is saved, and the seed
  saves it on the first migrate:

    the second and third slides lose their headline, their subhead AND their
    secondary button. 'Meet Our Clients' (/clients) and 'Join Us' (/careers) stay
    in this file and stop being reachable from this hero, because the buttons are
    not authored and every backdrop carries the first slide's pair;

    the headline is styled differently. A built-in headline is a plain string that
    HeroSlider splits on its em dash — setup at 0.84em/medium, payoff extrabold,
    inline, both white. A published one renders through `headingLines` like every
    other CMS headline on the site: full size, a hard break, the accented half in
    orange. Same words, a different picture.

  The alternative — an about_hero_slides list like the home and Insider heroes
  carry, one eyebrow/heading/subtext/backdrop and optional secondary link per
  slide — is a backend change, not something this file can decide.

  Every published slide therefore carries the SAME copy, and carries it under
  HeroSlider's own index keying rather than naming a copy key of its own. That is
  load-bearing rather than incidental: each copy block is the lone child of an
  AnimatePresence mode="wait", and that swap does not complete in this app. A slide
  set whose copy keys CHANGE when the published hero replaces the built-in one
  therefore leaves the built-in words on screen for good — in the built-in
  styling, so the authored `**accent**` never goes orange and the line break never
  appears — while the photographs change behind them. Keyed by index the
  built-in → published swap is an in-place update at an unchanged key, and the
  authored copy renders. See HeroSlider's props note.
*/

const EYEBROW = 'ABOUT UPWON & BYTE ELEPHANTS TECHNOLOGIES';
const ACCENT = '#E85A2A';

/*
  The three backdrops the page's previous hero carried, kept as they were.
  They are remote (Unsplash) rather than local files like most heroes on the
  site — swap in local webp when dedicated artwork exists.

  These same three URLs are what the seed published, in this order, so a freshly
  seeded API rotates exactly these photographs. The photographs are the part of
  the swap that IS invisible — the headline is not, see below.
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

/*
  The built-in slides.

  These are the fallback, not the source of truth: the published hero replaces
  them at runtime. They still matter — they are what the SSG build bakes into the
  prerendered HTML and what renders if the API is unreachable, and the first
  slide's copy is what the seed published verbatim.

  Their headlines are plain strings, so HeroSlider splits them on the em-dash —
  the setup sits lighter and the payoff carries the weight, matching the product
  and industry pages. A published headline is a node instead, carrying the orange
  accent its author marked with `**`, which is how every other CMS-authored
  headline on the site renders.
*/
const FALLBACK_SLIDES = [
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

/*
  One authored heading, rendered line by line with the accented parts in the
  orange gradient — the same renderer the home hero, the Contact hero and the
  Partner hero use.
*/
function Heading({ lines }) {
  return lines.map((parts, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {parts.map((part, partIndex) =>
        part.accent ? (
          <span key={partIndex} className="gradient-text-orange">
            {part.text}
          </span>
        ) : (
          <Fragment key={partIndex}>{part.text}</Fragment>
        ),
      )}
    </Fragment>
  ));
}

export default function AboutHeroSection() {
  /*
    The hero starts as the built-in one and is swapped for the published one once
    the API answers — the same order as the home, Contact, Partner and Insider
    heroes, for the same reason: the headline is the LCP element and the page is
    prerendered, so the first paint must come from markup that already exists.

    fetchAboutHero resolves to null for every failure — unconfigured, offline,
    CORS, nothing authored — and null means "keep what you have".
  */
  const [hero, setHero] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchAboutHero().then((published) => {
      if (!cancelled && published) setHero(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const slides = useMemo(() => {
    if (!hero) return FALLBACK_SLIDES;

    /*
      One slide per backdrop, all carrying the published copy. An author who
      removed every backdrop published a hero with no photograph, and that is what
      renders: a single slide on the section's own navy ground, which is what
      HeroSlider draws for a slide with no `bg`. Falling back to the built-in
      photographs here would make "no backdrop" impossible to publish.

      Each backdrop arrives as `{ bg, mobileBg }` — the photograph and the optional
      portrait crop authored beside it for phones — already in HeroSlider's own key
      names, so both go straight through. A backdrop with no crop of its own leaves
      `mobileBg` null, and HeroSlider then serves `bg` to every viewport and drops
      the <picture> source entirely: which is to say a hero with no crops published
      anywhere renders exactly as it does today.
    */
    const backdrops =
      hero.backdrops.length > 0 ? hero.backdrops : [{ bg: null, mobileBg: null }];

    const headline = <Heading lines={hero.headingLines} />;

    return backdrops.map(({ bg, mobileBg }) => ({
      // Blank is not reachable from the panel — the server requires an eyebrow —
      // so this only covers a row that somehow lost one.
      eyebrow: hero.eyebrow ?? EYEBROW,
      headline,
      subhead: hero.subtext,
      bg,
      mobileBg,
      accent: ACCENT,
      // The buttons are not authored, so every backdrop carries the pair the
      // first slide has always carried.
      cta: DEMO_CTA,
      secondaryCta: EXPLORE_CTA,
    }));
  }, [hero]);

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
