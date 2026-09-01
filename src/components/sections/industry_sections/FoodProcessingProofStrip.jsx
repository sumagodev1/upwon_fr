import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

/*
  Figures carried over from the bakery and sweets proof strips so the site
  states one consistent scale — the food-processing entry in industries.js
  holds only qualitative metrics.
*/
const STATS = [
  { value: '650+', label: 'Manufacturing units running on UpWon' },
  { value: '2.5 Cr+', label: 'Products tracked every day' },
  { value: '45+', label: 'Cities across India' },
];

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
    <div className="flex h-[44px] w-[110px] shrink-0 items-center justify-center">
      <img
        src={client.src}
        alt={client.name}
        loading="lazy"
        decoding="async"
        className="max-h-[36px] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default function FoodProcessingProofStrip() {
  const reduceMotion = useReducedMotion();

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

  const statVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto grid max-w-6xl overflow-hidden rounded-[22px] bg-white shadow-[0_16px_45px_rgba(25,35,55,0.08)] lg:grid-cols-[0.95fr_1.05fr]"
        >
          {/* ================= LEFT IMAGE ================= */}
          <motion.div
            variants={fadeIn}
            className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[440px]"
          >
            <img
              src="/images/food_process_proof_strip.webp"
              alt="Food processing line running under UpWon"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-left"
            />
          </motion.div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="min-w-0 p-6 sm:p-8 lg:p-10">
         

            <motion.div variants={fadeIn} className="mt-4">
              <Eyebrow>TRUSTED BY FOOD PROCESSING BUSINESSES ACROSS INDIA</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[24px] leading-[1.15] tracking-tight text-navy-950 sm:text-[28px] lg:text-[32px]"
            >
              Better Control Across{' '}
              <span className="gradient-text-orange">
                Every Stage of Food Production.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              From incoming raw materials and production workflows to quality,
              inventory, warehousing, and distribution—keep every critical
              movement connected through one operational platform.
            </motion.p>

            {/* ================= NUMBERS ================= */}
            <motion.div
              variants={group}
              className="mt-7 grid grid-cols-1 gap-5 sm:mt-9 sm:grid-cols-3"
            >
              {STATS.map(({ value, label }) => (
                <motion.div key={label} variants={statVariants} className="min-w-0">
                  <p className="h-display text-[30px] font-bold leading-none tracking-tight text-navy-950 sm:text-[34px]">
                    {value}
                  </p>

                  <p className="mt-2 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* ================= CLIENT MARQUEE ================= */}
            {/* Two identical copies with animate-ticker shifting the track
                -50%, so the loop is seamless. The second copy is decorative. */}
            <motion.div
              variants={fadeIn}
              className="mt-7 border-t border-navy-950/10 pt-6 sm:mt-9"
            >
              <div className="mask-fade-lr relative overflow-hidden">
                <div
                  className={`flex w-max items-center gap-8 md:gap-10 ${
                    reduceMotion
                      ? ''
                      : 'animate-ticker [animation-duration:32s] hover:[animation-play-state:paused]'
                  }`}
                >
                  {CLIENTS.map((client) => (
                    <ClientLogo key={client.name} client={client} />
                  ))}

                  <div
                    className="flex items-center gap-8 md:gap-10"
                    aria-hidden="true"
                  >
                    {CLIENTS.map((client) => (
                      <ClientLogo key={`dup-${client.name}`} client={client} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
