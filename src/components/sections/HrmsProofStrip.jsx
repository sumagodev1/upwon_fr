import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  HRMS Proof Strip — de-risks the visit with real, named-client numbers rather
  than an inflated aggregate user count (Keka / greytHR headline war). A
  continuously-scrolling bento of MIXED-SIZE cards (Clay-style): wide named-proof
  cards, tall logo cards and stacked stat/logo pairs. Navy/minimalist system:
  flat white cards on a warm cream panel, navy stat figures, orange kept to the
  eyebrow + heading + client tags only.
*/

const EASE = [0.22, 1, 0.3, 1];

const L = {
  monginis: { type: 'logo', name: 'Monginis', src: '/images/testimonial/mongignis.webp' },
  kaka: { type: 'logo', name: 'Kaka Halwai', src: '/images/testimonial/kaka%20halwai.webp' },
  u2: { type: 'logo', name: 'U2 Cake', src: '/images/testimonial/u2cake.webp' },
  gokul: { type: 'logo', name: 'Gokul', src: '/images/testimonial/gokul.webp' },
  ofc: { type: 'logo', name: 'OFC', src: '/images/testimonial/ofc.webp' },
  winni: { type: 'logo', name: 'Winni', src: '/images/testimonial/winni.webp' },
};

const STAT_95 = { type: 'stat', value: '95%', label: 'fewer HR errors', client: 'Luft Food' };
const STAT_40 = { type: 'stat', value: '40%', label: 'less admin time', client: 'Luft Food' };

const PROOF_MONGINIS = {
  type: 'proof',
  client: 'Monginis',
  stat: '3 factories, 140 outlets',
  line: 'Plants and retail outlets running on one HR system.',
};
const PROOF_LUFT = {
  type: 'proof',
  client: 'Luft Food',
  stat: '250+ employees, 3 verticals',
  line: 'Office, plant and field on a single platform — one source of truth, one payroll run.',
};

// Each cell is a fixed-width column of the bento (full height = two card rows).
// Shapes mix sizes: `tall` = one full-height card, `stack` = two stacked cards,
// `wideTop` = a wide card over two half-width cards.
const CELLS = [
  { w: 'w-[360px]', shape: 'wideTop', top: PROOF_MONGINIS, bl: L.kaka, br: L.u2 },
  { w: 'w-[320px]', shape: 'tall', card: PROOF_LUFT },
  { w: 'w-[240px]', shape: 'stack', a: STAT_95, b: L.gokul },
  { w: 'w-[240px]', shape: 'stack', a: L.ofc, b: STAT_40 },
  { w: 'w-[190px]', shape: 'tall', card: L.winni },
  { w: 'w-[190px]', shape: 'tall', card: L.monginis },
];

// A single card. Sizing (width/height) comes from the parent via `className`;
// the base classes here set only look + internal alignment per card type.
function Card({ tile, className = '' }) {
  const base = {
    logo: 'items-center justify-center p-5',
    stat: 'items-center justify-center p-5',
    proof: 'flex-col justify-center p-6',
  }[tile.type];

  return (
    <div className={`flex rounded-2xl border border-cream-300 bg-white shadow-sm ${base} ${className}`}>
      {tile.type === 'logo' && (
        <img
          src={tile.src}
          alt={`${tile.name} logo`}
          loading="lazy"
          decoding="async"
          className="max-h-12 w-auto max-w-[140px] object-contain"
        />
      )}

      {/* Clay-style stat card — big figure left, uppercase caption right. */}
      {tile.type === 'stat' && (
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

      {tile.type === 'proof' && (
        <>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600">
            {tile.client}
          </span>
          <p className="mt-2 h-display text-[1.5rem] leading-[1.1] tracking-tight text-navy-950">
            {tile.stat}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-navy-600">{tile.line}</p>
        </>
      )}
    </div>
  );
}

function Cell({ cell }) {
  if (cell.shape === 'tall') {
    return (
      <div className={`${cell.w} h-[320px] shrink-0`}>
        <Card tile={cell.card} className="h-full w-full" />
      </div>
    );
  }
  if (cell.shape === 'stack') {
    return (
      <div className={`${cell.w} flex h-[320px] shrink-0 flex-col gap-4`}>
        <Card tile={cell.a} className="w-full flex-1" />
        <Card tile={cell.b} className="w-full flex-1" />
      </div>
    );
  }
  // wideTop
  return (
    <div className={`${cell.w} flex h-[320px] shrink-0 flex-col gap-4`}>
      <Card tile={cell.top} className="w-full flex-1" />
      <div className="flex flex-1 gap-4">
        <Card tile={cell.bl} className="h-full flex-1" />
        <Card tile={cell.br} className="h-full flex-1" />
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

export default function HrmsProofStrip() {
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
          <Eyebrow className="justify-center">Proof Strip</Eyebrow>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            UpWon HRMS —{' '}
            <span className="gradient-text-orange">Just What&apos;s Already Running.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Real, named-client proof from live deployments — not an inflated aggregate user count to
            win a headline war.
          </p>
        </motion.div>

        {/* Bento — warm cream panel holding the continuously-scrolling mixed-size cards */}
        <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-cream-300 bg-gradient-to-b from-cream-100 to-cream-200 p-4 shadow-sm sm:p-6">
          <MarqueeRow cells={CELLS} dir={1} duration={55} />

          {/* edge fades — cards bleed off the sides like the reference */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream-100 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream-200 to-transparent sm:w-24" />
        </div>
      </Container>
    </section>
  );
}
