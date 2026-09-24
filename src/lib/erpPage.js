// src/lib/erpPage.js

// Same guarded read as lib/homePage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The ERP product page's CMS reads.
 *
 * Same three rules as lib/homePage.js, and for the same reasons:
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
    const res = await fetch(`${BASE}/public/erp-page/${path}`, {
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
 * Renamed to the keys HeroSlider already takes, so the page passes the array
 * straight through.
 *
 * @returns {Promise<Array<{eyebrow: string, headline: string, headingLines: Array,
 *   subhead: string, microTrust: string | null, cta: object | null,
 *   secondaryCta: object | null, bg: string | null}>>}
 */
export async function fetchErpHeroSlides() {
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

// The proof strip needs its copy; the two lists are gathered independently,
// so a section with logos but no counters - or the reverse - is still usable.
function isRenderableTrust(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    (Array.isArray(section.logos) || Array.isArray(section.stats))
  );
}

/**
 * The published proof strip, or null to mean "keep what you have".
 *
 * The lists come back separately rather than merged, because the component
 * takes them as separate props and falls back per-list: a section with copy
 * and counters but no logos yet should keep the built-in marquee rather than
 * blank it.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, logos: Array<{src: string, alt: string}>,
 *   stats: Array<{value: string, label: string}>} | null>}
 */
export async function fetchErpTrustSection() {
  const section = await readSection('trust-section');
  if (!isRenderableTrust(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: section.subtext,
    // Renamed to the key TrustSection already takes for a logo.
    logos: (section.logos ?? [])
      .filter((logo) => logo && typeof logo.image === 'string')
      .map((logo) => ({ src: logo.image, alt: logo.alt })),
    stats: (section.stats ?? []).filter(
      (stat) => stat && typeof stat.value === 'string' && typeof stat.label === 'string',
    ),
  };
}

/**
 * A published industry is only usable with everything the panel draws from it.
 *
 * Checked per industry rather than for the section as a whole, so one
 * half-finished row does not take the other six down with it.
 */
function isRenderableIndustry(industry) {
  return (
    industry &&
    typeof industry.slug === 'string' &&
    industry.slug !== '' &&
    typeof industry.name === 'string' &&
    industry.name !== '' &&
    typeof industry.icon === 'string' &&
    typeof industry.shortDescription === 'string' &&
    typeof industry.erpTitle === 'string' &&
    typeof industry.erpDescription === 'string' &&
    typeof industry.image === 'string' &&
    industry.image !== ''
  );
}

/**
 * The published industry recognition section, or null to mean "keep what you
 * have".
 *
 * The whole section arrives in one read - copy, industries, their features and
 * the shared benefits strip - because the page switches panels in the browser
 * and fetching per click would be a request for content already in hand.
 *
 * Copy and lists fall back separately: a section whose heading has been edited
 * but whose industries have not should show the new heading over the built-in
 * set, not an empty card.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, industries: Array, benefits: Array} | null>}
 */
export async function fetchErpRecognitionSection() {
  const section = await readSection('recognition-section');
  if (!section || !Array.isArray(section.headingLines) || section.headingLines.length === 0) {
    return null;
  }

  const industries = (Array.isArray(section.industries) ? section.industries : [])
    .filter(isRenderableIndustry)
    .map((industry) => ({
      slug: industry.slug,
      name: industry.name,
      icon: industry.icon,
      shortDescription: industry.shortDescription,
      erpTitle: industry.erpTitle,
      erpDescription: industry.erpDescription,
      image: industry.image,
      imageAlt: typeof industry.imageAlt === 'string' ? industry.imageAlt : industry.name,
      dashboard: typeof industry.dashboard === 'string' ? industry.dashboard : null,
      dashboardAlt:
        typeof industry.dashboardAlt === 'string' ? industry.dashboardAlt : 'ERP dashboard',
      features: (Array.isArray(industry.features) ? industry.features : []).filter(
        (feature) =>
          feature &&
          typeof feature.title === 'string' &&
          typeof feature.description === 'string' &&
          typeof feature.icon === 'string',
      ),
    }));

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    industries,
    benefits: (Array.isArray(section.benefits) ? section.benefits : []).filter(
      (benefit) =>
        benefit && typeof benefit.title === 'string' && typeof benefit.icon === 'string',
    ),
  };
}

/**
 * A published audience is only usable with everything its row and panel draw.
 *
 * Checked per audience rather than for the section as a whole, so one
 * half-finished row does not take the other four down with it.
 */
function isRenderablePersona(persona) {
  return (
    persona &&
    typeof persona.eyebrow === 'string' &&
    persona.eyebrow !== '' &&
    typeof persona.title === 'string' &&
    persona.title !== '' &&
    typeof persona.description === 'string' &&
    persona.metric &&
    (typeof persona.metric.countTo === 'number' || typeof persona.metric.text === 'string') &&
    typeof persona.metricLabel === 'string' &&
    typeof persona.authorDesignation === 'string' &&
    typeof persona.authorCompany === 'string'
  );
}

/**
 * The published benefits journey, or null to mean "keep what you have".
 *
 * The whole section arrives in one read - copy, audiences, each audience's two
 * lists and the shared statistics - because the panel swaps in the browser as
 * the pointer moves down the list, and fetching per hover would stall it.
 *
 * Copy and lists fall back separately: a section whose heading has been edited
 * but whose audiences have not should show the new heading over the built-in
 * set, not an empty panel.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, personas: Array, stats: Array} | null>}
 */
export async function fetchErpJourneySection() {
  const section = await readSection('benefits-section');
  if (!section || !Array.isArray(section.headingLines) || section.headingLines.length === 0) {
    return null;
  }

  const personas = (Array.isArray(section.personas) ? section.personas : [])
    .filter(isRenderablePersona)
    .map((persona) => ({
      eyebrow: persona.eyebrow,
      title: persona.title,
      description: persona.description,
      metric: {
        countTo: typeof persona.metric.countTo === 'number' ? persona.metric.countTo : null,
        text: typeof persona.metric.text === 'string' ? persona.metric.text : null,
        prefix: typeof persona.metric.prefix === 'string' ? persona.metric.prefix : '',
        suffix: typeof persona.metric.suffix === 'string' ? persona.metric.suffix : '',
      },
      metricLabel: persona.metricLabel,
      authorDesignation: persona.authorDesignation,
      authorCompany: persona.authorCompany,
      avatar: typeof persona.avatar === 'string' ? persona.avatar : null,
      avatarAlt:
        typeof persona.avatarAlt === 'string' ? persona.avatarAlt : persona.authorDesignation,
      avatarColor: typeof persona.avatarColor === 'string' ? persona.avatarColor : '#1565C0',
      outcomes: (Array.isArray(persona.outcomes) ? persona.outcomes : []).filter(
        (outcome) =>
          outcome && typeof outcome.text === 'string' && typeof outcome.icon === 'string',
      ),
      points: (Array.isArray(persona.points) ? persona.points : []).filter(
        (point) => typeof point === 'string' && point !== '',
      ),
    }));

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    personas,
    stats: (Array.isArray(section.stats) ? section.stats : []).filter(
      (stat) => stat && typeof stat.value === 'string' && typeof stat.label === 'string',
    ),
  };
}

/**
 * The published comparison grid, or null to mean "keep what you have".
 *
 * Cells arrive keyed by column id, so the site pairs them with the columns it
 * was handed and never has to know what any column is called. A column added in
 * the panel therefore renders here with nothing to change.
 *
 * Copy and grid fall back separately: a section whose heading has been edited
 * but whose columns have not should show the new heading over the built-in
 * grid, not an empty table.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, leader: object, columns: Array, categories: Array} | null>}
 */
export async function fetchErpComparisonSection() {
  const section = await readSection('alternatives-section');
  if (!section || !Array.isArray(section.headingLines) || section.headingLines.length === 0) {
    return null;
  }

  const columns = (Array.isArray(section.columns) ? section.columns : [])
    .filter(
      (column) =>
        column &&
        typeof column.id === 'string' &&
        column.id !== '' &&
        typeof column.name === 'string' &&
        column.name !== '',
    )
    .map((column) => ({
      id: column.id,
      name: column.name,
      description: typeof column.description === 'string' ? column.description : '',
      logo: typeof column.logo === 'string' ? column.logo : null,
      logoAlt: typeof column.logoAlt === 'string' ? column.logoAlt : '',
      highlight: column.highlight === true,
    }));

  const categories = (Array.isArray(section.categories) ? section.categories : [])
    .filter((category) => category && typeof category.name === 'string' && category.name !== '')
    .map((category) => ({
      name: category.name,
      rows: (Array.isArray(category.rows) ? category.rows : [])
        .filter((row) => row && typeof row.parameter === 'string' && row.parameter !== '')
        .map((row) => ({
          parameter: row.parameter,
          values: row.values && typeof row.values === 'object' ? row.values : {},
        })),
    }))
    .filter((category) => category.rows.length > 0);

  const leader = section.leader ?? {};

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    leader: {
      label: typeof leader.label === 'string' ? leader.label : '',
      description: typeof leader.description === 'string' ? leader.description : '',
    },
    columns,
    categories,
  };
}

