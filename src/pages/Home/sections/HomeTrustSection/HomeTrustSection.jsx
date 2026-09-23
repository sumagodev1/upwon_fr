import { useEffect, useState } from 'react';
import TrustSection from '../../../../components/shared/TrustSection/TrustSection.jsx';
import { fetchTrustSection } from '../../../../lib/homePage.js';

/**
 * The home page's trust section, wired to the CMS.
 *
 * A thin wrapper rather than putting the fetch inside <TrustSection/> itself,
 * because that component is shared: the ERP and Product pages render it too,
 * with their own copy and their own proof stats. Only the home page's instance
 * is CMS-driven, so only the home page's instance fetches.
 *
 * The fallback is per-field, not all-or-nothing. A section with published copy
 * but no logos added yet should use the new copy alongside the built-in
 * marquee - passing an empty array instead would blank the logos out, which is
 * never what "I haven't got to that bit yet" is meant to do.
 */
export default function HomeTrustSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchTrustSection().then((published) => {
      if (!cancelled && published) setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!section) return <TrustSection />;

  return (
    <TrustSection
      eyebrow={section.eyebrow}
      headingLines={section.headingLines}
      subtext={section.subtext}
      logos={section.logos.length > 0 ? section.logos : undefined}
      stats={section.stats.length > 0 ? section.stats : undefined}
    />
  );
}
