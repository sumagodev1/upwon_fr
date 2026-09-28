// src/lib/engineeringManufacturingPage.js

// Same guarded read as lib/posPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The Engineering & Manufacturing industry page's CMS reads.
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
 * Each returns null - or an empty list - to mean "keep what you have".
 */

const guard = () => typeof window !== 'undefined' && Boolean(BASE);

async function readSection(path) {
  if (!guard()) return null;
  try {
    const res = await fetch(`${BASE}/public/engineering-manufacturing-page/${path}`, {
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

/**
 * A button is only usable with both halves.
 *
 * The API names the target `href`; HeroSlider links with `to`, so both are
 * carried and the slider gets the key it reads.
 */
const usableCta = (cta) =>
  cta && typeof cta.label === 'string' && typeof cta.href === 'string'
    ? { label: cta.label, href: cta.href, to: cta.href }
    : null;

/**
 * The published hero slides, or an empty array to mean "keep the built-in set".
 *
 * Renamed to the keys HeroSlider already takes, so the section passes the
 * array straight through.
 *
 * @returns {Promise<Array<{eyebrow: string, headline: string, headingLines: Array,
 *   subhead: string, microTrust: string | null, cta: object | null,
 *   secondaryCta: object | null, bg: string | null, bgMobile: string | null}>>}
 */
export async function fetchEngineeringHeroSlides() {
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

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

const isFigure = (figure) =>
  figure && typeof figure.value === 'string' && typeof figure.label === 'string';

// A trust section is only usable with its heading and at least one card or logo.
function isRenderableTrust(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    ((Array.isArray(section.cards) && section.cards.length > 0) ||
      (Array.isArray(section.logos) && section.logos.length > 0))
  );
}

/**
 * The published trust section, or null to mean "keep what you have".
 *
 * Cards arrive with one or two figures each, which the section turns over
 * between; the colours are #RRGGBB and go straight into a style attribute.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cards: Array<{icon: string, accentColor: string, tintColor: string,
 *     figures: Array<{value: string, label: string}>}>,
 *   logos: Array<{name: string, src: string}>} | null>}
 */
export async function fetchEngineeringTrustSection() {
  const section = await readSection('trust-section');
  if (!isRenderableTrust(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cards: Array.isArray(section.cards)
      ? section.cards
          .filter(
            (card) => card && Array.isArray(card.figures) && card.figures.some(isFigure),
          )
          .map((card) => ({
            icon: typeof card.icon === 'string' ? card.icon : '',
            accentColor: HEX_COLOR.test(card.accentColor) ? card.accentColor : '#0F1535',
            tintColor: HEX_COLOR.test(card.tintColor) ? card.tintColor : 'transparent',
            figures: card.figures.filter(isFigure),
          }))
      : [],
    // Renamed to the keys the marquee already takes.
    logos: Array.isArray(section.logos)
      ? section.logos
          .filter((logo) => logo && typeof logo.image === 'string' && typeof logo.alt === 'string')
          .map((logo) => ({ name: logo.alt, src: logo.image }))
      : [],
  };
}

// The capabilities section is only usable with its heading and one capability.
function isRenderableCapabilities(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.capabilities) &&
    section.capabilities.length > 0
  );
}

/**
 * The published core capabilities, or null to mean "keep what you have".
 *
 * In order: the first fills the artwork's first card and is numbered 01.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   capabilities: Array<{title: string, description: string, icon: string,
 *     accentColor: string, tintColor: string}>} | null>}
 */
export async function fetchEngineeringCapabilitiesSection() {
  const section = await readSection('capabilities-section');
  if (!isRenderableCapabilities(section)) return null;

  const capabilities = section.capabilities
    .filter(
      (capability) =>
        capability &&
        typeof capability.title === 'string' &&
        typeof capability.description === 'string',
    )
    .map((capability) => ({
      title: capability.title,
      description: capability.description,
      icon: typeof capability.icon === 'string' ? capability.icon : '',
      accentColor: HEX_COLOR.test(capability.accentColor) ? capability.accentColor : '#0F1535',
      tintColor: HEX_COLOR.test(capability.tintColor) ? capability.tintColor : 'transparent',
    }));
  if (capabilities.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    capabilities,
  };
}

// The platform section is only usable with its heading and one workflow.
function isRenderablePlatform(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.workflows) &&
    section.workflows.length > 0
  );
}

/**
 * The published connected platform section, or null to mean "keep what you
 * have".
 *
 * `image` and `listLabel` are null when the CMS has no panel - the section
 * then keeps its own illustration and label. An authored panel with the label
 * turned off sends `listLabel` as ''.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   image: string | null, imageAlt: string | null, listLabel: string | null,
 *   workflows: Array<{label: string, icon: string, accentColor: string,
 *     tintColor: string}>} | null>}
 */
export async function fetchEngineeringPlatformSection() {
  const section = await readSection('platform-section');
  if (!isRenderablePlatform(section)) return null;

  const workflows = section.workflows
    .filter((workflow) => workflow && typeof workflow.label === 'string')
    .map((workflow) => ({
      label: workflow.label,
      icon: typeof workflow.icon === 'string' ? workflow.icon : '',
      accentColor: HEX_COLOR.test(workflow.accentColor) ? workflow.accentColor : '#0F1535',
      tintColor: HEX_COLOR.test(workflow.tintColor) ? workflow.tintColor : 'transparent',
    }));
  if (workflows.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    image: typeof section.image === 'string' && section.image !== '' ? section.image : null,
    imageAlt: typeof section.imageAlt === 'string' ? section.imageAlt : null,
    listLabel: typeof section.listLabel === 'string' ? section.listLabel : null,
    workflows,
  };
}

// The coverage section is only usable with its heading and one business type.
function isRenderableCoverage(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.categories) &&
    section.categories.length > 0
  );
}

