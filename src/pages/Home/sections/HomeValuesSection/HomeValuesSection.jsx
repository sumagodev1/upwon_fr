import { useEffect, useState } from 'react';
import ValuesWorkCulture from '../../../../components/_unused/ValuesWorkCulture.jsx';
import { fetchValuesSection } from '../../../../lib/homePage.js';

/**
 * The home page's values and work culture section, wired to the CMS.
 *
 * A thin wrapper rather than putting the fetch inside <ValuesWorkCulture/>
 * itself. That component is only rendered here today, but the same split is
 * used by the hero, trust and industries sections - keeping the fetch out of
 * the presentational component is what lets any of them be reused on another
 * page later without dragging the home page's content with them.
 *
 * The fallback is all-or-nothing: the server only returns a section when the
 * copy is present and at least one card still has an image, because a heading
 * over an empty grid is worse than the copy the site already ships.
 */
export default function HomeValuesSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchValuesSection().then((published) => {
      if (!cancelled && published) setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!section) return <ValuesWorkCulture />;

  return (
    <ValuesWorkCulture
      {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
      headingLines={section.headingLines}
      subtext={section.subtext}
      values={section.cards}
    />
  );
}
