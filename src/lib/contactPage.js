// Contact page content, read from the Upwon admin API.
//
// The admin panel authors /contact section by section — Hero Section, Enquiry
// Form, Contact Details — and this module reads the published result back.
// Each section is a singleton, and the public shape carries no ids, timestamps
// or authorship — see the public routers in the backend's
// modules/contact-page/routes/.
//
// The same three rules as lib/insiderPage.js hold for every fetch here, for
// the same reasons — the page is prerendered and its hero is the LCP element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      sections' own built-in content, so a build never depends on a running
//      API and the crawled markup is stable.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      built-in content. A CMS outage must not blank the contact page.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, every
//      fetch resolves to null immediately and the site behaves exactly as
//      before — the same convention lib/leads.js uses for its endpoint.
//
// Every section here answers one of two ways: published content, or null for
// "keep whatever you have". None of them can be published as switched off, so
// there is no third answer of the kind the Insider feature section has.
//
// What each section owns is what a visitor can actually read. The enquiry
// form's inputs, its field labels, its submit button and the success buttons
// are behaviour, not content, and stay in ContactPage.jsx. The page's closing
// CTA is not authored at all — it is static, and reads data/company.js.
//
// One thing here is not a read: submitContactEnquiry, at the bottom of the
// file, posts what a visitor filled in. It is the only write this site makes,
// and it holds to rule 1 and breaks rules 2 and 3 on purpose — see its own
// comment for why a failed submit must never be swallowed the way a failed
// read is.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const textOr = (value, fallback) => (isText(value) ? value : fallback);

// Site-relative ("/images/contact_us_desktop.webp") or absolute http(s),
// nothing else. The API enforces the same rule on write; checking again here
// keeps a `javascript:` URL out of an attribute even if a bad row ever got
// past it. A leading "/\" is refused along with "//" because browsers read
// both as protocol-relative.
function safeUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (url.startsWith('/')) return /^\/[/\\]/.test(url) ? null : url;
  return /^https?:\/\//i.test(url) ? url : null;
}

/*
 * A published list of choices, cleaned for rendering: blanks dropped,
 * duplicates dropped. Each option is its own React key and its own value in
 * the form state, so two identical chips could not be told apart — one would
 * light the other.
 */
function toOptions(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  for (const item of value) {
    if (isText(item)) seen.add(item.trim());
  }
  return [...seen];
}

/*
 * One GET against the public Contact router.
 *
 * Resolves to `{ data }` on a successful envelope and null on every failure —
 * including a 404, which is what the API answers while a section has never
 * been saved. That is the same answer as "unreachable" on purpose: in both
 * cases the site has nothing published to show and keeps its own copy.
 */
async function getPublished(path) {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/contact-page${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const body = await res.json();
    if (!body || body.success !== true || !('data' in body)) return null;
    return { data: body.data };
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // built-in content. See rule 2.
    return null;
  }
}

// --- Headings --------------------------------------------------------------

// The hero's headline and the form section's heading are authored with the
// home hero's markers — a newline for a line break, `**like this**` for the
// orange accent — and arrive already parsed into lines of `{ text, accent }`
// parts, so no component here has to know the marker grammar. The raw
// `heading` string the API also sends is deliberately not carried: rendering
// it would put literal asterisks on the page.
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

// --- Hero Section ----------------------------------------------------------

/**
 * The published contact hero, or null to mean "keep whatever you have".
 *
 * `imageAlt` is in the API's shape but is deliberately not carried: both hero
 * crops are decorative backdrops (`alt=""` + `aria-hidden`) with the real copy
 * laid over them as text.
 *
 * @returns {Promise<{headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   subtext: string, image: string|null, mobileImage: string|null} | null>}
 */
export async function fetchContactHero() {
  const published = await getPublished('/hero-section');
  const hero = published?.data;
  if (!hero || !isRenderableHeading(hero.headingLines) || !isText(hero.subtext)) {
    return null;
  }

  return {
    headingLines: toHeadingLines(hero.headingLines),
    subtext: hero.subtext,
    // Null means no artwork of its own; the hero keeps its built-in crop.
    image: safeUrl(hero.image),
    // Null means no phone-specific crop — see ContactHeroSection for what it
    // then serves to phones.
    mobileImage: safeUrl(hero.mobileImage),
  };
}

// --- Enquiry Form ----------------------------------------------------------

/*
 * The copy and the choices around the form. The heading, the success copy and
 * the three lists are what the section cannot render without: an empty chip
 * row is a control the visitor cannot use, so a section missing one counts as
 * "nothing published" and the built-in copy stands whole rather than in part.
 *
 * The eyebrow and the footnote are required by the API too, but they are the
 * two lines the page can simply do without, so a row that somehow arrives with
 * one blank renders without it instead of throwing the section away.
 */
function isRenderableForm(form) {
  return (
    form &&
    isRenderableHeading(form.headingLines) &&
    isText(form.successHeading) &&
    isText(form.successBody) &&
    toOptions(form.businessTypes).length > 0 &&
    toOptions(form.revenueRanges).length > 0 &&
    toOptions(form.platforms).length > 0
  );
}

