import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  HRMS Proof Strip — de-risks the visit with real, named-client numbers rather
  than an inflated aggregate user count (Keka / greytHR headline war). A
  continuously-scrolling bento of MIXED-SIZE cards (Clay-style): wide named-proof
  cards, tall logo cards and stacked stat/logo pairs. Navy/minimalist system:
  flat white cards on a warm cream panel, navy stat figures, orange kept to the
  eyebrow + heading + client tags only.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Proof Strip';
const HEADING_LINES = [
  [
    { text: 'UpWon HRMS — ', accent: false },
    { text: "Just What's Already Running.", accent: true },
  ],
];
const SUBTEXT =
  'Real, named-client proof from live deployments — not an inflated aggregate user count to win a headline war.';

const L = {
  monginis: { kind: 'LOGO', name: 'Monginis', image: '/images/testimonial/mongignis.webp' },
  kaka: { kind: 'LOGO', name: 'Kaka Halwai', image: '/images/testimonial/kaka%20halwai.webp' },
  u2: { kind: 'LOGO', name: 'U2 Cake', image: '/images/testimonial/u2cake.webp' },
  gokul: { kind: 'LOGO', name: 'Gokul', image: '/images/testimonial/gokul.webp' },
  ofc: { kind: 'LOGO', name: 'OFC', image: '/images/testimonial/ofc.webp' },
  winni: { kind: 'LOGO', name: 'Winni', image: '/images/testimonial/winni.webp' },
};

const STAT_95 = { kind: 'STAT', value: '95%', label: 'fewer HR errors', client: 'Luft Food' };
const STAT_40 = { kind: 'STAT', value: '40%', label: 'less admin time', client: 'Luft Food' };

const PROOF_MONGINIS = {
  kind: 'PROOF',
  client: 'Monginis',
  headline: '3 factories, 140 outlets',
  line: 'Plants and retail outlets running on one HR system.',
};
const PROOF_LUFT = {
  kind: 'PROOF',
  client: 'Luft Food',
  headline: '250+ employees, 3 verticals',
  line: 'Office, plant and field on a single platform — one source of truth, one payroll run.',
};

// Each cell is a fixed-width column of the bento (full height = two card rows).
// Shapes mix sizes: `TALL` = one full-height card, `STACK` = two stacked cards,
// `WIDE_TOP` = a wide card over two half-width cards. A cell's cards are one
// ordered list, because the shape is what decides where each one is drawn.
const CELLS = [
  { width: 'WIDE', shape: 'WIDE_TOP', tiles: [PROOF_MONGINIS, L.kaka, L.u2] },
  { width: 'MEDIUM', shape: 'TALL', tiles: [PROOF_LUFT] },
  { width: 'SMALL', shape: 'STACK', tiles: [STAT_95, L.gokul] },
  { width: 'SMALL', shape: 'STACK', tiles: [L.ofc, STAT_40] },
  { width: 'NARROW', shape: 'TALL', tiles: [L.winni] },
  { width: 'NARROW', shape: 'TALL', tiles: [L.monginis] },
];

/*
  Column width is a name here, not a measurement.

  Tailwind only generates the classes it finds in this source, so a width that
  arrived from the API as `w-[360px]` would name a class nobody built. The four
  the bento uses are spelled out below, and the API sends one of these names.
*/
const WIDTH_CLASS = {
  WIDE: 'w-[360px]',
  MEDIUM: 'w-[320px]',
  SMALL: 'w-[240px]',
  NARROW: 'w-[190px]',
};

// A single card. Sizing (width/height) comes from the parent via `className`;
// the base classes here set only look + internal alignment per card type.
function Card({ tile, className = '' }) {
  const base = {
    LOGO: 'items-center justify-center p-5',
    STAT: 'items-center justify-center p-5',
    PROOF: 'flex-col justify-center p-6',
  }[tile.kind];

  return (
    <div className={`flex rounded-2xl border border-cream-300 bg-white shadow-sm ${base} ${className}`}>
      {tile.kind === 'LOGO' && (
        <img
          src={tile.image}
          alt={`${tile.name} logo`}
          loading="lazy"
          decoding="async"
          className="max-h-12 w-auto max-w-[140px] object-contain"
        />
      )}

      {/* Clay-style stat card — big figure left, uppercase caption right. */}
      {tile.kind === 'STAT' && (
        <div className="flex items-center gap-3">
          <p className="num-display text-[2.6rem] leading-none text-navy-950">{tile.value}</p>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-navy-500">
              {tile.label}
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-600">
              {tile.client}
            </p>
          </div>
        </div>
      )}

      {tile.kind === 'PROOF' && (
        <>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600">
            {tile.client}
          </span>
          <p className="mt-2 h-display text-[1.5rem] leading-[1.1] tracking-tight text-navy-950">
            {tile.headline}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-navy-600">{tile.line}</p>
        </>
      )}
    </div>
  );
}

function Cell({ cell }) {
  const w = WIDTH_CLASS[cell.width];

  if (cell.shape === 'TALL') {
    return (
      <div className={`${w} h-[320px] shrink-0`}>
        <Card tile={cell.tiles[0]} className="h-full w-full" />
      </div>
    );
  }
  if (cell.shape === 'STACK') {
    return (
      <div className={`${w} flex h-[320px] shrink-0 flex-col gap-4`}>
        <Card tile={cell.tiles[0]} className="w-full flex-1" />
        <Card tile={cell.tiles[1]} className="w-full flex-1" />
      </div>
    );
  }
  // WIDE_TOP
  return (
    <div className={`${w} flex h-[320px] shrink-0 flex-col gap-4`}>
      <Card tile={cell.tiles[0]} className="w-full flex-1" />
      <div className="flex flex-1 gap-4">
        <Card tile={cell.tiles[1]} className="h-full flex-1" />
        <Card tile={cell.tiles[2]} className="h-full flex-1" />
      </div>
    </div>
  );
}

// Continuously-scrolling row of cells. Repeated 4× (two identical halves) so the
// track is always wider than the viewport and the -50% loop stays gapless.
function MarqueeRow({ cells, dir = 1, duration = 55 }) {
  const half = [...cells, ...cells];
  const loop = [...half, ...half];
  return (
    <motion.div
      className="flex w-max gap-4"
      animate={{ x: dir > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {loop.map((cell, i) => (
        <Cell key={i} cell={cell} />
      ))}
    </motion.div>
  );
}

export default function HrmsProofStrip({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  // A published section always arrives with at least one drawable column: the
  // fetch drops the columns it cannot draw, and returns null if none are left.
  const cells = section ? section.cells : CELLS;

  return (
    <section className="relative overflow-hidden bg-white pb-10 pt-12 md:pb-12 md:pt-16">
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
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Bento — warm cream panel holding the continuously-scrolling mixed-size cards */}
        <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-cream-300 bg-gradient-to-b from-cream-100 to-cream-200 p-4 shadow-sm sm:p-6">
          <MarqueeRow cells={cells} dir={1} duration={55} />

          {/* edge fades — cards bleed off the sides like the reference */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream-100 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream-200 to-transparent sm:w-24" />
        </div>
      </Container>
    </section>
  );
}
