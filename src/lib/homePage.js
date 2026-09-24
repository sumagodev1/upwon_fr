// Home page content, read from the Upwon admin API.
//
// The admin panel authors the home page section by section; this module reads
// the published result back. Only ACTIVE rows are served, and the public shape
// carries no ids, ordering or timestamps — see the public router in the
// backend's modules/home-page/routes/hero-section.routes.ts.
//
// Three rules hold for every fetch here, because the home page is prerendered
// and its hero is the LCP element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      component's own static slides, so a build never depends on a running
//      API and the crawled/first-paint markup is stable.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      static content. A CMS outage must not blank the marketing homepage.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, this
//      resolves to null immediately and the site behaves exactly as before —
//      the same convention lib/leads.js uses for its endpoint.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

// A slide is only usable if it has the three fields the hero actually renders.
function isRenderable(slide) {
  return (
    slide &&
    typeof slide.eyebrow === 'string' &&
    slide.eyebrow.trim() !== '' &&
    Array.isArray(slide.headingLines) &&
    slide.headingLines.length > 0 &&
    typeof slide.subtext === 'string' &&
    slide.subtext.trim() !== ''
  );
}

// The API shape renamed to the keys the hero component already uses, so the
// fetched slides and the static ones are interchangeable at the render site.
function toSlide(slide) {
  return {
    eyebrow: slide.eyebrow,
    headingLines: slide.headingLines,
    subhead: slide.subtext,
    image: slide.image ?? null,
    // Null means no phone-specific crop: the hero serves the desktop image to
    // every viewport and omits the <picture> source entirely.
    mobileImage: slide.mobileImage ?? null,
    imageAlt: slide.imageAlt ?? '',
    shine: slide.shine === true,
  };
}

/**
 * The published hero carousel, or null to mean "keep whatever you have".
 *
 * @returns {Promise<Array<{eyebrow: string, headingLines: Array, subhead: string,
 *   image: string|null, imageAlt: string, shine: boolean}> | null>}
 */
export async function fetchHeroSlides() {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/home-page/hero-section`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    if (!body || body.success !== true || !Array.isArray(body.data)) return null;

    const slides = body.data.filter(isRenderable).map(toSlide);
    // An empty carousel is content the site cannot render, so it counts as
    // "nothing published" rather than "publish nothing".
    return slides.length > 0 ? slides : null;
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // static slides. See rule 2.
    return null;
  }
}

// A trust section is only usable if it has the copy the card is built around.
function isRenderableTrust(section) {
  return (
    section &&
    typeof section.eyebrow === 'string' &&
    section.eyebrow.trim() !== '' &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== ''
  );
}

/**
 * The published trust section, or null to mean "keep whatever you have".
 *
 * The logo and stat lists come back as their own arrays and are deliberately
 * left possibly-empty rather than being filtered out here: the caller decides
 * per list whether to fall back, because a section with published copy but no
 * logos yet should still use the new copy alongside the built-in marquee.
 *
 * @returns {Promise<{eyebrow: string, headingLines: Array, subtext: string,
 *   logos: Array<{src: string, alt: string}>, stats: Array<{value: string,
 *   label: string}>} | null>}
 */
export async function fetchTrustSection() {
  // Same three rules as fetchHeroSlides: never during the SSG build, never
  // throw, and unconfigured is a valid state.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/home-page/trust-section`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    // `data` is null when the section is switched off in the admin panel.
    if (!body || body.success !== true || !isRenderableTrust(body.data)) return null;

    const section = body.data;
    return {
      eyebrow: section.eyebrow,
      headingLines: section.headingLines,
      subtext: section.subtext,
      // Renamed to `src`, which is what the marquee already expects.
      logos: (section.logos ?? [])
        .filter((logo) => logo && typeof logo.image === 'string')
        .map((logo) => ({ src: logo.image, alt: logo.alt ?? '' })),
      stats: (section.stats ?? []).filter(
        (stat) => stat && stat.value && stat.label,
      ),
    };
  } catch {
    return null;
  }
}

// The industries section needs all four of its fields to render as designed.
function isRenderableIndustries(section) {
  return (
    section &&
    typeof section.eyebrow === 'string' &&
    section.eyebrow.trim() !== '' &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    typeof section.video === 'string' &&
    section.video.trim() !== ''
  );
}

