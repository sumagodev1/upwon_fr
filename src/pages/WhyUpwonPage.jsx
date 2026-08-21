import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Zap, Boxes, Target } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ChaosSection from '../components/sections/ChaosSection.jsx';
import ComparisonMatrix from '../components/sections/ComparisonMatrix.jsx';
import ConcentricRings from '../components/sections/ConcentricRings.jsx';
import MasterBrandStatement from '../components/sections/MasterBrandStatement.jsx';
import DemoCtaCompact from '../components/sections/DemoCtaCompact.jsx';
import { COMPANY, STORYLINES } from '../data/company.js';
import Seo from '../components/common/Seo.jsx';

// All story cards share a single brand-orange tone so the section reads as
// a unified set rather than six different products. Per-card colour mapping
// previously caused the section to feel like a rainbow strip; this aligns
// the carousel with the master brand identity used elsewhere on the page.
const STORY_TONE = {
  bg: 'bg-gradient-to-br from-orange-50/70 to-white',
  border: 'border-orange-200',
  chipBg: 'bg-orange-100',
  chipBorder: 'border-orange-200',
  chipText: 'text-orange-700',
  dot: 'bg-orange-500',
  numColor: 'text-orange-500/40',
  bar: 'bg-orange-500',
};

// const REASONS = [
//   {
//     icon: Target,
//     eyebrow: 'Vertical-first',
//     title: 'Built for food. Speaks food.',
//     desc: 'Every workflow, every data model, every screen designed for food and FMCG operating realities. Not retrofitted.',
//   },
//   {
//     icon: Zap,
//     eyebrow: '30-45 days',
//     title: 'Live in weeks, not years.',
//     desc: 'Standard go-live is 30-45 days. 93% of projects deliver on time. SAP takes 12-18 months for the same scope.',
//   },
//   {
//     icon: ShieldCheck,
//     eyebrow: 'Compliance native',
//     title: 'FSSAI, GST, e-invoice built in.',
//     desc: 'Indian regulatory compliance is native, not bolted on. Foreign ERPs require costly Indianisation.',
//   },
//   {
//     icon: Boxes,
//     eyebrow: 'Integrated',
//     title: 'Seven platforms, one data spine.',
//     desc: 'ERP, SFA, FMS, HR, WMS, Vendor Portal, Mobile — all connected. Zero integration cost between platforms.',
//   },
// ];


const REASONS = [
  {
    icon: Target,
    eyebrow: 'Food-first, always',
    title: 'Built for food. Every screen, every workflow, every field.',
    desc: 'UpWon was designed from the ground up for how food and FMCG businesses actually operate — batch codes, shelf life, route planning and all. ',
  },
  {
    icon: Zap,
    eyebrow: 'Live in 30–45 days',
    title: 'Up and running before your next month-end close.',
    desc: '93% of UpWon projects go live on time. SAP takes 12–18 months for the same scope.',
  },
  {
    icon: ShieldCheck,
    eyebrow: 'India-ready, always',
    title: 'FSSAI. GST. e-Invoice. All in — from day one.',
    desc: 'Indian regulatory compliance is native, not bolted on. Foreign ERPs require costly Indianisation.',
  },
  {
    icon: Boxes,
    eyebrow: 'Fully integrated ',
    title: 'Seven modules. One truth. Zero integration cost',
    desc: 'ERP · SFA · FMS · HR · WMS · Vendor Portal · Mobile — all on the same data spine. No sync issues. No duplicate entries. No middleware bill.',
  },
];

export default function WhyUpwonPage() {
  return (
    <>
      <Seo
        title="Why UpWon — Built for Food, Proven for FMCG"
        description="Not a generic ERP with a food module. Five pillars that make UpWon the operational backbone for Indian food and FMCG manufacturers."
        canonical="https://upwon.in/why-upwon"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Why UpWon' },
        ]}
        eyebrow="Why UpWon"
        // title={
        //   <>
        //     Why do 50+ food businesses choose UpWon{' '}
        //     <span className="gradient-text-orange">over SAP, Tally, Odoo and ERPNext?</span>
        //   </>
        // }

        title={
          <>
            SAP is too big. Tally is too thin. Odoo needs months.
            {' '}
            <span className="gradient-text-orange">ERPNext needs an IT team.
              UpWon just works — for food</span>
          </>
        }
        // description="Because UpWon was built inside food businesses. Every line of code answers a real operational problem a real food operator has lived with."
        description="Built inside real food businesses. Every feature answers a problem your ops team faces today — not a generic checklist."
        bgImages={[
          'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=60',
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=60',
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1600&q=60',
        ]}
      />

      {/* The operational tax — pains UpWon was built to remove */}
      <ChaosSection />

      {/* Four reasons */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Four straight reasons"
            // title="Why UpWon, specifically."
            title="Why UpWon, Wins."

          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl border border-cream-300 bg-white p-7 shadow-sm transition-all hover:border-orange-500/40 hover:shadow-enterprise"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-orange-100 text-orange-600">
                  <r.icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  {r.eyebrow}
                </p>
                <h3 className="mt-2 h-display text-2xl text-navy-950">{r.title}</h3>
                <p className="mt-2 text-sm text-charcoal">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Storylines — horizontal scroll, each story in its own colour */}
      <section className="relative overflow-hidden bg-white section-pad">
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Where you are in the journey"
            title="Pick the story that fits your business today."
            description="Six different reasons food and FMCG operators choose UpWon — each one valid. Swipe through →"
          />
        </Container>

        <StoryCarousel />
      </section>

      <ConcentricRings />

      <ComparisonMatrix />

      <MasterBrandStatement />

      {/* <DemoCtaCompact /> */}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StoryCarousel — auto-rotating horizontal carousel of the 6 STORYLINES.
