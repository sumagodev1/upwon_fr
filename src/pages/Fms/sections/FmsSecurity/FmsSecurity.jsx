import { m as motion } from 'framer-motion';
import { FileCheck, KeyRound, BadgeCheck, Award, Database, Lock, ShieldCheck } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  FMS "Secure, Compliant, Accountable" — addresses royalty & franchisee financial
  data sensitivity head-on with evidence, not reassurance. Compliance badges plus
  a data-ownership / franchisee-level access statement, laid over the secure.png
  "hands holding a tablet" artwork.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';
const TINT = 'rgba(232,90,42,0.1)';

const BADGES = [
  { icon: FileCheck, title: 'GST-Compliant Billing', desc: 'Native GST & e-invoicing, not a plugin.' },
  { icon: KeyRound, title: 'Role-Based Access', desc: 'Each franchisee sees only their own data.' },
  { icon: BadgeCheck, title: 'ISO-Aligned', desc: 'Working toward ISO 27001.' },
  { icon: Award, title: 'CMM Level 3', desc: 'Documented process rigour.' },
];

const CONTROL = [
  { icon: Database, title: 'You Own Your Data', desc: 'Export your full network anytime — no lock-in.' },
  { icon: Lock, title: 'Franchisee-Level Access', desc: 'Granular, role-based permissions per outlet and partner.' },
  { icon: ShieldCheck, title: 'Auditable Royalty', desc: 'Every number traces back to real production cost.' },
];

function PanelLabel({ children }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ORANGE }}>
      {children}
    </p>
  );
}

function BadgeCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="rounded-xl border border-cream-200 bg-white p-4 text-center">
      <span
        className="mx-auto grid h-10 w-10 place-items-center rounded-lg"
        style={{ background: TINT, color: ORANGE }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <p className="mt-3 text-[14px] font-bold text-navy-950">{item.title}</p>
      <p className="mt-0.5 text-[14px] leading-snug text-navy-500">{item.desc}</p>
    </div>
  );
}

function ControlRow({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-3">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
        style={{ background: TINT, color: ORANGE }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <div>
        <p className="text-[14px] font-bold text-navy-950">{item.title}</p>
        <p className="mt-0.5 text-[14px] leading-snug text-navy-500">{item.desc}</p>
      </div>
    </div>
  );
}

function CompliantPanel() {
  return (
    <div className="text-center">
      <PanelLabel>Compliant by Design</PanelLabel>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {BADGES.map((b) => (
          <BadgeCard key={b.title} item={b} />
        ))}
      </div>
    </div>
  );
}

function ControlPanel() {
  return (
    <div>
      <PanelLabel>Your Data, Your Control</PanelLabel>
      <div className="mt-3 space-y-3.5">
        {CONTROL.map((c) => (
          <ControlRow key={c.title} item={c} />
        ))}
      </div>
    </div>
  );
}

export default function FmsSecurity() {
  return (
    <section className="relative overflow-hidden bg-[#f9efe9] py-10 md:py-14">
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
            Franchisee Financial Data, Protected.{' '}
            <span className="gradient-text-orange">Royalty Numbers, Defensible.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Role-based access so each franchisee sees only their own data, with royalty calculations
            auditable back to real production cost — evidence over reassurance.
          </p>
        </motion.div>
      </Container>

      {/* Tablet composition — secure.png artwork with overlaid panels (lg+) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mx-auto mt-6 hidden aspect-[3/2] w-full max-w-7xl lg:block"
        style={{
          backgroundImage: "url('/images/secure.webp')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-y-[17%] left-[16%] right-[11%]">
          <div className="grid h-full grid-cols-[1.05fr_0.95fr] items-center gap-8">
            <CompliantPanel />
            <ControlPanel />
          </div>
        </div>
      </motion.div>

      {/* Mobile / tablet — plain white cards */}
      <Container>
        <div className="mt-8 grid gap-4 lg:hidden">
          <div className="rounded-2xl border border-cream-200 bg-white p-6 shadow-sm">
            <CompliantPanel />
          </div>
          <div className="rounded-2xl border border-cream-200 bg-white p-6 shadow-sm">
            <ControlPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
