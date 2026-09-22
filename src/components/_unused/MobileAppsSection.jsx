import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Container from '../shared/Container/Container.jsx';
import SectionHeading from '../shared/SectionHeading/SectionHeading.jsx';
import { MOBILE_APPS } from '../../data/modules.js';

// Every mobile-app card routes to the dedicated platform page where
// all apps are documented. Update here if you add per-app pages later.
const APPS_HUB_HREF = '/products/mobile-apps';

// Each mobile app gets its own phone-screen palette so the four cards
// don't all read as identical orange tiles.
const APP_PALETTES = [
  { screen: 'from-orange-400 via-orange-500 to-orange-700', floor: 'group-hover:bg-orange-500/25', chip: 'border-orange-300 bg-orange-50 text-orange-700' },
  { screen: 'from-sky-400 via-sky-500 to-sky-700',          floor: 'group-hover:bg-sky-500/25',    chip: 'border-sky-300 bg-sky-50 text-sky-700' },
  { screen: 'from-emerald-400 via-emerald-500 to-emerald-700', floor: 'group-hover:bg-emerald-500/25', chip: 'border-emerald-300 bg-emerald-50 text-emerald-700' },
  { screen: 'from-violet-400 via-violet-500 to-violet-700', floor: 'group-hover:bg-violet-500/25', chip: 'border-violet-300 bg-violet-50 text-violet-700' },
];

export default function MobileAppsSection() {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-50" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-teal-500/[0.06] blur-3xl" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="UpWon Mobile App Ecosystem"
          title="Purpose-built apps for every operational persona."
          description="UpWon ships with role-specific mobile apps — for CXOs, plant security, outlet auditors and field sales. Each app connects natively to the core platform."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" id="mobile-apps-grid">
          {MOBILE_APPS.map((a, i) => {
            const palette = APP_PALETTES[i % APP_PALETTES.length];
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-gradient-to-br from-white to-cream-50 p-6 shadow-sm transition-all duration-500 hover:border-orange-500/40 hover:shadow-enterprise-lg"
              >
                {/* Card-wide clickable overlay — routes to the apps hub.
                    z-30 ensures it captures clicks across the whole card. */}
                <Link
                  to={APPS_HUB_HREF}
                  aria-label={`Explore ${a.title}`}
                  className="absolute inset-0 z-30"
                />

                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/0 transition-colors duration-700 group-hover:bg-orange-500/8" />

                <div className="relative mx-auto mb-5 h-32 w-[88px]">
                  <div className={`pointer-events-none absolute -bottom-3 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-navy-950/15 blur-md transition-all duration-500 group-hover:h-4 group-hover:w-20 ${palette.floor}`} />

                  <motion.div
                    whileHover={{ rotate: -3 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="relative h-full w-full rounded-[14px] border border-navy-200 bg-navy-950 p-1.5 shadow-enterprise"
                  >
                    <div className="absolute top-1.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-white/25" />
                    <div className={`relative h-full w-full overflow-hidden rounded-[10px] bg-gradient-to-br ${palette.screen} p-2`}>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />

                      <div className="relative grid h-7 w-7 place-items-center rounded-md bg-white/25 backdrop-blur-sm">
                        <a.icon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <div className="relative mt-1.5 h-1 w-14 rounded-full bg-white/55" />
                      <div className="relative mt-1 h-1 w-9 rounded-full bg-white/30" />

                      <div className="relative mt-2 grid grid-cols-2 gap-1">
                        <motion.div
                          animate={{ opacity: [0.25, 0.45, 0.25] }}
                          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.2 }}
                          className="h-3.5 rounded-sm bg-white"
                        />
                        <motion.div
                          animate={{ opacity: [0.45, 0.25, 0.45] }}
                          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.2 }}
                          className="h-3.5 rounded-sm bg-white"
                        />
                      </div>

                      <div className="relative mt-2 flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_6px_rgba(110,231,183,0.9)]" />
                        <span className="text-[6px] font-semibold uppercase tracking-[0.18em] text-white/85">
                          live
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <span className={`self-start rounded-full border px-2.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] ${palette.chip}`}>
                  {a.role}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-navy-950">
                  {a.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-700">{a.desc}</p>

                <div className="mt-auto pt-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Explore
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Play Store + App Store download badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-600">
            Download the UpWon apps
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* App Store */}
            <a
              href="https://apps.apple.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download UpWon on the App Store"
              className="group inline-flex items-center gap-3 rounded-xl border border-navy-950 bg-navy-950 px-5 py-3 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-enterprise"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
                <path d="M17.523 19.013c-.952 1.387-1.937 2.769-3.487 2.795-1.523.024-2.014-.904-3.755-.904-1.74 0-2.286.879-3.728.928-1.495.057-2.633-1.5-3.594-2.882-1.962-2.834-3.46-8.013-1.447-11.51 1.001-1.738 2.79-2.836 4.738-2.864 1.471-.026 2.86 1.001 3.752 1.001s2.582-1.235 4.355-1.054c.743.03 2.829.299 4.167 2.262-.108.068-2.488 1.456-2.46 4.346.029 3.44 3.026 4.586 3.06 4.602-.026.084-.476 1.653-1.601 3.28zM12.94 4.526c.787-.956 1.327-2.288 1.18-3.609-1.137.046-2.514.756-3.33 1.71-.732.847-1.378 2.205-1.204 3.504 1.273.099 2.564-.65 3.354-1.606z" />
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[10px] font-medium uppercase tracking-wide text-white/70">
                  Download on the
                </p>
                <p className="text-[16px] font-semibold tracking-tight">App Store</p>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get UpWon on Google Play"
              className="group inline-flex items-center gap-3 rounded-xl border border-navy-950 bg-navy-950 px-5 py-3 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-enterprise"
            >
              {/* Multi-color Google Play triangle */}
              <svg viewBox="0 0 100 100" className="h-7 w-7" aria-hidden>
                <defs>
                  <linearGradient id="gp-red" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#FF3A44" />
                    <stop offset="100%" stopColor="#C31162" />
                  </linearGradient>
                  <linearGradient id="gp-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00A0FF" />
                    <stop offset="100%" stopColor="#00DDFF" />
                  </linearGradient>
                  <linearGradient id="gp-yellow" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#FFE000" />
                    <stop offset="100%" stopColor="#FFBD00" />
                  </linearGradient>
                  <linearGradient id="gp-green" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F076" />
                    <stop offset="100%" stopColor="#00A35F" />
                  </linearGradient>
                </defs>
                {/* Blue (left wedge) */}
                <path d="M5 5 L60 50 L5 95 Z" fill="url(#gp-blue)" />
                {/* Green (bottom wedge) */}
                <path d="M60 50 L5 95 L80 70 Z" fill="url(#gp-green)" />
                {/* Yellow (right wedge) */}
                <path d="M60 50 L80 70 L95 50 L80 30 Z" fill="url(#gp-yellow)" />
                {/* Red (top wedge) */}
                <path d="M60 50 L80 30 L5 5 Z" fill="url(#gp-red)" />
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[10px] font-medium uppercase tracking-wide text-white/70">
                  Get it on
                </p>
                <p className="text-[16px] font-semibold tracking-tight">Google Play</p>
              </div>
            </a>
          </div>

          <p className="text-[14px] text-navy-500">
            7 role-specific apps · iOS 14+ and Android 9+ ·{' '}
            <Link
              to={APPS_HUB_HREF}
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              See all apps →
            </Link>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
