import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

/**
 * CMS-only: the copy and the one live diagram come from the CMS via the page.
 * With no live diagram, or the API unreachable, the section renders nothing
 * rather than falling back to built-in content.
 *
 * @param {{ section?: object | null }} props - the published copy and diagram.
 */
export default function BakeryHowUpwonHelps({ section = null }) {
  if (!section) return null;

  const { image, alt } = section;

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-14 md:py-16 lg:py-20">
      <Container className="relative">
        {/* ================= SECTION HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          {section.eyebrow && (
            <Eyebrow className="justify-center">{section.eyebrow}</Eyebrow>
          )}

          <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[25px] md:text-[31px] lg:text-[36.8px]">
            <HeadingLines lines={section.headingLines} />
          </h2>

          {section.subtext && (
            <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base md:text-[17px]">
              {section.subtext}
            </p>
          )}
        </motion.div>

        {/* ================= FULL CONNECTED PLATFORM IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.7,
            ease: EASE,
            delay: 0.1,
          }}
          className="mx-auto mt-8 w-full sm:mt-10 md:mt-12"
        >
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </motion.div>
      </Container>
    </section>
  );
}