import { useState, useEffect, useMemo, useRef } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Pause, Play, Sparkles, Star } from 'lucide-react';
import Container from '../shared/Container/Container.jsx';
import {
  INDUSTRY_IMAGES,
  INDUSTRY_FALLBACK_IMAGE,
  HOMEPAGE_HEADLINES,
  INDUSTRY_REVENUE_POTENTIAL,
  REVENUE_POTENTIAL_LABELS,
  getHomepageTop7,
} from '../../data/industries.js';

const STEP_MS = 6000;

// Picker-chip labels for the Homepage Top 7 sectors. Aligned with the
// Platform-Sector Mapping workbook — the order and naming match the
// strategic intent. Bakery / Spices / Engineering are still reachable via
// the Industries hub but are not part of the homepage spotlight.
const SHORT_LABELS = {
  'food-processing': 'Food Mfg',
  fmcg: 'FMCG Dist',
  dairy: 'Dairy',
  qsr: 'QSR',
  sweets: 'Sweets',
  beverages: 'Beverages',
  'non-food-fmcg': 'Non-Food',
};

// Very-layman description per industry — written so anyone (a shop owner,
// a worker, even a non-industry visitor) instantly understands what UpWon
// does for that business. Calls out the specific UpWon suites at play.
const INDUSTRY_DESCRIPTIONS = {
  bakery:
    'UpWon ERP + FMS + Mobile Apps run your bakery brand end-to-end — recipes, expiry dates, daily orders, what each shop sold today. Even at 200 outlets.',
  dairy:
    'UpWon ERP + WMS + SFA-DMS handle your milk business from farmer to family — quality, cold trucks, route tracking, farmer payments. All in one place.',
  fmcg:
    'UpWon SFA-DMS + Mobile Apps show you what your shops really sold today, catch fake distributor claims, and track every salesman in real time.',
  qsr:
    'UpWon FMS + POS run your restaurant chain end-to-end — orders, kitchen, billing, Swiggy / Zomato. All from one screen, for every outlet.',
  sweets:
    'UpWon ERP + WMS + FMS run your sweet shop chain even at festival rush — old stock stays off the counter, bills move in seconds, recipes stay locked in.',
  spices:
    'UpWon ERP + Vendor Portal handle your spice business from the mandi to the export container — quality, paperwork, government certificates — all automatic.',
  'food-processing':
    'UpWon ERP + WMS manage all your factories as one — what is being made, what is being wasted, and which batch went to which customer.',
  beverages:
    'UpWon ERP + SFA-DMS keep every bottle the same quality, show what is selling where, and settle distributor discounts automatically.',
  'non-food-fmcg':
    'The same UpWon SFA-DMS + WMS + FMS that power India\'s top food brands — applied to your personal care, home care, or OTC business unchanged.',
  engineering:
    'UpWon ERP + Vendor Portal track every part of your product, every supplier you work with, and every project\'s profit — in real time, automatically.',
};

// Very-layman benefit lines — each names the specific UpWon suite delivering
// the benefit, so the operator sees exactly which product does what for them.
const INDUSTRY_OUTCOMES = {
  bakery: [
    'UpWon ERP tracks every cake — ingredients, expiry, which shop it went to',
    'UpWon FMS takes orders from your shops all day and tells you what to bake tomorrow',
    'UpWon HREasy + Core run billing, audits and royalty — no extra back-office people needed',
  ],
  dairy: [
    'UpWon ERP checks the fat and quality of every milk batch — automatically',
    'UpWon WMS warns you the moment a cold truck heats up — before any milk goes bad',
    'UpWon HREasy calculates what each farmer should be paid — based on what they actually brought',
  ],
  fmcg: [
    'UpWon SFA-DMS shows what every shop sold today — not next month',
    'UpWon SFA-DMS catches fake discount claims from distributors — before you pay them',
    'UpWon Mobile Apps track where every salesman is and which shops they actually visited',
  ],
  qsr: [
    'UpWon FMS manages every outlet from one screen — even if you have 200',
    'UpWon POS sends customer orders straight to the kitchen — no slips, no missed items',
    'UpWon FMS connects Swiggy and Zomato so online orders come in automatically',
  ],
  sweets: [
    'UpWon WMS stops you from selling old sweets — it knows what is fresh',
    'UpWon FMS + POS handle the festival rush — bills go out in seconds, not minutes',
    'UpWon ERP protects your old family recipes — alerts you if anything quietly changes',
  ],
  spices: [
    'UpWon ERP checks every spice bag for quality before it leaves your warehouse',
    'UpWon Vendor Portal puts all your mandi purchases on one screen — no paper, no missed entries',
    'UpWon ERP keeps every government certificate ready — show inspectors in one click',
  ],
  'food-processing': [
    'UpWon ERP schedules production across all your factories — from one screen',
    'UpWon ERP tracks where material is being lost — at every step of every batch',
    'UpWon WMS finds the exact batch a customer complained about — in minutes',
  ],
  beverages: [
    'UpWon ERP locks your recipe so every bottle tastes exactly the same',
    'UpWon SFA-DMS shows you which shop is selling what — area by area, day by day',
    'UpWon SFA-DMS calculates distributor discounts automatically — no more arguments',
  ],
  'non-food-fmcg': [
    'UpWon SFA-DMS runs your soap, shampoo or cleaner brand the same way it runs food brands',
    'UpWon SFA-DMS + FMS cover small shops, supermarkets and online stores — all from one place',
    'UpWon SFA-DMS + WMS protect your profit margin across every selling channel',
  ],
  engineering: [
    'UpWon ERP tracks every screw, bolt and part in your product — automatically',
    'UpWon ERP tells you if a project is making or losing money — in real time',
    'UpWon Vendor Portal manages your suppliers — quotes, orders, payments — in days, not weeks',
  ],
};

