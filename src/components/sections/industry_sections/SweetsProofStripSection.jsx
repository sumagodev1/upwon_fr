import { m as motion, useReducedMotion } from 'framer-motion';
import { Store, ShoppingCart, Candy, Building2, Truck, Users } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

const CLIENTS = [
  { name: 'Kaka Halwai', src: '/images/testimonial/kaka%20halwai.webp' },
  { name: 'Gokul', src: '/images/testimonial/gokul.webp' },
  { name: 'Winni', src: '/images/testimonial/winni.webp' },
  { name: 'Monginis', src: '/images/testimonial/mongignis.webp' },
  { name: 'U2 Cake', src: '/images/testimonial/u2cake.webp' },
  { name: 'OFC', src: '/images/testimonial/ofc.webp' },
];

const STATS = [
  { value: '25,000+', label: 'Sweet & Namkeen Businesses', Icon: Store },
  { value: '18,000+', label: 'Outlets Managed', Icon: ShoppingCart },
  { value: '2.5 Cr+', label: 'Products Tracked Every Day', Icon: Candy },
  { value: '650+', label: 'Manufacturing Units', Icon: Building2 },
  { value: '45+', label: 'Cities Across India', Icon: Truck },
  { value: '3 Lakh+', label: 'Users Trust UpWon', Icon: Users },
];

function ClientLogo({ client }) {
  return (
    <div className="flex h-[58px] w-[140px] shrink-0 items-center justify-center sm:w-[165px]">
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

export default function SweetsProofStripSection() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const headingGroup = {
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

  const statsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.1 },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fdf4ea] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      {/* The artwork is a decorative border of sweets and namkeen bowls, so it
          is anchored to fill the frame with the copy sitting over its centre. */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/sweet_proof_strip_back.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#fdf4ea]/45" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={headingGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">
              TRUSTED BY SWEET &amp; NAMKEEN BUSINESSES ACROSS INDIA
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-4 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Powering Growth for{' '}
            <span className="gradient-text-orange">
              Sweet &amp; Namkeen Businesses
            </span>
          </motion.h2>


          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From traditional sweet shops to leading snack brands and multi-outlet
            chains, UpWon helps you run every operation, every day.
          </motion.p>
        </motion.div>

        {/* ================= CLIENT MARQUEE ================= */}
        {/* Two identical copies with animate-ticker shifting the track -50%,
            so the loop is seamless. The second copy is decorative. */}
        <motion.div
          initial={{ opacity: 0, y: d(18) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-9 max-w-6xl overflow-hidden rounded-[22px] border border-[#f0dfcc] bg-white/80 py-5 shadow-[0_12px_35px_rgba(120,70,35,0.07)] backdrop-blur-sm sm:mt-11"
        >
          <div className="mask-fade-lr relative overflow-hidden">
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
          </div>
        </motion.div>

        {/* ================= STATS ================= */}
        <motion.div
          variants={statsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mt-5 grid max-w-6xl grid-cols-2 overflow-hidden rounded-[22px] border border-[#f0dfcc] bg-white/80 shadow-[0_14px_40px_rgba(120,70,35,0.08)] backdrop-blur-sm sm:mt-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {STATS.map(({ value, label, Icon }, index) => (
            <motion.div
              key={label}
              variants={statVariants}
              className={`flex flex-col items-center px-3 py-7 text-center sm:px-4 ${
                index !== STATS.length - 1
                  ? 'border-b border-[#f2e5d6] sm:border-b-0 lg:border-r'
                  : ''
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fbe3ce]">
                <Icon className="h-7 w-7 text-[#8a4a12]" strokeWidth={1.7} />
              </span>

              <p className="mt-4 h-display text-[24px] font-bold leading-none text-navy-950 sm:text-[27px]">
                {value}
              </p>

              <p className="mt-2 max-w-[150px] text-xs leading-relaxed text-navy-600">
                {label}
              </p>

            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
