import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import Container from '../Container/Container.jsx';
import Eyebrow from '../Eyebrow/Eyebrow.jsx';
import HeadingLines from '../HeadingLines/HeadingLines.jsx';
import HexSphere from '../HexSphere/HexSphere.jsx';
import { sfaIcon } from '../../../lib/sfaIcons.jsx';

/*
  "Trust Establishers" — clears compliance + integration objections. Two cards:
  built-in compliance (over the built-card artwork) and the connected ecosystem —
  the home page integration globe. Matches the reference layout.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the copy the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below - icons
  included, which are names here as they are in the payload and resolved
  through sfaIcon() at render time.
*/
const EYEBROW = 'Trust Establishers';
const HEADING_LINES = [
  [{ text: 'Compliant by Design.', accent: false }],
  [
    { text: 'Connected', accent: true },
    { text: ' to What You ', accent: false },
    { text: 'Already Use.', accent: true },
  ],
];
const SUBTEXT =
  'FSSAI and GST e-invoice compliance are built into the system, not bolted on — and UPWON already connects to the tools your business runs on today, so switching never means starting from zero.';

const COL1_BG = '/images/built%20card%20image.webp';
const BLUE = '#1D6FE0';

const COMPLIANCE = {
  label: 'Built-in Compliance',
  icon: 'ShieldCheck',
  backgroundImage: COL1_BG,
};
const ECOSYSTEM = { label: 'Connected Ecosystem', icon: 'Link2', color: BLUE };

const BADGES = [
  { icon: 'ShieldCheck', title: 'FSSAI-native', subtext: 'End-to-end compliance you trust' },
  { icon: 'FileText', title: 'GST & e-invoice ready', subtext: 'Native, not a plug-in' },
  { icon: 'Award', title: 'ISO-aligned', subtext: 'Working toward ISO 27001' },
  { icon: 'UserRound', title: 'CMMI Level 3', subtext: 'Structured for process rigour' },
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

export default function ComplianceEcosystem({ section = null }) {
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
  const badges = section ? section.badges : BADGES;
  const logos = section && section.logos.length > 0 ? section.logos : SPHERE_LOGOS;
  const centreLogo = section ? section.centreLogo : null;

  const compliance = section ? section.compliance : COMPLIANCE;
  const ecosystem = section ? section.ecosystem : ECOSYSTEM;

  const ComplianceIcon = sfaIcon(compliance.icon);
  const EcosystemIcon = sfaIcon(ecosystem.icon);

  return (
    <section className="relative overflow-hidden bg-[#eef1f7] py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-30" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}
 <h2 className="mt-4 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
          {/* Column 1 — Built-in compliance (over artwork) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col overflow-hidden rounded-3xl border border-cream-300 bg-[#fdf4ee] bg-cover bg-right p-6 shadow-sm md:p-8"
            // Without artwork the panel keeps its cream ground, which is a
            // design rather than a hole.
            style={
              compliance.backgroundImage
                ? { backgroundImage: `url(${compliance.backgroundImage})` }
                : undefined
            }
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-500/12 text-orange-600">
                <ComplianceIcon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-navy-900">
                {compliance.label}
              </p>
            </div>
            <div className="mt-2 h-0.5 w-14 rounded bg-orange-500" />

            <div className="mt-6 flex flex-1 flex-col justify-between gap-3 lg:max-w-[63%]">
              {badges.map((badge) => {
                const Icon = sfaIcon(badge.icon);
                return (
                  <div
                    key={badge.title}
                    className="flex items-center gap-4 rounded-2xl border border-cream-300 bg-white/90 px-4 py-5 shadow-sm backdrop-blur-sm"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-orange-600">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <div className="min-w-0 border-l border-cream-300 pl-4">
                      <p className="text-[15px] font-bold text-navy-950">{badge.title}</p>
                      <p className="mt-0.5 text-[14px] leading-snug text-navy-600">
                        {badge.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2 — Connected ecosystem diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="flex flex-col overflow-hidden rounded-3xl border border-cream-300 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-full"
                // The accent at ten percent, as an eight-digit hex rather than
                // an rgba() conversion - one fewer step between the stored
                // value and the rendered one.
                style={{ background: `${ecosystem.color}1A`, color: ecosystem.color }}
              >
                <EcosystemIcon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-navy-900">
                {ecosystem.label}
              </p>
            </div>
            <div className="mt-2 h-0.5 w-14 rounded" style={{ background: ecosystem.color }} />

            <div ref={wrapRef} className="grid flex-1 place-items-center py-4">
              <HexSphere
                size={sphereSize}
                nodeCount={nodeCount}
                logos={logos}
                // Left undefined when unset, so the sphere keeps its own default
                // rather than being handed an explicit null to work around.
                {...(centreLogo ? { logoSrc: centreLogo } : {})}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
