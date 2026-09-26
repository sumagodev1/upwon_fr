import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { nonFoodFmcgIcon } from '../../../../lib/nonFoodFmcgIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/**
 * CMS-only: the copy, the dashboard image and the categories come from the CMS via the page. With nothing published - or
 * the API unreachable - the section renders nothing rather than falling back
 * to built-in content. The dashboard is optional; without it the
 * categories follow the copy directly.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function NonFoodFmcgIndustryCoverage({ section = null }) {
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
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    hover: { y: d(-5), transition: { duration: 0.28, ease: EASE } },
  };

  if (!section) return null;

  const { panel } = section;

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          {section.eyebrow && (
            <motion.div variants={fadeIn}>
              <Eyebrow className="justify-center">{section.eyebrow}</Eyebrow>
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
              className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              {section.subtext}
            </motion.p>
          )}
        </motion.div>

        {/* ================= DASHBOARD ================= */}
        {panel && (
        <motion.div
          initial={{ opacity: 0, y: d(26), scale: reduceMotion ? 1 : 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-9 max-w-5xl sm:mt-11"
        >
          <img
            src={panel.image}
            alt={panel.alt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </motion.div>
        )}

        {/* ================= CATEGORIES ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4"
        >
          {section.items.map(({ label, icon }, index) => {
            const Icon = nonFoodFmcgIcon(icon);
            return (
            <motion.div
              key={`${label}-${index}`}
              variants={cardVariants}
              whileHover="hover"
              className="flex min-w-0 items-center gap-3.5 rounded-[14px] border border-navy-950/[0.07] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(25,35,55,0.05)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(25,35,55,0.1)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff1e8]">
                <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
              </span>

              <span className="h-display min-w-0 text-[13.5px] font-semibold leading-snug text-navy-950 sm:text-[14px]">
                {label}
              </span>
            </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
