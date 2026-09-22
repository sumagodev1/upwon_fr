import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Container from '../shared/Container/Container.jsx';
import SectionHeading from '../shared/SectionHeading/SectionHeading.jsx';
import { PLATFORM_MODULES, PLATFORM_THEMES } from '../../data/modules.js';

// Per-module visual:
//   src      — the real product screenshot at /public/upwon-{slug}.png
//   fallback — a subject-matched photo already curated for this module's
//              hero slides in modules.js. Each one depicts the module's
//              real-world domain: production line for ERP, distribution
//              trucks for SFA-DMS, restaurant for FMS, cafe outlet for POS,
//              team for HRMS, warehouse for WMS, business for Vendor Portal,
//              devices for Mobile Apps.
//   path     — the fake URL shown in the browser-frame chrome.
const SHOT_CONFIG = {
  erp: {
    src: '/upwon-erp.png',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    path: 'erp/dashboard',
  },
  'sfa-dms': {
    src: '/upwon-sfa.png',
    fallback: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80',
    path: 'sfa/beat-plan',
  },
  fms: {
    src: '/upwon-fms.png',
    fallback: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80',
    path: 'fms/outlets',
  },
  pos: {
    src: '/upwon-pos.png',
    fallback: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1600&q=80',
    path: 'pos/checkout',
  },
  hrms: {
    src: '/upwon-hrms.png',
    fallback: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80',
    path: 'hrms/people',
  },
  wms: {
    src: '/upwon-wms.png',
    fallback: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1600&q=80',
    path: 'wms/warehouse',
  },
  'vendor-portal': {
    src: '/upwon-vendor.png',
    fallback: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
    path: 'vendor-portal',
  },
  'mobile-apps': {
    src: '/upwon-mobile.png',
    fallback: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    path: 'mobile/apps',
  },
};

// PhonePe-style sticky stacked-card layout. Each module is rendered as a
// large rounded white card wrapped in a `position: sticky` container with a
// progressive `top` offset, so as the user scrolls, each card pins to the
// viewport and the next one slides up and rests visibly on top of it like a
// deck of cards. Image alternates left/right per card; on mobile the deck
// stacks naturally with a single column inside each card.
//
// Why sticky (no JS scroll lib): pure-CSS sticky positioning is GPU-cheap,
// works with reduced-motion, and produces the exact "card resting on top of
// card" silhouette PhonePe uses without needing IntersectionObserver glue.
// Card 1 pins just below the global navbar. Heading is NOT sticky so cards
// have the full viewport (minus navbar) to occupy.
const STACK_TOP_BASE_PX = 96;     // distance from top of viewport for card 1 (md+)
const STACK_TOP_STEP_PX = 14;     // each subsequent card sits this far lower (md+)
const CARD_GAP_PX = 20;           // vertical breathing space between cards (mobile uses this; desktop deck overlaps anyway)

