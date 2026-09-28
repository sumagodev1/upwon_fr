// src/lib/nonFoodFmcgPage.js

// Same guarded read as lib/fmsPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The Non-Food FMCG industry page's CMS reads.
 *
 * Same guards as lib/fmsPage.js - never during the SSG build, never throw - but
 * this page is CMS-only: there is no built-in content behind these reads.
 *
 * Each returns null - or an empty list - to mean "nothing published", and the
 * section it feeds then renders nothing. An unreachable or unconfigured API
 * reads the same way.
 */

const guard = () => typeof window !== 'undefined' && Boolean(BASE);

async function readSection(path) {
  if (!guard()) return null;
  try {
    const res = await fetch(`${BASE}/public/non-food-fmcg-page/${path}`, {
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

const isString = (value) => typeof value === 'string' && value !== '';

/** A button is only usable with both halves. */
const usableCta = (cta) =>
  cta && isString(cta.label) && isString(cta.href) ? { label: cta.label, href: cta.href } : null;

/**
 * The same button in the shape HeroSlider takes - it links with `to`, the
 * react-router prop, where the API calls the target `href`.
 */
const sliderCta = (cta) => {
  const usable = usableCta(cta);
  return usable ? { label: usable.label, to: usable.href } : null;
};

// A section's copy is only usable with a parsed heading to render.
const hasHeading = (section) =>
  section && Array.isArray(section.headingLines) && section.headingLines.length > 0;

/** The copy every section's block carries, normalised. */
const readCopy = (section) => ({
  eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
  headingLines: section.headingLines,
  subtext: typeof section.subtext === 'string' ? section.subtext : '',
});

/** A panel image is only usable with a source; the alt may be empty. */
const readPanel = (panel) =>
  panel && isString(panel.image)
    ? { image: panel.image, alt: typeof panel.alt === 'string' ? panel.alt : '' }
    : null;

/**
 * The published hero slides, or an empty array when nothing is published.
 *
 * Renamed to the keys HeroSlider already takes, so the page passes the array
 * straight through.
 *
 * @returns {Promise<Array<{eyebrow: string, headline: string, subhead: string,
 *   microTrust: string | null, cta: {label: string, to: string} | null,
 *   secondaryCta: {label: string, to: string} | null,
 *   bg: string | null, bgMobile: string | null}>>}
 */
export async function fetchNonFoodFmcgHeroSlides() {
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
      subhead: slide.subhead,
      microTrust: typeof slide.microTrust === 'string' ? slide.microTrust : null,
      cta: sliderCta(slide.cta),
      secondaryCta: sliderCta(slide.secondaryCta),
      // HeroSlider calls the background `bg`.
      bg: typeof slide.image === 'string' ? slide.image : null,
      // The portrait crop for phones. Null leaves the slider showing `bg` at
      // every size, which is what every slide does today.
      bgMobile: typeof slide.mobileImage === 'string' ? slide.mobileImage : null,
    }));
}

/**
 * The published trust section, or null when nothing is published.
 *
 * Needs its copy and at least one logo or figure. A logo without an image, or
 * a figure without a value, is dropped rather than rendered as a hole.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   logos: Array<{name: string, src: string}>,
 *   stats: Array<{value: string, label: string, description: string}>
 * } | null>}
 */
export async function fetchNonFoodFmcgTrustSection() {
  const section = await readSection('trust-section');
  if (!hasHeading(section)) return null;

  const logos = (Array.isArray(section.logos) ? section.logos : [])
    .filter((logo) => logo && isString(logo.image) && typeof logo.alt === 'string')
    // `name` and `src` are what the marquee already keys and draws its logos by.
    .map((logo) => ({ name: logo.alt, src: logo.image }));

  const stats = (Array.isArray(section.stats) ? section.stats : [])
    .filter((stat) => stat && isString(stat.value) && isString(stat.label))
    .map((stat) => ({
      value: stat.value,
      label: stat.label,
      description: typeof stat.description === 'string' ? stat.description : '',
    }));

  if (logos.length === 0 && stats.length === 0) return null;

  return { ...readCopy(section), logos, stats };
}

/**
 * The published connected-platform section, or null when nothing is published.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   tiles: Array<{label: string, icon: string, to: string}>} | null>}
 */
export async function fetchNonFoodFmcgPlatformSection() {
  const section = await readSection('platform-section');
  if (!hasHeading(section) || !Array.isArray(section.tiles)) return null;

  const tiles = section.tiles
    .filter((tile) => tile && isString(tile.label) && isString(tile.icon) && isString(tile.href))
    // `to`, because the tiles link with react-router like the ones they replace.
    .map((tile) => ({ label: tile.label, icon: tile.icon, to: tile.href }));
  if (tiles.length === 0) return null;

  return { ...readCopy(section), tiles };
}

/**
 * The published FAQ section, or null when nothing is published.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, faqs: Array<{q: string, a: string}>} | null>}
 */
export async function fetchNonFoodFmcgFaqSection() {
  const section = await readSection('faq-section');
  if (!hasHeading(section) || !Array.isArray(section.faqs)) return null;

  const faqs = section.faqs.filter(
    (faq) => faq && typeof faq.q === 'string' && typeof faq.a === 'string',
  );
  if (faqs.length === 0) return null;

  return { ...readCopy(section), faqs };
}

/**
 * The published closing band, or null when nothing is published.
 *
 * Needs its copy and its first button. The artwork is optional, and so is the
 * second button. Without a mobile crop the band crops the desktop artwork.
 *
 * @returns {Promise<{headingLines: Array, subtext: string,
 *   desktopImage: string | null, mobileImage: string | null,
 *   primary: {label: string, href: string},
 *   secondary: {label: string, href: string} | null} | null>}
 */
export async function fetchNonFoodFmcgCtaSection() {
  const section = await readSection('cta-section');
  const primary = section && usableCta(section.primary);
  if (!hasHeading(section) || !primary) return null;

  return {
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    desktopImage: isString(section.desktopImage) ? section.desktopImage : null,
    mobileImage: isString(section.mobileImage) ? section.mobileImage : null,
    primary,
    secondary: usableCta(section.secondary),
  };
}

/**
 * The published core capabilities section, or null when nothing is published.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cards: Array<{title: string, description: string, art: string}>} | null>}
 */
export async function fetchNonFoodFmcgCapabilitiesSection() {
  const section = await readSection('capabilities-section');
  if (!hasHeading(section) || !Array.isArray(section.cards)) return null;

  const cards = section.cards
    .filter(
      (card) => card && isString(card.title) && isString(card.description) && isString(card.image),
    )
    // `art` is what the cards already call their illustration.
    .map((card) => ({ title: card.title, description: card.description, art: card.image }));
  if (cards.length === 0) return null;

  return { ...readCopy(section), cards };
}

/** An icon grid's items: a name from the allowlist and a label. */
const readIconItems = (items) =>
  (Array.isArray(items) ? items : [])
    .filter((item) => item && isString(item.icon) && isString(item.label))
    // `icon` stays a name; the component resolves it through lib/nonFoodFmcgIcons.js.
    .map((item) => ({ icon: item.icon, label: item.label }));

/**
 * The published benefits section, or null when nothing is published.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   items: Array<{icon: string, label: string}>} | null>}
 */
export async function fetchNonFoodFmcgBenefitsSection() {
  const section = await readSection('benefits-section');
  if (!hasHeading(section)) return null;

  const items = readIconItems(section.items);
  if (items.length === 0) return null;

  return { ...readCopy(section), items };
}

/**
 * The published industry coverage section, or null when nothing is published.
 * The dashboard panel is optional - the categories read fine without it.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   panel: {image: string, alt: string} | null,
 *   items: Array<{icon: string, label: string}>} | null>}
 */
export async function fetchNonFoodFmcgCoverageSection() {
  const section = await readSection('coverage-section');
  if (!hasHeading(section)) return null;

  const items = readIconItems(section.items);
  if (items.length === 0) return null;

  return { ...readCopy(section), panel: readPanel(section.panel), items };
}
