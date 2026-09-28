import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/**
 * CMS-only: the copy and the capability cards come from the CMS via the page. With nothing published - or
 * the API unreachable - the section renders nothing rather than falling back
 * to built-in content.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function NonFoodFmcgCoreCapabilities({ section = null }) {
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
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(22), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  if (!section) return null;

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] pb-12 sm:pb-16 lg:pb-20">
      {/* ================= HEADING BAND ================= */}
      {/* The photo sits on the right of the artwork, so the wash holds solid
          behind the copy and clears toward it. */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/non_fmcg_head_back.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover object-right"
          />

          <div className="absolute inset-0 bg-[#f7f8fa]/80 lg:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#f7f8fa] from-30% via-[#f7f8fa]/70 via-52% to-transparent lg:block" />
        </div>

        <Container className="relative z-10 py-12 sm:py-14 lg:py-16">
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="max-w-2xl"
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
                className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
              >
                {section.subtext}
              </motion.p>
            )}
          </motion.div>
        </Container>
      </div>

      {/* ================= CAPABILITY CARDS ================= */}
      {/* calc widths give four on the first row and three centred below */}
      <Container className="relative z-10">
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 flex flex-wrap justify-center gap-5 sm:mt-10"
        >
          {section.cards.map(({ title, description, art }, index) => (
            <motion.article
              key={`${title}-${index}`}
              variants={cardVariants}
              whileHover="hover"
              className="flex min-w-0 flex-col rounded-[18px] bg-white px-5 py-6 text-center shadow-[0_12px_35px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(25,35,55,0.12)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
            >
              <div className="flex h-[112px] items-center justify-center">
                <img
                  src={art}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="max-h-[112px] w-auto max-w-full object-contain"
                />
              </div>

              <h3 className="mt-4 h-display min-h-[44px] text-[15px] font-semibold leading-snug text-navy-950 sm:min-h-[48px] sm:text-base">
                {title}
              </h3>

              <span className="mx-auto mt-3 block h-[2px] w-8 rounded-full bg-orange-500" />

              <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
