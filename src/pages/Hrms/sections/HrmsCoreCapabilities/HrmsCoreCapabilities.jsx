import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  HRMS "Core Capabilities" — shows the operational depth without a dry feature
  list. Seven outcome-framed capability cards across the full employee lifecycle,
  each an image + title + one-line outcome. Card grid mirrors the reference: four
  across, the final three centered. Navy/minimalist: flat white cards, navy
  titles, orange kept to the eyebrow + heading accent only.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Core Capabilities';
const HEADING_LINES = [
  [
    { text: 'Everything From Hiring to Exit — ', accent: false },
    { text: 'For Every Kind of Employee You Have.', accent: true },
  ],
];
const SUBTEXT =
  'Every stage of the employee lifecycle — recruit to retire — built for office, plant, field and contract staff alike, not a dry feature list.';

const CAPABILITIES = [
  {
    title: 'Recruitment & Onboarding',
    desc: 'Structured hiring from job description to day one.',
    img: '/images/onboard_core_cap.webp',
  },
  {
    title: 'Attendance & Leave',
    desc: 'Biometric, geo-fencing and multi-shift workflows built in.',
    img: '/images/attendance_core_cap.webp',
  },
  {
    title: 'Payroll & Statutory Compliance',
    desc: 'PF, ESI, PT, TDS calculated and deducted automatically.',
    img: '/images/payroll_core_cap.webp',
  },
  {
    title: 'Employee Self-Service',
    desc: 'Payslips, leave, documents, accessible from a phone.',
    img: '/images/Employee%20Self-Service.webp',
  },
  {
    title: 'Training & Performance',
    desc: 'KRA/KPI definition and review, skill-gap-linked training.',
    img: '/images/training_core_cap.webp',
  },
  {
    title: 'Expense Management',
    desc: 'Claims, receipts and approvals in one workflow.',
    img: '/images/expense_core_cap.webp',
  },
  {
    title: 'Offboarding',
    desc: 'Resignation to full-and-final settlement, structured and compliant.',
    img: '/images/offboard_core_cap.webp',
  },
];

function CapabilityCard({ cap, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: EASE }}
      className="w-full rounded-2xl border border-cream-300 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={cap.img}
          alt={cap.title}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <h3 className="mt-4 px-1 text-[1.05rem] font-bold leading-tight tracking-tight text-navy-950">
        {cap.title}
      </h3>
      <p className="mt-2 px-1 pb-1 text-[14px] leading-snug text-navy-600">{cap.desc}</p>
    </motion.div>
  );
}

export default function HrmsCoreCapabilities({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const capabilities = section && section.cards.length > 0 ? section.cards : CAPABILITIES;

  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-12 md:py-16">
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
          {subtext && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
              {subtext}
            </p>
          )}
        </motion.div>

        {/* Card grid — four across, final three centered */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} i={i} />
          ))}
        </div>

        {/* Footer line */}
        <p className="mt-10 text-center text-[14px] text-navy-500">
          Built to simplify HR. Designed to grow with your business.
        </p>
      </Container>
    </section>
  );
}
