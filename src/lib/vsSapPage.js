// The UpWon vs SAP comparison page's content, read from the Upwon admin API.
//
// The admin panel authors /compare/upwon-vs-sap under Resource Page → UpWon vs
// SAP, in three tabs: Hero Section (an ordered list of slides, exactly as on the
// blog, Free Audit and Knowledgebase pages), Straight Answer (a singleton: the
// section's eyebrow and heading, the two side-by-side cards — each a title and
// an ordered list of points — and the italic closing line) and Capability
// Comparison (a singleton of copy — eyebrow, heading, subtext and the three
// "Total Cost of Ownership" labels — with an ordered child list of capability
// rows, each a name and three 0..5 ratings, embedded in its read). Only ACTIVE
// slides and rows are served, and the public shapes carry no ids, timestamps,
// authorship or display order — see the public router in the backend's
// modules/vs-sap-page/routes/.
//
// What is NOT authored is everything else on the page, and deliberately: "THE
// MATH" band and its button, the SEO tags, the matrix's column headings, its
// star legend and its colours are static in VsSapPage.jsx and
// components/shared/ComparisonMatrix/ComparisonMatrix.jsx, and the backend has
// no table for them. The hero's two buttons are behaviour, not content, and
// stay in code the same way.
//
// The same three rules as lib/blog.js and lib/freeAudit.js hold for every read
// here, for the same reasons — the page is prerendered and its hero is the LCP
// element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      page's built-in content (VsSapPage.jsx's own copy and data/metrics.js's
//      COMPETITORS), so a build never depends on a running API and the crawled
//      markup is stable.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      built-in content. A CMS outage must not blank the page.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, every
//      fetch resolves to null immediately and the page behaves exactly as it
//      did before this feature existed.
//
// A 404 is folded into that same null. The API answers 404 while the Straight
// Answer or the Capability Comparison copy has never been saved — an API older
// than this feature answers 404 for all three reads — and a hero with no
// ACTIVE slide answers an empty list, which reads the same. "Nothing
// published" and "nothing could be reached" are one answer here on purpose.
//
// The comparison read carries one list, and an empty list has two meanings the
// API separates with one boolean, because the panel CAN empty it:
//
//   hasCapabilities false       no capability row exists AT ALL — none added
//                               yet, or every one deleted — so nothing is
//                               authored and the caller keeps the built-in rows
//                               (data/metrics.js's COMPETITORS).
//   true with an empty array    rows exist and every one was switched off on
//                               purpose, so the matrix renders no capability
//                               rows. Putting the built-in ones back here would
//                               republish ratings somebody just took down.
//
// Every row is cleaned rather than trusted: a capability row missing its name,
// or carrying a rating that is not a whole number from 0 to 5, is dropped on
// its own, and the rest of the matrix still renders.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const textOr = (value, fallback) => (isText(value) ? value.trim() : fallback);

// Site-relative ("/images/hero%20bg.webp") or absolute http(s) — the seeded
// slide's picture is the site's own and an upload resolves to the API's own
// absolute URL, so both forms are in use. The admin API accepts no URL on write
// at all — a slide's pictures, desktop and mobile, are uploads only — so this is
// the one place the rule is checked: it keeps a `javascript:` URL out of an
// attribute even if a bad value ever reached a row. A leading "/\" is refused
// along with "//" because browsers read both as protocol-relative.
function safeUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (url.startsWith('/')) return /^\/[/\\]/.test(url) ? null : url;
  return /^https?:\/\//i.test(url) ? url : null;
}

/*
 * One GET against the public UpWon vs SAP router.
 *
 * Resolves to `{ data }` on a successful envelope and null on every failure —
 * including a 404, which is what the API answers for a section never saved.
 * See the note at the top of this file.
 *
 * The three reads below are independent, so the page runs them together;
 * nothing here holds state, so the order they land in does not matter.
 */
async function getPublished(path) {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  // Rule 3: not configured is not an error.
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/vs-sap-page${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    if (!body || body.success !== true || !('data' in body)) return null;
    return { data: body.data };
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // built-in page. See rule 2.
    return null;
  }
}

const isObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

// --- Hero Section ----------------------------------------------------------