/**
 * A published outcome card is only usable with everything the card draws.
 *
 * Checked per card rather than for the section as a whole, so one
 * half-finished card does not take the others down with it.
 */
function isRenderableOutcome(card) {
  return (
    card &&
    typeof card.industry === 'string' &&
    card.industry !== '' &&
    typeof card.stat === 'string' &&
    card.stat !== '' &&
    typeof card.statLabel === 'string' &&
    typeof card.quote === 'string' &&
    card.quote !== '' &&
    typeof card.authorRole === 'string' &&
    typeof card.authorCompany === 'string' &&
    typeof card.image === 'string' &&
    card.image !== ''
  );
}

/**
 * The published customer outcomes, or null to mean "keep what you have".
 *
 * This section's copy has no subtext - the header row is an eyebrow, a heading
 * and a button, with the cards doing the explaining - so none is read here.
 *
 * Copy and cards fall back separately: a section whose heading has been edited
 * but whose cards have not should show the new heading over the built-in
 * carousel, not an empty track.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   cards: Array} | null>}
 */
export async function fetchErpOutcomesSection() {
  const section = await readSection('outcomes-section');
  if (!section || !Array.isArray(section.headingLines) || section.headingLines.length === 0) {
    return null;
  }

  const cards = (Array.isArray(section.cards) ? section.cards : [])
    .filter(isRenderableOutcome)
    .map((card) => ({
      industry: card.industry,
      stat: card.stat,
      statLabel: card.statLabel,
      quote: card.quote,
      authorRole: card.authorRole,
      authorCompany: card.authorCompany,
      image: card.image,
      imageAlt: typeof card.imageAlt === 'string' ? card.imageAlt : card.authorCompany,
    }));

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    cards,
  };
}

