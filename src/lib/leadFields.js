// The field rules behind the site's eight generic lead-capture forms:
// the brochure modal, the footer and Resources newsletter boxes, the
// LeadHookPreview box, and the Demo, Proposal, Newsletter and ROI-calculator
// pages.
//
// WHY THIS ONE IS SHARED, WHEN THE OTHER FIVE ARE NOT
//
// lib/enquiryFields.js, lib/applicationFields.js, lib/partnerFields.js,
// lib/discoveryFields.js and lib/freeAuditFields.js are deliberately kept apart
// from each other: each mirrors a different backend validator, so folding them
// together would mean every future change to one had to be checked against the
// other four.
//
// That reasoning does not apply here. Every form in this file posts through
// lib/leads.js's submitLead(), which is a single environment-driven webhook
// (VITE_LEAD_ENDPOINT) with no per-form server validator behind it — or, for
// the Proposal, Newsletter and LeadHookPreview forms, does not post at all yet.
// There is no set of server rules for these to drift against, so one module is
// the honest shape: one rule per concept, changed in one place.
//
// THE MOBILE RULE IS NOT THE ONE THE OTHER FIVE USE
//
// The five validators above share a deliberately loose phone rule — 7 to 18
// digits, international shapes allowed — because it mirrors the server's
// core/utils/visitor-phone.ts and being stricter there would block a number the
// API accepts.
//
// MOBILE_SHAPE below is the strict Indian-mobile rule instead: exactly ten
// digits, starting 6-9. That is a deliberate divergence, chosen because these
// forms answer to no server validator, so the stricter rule costs nothing and
// catches the mistyped number that a callback is lost to. Do NOT copy this rule
// into the other five — it would reject numbers their endpoints accept.

// ── bounds ─────────────────────────────────────────────────────────────────

const NAME_MIN = 2;
const NAME_MAX = 120;
const COMPANY_MIN = 2;
const COMPANY_MAX = 160;
/** The practical ceiling on an address, from RFC 5321's 254-octet path limit. */
const EMAIL_MAX = 254;
const MOBILE_MAX = 20;
const NOTES_MAX = 2000;
const ROLE_MAX = 120;

/**
 * Exactly ten digits, first digit 6-9 — the Indian mobile numbering plan.
 *
 * Tested against the digits left after PREFIX_NOISE below is stripped, not
 * against the raw value, so the separators people actually type keep working.
 */
const MOBILE_SHAPE = /^[6-9][0-9]{9}$/;

/**
 * The bits of a written-out Indian mobile that are not part of the ten digits:
 * a +91 or 91 country code, or the trunk 0 people still prefix out of habit.
 *
 * Stripped before the ten-digit check rather than rejected, because
 * '+91 93568 98277', '093568 98277' and '9356898277' are the same number and
 * refusing the first two is a lead lost to a formatting preference. What is NOT
 * forgiven is a letter or a wrong digit count — those are real mistakes.
 */
const PREFIX_NOISE = /^(?:\+?91|0)/;

/** Separators that are allowed to appear between the digits. */
const MOBILE_SEPARATORS = /[\s\-().]/g;

/**
 * Email, checked for the shapes a person actually gets wrong: a missing @, a
 * missing domain, a missing dot in the domain, whitespace in the middle, two @s.
 *
 * Deliberately not RFC 5322 — that grammar accepts quoted local parts and
 * bracketed IP literals nobody types into a website form, and a regex for it is
 * long enough that nobody can tell what it refuses. This is the practical rule:
 * something, one @, a dotted domain, no spaces.
 */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

/**
 * CONTROL_CHARACTERS as lib/discoveryFields.js explains it: tab, newline and
 * carriage return allowed, the rest refused.
 *
 * Kept here for the same reason it is kept there — a value pasted out of a PDF
 * or a WhatsApp message can carry a U+000B that is invisible on screen, so
 * without this check the field looks fine and the failure is unexplainable.
 */
const CONTROL_CHARACTERS = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;

const controlCharacterError = (label) =>
  `${label} contains an invisible character. Retype it rather than pasting it in.`;

const text = (value) => (typeof value === 'string' ? value.trim() : '');

// ── the shared helpers, worded as the other five word theirs ────────────────

/**
 * The counter that belongs under a capped field: "12/120".
 *
 * Used instead of a `maxLength` attribute for the reason the other validators
 * give: the browser truncates a paste at maxLength with no event and no
 * message, silently losing the tail and making "must be N characters or fewer"
 * unreachable.
 */
export const counterFor = (raw, max) => `${text(raw).length}/${max}`;

/** True once a capped field is over its cap, for the counter's own styling. */
export const isOver = (raw, max) => text(raw).length > max;

/** One capped text field's check. @returns null when valid. */
function checkText(rule, raw) {
  const value = text(raw);

  if (!value) return rule.required ? `${rule.label} is required.` : null;
  if (CONTROL_CHARACTERS.test(value)) return controlCharacterError(rule.label);
  if (rule.min !== undefined && value.length < rule.min) {
    return `${rule.label} must be at least ${rule.min} characters.`;
  }
  if (value.length > rule.max) {
    return `${rule.label} must be ${rule.max} characters or fewer (currently ${value.length}).`;
  }
  return null;
}

