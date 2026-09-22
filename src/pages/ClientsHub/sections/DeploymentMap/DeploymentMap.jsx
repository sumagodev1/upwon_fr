import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { INDIA_PATH } from '../../../../data/indiaOutline.js';

// Cities grouped by state, each tagged with real lat/lng so the map markers
// land in the right place on the India outline.
const STATES = [
  { state: 'Maharashtra', zone: 'West', cities: [
    { name: 'Mumbai',        lat: 19.07, lng: 72.87 },
    { name: 'Pune',          lat: 18.52, lng: 73.85 },
    { name: 'Nagpur',        lat: 21.14, lng: 79.08 },
    { name: 'Sambhajinagar', lat: 19.87, lng: 75.34 },
    { name: 'Kolhapur',      lat: 16.70, lng: 74.24 },
  ] },
  { state: 'Gujarat', zone: 'West', cities: [
    { name: 'Ahmedabad', lat: 23.02, lng: 72.57 },
    { name: 'Surat',     lat: 21.17, lng: 72.83 },
    { name: 'Baroda',    lat: 22.31, lng: 73.18 },
  ] },
  { state: 'Delhi',         zone: 'North', cities: [{ name: 'Delhi',        lat: 28.61, lng: 77.21 }] },
  { state: 'Uttar Pradesh', zone: 'North', cities: [{ name: 'Lucknow',      lat: 26.85, lng: 80.95 }] },
  { state: 'Bihar',         zone: 'East',  cities: [{ name: 'Patna',        lat: 25.59, lng: 85.14 }] },
  { state: 'West Bengal',   zone: 'East',  cities: [{ name: 'Kolkata',      lat: 22.57, lng: 88.36 }] },
  { state: 'Telangana',     zone: 'South', cities: [{ name: 'Hyderabad',    lat: 17.39, lng: 78.49 }] },
  { state: 'Odisha',        zone: 'East',  cities: [{ name: 'Bhubaneshwar', lat: 20.30, lng: 85.82 }] },
  { state: 'Jharkhand',     zone: 'East',  cities: [{ name: 'Ranchi',       lat: 23.34, lng: 85.31 }] },
];

export const TOTAL_STATES = STATES.length;
export const TOTAL_CITIES = STATES.reduce((n, s) => n + s.cities.length, 0);
const TOTAL_ZONES = new Set(STATES.map((s) => s.zone)).size;

// --- lat/lng → viewBox projection, calibrated against the outline's bounds ---
const VB = 1024;
const LNG = [68.1, 97.4];
const LAT = [37.1, 8.0];
const XR = [33, 990];
const YR = [6, 1019];
const px = (lng) => XR[0] + ((lng - LNG[0]) / (LNG[1] - LNG[0])) * (XR[1] - XR[0]);
const py = (lat) => YR[0] + ((LAT[0] - lat) / (LAT[0] - LAT[1])) * (YR[1] - YR[0]);

const DOTS = STATES.flatMap((s) =>
  s.cities.map((c) => ({ ...c, state: s.state, x: px(c.lng), y: py(c.lat) }))
);

// Network lines fan out from a west-coast hub (Mumbai) to every other city.
const HUB = DOTS[0];
const LINES = DOTS.slice(1).map((d) => ({
  key: `${d.state}-${d.name}`,
  state: d.state,
  x1: HUB.x,
  y1: HUB.y,
  x2: d.x,
  y2: d.y,
}));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const cardV = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Count-up stat that fires once when scrolled into view.
function Stat({ value, label, suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          io.disconnect();
          const dur = 1200;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div
      ref={ref}
      className="flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center backdrop-blur-md sm:px-6"
    >
      <div className="num-display bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
        {n}
        {suffix}
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-200 sm:text-[11px]">
        {label}
      </div>
    </div>
  );
}

