import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  POS "Module Versions & Growth Path" — a low-risk entry point and a visible
  upgrade path, addressing the fear of outgrowing a system. Three tiers as
  pricing-style cards (middle highlighted). "Talk to us" instead of prices.

  FLAG: proposed structure — needs product & pricing sign-off before publishing.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the row the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Module Versions & Growth Path';
const HEADING_LINES = [
  [
    { text: 'Start With Billing. ', accent: false },
    { text: 'Grow Into Your Full Kitchen and Stock.', accent: true },
  ],
];
const SUBTEXT =
  'POS that fits a single counter or a 1,000-outlet chain — same UI, same reliability. Start small and switch modules on as you grow.';

/* The growth-path line, in the same accent grammar the headings use. */
const FOOTNOTE_LINES = [
  [
    { text: 'Start with Core today. Move to Plus — or into full UpWon ERP — ', accent: false },
    { text: 'without re-entering a single record.', accent: true },
  ],
];

const BUTTON = { label: 'Talk to us', href: '/demo' };

const TIERS = [
  {
    slug: 'core',
    name: 'Core',
    lead: 'Essential counter billing',
    tagline: 'Single outlet or up to 10 counters',
    scope: 'Up to 10 counters',
    inheritsLabel: 'Includes',
    buttonLabel: BUTTON.label,
    buttonHref: BUTTON.href,
    isPopular: false,
    features: [
      'Cloud POS — touch, barcode & weighing',
      'Multi-tender billing — cash, card, UPI, wallet',
      'GST-compliant invoicing',
      'Item & category management',
      'Daily sales & Z-reports',
      'Offline-first reliability',
    ],
  },
  {
    slug: 'pro',
    name: 'Pro',
    lead: 'Kitchen, loyalty & delivery',
    tagline: '10–100 counters across outlets',
    scope: 'Up to 100 counters',
    inheritsLabel: 'Everything in Core, plus',
    buttonLabel: BUTTON.label,
    buttonHref: BUTTON.href,
    isPopular: true,
    features: [
      'KOT & Kitchen Display',
      'Table & order management',
      'Loyalty & repeat-customer tracking',
      'Discounts, offers & combos',
      'Delivery aggregator integration (Zomato, Swiggy, ONDC)',
      'Multi-counter, multi-outlet billing',
    ],
  },
  {
    slug: 'plus',
    name: 'Plus',
    lead: 'Inventory, analytics & upgrade path',
    tagline: '100+ counters or chain-wide POS',
    scope: 'Unlimited',
    inheritsLabel: 'Everything in Pro, plus',
    buttonLabel: BUTTON.label,
    buttonHref: BUTTON.href,
    isPopular: false,
    features: [
      'Recipe-level inventory deduction',
      'Purchase & vendor management',
      'Multi-outlet dashboard & analytics',
      'Central kitchen & stock transfers',
      'Role-based access & audit trail',
      'Direct upgrade path into UpWon ERP & FMS',
    ],
  },
];

/**
 * The growth-path line's accent tree.
 *
 * Not HeadingLines: that draws its accent with the `gradient-text-orange`
 * class, and this line is a flat inline orange. Same parsed shape, one
 * different span — so the markup here is exactly what the section shipped.
 */
function AccentLine({ lines }) {
  return lines.map((parts, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {parts.map((part, partIndex) =>
        part.accent ? (
          <span key={partIndex} style={{ color: ORANGE }}>
            {part.text}
          </span>
        ) : (
          <Fragment key={partIndex}>{part.text}</Fragment>
        ),
      )}
    </Fragment>
  ));
}

export default function PosGrowthPath({ section = null }) {
  /*
    A published section replaces the built-in one wholesale rather than filling
    in around it: a half-CMS, half-shipped row would compare tiers nobody
    authored against ones somebody did.
  */
  const tiers = section && section.tiers && section.tiers.length > 0 ? section.tiers : TIERS;
  const eyebrow = section?.eyebrow ?? EYEBROW;
  const headingLines = section?.headingLines ?? HEADING_LINES;
  const subtext = section?.subtext || SUBTEXT;
  // Undefined means "no CMS section"; null means one that turned the line off.
  const footnoteLines = section ? section.footnoteLines : FOOTNOTE_LINES;

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className={`relative flex flex-col rounded-3xl border p-7 md:p-8 ${
                t.isPopular
                  ? 'border-orange-300 bg-orange-50/70 shadow-enterprise'
                  : 'border-cream-300 bg-white shadow-sm'
              }`}
            >
              {t.isPopular && (
                <span
                  className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white"
                  style={{ background: ORANGE }}
                >
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Most Popular
                </span>
              )}

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-500">
                {t.name}
              </p>
              <h3 className="mt-3 h-display text-[1.5rem] leading-tight tracking-tight text-navy-950 md:min-h-[3.75rem]">
                {t.lead}
              </h3>
              <p className="mt-2 text-[14px] text-navy-500">{t.tagline}</p>
              <span className="mt-4 inline-flex w-fit rounded-full border border-cream-300 bg-white px-3 py-1.5 text-[14px] font-bold text-navy-800">
                {t.scope}
              </span>

              <div className="mt-6 border-t border-cream-300 pt-6">
                {t.inheritsLabel && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-500">
                    {t.inheritsLabel}
                  </p>
                )}
                <ul className="mt-4 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-navy-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ORANGE }} strokeWidth={2.6} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  to={t.buttonHref}
                  className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition-colors ${
                    t.isPopular
                      ? 'text-white'
                      : 'border border-navy-300 text-navy-900 hover:bg-navy-900/5'
                  }`}
                  style={t.isPopular ? { background: ORANGE } : undefined}
                >
                  {t.buttonLabel}
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth-path line */}
        {footnoteLines && footnoteLines.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mx-auto mt-10 max-w-2xl text-center text-[14.5px] font-semibold text-navy-800"
          >
            <AccentLine lines={footnoteLines} />
          </motion.p>
        )}
      </Container>
    </section>
  );
}
