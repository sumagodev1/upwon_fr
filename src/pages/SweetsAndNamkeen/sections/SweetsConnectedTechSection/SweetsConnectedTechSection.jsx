import { Link } from 'react-router-dom';
import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

/**
 * A tile's link. Site paths stay client-side routes; the CMS also allows an
 * absolute URL, which react-router's Link would treat as a relative path.
 */
function TileLink({ to, children, ...rest }) {
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

/**
 * CMS-only: the copy and the product tiles - each linking through to that
 * product's page - come from the CMS via the page. With nothing published, or
 * the API unreachable, the section renders nothing rather than falling back to
 * built-in content.
 *
 * @param {{ section?: object | null }} props - the published copy and tiles.
 */
export default function SweetsConnectedTechSection({ section = null }) {
  const reduceMotion = useReducedMotion();

  if (!section) return null;

  const { eyebrow, subtext, tiles } = section;
  const heading = <HeadingLines lines={section.headingLines} />;

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

  const tilesGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.09), delayChildren: 0.12 },
    },
  };

  const tileVariants = {
    hidden: { opacity: 0, y: d(20), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.25, ease: EASE } },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f8fafd]">
      {/* =========================================================
          DESKTOP — the artwork renders at its natural 2108x746 ratio so
          none of the tile and chart motifs are cropped, and the copy is
          laid over it.
      ========================================================= */}
      <div className="relative hidden w-full lg:block">
        <img
          src="/images/industry_soft_back.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="block h-auto w-full"
        />

        <div className="absolute inset-0">
          <Container className="flex h-full items-center">
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="grid w-full items-center gap-10 lg:grid-cols-[0.85fr_1.45fr] xl:gap-14"
            >
          {/* ================= LEFT COPY ================= */}
          <div className="min-w-0">
            <motion.div variants={fadeIn}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-4 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              {heading}
            </motion.h2>

            {subtext && (
              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
              >
                {subtext}
              </motion.p>
            )}
          </div>

          {/* ================= PRODUCT TILES ================= */}
          {/* calc widths give 3 tiles on the first row and 2 centred below,
              matching the tile motifs in the background artwork. */}
          <motion.div
            variants={tilesGroup}
            className="flex min-w-0 flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5"
          >
            {tiles.map(({ label, icon, to }) => (
              <motion.div
                key={label}
                variants={tileVariants}
                whileHover="hover"
                className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(33.333%-0.834rem)]"
              >
                <TileLink
                  to={to}
                  className="group flex h-full items-center gap-3 rounded-[16px] border border-navy-950/[0.06] bg-white px-3.5 py-4 shadow-[0_10px_30px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(25,35,55,0.12)] sm:gap-4 sm:px-4 sm:py-5 lg:gap-5 lg:px-6 lg:py-9 xl:px-7 xl:py-11"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#f4f7fc] transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 lg:h-[72px] lg:w-[72px] xl:h-20 xl:w-20">
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 lg:h-10 lg:w-10 xl:h-11 xl:w-11"
                    />
                  </span>

                  <span className="h-display min-w-0 text-[13.5px] font-semibold leading-snug text-navy-950 sm:text-[15px] lg:text-[18px] xl:text-[19px]">
                    {label}
                  </span>
                </TileLink>
              </motion.div>
            ))}
          </motion.div>
            </motion.div>
          </Container>
        </div>
      </div>

      {/* =========================================================
          MOBILE / TABLET — the strip is far too wide to read at these
          widths, so the copy stacks on the flat tint instead.
      ========================================================= */}
      <div className="block w-full py-12 sm:py-16 lg:hidden">
        <Container>
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid w-full gap-10"
          >
          {/* ================= LEFT COPY ================= */}
          <div className="min-w-0">
            <motion.div variants={fadeIn}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-4 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              {heading}
            </motion.h2>

            {subtext && (
              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
              >
                {subtext}
              </motion.p>
            )}
          </div>

          {/* ================= PRODUCT TILES ================= */}
          {/* calc widths give 3 tiles on the first row and 2 centred below,
              matching the tile motifs in the background artwork. */}
          <motion.div
            variants={tilesGroup}
            className="flex min-w-0 flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5"
          >
            {tiles.map(({ label, icon, to }) => (
              <motion.div
                key={label}
                variants={tileVariants}
                whileHover="hover"
                className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(33.333%-0.834rem)]"
              >
                <TileLink
                  to={to}
                  className="group flex h-full items-center gap-3 rounded-[16px] border border-navy-950/[0.06] bg-white px-3.5 py-4 shadow-[0_10px_30px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(25,35,55,0.12)] sm:gap-4 sm:px-4 sm:py-5 lg:gap-5 lg:px-6 lg:py-9 xl:px-7 xl:py-11"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#f4f7fc] transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 lg:h-[72px] lg:w-[72px] xl:h-20 xl:w-20">
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="h-6 w-6 object-contain sm:h-7 sm:w-7 lg:h-10 lg:w-10 xl:h-11 xl:w-11"
                    />
                  </span>

                  <span className="h-display min-w-0 text-[13.5px] font-semibold leading-snug text-navy-950 sm:text-[15px] lg:text-[18px] xl:text-[19px]">
                    {label}
                  </span>
                </TileLink>
              </motion.div>
            ))}
          </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
