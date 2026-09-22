import { useRef, useState } from 'react';
import {
  m as motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Database,
  Rocket,
  Headset,
  Check,
  ArrowRight,
  Handshake,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  "Implementation & Partnership" — a scroll-driven, pinned "story" section.

  Desktop: the section pins and scroll progress drives the active stage. The
  changing image sits on the LEFT; on the RIGHT the active stage card is framed
  with corner brackets and travels down as a marker moves along the timeline,
  with the next stage peeking below. Mobile: each stage stacks image + text.
*/

const EASE = [0.22, 1, 0.3, 1];
const GREEN = '#01E246';

const STAGES = [
  {
    n: '01',
    name: 'Discovery',
    range: 'Day 1–5',
    desc: 'Understand your processes, teams and business requirements.',
    proof: 'Process & workflow mapping',
    icon: Search,
    image: '/images/discovery.webp',
  },
  {
    n: '02',
    name: 'Configuration',
    range: 'Day 6–15',
    desc: 'Configure UPWON around your existing business processes.',
    proof: 'Business-specific workflows',
    icon: SlidersHorizontal,
    image: '/images/configuration.webp',
  },
  {
    n: '03',
    name: 'Data Migration',
    range: 'Day 16–25',
    desc: 'Move, clean and validate your existing business data.',
    proof: 'Data validation checkpoints',
    icon: Database,
    image: '/images/data_migration.webp',
  },
  {
    n: '04',
    name: 'Go-Live',
    range: 'Day 26–45',
    desc: 'Launch UPWON with your team ready and supported.',
    proof: 'Go-live readiness & training',
    icon: Rocket,
    image: '/images/go_live.webp',
    milestone: true,
  },
  {
    n: '05',
    name: 'Ongoing Support',
    range: 'Ongoing',
    desc: 'Stay connected with the UPWON team after launch.',
    proof: 'Direct implementation & support access',
    icon: Headset,
    image: '/images/suuport.webp',
    ongoing: true,
  },
];

const N = STAGES.length;

// Orange L-shaped corner brackets around a box.
function CornerBrackets({ color = '#E85A2A' }) {
  const base = 'pointer-events-none absolute h-4 w-4';
  return (
    <>
      <span className={`${base} -left-1.5 -top-1.5 border-l-2 border-t-2`} style={{ borderColor: color }} />
      <span className={`${base} -right-1.5 -top-1.5 border-r-2 border-t-2`} style={{ borderColor: color }} />
      <span className={`${base} -bottom-1.5 -left-1.5 border-b-2 border-l-2`} style={{ borderColor: color }} />
      <span className={`${base} -bottom-1.5 -right-1.5 border-b-2 border-r-2`} style={{ borderColor: color }} />
    </>
  );
}

// Proof-point label.
function ProofPoint({ text, green }) {
  return (
    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-white px-2.5 py-1 text-[14px] font-semibold text-navy-700">
      <Check className="h-3 w-3" strokeWidth={3} style={{ color: green ? GREEN : '#E85A2A' }} />
      {text}
    </span>
  );
}

// The "30–45 DAYS" milestone badge.
function MilestoneBadge() {
  return (
    <div className="inline-flex items-center gap-4 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white px-6 py-3 shadow-sm">
      <span className="num-display text-[2rem] leading-none text-orange-600 md:text-[2.4rem]">30–45</span>
      <span className="h-9 w-px bg-orange-200" />
      <span className="flex flex-col">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy-950">Days to Go-Live</span>
        <span className="mt-1 text-[14px] text-navy-500">Not 18 months.</span>
      </span>
    </div>
  );
}

// The active stage card (right side, framed).
function ActiveCard({ stage }) {
  const accent = stage.ongoing ? GREEN : '#E85A2A';
  return (
    <div className="relative rounded-2xl border border-cream-300 bg-white/90 p-6 shadow-enterprise-lg backdrop-blur-sm">
      <CornerBrackets color={stage.milestone ? '#E85A2A' : accent} />
      <span className="num-display text-[2.6rem] leading-none text-navy-100">{stage.n}</span>
      <span
        className="mt-1 block text-[11px] font-bold uppercase tracking-[0.16em]"
        style={{ color: accent }}
      >
        {stage.range}
      </span>
      <h3 className="mt-1 h-display text-2xl text-navy-950">{stage.name}</h3>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-navy-600">{stage.desc}</p>
      <ProofPoint text={stage.proof} green={stage.ongoing} />
    </div>
  );
}

// The dimmed "next" card peeking below the active one.
function PeekCard({ stage }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-cream-100/70 p-6 opacity-45">
      <span className="num-display text-[2.6rem] leading-none text-navy-100">{stage.n}</span>
      <h3 className="mt-1 h-display text-2xl text-navy-950">{stage.name}</h3>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-navy-600">{stage.desc}</p>
    </div>
  );
}

