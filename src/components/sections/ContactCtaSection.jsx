import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Container from '../ui/Container.jsx';
import { COMPANY } from '../../data/company.js';

const EASE = [0.22, 1, 0.3, 1];

const BG_DESKTOP = '/images/contact_cta_desktop.webp';
const BG_MOBILE = '/images/contact_cta_mobile.webp';

const HEADING = (
  <>
    Prefer to Talk It Through?{' '}
    <span className="gradient-text-orange">We&rsquo;re Here to Help.</span>
  </>
);

const SUBTEXT =
  'Call the toll-free sales line, send a message on WhatsApp, or book a 30-minute demo. A solution lead from the UpWon team picks it up from there — usually within 2 business hours.';

/*
  Both crops are bright, so the copy runs navy here rather than reversing
  out to white the way the dark CTA artwork elsewhere on the site does.
*/
function CtaButtons({ compact = false }) {
  const height = compact ? 'min-h-[48px]' : 'min-h-[52px]';
  const width = compact ? 'w-full' : 'w-full sm:w-auto';

  return (
    <>
      <Link
        to="/demo"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] bg-orange-500 px-6 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(232,90,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 active:scale-[0.99]`}
      >
        Book a Free Demo
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <a
        href={`https://wa.me/${COMPANY.contact.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] border border-navy-950/20 bg-white/70 px-6 text-[14px] font-semibold text-navy-950 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-950/35 hover:bg-white/90 active:scale-[0.99]`}
      >
        <MessageCircle size={17} strokeWidth={2} />
        Message Us on WhatsApp
      </a>
    </>
  );
}

export default function ContactCtaSection() {
  return (
    <section className="relative w-full bg-white py-10 sm:py-12 lg:py-14">
      {/* The artwork sits in a rounded card inset from the page edges rather
          than running full bleed. `overflow-hidden` is what actually clips
          the photograph to the corner radius. */}
      <Container className="!max-w-[1700px]">
        <div className="relative overflow-hidden rounded-[20px] shadow-[0_18px_50px_rgba(25,35,55,0.08)] ring-1 ring-navy-950/[0.06] sm:rounded-[24px]">
          {/* =========================================================
              DESKTOP — the artwork renders at its natural 1983x793 ratio
              and the copy is laid over the empty panel to the left of the
              desk.
          ========================================================= */}
          <div className="relative hidden w-full lg:block">
            <img
              src={BG_DESKTOP}
              alt=""
              aria-hidden="true"
              width={1983}
              height={793}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />

            <div className="absolute inset-0">
              <div className="flex h-full w-full items-center px-6 sm:px-8 md:px-10 lg:px-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="flex w-full flex-col items-start text-left lg:ml-[4vw] lg:max-w-[40%] xl:ml-[6vw] xl:max-w-[38%]"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
                    className="h-display text-[26px] leading-[1.1] tracking-tight text-navy-950 xl:text-[31px] 2xl:text-[36.8px]"
                  >
                    {HEADING}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                    className="mt-4 text-[13.5px] leading-relaxed text-navy-600 lg:max-w-[92%] xl:text-[15px]"
                  >
                    {SUBTEXT}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
                    className="mt-7 flex w-full flex-col items-stretch gap-3 xl:w-auto xl:flex-row xl:items-start"
                  >
                    <CtaButtons />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* =========================================================
              MOBILE / TABLET — its own portrait artwork, with the copy
              sitting in the clear space it leaves beneath the desk.
          ========================================================= */}
          <div className="relative block w-full overflow-hidden lg:hidden">
            {/* Cropped from the top rather than shown whole: the file carries a
                long run of empty white below the wave that would otherwise open
                a gap between the desk and the copy. */}
            <img
              src={BG_MOBILE}
              alt=""
              aria-hidden="true"
              width={849}
              height={1852}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />

            {/* The padding-top is a share of the block's own width, so the copy
                always starts just under the wave however wide the screen is. */}
            <div className="relative px-6 pb-10 pt-[100%] text-left sm:px-8 sm:pb-12">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="h-display w-full text-[27px] leading-[1.1] tracking-tight text-navy-950"
              >
                {HEADING}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                className="mt-3 w-full text-[14.5px] leading-relaxed text-navy-600"
              >
                {SUBTEXT}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
                className="mt-6 flex w-full flex-col gap-2.5"
              >
                <CtaButtons compact />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
