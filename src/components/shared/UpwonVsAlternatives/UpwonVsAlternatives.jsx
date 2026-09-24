import { m as motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '../Container/Container.jsx';
import Eyebrow from '../Eyebrow/Eyebrow.jsx';
import HeadingLines from '../HeadingLines/HeadingLines.jsx';

/*
  "UpWon vs the Alternatives" (SFA-DMS) — a star-rating capability matrix
  (same visual system as the ERP ComparisonMatrix): UpWon against the standalone
  SFA / DMS point solutions field teams usually stitch together.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the table the site ships.

  The competitor names and the scores were a positioning proposal pending
  sign-off. They are the CMS's now, which is the point: confirming or adjusting
  them is an edit rather than a deploy.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in table, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below. Cells
  are keyed by column id there and by column key here; both are just strings to
  the lookup, so nothing downstream has to know which it is holding.
*/
const EYEBROW = 'UpWon vs the Alternatives';
const HEADING_LINES = [
  [
    { text: 'A Smarter App for Your Field Team Is Not the Same as ', accent: false },
    { text: 'One Connected System.', accent: true },
  ],
];
const SUBTEXT =
  'Out-of-the-box capability, rated capability by capability — UpWon against the standalone SFA / DMS point solutions field teams usually stitch together.';

const LEADER_LABEL = 'Capability';

// Column order: UpWon first, then the standalone SFA-DMS point solutions.
const COLS = [
  { id: 'upwon', name: 'UpWon', highlight: true },
  { id: 'c1', name: 'Bizom', highlight: false },
  { id: 'c2', name: 'FieldAssist', highlight: false },
  { id: 'c3', name: 'Ivy Mobility', highlight: false },
];

// Each row: capability + a star score per column (0 = not available natively → dash).
const ROWS = [
  { parameter: 'Shares one data model with your ERP', ratings: { upwon: 5, c1: 1, c2: 1, c3: 2 } },
  {
    parameter: 'Food & FMCG batch, expiry & FEFO built in',
    ratings: { upwon: 5, c1: 2, c2: 2, c3: 1 },
  },
  { parameter: 'GT + MT distribution (India model)', ratings: { upwon: 5, c1: 4, c2: 4, c3: 3 } },
  {
    parameter: 'Secondary sales — no exports, no reconciliation',
    ratings: { upwon: 5, c1: 3, c2: 3, c3: 2 },
  },
  {
    parameter: 'Distributor claims & scheme settlement',
    ratings: { upwon: 5, c1: 3, c2: 3, c3: 3 },
  },
  {
    parameter: 'Mobile-first field app (works offline)',
    ratings: { upwon: 5, c1: 4, c2: 4, c3: 4 },
  },
  {
    parameter: 'Route / beat planning & optimization',
    ratings: { upwon: 5, c1: 4, c2: 3, c3: 3 },
  },
  { parameter: 'Retailer e-ordering app', ratings: { upwon: 5, c1: 3, c2: 3, c3: 2 } },
  { parameter: 'Van sales / direct store delivery', ratings: { upwon: 4, c1: 3, c2: 2, c3: 2 } },
  { parameter: 'AI / demand forecasting', ratings: { upwon: 4, c1: 2, c2: 2, c3: 1 } },
  {
    parameter: 'One connected system, field to finance',
    ratings: { upwon: 5, c1: 1, c2: 1, c3: 1 },
  },
];

// 3-year total cost of ownership summary per column.
const SUMMARY = {
  parameter: 'Total Cost of Ownership (3 yr)',
  cells: {
    upwon: { label: 'BEST', tone: 'BEST' },
    c1: { label: 'MEDIUM', tone: 'NEUTRAL' },
    c2: { label: 'MEDIUM', tone: 'NEUTRAL' },
    c3: { label: 'LOW-MED', tone: 'GOOD' },
  },
};

/*
  The three tones a summary badge can be drawn in. Named rather than authored as
  colours, so the table can only ever use the site's own palette.
*/
const TONE_CLASS = {
  BEST: 'text-orange-700 bg-orange-100',
  NEUTRAL: 'text-navy-700 bg-cream-100',
  GOOD: 'text-emerald-700 bg-emerald-50',
};

const gridStyle = (columnCount) => ({
  gridTemplateColumns: `minmax(140px, 1.6fr) repeat(${columnCount}, minmax(64px, 1fr))`,
});

function StarRating({ count }) {
  if (!count) {
    return (
      <span
        className="inline-flex items-center justify-center text-[14px] font-semibold text-navy-300"
        aria-label="Not available natively"
      >
        —
      </span>
    );
  }
  const total = 5;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < count ? 'fill-orange-500 text-orange-500' : 'text-cream-400'}`}
        />
      ))}
    </span>
  );
}

export default function UpwonVsAlternatives({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const leaderLabel = section ? section.leaderLabel : LEADER_LABEL;
  const columns = section ? section.columns : COLS;
  const rows = section ? section.rows : ROWS;
  const summary = section ? section.summary : SUMMARY;

  // The template is computed from the column count, so adding a competitor in
  // the admin panel widens the table without a change here.
  const GRID = gridStyle(columns.length);

  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-24">
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
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Capability matrix */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-cream-300 bg-white shadow-enterprise [scrollbar-width:thin]">
          <div className="min-w-[560px] md:min-w-[820px]">
            {/* Header row */}
            <div className="grid gap-px bg-cream-300" style={GRID}>
              <div className="sticky left-0 z-20 bg-navy-950 px-3 py-4 shadow-[6px_0_10px_-6px_rgba(0,0,0,0.25)] sm:px-5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                  {leaderLabel}
                </p>
              </div>
              {columns.map((c) => (
                <div
                  key={c.id}
                  className={`px-2 py-4 text-center sm:px-3 ${
                    c.highlight ? 'bg-orange-500 text-white' : 'bg-navy-950 text-white'
                  }`}
                >
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] sm:text-[11px]">
                    {c.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Capability rows */}
            {rows.map((row, i) => (
              <motion.div
                key={row.parameter}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 12) * 0.025 }}
                className="grid gap-px bg-cream-300"
                style={GRID}
              >
                <div className="sticky left-0 z-10 flex items-center bg-white px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                  <p className="text-[14px] text-navy-900">{row.parameter}</p>
                </div>
                {columns.map((c) => (
                  <div
                    key={c.id}
                    className={`flex items-center justify-center px-2 py-3.5 sm:px-3 ${
                      c.highlight ? 'bg-orange-50' : 'bg-white'
                    }`}
                  >
                    <StarRating count={row.ratings[c.id]} />
                  </div>
                ))}
              </motion.div>
            ))}

            {/* Closing summary row */}
            {summary && (
              <div className="grid gap-px bg-cream-300" style={GRID}>
                <div className="sticky left-0 z-10 bg-cream-100 px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                  <p className="text-[14px] font-semibold text-navy-950">{summary.parameter}</p>
                </div>
                {columns.map((c) => {
                  const cell = summary.cells[c.id];
                  return (
                    <div
                      key={c.id}
                      className={`flex items-center justify-center px-2 py-3.5 sm:px-3 ${
                        (cell && TONE_CLASS[cell.tone]) || 'bg-cream-100'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] sm:text-[10.5px] sm:tracking-[0.12em]">
                        {cell?.label || '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-navy-600">
          <span className="inline-flex items-center gap-1.5">
            <StarRating count={5} /> Best in class
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StarRating count={3} /> Good
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StarRating count={1} /> Minimal
          </span>
          <span className="text-navy-400">— Not available natively</span>
        </div>
      </Container>
    </section>
  );
}
