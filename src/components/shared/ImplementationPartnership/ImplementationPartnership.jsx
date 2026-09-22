import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container.jsx';
import Eyebrow from '../Eyebrow/Eyebrow.jsx';

/*
  "Implementation & Partnership" — an expandable stage list (left) paired with a
  coverflow carousel (right). The active stage expands in the list and sits in
  the centre of the carousel with its image + copy; the neighbouring stages peek
  on either side. Auto-cycles; hover pauses; arrows / list items / dots navigate.
*/

const EASE = [0.22, 1, 0.3, 1];
const AUTOPLAY_MS = 3200;

const STAGES = [
  {
    n: '01',
    title: 'Discovery',
    desc: 'We understand your business, challenges and goals before a single line is configured.',
    badge: 'Your operation, mapped in days',
    img: '/images/discovery1.webp',
  },
  {
    n: '02',
    title: 'Configuration',
    desc: 'We configure UpWon to fit your processes, beats and workflows — not the other way round.',
    badge: 'Configured to your beats',
    img: '/images/configuartion1.webp',
  },
  {
    n: '03',
    title: 'Field Team Onboarding',
    desc: 'We onboard and train your field team for a smooth, confident start on day one.',
    badge: 'Reps live on day one',
    img: '/images/onboarding1.webp',
  },
  {
    n: '04',
    title: 'Distributor Rollout',
    desc: 'We extend the system to your distributors and ensure seamless, low-friction adoption.',
    badge: 'Distributors onboarded smoothly',
    img: '/images/distrubutor_rollout1.webp',
  },
  {
    n: '05',
    title: 'Ongoing Support',
    desc: 'We stay with you with continuous support, improvements and a direct line to the team.',
    badge: 'A direct line to the team',
    img: '/images/ongoing_support.webp',
  },
];

const N = STAGES.length;

// The image card used in the carousel (active = full detail, side = faded peek).
function StageCard({ stage, active }) {
  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white shadow-enterprise ${
        active ? 'w-[520px] p-4' : 'w-[420px] p-3'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img src={stage.img} alt={stage.title} className="aspect-[4/3] w-full object-cover" />
        {active && (
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 shadow-sm backdrop-blur-sm">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-500 text-[14px] font-extrabold text-white">
              {stage.n}
            </span>
            <span className="truncate text-[14px] font-semibold text-navy-800">{stage.badge}</span>
          </div>
        )}
      </div>

      {active && (
        <div className="px-2 pb-1 pt-4">
          <h3 className="text-lg font-bold text-navy-950">{stage.title}</h3>
          <Link
            to="/demo"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-[14px] font-bold text-navy-950 transition-colors hover:border-orange-400 hover:text-orange-600"
          >
            Talk to a specialist
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ImplementationPartnership() {
  const [active, setActive] = useState(0);
  const hovering = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return undefined;
    const id = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % N);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const go = (dir) => setActive((a) => (a + dir + N) % N);
  const prev = (active - 1 + N) % N;
  const next = (active + 1) % N;
  const stage = STAGES[active];

  return (
    <section className="relative overflow-hidden bg-cream-100 py-10 md:py-12">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Implementation &amp; Partnership</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Live in Weeks.{' '}
            <span className="gradient-text-orange">With a Team That Knows Distribution.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            A phased go-live built around your existing beat structure and distributor network — with
            direct access to the team every step of the way.
          </p>
        </motion.div>

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-8 overflow-hidden rounded-[2rem] bg-[#eef0f4] p-6 md:p-8"
          onMouseEnter={() => {
            hovering.current = true;
          }}
          onMouseLeave={() => {
            hovering.current = false;
          }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left — all stages open, active one highlighted */}
            <div className="space-y-3">
              {STAGES.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.n}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`block w-full max-w-sm rounded-2xl border p-5 text-left shadow-sm transition-all ${
                      on
                        ? 'border-orange-300 bg-white ring-2 ring-orange-400/60'
                        : 'border-transparent bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[14px] font-extrabold ${
                          on ? 'bg-orange-500 text-white' : 'bg-navy-100 text-navy-500'
                        }`}
                      >
                        {s.n}
                      </span>
                      <p className="text-[15px] font-bold text-navy-950">{s.title}</p>
                    </div>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-navy-600">{s.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Right — coverflow carousel */}
            <div className="relative mx-auto flex min-h-[620px] w-full max-w-3xl items-center justify-center overflow-hidden py-4">
              {/* Peeking neighbours */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-1/2 -translate-x-[72%] -translate-y-1/2 scale-95 opacity-40 blur-[1px]"
              >
                <StageCard stage={STAGES[prev]} active={false} />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-1/2 translate-x-[72%] -translate-y-1/2 scale-95 opacity-40 blur-[1px]"
              >
                <StageCard stage={STAGES[next]} active={false} />
              </div>

              {/* Active card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative z-20"
                >
                  <StageCard stage={stage} active />
                </motion.div>
              </AnimatePresence>

              {/* Arrows */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous stage"
                className="absolute left-1 top-1/2 z-30 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy-800 shadow-md transition-colors hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next stage"
                className="absolute right-1 top-1/2 z-30 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy-800 shadow-md transition-colors hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {STAGES.map((s, i) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${s.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-navy-900' : 'w-2 bg-navy-300 hover:bg-navy-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
