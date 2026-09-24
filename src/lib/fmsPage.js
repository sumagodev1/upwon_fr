// src/lib/fmsPage.js

// Same guarded read as lib/sfaDmsPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The FMS product page's CMS reads.
 *
 * Same three rules as lib/sfaDmsPage.js, and for the same reasons:
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
    const res = await fetch(`${BASE}/public/fms-page/${path}`, {
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
export async function fetchFmsHeroSlides() {
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
export async function fetchFmsFaqSection() {
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
 * The proof strip needs its copy and at least one of its two panels. Logos
 * with no figures, or figures with no logos, is still a section worth showing;
 * neither is not.
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
 * The published proof strip, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   logos: Array<{image: string, alt: string}>,
 *   stats: Array<{icon: string, label: string, subtext: string, value: string,
 *     accentColor: string}>} | null>}
 */
export async function fetchFmsProofSection() {
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
            (stat) =>
              stat &&
              typeof stat.label === 'string' &&
              typeof stat.value === 'string',
          )
          .map((stat) => ({
            icon: typeof stat.icon === 'string' ? stat.icon : '',
            label: stat.label,
            subtext: typeof stat.subtext === 'string' ? stat.subtext : '',
            value: stat.value,
            accentColor:
              typeof stat.accentColor === 'string' ? stat.accentColor : '#0F1535',
          }))
      : [],
  };
}

/*
 * The video showcase needs its copy and a playable source. The copy alone
 * would leave a heading over an empty black player, which is worse than the
 * section the site already ships.
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
 * The published video showcase, or null to mean "keep what you have".
 *
 * Renamed to the props IndustriesVideoIntro already takes, so the page passes
 * the object straight through.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   video: string} | null>}
 */
export async function fetchFmsVideoSection() {
  const section = await readSection('video-section');
  if (!isRenderableVideo(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    video: section.video,
  };
}

/*
 * The category map needs its copy and at least one drawable category. A
 * category is only drawable with both its pictogram and its photograph - the
 * server already drops the ones missing either, and this repeats the check so
 * a hand-rolled response cannot put a blank tab on the page.
 */
const usableCategory = (category) =>
  category &&
  typeof category.slug === 'string' &&
  typeof category.name === 'string' &&
  typeof category.icon === 'string' &&
  typeof category.image === 'string';

/** Steps and benefits are the same three fields, checked the same way. */
const usableEntries = (list) =>
  Array.isArray(list)
    ? list.filter(
        (entry) =>
          entry &&
          typeof entry.title === 'string' &&
          typeof entry.description === 'string' &&
          typeof entry.icon === 'string',
      )
    : [];

function isRenderableFranchise(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.categories) &&
    section.categories.some(usableCategory)
  );
}

/**
 * The published franchise category map, or null to mean "keep what you have".
 *
 * Renamed to the keys the section already draws with - `tint` is not among
 * them because it is derived from the accent at render time rather than stored.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   categories: Array<{slug: string, name: string, tagline: string,
 *     description: string, icon: string, image: string, accentColor: string,
 *     surfaceColor: string, exploreLabel: string, exploreHref: string,
 *     steps: Array<{title: string, description: string, icon: string}>,
 *     benefits: Array<{title: string, description: string, icon: string}>}>} | null>}
 */
export async function fetchFmsFranchiseSection() {
  const section = await readSection('franchise-section');
  if (!isRenderableFranchise(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    categories: section.categories.filter(usableCategory).map((category) => ({
      slug: category.slug,
      name: category.name,
      tagline: typeof category.tagline === 'string' ? category.tagline : '',
      description: typeof category.description === 'string' ? category.description : '',
      icon: category.icon,
      image: category.image,
      // The two colours the panel paints with. A missing or malformed value
      // falls back to the brand pair rather than leaving a tab unstyled.
      accentColor:
        typeof category.accentColor === 'string' ? category.accentColor : '#E85A2A',
      surfaceColor:
        typeof category.surfaceColor === 'string' ? category.surfaceColor : '#fbe9e2',
      exploreLabel:
        typeof category.exploreLabel === 'string' ? category.exploreLabel : '',
      exploreHref: typeof category.exploreHref === 'string' ? category.exploreHref : '/demo',
      steps: usableEntries(category.steps),
      benefits: usableEntries(category.benefits),
    })),
  };
}

/*
 * The integration sphere needs its copy and at least one mark. A heading
 * beside a bare globe is worse than the section the site already ships.
 *
 * The centre mark is not part of that test: with none published the hub keeps
 * the one it ships, which is a section that still renders correctly.
 */
function isRenderableIntegrations(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.logos) &&
    section.logos.length > 0
  );
}

