// src/lib/hreasyPage.js

// Same guarded read as lib/posPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The HREasy product page's CMS reads.
 *
 * Same three rules as lib/posPage.js, and for the same reasons:
 *
 *   - never during the SSG build, because the prerendered HTML must be the
 *     copy the site ships rather than whatever the API happened to hold at
 *     build time
 *   - never throw, because an unreachable CMS should leave the page exactly as
 *     it was, not blank it
 *   - unconfigured is a valid state, so a site built without an API base URL
 *     simply renders its own content
 *
 * The page is served at /products/hrms, but its API path follows the product
 * id - which is what the backend module, the tables and the page key use.
 *
 * Each returns null - or an empty list - to mean "keep what you have".
 */

const guard = () => typeof window !== 'undefined' && Boolean(BASE);

async function readSection(path) {
  if (!guard()) return null;
  try {
    const res = await fetch(`${BASE}/public/hreasy-page/${path}`, {
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
export async function fetchHreasyHeroSlides() {
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

/** A FAQ is only worth swapping in with a heading and at least one question. */
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
 * The published FAQ, or null to mean "keep the built-in one".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   faqs: Array<{q: string, a: string}>} | null>}
 */
export async function fetchHreasyFaqSection() {
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

/**
 * The band needs its heading and a first button; the trust strip under it can
 * be empty without the band breaking.
 */
function isRenderableCta(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    section.primary &&
    typeof section.primary.label === 'string' &&
    typeof section.primary.href === 'string' &&
    typeof section.primary.icon === 'string'
  );
}

/** A button on this band needs all three parts, the icon included. */
const usableIconCta = (cta) =>
  cta &&
  typeof cta.label === 'string' &&
  typeof cta.href === 'string' &&
  typeof cta.icon === 'string'
    ? { label: cta.label, href: cta.href, icon: cta.icon }
    : null;

/**
 * The published closing band, or null to mean "keep the built-in one".
 *
 * Both buttons carry an icon name here, unlike the other pages' bands - the
 * site resolves it through lib/hreasyIcons.js at render time.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   image: string | null, primary: object, secondary: object | null,
 *   trust: Array<{icon: string, lineOne: string, lineTwo: string}>} | null>}
 */
export async function fetchHreasyCtaSection() {
  const section = await readSection('cta-section');
  if (!isRenderableCta(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    image: typeof section.image === 'string' ? section.image : null,
    primary: usableIconCta(section.primary),
    secondary: usableIconCta(section.secondary),
    trust: Array.isArray(section.trust)
      ? section.trust
          .filter(
            (item) =>
              item && typeof item.lineOne === 'string' && typeof item.lineTwo === 'string',
          )
          .map((item) => ({
            icon: typeof item.icon === 'string' ? item.icon : '',
            lineOne: item.lineOne,
            lineTwo: item.lineTwo,
          }))
      : [],
  };
}

/** The switcher needs a heading and at least one module to select. */
function isRenderableCapabilities(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.modules) &&
    section.modules.length > 0
  );
}

/**
 * The published lifecycle switcher, or null to mean "keep the built-in one".
 *
 * A module is a nav label and the screenshot beside it, and nothing more: the
 * icon, the heading and the line inside each panel are part of the artwork,
 * which is why there is nothing here to carry them.
 *
 * Renamed to the keys HrmsModules already uses, so the published list drops
 * straight into the place of the built-in one.
 *
 * A module without a usable image is dropped rather than drawn as an empty
 * frame - the panel is the picture, so there is nothing else to show.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   modules: Array<{nav: string, img: string}>} | null>}
 */
export async function fetchHreasyCapabilitiesSection() {
  const section = await readSection('capabilities-section');
  if (!isRenderableCapabilities(section)) return null;

  const modules = section.modules
    .filter(
      (module) => module && typeof module.name === 'string' && typeof module.image === 'string',
    )
    .map((module) => ({ nav: module.name, img: module.image }));
  if (modules.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    modules,
  };
}

/** The grid needs a heading and at least one card to draw. */
function isRenderableLifecycle(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.cards) &&
    section.cards.length > 0
  );
}

