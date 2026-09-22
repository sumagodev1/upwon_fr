import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import SectionHeading from '../../../../components/shared/SectionHeading/SectionHeading.jsx';

const TONE_STYLES = {
  pink: { dot: 'bg-pink-500', cat: 'text-pink-700', accent: 'bg-pink-500' },
  rose: { dot: 'bg-rose-500', cat: 'text-rose-700', accent: 'bg-rose-500' },
  violet: { dot: 'bg-violet-500', cat: 'text-violet-700', accent: 'bg-violet-500' },
  blue: { dot: 'bg-blue-500', cat: 'text-blue-700', accent: 'bg-blue-500' },
  teal: { dot: 'bg-teal-500', cat: 'text-teal-700', accent: 'bg-teal-500' },
  amber: { dot: 'bg-amber-500', cat: 'text-amber-700', accent: 'bg-amber-500' },
  green: { dot: 'bg-emerald-500', cat: 'text-emerald-700', accent: 'bg-emerald-500' },
};

export default function ExpansionGrid({
  items,
  eyebrow = 'The Complete Spectrum',
  title,
  subtitle,
  introTitle,
  introBody,
}) {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow={eyebrow}
          title={title}
          description={subtitle}
        />

        {/* Intro band */}
        {(introTitle || introBody) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-950 to-violet-900 p-8 md:p-10"
          >
            {introTitle && (
              <h3 className="h-display text-balance text-2xl font-bold text-white md:text-3xl">
                {introTitle}
              </h3>
            )}
            {introBody && (
              <p className="mt-3 max-w-3xl text-balance text-base leading-relaxed text-cream-100/75 md:text-lg">
                {introBody}
              </p>
            )}
          </motion.div>
        )}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const tone = TONE_STYLES[item.tone] || TONE_STYLES.pink;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-cream-300 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise"
              >
                {/* Accent stripe */}
                <span
                  className={`pointer-events-none absolute bottom-0 left-0 right-0 h-1 origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${tone.accent}`}
                />

                <div className="flex items-start gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]">
                      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                      <span className={tone.cat}>{item.cat}</span>
                    </span>
                    <p className="mt-1.5 font-display text-base font-bold text-navy-950 leading-snug">
                      {item.name}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[14px] leading-relaxed text-charcoal">
                  {item.ex}
                </p>

                <div className="mt-4 border-t border-cream-300 pt-3">
                  <p className="flex items-start gap-2 text-[14px] font-semibold text-emerald-700">
                    <span className="shrink-0 text-[14px]">✓</span>
                    {item.need}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
