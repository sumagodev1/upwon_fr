// The field rules behind the /contact enquiry form.
//
// Each one mirrors a rule in the backend's
// modules/contact-page/validators/enquiries.validator.ts, so a submission the
// server would refuse is caught under the input instead of costing the visitor
// a round trip. The server stays the authority — these only turn its 422s into
// inline feedback while typing.
//
// Every bound below is written down in three places — this file, the server's
// validator, and the column widths in 018_contact_enquiries.sql — and the
// server's own comment says the same thing: changing one means changing all
// three. This copy is the one a visitor meets first.
//
// Every field is keyed by the name the API uses — fullName, workEmail,
// businessType — and so is the form state in ContactPage.jsx. That is
// deliberate: a 422's `details[].field` then drops straight onto the right
// input with no translation table in between, and there is no mapping to drift
// the next time a field is added.

// ── bounds (enquiries.validator.ts) ────────────────────────────────────────

const FULL_NAME_MIN = 2;
const FULL_NAME_MAX = 120;
/** Validator.requiredEmail's own cap — the longest address RFC 5321 allows. */
const EMAIL_MAX = 254;
const PHONE_MAX = 40;
const COMPANY_MIN = 2;
const COMPANY_MAX = 160;
const ROLE_MAX = 120;
const MESSAGE_MAX = 4000;

/**
 * EMAIL_PATTERN in the server's core/utils/validation.ts.
 *
 * Stricter than the browser's own `type="email"`, which accepts 'a@b': the
 * server insists on a dot and a two-character tail, so relying on the input
 * type alone lets an address through that the API then 422s — and on this form
 * that costs a real lead, because a bounced submit is the only delivery there
 * is.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * PHONE_SHAPE and the digit count in enquiries.validator.ts.
 *
 * Deliberately looser than the shape the admin panel enforces on the numbers
 * printed on the contact card. This one guards what a visitor types into a
 * marketing form, where '+91 93568 98277', '(020) 4567-8900' and
 * '+1 555 010 0000 ext. 12' are all the same intent, and a rejection costs a
 * lead rather than catching a mistake.
 *
 * The leading `\(?` matches the server's. Without it both sides refused
 * '(020) 4567-8900' - the example named right above - because they demanded a
 * digit in first position and an area code in brackets puts a parenthesis
 * there. Keep the two patterns identical: if this one is stricter the visitor
 * is blocked on a number the API would have taken, and if it is looser they
 * are told it is fine and then handed a 422 on submit.
 */
