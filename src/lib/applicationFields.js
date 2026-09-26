// The field rules behind the Apply Now form in the /careers vacancy popup.
//
// Each one mirrors a rule in the backend's
// modules/careers/validators/applications.validator.ts — and, for the file,
// modules/careers/utils/resume-asset.ts — so a submission the server would
// refuse is caught under the control instead of costing the applicant a round
// trip and a 5 MB upload. The server stays the authority; these only turn its
// 422s into inline feedback while typing.
//
// This is lib/enquiryFields.js's twin, written the same way for the same
// reasons, and the two are deliberately not merged: they validate two
// different forms against two different server validators, and folding them
// together would mean every future change to one had to be checked against the
// other. What they DO share is the phone rule — which the backend itself
// shares, from core/utils/visitor-phone.ts — and the comment on PHONE_SHAPE
// below says what has to stay in step with what.
//
// Every bound here is written down in three places: this file, the server's
// validator, and the column widths in 020_career_applications.sql. Changing
// one means changing all three.
//
// Every field is keyed by the name the API uses — fullName, not name — and so
// is the form state in the popup. That is deliberate: a 422's `details[].field`
// then drops straight onto the right control with nothing in between to drift.

// ── bounds (applications.validator.ts) ─────────────────────────────────────

const FULL_NAME_MIN = 2;
const FULL_NAME_MAX = 120;
/** Validator.requiredEmail's own cap — the longest address RFC 5321 allows. */
const EMAIL_MAX = 254;
/** VISITOR_PHONE_MAX, and the width of career_applications.phone. */
const PHONE_MAX = 40;
const LOCATION_MIN = 2;
const LOCATION_MAX = 120;
const EXPERIENCE_MIN = 1;
const EXPERIENCE_MAX = 60;
const MESSAGE_MAX = 4000;

/**
 * EMAIL_PATTERN in the server's core/utils/validation.ts.
 *
 * Stricter than the browser's own `type="email"`, which accepts 'a@b': the
 * server insists on a dot and a two-character tail, so relying on the input
 * type alone lets an address through that the API then 422s — and here that
 * costs a candidate, because the row IS the delivery.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * PHONE_SHAPE and the digit count in the server's core/utils/visitor-phone.ts,
 * which the Contact enquiry form's validator shares.
 *
 * Deliberately loose: '+91 93568 98277', '(020) 4567-8900' and
 * '+1 555 010 0000 ext. 12' are all the same intent, and a rejection costs a
 * candidate rather than catching a mistake. The leading `\(?` is not
 * decoration — without it an area code in brackets is refused, which is a
 * candidate lost to a typo nobody made.
 *
 * Keep this identical to the server's: stricter here blocks a number the API
 * would have taken, looser here promises one it will not.
 *
 * Unlike the enquiry form's, this field is REQUIRED — a recruiter calls back.
 */
