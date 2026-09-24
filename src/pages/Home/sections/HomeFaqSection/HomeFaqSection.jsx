import { useEffect, useState } from 'react';
import IndustryFaq from '../../../../components/shared/IndustryFaq/IndustryFaq.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { FAQS } from '../FaqSection/FaqSection.jsx';
import { fetchFaqSection } from '../../../../lib/homePage.js';

/**
 * The home page's FAQ section, wired to the CMS.
 *
 * A thin wrapper rather than putting the fetch inside <IndustryFaq/> itself.
 * That component is shared with the ERP, FMS, POS, Product and Industry pages,
 * which each pass their own questions - keeping the fetch out of it is what
 * stops the home page's content following it onto every one of them.
 *
 * <IndustryFaq/> already takes all four fields as props, so nothing in it
 * needed changing; this only chooses between the CMS answer and the built-in
 * list. The fallback reproduces exactly what HomePage passed before, including
 * leaving `description` unset so the component's own default still shows.
 *
 * The fallback is all-or-nothing: the server only returns a section when the
 * copy is present and at least one question is active, because a heading over
 * an empty accordion is worse than the list the site already ships.
 */
export default function HomeFaqSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchFaqSection().then((published) => {
      if (!cancelled && published) setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!section) {
    return (
      <IndustryFaq
        faqs={FAQS}
        eyebrow="UpWon · Questions Before You Commit"
        title={
          <>
            The questions buyers ask us about this{' '}
            <span className="gradient-text-orange">platform.</span>
          </>
        }
      />
    );
  }

  return (
    <IndustryFaq
      faqs={section.faqs}
      {...(section.eyebrow ? { eyebrow: section.eyebrow } : {})}
      title={<HeadingLines lines={section.headingLines} />}
      description={section.subtext}
    />
  );
}
