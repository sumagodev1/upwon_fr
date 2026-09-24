// src/lib/sfaDmsPage.js

// Same guarded read as lib/erpPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The SFA-DMS product page's CMS reads.
 *
 * Same three rules as lib/erpPage.js, and for the same reasons:
 *
 *   - never during the SSG build, because the prerendered HTML must be the
 *     copy the site ships rather than whatever the API happened to hold at
 *     build time
 *   - never throw, because an unreachable CMS should leave the page exactly as
 *     it was, not blank it
 *   - unconfigured is a valid state, so a site built without an API base URL
 *     simply renders its own content
 *
 * Each returns null - or an empty list - to mean "keep what you have".
 */

const guard = () => typeof window !== 'undefined' && Boolean(BASE);

async function readSection(path) {
  if (!guard()) return null;
  try {
    const res = await fetch(`${BASE}/public/sfa-dms-page/${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const body = await res.json();
    if (!body || body.success !== true) return null;
    return body.data ?? null;
  } catch {
    return null;
  }
}

/** A button is only usable with both halves. */
const usableCta = (cta) =>
  cta && typeof cta.label === 'string' && typeof cta.href === 'string' ? cta : null;

/**
 * The published hero slides, or an empty array to mean "keep the built-in set".
 *
 * Renamed to the keys HeroSlider already takes, so ProductPage passes the array
 * straight through.
 *
 * @returns {Promise<Array<{eyebrow: string, headline: string, headingLines: Array,
 *   subhead: string, microTrust: string | null, cta: object | null,
 *   secondaryCta: object | null, bg: string | null, bgMobile: string | null}>>}
 */
export async function fetchSfaHeroSlides() {
  const data = await readSection('hero-section');
  if (!Array.isArray(data)) return [];

  return data
    .filter(
      (slide) =>
        slide &&
        typeof slide.eyebrow === 'string' &&
        typeof slide.headline === 'string' &&
        typeof slide.subhead === 'string',
    )
    .map((slide) => ({
      eyebrow: slide.eyebrow,
      headline: slide.headline,
      // The parsed form, for a slider that wants the accent spans.
      headingLines: Array.isArray(slide.headlineLines) ? slide.headlineLines : null,
      subhead: slide.subhead,
      microTrust: typeof slide.microTrust === 'string' ? slide.microTrust : null,
      cta: usableCta(slide.cta),
      secondaryCta: usableCta(slide.secondaryCta),
      // HeroSlider calls the background `bg`.
      bg: typeof slide.image === 'string' ? slide.image : null,
      // The portrait crop for phones. Null leaves the slider showing `bg` at
      // every size, which is what every slide does today.
      bgMobile: typeof slide.mobileImage === 'string' ? slide.mobileImage : null,
    }));
}

// An FAQ section is only usable with its copy and at least one question.
function isRenderableFaq(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.faqs) &&
    section.faqs.length > 0
  );
}

/**
 * The published FAQ section, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, faqs: Array<{q: string, a: string}>} | null>}
 */
export async function fetchSfaFaqSection() {
  const section = await readSection('faq-section');
  if (!isRenderableFaq(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    faqs: section.faqs.filter(
      (faq) => faq && typeof faq.q === 'string' && typeof faq.a === 'string',
    ),
  };
}


/*
 * The proof band needs its copy and at least one of its two panels. A card
 * with no figures beside it, or figures with no card, is still worth showing;
 * neither is not.
 */
function isRenderableProof(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    (section.panel ||
      (Array.isArray(section.stats) && section.stats.length > 0) ||
      (Array.isArray(section.logos) && section.logos.length > 0))
  );
}

/**
 * The published proof section, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   panel: {heading: string, bodyText: string, linkLabel: string | null,
 *     linkHref: string | null, logosLabel: string | null} | null,
 *   logos: Array<{image: string, alt: string}>,
 *   stats: Array<{value: string, label: string}>} | null>}
 */
export async function fetchSfaProofSection() {
  const section = await readSection('proof-section');
  if (!isRenderableProof(section)) return null;

  const panel = section.panel;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    panel:
      panel && typeof panel.heading === 'string' && typeof panel.bodyText === 'string'
        ? {
            heading: panel.heading,
            bodyText: panel.bodyText,
            // Both halves or neither, the same rule the server enforces.
            linkLabel:
              typeof panel.linkLabel === 'string' && typeof panel.linkHref === 'string'
                ? panel.linkLabel
                : null,
            linkHref:
              typeof panel.linkLabel === 'string' && typeof panel.linkHref === 'string'
                ? panel.linkHref
                : null,
            logosLabel: typeof panel.logosLabel === 'string' ? panel.logosLabel : null,
          }
        : null,
    logos: Array.isArray(section.logos)
      ? section.logos.filter(
          (logo) => logo && typeof logo.image === 'string' && typeof logo.alt === 'string',
        )
      : [],
    stats: Array.isArray(section.stats)
      ? section.stats.filter(
          (stat) =>
            stat && typeof stat.value === 'string' && typeof stat.label === 'string',
        )
      : [],
  };
}

/*
 * The video showcase needs its copy and a playable source. The server only
 * publishes a section when it has both - a heading promising a video above an
 * empty player is worse than the copy the site already ships.
 */
function isRenderableVideo(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.video === 'string' &&
    section.video.trim() !== ''
  );
}

/**
 * The published video section, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, video: string} | null>}
 */
export async function fetchSfaVideoSection() {
  const section = await readSection('video-section');
  if (!isRenderableVideo(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    video: section.video,
  };
}
/*
 * The adoption path needs its copy and at least one card. A heading over an
 * empty row of packages is worse than the section the site already ships.
 */
function isRenderablePackages(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.cards) &&
    section.cards.length > 0
  );
}

/**
 * The published adoption path, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   cards: Array<{icon: string, stageLabel: string, title: string, subtitle: string,
 *     description: string, accentColor: string, buttonLabel: string,
 *     buttonHref: string, featuresLabel: string, features: string[]}>} | null>}
 */
export async function fetchSfaPackagesSection() {
  const section = await readSection('packages-section');
  if (!isRenderablePackages(section)) return null;

  const cards = section.cards.filter(
    (card) =>
      card &&
      typeof card.title === 'string' &&
      typeof card.buttonLabel === 'string' &&
      typeof card.buttonHref === 'string',
  );
  if (cards.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cards: cards.map((card) => ({
      icon: typeof card.icon === 'string' ? card.icon : '',
      stageLabel: typeof card.stageLabel === 'string' ? card.stageLabel : '',
      title: card.title,
      subtitle: typeof card.subtitle === 'string' ? card.subtitle : '',
      description: typeof card.description === 'string' ? card.description : '',
      accentColor: typeof card.accentColor === 'string' ? card.accentColor : '#0F172A',
      buttonLabel: card.buttonLabel,
      buttonHref: card.buttonHref,
      featuresLabel: typeof card.featuresLabel === 'string' ? card.featuresLabel : '',
      features: Array.isArray(card.features)
        ? card.features.filter((f) => typeof f === 'string')
        : [],
    })),
  };
}

/*
 * The establishers band needs its copy, both panel headers, and something in
 * at least one panel. Badges with no sphere, or a sphere with no badges, is
 * still a section worth rendering; neither is not.
 */
function isRenderableEstablishers(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    section.compliance &&
    typeof section.compliance.label === 'string' &&
    section.ecosystem &&
    typeof section.ecosystem.label === 'string' &&
    ((Array.isArray(section.badges) && section.badges.length > 0) ||
      (Array.isArray(section.logos) && section.logos.length > 0))
  );
}

/**
 * The published trust establishers, or null to mean "keep what you have".
 *
 * The sphere's logos arrive as { image, alt } and are renamed to the { src, alt }
 * HexSphere takes, the same way lib/erpPage.js does for the ERP page's copy of
 * this section.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   compliance: {label: string, icon: string, backgroundImage: string | null},
 *   ecosystem: {label: string, icon: string, color: string},
 *   badges: Array<{icon: string, title: string, subtext: string}>,
 *   logos: Array<{src: string, alt: string}>, centreLogo: string | null} | null>}
 */
export async function fetchSfaEstablishersSection() {
  const section = await readSection('establishers-section');
  if (!isRenderableEstablishers(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    compliance: {
      label: section.compliance.label,
      icon: typeof section.compliance.icon === 'string' ? section.compliance.icon : '',
      backgroundImage:
        typeof section.compliance.backgroundImage === 'string'
          ? section.compliance.backgroundImage
          : null,
    },
    ecosystem: {
      label: section.ecosystem.label,
      icon: typeof section.ecosystem.icon === 'string' ? section.ecosystem.icon : '',
      color:
        typeof section.ecosystem.color === 'string' ? section.ecosystem.color : '#1D6FE0',
    },
    badges: Array.isArray(section.badges)
      ? section.badges.filter(
          (badge) =>
            badge && typeof badge.title === 'string' && typeof badge.subtext === 'string',
        )
      : [],
    logos: Array.isArray(section.logos)
      ? section.logos
          .filter((logo) => logo && typeof logo.image === 'string' && logo.image !== '')
          .map((logo) => ({ src: logo.image, alt: typeof logo.alt === 'string' ? logo.alt : '' }))
      : [],
    centreLogo: typeof section.centreLogo === 'string' ? section.centreLogo : null,
  };
}

/*
 * The comparison grid needs its copy, at least one column and at least one
 * capability row. A heading over an empty table is worse than the table the
 * site already ships.
 */
function isRenderableAlternatives(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.columns) &&
    section.columns.length > 0 &&
    Array.isArray(section.rows) &&
    section.rows.length > 0
  );
}

/** A cell map, keeping only the entries the grid can draw. */
function readRatings(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const out = {};
  for (const [columnId, rating] of Object.entries(raw)) {
    if (typeof rating === 'number' && Number.isFinite(rating)) out[columnId] = rating;
  }
  return out;
}

/**
 * The published comparison grid, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array, subtext: string,
 *   leaderLabel: string,
 *   columns: Array<{id: string, name: string, highlight: boolean}>,
 *   rows: Array<{parameter: string, ratings: Record<string, number>}>,
 *   summary: {parameter: string,
 *     cells: Record<string, {label: string, tone: string}>} | null} | null>}
 */
export async function fetchSfaAlternativesSection() {
  const section = await readSection('alternatives-section');
  if (!isRenderableAlternatives(section)) return null;

  const columns = section.columns.filter(
    (column) => column && typeof column.id === 'string' && typeof column.name === 'string',
  );
  if (columns.length === 0) return null;

  const rows = section.rows
    .filter((row) => row && typeof row.parameter === 'string')
    .map((row) => ({ parameter: row.parameter, ratings: readRatings(row.ratings) }));
  if (rows.length === 0) return null;

  const summary = section.summary;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    leaderLabel: typeof section.leaderLabel === 'string' ? section.leaderLabel : 'Capability',
    columns: columns.map((column) => ({
      id: column.id,
      name: column.name,
      highlight: column.highlight === true,
    })),
    rows,
    summary:
      summary && typeof summary.parameter === 'string'
        ? {
            parameter: summary.parameter,
            cells:
              summary.cells && typeof summary.cells === 'object'
                ? Object.fromEntries(
                    Object.entries(summary.cells).filter(
                      ([, cell]) =>
                        cell && typeof cell.label === 'string' && typeof cell.tone === 'string',
                    ),
                  )
                : {},
          }
        : null,
  };
}

/*
 * The stories band needs its copy and at least one card. A heading over an
 * empty carousel is worse than the stories the site already ships.
 */
function isRenderableOutcomes(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    Array.isArray(section.cards) &&
    section.cards.length > 0
  );
}

/** A button pair is only usable when both halves of both buttons are there. */
function usableButtons(buttons) {
  const half = (b) =>
    b && typeof b.label === 'string' && b.label !== '' && typeof b.href === 'string' && b.href !== '';
  return buttons && half(buttons.primary) && half(buttons.secondary) ? buttons : null;
}

/**
 * The published customer stories, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   buttons: {primary: {label: string, href: string},
 *     secondary: {label: string, href: string}} | null,
 *   cards: Array<{title: string, body: string, name: string, role: string,
 *     company: string, photo: string, href: string | null}>} | null>}
 */
export async function fetchSfaOutcomesSection() {
  const section = await readSection('outcomes-section');
  if (!isRenderableOutcomes(section)) return null;

  // A card needs its photo and its attribution; the tile is half the card.
  const cards = section.cards.filter(
    (card) =>
      card &&
      typeof card.title === 'string' &&
      typeof card.body === 'string' &&
      typeof card.name === 'string' &&
      typeof card.company === 'string' &&
      typeof card.photo === 'string' &&
      card.photo !== '',
  );
  if (cards.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    buttons: usableButtons(section.buttons),
    cards: cards.map((card) => ({
      title: card.title,
      body: card.body,
      name: card.name,
      role: typeof card.role === 'string' ? card.role : '',
      company: card.company,
      photo: card.photo,
      href: typeof card.href === 'string' && card.href !== '' ? card.href : null,
    })),
  };
}

// The closing band needs its copy and its button; the artwork is optional,
// because the component ships its own.
function isRenderableCta(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.buttonLabel === 'string' &&
    section.buttonLabel.trim() !== '' &&
    typeof section.buttonHref === 'string' &&
    section.buttonHref.trim() !== ''
  );
}

/**
 * The published closing band, or null to mean "keep what you have".
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, backgroundImage: string | null,
 *   dashboardImage: string | null, dashboardAlt: string | null,
 *   buttonLabel: string, buttonHref: string} | null>}
 */
export async function fetchSfaCtaSection() {
  const section = await readSection('cta-section');
  if (!isRenderableCta(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    backgroundImage:
      typeof section.backgroundImage === 'string' ? section.backgroundImage : null,
    dashboardImage:
      typeof section.dashboardImage === 'string' ? section.dashboardImage : null,
    dashboardAlt: typeof section.dashboardAlt === 'string' ? section.dashboardAlt : '',
    buttonLabel: section.buttonLabel,
    buttonHref: section.buttonHref,
  };
}
