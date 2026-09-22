import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

export default function BakeryHowUpwonHelps() {
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
          <Eyebrow className="justify-center">
            HOW UPWON HELPS
          </Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[25px] md:text-[31px] lg:text-[36.8px]">
            One Connected{' '}
            <span className="gradient-text-orange">
              Platform
            </span>{' '}
            for Your Bakery Operations
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base md:text-[17px]">
            UpWon connects the key workflows behind your bakery and confectionery
            business—so teams can move from reactive operations to better planned,
            data-driven decisions.
          </p>
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
            src="/images/how_UpWon_helps.webp"
            alt="UpWon connected platform for bakery operations"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </motion.div>
      </Container>
    </section>
  );
}