/** @returns null when valid, otherwise the message to show under the input. */
function checkEmail(raw, { required = true, label = 'Work email' } = {}) {
  const value = text(raw);

  if (!value) return required ? `${label} is required.` : null;
  if (CONTROL_CHARACTERS.test(value)) return controlCharacterError(label);
  if (value.length > EMAIL_MAX) {
    return `${label} must be ${EMAIL_MAX} characters or fewer (currently ${value.length}).`;
  }
  if (!EMAIL_SHAPE.test(value)) {
    return `Enter a valid email address, like name@company.com.`;
  }
  return null;
}

/**
 * The strict ten-digit mobile check. See MOBILE_SHAPE and PREFIX_NOISE above
 * for why the prefixes are forgiven and the digit count is not.
 *
 * @returns null when valid, otherwise the message to show under the input.
 */
function checkMobile(raw, { required = true, label = 'Mobile' } = {}) {
  const value = text(raw);

  if (!value) return required ? `${label} is required.` : null;
  if (CONTROL_CHARACTERS.test(value)) return controlCharacterError(label);
  if (value.length > MOBILE_MAX) {
    return `${label} must be ${MOBILE_MAX} characters or fewer (currently ${value.length}).`;
  }

  // Separators come out first so that '93568 98277' and '93568-98277' reach the
  // same check as '9356898277'.
  const compact = value.replace(MOBILE_SEPARATORS, '');

  // A leading + is the country-code marker and is allowed; a + anywhere else is
  // not, and falls through to the digits-only message below.
  const rest = compact.replace(/^\+/, '');

  // A letter is reported as a letter. Falling through to the digit-count message
  // instead would tell somebody who typed 'O' for '0' that their ten-digit
  // number is the wrong length, which it is not.
  if (!/^[0-9]+$/.test(rest)) {
    return `${label} must contain digits only — no letters or symbols.`;
  }

  /*
    The country code or trunk 0 comes off only when doing so actually leaves ten
    digits. Stripping unconditionally would misreport what the visitor typed:
    '0356898277' is ten characters, and reporting it as "currently 9" — the count
    after a stripped 0 — describes a value they never entered. Leaving it whole
    lets the 6-9 check below name the real problem instead.
  */
  const trimmed = rest.replace(PREFIX_NOISE, '');
  const digits = rest.length === 10 ? rest : trimmed.length === 10 ? trimmed : rest;

  if (digits.length !== 10) {
    return `${label} must be exactly 10 digits (currently ${digits.length}).`;
  }
  if (!MOBILE_SHAPE.test(digits)) {
    return `${label} must be a valid 10-digit mobile number starting with 6, 7, 8 or 9.`;
  }
  return null;
}

// ── the rules, by the field name each form keys its state with ──────────────

const RULES = {
  name: { label: 'Full name', min: NAME_MIN, max: NAME_MAX, required: true },
  company: { label: 'Company', min: COMPANY_MIN, max: COMPANY_MAX, required: true },
  optionalCompany: { label: 'Company', min: COMPANY_MIN, max: COMPANY_MAX, required: false },
  role: { label: 'Role', max: ROLE_MAX, required: false },
  notes: { label: 'Notes', max: NOTES_MAX, required: false },
  challenge: { label: 'Challenge', max: NOTES_MAX, required: false },
};

/** Each capped field's maximum, for the counters the forms render. */
export const MAX_FOR = {
  name: NAME_MAX,
  company: COMPANY_MAX,
  email: EMAIL_MAX,
  mobile: MOBILE_MAX,
  notes: NOTES_MAX,
  challenge: NOTES_MAX,
  role: ROLE_MAX,
};

// ── one check per form ──────────────────────────────────────────────────────

/**
 * The email-only boxes: the footer, the Resources page, the Newsletter page and
 * LeadHookPreview all collect exactly one address.
 *
 * @returns {{email: string|null}} null means valid.
 */
export function checkSubscribe(values) {
  return { email: checkEmail(values.email, { label: 'Email' }) };
}

/**
 * The brochure modal: name, work email, company.
 *
 * Company is optional here — the modal's own label says "Company (optional)",
 * and the rule has to agree with the label or the asterisk is a lie.
 */
export function checkBrochureRequest(values) {
  return {
    name: checkText(RULES.name, values.name),
    email: checkEmail(values.email),
    company: checkText(RULES.optionalCompany, values.company),
  };
}

/**
 * The /demo form. The industry select is always set from a fixed list and the
 * `challenge` free-text is optional, so only the four contact fields can fail.
 *
 * Keyed `challenge`, not `notes`, because that is what DemoPage.jsx keys its
 * state with — the point of matching is that a message lands on the right input
 * with no translation table in between.
 */
export function checkDemoRequest(values) {
  return {
    name: checkText(RULES.name, values.name),
    company: checkText(RULES.company, values.company),
    mobile: checkMobile(values.mobile),
    email: checkEmail(values.email),
    challenge: checkText(RULES.challenge, values.challenge),
  };
}

/**
 * The /proposal form. Same four required fields as /demo, plus an optional role
 * and the free-text scope notes. The revenue, timeline and platform choices are
 * all picked from fixed lists, so they cannot be wrong.
 */
export function checkProposalRequest(values) {
  return {
    name: checkText(RULES.name, values.name),
    role: checkText(RULES.role, values.role),
    company: checkText(RULES.company, values.company),
    mobile: checkMobile(values.mobile),
    email: checkEmail(values.email),
    notes: checkText(RULES.notes, values.notes),
  };
}

/** The ROI calculator's "email me this report" capture: name, email, mobile. */
export function checkRoiReport(values) {
  return {
    name: checkText(RULES.name, values.name),
    email: checkEmail(values.email),
    mobile: checkMobile(values.mobile),
  };
}