/**
 * The published integration sphere, or null to mean "keep what you have".
 *
 * Logos are renamed to the keys HexSphere already takes, so the page passes
 * the array straight through.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   centreLogo: string | null,
 *   logos: Array<{src: string, alt: string}>} | null>}
 */
export async function fetchFmsIntegrationsSection() {
  const section = await readSection('integrations-section');
  if (!isRenderableIntegrations(section)) return null;

  const logos = section.logos
    .filter((logo) => logo && typeof logo.image === 'string' && typeof logo.alt === 'string')
    .map((logo) => ({ src: logo.image, alt: logo.alt }));
  if (logos.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    centreLogo: typeof section.centreLogo === 'string' ? section.centreLogo : null,
    logos,
  };
}

/*
 * The growth path needs its copy and at least one tier. A heading over an
 * empty row of cards is worse than the section the site already ships.
 *
 * The line under the row is not part of that test: it is optional, and the
 * cards read fine without it.
 */
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
 * Renamed to the keys the section already draws with.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   footnote: string | null,
 *   tiers: Array<{slug: string, name: string, lead: string, tagline: string,
 *     scope: string, inheritsLabel: string | null, buttonLabel: string,
 *     buttonHref: string, isPopular: boolean, features: string[]}>} | null>}
 */
export async function fetchFmsGrowthSection() {
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
    tiers,
  };
}

/*
 * The comparison grid needs its copy, its columns and at least one row. A
 * heading over an empty table is worse than the grid the site already ships.
 */
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
 * The published comparison grid, or null to mean "keep what you have".
 *
 * Cells arrive keyed by column id, which is how the site pairs them to headers
 * without knowing what any column is called - so the mapping below keeps the
 * ids rather than flattening to an array that would depend on column order.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   leaderLabel: string,
 *   columns: Array<{id: string, name: string, highlight: boolean}>,
 *   rows: Array<{parameter: string, cells: Record<string, string>}>} | null>}
 */
export async function fetchFmsAlternativesSection() {
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
      cells: row.cells && typeof row.cells === 'object' ? row.cells : {},
    }));
  if (rows.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    leaderLabel: typeof section.leaderLabel === 'string' ? section.leaderLabel : 'Criteria',
    columns: columns.map((column) => ({
      id: column.id,
      name: column.name,
      highlight: column.highlight === true,
    })),
    rows,
  };
}

/*
 * The outcomes carousel needs its copy and at least one drawable story. A
 * story is only drawable with both its mark and its photograph - the server
 * already drops the ones missing either, and this repeats the check so a
 * hand-rolled response cannot put a card over a black rectangle.
 */
const usableStory = (story) =>
  story &&
  typeof story.slug === 'string' &&
  typeof story.name === 'string' &&
  typeof story.logo === 'string' &&
  typeof story.photo === 'string' &&
  typeof story.quote === 'string';

function isRenderableOutcomes(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.stories) &&
    section.stories.some(usableStory)
  );
}

/**
 * The published outcomes carousel, or null to mean "keep what you have".
 *
 * Renamed to the keys the section already draws with.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   stories: Array<{slug: string, name: string, logo: string, photo: string,
 *     quote: string, personName: string, personCompany: string,
 *     linkLabel: string, linkHref: string,
 *     stats: Array<{value: string, label: string}>}>} | null>}
 */
export async function fetchFmsOutcomesSection() {
  const section = await readSection('outcomes-section');
  if (!isRenderableOutcomes(section)) return null;

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
    stats: Array.isArray(story.stats)
      ? story.stats.filter(
          (stat) => stat && typeof stat.value === 'string' && typeof stat.label === 'string',
        )
      : [],
  }));
  if (stories.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    stories,
  };
}

/*
 * The closing band needs its copy and its first button; the artwork is optional,
 * because the component ships its own and falls back to a cream ground without
 * it. The second button is optional too - the band reads fine with one.
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
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   desktopImage: string | null, mobileImage: string | null,
 *   primary: {label: string, href: string},
 *   secondary: {label: string, href: string} | null,
 *   footnote: string | null} | null>}
 */
export async function fetchFmsCtaSection() {
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
  };
}
