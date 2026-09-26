// Insider (newsletter) page content, read from the Upwon admin API.
//
// The admin panel authors the Insider page section by section — Hero Section,
// Issues & Stories, Feature Section — and this module reads the published
// result back. Only ACTIVE rows are served, and the public shape carries no
// ids, ordering or timestamps — see the public routers in the backend's
// modules/insider-page/routes/.
//
// The same three rules as lib/homePage.js hold for every fetch here, for the
// same reasons — the page is prerendered and its hero is the LCP element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      static content (the sections' own defaults and data/newsletter.js), so
//      a build never depends on a running API and the crawled markup is
//      stable. It also means an issue or story that exists only in the admin
//      panel is client-rendered: it has no prerendered page of its own.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      static content. A CMS outage must not blank the page.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, every
//      fetch resolves to null immediately and the site behaves exactly as
//      before — the same convention lib/leads.js uses for its endpoint.
//
// The one answer that is neither "content" nor "keep yours" is the Feature
// Section's, which can be published as hidden — see fetchInsiderFeature.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const textOr = (value, fallback) => (isText(value) ? value : fallback);

// Site-relative ("/clients/monginis") or absolute http(s), nothing else. The
// API enforces the same rule on write; checking again here keeps a
// `javascript:` link out of an href even if a bad row ever got past it. A
// leading "/\" is refused along with "//" because browsers read both as
// protocol-relative.
function safeUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (url.startsWith('/')) return /^\/[/\\]/.test(url) ? null : url;
  return /^https?:\/\//i.test(url) ? url : null;
}

/*
 * One GET against the public Insider router.
 *
 * Resolves to `{ data }` on a successful envelope and null on every failure.
 * The wrapper object is what lets `data: null` — a real answer from the
 * Feature Section endpoint — survive being told apart from "no answer".
 */
async function getPublished(path) {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/insider-page${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    if (!body || body.success !== true || !('data' in body)) return null;
    return { data: body.data };
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // static content. See rule 2.
    return null;
  }
}

// --- Hero Section ----------------------------------------------------------

// A slide is only usable if it has the two fields the hero always renders. It
// has no eyebrow: the hero always shows the issue being viewed.
function isRenderableSlide(slide) {
  return slide && isText(slide.heading) && isText(slide.subtext);
}

// The API shape renamed to the keys the Insider hero already uses, so the
// fetched slides and its built-in one are interchangeable at the render site.
// imageAlt is not carried: HeroSlider paints the backdrop as decorative.
function toHeroSlide(slide) {
  return {
    headline: slide.heading,
    subhead: slide.subtext,
    // Null means no image of its own; the hero falls back to its house art.
    bg: safeUrl(slide.image),
    // Null means no phone-specific crop: HeroSlider serves `bg` to every
    // viewport and omits the <picture> source entirely.
    mobileBg: safeUrl(slide.mobileImage),
  };
}

/**
 * The published Insider hero carousel, or null to mean "keep whatever you have".
 *
 * @returns {Promise<Array<{headline: string, subhead: string,
 *   bg: string|null, mobileBg: string|null}> | null>}
 */
export async function fetchInsiderHeroSlides() {
  const published = await getPublished('/hero-section');
  if (!published || !Array.isArray(published.data)) return null;

  const slides = published.data.filter(isRenderableSlide).map(toHeroSlide);
  // An empty carousel is content the site cannot render, so it counts as
  // "nothing published" rather than "publish nothing".
  return slides.length > 0 ? slides : null;
}

// --- Issues & Stories ------------------------------------------------------

// A story needs a slug to be linked to and a title to be shown; every other
// field has a harmless empty rendering.
function isRenderableStory(story) {
  return story && isText(story.slug) && isText(story.title);
}

function isRenderableIssue(issue) {
  return (
    issue &&
    isText(issue.slug) &&
    isText(issue.label) &&
    Number.isInteger(issue.issueNumber)
  );
}

// Field names already match data/newsletter.js; this only fills the optional
// ones so a sparse row renders like a complete one.
function toStory(story) {
  return {
    slug: story.slug,
    eyebrow: textOr(story.eyebrow, ''),
    cta: textOr(story.cta, 'Read story'),
    title: story.title,
    blurb: textOr(story.blurb, ''),
    image: safeUrl(story.image),
    // Null lets the card fall back to the title, as the static stories do.
    imageAlt: textOr(story.imageAlt, null),
    readTime: textOr(story.readTime, null),
  };
}

