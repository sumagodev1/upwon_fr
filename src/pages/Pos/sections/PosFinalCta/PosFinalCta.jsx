import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  POS Final CTA — turns accumulated confidence into a low-pressure next step,
  matched to a faster retail buying cycle. Not a "request a demo" form: an
  invitation to a 30-minute conversation about the owner's own counter.
  Dedicated desktop / mobile background art (POS mockup + wash + doodle).

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the band the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];
const BG_DESKTOP = '/images/cta_pos_desktop.webp';
const BG_MOBILE = '/images/cta_pos_mobile.webp';

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Real Counters. Real Businesses. Real Growth.';
const HEADING_LINES = [
  [
    { text: 'See UpWon POS at Your Counter — ', accent: false },
    { text: 'Live, in 30 Minutes.', accent: true },
  ],
];
const SUBTEXT =
  'A quick, focused conversation about your business, your counter, and how UpWon can help you grow.';

const PRIMARY = { label: 'Talk to a Retail Specialist', href: '/demo' };
const SECONDARY = { label: 'See How This Fits Your Counter', href: '/contact' };
const FOOTNOTE = 'No obligation. 30 minutes about your business, not a sales pitch.';
/** The handwritten note the background arrow points at, drawn from 1024px up. */
const NOTE = 'Your Counter.\nOur Focus.';

export default function PosFinalCta({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const primary = section ? section.primary : PRIMARY;
  const secondary = section ? section.secondary : SECONDARY;
  const footnote = section ? section.footnote : FOOTNOTE;
  const note = section ? section.note : NOTE;
  // Without artwork the band keeps its cream ground, which is a design rather
  // than a hole — so each layer is drawn only when it has something to show.
  const desktopImage = section ? section.desktopImage : BG_DESKTOP;
  const mobileImage = section ? section.mobileImage : BG_MOBILE;

  // Authored with a newline for its line break, the same grammar the headings
  // use — so the break is content rather than markup.
  const noteLines = note ? note.split('\n') : [];

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

        {/* Handwritten note the background arrow points to (desktop only) */}
        {noteLines.length > 0 && (
          <div className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 -rotate-[8deg] lg:block xl:right-[7%]">
            <p
              className="text-2xl leading-[1.15] text-navy-900 xl:text-[26px]"
              style={{ fontFamily: "'Segoe Script', 'Bradley Hand', 'Brush Script MT', cursive" }}
            >
              {noteLines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </p>
            <span className="mt-1.5 ml-auto block h-[3px] w-[92px] rounded-full bg-orange-500" />
          </div>
        )}

        <Container className="relative py-14 text-center md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-3xl"
          >
            {/* Flanked eyebrow */}
            <div className="flex items-center justify-center gap-3">
              <span className="hidden h-px w-10 bg-navy-300 sm:block" />
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-navy-500">
                {eyebrow}
              </p>
              <span className="hidden h-px w-10 bg-navy-300 sm:block" />
            </div>

 <h2 className="mt-4 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
              <HeadingLines lines={headingLines} />
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-600">
              {subtext}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={primary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(232,90,42,0.6)] transition-colors hover:bg-orange-600"
              >
                {primary.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              {secondary && (
                <Link
                  to={secondary.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-navy-900 backdrop-blur-sm transition-colors hover:bg-white"
                >
                  {secondary.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
              )}
            </div>

            {footnote && (
              <p className="mt-6 inline-flex items-center gap-2 text-[14px] text-navy-500">
                <ShieldCheck className="h-4 w-4 shrink-0 text-orange-600" strokeWidth={2} />
                {footnote}
              </p>
            )}
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
