// Knowledgebase content, read from the Upwon admin API: the /knowledgebase
// hub's hero and category cards, each /knowledgebase/:category page's heading
// and guide cards, and each /knowledgebase/:category/:article guide.
//
// The admin panel authors all of it under Resource Page → Knowledgebase, in
// three tabs: Hero Section (an ordered list of slides, as on the blog), Categories
// (an ordered child list, each row a slug, a name, a description and an icon
// NAME) and Articles (one row per guide, filed under one category). Only ACTIVE
// rows are served, and the public shapes carry no ids, timestamps, authorship
// or display order — see the public router in the backend's
// modules/knowledgebase/routes/.
//
// The same three rules as lib/blog.js hold for every read here, for the same
// reasons — every knowledgebase URL is prerendered, and the hub's hero is the
// LCP element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      built-in knowledgebase (data/knowledgebase.js and KnowledgebasePage.jsx's
//      own hero copy), so a build never depends on a running API and the
//      crawled markup is stable. It also means a category or guide that exists
//      only in the admin panel is client-rendered and is not in the sitemap,
//      which seo/routes.js builds from the built-in slugs — and is not
//      prerendered, since App.jsx's getStaticPaths reads the same file.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      built-in content. A CMS outage must not blank the knowledgebase.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, every
//      fetch resolves to null immediately and the knowledgebase behaves exactly
//      as it did before this feature existed.
//
// A 404 is folded into that same null. The API answers 404 for a category
// that is unknown or not ACTIVE, and for a guide that is unknown, not ACTIVE,
// filed under another category or filed under a category that is not ACTIVE;
// a hero with no ACTIVE slide answers an empty list, which reads the same.
// "Nothing published" and "nothing could be reached" are one answer here on
// purpose. The category and article pages tell the two apart with the
// categories read, not with this module — see KnowledgebaseCategoryPage.jsx.
//
// The categories read carries one list, and an empty list has two meanings the
// API separates with one boolean, because the panel CAN empty it:
//
//   hasCategories false         no category row exists AT ALL — none added
//                               yet, or every one deleted — so nothing is
//                               authored and the caller keeps its built-in
//                               knowledgebase.
//   true with an empty array    rows exist and every one was switched off on
//                               purpose, so the hub renders no cards. Putting
//                               the built-in categories back here would
//                               republish what somebody just took down.
//
// Every item is cleaned rather than trusted: a category or guide missing a
// field it cannot render without is dropped on its own, and the rest of the
// list still renders. The icons are names from the backend's allowlist — the
// blog's BLOG_CATEGORY_ICON_NAMES, which already carries the three the built-in
// categories draw (Boxes, ShieldCheck, Truck) — passed through as strings and
// resolved by lib/blogIcons.js at render time, the way lib/blog.js passes its.
//
// Every guide comes back in data/knowledgebase.js's own key names — the API's
// `updatedOn` as `dateModified`, each FAQ's `question`/`answer` as `q`/`a` —
// so a published guide and a built-in one are interchangeable at every render
// site, as lib/blog.js does for posts. A published guide has no
// `datePublished`, `description` or `keywords`: the panel authors none of them.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const textOr = (value, fallback) => (isText(value) ? value.trim() : fallback);

// Site-relative ("/images/hero.webp") or absolute http(s) — the seeded hero
// slide's picture is remote (Unsplash) and an upload resolves to the API's own
// absolute URL, so both forms are in use. The admin API accepts no URL on
// write at all — a hero slide's pictures, desktop and mobile, are uploads only
// — so this is the one place the rule is checked: it keeps a `javascript:` URL
// out of an attribute even if a bad value ever reached a row. A leading "/\"
// is refused along with "//" because browsers read both as protocol-relative.
function safeUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (url.startsWith('/')) return /^\/[/\\]/.test(url) ? null : url;
  return /^https?:\/\//i.test(url) ? url : null;
}

