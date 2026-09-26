// About page content, read from the Upwon admin API — and the one place a
// discovery call is booked.
//
// The admin panel authors /about section by section, in its About Us tab strip:
// Hero Section, Founder Note Section, People Section (Team), Number Section and
// CTA Section. Each of the five is a singleton; People and Number each carry an
// ordered child list (the people cards, the stat cards) embedded in their own
// read. The public shapes carry no ids, timestamps, authorship or display
// order — see the public routers in the backend's modules/about-page/routes/.
//
// What is NOT authored is everything else on the page, and deliberately: the
// timeline, the Nashik pride band, the four operating principles under the
// team, the client-logo strip under the numbers, the Byte Elephants facts and
// the global-ambition block are static artwork in AboutPage.jsx and its
// sections, and the backend has no table for them. The heroes' and the CTA's
// buttons are behaviour, not content, and stay in code the same way.
//
// The same three rules as lib/contactPage.js and lib/partnerProgram.js hold for
// every read here, for the same reasons — the page is prerendered and its
// headline is the LCP element:
//
//   1. Never run during the SSG build. The prerendered HTML always ships each
//      section's own built-in content, so a build never depends on a running
//      API and the crawled markup is stable.
//   2. Never throw. Every failure path returns null, and the caller keeps its
//      built-in content. A CMS outage must not blank the About page.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, every
//      fetch resolves to null immediately and the page behaves exactly as it
//      did before this feature existed.
//
// A 404 is folded into that same null. The API answers 404 while a section has
// never been authored, and "nothing has been published" and "nothing could be
// reached" are one answer here on purpose: in both cases the site has nothing
// published to show and keeps its own copy. None of the five sections can be
// published as switched off, so there is no third answer of the kind
// lib/careers.js needs for an empty vacancy list.
//
// The two child lists answer for themselves, separately from the copy above
// them — and an empty list has two meanings the API separates for us with one
// boolean, because the panel CAN empty it: the last person can be switched to
// Inactive and the last person can be deleted, and so can the last stat card.
//
//   hasMembers / hasStats false  the section holds no rows AT ALL — none added
//                                yet, or every one deleted — so the CMS has
//                                nothing authored here and the caller keeps its
//                                built-in people or numbers, exactly as it does
//                                for a section whose copy has never been saved.
//                                The panel says this outright while the table is
//                                empty, so it is a visible state and not a
//                                surprise.
//   hasMembers / hasStats true   the list has been authored, and what it holds is
//   with an empty array          the answer — the grid renders empty, because
//                                every row was switched to Inactive. Putting the
//                                built-in rows back here would republish exactly
//                                what somebody just took down, which on the
//                                numbers band means restoring claims about the
//                                business that were removed on purpose.
//
// submitDiscoveryCall, at the bottom, is a write, and it inverts rules 2 and 3
// exactly the way submitContactEnquiry and submitPartnerApplication do — see its
// own comment. It is the fourth and last write anywhere under the API's /public
// surface; scripts/route-audit.js in the backend allowlists precisely these
// four, so a fifth still fails that audit.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const textOr = (value, fallback) => (isText(value) ? value : fallback);

// Site-relative ("/images/about_cta_desktop.webp") or absolute http(s) — the
// hero's backdrops are remote (Unsplash) today, so both forms are in use on
// this page. The API enforces the same rule on write; checking again here keeps
// a `javascript:` URL out of an attribute even if a bad row ever got past it. A
// leading "/\" is refused along with "//" because browsers read both as
// protocol-relative.
function safeUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (url.startsWith('/')) return /^\/[/\\]/.test(url) ? null : url;
  return /^https?:\/\//i.test(url) ? url : null;
}

/*
 * One GET against the public About router.
 *
 * Resolves to `{ data }` on a successful envelope and null on every failure —
 * including a 404, which is what the API answers while a section has never been
 * saved. That is the same answer as "unreachable" on purpose: in both cases the
 * site has nothing published to show and keeps its own copy.
 *
 * The five fetches below are independent, so the page runs them together
 * (Promise.all in AboutPage.jsx, one useEffect per section elsewhere); nothing
 * here holds state, so the order they land in does not matter.
 */
