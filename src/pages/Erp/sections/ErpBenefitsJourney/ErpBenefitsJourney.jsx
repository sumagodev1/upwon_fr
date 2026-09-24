import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import useCountUp from '../../../../hooks/useCountUp.js';
import { erpIcon } from '../../../../lib/erpIcons.js';
import { fetchErpJourneySection } from '../../../../lib/erpPage.js';
import {
  FALLBACK_COPY,
  FALLBACK_PERSONAS,
  FALLBACK_STATS,
} from './erpBenefitsContent.js';

/*
  SECTION 9 — "UPWON ERP – Benefits for Everyone".

  monday.com "difference" layout: a left highlight list (Operator → Manager →
  CTO → CFO → CEO) synced to a right-hand proof panel — a headline metric, the
  measurable (tangible) outcomes, and the beyond-the-numbers (non-tangible) wins.

  Desktop: hover / click a row to activate it; the panel morphs. Auto-advances
  until the visitor interacts. Mobile / reduced-motion: a lightweight accordion.

  The content is the CMS's. This file renders it and nothing else: the copy, the
  audiences, their metrics, their two lists and the shared statistics all arrive
  as data, and the built-in set in erpBenefitsContent.js is only what the page
  shows before the fetch lands and whenever the API cannot be reached.
*/

const EASE = [0.22, 1, 0.3, 1];
const AUTOPLAY_MS = 5500;

