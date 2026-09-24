import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  FMS "UpWon vs the Alternatives" — a prose comparison grid, deliberately not a
  star-rating table: the subtext says so in as many words.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the table the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in content, written in the shape the API sends so that a CMS
  section and the shipped one take one identical path through the render below.

  The column ids are names here where the API sends UUIDs; nothing reads them
  except the cell lookup, so any stable string does.
*/
const EYEBROW = 'UpWon vs the Alternatives';
/*
  The trailing space on the first line is what the hand-written markup emitted
  before this became CMS-driven, and it is kept so the prerendered page is
  unchanged. It sits immediately before a line break, so it draws nothing; the
  authored copy in the CMS has no such space.
*/
const HEADING_LINES = [
  [{ text: 'A POS With a Royalty Feature Is ', accent: false }],
  [{ text: 'Not the Same as a Franchise Operating System.', accent: true }],
];
const SUBTEXT =
  'No star ratings. The rows below match what franchisors rank highest — domain expertise and native ERP / central-kitchen integration, not feature count or AI depth.';
const LEADER_LABEL = 'Criteria';

const COLUMNS = [
  { id: 'upwon', name: 'UpWon', highlight: true },
  { id: 'pos', name: 'Petpooja / POSist', highlight: false },
  { id: 'whatsapp', name: 'WhatsApp + Tally', highlight: false },
];

const ROWS = [
  {
    parameter: 'Hub-spoke central kitchen',
    cells: {
      upwon: 'Central kitchen demand consolidation built-in — production plan auto-generated',
      pos: 'Limited — kitchen module is bolt-on; consolidation manual',
      whatsapp: 'No central kitchen module — WhatsApp orders, Excel planning',
    },
  },
  {
    parameter: 'Outlet POS + back-office',
    cells: {
      upwon: 'Same UI, same data — POS to royalty in one platform',
      pos: 'POS only — back-office is separate integration project',
      whatsapp: 'No POS — third-party billing software needed',
    },
  },
  {
    parameter: 'Royalty automation',
    cells: {
      upwon: 'Auto-calculated from POS daily — franchisee statement on the 1st',
      pos: 'POS data must be exported and reconciled monthly',
      whatsapp: 'Manual calculation; dispute-prone',
    },
  },
  {
    parameter: 'Aggregator integration',
    cells: {
      upwon: 'Swiggy, Zomato, ONDC native — orders + settlement auto-matched',
      pos: 'Aggregator orders need plug-ins per platform',
      whatsapp: 'No integration — settlement reconciled manually',
    },
  },
  {
    parameter: 'Multi-outlet visibility',
    cells: {
      upwon: 'Live across 200+ outlets — sales, stock, KOT throughput',
      pos: 'Visible outlet-by-outlet; consolidation is a report job',
      whatsapp: 'No consolidation — outlets call HQ for status',
    },
  },
  {
    parameter: 'Right fit for',
    cells: {
      upwon: 'Franchise chains 10–500 outlets running CK or hub-spoke',
      pos: 'Single-outlet or small chains with simple menus',
      whatsapp: 'Owner-operated single outlets with no expansion plans',
    },
  },
];

/*
  How a cell is painted.

  Ours is always the warm orange treatment. The others take the competitor
  palette in the order they appear, cycling if a grid ever carries more
  columns than there are tints - which keeps the table legible rather than
  leaving a new column unstyled.
*/
const OURS_CELL = 'bg-[#fffaf5] text-[#986128] font-semibold';
const OURS_BULLET = 'bg-[#f4511e]';

const COMPETITOR_CELLS = ['bg-[#fffdf7] text-navy-700', 'bg-[#fff9fa] text-navy-700'];
const COMPETITOR_BULLETS = ['bg-[#d88b43]', 'bg-[#c84a56]'];

const LEADER_CELL = 'bg-white text-navy-700 font-semibold';

function TableCell({ children, className }) {
  return (
    <td
      className={`border-b border-r border-[#d8dde4] px-5 py-4 text-[13px] leading-[1.55] last:border-r-0 md:px-5 md:py-[17px] ${className}`}
    >
      {children}
    </td>
  );
}

export default function FmsVsAlternatives({ section }) {
  /*
    A published section replaces the built-in one wholesale rather than filling
    in around it: a half-CMS, half-shipped grid would compare columns nobody
    authored against ones somebody did.
  */
  const usable =
    section &&
    section.columns &&
    section.columns.length > 0 &&
    section.rows &&
    section.rows.length > 0;

  const columns = usable ? section.columns : COLUMNS;
  const rows = usable ? section.rows : ROWS;
  const eyebrow = section?.eyebrow ?? EYEBROW;
  const headingLines = section?.headingLines ?? HEADING_LINES;
  const subtext = section?.subtext || SUBTEXT;
  const leaderLabel = section?.leaderLabel || LEADER_LABEL;

  // Worked out once, so every row paints its columns the same way.
  const painted = columns.map((column, index) => {
    const competitorIndex = columns
      .slice(0, index)
      .filter((earlier) => !earlier.highlight).length;
    return {
      ...column,
      cellClass: column.highlight
        ? OURS_CELL
        : COMPETITOR_CELLS[competitorIndex % COMPETITOR_CELLS.length],
      bullet: column.highlight
        ? OURS_BULLET
        : COMPETITOR_BULLETS[competitorIndex % COMPETITOR_BULLETS.length],
    };
  });

  return (
    <section className="relative overflow-hidden bg-[#faf9f7] py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.12] tracking-tight text-navy-950 md:text-[42px]">
            <HeadingLines lines={headingLines} />
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 md:text-base">
            {subtext}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mt-12 max-w-[1280px]"
        >
          <div className="overflow-x-auto rounded-[18px] border border-[#d8dde4] bg-white shadow-[0_10px_40px_rgba(25,35,60,0.04)]">
            <table className="w-full min-w-[1000px] border-collapse">
              {/* Header */}
              <thead>
                <tr>
                  <th className="border-r border-white/20 px-5 py-[15px] text-left text-[10px] font-extrabold uppercase tracking-[0.16em] last:border-r-0 md:px-5 bg-[#1c2442] text-white">
                    {leaderLabel}
                  </th>
                  {painted.map((column) => (
                    <th
                      key={column.id}
                      className={`border-r border-white/20 px-5 py-[15px] text-left text-[10px] font-extrabold uppercase tracking-[0.16em] last:border-r-0 md:px-5 ${
                        column.highlight
                          ? 'bg-[#f4511e] text-white'
                          : 'bg-[#1c2442] text-white'
                      }`}
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {rows.map((row, index) => (
                  <motion.tr
                    key={row.parameter}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: EASE,
                    }}
                    className="transition-colors duration-200"
                  >
                    {/* Criteria */}
                    <TableCell className={LEADER_CELL}>
                      <span className="block max-w-[210px]">{row.parameter}</span>
                    </TableCell>

                    {/* One cell per column, matched by id rather than position */}
                    {painted.map((column) => (
                      <TableCell key={column.id} className={column.cellClass}>
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full ${column.bullet}`}
                          />
                          <span>{row.cells[column.id]}</span>
                        </div>
                      </TableCell>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile hint */}
          <p className="mt-3 text-center text-xs text-navy-400 md:hidden">
            Swipe horizontally to compare all platforms
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
