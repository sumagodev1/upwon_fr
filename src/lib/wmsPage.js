// src/lib/wmsPage.js

// Same guarded read as lib/hreasyPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The WMS product page's CMS reads.
 *
 * Same three rules as lib/hreasyPage.js, and for the same reasons:
 *
 *   - never during the SSG build, because the prerendered HTML must be the
 *     copy the site ships rather than whatever the API happened to hold at
 *     build time
 *   - never throw, because an unreachable CMS should leave the page exactly as
 *     it was, not blank it
 *   - unconfigured is a valid state, so a site built without an API base URL
 *     simply renders its own content
 *
 * Seven sections so far - the hero slider, the proof row, the warehouse-type
 * map, the capability stack, the customer-outcomes row, the FAQ and the
 * closing band. The rest of the page is still the copy the site ships, and
 * each read arrives as its section is built.
 *
 * Each returns null - or an empty list - to mean "keep what you have".
 */

const guard = () => typeof window !== 'undefined' && Boolean(BASE);

async function readSection(path) {
  if (!guard()) return null;
  try {
    const res = await fetch(`${BASE}/public/wms-page/${path}`, {
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
export async function fetchWmsHeroSlides() {
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

/** The row needs a heading and at least one card with something to show. */
function isRenderableProof(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.cards) &&
    section.cards.length > 0
  );
}

/**
 * The published proof row, or null to mean "keep the built-in one".
 *
 * Each card is the set of images it flips through, so the shape is an array
 * of arrays - which is what WmsProofStrip already takes.
 *
 * A card with no drawable slides is dropped rather than rendered as an empty
 * frame: the card is its pictures, so one with none is a hole in a row of
 * three.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cards: Array<Array<{src: string, alt: string}>>} | null>}
 */
export async function fetchWmsProofSection() {
  const section = await readSection('proof-section');
  if (!isRenderableProof(section)) return null;

  const cards = section.cards
    .filter((card) => card && Array.isArray(card.slides))
    .map((card) =>
      card.slides
        .filter((slide) => slide && typeof slide.image === 'string')
        .map((slide) => ({
          src: slide.image,
          // The figures live inside the artwork, so this is the only thing a
          // screen reader gets. Empty string is the correct markup when the
          // editor left it off deliberately.
          alt: typeof slide.alt === 'string' ? slide.alt : '',
        })),
    )
    .filter((slides) => slides.length > 0);
  if (cards.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cards,
  };
}

/**
 * The map needs a heading and at least one drawable card.
 */
function isRenderableRecognition(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.cards) &&
    section.cards.length > 0
  );
}

/**
 * The published warehouse-type map, or null to mean "keep the built-in one".
 *
 * Renamed to the keys the grid already takes, so the section and the shipped
 * copy take one identical path through the render.
 *
 * A card without its picture is dropped rather than rendered as an empty
 * frame: every card in the grid is a picture with a caption, so one missing
 * the picture is a hole in a row where every neighbour has one.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cards: Array<{title: string, desc: string, img: string}>} | null>}
 */
export async function fetchWmsRecognitionSection() {
  const section = await readSection('recognition-section');
  if (!isRenderableRecognition(section)) return null;

  const cards = section.cards
    .filter(
      (card) =>
        card &&
        typeof card.image === 'string' &&
        typeof card.title === 'string' &&
        typeof card.description === 'string',
    )
    .map((card) => ({
      title: card.title,
      // The grid calls the line under the title `desc` and the picture `img`.
      desc: card.description,
      img: card.image,
    }));
  if (cards.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cards,
  };
}


/** The stack needs its heading and at least one band to draw. */
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
 * The published capability stack, or null to mean "keep the built-in one".
 *
 * Renamed to the keys WmsCoreCapabilities already takes, so the section
 * passes the array straight through to its row component.
 *
 * `alt` falls back to the band's title, which is what the shipped component
 * does: the heading and paragraph beside the picture already name the
 * capability, so the composite is decorative unless an editor says otherwise.
 *
 * A band with no drawable image is dropped rather than rendered as a
 * paragraph beside an empty frame.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   items: Array<{title: string, desc: string, img: string, alt: string}>} | null>}
 */
export async function fetchWmsCapabilitiesSection() {
  const section = await readSection('capabilities-section');
  if (!isRenderableCapabilities(section)) return null;

  const items = section.modules
    .filter(
      (item) =>
        item &&
        typeof item.image === 'string' &&
        typeof item.title === 'string' &&
        typeof item.description === 'string',
    )
    .map((item) => ({
      title: item.title,
      desc: item.description,
      img: item.image,
      alt: typeof item.imageAlt === 'string' && item.imageAlt ? item.imageAlt : item.title,
    }));
  if (items.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    items,
  };
}

/** The row needs its heading and at least one card to draw. */
function isRenderableOutcomes(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.cards) &&
    section.cards.length > 0
  );
}

/**
 * The published customer-outcomes row, or null to mean "keep the built-in
 * one".
 *
 * Renamed to the keys the row already takes, so a CMS section and the shipped
 * copy take one identical path through the render. `icon` stays a name here -
 * the component resolves it through lib/wmsIcons.js, the same way the closing
 * band's buttons do.
 *
 * No image on this section: the artwork in its top-right corner is the
 * site's, not per-card content.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cards: Array<{icon: string, value: string, title: string,
 *   description: string, accent: string}>} | null>}
 */
export async function fetchWmsOutcomesSection() {
  const section = await readSection('outcomes-section');
  if (!isRenderableOutcomes(section)) return null;

  const cards = section.cards
    .filter(
      (card) =>
        card &&
        typeof card.icon === 'string' &&
        typeof card.stat === 'string' &&
        typeof card.title === 'string' &&
        typeof card.description === 'string',
    )
    .map((card) => ({
      icon: card.icon,
      // The row calls the figure `value`.
      value: card.stat,
      title: card.title,
      description: card.description,
      // Only 'blue' changes anything; anything else falls back to orange,
      // which is what every card draws apart from its hover rule.
      accent: card.accent === 'blue' ? 'blue' : 'orange',
    }));
  if (cards.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cards,
  };
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
export async function fetchWmsFaqSection() {
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
 * Both buttons carry an icon name, which the site resolves through
 * lib/wmsIcons.js at render time.
 *
 * The band keeps a phone crop of its own, unlike the HREasy band's single
 * banner: its copy sits over the left of a landscape photograph, and that
 * crop keeps nothing readable on a phone. Null there leaves the phone showing
 * the desktop photograph.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   image: string | null, mobileImage: string | null, primary: object,
 *   secondary: object | null,
 *   trust: Array<{icon: string, lineOne: string, lineTwo: string}>} | null>}
 */
export async function fetchWmsCtaSection() {
  const section = await readSection('cta-section');
  if (!isRenderableCta(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    image: typeof section.image === 'string' ? section.image : null,
    mobileImage: typeof section.mobileImage === 'string' ? section.mobileImage : null,
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
