// src/lib/posPage.js

// Same guarded read as lib/fmsPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The POS product page's CMS reads.
 *
 * Same three rules as lib/fmsPage.js, and for the same reasons:
 *
 *   - never during the SSG build, because the prerendered HTML must be the
 *     copy the site ships rather than whatever the API happened to hold at
 *     build time
 *   - never throw, because an unreachable CMS should leave the page exactly as
 *     it was, not blank it
 *   - unconfigured is a valid state, so a site built without an API base URL
 *     simply renders its own content
 *
 * Each returns null - or an empty list - to mean "keep what you have".
 */

const guard = () => typeof window !== 'undefined' && Boolean(BASE);

async function readSection(path) {
  if (!guard()) return null;
  try {
    const res = await fetch(`${BASE}/public/pos-page/${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const body = await res.json();
    if (!body || body.success !== true) return null;
    return body.data ?? null;
  } catch {
    return null;
  }
}

/** A button is only usable with both halves. */
const usableCta = (cta) =>
  cta && typeof cta.label === 'string' && typeof cta.href === 'string' ? cta : null;

/**
 * The published hero slides, or an empty array to mean "keep the built-in set".
 *
 * Renamed to the keys HeroSlider already takes, so the page passes the array
 * straight through.
 *
 * @returns {Promise<Array<{eyebrow: string, headline: string, headingLines: Array,
 *   subhead: string, microTrust: string | null, cta: object | null,
 *   secondaryCta: object | null, bg: string | null, bgMobile: string | null}>>}
 */
export async function fetchPosHeroSlides() {
  const data = await readSection('hero-section');
  if (!Array.isArray(data)) return [];

  return data
    .filter(
      (slide) =>
        slide &&
        typeof slide.eyebrow === 'string' &&
        typeof slide.headline === 'string' &&
        typeof slide.subhead === 'string',
    )
    .map((slide) => ({
      eyebrow: slide.eyebrow,
      headline: slide.headline,
      // The parsed form, for a slider that wants the accent spans.
      headingLines: Array.isArray(slide.headlineLines) ? slide.headlineLines : null,
      subhead: slide.subhead,
      microTrust: typeof slide.microTrust === 'string' ? slide.microTrust : null,
      cta: usableCta(slide.cta),
      secondaryCta: usableCta(slide.secondaryCta),
      // HeroSlider calls the background `bg`.
      bg: typeof slide.image === 'string' ? slide.image : null,
      // The portrait crop for phones. Null leaves the slider showing `bg` at
      // every size, which is what every slide does today.
      bgMobile: typeof slide.mobileImage === 'string' ? slide.mobileImage : null,
    }));
}

// An FAQ section is only usable with its copy and at least one question.
function isRenderableFaq(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.faqs) &&
    section.faqs.length > 0
  );
}

/**
 * The published FAQ section, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, faqs: Array<{q: string, a: string}>} | null>}
 */
export async function fetchPosFaqSection() {
  const section = await readSection('faq-section');
  if (!isRenderableFaq(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    faqs: section.faqs.filter(
      (faq) => faq && typeof faq.q === 'string' && typeof faq.a === 'string',
    ),
  };
}

/*
 * The closing band needs its copy and its first button; the artwork is optional,
 * because the component ships its own and falls back to a cream ground without
 * it. The second button and the handwritten note are optional too - the band
 * reads fine with one button, and the note is only drawn on large screens.
 */
function isRenderableCta(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    section.primary &&
    typeof section.primary.label === 'string' &&
    section.primary.label !== '' &&
    typeof section.primary.href === 'string' &&
    section.primary.href !== ''
  );
}

/**
 * The published closing band, or null to mean "keep what you have".
 *
 * `note` arrives as authored text with a newline for its line break, which the
 * band splits when it draws it.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   desktopImage: string | null, mobileImage: string | null,
 *   primary: {label: string, href: string},
 *   secondary: {label: string, href: string} | null,
 *   footnote: string | null, note: string | null} | null>}
 */
export async function fetchPosCtaSection() {
  const section = await readSection('cta-section');
  if (!isRenderableCta(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    desktopImage: typeof section.desktopImage === 'string' ? section.desktopImage : null,
    mobileImage: typeof section.mobileImage === 'string' ? section.mobileImage : null,
    primary: { label: section.primary.label, href: section.primary.href },
    secondary: usableCta(section.secondary),
    footnote: typeof section.footnote === 'string' ? section.footnote : null,
    note: typeof section.note === 'string' ? section.note : null,
  };
}

/**
 * A strip is only worth swapping in when it can actually be drawn: a heading,
 * and at least one of the two panels with something in it. One empty panel is
 * fine - a wall with no figures, or figures with no wall, still reads.
 */
function isRenderableProof(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    ((Array.isArray(section.logos) && section.logos.length > 0) ||
      (Array.isArray(section.stats) && section.stats.length > 0))
  );
}

/**
 * The published proof strip, or null to mean "keep the built-in one".
 *
 * Three fields per figure rather than the FMS page's five: this strip draws a
 * single divided row in one accent, with the source inside the label, so there
 * is no per-card colour or second line to carry.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   logos: Array<{image: string, alt: string}>,
 *   stats: Array<{icon: string, value: string, label: string}>} | null>}
 */
export async function fetchPosProofSection() {
  const section = await readSection('proof-section');
  if (!isRenderableProof(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    logos: Array.isArray(section.logos)
      ? section.logos.filter(
          (logo) => logo && typeof logo.image === 'string' && typeof logo.alt === 'string',
        )
      : [],
    stats: Array.isArray(section.stats)
      ? section.stats
          .filter(
            (stat) => stat && typeof stat.value === 'string' && typeof stat.label === 'string',
          )
          .map((stat) => ({
            icon: typeof stat.icon === 'string' ? stat.icon : '',
            value: stat.value,
            label: stat.label,
          }))
      : [],
  };
}

/**
 * A category map is only worth swapping in when it can be drawn: a heading and
 * at least one card. Unlike the proof strip there is no half-empty case that
 * still reads - a heading beside an empty grid is a hole, not a section.
 */
function isRenderableRecognition(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.categories) &&
    section.categories.length > 0
  );
}

/**
 * The published category map, or null to mean "keep the built-in one".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   categories: Array<{icon: string, title: string, description: string}>} | null>}
 */
export async function fetchPosRecognitionSection() {
  const section = await readSection('recognition-section');
  if (!isRenderableRecognition(section)) return null;

  const categories = section.categories.filter(
    (c) => c && typeof c.title === 'string' && typeof c.description === 'string',
  );
  if (categories.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    categories: categories.map((c) => ({
      icon: typeof c.icon === 'string' ? c.icon : '',
      title: c.title,
      description: c.description,
    })),
  };
}

/**
 * A video section is only worth swapping in when there is a heading and
 * something to play - the copy alone would leave a black box under a promise.
 */
function isRenderableVideo(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.video === 'string' &&
    section.video !== ''
  );
}

/**
 * The published video section, or null to mean "keep the built-in one".
 *
 * One entry is live at a time, so this is a single object rather than a list -
 * the server picks the active row and sends just its source.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   video: string} | null>}
 */
export async function fetchPosVideoSection() {
  const section = await readSection('video-section');
  if (!isRenderableVideo(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    video: section.video,
  };
}

/** A row of tiers needs a heading and at least one card to compare. */
function isRenderableGrowth(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.tiers) &&
    section.tiers.length > 0
  );
}

/** A tier is only drawable with its copy and a button to act on. */
const usableTier = (tier) =>
  tier &&
  typeof tier.slug === 'string' &&
  typeof tier.name === 'string' &&
  typeof tier.lead === 'string' &&
  typeof tier.buttonLabel === 'string' &&
  typeof tier.buttonHref === 'string';

/**
 * The published growth path, or null to mean "keep what you have".
 *
 * The footnote arrives twice: the raw text, and `footnoteLines` parsed into
 * the accent tree. This page draws that line with an orange half, so it is the
 * parsed form the section renders - the raw string is kept only so a caller
 * that wants plain text has it.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   footnote: string | null, footnoteLines: Array | null,
 *   tiers: Array<{slug: string, name: string, lead: string, tagline: string,
 *     scope: string, inheritsLabel: string | null, buttonLabel: string,
 *     buttonHref: string, isPopular: boolean, features: string[]}>} | null>}
 */
export async function fetchPosGrowthSection() {
  const section = await readSection('growth-section');
  if (!isRenderableGrowth(section)) return null;

  const tiers = section.tiers.filter(usableTier).map((tier) => ({
    slug: tier.slug,
    name: tier.name,
    lead: tier.lead,
    tagline: typeof tier.tagline === 'string' ? tier.tagline : '',
    scope: typeof tier.scope === 'string' ? tier.scope : '',
    inheritsLabel: typeof tier.inheritsLabel === 'string' ? tier.inheritsLabel : null,
    buttonLabel: tier.buttonLabel,
    buttonHref: tier.buttonHref,
    isPopular: tier.isPopular === true,
    features: Array.isArray(tier.features)
      ? tier.features.filter((f) => typeof f === 'string' && f !== '')
      : [],
  }));
  if (tiers.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    footnote: typeof section.footnote === 'string' ? section.footnote : null,
    footnoteLines: Array.isArray(section.footnoteLines) ? section.footnoteLines : null,
    tiers,
  };
}

/**
 * The band needs its heading and its furniture; the three lists under it can
 * each be empty without the section breaking, because the component draws
 * fewer things rather than the wrong thing.
 */
function isRenderableSecurity(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.panelOneLabel === 'string' &&
    typeof section.panelTwoLabel === 'string' &&
    typeof section.dataHeading === 'string' &&
    typeof section.dataBody === 'string'
  );
}

/**
 * The published security band, or null to mean "keep the built-in one".
 *
 * The sphere caption arrives twice: the raw text, and `sphereFootnoteLines`
 * parsed into the accent tree the section actually renders.
 *
 * @returns {Promise<object | null>}
 */
export async function fetchPosSecuritySection() {
  const section = await readSection('security-section');
  if (!isRenderableSecurity(section)) return null;

  const list = (rows, keep) => (Array.isArray(rows) ? rows.filter(keep) : []);

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',

    panelOneLabel: section.panelOneLabel,
    panelTwoLabel: section.panelTwoLabel,
    shieldImage: typeof section.shieldImage === 'string' ? section.shieldImage : null,

    sphereFootnoteLines: Array.isArray(section.sphereFootnoteLines)
      ? section.sphereFootnoteLines
      : null,

    dataIcon: typeof section.dataIcon === 'string' ? section.dataIcon : '',
    dataHeading: section.dataHeading,
    dataBody: section.dataBody,
    dataLeftImage: typeof section.dataLeftImage === 'string' ? section.dataLeftImage : null,
    dataRightImage: typeof section.dataRightImage === 'string' ? section.dataRightImage : null,

    badges: list(
      section.badges,
      (b) => b && typeof b.title === 'string' && typeof b.subtext === 'string',
    ).map((b) => ({
      icon: typeof b.icon === 'string' ? b.icon : '',
      title: b.title,
      subtext: b.subtext,
    })),
    logos: list(
      section.logos,
      (l) => l && typeof l.image === 'string' && typeof l.alt === 'string',
    ).map((l) => ({ src: l.image, alt: l.alt })),
    assurances: list(section.assurances, (a) => a && typeof a.label === 'string').map((a) => ({
      icon: typeof a.icon === 'string' ? a.icon : '',
      label: a.label,
    })),
  };
}

/** A grid needs a heading, at least one column to compare and a row to fill. */
function isRenderableAlternatives(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.columns) &&
    Array.isArray(section.rows)
  );
}

/**
 * The published comparison grid, or null to mean "keep the built-in one".
 *
 * Cells arrive keyed by column id, each holding a rating or a string - never
 * both, which is the rule the API enforces. The capability rows are scored;
 * the closing cost row is a SUMMARY row written in words, and `rowType` is
 * what tells the two apart.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   leaderLabel: string,
 *   columns: Array<{id: string, name: string, highlight: boolean}>,
 *   rows: Array<{parameter: string, rowType: string, cells: object}>} | null>}
 */
export async function fetchPosAlternativesSection() {
  const section = await readSection('alternatives-section');
  if (!isRenderableAlternatives(section)) return null;

  const columns = section.columns.filter(
    (column) => column && typeof column.id === 'string' && typeof column.name === 'string',
  );
  if (columns.length === 0) return null;

  const rows = section.rows
    .filter((row) => row && typeof row.parameter === 'string')
    .map((row) => ({
      parameter: row.parameter,
      rowType: typeof row.rowType === 'string' ? row.rowType : 'STANDARD',
      cells: row.cells && typeof row.cells === 'object' ? row.cells : {},
    }));
  if (rows.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    leaderLabel: typeof section.leaderLabel === 'string' ? section.leaderLabel : 'Capability',
    columns: columns.map((column) => ({
      id: column.id,
      name: column.name,
      highlight: column.highlight === true,
    })),
    rows,
  };
}

/** A card is only drawable with its artwork, its quote and somewhere to go. */
const usableStory = (story) =>
  story &&
  typeof story.slug === 'string' &&
  typeof story.logo === 'string' &&
  typeof story.photo === 'string' &&
  typeof story.quote === 'string';

/**
 * The published outcome marquee, or null to mean "keep the built-in one".
 *
 * No figures on these cards, unlike the FMS page's - the quote is the whole
 * card, which is why there is nothing here to carry them.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   stories: Array<object>} | null>}
 */
export async function fetchPosOutcomesSection() {
  const section = await readSection('outcomes-section');
  if (
    !section ||
    !Array.isArray(section.headingLines) ||
    section.headingLines.length === 0 ||
    !Array.isArray(section.stories)
  ) {
    return null;
  }

  const stories = section.stories.filter(usableStory).map((story) => ({
    slug: story.slug,
    name: story.name,
    logo: story.logo,
    photo: story.photo,
    quote: story.quote,
    personName: typeof story.personName === 'string' ? story.personName : '',
    personCompany: typeof story.personCompany === 'string' ? story.personCompany : '',
    linkLabel: typeof story.linkLabel === 'string' ? story.linkLabel : '',
    linkHref: typeof story.linkHref === 'string' ? story.linkHref : '/demo',
  }));
  if (stories.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    stories,
  };
}
