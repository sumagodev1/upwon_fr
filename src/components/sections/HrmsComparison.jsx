import { m as motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  HRMS "UpWon vs the Alternatives" — for buyers who do compare. Honest,
  plain-language, no star ratings. Rows chosen around the genuine differentiator:
  workforce shape and connection to a manufacturing core. UpWon HREasy vs an
  office-first HRMS (Keka, greytHR). Shared baseline rows kept in for honesty; the
  gap shows in the factory / contract / connected / whole-business rows.
*/

const EASE = [0.22, 1, 0.3, 1];

const ROWS = [
  { feature: 'Office payroll & statutory compliance', upwon: true, office: true },
  { feature: 'Employee self-service & mobile app', upwon: true, office: true },
  { feature: 'Leave, attendance & OT for desk staff', upwon: true, office: true },
  { feature: 'Multi-shift factory & plant attendance', upwon: true, office: false },
  { feature: 'Contract labour compliance (Factories Act)', upwon: true, office: false },
  { feature: 'Connected to your production / ERP data', upwon: true, office: false },
  { feature: 'One system for office, plant & franchise staff', upwon: true, office: false },
];

const COLS = 'grid grid-cols-[1.5fr_1fr_1fr] md:grid-cols-[1.7fr_1fr_1fr]';

function Cell({ yes, accent }) {
  return (
    <div className="flex items-center justify-center py-4">
      {yes ? (
        <Check
          className={`h-5 w-5 ${accent ? 'text-orange-500' : 'text-navy-500'}`}
          strokeWidth={3}
        />
      ) : (
        <X className="h-5 w-5 text-navy-300" strokeWidth={2.5} />
      )}
    </div>
  );
}

export default function HrmsComparison() {
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
          <Eyebrow className="justify-center">UpWon vs the Alternatives</Eyebrow>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            A Great HR App for Your Office Isn&apos;t the Same as{' '}
            <span className="gradient-text-orange">an HR System for Your Whole Business.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            No star ratings — just the rows that actually differ: the shape of your workforce, and
            whether your HR connects to a manufacturing core.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-12 overflow-hidden rounded-3xl border border-cream-300 shadow-sm"
        >
          {/* Header row */}
          <div className={`${COLS} bg-white`}>
            <div className="px-5 py-5 text-[13px] font-bold uppercase tracking-[0.12em] text-navy-400 md:px-7">
              What your workforce needs
            </div>
            <div className="bg-orange-500 px-3 py-5 text-center">
              <p className="text-[14px] font-bold leading-tight text-white md:text-[15px]">
                UpWon HREasy
              </p>
            </div>
            <div className="px-3 py-5 text-center">
              <p className="text-[14px] font-bold leading-tight text-navy-900 md:text-[15px]">
                Office-First HRMS
              </p>
              <p className="mt-0.5 text-[12px] text-navy-400">Keka, greytHR</p>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
              className={`${COLS} border-t border-cream-200 ${i % 2 === 1 ? 'bg-cream-200/60' : 'bg-white'}`}
            >
              <div className="flex items-center px-5 py-4 text-[14px] font-medium text-navy-800 md:px-7 md:text-[15px]">
                {row.feature}
              </div>
              <div className="bg-orange-50">
                <Cell yes={row.upwon} accent />
              </div>
              <Cell yes={row.office} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
