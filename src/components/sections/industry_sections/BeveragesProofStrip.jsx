import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

// How long a stat holds before the card turns over
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
    photo: '/images/bev_from_ingredients_to_every_bottle.webp',
  },
  {
    value: '18,000+',
    label: 'Inventory points tracked across locations',
    photo: '/images/bev_production_and_product_visibility.webp',
  },
  {
    value: '25,000+',
    label: 'Sales channels kept in one connected flow',
    photo: '/images/bev_quality_operational_control.webp',
  },
  {
    value: '45+',
    label: 'Distribution locations connected end to end',
    photo: '/images/bev_scale_and_growth.webp',
  },
];

function ClientLogo({ client }) {
  return (
    <div className="flex h-[52px] w-[126px] shrink-0 items-center justify-center sm:w-[148px]">
      <img
        src={client.src}
        alt={client.name}
        loading="lazy"
        decoding="async"
        className="max-h-[46px] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default function BeveragesProofStrip() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  // The card turns over on its own; reduced motion holds the first stat.
  useEffect(() => {
    if (reduceMotion) return undefined;

    const id = window.setInterval(
      () => setActive((current) => (current + 1) % STATS.length),
      CARD_INTERVAL
    );

    return () => window.clearInterval(id);
  }, [reduceMotion]);

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

  const stat = STATS[active];

  // Two identical copies with animate-ticker shifting the track -50%, so each
  // row loops continuously. The second copy is decorative.
  const marquee = (reverse = false) => (
    <div
      className={`flex w-max items-center gap-10 px-6 md:gap-14 ${
        reduceMotion
          ? ''
          : `animate-ticker [animation-duration:36s] hover:[animation-play-state:paused] ${
              reverse ? '[animation-direction:reverse]' : ''
            }`
      }`}
    >
      {CLIENTS.map((client) => (
        <ClientLogo key={client.name} client={client} />
      ))}

      <div className="flex items-center gap-10 md:gap-14" aria-hidden="true">
        {CLIENTS.map((client) => (
          <ClientLogo key={`dup-${client.name}`} client={client} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <Container className="relative z-10">
        {/* ================= TRUST LINE ================= */}
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
            className="mt-3 h-display text-[22px] leading-snug tracking-tight text-navy-950 sm:text-[26px] lg:text-[28px]"
          >
            Built to Keep Ingredients, Production, Quality,{' '}
            <span className="gradient-text-orange">
              and Every Sales Channel Connected.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            Teams across beverages, food, dairy, and FMCG use UpWon to keep
            procurement, production, quality, inventory, and distribution
            connected across their locations.
          </motion.p>
        </motion.div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.42fr_0.58fr] lg:items-stretch">
          {/* ================= CLIENT MARQUEE ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="flex min-w-0 flex-col justify-center gap-6 rounded-[16px] border border-navy-950/[0.07] bg-white py-8 shadow-[0_10px_28px_rgba(25,35,55,0.05)]"
          >
            <div className="mask-fade-lr overflow-hidden">{marquee()}</div>

            <div className="mask-fade-lr overflow-hidden">{marquee(true)}</div>
          </motion.div>

          {/* ================= STAT CARD ================= */}
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative min-h-[240px] min-w-0 overflow-hidden rounded-[16px] bg-navy-950 lg:min-h-0"
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

            {/* The four photos are bright, so the card carries an even
                scrim plus a heavier foot for the copy to sit on */}
            <div className="absolute inset-0 bg-navy-950/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-6">
              <motion.p
                key={`v-${active}`}
                initial={{ opacity: 0, y: d(10) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="h-display text-[40px] font-extrabold leading-none tracking-tight text-white sm:text-[46px]"
              >
                {stat.value}
              </motion.p>

              <motion.p
                key={`l-${active}`}
                initial={{ opacity: 0, y: d(10) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
                className="mt-2 text-[13px] leading-snug text-white/80"
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
                      index === active
                        ? 'w-6 bg-orange-500'
                        : 'w-2.5 bg-white/35'
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
