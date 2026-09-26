import { m as motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  POS "UpWon vs the Alternatives" — a capability-by-capability star matrix
  (UpWon POS vs billing-first POS tools). Stars reflect out-of-the-box capability.

  FLAG: competitor names + ratings are a proposed comparison — confirm factual
  accuracy and legal sign-off before publishing named claims.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the grid the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in grid, written in the shape the API sends: columns carry an id
  the rows key their cells by, and a cell holds a rating or a string but never
  both — which is the rule the API enforces too. The closing cost row is a
  SUMMARY row, and that is what tells the renderer to draw words not stars.
*/
const EYEBROW = 'UpWon vs the Alternatives';
const HEADING_LINES = [
  [
    { text: 'A Faster Till Is Not the Same as a ', accent: false },
    { text: "System You Won't Outgrow.", accent: true },
  ],
];
const SUBTEXT =
  'Star ratings reflect out-of-the-box capability, not what can be built with custom development.';
const LEADER_LABEL = 'Capability';

const COLUMNS = [
  { id: 'upwon', name: 'UpWon POS', highlight: true },
  { id: 'petpooja', name: 'Petpooja', highlight: false },
  { id: 'restroworks', name: 'Restroworks', highlight: false },
  { id: 'gofrugal', name: 'GoFrugal', highlight: false },
];

const rated = (upwon, petpooja, restroworks, gofrugal) => ({
  upwon: { content: null, rating: upwon },
  petpooja: { content: null, rating: petpooja },
  restroworks: { content: null, rating: restroworks },
  gofrugal: { content: null, rating: gofrugal },
});

const ROWS = [
  { parameter: 'Recipe-level inventory accuracy', rowType: 'STANDARD', cells: rated(5, 2, 2, 1) },
  { parameter: 'True food cost & margin', rowType: 'STANDARD', cells: rated(5, 2, 3, 1) },
  { parameter: 'FSSAI compliance (native)', rowType: 'STANDARD', cells: rated(5, 3, 3, 2) },
  { parameter: 'GST & e-invoicing (native)', rowType: 'STANDARD', cells: rated(5, 4, 4, 4) },
  { parameter: 'Offline-first billing', rowType: 'STANDARD', cells: rated(5, 4, 3, 4) },
  { parameter: 'Kitchen (KOT / KDS)', rowType: 'STANDARD', cells: rated(5, 5, 5, 3) },
  { parameter: 'Delivery aggregator integration', rowType: 'STANDARD', cells: rated(5, 5, 4, 3) },
  { parameter: 'Loyalty & CRM', rowType: 'STANDARD', cells: rated(4, 4, 4, 3) },
  { parameter: 'Multi-outlet / chain control', rowType: 'STANDARD', cells: rated(5, 3, 4, 4) },
  { parameter: 'Upgrade path into full ERP', rowType: 'STANDARD', cells: rated(5, 1, 0, 2) },
  { parameter: 'Mobile-first / cloud', rowType: 'STANDARD', cells: rated(5, 4, 4, 3) },
  {
    parameter: 'Total Cost of Ownership (3 yr)',
    rowType: 'SUMMARY',
    cells: {
      upwon: { content: 'BEST', rating: null },
      petpooja: { content: 'LOW', rating: null },
      restroworks: { content: 'MEDIUM', rating: null },
      gofrugal: { content: 'LOW-MED', rating: null },
    },
  },
];

/*
  The cost row's colour follows its word rather than its column, because that
  is what it means: BEST is the claim, LOW is a fact about a competitor. An
  editor who writes BEST gets orange without having to know a column rule.
*/
const SUMMARY_TONES = [
  [/^best$/i, 'text-orange-700 bg-orange-100'],
  [/^low/i, 'text-emerald-700 bg-emerald-50'],
  [/^medium$/i, 'text-navy-700 bg-cream-100'],
];
const summaryTone = (text) =>
  SUMMARY_TONES.find(([re]) => re.test((text ?? '').trim()))?.[1] ?? 'bg-cream-100';

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
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < count ? 'fill-orange-500 text-orange-500' : 'text-cream-400'}`}
        />
      ))}
    </span>
  );
}

export default function PosVsAlternatives({ section = null }) {
  /*
    A published grid replaces the built-in one wholesale rather than filling in
    around it: a half-CMS, half-shipped matrix would score competitors nobody
    authored against ones somebody did.
  */
  const columns = section && section.columns.length > 0 ? section.columns : COLUMNS;
  const rows = section && section.rows.length > 0 ? section.rows : ROWS;
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const leaderLabel = section ? section.leaderLabel : LEADER_LABEL;

  const template = `minmax(150px, 1.8fr) repeat(${columns.length}, minmax(70px, 1fr))`;

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />
      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.12] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Star matrix */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-cream-300 bg-white shadow-enterprise [scrollbar-width:thin]">
          <div className="min-w-[560px] md:min-w-[800px]">
            {/* Header */}
            <div className="grid gap-px bg-cream-300" style={{ gridTemplateColumns: template }}>
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

            {/* Rows */}
            {rows.map((row, i) =>
              row.rowType === 'SUMMARY' ? (
                <div
                  key={row.parameter}
                  className="grid gap-px bg-cream-300"
                  style={{ gridTemplateColumns: template }}
                >
                  <div className="sticky left-0 z-10 bg-cream-100 px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                    <p className="text-[14px] font-semibold text-navy-950 sm:text-[14px]">
                      {row.parameter}
                    </p>
                  </div>
                  {columns.map((c) => {
                    const text = row.cells[c.id]?.content ?? null;
                    return (
                      <div
                        key={c.id}
                        className={`flex items-center justify-center px-2 py-3.5 sm:px-3 ${summaryTone(text)}`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] sm:text-[10.5px] sm:tracking-[0.12em]">
                          {text || '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  key={row.parameter}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: (i % 12) * 0.025 }}
                  className="grid gap-px bg-cream-300"
                  style={{ gridTemplateColumns: template }}
                >
                  <div className="sticky left-0 z-10 flex items-center bg-white px-3 py-3.5 shadow-[6px_0_10px_-6px_rgba(15,21,53,0.12)] sm:px-5">
                    <p className="text-[14px] text-navy-900 sm:text-[14px]">{row.parameter}</p>
                  </div>
                  {columns.map((c) => (
                    <div
                      key={c.id}
                      className={`flex items-center justify-center px-2 py-3.5 sm:px-3 ${
                        c.highlight ? 'bg-orange-50' : 'bg-white'
                      }`}
                    >
                      <StarRating count={row.cells[c.id]?.rating ?? 0} />
                    </div>
                  ))}
                </motion.div>
              ),
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
