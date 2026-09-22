import { memo, useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  TrendingUp,
  MapPin,
  Truck,
  Receipt,
  Activity,
  CheckCircle2,
  Zap,
} from 'lucide-react';

// The product-screenshot carousel, split out of HeroSection so it owns its own
// `shotIdx` + auto-advance interval. Previously both this carousel and the
// background-slideshow index lived on HeroSection, so a tick on *either* re-
// rendered the whole hero (this big card included) every 5s for nothing. Now a
// background tick can't touch this subtree, and this carousel's own ticks only
// re-render this component. Wrapped in memo() so the parent's background ticks
// (which don't change the `animate` prop) skip it entirely.

// Real product screenshots — drop real captures at these public/ paths.
// Each entry has its own onError fallback so the page always renders even
// before the real screenshots have been added.
const PRODUCT_SHOTS = [
  {
    src: '/upwon-dashboard.png',
    fallback:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=70',
    label: 'Executive Dashboard',
    path: 'dashboard',
    alt: 'UpWon executive dashboard — live throughput, batch tracking and outlet performance',
  },
  {
    src: '/upwon-pos.png',
    fallback:
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1280&q=70',
    label: 'Outlet · POS',
    path: 'pos/checkout',
    alt: 'UpWon POS terminal — billing, GST, kitchen orders',
  },
  {
    src: '/upwon-sfa.png',
    // Field salesperson on a phone with a route map — visually fits the
    // SFA / beat-plan / outlet-visit story far better than the previous
    // portrait stock photo.
    fallback:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1280&q=70',
    label: 'Field Sales · SFA',
    path: 'sfa/route',
    alt: 'UpWon SFA — beat plan, route optimization, secondary sales',
  },
  {
    src: '/upwon-distribution.png',
    fallback:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1280&q=70',
    label: 'Distribution Hub',
    path: 'distribution',
    alt: 'UpWon distribution hub — depots, dispatch, primary/secondary sales',
  },
];
const SHOT_MS = 5000;

// Floating UI widgets layered on top of each product shot. Two per shot,
// positioned in opposite corners so the underlying screenshot still reads.
// They turn a flat fallback photo into "the screen this app runs on".
const SHOT_OVERLAYS = {
  dashboard: [
    {
      pos: 'top-left',
      Icon: TrendingUp,
      tone: 'emerald',
      eyebrow: "Today's revenue",
      title: '₹4.28 L',
      sub: '+18.2% vs yesterday',
    },
    {
      pos: 'bottom-right',
      Icon: Activity,
      tone: 'orange',
      eyebrow: 'Live · Plant Floor',
      title: '6 batches active',
      sub: 'Yield tracking on',
    },
  ],
  'pos/checkout': [
    {
      pos: 'top-right',
      Icon: Receipt,
      tone: 'orange',
      eyebrow: 'Order #1284',
      title: '₹486 · UPI',
      sub: 'Outlet · Andheri',
    },
    {
      pos: 'bottom-left',
      Icon: Zap,
      tone: 'amber',
      eyebrow: 'Swiggy · KOT',
      title: 'Auto-accepted',
      sub: 'Kitchen printed',
    },
  ],
  'sfa/route': [
    {
      pos: 'top-left',
      Icon: MapPin,
      tone: 'orange',
      eyebrow: 'Rep · Vikram',
      title: '12 / 18 outlets',
      sub: '84% beat compliance',
    },
    {
      pos: 'bottom-right',
      Icon: CheckCircle2,
      tone: 'emerald',
      eyebrow: 'Secondary sales',
      title: '₹1.62 L today',
      sub: 'Scheme auto-applied',
    },
  ],
  distribution: [
    {
      pos: 'top-right',
      Icon: Truck,
      tone: 'emerald',
      eyebrow: 'Dispatch DSP-0042',
      title: 'On-time',
      sub: 'MH14 BV 9059',
    },
    {
      pos: 'bottom-left',
      Icon: MapPin,
      tone: 'orange',
      eyebrow: 'Distributor · Pune',
      title: '4 stops left',
      sub: 'ETA 16:42',
    },
  ],
};

// Static class map for tones used by the overlays. Static so JIT
// picks them up reliably — never compute Tailwind classes at runtime.
const OVERLAY_TONES = {
  emerald: {
    iconBg: 'bg-emerald-500/15',
    iconText: 'text-emerald-300',
    dot: 'bg-emerald-400',
    eyebrow: 'text-emerald-200',
  },
  orange: {
    iconBg: 'bg-orange-500/20',
    iconText: 'text-orange-300',
    dot: 'bg-orange-400',
    eyebrow: 'text-orange-200',
  },
  amber: {
    iconBg: 'bg-amber-500/15',
    iconText: 'text-amber-300',
    dot: 'bg-amber-400',
    eyebrow: 'text-amber-200',
  },
};

const OVERLAY_POS = {
  'top-left':     'top-3 left-3 md:top-5 md:left-5',
  'top-right':    'top-3 right-3 md:top-5 md:right-5',
  'bottom-left':  'bottom-12 left-3 md:bottom-14 md:left-5',
  'bottom-right': 'bottom-12 right-3 md:bottom-14 md:right-5',
};

