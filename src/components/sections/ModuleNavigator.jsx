import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

// Brief §2.4 — Module Navigator.
// UX pattern: left sidebar tabs (one per module) on desktop. Active tab pushes
// its name + icon + 3 benefit bullets + outcome highlight + screenshot zone
// into the right pane.
// Mobile: horizontal scroll tab strip on top, content panel stacks below.
//
// Replaces the previous flat SubsystemsGrid render on product pages. The data
// shape is the same — { icon, name, bullets[], outcome } per subsystem from
// SUBSYSTEMS[slug] in modules.js — so no data migration is needed.
//
// Each tab's "Watch Module Demo" link routes to /demo with a query param
// hinting the module so the demo team can pre-prep.
//
// Auto-rotation: cycles through every module every AUTO_INTERVAL_MS so the
// section feels alive even when the visitor doesn't interact. Pauses on
// hover, on focus, on manual tab click, and when the section is offscreen.
// User can toggle play/pause via the button in the right pane's footer.
const AUTO_INTERVAL_MS = 4500;

export default function ModuleNavigator({ subsystems, theme, productCode, productSlug }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const tabListRef = useRef(null);
  const tabRefs = useRef([]);

  // Pause auto-rotation when section is offscreen — avoids burning CPU on
  // unseen carousels and prevents the right pane from drifting silently
  // while a visitor is reading other parts of the page.
  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-advance. Restarted from the current index whenever the index, pause
  // state, or visibility flips.
  useEffect(() => {
    if (isPaused || !inView || !subsystems || subsystems.length < 2) {
      return undefined;
    }
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % subsystems.length);
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, inView, subsystems, activeIdx]);

  // Below lg: tabs are a single horizontal scroll strip — keep the active
  // tab centered as the auto-tour advances. block:'nearest' ensures the
  // page never scrolls vertically; inline:'center' only nudges the strip's
  // own horizontal scroll. At lg+ the list is a vertical sidebar and every
  // tab is already in view, so skip.
  useEffect(() => {
    const list = tabListRef.current;
    const tab = tabRefs.current[activeIdx];
    if (!list || !tab) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIdx]);

  if (!subsystems || subsystems.length === 0) return null;

  const accent = theme?.accent || '#E85A2A';
  const accentSoft = theme?.accentSoft || '#FF7340';
  const tint = theme?.tint || '#FFF1EC';
  const active = subsystems[activeIdx];

  // Wrap setActiveIdx so a manual click also "resets" the pause cycle —
  // user gets a fresh AUTO_INTERVAL_MS on whatever module they jumped to.
  const handleTabClick = (i) => {
    setActiveIdx(i);
  };

  return (
    <section
      id="modules"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        // Only resume when focus actually leaves the section
        if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
      }}
      className="relative overflow-hidden bg-navy-950 section-pad scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full blur-[140px]"
        style={{ background: `${accent}24` }}
      />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="dark"
          eyebrow={`Inside ${productCode}`}
          title={
            <>
              Every system your business needs —{' '}
              <span style={{ color: accentSoft }}>purpose-built, connected.</span>
            </>
          }
          description="Pick a module. See its three signature outcomes. Watch how it ties to the rest of the platform."
        />

        <div className="mt-12 grid gap-6 md:gap-8 lg:grid-cols-[300px_1fr]">
          {/* LEFT — vertical tab list (desktop) / horizontal scroll (mobile) */}
          <div className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
            <ul
              ref={tabListRef}
              className="flex min-w-max gap-1 md:gap-2 lg:min-w-0 lg:flex-col lg:gap-1"
              role="tablist"
              aria-label={`${productCode} modules`}
            >
              {subsystems.map((s, i) => {
                const isActive = i === activeIdx;
                return (
                  <li key={s.name} className="lg:w-full">
                    <button
                      ref={(el) => (tabRefs.current[i] = el)}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleTabClick(i)}
                      className={`group relative flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                        isActive
                          ? 'bg-white/[0.08] shadow-lg backdrop-blur-sm'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                      style={
                        isActive
                          ? {
                              borderColor: `${accent}66`,
                              boxShadow: `0 12px 32px -16px ${accent}55`,
                            }
                          : undefined
                      }
                    >
                      {/* Active accent stripe */}
                      {isActive && (
                        <span
                          className="absolute inset-y-2 left-0 w-[3px] rounded-full"
                          style={{ background: accent }}
                        />
                      )}

                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-base transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: isActive ? accent : `${accent}1f`,
                          color: isActive ? '#fff' : accentSoft,
                        }}
                      >
                        <span aria-hidden>{s.icon}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-[10px] font-bold uppercase tracking-[0.18em] ${
                            isActive ? 'text-white/75' : 'text-white/55'
                          }`}
                        >
                          Module {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`mt-0.5 block text-[14px] font-semibold leading-tight ${
                            isActive ? 'text-white' : 'text-white/80'
                          }`}
                        >
                          {s.name}
                        </span>
                      </span>
                      {/* Auto-advance progress bar — only on the active tab.
                          A 1px line that fills 0 → 100% over AUTO_INTERVAL_MS
                          using a keyframed scaleX. Reset via `key` so each
                          activation restarts the animation cleanly. */}
                      {isActive && !isPaused && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-2 -bottom-px h-[2px] overflow-hidden rounded-full"
                          style={{ background: `${accent}26` }}
                        >
                          <span
                            key={`bar-${activeIdx}`}
                            className="block h-full origin-left"
                            style={{
                              background: `linear-gradient(90deg, ${accent}, ${accentSoft})`,
                              animation: `module-progress ${AUTO_INTERVAL_MS}ms linear forwards`,
                            }}
                          />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT — content pane for active module */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              role="tabpanel"
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm md:p-9"
              style={{
                boxShadow: `0 32px 80px -32px ${accent}66`,
              }}
            >
              <div
                className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full blur-3xl"
                style={{ background: `${accent}28` }}
              />

              <div className="relative grid items-start gap-8 lg:grid-cols-[1fr_auto]">
                {/* Module header + bullets */}
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-2xl"
                      style={{ background: tint, color: accent }}
                    >
                      <span aria-hidden>{active.icon}</span>
                    </span>
                    <div>
                      <p
                        className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                        style={{ color: accentSoft }}
                      >
                        Module {String(activeIdx + 1).padStart(2, '0')} of {String(subsystems.length).padStart(2, '0')}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                        {active.name}
                      </h3>
                    </div>
                  </div>

                  <ul className="mt-6 grid gap-2.5">
                    {active.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span
                          className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                          style={{ background: `${accent}33`, color: accentSoft }}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="text-[14px] leading-relaxed text-white/85">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Outcome highlight */}
                  {active.outcome && (
                    <div
                      className="mt-7 flex items-start gap-3 rounded-2xl border bg-white/[0.04] p-4"
                      style={{ borderColor: `${accent}40` }}
                    >
                      <Sparkles
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: accentSoft }}
                      />
                      <p className="text-[14px] leading-relaxed text-white">
                        <span
                          className="font-bold"
                          style={{ color: accentSoft }}
                        >
                          Outcome:{' '}
                        </span>
                        {active.outcome}
                      </p>
                    </div>
                  )}

                  {/* Per-module CTA */}
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/demo?module=${productSlug}-${activeIdx + 1}`}
                      className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-[14px] font-semibold text-white transition-colors"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, ${accentSoft})`,
                      }}
                    >
                      Watch this module in a 30-min demo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {/* <Link
                      to={`/products/${productSlug}#flow`}
                      className="text-[14px] font-semibold transition-colors"
                      style={{ color: accentSoft }}
                    >
                      See where this fits in the flow →
                    </Link> */}
                  </div>
                </div>

                {/* Right-side decorative "screenshot" panel placeholder.
                    Replaced when real per-module screenshots are added. */}
                <div className="hidden lg:block">
                  <div
                    className="relative h-72 w-64 overflow-hidden rounded-2xl border border-white/10"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${accent}33, transparent 60%), linear-gradient(160deg, #0F1535, #181d4f)`,
                    }}
                  >
                    {/* Faux browser chrome */}
                    <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="p-4">
                      <div className="h-3 w-32 rounded-full bg-white/15" />
                      <div className="mt-2 h-2 w-20 rounded-full bg-white/10" />
                      <div className="mt-6 grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((k) => (
                          <div
                            key={k}
                            className="h-14 rounded-lg border border-white/10"
                            style={{
                              background: `linear-gradient(135deg, ${accent}1a, transparent)`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-4 h-20 rounded-lg border border-white/10 bg-white/[0.03]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer — play/pause toggle on the left, "see all in demo" CTA right.
            Toggle uses aria-pressed so screen readers know the state. */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <button
            type="button"
            aria-pressed={!isPaused}
            onClick={() => setIsPaused((p) => !p)}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[14px] font-semibold text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {isPaused ? (
              <Play className="h-3.5 w-3.5" style={{ color: accentSoft }} />
            ) : (
              <Pause className="h-3.5 w-3.5" style={{ color: accentSoft }} />
            )}
            <span>
              Auto-tour {isPaused ? 'paused' : 'on'} ·{' '}
              <span className="text-white/45">
                {String(activeIdx + 1).padStart(2, '0')} / {String(subsystems.length).padStart(2, '0')}
              </span>
            </span>
          </button>

          <Link
            to="/demo"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/80 hover:text-white"
          >
            See all {subsystems.length} modules in one live demo
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>

      {/* Inline keyframe for the progress-bar fill. Scoped via the component
          so we don't need to touch the global Tailwind config. */}
      <style>{`
        @keyframes module-progress {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