/**
 * The published enquiry-form copy, or null to mean "keep whatever you have".
 *
 * The three lists are guaranteed non-empty, which is what lets the form
 * reconcile a stale selection against them — see ContactPage.
 *
 * @returns {Promise<{eyebrow: string|null,
 *   headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   businessTypes: string[], revenueRanges: string[], platforms: string[],
 *   footnote: string|null, successHeading: string,
 *   successBody: string} | null>}
 */
export async function fetchContactForm() {
  const published = await getPublished('/form-section');
  if (!published || !isRenderableForm(published.data)) return null;

  const form = published.data;
  return {
    eyebrow: textOr(form.eyebrow, null),
    headingLines: toHeadingLines(form.headingLines),
    businessTypes: toOptions(form.businessTypes),
    revenueRanges: toOptions(form.revenueRanges),
    platforms: toOptions(form.platforms),
    footnote: textOr(form.footnote, null),
    successHeading: form.successHeading,
    successBody: form.successBody,
  };
}

// --- Contact Details -------------------------------------------------------

// An office is a place and the one line under it; both are shown, so neither
// can be blank.
function isRenderableOffice(office) {
  return office && isText(office.name) && isText(office.detail);
}

/*
 * The two side cards. Both card titles, at least one office, and the email and
 * WhatsApp lines have to be there — those two are links the card exists to
 * offer. The phone line is the one row that simply disappears when it arrives
 * blank.
 */
function isRenderableDetails(details) {
  return (
    details &&
    isText(details.officesTitle) &&
    isText(details.directTitle) &&
    isText(details.email) &&
    isText(details.whatsapp) &&
    Array.isArray(details.offices) &&
    details.offices.some(isRenderableOffice)
  );
}

/**
 * The published contact details, or null to mean "keep whatever you have".
 *
 * `whatsapp` comes through as it was authored ("+91 93568 98277" or
 * "+919356898277"); the caller strips it to digits for the wa.me link.
 *
 * @returns {Promise<{officesTitle: string,
 *   offices: Array<{name: string, detail: string}>,
 *   directTitle: string, email: string, phone: string|null,
 *   whatsapp: string} | null>}
 */
export async function fetchContactDetails() {
  const published = await getPublished('/contact-details');
  if (!published || !isRenderableDetails(published.data)) return null;

  const details = published.data;
  return {
    officesTitle: details.officesTitle,
    offices: details.offices
      .filter(isRenderableOffice)
      .map((office) => ({ name: office.name, detail: office.detail })),
    directTitle: details.directTitle,
    email: details.email,
    phone: textOr(details.phone, null),
    whatsapp: details.whatsapp,
  };
}

// --- Enquiry submission ----------------------------------------------------

/*
 * The one write on this site, and the one write anywhere under the API's
 * /public surface (the backend's enquiries.routes.ts explains why it is
 * allowed to exist, and scripts/route-audit.js allowlists exactly this route
 * so a second public write still fails the audit).
 *
 * Rule 1 above still holds: the prerender pass has no visitor and submits
 * nothing.
 *
 * Rules 2 and 3 are inverted here, deliberately:
 *
 *   Rule 2, "never throw, null means keep what you have", is right for a read
 *   — a CMS outage costs the visitor nothing, because the built-in copy is
 *   already on the page. A failed submit costs them everything: there is no
 *   mail transport behind this endpoint, so the row IS the delivery, and a
 *   submit that quietly resolved would drop a lead and tell the visitor it had
 *   arrived. So every failure is named and returned, the page keeps every
 *   value that was typed, and the visitor can press Send again.
 *
 *   Rule 3, "never configured is a valid state", is right for a read for that
 *   same reason and wrong here for that same reason. With no VITE_API_BASE_URL
 *   there is nowhere to deliver to at all, which is the 'unconfigured' answer
 *   below — the page says so rather than showing the success panel.
 *
 * Nothing in here resolves as a success unless the API accepted the row.
 */

const ENQUIRY_PATH = '/public/contact-page/enquiries';

/**
 * What the page says when this build has no API base URL to post to.
 *
 * Exported because the form shows it up front, before a visitor fills anything
 * in, as well as here on a submit that somehow got through — and those two
 * must not be able to drift apart.
 */
export const ENQUIRY_NOT_CONNECTED =
  'This form is not connected yet, so your message cannot be sent. Please email or WhatsApp us using the details beside this form.';

/**
 * The two lines for a submit refused because the choices on screen are not the
 * choices the server is validating against — an admin republished the enquiry
 * form while this page was open, or the form copy never loaded and the
 * built-in list is showing.
 *
 * Exported for the same reason as the line above: the page owns the recovery
 * (it refetches the published copy), this file owns what the visitor reads.
 *
 * The distinction matters. ENQUIRY_OPTIONS_CHANGED follows a successful
 * refetch, so the chips on screen are now ones the server accepts and pressing
 * Send again is worth doing. ENQUIRY_OPTIONS_STALE follows a refetch that also
 * failed, where every chip the visitor can click would be refused and only a
 * reload can help — the one thing they must not be told is to try again.
 */
