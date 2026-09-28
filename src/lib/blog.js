// Blog content, read from the Upwon admin API: the /blog listing's hero and
// its "Insights by Topic" intro, the category chips and post cards shared by
// /blog and the /resources hub, and each /blog/:slug article.
//
// The admin panel authors all of it under Resource Page → Blog, in four tabs:
// Hero Section (an ordered list of slides, as on the home and Insider pages),
// Topics Section (a singleton of copy), Categories (an ordered child list, each
// row a slug, a label and an icon NAME) and Posts (one row per article,
// ordered by its publish date). Only ACTIVE rows are
// served, and the public shapes carry no ids, timestamps, authorship or display
// order — see the public router in the backend's modules/blog/routes/.
//
// The same three rules as lib/aboutPage.js and lib/insiderPage.js hold for
// every read here, for the same reasons — /blog and /resources are
// prerendered and their heroes are the LCP element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      built-in blog (data/blog.js and BlogPage.jsx's own copy), so a build
//      never depends on a running API and the crawled markup is stable. It also
//      means a post that exists only in the admin panel is client-rendered and
//      is not in the sitemap, which seo/routes.js builds from the built-in
//      slugs.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      built-in content. A CMS outage must not blank the blog.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, every
//      fetch resolves to null immediately and the blog behaves exactly as it
//      did before this feature existed.
//
// A 404 is folded into that same null. The API answers 404 while the topic
// intro has never been saved, and for a post slug that is unknown or not
// ACTIVE; a hero with no ACTIVE slide answers an empty list, which reads the
// same. "Nothing published" and "nothing could be reached" are one answer
// here on purpose. The post page tells the two apart with the index read, not
// with this module — see BlogPostPage.jsx.
//
// The index read carries the two lists, and an empty list has two meanings the
// API separates with one boolean per list, because the panel CAN empty it:
//
//   hasCategories / hasPosts false  no row exists AT ALL — none added yet, or
//                                   every one deleted — so nothing is authored
//                                   and the caller keeps its built-in listing.
//   true with an empty array        rows exist and every one was switched off
//                                   on purpose, so the listing renders empty.
//                                   Putting the built-in posts back here would
//                                   republish what somebody just took down.
//
// Every item is cleaned rather than trusted: a category or post missing a
// field it cannot render without is dropped on its own, and the rest of the
// list still renders. The icons are names from the backend's
// BLOG_CATEGORY_ICON_NAMES allowlist, passed through as strings and resolved by
// lib/blogIcons.js at render time, the way lib/erpPage.js passes its icons.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const textOr = (value, fallback) => (isText(value) ? value.trim() : fallback);

// Site-relative ("/blog/wastage.webp") or absolute http(s) — the seeded posts'
// pictures are remote (Unsplash), the seeded hero slide's is the site's own
// and an upload resolves to the API's own absolute URL, so both forms are in
// use. The admin API accepts no URL on write at all — a post's and a hero
// slide's pictures, desktop and mobile, are uploads only — so this is
// the one place the rule is checked: it keeps a `javascript:` URL out of an
// attribute even if a bad value ever reached a row. A leading "/\" is refused
// along with "//" because browsers read both as protocol-relative.
function safeUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (url.startsWith('/')) return /^\/[/\\]/.test(url) ? null : url;
  return /^https?:\/\//i.test(url) ? url : null;
}

// The slug format the server enforces on write for both categories (≤60) and
// posts (≤120). A slug is a React key, a filter id and — for a post — a URL
// segment, so one that does not match is dropped rather than rendered.
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const isSlug = (value, max) =>
  typeof value === 'string' && value.length <= max && SLUG_PATTERN.test(value);

const CATEGORY_SLUG_MAX = 60;
const POST_SLUG_MAX = 120;

/*
 * A 'YYYY-MM-DD' calendar date, and a real one.
 *
 * data/blog.js's formatPostDate splits the string on '-' and indexes a month
 * table with what it finds, so anything else — a full timestamp, '2026-13-01',
 * '2026-02-30' — would render as "undefined" or roll into the wrong month. The
 * round trip through UTC is what refuses the impossible days; UTC so the
 * visitor's own timezone cannot move the date across midnight.
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

// Newest first, as the API promises. The sort is stable, so on an API that
// keeps that promise this changes nothing — including its created_at tie-break
// between two posts published on the same day — and on one that does not, the
// featured "latest" card is still the latest post.
const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

/*
 * One GET against the public Blog router.
 *
 * Resolves to `{ data }` on a successful envelope and null on every failure —
 * including a 404, which is what the API answers for a section never saved and
 * for a post that is not live. See the note at the top of this file.
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
    const res = await fetch(`${BASE}/public/blog${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    if (!body || body.success !== true || !('data' in body)) return null;
    return { data: body.data };
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // built-in blog. See rule 2.
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

// `heading` is plain text: the hero is the one heading in this area with no
// `**accent**` markup (HeroSlider styles an em-dash split instead), so it is
// carried as the string it was authored as. There is no alt text: HeroSlider
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
 * The published /blog hero carousel — the ACTIVE slides in the order the panel
 * arranged them — or null to mean "keep whatever you have".
 *
 * Only the words and the pictures are authored. The two buttons — the primary
 * to /demo, the secondary to /knowledgebase — and the accent are the page's
 * own and fixed in BlogPage.jsx.
 *
 * @returns {Promise<Array<{eyebrow: string|null, heading: string,
 *   subtext: string, image: string|null, mobileImage: string|null}> | null>}
 */
