import { m as motion } from 'framer-motion';
import { MapPin, Wallet, Heart, ShieldCheck } from 'lucide-react';
import Container from '../ui/Container.jsx';

// Brief §19.5 — Nashik Pride: "Built in Nashik. Built for India."
// Map visual + bootstrapped narrative: "bootstrapped, not VC-funded, every
// customer's success is our growth."
//
// Layout: full-width band with LEFT narrative + RIGHT minimal India SVG
// outline. A Nashik dot is highlighted with a slow-pulsing ring. Three
// trust pills underline the bootstrapped story (₹0 VC, customer-funded,
// 9 years).
//
// The SVG outline is intentionally schematic — not a geographically precise
// India map — so it scales cleanly and stays brand-light. If you want a
// proper outline later, swap the `<path d=...>` for one from a TopoJSON
// extract; the surrounding layout will continue to work.
export default function NashikPrideSection() {
  return (
    <section
      id="nashik"
      className="relative overflow-hidden bg-navy-950 text-white section-pad scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-orange-500/[0.12] blur-[160px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-orange-400/[0.08] blur-[160px]" />

      <Container className="relative">
        <div className="grid items-center gap-12 md:gap-16 lg:grid-cols-[1.1fr_1fr]">
          {/* LEFT — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-300">
              <MapPin className="h-3 w-3" />
              Maharashtra · India
            </p>
            <h2 className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight sm:text-[32px] lg:text-[36.8px]">
              Built in Nashik.{' '}
              <span className="gradient-text-orange">Built for India.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/75 sm:text-[15px]">
              Nine years. No VC. Not a single rupee of outside capital. We are
              built and owned by the team that wrote the code, walked the
              factory floors and answered the support calls.
            </p>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/65">
              Every customer&apos;s renewal funded the next product. Every
              customer&apos;s growth funded ours. That is the only model we
              know — and the one we&apos;re proud of.
            </p>

            {/* Trust pills */}
            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Wallet,
                  k: '₹0',
                  v: 'VC raised — fully bootstrapped',
                },
                {
                  icon: Heart,
                  k: '100%',
                  v: 'Customer-funded growth',
                },
                {
                  icon: ShieldCheck,
                  k: '9 yrs',
                  v: 'Same founding team',
                },
              ].map((p, i) => (
                <motion.li
                  key={p.k}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.2 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 num-display text-2xl font-bold text-white">
                    {p.k}
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-white/65">
                    {p.v}
                  </p>
                </motion.li>
              ))}
            </ul>

            <p className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
              Founded 2016 · Nashik HQ · Pan-India delivery
            </p>
          </motion.div>

          {/* RIGHT — India outline + Nashik dot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden rounded-3xl border border-white/10 bg-navy-900 shadow-[0_30px_80px_-20px_rgba(15,21,53,0.55)]">
              {/* Google Maps iframe — no API key needed for the public embed
                  endpoint. Centred on Nashik HQ with a zoom level that shows
                  Pune / Mumbai / Aurangabad context. `loading="lazy" decoding="async"` so it
                  doesn't block above-the-fold paint on the About page.
                  The dark wrapper + subtle orange glow keep the iframe
                  visually consistent with the rest of the section. */}
              <iframe
                title="UpWon HQ — Nashik, India"
                src="https://maps.google.com/maps?q=Nashik%20HQ%2C%20Byte%20Elephants%20Technologies%2C%20Nashik%2C%20India&t=&z=5&ie=UTF8&iwloc=&output=embed"
                loading="lazy" decoding="async"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                style={{ filter: 'saturate(0.95)' }}
              />

              {/* Subtle orange edge tint to match the section's brand glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(232,93,38,0.25), inset 0 60px 80px -40px rgba(232,93,38,0.15), inset 0 -60px 80px -40px rgba(15,21,53,0.5)',
                }}
              />

              {/* Top-left "Nashik HQ" pill overlay so the focus is unmissable */}
              <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-orange-400/40 bg-navy-950/85 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-orange-300 shadow-sm backdrop-blur-sm">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-pulse-slow rounded-full bg-orange-400/60" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-orange-400" />
                </span>
                Nashik HQ
              </div>

              {/* Top-right "Live" pill so the iframe reads as a real map */}
              <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live · Google Maps
              </div>


              {/* Floating caption */}
              <div className="pointer-events-none absolute -bottom-2 left-0 right-0 text-center">
                <p className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse-slow" />
                  Deployments across 10 states
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
