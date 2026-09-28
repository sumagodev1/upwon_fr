import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchWhyUpwonCtaSection } from '../../../../lib/whyUpwonPage.js';

const EASE = [0.22, 1, 0.3, 1];

const BG_DESKTOP = '/images/why_cta_desktop.webp';
const BG_MOBILE = '/images/why_cta_mobile.webp';

const HEADING = (
  <>
    Ready to Connect Your{' '}
    <span className="gradient-text-orange">Business Operations?</span>
  </>
);

const SUBTEXT =
  'Discover how UpWon can help bring your workflows, teams, and business information together in one connected platform.';

/*
  Both crops are dark, so the copy runs light here rather than navy — the
  secondary button takes the site's dark-surface treatment for the same
  reason.

  The built-in band is the fallback now. The published one is the CMS's; these
  are what the section shows during the SSG build, while the fetch is in
  flight, and whenever the API is unreachable.
*/
const PRIMARY = { label: 'Explore UpWon', to: '/what-is-upwon' };
const SECONDARY = { label: 'Talk to Our Team', to: '/contact' };
function CtaButtons({ primary, secondary, compact = false }) {
  const height = compact ? 'min-h-[48px]' : 'min-h-[52px]';
  const width = compact ? 'w-full' : 'w-full sm:w-auto';

  return (
    <>
      <Link
        to={primary.to}
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] bg-orange-500 px-6 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(232,90,42,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 active:scale-[0.99]`}
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
          className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] border border-white/25 bg-white/[0.06] px-6 text-[14px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-500 active:scale-[0.99]`}
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

export default function WhyUpwonCtaSection() {
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchWhyUpwonCtaSection().then((section) => {
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
    <section className="relative w-full overflow-hidden bg-[#0b1020]">
      {/* =========================================================
          DESKTOP CTA — the artwork renders at its natural 2109x746
          ratio and the copy is laid over the empty dark panel to the
          left of the laptop.
      ========================================================= */}
      <div className="relative hidden w-full lg:block">
        <img
          src={bgDesktop}
          alt=""
          aria-hidden="true"
          width={2109}
          height={746}
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
              className="flex w-full flex-col items-start text-left lg:ml-[4vw] lg:max-w-[38%] xl:ml-[6vw] xl:max-w-[36%]"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
                className="h-display text-[26px] leading-[1.1] tracking-tight text-white xl:text-[31px] 2xl:text-[36.8px]"
              >
                {heading}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mt-4 text-[13.5px] leading-relaxed text-cream-100/80 lg:max-w-[88%] xl:text-[15px] 2xl:text-base"
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
          MOBILE / TABLET CTA — its own portrait artwork, with the
          copy sitting in the dark space it leaves beneath the laptop.
      ========================================================= */}
      <div className="relative block w-full overflow-hidden lg:hidden">
        {/* Cropped from the top rather than shown whole: the file carries a
            long run of empty dark below the rock that would otherwise open a
            gap between the laptop and the copy. */}
        <img
          src={bgMobile}
          alt=""
          aria-hidden="true"
          width={851}
          height={1848}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* The padding-top is a share of the block's own width, so the copy
            always starts just under the rock however wide the screen is. */}
        <div className="relative px-6 pb-10 pt-[80%] text-left sm:px-8 sm:pb-12">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="h-display w-full text-[27px] leading-[1.1] tracking-tight text-white"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            className="mt-3 w-full text-[14.5px] leading-relaxed text-cream-100/80"
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
