import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.3, 1];

const BG_DESKTOP = '/images/food_process_cta.webp';
const BG_MOBILE = '/images/food_process_cta_mb.webp';

const HEADING = (
  <>
    Ready to Bring Your{' '}
    <span className="gradient-text-orange">
      Food Processing Operations Together?
    </span>
  </>
);

const SUBTEXT =
  'Connect raw materials, recipes, production, quality, inventory, warehouses, sales, distribution, and business operations through one platform designed to support the complexity of growing food processing businesses.';

function CtaButtons({ compact = false }) {
  const height = compact ? 'min-h-[48px]' : 'min-h-[52px]';
  const width = compact ? 'w-full' : 'w-full sm:w-auto';

  return (
    <>
      <Link
        to="/demo"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] bg-orange-500 px-6 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(232,90,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 active:scale-[0.99]`}
      >
        Request a Demo
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <Link
        to="/what-is-upwon"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] border border-navy-950/20 bg-white/70 px-6 text-[14px] font-semibold text-navy-950 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-950/35 hover:bg-white/90 active:scale-[0.99]`}
      >
        Explore UpWon Solutions
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </>
  );
}

export default function FoodProcessingCtaSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* =========================================================
          DESKTOP CTA — the artwork renders at its natural 1600x567
          ratio and the copy is laid over its empty left panel. The
          column is capped as a share of the card so it never runs
          onto the photography.
      ========================================================= */}
      <div className="relative hidden w-full lg:block">
        <img
          src={BG_DESKTOP}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />

        <div className="absolute inset-0">
          <div className="flex h-full w-full items-center px-6 sm:px-8 md:px-10 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex w-full flex-col items-start text-left lg:ml-[4vw] lg:max-w-[38%] xl:ml-[6vw] xl:max-w-[40%]"
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
                className="mt-4 text-[13.5px] leading-relaxed text-navy-600 xl:text-[15px] 2xl:text-base"
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
          MOBILE / TABLET CTA — its own portrait artwork, cropped to
          a banner with the copy underneath.
      ========================================================= */}
      <div className="block w-full lg:hidden">
        <div className="relative h-[260px] w-full overflow-hidden">
          <img
            src={BG_MOBILE}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </div>

        <div className="relative z-10 w-full bg-[#faf9f6] px-6 pb-9 pt-7 text-left">
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
            className="mt-3 w-full text-[14.5px] leading-relaxed text-navy-600"
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
    </section>
  );
}