// useMobileAutoScroll — auto-advances the state-cards strip one card at a
// time on mobile/tablet (below the `lg` breakpoint where the layout flips
// to a 2-col grid).
//
// Why card-by-card instead of 1-px ticks: the strip uses `scroll-snap-type:
// x mandatory`, which yanks the scroll back to the nearest snap point after
// every sub-card movement. Advancing exactly one card width per interval
// works *with* snap — each smooth-scroll lands cleanly on the next card.
//
// Pauses on touch/drag, when offscreen, or when the viewport is desktop.
function useMobileAutoScroll(ref, { intervalMs = 2200 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return undefined;

    const mql = window.matchMedia('(max-width: 1023px)');
    let timer = null;
    let pausedUntil = 0;
    let inView = true;

    const cardStep = () => {
      // Use the first card's full outer width (incl. gap) so we land on
      // the next snap point regardless of design tweaks.
      const first = el.children[0];
      if (!first) return el.clientWidth * 0.8;
      const second = el.children[1];
      if (second) {
        return second.offsetLeft - first.offsetLeft;
      }
      return first.getBoundingClientRect().width + 12; // gap-3 fallback
    };

    // Period = distance between the same card in the original set and
    // its duplicate. Subtracting this from scrollLeft once we've entered
    // the duplicate region lands us on the visually-identical card in the
    // original region — the swap is invisible to the visitor.
    const getPeriod = () => {
      const a = el.querySelector('[data-loop-anchor="original"]');
      const b = el.querySelector('[data-loop-anchor="duplicate"]');
      if (!a || !b) return 0;
      return b.offsetLeft - a.offsetLeft;
    };

    const tick = () => {
      if (!mql.matches || !inView || Date.now() < pausedUntil) return;
      const step = cardStep();
      const period = getPeriod();
      // Once we've crossed into the duplicate region, snap silently back
      // by one period so the next forward tick continues from inside the
      // original region. Set scrollLeft directly (behavior: 'auto') so
      // there's no rewind animation.
      if (period > 0 && el.scrollLeft >= period) {
        el.scrollLeft = el.scrollLeft - period;
      }
      el.scrollBy({ left: step, behavior: 'smooth' });
    };

    const start = () => {
      if (timer) return;
      timer = window.setInterval(tick, intervalMs);
    };
    const stop = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    };

    const pauseForUser = () => {
      pausedUntil = Date.now() + 4000;
    };
    el.addEventListener('touchstart', pauseForUser, { passive: true });
    el.addEventListener('pointerdown', pauseForUser);
    el.addEventListener('wheel', pauseForUser, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && mql.matches) start();
        else stop();
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    const onMqChange = () => {
      if (mql.matches && inView) start();
      else stop();
    };
    mql.addEventListener?.('change', onMqChange);

    if (mql.matches) start();

    return () => {
      stop();
      io.disconnect();
      mql.removeEventListener?.('change', onMqChange);
      el.removeEventListener('touchstart', pauseForUser);
      el.removeEventListener('pointerdown', pauseForUser);
      el.removeEventListener('wheel', pauseForUser);
    };
  }, [ref, intervalMs]);
}

