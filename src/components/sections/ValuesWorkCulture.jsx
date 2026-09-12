import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  "Values & Work Culture" — a centred heading over a plain three-up card grid,
  each card a photo with its value and one-line subtext.

  PLACEHOLDER: the photos below are stand-ins (existing product imagery). Swap
  in real team / office photos before launch.
*/

const EASE = [0.16, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const VALUES = [
  {
    title: 'Genuine Advice',
    sub: 'UPWON values honest and transparent communication to provide practical, well-researched solutions tailored to your needs. Honesty is the basis of our advice.',
    photo: '/images/fms_hero1.webp',
  },
  {
    title: 'Proactive Approach',
    sub: 'We anticipate challenges and proactively address potential issues before they arise, ensuring smooth and efficient project execution.',
    photo: '/images/fms_hero2.webp',
  },
  {
    title: 'Result Oriented, Time-Bound Working',
    sub: 'We focus on delivering measurable results within agreed timelines and maintaining efficiency while ensuring quality outcomes.',
    photo: '/images/fms_hero3.webp',
  },
  {
    title: 'Comprehensive Product Range',
    sub: 'UPWON offers a wide range of software solutions to meet the diverse needs of the FMCG sector, giving clients integrated tools that cover every operational aspect.',
    photo: '/images/discovery1.webp',
  },
  {
    title: 'Dedicated Support',
    sub: 'We offer continuous and reliable support to our customers, ensuring the system is always optimized and functioning, with a team ready to help.',
    photo: '/images/onboarding1.webp',
  },
  {
    title: 'Personalized Assistance',
    sub: "We offer customized solutions and services. Every customer's requirements are different, so we provide a single point of contact after implementation and individual training.",
    photo: '/images/distrubutor_rollout1.webp',
  },
];

export default function ValuesWorkCulture() {
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
    hidden: { opacity: 0, y: d(22) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative bg-white py-16 md:py-24">
      <Container>
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">
              Our Customers Appreciate Us
            </Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            Values &amp; <span className="gradient-text-orange">Work Culture</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            These core values guide how we work, grow, and lead.
          </motion.p>
        </motion.div>

        {/* ================= VALUES ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VALUES.map(({ title, sub, photo }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover="hover"
              className="flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-cream-300 bg-white shadow-[0_10px_30px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_20px_46px_rgba(25,35,55,0.13)]"
            >
              <img
                src={photo}
                alt={title}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="flex flex-1 flex-col p-6">
                {/* Two lines' worth of height either way, so every subtext
                    starts on the same line */}
                <h3 className="h-display min-h-[52px] text-[19px] font-bold leading-snug tracking-tight text-navy-950">
                  {title}
                </h3>

                <p className="mt-2.5 text-[14px] leading-relaxed text-navy-600">
                  {sub}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
