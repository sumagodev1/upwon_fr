import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { FileCheck, CreditCard, ShieldCheck, Award, Lock, Eye, UserRound } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HexSphere from '../../../../components/shared/HexSphere/HexSphere.jsx';

/*
  POS "Secure, Compliant, Accountable" — clears practical objections around
  payment and billing data before the ask. Evidence over empty security language:
  compliance badges around the UpWon shield, the tools it connects to, and a plain
  data-ownership statement.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';
const TINT = 'rgba(232,90,42,0.1)';

const BADGES_LEFT = [
  { icon: FileCheck, title: 'GST & e-invoice ready', desc: 'Native GST invoicing & e-invoicing.' },
  { icon: ShieldCheck, title: 'ISO-aligned', desc: 'Aligned with global security practices (ISO 27001).' },
];

const BADGES_RIGHT = [
  { icon: CreditCard, title: 'Secure payment handling', desc: 'PCI-compliant secure transactions and settlements.' },
  { icon: Award, title: 'CMM Level 3', desc: 'Documented process rigour & continuous improvement.' },
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

const DATA_ITEMS = [
  { icon: Lock, label: 'You own it.' },
  { icon: ShieldCheck, label: 'You control it.' },
  { icon: Eye, label: 'You decide.' },
];

function Badge({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="grid h-12 w-12 place-items-center rounded-full"
        style={{ background: TINT, color: ORANGE }}
      >
        <Icon className="h-6 w-6" strokeWidth={1.7} />
      </span>
      <p className="mt-2.5 text-[14px] font-bold text-navy-950">{item.title}</p>
      <p className="mt-1 text-[14px] leading-snug text-navy-500">{item.desc}</p>
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

export default function PosSecurity() {
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
          <Eyebrow className="justify-center">Secure, Compliant, Accountable</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            GST-Compliant by Default.{' '}
            <span className="gradient-text-orange">Your Sales Data Stays Yours.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            UpWon POS is built with industry-leading compliance and connects effortlessly with the
            tools you already use.
          </p>
        </motion.div>

        {/* Two panels */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-0">
          {/* Compliant by design */}
          <div className="flex flex-col lg:pr-12">
            <PanelLabel>Compliant by Design</PanelLabel>
            <div className="mt-8 flex flex-1 items-center">
              <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
                <div className="space-y-12">
                  {BADGES_LEFT.map((b) => (
                    <Badge key={b.title} item={b} />
                  ))}
                </div>
                <img
                  src="/images/Compliant%20by%20design.webp"
                  alt="UpWon compliance shield"
                  loading="lazy"
                  decoding="async"
                  className="w-28 shrink-0 md:w-44"
                />
                <div className="space-y-12">
                  {BADGES_RIGHT.map((b) => (
                    <Badge key={b.title} item={b} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Connected to what you already use — the home page globe */}
          <div className="lg:border-l lg:border-cream-300 lg:pl-12">
            <PanelLabel>Connected to What You Already Use</PanelLabel>
            <div ref={wrapRef} className="mt-6 flex justify-center">
              <HexSphere size={sphereSize} nodeCount={nodeCount} logos={SPHERE_LOGOS} />
            </div>
            <p className="mt-2 text-center text-[14px] font-semibold text-navy-500">
              Seamless integrations. <span style={{ color: ORANGE }}>Stronger operations.</span>
            </p>
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
            <img
              src="/images/sec_comp.webp"
              alt="Secure sales dashboard"
              loading="lazy"
              decoding="async"
              className="mx-auto hidden w-40 md:block lg:w-48"
            />

            {/* center text */}
            <div>
              <div className="flex items-start gap-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                  style={{ background: TINT, color: ORANGE }}
                >
                  <UserRound className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="h-display text-xl tracking-tight text-navy-950">
                    Your Data. Your Business.
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-navy-600">
                    Sales and customer data belongs to your business. We never sell, share or use
                    your data for anything else.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream-300 pt-5">
                {DATA_ITEMS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <span key={d.label} className="inline-flex items-center gap-2">
                      <Icon className="h-4 w-4" style={{ color: ORANGE }} strokeWidth={2} />
                      <span className="text-[14px] font-bold text-navy-900">{d.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* right illustration */}
            <img
              src="/images/layer.webp"
              alt="Secure data storage"
              loading="lazy"
              decoding="async"
              className="mx-auto hidden w-40 md:block lg:w-48"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
