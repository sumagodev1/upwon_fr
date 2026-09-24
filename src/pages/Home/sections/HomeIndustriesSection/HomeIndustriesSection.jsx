import { useEffect, useState } from 'react';
import IndustriesVideoIntro from '../../../../components/shared/IndustriesVideoIntro/IndustriesVideoIntro.jsx';
import { fetchIndustriesSection } from '../../../../lib/homePage.js';

/**
 * The home page's industries video intro, wired to the CMS.
 *
 * A thin wrapper rather than putting the fetch inside <IndustriesVideoIntro/>
 * itself, because that component is shared: the FMS, POS and Product pages
 * render it too, with their own copy and their own video. Only the home page's
 * instance is CMS-driven, so only the home page's instance fetches.
 *
 * The fallback is all-or-nothing here, unlike the trust section's: the server
 * only returns a section when all four fields are present, because a heading
 * that promises a video above an empty player is worse than showing the copy
 * the site already ships.
 */
export default function HomeIndustriesSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchIndustriesSection().then((published) => {
      if (!cancelled && published) setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!section) return <IndustriesVideoIntro />;

  return (
    <IndustriesVideoIntro
      {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
      headingLines={section.headingLines}
      subtext={section.subtext}
      video={section.video}
    />
  );
}
