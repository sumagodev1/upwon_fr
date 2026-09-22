import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';

export default function AuthorityNoteStrip({ title, body, stats = [], accent = '#F0A500' }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-14 md:py-16 text-white">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-navy-400/12 blur-3xl" />
      <Container className="relative text-center">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl h-display text-balance text-xl text-white md:text-2xl lg:text-3xl"
          >
            {title}
          </motion.h2>
        )}
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mx-auto mt-4 max-w-3xl text-balance text-sm leading-relaxed text-cream-100/70 md:text-base"
          >
            {body}
          </motion.p>
        )}
        {stats.length > 0 && (
          <div className="mt-10 flex flex-wrap items-start justify-center gap-x-12 gap-y-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.06 }}
              >
                <p className="num-display text-3xl md:text-4xl" style={{ color: accent }}>
                  {s.value}
                </p>
                <p className="mt-1 text-[14px] text-cream-100/60">{s.label}</p>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
