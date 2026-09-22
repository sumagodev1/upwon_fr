import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

const CLIENTS = [
  { name: 'Winni', src: '/images/testimonial/winni.webp' },
  { name: 'U2 Cake', src: '/images/testimonial/u2cake.webp' },
  { name: 'OFC', src: '/images/testimonial/ofc.webp' },
  { name: 'Monginis', src: '/images/testimonial/mongignis.webp' },
  { name: 'Kaka Halwai', src: '/images/testimonial/kaka halwai.webp' },
  { name: 'Gokul', src: '/images/testimonial/gokul.webp' },
];

const STATS = [
  {
    value: '40%',
    label: 'faster order processing',
    description:
      'Move orders from creation to fulfillment through structured workflows instead of manual follow-up.',
  },
  {
    value: '50–80%',
    label: 'operational leakage cut',
    description:
      'Close the gaps across schemes, claims and stock movement that quietly erode margin.',
  },
  {
    value: '40%',
    label: 'higher distributor fill rates',
    description:
      'Keep distributor stock replenished with clearer visibility into demand across the channel.',
  },
];

function ClientLogo({ client }) {
  return (
    <div className="flex h-[54px] w-[130px] shrink-0 items-center justify-center sm:w-[150px]">
      <img
        src={client.src}
        alt={client.name}
        loading="lazy"
        decoding="async"
        className="max-h-[42px] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default function FmcgProofStripSection() {
  const reduceMotion = useReducedMotion();

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
      {/* ================= HEADING ================= */}
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
            },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">
              TRUSTED ACROSS FMCG DISTRIBUTION
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Powering Growth for{' '}
            <span className="gradient-text-orange">
              FMCG Distribution Businesses
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-base"
          >
            From regional distributors to multi-location FMCG brands, teams use
            UpWon to keep inventory, orders, and channel operations moving every
            day.
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= CLIENT MARQUEE ================= */}
      {/* The track holds two identical copies and animate-ticker shifts it
          -50%, so the loop is seamless. The second copy is decorative. */}
      <Container className="relative mt-8 sm:mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mask-fade-lr relative mx-auto max-w-6xl overflow-hidden"
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

            <div className="flex items-center gap-10 md:gap-16" aria-hidden="true">
              {CLIENTS.map((client) => (
                <ClientLogo key={`dup-${client.name}`} client={client} />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* ================= PROOF NUMBERS ================= */}
      <Container className="relative mt-10 sm:mt-14 lg:mt-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
            },
          }}
          className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-14"
        >
          {STATS.map(({ value, label, description }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: EASE },
                },
              }}
              className="min-w-0"
            >
              <p className="h-display text-[38px] font-semibold leading-none tracking-tight gradient-text-orange sm:text-[44px]">
                {value}
              </p>

              <p className="mt-3 h-display text-[14px] font-semibold text-navy-950 sm:text-[15px]">
                {label}
              </p>

              <p className="mt-2 max-w-[320px] text-[13px] leading-relaxed text-navy-600 sm:text-[13.5px]">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
