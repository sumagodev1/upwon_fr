import { m as motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  HRMS "UpWon vs the Alternatives" — for buyers who do compare. Honest,
  plain-language, no star ratings. Rows chosen around the genuine differentiator:
  workforce shape and connection to a manufacturing core. UpWon HREasy vs an
  office-first HRMS (Keka, greytHR). Shared baseline rows kept in for honesty; the
  gap shows in the factory / contract / connected / whole-business rows.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy and grid, written in the shape the API sends so that a CMS
  section and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'UpWon vs the Alternatives';
const HEADING_LINES = [
  [
    { text: "A Great HR App for Your Office Isn't the Same as ", accent: false },
    { text: 'an HR System for Your Whole Business.', accent: true },
  ],
];
const SUBTEXT =
  'No star ratings — just the rows that actually differ: the shape of your workforce, and whether your HR connects to a manufacturing core.';

const LEADER_LABEL = 'What your workforce needs';

const COLUMNS = [
  { id: 'upwon', name: 'UpWon HREasy', description: null, highlight: true },
  { id: 'office', name: 'Office-First HRMS', description: 'Keka, greytHR', highlight: false },
];

/** `cells` lines up with COLUMNS, left to right. */
const ROWS = [
  { feature: 'Office payroll & statutory compliance', cells: [true, true] },
  { feature: 'Employee self-service & mobile app', cells: [true, true] },
  { feature: 'Leave, attendance & OT for desk staff', cells: [true, true] },
  { feature: 'Multi-shift factory & plant attendance', cells: [true, false] },
  { feature: 'Contract labour compliance (Factories Act)', cells: [true, false] },
  { feature: 'Connected to your production / ERP data', cells: [true, false] },
  { feature: 'One system for office, plant & franchise staff', cells: [true, false] },
];

/*
  The leader column is wider than the rest, which are equal. Built as an inline
  style rather than a Tailwind class because the number of columns is content
  now — an arbitrary `grid-cols-[…]` built from a variable would name a class
  nobody generated at build time, and the grid would collapse.
*/
const templateFor = (count) => `1.5fr repeat(${count}, 1fr)`;

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

export default function HrmsComparison({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const leaderLabel = section ? section.leaderLabel : LEADER_LABEL;
  const columns = section && section.columns.length > 0 ? section.columns : COLUMNS;
  const rows = section && section.rows.length > 0 ? section.rows : ROWS;

  const gridStyle = { gridTemplateColumns: templateFor(columns.length) };

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

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-12 overflow-hidden rounded-3xl border border-cream-300 shadow-sm"
        >
          {/* Header row */}
          <div className="grid bg-white" style={gridStyle}>
            <div className="px-5 py-5 text-[13px] font-bold uppercase tracking-[0.12em] text-navy-400 md:px-7">
              {leaderLabel}
            </div>
            {columns.map((column) => (
              <div
                key={column.id}
                className={`px-3 py-5 text-center ${column.highlight ? 'bg-orange-500' : ''}`}
              >
                <p
                  className={`text-[14px] font-bold leading-tight md:text-[15px] ${
                    column.highlight ? 'text-white' : 'text-navy-900'
                  }`}
                >
                  {column.name}
                </p>
                {column.description && (
                  <p
                    className={`mt-0.5 text-[12px] ${
                      column.highlight ? 'text-white/80' : 'text-navy-400'
                    }`}
                  >
                    {column.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
              style={gridStyle}
              className={`grid border-t border-cream-200 ${i % 2 === 1 ? 'bg-cream-200/60' : 'bg-white'}`}
            >
              <div className="flex items-center px-5 py-4 text-[14px] font-medium text-navy-800 md:px-7 md:text-[15px]">
                {row.feature}
              </div>
              {columns.map((column, index) =>
                column.highlight ? (
                  <div key={column.id} className="bg-orange-50">
                    <Cell yes={row.cells[index]} accent />
                  </div>
                ) : (
                  <Cell key={column.id} yes={row.cells[index]} />
                ),
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
