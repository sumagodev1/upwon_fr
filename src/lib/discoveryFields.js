// The field rules behind the discovery-call form on /about.
//
// Each one mirrors a rule in the backend's
// modules/about-page/validators/discovery-calls.validator.ts, so a booking the
// server would refuse is caught under the input instead of costing the visitor a
// round trip. The server stays the authority — these only turn its 422s into
// inline feedback while typing.
//
// This is lib/enquiryFields.js's, lib/applicationFields.js's and
// lib/partnerFields.js's fourth sibling, written the same way for the same
// reasons, and the four are deliberately not merged: they validate four
// different forms against four different server validators, and folding them
// together would mean every future change to one had to be checked against the
// other three. What they DO share is the phone rule — which the backend itself
// shares, from core/utils/visitor-phone.ts — and the comment on PHONE_SHAPE
// below says what has to stay in step with what.
//
// Every bound here is written down in three places: this file, the server's
// validator, and the column widths in 028_about_discovery_calls.sql. Changing
// one means changing all three.
//
// Every field is keyed by the name the API uses — name, phone, business — and so
// is the form state in DiscoveryCallCta.jsx. That is deliberate: a 422's
// `details[].field` then drops straight onto the right input with no translation
// table in between, and there is no mapping to drift the next time a field is
// added.

// ── bounds (discovery-calls.validator.ts) ──────────────────────────────────

const NAME_MIN = 2;
const NAME_MAX = 120;
/** Optional on this form — the call can be booked without naming a business. */
const BUSINESS_MAX = 160;
/** VISITOR_PHONE_MAX, and the width of about_discovery_calls.phone. */
const PHONE_MAX = 40;

/**
 * PHONE_SHAPE and the digit count in the server's core/utils/visitor-phone.ts,
 * which all four of the site's public forms share.
 *
 * Deliberately loose: '+91 93568 98277', '(020) 4567-8900' and
 * '+1 555 010 0000 ext. 12' are all the same intent, and a rejection costs a
 * booking rather than catching a mistake. The leading `\(?` is not decoration —
 * without it an area code in brackets is refused, which is a visitor lost to a
 * typo nobody made.
 *
 * Keep this identical to the server's: stricter here blocks a number the API
 * would have taken, looser here promises one it will not.
 *
 * Required on this form — the whole point of it is that somebody calls back.
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
 * and spends one of the five bookings the network is allowed in fifteen minutes,
 * so a visitor who pasted their own name can run out of attempts with nothing to
 * act on.
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
 * fewer (currently M)" unreachable. The counter shows the overflow and the check
 * below blocks the submit on it.
 */
export const counterFor = (raw, max) => `${text(raw).length}/${max}`;

/** True once a capped field is over its cap, for the counter's own styling. */
export const isOver = (raw, max) => text(raw).length > max;

/**
 * One text field's check, worded the way the site's other three forms word their
 * own, so a "too long" reads the same on every form the site has.
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

/** Required here, like the partner form's mobile: a domain lead calls back. */
function checkPhone(raw) {
  const value = text(raw);

  if (!value) return 'Phone / WhatsApp is required.';
  if (CONTROL_CHARACTERS.test(value)) return controlCharacterError('Phone / WhatsApp');
  if (value.length > PHONE_MAX) {
    return `Phone / WhatsApp must be ${PHONE_MAX} characters or fewer (currently ${value.length}).`;
  }
  if (!PHONE_SHAPE.test(value)) {
    return 'Phone / WhatsApp must be digits, optionally starting with + and separated by spaces, dashes, dots or brackets.';
  }

  const digits = digitsIn(value);
  return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS
    ? null
    : `Phone / WhatsApp must contain between ${PHONE_MIN_DIGITS} and ${PHONE_MAX_DIGITS} digits (currently ${digits}).`;
}

/** The rules that are a plain capped string, by API field name. */
const RULES = {
  name: { label: 'Name', min: NAME_MIN, max: NAME_MAX, required: true },
  business: { label: 'Business', max: BUSINESS_MAX, required: false },
};

/** Each capped field's maximum, for the counters the form renders. */
export const MAX_FOR = {
  name: NAME_MAX,
  phone: PHONE_MAX,
  business: BUSINESS_MAX,
};

/**
 * Every field's current error, keyed by API field name.
 *
 * Recomputed on each render rather than stored, so the Book button and the
 * inline messages can never disagree about whether the form is ready.
 *
 * Nothing on this form is picked from a published list, so — unlike
 * checkEnquiry — this takes no copy to check against and cannot go stale under an
 * admin who republishes the page while somebody is typing.
 *
 * @param {{name: string, phone: string, business: string}} values
 * @returns {Record<string, string|null>} null per field means valid.
 */
export function checkDiscoveryCall(values) {
  return {
    name: checkText(RULES.name, values.name),
    phone: checkPhone(values.phone),
    business: checkText(RULES.business, values.business),
  };
}
