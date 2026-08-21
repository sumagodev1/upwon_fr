import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Container from '../ui/Container.jsx';

/*
  Final CTA — converts accumulated confidence into a low-pressure next step
  matched to the buyer's readiness. Invitation to a conversation, not a hard
  "buy" ask. Sits over the erp_cta background image.
*/

const EASE = [0.22, 1, 0.3, 1];

export default function ErpFinalCta() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background — mobile portrait vs wide desktop banner */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url('/images/erp_cta_mobile.webp')" }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center md:block"
        style={{ backgroundImage: "url('/images/erp_cta.webp')" }}
      />
      {/* Soft glow behind the centred text only — keeps the image clearly
          visible at the edges while text stays readable in the middle. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 78% at 50% 50%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0) 78%)',
        }}
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl py-16 text-center md:py-24"
        >
 <h2 className="h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            See UPWON on Your Business —{' '}
            <span className="gradient-text-orange">Live, in 30 Minutes.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-700 md:text-base">
            This isn’t a pitch. It’s a 30-minute conversation about your operations — with someone
            who knows your industry, mapped to what you actually run.
          </p>

          {/* Primary CTA */}
          <div className="mt-8 flex justify-center">
            <Link to="/demo" className="btn-primary-glow !px-7 !py-3.5 text-[15px]">
              Talk to an Industry Specialist
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