async function getPublished(path) {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  if (!BASE) return null;

  try {
    const res = await fetch(`${BASE}/public/about-page${path}`, {
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

// The hero, People, Number and CTA headings are authored with the home hero's
// two markers — a newline for a line break, `**like this**` for the orange
// accent — and arrive already parsed into lines of `{ text, accent }` parts, so
// no component here has to know the marker grammar. The raw `heading` string the
// API also sends is deliberately not carried: rendering it would put literal
// asterisks on the page.
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

/*
 * One backdrop of the rotation, in the keys HeroSlider already renders.
 *
 * The API sends each entry as `{ image, mobileImage }` — one photograph and its
 * optional portrait crop for phones — and returns `mobileImage: null` for every
 * backdrop nobody has cropped, which is all of them until somebody uploads one.
 * Null means HeroSlider serves `bg` to every viewport and omits the <picture>
 * source entirely, exactly as this hero rendered before the second slot existed.
 *
 * A bare string is accepted as well, and only for one reason: that is the shape
 * this endpoint returned before the crop existed, and an API older than this
 * release must not cost the page its photographs. It reads as a backdrop with no
 * crop of its own.
 *
 * `bg` null is the entry being unusable rather than the entry having no picture —
 * an upload deleted out from under the row, or a URL that is not site-relative or
 * http(s) — and the caller drops those; see `fetchAboutHero`. A crop with no
 * photograph behind it is refused on write by the server, so it cannot arrive,
 * and it would be dropped here in any case: the crop stands in for `bg` on narrow
 * screens rather than replacing it.
 */
function toBackdrop(entry) {
  if (typeof entry === 'string') return { bg: safeUrl(entry), mobileBg: null };
  if (!entry || typeof entry !== 'object') return { bg: null, mobileBg: null };
  return { bg: safeUrl(entry.image), mobileBg: safeUrl(entry.mobileImage) };
}

/**
 * The published About hero, or null to mean "keep whatever you have".
 *
 * One set of copy over an ordered list of backdrops, which is what the section
 * is in the panel: the heading, the subtext and the eyebrow are a singleton, and
 * `backdrops` is the rotation behind them. The hero the page ships today is a
 * three-slide slider with a headline per slide, so publishing this section fixes
 * the copy and leaves only the photographs rotating — the caller says so where
 * it maps them.
 *
 * `backdrops` is cleaned rather than trusted: a URL the API could not resolve
 * (an upload deleted out from under the row) is dropped there rather than sent
 * as null, and anything that is not a site-relative or http(s) URL is dropped
 * here. An empty array is a legitimate published state — an author who removed
 * every backdrop — and means the hero renders on its own navy ground.
 *
 * Each entry comes back as `{ bg, mobileBg }` — the photograph and its optional
 * phone crop, already in HeroSlider's own key names. An entry with no usable `bg`
 * is dropped whole, including a crop that arrived with it: the crop is what a
 * narrow screen sees INSTEAD of `bg`, so it has nothing to stand in for on its
 * own, and a slide that showed a photograph on phones and blank navy on laptops
 * would be worse than no slide. `mobileBg` null is the ordinary state and means
 * `bg` serves every viewport.
 *
 * `imageAlt` is in the API's shape but is deliberately not carried: HeroSlider
 * renders `bg` as a decorative backdrop (`alt=""` + `aria-hidden`) with the real
 * copy laid over it as text, so a description would be announced nowhere.
 *
 * `eyebrow` comes back as null when it somehow arrives blank, which the caller
 * answers with its own built-in eyebrow. The server requires it, so this is a
 * guard rather than a state anyone can reach from the panel.
 *
 * @returns {Promise<{eyebrow: string|null,
 *   headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   subtext: string,
 *   backdrops: Array<{bg: string, mobileBg: string|null}>} | null>}
 */
export async function fetchAboutHero() {
  const published = await getPublished('/hero-section');
  if (!published) return null;

  const hero = published.data;
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
    backdrops: Array.isArray(hero.backdrops)
      ? hero.backdrops.map(toBackdrop).filter((backdrop) => backdrop.bg)
      : [],
  };
}

// --- Founder Note Section --------------------------------------------------

/**
 * The published founder note, or null to mean "keep whatever you have".
 *
 * Every field the card and the note render is required by the server, so a row
 * missing any of them is not a section with a gap in it — it is a row this
 * release did not write — and the built-in note stands whole.
 *
 * `photo` is the one optional field: null means no photograph has been uploaded
 * and the card keeps the monogram it draws today. `photoAlt` is carried because
 * this image is a portrait of a named person rather than decoration — it is the
 * one image on this page that is not `aria-hidden`.
 *
 * No `initials` field is returned and none is invented here: the monogram is the
 * card's own decision, and the rule it uses is documented where it is drawn.
 *
 * @returns {Promise<{founderName: string, founderRole: string,
 *   companyLine: string, quote: string, body: string, photo: string|null,
 *   photoAlt: string|null} | null>}
 */
export async function fetchAboutFounderNote() {
  const published = await getPublished('/founder-note');
  if (!published) return null;

  const note = published.data;
  if (
    !note ||
    !isText(note.founderName) ||
    !isText(note.founderRole) ||
    !isText(note.companyLine) ||
    !isText(note.quote) ||
    !isText(note.body)
  ) {
    return null;
  }

  const photo = safeUrl(note.photo);

  return {
    founderName: note.founderName,
    founderRole: note.founderRole,
    companyLine: note.companyLine,
    quote: note.quote,
    body: note.body,
    photo,
    // An alt text with no image behind it would end up on the monogram, which
    // is decorative; the API already sends null in that case, and this makes
    // the two impossible to disagree about.
    photoAlt: photo ? textOr(note.photoAlt, `${note.founderName}, ${note.founderRole}`) : null,
  };
}

// --- People Section (Team) -------------------------------------------------

// A person is a name, the role under it and the grey meta line under that; all
// three are on the card, so none of them can be blank. The photograph is
// optional — without one the card draws the monogram it draws today.
function isRenderableMember(member) {
  return member && isText(member.name) && isText(member.role) && isText(member.meta);
}

function toMember(member) {
  const photo = safeUrl(member.photo);
  return {
    name: member.name,
    role: member.role,
    meta: member.meta,
    photo,
    photoAlt: photo ? textOr(member.photoAlt, `${member.name}, ${member.role}`) : null,
  };
}

/**
 * The published People section — its copy and its people — or null to mean
 * "keep whatever you have".
 *
 * `members` is the ACTIVE people in the order the panel arranged them, and it
 * can legitimately come back empty. `hasMembers` is what says why: false means no
 * person has ever been added and the caller keeps its built-in six, true with an
 * empty array means every person was unpublished or deleted and the grid renders
 * empty. See the note at the top of this file.
 *
 * `hasMembers` is read defensively — an API older than that field sends undefined,
 * and the honest reading of "I cannot tell" is the old behaviour, so it falls back
 * to whether the array has anything in it.
 *
 * Nothing here carries the accent colour each card is tinted with, the monogram,
 * or the bio, focus chips and LinkedIn link the "Learn more" popup shows. The
 * first two are derived in the component, and the last three are not in the CMS
 * at all — the caller says what it does about that.
 *
 * @returns {Promise<{eyebrow: string|null,
 *   headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   subtext: string, hasMembers: boolean,
 *   members: Array<{name: string, role: string, meta: string,
 *     photo: string|null, photoAlt: string|null}>} | null>}
 */
export async function fetchAboutTeamSection() {
  const published = await getPublished('/team-section');
  if (!published) return null;

  const section = published.data;
  if (
    !section ||
    !isRenderableHeading(section.headingLines) ||
    !isText(section.subtext)
  ) {
    return null;
  }

  const members = Array.isArray(section.members)
    ? section.members.filter(isRenderableMember).map(toMember)
    : [];

  return {
    eyebrow: textOr(section.eyebrow, null),
    headingLines: toHeadingLines(section.headingLines),
    subtext: section.subtext,
    members,
    hasMembers:
      typeof section.hasMembers === 'boolean' ? section.hasMembers : members.length > 0,
  };
}

// --- Number Section --------------------------------------------------------

// A stat is the number, the label under it and the line under that. All three
// are on the card, so none of them can be blank.
function isRenderableStat(stat) {
  return stat && isText(stat.value) && isText(stat.label) && isText(stat.description);
}

/**
 * The published Number section — its copy and its stat cards — or null to mean
 * "keep whatever you have".
 *
 * `value` arrives as the string it was authored as — '150+', '7', '98%' — and is
 * carried that way rather than split here. The card animates a count-up, so the
 * caller is where the number and its suffix are separated, and it is the caller
 * that has to decide what to do with a value it cannot count to.
 *
 * The icon on each card is not in this shape: the component keys it off the
 * card's position, exactly as it does today.
 *
 * `hasStats` answers for an empty `stats` the way `hasMembers` does for an empty
 * `members` — false means no card has ever been added and the caller keeps its
 * built-in four, true means the band was emptied on purpose and renders empty. It
 * matters most here: the built-in four are claims about the business, and a number
 * removed because it is no longer defensible must not come back.
 *
 * @returns {Promise<{eyebrow: string|null,
 *   headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   subtext: string, hasStats: boolean,
 *   stats: Array<{value: string, label: string, description: string}>} | null>}
 */
export async function fetchAboutNumbersSection() {
  const published = await getPublished('/numbers-section');
  if (!published) return null;

  const section = published.data;
  if (
    !section ||
    !isRenderableHeading(section.headingLines) ||
    !isText(section.subtext)
  ) {
    return null;
  }

  const stats = Array.isArray(section.stats)
    ? section.stats.filter(isRenderableStat).map((stat) => ({
        value: stat.value,
        label: stat.label,
        description: stat.description,
      }))
    : [];

  return {
    eyebrow: textOr(section.eyebrow, null),
    headingLines: toHeadingLines(section.headingLines),
    subtext: section.subtext,
    stats,
    // Undefined on an API older than the field: "I cannot tell" reads as the old
    // behaviour, which is what an empty list used to mean.
    hasStats: typeof section.hasStats === 'boolean' ? section.hasStats : stats.length > 0,
  };
}

// --- CTA Section -----------------------------------------------------------

/**
 * The published closing CTA, or null to mean "keep whatever you have".
 *
 * There is no eyebrow on this banner and never has been, so there is none in the
 * shape.
 *
 * TWO images, and they are two compositions rather than two sizes of one file:
 * `image` is the wide artwork the banner runs at and above 1024px, `mobileImage`
 * the portrait scene it runs below that, with the copy laid in the clear space
 * the scene leaves. The caller keeps its own built-in artwork for each of them
 * and says what it does with a missing one.
 *
 * The two are INDEPENDENT here, unlike the hero's `{ image, mobileImage }` pair
 * where a crop arriving without a photograph behind it is dropped. There the
 * crop stands IN FOR the photograph on narrow screens, so it has nothing to
 * stand in for on its own; here each width has its own artwork and its own
 * built-in fallback, so a banner whose phone crop is published first renders
 * exactly as intended. The server allows the same pair for the same reason.
 *
 * `mobileImage` null is the ordinary state and means nothing has been published
 * for the narrow layout — every banner reads that way until somebody uploads a
 * crop. It does NOT mean "use `image` there": the wide file at that width is a
 * centre sliver of itself, so the caller keeps its own portrait artwork instead.
 *
 * `imageAlt` is not carried: the artwork is a decorative backdrop (`alt=""` +
 * `aria-hidden`) with the heading and subtext laid over it as text.
 *
 * @returns {Promise<{headingLines: Array<Array<{text: string, accent: boolean}>>,
 *   subtext: string, image: string|null, mobileImage: string|null} | null>}
 */
export async function fetchAboutCta() {
  const published = await getPublished('/cta-section');
  if (!published) return null;

  const cta = published.data;
  if (!cta || !isRenderableHeading(cta.headingLines) || !isText(cta.subtext)) {
    return null;
  }

  return {
    headingLines: toHeadingLines(cta.headingLines),
    subtext: cta.subtext,
    image: safeUrl(cta.image),
    mobileImage: safeUrl(cta.mobileImage),
  };
}

// --- Booking a discovery call ----------------------------------------------

/*
 * The write, and the only one this page makes.
 *
 * Rule 1 above still holds: the prerender pass has no visitor and books nothing.
 *
 * Rules 2 and 3 are inverted here, deliberately, and for the same reason
 * submitContactEnquiry and submitPartnerApplication give. There is no mail
 * transport behind this endpoint, so the about_discovery_calls row IS the
 * delivery.
 *
 * What this replaced was worse than an unhandled failure. The form called
 * submitLead('discovery_call', …), which fires an analytics event and then posts
 * to VITE_LEAD_ENDPOINT — and resolves `{ ok: true }` when that endpoint is not
 * configured, which it is not. Every discovery call this page has ever taken was
 * congratulated on screen and thrown away one frame later. A submit that quietly
 * resolved would be the same lie with better manners.
 *
 * So: every failure is named and returned, the form keeps every value that was
 * typed, and the button can be pressed again.
 *
 * submitLead is not called alongside this on purpose. Two delivery paths for one
 * form means a booking can land in one place and not the other with nobody able
 * to tell, and a visitor answering a failed POST by pressing Book again would
 * file a second copy down the path that had already succeeded. The row is the
 * delivery; the funnel event the old call fired is kept by the caller, which
 * fires it once the API has accepted the row.
 */

const DISCOVERY_CALL_PATH = '/public/about-page/discovery-calls';

/**
 * What the page says when this build has no API base URL to post to.
 *
 * Exported because the form shows it up front, before the visitor fills anything
 * in, as well as on a submit that somehow got through — and those two must not
 * be able to drift apart.
 */
export const DISCOVERY_CALL_NOT_CONNECTED =
  'This form is not connected yet, so your request cannot be sent. Please WhatsApp us on the button to the left, or email hello@upwon.in.';

/**
 * What the visitor reads when a submit does not land: one line per reason the
 * API can refuse, in their terms rather than the protocol's.
 */
const FAILURE_MESSAGES = {
  unconfigured: DISCOVERY_CALL_NOT_CONNECTED,
  offline:
    'We could not reach our servers, so your request was not sent. Check your connection and try again.',
  invalid: 'Please check the highlighted fields and try again.',
  'rate-limited':
    'Several requests have already been sent from this network. Please wait a few minutes and try again, or use the WhatsApp button instead.',
  unavailable:
    'Discovery call bookings are temporarily unavailable, so yours was not sent. Please WhatsApp us instead.',
  failed:
    'Something went wrong at our end and your request was not sent. Please try again in a moment.',
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
  name: 'Name',
  phone: 'Phone / WhatsApp',
  business: 'Business',
};

/*
 * A server message, re-worded for a visitor.
 *
 * The API's validator writes its messages against the field NAME — "phone must
 * be a phone number…" — which is right for a client reading a 422 and wrong
 * under an input labelled "Phone / WhatsApp". The leading name is swapped for
 * the label on screen, and the sentence is given a full stop so it reads like
 * every other message under these fields.
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
 * The server can report two failures for one field — too long AND not a phone
 * number — and the first is the one shown, because the second is usually a
 * consequence of it.
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
 * Whether a discovery call can be delivered at all.
 *
 * False means this build has no API base URL configured, so there is nowhere to
 * post to. The form says so above the button rather than taking somebody through
 * three fields and failing at the end.
 *
 * @returns {boolean}
 */
export function canSubmitDiscoveryCall() {
  return Boolean(BASE);
}

/**
 * Books one discovery call.
 *
 * `values` is the form's own state, whose keys are already the API's field names,
 * so a 422's `details[].field` drops straight onto the right input with no
 * translation table in between.
 *
 * `business` is sent as null when blank rather than "": the column is nullable
 * and the server reads a blank as null anyway, but null says so outright.
 *
 * @param {{name: string, phone: string, business: string}} values
 * @returns {Promise<{ok: true} | {ok: false, reason: string, message: string,
 *   fieldErrors: Record<string, string>}>}
 */
export async function submitDiscoveryCall(values) {
  // Rule 1: the prerender pass must not reach the network. It has no visitor and
  // no filled-in form, so reaching here at all would be a mistake.
  if (typeof window === 'undefined') return failure('unconfigured');
  if (!BASE) return failure('unconfigured');

  const payload = {
    name: values.name.trim(),
    phone: values.phone.trim(),
    business: isText(values.business) ? values.business.trim() : null,
  };

  let res;
  try {
    res = await fetch(`${BASE}${DISCOVERY_CALL_PATH}`, {
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
   * endpoint means the row committed; the body is a receipt
   * ({ received: true, id }) and never the stored row, so there is nothing in it
   * worth trusting over the status — and a receipt that failed to parse must not
   * turn a booked call into an error the visitor would answer by booking it a
   * second time.
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
