import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  FMS "Connected by Design" — makes the royalty-from-real-cost claim concrete with
  one followable example. A single outlet sale travels through four connected
  stages, with a live "pulse" cycling through them so the flow reads as automatic:
  bill → recipe-level stock deduction → royalty recalculation → MIS update.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';

const STAGES = [
  {
    n: 1,
    img: '/images/outlate sale.webp',
    title: 'Outlet Sale Billed',
    desc: 'A cake is sold and billed at Outlet 47 on the POS.',
  },
  {
    n: 2,
    img: '/images/central kitchen stock.webp',
    title: 'Central Kitchen Stock Deducts',
    desc: 'Recipe-level ingredients deduct at the central kitchen — automatically.',
  },
  {
    n: 3,
    img: '/images/royality recalculated.webp',
    title: 'Royalty Recalculated',
    desc: 'Royalty recomputes from real production cost, not a flat estimate.',
  },
  {
    n: 4,
    img: '/images/franchies MIS.webp',
    title: 'Franchise MIS Updates',
    desc: 'Your dashboard reflects it live — no manual reconciliation.',
  },
];

function StageCard({ stage, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (stage.n - 1) * 0.1, ease: EASE }}
      className={`relative flex-1 rounded-2xl border bg-white p-5 shadow-sm transition-all duration-500 md:p-6 ${
        active ? '-translate-y-1 border-orange-300 shadow-enterprise' : 'border-cream-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[15px] font-black text-white transition-colors duration-500"
          style={{ background: active ? ORANGE : '#c9ccd6' }}
        >
          {stage.n}
        </span>
        <h3 className="text-[15px] font-bold leading-tight text-navy-950">{stage.title}</h3>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-cream-200 bg-cream-50">
        <img
          src={stage.img}
          alt={stage.title}
          loading="lazy"
          decoding="async"
          className="h-44 w-full object-cover md:h-52"
        />
      </div>

      <p className="mt-4 text-[14px] leading-snug text-navy-600">{stage.desc}</p>
    </motion.div>
  );
}

function Connector({ active }) {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 lg:py-0">
      <span
        className="grid h-8 w-8 place-items-center rounded-full transition-colors duration-500"
        style={{
          background: active ? ORANGE : 'rgba(232,90,42,0.12)',
          color: active ? '#fff' : ORANGE,
        }}
      >
        <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" strokeWidth={2.4} />
      </span>
    </div>
  );
}

export default function FmsConnectedFlow() {
  const [active, setActive] = useState(0);

  // Cycle the pulse through the four stages, on a loop, so the flow feels live.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STAGES.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

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
          <Eyebrow className="justify-center">Connected by Design</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.12] tracking-tight text-navy-950">
            A Cake Sold at Outlet 47 Updates Royalty, Stock and Your Dashboard —{' '}
            <span className="gradient-text-orange">Before the Receipt Prints.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Walk through one real flow: an outlet sale is billed → recipe-level stock deducts at the
            central kitchen → royalty recalculates from real production cost → franchise MIS updates —
            with no manual reconciliation at any step.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <div className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          {STAGES.map((s, i) => (
            <div key={s.n} className="contents">
              <StageCard stage={s} active={active === i} />
              {i < STAGES.length - 1 && <Connector active={active > i} />}
            </div>
          ))}
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mx-auto mt-10 max-w-xl text-center text-[15px] font-bold text-navy-950"
        >
          No spreadsheet. No month-end dispute.{' '}
          <span style={{ color: ORANGE }}>No phone call to head office.</span>
        </motion.p>
      </Container>
    </section>
  );
}
