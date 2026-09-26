import { Fragment, useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import HexSphere from '../../../../components/shared/HexSphere/HexSphere.jsx';
import { posIcon } from '../../../../lib/posIcons.js';

/*
  POS "Secure, Compliant, Accountable" — clears practical objections around
  payment and billing data before the ask. Evidence over empty security language:
  compliance badges around the UpWon shield, the tools it connects to, and a plain
  data-ownership statement.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the band the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';
const TINT = 'rgba(232,90,42,0.1)';

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below - icons
  included, which are names here as they are in the payload and resolved
  through posIcon() at render time.
*/
const EYEBROW = 'Secure, Compliant, Accountable';
const HEADING_LINES = [
  [
    { text: 'GST-Compliant by Default. ', accent: false },
    { text: 'Your Sales Data Stays Yours.', accent: true },
  ],
];
const SUBTEXT =
  'UpWon POS is built with industry-leading compliance and connects effortlessly with the tools you already use.';

const PANEL_ONE_LABEL = 'Compliant by Design';
const PANEL_TWO_LABEL = 'Connected to What You Already Use';
const SHIELD_IMAGE = '/images/Compliant%20by%20design.webp';

/* Drawn with an orange half, so it carries the same accent shape a heading does. */
const SPHERE_FOOTNOTE_LINES = [
  [
    { text: 'Seamless integrations. ', accent: false },
    { text: 'Stronger operations.', accent: true },
  ],
];

/*
  One list, split down the middle at render time: the first half sits left of
  the shield and the rest to its right, which is how the two columns were
  written out by hand before.
*/
const BADGES = [
  { icon: 'FileCheck', title: 'GST & e-invoice ready', subtext: 'Native GST invoicing & e-invoicing.' },
  { icon: 'ShieldCheck', title: 'ISO-aligned', subtext: 'Aligned with global security practices (ISO 27001).' },
  { icon: 'CreditCard', title: 'Secure payment handling', subtext: 'PCI-compliant secure transactions and settlements.' },
  { icon: 'Award', title: 'CMM Level 3', subtext: 'Documented process rigour & continuous improvement.' },
];

// Integration logos for the sphere — same assets as the home page globe.
const LOGO_BASE = '/images/platform_integration_client/';
const SPHERE_LOGOS = [
  { src: `${LOGO_BASE}PhonePe.webp`, alt: 'PhonePe' },
  { src: `${LOGO_BASE}Tally.webp`, alt: 'Tally' },
  { src: `${LOGO_BASE}SAP.webp`, alt: 'SAP' },
  { src: `${LOGO_BASE}Oracle.webp`, alt: 'Oracle' },
  { src: `${LOGO_BASE}Dynamics.webp`, alt: 'Microsoft Dynamics 365' },
  { src: `${LOGO_BASE}Tcsion.webp`, alt: 'TCS iON' },
  { src: `${LOGO_BASE}EPSON.webp`, alt: 'EPSON' },
  { src: `${LOGO_BASE}zomato.webp`, alt: 'Zomato' },
  { src: `${LOGO_BASE}swiggy.webp`, alt: 'Swiggy' },
  { src: `${LOGO_BASE}ondc.webp`, alt: 'ONDC' },
  { src: `${LOGO_BASE}unzo.webp`, alt: 'Dunzo' },
  { src: `${LOGO_BASE}paytm.webp`, alt: 'Paytm' },
  { src: `${LOGO_BASE}upi.webp`, alt: 'UPI' },
  { src: `${LOGO_BASE}Gpay.webp`, alt: 'Google Pay' },
  { src: `${LOGO_BASE}BharatPe.webp`, alt: 'BharatPe' },
];

const DATA_ICON = 'UserRound';
const DATA_HEADING = 'Your Data. Your Business.';
const DATA_BODY =
  'Sales and customer data belongs to your business. We never sell, share or use your data for anything else.';
const DATA_LEFT_IMAGE = '/images/sec_comp.webp';
const DATA_RIGHT_IMAGE = '/images/layer.webp';

const ASSURANCES = [
  { icon: 'Lock', label: 'You own it.' },
  { icon: 'ShieldCheck', label: 'You control it.' },
  { icon: 'Eye', label: 'You decide.' },
];

/**
 * The sphere caption's accent tree.
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

function Badge({ item }) {
  const Icon = posIcon(item.icon);
  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="grid h-12 w-12 place-items-center rounded-full"
        style={{ background: TINT, color: ORANGE }}
      >
        <Icon className="h-6 w-6" strokeWidth={1.7} />
      </span>
      <p className="mt-2.5 text-[14px] font-bold text-navy-950">{item.title}</p>
      <p className="mt-1 text-[14px] leading-snug text-navy-500">{item.subtext}</p>
    </div>
  );
}

function PanelLabel({ children }) {
  return (
    <div className="text-center">
      <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-navy-800">{children}</p>
      <span className="mx-auto mt-2 block h-[3px] w-8 rounded-full" style={{ background: ORANGE }} />
    </div>
  );
}

export default function PosSecurity({ section = null }) {
  const wrapRef = useRef(null);
  const [sphereSize, setSphereSize] = useState(360);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.clientWidth || 0;
      setSphereSize(Math.round(Math.max(260, Math.min(w, 440))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodeCount = sphereSize >= 380 ? 160 : 120;

  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const panelOneLabel = section ? section.panelOneLabel : PANEL_ONE_LABEL;
  const panelTwoLabel = section ? section.panelTwoLabel : PANEL_TWO_LABEL;
  const shieldImage = section ? section.shieldImage : SHIELD_IMAGE;
  // Undefined means "no CMS section"; null means one that turned the line off.
  const sphereFootnoteLines = section ? section.sphereFootnoteLines : SPHERE_FOOTNOTE_LINES;
  const badges = section ? section.badges : BADGES;
  const logos = section ? section.logos : SPHERE_LOGOS;
  const dataIcon = section ? section.dataIcon : DATA_ICON;
  const dataHeading = section ? section.dataHeading : DATA_HEADING;
  const dataBody = section ? section.dataBody : DATA_BODY;
  const dataLeftImage = section ? section.dataLeftImage : DATA_LEFT_IMAGE;
  const dataRightImage = section ? section.dataRightImage : DATA_RIGHT_IMAGE;
  const assurances = section ? section.assurances : ASSURANCES;

  // The badges flank the shield: the first half left, the rest right. An odd
  // count puts the extra one on the left, which reads better than a gap.
  const splitAt = Math.ceil(badges.length / 2);
  const badgesLeft = badges.slice(0, splitAt);
  const badgesRight = badges.slice(splitAt);

  const DataIcon = posIcon(dataIcon);

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

        {/* Two panels */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-0">
          {/* Compliant by design */}
          <div className="flex flex-col lg:pr-12">
            <PanelLabel>{panelOneLabel}</PanelLabel>
            <div className="mt-8 flex flex-1 items-center">
              <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
                <div className="space-y-12">
                  {badgesLeft.map((b) => (
                    <Badge key={b.title} item={b} />
                  ))}
                </div>
                {shieldImage && (
                  <img
                    src={shieldImage}
                    alt="UpWon compliance shield"
                    loading="lazy"
                    decoding="async"
                    className="w-28 shrink-0 md:w-44"
                  />
                )}
                <div className="space-y-12">
                  {badgesRight.map((b) => (
                    <Badge key={b.title} item={b} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connected to what you already use — the home page globe */}
          <div className="lg:border-l lg:border-cream-300 lg:pl-12">
            <PanelLabel>{panelTwoLabel}</PanelLabel>
            <div ref={wrapRef} className="mt-6 flex justify-center">
              <HexSphere size={sphereSize} nodeCount={nodeCount} logos={logos} />
            </div>
            {sphereFootnoteLines && sphereFootnoteLines.length > 0 && (
              <p className="mt-2 text-center text-[14px] font-semibold text-navy-500">
                <AccentLine lines={sphereFootnoteLines} />
              </p>
            )}
          </div>
        </div>

        {/* Data ownership strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-10 rounded-3xl border border-cream-300 bg-[#f5f6fa] p-6 md:p-8"
        >
          <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
            {/* left illustration */}
            {dataLeftImage && (
              <img
                src={dataLeftImage}
                alt="Secure sales dashboard"
                loading="lazy"
                decoding="async"
                className="mx-auto hidden w-40 md:block lg:w-48"
              />
            )}

            {/* center text */}
            <div>
              <div className="flex items-start gap-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                  style={{ background: TINT, color: ORANGE }}
                >
                  <DataIcon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="h-display text-xl tracking-tight text-navy-950">
                    {dataHeading}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-navy-600">{dataBody}</p>
                </div>
              </div>

              {assurances.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream-300 pt-5">
                  {assurances.map((d) => {
                    const Icon = posIcon(d.icon);
                    return (
                      <span key={d.label} className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4" style={{ color: ORANGE }} strokeWidth={2} />
                        <span className="text-[14px] font-bold text-navy-900">{d.label}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* right illustration */}
            {dataRightImage && (
              <img
                src={dataRightImage}
                alt="Secure data storage"
                loading="lazy"
                decoding="async"
                className="mx-auto hidden w-40 md:block lg:w-48"
              />
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
