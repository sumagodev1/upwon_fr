import { useState, useEffect, useRef } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Quote, MapPin, ArrowUpRight, Calendar, Users, Boxes, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/shared/Container/Container.jsx';
import AboutHeroSection from './sections/AboutHeroSection/AboutHeroSection.jsx';
import AboutCtaSection from './sections/AboutCtaSection/AboutCtaSection.jsx';
import SectionIntro from '../../components/shared/SectionIntro/SectionIntro.jsx';
import Eyebrow from '../../components/shared/Eyebrow/Eyebrow.jsx';
import { COMPANY, GLOBAL_MARKETS, GLOBAL_READINESS } from '../../data/company.js';
import Seo from '../../components/shared/Seo/Seo.jsx';
// Brief §19 sections — restored in canonical order so the About page
// reads exactly as the brief specifies.
import TeamAndValuesSection from './sections/TeamAndValuesSection/TeamAndValuesSection.jsx';
import AboutNumbersSection from './sections/AboutNumbersSection/AboutNumbersSection.jsx';
import NashikPrideSection from './sections/NashikPrideSection/NashikPrideSection.jsx';
import DiscoveryCallCta from './sections/DiscoveryCallCta/DiscoveryCallCta.jsx';

const TIMELINE = [
  { year: '2016', event: 'Founded in Nashik', detail: 'Byte Elephants Technologies starts with one belief: food businesses deserve software built for them.' },
  { year: '2018', event: 'SFA & DMS platform launched', detail: 'First commercial product live. India-specific beat plan model.' },
  { year: '2020', event: 'Franchise Management Suite', detail: 'Hub-spoke model for QSR and bakery chains.' },
  { year: '2022', event: 'Full 7-platform suite', detail: 'ERP, SFA, FMS, HRMS, WMS, Vendor Portal, Mobile — all integrated.' },
  { year: '2024', event: '50+ clients, 10 states', detail: '36,500+ daily users. ₹16 Cr+ daily transactions.' },
  { year: '2025', event: 'UpWon brand launch', detail: 'Premium repositioning. From regional ERP vendor to global Food & FMCG platform.' },
  { year: '2026', event: 'Global expansion', detail: 'GCC conversations active. Bangladesh, SEA, East Africa on roadmap.' },
];

// Time each year stays highlighted (ms) before auto-advancing
const STEP_MS = 2800;