/**
 * The published industries video intro, or null to mean "keep what you have".
 *
 * The server returns the first active entry with a usable video, already folded
 * into the shape this section renders — so there is no list to pick through
 * here.
 *
 * @returns {Promise<{eyebrow: string, headingLines: Array, subtext: string,
 *   video: string} | null>}
 */
export async function fetchIndustriesSection() {
  // Same three rules as the other fetches: never during the SSG build, never
  // throw, and unconfigured is a valid state.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/home-page/industries-section`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    // `data` is null when nothing is published or the active entry lost its video.
    if (!body || body.success !== true || !isRenderableIndustries(body.data)) return null;

    const { eyebrow, headingLines, subtext, video } = body.data;
    return { eyebrow, headingLines, subtext, video };
  } catch {
    return null;
  }
}

// A values section is only usable with its copy and at least one card.
function isRenderableValues(section) {
  return (
    section &&
    typeof section.eyebrow === 'string' &&
    section.eyebrow.trim() !== '' &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    Array.isArray(section.cards) &&
    section.cards.length > 0
  );
}

/**
 * The published values and work culture section, or null to mean "keep what
 * you have".
 *
 * The server assembles the copy from the first active card and the grid from
 * every active card that still has an image, so there is no list to fold
 * together here.
 *
 * @returns {Promise<{eyebrow: string, headingLines: Array, subtext: string,
 *   cards: Array<{photo: string, title: string, sub: string}>} | null>}
 */
export async function fetchValuesSection() {
  // Same three rules as the other fetches: never during the SSG build, never
  // throw, and unconfigured is a valid state.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/home-page/values-section`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    // `data` is null when nothing is published, or every active card lost its image.
    if (!body || body.success !== true || !isRenderableValues(body.data)) return null;

    const section = body.data;
    return {
      eyebrow: section.eyebrow,
      headingLines: section.headingLines,
      subtext: section.subtext,
      // Renamed to the keys the card grid already uses.
      cards: section.cards
        .filter((card) => card && typeof card.image === 'string')
        .map((card) => ({ photo: card.image, title: card.title, sub: card.body })),
    };
  } catch {
    return null;
  }
}

// An integrations section is only usable with its copy and at least one logo.
function isRenderableIntegrations(section) {
  return (
    section &&
    typeof section.eyebrow === 'string' &&
    section.eyebrow.trim() !== '' &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    Array.isArray(section.logos) &&
    section.logos.length > 0
  );
}

/**
 * The published platform integrations section, or null to mean "keep what you
 * have".
 *
 * The server assembles the copy and the centre logo from the first active
 * entry and the sphere from every active entry whose logo still resolves, so
 * there is no list to fold together here.
 *
 * `centreLogo` is the one field allowed to come back null on an otherwise
 * usable section: the sphere renders perfectly well around the mark the site
 * ships, so a missing one is not a reason to drop the whole CMS copy.
 *
 * @returns {Promise<{eyebrow: string, headingLines: Array, subtext: string,
 *   centreLogo: string | null, logos: Array<{src: string, alt: string}>} | null>}
 */
export async function fetchIntegrationsSection() {
  // Same three rules as the other fetches: never during the SSG build, never
  // throw, and unconfigured is a valid state.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/home-page/integrations-section`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    // `data` is null when nothing is published, or every active logo was lost.
    if (!body || body.success !== true || !isRenderableIntegrations(body.data)) return null;

    const section = body.data;
    return {
      eyebrow: section.eyebrow,
      headingLines: section.headingLines,
      subtext: section.subtext,
      centreLogo: typeof section.centreLogo === 'string' ? section.centreLogo : null,
      // Renamed to the keys HexSphere already takes.
      logos: section.logos
        .filter((logo) => logo && typeof logo.image === 'string')
        .map((logo) => ({ src: logo.image, alt: logo.alt })),
    };
  } catch {
    return null;
  }
}

// A testimonials section is only usable with its copy and at least one card.
function isRenderableTestimonials(section) {
  return (
    section &&
    typeof section.eyebrow === 'string' &&
    section.eyebrow.trim() !== '' &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    Array.isArray(section.cards) &&
    section.cards.length > 0
  );
}