/**
 * The published industry coverage section, or null to mean "keep what you
 * have".
 *
 * `image` is null when the CMS has no background of its own - the section then
 * keeps the illustration it ships.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   image: string | null, categories: Array<{label: string, icon: string}>} | null>}
 */
export async function fetchEngineeringCoverageSection() {
  const section = await readSection('coverage-section');
  if (!isRenderableCoverage(section)) return null;

  const categories = section.categories
    .filter((category) => category && typeof category.label === 'string')
    .map((category) => ({
      label: category.label,
      icon: typeof category.icon === 'string' ? category.icon : '',
    }));
  if (categories.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    image: typeof section.image === 'string' && section.image !== '' ? section.image : null,
    categories,
  };
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
 * Same shape as lib/posPage.js's, with the q/a keys the accordion already
 * takes.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, faqs: Array<{q: string, a: string}>} | null>}
 */
export async function fetchEngineeringFaqSection() {
  const section = await readSection('faq-section');
  if (!isRenderableFaq(section)) return null;

  const faqs = section.faqs.filter(
    (faq) => faq && typeof faq.q === 'string' && typeof faq.a === 'string',
  );
  if (faqs.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    faqs,
  };
}

/*
 * The closing band needs its heading and its first button; the artwork is
 * optional, because the section ships its own. The second button is optional
 * too - the band reads fine with one.
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
 * The buttons carry both `href` and `to` (see usableCta); the images are null
 * when the CMS has none, and the band then keeps its own artwork.
 *
 * @returns {Promise<{headingLines: Array, subtext: string,
 *   desktopImage: string | null, mobileImage: string | null,
 *   primary: {label: string, href: string, to: string},
 *   secondary: {label: string, href: string, to: string} | null} | null>}
 */
export async function fetchEngineeringCtaSection() {
  const section = await readSection('cta-section');
  if (!isRenderableCta(section)) return null;

  return {
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    desktopImage:
      typeof section.desktopImage === 'string' && section.desktopImage !== ''
        ? section.desktopImage
        : null,
    mobileImage:
      typeof section.mobileImage === 'string' && section.mobileImage !== ''
        ? section.mobileImage
        : null,
    primary: usableCta(section.primary),
    secondary: usableCta(section.secondary),
  };
}
