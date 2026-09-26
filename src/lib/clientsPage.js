// Clients & Case Studies page content, read from the Upwon admin API.
//
// The admin panel authors the Clients page section by section — its Hero
// Section, featured Case Studies, Roster Logos, Network Map and Testimonials —
// and this module reads the published result back. Only ACTIVE rows are served, and the public
// shape carries no ids, ordering or timestamps — see the public routers in the
// backend's modules/clients-page/routes/.
//
// The same three rules as lib/insiderPage.js hold for every fetch here, for
// the same reasons — the page is prerendered and its hero is the LCP element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      section's built-in slide, so a build never depends on a running API.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      static content. A CMS outage must not blank the page.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, every
//      fetch resolves to null immediately and the site behaves exactly as
//      before.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

// Site-relative or absolute http(s), nothing else — the same guard as
// lib/insiderPage.js, so a bad row can never put a `javascript:` URL in a
// background image.
function safeUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (url.startsWith('/')) return /^\/[/\\]/.test(url) ? null : url;
  return /^https?:\/\//i.test(url) ? url : null;
}

/*
 * One GET against the public Clients router. Resolves to `{ data }` on a
 * successful envelope and null on every failure.
 */
async function getPublished(path) {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/clients-page${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    if (!body || body.success !== true || !('data' in body)) return null;
    return { data: body.data };
  } catch {
    // Offline, CORS, DNS, malformed JSON — keep the static content (rule 2).
    return null;
  }
}

// --- Hero Section ----------------------------------------------------------

// A slide is only usable if it has the two fields the hero always renders.
function isRenderableSlide(slide) {
  return slide && isText(slide.heading) && isText(slide.subtext);
}

// The API shape renamed to the keys the Clients hero already uses, so the
// fetched slides and its built-in one are interchangeable at the render site.
function toHeroSlide(slide) {
  return {
    headline: slide.heading,
    subhead: slide.subtext,
    // Null means no image of its own; the hero falls back to its house art.
    bg: safeUrl(slide.image),
    // Null means no phone-specific crop: HeroSlider serves `bg` everywhere.
    mobileBg: safeUrl(slide.mobileImage),
  };
}

/**
 * The published Clients hero carousel, or null to mean "keep whatever you have".
 *
 * @returns {Promise<Array<{headline: string, subhead: string,
 *   bg: string|null, mobileBg: string|null}> | null>}
 */
export async function fetchClientsHeroSlides() {
  const published = await getPublished('/hero-section');
  if (!published || !Array.isArray(published.data)) return null;

  const slides = published.data.filter(isRenderableSlide).map(toHeroSlide);
  // An empty carousel is content the site cannot render, so it counts as
  // "nothing published" rather than "publish nothing".
  return slides.length > 0 ? slides : null;
}

// --- Featured case studies -------------------------------------------------

const textOr = (value, fallback) => (isText(value) ? value : fallback);

// A card needs a name to be told apart and a quote to say anything; every
// other field has a harmless empty rendering.
function isRenderableCard(card) {
  return card && isText(card.brand) && isText(card.headline);
}

function toCaseCard(card) {
  return {
    category: textOr(card.category, ''),
    brand: card.brand,
    location: textOr(card.location, ''),
    scale: textOr(card.scale, null),
    headline: card.headline,
    outcomes: Array.isArray(card.outcomes)
      ? card.outcomes
          .filter((o) => o && isText(o.value))
          .map((o) => ({ value: o.value, label: textOr(o.label, '') }))
          .slice(0, 3)
      : [],
    // Null hides 'Read the full story'.
    storyUrl: safeUrl(card.storyUrl),
    // Set when the card has a published story at /clients/<slug>.
    slug: isText(card.slug) ? card.slug : null,
  };
}

// The heading arrives already parsed into lines of `{ text, accent }` parts.
function isRenderableHeading(lines) {
  return (
    Array.isArray(lines) &&
    lines.length > 0 &&
    lines.every(
      (parts) =>
        Array.isArray(parts) && parts.every((part) => part && typeof part.text === 'string'),
    )
  );
}

