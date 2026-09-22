import { m as motion } from 'framer-motion';

// 5-step operations journey card — sits in industry hero right column
export default function JourneyCard({ title = 'Operations Flow on UpWon', steps, accent = '#E85A2A' }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cream-300 bg-white p-1 shadow-enterprise-lg">
      <div className="rounded-xl bg-navy-950 p-5">
        <div className="flex items-center justify-between">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: accent }}
          >
            {title}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[14px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[14px] font-bold font-display"
                  style={{
                    background: `${accent}22`,
                    border: `1px solid ${accent}60`,
                    color: accent,
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-white font-display">
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-[14px] text-cream-100/60 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="ml-3.5 mt-1.5 h-3 w-px"
                  style={{ background: `${accent}40` }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