function HorizontalTimeline({ items }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  const progressPct = total > 1 ? (active / (total - 1)) * 100 : 0;
  const current = items[active];

  // Auto-scroll the (horizontally scrollable on mobile) track so the active
  // year stays centred as the timeline auto-advances. Scrolls ONLY the track
  // container horizontally — never element.scrollIntoView(), which would also
  // scroll the whole page vertically.
  const trackRef = useRef(null);
  const activeNodeRef = useRef(null);
  useEffect(() => {
    const container = trackRef.current;
    const node = activeNodeRef.current;
    if (!container || !node) return;
    if (container.scrollWidth <= container.clientWidth) return; // fits → no scroll
    const cRect = container.getBoundingClientRect();
    const nRect = node.getBoundingClientRect();
    const delta = nRect.left + nRect.width / 2 - (cRect.left + cRect.width / 2);
    container.scrollBy({ left: delta, behavior: 'smooth' });
  }, [active]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track (scrollable on small screens) */}
      <div ref={trackRef} className="overflow-x-auto pb-2">
        <div className="relative min-w-[640px] px-4 pt-4 md:min-w-0">
          {/* Static rail */}
          <div className="absolute left-4 right-4 top-[34px] h-0.5 bg-cream-300" />
          {/* Active progress fill */}
          <motion.div
            className="absolute left-4 top-[34px] h-0.5 origin-left bg-gradient-to-r from-orange-500 to-orange-400"
            style={{ width: `calc((100% - 2rem) * ${progressPct / 100})` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Year nodes */}
          <div className="relative grid items-start gap-2" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
            {items.map((t, i) => {
              const isActive = i === active;
              const isPassed = i < active;
              return (
                <button
                  key={t.year}
                  ref={isActive ? activeNodeRef : null}
                  onClick={() => setActive(i)}
                  className="group relative flex flex-col items-center pt-1 focus:outline-none"
                  aria-label={`${t.year} — ${t.event}`}
                >
                  {/* Expanding pulse ring on active */}
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: [0.7, 1.55, 1.55], opacity: [0.65, 0.3, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                      className="pointer-events-none absolute top-0 grid h-14 w-14 place-items-center rounded-full border-2 border-orange-500"
                    />
                  )}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      backgroundColor: isActive ? '#E85A2A' : isPassed ? '#FDE2D0' : '#FFFFFF',
                      borderColor: isActive ? '#E85A2A' : isPassed ? '#F89A6B' : '#E6DFD0',
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative grid h-14 w-14 place-items-center rounded-full border-2 shadow-sm"
                  >
                    <span
                      className={`num-display text-[14px] font-bold transition-colors duration-300 ${
                        isActive ? 'text-white' : isPassed ? 'text-orange-700' : 'text-navy-700 group-hover:text-orange-600'
                      }`}
                    >
                      {t.year}
                    </span>
                  </motion.div>
                  <span
                    className={`mt-3 max-w-[120px] text-center text-[14px] font-semibold leading-tight transition-colors duration-300 ${
                      isActive ? 'text-navy-950' : 'text-navy-500 group-hover:text-navy-800'
                    }`}
                  >
                    {t.event.split(/[—,]/)[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active year detail card with crossfade */}
      <div className="relative mt-10 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50/70 via-white to-white p-6 text-center shadow-enterprise md:p-8"
          >
            <p className="num-display text-3xl font-bold text-orange-600 md:text-4xl">
              {current.year}
            </p>
            <p className="mt-3 text-xl font-bold text-navy-950 md:text-2xl">
              {current.event}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-navy-700 md:text-base">
              {current.detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Content update (About Page SEO doc) — original Seo kept for reference:
      <Seo
        title="About UpWon — Built in Nashik, Running India's Food Belt"
        description="UpWon is built by Byte Elephants Technologies in Nashik — at the heart of India's food processing belt. Founded 2016, 30+ team, 50+ deployments across 10 states."
        canonical="https://upwon.in/about"
      />
      */}
      <Seo
        title="About UpWon — Food & FMCG ERP, Built in Nashik | UpWon"
        description="UpWon is a bootstrapped Food & FMCG ERP built in Nashik by Byte Elephants — by people who ran factory floors, routes and franchise counters."
        canonical="https://upwon.in/about"
      />
      {/* Brief §19.1 — Hero. Two-tone headline lands the brief's signature
          "Because we've lived in it" framing. Bootstrapped / Nashik-born /
          customer-funded trust callout sits below as a pill row instead of
          being buried in body copy. */}
      <AboutHeroSection />

      {/* Founder section */}
      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-cream-300 bg-gradient-to-br from-navy-950 to-navy-700 shadow-enterprise-lg">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 flex items-end justify-center pb-12">
                  <div className="text-center">
                    <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-bold text-white">
                      NM
                    </div>
                    <p className="mt-5 h-display text-2xl text-white">{COMPANY.founder.name}</p>
                    <p className="mt-1 text-sm text-cream-100/70">{COMPANY.founder.role}</p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-orange-300">
                      Founder of Byte Elephants Technologies
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              {/* Eyebrow component rather than a hand-rolled copy of its
                  markup, so the founder's note leads the same way every
                  other section does. */}
              <Eyebrow>FOUNDER&rsquo;S NOTE</Eyebrow>

              <Quote className="mt-6 h-10 w-10 text-orange-500/40" />

              {/* A pull-quote, not a section headline — kept one step below
                  the h2 ramp so it does not compete with the section
                  headings above and below it. */}
              <p className="mt-3 h-display text-[22px] leading-[1.25] tracking-tight text-navy-950 sm:text-[26px] lg:text-[28px]">
                &ldquo;{COMPANY.founder.quote}&rdquo;
              </p>
              {/* Content update (About Page SEO doc) — original founder paragraph:
              <p className="mt-6 text-sm text-charcoal">
                Over the last 9 years, we have walked food factory floors, ridden delivery trucks,
                stood behind franchise counters during peak rush, and sat through 14-hour
                reconciliation marathons with finance teams. Every line of UpWon was written with
                that lived experience. Not from a brief. Not from a feature spec. From the inside.
              </p>
              */}
              <p className="mt-6 text-sm text-charcoal">
                Nine years on factory floors, delivery trucks, franchise counters and 14-hour
                finance reconciliations went into every line of UpWon — written from the inside,
                not from a spec.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/demo" className="btn-primary">
                  Talk to our team
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/careers" className="btn-secondary">
                  Join us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        {/* The road illustration runs behind the timeline — Nashik on the
            left, the skyline and growth arrow on the right, with the journey
            between them. Anchored to the bottom so the road always meets the
            section's lower edge however tall the content grows. The artwork
            is pale enough to sit under the copy without a scrim. */}
        <picture className="pointer-events-none absolute inset-0">
          <source
            media="(min-width: 768px)"
            srcSet="/images/about_path_desktop.webp"
            width={2039}
            height={771}
          />
          <img
            src="/images/about_path_mobile.webp"
            alt=""
            aria-hidden="true"
            width={778}
            height={2020}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-bottom"
          />
        </picture>

        <Container className="relative">
          <SectionIntro
            eyebrow="The journey so far"
            title={
              <>
                From a Nashik Garage to{' '}
                <span className="gradient-text-orange">₹16 Cr in Daily Transactions.</span>
              </>
            }
            description="A decade of building inside food businesses — not from the outside in."
          />
          <div className="mt-8 lg:mt-10">
            <HorizontalTimeline items={TIMELINE} />
          </div>
        </Container>
      </section>

      {/* Brief §19.3 — Team & Values (people grid + 4 core values) */}
      <TeamAndValuesSection />

      {/* Brief §19.4 — UpWon in Numbers + customer logo strip */}
      <AboutNumbersSection />

      {/* Brief §19.5 — Nashik Pride (bootstrapped narrative + India map) */}
      <NashikPrideSection />

      {/* Byte Elephants company facts */}
      {/* The cream ground gives way to the campus backdrop — the office on
          the left, the India pin on the right, and open sky through the
          middle where the copy and fact tiles sit. Pale enough to carry navy
          type without a scrim. */}
      <section className="relative overflow-hidden bg-[#eaf3fb] py-10 sm:py-12 lg:py-14">
        <picture className="pointer-events-none absolute inset-0">
          <source
            media="(min-width: 768px)"
            srcSet="/images/team_desktop.webp"
            width={2078}
            height={757}
          />
          <img
            src="/images/team_mobile.webp"
            alt=""
            aria-hidden="true"
            width={731}
            height={2152}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </picture>

        <Container className="relative">
          <SectionIntro
            eyebrow="The team behind UpWon"
            title={
              <>
                The Product House Behind UpWon —{' '}
                <span className="gradient-text-orange">Byte Elephants Technologies.</span>
              </>
            }
            description={`Premium technology built in India. Vision: ${COMPANY.vision}`}
          />

          <div className="mt-8 grid lg:mt-10 gap-px overflow-hidden rounded-2xl border border-cream-300 bg-cream-300 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Calendar, label: 'Founded', value: COMPANY.founded },
              { icon: MapPin, label: 'HQ', value: COMPANY.hq },
              { icon: Users, label: 'Senior team', value: `${COMPANY.team}+ experts` },
              { icon: Boxes, label: 'Live products', value: `${COMPANY.productCount} platforms` },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white p-7 text-center"
              >
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-lg bg-orange-100 text-orange-600">
                  <f.icon className="h-4.5 w-4.5" />
                </div>
                <p className="mt-4 text-[10.5px] uppercase tracking-[0.18em] text-navy-500">
                  {f.label}
                </p>
                <p className="num-display mt-1 text-xl text-navy-950">{f.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-teal-300 bg-teal-50 p-6 md:p-8">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-teal-700">
              Byte Elephants Technologies · Technology & Beyond
            </p>
            <p className="mt-3 text-sm text-navy-900 md:text-base">
              Byte Elephants is not just the company behind UpWon. It is a technology product house
              building enterprise software since 2016 — with a team of {COMPANY.team} domain
              specialists, a proprietary delivery methodology, and 50+ live deployments. UpWon is
              our flagship product. There is more on the way.
            </p>
          </div>
        </Container>
      </section>

      {/* Brief §19.6 — Discovery Call CTA. Lower-commitment than the demo
          form (3 fields, WhatsApp lane, "no pitch") because About-page
          visitors are higher-trust but not yet demo-ready. */}
      <DiscoveryCallCta />

      {/* Global */}
      <section className="relative overflow-hidden bg-navy-950 py-10 sm:py-12 lg:py-14 text-white">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-navy-400/[0.1] blur-3xl" />
        <Container className="relative">
          <SectionIntro
            variant="dark"
            eyebrow="GLOBAL AMBITION"
            title={
              <>
                Built in India.{' '}
                <span className="gradient-text-orange">Trusted Beyond It.</span>
              </>
            }
            description="The architecture, the compliance model and the rollout method were built for multi-country operations from the start — here is where that goes next."
          />

          <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-2">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                Why UpWon is ready for global markets
              </p>
              <ul className="mt-4 space-y-3">
                {GLOBAL_READINESS.map((r) => (
                  <li
                    key={r.title}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">{r.title}</p>
                      <p className="mt-1 text-[14px] text-cream-100/70">{r.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                Geographic sequencing
              </p>
              <ul className="mt-4 space-y-3">
                {GLOBAL_MARKETS.map((m) => (
                  <li
                    key={m.region}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{m.region}</p>
                      <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-orange-300">
                        {m.period}
                      </span>
                    </div>
                    <p className="mt-1 text-[14px] text-cream-100/70">{m.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA, directly above the footer */}
      <AboutCtaSection />
    </>
  );
}