const PHONE_SHAPE = /^\(?\+?[0-9][0-9\s\-().+/]*$/;
const PHONE_MIN_DIGITS = 7;
/** E.164's ceiling; anything longer is not a dialable number. */
const PHONE_MAX_DIGITS = 18;

/** A published choice is a chip face — the same ceiling the form section uses. */
const CHOICE_MAX = 60;

const digitsIn = (value) => value.replace(/[^0-9]/g, '').length;

const text = (value) => (typeof value === 'string' ? value.trim() : '');

// ── the checks ─────────────────────────────────────────────────────────────

/**
 * The counter that belongs under a field with a maximum: "12/120".
 *
 * Every capped field here carries one instead of a `maxLength` attribute. The
 * browser truncates a paste at `maxLength` with no event and no message, which
 * silently loses the tail of a pasted paragraph and makes "must be N
 * characters or fewer (currently M)" unreachable. The counter shows the
 * overflow and the check below blocks the submit on it.
 */
export const counterFor = (raw, max) => `${text(raw).length}/${max}`;

/** True once a capped field is over its cap, for the counter's own styling. */
export const isOver = (raw, max) => text(raw).length > max;

/**
 * One text field's check, worded the way the admin panel words its own so a
 * "too long" reads the same on both sides of the product.
 *
 * @returns null when valid, otherwise the message to show under the input.
 */
function checkText(rule, raw) {
  const value = text(raw);

  if (!value) return rule.required ? `${rule.label} is required.` : null;
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
  if (value.length > EMAIL_MAX) {
    return `Work email must be ${EMAIL_MAX} characters or fewer (currently ${value.length}).`;
  }
  return EMAIL_PATTERN.test(value) ? null : 'Work email must be a valid email address.';
}

/**
 * The optional phone. Blank is a valid answer — the label does not mark it
 * required and the column is nullable — so only a typed value is checked.
 */
function checkPhone(raw) {
  const value = text(raw);
  if (!value) return null;

  if (value.length > PHONE_MAX) {
    return `Phone must be ${PHONE_MAX} characters or fewer (currently ${value.length}).`;
  }
  if (!PHONE_SHAPE.test(value)) {
    return 'Phone must be digits, optionally starting with + and separated by spaces, dashes, dots or brackets.';
  }

  const digits = digitsIn(value);
  return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS
    ? null
    : `Phone must contain between ${PHONE_MIN_DIGITS} and ${PHONE_MAX_DIGITS} digits (currently ${digits}).`;
}

/**
 * One of the chip rows — Validator.requiredEnum against the options the form
 * is publishing right now, which is exactly what the server checks.
 *
 * This can only fail when the published lists change under a half-filled form,
 * and ContactPage's reconcile effect already moves a stale selection onto a
 * live option. It is here because the server checks it, and because "nothing
 * selected" is reachable the moment a list arrives empty.
 */
function checkChoice(label, raw, options) {
  const value = text(raw);
  if (!value) return `${label} is required.`;
  return options.includes(value) ? null : `${label} must be one of the options above.`;
}

/**
 * The platform checkboxes. Zero is a legal answer, so this list is never
 * required — only bounded by how many the form currently offers, and by every
 * entry being one of them.
 */
function checkPlatforms(selected, options) {
  const chosen = Array.isArray(selected) ? selected : [];

  if (chosen.length > options.length) {
    return `Choose at most ${options.length} platforms (currently ${chosen.length}).`;
  }
  const stale = chosen.some(
    (entry) => typeof entry !== 'string' || entry.length > CHOICE_MAX || !options.includes(entry),
  );
  return stale ? 'Choose from the platforms listed above.' : null;
}

/** The rules that are a plain capped string, by API field name. */
const RULES = {
  fullName: { label: 'Full name', min: FULL_NAME_MIN, max: FULL_NAME_MAX, required: true },
  company: { label: 'Company', min: COMPANY_MIN, max: COMPANY_MAX, required: true },
  role: { label: 'Your role', max: ROLE_MAX, required: false },
  message: { label: 'What are you trying to solve?', max: MESSAGE_MAX, required: false },
};

/** Each capped field's maximum, for the counters the form renders. */
export const MAX_FOR = {
  fullName: FULL_NAME_MAX,
  workEmail: EMAIL_MAX,
  phone: PHONE_MAX,
  company: COMPANY_MAX,
  role: ROLE_MAX,
  message: MESSAGE_MAX,
};

/**
 * Every field's current error, keyed by API field name.
 *
 * Recomputed on each render rather than stored, so the submit button and the
 * inline messages can never disagree about whether the form is valid.
 *
 * `choices` is the published copy the form is rendering — the same three lists
 * the server loads from contact_form_section before validating — so the two
 * sides check the chips against the same options.
 *
 * @returns {Record<string, string|null>} null per field means valid.
 */
export function checkEnquiry(values, choices) {
  return {
    fullName: checkText(RULES.fullName, values.fullName),
    workEmail: checkWorkEmail(values.workEmail),
    phone: checkPhone(values.phone),
    company: checkText(RULES.company, values.company),
    role: checkText(RULES.role, values.role),
    businessType: checkChoice('Business type', values.businessType, choices.businessTypes),
    revenueRange: checkChoice('Revenue range', values.revenueRange, choices.revenueRanges),
    platforms: checkPlatforms(values.platforms, choices.platforms),
    message: checkText(RULES.message, values.message),
  };
}
