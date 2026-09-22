import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence, useInView } from 'framer-motion';
import Container from '../shared/Container/Container.jsx';

/*
  "The Fragmented Market" — five eras of business automation shown as premium 3D
  golden bars that grow one-by-one (left → right), with a golden growth curve
  that draws across them and finishes in an upward-right arrowhead above the
  dominant 5th bar. The whole sequence holds, then loops. A right-side card
  details the era (Era 5 by default; hover any bar to explore).
*/

const BARS = [
  { key: 'era1', era: 'Era 1', title: 'Manual Era', value: 30,
    desc: 'Registers, notebooks, phone calls & human memory run the business.',
    painLabel: 'The Pain', pain: 'Everything depends on people. Nothing is traceable or repeatable.' },
  { key: 'era2', era: 'Era 2', title: 'Excel + Tally Era', value: 44,
    desc: 'Spreadsheets for operations, Tally for accounts. Automation begins.',
    painLabel: 'The Pain', pain: 'Fragmented data. 100 files, 10 versions — zero intelligence.' },
  { key: 'era3', era: 'Era 3', title: 'Departmental Systems', value: 61,
    desc: 'Separate software per department — HR, sales, stores, accounts.',
    painLabel: 'The Pain', pain: "Systems don't talk. No integration, no single dashboard, no insights." },
  { key: 'era4', era: 'Era 4', title: 'Generic Ecosystems', value: 74,
    desc: 'One integrated suite — but built the same for every industry.',
    painLabel: 'The Pain', pain: 'Built for everyone, deep for no one. Heavy cost, endless customisation.' },
  { key: 'era5', era: 'Era 5', title: 'Specialised Ecosystems', value: 100,
    desc: "One integrated suite — engineered for ONE industry's DNA.",
    painLabel: 'The Future', pain: 'Industry-deep + fully integrated. This is where the market is heading.',
    highlight: true },
];

// Sequential bar timing — compressed so the 5th bar finishes with the arrow
// (not a full second after it), then the whole chart holds well before looping.
const SEQ = [
  { delay: 0.0, dur: 0.55 },
  { delay: 0.45, dur: 0.55 },
  { delay: 0.9, dur: 0.55 },
  { delay: 1.35, dur: 0.6 },
  { delay: 1.85, dur: 0.7 }, // 5th bar finishes ~2.55s
];
const ARROW_DELAY = 0.6;
const ARROW_DUR = 2.1;
const HEAD_DELAY = ARROW_DELAY + ARROW_DUR; // ~2.7s — arrowhead appears

// Extruded-bar depth (px) — the right/top faces that give the 3D look.
const DEPTH = 14;

// Golden growth arrow — one smooth, continuously-flowing curve that rides a
// constant gap (LIFT) above each bar's top and finishes in an arrowhead just
// above the 5th bar. A short lead-in point makes it sweep up from the baseline
// on the left (like the reference). Stored as plot fractions.
const LIFT = 6;
const BAR_PTS = BARS.map((b, i) => ({
  x: (i + 0.5) / BARS.length,
  y: (100 - b.value - LIFT) / 100,
}));
const PT_FRAC = [
  // lead-in just left of bar 1, at its top height — so the curve enters riding
  // over the first bar instead of diving to the baseline.
  { x: 0.02, y: BAR_PTS[0].y + 0.03 },
  ...BAR_PTS,
];