// A slide is only usable if it has the two fields the hero always renders.
function isRenderableSlide(slide) {
  return isObject(slide) && isText(slide.heading) && isText(slide.subtext);
}

// `heading` is plain text, as on the blog's hero: HeroSlider styles an em-dash
// split rather than `**accent**` markup — which is exactly how the built-in
// "UpWon vs SAP Business One — Where Each One Wins." renders — so it is carried
// as the string it was authored as. There is no alt text: HeroSlider paints
// the backdrop as decorative.
function toHeroSlide(slide) {
  return {
    // Null when it somehow arrives blank; the caller answers it with its
    // built-in eyebrow. The server requires one, so this is a guard rather than
    // a state anyone can reach from the panel.
    eyebrow: textOr(slide.eyebrow, null),
    heading: slide.heading.trim(),
    subtext: slide.subtext.trim(),
    // Null means no picture of its own; the caller falls back to its house art.
    image: safeUrl(slide.image),
    // Null means no phone-specific crop: HeroSlider serves the desktop picture
    // to every viewport and omits the <picture> source entirely.
    mobileImage: safeUrl(slide.mobileImage),
  };
}

/**
 * The published /compare/upwon-vs-sap hero carousel — the ACTIVE slides in the
 * order the panel arranged them — or null to mean "keep whatever you have".
 *
 * Only the words and the pictures are authored. The two buttons — 'Request a
 * Demo' to /demo and 'Calculate Your ROI' to /roi-calculator — and the accent
 * are the page's own and fixed in VsSapPage.jsx.
 *
 * @returns {Promise<Array<{eyebrow: string|null, heading: string,
 *   subtext: string, image: string|null, mobileImage: string|null}> | null>}
 */
export async function fetchVsSapHero() {
  const published = await getPublished('/hero-section');
  if (!published || !Array.isArray(published.data)) return null;

  const slides = published.data.filter(isRenderableSlide).map(toHeroSlide);
  // An empty carousel is content the site cannot render, so it counts as
  // "nothing published" rather than "publish nothing".
  return slides.length > 0 ? slides : null;
}

// --- Straight Answer -------------------------------------------------------

// The heading is authored with the home hero's two markers — a newline for a
// line break, `**like this**` for the orange accent ("No Spin." on the built-in
// section) — and arrives already parsed into lines of `{ text, accent }` parts,
// so no component here has to know the marker grammar. The raw `heading`
// string the API also sends is deliberately not carried: rendering it would put
// literal asterisks on the page.
function isRenderableHeading(lines) {
  return (
    Array.isArray(lines) &&
    lines.length > 0 &&
    lines.every(
      (parts) =>
        Array.isArray(parts) &&
        parts.every((part) => isObject(part) && typeof part.text === 'string'),
    )
  );
}

function toHeadingLines(lines) {
  return lines.map((parts) =>
    parts.map((part) => ({ text: part.text, accent: part.accent === true })),
  );
}

// One card's points, in the order the panel arranged them. A blank or
// non-string entry is dropped on its own and the rest of the list still
// renders.
function toPoints(list) {
  return Array.isArray(list) ? list.filter(isText).map((point) => point.trim()) : [];
}

/**
 * The published "The straight answer" section — its heading and the two
 * side-by-side cards under it — or null to mean "keep whatever you have".
 *
 * Every field but the eyebrow is required: the heading, each card's title and
 * points, and the italic closing line under the SAP card are all always on the
 * page. The server requires one to ten points per card, so a card whose list
 * cleans down to nothing is not a card with a gap in it — it is a section this
 * release did not write — and the whole section resolves to null.
 *
 * Only the words are authored. The two cards' look — the orange UpWon card with
 * its ticks, the white SAP card with its crosses — is the page's own.
 *
 * @returns {Promise<{eyebrow: string|null,
 *   headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   upwonTitle: string, upwonPoints: string[],
 *   sapTitle: string, sapPoints: string[],
 *   closingLine: string} | null>}
 */
