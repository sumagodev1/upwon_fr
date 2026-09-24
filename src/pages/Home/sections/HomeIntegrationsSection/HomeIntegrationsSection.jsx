import { useEffect, useState } from 'react';
import PlatformIntegrationsHub from '../../../../components/shared/PlatformIntegrationsHub/PlatformIntegrationsHub.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchIntegrationsSection } from '../../../../lib/homePage.js';

/**
 * The home page's platform integrations section, wired to the CMS.
 *
 * A thin wrapper rather than putting the fetch inside
 * <PlatformIntegrationsHub/> itself. That component is shared with the FMS
 * page, which passes its own copy - keeping the fetch out of it is what stops
 * the home page's content following it onto every page that reuses the sphere.
 *
 * The fallback is all-or-nothing: the server only returns a section when the
 * copy is present and at least one logo still resolves, because a heading
 * beside a bare globe is worse than the copy the site already ships.
 */
export default function HomeIntegrationsSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchIntegrationsSection().then((published) => {
      if (!cancelled && published) setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!section) return <PlatformIntegrationsHub />;

  return (
    <PlatformIntegrationsHub
      {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
      title={<HeadingLines lines={section.headingLines} />}
      description={section.subtext}
      logos={section.logos}
      // Left undefined when unset, so the hub keeps HexSphere's own default
      // rather than being handed an explicit null to work around.
      {...(section.centreLogo ? { centreLogoSrc: section.centreLogo } : {})}
    />
  );
}
