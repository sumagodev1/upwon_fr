// The field rules behind the Apply form on /partners.
//
// Each one mirrors a rule in the backend's
// modules/partner-program/validators/applications.validator.ts, so a submission
// the server would refuse is caught under the input instead of costing the
// applicant a round trip. The server stays the authority — these only turn its
// 422s into inline feedback while typing.
//
// This is lib/enquiryFields.js's and lib/applicationFields.js's third sibling,
// written the same way for the same reasons, and the three are deliberately not
// merged: they validate three different forms against three different server
// validators, and folding them together would mean every future change to one
// had to be checked against the other two. What they DO share is the phone
// rule — which the backend itself shares, from core/utils/visitor-phone.ts —
// and the comment on PHONE_SHAPE below says what has to stay in step with what.
//
// Every bound here is written down in three places: this file, the server's
// validator, and the column widths in 022_partner_program_applications.sql.
// Changing one means changing all three.
//
// Every field is keyed by the name the API uses — fullName, not name;
// workEmail, not email — and so is the form state in PartnersPage.jsx. That is
// deliberate: a 422's `details[].field` then drops straight onto the right
// input with no translation table in between, and there is no mapping to drift
// the next time a field is added.

// ── bounds (applications.validator.ts) ─────────────────────────────────────

const FULL_NAME_MIN = 2;
const FULL_NAME_MAX = 120;
const COMPANY_MIN = 2;
const COMPANY_MAX = 160;
const ROLE_MAX = 120;
const BACKGROUND_MAX = 160;
/** VISITOR_PHONE_MAX, and the width of partner_program_applications.mobile. */
const MOBILE_MAX = 40;
/** Validator.requiredEmail's own cap — the longest address RFC 5321 allows. */
const EMAIL_MAX = 254;

/**
 * EMAIL_PATTERN in the server's core/utils/validation.ts.
 *
 * Stricter than the browser's own `type="email"`, which accepts 'a@b': the
 * server insists on a dot and a two-character tail, so relying on the input
 * type alone lets an address through that the API then 422s — and here that
 * costs a partner, because the row IS the delivery.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * PHONE_SHAPE and the digit count in the server's core/utils/visitor-phone.ts,
 * which all three of the site's public forms share.
 *
 * Deliberately loose: '+91 93568 98277', '(020) 4567-8900' and
 * '+1 555 010 0000 ext. 12' are all the same intent, and a rejection costs a
 * partner rather than catching a mistake. The leading `\(?` is not decoration —
 * without it an area code in brackets is refused, which is an applicant lost to
 * a typo nobody made.
 *
 * Keep this identical to the server's: stricter here blocks a number the API
 * would have taken, looser here promises one it will not.
 *
 * Required on this form — a partnerships lead calls back.
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
 * broke: a name pasted out of a PDF or a Word document can carry a U+000B where
 * a line break was, the field looks completely normal on screen, and without
 * this check the form reports no problem, posts, and comes back 422 naming a
 * field whose visible text is fine. Each retry sends the identical body and
 * spends one of the five submissions the network is allowed, so a partner who
 * pasted their own name can run out of attempts with nothing to act on.
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
 * The counter that belongs under a field with a maximum: "12/120".
 *
 * Every capped field here carries one instead of a `maxLength` attribute. The
 * browser truncates a paste at `maxLength` with no event and no message, which
 * silently loses the tail of a pasted value and makes "must be N characters or
 * fewer (currently M)" unreachable. The counter shows the overflow and the
 * check below blocks the submit on it.
 */
export const counterFor = (raw, max) => `${text(raw).length}/${max}`;

/** True once a capped field is over its cap, for the counter's own styling. */
export const isOver = (raw, max) => text(raw).length > max;

/**
 * One text field's check, worded the way lib/enquiryFields.js and
 * lib/applicationFields.js word their own, so a "too long" reads the same on
 * every form the site has.
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
function checkWorkEmail(raw) {
  const value = text(raw);

  if (!value) return 'Work email is required.';
  if (CONTROL_CHARACTERS.test(value)) return controlCharacterError('Work email');
  if (value.length > EMAIL_MAX) {
    return `Work email must be ${EMAIL_MAX} characters or fewer (currently ${value.length}).`;
  }
  return EMAIL_PATTERN.test(value) ? null : 'Work email must be a valid email address.';
}

/** Required here, unlike the enquiry form's phone: a partnerships lead calls back. */
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

/** The rules that are a plain capped string, by API field name. */
const RULES = {
  fullName: { label: 'Full name', min: FULL_NAME_MIN, max: FULL_NAME_MAX, required: true },
  company: { label: 'Company', min: COMPANY_MIN, max: COMPANY_MAX, required: true },
  role: { label: 'Your role', max: ROLE_MAX, required: false },
  background: { label: 'Background', max: BACKGROUND_MAX, required: false },
};

/** Each capped field's maximum, for the counters the form renders. */
export const MAX_FOR = {
  fullName: FULL_NAME_MAX,
  company: COMPANY_MAX,
  role: ROLE_MAX,
  background: BACKGROUND_MAX,
  mobile: MOBILE_MAX,
  workEmail: EMAIL_MAX,
};

/**
 * Every field's current error, keyed by API field name.
 *
 * Recomputed on each render rather than stored, so the Apply button and the
 * inline messages can never disagree about whether the form is ready.
 *
 * Nothing on this form is picked from a published list, so — unlike
 * checkEnquiry — this takes no copy to check against and cannot go stale under
 * an admin who republishes the page while somebody is typing.
 *
 * @param {{fullName: string, company: string, role: string, background: string,
 *   mobile: string, workEmail: string}} values
 * @returns {Record<string, string|null>} null per field means valid.
 */
export function checkPartnerApplication(values) {
  return {
    fullName: checkText(RULES.fullName, values.fullName),
    company: checkText(RULES.company, values.company),
    role: checkText(RULES.role, values.role),
    background: checkText(RULES.background, values.background),
    mobile: checkMobile(values.mobile),
    workEmail: checkWorkEmail(values.workEmail),
  };
}
