import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { dairyIcon } from '../../../../lib/dairyIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/** Cards are numbered by position: "01", "02"... */
const numberOf = (index) => String(index + 1).padStart(2, '0');

/**
 * CMS-only: the copy, the collage and the capability cards - each an icon
 * name, a title and a description - come from the CMS via the page. With
 * nothing published, or the API unreachable, the section renders nothing
 * rather than falling back to built-in content. The collage is optional.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function DairyIceCreamCoreCapabilities({ section = null }) {
  const reduceMotion = useReducedMotion();

  if (!section) return null;

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

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
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

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.28fr] lg:gap-12 xl:gap-16">
          {/* ================= LEFT — COPY + COLLAGE ================= */}
          <div className="min-w-0">
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={fadeIn}>
                {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
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

            {section.panel && (
              <motion.div
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="mt-8 min-w-0"
              >
                <img
                  src={section.panel.image}
                  alt={section.panel.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </motion.div>
            )}
          </div>

          {/* ================= RIGHT — CAPABILITY CARDS ================= */}
          <motion.div
            variants={cardsGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5"
          >
            {section.cards.map(({ icon, title, description }, index) => {
              const Icon = dairyIcon(icon);
              const number = numberOf(index);
              return (
              <motion.article
                key={`${number}-${title}`}
                variants={cardVariants}
                whileHover="hover"
                className="flex min-w-0 items-center gap-4 rounded-[18px] border border-navy-950/[0.06] bg-white p-5 shadow-[0_10px_30px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,35,55,0.11)] sm:gap-5"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff2e9] sm:h-16 sm:w-16">
                  <Icon
                    className="h-7 w-7 text-orange-500 sm:h-8 sm:w-8"
                    strokeWidth={1.6}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="h-display text-[18px] font-bold leading-none text-orange-500">
                    {number}
                  </p>

                  <h3 className="mt-2 h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                    {title}
                  </h3>

                  <p className="mt-2 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                    {description}
                  </p>
                </div>
              </motion.article>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
