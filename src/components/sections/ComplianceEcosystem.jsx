import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { ShieldCheck, FileText, Award, UserRound, Link2 } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import HexSphere from './HexSphere.jsx';

/*
  "Trust Establishers" — clears compliance + integration objections. Two cards:
  built-in compliance (over the built-card artwork) and the connected ecosystem —
  the home page integration globe. Matches the reference layout.
*/

const EASE = [0.22, 1, 0.3, 1];
const COL1_BG = '/images/built%20card%20image.webp';
const BLUE = '#1D6FE0';

const BADGES = [
  { icon: ShieldCheck, title: 'FSSAI-native', sub: 'End-to-end compliance you trust' },
  { icon: FileText, title: 'GST & e-invoice ready', sub: 'Native, not a plug-in' },
  { icon: Award, title: 'ISO-aligned', sub: 'Working toward ISO 27001' },
  { icon: UserRound, title: 'CMMI Level 3', sub: 'Structured for process rigour' },
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

export default function ComplianceEcosystem() {
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
          <Eyebrow className="justify-center">Trust Establishers</Eyebrow>
 <h2 className="mt-4 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Compliant by Design.
            <br />
            <span className="gradient-text-orange">Connected</span> to What You{' '}
            <span className="gradient-text-orange">Already Use.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            FSSAI and GST e-invoice compliance are built into the system, not bolted on — and UPWON
            already connects to the tools your business runs on today, so switching never means
            starting from zero.
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
            style={{ backgroundImage: `url(${COL1_BG})` }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-500/12 text-orange-600">
                <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-navy-900">
                Built-in Compliance
              </p>
            </div>
            <div className="mt-2 h-0.5 w-14 rounded bg-orange-500" />

            <div className="mt-6 flex flex-1 flex-col justify-between gap-3 lg:max-w-[63%]">
              {BADGES.map(({ icon: Icon, title, sub }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 rounded-2xl border border-cream-300 bg-white/90 px-4 py-5 shadow-sm backdrop-blur-sm"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-orange-600">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0 border-l border-cream-300 pl-4">
                    <p className="text-[15px] font-bold text-navy-950">{title}</p>
                    <p className="mt-0.5 text-[14px] leading-snug text-navy-600">{sub}</p>
                  </div>
                </div>
              ))}
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
                style={{ background: `${BLUE}1A`, color: BLUE }}
              >
                <Link2 className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-navy-900">
                Connected Ecosystem
              </p>
            </div>
            <div className="mt-2 h-0.5 w-14 rounded" style={{ background: BLUE }} />

            <div ref={wrapRef} className="grid flex-1 place-items-center py-4">
              <HexSphere size={sphereSize} nodeCount={nodeCount} logos={SPHERE_LOGOS} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
