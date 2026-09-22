import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import { Boxes, Factory, BarChart3 } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

// How long a figure holds before its card turns over
const CARD_INTERVAL = 3800;

const CLIENTS = [
  { name: 'Winni', src: '/images/testimonial/winni.webp' },
  { name: 'U2 Cake', src: '/images/testimonial/u2cake.webp' },
  { name: 'OFC', src: '/images/testimonial/ofc.webp' },
  { name: 'Monginis', src: '/images/testimonial/mongignis.webp' },
  { name: 'Kaka Halwai', src: '/images/testimonial/kaka%20halwai.webp' },
  { name: 'Gokul', src: '/images/testimonial/gokul.webp' },
];

/*
  Each card turns over between the scale figures the site already states on
  the other industry proof strips, so nothing new is claimed here. The cards
  are offset by one step so they never all change at the same moment.
*/
const CARDS = [
  {
    Icon: Boxes,
    tint: 'bg-[#fdf0e6]',
    ink: 'text-orange-500',
    figures: [
      { value: '2.5 Cr+', label: 'Products managed across connected operations' },
      { value: '18,000+', label: 'Inventory points tracked across locations' },
    ],
  },
  {
    Icon: Factory,
    tint: 'bg-[#e9f1fd]',
    ink: 'text-[#2f6fed]',
    figures: [
      { value: '45+', label: 'Distribution locations kept in one flow' },
      { value: '25,000+', label: 'Sales channels connected end to end' },
    ],
  },
  {
    Icon: BarChart3,
    tint: 'bg-[#e8f7ed]',
    ink: 'text-[#1f9d55]',
    figures: [
      { value: '3 Lakh+', label: 'Field and floor teams working in one system' },
      { value: 'Real-time', label: 'Visibility across operations and reporting' },
    ],
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

export default function EngineeringProofStrip() {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  // One clock for all three cards; reduced motion holds the opening figures.
  useEffect(() => {
    if (reduceMotion) return undefined;

    const id = window.setInterval(
      () => setTick((current) => current + 1),
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

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
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
            Built to Keep Raw Materials, Production, Quality, Warehouses,{' '}
            <span className="gradient-text-orange">
              and Every Finished Product Movement Connected.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            Teams across manufacturing, food, dairy, and FMCG use UpWon to keep
            procurement, production, quality, inventory, and dispatch connected
            across their locations.
          </motion.p>
        </motion.div>

        {/* ================= FIGURES ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-3 lg:gap-5"
        >
          {CARDS.map(({ Icon, tint, ink, figures }, index) => {
            const figure = figures[(tick + index) % figures.length];

            return (
              <motion.article
                key={index}
                variants={fadeUp}
                className="flex h-full min-w-0 items-start gap-4 rounded-[16px] border border-navy-950/[0.06] bg-white p-5 shadow-[0_10px_28px_rgba(25,35,55,0.06)]"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] ${tint}`}
                >
                  <Icon className={`h-6 w-6 ${ink}`} strokeWidth={1.7} />
                </span>

                <div className="min-w-0">
                  {/* Keyed, so each figure fades in as its card turns over */}
                  <motion.p
                    key={`v-${figure.value}`}
                    initial={{ opacity: 0, y: d(8) }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="h-display text-[30px] font-extrabold leading-none tracking-tight text-navy-950 sm:text-[34px]"
                  >
                    {figure.value}
                  </motion.p>

                  <motion.p
                    key={`l-${figure.label}`}
                    initial={{ opacity: 0, y: d(8) }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.06, ease: EASE }}
                    className="mt-2 text-[12.5px] leading-snug text-navy-600 sm:text-[13px]"
                  >
                    {figure.label}
                  </motion.p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ================= CLIENT MARQUEE ================= */}
        {/* Two identical copies with animate-ticker shifting the track -50%,
            so the loop runs continuously. The second copy is decorative. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mask-fade-lr relative mt-8 overflow-hidden"
        >
          <div
            className={`flex w-max items-center gap-10 px-6 md:gap-16 ${
              reduceMotion
                ? ''
                : 'animate-ticker [animation-duration:38s] hover:[animation-play-state:paused]'
            }`}
          >
            {CLIENTS.map((client) => (
              <ClientLogo key={client.name} client={client} />
            ))}

            <div
              className="flex items-center gap-10 md:gap-16"
              aria-hidden="true"
            >
              {CLIENTS.map((client) => (
                <ClientLogo key={`dup-${client.name}`} client={client} />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
