import { m as motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '../Container/Container.jsx';
import HeadingLines from '../HeadingLines/HeadingLines.jsx';

// Combined trust section (home-page design refresh) — one card that carries the
// rating, the scrolling customer-brand LOGO marquee and the four scale stats.

// Four operational scale stats shown along the card footer.
const STATS = [
  { value: '10,000+', label: 'Invoices daily' },
  { value: '8000+', label: 'Orders every day' },
  { value: '50+', label: 'Brands live' },
  { value: '4,200+', label: 'Outlets connected' },
];

// Customer brand logos.still not use that
const LOGOS = [
  { src: '/images/testimonial/gokul.webp', alt: 'Gokul' },
  { src: '/images/testimonial/kaka%20halwai.webp', alt: 'Kaka Halwai' },
  { src: '/images/testimonial/mongignis.webp', alt: 'Monginis' },
  { src: '/images/testimonial/ofc.webp', alt: 'OFC' },
  { src: '/images/testimonial/u2cake.webp', alt: 'U2 Cake' },
  { src: '/images/testimonial/winni.webp', alt: 'Winni' },
];
// Tripled so the ticker track loops seamlessly.
const MARQUEE = [...LOGOS, ...LOGOS, ...LOGOS];

// Four-up stat counter — shared between the rating variant and the SFA-DMS
// proof-strip variant.
function StatsGrid({ stats, sourceNote }) {
  return (
    <div className={sourceNote ? '' : 'border-t border-cream-300 pt-8'}>
      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-cream-300">
        {stats.map((s) => (
          <div key={s.label} className="px-4 text-center">
            <p className="num-display text-2xl text-navy-950 md:text-3xl">{s.value}</p>
            <p className="mt-1 text-[14px] text-navy-600">{s.label}</p>
          </div>
        ))}
      </div>
      {sourceNote && (
        <p className="mt-5 text-center text-[14px] italic text-navy-500">{sourceNote}</p>
      )}
    </div>
  );
}

export default function TrustSection({
  eyebrow = "Trusted across India's food belt",
  title = (
    <>
      The brands that feed India{' '}
      <span className="gradient-text-orange">run on UPWON.</span>
    </>
  ),
  // CMS-authored heading, already parsed server-side. Takes precedence over
  // the title prop when present; title stays for callers that pass JSX.
  headingLines = null,
  // The line under the star rating. Null keeps the copy this component ships.
  subtext = null,
  stats = STATS,
  logos,
  // 'Small source note beneath the stats' — used instead of the star rating on
  // the SFA-DMS proof strip to avoid the unsourced-claim pattern.
  sourceNote = null,
  showRating = true,
  // When true, the stats sit above the logo marquee (SFA-DMS proof-strip order).
  statsFirst = false,
}) {
  const logoItems = logos && logos.length ? logos : LOGOS;
  const marqueeItems = [...logoItems, ...logoItems, ...logoItems];

  const statsBlock = <StatsGrid stats={stats} sourceNote={sourceNote} />;

  const marqueeBlock = (
    <div className="relative overflow-hidden mask-fade-lr">
      <div
        className="flex w-max items-center gap-10 whitespace-nowrap py-1 md:gap-14"
        style={{ animation: 'ticker 30s linear infinite' }}
      >
        {marqueeItems.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className="h-16 w-auto max-w-[180px] shrink-0 object-contain md:h-20"
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-slate-soft py-10 md:py-14">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
            {eyebrow}
          </p>
 <h2 className="mt-3 h-display text-[36.8px] text-balance leading-[1.1] tracking-tight text-navy-950">
            {headingLines ? <HeadingLines lines={headingLines} /> : title}
          </h2>
        </motion.div>

        {/* Trust card — rating + brand marquee + stats. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-10 max-w-7xl rounded-3xl border border-cream-300 bg-white px-6 py-10 shadow-sm md:px-12 md:py-12"
        >
          {showRating && (
            <>
              {/* Rating */}
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-navy-800">4.8 / 5</span>
              </div>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm text-navy-600 md:text-base">
                {subtext ??
                  "50+ of India's food and FMCG businesses run their daily operations on UPWON."}
              </p>
            </>
          )}

          {statsFirst ? (
            <>
              {statsBlock}
              <div className="mt-8">{marqueeBlock}</div>
            </>
          ) : (
            <>
              <div className={showRating ? 'mt-8' : ''}>{marqueeBlock}</div>
              <div className="mt-8">{statsBlock}</div>
            </>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
