import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

/**
 * A button's link. Site paths stay client-side routes; the CMS also allows an
 * absolute URL, which react-router's Link would treat as a relative path.
 */
function CtaLink({ to, children, ...rest }) {
  if (/^https?:\/\//.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}

function CtaButtons({ primary, secondary, compact = false }) {
  const height = compact ? 'min-h-[48px]' : 'min-h-[52px]';
  const width = compact ? 'w-full' : 'w-full sm:w-auto';

  return (
    <>
      <CtaLink
        to={primary.href}
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] bg-orange-500 px-6 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(232,90,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 active:scale-[0.99]`}
      >
        {primary.label}
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </CtaLink>

      {secondary && (
      <CtaLink
        to={secondary.href}
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] border border-navy-950/20 bg-white/70 px-6 text-[14px] font-semibold text-navy-950 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-950/35 hover:bg-white/90 active:scale-[0.99]`}
      >
        {secondary.label}
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </CtaLink>
      )}
    </>
  );
}

/**
 * CMS-only: the copy, artwork and buttons come from the CMS via the page. With nothing published - or
 * the API unreachable - the section renders nothing rather than falling back
 * to built-in content. The desktop band uses the phone crop when no wide
 * artwork is set, and the phone banner the wide artwork when no crop is set.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function DairyIceCreamCtaSection({ section = null }) {
  if (!section) return null;

  const { primary, secondary } = section;
  const desktopImage = section.desktopImage ?? section.mobileImage;
  const mobileImage = section.mobileImage ?? section.desktopImage;
  const heading = <HeadingLines lines={section.headingLines} />;
  const buttons = { primary, secondary };

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f8fa] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {/* =========================================================
          DESKTOP CTA — the artwork renders at its natural 1600x566
          ratio and the copy is laid over its empty left panel. The
          column is capped as a share of the card so it never runs
          onto the photography.
      ========================================================= */}
      <div className="relative mx-auto hidden w-full max-w-[1800px] overflow-hidden rounded-[18px] lg:block lg:rounded-[22px]">
        {desktopImage && (
          <img
            src={desktopImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        )}

        <div className={desktopImage ? 'absolute inset-0' : 'relative bg-[#faf9f6] py-16'}>
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

              {section.subtext && (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mt-4 text-[13.5px] leading-relaxed text-navy-600 lg:max-w-[80%] xl:max-w-[78%] xl:text-[15px] 2xl:text-base"
              >
                {section.subtext}
              </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
                className="mt-7 flex w-full flex-col items-stretch gap-3 xl:w-auto xl:flex-row xl:items-start"
              >
                <CtaButtons {...buttons} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE / TABLET CTA — its own portrait artwork, cropped to
          a banner with the copy underneath.
      ========================================================= */}
      <div className="block w-full overflow-hidden rounded-[18px] lg:hidden">
        {mobileImage && (
          <div className="relative h-[260px] w-full overflow-hidden">
            <img
              src={mobileImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </div>
        )}

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

          {section.subtext && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              className="mt-3 w-full text-[14.5px] leading-relaxed text-navy-600"
            >
              {section.subtext}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
            className="mt-6 flex w-full flex-col gap-2.5"
          >
            <CtaButtons {...buttons} compact />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