/**
 * The published client testimonials section, or null to mean "keep what you
 * have".
 *
 * The server assembles the copy from the first active card and the marquee
 * from every active card whose poster still resolves, so there is no list to
 * fold together here.
 *
 * A card's `video` is the one field allowed through as null: the component
 * already drops the play button and offers the customer story instead, which
 * is the right state for a testimonial still being filmed.
 *
 * @returns {Promise<{eyebrow: string, headingLines: Array, subtext: string,
 *   cards: Array<{brand: string, role: string, quote: string, poster: string,
 *   video: string | null}>} | null>}
 */
export async function fetchTestimonialsSection() {
  // Same three rules as the other fetches: never during the SSG build, never
  // throw, and unconfigured is a valid state.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/home-page/testimonials-section`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    // `data` is null when nothing is published, or every active card lost its poster.
    if (!body || body.success !== true || !isRenderableTestimonials(body.data)) return null;

    const section = body.data;
    return {
      eyebrow: section.eyebrow,
      headingLines: section.headingLines,
      subtext: section.subtext,
      // Renamed to the keys the card component already uses.
      cards: section.cards
        .filter((card) => card && typeof card.poster === 'string')
        .map((card) => ({
          brand: card.clientName,
          role: card.clientPosition,
          quote: card.quote,
          poster: card.poster,
          video: typeof card.video === 'string' ? card.video : null,
        })),
    };
  } catch {
    return null;
  }
}

// An FAQ section is only usable with its copy and at least one question.
function isRenderableFaq(section) {
  return (
    section &&
    typeof section.eyebrow === 'string' &&
    section.eyebrow.trim() !== '' &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    Array.isArray(section.faqs) &&
    section.faqs.length > 0
  );
}

/**
 * The published FAQ section, or null to mean "keep what you have".
 *
 * The server assembles the copy from the first active question and the
 * accordion from every active question, so there is no list to fold together
 * here. The `q`/`a` keys already match what the accordion component takes.
 *
 * @returns {Promise<{eyebrow: string, headingLines: Array, subtext: string,
 *   faqs: Array<{q: string, a: string}>} | null>}
 */
export async function fetchFaqSection() {
  // Same three rules as the other fetches: never during the SSG build, never
  // throw, and unconfigured is a valid state.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/home-page/faq-section`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    // `data` is null when nothing is published.
    if (!body || body.success !== true || !isRenderableFaq(body.data)) return null;

    const section = body.data;
    return {
      eyebrow: section.eyebrow,
      headingLines: section.headingLines,
      subtext: section.subtext,
      faqs: section.faqs.filter(
        (faq) => faq && typeof faq.q === 'string' && typeof faq.a === 'string',
      ),
    };
  } catch {
    return null;
  }
}

// A CTA band is only usable with its copy and a button label; the artwork and
// the report are optional, because the component ships both of those itself.
function isRenderableCta(section) {
  return (
    section &&
    typeof section.eyebrow === 'string' &&
    section.eyebrow.trim() !== '' &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    typeof section.buttonLabel === 'string' &&
    section.buttonLabel.trim() !== ''
  );
}

/**
 * The published report-download band, or null to mean "keep what you have".
 *
 * `reportUrl` already carries ?download, so the button saves the PDF rather
 * than opening it in a viewer. That has to come from the server: this site and
 * the API are different origins, and a cross-origin <a download> is ignored.
 *
 * @returns {Promise<{eyebrow: string, headingLines: Array, subtext: string,
 *   desktopImage: string | null, mobileImage: string | null,
 *   buttonLabel: string, reportUrl: string | null} | null>}
 */
export async function fetchCtaSection() {
  // Same three rules as the other fetches: never during the SSG build, never
  // throw, and unconfigured is a valid state.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/home-page/cta-section`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    // `data` is null when the copy or the band has not been authored yet.
    if (!body || body.success !== true || !isRenderableCta(body.data)) return null;

    const section = body.data;
    return {
      eyebrow: section.eyebrow,
      headingLines: section.headingLines,
      subtext: section.subtext,
      desktopImage:
        typeof section.desktopImage === 'string' ? section.desktopImage : null,
      mobileImage: typeof section.mobileImage === 'string' ? section.mobileImage : null,
      buttonLabel: section.buttonLabel,
      reportUrl: typeof section.reportUrl === 'string' ? section.reportUrl : null,
    };
  } catch {
    return null;
  }
}
