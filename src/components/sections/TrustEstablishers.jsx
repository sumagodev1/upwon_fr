import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { ShieldCheck, FileCheck, BadgeCheck, Award } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import HexSphere from './HexSphere.jsx';

/*
  "Trust Establishers" — clears the final practical objections (security,
  compliance, fit with existing tools) before the page asks for a conversation.
  Kept deliberately simple — a credibility strip, not a hero moment.
*/

const EASE = [0.22, 1, 0.3, 1];

const BADGES = [
  { icon: ShieldCheck, title: 'FSSAI-native', sub: 'Dossier auto-generated per batch' },
  { icon: FileCheck, title: 'GST & e-invoice ready', sub: 'Native, not a plugin' },
  { icon: BadgeCheck, title: 'ISO-aligned', sub: 'Working toward ISO 27001' },
  { icon: Award, title: 'CMM Level 3', sub: 'Documented process rigour' },
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

export default function TrustEstablishers() {
  const wrapRef = useRef(null);
  const [sphereSize, setSphereSize] = useState(360);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.clientWidth || 0;
      setSphereSize(Math.round(Math.max(260, Math.min(w, 420))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodeCount = sphereSize >= 380 ? 160 : 120;

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Trust Establishers</Eyebrow>
          <h2 className="mt-3 h-display text-balance text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Compliant by Design.{' '}
            <span className="gradient-text-orange">Connected to What You Already Use.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            FSSAI and GST/e-invoice compliance are built into the system, not bolted on — and UPWON
            already connects to the tools your business runs on today, so switching never means
            starting from zero.
          </p>
        </motion.div>

        {/* Panels */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2 lg:items-stretch">
          {/* Compliance badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col"
          >
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">
              Compliant by design
            </p>
            <div className="mt-5 grid flex-1 grid-cols-1 place-content-center gap-3 sm:grid-cols-2">
              {BADGES.map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-xl border border-cream-300 bg-white p-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-orange-600">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-navy-950">{title}</p>
                    <p className="mt-0.5 text-[14px] leading-snug text-navy-600">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Integration sphere — the home page globe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">
              Connected to what you already use
            </p>
            <div ref={wrapRef} className="mt-3 flex justify-center">
              <HexSphere size={sphereSize} nodeCount={nodeCount} logos={SPHERE_LOGOS} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