// Catmull-Rom → cubic Bézier: a natural spline through every point, so the
// curve flows diagonally instead of flattening (horizontal tangents) at each
// node the way a midpoint curve does.
function smoothPath(pts) {
  if (pts.length < 2) return pts.length ? `M ${pts[0].x} ${pts[0].y}` : '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function InfoCard({ bar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: '-50%', x: 12 }}
      animate={{ opacity: 1, y: '-50%', x: 0 }}
      exit={{ opacity: 0, y: '-50%', x: 12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute left-full top-1/2 z-40 hidden w-64 rounded-2xl border bg-[#0f1740]/95 p-5 backdrop-blur xl:ml-10 xl:block ${
        bar.highlight
          ? 'border-orange-400/50 shadow-[0_0_55px_-6px_rgba(249,115,22,0.7)]'
          : 'border-amber-400/40 shadow-2xl'
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">{bar.era}</p>
      <p className="mt-0.5 text-sm font-bold text-white">{bar.title}</p>
      <p className="mt-2 text-[14px] leading-relaxed text-slate-300">{bar.desc}</p>
      <p className="mt-3 border-t border-white/10 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
        {bar.painLabel}
      </p>
      <p className="mt-1 text-[14px] leading-relaxed text-slate-300">{bar.pain}</p>
    </motion.div>
  );
}

export default function MarketFragmentationBars() {
  const [hover, setHover] = useState(null);
  const [cycle] = useState(0); // stable key suffix for the one-time animation
  const [reveal, setReveal] = useState(0); // card auto-advances with each bar
  const chartRef = useRef(null);
  const plotRef = useRef(null);
  const inView = useInView(chartRef, { margin: '-60px', once: true });
  const [dim, setDim] = useState({ w: 0, h: 0 });

  // Measure the plot so the wave is drawn in real pixels.
  useEffect(() => {
    const el = plotRef.current;
    if (!el) return undefined;
    const measure = () => setDim({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Card follows the bars: advance the revealed card to bar i as bar i appears,
  // one by one. Runs a single time (inView is once). Reduced-motion → last card.
  useEffect(() => {
    if (!inView) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReveal(BARS.length - 1);
      return undefined;
    }
    setReveal(0);
    const timers = SEQ.map((s, i) => setTimeout(() => setReveal(i), s.delay * 1000));
    return () => timers.forEach(clearTimeout);
  }, [inView, cycle]);

  // Wave path in pixels + the end point / tangent for the arrowhead.
  const pts = dim.w ? PT_FRAC.map((p) => ({ x: p.x * dim.w, y: p.y * dim.h })) : [];
  const pathD = smoothPath(pts);
  const endPt = pts[pts.length - 1];
  const prevPt = pts[pts.length - 2];
  const headAngle =
    endPt && prevPt ? (Math.atan2(endPt.y - prevPt.y, endPt.x - prevPt.x) * 180) / Math.PI : -40;

  const shown = hover !== null ? hover : reveal;

  return (
    <section className="relative overflow-hidden bg-[#1b2456] py-10 md:py-14">
      {/* Faint grid backdrop. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">
            The Fragmented Market · A Category-Leader View
          </p>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-white">
            UPWON Helps You Skip the Stages{' '}
            <br className="hidden sm:inline" />
            That <span className="gradient-text-orange">Cause the Pain.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
            Why invest your organization’s growth time automating spreadsheets and single-purpose
            software,{' '}
            <br className="hidden md:inline" />
            or lose years to trial and error with generic ecosystems? Take the smart decision —{' '}
            <br className="hidden md:inline" />
            skip straight to a system built for Food &amp; FMCG, with every category on one database.
          </p>
        </motion.div>

        {/* Chart */}
        <div ref={chartRef} className="relative mx-auto mt-14 max-w-4xl">
          {/* Titles row */}
          <div className="flex gap-2 sm:gap-4 md:gap-6">
            {BARS.map((b, i) => (
              <div key={b.key} className="min-w-0 flex-1 text-center">
                <p
                  className={`truncate text-[14px] font-bold transition-colors sm:text-[14px] ${
                    hover === null || hover === i ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {b.title}
                </p>
              </div>
            ))}
          </div>

          {/* Plot — extruded 3D bars sitting on a baseline, with the climbing
              arrow overlaid. No track outlines (matches the 3D reference). */}
          <div
            ref={plotRef}
            className="relative mt-10 flex h-[320px] items-stretch gap-3 sm:mt-12 sm:h-[380px] md:h-[420px] sm:gap-6 md:gap-8"
          >
            {/* baseline */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/15" />

            {BARS.map((b, i) => (
              <div
                key={b.key}
                role="button"
                tabIndex={0}
                aria-label={b.title}
                className="group relative flex flex-1 flex-col items-center justify-end cursor-pointer"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setHover((h) => (h === i ? null : i))}
              >
                {/* Extruded 3D bar — grows from baseline, sequentially. */}
                <motion.div
                  key={`${b.key}-bar-${cycle}`}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${b.value}%` } : { height: 0 }}
                  transition={{ duration: SEQ[i].dur, delay: SEQ[i].delay, ease: [0.22, 1, 0.3, 1] }}
                  className="relative w-[62%] max-w-[104px]"
                  style={{
                    marginRight: DEPTH,
                    filter: b.highlight
                      ? 'drop-shadow(0 0 34px rgba(249,115,22,0.55))'
                      : 'drop-shadow(0 8px 14px rgba(0,0,0,0.35))',
                  }}
                >
                  {/* right (dark) face — extrudes up-right by DEPTH */}
                  <div
                    className="absolute"
                    style={{
                      left: '100%',
                      top: -DEPTH,
                      bottom: 0,
                      width: DEPTH,
                      background: b.highlight
                        ? 'linear-gradient(180deg, #9a3412 0%, #6b1d0e 100%)'
                        : 'linear-gradient(180deg, #b45309 0%, #7c2d12 100%)',
                      clipPath: `polygon(0 ${DEPTH}px, 100% 0, 100% calc(100% - ${DEPTH}px), 0 100%)`,
                    }}
                  />
                  {/* top (light) face — spans full width + DEPTH so it meets the side */}
                  <div
                    className="absolute"
                    style={{
                      left: 0,
                      top: -DEPTH,
                      width: `calc(100% + ${DEPTH}px)`,
                      height: DEPTH,
                      background: b.highlight
                        ? 'linear-gradient(90deg, #fdba74, #fb7a3c)'
                        : 'linear-gradient(90deg, #fde68a, #fbbf24)',
                      clipPath: `polygon(0 100%, ${DEPTH}px 0, 100% 0, calc(100% - ${DEPTH}px) 100%)`,
                    }}
                  />
                  {/* front (bright) face */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: b.highlight
                        ? 'linear-gradient(180deg, #fb923c 0%, #E85A2A 55%, #c2410c 100%)'
                        : 'linear-gradient(180deg, #fcd34d 0%, #f59e0b 55%, #d97706 100%)',
                      boxShadow:
                        'inset 0 2px 0 rgba(255,255,255,0.55), inset -10px 0 18px rgba(180,83,9,0.35), inset 10px 0 16px rgba(255,255,255,0.14)',
                    }}
                  />
                </motion.div>
              </div>
            ))}

            {/* Golden climbing arrow — draws left → right, arrowhead pops at end. */}
            {dim.w > 0 && (
              <svg
                className="pointer-events-none absolute inset-0 z-20 overflow-visible"
                width={dim.w}
                height={dim.h}
                viewBox={`0 0 ${dim.w} ${dim.h}`}
                aria-hidden
              >
                <motion.path
                  key={`arrow-${cycle}`}
                  d={pathD}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.85))' }}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: ARROW_DUR, delay: ARROW_DELAY, ease: 'easeInOut' }}
                />
                {endPt && (
                  // Static <g> handles placement + rotation (Framer Motion ignores
                  // a raw transform attribute), so the head sits on the path end
                  // above the 5th bar. Motion only animates its pop-in.
                  <g transform={`translate(${endPt.x} ${endPt.y}) rotate(${headAngle})`}>
                    <motion.polygon
                      key={`head-${cycle}`}
                      points="0,-9 0,9 16,0"
                      fill="#f59e0b"
                      style={{ filter: 'drop-shadow(0 0 7px rgba(245,158,11,0.95))' }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3, delay: HEAD_DELAY, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </g>
                )}
              </svg>
            )}
          </div>

          {/* Fixed info panel — pinned to the right of the chart (xl+). */}
          <AnimatePresence>
            {shown !== null && <InfoCard key={BARS[shown].key} bar={BARS[shown]} />}
          </AnimatePresence>

          {/* Compact info panel below the chart — phone & tablet. */}
          <div className="xl:hidden">
            <AnimatePresence mode="wait">
              {shown !== null && (
                <motion.div
                  key={BARS[shown].key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 rounded-2xl border border-amber-400/30 bg-[#0f1740]/95 p-5 text-left shadow-2xl backdrop-blur"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">{BARS[shown].era}</p>
                  <p className="mt-0.5 text-sm font-bold text-white">{BARS[shown].title}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-300">{BARS[shown].desc}</p>
                  <p className="mt-3 border-t border-white/10 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-400">
                    {BARS[shown].painLabel}
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-300">{BARS[shown].pain}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
