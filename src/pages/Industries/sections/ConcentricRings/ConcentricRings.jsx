import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import SectionHeading from '../../../../components/shared/SectionHeading/SectionHeading.jsx';
import IndustryRingOrbit from '../../../../components/shared/IndustryRingOrbit/IndustryRingOrbit.jsx';
import { COMPANY } from '../../../../data/company.js';

export default function ConcentricRings() {
  const [core, extension, expansion] = COMPANY.rings;
  // Which ring the orbit highlights — driven by clicking a ring card.
  const [activeRing, setActiveRing] = useState(1);

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      {/* Brand-signature backdrop — three faint concentric circles slowly
          pulsing behind the section heading. Reinforces the "UpWon Universe"
          metaphor without competing with the bento cards. Pointer-events are
          disabled so the cards stay clickable. */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
        <div className="relative mt-24 h-[720px] w-[720px] max-w-[110vw]">
          {[1, 2, 3].map((ring) => (
            <motion.span
              key={ring}
              aria-hidden
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{
                opacity: { duration: 1.6, delay: 0.1 * ring, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 1.6, delay: 0.1 * ring, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor:
                  ring === 1
                    ? 'rgba(232, 93, 38, 0.20)'
                    : ring === 2
                    ? 'rgba(232, 93, 38, 0.14)'
                    : 'rgba(232, 93, 38, 0.10)',
                transform: `scale(${0.4 + ring * 0.22})`,
                animation: `pulse-slow ${6 + ring * 1.5}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                animationDelay: `${ring * 0.8}s`,
              }}
            />
          ))}
        </div>
      </div>

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="The UpWon Universe"
          title={
            <>
              Deepest in Food.{' '}
              <span className="gradient-text-orange">Built to expand.</span>
            </>
          }
          description="Three concentric rings of expertise — from where we started to where we grow."
        />

        {/* Split layout: live orbit diagram on the left, the ring cards (Core +
            two stacked — the original bento, resized) on the right. */}
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          {/* ===== LEFT — live orbit, highlights the selected ring ===== */}
          <IndustryRingOrbit activeRing={activeRing} />

          {/* ===== RIGHT — the three ring cards, original bento layout ===== */}
          <div className="grid gap-4 sm:grid-cols-[1.15fr_1fr]">
          {/* CORE — dominant orange card (Ring 1) */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActiveRing(1)}
            aria-pressed={activeRing === 1}
            className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border bg-gradient-to-br from-orange-50 via-white to-orange-50/50 p-5 transition-all duration-300 md:p-6 ${
              activeRing === 1
                ? 'border-orange-400 shadow-[0_0_0_2px_rgba(232,90,42,0.35)]'
                : 'border-orange-300 hover:border-orange-400'
            }`}
          >
            {/* Floating glow */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl"
            />

            <div className="relative flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-700">
                <Sparkles className="h-3 w-3" />
                Ring 01 · Where we are deepest
              </span>
              <span className="num-display text-4xl font-bold leading-none text-orange-500/15 md:text-5xl">
                01
              </span>
            </div>

            <h3 className="relative mt-4 font-display text-xl font-bold leading-tight text-navy-950 md:text-2xl">
              Food Manufacturing
            </h3>
            <p className="relative mt-2.5 text-[14px] leading-relaxed text-navy-700">
              50+ live food manufacturers run on UpWon — bakeries, dairy, sweets,
              spices, beverages. 
            </p>

            {/* Industry chips — all sub-verticals, in two columns. */}
            <div className="relative mt-4 grid grid-cols-2 gap-1.5">
              {core.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-3 py-1 text-[14px] font-semibold text-navy-900 shadow-sm transition-colors hover:border-orange-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.article>

          {/* Right column — Extension + Expansion stacked */}
          <div className="grid gap-5">
            {/* EXTENSION */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveRing(2)}
              aria-pressed={activeRing === 2}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border bg-gradient-to-br from-orange-50 via-white to-orange-50/30 p-5 shadow-sm transition-all duration-300 ${
                activeRing === 2
                  ? 'border-orange-400 shadow-[0_0_0_2px_rgba(232,90,42,0.35)]'
                  : 'border-orange-300 hover:border-orange-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-700">
                    <ArrowRight className="h-3 w-3" />
                    Ring 02 · Where we extend
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold leading-tight text-navy-950 md:text-lg">
                    Food FMCG Distribution
                  </h3>
                </div>
                <span className="num-display shrink-0 text-3xl font-bold leading-none text-orange-500/20 md:text-4xl">
                  02
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-1.5">
                {extension.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-2.5 py-0.5 text-[14px] font-medium text-navy-800 shadow-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-orange-500" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>

            {/* EXPANSION */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveRing(3)}
              aria-pressed={activeRing === 3}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border bg-gradient-to-br from-orange-50/60 via-white to-orange-50/30 p-5 shadow-sm transition-all duration-300 ${
                activeRing === 3
                  ? 'border-orange-400 shadow-[0_0_0_2px_rgba(232,90,42,0.35)]'
                  : 'border-orange-200 hover:border-orange-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-700">
                    <ArrowRight className="h-3 w-3" />
                    Ring 03 · Where we grow
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold leading-tight text-navy-950 md:text-lg">
                    Consumer Goods FMCG 
                  </h3>
                </div>
                <span className="num-display shrink-0 text-3xl font-bold leading-none text-orange-500/20 md:text-4xl">
                  03
                </span> 
              </div>

              <div className="mt-4 grid grid-cols-2 gap-1.5">
                {expansion.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-2.5 py-0.5 text-[14px] font-medium text-navy-800 shadow-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-orange-500" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