const PHONE_SHAPE = /^\(?\+?[0-9][0-9\s\-().+/]*$/;
const PHONE_MIN_DIGITS = 7;
/** E.164's ceiling; anything longer is not a dialable number. */
const PHONE_MAX_DIGITS = 18;

// ── the resume (resume-asset.ts) ───────────────────────────────────────────

/**
 * The three formats a CV arrives in, keyed by EXTENSION with the media type
 * each is properly announced as — the server's ALLOWED_RESUME_EXTENSIONS,
 * checked the same way, in the same order, for the same reason.
 *
 * The extension decides; the declared type may contradict it but may not be
 * missing. Both files used to look the declared type up FIRST and refuse
 * anything that missed, which rejected genuine CVs in numbers: a browser reads
 * File.type off the Windows registry, and Windows ships no registration for
 * .doc or .docx unless Office installed one. A CV exported from Google Docs and
 * picked on a machine running LibreOffice arrives as application/octet-stream
 * or application/x-zip-compressed, and the form said it was the wrong kind of
 * file — under an input whose own picker had just accepted it, with no way
 * round it, for a file that was never wrong.
 *
 * Checking here at all is still not duplicated effort: it is the only way to be
 * in step, so the applicant is never told after a 5 MB upload what could have
 * been said before it. Which means these two files change together, always.
 */
const RESUME_EXTENSIONS = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

/**
 * Declared types that say nothing about the format, so the extension stands —
 * the server's UNINFORMATIVE_MIME_TYPES. The two ZIP spellings are here because
 * a .docx IS a zip archive, and a machine that knows the container but not the
 * Office format inside it says exactly that.
 */
const UNINFORMATIVE_MIME_TYPES = new Set([
  '',
  'application/octet-stream',
  'application/zip',
  'application/x-zip-compressed',
]);

/** RESUME_ACCEPTED_LABEL on the server — what the form tells the applicant. */
export const RESUME_ACCEPTED_LABEL = 'PDF, DOC or DOCX';

/** RESUME_MAX_BYTES on the server: 5 MB. */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_MAX_MB = RESUME_MAX_BYTES / (1024 * 1024);

/**
 * The file picker's filter.
 *
 * Both the extensions and the media types are listed, because the two are
 * honoured by different platforms — and neither is a check: a file picker's
 * filter is a convenience the applicant can switch off in the dialog. What
 * decides is checkResume below, and after it the server.
 */
export const RESUME_ACCEPT = [
  ...Object.keys(RESUME_EXTENSIONS),
  ...Object.values(RESUME_EXTENSIONS),
].join(',');

/** "1.4 MB", for the chip that names the picked file. */
export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const extensionOf = (name) => {
  const dot = String(name ?? '').lastIndexOf('.');
  return dot === -1 ? '' : String(name).slice(dot).toLowerCase();
};

/**
 * The picked file, checked against every rule the server applies before a
 * single byte is uploaded.
 *
 * Worded to match resume-asset.ts's own messages, so a file that somehow got
 * past this and was refused server-side does not suddenly read differently.
 *
 * @returns null when the file is usable, otherwise the message to show.
 */
export function checkResume(file) {
  if (!file) return 'Attach your resume.';
  if (file.size === 0) return 'The file is empty.';
  if (file.size > RESUME_MAX_BYTES) return `Resume must be at most ${RESUME_MAX_MB} MB.`;

  // The extension decides — see RESUME_EXTENSIONS above for why round this way.
  const extension = extensionOf(file.name);
  const expectedMimeType = RESUME_EXTENSIONS[extension];
  if (!expectedMimeType) {
    return `Resume must be a ${RESUME_ACCEPTED_LABEL} file — its name ends in ${extension || 'nothing'}.`;
  }

  // A declared type that CONTRADICTS the extension is still refused; one that
  // is merely uninformative is not held against the file.
  const declaredType = String(file.type ?? '').toLowerCase().split(';')[0].trim();
  if (declaredType !== expectedMimeType && !UNINFORMATIVE_MIME_TYPES.has(declaredType)) {
    return `Resume must be a ${RESUME_ACCEPTED_LABEL} file.`;
  }
  return null;
}

// ── the text fields ────────────────────────────────────────────────────────

const digitsIn = (value) => value.replace(/[^0-9]/g, '').length;

const text = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * The counter that belongs under a field with a maximum: "12/120".
 *
 * Every capped field here carries one instead of a `maxLength` attribute. The
 * browser truncates a paste at `maxLength` with no event and no message, which
 * silently loses the tail of a pasted covering letter and makes "must be N
 * characters or fewer (currently M)" unreachable. The counter shows the
 * overflow and the check below blocks the submit on it.
 */
export const counterFor = (raw, max) => `${text(raw).length}/${max}`;

/** True once a capped field is over its cap, for the counter's own styling. */
export const isOver = (raw, max) => text(raw).length > max;

/**
 * One text field's check, worded the way lib/enquiryFields.js words its own so
 * a "too long" reads the same on both of the site's forms.
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
function checkEmail(raw) {
  const value = text(raw);

  if (!value) return 'Email is required.';
  if (value.length > EMAIL_MAX) {
    return `Email must be ${EMAIL_MAX} characters or fewer (currently ${value.length}).`;
  }
  return EMAIL_PATTERN.test(value) ? null : 'Email must be a valid email address.';
}

/** Required here, unlike the enquiry form's: a recruiter calls back. */
function checkPhone(raw) {
  const value = text(raw);

  if (!value) return 'Phone is required.';
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

/** The rules that are a plain capped string, by API field name. */
const RULES = {
  fullName: { label: 'Name', min: FULL_NAME_MIN, max: FULL_NAME_MAX, required: true },
  location: { label: 'Location', min: LOCATION_MIN, max: LOCATION_MAX, required: true },
  experience: { label: 'Experience', min: EXPERIENCE_MIN, max: EXPERIENCE_MAX, required: true },
  message: { label: 'Message', max: MESSAGE_MAX, required: false },
};

/** Each capped field's maximum, for the counters the form renders. */
export const MAX_FOR = {
  fullName: FULL_NAME_MAX,
  email: EMAIL_MAX,
  phone: PHONE_MAX,
  location: LOCATION_MAX,
  experience: EXPERIENCE_MAX,
  message: MESSAGE_MAX,
};

/**
 * Every field's current error, keyed by API field name.
 *
 * Recomputed on each render rather than stored, so the Send button and the
 * inline messages can never disagree about whether the form is ready.
 *
 * @param {{fullName: string, email: string, phone: string, location: string,
 *   experience: string, message: string, resume: File|null}} values
 * @returns {Record<string, string|null>} null per field means valid.
 */
export function checkApplication(values) {
  return {
    fullName: checkText(RULES.fullName, values.fullName),
    email: checkEmail(values.email),
    phone: checkPhone(values.phone),
    location: checkText(RULES.location, values.location),
    experience: checkText(RULES.experience, values.experience),
    resume: checkResume(values.resume),
    message: checkText(RULES.message, values.message),
  };
}