// A number that counts up once it scrolls into view (or on remount).
function Counter({ num, prefix = '', suffix = '' }) {
  const { value, ref } = useCountUp(num, { duration: 1300 });
  return (
    <span ref={ref}>
      {prefix}
      {Math.round(value).toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

// Avatar with image + initials fallback.
function Avatar({ src, name, alt, color }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  if (failed || !src) {
    return (
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[15px] font-bold text-white"
        style={{ background: color }}
      >
        {initials}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-12 w-12 shrink-0 rounded-full object-cover"
    />
  );
}

// The right-hand proof: person + outcome metric + tangible + non-tangible list.
function Proof({ item, stats }) {
  return (
    <div>
      {/* Headline metric + company-wide proof — 4 uniform stats */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-b border-navy-900/10 pb-5 sm:grid-cols-4">
        {[
          {
            node:
              item.metric.countTo != null ? (
                <Counter
                  num={item.metric.countTo}
                  prefix={item.metric.prefix}
                  suffix={item.metric.suffix}
                />
              ) : (
                item.metric.text
              ),
            label: item.metricLabel,
          },
          ...stats.map((s) => ({ node: s.value, label: s.label })),
        ].map((s, i) => (
          <div key={i}>
            <p
              className="num-display leading-none text-navy-950"
              style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}
            >
              {s.node}
            </p>
            <p className="mt-1.5 text-[14px] leading-snug text-navy-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Who it's from */}
      <div className="mt-5 flex items-center gap-3">
        <Avatar
          src={item.avatar}
          name={item.authorDesignation}
          alt={item.avatarAlt}
          color={item.avatarColor}
        />
        <div>
          <p className="text-[15px] font-bold text-navy-950">{item.authorDesignation}</p>
          <p className="text-[14px] text-navy-600">{item.authorCompany}</p>
        </div>
      </div>

      <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">
        Measurable outcomes
      </p>
      <ul className="mt-3 space-y-2.5">
        {item.outcomes.map((t) => {
          const Icon = erpIcon(t.icon);
          return (
            <li key={t.text} className="flex items-start gap-2.5">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.25} />
              <span className="text-[14px] leading-snug text-navy-800 md:text-sm">{t.text}</span>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">
        Beyond the numbers
      </p>
      <ul className="mt-3 space-y-2">
        {item.points.map((t) => (
          <li key={t} className="flex items-start gap-2.5">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-orange-500" />
            <span className="text-[14px] leading-snug text-navy-600">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// One row in the left highlight list.
function PersonaRow({ item, stats, active, onActivate }) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-current={active ? 'true' : undefined}
      className={`group relative block w-full rounded-2xl px-5 py-3 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/70 md:px-6 md:py-3.5 ${
        active
          ? 'border border-white bg-white shadow-md shadow-navy-900/5'
          : 'border border-transparent hover:bg-white/40'
      }`}
    >
      <span
        className={`block text-[12px] font-semibold tracking-wide transition-colors ${
          active ? 'text-orange-600' : 'text-navy-500 group-hover:text-orange-600'
        }`}
      >
        {item.eyebrow}
      </span>
      <span
        className={`mt-0.5 block h-display leading-tight tracking-tight transition-colors ${
          active ? 'text-navy-950' : 'text-navy-900'
        }`}
        style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)' }}
      >
        {item.title}
      </span>

      {/* Description — reveals when active */}
      <motion.div
        initial={false}
        animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="max-w-md pt-2 text-[14px] leading-relaxed text-navy-700 md:text-sm">
          {item.description}
        </p>
      </motion.div>

      {/* Mobile-only inline proof for the active row */}
      <div className="lg:hidden">
        <motion.div
          initial={false}
          animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="mt-4 rounded-xl border border-cream-300 bg-white p-4">
            <Proof item={item} stats={stats} />
          </div>
        </motion.div>
      </div>
    </button>
  );
}

export default function ErpBenefitsJourney() {
  const [copy, setCopy] = useState(FALLBACK_COPY);
  const [personas, setPersonas] = useState(FALLBACK_PERSONAS);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [active, setActive] = useState(0); // the first audience, shown by default
  const hovering = useRef(false); // pause the auto-cycle while the pointer is over the list

  /*
   * One read on mount, guarded inside the fetcher so the SSG build never makes
   * it. Copy and lists are swapped in separately: a section whose heading has
   * been edited but whose audiences have not should show the new heading over
   * the built-in set rather than an empty panel.
   */
  useEffect(() => {
    let cancelled = false;
    fetchErpJourneySection().then((section) => {
      if (cancelled || !section) return;
      setCopy({
        eyebrow: section.eyebrow,
        headingLines: section.headingLines,
        subtext: section.subtext,
      });
      if (section.personas.length > 0) {
        setPersonas(section.personas);
        // The published list may be shorter than the one on screen, so the
        // selection goes back to the top rather than past the end.
        setActive(0);
      }
      if (section.stats.length > 0) setStats(section.stats);
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
      if (!hovering.current) setActive((a) => (a + 1) % personas.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [personas.length]);

  const select = (i) => setActive(i);

  // Nothing published and nothing built in - render nothing rather than an
  // empty band.
  if (personas.length === 0) return null;

  const current = personas[Math.min(active, personas.length - 1)];

  return (
    <section className="bg-white px-3 py-8 sm:px-5 md:px-8 md:py-10">
      <div
        className="relative overflow-hidden rounded-[2rem] py-12 md:rounded-[2.75rem] md:py-16"
        style={{ backgroundColor: '#E7F0FD' }}
      >
        <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-30" />

        <Container className="relative">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            {copy.eyebrow && <Eyebrow className="justify-center">{copy.eyebrow}</Eyebrow>}
 <h2 className="mt-2 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
              <HeadingLines lines={copy.headingLines} />
            </h2>
            <p className="mx-auto mt-2.5 max-w-xl text-[14px] leading-relaxed text-navy-600 md:text-[15px]">
              {copy.subtext}
            </p>
          </motion.div>

          {/* Highlight list + synced proof */}
          <div
            className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-[1fr_1fr] lg:gap-14"
            onMouseEnter={() => {
              hovering.current = true;
            }}
            onMouseLeave={() => {
              hovering.current = false;
            }}
          >
            {/* LEFT — persona highlight list */}
            <div className="space-y-1">
              {personas.map((item, i) => (
                <PersonaRow
                  key={item.title}
                  item={item}
                  stats={stats}
                  active={i === active}
                  onActivate={() => select(i)}
                />
              ))}
            </div>

            {/* RIGHT — proof panel (desktop). Divider echoes the reference. */}
            <div className="hidden lg:block lg:border-l lg:border-navy-900/25 lg:pl-14">
              <div className="lg:sticky lg:top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Proof item={current} stats={stats} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