/**
 * The published trust establishers, or null to mean "keep what you have".
 *
 * The sphere's logos come from the same record the home page globe uses, so a
 * partner added there appears here too - the server assembles both halves into
 * this one response rather than the site making two calls.
 *
 * Badges and logos fall back separately: a section whose badges have been
 * edited but whose logo list is empty should show the new badges beside the
 * built-in sphere rather than an empty circle.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, badges: Array, logos: Array, centreLogo: string | null} | null>}
 */
export async function fetchErpEstablishersSection() {
  const section = await readSection('establishers-section');
  if (!section || !Array.isArray(section.headingLines) || section.headingLines.length === 0) {
    return null;
  }

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    badges: (Array.isArray(section.badges) ? section.badges : []).filter(
      (badge) =>
        badge &&
        typeof badge.icon === 'string' &&
        typeof badge.title === 'string' &&
        badge.title !== '' &&
        typeof badge.subtext === 'string',
    ),
    logos: (Array.isArray(section.logos) ? section.logos : [])
      .filter((logo) => logo && typeof logo.image === 'string' && logo.image !== '')
      // Renamed to the keys HexSphere takes, so the sphere gets them unchanged.
      .map((logo) => ({ src: logo.image, alt: typeof logo.alt === 'string' ? logo.alt : '' })),
    centreLogo: typeof section.centreLogo === 'string' ? section.centreLogo : null,
  };
}

// An FAQ section is only usable with its copy and at least one question.
function isRenderableFaq(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    Array.isArray(section.faqs) &&
    section.faqs.length > 0
  );
}

/**
 * The published FAQ section, or null to mean "keep what you have".
 *
 * `eyebrow` may be null - the CMS allows a section to open straight on its
 * heading - so it is passed through as-is rather than defaulted here.
 *
 * @returns {Promise<{eyebrow: string | null, headingLines: Array,
 *   subtext: string, faqs: Array<{q: string, a: string}>} | null>}
 */
export async function fetchErpFaqSection() {
  const section = await readSection('faq-section');
  if (!isRenderableFaq(section)) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: section.subtext,
    faqs: section.faqs.filter(
      (faq) => faq && typeof faq.q === 'string' && typeof faq.a === 'string',
    ),
  };
}

// The closing band needs its copy and its button; the artwork is optional,
// because the component ships its own.
function isRenderableCta(section) {
  return (
    section &&
    Array.isArray(section.headingLines) &&
    section.headingLines.length > 0 &&
    typeof section.subtext === 'string' &&
    section.subtext.trim() !== '' &&
    typeof section.buttonLabel === 'string' &&
    section.buttonLabel.trim() !== '' &&
    typeof section.buttonHref === 'string' &&
    section.buttonHref.trim() !== ''
  );
}

/**
 * The published closing band, or null to mean "keep what you have".
 *
 * @returns {Promise<{headingLines: Array, subtext: string,
 *   desktopImage: string | null, mobileImage: string | null,
 *   buttonLabel: string, buttonHref: string} | null>}
 */
export async function fetchErpCtaSection() {
  const section = await readSection('cta-section');
  if (!isRenderableCta(section)) return null;

  return {
    headingLines: section.headingLines,
    subtext: section.subtext,
    desktopImage: typeof section.desktopImage === 'string' ? section.desktopImage : null,
    mobileImage: typeof section.mobileImage === 'string' ? section.mobileImage : null,
    buttonLabel: section.buttonLabel,
    buttonHref: section.buttonHref,
  };
}
