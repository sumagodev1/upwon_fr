import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

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
 * CMS-only: the copy, the logo marquee and the figures come from the CMS via
 * the page. With nothing published - or the API unreachable - the section
 * renders nothing rather than falling back to built-in content.
 *
 * @param {{ section?: object | null }} props - the published trust section.
 */
export default function FmcgProofStripSection({ section = null }) {
  const reduceMotion = useReducedMotion();

  if (!section) return null;

  const clients = section.logos;
  const stats = section.stats;

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
      {/* ================= HEADING ================= */}
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
            },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {section.eyebrow && (
            <motion.div variants={fadeIn}>
              <Eyebrow className="justify-center">{section.eyebrow}</Eyebrow>
            </motion.div>
          )}

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            <HeadingLines lines={section.headingLines} />
          </motion.h2>

          {section.subtext && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-base"
            >
              {section.subtext}
            </motion.p>
          )}
        </motion.div>
      </Container>

      {/* ================= CLIENT MARQUEE ================= */}
      {/* The track holds two identical copies and animate-ticker shifts it
          -50%, so the loop is seamless. The second copy is decorative. */}
      {clients.length > 0 && (
      <Container className="relative mt-8 sm:mt-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mask-fade-lr relative mx-auto max-w-6xl overflow-hidden"
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
      </Container>
      )}

      {/* ================= PROOF NUMBERS ================= */}
      {stats.length > 0 && (
      <Container className="relative mt-10 sm:mt-14 lg:mt-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
            },
          }}
          className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-14"
        >
          {stats.map(({ value, label, description }, index) => (
            <motion.div
              key={`${label}-${index}`}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: EASE },
                },
              }}
              className="min-w-0"
            >
              <p className="h-display text-[38px] font-semibold leading-none tracking-tight gradient-text-orange sm:text-[44px]">
                {value}
              </p>

              <p className="mt-3 h-display text-[14px] font-semibold text-navy-950 sm:text-[15px]">
                {label}
              </p>

              <p className="mt-2 max-w-[320px] text-[13px] leading-relaxed text-navy-600 sm:text-[13.5px]">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
      )}
    </section>
  );
}