export async function fetchBlogHero() {
  const published = await getPublished('/hero-section');
  if (!published || !Array.isArray(published.data)) return null;

  const slides = published.data.filter(isRenderableSlide).map(toHeroSlide);
  // An empty carousel is content the site cannot render, so it counts as
  // "nothing published" rather than "publish nothing".
  return slides.length > 0 ? slides : null;
}

// --- Topics Section --------------------------------------------------------

// The heading is authored with the home hero's two markers — a newline for a
// line break, `**like this**` for the orange accent — and arrives already parsed
// into lines of `{ text, accent }` parts, so no component here has to know the
// marker grammar. The raw `heading` string the API also sends is deliberately
// not carried: rendering it would put literal asterisks on the page.
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

/**
 * The published "Insights by Topic" intro over the category chips, or null to
 * mean "keep whatever you have".
 *
 * Copy only: the chips under it are the index read's categories, which answer
 * for themselves — see fetchBlogIndex.
 *
 * @returns {Promise<{eyebrow: string|null,
 *   headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   subtext: string} | null>}
 */
export async function fetchBlogTopics() {
  const published = await getPublished('/topics-section');
  const section = published?.data;

  if (
    !isObject(section) ||
    !isRenderableHeading(section.headingLines) ||
    !isText(section.subtext)
  ) {
    return null;
  }

  return {
    eyebrow: textOr(section.eyebrow, null),
    headingLines: toHeadingLines(section.headingLines),
    subtext: section.subtext.trim(),
  };
}

// --- Categories ------------------------------------------------------------

// A chip is a slug to filter by and a label to show. The icon is optional here:
// an unknown or missing name draws lib/blogIcons.js's HelpCircle, which leaves
// the chip usable and the gap visible, rather than dropping a whole lane of
// posts over a picture.
function isRenderableCategory(category) {
  return (
    isObject(category) &&
    isSlug(category.slug, CATEGORY_SLUG_MAX) &&
    isText(category.label)
  );
}

function toCategory(category) {
  return {
    slug: category.slug,
    label: category.label.trim(),
    icon: textOr(category.icon, null),
    // The number of ACTIVE posts in it, as the server counted them. The pages
    // count the list they actually render instead — see BlogPage.jsx — so this
    // is carried for completeness rather than drawn.
    count: Number.isInteger(category.count) && category.count >= 0 ? category.count : 0,
  };
}

// --- Posts -----------------------------------------------------------------

/*
 * A post card — the fields every listing, the featured card and the "Keep
 * reading" row render.
 *
 * Required: the slug it links to, the category it files under, the title, the
 * excerpt, the date and the byline. The server requires every one of them, so a
 * row missing any is not a card with a gap in it — it is a row this release did
 * not write — and it is dropped.
 *
 * Optional: the image (null when nothing is set, or an upload was deleted out
 * from under the row; the cards then draw a plain navy panel), its phone crop
 * and the read time (null hides it). There is no alt text: every card's <img>
 * takes the post title, as every built-in card always has.
 *
 * `mobileImage` is the optional portrait (3:4) upload that BlogPostPage's top
 * image — and nothing else — serves below 768px through a <picture> source.
 * Every card (the blog's featured and grid cards, the post page's related
 * cards, Resources' featured card) draws the landscape `image` on every screen
 * and ignores it; summaries carry it only so every post has the one shape.
 * Null is the ordinary state — every built-in post and every post nobody has
 * cropped — and the post page then draws the single <img> it always has. The
 * crop stands in for `image` on phones rather than replacing
 * it, so one arriving with no `image` behind it (the desktop upload deleted out
 * from under the row) is dropped along with it, as lib/aboutPage.js does for the
 * hero's backdrops.
 */
function isRenderablePostSummary(post) {
  return (
    isObject(post) &&
    isSlug(post.slug, POST_SLUG_MAX) &&
    isSlug(post.category, CATEGORY_SLUG_MAX) &&
    isText(post.title) &&
    isText(post.excerpt) &&
    isIsoDate(post.date) &&
    isText(post.author)
  );
}

