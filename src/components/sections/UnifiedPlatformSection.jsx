import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Database, Sparkles } from 'lucide-react';
import Container from '../ui/Container.jsx';
import { PLATFORM_MODULES, PLATFORM_THEMES } from '../../data/modules.js';

/**
 * UpWon Products Showcase — homepage. Replaces the old "Stack vs Spine"
 * comparison. The point of this section now is: introduce the 7 UpWon
 * suites with their identity icons + tagline, all hanging off the
 * UpWon Core data spine. One screen, one message: "this is the suite."
 */
export default function UnifiedPlatformSection() {
  return (
    <section
      id="unified"
      className="relative overflow-hidden bg-white py-16 md:py-20"
    >
      <div className="absolute inset-0 grid-bg-light opacity-50" />

      <Container className="relative">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-orange-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
            One UpWon · Seven Suites
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 h-display text-balance text-3xl text-navy-950 md:text-5xl lg:text-[3.4rem]"
          >
            The complete <span className="gradient-text-orange">UpWon suite.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-navy-600 md:text-lg"
          >
            Seven purpose-built platforms. One shared data spine. Zero
            integration cost between modules.
          </motion.p>
        </div>

        {/* Core anchor — the data spine sits centred above the suites */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="shine-effect relative mx-auto mt-12 flex w-fit items-center gap-4 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500 to-orange-600 px-6 py-4 shadow-glow-orange"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
          <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/20 backdrop-blur">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div className="relative">
            <p className="font-display text-base font-bold leading-tight text-white md:text-lg">
              UpWon Core
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-100">
              Data Spine · Shared by every suite
            </p>
          </div>
          <Sparkles className="relative h-4 w-4 shrink-0 text-orange-100" />
        </motion.div>

        {/* Decorative line connecting Core to the products grid below */}
        <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-orange-500/40 to-transparent" />

        {/* 7 suites in a balanced grid: 4 across on top, 3 centred below.
            Trick: use an 8-column grid where each card spans 2, and shift the
            5th card to start at column 2 — that centres the last row of 3.

            Mobile Apps is filtered out here — it's a cross-platform capability,
            not one of the 7 brief platforms, and has its own dedicated section
            (<MobileAppsSection />) further down the home page. */}
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-8">
          {PLATFORM_MODULES.filter((m) => m.slug !== 'mobile-apps').map((m, i) => {
            // Brand-signature animation pass: each card now adopts its
            // platform's brand accent (instead of a single shared orange).
            // The icon chip tints to that colour at rest, the corner glow
            // and top accent line use it on hover, and the arrow flips to
            // match. The result is a "spectrum" of branded cards that
            // visually says "seven distinct platforms, one suite."
            const theme = PLATFORM_THEMES[m.slug] || {};
            const accent = theme.accent || '#E85A2A';
            const accentSoft = theme.accentSoft || '#FF7340';
            const tint = theme.tint || '#FFF1EC';
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
                className={`group relative lg:col-span-2 ${
                  i === 4 ? 'lg:col-start-2' : ''
                }`}
              >
                <Link
                  to={`/products/${m.slug}`}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-enterprise-lg"
                  style={{
                    borderColor: '#E4E7EB',
                    ['--accent']: accent,
                    ['--accent-soft']: accentSoft,
                    ['--accent-tint']: tint,
                  }}
                >
                  {/* Top accent line — uses the platform's brand colour */}
                  <div
                    className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}b3, transparent)`,
                    }}
                  />
                  {/* Corner glow on hover — brand-coloured */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-2xl transition-all duration-700"
                    style={{ background: `${accent}00` }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${accent}24`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = `${accent}00`)}
                  />

                  {/* Icon + arrow */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      className="relative grid h-14 w-14 place-items-center rounded-2xl ring-1 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        backgroundColor: tint,
                        color: accent,
                        ['--tw-ring-color']: `${accent}33`,
                      }}
                      whileHover={{
                        backgroundColor: accent,
                        color: '#fff',
                      }}
                      transition={{ duration: 0.35 }}
                    >
                      <m.icon className="h-7 w-7" />
                      {/* Subtle breathing pulse ring — only at rest */}
                      <span
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                        style={{
                          boxShadow: `0 0 0 0 ${accent}44`,
                          animation: 'whatsapp-pulse 3s ease-in-out infinite',
                        }}
                      />
                    </motion.div>
                    <ArrowUpRight
                      className="h-4 w-4 text-navy-300 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                      style={{ ['--arrow-hover']: accent }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    />
                  </div>

                  {/* Suite name + tagline */}
                  <h3 className="mt-5 font-display text-lg font-bold leading-tight text-navy-950">
                    {m.code}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-navy-600">
                    {m.short}
                  </p>

                  {/* "Connected to Core" pill — accent-coloured dot */}
                  <div className="mt-auto pt-5">
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: accent }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                      Connected to Core
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
