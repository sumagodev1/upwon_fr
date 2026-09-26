import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

function ClientLogo({ client }) {
  return (
    <div className="flex h-[44px] w-[110px] shrink-0 items-center justify-center">
      <img
        src={client.src}
        alt={client.name}
        loading="lazy"
        decoding="async"
        className="max-h-[36px] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

/**
 * CMS-only: the photograph, copy, figures and logo marquee come from the CMS via the page. With nothing published - or
 * the API unreachable - the section renders nothing rather than falling back
 * to built-in content. The photograph is optional; without it the
 * copy takes the full width of the card.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function FoodProcessingProofStrip({ section = null }) {
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

  const statVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  if (!section) return null;

  const { panel, stats } = section;
  const clients = section.logos;

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className={`mx-auto grid max-w-6xl overflow-hidden rounded-[22px] bg-white shadow-[0_16px_45px_rgba(25,35,55,0.08)] ${
            panel ? 'lg:grid-cols-[0.95fr_1.05fr]' : ''
          }`}
        >
          {/* ================= LEFT IMAGE ================= */}
          {panel && (
            <motion.div
              variants={fadeIn}
              className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[440px]"
            >
              <img
                src={panel.image}
                alt={panel.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-left"
              />
            </motion.div>
          )}

          {/* ================= RIGHT CONTENT ================= */}
          <div className="min-w-0 p-6 sm:p-8 lg:p-10">
         

            {section.eyebrow && (
              <motion.div variants={fadeIn} className="mt-4">
                <Eyebrow>{section.eyebrow}</Eyebrow>
              </motion.div>
            )}

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[24px] leading-[1.15] tracking-tight text-navy-950 sm:text-[28px] lg:text-[32px]"
            >
              <HeadingLines lines={section.headingLines} />
            </motion.h2>

            {section.subtext && (
              <motion.p
                variants={fadeUp}
                className="mt-4 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
              >
                {section.subtext}
              </motion.p>
            )}

            {/* ================= NUMBERS ================= */}
            {stats.length > 0 && (
            <motion.div
              variants={group}
              className="mt-7 grid grid-cols-1 gap-5 sm:mt-9 sm:grid-cols-3"
            >
              {stats.map(({ value, label }, index) => (
                <motion.div key={`${label}-${index}`} variants={statVariants} className="min-w-0">
                  <p className="h-display text-[30px] font-bold leading-none tracking-tight text-navy-950 sm:text-[34px]">
                    {value}
                  </p>

                  <p className="mt-2 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            )}

            {/* ================= CLIENT MARQUEE ================= */}
            {/* Two identical copies with animate-ticker shifting the track
                -50%, so the loop is seamless. The second copy is decorative. */}
            {clients.length > 0 && (
            <motion.div
              variants={fadeIn}
              className="mt-7 border-t border-navy-950/10 pt-6 sm:mt-9"
            >
              <div className="mask-fade-lr relative overflow-hidden">
                <div
                  className={`flex w-max items-center gap-8 md:gap-10 ${
                    reduceMotion
                      ? ''
                      : 'animate-ticker [animation-duration:32s] hover:[animation-play-state:paused]'
                  }`}
                >
                  {clients.map((client, index) => (
                    <ClientLogo key={`${client.name}-${index}`} client={client} />
                  ))}

                  <div
                    className="flex items-center gap-8 md:gap-10"
                    aria-hidden="true"
                  >
                    {clients.map((client, index) => (
                      <ClientLogo key={`dup-${client.name}-${index}`} client={client} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
