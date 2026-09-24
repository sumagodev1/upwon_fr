/**
 * "Compliant by Design. Connected to What You Already Use." - the section's
 * built-in content.
 *
 * Written in exactly the shape the CMS returns, so the component renders one
 * thing and never has to know which source it came from. It is the fallback,
 * not the source of truth: the admin panel owns this content, and this copy is
 * what the page shows while the fetch is in flight, during the SSG build, and
 * whenever the API is unreachable.
 *
 * Icons are names rather than components, again matching the API - they are
 * resolved through lib/erpIcons.js at render time.
 */

/** The eyebrow, heading and description above the two panels. */
export const FALLBACK_COPY = {
  eyebrow: 'Trust Establishers',
  headingLines: [
    [
      { text: 'Compliant by Design. ', accent: false },
      { text: 'Connected to What You Already Use.', accent: true },
    ],
  ],
  subtext:
    'FSSAI and GST/e-invoice compliance are built into the system, not bolted on — and UPWON already connects to the tools your business runs on today, so switching never means starting from zero.',
};

/** The two-by-two grid on the left. */
export const FALLBACK_BADGES = [
  { icon: 'ShieldCheck', title: 'FSSAI-native', subtext: 'Dossier auto-generated per batch' },
  { icon: 'FileCheck', title: 'GST & e-invoice ready', subtext: 'Native, not a plugin' },
  { icon: 'BadgeCheck', title: 'ISO-aligned', subtext: 'Working toward ISO 27001' },
  { icon: 'Award', title: 'CMM Level 3', subtext: 'Documented process rigour' },
];

/**
 * The sphere's logos.
 *
 * The same assets the home page globe pins. Published, these come from the one
 * record both pages read, so a partner added in the admin panel appears on
 * both - this copy is only the offline fallback.
 */
const LOGO_BASE = '/images/platform_integration_client/';
export const FALLBACK_LOGOS = [
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
