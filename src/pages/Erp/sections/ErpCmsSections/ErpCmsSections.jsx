import { useEffect, useState } from 'react';
import HeroSlider from '../../../../components/shared/HeroSlider/HeroSlider.jsx';
import IndustryFaq from '../../../../components/shared/IndustryFaq/IndustryFaq.jsx';
import TrustSection from '../../../../components/shared/TrustSection/TrustSection.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import ErpFinalCta from '../ErpFinalCta/ErpFinalCta.jsx';
import {
  fetchErpCtaSection,
  fetchErpTrustSection,
  fetchErpFaqSection,
  fetchErpHeroSlides,
} from '../../../../lib/erpPage.js';

/**
 * The ERP page's CMS-backed sections.
 *
 * One file rather than three wrappers because all three read from the same
 * page and would otherwise repeat the same fetch-and-fall-back shape. Each is
 * still its own component, so the page composes them in its own order.
 *
 * The pattern is the home page's: a thin wrapper around a presentational
 * component that keeps its own defaults, so an unreachable CMS leaves the page
 * exactly as it ships rather than blanking it.
 */

/** Runs one fetch on mount and hands back its result, or null until it lands. */
function usePublished(fetcher, empty = null) {
  const [data, setData] = useState(empty);

  useEffect(() => {
    let cancelled = false;
    fetcher().then((published) => {
      if (!cancelled && published) setData(published);
    });
    return () => {
      cancelled = true;
    };
    // The fetchers are module-level and never change identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}

/**
 * The hero slider.
 *
 * `slides` is required by the page either way, so this takes the built-in set
 * as a prop and swaps it for the published one once that arrives - an empty
 * published list means "nothing authored", which keeps the fallback.
 */
export function ErpHeroSection({ fallbackSlides, ...rest }) {
  const published = usePublished(fetchErpHeroSlides, []);
  const slides = published && published.length > 0 ? published : fallbackSlides;

  return <HeroSlider slides={slides} {...rest} />;
}

/**
 * The proof strip.
 *
 * The fallback is per-list rather than all-or-nothing, matching the home
 * page's: a section with published copy but no logos added yet should use the
 * new copy alongside the built-in marquee - passing an empty array instead
 * would blank the logos out, which is never what "I haven't got to that bit
 * yet" is meant to do.
 */
export function ErpTrustSection({ fallbackEyebrow, fallbackTitle }) {
  const section = usePublished(fetchErpTrustSection);

  if (!section) return <TrustSection eyebrow={fallbackEyebrow} title={fallbackTitle} />;

  return (
    <TrustSection
      headingLines={section.headingLines}
      subtext={section.subtext}
      logos={section.logos.length > 0 ? section.logos : undefined}
      stats={section.stats.length > 0 ? section.stats : undefined}
      {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
    />
  );
}

/**
 * The FAQ accordion.
 *
 * `eyebrow` may be null in the CMS - a section is allowed to open straight on
 * its heading - so it is only passed when there is one, letting the component
 * keep its own default otherwise.
 */
export function ErpFaqSection({ fallbackFaqs, fallbackEyebrow, fallbackTitle, fallbackDescription }) {
  const section = usePublished(fetchErpFaqSection);

  if (!section) {
    return (
      <IndustryFaq
        faqs={fallbackFaqs}
        eyebrow={fallbackEyebrow}
        title={fallbackTitle}
        description={fallbackDescription}
      />
    );
  }

  return (
    <IndustryFaq
      faqs={section.faqs}
      title={<HeadingLines lines={section.headingLines} />}
      description={section.subtext}
      {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
    />
  );
}

/**
 * The closing band.
 *
 * Its copy record carries no eyebrow - the band opens on its heading - so only
 * the heading, subtext, artwork and button are passed through.
 */
export function ErpCtaSection() {
  const section = usePublished(fetchErpCtaSection);

  if (!section) return <ErpFinalCta />;

  return (
    <ErpFinalCta
      title={<HeadingLines lines={section.headingLines} />}
      description={section.subtext}
      buttonLabel={section.buttonLabel}
      buttonHref={section.buttonHref}
      {...(section.desktopImage ? { desktopImage: section.desktopImage } : {})}
      {...(section.mobileImage ? { mobileImage: section.mobileImage } : {})}
    />
  );
}