/**
 * The published featured cases section - its copy and cards - or null to mean
 * "keep whatever you have".
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array,
 *   subtext: string|null, cards: Array<{category: string, brand: string,
 *   location: string, scale: string|null, headline: string,
 *   outcomes: Array<{value: string, label: string}>,
 *   storyUrl: string|null}>} | null>}
 */
export async function fetchClientsCases() {
  const published = await getPublished('/cases-section');
  const section = published?.data;
  if (!section || !isRenderableHeading(section.headingLines)) return null;
  if (!Array.isArray(section.cards)) return null;

  const cards = section.cards.filter(isRenderableCard).map(toCaseCard);
  // No cards is a section the page cannot render: keep the built-in one.
  if (cards.length === 0) return null;

  return {
    eyebrow: textOr(section.eyebrow, null),
    headingLines: section.headingLines.map((parts) =>
      parts.map((part) => ({ text: part.text, accent: part.accent === true })),
    ),
    subtext: textOr(section.subtext, null),
    cards,
  };
}

// --- Roster logos ----------------------------------------------------------

/**
 * The published roster band - its copy and marquee logos - or null to mean
 * "keep whatever you have". Logos come back in TrustStrip's own
 * `{ name, src }` shape, so they drop straight into its `logos` prop.
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array,
 *   subtext: string|null, logos: Array<{name: string, src: string}>} | null>}
 */
export async function fetchClientsRoster() {
  const published = await getPublished('/roster-section');
  const section = published?.data;
  if (!section || !isRenderableHeading(section.headingLines)) return null;
  if (!Array.isArray(section.logos)) return null;

  const logos = section.logos
    .filter((logo) => logo && isText(logo.name))
    .map((logo) => ({ name: logo.name, src: safeUrl(logo.image) }))
    // A tile without artwork would fall back to TrustStrip's typographic
    // style, which this page does not use - drop it instead.
    .filter((logo) => logo.src);
  // An empty marquee is a section the page cannot render: keep the built-in one.
  if (logos.length === 0) return null;

  return {
    eyebrow: textOr(section.eyebrow, null),
    headingLines: section.headingLines.map((parts) =>
      parts.map((part) => ({ text: part.text, accent: part.accent === true })),
    ),
    subtext: textOr(section.subtext, null),
    logos,
  };
}

// --- Operational network ---------------------------------------------------

const isCoordinate = (value, min, max) =>
  typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;

// A city is a pin, so it needs a name and a coordinate that lands on the
// India outline - anything else would draw a pin off the map.
function isRenderableCity(city) {
  return (
    city &&
    isText(city.name) &&
    isCoordinate(city.lat, 6, 37.5) &&
    isCoordinate(city.lng, 68, 97.5)
  );
}

/**
 * The published operational network - its copy and states - or null to mean
 * "keep whatever you have". States come back in DeploymentMap's own
 * `{ state, zone, cities: [{ name, lat, lng }] }` shape; the map derives its
 * counters, pins and lines from them.
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array,
 *   subtext: string|null, states: Array<{state: string, zone: string,
 *   cities: Array<{name: string, lat: number, lng: number}>}>} | null>}
 */
export async function fetchClientsNetwork() {
  const published = await getPublished('/network-section');
  const section = published?.data;
  if (!section || !isRenderableHeading(section.headingLines)) return null;
  if (!Array.isArray(section.states)) return null;

  const states = section.states
    .filter((row) => row && isText(row.state) && Array.isArray(row.cities))
    .map((row) => ({
      state: row.state,
      zone: textOr(row.zone, 'Other'),
      cities: row.cities
        .filter(isRenderableCity)
        .map((c) => ({ name: c.name, lat: c.lat, lng: c.lng })),
    }))
    .filter((row) => row.cities.length > 0);
  // A map with no pins is a section the page cannot render: keep the built-in one.
  if (states.length === 0) return null;

  return {
    eyebrow: textOr(section.eyebrow, null),
    headingLines: section.headingLines.map((parts) =>
      parts.map((part) => ({ text: part.text, accent: part.accent === true })),
    ),
    subtext: textOr(section.subtext, null),
    states,
  };
}

