import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

// Seconds each stat holds before the card turns over
const CARD_INTERVAL = 4200;

const CLIENTS = [
  { name: 'Winni', src: '/images/testimonial/winni.webp' },
  { name: 'U2 Cake', src: '/images/testimonial/u2cake.webp' },
  { name: 'OFC', src: '/images/testimonial/ofc.webp' },
  { name: 'Monginis', src: '/images/testimonial/mongignis.webp' },
  { name: 'Kaka Halwai', src: '/images/testimonial/kaka%20halwai.webp' },
  { name: 'Gokul', src: '/images/testimonial/gokul.webp' },
];

/*
  The figures are the scale numbers the site already states on the other
  industry proof strips, so nothing new is claimed here.
*/
const STATS = [
  {
    value: '2.5 Cr+',
    label: 'Products managed across connected operations',
    photo: '/images/dairy_proof_strip1.webp',
  },
  {
    value: '18,000+',
    label: 'Inventory points tracked across locations',
    photo: '/images/dairy_proof_strip2.webp',
  },
  {
    value: '45+',
    label: 'Distribution locations kept in one flow',
    photo: '/images/dairy_proof_strip3.webp',
  },
];

export default function DairyProofStrip() {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  // One clock for the strip: the card turns over to its next stat and the
  // logo tiles cross-fade to their next brand on the same beat. Reduced
  // motion holds the opening arrangement.
  useEffect(() => {
    if (reduceMotion) return undefined;

    const id = window.setInterval(
      () => setTick((current) => current + 1),
      CARD_INTERVAL
    );

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const active = tick % STATS.length;

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.1), delayChildren: 0.05 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const tilesGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.12 },
    },
  };

  const tileVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
  };

  const stat = STATS[active];

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="min-w-0"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>TRUSTED BY GROWING BRANDS</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[24px] leading-[1.14] tracking-tight text-navy-950 sm:text-[28px] lg:text-[32px]"
          >
            Join the food, dairy and FMCG brands
            {/* Held to two lines rather than one long run at desktop widths */}
            <br className="hidden sm:block" />{' '}
            <span className="gradient-text-orange">
              running their operations on UpWon.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            Teams across bakery, sweets, dairy, and FMCG use UpWon to keep
            production, inventory, warehouses, sales, and distribution
            connected across their locations.
          </motion.p>
        </motion.div>

        {/* ================= LOGOS + STAT CARD ================= */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_0.85fr] lg:items-stretch">
          {/* ---------- Client grid ---------- */}
          {/* Cells overlap by a pixel so shared edges read as one hairline */}
          <motion.div
            variants={tilesGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="-m-px grid min-w-0 grid-cols-2 sm:grid-cols-3"
          >
            {CLIENTS.map((_, tileIndex) => {
              const showing = (tileIndex + tick) % CLIENTS.length;

              return (
                <motion.div
                  key={tileIndex}
                  variants={tileVariants}
                  className="group relative -mb-px -mr-px h-[120px] overflow-hidden border border-navy-950/[0.07] bg-white sm:h-[140px]"
                >
                  {CLIENTS.map((client, index) => (
                    <motion.div
                      key={client.name}
                      animate={{
                        opacity: index === showing ? 1 : 0,
                        y: index === showing ? 0 : d(6),
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.6,
                        ease: EASE,
                        delay: reduceMotion ? 0 : tileIndex * 0.07,
                      }}
                      className="absolute inset-0 flex items-center justify-center px-5"
                    >
                      <img
                        src={client.src}
                        alt={index === showing ? client.name : ''}
                        aria-hidden={index === showing ? undefined : 'true'}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[52px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-[58px]"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              );
            })}
          </motion.div>

          {/* ---------- Stat card ---------- */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative min-h-[260px] min-w-0 overflow-hidden rounded-[16px] bg-navy-950 lg:min-h-0"
          >
            {STATS.map((item, index) => (
              <motion.img
                key={item.photo}
                src={item.photo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                animate={{ opacity: index === active ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />

            <div className="relative flex h-full flex-col justify-end p-6">
              <motion.p
                key={`v-${active}`}
                initial={{ opacity: 0, y: d(10) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="h-display text-[44px] font-extrabold leading-none tracking-tight text-white sm:text-[52px]"
              >
                {stat.value}
              </motion.p>

              <motion.p
                key={`l-${active}`}
                initial={{ opacity: 0, y: d(10) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
                className="mt-2 max-w-[85%] text-[13px] leading-snug text-white/80 sm:text-[13.5px]"
              >
                {stat.label}
              </motion.p>

              {/* Which stat is showing */}
              <div className="mt-5 flex items-center gap-1.5">
                {STATS.map((item, index) => (
                  <span
                    key={item.photo}
                    aria-hidden="true"
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      index === active ? 'w-6 bg-orange-500' : 'w-2.5 bg-white/35'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
