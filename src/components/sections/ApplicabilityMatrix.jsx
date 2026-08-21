import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { APPLICABILITY_MATRIX } from '../../data/industryExtras.js';
import { PLATFORM_MODULES } from '../../data/modules.js';
import { INDUSTRIES } from '../../data/industries.js';

const LEVEL_LABEL = {
  3: { label: '★★', cls: 'bg-emerald-500 text-white', text: 'Highly applicable' },
  2: { label: '★', cls: 'bg-emerald-100 text-emerald-700', text: 'Applicable' },
  1: { label: '~', cls: 'bg-amber-100 text-amber-700', text: 'Partial' },
  0: { label: '—', cls: 'bg-cream-100 text-navy-400', text: 'Not required' },
};

export default function ApplicabilityMatrix({
  scope = 'all', // 'all' or industry slug to highlight that row
  eyebrow = 'Platform × Industry',
  title = 'Which platforms apply to which business.',
  description = 'Built from 50+ live deployments — not a marketing assumption.',
  dark = false,
}) {
  const cellBg = dark ? 'bg-navy-950' : 'bg-white';
  const headerBg = dark ? 'bg-white/[0.04]' : 'bg-navy-950';
  const headerText = dark ? 'text-cream-100' : 'text-white';
  const rowBorder = dark ? 'bg-white/[0.06]' : 'bg-cream-300';
  const sectionBg = dark ? 'bg-navy-975' : 'bg-cream-100';

  return (
    <section className={`relative overflow-hidden ${sectionBg} section-pad`}>
      {dark ? (
        <div className="absolute inset-0 grid-bg opacity-40" />
      ) : (
        <div className="absolute inset-0 grid-bg-light opacity-40" />
      )}
      <Container className="relative">
        <SectionHeading
          align="center"
          variant={dark ? 'dark' : 'light'}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-12 overflow-x-auto">
          <div
            className={`mx-auto min-w-[640px] md:min-w-[860px] overflow-hidden rounded-2xl border ${dark ? 'border-white/[0.08]' : 'border-cream-300'} shadow-enterprise`}
          >
            {/* Header row */}
            <div
              className="grid gap-px"
              style={{
                gridTemplateColumns: `2fr repeat(${PLATFORM_MODULES.length}, 1fr)`,
                background: dark ? 'rgba(255,255,255,0.06)' : '#E2DED4',
              }}
            >
              <div className={`${headerBg} px-5 py-3.5`}>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-orange-400">
                  Industry
                </p>
              </div>
              {PLATFORM_MODULES.map((p) => (
                <div key={p.id} className={`${headerBg} px-2 py-3.5 text-center`}>
                  <p className={`text-[10.5px] font-semibold uppercase tracking-[0.1em] ${headerText} font-display`}>
                    {p.code.replace('UpWon ', '')}
                  </p>
                </div>
              ))}
            </div>

            {/* Rows */}
            {INDUSTRIES.map((ind, i) => {
              const row = APPLICABILITY_MATRIX[ind.slug] || {};
              const highlighted = scope === ind.slug;
              return (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: (i % 10) * 0.025 }}
                  className={`grid gap-px ${rowBorder}`}
                  style={{
                    gridTemplateColumns: `2fr repeat(${PLATFORM_MODULES.length}, 1fr)`,
                  }}
                >
                  <div
                    className={`flex items-center gap-3 px-5 py-3 ${highlighted ? (dark ? 'bg-orange-500/15' : 'bg-orange-50') : cellBg}`}
                  >
                    <div
                      className={`grid h-8 w-8 place-items-center rounded-md ${dark ? 'bg-white/[0.04]' : 'bg-cream-100'} ${dark ? 'text-orange-400' : 'text-orange-600'}`}
                    >
                      <ind.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className={`text-[14px] font-semibold ${dark ? 'text-white' : 'text-navy-950'}`}>{ind.name}</p>
                      {highlighted && (
                        <p className={`text-[9.5px] uppercase tracking-[0.16em] ${dark ? 'text-orange-300' : 'text-orange-600'}`}>
                          You are here
                        </p>
                      )}
                    </div>
                  </div>
                  {PLATFORM_MODULES.map((p) => {
                    const lvl = row[p.slug] ?? 0;
                    const meta = LEVEL_LABEL[lvl];
                    return (
                      <div
                        key={p.slug}
                        className={`flex items-center justify-center ${highlighted ? (dark ? 'bg-orange-500/10' : 'bg-orange-50/60') : cellBg} px-2 py-3`}
                      >
                        <span
                          className={`inline-flex h-7 min-w-[36px] items-center justify-center rounded-md px-2 text-[14px] font-bold ${meta.cls}`}
                          title={meta.text}
                        >
                          {meta.label}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-charcoal">
          <span className="inline-flex items-center gap-1.5">
            <span className="grid h-5 min-w-[28px] items-center justify-center rounded bg-emerald-500 px-1.5 text-[14px] font-bold text-white">★★</span>
            Highly applicable
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="grid h-5 min-w-[28px] items-center justify-center rounded bg-emerald-100 px-1.5 text-[14px] font-bold text-emerald-700">★</span>
            Applicable
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="grid h-5 min-w-[28px] items-center justify-center rounded bg-amber-100 px-1.5 text-[14px] font-bold text-amber-700">~</span>
            Partial
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="grid h-5 min-w-[28px] items-center justify-center rounded bg-cream-100 px-1.5 text-[14px] font-bold text-navy-400">—</span>
            Not required
          </span>
        </div>
      </Container>
    </section>
  );
}
