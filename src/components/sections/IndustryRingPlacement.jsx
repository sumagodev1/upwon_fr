import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import IndustryRingOrbit, {
  RING_BY_SLUG,
  RING_META,
  INDUSTRIES_BY_RING,
} from './IndustryRingOrbit.jsx';

// Brief §X.3 — Industry's placement on the UpWon Universe.
// 3-ring orbit diagram (shared <IndustryRingOrbit/>) beside a ring legend with
// live counts. Rendered on every IndustryPage so the suite story shows up
// consistently across all 10 industry routes.

export default function IndustryRingPlacement({ industry }) {
  if (!industry) return null;
  const activeRing = RING_BY_SLUG[industry.slug] || 1;
  const meta = RING_META[activeRing];

  return (
    <section className="relative overflow-hidden bg-cream-100 section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      {/* Ambient glow tinted to the active ring's colour */}
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: `${meta.color}14` }}
      />

      <Container className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* ============ LEFT — orbit diagram ============ */}
          <IndustryRingOrbit activeSlug={industry.slug} />

          {/* ============ RIGHT — copy + ring legend ============ */}
          <div>
            <p
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: `${meta.color}50`,
                background: `${meta.color}14`,
                color: meta.color,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse-slow"
                style={{ background: meta.color }}
              />
              {meta.name}
            </p>
 <h2 className="mt-4 h-display text-[36.8px] text-balance leading-[1.1] text-navy-950">
              {industry.name} is part of UpWon&rsquo;s{' '}
              <span style={{ color: meta.color }}>{meta.label.toLowerCase()}.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-700 md:text-base">
              {meta.blurb}
            </p>

            {/* Ring legend — three compact cards. The active ring is filled
                with its colour; the others sit as faint outlines so the
                hierarchy reads at a glance. */}
            <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {[1, 2, 3].map((r) => {
                const m = RING_META[r];
                const isActive = r === activeRing;
                const count = INDUSTRIES_BY_RING[r]?.length || 0;
                return (
                  <div
                    key={r}
                    className="rounded-xl border bg-white p-3 transition-all"
                    style={{
                      borderColor: isActive ? m.color : '#e9dfd3',
                      background: isActive ? `${m.color}0d` : 'white',
                      boxShadow: isActive ? `0 0 0 1px ${m.color}33 inset` : 'none',
                    }}
                  >
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: m.color }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: m.color }}
                      />
                      R{r}
                    </span>
                    <p className="num-display mt-1.5 text-[18px] font-bold text-navy-950">
                      {count}
                    </p>
                    <p className="mt-0.5 text-[14px] leading-snug text-navy-600">
                      {m.short}
                    </p>
                  </div>
                );
              })}
            </div>

            <Link
              to="/what-is-upwon"
              className="group mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
            >
              See the full UpWon Universe
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
