import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { wmsIcon } from '../../../../lib/wmsIcons.js';

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below — the
  icons as names the lookup resolves, not as imported components.
*/
const EYEBROW = "Let's Talk About Your Warehouse";
const HEADING_LINES = [
  [
    { text: 'See Your Warehouse on UpWon — ', accent: false },
    { text: 'Live, in 30 Minutes.', accent: true },
  ],
];
const SUBTEXT =
  "Let's understand your warehouse, your challenges and your goals. We'll show you the impact UpWon WMS can deliver for your actual operations.";

const IMAGE = '/images/wms_CTA.webp';
const MOBILE_IMAGE = '/images/wms_cta_mb.webp';

const PRIMARY = {
  label: 'Talk to a Warehouse Specialist',
  href: '/demo',
  icon: 'CalendarDays',
};
const SECONDARY = {
  label: 'See How This Fits Your Warehouse',
  href: '/contact',
  icon: 'Package',
};

const TRUST = [
  { icon: 'Package', lineOne: 'Built for modern', lineTwo: 'warehouse operations' },
  { icon: 'ShieldCheck', lineOne: 'Accurate, traceable', lineTwo: 'inventory control' },
  { icon: 'Lock', lineOne: 'Your warehouse data', lineTwo: 'safe and secure' },
  { icon: 'Clock', lineOne: 'Real warehouse insights', lineTwo: 'in just 30 minutes' },
];

export default function WmsCta({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const image = section ? section.image : IMAGE;
  // Null leaves the phone showing the desktop photograph.
  const mobileImage = section ? (section.mobileImage ?? section.image) : MOBILE_IMAGE;
  const primary = section ? section.primary : PRIMARY;
  const secondary = section ? section.secondary : SECONDARY;
  const trust = section && section.trust.length > 0 ? section.trust : TRUST;

  const PrimaryIcon = wmsIcon(primary.icon);
  const SecondaryIcon = secondary ? wmsIcon(secondary.icon) : null;

  return (
    <section className="relative overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative min-h-[580px] overflow-hidden"
      >
        {/* =========================
            BACKGROUND
        ========================== */}
        {/* Absent is a working state: the band falls back to its cream ground. */}
        {image && (
          <picture>
            {mobileImage && <source media="(max-width: 767px)" srcSet={mobileImage} />}
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </picture>
        )}

        {/* =========================
            LEFT SIDE OVERLAY
            Keeps text clearly visible
        ========================== */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5f0]/98 via-[#f8f5f0]/94 via-[42%] to-transparent to-[72%]" />

        {/* Mobile readability overlay */}
        <div className="absolute inset-0 bg-[#f8f5f0]/20 md:hidden" />

        {/* =========================
            CONTENT
        ========================== */}
        <div className="relative flex min-h-[580px] w-full items-center">
          {/* =========================
              FIRST / LEFT COLUMN
              CENTERED IN LEFT AREA
          ========================== */}
          <div className="flex w-full justify-center px-5 py-12 sm:px-8 md:w-[48%] md:px-8 lg:w-[46%] lg:px-10 xl:w-[45%] xl:px-12">
            <div className="w-full max-w-[650px] text-left">
              {/* Eyebrow */}
              {eyebrow && (
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600 md:text-[12px]">
                  {eyebrow}
                </p>
              )}

              {/* Headline */}
              <h2 className="mt-5 max-w-[620px] h-display text-[2rem] leading-[1.08] tracking-tight text-navy-950 md:mt-6 md:text-[2.9rem]">
                <HeadingLines lines={headingLines} accentClassName="text-orange-500" />
              </h2>

              {/* Subtext */}
              {subtext && (
                <p className="mt-4 max-w-[570px] text-[15px] leading-relaxed text-navy-600 md:text-base">
                  {subtext}
                </p>
              )}

              {/* =========================
                  CTA BUTTONS
              ========================== */}
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                {/* Primary CTA */}
                <Link
                  to={primary.href}
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-orange-500 px-6 py-4 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 sm:px-7 sm:text-[15px]"
                >
                  <PrimaryIcon className="h-5 w-5 shrink-0" />

                  <span>{primary.label}</span>

                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Secondary CTA — optional; the band reads fine with one. */}
                {secondary && SecondaryIcon && (
                  <Link
                    to={secondary.href}
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-navy-200 bg-white/75 px-6 py-4 text-[14px] font-semibold text-navy-900 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-400 hover:bg-white sm:px-7 sm:text-[15px]"
                  >
                    <SecondaryIcon className="h-5 w-5 shrink-0" />

                    <span>{secondary.label}</span>

                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>

              {/* =========================
                  TRUST STRIP
              ========================== */}
              <div className="mt-10 grid max-w-[650px] grid-cols-2 gap-y-6 sm:grid-cols-4">
                {trust.map((item, i) => {
                  const Icon = wmsIcon(item.icon);
                  return (
                    <div
                      key={item.lineOne}
                      className={`flex items-center gap-2.5 px-3 ${
                        i === 0 ? 'pl-0' : 'sm:border-l sm:border-navy-900/10'
                      }`}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-orange-200 bg-white text-orange-500">
                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                      </span>

                      <p className="text-left text-[11px] font-semibold leading-[1.35] text-navy-800 md:text-[12px]">
                        {item.lineOne}
                        <br />
                        {item.lineTwo}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}