//
// Behaviour:
//   • Auto-advances to the next card every AUTO_INTERVAL_MS.
//   • Uses scrollTo on the carousel container to animate to the next snap
//     point — keeps the native scroll-snap UX intact for touch users.
//   • Pauses on hover / focus / pointer-down so a visitor who's reading a
//     card never gets pulled away mid-sentence.
//   • Pauses when the section scrolls offscreen via IntersectionObserver.
//   • Indicator dots show the active card AND act as clickable shortcuts.
//   • Per-card progress bar under the active dot fills 0→100% over the
//     interval so the visitor sees the next advance is coming.
// ─────────────────────────────────────────────────────────────────────────────
const AUTO_INTERVAL_MS = 4500;

function StoryCarousel() {
  const entries = Object.entries(STORYLINES);
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [inView, setInView] = useState(true);

  // Only pause when the section is genuinely offscreen — auto-rotation
  // otherwise runs continuously (no hover / focus pauses). Saves CPU on
  // unseen carousels without the visitor's mouse ever stopping the show.
  useEffect(() => {
    if (!scrollerRef.current) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(scrollerRef.current);
    return () => obs.disconnect();
  }, []);

  // Snap-scroll to a given index. Always targets the card in the
  // original (first) set so manual dot clicks never land mid-duplicate.
  const goTo = (i) => {
    const card = cardRefs.current[i];
    const scroller = scrollerRef.current;
    if (!card || !scroller) return;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const target = cardCenter - scroller.clientWidth / 2;
    scroller.scrollTo({ left: target, behavior: 'smooth' });
    setActiveIdx(i);
  };

  // Continuous auto-scroll. Cards are rendered twice; each tick advances
  // one card forward, and once scrollLeft crosses into the duplicate
  // region we silently subtract one period so the next forward tick
  // continues from inside the original region. The swap is invisible
  // because the duplicate is byte-identical to the original.
  useEffect(() => {
    if (!inView) return undefined;
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const id = setInterval(() => {
      const firstA = cardRefs.current[0];
      const firstB = cardRefs.current[entries.length];
      if (!firstA || !firstB) return;
      const period = firstB.offsetLeft - firstA.offsetLeft;
      // Width of one card (incl. trailing gap) — measured from the first
      // pair so it auto-adapts to the responsive card widths.
      const second = cardRefs.current[1];
      const step = second ? second.offsetLeft - firstA.offsetLeft : firstA.offsetWidth + 20;

      if (period > 0 && scroller.scrollLeft >= period) {
        scroller.scrollLeft = scroller.scrollLeft - period;
      }
      scroller.scrollBy({ left: step, behavior: 'smooth' });
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [inView, entries.length]);

  // Track which card the user has manually scrolled to (so manual swipe
  // still updates the dots correctly). Uses modulo over entries.length
  // so duplicates collapse onto the same dot index.
  const onScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearest = 0;
    let nearestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    });
    const dotIdx = nearest % entries.length;
    if (dotIdx !== activeIdx) setActiveIdx(dotIdx);
  };

  return (
    <div className="relative mt-12">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-20" />

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max gap-5 px-6 py-2 md:px-16 lg:px-24">
          {/* Cards rendered twice. The duplicate set provides the
              "next" content the marquee scrolls into; once we cross
              that boundary the hook resets scrollLeft seamlessly. */}
          {[...entries, ...entries].map(([key, s], i) => {
            const tone = STORY_TONE;
            const origIdx = i % entries.length;
            const isOriginal = i < entries.length;
            return (
              <motion.article
                key={`${key}-${isOriginal ? 'a' : 'b'}`}
                ref={(el) => (cardRefs.current[i] = el)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: (origIdx) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                aria-hidden={!isOriginal}
                className={`group relative flex w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border ${tone.border} ${tone.bg} p-6 shadow-sm hover:shadow-enterprise-lg sm:w-[340px] md:w-[380px]`}
              >
                <div className="relative flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border ${tone.chipBorder} ${tone.chipBg} px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${tone.chipText}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                    {key} story
                  </span>
                  <span
                    className={`num-display text-2xl font-bold ${tone.numColor}`}
                  >
                    0{origIdx + 1}
                  </span>
                </div>

                <p className="relative mt-4 text-[14px] text-navy-600">
                  {s.forWhom}
                </p>
                <h3 className="relative mt-3 h-display text-xl italic leading-snug text-navy-950">
                  "{s.hero}"
                </h3>
                <p className="relative mt-3 text-[14px] leading-relaxed text-charcoal">
                  {s.arc}
                </p>

                <div className="mt-auto pt-6">
                  <div
                    className={`h-1 w-12 rounded-full ${tone.bar} transition-[width] duration-500 group-hover:w-20`}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Indicator dots — active dot stretches + carries a progress bar */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {entries.map(([k], i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={k}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${k} story`}
              aria-current={isActive}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${isActive ? 'w-10 bg-cream-300' : 'w-6 bg-cream-300 hover:bg-cream-400'
                }`}
            >
              {isActive && (
                <span
                  key={`progress-${activeIdx}`}
                  className="absolute inset-0 block origin-left rounded-full bg-orange-500"
                  style={{
                    animation: `story-progress ${AUTO_INTERVAL_MS}ms linear forwards`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes story-progress {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
