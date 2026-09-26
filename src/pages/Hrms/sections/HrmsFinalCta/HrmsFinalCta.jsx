import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { hreasyIcon } from '../../../../lib/hreasyIcons.js';

/*
  HRMS "Final CTA" — converts accumulated confidence into a low-pressure next
  step. An invitation to a conversation about the buyer's actual workforce, not a
  demo-request form. Centred CTA band over the workforce banner image, with a
  no-pressure micro-trust line and a supporting trust strip.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below - icons
  included, which are names here as they are in the payload and resolved
  through hreasyIcon() at render time.
*/
const EYEBROW = "Let's Talk About Your Workforce";
const HEADING_LINES = [
  [
    { text: 'See Your Whole Workforce on One System — ', accent: false },
    { text: 'Live, in 30 Minutes.', accent: true },
  ],
];
const SUBTEXT =
  "A conversation about your people, your process and your goals. We'll show you what's possible — for your actual workforce.";
const IMAGE = '/images/hrms_cta.webp';

const PRIMARY = {
  label: 'Talk to an HR Systems Specialist',
  href: '/demo',
  icon: 'CalendarDays',
};
const SECONDARY = {
  label: 'See How This Fits Your Workforce',
  href: '/demo',
  icon: 'Users',
};

const TRUST = [
  { icon: 'Users', lineOne: 'Built for factories,', lineTwo: 'offices & field teams' },
  { icon: 'ShieldCheck', lineOne: 'Trusted by businesses', lineTwo: 'across industries' },
  { icon: 'Lock', lineOne: 'Your data is safe', lineTwo: 'and confidential' },
  { icon: 'Clock', lineOne: 'Real-world insights', lineTwo: 'in just 30 minutes' },
];

export default function HrmsFinalCta({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const image = section ? section.image : IMAGE;
  const primary = section ? section.primary : PRIMARY;
  // Null means a CMS band that turned the second button off, which is allowed.
  const secondary = section ? section.secondary : SECONDARY;
  const trust = section ? section.trust : TRUST;

  const PrimaryIcon = hreasyIcon(primary.icon);
  const SecondaryIcon = secondary ? hreasyIcon(secondary.icon) : null;

  return (
    <section className="relative overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative overflow-hidden"
      >
        {/* Banner background */}
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-5 py-16 text-center md:px-10 md:py-20">
            {/* Eyebrow */}
            {eyebrow && (
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-orange-600">
                {eyebrow}
              </p>
            )}

            {/* Headline */}
            <h2 className="mx-auto mt-6 max-w-3xl h-display text-[2rem] leading-[1.08] tracking-tight text-navy-950 md:text-[2.9rem]">
              {/*
                This band's accent is a flat orange, not the gradient the other
                headings use, so it names its own class.
              */}
              <HeadingLines lines={headingLines} accentClassName="text-orange-500" />
            </h2>

            {/* Subtext */}
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
              {subtext}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to={primary.href}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <PrimaryIcon className="h-5 w-5" />
                {primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {secondary && SecondaryIcon && (
                <Link
                  to={secondary.href}
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-navy-200 bg-white/70 px-7 py-4 text-[15px] font-semibold text-navy-900 backdrop-blur transition-colors hover:border-navy-400 hover:bg-white"
                >
                  <SecondaryIcon className="h-5 w-5" />
                  {secondary.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>

            {/* Trust strip */}
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-y-6 sm:grid-cols-4">
              {trust.map((item, i) => {
                const Icon = hreasyIcon(item.icon);
                return (
                <div
                  key={item.lineOne}
                  className={`flex items-center justify-center gap-2.5 px-3 ${
                    i > 0 ? 'sm:border-l sm:border-navy-900/10' : ''
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-orange-200 bg-white text-orange-500">
                    <Icon className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <p className="text-left text-[12px] font-semibold leading-tight text-navy-800">
                    {item.lineOne}
                    <br />
                    {item.lineTwo}
                  </p>
                </div>
                );
              })}
            </div>
        </div>
      </motion.div>
    </section>
  );
}
