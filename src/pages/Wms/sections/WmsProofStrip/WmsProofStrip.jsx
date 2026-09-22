import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  WMS Proof Strip — de-risks the visit with real, sourced operational numbers.
  Three cards in a row; each flips through its own set of self-contained stat
  visuals automatically.
*/

const EASE = [0.22, 1, 0.3, 1];

const CARDS = [
  ['/images/put_away.webp', '/images/dock_to_stock.webp', '/images/wastage.webp'],
  ['/images/fullfillment.webp', '/images/expiry_errors.webp', '/images/tracability.webp'],
  ['/images/stock_accuracy.webp', '/images/multi_site.webp', '/images/shelf_life.webp'],
];

function FlipCard({ imgs, step, delay, onPause, onResume }) {
  const src = imgs[step % imgs.length];

  return (
    <div
      className="relative aspect-[11/8] overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            duration: 0.8,
            ease: EASE,
            delay,
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}

export default function WmsProofStrip() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    // Slower timing so users have enough time to read each card
    const id = setInterval(() => {
      setStep((s) => s + 1);
    }, 5500);

    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Proof Strip</Eyebrow>

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Not a Pitch.{' '}
            <span className="gradient-text-orange">
              Just What&apos;s Already Running.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Real, sourced operational numbers from live UpWon deployments — shown honestly,
            not inflated to win a headline war.
          </p>
        </motion.div>
      </Container>

      {/* Three flipping stat-card images */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mx-auto mt-12 grid max-w-[1680px] gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        {CARDS.map((imgs, i) => (
          <FlipCard
            key={i}
            imgs={imgs}
            step={step}
            delay={i * 0.1}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />
        ))}
      </motion.div>
    </section>
  );
}