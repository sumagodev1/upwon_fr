import { useEffect, useRef, useState } from 'react';
import {
  m as motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { erpIcon } from '../../../../lib/erpIcons.js';
import { fetchErpRecognitionSection } from '../../../../lib/erpPage.js';
import {
  FALLBACK_BENEFITS,
  FALLBACK_COPY,
  FALLBACK_INDUSTRIES,
} from './specializedErpContent.js';

// "Why use generic ERPs when a specialized system is available?" — a two-pane
// industry switcher. Left: pick an industry. Right: that industry's ERP detail
// over its own background photo, with a dashboard mockup as the showcase.
//
// The content is the CMS's. This file renders it and nothing else: the copy,
// the industries, their features and the benefits strip all arrive as data, and
// the built-in set in specializedErpContent.js is only what the page shows
// before the fetch lands and whenever the API cannot be reached.

const EASE = [0.16, 1, 0.3, 1];

function IndustryButton({ industry, active, onClick }) {
  const Icon = erpIcon(industry.icon);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
        active
          ? 'border-orange-300 bg-orange-50/70 shadow-sm'
          : 'border-cream-300 bg-white hover:border-orange-200 hover:bg-cream-100'
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${
          active ? 'border-orange-200 bg-white text-orange-500' : 'border-cream-300 bg-cream-100 text-navy-700'
        }`}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold leading-tight text-navy-950">{industry.name}</p>
        <p className="mt-0.5 truncate text-[14px] text-navy-600">{industry.shortDescription}</p>
      </div>
      <ArrowRight
        className={`h-4 w-4 shrink-0 transition-transform ${
          active ? 'text-orange-500' : 'text-navy-400 group-hover:translate-x-0.5'
        }`}
      />
    </button>
  );
}

function DetailPane({ industry, benefits }) {
  const Icon = erpIcon(industry.icon);

  // Scroll-linked reveal — the dashboard sits in a short fixed window and its
  // background pans from top to bottom as the user scrolls the page, so it
  // reads as the dashboard scrolling inside the frame.
  const paneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: paneRef,
    offset: ['start end', 'end start'],
  });
  const dashPos = useTransform(scrollYProgress, [0, 1], ['50% 0%', '50% 100%']);

  return (
    <div
      ref={paneRef}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-sm"
    >
      {/* Desktop — full industry photo (no crop), anchored top-right and bleeding
          to the edges. Every image is 3:2, so showing it whole keeps all seven
          industries framed consistently. White fades blend the left/bottom. */}
      <div className="pointer-events-none absolute right-0 top-0 hidden w-[56%] md:block">
        <img
          src={industry.image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="block w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Mobile — full image banner on top. */}
      <img
        src={industry.image}
        alt={industry.imageAlt}
        loading="lazy"
        decoding="async"
        className="block w-full md:hidden"
      />

      <div className="relative flex flex-1 flex-col p-4 sm:p-5 md:p-6 lg:p-8">
        {/* Header — icon + title + desc. Kept to the left so it sits clear of
            the top-right photo on desktop. */}
        <div className="flex items-start gap-3 md:max-w-[46%]">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cream-300 bg-white text-orange-500 shadow-sm">
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </span>
          <div>
            <h3 className="h-display text-lg font-bold leading-tight text-navy-950 lg:text-xl">
              {industry.erpTitle}
            </h3>
            <p className="mt-1 text-[14px] leading-relaxed text-navy-600">
              {industry.erpDescription}
            </p>
          </div>
        </div>

        {/* Body — feature list (left) + dashboard showcase (right, overlapping
            the photo on desktop). */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="min-w-0">
            <div className="h-px w-16 bg-orange-400" />
            <div className="mt-4 space-y-2.5">
              {industry.features.map((f) => {
                const FIcon = erpIcon(f.icon);
                return (
                  <div key={f.title} className="flex items-start gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-cream-300 bg-white text-orange-500 shadow-sm">
                      <FIcon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-navy-950">{f.title}</p>
                      <p className="mt-0.5 text-[14px] leading-snug text-navy-600">{f.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dashboard — sits in a fixed window; its background pans top → bottom
              as the user scrolls, so it reads as the dashboard scrolling. */}
          {industry.dashboard && (
            <div className="md:mt-16 lg:mt-24">
              <motion.div
                role="img"
                aria-label={industry.dashboardAlt}
                style={{
                  backgroundImage: `url('${industry.dashboard}')`,
                  backgroundSize: '112% auto',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: dashPos,
                }}
                className="h-[150px] overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-xl md:h-[170px] lg:h-[200px]"
              />
            </div>
          )}
        </div>

        {/* Benefits strip — pinned to the bottom of the card so it fills the
            full height alongside the taller selector column. */}
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-cream-300 pt-5 lg:grid-cols-4">
          {benefits.map((b) => {
            const BIcon = erpIcon(b.icon);
            return (
              <div key={b.title} className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-orange-200 bg-white text-orange-500 shadow-sm">
                  <BIcon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <p className="min-w-0 text-[14px] font-bold leading-snug text-navy-950">{b.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SpecializedErpSection() {
  const [copy, setCopy] = useState(FALLBACK_COPY);
  const [industries, setIndustries] = useState(FALLBACK_INDUSTRIES);
  const [benefits, setBenefits] = useState(FALLBACK_BENEFITS);
  const [active, setActive] = useState(0); // the first industry, shown by default
  const hovering = useRef(false); // pause the auto-cycle while the pointer is over the list

  /*
   * One read on mount, guarded inside the fetcher so the SSG build never makes
   * it. Copy and lists are swapped in separately: a section whose heading has
   * been edited but whose industries have not should show the new heading over
   * the built-in set rather than an empty card.
   */
  useEffect(() => {
    let cancelled = false;
    fetchErpRecognitionSection().then((section) => {
      if (cancelled || !section) return;
      setCopy({
        eyebrow: section.eyebrow,
        headingLines: section.headingLines,
        subtext: section.subtext,
      });
      if (section.industries.length > 0) {
        setIndustries(section.industries);
        // The published list may be shorter than the one on screen, so the
        // selection goes back to the top rather than past the end.
        setActive(0);
      }
      if (section.benefits.length > 0) setBenefits(section.benefits);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-advance one by one; pauses on hover, resumes when the pointer leaves.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const id = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % industries.length);
    }, 3500);
    return () => clearInterval(id);
  }, [industries.length]);

  const select = (i) => setActive(i);

  // Nothing published and nothing built in - render nothing rather than an
  // empty card.
  if (industries.length === 0) return null;

  const current = industries[Math.min(active, industries.length - 1)];

  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-10 lg:py-8">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-6 lg:gap-10">
          {/* LEFT — heading + industry selector */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {copy.eyebrow && <Eyebrow>{copy.eyebrow}</Eyebrow>}
 <h2 className="mt-2 h-display text-[36.8px] leading-[1.12] tracking-tight text-navy-950 sm:leading-[1.1]">
                <HeadingLines lines={copy.headingLines} />
              </h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-navy-600 md:text-sm lg:text-base">
                {copy.subtext}
              </p>
            </motion.div>

            <div
              className="mt-5 space-y-2.5"
              onMouseEnter={() => {
                hovering.current = true;
              }}
              onMouseLeave={() => {
                hovering.current = false;
              }}
            >
              {industries.map((ind, i) => (
                <IndustryButton
                  key={ind.slug}
                  industry={ind}
                  active={i === active}
                  onClick={() => select(i)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — active industry detail pane */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-full"
              >
                <DetailPane industry={current} benefits={benefits} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
