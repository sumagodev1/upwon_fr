import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  WMS Proof Strip — de-risks the visit with real, sourced operational numbers.
  Three cards in a row; each flips through its own set of self-contained stat
  visuals automatically.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Proof Strip';
const HEADING_LINES = [
  [
    { text: 'Not a Pitch. ', accent: false },
    { text: "Just What's Already Running.", accent: true },
  ],
];
const SUBTEXT =
  'Real, sourced operational numbers from live UpWon deployments — shown honestly, not inflated to win a headline war.';

/*
  Each card is the set of images it flips through. The figures are inside the
  artwork, so every slide carries its own alt text — it is the only thing this
  section says to a screen reader.
*/
const CARDS = [
  [
    { src: '/images/put_away.webp', alt: '70% faster put-away via the suggested-bin engine.' },
    { src: '/images/dock_to_stock.webp', alt: 'Dock-to-stock in minutes rather than hours.' },
    { src: '/images/wastage.webp', alt: 'Lower wastage across perishable stock.' },
  ],
  [
    {
      src: '/images/fullfillment.webp',
      alt: 'Higher order fulfilment accuracy after barcode rollout.',
    },
    {
      src: '/images/expiry_errors.webp',
      alt: 'Zero expiry-related dispatch errors after FEFO enforcement.',
    },
    {
      src: '/images/tracability.webp',
      alt: 'Full batch traceability from raw material to dispatch.',
    },
  ],
  [
    {
      src: '/images/stock_accuracy.webp',
      alt: '99.4% stock accuracy after the barcode rollout.',
    },
    {
      src: '/images/multi_site.webp',
      alt: 'Live multi-plant, multi-depot inventory in real time.',
    },
    { src: '/images/shelf_life.webp', alt: 'Shelf-life visibility across every batch in stock.' },
  ],
];

function FlipCard({ imgs, step, delay, onPause, onResume }) {
  const slide = imgs[step % imgs.length];

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
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
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

export default function WmsProofStrip({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const cards = section && section.cards.length > 0 ? section.cards : CARDS;

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
          {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>

          {subtext && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
              {subtext}
            </p>
          )}
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
        {cards.map((imgs, i) => (
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