import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

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

/**
 * CMS-only: the copy, the figures and the logo marquee come from the CMS via the page. With nothing published - or
 * the API unreachable - the section renders nothing rather than falling back
 * to built-in content.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function NonFoodFmcgProofStrip({ section = null }) {
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

  if (!section) return null;

  const clients = section.logos;
  // The API calls a figure's title its `label`.
  const proofPoints = section.stats.map((stat) => ({
    value: stat.value,
    title: stat.label,
    description: stat.description,
  }));

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
          {section.eyebrow && (
            <motion.div variants={fadeIn}>
              <Eyebrow>{section.eyebrow}</Eyebrow>
            </motion.div>
          )}

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            <HeadingLines lines={section.headingLines} />
          </motion.h2>

          {section.subtext && (
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              {section.subtext}
            </motion.p>
          )}
        </motion.div>

        {/* ================= PROOF POINTS ================= */}
        {proofPoints.length > 0 && (
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-9 grid gap-4 sm:mt-11 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {proofPoints.map(({ value, title, description }, index) => (
            <motion.article
              key={`${title}-${index}`}
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
        )}

        {/* ================= CLIENT MARQUEE ================= */}
        {/* Two identical copies with animate-ticker shifting the track -50%,
            so the loop runs continuously. The second copy is decorative. */}
        {clients.length > 0 && (
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
            {clients.map((client, index) => (
              <ClientLogo key={`${client.name}-${index}`} client={client} />
            ))}

            <div className="flex items-center gap-10 md:gap-16" aria-hidden="true">
              {clients.map((client, index) => (
                <ClientLogo key={`dup-${client.name}-${index}`} client={client} />
              ))}
            </div>
          </div>
        </motion.div>
        )}
      </Container>
    </section>
  );
}
