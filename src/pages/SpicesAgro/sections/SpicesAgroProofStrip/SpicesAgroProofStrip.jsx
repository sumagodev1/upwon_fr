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
  { name: 'Kaka Halwai', src: '/images/testimonial/kaka%20halwai.webp' },
  { name: 'Gokul', src: '/images/testimonial/gokul.webp' },
];

function ClientLogo({ client }) {
  return (
    <div className="flex h-[54px] w-[130px] shrink-0 items-center justify-center sm:w-[150px]">
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

export default function SpicesAgroProofStrip() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
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
    <section className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <Container className="relative z-10">
        {/* ================= TRUST LINE ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">
              TRUSTED BY GROWING BRANDS
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[22px] leading-snug tracking-tight text-navy-950 sm:text-[26px] lg:text-[28px]"
          >
            Built to Keep Raw Materials, Processing, Quality, Warehouses,{' '}
            <span className="gradient-text-orange">
              and Every Sales Channel Connected.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            Teams across spices, agro-processing, food, and FMCG use UpWon to
            keep procurement, production, quality, inventory, and distribution
            connected across their locations.
          </motion.p>
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

        {/* ================= PRODUCT PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, y: d(26) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-10"
        >
          <img
            src="/images/agro_proof_strip.webp"
            alt="The UpWon dashboard showing procurement, production, inventory and sales for a spices and agro-processing business"
            width={1584}
            height={993}
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto w-full max-w-[1100px]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
