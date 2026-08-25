import { m as motion } from 'framer-motion';
import { Users, CheckCircle2 } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  HRMS "One Suite, Not Six Vendors"
*/

const EASE = [0.22, 1, 0.3, 1];

export default function HrmsOneSuite() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">
            <Users className="h-4 w-4" />
            One Suite, Not Six Vendors
          </span> */}
          <Eyebrow className="justify-center">
            One Suite, Not Six Vendors
          </Eyebrow>

          <h2 className="mt-4 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            HREasy Stands on Its Own. It&apos;s Even Better Next to Your{' '}
            <span className="gradient-text-orange">
              ERP, SFA-DMS and FMS.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            A dedicated HRMS you can rely on, with the power of a complete suite
            that works together on one shared data model.
          </p>
        </motion.div>

        {/* Direct Image */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mt-10 md:mt-12"
        >
          <img
            src="/images/hrms_one.webp"
            alt="HREasy integrated with the complete UpWon business suite"
            loading="lazy"
            className="mx-auto h-auto w-full max-w-[1100px] object-contain"
          />
        </motion.div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-10 flex items-center justify-center gap-3 text-center md:mt-12"
        >
          <CheckCircle2
            className="h-6 w-6 shrink-0 text-orange-500"
            strokeWidth={1.9}
          />

          <p className="text-[15px] leading-snug">
            <span className="font-bold text-navy-900">
              Buy what you need today.
            </span>{' '}
            <span className="font-semibold text-orange-600">
              Everything else is already built to connect, when you&apos;re ready.
            </span>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}