export const ENQUIRY_OPTIONS_CHANGED =
  'The choices on this form were just updated, so your message was not sent. Please check your selections and send again.';

export const ENQUIRY_OPTIONS_STALE =
  'This form is out of date, so your message was not sent. Please refresh the page and try again.';

/**
 * What the visitor reads when a submit does not land: one line per reason the
 * API can refuse, in the visitor's terms rather than the protocol's.
 */
const FAILURE_MESSAGES = {
  unconfigured: ENQUIRY_NOT_CONNECTED,
  offline:
    'We could not reach our servers, so your message was not sent. Check your connection and try again.',
  invalid: 'Please check the highlighted fields and send again.',
  'rate-limited':
    'Several messages have already been sent from this network. Please wait a few minutes and try again.',
  unavailable:
    'The form is temporarily unavailable, so your message was not sent. Please email or WhatsApp us using the details beside this form.',
  captcha:
    'The robot check could not be confirmed, so your message was not sent. Please tick the box again and send.',
  failed:
    'Something went wrong at our end and your message was not sent. Please try again in a moment.',
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
  workEmail: 'Work email',
  phone: 'Phone',
  company: 'Company',
  role: 'Your role',
  businessType: 'Business type',
  revenueRange: 'Revenue range',
  platforms: 'UpWon platforms of interest',
  message: 'What are you trying to solve?',
};

/*
 * A server message, re-worded for a visitor.
 *
 * The API's validator writes its messages against the field NAME — "fullName
 * must be at least 2 characters" — which is the right thing for an API client
 * reading a 422 and the wrong thing to print under an input on a marketing
 * page. The leading name is swapped for the label the visitor can actually see
 * above the box, and the sentence is given a full stop so it reads like every
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
 * something else there entirely (the rate limiter's carries a stack trace in
 * development), so the shape is checked rather than assumed. The server can
 * report two failures for one field — too long AND not an email — and the
 * first is the one shown, because the second is usually a consequence of it.
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
 * Whether an enquiry can be delivered at all.
 *
 * False means this build has no API base URL configured, so there is nowhere
 * to post to. The form says so up front rather than taking a visitor through
 * nine fields and failing at the end.
 *
 * @returns {boolean}
 */
export function canSubmitEnquiry() {
  return Boolean(BASE);
}

/**
 * Files one enquiry.
 *
 * `values` is the form's own state, whose keys are already the API's field
 * names. A blank optional field is sent as null rather than "": the column is
 * nullable and the server reads a blank as null anyway, but null says so
 * outright.
 *
 * @param {{fullName: string, workEmail: string, phone: string, company: string,
 *   role: string, businessType: string, revenueRange: string,
 *   platforms: string[], message: string}} values
 * @returns {Promise<{ok: true} | {ok: false, reason: string, message: string,
 *   fieldErrors: Record<string, string>}>}
 */
export async function submitContactEnquiry(values, recaptchaToken) {
  // Rule 1: the prerender pass must not reach the network. It has no visitor
  // and no filled-in form, so reaching here at all would be a mistake.
  if (typeof window === 'undefined') return failure('unconfigured');
  if (!BASE) return failure('unconfigured');

  const blankToNull = (value) => (isText(value) ? value.trim() : null);

  const payload = {
    fullName: values.fullName.trim(),
    workEmail: values.workEmail.trim(),
    phone: blankToNull(values.phone),
    company: values.company.trim(),
    role: blankToNull(values.role),
    businessType: values.businessType,
    revenueRange: values.revenueRange,
    platforms: [...values.platforms],
    message: blankToNull(values.message),
    /*
     * The reCAPTCHA token, when the widget produced one. The server strips the
     * field before its own validator runs, so it never reaches the stored row
     * - and it is omitted rather than sent as null, because an absent field
     * and a null one mean the same thing there, and omitting it keeps the
     * payload of a build with no site key identical to what it was before.
     */
    ...(recaptchaToken ? { recaptchaToken } : {}),
  };

  let res;
  try {
    res = await fetch(`${BASE}${ENQUIRY_PATH}`, {
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
   * ({ received: true, id }) and never the stored row, so there is nothing in
   * it worth trusting over the status — and a receipt that failed to parse
   * must not turn a delivered enquiry into an error the visitor would answer
   * by sending it a second time.
   */
  if (res.ok) return { ok: true };

  const errorBody = await res.json().catch(() => null);

  // 422 is the only answer that can name fields. A 404 means the form section
  // has never been published, so the server cannot vouch for any of the
  // options the visitor was just offered — unavailable, not their fault.
  if (res.status === 422) return failure('invalid', toFieldErrors(errorBody?.error?.details));
  // A 400 from this endpoint is the captcha and nothing else: every other
  // bad-input answer it gives is a 422 with named fields.
  if (res.status === 400 && errorBody?.error?.code === 'RECAPTCHA_FAILED') {
    return failure('captcha');
  }
  if (res.status === 429) return failure('rate-limited');
  if (res.status === 404) return failure('unavailable');
  return failure('failed');
}
