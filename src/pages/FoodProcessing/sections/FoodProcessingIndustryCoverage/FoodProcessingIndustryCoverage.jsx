import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/**
 * CMS-only: the copy and the categories come from the CMS via the page. With nothing published - or
 * the API unreachable - the section renders nothing rather than falling back
 * to built-in content.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function FoodProcessingIndustryCoverage({ section = null }) {
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

  const itemsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: d(18), scale: reduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  if (!section) return null;

  return (
    <section
      data-no-fade
      className="relative overflow-hidden bg-[#fdfbf6] py-12 sm:py-16 lg:min-h-screen lg:py-32"
    >
      {/* ================= BACKGROUND ================= */}
      {/* `bg-fixed` on desktop pins the sketch to the viewport, so it stays
          still while the copy and categories scroll over it — the same
          treatment WhoWeAreSection uses on the homepage. Mobile keeps a normal
          scrolling background: iOS Safari does not honour bg-fixed and it
          causes repaint jank on phones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
        style={{ backgroundImage: "url('/images/industry_cov_back.webp')" }}
      />

      {/* Scrim — the sketch's detail sits on the right, so this lifts the whole
          frame just enough for the copy and product shots to read. */}
      <div className="pointer-events-none absolute inset-0 bg-[#fdfbf6]/55" />

      <Container className="relative z-10 lg:flex lg:min-h-[calc(100vh-16rem)] lg:flex-col lg:justify-center">
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

        {/* ================= CATEGORIES ================= */}
        <motion.div
          variants={itemsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-x-4 gap-y-8 sm:mt-12"
        >
          {section.items.map(({ label, art }, index) => (
            <motion.div
              key={`${label}-${index}`}
              variants={itemVariants}
              whileHover="hover"
              className="flex min-w-0 flex-col items-center text-center w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(16.666%-0.834rem)]"
            >
              <div className="flex h-[86px] items-end justify-center sm:h-[96px]">
                <img
                  src={art}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="max-h-[86px] w-auto max-w-full object-contain sm:max-h-[96px]"
                />
              </div>

              <p className="mt-3 h-display text-[13px] font-semibold leading-snug text-navy-950 sm:text-sm">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
