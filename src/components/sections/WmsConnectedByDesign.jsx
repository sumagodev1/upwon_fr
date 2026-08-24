import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

export default function WmsConnectedByDesign() {
  return (
    <section className="relative overflow-hidden bg-cream-100 py-16 md:py-20 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full border border-orange-200/40" />
      <div className="absolute -right-32 -top-24 h-80 w-80 rounded-full border border-navy-200/40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <Eyebrow className="justify-center">
            Connected by Design
          </Eyebrow>

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950 md:text-[44px]">
            Everything Your Warehouse Needs,
            <br />
            <span className="gradient-text-orange">
              Connected in One Flow.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-navy-600">
            Connect UPWON WMS with your ERP, business systems, warehouse hardware
            and third-party tools to keep every operation moving on one unified
            platform.
          </p>
        </motion.div>

        {/* Main Connected By Design Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
          className="relative mx-auto mt-10 md:mt-14"
        >
          {/* Soft background glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/20 blur-3xl" />

          <img
            src="/images/connected by design.webp"
            alt="UPWON WMS connected by design integrations"
            className="relative z-10 mx-auto h-auto w-full max-w-[1280px] object-contain"
            loading="lazy"
          />
        </motion.div>
      </Container>
    </section>
  );
}