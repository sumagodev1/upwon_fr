import Container from '../../../../components/shared/Container/Container.jsx';
import { TRUST_LOGOS } from '../../../../data/metrics.js';

// Plain-text trust marquee — two rows scrolling in opposite directions.
// Relocated to the home page (home-page design review swap): the styled
// colour/font logo marquee (<TrustStrip/>) moved to the Clients roster, and
// this lighter text treatment now anchors the home page. `embedded` strips the
// outer <section> + heading for reuse inside another section.
const HALF = Math.ceil(TRUST_LOGOS.length / 2);
const ROW_A = TRUST_LOGOS.slice(0, HALF);
const ROW_B = TRUST_LOGOS.slice(HALF).concat(TRUST_LOGOS.slice(0, 2));

export default function TrustStripText({ embedded = false }) {
  const marquee = (
    <div className="space-y-3">
      {/* Row 1 — scrolls left */}
      <div className="relative overflow-hidden mask-fade-lr">
        <div
          className="flex w-max items-center gap-12 whitespace-nowrap py-1"
          style={{ animation: 'ticker 40s linear infinite' }}
        >
          {[...ROW_A, ...ROW_A].map((logo, i) => (
            <span
              key={`row-a-${logo}-${i}`}
              className="font-display text-lg font-semibold tracking-tight text-navy-700/80"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden mask-fade-lr">
        <div
          className="flex w-max items-center gap-12 whitespace-nowrap py-1"
          style={{ animation: 'ticker 45s linear infinite', animationDirection: 'reverse' }}
        >
          {[...ROW_B, ...ROW_B].map((logo, i) => (
            <span
              key={`row-b-${logo}-${i}`}
              className="font-display text-lg font-semibold tracking-tight text-navy-700/80"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (embedded) return marquee;

  return (
    <section className="relative overflow-hidden border-y border-cream-300 bg-slate-soft py-12 md:py-14">
      <Container>
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-navy-500">
          Trusted by operations leaders at
        </p>
      </Container>
      <div className="mt-8">{marquee}</div>
    </section>
  );
}
