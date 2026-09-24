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
