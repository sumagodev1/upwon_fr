// src/lib/vendorPortalPage.js

// Same guarded read as lib/wmsPage.js: import.meta is absent in some tool
// contexts, and an unconfigured build is a valid state rather than an error.
const BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL) ||
  '';

/**
 * The Vendor Portal (VMS) product page's CMS reads.
 *
 * Same three rules as lib/wmsPage.js, and for the same reasons:
 *
 *   - never during the SSG build, because the prerendered HTML must be the
 *     copy the site ships rather than whatever the API happened to hold at
 *     build time
 *   - never throw, because an unreachable CMS should leave the page exactly as
 *     it was, not blank it
 *   - unconfigured is a valid state, so a site built without an API base URL
 *     simply renders its own content
 *
 * All six editable sections are here - the hero slider, the proof bento, the
 * capability carousel, the outcome showcase, the FAQ and the closing band.
 * The rest of the page is still the copy the site ships.
 *
 * Each returns null - or an empty list - to mean "keep what you have".
 */

const guard = () => typeof window !== 'undefined' && Boolean(BASE);

async function readSection(path) {
  if (!guard()) return null;
  try {
    const res = await fetch(`${BASE}/public/vendor-portal-page/${path}`, {
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

/** A section is only worth swapping in with a heading and something under it. */
const hasHeading = (section) =>
  section && Array.isArray(section.headingLines) && section.headingLines.length > 0;

/**
 * The published hero slides, or an empty array to mean "keep the built-in set".
 *
 * Renamed to the keys HeroSlider already takes, so the page passes the array
 * straight through.
 *
 * @returns {Promise<Array<object>>}
 */
export async function fetchVmsHeroSlides() {
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
      bgMobile: typeof slide.mobileImage === 'string' ? slide.mobileImage : null,
    }));
}

/**
 * The published proof bento, or null to mean "keep the built-in one".
 *
 * Each tile carries its own kind and column span, which is what the grid
 * needs to lay itself out - the order is the layout.
 *
 * A metric tile keeps its icon as a name; the section resolves it through
 * lib/vmsIcons.js at render time.
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array, subtext: string,
 *   tiles: Array<object>} | null>}
 */
export async function fetchVmsProofSection() {
  const section = await readSection('proof-section');
  if (!hasHeading(section) || !Array.isArray(section.tiles)) return null;

  const tiles = section.tiles
    .filter((tile) => {
      if (!tile) return false;
      if (tile.kind === 'METRIC') {
        return (
          typeof tile.icon === 'string' &&
          typeof tile.value === 'string' &&
          typeof tile.title === 'string' &&
          typeof tile.description === 'string'
        );
      }
      return tile.kind === 'IMAGE' && typeof tile.image === 'string';
    })
    .map((tile) =>
      tile.kind === 'METRIC'
        ? {
            kind: 'METRIC',
            colSpan: Number(tile.colSpan) || 4,
            icon: tile.icon,
            value: tile.value,
            // Anything but 'down' points up, which is what most tiles do.
            direction: tile.direction === 'down' ? 'down' : 'up',
            title: tile.title,
            description: tile.description,
          }
        : {
            kind: 'IMAGE',
            colSpan: Number(tile.colSpan) || 4,
            image: tile.image,
            // Empty string is the correct markup when the editor left it off
            // deliberately - the tile is decorative beside the metrics.
            imageAlt: typeof tile.imageAlt === 'string' ? tile.imageAlt : '',
          },
    );
  if (tiles.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    tiles,
  };
}

/**
 * The published capability carousel, or null to mean "keep the built-in one".
 *
 * The number each card shows is its position, so it is assigned here rather
 * than stored - which is what keeps 01..07 in step after a reorder.
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array, subtext: string,
 *   cards: Array<{number: string, title: string, desc: string, image: string,
 *   imageAlt: string}>} | null>}
 */
export async function fetchVmsCapabilitiesSection() {
  const section = await readSection('capabilities-section');
  if (!hasHeading(section) || !Array.isArray(section.cards)) return null;

  const cards = section.cards
    .filter(
      (card) =>
        card &&
        typeof card.image === 'string' &&
        typeof card.title === 'string' &&
        typeof card.description === 'string',
    )
    .map((card, index) => ({
      number: String(index + 1).padStart(2, '0'),
      title: card.title,
      desc: card.description,
      image: card.image,
      // The title is right under the screenshot, so it is the natural
      // fallback when an editor left the alt text off.
      imageAlt: typeof card.imageAlt === 'string' && card.imageAlt ? card.imageAlt : card.title,
    }));
  if (cards.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    cards,
  };
}

/**
 * The published outcome showcase, or null to mean "keep the built-in one".
 *
 * `video` may be null: the three tabs shipped today share one placeholder
 * clip that belongs to the site, so a tab without its own film is the normal
 * state and the player falls back to the site's own source.
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array, subtext: string,
 *   videos: Array<object>} | null>}
 */
export async function fetchVmsOutcomesSection() {
  const section = await readSection('outcomes-section');
  if (!hasHeading(section) || !Array.isArray(section.videos)) return null;

  const videos = section.videos
    .filter(
      (video) =>
        video &&
        typeof video.label === 'string' &&
        typeof video.badge === 'string' &&
        typeof video.title === 'string' &&
        typeof video.description === 'string',
    )
    .map((video, index) => ({
      id: index,
      label: video.label,
      badge: video.badge,
      duration: typeof video.duration === 'string' ? video.duration : '',
      title: video.title,
      description: video.description,
      button: usableCta(video.button),
      src: typeof video.video === 'string' ? video.video : null,
      poster: typeof video.poster === 'string' ? video.poster : null,
    }));
  if (videos.length === 0) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    videos,
  };
}

/**
 * The published FAQ, or null to mean "keep the built-in one".
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array, subtext: string,
 *   faqs: Array<{q: string, a: string}>} | null>}
 */
export async function fetchVmsFaqSection() {
  const section = await readSection('faq-section');
  if (!hasHeading(section) || !Array.isArray(section.faqs) || section.faqs.length === 0) {
    return null;
  }

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    faqs: section.faqs.filter(
      (faq) => faq && typeof faq.q === 'string' && typeof faq.a === 'string',
    ),
  };
}

/**
 * The published closing band, or null to mean "keep the built-in one".
 *
 * The band needs its heading and a first button; the photograph can be absent
 * without the band breaking, because the site draws its own behind the copy.
 *
 * @returns {Promise<{eyebrow: string|null, headingLines: Array, subtext: string,
 *   image: string|null, mobileImage: string|null, primary: object,
 *   secondary: object|null} | null>}
 */
export async function fetchVmsCtaSection() {
  const section = await readSection('cta-section');
  if (!hasHeading(section)) return null;

  const primary = usableCta(section.primary);
  if (!primary) return null;

  return {
    eyebrow: typeof section.eyebrow === 'string' ? section.eyebrow : null,
    headingLines: section.headingLines,
    subtext: typeof section.subtext === 'string' ? section.subtext : '',
    image: typeof section.image === 'string' ? section.image : null,
    mobileImage: typeof section.mobileImage === 'string' ? section.mobileImage : null,
    primary,
    secondary: usableCta(section.secondary),
  };
}
