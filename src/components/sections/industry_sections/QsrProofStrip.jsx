import { m as motion, useReducedMotion } from 'framer-motion';
import { UtensilsCrossed, Warehouse, Store } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

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
  industry proof strips, so nothing new is claimed here — and they sit on
  their own tiles rather than beside a client mark, which would read as that
  brand's result.
*/
const STATS = [
  {
    value: '2.5 Cr+',
    label: 'Products managed',
    description:
      'Recipes, ingredients, and menu items held in one connected catalogue.',
    Icon: UtensilsCrossed,
  },
  {
    value: '18,000+',
    label: 'Inventory points tracked',
    description:
      'Central kitchen and outlet stock followed across every location.',
    Icon: Warehouse,
  },
  {
    value: '25,000+',
    label: 'Sales channels connected',
    description:
      'Outlet, franchise, and delivery orders moving through one system.',
    Icon: Store,
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
        className="max-h-[46px] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default function QsrProofStrip() {
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

  const tilesGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.12 },
    },
  };

  const tileVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  const statTile = ({ value, label, description, Icon }, position) => (
    <motion.div
      key={value}
      variants={tileVariants}
      className={`flex min-h-[190px] min-w-0 flex-col rounded-[14px] border border-navy-950/[0.07] bg-white p-6 shadow-[0_10px_28px_rgba(25,35,55,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_38px_rgba(25,35,55,0.1)] lg:min-h-0 ${position}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="h-display text-[34px] font-extrabold leading-none tracking-tight text-navy-950 sm:text-[38px]">
          {value}
        </p>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff2e9]">
          <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
        </span>
      </div>

      <p className="mt-3 h-display text-[14.5px] font-semibold leading-snug text-navy-950">
        {label}
      </p>

      <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-600">
        {description}
      </p>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
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
            <Eyebrow>PROOF STRIP</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[26px] leading-[1.14] tracking-tight text-navy-950 sm:text-[30px] lg:text-[34px]"
          >
            Built to Keep Central Kitchens, Outlets, Franchise Networks,
            {/* Held to two lines rather than one long run at desktop widths */}
            <br className="hidden xl:block" />{' '}
            <span className="gradient-text-orange">
              and Every F&amp;B Operation Connected.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From procurement and central production to outlet inventory, sales,
            people, and franchise operations—UpWon keeps every location working
            from the same information.
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

        {/* ================= MOSAIC ================= */}
        <motion.div
          variants={tilesGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-4 grid gap-4 lg:grid-cols-3 lg:grid-rows-[210px_210px]"
        >
          {statTile(STATS[0], 'lg:col-start-1 lg:row-start-1')}
          {statTile(STATS[1], 'lg:col-start-2 lg:row-start-1')}

          {/* Kitchen floor */}
          <motion.div
            variants={tileVariants}
            className="relative min-h-[210px] min-w-0 overflow-hidden rounded-[14px] bg-navy-950 lg:col-start-1 lg:row-start-2 lg:min-h-0"
          >
            <img
              src="/images/qsr_proof_strip1.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>

          {statTile(STATS[2], 'lg:col-start-2 lg:row-start-2')}

          {/* Tall panel */}
          <motion.div
            variants={tileVariants}
            className="relative min-h-[300px] min-w-0 overflow-hidden rounded-[14px] bg-navy-950 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:min-h-0"
          >
            <img
              src="/images/qsr_proof_strip2.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