// The slug format the server enforces on write for both categories (≤60) and
// articles (≤120) — the blog's, which the knowledgebase module copies. A slug
// is a React key and a URL segment, so one that does not match is dropped
// rather than rendered.
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const isSlug = (value, max) =>
  typeof value === 'string' && value.length <= max && SLUG_PATTERN.test(value);

const CATEGORY_SLUG_MAX = 60;
const ARTICLE_SLUG_MAX = 120;

/*
 * A 'YYYY-MM-DD' calendar date, and a real one.
 *
 * data/knowledgebase.js's formatKbDate splits the string on '-' and indexes a
 * month table with what it finds, so anything else — a full timestamp,
 * '2026-13-01', '2026-02-30' — would render as "undefined" or roll into the
 * wrong month. The round trip through UTC is what refuses the impossible days;
 * UTC so the visitor's own timezone cannot move the date across midnight.
 */
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function isIsoDate(value) {
  if (typeof value !== 'string') return false;
  const match = DATE_PATTERN.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

// First one wins. The server's unique indexes make a repeat impossible, but the
// slug is the React key and the route, so a repeat is refused here as well
// rather than rendered as two cards fighting over one key.
function uniqueBySlug(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

// Newest "Updated" date first, as the API promises. The sort is stable, so on
// an API that keeps that promise this changes nothing — including its own
// tie-break between two guides updated on the same day.
const byUpdatedDesc = (a, b) =>
  a.dateModified < b.dateModified ? 1 : a.dateModified > b.dateModified ? -1 : 0;

/*
 * One GET against the public Knowledgebase router.
 *
 * Resolves to `{ data }` on a successful envelope and null on every failure —
 * including a 404, which is what the API answers for a category or guide that
 * is not live. See the note at the top of this file.
 *
 * The reads below are independent, so the pages run them together; nothing
 * here holds state, so the order they land in does not matter.
 */
async function getPublished(path) {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  // Rule 3: not configured is not an error.
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/knowledgebase${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    if (!body || body.success !== true || !('data' in body)) return null;
    return { data: body.data };
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // built-in knowledgebase. See rule 2.
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

// `heading` is plain text, carried as the string it was authored as — the
// hub's hero has no `**accent**` markup. There is no alt text: HeroSlider
// paints the backdrop as decorative.
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
 * The published /knowledgebase hero carousel — the ACTIVE slides in the order
 * the panel arranged them — or null to mean "keep whatever you have".
 *
 * Only the words and the pictures are authored. The two buttons — the primary
 * to /demo, the secondary to /blog — and the accent are the page's own and
 * fixed in KnowledgebasePage.jsx.
 *
 * @returns {Promise<Array<{eyebrow: string|null, heading: string,
 *   subtext: string, image: string|null, mobileImage: string|null}> | null>}
 */
export async function fetchKbHero() {
  const published = await getPublished('/hero-section');
  if (!published || !Array.isArray(published.data)) return null;

  const slides = published.data.filter(isRenderableSlide).map(toHeroSlide);
  // An empty carousel is content the site cannot render, so it counts as
  // "nothing published" rather than "publish nothing".
  return slides.length > 0 ? slides : null;
}

// --- Categories ------------------------------------------------------------

// A category card is a slug to link to, a name and a description — the hub's
// card and the category page's hero draw all three. The icon is optional
// here: an unknown or missing name draws lib/blogIcons.js's HelpCircle, which
// leaves the card usable and the gap visible, rather than dropping a whole
// category of guides over a picture.
function isRenderableCategory(category) {
  return (
    isObject(category) &&
    isSlug(category.slug, CATEGORY_SLUG_MAX) &&
    isText(category.name) &&
    isText(category.description)
  );
}

function toCategory(category) {
  return {
    slug: category.slug,
    name: category.name.trim(),
    description: category.description.trim(),
    icon: textOr(category.icon, null),
  };
}

/**
 * The published categories for the hub's cards, or null to mean "keep the
 * built-in knowledgebase".
 *
 * `categories` is the ACTIVE categories in the order the panel arranged them,
 * each with `count` — the ACTIVE guides filed under it, as the server counted
 * them — which the hub's card prints as "N guides".
 *
 * `hasCategories` says why the list is empty — see the note at the top of
 * this file — and is read defensively: an API older than that field sends
 * undefined, and the honest reading of "I cannot tell" is the old behaviour,
 * so it falls back to whether the array has anything in it.
 *
 * @returns {Promise<{
 *   categories: Array<{slug: string, name: string, description: string,
 *     icon: string|null, count: number}>,
 *   hasCategories: boolean,
 * } | null>}
 */
export async function fetchKbCategories() {
  const published = await getPublished('/categories');
  const data = published?.data;
  if (!isObject(data)) return null;

  const categories = Array.isArray(data.categories)
    ? uniqueBySlug(
        data.categories.filter(isRenderableCategory).map((category) => ({
          ...toCategory(category),
          count:
            Number.isInteger(category.count) && category.count >= 0 ? category.count : 0,
        })),
      )
    : [];

  return {
    categories,
    hasCategories:
      typeof data.hasCategories === 'boolean' ? data.hasCategories : categories.length > 0,
  };
}

// --- Articles --------------------------------------------------------------

/*
 * A guide card — the fields the category page's cards and the article page's
 * "Related guides" links render.
 *
 * Required, every one: the slug it links to, the category it files under, the
 * title, the excerpt, the read time and the "Updated" date. The server
 * requires every one of them, so a row missing any is not a card with a gap in
 * it — it is a row this release did not write — and it is dropped.
 */
function isRenderableSummary(article) {
  return (
    isObject(article) &&
    isSlug(article.slug, ARTICLE_SLUG_MAX) &&
    isSlug(article.category, CATEGORY_SLUG_MAX) &&
    isText(article.title) &&
    isText(article.excerpt) &&
    isText(article.readTime) &&
    isIsoDate(article.updatedOn)
  );
}

// The API's Summary in data/knowledgebase.js's own key names — see the note
// at the top of this file.
function toSummary(article) {
  return {
    slug: article.slug,
    category: article.category,
    title: article.title.trim(),
    excerpt: article.excerpt.trim(),
    readTime: article.readTime.trim(),
    dateModified: article.updatedOn,
  };
}

function toSummaries(list) {
  return Array.isArray(list)
    ? uniqueBySlug(list.filter(isRenderableSummary).map(toSummary))
    : [];
}

/**
 * One published category with its guide cards, or null for "not available
 * here".
 *
 * Null covers "the API is unreachable", "the API has no such live category"
 * (a 404 is a non-ok response like any other) and "the answer is not a
 * category this page can render". The category page tells the first two apart
 * with fetchKbCategories, not with this call — see KnowledgebaseCategoryPage.jsx.
 *
 * `articles` is the category's ACTIVE guides, newest "Updated" date first. A
 * card filed under any other category — the API never sends one — is dropped,
 * so every card links to a URL this category's page vouches for. It can be
 * empty: a live category whose guides were all switched off.
 *
 * A reply for a different slug than the one asked for is refused: the page
 * would otherwise render one category under another's URL.
 *
 * @param {string} slug
 * @returns {Promise<{
 *   category: {slug: string, name: string, description: string, icon: string|null},
 *   articles: Array<{slug: string, category: string, title: string,
 *     excerpt: string, readTime: string, dateModified: string}>,
 * } | null>}
 */
export async function fetchKbCategory(slug) {
  // A slug the server could never have stored is not worth a request.
  if (!isSlug(slug, CATEGORY_SLUG_MAX)) return null;

  const published = await getPublished(`/categories/${encodeURIComponent(slug)}`);
  const data = published?.data;

  if (!isObject(data) || !isRenderableCategory(data.category) || data.category.slug !== slug) {
    return null;
  }

  return {
    category: toCategory(data.category),
    articles: toSummaries(data.articles)
      .filter((article) => article.category === slug)
      .sort(byUpdatedDesc),
  };
}

// --- One article -----------------------------------------------------------

// The four block shapes data/knowledgebase.js documents and the server
// validates — the blog's. Anything else is dropped rather than guessed at: the
// article page's renderer draws an unknown type as a paragraph of its `text`,
// so a block from a newer release would otherwise surface as an empty or
// garbled line. A quote's `cite` is optional (the shared body editor offers
// it); null leaves the quote as the built-in guides draw it.
function toBlock(block) {
  if (!isObject(block)) return null;

  switch (block.type) {
    case 'p':
    case 'h2':
      return isText(block.text) ? { type: block.type, text: block.text.trim() } : null;
    case 'ul': {
      const items = Array.isArray(block.items)
        ? block.items.filter(isText).map((item) => item.trim())
        : [];
      return items.length > 0 ? { type: 'ul', items } : null;
    }
    case 'quote':
      return isText(block.text)
        ? { type: 'quote', text: block.text.trim(), cite: textOr(block.cite, null) }
        : null;
    default:
      return null;
  }
}

// One FAQ in the `{ q, a }` shape the shared Faq component (and its FAQPage
// JSON-LD) reads, which is also data/knowledgebase.js's. A half-written pair
// is dropped: a question with no answer is not an FAQ.
function toFaq(faq) {
  if (!isObject(faq) || !isText(faq.question) || !isText(faq.answer)) return null;
  return { q: faq.question.trim(), a: faq.answer.trim() };
}

/**
 * One published guide with its full body, or null for "not available here".
 *
 * Null covers "the API is unreachable", "the API has no such live guide in
 * this category" (a 404 is a non-ok response like any other) and "the answer
 * is not a guide this page can render". The article page tells the first two
 * apart with the category reads, not with this call — see
 * KnowledgebaseArticlePage.jsx.
 *
 * On top of the card fields (see toSummary):
 *   - `categoryName`, the hero's eyebrow and the breadcrumb — required;
 *   - `body`, the blocks, each re-checked against the four shapes; a guide
 *     whose body leaves nothing renderable is not a guide and resolves to
 *     null. The lead over it is the card's `excerpt`, as on every built-in
 *     guide;
 *   - `faqs`, the "Frequently asked" pairs — zero or more;
 *   - `related`, up to three cards chosen by the server (same category first,
 *     then the rest, newest first), never the guide itself.
 *
 * A reply for a different guide or category than the one asked for is
 * refused: the page would otherwise render one guide under another's URL.
 *
 * @param {string} categorySlug
 * @param {string} articleSlug
 * @returns {Promise<{slug: string, category: string, title: string,
 *   excerpt: string, readTime: string, dateModified: string,
 *   categoryName: string,
 *   body: Array<{type: 'p'|'h2', text: string} | {type: 'ul', items: string[]}
 *     | {type: 'quote', text: string, cite: string|null}>,
 *   faqs: Array<{q: string, a: string}>,
 *   related: Array<object>} | null>}
 */
export async function fetchKbArticle(categorySlug, articleSlug) {
  // Slugs the server could never have stored are not worth a request.
  if (!isSlug(categorySlug, CATEGORY_SLUG_MAX) || !isSlug(articleSlug, ARTICLE_SLUG_MAX)) {
    return null;
  }

  const published = await getPublished(
    `/categories/${encodeURIComponent(categorySlug)}/articles/${encodeURIComponent(articleSlug)}`,
  );
  const article = published?.data;

  if (
    !isRenderableSummary(article) ||
    article.slug !== articleSlug ||
    article.category !== categorySlug ||
    !isText(article.categoryName)
  ) {
    return null;
  }

  const body = Array.isArray(article.body) ? article.body.map(toBlock).filter(Boolean) : [];
  if (body.length === 0) return null;

  return {
    ...toSummary(article),
    categoryName: article.categoryName.trim(),
    body,
    faqs: Array.isArray(article.faqs) ? article.faqs.map(toFaq).filter(Boolean) : [],
    related: toSummaries(article.related)
      .filter((card) => card.slug !== articleSlug)
      .slice(0, 3),
  };
}
