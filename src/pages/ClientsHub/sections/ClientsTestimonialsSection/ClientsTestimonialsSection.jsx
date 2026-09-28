import { useEffect, useState } from 'react';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import TestimonialsMarquee from '../../../../components/shared/TestimonialsMarquee/TestimonialsMarquee.jsx';
import { fetchClientsTestimonials } from '../../../../lib/clientsPage.js';

/*
  Clients Testimonials
  "Real Teams. Real Outcomes." closing /clients

  Authored in the admin panel (Clients → Testimonials): the eyebrow, heading
  and subtext as section copy, and one row per quote card. Rendered by the
  shared TestimonialsMarquee, which is handed the published quotes as `items`.
*/

/*
  The built-in section - what the SSG build prerenders and what renders if the
  API is unreachable. `testimonials: null` keeps the marquee's own quotes.
*/
const FALLBACK = {
  eyebrow: 'VOICES FROM THE NETWORK',
  headingLines: [
    [
      { text: 'Real Teams. ', accent: false },
      { text: 'Real Outcomes.', accent: true },
    ],
  ],
  subtext:
    'What operations, finance and franchise leaders say about running their business on one connected platform.',
  testimonials: null,
};

export default function ClientsTestimonialsSection() {
  // Swapped for the published section once the API answers; null keeps this.
  const [section, setSection] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchClientsTestimonials().then((published) => {
      if (cancelled || !published) return;
      setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TestimonialsMarquee
      eyebrow={section.eyebrow}
      title={<HeadingLines lines={section.headingLines} />}
      description={section.subtext}
      items={section.testimonials}
    />
  );
}
