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