// The API's PostSummary, already in data/blog.js's own key names (plus
// `mobileImage`, read only by BlogPostPage's top image), so a published post
// and a built-in one are interchangeable at every render site — a built-in
// post simply has no `mobileImage`, which reads the same as null.
function toPostSummary(post) {
  const image = safeUrl(post.image);
  return {
    slug: post.slug,
    category: post.category,
    title: post.title.trim(),
    excerpt: post.excerpt.trim(),
    image,
    mobileImage: image ? safeUrl(post.mobileImage) : null,
    readTime: textOr(post.readTime, null),
    date: post.date,
    author: post.author.trim(),
  };
}

function toPostSummaries(list) {
  return Array.isArray(list)
    ? uniqueBySlug(list.filter(isRenderablePostSummary).map(toPostSummary))
    : [];
}

/**
 * The published listing — the category chips and every post card — or null to
 * mean "keep the built-in listing".
 *
 * `categories` is the ACTIVE categories in the order the panel arranged them;
 * `posts` is the ACTIVE posts whose category is ACTIVE, newest first. A post
 * whose category is not in `categories` — the API never sends one, but a
 * category dropped above for a bad slug or label would leave its posts
 * orphaned — is dropped too, so every card has a chip to filter it by and a
 * label to show.
 *
 * `hasCategories` / `hasPosts` say why a list is empty — see the note at the
 * top of this file — and are read defensively: an API older than those fields
 * sends undefined, and the honest reading of "I cannot tell" is the old
 * behaviour, so each falls back to whether its array has anything in it.
 *
 * @returns {Promise<{
 *   categories: Array<{slug: string, label: string, icon: string|null, count: number}>,
 *   hasCategories: boolean,
 *   posts: Array<{slug: string, category: string, title: string, excerpt: string,
 *     image: string|null, mobileImage: string|null,
 *     readTime: string|null, date: string, author: string}>,
 *   hasPosts: boolean,
 * } | null>}
 */
export async function fetchBlogIndex() {
  const published = await getPublished('/posts');
  const data = published?.data;
  if (!isObject(data)) return null;

  const categories = Array.isArray(data.categories)
    ? uniqueBySlug(data.categories.filter(isRenderableCategory).map(toCategory))
    : [];
  const filed = new Set(categories.map((category) => category.slug));
  const posts = toPostSummaries(data.posts)
    .filter((post) => filed.has(post.category))
    .sort(byDateDesc);

  return {
    categories,
    hasCategories:
      typeof data.hasCategories === 'boolean' ? data.hasCategories : categories.length > 0,
    posts,
    hasPosts: typeof data.hasPosts === 'boolean' ? data.hasPosts : posts.length > 0,
  };
}

// --- One post --------------------------------------------------------------

// The four block shapes data/blog.js documents and the server validates.
// Anything else is dropped rather than guessed at: BlogPostPage's renderer
// draws an unknown type as a paragraph of its `text`, so a block from a newer
// release would otherwise surface as an empty or garbled line.
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

/**
 * One published article with its full body, or null for "not available here".
 *
 * Null covers "the API is unreachable", "the API has no such live post" (a 404
 * is a non-ok response like any other) and "the answer is not a post this page
 * can render". The post page tells the first two apart with the index read,
 * not with this call — see BlogPostPage.jsx.
 *
 * On top of the card fields (see toPostSummary):
 *   - `lead`, the standfirst over the body — required;
 *   - `body`, the blocks, each re-checked against the four shapes; a post whose
 *     body leaves nothing renderable is not an article and resolves to null;
 *   - `related`, up to three cards chosen by the server with getRelatedPosts'
 *     rule (same category newest first, then the rest), never the post itself.
 *
 * A reply for a different slug than the one asked for is refused: the page
 * would otherwise render one article under another's URL.
 *
 * @param {string} slug
 * @returns {Promise<{slug: string, category: string, title: string,
 *   excerpt: string, image: string|null, mobileImage: string|null,
 *   readTime: string|null, date: string, author: string,
 *   lead: string,
 *   body: Array<{type: 'p'|'h2', text: string} | {type: 'ul', items: string[]}
 *     | {type: 'quote', text: string, cite: string|null}>,
 *   related: Array<object>} | null>}
 */
export async function fetchBlogPost(slug) {
  // A slug the server could never have stored is not worth a request.
  if (!isSlug(slug, POST_SLUG_MAX)) return null;

  const published = await getPublished(`/posts/${encodeURIComponent(slug)}`);
  const post = published?.data;

  if (!isRenderablePostSummary(post) || post.slug !== slug || !isText(post.lead)) {
    return null;
  }

  const body = Array.isArray(post.body) ? post.body.map(toBlock).filter(Boolean) : [];
  if (body.length === 0) return null;

  return {
    ...toPostSummary(post),
    lead: post.lead.trim(),
    body,
    related: toPostSummaries(post.related)
      .filter((card) => card.slug !== slug)
      .slice(0, 3),
  };
}
