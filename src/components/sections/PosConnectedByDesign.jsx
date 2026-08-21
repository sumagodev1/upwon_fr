import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  POS "Connected by Design" — makes the recipe-level claim concrete with one
  followable example. A ClickUp-style scrolling feature layout: each stage of the
  flow is a block (label + heading + description + gradient-framed video), with a
  sticky right-side nav that highlights the stage in view.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';
const DIR = '/video/connected_by_design';

const STAGES = [
  {
    id: 'counter-sale',
    nav: 'Counter Sale',
    label: 'Step 01 · At the counter',
    heading: 'A cake is sold and billed',
    desc: 'Billing completes in seconds at your counter — the single action that starts the whole chain. No one has to report it upward.',
    video: `${DIR}/cbd_1_sale.mp4`,
    gradient: 'linear-gradient(135deg, #FB7185 0%, #E85A2A 100%)',
  },
  {
    id: 'recipe-deduction',
    nav: 'Recipe Deduction',
    label: 'Step 02 · Behind the counter',
    heading: 'The recipe behind it leaves your stock',
    desc: 'Flour, sugar and cream deduct automatically — real ingredients consumed, not just a SKU count. Your stock stays accurate without anyone touching it.',
    video: `${DIR}/cbd_2_recipe.mp4`,
    gradient: 'linear-gradient(135deg, #FBA94C 0%, #E85A2A 100%)',
  },
  {
    id: 'food-cost',
    nav: 'Real Food Cost',
    label: 'Step 03 · Costing',
    heading: 'True food cost updates instantly',
    desc: 'You see the actual cost and margin of that sale the moment it happens — not a monthly guess reconstructed from spreadsheets.',
    video: `${DIR}/cbd_3_foodcost.mp4`,
    gradient: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)',
  },
  {
    id: 'finance',
    nav: 'Finance',
    label: 'Step 04 · Finance',
    heading: 'Finance sees it — no reconciliation',
    desc: 'Profitability, reporting and decisions reflect the sale automatically, end to end — because it all shares one data model with UpWon ERP and FMS.',
    video: `${DIR}/cbd_4_finance.mp4`,
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #E85A2A 100%)',
  },
  {
    id: 'outcome',
    nav: 'The Outcome',
    label: 'The outcome',
    heading: 'No end-of-day stock count',
    desc: 'No guessing what a cake actually cost you — the numbers are already right, sale by sale.',
    video: `${DIR}/No_manual_stock_count.mp4`,
    gradient: 'linear-gradient(135deg, #FCA311 0%, #E85A2A 100%)',
  },
];

function StageBlock({ stage, onActive }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && onActive(stage.id)),
      { rootMargin: '-40% 0px -50% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stage.id, onActive]);

  return (
    <motion.div
      ref={ref}
      id={stage.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="scroll-mt-32"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
        {stage.label}
      </p>
      <h3 className="mt-3 h-display text-[1.6rem] leading-[1.1] tracking-tight text-navy-950 md:text-[2rem]">
        {stage.heading}
      </h3>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-600">
        {stage.desc}
      </p>
      <div className="mt-6">
        <video
          src={stage.video}
          className="w-full rounded-3xl border border-cream-300 shadow-enterprise"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </motion.div>
  );
}

export default function PosConnectedByDesign() {
  const [active, setActive] = useState(STAGES[0].id);

  return (
    <section className="relative bg-white py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Connected by Design</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Sell One Cake. Watch Flour, Sugar and Cream Leave Your Stock —{' '}
            <span className="gradient-text-orange">Automatically.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Walk through one real flow: a counter sale is billed → the recipe behind that product
            deducts real ingredient stock → true food cost updates → finance sees it — with no manual
            stock count required.
          </p>
        </motion.div>

        {/* Scrolling stages + sticky nav */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div className="space-y-16 md:space-y-24">
            {STAGES.map((s) => (
              <StageBlock key={s.id} stage={s} onActive={setActive} />
            ))}
          </div>

          {/* Sticky nav */}
          <nav className="hidden lg:block lg:self-start lg:sticky lg:top-32">
            <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.2em] text-navy-400">
              The flow
            </p>
            <ul className="space-y-1.5 border-l-2 border-cream-300">
              {STAGES.map((s) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`-ml-0.5 block border-l-2 py-3 pl-5 text-[17px] transition-colors ${
                        on
                          ? 'font-bold text-navy-950'
                          : 'border-transparent font-medium text-navy-400 hover:text-navy-700'
                      }`}
                      style={on ? { borderColor: ORANGE } : undefined}
                    >
                      {s.nav}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mx-auto mt-16 max-w-xl text-center text-[15px] font-bold text-navy-950"
        >
          No end-of-day stock count.{' '}
          <span style={{ color: ORANGE }}>No guessing what a cake actually cost you.</span>
        </motion.p>
      </Container>
    </section>
  );
}