/**
 * Industry Spotlight — auto-cycling showcase tuned to fit a single
 * viewport (~720px tall) without page scroll. Tight header, compact card,
 * inline pill row.
 */
export default function IndustrySelector() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Homepage Top 7 — Food Mfg, FMCG Dist, Dairy, QSR, Sweets, Beverages,
  // Non-Food FMCG, in spreadsheet-prescribed rank order. The remaining
  // industries stay reachable at /industries and via deep links.
  const sectors = useMemo(() => getHomepageTop7(), []);
  const total = sectors.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % total);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [total, isPaused]);

  // Keep the active chip centred as the carousel auto-cycles (or on manual
  // click) so on mobile the highlighted sector never ends up off-screen.
  //
  // IMPORTANT: scroll ONLY the chip's horizontal container — NOT via
  // element.scrollIntoView(), which also scrolls the window vertically and
  // would yank the whole page back up to this section every 6s once the
  // visitor has scrolled past it.
  const scrollRef = useRef(null);
  const activeChipRef = useRef(null);
  useEffect(() => {
    const container = scrollRef.current;
    const chip = activeChipRef.current;
    if (!container || !chip) return;
    // Nothing to scroll when the row already fits (desktop).
    if (container.scrollWidth <= container.clientWidth) return;
    const cRect = container.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const delta =
      chipRect.left + chipRect.width / 2 - (cRect.left + cRect.width / 2);
    container.scrollBy({ left: delta, behavior: 'smooth' });
  }, [activeIdx]);

  const active = sectors[activeIdx];
  const image = INDUSTRY_IMAGES[active.id] || INDUSTRY_FALLBACK_IMAGE;
  const firstName = active.name.split(' ')[0];
  const meta = HOMEPAGE_HEADLINES[active.id];
  const revenue =
    REVENUE_POTENTIAL_LABELS[INDUSTRY_REVENUE_POTENTIAL[active.id]];

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14">
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Compact heading — eyebrow + one-line title, no description */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-600">
            <Sparkles className="h-3 w-3" />
            7 Sectors · One Platform
          </p>
 <h2 className="mt-2 h-display text-[36.8px] text-balance leading-[1.1] text-navy-950">
            Built for the seven sectors that{' '}
            <span className="gradient-text-orange">move Food &amp; FMCG India.</span>
          </h2>
        </div>

        {/* Industry picker — full-width filter strip + pause/play control */}
        <div className="mt-6 flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
            title={isPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
            className={`group grid h-auto w-12 shrink-0 place-items-center rounded-2xl border transition-all duration-300 ${
              isPaused
                ? 'border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100'
                : 'border-cream-300 bg-white/70 text-navy-700 backdrop-blur hover:bg-cream-200'
            }`}
          >
            {isPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </button>

          <div
            ref={scrollRef}
            className="min-w-0 flex-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* On mobile the chips size to their labels and the row scrolls
                horizontally (so nothing gets clipped); from md+ they flex to
                fill the strip evenly. */}
            <div className="flex w-max items-stretch gap-2 rounded-2xl border border-cream-300 bg-white/70 p-2 backdrop-blur md:w-full md:justify-between">
              {sectors.map((ind, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={ind.id}
                    ref={isActive ? activeChipRef : null}
                    onClick={() => setActiveIdx(i)}
                    className={`group relative inline-flex shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-xl px-3 py-2 text-[14px] font-semibold transition-all duration-300 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:flex-1 ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-navy-700 hover:bg-cream-200 hover:text-navy-950'
                    }`}
                    aria-label={`Show ${ind.name}`}
                  >
                    <ind.icon
                      className={`h-4 w-4 ${isActive ? 'text-white' : 'text-orange-600'}`}
                    />
                    <span className="whitespace-nowrap">
                      {SHORT_LABELS[ind.id] || ind.name.split(' ')[0]}
                    </span>
                    {isActive && !isPaused && (
                      <motion.span
                        key={`fill-${activeIdx}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/80"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Showcase card */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-cream-300 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-[1.05fr_1fr]"
            >
              {/* IMAGE PANEL */}
              {/* lg height is auto so the grid stretches this panel to match the
                  (usually taller) content column — no empty white gap below the
                  image. Mobile/sm keep fixed heights (stacked layout).
                  Original: lg:h-[360px] */}
              <div className="relative h-72 overflow-hidden sm:h-64 lg:h-auto lg:min-h-[360px]">
                <motion.img
                  key={`${active.id}-img`}
                  src={image}
                  alt={active.name}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-navy-950/10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-r from-transparent to-white lg:block" />

                {/* Counter top-left */}
                <div className="absolute left-5 top-4 flex items-baseline gap-1.5">
                  <span className="num-display text-3xl font-bold leading-none text-white drop-shadow md:text-4xl">
                    {String(activeIdx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] font-medium text-white/60">
                    / {String(total).padStart(2, '0')}
                  </span>
                </div>

                {/* Icon top-right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-5 top-4 grid h-11 w-11 place-items-center rounded-xl border border-white/30 bg-white/95 text-orange-600 shadow-enterprise backdrop-blur"
                >
                  <active.icon className="h-5 w-5" />
                </motion.div>

                {/* Identity block — overlay bottom. Uses the spreadsheet-
                    prescribed headline + sub-headline for Top 7 sectors so
                    homepage copy is consistent with the marketing strategy. */}
                <div className="absolute inset-x-5 bottom-4 lg:max-w-md">
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.12 }}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300"
                  >
                    <span>#{activeIdx + 1} · {meta?.rankLabel || active.name}</span>
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 }}
                    className="mt-1.5 font-display text-lg font-bold leading-tight text-white sm:text-2xl md:text-[1.7rem]"
                  >
                    {meta?.headline || active.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.24 }}
                    className="mt-2 line-clamp-2 text-[14px] leading-snug text-white/85 md:text-[14px]"
                  >
                    {meta?.subheadline || active.description}
                  </motion.p>

                  {/* Revenue potential + market size badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.3 }}
                    className="mt-3 flex flex-wrap items-center gap-2"
                  >
                    {revenue && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-orange-400/40 bg-orange-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-100 backdrop-blur">
                        <span className="inline-flex">
                          {Array.from({ length: revenue.stars }).map((_, s) => (
                            <Star
                              key={s}
                              className="h-2.5 w-2.5 text-orange-300"
                              fill="currentColor"
                            />
                          ))}
                        </span>
                        Revenue: {revenue.label}
                      </span>
                    )}
                    {meta?.marketSize && (
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/85 backdrop-blur">
                        Market: {meta.marketSize}
                      </span>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* CONTENT PANEL */}
              <div className="flex flex-col p-5 md:p-7 lg:p-8">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  className="text-[14px] leading-relaxed text-navy-700 md:text-[15px]"
                >
                  {INDUSTRY_DESCRIPTIONS[active.id] || active.description}
                </motion.p>

                {/* Metric stat row — compact */}
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {active.metrics.slice(0, 3).map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.28 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="rounded-xl border border-cream-300 bg-gradient-to-br from-white to-cream-100 p-3"
                    >
                      <p className="num-display text-base font-bold text-orange-600 md:text-lg">
                        {m.value}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[14px] leading-tight text-navy-600">
                        {m.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Plain-language outcomes — what this means for the operator */}
                {INDUSTRY_OUTCOMES[active.id] && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-5"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                      How UpWon helps you
                    </p>
                    <ul className="mt-2.5 space-y-2">
                      {INDUSTRY_OUTCOMES[active.id].map((o, i) => (
                        <motion.li
                          key={o}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.45 + i * 0.06,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="flex items-start gap-2 text-[14px] leading-snug text-navy-800"
                        >
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-orange-100">
                            <Check
                              className="h-2.5 w-2.5 text-orange-600"
                              strokeWidth={3.5}
                            />
                          </span>
                          <span>{o}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="mt-auto flex flex-wrap items-center gap-3 pt-5"
                >
                  <Link
                    to={`/industries/${active.slug}`}
                    className="btn-primary !px-4 !py-2 !text-[14px]"
                  >
                    Explore {firstName}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link to="/industries" className="btn-secondary !px-4 !py-2 !text-[14px]">
                    See all industries
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </Container>
    </section>
  );
}
