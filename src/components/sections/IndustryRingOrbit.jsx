import { m as motion } from 'framer-motion';
import { INDUSTRIES } from '../../data/industries.js';

// Reusable 3-ring "UpWon Universe" orbit diagram (core medallion + every
// industry on its real ring + a live count strip). Extracted so it can be
// shown both on IndustryPages (with an active industry) and on the homepage
// Universe section. Pass `activeSlug` to pulse + label one node; omit it for a
// neutral overview.

// Slugs must match the ones in src/data/industries.js. Any slug not listed
// here defaults to Ring 1, which silently breaks the counts — keep in sync.
export const RING_BY_SLUG = {
  bakery:                      1,
  dairy:                       1,
  'sweets-namkeen':            1,
  'spices-agro':               1,
  beverage:                    1,
  'food-processing':           1,
  'qsr-franchise':             1,
  'fmcg-distribution':         2,
  'non-food-fmcg':             2,
  'engineering-manufacturing': 3,
};

export const RING_META = {
  1: {
    name: 'Ring 1 — Core',
    label: 'Deepest domain expertise',
    color: '#E85A2A',
    blurb:
      "UpWon's foundation. Food manufacturing — the workflows we built the platform around. Every module reflects a decade of operating inside this ring.",
    short: 'Food manufacturing — the home turf',
  },
  2: {
    name: 'Ring 2 — Extension',
    label: 'Proven adjacency',
    color: '#C4A03A',
    blurb:
      'A natural extension of the Core. Distribution-first FMCG operators run on the same engine — same SFA, same DMS, same outlet visibility.',
    short: 'FMCG distribution — same engine, same wins',
  },
  3: {
    name: 'Ring 3 — Expansion',
    label: 'Active expansion',
    color: '#1D9E75',
    blurb:
      "Discrete manufacturing and adjacent verticals. UpWon ERP's production, costing and quality modules apply directly — and we're deepening sector coverage with every deployment.",
    short: 'Adjacent verticals — ERP applies directly',
  },
};

// Ring radii as a percentage of the container side length. They must match the
// Ring `size` props below so nodes sit on the circle, not next to it.
const RING_RADIUS = { 1: 23, 2: 36, 3: 50 };
const RING_SIZES = { 1: 46, 2: 72, 3: 100 };

// Group industries by ring once at module scope; cheaper than recomputing per
// render and lets each node know its index within its ring.
export const INDUSTRIES_BY_RING = INDUSTRIES.reduce((acc, ind) => {
  const r = RING_BY_SLUG[ind.slug] || 1;
  (acc[r] = acc[r] || []).push(ind);
  return acc;
}, {});

// Polar → cartesian. Angle starts at -90° (12 o'clock) so the first node on
// every ring is at the top — predictable for the user.
function nodePosition(ring, indexInRing, total) {
  const radius = RING_RADIUS[ring];
  const angle = ((360 / total) * indexInRing - 90) * (Math.PI / 180);
  return {
    left: `${50 + radius * Math.cos(angle)}%`,
    top: `${50 + radius * Math.sin(angle)}%`,
  };
}

