import { m as motion } from 'framer-motion';
import { Quote, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';

// Brief §X.8 — Industry Peer Testimonial.
// Single named pull-quote card from an owner / operator IN THIS INDUSTRY.
// Includes: face placeholder, specific outcome highlight, before-state
// callout, attribution with role + company type + city.
//
// Replaces the generic TestimonialsMarquee on industry pages where the brief
// explicitly asks for ONE peer quote, not a stream.
//
// Data source: the same INDUSTRY_CASE_STUDIES[slug].quote object that powers
// CaseStudyFullCard's pull quote. Reusing it keeps the named voice consistent
// across §X.7 and §X.8 — the brief allows folding them when the quote is the
// same operator.
//
// Props:
//   industryName — used in the eyebrow ("X owners on UpWon")
//   quote        — { text, attrib }
//   accent       — industry's accent colour
//   before       — short string describing the "before" state ("WhatsApp orders, 5-day royalty…")
//   after        — short string describing the "after" state ("Live outlet visibility, 3hr royalty…")
export default function IndustryPeerQuote({
  industryName,
  quote,
  accent = '#E85A2A',
  before,
  after,
}) {
  if (!quote) return null;
  const initials = (quote.attrib || '')
    .split(',')[0]
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full blur-[160px]"
        style={{ background: `${accent}14` }}
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl"
        >
          <p
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em]"
            style={{
              background: `${accent}1f`,
              borderColor: `${accent}33`,
              color: accent,
            }}
          >
            {industryName} owners on UpWon
          </p>

          {/* Section title + tagline */}
 <h2 className="mt-4 h-display text-[36.8px] text-balance leading-[1.1] text-navy-950">
            Operators like you.{' '}
            <span style={{ color: accent }}>Outcomes like these.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-600">
            Not a marketing quote — a named {industryName.toLowerCase()} operator
            describing exactly what changed after going live on UpWon.
          </p>

          {/* Card */}
          <div
            className="relative mt-5 overflow-hidden rounded-3xl border bg-white shadow-enterprise"
            style={{ borderColor: `${accent}33` }}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl"
              style={{ background: `${accent}22` }}
            />

            <div className="grid items-stretch gap-0 md:grid-cols-[280px_1fr]">
              {/* LEFT — face placeholder + attribution */}
              <div
                className="relative flex flex-col items-center justify-center gap-4 p-7 text-center md:p-9"
                style={{
                  background: `linear-gradient(160deg, ${accent}14, transparent)`,
                }}
              >
                <div
                  className="grid h-24 w-24 place-items-center rounded-full font-display text-3xl font-bold text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                    boxShadow: `0 16px 32px -8px ${accent}66`,
                  }}
                >
                  {initials || 'OP'}
                </div>
                <div>
                  <p className="font-display text-[14px] font-bold leading-tight text-navy-950">
                    {quote.attrib.split(',')[0]}
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-navy-600">
                    {quote.attrib.split(',').slice(1).join(',').trim()}
                  </p>
                </div>
              </div>

              {/* RIGHT — quote + before/after */}
              <div className="relative p-7 md:p-10">
                <Quote
                  className="absolute -left-1 top-2 h-7 w-7 opacity-25"
                  style={{ color: accent }}
                  strokeWidth={2.5}
                />
                <p className="font-display text-[1.3rem] italic leading-relaxed text-navy-900 md:text-[1.5rem]">
                  &ldquo;{quote.text}&rdquo;
                </p>

                {/* Before / After strip — only renders when both are provided */}
                {(before || after) && (
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {before && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/50 p-4">
                        <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                        <div>
                          <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-rose-700">
                            Before
                          </p>
                          <p className="mt-1 text-[14px] leading-snug text-navy-800">
                            {before}
                          </p>
                        </div>
                      </div>
                    )}
                    {after && (
                      <div
                        className="flex items-start gap-2.5 rounded-xl border bg-white p-4"
                        style={{ borderColor: `${accent}40` }}
                      >
                        <TrendingUp
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: accent }}
                        />
                        <div>
                          <p
                            className="text-[10.5px] font-bold uppercase tracking-[0.18em]"
                            style={{ color: accent }}
                          >
                            After UpWon
                          </p>
                          <p className="mt-1 text-[14px] leading-snug text-navy-800">
                            {after}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Verified line */}
                <p className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-500">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: accent }}
                  />
                  Verified deployment · {industryName}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
