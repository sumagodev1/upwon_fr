import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';

const EASE = [0.22, 1, 0.3, 1];

const BG_DESKTOP = '/images/about_cta_desktop.webp';
const BG_MOBILE = '/images/about_us_cta_mobile.webp';

/* Echoes the line printed on the office wall in the artwork itself. */
const HEADING = (
  <>
    Smarter Businesses. Stronger Industries.{' '}
    <span className="gradient-text-orange">Brighter Futures.</span>
  </>
);

const SUBTEXT =
  'Nine years inside India’s food belt, seven integrated platforms and 50+ live deployments. See what that adds up to for your own operations.';

/*
  Both crops are bright, so the copy runs navy here rather than reversing
  out to white the way the dark CTA artwork elsewhere on the site does.
*/
function CtaButtons({ compact = false }) {
  const height = compact ? 'min-h-[48px]' : 'min-h-[52px]';
  const width = compact ? 'w-full' : 'w-full sm:w-auto';

  return (
    <>
      <Link
        to="/demo"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] bg-orange-500 px-6 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(232,90,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 active:scale-[0.99]`}
      >
        Book a Free Demo
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <Link
        to="/contact"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] border border-navy-950/20 bg-white/70 px-6 text-[14px] font-semibold text-navy-950 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-950/35 hover:bg-white/90 active:scale-[0.99]`}
      >
        Talk to Our Team
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </>
  );
}

export default function AboutCtaSection() {
  return (
    <section className="relative w-full bg-white py-10 sm:py-12 lg:py-14">
      {/* Rounded card on the page's standard Container width, so its edges
          line up with every section above it rather than running wider.
          `overflow-hidden` is what clips the photograph to the radius. */}
      <Container>
        <div className="relative overflow-hidden rounded-[20px] shadow-[0_18px_50px_rgba(25,35,55,0.08)] ring-1 ring-navy-950/[0.06] sm:rounded-[24px]">
          {/* =========================================================
              DESKTOP — the artwork renders at its natural 2048x768 ratio.
              The laptop and the wall copy occupy the left third, so the
              page's own copy sits on the right, over the sky.
          ========================================================= */}
          <div className="relative hidden w-full lg:block">
            <img
              src={BG_DESKTOP}
              alt=""
              aria-hidden="true"
              width={2048}
              height={768}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />

            {/* Scrim — kept deliberately light so the photograph reads at
                full strength. It only firms up the far right, where the copy
                sits, and clears entirely by the middle of the frame so the
                sunset, skyline and laptop keep their colour. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/55 via-white/15 to-transparent"
            />

            {/* The copy occupies the right half of the frame and is centred
                within it, so the gutters either side of it stay even instead
                of the block drifting toward one edge. */}
            <div className="absolute inset-0 flex items-center">
              <div className="ml-auto flex w-1/2 justify-center px-6 sm:px-8 lg:px-10">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="flex w-full max-w-[420px] flex-col items-start text-left xl:max-w-[500px]"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
                    className="h-display text-[26px] leading-[1.1] tracking-tight text-navy-950 xl:text-[31px] 2xl:text-[36.8px]"
                  >
                    {HEADING}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                    className="mt-4 text-[13.5px] leading-relaxed text-navy-700 lg:max-w-[92%] xl:text-[15px]"
                  >
                    {SUBTEXT}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
                    className="mt-7 flex w-full flex-col items-stretch gap-3 xl:w-auto xl:flex-row xl:items-start"
                  >
                    <CtaButtons />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* =========================================================
              MOBILE / TABLET — its own portrait artwork, with the copy
              sitting in the clear space it leaves beneath the desk.
          ========================================================= */}
          <div className="relative block w-full overflow-hidden lg:hidden">
            {/* Cropped from the top rather than shown whole: the file carries
                a long run of empty desk below the laptop that would otherwise
                open a gap between the scene and the copy. */}
            <img
              src={BG_MOBILE}
              alt=""
              aria-hidden="true"
              width={849}
              height={1852}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />

            {/* The padding-top is a share of the block's own width, so the
                copy always starts just under the desk however wide the
                screen is. */}
            <div className="relative px-6 pb-10 pt-[95%] text-left sm:px-8 sm:pb-12">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="h-display w-full text-[27px] leading-[1.1] tracking-tight text-navy-950"
              >
                {HEADING}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                className="mt-3 w-full text-[14.5px] leading-relaxed text-navy-700"
              >
                {SUBTEXT}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
                className="mt-6 flex w-full flex-col gap-2.5"
              >
                <CtaButtons compact />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
