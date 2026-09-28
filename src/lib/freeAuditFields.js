// The field rules behind the audit request form on /free-audit.
//
// Each one mirrors a rule in the backend's
// modules/free-audit/validators/applications.validator.ts, so a request the
// server would refuse is caught under the input instead of costing the visitor a
// round trip. The server stays the authority — these only turn its 422s into
// inline feedback while typing.
//
// This is lib/discoveryFields.js's sibling (and lib/enquiryFields.js's,
// lib/applicationFields.js's and lib/partnerFields.js's), written the same way
// for the same reasons, and deliberately not merged with any of them: they
// validate different forms against different server validators, and folding
// them together would mean every future change to one had to be checked against
// the others. What they DO share is the phone rule — which the backend itself
// shares, from core/utils/visitor-phone.ts — and the comment on PHONE_SHAPE
// below says what has to stay in step with what.
//
// Every bound here is written down in three places: this file, the server's
// validator, and the column widths in 051_free_audit.sql. Changing one means
// changing all three.
//
// UNLIKE the discovery-call form, the form state in FreeAuditPage.jsx is NOT
// keyed by the API's field names. The page had its own state shape — name,
// company, role, mobile, email, revenue, pain — long before there was an API
// behind it, and two of those differ from the API's: the API calls `mobile`
// `phone` and `revenue` `revenueRange`. Every check here is keyed by the FORM's
// key, so an error lands under the input it is about; lib/freeAudit.js owns the
// one translation table between the two, both ways (the body it posts and the
// 422 field errors it maps back). That keeps the mapping in exactly one place.
//
// There are no character counters and no `maxLength` attributes on this form.
// The page's look is fixed, and a counter under every input is not part of it —
// so a capped field that runs over says so in the message under it instead, on
// blur or on the first press, and the check blocks the submit on it. A
// `maxLength` is still not used, for the reason the other forms give: the browser
// truncates a paste at `maxLength` with no event and no message, silently losing
// the tail of what was pasted.

// ── bounds (applications.validator.ts) ─────────────────────────────────────

const NAME_MIN = 2;
const NAME_MAX = 120;
const COMPANY_MIN = 2;
const COMPANY_MAX = 160;
/** Optional on this form — the page does not mark "Your role" required. */
const ROLE_MAX = 120;
/** Optional on this form — the page does not mark the pain box required. */
const PAIN_MAX = 2000;
/** VISITOR_PHONE_MAX, and the width of free_audit_applications.mobile. */
const MOBILE_MAX = 40;
/** Validator.requiredEmail's own cap — the longest address RFC 5321 allows. */
const EMAIL_MAX = 254;

/**
 * The four revenue chips, exactly as the page renders them and exactly as the
 * server's constant (and the column's CHECK) spells them — en dash, rupee sign,
 * the comma in "1,000" and all. The server compares the string byte for byte,
 * so the chips are drawn FROM this list rather than from a second copy of it
 * that could drift by one character.
 */
export const REVENUE_RANGES = Object.freeze([
  '< ₹25 Crore',
  '₹25–200 Crore',
  '₹200–1,000 Crore',
  '₹1,000 Crore+',
]);

/**
 * EMAIL_PATTERN in the server's core/utils/validation.ts.
 *
 * Stricter than the browser's own `type="email"`, which accepts 'a@b': the
 * server insists on a dot and a two-character tail, so relying on the input
 * type alone lets an address through that the API then 422s.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * PHONE_SHAPE and the digit count in the server's core/utils/visitor-phone.ts,
 * which every public form on the site shares.
 *
 * Deliberately loose: '+91 93568 98277', '(020) 4567-8900' and
 * '+1 555 010 0000 ext. 12' are all the same intent, and a rejection costs an
 * audit request rather than catching a mistake. The leading `\(?` is not
 * decoration — without it an area code in brackets is refused, which is a
 * visitor lost to a typo nobody made.
 *
 * Keep this identical to the server's: stricter here blocks a number the API
 * would have taken, looser here promises one it will not.
 *
 * Required on this form — a solution lead calls back to book the audit.
 */
