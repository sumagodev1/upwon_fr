import { useEffect, useState } from 'react';
import HomeFinalCta from '../../../../components/_unused/HomeFinalCta.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchCtaSection } from '../../../../lib/homePage.js';

/**
 * The home page's report-download band, wired to the CMS.
 *
 * A thin wrapper rather than putting the fetch inside <HomeFinalCta/> itself.
 * That component is only rendered here today, but the same split is used by
 * every other CMS-backed section - keeping the fetch out of the presentational
 * component is what lets it be reused on another page later without dragging
 * the home page's content with it.
 *
 * Only the copy, the button label and the report are passed through
 * unconditionally. The two images are spread in only when the CMS has one, so
 * an unset slot falls back to the artwork the component ships rather than to
 * an empty `url()`.
 */
export default function HomeFinalCtaSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchCtaSection().then((published) => {
      if (!cancelled && published) setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!section) return <HomeFinalCta />;

  return (
    <HomeFinalCta
      {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
      title={<HeadingLines lines={section.headingLines} />}
      description={section.subtext}
      buttonLabel={section.buttonLabel}
      reportUrl={section.reportUrl}
      {...(section.desktopImage ? { desktopImage: section.desktopImage } : {})}
      {...(section.mobileImage ? { mobileImage: section.mobileImage } : {})}
    />
  );
}
