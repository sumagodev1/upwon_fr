import { Star, ShieldCheck } from 'lucide-react';

// Review-platform credibility pills. Used in both the homepage hero and
// PageHero (every inner-page hero) so the same trust signals follow the
// buyer site-wide. Tebra runs Trustpilot + G2 here — ours: G2, Software
// Suggest, and ISO 27001.
const RATINGS = [
  { issuer: 'G2',               score: '4.7',   max: '5', count: '180+ reviews',     Icon: Star,        accent: 'text-amber-500',   fill: true  },
  { issuer: 'Software Suggest', score: '4.8',   max: '5', count: 'Top ERP · India',  Icon: Star,        accent: 'text-amber-500',   fill: true  },
  { issuer: 'ISO',              score: '27001',          count: 'InfoSec certified', Icon: ShieldCheck, accent: 'text-emerald-600', fill: false },
];

export default function HeroRatingPills({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {RATINGS.map((r) => (
        <div
          key={r.issuer}
          className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-white/85 px-3 py-1.5 shadow-sm backdrop-blur"
        >
          <r.Icon
            className={`h-3.5 w-3.5 ${r.accent}`}
            fill={r.fill ? 'currentColor' : 'none'}
          />
          <span className="num-display text-[14px] font-bold text-navy-950">
            {r.score}
            {r.max && <span className="text-navy-500">/{r.max}</span>}
          </span>
          <span className="h-3 w-px bg-cream-300" />
          <span className="text-[11px] font-semibold uppercase tracking-wide text-navy-700">
            {r.issuer}
          </span>
          <span className="hidden text-[14px] text-navy-500 sm:inline">· {r.count}</span>
        </div>
      ))}
    </div>
  );
}
