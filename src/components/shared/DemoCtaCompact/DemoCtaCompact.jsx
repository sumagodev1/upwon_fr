import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '../Container/Container.jsx';

export default function DemoCtaCompact({
  eyebrow = 'Ready when you are',
  title = 'See UpWon working on your type of business — live, in 30 minutes.',
  description = 'Tell us your industry and your biggest pain point. We show you exactly how UpWon solves it. Free. No commitment.',
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 section-pad">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[500px] w-[1100px] -translate-y-1/3 rounded-full bg-navy-400/15 blur-[160px]" />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            {eyebrow}
          </p>
 <h2 className="mt-5 h-display text-[36.8px] text-balance text-white">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream-100/80">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/demo" className="btn-primary-glow !px-6 !py-3.5">
              Book Free Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/roi-calculator" className="btn-secondary-dark !px-6 !py-3.5">
              Calculate Your ROI
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] text-cream-100/60">
            <span>No spam</span>
            <span className="h-3 w-px bg-white/10" />
            <span>Response within 2 hours</span>
            <span className="h-3 w-px bg-white/10" />
            <span>No obligation</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
