import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import Container from '../shared/Container/Container.jsx';

/*
  Home report-download CTA. Dark band using the home_cta background (dashboard +
  download collage on the left), report offer + download button on the right.
  Sits below the FAQ.
*/

const EASE = [0.22, 1, 0.3, 1];

export default function HomeFinalCta() {
  return (
    <section className="bg-cream-100 px-4 py-8 md:px-6 md:py-10 lg:px-8">
      <div className="relative min-h-[540px] overflow-hidden rounded-[2rem] bg-navy-950 md:min-h-[440px]">
      {/* Mobile background — collage at the top, text below */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/images/home_cta_mb.webp')" }}
      />
      {/* Desktop background — collage on the left, contained so it never crops */}
      <div
        className="absolute inset-0 hidden bg-contain bg-left bg-no-repeat md:block"
        style={{ backgroundImage: "url('/images/home_cta.webp')" }}
      />
      {/* Desktop: darken only the far-right (text) area; collage stays original */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(to left, #0F1535 0%, #0F1535 42%, rgba(15,21,53,0) 64%)',
        }}
      />

      <Container className="relative">
        <div className="grid md:grid-cols-2">
          <div className="hidden md:block" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="pb-12 pt-[70vw] text-center text-white sm:pt-[62vw] md:py-24 md:text-left lg:pl-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-100/80">
              Free Report
            </span>
 <h2 className="mt-4 h-display text-[36.8px] leading-[1.08] tracking-tight text-white">
              Benchmark your operations.{' '}
              <span className="gradient-text-orange">Free report.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-cream-100/80 md:mx-0 md:text-base">
              See how 50+ food and FMCG businesses cut wastage, sped up billing, and scaled — with
              benchmarks you can measure your own operation against.
            </p>
            <Link
              to="/resources"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-orange-500 hover:text-white"
            >
              <Download className="h-4 w-4" strokeWidth={2} />
              Download the report
            </Link>
          </motion.div>
        </div>
      </Container>
      </div>
    </section>
  );
}
