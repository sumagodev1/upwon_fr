import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { Compass, Rocket, MapPinned, Share2, LifeBuoy } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  FMS "Implementation & Partnership" — directly addresses the phased-rollout trust
  builder: franchisors fear disrupting franchisee relationships above almost
  anything. Shown as a "how it works" stepper — a vertical list of stages on the
  right drives the screenshot on the left, so a buyer sees a low-risk path in.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';

const STEPS = [
  {
    icon: Compass,
    img: '/images/discover FMS.webp',
    title: 'Discovery',
    desc: 'We map your network, formats and franchise model — COCO to FOCO — before touching a single outlet.',
  },
  {
    icon: Rocket,
    img: '/images/Pilot Outlet Cluster.webp',
    title: 'Pilot Outlet Cluster',
    desc: 'Go live with a small cluster first, prove the flow, and refine with real franchisee feedback.',
  },
  {
    icon: MapPinned,
    img: '/images/Phased Rollout by Region State.webp',
    title: 'Phased Rollout by Region / State',
    desc: 'Expand region by region or state by state — never a forced, simultaneous network-wide switch.',
  },
  {
    icon: Share2,
    img: '/images/Full Network.webp',
    title: 'Full Network',
    desc: 'Once each region is steady, the whole network runs on one connected system.',
  },
  {
    icon: LifeBuoy,
    img: '/images/ongoing_support.webp',
    title: 'Ongoing Support',
    desc: 'A dedicated team stays on after go-live — with founder-to-founder engagement throughout.',
  },
];

export default function FmsImplementation() {
  const [active, setActive] = useState(0);

  // Auto-advance through the stages; user clicks override the cycle.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 3200);
    return () => clearInterval(id);
  }, [active]);

  const current = STEPS[active];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <Container>
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
            A Phased Rollout That{' '}
            <span className="gradient-text-orange">Never Disrupts a Single Day&apos;s Business.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Outlet-cluster or state-by-state rollout — protecting existing franchisee relationships
            rather than forcing a simultaneous network-wide switch.
          </p>
        </motion.div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — active stage screenshot */}
          <div className="relative">
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 shadow-enterprise">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.img}
                  src={current.img}
                  alt={current.title}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right — stepper list */}
          <div className="flex flex-col">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative flex items-start gap-4 py-4 text-left"
                >
                  {/* accent rail */}
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-cream-300" />
                  <span
                    className="absolute left-0 top-0 w-[2px] bg-orange-500 transition-all duration-300"
                    style={{ height: isActive ? '100%' : '0%' }}
                  />
                  <span
                    className="ml-5 grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors duration-300"
                    style={{
                      background: isActive ? ORANGE : 'rgba(232,90,42,0.1)',
                      color: isActive ? '#fff' : ORANGE,
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div className="flex-1 pt-0.5">
                    <h3
                      className={`text-[16px] font-bold transition-colors ${
                        isActive ? 'text-navy-950' : 'text-navy-500'
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`mt-1 text-[14px] leading-relaxed transition-colors ${
                        isActive ? 'text-navy-600' : 'text-navy-400'
                      }`}
                    >
                      {s.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
}
