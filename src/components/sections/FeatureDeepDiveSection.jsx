import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Quote } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { getPlatformDeepDives } from '../../data/modules.js';

// Brief §2.5 + §2.6 — Two feature deep-dives per product page rendered as
// alternating zigzag blocks (text/visual on alternate sides) so the reading
// rhythm stays interesting on long-form pages.
//
// Each deep-dive: eyebrow, title, subhead, 5 capability bullets, a pull quote
// with attribution, a "screenshot" visual placeholder, and a CTA. The visual
// uses platform accent colours and a faux UI mock so the section feels alive
// before real screenshots ship.
//
// `eyebrow` / `title` / `description` are optional overrides for the section
// heading; callers (e.g. IndustryPage) pass industry-aware copy, otherwise a
// strong generic default is used.
export default function FeatureDeepDiveSection({
  slug,
  theme,
  productSlug,
  eyebrow = 'Feature Deep-Dive',
  title,
  description = 'Two signature capabilities, in detail — the features that decide whether a platform actually fits how you run, not just how it demos.',
}) {
  const dives = getPlatformDeepDives(slug);
  if (!dives) return null;

  const accent = theme?.accent || '#E85A2A';

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white scroll-mt-32"
    >
      {/* Section heading — gives the deep-dive blocks a proper title instead
          of opening straight into Block A. */}
      <div className="bg-white pt-16 md:pt-20">
        <Container>
          <SectionHeading
            align="center"
            variant="light"
            eyebrow={eyebrow}
            title={
              title || (
                <>
                  Where it goes{' '}
                  <span style={{ color: accent }}>deeper than a demo.</span>
                </>
              )
            }
            description={description}
          />
        </Container>
      </div>

      {/* Block A — text LEFT, visual RIGHT */}
      <DeepDiveBlock
        block={dives.a}
        theme={theme}
        productSlug={productSlug}
        flipped={false}
        bgClass="bg-white"
      />
      {/* Block B — text RIGHT, visual LEFT */}
      <DeepDiveBlock
        block={dives.b}
        theme={theme}
        productSlug={productSlug}
        flipped
        bgClass="bg-cream-100"
      />
    </section>
  );
}

function DeepDiveBlock({ block, theme, productSlug, flipped, bgClass }) {
  const accent = theme?.accent || '#E85A2A';
  const accentSoft = theme?.accentSoft || '#FF7340';
  const tint = theme?.tint || '#FFF1EC';

  return (
    <div className={`relative overflow-hidden ${bgClass} section-pad`}>
      <div className="absolute inset-0 grid-bg-light opacity-20" />
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-[160px]"
        style={{ background: `${accent}10` }}
      />

      <Container className="relative">
        <div
          className={`grid items-center gap-10 md:gap-14 ${
            flipped ? 'md:grid-cols-2' : 'md:grid-cols-2'
          }`}
        >
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: flipped ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={flipped ? 'md:order-2' : ''}
          >
            <p
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em]"
              style={{
                background: tint,
                color: accent,
                borderColor: `${accent}33`,
              }}
            >
              {block.eyebrow}
            </p>
            <h3 className="mt-4 font-display text-balance text-[1.9rem] font-bold leading-[1.1] text-navy-950 md:text-[2.3rem]">
              {block.title}
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-700">
              {block.sub}
            </p>

            <ul className="mt-6 grid gap-2.5">
              {block.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    style={{ background: accent, color: '#fff' }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[14px] leading-relaxed text-navy-800">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            {/* Pull quote */}
            <div
              className="relative mt-7 rounded-2xl border bg-white p-5 shadow-sm"
              style={{ borderColor: `${accent}33` }}
            >
              <Quote
                className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-white p-1"
                style={{ color: accent }}
                strokeWidth={2.5}
              />
              <p className="font-display text-[14px] italic leading-relaxed text-navy-900">
                &ldquo;{block.pullQuote.text}&rdquo;
              </p>
              <p
                className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: accent }}
              >
                — {block.pullQuote.attrib}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to={`/demo?focus=${productSlug}-${encodeURIComponent(block.eyebrow)}`}
                className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-[14px] font-semibold text-white transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accentSoft})`,
                }}
              >
                {block.ctaLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              {/* <Link
                to="/resources"
                className="text-[14px] font-semibold text-navy-700 underline-offset-2 hover:underline"
              >
                Download the datasheet
              </Link> */}
            </div>
          </motion.div>

          {/* VISUAL — faux screenshot card */}
          <motion.div
            initial={{ opacity: 0, x: flipped ? -30 : 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={flipped ? 'md:order-1' : ''}
          >
            <div
              className="relative overflow-hidden rounded-3xl border border-navy-100 bg-navy-950 shadow-[0_30px_80px_-20px_rgba(15,21,53,0.45)] ring-1 ring-white/5"
            >
              {/* Faux browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <span className="h-2 w-2 rounded-full bg-green-400/80" />
                <span className="ml-3 text-[14px] font-medium text-white/55">
                  app.upwon.in / {productSlug}
                </span>
              </div>
              {/* Mock UI */}
              <div
                className="aspect-[16/10] w-full p-6"
                style={{
                  background: `radial-gradient(circle at 30% 0%, ${accent}26, transparent 55%), linear-gradient(160deg, #0F1535 0%, #181d4f 100%)`,
                }}
              >
                {/* Title block */}
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]"
                      style={{ background: `${accent}33`, color: accentSoft }}
                    >
                      {block.eyebrow}
                    </span>
                    <p className="mt-2 font-display text-base font-bold text-white">
                      {block.title.split(' ').slice(0, 4).join(' ')}…
                    </p>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-[14px] font-semibold text-white/60">
                    Live
                  </span>
                </div>

                {/* KPI strip */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {block.bullets.slice(0, 3).map((b, idx) => (
                    <div
                      key={`${b}-${idx}`}
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                    >
                      <p
                        className="text-[9px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: accentSoft }}
                      >
                        Metric {idx + 1}
                      </p>
                      <p className="num-display mt-1 text-lg font-bold text-white">
                        {[42, 18, 97][idx]}
                        {idx === 2 ? '%' : ''}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bars */}
                <div className="mt-5 space-y-2">
                  {[68, 88, 54, 76].map((pct, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-16 text-[14px] font-semibold text-white/50">
                        Row {idx + 1}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${accent}, ${accentSoft})`,
                          }}
                        />
                      </div>
                      <span
                        className="w-8 text-right text-[14px] font-bold"
                        style={{ color: accentSoft }}
                      >
                        {pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
