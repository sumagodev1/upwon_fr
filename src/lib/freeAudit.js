// The Free Operational Audit page's content, read from the Upwon admin API —
// and the one place an audit request is filed.
//
// The admin panel authors /free-audit under Resource Page → Free Operational
// Audit, in two tabs: Hero Section (an ordered list of slides, exactly as on the
// blog, home and Insider pages) and Free Audit Applications (an inbox of what
// this page's form has sent). Only ACTIVE slides are served, and the public
// shape carries no ids, timestamps, authorship or display order — see the
// public router in the backend's modules/free-audit/routes/.
//
// What is NOT authored is everything else on the page, and deliberately: the
// "How the audit works" steps, the "What you receive" list and the form's own
// copy are static in FreeAuditPage.jsx, and the backend has no table for them.
// The hero's two buttons are behaviour, not content, and stay in code the same
// way.
//
// The same three rules as lib/blog.js and lib/aboutPage.js hold for the read
// here, for the same reasons — the page is prerendered and its hero is the LCP
// element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      page's built-in hero slide, so a build never depends on a running API and
//      the crawled markup is stable.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      built-in hero. A CMS outage must not blank the page.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, the
//      fetch resolves to null immediately and the hero behaves exactly as it
//      did before this feature existed.
//
// A 404 is folded into that same null — an API older than this feature answers
// 404 — and a hero with no ACTIVE slide answers an empty list, which reads the
// same. "Nothing published" and "nothing could be reached" are one answer here
// on purpose.
//
// submitFreeAuditApplication, at the bottom, is a write, and it inverts rules 2
// and 3 exactly the way submitDiscoveryCall in lib/aboutPage.js does — see its
// own comment. scripts/route-audit.js in the backend allowlists every write
// under the API's /public surface by name, and this one is on that list.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const textOr = (value, fallback) => (isText(value) ? value.trim() : fallback);

// Site-relative ("/images/home_hero_bg.webp") or absolute http(s) — the seeded
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
 * One GET against the public Free Audit router.
 *
 * Resolves to `{ data }` on a successful envelope and null on every failure —
 * including a 404. See the note at the top of this file.
 */
