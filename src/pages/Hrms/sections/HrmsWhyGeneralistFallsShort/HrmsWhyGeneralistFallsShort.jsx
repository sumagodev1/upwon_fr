import { m as motion } from 'framer-motion';
import {
  CalendarCheck,
  UserRound,
  FileText,
  Network,
  UsersRound,
  Fingerprint,
  MapPin,
  Users,
  Building2,
  ShieldCheck,
  ChevronsRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  HRMS "Why Generalist HRMS Tools Fall Short" — an honest reframe of the
  competitive set: the category leaders are excellent for an office workforce but
  were never built for a factory floor. A side-by-side contrast — "Built for the
  office" vs. "Built for office + factory floor" — with an "operational gap"
  divider between. Copy stays structural, never a named-competitor claim.
*/

const EASE = [0.22, 1, 0.3, 1];

const OFFICE_ITEMS = [
  { icon: CalendarCheck, label: 'Leave & Attendance' },
  { icon: UserRound, label: 'Employee Self-Service' },
  { icon: FileText, label: 'Office Payroll' },
  { icon: Network, label: 'Standard Workflows' },
];

const FLOOR_ITEMS = [
  { icon: UsersRound, label: 'Multi-Shift Rostering' },
  { icon: Fingerprint, label: 'Biometric Attendance' },
  { icon: MapPin, label: 'Geo-Fencing' },
  { icon: Users, label: 'Contract Workforce' },
  { icon: Building2, label: 'Plant + Office Workforce' },
  { icon: ShieldCheck, label: 'Statutory Compliance' },
];

function Panel({ badge, badgeClass, subtitle, img, items, accent }) {
  return (
    <div className="relative flex flex-col rounded-3xl border border-cream-300 bg-white px-6 pb-6 pt-9 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise">
      {/* Badge tab */}
      <span
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white ${badgeClass}`}
      >
        {badge}
      </span>

      <p className="mb-5 text-center text-[14px] leading-snug text-navy-600">{subtitle}</p>

      <div className="grid flex-1 grid-cols-2 items-center gap-5">
        <img
          src={img}
          alt={badge}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-2xl object-cover"
        />

        <ul className="space-y-3.5">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream-300 bg-white shadow-sm"
                style={{ color: accent }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="text-[14px] font-semibold leading-tight text-navy-900">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HrmsWhyGeneralistFallsShort() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Why Generalist HRMS Tools Fall Short</Eyebrow>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            A Beautiful Leave-Request App Doesn&apos;t Solve a{' '}
            <span className="gradient-text-orange">Three-Shift Factory Floor.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Both category leaders are architected around office-based, laptop-and-mobile attendance
            patterns — neither has native depth in multi-shift factory rostering, contract labour
            compliance under the Factories Act, or a workforce split across a plant and a head
            office.
          </p>
        </motion.div>

        {/* Contrast — office vs. office + factory floor */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]"
        >
          <Panel
            badge="Built for the Office"
            badgeClass="bg-navy-900"
            subtitle="Designed for office teams with standard 9-to-5 work patterns."
            img="/images/built%20for%20the%20office.webp"
            items={OFFICE_ITEMS}
            accent="#1e2a52"
          />

          {/* The operational gap divider */}
          <div className="flex flex-col items-center justify-center gap-3 py-2">
            <div className="h-14 w-px border-l border-dashed border-navy-200" />
            <p className="text-center text-[12px] font-bold uppercase leading-tight tracking-[0.18em] text-navy-500">
              The
              <br />
              Operational
              <br />
              Gap
            </p>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-orange-500 text-white shadow-md">
              <ChevronsRight className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <div className="h-14 w-px border-l border-dashed border-navy-200" />
          </div>

          <Panel
            badge="Built for Office + Factory Floor"
            badgeClass="bg-orange-500"
            subtitle="Built to manage a complex, multi-location and shift-based workforce."
            img="/images/office%20and%20factory.webp"
            items={FLOOR_ITEMS}
            accent="#E85A2A"
          />
        </motion.div>
      </Container>
    </section>
  );
}
