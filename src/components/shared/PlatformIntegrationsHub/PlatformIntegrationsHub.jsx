import { useEffect, useRef, useState } from 'react';
import Container from '../Container/Container.jsx';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import HexSphere from '../HexSphere/HexSphere.jsx';

// --- Config ----------------------------------------------------------------
// Everything below is data-driven so real assets can be swapped in later.

// Brand logos live in /public/images/platform_integration_client.
const LOGO_BASE = '/images/platform_integration_client/';

// Enterprise systems / accounting / hardware stack (rings the left half).
const LEFT_LOGOS = [
  { src: `${LOGO_BASE}PhonePe.webp`, alt: 'PhonePe' },
  { src: `${LOGO_BASE}Tally.webp`, alt: 'Tally' },
  { src: `${LOGO_BASE}SAP.webp`, alt: 'SAP' },
  { src: `${LOGO_BASE}Oracle.webp`, alt: 'Oracle' },
  { src: `${LOGO_BASE}Dynamics.webp`, alt: 'Microsoft Dynamics 365' },
  { src: `${LOGO_BASE}Tcsion.webp`, alt: 'TCS iON' },
  { src: `${LOGO_BASE}EPSON.webp`, alt: 'EPSON' },
  { src: `${LOGO_BASE}eSSL.webp`, alt: 'eSSL' },
];

// Commerce / payments / delivery stack (rings the right half).
const RIGHT_LOGOS = [
  { src: `${LOGO_BASE}zomato.webp`, alt: 'Zomato' },
  { src: `${LOGO_BASE}swiggy.webp`, alt: 'Swiggy' },
  { src: `${LOGO_BASE}ondc.webp`, alt: 'ONDC' },
  { src: `${LOGO_BASE}unzo.webp`, alt: 'Dunzo' },
  { src: `${LOGO_BASE}paytm.webp`, alt: 'Paytm' },
  { src: `${LOGO_BASE}upi.webp`, alt: 'UPI' },
  { src: `${LOGO_BASE}Gpay.webp`, alt: 'Google Pay' },
  { src: `${LOGO_BASE}BharatPe.webp`, alt: 'BharatPe' },
];

const ALL_LOGOS = [...LEFT_LOGOS, ...RIGHT_LOGOS];

// --- Section ---------------------------------------------------------------

export default function PlatformIntegrationsHub({
  eyebrow = 'Platform Integrations',
  title = (
    <>
      One Platform. Connected to Your Entire {' '}
      <span className="gradient-text-orange">Business.</span>
    </>
  ),
  description = 'UPWON seamlessly integrates with the systems you already use—ERP, POS, accounting, payments, CRM, analytics, and plant-floor devices—bringing everything together in one unified platform with a single source of truth.',
  // The brand marks pinned to the sphere, and the mark at its core. Both
  // default to what the section ships, so a caller that overrides only the
  // copy — the FMS page does — keeps the built-in set.
  logos = ALL_LOGOS,
  centreLogoSrc = undefined,
} = {}) {
  // One sphere for every device. Sized to the LESSER of the available width and
  // ~55% of the viewport height, so the whole section fits in a single view on
  // desktop, laptop, tablet and mobile without scrolling.
  const wrapRef = useRef(null);
  const [sphereSize, setSphereSize] = useState(420);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.clientWidth || 0;
      const h = window.innerHeight || 800;
      setSphereSize(Math.round(Math.max(260, Math.min(w, h * 0.74, 640))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const nodeCount = sphereSize >= 500 ? 190 : sphereSize >= 340 ? 150 : 110;

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14">
      {/* Section background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/integration_background.webp)' }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — heading + copy. */}
          <SectionHeading
            className="min-w-0 items-center text-center lg:items-start lg:text-left"
            align="left"
            variant="light"
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleClassName="tracking-tight"
          />

          {/* Right — the responsive integration sphere. */}
          <div ref={wrapRef} className="w-full min-w-0">
            <HexSphere
              size={sphereSize}
              nodeCount={nodeCount}
              logos={logos}
              {...(centreLogoSrc ? { logoSrc: centreLogoSrc } : {})}
            />
          </div>
        </div>

    
      </Container>
    </section>
  );
}