export default function ErpImplementationTimeline() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(p * N))));
  });

  const TRAVEL = 42; // % the active card / marker travels down the timeline
  const posPct = (active / (N - 1)) * TRAVEL;
  const stage = STAGES[active];
  const prevStage = STAGES[(active - 1 + N) % N];
  const nextStage = STAGES[(active + 1) % N];

  return (
    <>
      {/* ===== Desktop — pinned, scroll-driven story ===== */}
      <section
        ref={ref}
        style={{ height: `${N * 80}vh` }}
        className="relative hidden bg-white lg:block"
      >
        <div className="sticky top-[120px] flex h-[calc(100vh-132px)] items-start overflow-hidden pt-[2vh]">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/implimentation%20img.webp')" }}
          />
          <Container className="relative w-full">
            <Eyebrow>Implementation &amp; Partnership</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
              Live in <span className="gradient-text-orange">30–45 Days.</span> Not 18 Months.
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-navy-600 md:text-[14px]">
              A structured implementation process designed around your existing operations —
              from discovery to go-live and ongoing support.
            </p>

            <div className="mt-6 grid grid-cols-[1fr_40px_1fr] items-start gap-8">
              {/* LEFT — changing image + badge */}
              <div className="min-w-0">
                <div className="relative">
                  <CornerBrackets />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={stage.image}
                      src={stage.image}
                      alt={stage.name}
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="block max-h-[40vh] w-full rounded-lg object-cover"
                    />
                  </AnimatePresence>
                </div>

                <div className="mt-6">
                  <MilestoneBadge />
                </div>

                {/* Partnership strip */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="whitespace-nowrap rounded-full border border-cream-300 bg-white px-2.5 py-1 text-[14px] font-semibold text-navy-800">
                    UPWON Team
                  </span>
                  <Handshake className="h-3.5 w-3.5 text-orange-500" strokeWidth={1.9} />
                  <span className="whitespace-nowrap rounded-full border border-cream-300 bg-white px-2.5 py-1 text-[14px] font-semibold text-navy-800">
                    Your Team
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-navy-400" strokeWidth={2} />
                  <span
                    className="whitespace-nowrap rounded-full border px-2.5 py-1 text-[14px] font-semibold"
                    style={{ borderColor: GREEN, color: '#0a8f3c', background: 'rgba(1,226,70,0.06)' }}
                  >
                    Ongoing Partnership
                  </span>
                </div>

              </div>

              {/* MIDDLE — timeline line + travelling marker */}
              <div className="relative h-[52vh] justify-self-center">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-navy-100" />
                <motion.div
                  className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-orange-500 to-emerald-400"
                  animate={{ height: `${posPct + 6}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
                {/* stage ticks */}
                {STAGES.map((s, i) => (
                  <span
                    key={s.n}
                    className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border border-navy-200 bg-white"
                    style={{ top: `${(i / (N - 1)) * TRAVEL}%` }}
                  />
                ))}
                {/* marker */}
                <motion.div
                  className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-[4px] border-2 border-white bg-orange-500 shadow-glow-orange"
                  animate={{ top: `calc(${posPct}% - 4px)` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>

              {/* RIGHT — active card centred, blurred prev/next peeking above & below */}
              <div className="relative flex h-[52vh] min-w-0 flex-col justify-center gap-4 overflow-hidden">
                <div className="pointer-events-none blur-[2px]">
                  <PeekCard stage={prevStage} />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.n}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <ActiveCard stage={stage} />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none blur-[2px]">
                  <PeekCard stage={nextStage} />
                </div>
              </div>
            </div>

          </Container>
        </div>
      </section>

      {/* ===== Mobile / tablet — stacked ===== */}
      <section className="relative overflow-hidden bg-white py-12 lg:hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/implimentation%20img.webp')" }}
        />
        <Container className="relative">
          <Eyebrow>Implementation &amp; Partnership</Eyebrow>
 <h2 className="mt-2.5 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Live in <span className="gradient-text-orange">30–45 Days.</span> Not 18 Months.
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-navy-600">
            A structured implementation process designed around your existing operations —
            from discovery to go-live and ongoing support.
          </p>
          <div className="mt-5">
            <MilestoneBadge />
          </div>

          <div className="mt-10 space-y-10">
            {STAGES.map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <div className="relative">
                  <CornerBrackets color={s.ongoing ? GREEN : '#E85A2A'} />
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="block w-full rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <span
                    className="text-[10.5px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: s.ongoing ? GREEN : '#E85A2A' }}
                  >
                    {s.n} · {s.range}
                  </span>
                  <h3 className="mt-0.5 h-display text-lg text-navy-950">{s.name}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-navy-600">{s.desc}</p>
                  <ProofPoint text={s.proof} green={s.ongoing} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partnership + rollout */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap rounded-full border border-cream-300 bg-white px-2.5 py-1 text-[14px] font-semibold text-navy-800">
              UPWON Team
            </span>
            <Handshake className="h-3.5 w-3.5 text-orange-500" strokeWidth={1.9} />
            <span className="whitespace-nowrap rounded-full border border-cream-300 bg-white px-2.5 py-1 text-[14px] font-semibold text-navy-800">
              Your Team
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-navy-400" strokeWidth={2} />
            <span
              className="whitespace-nowrap rounded-full border px-2.5 py-1 text-[14px] font-semibold"
              style={{ borderColor: GREEN, color: '#0a8f3c', background: 'rgba(1,226,70,0.06)' }}
            >
              Ongoing Partnership
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-cream-300 bg-cream-100/70 p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600">
              Built around your business
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-navy-700">
              Prefer a phased or off-season rollout? UPWON can be implemented around your
              operational cycle to minimise disruption.
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {['Phased rollout', 'Off-season implementation'].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-xl border border-cream-300 bg-white px-3.5 py-2 text-[14px] font-semibold text-navy-800 shadow-sm"
                >
                  <Check className="h-4 w-4" strokeWidth={3} style={{ color: GREEN }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
