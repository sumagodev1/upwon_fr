import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  "Everything in one place" — a product-showcase hero. A single composite
  dashboard image sits centre-stage, framed with a soft shadow, above a
  trusted-by-industries strip.
*/

const EASE = [0.22, 1, 0.3, 1];

const SHOWCASE = '/images/desktop.webp';
// Filename carries spaces on disk — URL-encode it.
const GIF = '/video/final%20product%20gif.gif';

export default function EverythingInOnePlace() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />
      {/* soft ambient glow behind the showcase */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.06] blur-[120px]" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Built for Modern Businesses</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Everything a Food Business Needs to Run —{' '}
            <span className="gradient-text-orange">Connected, Not Cobbled Together.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-navy-600">
            From planning to execution, from teams to tasks — UPWON brings all your
            operations together on a single, intelligent platform.
          </p>
        </motion.div>

        {/* Showcase image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto mt-12 w-full max-w-[1440px] md:mt-14"
        >
          <img
            src={SHOWCASE}
            alt="UPWON ERP — one platform for your entire business"
            loading="lazy"
            decoding="async"
            className="block w-full"
          />

          {/* Animated search bar (gif) — anchored to the lower-left, spilling
              below the dashboard into the open space (desktop only). */}
          <div className="absolute bottom-[2%] left-[4%] hidden w-[40%] overflow-hidden rounded-xl shadow-enterprise-lg lg:block">
            <img
              src={GIF}
              alt="Search a business solution in UPWON"
              loading="lazy"
              decoding="async"
              className="block w-full"
            />
          </div>
        </motion.div>

        {/* On smaller screens the gif stacks below the image. */}
        <div className="mx-auto mt-4 max-w-md overflow-hidden rounded-xl shadow-enterprise-lg lg:hidden">
          <img
            src={GIF}
            alt="Search a business solution in UPWON"
            loading="lazy"
            decoding="async"
            className="block w-full"
          />
        </div>
      </Container>
    </section>
  );
}
