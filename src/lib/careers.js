// Careers page content, read from the Upwon admin API — and the one place an
// application is filed.
//
// The admin panel authors /careers' Open Roles list in its Career → Vacancy
// Management tab, and this module reads the published result back. Only ACTIVE
// vacancies are served, in the order the admin arranged them, and the public
// shape carries no authorship, timestamps or display order — see the public
// router in the backend's modules/careers/routes/vacancies.routes.ts.
//
// The same three rules as lib/contactPage.js hold for the read, for the same
// reasons — the page is prerendered:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      built-in ROLES list in CareersPage.jsx, so a build never depends on a
//      running API and the crawled markup is stable.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      built-in list. A CMS outage must not leave /careers claiming that
//      nobody is hiring.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set the
//      read resolves to null immediately and the page behaves exactly as it
//      did before this feature existed.
//
// submitCareerApplication, at the bottom, is a write, and it inverts rules 2
// and 3 exactly the way lib/contactPage.js's submitContactEnquiry does — see
// its own comment. It is the second and last write anywhere under the API's
// /public surface; scripts/route-audit.js in the backend allowlists precisely
// these two, so a third still fails that audit.
//
// One thing this module deliberately does NOT do is fetch a single vacancy.
// There is no public GET /vacancies/:id: everything the popup shows already
// arrives in the list, so opening a role costs no request and works offline
// once the page has loaded.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

// --- Open roles ------------------------------------------------------------

/*
 * A published list of short strings, cleaned for rendering: blanks dropped,
 * order kept, and everything else left exactly as it was authored.
 *
 * Nothing is deduped here. It used to be, for both lists, on the grounds that
 * each entry is its own React key — but that made the website disagree with
 * the two ends that decide what a list may contain. The server's textList keeps
 * duplicates, and the panel's REQUIREMENT_RULE allows them deliberately: these
 * are sentences, and in prose a repeated line can be meant. Collapsing them
 * here showed four bullets where five were authored, with nothing on screen to
 * say one had gone, and broke the one property the panel's duplicate check
 * exists to guarantee — that the count on the edit form and the count on the
 * live page are the same number. VacancyModal keys on the index instead.
 */
function toLines(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(isText).map((item) => item.trim());
}

/*
 * The skills list, which IS deduped — case-insensitively, and on purpose.
 *
 * A skill renders as its own chip, so two identical ones are two identical
 * chips and nothing tells them apart. The panel's SKILL_RULE refuses duplicates
 * for exactly that reason and compares them case-insensitively, so this matches
 * it: 'React' and 'react' are one chip here and are refused there. The first
 * spelling authored is the one kept.
 */