// NOTE: do NOT add `overflow-hidden` to the outer <section> — it kills the
// sticky stacking below. Decorations are clipped via a child div instead.
export default function ModuleShowcaseSection() {
  return (
    <section className="relative bg-cream-200 section-pad">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[120px]" />
      </div>

      <Container className="relative">
        {/* Heading scrolls naturally — NOT sticky. PhonePe's stacked-card
            section behaves the same way: only the cards pin. Pinning the
            heading inevitably creates a visible overlap zone over each card,
            so we let the heading flow up out of view as the user enters the
            deck. */}
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Module Showcase"
          title={
            <>
              Every module you need.{' '}
              <span className="gradient-text-orange">Finally connected.</span>
            </>
          }
          description="Each UpWon module is a fully-built product — not a feature flag in a generic ERP. Scroll to flip through the deck."
        />

        <div className="mt-12 md:mt-16">
          {PLATFORM_MODULES.map((m, i) => (
            <StickyModuleCard
              key={m.slug}
              module={m}
              flipped={i % 2 === 1}
              index={i}
              total={PLATFORM_MODULES.length}
            />
          ))}
        </div>

        {/* Footer CTA — sits below the deck and appears cleanly after the
            last card has unstuck. */}
        <div className="mt-12 text-center md:mt-14">
          <Link to="/platform" className="btn-secondary !px-6 !py-3.5">
            See the complete platform map
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

// A single card in the stacked deck. The outer div uses `position: sticky`
// with a per-index `top` offset so cards pin progressively lower as the user
// scrolls. The inner article is the visible rounded white panel.
function StickyModuleCard({ module: m, flipped, index, total }) {
  const shot = SHOT_CONFIG[m.slug] || SHOT_CONFIG.erp;
  const Icon = m.icon;
  const features = (m.features || []).slice(0, 5);
  const outcome = m.hero || m.purpose || m.short;
  const top = STACK_TOP_BASE_PX + index * STACK_TOP_STEP_PX;
  const isLast = index === total - 1;
  // When the real product screenshot at /upwon-{slug}.png is missing, swap
  // the <img> for a brand-themed placeholder built from the module's accent
  // colour and icon — no risk of a stock photo mismatching the module.
  const [imgFailed, setImgFailed] = useState(false);
  // Each module card adopts its platform's brand accent — same palette used
  // by the Products mega-menu, UnifiedPlatformSection cards and the
  // brochure modal tiles. Threads the colour through icon chip, eyebrow,
  // feature ticks, "Book a demo" link and the position counter.
  const theme = PLATFORM_THEMES[m.slug] || {};
  const accent = theme.accent || '#E85A2A';
  const tint = theme.tint || '#FFF1EC';

  return (
    // The deck effect (sticky stacking) only kicks in on md+ where there's
    // enough viewport height to make pinning legible. On mobile (<768px) cards
    // are taller than the viewport, so sticky would clip the bottom CTA — we
    // fall back to natural vertical stacking with a comfortable gap instead.
    // Mobile uses `position: static` (the default for div) which ignores the
    // `top` value; desktop applies `md:sticky` which activates it.
    <div
      className="md:sticky"
      style={{
        top: `${top}px`,
        marginBottom: isLast ? 0 : `${CARD_GAP_PX}px`,
        zIndex: index + 1,
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[22px] border border-cream-300/80 bg-white ring-1 ring-black/[0.03] sm:rounded-[28px] md:rounded-[36px]"
      >
        <div
          className={`grid items-center gap-5 p-4 sm:gap-6 sm:p-6 md:gap-10 md:p-12 lg:p-14 ${
            flipped ? 'md:grid-cols-12 md:[&>*:first-child]:order-2' : 'md:grid-cols-12'
          }`}
        >
          {/* Image column */}
          <Link to={`/products/${m.slug}`} className="group block md:col-span-6">
            <div className="overflow-hidden rounded-xl border border-cream-300 bg-navy-950 shadow-sm ring-1 ring-navy-100 transition-transform duration-500 hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-400/80" />
                <span className="ml-2 truncate text-[14px] font-medium text-white/55">
                  app.upwon.in / {shot.path}
                </span>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={imgFailed ? shot.fallback : shot.src}
                  alt={`${m.title} interface`}
                  loading="lazy" decoding="async"
                  width="1600"
                  height="900"
                  onError={() => {
                    // First miss: swap from the (likely missing) /upwon-*.png
                    // to the curated subject photo. Second miss is rare and
                    // just leaves the broken-img icon — preferable to an
                    // infinite swap loop.
                    if (!imgFailed) setImgFailed(true);
                  }}
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent" />
              </div>
            </div>
          </Link>

          {/* Content column */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2.5">
              <div
                className="grid h-9 w-9 place-items-center rounded-lg ring-1"
                style={{
                  background: tint,
                  color: accent,
                  ['--tw-ring-color']: `${accent}33`,
                }}
              >
                <Icon className="h-4 w-4" />
              </div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: accent }}
              >
                {m.short}
              </p>
              <span
                className="ml-auto text-[10px] font-semibold tracking-wider"
                style={{ color: `${accent}99` }}
              >
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-3 font-display text-[22px] font-bold leading-tight text-navy-950 md:text-[28px]">
              {m.code}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-navy-700 md:text-[15px]">
              {outcome}
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span
                    className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: accent }}
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <span className="text-[14px] leading-snug text-navy-800">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTAs unified to the brand hierarchy (orange primary / navy
                secondary) across every card — the home-page design review
                flagged the previous per-platform accent CTAs as breaking visual
                balance. Platform accent still lives on the icon chip, eyebrow
                and feature ticks above, which keeps per-module identity. */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to={`/products/${m.slug}`} className="btn-primary !text-[14px]">
                Explore {m.code.replace('UpWon ', '')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/demo" className="btn-secondary !text-[14px]">
                Book a demo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
