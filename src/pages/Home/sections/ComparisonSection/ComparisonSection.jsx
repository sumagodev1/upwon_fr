import { useState } from 'react';
import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';

// --- Soft decorative background -------------------------------------------

function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange-500/[0.06] blur-[110px]" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[110px]" />
      <div className="absolute inset-0 grid-bg-light opacity-25" />
    </div>
  );
}

// --- Left panel: fragmented market ----------------------------------------

function LeftPanel() {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-white">
      <video
        src="/video/without%20upwon.mp4"
        autoPlay
        muted
        playsInline
        aria-label="Without UPWON — a tangle of single-purpose tools"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

// --- Right panel: unified UPWON core --------------------------------------

function RightPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-video w-full overflow-hidden bg-white"
    >
      <video
        src="/video/with_upwon_platform.mp4"
        autoPlay
        muted
        playsInline
        aria-label="UPWON unified platform — all seven platforms on one core"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </motion.div>
  );
}

// --- Slider handle ---------------------------------------------------------

// Reusable toggle button — same look/label on desktop and mobile.
function ToggleButton({ active, onClick, className = '' }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border border-cream-300 bg-white px-5 py-2.5 text-[14px] font-bold text-navy-950 shadow-md transition-colors hover:bg-cream-100 ${className}`}
    >
      <img src="/images/right-left.webp" alt="" aria-hidden className="h-4 w-4 object-contain" />
      {active ? 'Back to UPWON' : 'Imagine without UPWON'}
    </button>
  );
}

// --- Section ---------------------------------------------------------------

export default function ComparisonSection() {
  const [without, setWithout] = useState(false);

  // The two videos share the same ring position, so we simply cross-fade
  // between them — it reads as "same place, only the surrounding data changes".
  const toggleWithout = () => setWithout((v) => !v);

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14">
      <ParticleBackground />

      <Container className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
            The Enterprise Software Market – an honest view
          </p>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Every Function Has a Tool.
            <br />
            UPWON Has the <span className="gradient-text-orange">Whole Business.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-navy-600">
            The market is flooded with single-purpose, built for all domain software products. UPWON runs all seven, together.
          </p>
        </motion.div>

        {/* Desktop — cross-fade comparison (ring stays put, data changes). */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-6 hidden w-full max-w-5xl lg:block"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            {/* Base — UPWON. */}
            <div className="absolute inset-0">
              <RightPanel />
            </div>
            {/* Overlay — without UPWON, cross-faded in the same position. */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: without ? 1 : 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ pointerEvents: without ? 'auto' : 'none' }}
            >
              <LeftPanel />
            </motion.div>

            {/* Toggle — pinned to the top-right of the surface. */}
            <ToggleButton active={without} onClick={toggleWithout} className="absolute right-4 top-4 z-20" />
          </div>
        </motion.div>

        {/* Mobile & tablet — same toggle, panels swap in the same place. */}
        <div className="mx-auto mt-10 max-w-5xl lg:hidden">
          <div className="mb-4 flex justify-center">
            <ToggleButton active={without} onClick={toggleWithout} />
          </div>
          <div className="overflow-hidden">
            {without ? (
              <LeftPanel />
            ) : (
              /* Mobile-optimised still of the UPWON ring — the landscape video's
                 labels are too small on phones. */
              <img
                src="/images/with_upwon_mobile.webp"
                alt="UPWON unified platform — all seven platforms on one core"
                className="block w-full"
              />
            )}
          </div>
        </div>

      </Container>
    </section>
  );
}