// `activeSlug` pulses+labels one industry (industry pages). `activeRing`
// lights up a whole ring and all its industries (homepage, driven by the
// ring cards). Pass one or the other.
export default function IndustryRingOrbit({ activeSlug, activeRing: activeRingProp }) {
  const ringMode = activeRingProp != null;
  const activeRing = ringMode ? activeRingProp : activeSlug ? RING_BY_SLUG[activeSlug] || 1 : null;

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col items-center">
      <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px]">
        {/* Soft radial wash so the rings sit on subtle light */}
        <div
          className="pointer-events-none absolute inset-[10%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), rgba(255,255,255,0) 75%)',
          }}
        />

        {/* Rings — bottom-up so the smallest is on top */}
        {[3, 2, 1].map((r) => (
          <Ring
            key={r}
            size={RING_SIZES[r]}
            color={RING_META[r].color}
            active={activeRing === r}
            delay={0.05 + (3 - r) * 0.1}
          />
        ))}

        {/* Core — UPWON logo medallion. NOTE: the -50%/-50% centering lives in
            framer's x/y (not Tailwind -translate), because animating `scale`
            makes framer own `transform` and it would overwrite the classes. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: '-50%', y: '-50%' }}
          whileInView={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute left-1/2 top-1/2 z-10 grid h-[88px] w-[88px] place-items-center sm:h-24 sm:w-24"
        >
          <img
            src="/icons/upwon_circle.png"
            alt="UPWON"
            className="h-full w-full object-contain"
          />
          <span className="absolute inset-0 -z-10 rounded-full bg-orange-500/25 blur-xl" />
        </motion.div>

        {/* Industry nodes — every industry, on its real ring */}
        {INDUSTRIES.map((ind) => {
          const ring = RING_BY_SLUG[ind.slug] || 1;
          const peers = INDUSTRIES_BY_RING[ring];
          const i = peers.findIndex((p) => p.slug === ind.slug);
          const pos = nodePosition(ring, i, peers.length);
          // Ring mode → every node on the active ring lights up (no pills, to
          // avoid clutter). Slug mode → only the one industry, with its pill.
          const isActive = ringMode ? ring === activeRing : ind.slug === activeSlug;
          return (
            <IndustryNode
              key={ind.slug}
              industry={ind}
              pos={pos}
              color={RING_META[ring].color}
              active={isActive}
              showLabel={!ringMode && isActive}
              delay={0.55 + i * 0.04}
            />
          );
        })}
      </div>

      {/* Stat strip — sits BELOW the orbit so it can't overlap the active-node
          label or the outermost ring. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="mt-6 inline-flex items-center gap-3 rounded-full border border-cream-300 bg-white/95 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-navy-700 shadow-sm backdrop-blur sm:gap-4 sm:px-4 sm:py-2 sm:text-[11px]"
      >
        {[1, 2, 3].map((r, idx) => (
          <span key={r} className="inline-flex items-center gap-1.5">
            {idx > 0 && <span className="h-3 w-px bg-cream-300" />}
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: RING_META[r].color }}
            />
            <span className="num-display text-[14px] font-bold text-navy-950">
              {INDUSTRIES_BY_RING[r]?.length || 0}
            </span>
            <span className="text-navy-500">in R{r}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Ring({ size, color, active, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: '-50%', y: '-50%' }}
      whileInView={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: `${size}%`,
        height: `${size}%`,
        border: `${active ? 2.5 : 1.25}px ${active ? 'solid' : 'dashed'} ${color}${active ? '' : '99'}`,
        background: active ? `${color}0d` : 'transparent',
        boxShadow: active ? `0 0 60px ${color}33` : 'none',
      }}
    />
  );
}

function IndustryNode({ industry, pos, color, active, delay, showLabel = true }) {
  const Icon = industry.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, x: '-50%', y: '-50%' }}
      whileInView={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ left: pos.left, top: pos.top }}
      className={`absolute ${active ? 'z-30' : 'z-20'}`}
    >
      {/* Icon medallion. Active state = full colour, white text, pulse halo +
          an always-visible name pill anchored below. Inactive = soft neutral
          chip with a faint coloured ring so it still belongs to its ring. */}
      <div className="relative flex flex-col items-center">
        {active && showLabel && (
          <span
            className="pointer-events-none absolute inset-0 -m-2 animate-ping rounded-full"
            style={{ background: `${color}40` }}
          />
        )}
        <div
          className={`relative grid place-items-center rounded-full border shadow-sm transition-all ${
            active ? 'h-10 w-10 sm:h-11 sm:w-11' : 'h-7 w-7 sm:h-8 sm:w-8'
          }`}
          style={{
            background: active ? color : 'white',
            borderColor: active ? color : `${color}55`,
            color: active ? 'white' : color,
            boxShadow: active ? `0 0 24px ${color}55` : '0 1px 2px rgba(0,0,0,0.04)',
          }}
          title={industry.name}
        >
          <Icon className={active ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-3 w-3 sm:h-3.5 sm:w-3.5'} />
        </div>

        {active && showLabel && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.15 }}
            className="mt-1.5 inline-flex max-w-none items-center whitespace-nowrap rounded-full border bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-md sm:text-[10.5px]"
            style={{ borderColor: color, color }}
          >
            {industry.name}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