function toIssue(issue) {
  return {
    slug: issue.slug,
    label: issue.label,
    issueNumber: issue.issueNumber,
    current: issue.current === true,
    stories: Array.isArray(issue.stories)
      ? issue.stories.filter(isRenderableStory).map(toStory)
      : [],
  };
}

/**
 * The published issues, newest first, in the same shape as ISSUES in
 * data/newsletter.js — or null to mean "keep the static issues".
 *
 * Exactly one issue comes back with `current: true`. The API promises that;
 * it is normalised here anyway because the archive's "Current" chip and the
 * page's fallback issue both key off the flag.
 *
 * @returns {Promise<Array<{slug: string, label: string, issueNumber: number,
 *   current: boolean, stories: Array<{slug: string,
 *   eyebrow: string, cta: string, title: string, blurb: string,
 *   image: string|null, imageAlt: string|null, readTime: string|null}>}> | null>}
 */
export async function fetchInsiderIssues() {
  const published = await getPublished('/issues');
  if (!published || !Array.isArray(published.data)) return null;

  const issues = published.data.filter(isRenderableIssue).map(toIssue);
  // No issues is a page the site cannot render — there is no current issue to
  // fall back to — so it counts as "nothing published", as for the hero.
  if (issues.length === 0) return null;

  const currentIndex = Math.max(
    0,
    issues.findIndex((issue) => issue.current),
  );
  return issues.map((issue, i) => ({ ...issue, current: i === currentIndex }));
}

/**
 * One published story with its full body, or null for "not available here".
 *
 * Null covers both "the API is unreachable" and "the API has no such story"
 * (a 404 is a non-ok response like any other). The story page tells the two
 * apart with the issue list, not with this call — see NewsletterStoryPage.
 *
 * @returns {Promise<{issue: {slug: string, label: string, issueNumber: number},
 *   story: {slug: string, eyebrow: string, cta: string, title: string,
 *   blurb: string, image: string|null, imageAlt: string|null,
 *   readTime: string|null, body: string[]}} | null>}
 */
export async function fetchInsiderStory(issueSlug, storySlug) {
  if (!isText(issueSlug) || !isText(storySlug)) return null;

  const published = await getPublished(
    `/issues/${encodeURIComponent(issueSlug)}/stories/${encodeURIComponent(storySlug)}`,
  );
  const data = published?.data;
  if (!data || !isRenderableIssue(data.issue) || !isRenderableStory(data.story)) {
    return null;
  }

  return {
    issue: {
      slug: data.issue.slug,
      label: data.issue.label,
      issueNumber: data.issue.issueNumber,
    },
    story: {
      ...toStory(data.story),
      body: Array.isArray(data.story.body) ? data.story.body.filter(isText) : [],
    },
  };
}

// --- Feature Section -------------------------------------------------------

// The heading is authored with the home hero's markers and arrives already
// parsed into lines of `{ text, accent }` parts — the only field the section
// cannot render without.
function isRenderableFeature(feature) {
  return (
    feature &&
    Array.isArray(feature.headingLines) &&
    feature.headingLines.length > 0 &&
    feature.headingLines.every(
      (parts) =>
        Array.isArray(parts) &&
        parts.every((part) => part && typeof part.text === 'string'),
    )
  );
}

function toFeature(feature) {
  return {
    badge: textOr(feature.badge, null),
    eyebrow: textOr(feature.eyebrow, null),
    headingLines: feature.headingLines.map((parts) =>
      parts.map((part) => ({ text: part.text, accent: part.accent === true })),
    ),
    body: textOr(feature.body, null),
    bullets: Array.isArray(feature.bullets) ? feature.bullets.filter(isText) : [],
    image: safeUrl(feature.image),
    imageAlt: textOr(feature.imageAlt, ''),
  };
}

/**
 * The published long-form feature callout. Three answers, not two:
 *
 *   — `{ hidden: false, feature }`: render this.
 *   — `{ hidden: true }`: published as switched off — render nothing. The API
 *     says so with `data: null`, which is an answer, not a failure.
 *   — `null`: unavailable (rules 1-3) — keep the static callout.
 *
 * @returns {Promise<{hidden: true} | {hidden: false, feature: {badge: string|null,
 *   eyebrow: string|null, headingLines: Array, body: string|null,
 *   bullets: string[],
 *   image: string|null, imageAlt: string}} | null>}
 */
export async function fetchInsiderFeature() {
  const published = await getPublished('/feature-section');
  if (!published) return null;
  if (published.data === null) return { hidden: true };
  if (!isRenderableFeature(published.data)) return null;
  return { hidden: false, feature: toFeature(published.data) };
}
