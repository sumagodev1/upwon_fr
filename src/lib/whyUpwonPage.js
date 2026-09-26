// src/lib/whyUpwonPage.js

// Same guarded read as lib/posPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The Why UpWon page's CMS reads.
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
 * Each returns null to mean "keep what you have".
 */

const guard = () => typeof window !== 'undefined' && Boolean(BASE);

async function readSection(path) {
  if (!guard()) return null;
  try {
    const res = await fetch(`${BASE}/public/why-upwon-page/${path}`, {
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
 * The API names the target `href`; the site links with react-router's `to`, so
 * both are carried.
 */
const usableCta = (cta) =>
  cta && typeof cta.label === 'string' && typeof cta.href === 'string'
    ? { label: cta.label, href: cta.href, to: cta.href }
    : null;

const usableImage = (value) => (typeof value === 'string' && value !== '' ? value : null);

/*
 * The hero needs its heading and its first button; the artwork is optional,
 * because the section ships its own. The second button is optional too - the
 * hero reads fine with one.
 */
function isRenderableHero(section) {
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
 * The published hero, or null to mean "keep what you have".
 *
 * The buttons carry both `href` and `to` (see usableCta); the images are null
 * when the CMS has none, and the hero then keeps its own artwork.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   desktopImage: string | null, mobileImage: string | null, imageAlt: string | null,
 *   primary: {label: string, href: string, to: string},
 *   secondary: {label: string, href: string, to: string} | null} | null>}
 */
export async function fetchWhyUpwonHeroSection() {
  const section = await readSection('hero-section');
  if (!isRenderableHero(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    desktopImage: usableImage(section.desktopImage),
    mobileImage: usableImage(section.mobileImage),
    imageAlt: typeof section.imageAlt === 'string' ? section.imageAlt : null,
    primary: usableCta(section.primary),
    secondary: usableCta(section.secondary),
  };
}

// The industry trust section is only usable with its heading and one industry.
function isRenderableIndustries(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.industries) &&
    section.industries.length > 0
  );
}

/**
 * The published industry trust row, or null to mean "keep what you have".
 *
 * Industries are renamed to the `{label, photo, to}` the row already takes; one
 * without a photo or a link is dropped, since its card is its photo and the
 * whole card is a link.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   industries: Array<{label: string, photo: string, to: string}>} | null>}
 */
export async function fetchWhyUpwonIndustriesSection() {
  const section = await readSection('industries-section');
  if (!isRenderableIndustries(section)) return null;

  const industries = section.industries
    .filter(
      (industry) =>
        industry &&
        typeof industry.label === 'string' &&
        usableImage(industry.image) &&
        typeof industry.href === 'string' &&
        industry.href !== '',
    )
    .map((industry) => ({ label: industry.label, photo: industry.image, to: industry.href }));
  if (industries.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    industries,
  };
}

const optionalText = (value) => (typeof value === 'string' && value !== '' ? value : null);

/**
 * The published customer trust & testimonials section, or null to mean "keep
 * what you have".
 *
 * Testimonials and logos are each filtered to the ones that can render; an
 * empty list means "keep the built-in one". `panel` is null when the CMS has
 * never authored its lines - keep the built-in ones - and otherwise a null line
 * means "hide it". The button carries both `href` and `to` (see usableCta).
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   panel: {leadLine: string | null, button: {label: string, href: string, to: string} | null,
 *     wallLabel: string | null} | null,
 *   testimonials: Array<{quote: string, author: string, role: string, brand: string,
 *     category: string | null, location: string | null, logo: string}>,
 *   logos: Array<{name: string, src: string}>} | null>}
 */
export async function fetchWhyUpwonTestimonialsSection() {
  const section = await readSection('testimonials-section');
  if (!section || !Array.isArray(section.headingLines) || section.headingLines.length === 0) {
    return null;
  }

  const testimonials = Array.isArray(section.testimonials)
    ? section.testimonials
        .filter(
          (t) =>
            t &&
            typeof t.quote === 'string' &&
            typeof t.author === 'string' &&
            typeof t.role === 'string' &&
            typeof t.brand === 'string' &&
            usableImage(t.logo),
        )
        .map((t) => ({
          quote: t.quote,
          author: t.author,
          role: t.role,
          brand: t.brand,
          category: optionalText(t.category),
          location: optionalText(t.location),
          logo: t.logo,
        }))
    : [];

  const logos = Array.isArray(section.logos)
    ? section.logos
        .filter((logo) => logo && usableImage(logo.image) && typeof logo.alt === 'string')
        .map((logo) => ({ name: logo.alt, src: logo.image }))
    : [];

  if (testimonials.length === 0 && logos.length === 0) return null;

  const panel =
    section.panel && typeof section.panel === 'object'
      ? {
          leadLine: optionalText(section.panel.leadLine),
          button: usableCta(section.panel.button),
          wallLabel: optionalText(section.panel.wallLabel),
        }
      : null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    panel,
    testimonials,
    logos,
  };
}

// The product proof section is only usable with its heading and one callout.
function isRenderableProof(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.callouts) &&
    section.callouts.length > 0
  );
}

