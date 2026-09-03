import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

/*
  Values are the scale figures the site already states on the bakery and sweets
  proof strips, so nothing new is claimed here. Business Insights has no
  natural figure, so it carries a qualitative value — the same approach
  industries.js takes for food processing ("Tracked", "Unified", "Compliant").
*/
const PROOF_POINTS = [
  {
    value: '2.5 Cr+',
    title: 'Products',
    description:
      'Keep product information and movement connected across your operations.',
  },
  {
    value: '18,000+',
    title: 'Inventory',
    description:
      'Maintain clearer visibility of stock across warehouses and locations.',
  },
  {
    value: '25,000+',
    title: 'Sales Channels',
    description:
      'Connect orders, distributors, retailers, and sales activity in one flow.',
  },
  {
    value: '45+',
    title: 'Distribution',
    description:
      'Coordinate product movement from warehouses to every sales channel.',
  },
  {
    value: '3 Lakh+',
    title: 'Field Teams',
    description:
      'Bring sales activity and market execution closer to your core operations.',
  },
  {
    value: 'Real-time',
    title: 'Business Insights',
    description:
      'Access connected visibility across sales, inventory, distribution, and performance.',
  },
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

export default function NonFoodFmcgProofStrip() {
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

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(20), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-3xl"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>TRUSTED BY NON-FOOD FMCG BRANDS</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Better Visibility Across{' '}
            <span className="gradient-text-orange">
              Products, Channels, and Operations.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From what you make to where it sells, every part of the operation
            works from the same connected information.
          </motion.p>
        </motion.div>

        {/* ================= PROOF POINTS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-9 grid gap-4 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {PROOF_POINTS.map(({ value, title, description }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover="hover"
              className="flex min-w-0 flex-col rounded-[16px] border border-navy-950/[0.06] bg-white px-5 py-6 shadow-[0_10px_30px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(25,35,55,0.11)]"
            >
              <p className="h-display text-[26px] font-bold leading-none tracking-tight text-navy-950 sm:text-[30px]">
                {value}
              </p>

              <h3 className="mt-3 h-display text-[14px] font-semibold text-navy-950 sm:text-[15px]">
                {title}
              </h3>

              <p className="mt-2 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* ================= CLIENT MARQUEE ================= */}
        {/* Two identical copies with animate-ticker shifting the track -50%,
            so the loop runs continuously. The second copy is decorative. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mask-fade-lr relative mt-10 overflow-hidden sm:mt-12"
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
    </section>
  );
}
