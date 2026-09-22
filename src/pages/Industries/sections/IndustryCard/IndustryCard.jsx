import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import {
  INDUSTRY_IMAGES,
  INDUSTRY_FALLBACK_IMAGE,
  INDUSTRY_REVENUE_POTENTIAL,
  REVENUE_POTENTIAL_LABELS,
  HOMEPAGE_TOP_7_RANKS,
} from '../../../../data/industries.js';
import { srcSet } from '../../../../lib/img.js';

// Per-industry colour identities — same key palette used on IndustryPage
// so each vertical reads with its own personality across the site.
const INDUSTRY_TONES = {
  bakery:           { chip: 'bg-orange-50 border-orange-200 text-orange-700',   icon: 'text-orange-600' },
  dairy:            { chip: 'bg-sky-50 border-sky-200 text-sky-700',            icon: 'text-sky-600' },
  fmcg:             { chip: 'bg-teal-50 border-teal-200 text-teal-700',         icon: 'text-teal-600' },
  qsr:              { chip: 'bg-pink-50 border-pink-200 text-pink-700',         icon: 'text-pink-600' },
  sweets:           { chip: 'bg-amber-50 border-amber-200 text-amber-800',      icon: 'text-amber-700' },
  spices:           { chip: 'bg-orange-50 border-orange-300 text-orange-800',   icon: 'text-orange-700' },
  'food-processing':{ chip: 'bg-emerald-50 border-emerald-200 text-emerald-700',icon: 'text-emerald-600' },
  beverages:        { chip: 'bg-blue-50 border-blue-200 text-blue-700',         icon: 'text-blue-600' },
  'non-food-fmcg':  { chip: 'bg-violet-50 border-violet-200 text-violet-700',   icon: 'text-violet-600' },
  engineering:      { chip: 'bg-slate-100 border-slate-200 text-slate-700',     icon: 'text-slate-700' },
};
const DEFAULT_TONE = INDUSTRY_TONES.bakery;

/**
 * Photo-banner industry card used by both the homepage spotlight and the
 * full industries listing. Pass `href` for the destination, and toggle the
 * optional quote / workflow tags to match each surface.
 */
export default function IndustryCard({
  industry,
  href,
  index = 0,
  showQuote = false,
  showWorkflows = true,
}) {
  const image = INDUSTRY_IMAGES[industry.id] || INDUSTRY_FALLBACK_IMAGE;
  const tone = INDUSTRY_TONES[industry.id] || DEFAULT_TONE;
  const homepageRank = HOMEPAGE_TOP_7_RANKS[industry.id];
  const revenue = REVENUE_POTENTIAL_LABELS[INDUSTRY_REVENUE_POTENTIAL[industry.id]];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-enterprise-lg"
    >
      {/* Hero image banner */}
      <Link to={href} className="relative block h-44 overflow-hidden">
        <img
          src={image}
          srcSet={srcSet(image)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={industry.name}
          loading="lazy" decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradient overlay so title stays legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
        <div className="absolute inset-0 bg-orange-500/0 transition-colors duration-500 group-hover:bg-orange-500/10" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <div className="flex items-center gap-2">
            <div className={`grid h-11 w-11 place-items-center rounded-xl border border-white/30 bg-white/90 ${tone.icon} shadow-sm backdrop-blur`}>
              <industry.icon className="h-5 w-5" />
            </div>
            {/* Homepage Top 7 rank badge — surfaces the spreadsheet's
                prioritisation so visitors instantly see which sectors are
                UpWon's core ICP focus. */}
            {homepageRank && (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-orange-300 bg-orange-500/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur"
                title={`Homepage Top 7 · Rank #${homepageRank}`}
              >
                ★ Top 7 · #{homepageRank}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`rounded-full border ${tone.chip} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] shadow-sm backdrop-blur`}>
              {industry.tag}
            </span>
            {revenue && (
              <span
                className="inline-flex items-center gap-0.5 rounded-full border border-white/30 bg-navy-950/55 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur"
                title={`Revenue potential: ${revenue.label}`}
              >
                {Array.from({ length: revenue.stars }).map((_, s) => (
                  <Star key={s} className="h-2.5 w-2.5 text-orange-300" fill="currentColor" />
                ))}
              </span>
            )}
          </div>
        </div>

        <h3 className="absolute inset-x-0 bottom-0 px-5 pb-4 text-xl font-bold leading-tight text-white drop-shadow">
          {industry.name}
        </h3>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 pt-5">
        {showQuote && industry.insiderHero && (
          <p className="text-[14px] italic text-orange-600">
            &ldquo;{industry.insiderHero}&rdquo;
          </p>
        )}

        <p
          className={`text-sm leading-relaxed text-navy-700 ${
            showQuote ? 'mt-3' : ''
          }`}
        >
          {industry.description}
        </p>

        {showWorkflows && industry.workflows?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {industry.workflows.slice(0, 3).map((w) => (
              <span
                key={w}
                className="rounded-md border border-navy-100 bg-navy-50/60 px-2 py-0.5 text-[14px] font-medium text-navy-700"
              >
                {w}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-4 mt-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
            {industry.metrics[0].value}
            <span className="ml-1 text-navy-500">· {industry.metrics[0].label}</span>
          </span>
          <Link
            to={href}
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-orange-600 transition-colors group-hover:text-orange-700"
          >
            Explore
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
