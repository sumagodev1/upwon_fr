import { useState, useEffect, useMemo } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

const GROUP_SIZE = 3;
const STEP_MS = 5000;

/**
 * Auto-scrolling subsystems carousel — shows 3 cards per page, slides the
 * next group in from the right every 5 seconds, loops continuously.
 * Click prev/next or any dot to jump.
 *
 * The `dark` prop is kept for backwards-compat with callers but the layout
 * always renders on the light grey surface now.
 */
export default function SubsystemsGrid({
  subsystems,
  theme,
  title,
  subtitle,
  // eslint-disable-next-line no-unused-vars
  dark = true,
}) {
  const accent = theme.accent;
  const accentSoft = theme.accentSoft;
  const accentDark = theme.accentDark;

  const groups = useMemo(() => {
    const out = [];
    for (let i = 0; i < subsystems.length; i += GROUP_SIZE) {
      out.push(subsystems.slice(i, i + GROUP_SIZE));
    }
    return out;
  }, [subsystems]);

  const total = groups.length;
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      setPage((p) => (p + 1) % total);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [total]);

  return (
    <section className="relative overflow-hidden bg-cream-100 section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow={`${subsystems.length} Sub-Systems Inside`}
          title={title || 'Every system your business needs — in one platform.'}
          description={subtitle}
        />

        <div className="relative mt-12">
          {/* Carousel viewport */}
          <div className="relative overflow-hidden px-2 pb-4 pt-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {groups[page].map((s, i) => {
                  const globalIdx = page * GROUP_SIZE + i;
                  return (
                    <motion.article
                      key={s.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.1 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ y: -4 }}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-enterprise"
                    >
                      {/* Top accent line on hover */}
                      <div
                        className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(to right, transparent, ${accent}b0, transparent)`,
                        }}
                      />
                      {/* Corner glow */}
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                        style={{ background: `${accent}25` }}
                      />

                      {/* Faded numeral */}
                      <span className="num-display pointer-events-none absolute right-5 top-3 text-5xl font-bold leading-none text-navy-950/[0.06]">
                        {String(globalIdx + 1).padStart(2, '0')}
                      </span>

                      {/* Header */}
                      <div className="relative flex items-start gap-3">
                        <div
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-[20px] transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: `${accent}15`,
                            boxShadow: `inset 0 0 0 1px ${accent}30`,
                          }}
                        >
                          {s.icon}
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                          <h3 className="font-display text-[14.5px] font-bold leading-snug text-navy-950">
                            {s.name}
                          </h3>
                          <p
                            className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: accentSoft }}
                          >
                            Module · {String(globalIdx + 1).padStart(2, '0')}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 h-px bg-cream-300" />

                      {/* Bullets */}
                      <ul className="mt-4 space-y-2">
                        {s.bullets.slice(0, 4).map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-[14px] leading-relaxed text-navy-700"
                          >
                            <span
                              className="mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full"
                              style={{ background: `${accent}25` }}
                            >
                              <Check
                                className="h-2 w-2"
                                strokeWidth={3.5}
                                style={{ color: accent }}
                              />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Outcome */}
                      <div className="mt-auto pt-5">
                        <div
                          className="flex items-start gap-2 overflow-hidden rounded-xl p-3"
                          style={{
                            background: `linear-gradient(135deg, ${accent}14, ${accent}05)`,
                            border: `1px solid ${accent}30`,
                          }}
                        >
                          <Sparkles
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: accent }}
                          />
                          <p
                            className="text-[14px] font-semibold leading-snug"
                            style={{ color: accentDark }}
                          >
                            {s.outcome}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination controls */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              onClick={() => setPage((p) => (p - 1 + total) % total)}
              aria-label="Previous group"
              className="grid h-10 w-10 place-items-center rounded-full border border-cream-300 bg-white text-navy-700 shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-navy-300 hover:text-navy-950"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {groups.map((_, i) => {
                const isActive = i === page;
                return (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Go to group ${i + 1}`}
                    className="relative h-1.5 overflow-hidden rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? '40px' : '14px',
                      background: isActive ? '#E4E7EB' : '#D1D5DB',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        key={`fill-${page}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: accent }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage((p) => (p + 1) % total)}
              aria-label="Next group"
              className="grid h-10 w-10 place-items-center rounded-full border border-cream-300 bg-white text-navy-700 shadow-sm transition-all duration-300 hover:translate-x-0.5 hover:border-navy-300 hover:text-navy-950"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Status hint */}
          <p className="mt-4 text-center text-[10.5px] font-semibold uppercase tracking-[0.18em] text-navy-500">
            Group {page + 1} of {total}
          </p>
        </div>
      </Container>
    </section>
  );
}
