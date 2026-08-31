import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight, Boxes } from 'lucide-react';

const EASE = [0.22, 1, 0.3, 1];

const HEADING = (
  <>
    Ready to Bring More Control to Your{' '}
    <span className="gradient-text-orange">
      FMCG Distribution Operations?
    </span>
  </>
);

const SUBTEXT =
  'Connect inventory, warehouses, orders, distributors, and business operations through one platform designed to support the speed and complexity of FMCG distribution.';

function CtaButtons({ compact = false }) {
  const height = compact ? 'min-h-[48px]' : 'min-h-[52px]';
  const width = compact ? 'w-full' : 'w-full sm:w-auto';

  return (
    <>
      <Link
        to="/contact"
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
        to="/products"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] border border-navy-950/20 bg-white/70 px-6 text-[14px] font-semibold text-navy-950 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-950/35 hover:bg-white/90 active:scale-[0.99]`}
      >
        <Boxes size={19} strokeWidth={1.9} className="text-orange-500" />
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

export default function FmcgCtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f7f8fa] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {/* =========================================================
          DESKTOP CTA — copy sits in the artwork's empty left panel
      ========================================================= */}
      <div className="relative mx-auto hidden w-full max-w-[1800px] overflow-hidden rounded-[18px] md:block lg:rounded-[22px]">
        {/* Capped height like the Bakery CTA — the artwork's natural 2.5:1
            ratio would otherwise run ~775px tall on a wide screen. */}
        <div className="relative w-full md:min-h-[560px] lg:min-h-[620px]">
          {/* object-top keeps the crop off the bottom (floor and conveyor)
              rather than centring it, which was clipping the head. */}
          <img
            src="/images/fmcg_cta_sec.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />

          <div className="relative flex min-h-[560px] w-full items-center px-6 sm:px-8 md:px-10 lg:min-h-[620px] lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex w-full max-w-[560px] flex-col items-start text-left lg:ml-[5vw] lg:max-w-[640px] xl:ml-[7vw]"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
                className="h-display text-[28px] leading-[1.1] tracking-tight text-navy-950 lg:text-[33px] xl:text-[36.8px]"
              >
                {HEADING}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-navy-600 lg:text-[15px] xl:text-base"
              >
                {SUBTEXT}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
                className="mt-7 flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row"
              >
                <CtaButtons />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE CTA — no mobile artwork exists, so the photographed
          right-hand side is cropped into a banner and the copy runs
          underneath on a matching tint.
      ========================================================= */}
      <div className="block w-full overflow-hidden rounded-[18px] md:hidden">
        <div className="relative h-[230px] w-full overflow-hidden">
          <img
            src="/images/fmcg_cta_sec.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-right"
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
