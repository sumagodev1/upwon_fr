// Footer contact lines and social icons, read from the Upwon admin API.
//
// The admin panel authors both in its Social Media Links area, as two tabs:
// Contact Details (the address / email / phone / website lines under the
// footer's brand block) and Social Links (the row of square icon buttons under
// them). Both are ordered child lists with a publish switch per row, served
// together by one public read — GET /public/social-media-links — because the
// footer renders them as one block and a second request would only add a way
// for the two halves to disagree. See the backend's
// modules/social-media-links/routes/.
//
// The same three rules as lib/aboutPage.js and lib/contactPage.js hold here,
// for the same reasons — the footer is on every prerendered page:
//
//   1. Never run during the SSG build. The prerendered HTML always ships the
//      footer's built-in lines (from data/company.js), so a build never depends
//      on a running API and the crawled markup is stable.
//   2. Never throw. Every failure path returns null, and the footer keeps its
//      built-in lines. A CMS outage must not blank the footer.
//   3. Never configured is a valid state. With no VITE_API_BASE_URL set, the
//      read resolves to null immediately and the footer behaves exactly as it
//      did before this feature existed.
//
// Each list answers for itself, and an empty list has two meanings the API
// separates with one boolean per list, because the panel CAN empty it:
//
//   hasContactLines / hasSocialLinks false — no row exists at all. Nothing is
//     authored, so the footer keeps its built-in list (today's LinkedIn and
//     Twitter buttons, for instance).
//   true with an empty array — every row was switched off on purpose, so the
//     footer renders none.
//
// The icons are names from the backend's SOCIAL_MEDIA_ICON_NAMES allowlist,
// passed through as strings and resolved by lib/socialIcons.jsx at render time.

const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

const isText = (value) => typeof value === 'string' && value.trim() !== '';

// The four kinds the backend's SOCIAL_CONTACT_LINE_KINDS allows. The kind, not
// the icon, decides how a line is linked: an admin may draw an email line with
// an AtSign, and it is still a mailto:.
const CONTACT_KINDS = ['ADDRESS', 'EMAIL', 'PHONE', 'WEBSITE'];

/** EMAIL_PATTERN in the server's core/utils/validation.ts. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Characters that would stop the rest of a mailto: being an address: after the
// first '?' a mail client parses header fields (cc, subject, body), '%' is
// decoded before that parse, and ',' / ';' separate several recipients. The
// server's pattern passes all of them, so the site re-checks rather than hand a
// stored string to the browser as a URL. The admin panel's lib/contactLinks.ts
// refuses the same set, for the same reason.
const MAILTO_UNSAFE = /[?#&=%,;:/\\<>"]/;

// Off-site only, and http(s) only: a profile link or a company website is
// never site-relative, and anything else (javascript:, data:, a protocol-
// relative //host) is dropped rather than rendered as a link.
function safeExternalUrl(value) {
  if (!isText(value)) return null;
  const url = value.trim();
  if (/\s/.test(url)) return null;
  return /^https?:\/\/[^/\\]/i.test(url) ? url : null;
}

// The link each kind gets. ADDRESS stays plain text, as it always has; any
// value that cannot be vouched for is shown as plain text instead of as a dead
// or surprising link.
function toContactHref(kind, value) {
  const text = value.trim();
  if (kind === 'EMAIL') {
    if (text.length > 254 || !EMAIL_PATTERN.test(text) || MAILTO_UNSAFE.test(text)) return null;
    return `mailto:${text}`;
  }
  if (kind === 'PHONE') {
    // tel: wants the digits the phone dials; the display keeps the spacing the
    // admin typed. A leading + survives, every other non-digit is dropped.
    const digits = text.replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15) return null;
    return `tel:${text.trim().startsWith('+') ? '+' : ''}${digits}`;
  }
  if (kind === 'WEBSITE') {
    // Stored as authored, often bare ('www.upwon.in'); a bare host is https.
    return safeExternalUrl(/^[a-z][a-z0-9+.-]*:/i.test(text) ? text : `https://${text}`);
  }
  return null;
}

function isRenderableContactLine(line) {
  return (
    line !== null &&
    typeof line === 'object' &&
    CONTACT_KINDS.includes(line.kind) &&
    isText(line.icon) &&
    isText(line.value)
  );
}

function toContactLine(line) {
  return {
    kind: line.kind,
    icon: line.icon.trim(),
    text: line.value.trim(),
    href: toContactHref(line.kind, line.value),
  };
}

function isRenderableSocialLink(link) {
  return (
    link !== null &&
    typeof link === 'object' &&
    isText(link.label) &&
    isText(link.icon) &&
    safeExternalUrl(link.url) !== null
  );
}

function toSocialLink(link) {
  return {
    label: link.label.trim(),
    icon: link.icon.trim(),
    url: safeExternalUrl(link.url),
  };
}

/**
 * The published footer lists, or null when there is nothing to show — during
 * the prerender, when the API is not configured, unreachable, or answers with
 * anything but a success envelope.
 *
 * @returns {Promise<{
 *   contactLines: Array<{kind: string, icon: string, text: string, href: string|null}>,
 *   hasContactLines: boolean,
 *   socialLinks: Array<{label: string, icon: string, url: string}>,
 *   hasSocialLinks: boolean,
 * } | null>}
 */
export async function fetchSocialMediaLinks() {
  // Rule 1: the prerender pass has no window and must not reach the network.
  if (typeof window === 'undefined') return null;
  // Rule 3: not configured is not an error.
  if (!BASE) return null;

  let data;
  try {
    const res = await fetch(`${BASE}/public/social-media-links`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const body = await res.json();
    if (!body || body.success !== true || !body.data || typeof body.data !== 'object') {
      return null;
    }
    data = body.data;
  } catch {
    // Rule 2: a network failure or a malformed body keeps the built-in footer.
    return null;
  }

  const contactLines = Array.isArray(data.contactLines)
    ? data.contactLines.filter(isRenderableContactLine).map(toContactLine)
    : [];
  const socialLinks = Array.isArray(data.socialLinks)
    ? data.socialLinks.filter(isRenderableSocialLink).map(toSocialLink)
    : [];

  return {
    contactLines,
    // Read defensively, as lib/aboutPage.js reads hasMembers: an older API
    // without the flag still means "authored" whenever it sent a row.
    hasContactLines:
      typeof data.hasContactLines === 'boolean' ? data.hasContactLines : contactLines.length > 0,
    socialLinks,
    hasSocialLinks:
      typeof data.hasSocialLinks === 'boolean' ? data.hasSocialLinks : socialLinks.length > 0,
  };
}
