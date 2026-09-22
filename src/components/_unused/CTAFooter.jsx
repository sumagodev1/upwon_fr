import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import Container from '../shared/Container/Container.jsx';

export default function CTAFooter() {
  return (
    <section className="relative overflow-hidden bg-navy-950 section-pad">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[600px] w-[1100px] -translate-y-1/3 rounded-full bg-navy-400/15 blur-[160px]" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.015] p-10 backdrop-blur-md md:p-16"
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-navy-600/40 blur-3xl" />

          {/* Logo prestige badge — floats above the panel */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mb-10 flex w-fit items-center justify-center"
          >
            <div className="absolute inset-0 -m-3 rounded-3xl bg-gradient-to-br from-orange-500/30 to-orange-500/10 blur-2xl" />
            <div className="shine-effect-soft relative flex items-center gap-4 rounded-2xl border border-white/15 bg-white/95 px-5 py-3 shadow-glow-orange backdrop-blur-md">
              <img
                src="/upwon-logo.webp"
                alt="UpWon — Business Growth Suite"
                className="h-24 w-auto md:h-28"
                width="500"
                height="237"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </div>
          </motion.div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                Let's talk operations
              </p>
 <h2 className="mt-5 h-display text-[36.8px] text-balance text-white">
                Ready to see UpWon <br />
                in <span className="gradient-text-orange">your business?</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
                Request a 45-minute product walkthrough — mapped to your
                specific operations, your business model, and your team.
                Walk out with a phased plan you can defend.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="btn-primary !px-6 !py-3.5">
                  Book Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href="#" className="btn-secondary-dark !px-6 !py-3.5">
                  <Calendar className="h-4 w-4" />
                  Schedule with leadership
                </a>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                { t: 'Operational walkthrough', d: 'We map your factory, depots, outlets and franchise flow.' },
                { t: 'Gap & blueprint', d: 'You leave with a tailored solution blueprint.' },
                { t: 'Implementation plan', d: 'A phased deployment plan with KPIs and SLAs.' },
              ].map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: -4, borderColor: 'rgba(232, 93, 38, 0.4)' }}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orange-500/0 via-orange-500/60 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-500/15 text-sm font-bold text-orange-300 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{s.t}</p>
                    <p className="mt-1 text-[14px] text-slate-400">{s.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