export async function fetchVsSapAnswer() {
  const published = await getPublished('/answer-section');
  const section = published?.data;

  if (
    !isObject(section) ||
    !isRenderableHeading(section.headingLines) ||
    !isText(section.upwonTitle) ||
    !isText(section.sapTitle) ||
    !isText(section.closingLine)
  ) {
    return null;
  }

  const upwonPoints = toPoints(section.upwonPoints);
  const sapPoints = toPoints(section.sapPoints);
  if (upwonPoints.length === 0 || sapPoints.length === 0) return null;

  return {
    // Null when it somehow arrives blank; the caller answers it with its
    // built-in eyebrow, as the hero does.
    eyebrow: textOr(section.eyebrow, null),
    headingLines: toHeadingLines(section.headingLines),
    upwonTitle: section.upwonTitle.trim(),
    upwonPoints,
    sapTitle: section.sapTitle.trim(),
    sapPoints,
    closingLine: section.closingLine.trim(),
  };
}

// --- Capability Comparison -------------------------------------------------

// The three columns this page's matrix draws, in the API's key names — which
// are data/metrics.js's COMPETITOR_KEYS for the same three vendors, so a
// published row and a built-in one are interchangeable in ComparisonMatrix.
const RATING_KEYS = ['upwon', 'sap', 'netsuite'];

// ComparisonMatrix draws a rating as that many of five stars and 0 as "—", so
// anything but a whole number from 0 to 5 has no drawing. The server's CHECK
// makes one impossible; this is the guard for a row that somehow got past it.
const isRating = (value) => Number.isInteger(value) && value >= 0 && value <= 5;

function isRenderableCapability(row) {
  return (
    isObject(row) && isText(row.capability) && RATING_KEYS.every((key) => isRating(row[key]))
  );
}

function toCapability(row) {
  return {
    capability: row.capability.trim(),
    upwon: row.upwon,
    sap: row.sap,
    netsuite: row.netsuite,
  };
}

// First one wins. A capability's name is its row label and its React key in
// ComparisonMatrix, and the server does not promise two rows never share one,
// so a repeat is refused here rather than rendered as two rows fighting over
// one key — a matrix that lists one capability twice says nothing the first
// row did not.
function uniqueByCapability(rows) {
  const seen = new Set();
  return rows.filter((row) => {
    if (seen.has(row.capability)) return false;
    seen.add(row.capability);
    return true;
  });
}

/**
 * The published "Capability comparison" matrix — its copy, its "Total Cost of
 * Ownership (3 yr)" labels and its capability rows — or null to mean "keep
 * whatever you have".
 *
 * `heading` and `subtext` are required: the matrix always renders both. The
 * eyebrow and each TCO label arrive as null when blank, and the matrix answers
 * each with its built-in value. The heading is plain text — the matrix's title
 * has no accent, so there is no `**accent**` markup to parse.
 *
 * `capabilities` is the ACTIVE rows in the order the panel arranged them, each
 * with its three ratings. `hasCapabilities` says why the list is empty — see
 * the note at the top of this file — and is read defensively: an API older
 * than that field sends undefined, and the honest reading of "I cannot tell"
 * is the old behaviour, so it falls back to whether the array has anything in
 * it.
 *
 * @returns {Promise<{eyebrow: string|null, heading: string, subtext: string,
 *   tco: {upwon: string|null, sap: string|null, netsuite: string|null},
 *   capabilities: Array<{capability: string, upwon: number, sap: number,
 *     netsuite: number}>,
 *   hasCapabilities: boolean} | null>}
 */
export async function fetchVsSapComparison() {
  const published = await getPublished('/comparison-section');
  const data = published?.data;

  if (!isObject(data) || !isText(data.heading) || !isText(data.subtext)) return null;

  const tco = isObject(data.tco) ? data.tco : {};
  const capabilities = Array.isArray(data.capabilities)
    ? uniqueByCapability(data.capabilities.filter(isRenderableCapability).map(toCapability))
    : [];

  return {
    eyebrow: textOr(data.eyebrow, null),
    heading: data.heading.trim(),
    subtext: data.subtext.trim(),
    tco: {
      upwon: textOr(tco.upwon, null),
      sap: textOr(tco.sap, null),
      netsuite: textOr(tco.netsuite, null),
    },
    capabilities,
    hasCapabilities:
      typeof data.hasCapabilities === 'boolean'
        ? data.hasCapabilities
        : capabilities.length > 0,
  };
}