function toSkills(value) {
  const seen = new Set();
  return toLines(value).filter((skill) => {
    const key = skill.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/*
 * A vacancy is only renderable if it carries everything the row and the popup
 * print without a conditional: the id the apply form posts against, the two
 * lines of the row itself, and the four facts the popup's header states.
 *
 * `requirements` and `skills` are not on this list. The admin panel lets a
 * vacancy be saved with neither — they are lists that can legitimately be
 * empty — and a role with no bullet points is still a role worth advertising,
 * so those two sections simply disappear instead of taking the vacancy with
 * them.
 */
function isRenderableVacancy(vacancy) {
  return (
    vacancy &&
    isText(vacancy.id) &&
    isText(vacancy.title) &&
    isText(vacancy.department) &&
    isText(vacancy.location) &&
    isText(vacancy.workMode) &&
    isText(vacancy.experience) &&
    isText(vacancy.description)
  );
}

function toVacancy(vacancy) {
  return {
    id: vacancy.id,
    title: vacancy.title,
    department: vacancy.department,
    location: vacancy.location,
    workMode: vacancy.workMode,
    experience: vacancy.experience,
    description: vacancy.description,
    requirements: toLines(vacancy.requirements),
    skills: toSkills(vacancy.skills),
  };
}

/**
 * The published vacancies in display order — an ARRAY whenever the API
 * answered, which may legitimately be empty, and null only when it did not.
 *
 * That distinction is the whole point, and it used to be collapsed: an empty
 * result was returned as null, so "every role has been taken down" and "the API
 * is unreachable" were one answer, and both left the six built-in roles on the
 * page. Which contradicts the one rule this feature has — only published
 * vacancies appear on /careers — and left no action in the panel that could
 * empty the list: deactivating all six restored all six, as mailto: links
 * routing real applications to an inbox with no vacancy row behind them.
 *
 * So `[]` means the API answered and nothing is published, and the page says
 * so. `null` means unconfigured, offline, non-2xx or malformed — nothing was
 * learned, so the caller keeps whatever it has. Only that second case is the
 * "keep the built-in list" path lib/contactPage.js takes when a section 404s.
 *
 * @returns {Promise<Array<{id: string, title: string, department: string,
 *   location: string, workMode: string, experience: string,
 *   description: string, requirements: string[], skills: string[]}> | null>}
 */
export async function fetchCareerVacancies() {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  let body;
  try {
    const res = await fetch(`${BASE}/public/careers/vacancies`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    body = await res.json();
  } catch {
    // Offline, CORS, DNS, malformed JSON — all the same answer: keep the
    // built-in list. See rule 2.
    return null;
  }

  if (!body || body.success !== true || !Array.isArray(body.data)) return null;

  // A well-formed 200 is an answer even when it carries nothing, and an answer
  // of "nothing" is returned as the empty array it is.
  return body.data.filter(isRenderableVacancy).map(toVacancy);
}

// --- Filing an application -------------------------------------------------

/*
 * The write.
 *
 * Rule 1 above still holds: the prerender pass has no applicant and submits
 * nothing.
 *
 * Rules 2 and 3 are inverted here, deliberately, and for a sharper version of
 * the reason submitContactEnquiry gives. There is no mail transport behind
 * this endpoint, so the career_applications row IS the delivery. What this
 * replaced was a mailto: link — which is worse in most ways, but had one
 * virtue: it never lied. A mail client either opened or it did not, and the
 * candidate could see which. A submit that quietly resolved would show
 * somebody a "thank you" for a CV that reached nobody, and they would never
 * apply again.
 *
 * So: every failure is named and returned, the popup keeps every value that
 * was typed and the file that was picked, and Send can be pressed again.
 */

const APPLICATION_PATH = '/public/careers/applications';

/**
 * What the popup says when this build has no API base URL to post to.
 *
 * Exported because the form shows it up front, before the applicant fills
 * anything in, as well as on a submit that somehow got through — and those two
 * must not be able to drift apart.
 */
export const APPLICATION_NOT_CONNECTED =
  'Applications are not connected yet, so this form cannot be sent. Please email your CV to hello@upwon.in instead.';

/**
 * The line for the one refusal the applicant cannot fix by editing anything:
 * the role was taken down while they were filling the form in.
 *
 * The server checks that the target is an ACTIVE vacancy, and the page read
 * that list once on mount. When the two disagree, every press of Send returns
 * the identical 422 on a choice the applicant never made — so the page answers
 * it by re-reading the published list rather than by inviting another attempt.
 */
export const APPLICATION_VACANCY_CLOSED =
  'This role has just been taken down, so your application was not sent. Please pick another open role, or email your CV to hello@upwon.in.';

/**
 * What the applicant reads when a submit does not land: one line per reason
 * the API can refuse, in their terms rather than the protocol's.
 */
const FAILURE_MESSAGES = {
  unconfigured: APPLICATION_NOT_CONNECTED,
  offline:
    'We could not reach our servers, so your application was not sent. Check your connection and try again.',
  invalid: 'Please check the highlighted fields and send again.',
  'rate-limited':
    'Several applications have already been sent from this network. Please wait an hour and try again, or email your CV to hello@upwon.in.',
  unavailable:
    'Applications are temporarily unavailable, so yours was not sent. Please email your CV to hello@upwon.in.',
  failed:
    'Something went wrong at our end and your application was not sent. Please try again in a moment.',
  closed: APPLICATION_VACANCY_CLOSED,
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
 *
 * `resume` and `vacancyId` are deliberately absent. The server's messages for
 * the file are already written for the applicant — "Attach your resume",
 * "Resume must be at most 5 MB" — and prefixing them with a label would only
 * stutter; and a vacancyId error is never shown under an input at all, because
 * there is no input for it. See toFieldErrors below.
 */
const FIELD_LABELS = {
  fullName: 'Name',
  email: 'Email',
  phone: 'Phone',
  location: 'Location',
  experience: 'Experience',
  message: 'Message',
};

/*
 * A server message, re-worded for an applicant.
 *
 * The API's validator writes its messages against the field NAME — "fullName
 * must be at least 2 characters" — which is right for a client reading a 422
 * and wrong under an input labelled "Name". The leading name is swapped for
 * the label on screen.
 *
 * The second branch matters for the file: its messages already start with the
 * word the applicant reads above the control, so prefixing would produce
 * "Resume: Resume must be at most 5 MB". A message that already names its
 * field is left exactly as the server wrote it.
 */
function humanize(field, message) {
  const label = FIELD_LABELS[field];
  const lower = message.toLowerCase();
  let worded = message;

  if (label) {
    if (lower.startsWith(`${field.toLowerCase()} `)) {
      worded = `${label}${message.slice(field.length)}`;
    } else if (!lower.startsWith(label.toLowerCase())) {
      worded = `${label}: ${message}`;
    }
  }
  return /[.!?]$/.test(worded) ? worded : `${worded}.`;
}

/*
 * A 422's details, turned into one message per field.
 *
 * `details` is an array only on a ValidationError; every other code puts
 * something else there entirely, so the shape is checked rather than assumed.
 * The server can report two failures for one field and the first is the one
 * shown, because the second is usually a consequence of it.
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
 * False means this build has no API base URL configured, so there is nowhere
 * to post to. The popup says so above the form rather than taking somebody
 * through seven fields and a file picker and failing at the end.
 *
 * @returns {boolean}
 */
export function canSubmitApplication() {
  return Boolean(BASE);
}

/**
 * Files one application against one vacancy.
 *
 * `values` keys are already the API's field names, so a 422's `details[].field`
 * drops straight onto the right input with no translation table in between —
 * the same deliberate choice ContactPage's form state makes.
 *
 * The body is multipart/form-data because of the file, which means two things
 * worth remembering here: every value goes down the wire as a string (an
 * untouched message arrives as '' and the server reads that as null), and
 * `Content-Type` must NOT be set by hand — the browser has to write it itself
 * so it can append the multipart boundary.
 *
 * @param {{vacancyId: string, fullName: string, email: string, phone: string,
 *   location: string, experience: string, message: string, resume: File}} values
 * @returns {Promise<{ok: true} | {ok: false, reason: string, message: string,
 *   fieldErrors: Record<string, string>}>}
 */
export async function submitCareerApplication(values) {
  // Rule 1: the prerender pass must not reach the network. It has no applicant
  // and no filled-in form, so reaching here at all would be a mistake.
  if (typeof window === 'undefined') return failure('unconfigured');
  if (!BASE) return failure('unconfigured');
  if (!(values.resume instanceof File)) return failure('invalid', { resume: 'Attach your resume.' });

  const body = new FormData();
  body.append('vacancyId', values.vacancyId);
  body.append('fullName', values.fullName.trim());
  body.append('email', values.email.trim());
  body.append('phone', values.phone.trim());
  body.append('location', values.location.trim());
  body.append('experience', values.experience.trim());
  body.append('message', values.message.trim());
  // The part name is load-bearing: multer is configured as .single('resume'),
  // and any other name comes back as LIMIT_UNEXPECTED_FILE.
  body.append('resume', values.resume, values.resume.name);

  let res;
  try {
    res = await fetch(`${BASE}${APPLICATION_PATH}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    });
  } catch {
    // Offline, CORS, DNS, an API that is not running. Unlike a read, this one
    // is reported rather than swallowed.
    return failure('offline');
  }

  /*
   * Success is taken from the status, not from the body. A 2xx from this
   * endpoint means the row and the stored CV committed together; the body is a
   * receipt ({ received: true, id }) and never the stored row, so there is
   * nothing in it worth trusting over the status — and a receipt that failed
   * to parse must not turn a delivered application into an error the applicant
   * would answer by sending their CV a second time.
   */
  if (res.ok) return { ok: true };

  const errorBody = await res.json().catch(() => null);

  if (res.status === 422) {
    const fieldErrors = toFieldErrors(errorBody?.error?.details);

    /*
     * A 422 naming vacancyId is not a typo to correct. The role was ACTIVE
     * when this page read the list and is not now, and there is no input the
     * applicant could change to fix it — so it is reported as its own reason,
     * and the page answers it by re-reading what is published rather than by
     * asking for another attempt that would fail identically.
     */
    if ('vacancyId' in fieldErrors) {
      const rest = { ...fieldErrors };
      delete rest.vacancyId;
      return failure('closed', rest);
    }
    return failure('invalid', fieldErrors);
  }

  if (res.status === 429) return failure('rate-limited');
  if (res.status === 404) return failure('unavailable');
  return failure('failed');
}
