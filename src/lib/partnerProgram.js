// Partner Program page content, read from the Upwon admin API — and the one
// place a partner application is filed.
//
// The admin panel authors ONE section of /partners, in its Partner Program →
// Hero Section tab: the band at the top of the page. That is all it authors.
// The three partnership models, the earnings calculator and everything below
// them are static artwork in PartnersPage.jsx and have no section behind them —
// nobody asked for them to be authored, and the backend has no table for them.
//
// The same three rules as lib/careers.js hold for the read, for the same
// reasons — the page is prerendered and its headline is the LCP element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      built-in hero in PartnersPage.jsx, so a build never depends on a running
//      API and the crawled markup is stable.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      built-in hero. A CMS outage must not blank the top of the page.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set the
//      read resolves to null immediately and the hero behaves exactly as it did
//      before this feature existed.
//
// A 404 is folded into that same null. The API answers 404 while the section has
// never been authored, and "nothing has been published" and "nothing could be
// reached" are one answer here on purpose: in both cases the site has nothing
// published to show and keeps its own copy. There is no third answer of the kind
// lib/careers.js needs for an empty vacancy list, because this section has no
// status and cannot be published as switched off.
//
// submitPartnerApplication, at the bottom, is a write, and it inverts rules 2
// and 3 exactly the way lib/careers.js's submitCareerApplication does — see its
// own comment. It is the third and last write anywhere under the API's /public
// surface; scripts/route-audit.js in the backend allowlists precisely these
// three, so a fourth still fails that audit.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const textOr = (value, fallback) => (isText(value) ? value : fallback);

// Site-relative ("/images/partners.webp") or absolute http(s), nothing else.
// The API enforces the same rule on write; checking again here keeps a
// `javascript:` URL out of an attribute even if a bad row ever got past it. A
// leading "/\" is refused along with "//" because browsers read both as
// protocol-relative.
function safeUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (url.startsWith('/')) return /^\/[/\\]/.test(url) ? null : url;
  return /^https?:\/\//i.test(url) ? url : null;
}

// --- Hero Section ----------------------------------------------------------

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
        parts.every((part) => part && typeof part.text === 'string'),
    )
  );
}

function toHeadingLines(lines) {
  return lines.map((parts) =>
    parts.map((part) => ({ text: part.text, accent: part.accent === true })),
  );
}

/**
 * The published Partner Program hero, or null to mean "keep whatever you have".
 *
 * `imageAlt` is in the API's shape but is deliberately not carried: PageHero
 * renders `bgImages` as a decorative backdrop (`alt=""` + `aria-hidden`) with
 * the real copy laid over it as text, so a description would be announced
 * nowhere. The API returns one anyway, because the slot is the site's to decide
 * and the next layout that does need one should not have to invent it.
 *
 * `eyebrow` comes back as null when it somehow arrives blank, which PageHero
 * answers by not rendering the pill at all. The server requires it, so this is
 * a guard rather than a state anyone can reach from the panel.
 *
 * `image` and `mobileImage` are the two crops of the backdrop, and either can be
 * null on its own: the panel's two slots are independent. Null `mobileImage` — the
 * state every published hero is in until somebody uploads a phone crop — means the
 * wide file serves every viewport, which is exactly how this band rendered before
 * the second slot existed. The caller decides which crop each viewport gets; see
 * PartnersPage.
 *
 * @returns {Promise<{eyebrow: string|null,
 *   headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   subtext: string, image: string|null, mobileImage: string|null} | null>}
 */
export async function fetchPartnerHero() {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  let body;
  try {
    const res = await fetch(`${BASE}/public/partner-program/hero-section`, {
      headers: { Accept: 'application/json' },
    });
    // Includes the 404 the API answers while the section has never been
    // authored — see the note at the top of this file.
    if (!res.ok) return null;
    body = await res.json();
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // built-in hero. See rule 2.
    return null;
  }

  if (!body || body.success !== true) return null;

  const hero = body.data;
  // The headline and the paragraph under it are what this band cannot render
  // without, so a row arriving without either counts as nothing published and
  // the built-in hero stands whole rather than in part.
  if (!hero || !isRenderableHeading(hero.headingLines) || !isText(hero.subtext)) {
    return null;
  }

  return {
    eyebrow: textOr(hero.eyebrow, null),
    headingLines: toHeadingLines(hero.headingLines),
    subtext: hero.subtext,
    // Null means no backdrop has been uploaded; the hero then renders on its
    // own ambient background, exactly as it did before this feature existed.
    image: safeUrl(hero.image),
    // The optional phone crop. Null — including from an API older than this
    // field, which sends nothing at all — means "no crop of its own", and the
    // caller then serves `image` to every viewport.
    mobileImage: safeUrl(hero.mobileImage),
  };
}

// --- Filing an application -------------------------------------------------

/*
 * The write.
 *
 * Rule 1 above still holds: the prerender pass has no applicant and submits
 * nothing.
 *
 * Rules 2 and 3 are inverted here, deliberately, and for the same reason
 * submitCareerApplication gives. There is no mail transport behind this
 * endpoint, so the partner_program_applications row IS the delivery. What this
 * replaced was a window.alert() fired from a submit handler that sent nothing
 * anywhere — every application this page has ever collected was thrown away one
 * frame after somebody was congratulated for sending it. A submit that quietly
 * resolved would be the same lie with better manners.
 *
 * So: every failure is named and returned, the form keeps every value that was
 * typed, and Apply can be pressed again.
 *
 * Unlike the Contact enquiry form, nothing on this form is picked from a
 * published list, so there is no 'options changed' failure to recover from and
 * no reason for a submit to depend on the hero having been authored at all.
 */

