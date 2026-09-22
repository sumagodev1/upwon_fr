import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import StatCounter from '../../../../components/shared/StatCounter/StatCounter.jsx';
import { HERO_METRICS } from '../../../../data/metrics.js';

// Hero stats strip — relocated out of the hero (home-page design review) so the
// hero stays focused on headline + CTAs. Rendered directly below <HeroSection/>
// on the home page. Same four metrics (50+, 36,500+, states, ₹ daily) as before.
export default function HeroStatsBand() {
  return (
    <section className="relative bg-white py-8 md:py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-y-8 sm:grid-cols-4"
        >
          {HERO_METRICS.map((s, i) => (
            <div key={i} className="px-5 text-center">
              <p className="num-display text-3xl text-navy-950 md:text-4xl">
                <StatCounter value={s.num} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[14px] text-navy-600">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
