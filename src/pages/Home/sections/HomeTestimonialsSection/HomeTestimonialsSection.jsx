import { useEffect, useState } from 'react';
import VideoTestimonials from '../../../../components/_unused/VideoTestimonials.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchTestimonialsSection } from '../../../../lib/homePage.js';

/**
 * The home page's client testimonials section, wired to the CMS.
 *
 * A thin wrapper rather than putting the fetch inside <VideoTestimonials/>
 * itself. That component is only rendered here today, but the same split is
 * used by every other CMS-backed section - keeping the fetch out of the
 * presentational component is what lets it be reused on another page later
 * without dragging the home page's content with it.
 *
 * The fallback is all-or-nothing: the server only returns a section when the
 * copy is present and at least one card still has a poster, because a heading
 * beside an empty rail is worse than the copy the site already ships.
 */
export default function HomeTestimonialsSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchTestimonialsSection().then((published) => {
      if (!cancelled && published) setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!section) return <VideoTestimonials />;

  return (
    <VideoTestimonials
      {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
      title={<HeadingLines lines={section.headingLines} />}
      description={section.subtext}
      testimonials={section.cards}
    />
  );
}