// --- Testimonials ----------------------------------------------------------

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

/**
 * The published testimonials band - its copy and quote cards - or null to mean
 * "keep whatever you have". Cards come back in TestimonialsMarquee's own
 * `{ quote, author, role, rating, avatar, fallbackColor }` shape (`role` is
 * the company line), so they drop straight into its `items` prop.
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array,
 *   subtext: string|null, testimonials: Array<{quote: string, author: string,
 *   role: string, rating: number, avatar: string|null,
 *   fallbackColor: string}>} | null>}
 */
export async function fetchClientsTestimonials() {
  const published = await getPublished('/testimonials-section');
  const section = published?.data;
  if (!section || !isRenderableHeading(section.headingLines)) return null;
  if (!Array.isArray(section.testimonials)) return null;

  const testimonials = section.testimonials
    .filter((t) => t && isText(t.quote) && isText(t.author))
    .map((t) => ({
      quote: t.quote,
      author: t.author,
      role: textOr(t.company, ''),
      rating: Number.isInteger(t.rating) ? Math.min(5, Math.max(1, t.rating)) : 5,
      // Null draws the author's initials instead.
      avatar: safeUrl(t.avatar),
      fallbackColor: HEX_COLOR.test(t.fallbackColor ?? '') ? t.fallbackColor : '#E85A2A',
    }));
  // An empty marquee is a section the page cannot render: keep the built-in one.
  if (testimonials.length === 0) return null;

  return {
    eyebrow: textOr(section.eyebrow, null),
    headingLines: section.headingLines.map((parts) =>
      parts.map((part) => ({ text: part.text, accent: part.accent === true })),
    ),
    subtext: textOr(section.subtext, null),
    testimonials,
  };
}

// --- Case study stories ----------------------------------------------------

const textList = (value) => (Array.isArray(value) ? value.filter(isText) : []);

const rowsOf = (value, keys) =>
  Array.isArray(value)
    ? value
        .filter((row) => row && keys.every((key) => isText(row[key])))
        .map((row) => Object.fromEntries(keys.map((key) => [key, row[key]])))
    : [];

/**
 * One published case study for /clients/<slug>, in CaseStudyPage's own shape,
 * or null for "not available here" - unreachable API and unknown slug alike
 * (a 404 is a non-ok response like any other). The page tells the two apart
 * by whether it has a built-in copy of the story to fall back on.
 *
 * @returns {Promise<{slug: string, category: string, brand: string,
 *   location: string, scale: string|null, headline: string,
 *   duration: string|null, challengeOneLine: string|null,
 *   challengeSummary: string|null, outcomes: Array<{value: string, label: string}>,
 *   challenges: Array<{title: string, desc: string}>, whyUpwon: string|null,
 *   timeline: Array<{week: string, title: string, detail: string}>,
 *   deliverables: string[],
 *   testimonial: {quote: string, author: string, role: string}|null} | null>}
 */
export async function fetchClientsCaseStory(slug) {
  if (!isText(slug)) return null;

  const published = await getPublished(`/cases-section/stories/${encodeURIComponent(slug)}`);
  const story = published?.data;
  if (!story || !isText(story.slug) || !isText(story.brand) || !isText(story.headline)) {
    return null;
  }

  const t = story.testimonial;
  return {
    slug: story.slug,
    category: textOr(story.category, ''),
    brand: story.brand,
    location: textOr(story.location, ''),
    scale: textOr(story.scale, null),
    headline: story.headline,
    duration: textOr(story.duration, null),
    challengeOneLine: textOr(story.challengeOneLine, null),
    challengeSummary: textOr(story.challengeSummary, null),
    outcomes: rowsOf(story.outcomes, ['value', 'label']),
    challenges: rowsOf(story.challenges, ['title', 'desc']),
    whyUpwon: textOr(story.whyUpwon, null),
    timeline: rowsOf(story.timeline, ['week', 'title', 'detail']),
    deliverables: textList(story.deliverables),
    testimonial:
      t && isText(t.quote) && isText(t.author) && isText(t.role)
        ? { quote: t.quote, author: t.author, role: t.role }
        : null,
  };
}