const APPLICATION_PATH = '/public/partner-program/applications';

/**
 * What the page says when this build has no API base URL to post to.
 *
 * Exported because the form shows it up front, before the applicant fills
 * anything in, as well as on a submit that somehow got through — and those two
 * must not be able to drift apart.
 */
export const PARTNER_APPLICATION_NOT_CONNECTED =
  'This form is not connected yet, so your application cannot be sent. Please email us at hello@upwon.in instead.';

/**
 * What the applicant reads when a submit does not land: one line per reason the
 * API can refuse, in their terms rather than the protocol's.
 */
const FAILURE_MESSAGES = {
  unconfigured: PARTNER_APPLICATION_NOT_CONNECTED,
  offline:
    'We could not reach our servers, so your application was not sent. Check your connection and try again.',
  invalid: 'Please check the highlighted fields and apply again.',
  'rate-limited':
    'Several applications have already been sent from this network. Please wait a few minutes and try again, or email us at hello@upwon.in.',
  unavailable:
    'Applications are temporarily unavailable, so yours was not sent. Please email us at hello@upwon.in.',
  failed:
    'Something went wrong at our end and your application was not sent. Please try again in a moment.',
};

const failure = (reason, fieldErrors = {}) => ({
  ok: false,
  reason,
  message: FAILURE_MESSAGES[reason],
  fieldErrors,
});

/**
 * The label this form shows for each field, by the API field name the server
 * reports its errors against.
 */
const FIELD_LABELS = {
  fullName: 'Full name',
  company: 'Company',
  role: 'Your role',
  background: 'Background',
  mobile: 'Mobile',
  workEmail: 'Work email',
};

/*
 * A server message, re-worded for an applicant.
 *
 * The API's validator writes its messages against the field NAME — "fullName
 * must be at least 2 characters" — which is right for a client reading a 422 and
 * wrong under an input labelled "Full name". The leading name is swapped for the
 * label on screen, and the sentence is given a full stop so it reads like every
 * other message under these fields.
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
 * A 422's details, turned into one message per field.
 *
 * `details` is an array only on a ValidationError; every other code puts
 * something else there entirely, so the shape is checked rather than assumed.
 * The server can report two failures for one field — too long AND not an email
 * — and the first is the one shown, because the second is usually a consequence
 * of it.
 */
function toFieldErrors(details) {
  if (!Array.isArray(details)) return {};

  const errors = {};
  for (const entry of details) {
    if (!entry || !isText(entry.field) || !isText(entry.message)) continue;
    if (entry.field in errors) continue;
    errors[entry.field] = humanize(entry.field, entry.message);
  }
  return errors;
}

/**
 * Whether an application can be delivered at all.
 *
 * False means this build has no API base URL configured, so there is nowhere to
 * post to. The form says so above the button rather than taking somebody through
 * six fields and failing at the end.
 *
 * @returns {boolean}
 */
export function canSubmitPartnerApplication() {
  return Boolean(BASE);
}

/**
 * Files one partner application.
 *
 * `values` is the form's own state, whose keys are already the API's field
 * names, so a 422's `details[].field` drops straight onto the right input with
 * no translation table in between.
 *
 * The two optional fields are sent as null when blank rather than "": the
 * columns are nullable and the server reads a blank as null anyway, but null
 * says so outright.
 *
 * @param {{fullName: string, company: string, role: string, background: string,
 *   mobile: string, workEmail: string}} values
 * @returns {Promise<{ok: true} | {ok: false, reason: string, message: string,
 *   fieldErrors: Record<string, string>}>}
 */
export async function submitPartnerApplication(values) {
  // Rule 1: the prerender pass must not reach the network. It has no applicant
  // and no filled-in form, so reaching here at all would be a mistake.
  if (typeof window === 'undefined') return failure('unconfigured');
  if (!BASE) return failure('unconfigured');

  const blankToNull = (value) => (isText(value) ? value.trim() : null);

  const payload = {
    fullName: values.fullName.trim(),
    company: values.company.trim(),
    role: blankToNull(values.role),
    background: blankToNull(values.background),
    mobile: values.mobile.trim(),
    workEmail: values.workEmail.trim(),
  };

  let res;
  try {
    res = await fetch(`${BASE}${APPLICATION_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Offline, CORS, DNS, an API that is not running. Unlike a read, this one
    // is reported rather than swallowed.
    return failure('offline');
  }

  /*
   * Success is taken from the status, not from the body. A 2xx from this
   * endpoint means the row committed; the body is a receipt
   * ({ received: true, id }) and never the stored row, so there is nothing in it
   * worth trusting over the status — and a receipt that failed to parse must not
   * turn a delivered application into an error the applicant would answer by
   * sending it a second time.
   */
  if (res.ok) return { ok: true };

  const errorBody = await res.json().catch(() => null);

  // 422 is the only answer that can name fields. A 404 means the route is not
  // there at all — an API older than this feature — which is not the applicant's
  // fault and not something another press would fix.
  if (res.status === 422) return failure('invalid', toFieldErrors(errorBody?.error?.details));
  if (res.status === 429) return failure('rate-limited');
  if (res.status === 404) return failure('unavailable');
  return failure('failed');
}
