import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { dairyIcon } from '../../../../lib/dairyIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/** Benefits are numbered by position: "01", "02"... */
const numberOf = (index) => String(index + 1).padStart(2, '0');

/**
 * CMS-only: the copy, the image and the benefits - each an icon name, a title
 * and a description - come from the CMS via the page. With nothing published,
 * or the API unreachable, the section renders nothing rather than falling back
 * to built-in content. The image is optional.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function DairyIceCreamBenefitsSection({ section = null }) {
  const reduceMotion = useReducedMotion();

  if (!section) return null;

  const { items } = section;

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
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const listGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9fd] via-white to-[#fdf6f0] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-12 xl:gap-16">
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
                  className="block h-auto w-full rounded-[16px]"
                />
              </motion.div>
            )}
          </div>

          {/* ================= RIGHT — BENEFIT LIST ================= */}
          {/* Two columns of five, each row separated by a hairline as in the
              layout — the trailing row of each column carries no rule. */}
          <motion.div
            variants={listGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid min-w-0 gap-x-10 sm:grid-cols-2 xl:gap-x-12"
          >
            {items.map(({ icon, title, description }, index) => {
              const Icon = dairyIcon(icon);
              const number = numberOf(index);
              return (
              <motion.div
                key={`${number}-${title}`}
                variants={itemVariants}
                className={`flex min-w-0 items-start gap-4 border-navy-950/[0.07] py-5 ${
                  index < items.length - 1 ? 'border-b' : ''
                } ${
                  index >= items.length - 2 ? 'sm:border-b-0' : 'sm:border-b'
                }`}
              >
                <span className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_22px_rgba(25,35,55,0.08)]">
                  <Icon
                    className="h-7 w-7 text-navy-800"
                    strokeWidth={1.5}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="h-display text-[14.5px] font-semibold leading-snug text-navy-900 sm:text-[15px]">
                    <span className="font-bold">{number}.</span> {title}
                  </h3>

                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                    {description}
                  </p>
                </div>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