/**
 * The published capability grid, or null to mean "keep the built-in one".
 *
 * Renamed to the keys HrmsCoreCapabilities already uses, so the published
 * list drops straight into the place of the built-in one.
 *
 * A card without all three parts is dropped rather than drawn half-empty: the
 * grid is four across, and a card missing its picture or its line leaves a
 * visible gap in a row where every neighbour has both.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cards: Array<{title: string, desc: string, img: string}>} | null>}
 */
export async function fetchHreasyLifecycleSection() {
  const section = await readSection('lifecycle-section');
  if (!isRenderableLifecycle(section)) return null;

  const cards = section.cards
    .filter(
      (card) =>
        card &&
        typeof card.title === 'string' &&
        typeof card.description === 'string' &&
        typeof card.image === 'string',
    )
    .map((card) => ({ title: card.title, desc: card.description, img: card.image }));
  if (cards.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cards,
  };
}

/** The row needs a heading and at least one card to compare. */
function isRenderablePackages(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.tiers) &&
    section.tiers.length > 0
  );
}

/** The three button treatments, under the names HrmsPricing draws them by. */
const BUTTON_STYLES = {
  FILLED: 'filled',
  OUTLINE_ACCENT: 'outlineAccent',
  OUTLINE_NAVY: 'outlineNavy',
};

/**
 * The published tier row, or null to mean "keep the built-in one".
 *
 * The button treatment arrives as a name rather than colours, because the
 * component draws them with Tailwind classes that have to exist in its own
 * source - a colour from the API would name a class nobody generated.
 * Anything unrecognised falls back to the quiet outline rather than dropping
 * the card: a button that renders in the wrong style still works, where a
 * missing tier leaves a hole in a three-column comparison.
 *
 * Renamed to the keys HrmsPricing already uses, so the published row drops
 * straight into the place of the built-in one.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   tiers: Array<object>} | null>}
 */
export async function fetchHreasyPackagesSection() {
  const section = await readSection('packages-section');
  if (!isRenderablePackages(section)) return null;

  const tiers = section.tiers
    .filter(
      (tier) =>
        tier &&
        typeof tier.name === 'string' &&
        typeof tier.lead === 'string' &&
        typeof tier.tagline === 'string' &&
        typeof tier.scope === 'string' &&
        typeof tier.buttonLabel === 'string' &&
        typeof tier.buttonHref === 'string',
    )
    .map((tier) => ({
      label: tier.name,
      title: tier.lead,
      subtitle: tier.tagline,
      pill: tier.scope,
      inherit: typeof tier.inheritsLabel === 'string' ? tier.inheritsLabel : null,
      features: Array.isArray(tier.features)
        ? tier.features.filter((f) => typeof f === 'string')
        : [],
      cta: { label: tier.buttonLabel, to: tier.buttonHref },
      ctaStyle: BUTTON_STYLES[tier.buttonStyle] ?? 'outlineNavy',
      featured: tier.isPopular === true,
    }));
  if (tiers.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    tiers,
  };
}

/** The grid needs a heading, a column to compare against, and a row. */
function isRenderableAlternatives(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.columns) &&
    section.columns.length > 0 &&
    Array.isArray(section.rows) &&
    section.rows.length > 0
  );
}

/**
 * The published comparison grid, or null to mean "keep the built-in one".
 *
 * Cells arrive keyed by column id, so the grid is rebuilt by walking the
 * columns in order rather than by trusting a fixed shape - which is what lets
 * an editor add a third column without the component knowing its name.
 *
 * A row whose cells do not cover every column is dropped rather than drawn
 * with a gap: a blank box in a tick-and-cross table reads as neither claim,
 * and the section's whole point is the rows where the columns differ.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   leaderLabel: string, columns: Array<{id: string, name: string,
 *   description: string | null, highlight: boolean}>,
 *   rows: Array<{feature: string, cells: boolean[]}>} | null>}
 */
export async function fetchHreasyAlternativesSection() {
  const section = await readSection('alternatives-section');
  if (!isRenderableAlternatives(section)) return null;

  const columns = section.columns.filter(
    (column) => column && typeof column.id === 'string' && typeof column.name === 'string',
  );
  if (columns.length === 0) return null;

  const rows = section.rows
    .filter(
      (row) =>
        row &&
        typeof row.parameter === 'string' &&
        row.cells &&
        columns.every((column) => typeof row.cells[column.id] === 'boolean'),
    )
    .map((row) => ({
      feature: row.parameter,
      // Positional, in the same order the headers are drawn.
      cells: columns.map((column) => row.cells[column.id]),
    }));
  if (rows.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    leaderLabel:
      typeof section.leaderLabel === 'string' ? section.leaderLabel : 'What your workforce needs',
    columns: columns.map((column) => ({
      id: column.id,
      name: column.name,
      description: typeof column.description === 'string' ? column.description : null,
      highlight: column.highlight === true,
    })),
    rows,
  };
}

