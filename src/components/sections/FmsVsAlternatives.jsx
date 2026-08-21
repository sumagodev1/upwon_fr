import { m as motion } from 'framer-motion';
import { Cog, Lightbulb, TrendingUp, Percent, ShieldCheck, ChefHat, Store } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  FMS "UpWon vs the Alternatives" — an analysis-matrix layout: a dark topic panel
  on the left, orange row pills for each comparison area, and three columns
  (POS-First platforms · UpWon FMS · Why it matters) of bullet cells. Honest,
  plain-language, no star ratings.
*/

const EASE = [0.22, 1, 0.3, 1];

const COLUMNS = [
  { label: 'POS-First Platforms', sub: 'Petpooja · Restroworks · GoFrugal', icon: Cog },
  { label: 'UpWon FMS', sub: 'Franchise operating system', icon: Lightbulb, highlight: true },
  { label: 'Why It Matters', sub: 'What the franchisor gains', icon: TrendingUp },
];

const ROWS = [
  {
    label: 'Royalty',
    icon: Percent,
    cells: [
      ['Flat-rate royalty', 'Open to dispute'],
      ['Tied to real production cost', 'Same data as the kitchen'],
      ['Defensible numbers', 'Fewer franchisee disputes'],
    ],
  },
  {
    label: 'Brand Standards',
    icon: ShieldCheck,
    cells: [
      ['Audits run manually, offline'],
      ['Brand-standard audit built in', 'Scored per outlet'],
      ['Slips caught proactively', 'Not after a complaint'],
    ],
  },
  {
    label: 'Central Kitchen & ERP',
    icon: ChefHat,
    cells: [
      ['ERP / central-kitchen only via bolt-ons'],
      ['Native central-kitchen & ERP integration'],
      ['One data core — no exports or reconciliation'],
    ],
  },
  {
    label: 'Franchise Models',
    icon: Store,
    cells: [
      ['Generic POS with franchise add-ons'],
      ['Built for food & FMCG franchise models'],
      ['COCO / FOFO / COFO / FOCO out of the box'],
    ],
  },
];

const GRID = 'md:grid md:grid-cols-[200px_1fr_1fr_1fr] md:gap-3';

function Bullets({ points }) {
  return (
    <ul className="space-y-1.5">
      {points.map((p) => (
        <li
          key={p}
          className="flex items-start justify-center gap-2 text-center text-[14px] leading-snug text-navy-700"
        >
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-orange-400" />
          {p}
        </li>
      ))}
    </ul>
  );
}

export default function FmsVsAlternatives() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
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
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.12] tracking-tight text-navy-950">
            A POS With a Royalty Feature Is{' '}
            <span className="gradient-text-orange">Not the Same as a Franchise Operating System.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            No star ratings. The rows below match what franchisors rank highest — domain expertise
            and native ERP / central-kitchen integration, not feature count or AI depth.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-6xl">
          {/* Column headers (desktop) */}
          <div className={`${GRID} md:pl-16`}>
            <div className="hidden md:block" />
            {COLUMNS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="hidden flex-col items-center md:flex">
                  <span
                    className={`z-10 -mb-6 grid h-14 w-14 place-items-center rounded-full text-white ring-4 ring-white ${
                      c.highlight ? 'bg-orange-500' : 'bg-navy-950'
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div
                    className={`w-full rounded-2xl px-4 pb-4 pt-8 text-center ${
                      c.highlight ? 'bg-orange-500' : 'bg-navy-950'
                    }`}
                  >
                    <p className="text-[14px] font-bold text-white">{c.label}</p>
                    <p className="mt-0.5 text-[14px] text-white/60">{c.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Body — dark topic panel + rows */}
          <div className="relative mt-4 md:pl-16">
            {/* Dark topic panel (desktop) */}
            <div className="absolute inset-y-0 left-0 hidden w-14 flex-col items-center justify-center rounded-l-[2.5rem] bg-navy-950 py-6 md:flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-orange-400">
                <Store className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="mt-4 rotate-180 text-[15px] font-black uppercase tracking-[0.2em] text-white [writing-mode:vertical-rl]">
                Franchise Ops
              </span>
            </div>

            <div className="space-y-3">
              {ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`${GRID} items-stretch`}
                  >
                    {/* Row pill */}
                    <div className="flex items-center justify-between gap-2 rounded-2xl bg-orange-500 px-4 py-3 md:rounded-full">
                      <span className="text-[14px] font-bold leading-tight text-white">
                        {row.label}
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-orange-600">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </div>

                    {/* Cells */}
                    {row.cells.map((cell, ci) => (
                      <div
                        key={COLUMNS[ci].label}
                        className="mt-2 flex flex-col justify-center rounded-2xl border border-cream-300 bg-white p-4 md:mt-0"
                      >
                        <p className="mb-1.5 text-center text-[10.5px] font-bold uppercase tracking-wide text-navy-400 md:hidden">
                          {COLUMNS[ci].label}
                        </p>
                        <Bullets points={cell} />
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
