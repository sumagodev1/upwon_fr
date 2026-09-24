import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '../Container/Container.jsx';
import HeadingLines from '../HeadingLines/HeadingLines.jsx';

/*
  SFA-DMS Final CTA — a low-pressure invitation (not a "Request Demo" form) over
  a navy band, with the SFA-DMS dashboard peeking from the bottom. Turns
  accumulated confidence into a conversation about the buyer's own field team and
  distributor network.

  The content is the CMS's when the page has it. `section` is passed down by
  SfaDmsPage; without it the band renders the copy below, which is what it ships
  with and what the SSG build prerenders.
*/

const EASE = [0.22, 1, 0.3, 1];

/** The built-in band. Written in the shape the CMS returns, so one path draws both. */
const FALLBACK = {
  eyebrow: 'Ready when you are',
  headingLines: [
    [
      { text: 'See Your Distribution Network on UpWon — ', accent: false },
      { text: 'Live, in 30 Minutes.', accent: true },
    ],
  ],
  subtext:
    'An invitation to a conversation about your own field team and distributor network — not a demo request form.',
  backgroundImage: '/images/sfa_dms_cta.webp',
  dashboardImage: '/images/sfa_dms_dashboard.webp',
  dashboardAlt: 'UpWon SFA-DMS distribution dashboard',
  buttonLabel: 'Talk to a Distribution Specialist',
  buttonHref: '/demo',
};

export default function SfaFinalCta({ section = null }) {
  const band = section ?? FALLBACK;

  return (
    <section className="bg-cream-100 px-4 py-8 md:px-6 md:py-10 lg:px-8">
      <div
        className="relative overflow-hidden rounded-[2rem] bg-navy-950 bg-cover bg-center"
        style={
          band.backgroundImage ? { backgroundImage: `url(${band.backgroundImage})` } : undefined
        }
      >
        {/* Light navy wash for legibility — kept subtle so the blueprint shows. */}
        <div className="pointer-events-none absolute inset-0 bg-navy-950/25" />

        <Container className="relative pt-10 text-center md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-3xl"
          >
            {band.eyebrow && (
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-400">
                {band.eyebrow}
              </p>
            )}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-white">
              <HeadingLines lines={band.headingLines} />
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-white/70 md:text-[15px]">
              {band.subtext}
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link to={band.buttonHref} className="btn-primary-glow !px-6 !py-3.5">
                {band.buttonLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Dashboard peeking from the bottom */}
          {band.dashboardImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="relative mx-auto mt-8 max-h-[240px] max-w-4xl overflow-hidden"
            >
              <img
                src={band.dashboardImage}
                alt={band.dashboardAlt}
                className="block w-full rounded-t-2xl border-x border-t border-white/10 shadow-enterprise-lg"
              />
            </motion.div>
          )}
        </Container>
      </div>
    </section>
  );
}
