// src/lib/sweetsPage.js

// Same guarded read as lib/fmsPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The Sweets & Namkeen industry page's CMS reads.
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
    const res = await fetch(`${BASE}/public/sweets-page/${path}`, {
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
export async function fetchSweetsHeroSlides() {
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
 *   stats: Array<{value: string, label: string, icon: string}>
 * } | null>}
 */
export async function fetchSweetsTrustSection() {
  const section = await readSection('trust-section');
  if (!hasHeading(section)) return null;

  const logos = (Array.isArray(section.logos) ? section.logos : [])
    .filter((logo) => logo && isString(logo.image) && typeof logo.alt === 'string')
    // `name` and `src` are what the marquee already keys and draws its logos by.
    .map((logo) => ({ name: logo.alt, src: logo.image }));

  const stats = (Array.isArray(section.stats) ? section.stats : [])
    .filter(
      (stat) => stat && isString(stat.value) && isString(stat.label) && isString(stat.icon),
    )
    // `icon` stays a name; the component resolves it through lib/sweetsIcons.js.
    .map((stat) => ({ value: stat.value, label: stat.label, icon: stat.icon }));

  if (logos.length === 0 && stats.length === 0) return null;

  return { ...readCopy(section), logos, stats };
}

/**
 * The published connected-platform section, or null when nothing is published.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   tiles: Array<{label: string, icon: string, to: string}>} | null>}
 */
export async function fetchSweetsPlatformSection() {
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
export async function fetchSweetsFaqSection() {
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
 * Needs its copy and its first button. The eyebrow and artwork are optional,
 * and so is the second button. Without a mobile crop the band crops the
 * desktop artwork.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   desktopImage: string | null, mobileImage: string | null,
 *   primary: {label: string, href: string},
 *   secondary: {label: string, href: string} | null} | null>}
 */
export async function fetchSweetsCtaSection() {
  const section = await readSection('cta-section');
  const primary = section && usableCta(section.primary);
  if (!hasHeading(section) || !primary) return null;

  return {
    eyebrow: isString(section.eyebrow) ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    desktopImage: isString(section.desktopImage) ? section.desktopImage : null,
    mobileImage: isString(section.mobileImage) ? section.mobileImage : null,
    primary,
    secondary: usableCta(section.secondary),
  };
}