async function getPublished(path) {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  // Rule 3: not configured is not an error.
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/free-audit${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    if (!body || body.success !== true || !('data' in body)) return null;
    return { data: body.data };
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // built-in hero. See rule 2.
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
// split rather than `**accent**` markup, so it is carried as the string it was
// authored as. There is no alt text: HeroSlider paints the backdrop as
// decorative.
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
 * The published /free-audit hero carousel — the ACTIVE slides in the order the
 * panel arranged them — or null to mean "keep whatever you have".
 *
 * Only the words and the pictures are authored. The two buttons — 'Book the
 * Audit' to /demo and 'Take the Self-Evaluation' to /self-evaluation — and the
 * accent are the page's own and fixed in FreeAuditPage.jsx.
 *
 * @returns {Promise<Array<{eyebrow: string|null, heading: string,
 *   subtext: string, image: string|null, mobileImage: string|null}> | null>}
 */
export async function fetchFreeAuditHero() {
  const published = await getPublished('/hero-section');
  if (!published || !Array.isArray(published.data)) return null;

  const slides = published.data.filter(isRenderableSlide).map(toHeroSlide);
  // An empty carousel is content the site cannot render, so it counts as
  // "nothing published" rather than "publish nothing".
  return slides.length > 0 ? slides : null;
}

// --- Filing an audit request -----------------------------------------------

/*
 * The write, and the only one this page makes.
 *
 * Rule 1 above still holds: the prerender pass has no visitor and files nothing.
 *
 * Rules 2 and 3 are inverted here, deliberately, and for the same reason
 * submitDiscoveryCall gives in lib/aboutPage.js. There is no mail transport
 * behind this endpoint, so the free_audit_applications row IS the delivery.
 *
 * What this replaced was worse than an unhandled failure. The form's submit
 * handler only set `submitted` — it posted nothing anywhere — so every audit
 * request this page has ever taken was congratulated on screen ("Audit request
 * received.") and thrown away in the same frame. A submit that quietly resolved
 * would be the same lie with better manners.
 *
 * So: every failure is named and returned, the form keeps every value that was
 * typed, and the button can be pressed again.
 */

const APPLICATIONS_PATH = '/public/free-audit/applications';

/**
 * What the page says when this build has no API base URL to post to.
 *
 * Exported because the form shows it up front, before the visitor fills anything
 * in, as well as on a submit that somehow got through — and those two must not
 * be able to drift apart. It names the page's only other way in, because unlike
 * /about this page has no WhatsApp button to point at.
 */
export const FREE_AUDIT_NOT_CONNECTED =
  "This form is not connected yet, so your audit request can't be sent right now. Please email hello@upwon.in instead.";

/**
 * What the visitor reads when a submit does not land: one line per reason the
 * API can refuse, in their terms rather than the protocol's.
 */
const FAILURE_MESSAGES = {
  unconfigured: FREE_AUDIT_NOT_CONNECTED,
  offline:
    'We could not reach our servers, so your request was not sent. Check your connection and try again.',
  invalid: 'Please check the highlighted fields and try again.',
  'rate-limited':
    'Several requests have already been sent from this network. Please wait a few minutes and try again, or email hello@upwon.in instead.',
  unavailable:
    'Audit requests are temporarily unavailable, so yours was not sent. Please email hello@upwon.in instead.',
  failed:
    'Something went wrong at our end and your request was not sent. Please try again in a moment.',
};

const failure = (reason, fieldErrors = {}) => ({
  ok: false,
  reason,
  message: FAILURE_MESSAGES[reason],
  fieldErrors,
});

/*
 * The one translation table between the page's form state and the API.
 *
 * The form's keys predate the API — see the note at the top of
 * lib/freeAuditFields.js — and two of them differ from the API's field names.
 * Every other key is the same on both sides and passes straight through, both
 * in the body posted below and in the field errors mapped back from a 422.
 */
const API_FIELD_FOR = {
  mobile: 'phone',
  revenue: 'revenueRange',
};

/** The reverse of API_FIELD_FOR: an API field name to the form key it came from. */
const FORM_KEY_FOR = Object.fromEntries(
  Object.entries(API_FIELD_FOR).map(([formKey, apiField]) => [apiField, formKey]),
);

/**
 * The label this form shows for each field, by the API field name the server
 * reports its errors against.
 */
const FIELD_LABELS = {
  name: 'Full name',
  company: 'Company',
  role: 'Your role',
  phone: 'Mobile',
  email: 'Work email',
  revenueRange: 'Revenue range',
  pain: 'Biggest operational pain',
};

/*
 * A server message, re-worded for a visitor.
 *
 * The API's validator writes its messages against the field NAME — "phone must
 * be a phone number…" — which is right for a client reading a 422 and wrong
 * under an input labelled "Mobile". The leading name is swapped for the label on
 * screen, and the sentence is given a full stop so it reads like every other
 * message under these fields.
 */
function humanize(field, message) {
  const label = FIELD_LABELS[field];
  let worded = message;

  if (label) {
    worded = message.startsWith(`${field} `)
      ? `${label}${message.slice(field.length)}`
      : `${label}: ${message}`;
  }
  return /[.!?]$/.test(worded) ? worded : `${worded}.`;
}

/*
 * A 422's details, turned into one message per FORM key.
 *
 * `details` is an array only on a ValidationError; every other code puts
 * something else there entirely, so the shape is checked rather than assumed.
 * The server can report two failures for one field — too long AND not a phone
 * number — and the first is the one shown, because the second is usually a
 * consequence of it. `phone` and `revenueRange` are filed back under `mobile`
 * and `revenue`, the inputs they came from.
 */
function toFieldErrors(details) {
  if (!Array.isArray(details)) return {};

  const errors = {};
  for (const entry of details) {
    if (!entry || !isText(entry.field) || !isText(entry.message)) continue;
    const key = FORM_KEY_FOR[entry.field] ?? entry.field;
    if (key in errors) continue;
    errors[key] = humanize(entry.field, entry.message);
  }
  return errors;
}

const trimmed = (value) => (typeof value === 'string' ? value.trim() : '');

/** An optional field: its trimmed text, or null when blank. */
const trimmedOrNull = (value) => (isText(value) ? value.trim() : null);

/**
 * Whether an audit request can be delivered at all.
 *
 * False means this build has no API base URL configured, so there is nowhere to
 * post to. The form says so above the button rather than taking somebody through
 * seven fields and failing at the end.
 *
 * @returns {boolean}
 */
export function canSubmitFreeAuditApplication() {
  return Boolean(BASE);
}

/**
 * Files one audit request.
 *
 * `form` is the page's own state. It is posted under the API's field names —
 * `mobile` as `phone`, `revenue` as `revenueRange` — and a 422's field errors
 * come back under the form's keys, so each lands under the right input.
 *
 * `role` and `pain` are sent as null when blank rather than "": the columns are
 * nullable and the server reads a blank as null anyway, but null says so
 * outright. `revenue` is sent exactly as the chip spells it — no trim — because
 * the server compares it byte for byte against its own four strings.
 *
 * @param {{name: string, company: string, role: string, mobile: string,
 *   email: string, revenue: string, pain: string}} form
 * @returns {Promise<{ok: true} | {ok: false, reason: string, message: string,
 *   fieldErrors: Record<string, string>}>}
 */
export async function submitFreeAuditApplication(form) {
  // Rule 1: the prerender pass must not reach the network. It has no visitor and
  // no filled-in form, so reaching here at all would be a mistake.
  if (typeof window === 'undefined') return failure('unconfigured');
  if (!BASE) return failure('unconfigured');

  const payload = {
    name: trimmed(form.name),
    company: trimmed(form.company),
    role: trimmedOrNull(form.role),
    [API_FIELD_FOR.mobile]: trimmed(form.mobile),
    email: trimmed(form.email),
    [API_FIELD_FOR.revenue]: typeof form.revenue === 'string' ? form.revenue : '',
    pain: trimmedOrNull(form.pain),
  };

  let res;
  try {
    res = await fetch(`${BASE}${APPLICATIONS_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Offline, CORS, DNS, an API that is not running. Unlike a read, this one is
    // reported rather than swallowed.
    return failure('offline');
  }

  /*
   * Success is taken from the status, not from the body. A 2xx from this
   * endpoint (201) means the row committed; the body is a receipt and never the
   * stored row, so there is nothing in it worth trusting over the status — and a
   * receipt that failed to parse must not turn a filed request into an error the
   * visitor would answer by sending it a second time.
   */
  if (res.ok) return { ok: true };

  const errorBody = await res.json().catch(() => null);

  // 422 is the only answer that can name fields. A 404 means the route is not
  // there at all — an API older than this feature — which is not the visitor's
  // fault and not something another press would fix.
  if (res.status === 422) return failure('invalid', toFieldErrors(errorBody?.error?.details));
  if (res.status === 429) return failure('rate-limited');
  if (res.status === 404) return failure('unavailable');
  return failure('failed');
}