/**
 * The published product proof section, or null to mean "keep what you have".
 *
 * `image` is null when the CMS has no artwork of its own, and the section then
 * keeps the one it ships. Each callout's corner and colour follow its
 * position, so they are not carried.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   image: string | null, imageAlt: string | null,
 *   callouts: Array<{title: string, description: string, icon: string}>} | null>}
 */
export async function fetchWhyUpwonProofSection() {
  const section = await readSection('proof-section');
  if (!isRenderableProof(section)) return null;

  const callouts = section.callouts
    .filter(
      (callout) =>
        callout && typeof callout.title === 'string' && typeof callout.description === 'string',
    )
    .map((callout) => ({
      title: callout.title,
      description: callout.description,
      icon: typeof callout.icon === 'string' ? callout.icon : '',
    }));
  if (callouts.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    image: usableImage(section.image),
    imageAlt: typeof section.imageAlt === 'string' ? section.imageAlt : null,
    callouts,
  };
}

// The results section is only usable with its heading and one result.
function isRenderableResults(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.results) &&
    section.results.length > 0
  );
}

const isText = (value) => typeof value === 'string' && value !== '';

/**
 * The published proof & results section, or null to mean "keep what you have".
 *
 * `panel` is null when the visuals have never been authored, and the section
 * keeps its own; its `image` is null when the CMS has no hub artwork of its
 * own. Each card's visual and colours follow its position, so they are not
 * carried.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   panel: {image: string | null, imageAlt: string, checklistItems: string[],
 *     checklistStatus: string, trendTitle: string, trendBadge: string,
 *     trendNote: string, trendNoteSub: string} | null,
 *   results: Array<{stat: string, title: string, description: string, icon: string}>} | null>}
 */
export async function fetchWhyUpwonResultsSection() {
  const section = await readSection('results-section');
  if (!isRenderableResults(section)) return null;

  const results = section.results
    .filter(
      (result) =>
        result &&
        typeof result.stat === 'string' &&
        typeof result.title === 'string' &&
        typeof result.description === 'string',
    )
    .map((result) => ({
      stat: result.stat,
      title: result.title,
      description: result.description,
      icon: typeof result.icon === 'string' ? result.icon : '',
    }));
  if (results.length === 0) return null;

  const raw = section.panel;
  const panel =
    raw &&
    Array.isArray(raw.checklistItems) &&
    raw.checklistItems.length > 0 &&
    isText(raw.checklistStatus) &&
    isText(raw.trendTitle) &&
    isText(raw.trendBadge) &&
    isText(raw.trendNote) &&
    isText(raw.trendNoteSub)
      ? {
          image: usableImage(raw.image),
          imageAlt: typeof raw.imageAlt === 'string' ? raw.imageAlt : '',
          checklistItems: raw.checklistItems.filter(isText),
          checklistStatus: raw.checklistStatus,
          trendTitle: raw.trendTitle,
          trendBadge: raw.trendBadge,
          trendNote: raw.trendNote,
          trendNoteSub: raw.trendNoteSub,
        }
      : null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    panel,
    results,
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
export async function fetchWhyUpwonCtaSection() {
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