export default function DeploymentMap() {
  const [active, setActive] = useState(null);
  const activeCities = active ? DOTS.filter((d) => d.state === active) : [];
  const stripRef = useRef(null);
  useMobileAutoScroll(stripRef);

  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 px-5 py-12 shadow-enterprise-lg sm:px-8 md:px-12 md:py-16"
      >
        {/* Decorative ambient layers */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-16 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-navy-500/30 blur-3xl" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />
        </div>

        {/* Header — centered */}
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-orange-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
            </span>
            Operational Network
          </span>

          {/* Sits inside the roster section's own h2, so it is sized one step
              below the site's section headline rather than above it. */}
          <h3 className="mx-auto mt-3 max-w-2xl h-display text-[26px] leading-[1.12] tracking-tight text-white sm:text-[30px] lg:text-[33px]">
            From Sambhajinagar to{' '}
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
              Kolkata
            </span>
            .
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-200 sm:text-[15px]">
            Running today across India&rsquo;s food &amp; FMCG belt — from
            west-coast bakery chains to eastern dairy networks.
          </p>

          {/* Stat badges */}
          <div className="mx-auto mt-8 flex max-w-md items-stretch justify-center gap-3">
            <Stat value={TOTAL_CITIES} label="Cities" />
            <Stat value={TOTAL_STATES} label="States" />
            <Stat value={TOTAL_ZONES} label="Zones" />
          </div>
        </div>

        {/* Body — split layout */}
        <div className="relative mt-12 grid items-center gap-8 lg:mt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* Left — state coverage cards */}
          <motion.div
            ref={stripRef}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:pb-0"
          >
            {[...STATES, ...STATES].map((s, idx) => {
              const on = active === s.state;
              const isOriginal = idx < STATES.length;
              // data-loop-anchor marks the same logical card (the first
              // one) in each set so the hook can measure the exact period
              // and reset scrollLeft seamlessly mid-loop.
              const loopAnchor =
                idx === 0 ? 'original' : idx === STATES.length ? 'duplicate' : undefined;
              return (
                <motion.button
                  key={`${s.state}-${isOriginal ? 'a' : 'b'}`}
                  type="button"
                  data-loop-anchor={loopAnchor}
                  variants={cardV}
                  onMouseEnter={() => setActive(s.state)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.state)}
                  onBlur={() => setActive(null)}
                  // Original first card carries the 14vw runway so snap
                  // can centre it on initial render. Duplicates are
                  // display:none above lg so the desktop 2-col grid stays
                  // a single 9-card set.
                  className={`group w-[72vw] max-w-[260px] shrink-0 snap-center ${
                    idx === 0 ? 'ml-[14vw] lg:ml-0' : ''
                  } ${!isOriginal ? 'lg:hidden' : ''} rounded-xl border p-4 text-left backdrop-blur-md transition-all duration-300 lg:w-auto lg:max-w-none lg:min-w-0 ${
                    on
                      ? 'border-orange-400/60 bg-white/[0.1] shadow-glow-orange'
                      : 'border-white/10 bg-white/[0.05] hover:-translate-y-0.5 hover:border-orange-400/40 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                          on ? 'bg-orange-500 text-white' : 'bg-orange-500/15 text-orange-300'
                        }`}
                      >
                        <MapPin className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white">
                        {s.state}
                      </span>
                    </div>
                    <span className="num-display rounded-full bg-orange-500/15 px-2 py-0.5 text-[14px] font-bold text-orange-300">
                      {s.cities.length}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-navy-200/80">
                    {s.cities.map((c) => c.name).join(' · ')}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right — floating interactive India map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              {/* Glow behind the landmass */}
              <div
                aria-hidden
                className="absolute inset-[14%] rounded-full bg-orange-500/15 blur-3xl"
              />

              <motion.svg
                viewBox={`0 0 ${VB} ${VB}`}
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label={`UpWon deployments across ${TOTAL_CITIES} cities in ${TOTAL_STATES} states of India`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                <defs>
                  <linearGradient id="india-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f89a6b" />
                    <stop offset="0.6" stopColor="#E85A2A" />
                    <stop offset="1" stopColor="#cf4a17" />
                  </linearGradient>
                  <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#E85A2A" floodOpacity="1" />
                  </filter>
                </defs>

                {/* India silhouette — outline draws itself in over a warm fill */}
                <g
                  transform="translate(0,1024) scale(0.1,-0.1)"
                  fill="url(#india-fill)"
                  fillOpacity={0.16}
                >
                  <motion.path
                    d={INDIA_PATH}
                    stroke="#f89a6b"
                    strokeOpacity={0.7}
                    strokeWidth={20}
                    strokeLinejoin="round"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      show: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          pathLength: { duration: 1.6, ease: 'easeInOut' },
                          opacity: { duration: 0.4 },
                        },
                      },
                    }}
                  />
                </g>

                {/* Network lines — draw in from the hub, brighten for active state */}
                {LINES.map((l, i) => {
                  const dim = active !== null && active !== l.state;
                  return (
                    <motion.line
                      key={l.key}
                      x1={l.x1}
                      y1={l.y1}
                      x2={l.x2}
                      y2={l.y2}
                      stroke="#f89a6b"
                      strokeWidth={2.5}
                      strokeDasharray="5 9"
                      className="transition-opacity duration-300"
                      style={{ opacity: dim ? 0.08 : active === l.state ? 0.8 : 0.22 }}
                      variants={{
                        hidden: { pathLength: 0 },
                        show: {
                          pathLength: 1,
                          transition: { delay: 0.5 + i * 0.04, duration: 0.7, ease: 'easeOut' },
                        },
                      }}
                    />
                  );
                })}

                {/* City markers — each pulses on its own offset; active state pops */}
                {DOTS.map((d, i) => {
                  const dim = active !== null && active !== d.state;
                  const highlit = active === d.state;
                  return (
                    <motion.g
                      key={`${d.state}-${d.name}`}
                      onMouseEnter={() => setActive(d.state)}
                      onMouseLeave={() => setActive(null)}
                      style={{ transformOrigin: `${d.x}px ${d.y}px`, cursor: 'pointer' }}
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        show: {
                          opacity: 1,
                          scale: 1,
                          transition: {
                            delay: 0.7 + i * 0.05,
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                    >
                      <motion.circle
                        cx={d.x}
                        cy={d.y}
                        fill="none"
                        stroke="#E85A2A"
                        strokeWidth={3}
                        animate={{ r: [9, highlit ? 42 : 30], opacity: [highlit ? 0.7 : 0.45, 0] }}
                        transition={{
                          duration: highlit ? 1.4 : 2.6,
                          repeat: Infinity,
                          delay: (i % 6) * 0.35,
                          ease: 'easeOut',
                        }}
                        style={{ opacity: dim ? 0.12 : 1 }}
                      />
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r={highlit ? 14 : 9}
                        fill="#E85A2A"
                        stroke="#fff"
                        strokeWidth={highlit ? 3.5 : 2.5}
                        filter="url(#dot-glow)"
                        className="transition-all duration-300"
                        style={{ opacity: dim ? 0.3 : 1 }}
                      />
                    </motion.g>
                  );
                })}
              </motion.svg>

              {/* Hover tooltips — pills for the active state's cities */}
              {activeCities.map((d, i) => (
                <motion.div
                  key={`tip-${d.name}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[170%] whitespace-nowrap rounded-lg border border-orange-400/40 bg-navy-950/90 px-2.5 py-1 text-[14px] font-semibold text-white shadow-glow-orange backdrop-blur-sm"
                  style={{ left: `${(d.x / VB) * 100}%`, top: `${(d.y / VB) * 100}%` }}
                >
                  {d.name}
                </motion.div>
              ))}
            </motion.div>

            <p className="mt-4 text-center text-[14px] text-navy-300">
              Hover a state to trace its live deployments.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
