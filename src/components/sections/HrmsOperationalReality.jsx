import { m as motion } from 'framer-motion';
import { ClipboardList, Calculator, Landmark, Share2 } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  HRMS "Operational Reality" — mirrors the founder / HR head's actual week back
  to them: the lived reality before a proper HRMS. Four pain-point cards, each
  with a themed accent, a bullet list of the pain, and a supporting illustration.
  Colours follow the reference (orange / blue / green / purple) so each pain
  reads as its own category; eyebrow + headline accent stay orange per system.
*/

const EASE = [0.22, 1, 0.3, 1];

const CARDS = [
  {
    num: '01',
    icon: ClipboardList,
    accent: '#E85A2A',
    tint: 'rgba(232,90,42,0.12)',
    title: 'Manual / Paper Plant Attendance',
    img: '/images/mannual%20attendance.webp',
    points: [
      'Attendance captured on paper or basic devices.',
      'Missing punches and manual corrections create chaos.',
      'Shift-wise tracking is inaccurate and incomplete.',
    ],
  },
  {
    num: '02',
    icon: Calculator,
    accent: '#3B82F6',
    tint: 'rgba(59,130,246,0.12)',
    title: 'Payroll Reconciliation Takes Days',
    img: '/images/payroll.webp',
    points: [
      'Attendance, overtime, leaves and allowances matched manually.',
      'Multiple spreadsheets and endless cross-checking.',
      'Payroll finalization delayed by 2–3 days.',
    ],
  },
  {
    num: '03',
    icon: Landmark,
    accent: '#10B981',
    tint: 'rgba(16,185,129,0.12)',
    title: 'Statutory Compliance Uncertainty',
    img: '/images/statutory%20compliance%20uncertainty.webp',
    points: [
      'Different state rules, due dates and calculations.',
      'High risk of errors, penalties and last-minute rush.',
      'Compliance handled reactively, not proactively.',
    ],
  },
  {
    num: '04',
    icon: Share2,
    accent: '#8B5CF6',
    tint: 'rgba(139,92,246,0.12)',
    title: 'HR Data Split Across Multiple Tools',
    img: '/images/hr%20diferent%20tool.webp',
    points: [
      'Office staff in one system, plant staff in another.',
      'Contractors and workers in spreadsheets or paper.',
      'No single source of truth for HR data.',
    ],
  },
];

function Card({ card, i }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: EASE }}
      className="rounded-3xl border border-cream-300 bg-white p-6 shadow-sm md:p-7"
    >
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        {/* Text */}
        <div>
          <div className="flex items-start gap-4">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
              style={{ background: card.tint, color: card.accent }}
            >
              <Icon className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <div>
              <p className="num-display text-lg" style={{ color: card.accent }}>
                {card.num}
              </p>
              <h3 className="mt-1 h-display text-[1.35rem] leading-tight tracking-tight text-navy-950">
                {card.title}
              </h3>
            </div>
          </div>

          <span
            className="mt-4 block h-[3px] w-10 rounded-full"
            style={{ background: card.accent }}
          />

          <ul className="mt-5 space-y-3">
            {card.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: card.accent }}
                />
                <span className="text-[14px] leading-snug text-navy-600">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Illustration */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={card.img}
            alt={card.title}
            loading="lazy"
            decoding="async"
            className="w-full object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function HrmsOperationalReality() {
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
          <Eyebrow className="justify-center">Operational Reality</Eyebrow>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Grow your organization beyond{' '}
            <span className="gradient-text-orange">Manual Practice,</span> Excel &amp; Spreadsheets
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            The lived reality before a proper HRMS: manual or semi-digital attendance at the plant,
            payroll calculated with spreadsheets, statutory compliance handled reactively, and data
            split across multiple disconnected tools.
          </p>
        </motion.div>

        {/* 2×2 pain-point cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CARDS.map((card, i) => (
            <Card key={card.num} card={card} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