const PHONE_SHAPE = /^\(?\+?[0-9][0-9\s\-().+/]*$/;
const PHONE_MIN_DIGITS = 7;
/** E.164's ceiling; anything longer is not a dialable number. */
const PHONE_MAX_DIGITS = 18;

const digitsIn = (value) => value.replace(/[^0-9]/g, '').length;

const text = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * CONTROL_CHARACTERS in the server's core/utils/validation.ts, which every
 * required/nullable string on the API is checked against — tab, newline and
 * carriage return allowed, the rest refused as INVALID_CHARACTERS.
 *
 * Mirrored here because this is the one server rule a person cannot see they
 * broke: a name pasted out of a PDF or a WhatsApp message can carry a U+000B
 * where a line break was, the field looks completely normal on screen, and
 * without this check the form reports no problem, posts, and comes back 422
 * naming a field whose visible text is fine. Each retry sends the identical body
 * and spends one of the requests the network is allowed, so a visitor who
 * pasted their own name can run out of attempts with nothing to act on.
 *
 * Newlines are allowed, so the pain box — a textarea — keeps its line breaks.
 */
const CONTROL_CHARACTERS = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;

/**
 * The message for a character there is nothing to see. It says what to do rather
 * than what is wrong, because the offending character is invisible in the input.
 */
const controlCharacterError = (label) =>
  `${label} contains an invisible character. Retype it rather than pasting it in.`;

// ── the checks ─────────────────────────────────────────────────────────────

/**
 * One text field's check, worded the way the site's other forms word their own,
 * so a "too long" reads the same on every form the site has.
 *
 * @returns null when valid, otherwise the message to show under the input.
 */
function checkText(rule, raw) {
  const value = text(raw);

  if (!value) return rule.required ? `${rule.label} is required.` : null;
  // Before the length checks, as the server checks it before its own: a value
  // that is refused for a character nobody can see must say so here, where the
  // field is still on screen.
  if (CONTROL_CHARACTERS.test(value)) return controlCharacterError(rule.label);
  if (rule.min !== undefined && value.length < rule.min) {
    return `${rule.label} must be at least ${rule.min} characters.`;
  }
  if (value.length > rule.max) {
    return `${rule.label} must be ${rule.max} characters or fewer (currently ${value.length}).`;
  }
  return null;
}

/** Validator.requiredEmail: required, capped, and the pattern above. */
function checkEmail(raw) {
  const value = text(raw);

  if (!value) return 'Work email is required.';
  if (CONTROL_CHARACTERS.test(value)) return controlCharacterError('Work email');
  if (value.length > EMAIL_MAX) {
    return `Work email must be ${EMAIL_MAX} characters or fewer (currently ${value.length}).`;
  }
  return EMAIL_PATTERN.test(value) ? null : 'Work email must be a valid email address.';
}

/** Required here, like the discovery call's phone: a solution lead calls back. */
function checkMobile(raw) {
  const value = text(raw);

  if (!value) return 'Mobile is required.';
  if (CONTROL_CHARACTERS.test(value)) return controlCharacterError('Mobile');
  if (value.length > MOBILE_MAX) {
    return `Mobile must be ${MOBILE_MAX} characters or fewer (currently ${value.length}).`;
  }
  if (!PHONE_SHAPE.test(value)) {
    return 'Mobile must be digits, optionally starting with + and separated by spaces, dashes, dots or brackets.';
  }

  const digits = digitsIn(value);
  return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS
    ? null
    : `Mobile must contain between ${PHONE_MIN_DIGITS} and ${PHONE_MAX_DIGITS} digits (currently ${digits}).`;
}

/*
 * The revenue chip. The page preselects one and a chip cannot be switched off,
 * so a visitor cannot reach the "required" branch from the page — it is here
 * because the server requires the field, and a state that ever arrived without
 * one (or with a string the chips do not spell) must be stopped here rather than
 * posted and refused.
 */
function checkRevenue(raw) {
  if (!text(raw)) return 'Revenue range is required.';
  return REVENUE_RANGES.includes(raw) ? null : 'Revenue range must be one of the options shown.';
}

/** The rules that are a plain capped string, by form key. */
const RULES = {
  name: { label: 'Full name', min: NAME_MIN, max: NAME_MAX, required: true },
  company: { label: 'Company', min: COMPANY_MIN, max: COMPANY_MAX, required: true },
  role: { label: 'Your role', max: ROLE_MAX, required: false },
  pain: { label: 'Biggest operational pain', max: PAIN_MAX, required: false },
};

/**
 * Every field's current error, keyed by the FORM's key (see the note at the top
 * of this file — `mobile` and `revenue`, not `phone` and `revenueRange`).
 *
 * Recomputed on each render rather than stored, so the submit button and the
 * inline messages can never disagree about whether the form is ready.
 *
 * Nothing on this form is picked from a published list — the four revenue chips
 * are fixed, in this file — so this takes no copy to check against and cannot go
 * stale under an admin who republishes the page while somebody is typing.
 *
 * @param {{name: string, company: string, role: string, mobile: string,
 *   email: string, revenue: string, pain: string}} values
 * @returns {Record<string, string|null>} null per field means valid.
 */
export function checkFreeAuditApplication(values) {
  return {
    name: checkText(RULES.name, values.name),
    company: checkText(RULES.company, values.company),
    role: checkText(RULES.role, values.role),
    mobile: checkMobile(values.mobile),
    email: checkEmail(values.email),
    revenue: checkRevenue(values.revenue),
    pain: checkText(RULES.pain, values.pain),
  };
}
