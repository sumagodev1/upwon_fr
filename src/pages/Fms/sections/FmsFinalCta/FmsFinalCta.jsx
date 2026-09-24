import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  FMS Final CTA — turns accumulated confidence into a low-pressure next step.
  Not a "request a demo" form: an invitation to a 30-minute conversation about the
  franchisor's own network. Dedicated desktop / mobile background art.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the band the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];
const BG_DESKTOP = '/images/CTA%20FMS.webp';
const BG_MOBILE = '/images/cta%20mb%20fms.webp';

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Ready when you are';
const HEADING_LINES = [
  [
    { text: 'See Your Franchise Network on UpWon — ', accent: false },
    { text: 'Live, in 30 Minutes.', accent: true },
  ],
];
const SUBTEXT =
  'An invitation to a conversation about your own franchise network — not a demo request form.';

const PRIMARY = { label: 'Talk to a Franchise Specialist', href: '/demo' };
const SECONDARY = { label: 'See How This Fits Your Outlet Network', href: '/contact' };
const FOOTNOTE = 'No obligation. 30 minutes about your franchise network, not a sales pitch.';

export default function FmsFinalCta({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const primary = section ? section.primary : PRIMARY;
  const secondary = section ? section.secondary : SECONDARY;
  const footnote = section ? section.footnote : FOOTNOTE;
  // Without artwork the band keeps its cream ground, which is a design rather
  // than a hole — so each layer is drawn only when it has something to show.
  const desktopImage = section ? section.desktopImage : BG_DESKTOP;
  const mobileImage = section ? section.mobileImage : BG_MOBILE;

  return (
    <section className="bg-cream-100 px-4 py-8 md:px-6 md:py-10 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-cream-300 bg-cream-100 shadow-enterprise">
        {/* Responsive background art */}
        {desktopImage && (
          <div
            className="absolute inset-0 hidden bg-cover bg-center md:block"
            style={{ backgroundImage: `url('${desktopImage}')` }}
          />
        )}
        {mobileImage && (
          <div
            className="absolute inset-0 bg-cover bg-center md:hidden"
            style={{ backgroundImage: `url('${mobileImage}')` }}
          />
        )}

        <Container className="relative py-14 text-center md:py-20">
          {/* On md+ the background art keeps the photo on the left ~third and a
              light panel on the right — so the copy is offset into that panel
              instead of centering over the whole width (which put it on the
              photo). Mobile bg is text-safe, so it stays centered there. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-3xl md:mx-0 md:ml-[34%] md:mr-[22%] md:max-w-none lg:ml-[35%] lg:mr-[24%]"
          >
            {eyebrow && (
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-600">
                {eyebrow}
              </p>
            )}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
              <HeadingLines lines={headingLines} />
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
              {subtext}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={primary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(232,90,42,0.6)] transition-colors hover:bg-orange-600"
              >
                {primary.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {secondary && (
                <Link
                  to={secondary.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-300 px-6 py-3.5 text-sm font-bold text-navy-900 transition-colors hover:bg-navy-900/5"
                >
                  {secondary.label}
                </Link>
              )}
            </div>

            {footnote && <p className="mt-5 text-[14px] text-navy-500">{footnote}</p>}
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
