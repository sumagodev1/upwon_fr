import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchEngineeringCtaSection } from '../../../../lib/engineeringManufacturingPage.js';

const EASE = [0.22, 1, 0.3, 1];

const BG_DESKTOP = '/images/eng_desktop_cta.webp';
const BG_MOBILE = '/images/eng_mobile_cta.webp';

const HEADING = (
  <>
    Ready to Bring Your{' '}
    <span className="gradient-text-orange">
      Engineering &amp; Manufacturing Operations Together?
    </span>
  </>
);

const SUBTEXT =
  'Connect procurement, raw materials, bill of materials, production planning, quality, inventory, warehouses, sales, dispatch, people, and business operations through one platform designed to support growing manufacturing businesses.';

/*
  The built-in band - the fallback now. The published one is the CMS's; these
  are what the section shows during the SSG build, while the fetch is in
  flight, and whenever the API is unreachable.
*/
const PRIMARY = { label: 'Request a Demo', to: '/demo' };
const SECONDARY = { label: 'Explore UpWon Solutions', to: '/what-is-upwon' };

function CtaButtons({ primary, secondary, compact = false }) {
  const height = compact ? 'min-h-[48px]' : 'min-h-[52px]';
  const width = compact ? 'w-full' : 'w-full sm:w-auto';

  return (
    <>
      <Link
        to={primary.to}
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] bg-orange-500 px-6 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(232,90,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 active:scale-[0.99]`}
      >
        {primary.label}
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      {secondary && (
        <Link
          to={secondary.to}
          className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] border border-navy-950/20 bg-white/70 px-6 text-[14px] font-semibold text-navy-950 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-950/35 hover:bg-white/90 active:scale-[0.99]`}
        >
          {secondary.label}
          <ArrowRight
            size={17}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      )}
    </>
  );
}

export default function EngineeringCtaSection() {
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchEngineeringCtaSection().then((section) => {
      if (!cancelled && section) setCms(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const heading = cms ? <HeadingLines lines={cms.headingLines} /> : HEADING;
  const subtext = cms ? cms.subtext : SUBTEXT;
  const primary = cms ? cms.primary : PRIMARY;
  const secondary = cms ? cms.secondary : SECONDARY;
  // A CMS without artwork keeps the band's own.
  const bgDesktop = cms?.desktopImage ?? BG_DESKTOP;
  const bgMobile = cms?.mobileImage ?? BG_MOBILE;

  return (
    <section className="relative w-full overflow-hidden">
      {/* =========================================================
          DESKTOP CTA — the artwork renders at its natural 1600x599
          ratio and the copy is laid over its empty left panel. The
          column is capped as a share of the card so it never runs
          onto the photography.
      ========================================================= */}
      <div className="relative hidden w-full lg:block">
        <img
          src={bgDesktop}
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
                {heading}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mt-4 text-[13.5px] leading-relaxed text-navy-600 lg:max-w-[80%] xl:max-w-[78%] xl:text-[15px] 2xl:text-base"
              >
                {subtext}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
                className="mt-7 flex w-full flex-col items-stretch gap-3 xl:w-auto xl:flex-row xl:items-start"
              >
                <CtaButtons primary={primary} secondary={secondary} />
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
            src={bgMobile}
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
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            className="mt-3 w-full text-[14.5px] leading-relaxed text-navy-600"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
            className="mt-6 flex w-full flex-col gap-2.5"
          >
            <CtaButtons primary={primary} secondary={secondary} compact />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