/** The row needs a heading and at least one card to read. */
function isRenderableOutcomes(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.stories) &&
    section.stories.length > 0
  );
}

/**
 * The published outcome cards, or null to mean "keep the built-in ones".
 *
 * Renamed to the keys HrmsOutcomes already uses, so the published row drops
 * straight into the place of the built-in one.
 *
 * A story missing its headline figure or its prose is dropped: the dark panel
 * is the card, and one without a number is a black rectangle beside a card
 * that has one. The small figures are optional by contrast - the panel draws
 * its rule and whatever sits under it.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cases: Array<object>} | null>}
 */
export async function fetchHreasyOutcomesSection() {
  const section = await readSection('outcomes-section');
  if (!isRenderableOutcomes(section)) return null;

  const cases = section.stories
    .filter(
      (story) =>
        story &&
        typeof story.name === 'string' &&
        typeof story.heroValue === 'string' &&
        typeof story.heroLabel === 'string' &&
        typeof story.body === 'string',
    )
    .map((story) => ({
      name: story.name,
      // Null is a working state: the card draws the name as words instead.
      logo: typeof story.logo === 'string' ? story.logo : null,
      tag: typeof story.tag === 'string' ? story.tag : '',
      heroStat: story.heroValue,
      heroLabel: story.heroLabel,
      mini: Array.isArray(story.stats)
        ? story.stats
            .filter(
              (stat) =>
                stat && typeof stat.value === 'string' && typeof stat.label === 'string',
            )
            .map((stat) => ({ v: stat.value, l: stat.label }))
        : [],
      desc: story.body,
      linkLabel: typeof story.linkLabel === 'string' ? story.linkLabel : 'Read story',
      to: typeof story.linkHref === 'string' ? story.linkHref : '/resources',
    }));
  if (cases.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cases,
  };
}

/** A bento needs a heading and at least one column to scroll. */
function isRenderableProof(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.cells) &&
    section.cells.length > 0
  );
}

/** How many cards each shape draws - the rule the API enforces too. */
const TILES_PER_SHAPE = { TALL: 1, STACK: 2, WIDE_TOP: 3 };

/** A card is only drawable with everything its kind needs. */
const usableTile = (tile) => {
  if (!tile) return false;
  if (tile.kind === 'LOGO') return typeof tile.image === 'string' && typeof tile.name === 'string';
  if (tile.kind === 'STAT') {
    return (
      typeof tile.value === 'string' &&
      typeof tile.label === 'string' &&
      typeof tile.client === 'string'
    );
  }
  if (tile.kind === 'PROOF') {
    return (
      typeof tile.client === 'string' &&
      typeof tile.headline === 'string' &&
      typeof tile.line === 'string'
    );
  }
  return false;
};

/**
 * The published proof bento, or null to mean "keep the built-in one".
 *
 * Width and shape arrive as names rather than measurements, because the
 * component draws them with Tailwind classes that have to exist in its own
 * source - a width from the API would name a class nobody generated.
 *
 * A column whose cards are not all drawable is dropped rather than rendered
 * with a hole: the shapes are fixed, so a STACK missing its second card would
 * draw a half-empty column rather than a shorter one.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cells: Array<{width: string, shape: string, tiles: Array<object>}>} | null>}
 */
export async function fetchHreasyProofSection() {
  const section = await readSection('proof-section');
  if (!isRenderableProof(section)) return null;

  const cells = section.cells.filter(
    (cell) =>
      cell &&
      TILES_PER_SHAPE[cell.shape] &&
      Array.isArray(cell.tiles) &&
      cell.tiles.length === TILES_PER_SHAPE[cell.shape] &&
      cell.tiles.every(usableTile),
  );
  if (cells.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cells: cells.map((cell) => ({
      width: cell.width,
      shape: cell.shape,
      tiles: cell.tiles,
    })),
  };
}