function HeroProductShowcase({ animate }) {
  const [shotIdx, setShotIdx] = useState(0);

  // Auto-advance only while the hero is on screen + motion is allowed (the
  // parent folds prefers-reduced-motion into `animate`). Manual dot / thumbnail
  // clicks still work when paused.
  useEffect(() => {
    if (!animate) return undefined;
    const id = setInterval(() => {
      setShotIdx((i) => (i + 1) % PRODUCT_SHOTS.length);
    }, SHOT_MS);
    return () => clearInterval(id);
  }, [animate]);

  const shot = PRODUCT_SHOTS[shotIdx];

  return (
    <motion.div
      id="product-screens"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-14 w-full max-w-5xl scroll-mt-28"
    >
      {/* Ambient glow behind the frame — soft orange + navy bloom
          so the screenshot card looks like it's emitting light, not
          pasted on the page. */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-orange-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] bg-navy-900/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-enterprise-lg ring-1 ring-navy-100">
        {/* Browser chrome — URL bar + LIVE pulse + active module label */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-navy-900 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <AnimatePresence mode="wait">
            <motion.div
              key={`url-${shotIdx}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="ml-3 flex items-center gap-2 rounded-md bg-white/[0.06] px-3 py-0.5 text-[14px] font-medium text-white/70"
            >
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>app.upwon.in / {shot.path}</span>
            </motion.div>
          </AnimatePresence>

          {/* LIVE pulse — animated dot + label. Says "this product is
              running right now", not "this is a static screenshot". */}
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={`label-${shotIdx}`}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.35 }}
              className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300 md:inline"
            >
              {shot.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Screenshot stage — 16:9, crossfading images */}
        <div className="relative aspect-video w-full bg-navy-950">
          <AnimatePresence mode="sync">
            <motion.img
              key={shotIdx}
              src={shot.src}
              alt={shot.alt}
              loading="eager"
              width="2400"
              height="1350"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: 'easeInOut' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = shot.fallback;
              }}
              className="absolute inset-0 block h-full w-full object-cover"
            />
          </AnimatePresence>

          {/* Wash — subtle navy gradient over the underlying photo so
              the floating widgets read clearly without hiding the image. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950/45 via-navy-950/15 to-navy-950/55" />

          {/* Floating UI widgets — two per shot, fade + slide in with
              stagger every time the active shot rotates. Each widget
              sells the lie that the photo behind it is a real screen. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`overlays-${shotIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0"
            >
              {(SHOT_OVERLAYS[shot.path] || []).map((w, i) => {
                const tone = OVERLAY_TONES[w.tone] || OVERLAY_TONES.orange;
                return (
                  <motion.div
                    key={`${w.pos}-${w.title}`}
                    initial={{ opacity: 0, y: 12, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.25 + i * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`absolute ${OVERLAY_POS[w.pos]} hidden max-w-[200px] items-start gap-2.5 rounded-xl border border-white/15 bg-navy-950/70 px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:flex`}
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${tone.iconBg} ${tone.iconText} ring-1 ring-white/10`}>
                      <w.Icon className="h-4 w-4" />
                    </span>
                    <span className="leading-tight">
                      <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] ${tone.eyebrow}`}>
                        <span className={`h-1 w-1 rounded-full ${tone.dot} animate-pulse`} />
                        {w.eyebrow}
                      </span>
                      <span className="num-display mt-0.5 block text-[14px] font-bold text-white">
                        {w.title}
                      </span>
                      <span className="block text-[14px] text-white/65">
                        {w.sub}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators — clickable to jump */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {PRODUCT_SHOTS.map((s, i) => (
              <button
                key={s.path}
                type="button"
                onClick={() => setShotIdx(i)}
                aria-label={`Show ${s.label}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === shotIdx
                    ? 'w-6 bg-orange-500'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail / module strip — click to switch shots. Each tab
          shows a mini preview tile + the module label. The active tab
          gets an auto-progress bar that drains over SHOT_MS so the
          user understands the carousel cadence. */}
      <div className="mt-3 hidden grid-cols-2 gap-2 sm:grid sm:grid-cols-4">
        {PRODUCT_SHOTS.map((s, i) => {
          const isActive = i === shotIdx;
          return (
            <button
              key={s.path}
              type="button"
              onClick={() => setShotIdx(i)}
              aria-pressed={isActive}
              className={`group relative overflow-hidden rounded-lg border text-left transition-all ${
                isActive
                  ? 'border-orange-300 bg-white shadow-enterprise'
                  : 'border-cream-300 bg-white/80 hover:border-orange-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2.5 px-2.5 py-2">
                <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md ring-1 ring-cream-300">
                  <img
                    src={s.src}
                    alt=""
                    aria-hidden
                    loading="lazy" decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = s.fallback;
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {isActive && (
                    <span className="absolute inset-0 bg-orange-500/15 ring-1 ring-orange-300" />
                  )}
                </span>
                <span className="min-w-0 leading-tight">
                  <span className={`block truncate text-[11px] font-bold uppercase tracking-wide ${
                    isActive ? 'text-orange-700' : 'text-navy-700'
                  }`}>
                    {s.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[14px] text-navy-500">
                    {isActive ? 'Now showing' : 'Click to view'}
                  </span>
                </span>
              </div>

              {/* Auto-progress bar — drains over SHOT_MS while active.
                  Re-keyed by `shotIdx` so it restarts each rotation. */}
              {isActive && (
                <motion.span
                  key={`progress-${shotIdx}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SHOT_MS / 1000, ease: 'linear' }}
                  style={{ transformOrigin: '0% 50%' }}
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-orange-400 to-orange-500"
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default memo(HeroProductShowcase);
