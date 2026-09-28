import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

/**
 * CMS-only: the copy, logos and figures all come from the CMS via the page.
 * With nothing published - or the API unreachable - the section renders
 * nothing rather than falling back to built-in content.
 *
 * @param {{ section?: object | null }} props - the published trust section.
 */
export default function BakeryProofStripSection({ section = null }) {
  if (!section) return null;

  const brands = section.logos;
  const stats = section.stats;

  return (
    <section className="relative overflow-hidden bg-[#fffaf4] py-14 md:py-20">
      {/* ================= BACKGROUND BAKERY ILLUSTRATION ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/bakery_bg_img.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-100"
        />

        {/* Soft readability overlay */}
        <div className="absolute inset-0 bg-[#fffaf4]/35" />
      </div>

      <Container className="relative z-10">
        {/* ================= TOP HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
          </div>

          <h2 className="mt-4 h-display text-3xl font-semibold leading-tight text-navy-950 sm:text-4xl">
            <HeadingLines lines={section.headingLines} />
          </h2>

          {section.subtext && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-navy-600 md:text-base">
              {section.subtext}
            </p>
          )}
        </motion.div>

        {/* ================= TRUSTED BRANDS ================= */}
        {brands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-8 max-w-6xl"
        >
          <div className="grid grid-cols-2 overflow-hidden rounded-[22px] border border-[#eadfd3] bg-white/75 shadow-[0_12px_35px_rgba(100,65,35,0.07)] backdrop-blur-sm sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  delay: index * 0.06,
                }}
                className={`flex min-h-[88px] items-center justify-center px-4 ${
                  index !== brands.length - 1
                    ? 'border-[#eadfd3] lg:border-r'
                    : ''
                }`}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[52px] w-full max-w-[130px] object-contain transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        )}

        {/* ================= BAKERY STATS ================= */}
        {stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          className="mx-auto mt-7 grid max-w-6xl grid-cols-1 overflow-hidden rounded-[22px] border border-[#eadfd3] bg-white/80 shadow-[0_14px_40px_rgba(100,65,35,0.08)] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: index * 0.08,
              }}
              className={`relative flex min-h-[190px] flex-col items-center justify-center px-5 py-7 text-center ${
                index !== stats.length - 1
                  ? 'border-b border-[#eadfd3] lg:border-b-0 lg:border-r'
                  : ''
              } ${stat.featured ? 'bg-[#fffdf9]' : ''}`}
            >
              {/* ================= ICON ================= */}
              {stat.icon && (
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                  <img
                    src={stat.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* ================= VALUE ================= */}
              <div className="mt-4">
                <h3 className="h-display text-[27px] font-bold leading-none text-navy-950">
                  {stat.value}
                </h3>

                <p className="mx-auto mt-2 max-w-[150px] text-xs leading-relaxed text-navy-600">
                  {stat.label}
                </p>
              </div>

              {/* ================= ACTIVE UNDERLINE ================= */}
              {stat.featured && (
                <motion.span
                  layoutId="bakery-proof-active"
                  className="absolute bottom-0 left-1/2 h-[3px] w-12 -translate-x-1/2 rounded-full bg-[#d99a2b]"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        )}

        {/* ================= BOTTOM MESSAGE ================= */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
          className="mx-auto mt-7 flex max-w-5xl flex-col items-center justify-between gap-4 rounded-full border border-[#eadfd3] bg-white/75 px-5 py-3 shadow-sm backdrop-blur-sm sm:flex-row sm:px-7"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff3ec]">
              <img
                src="/images/bakery_bottom_heart.webp"
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain"
              />
            </div>

            <p className="text-sm font-semibold text-navy-800">
              Built for bakers. Backed by results.
            </p>
          </div>

          <div className="hidden h-7 w-px bg-[#eadfd3] sm:block" />

          <p className="text-center text-xs text-navy-500 sm:text-right sm:text-sm">
            Smarter operations. Happier customers. Stronger businesses.
          </p>
        </motion.div>
        */}
      </Container>
    </section>
  );
}