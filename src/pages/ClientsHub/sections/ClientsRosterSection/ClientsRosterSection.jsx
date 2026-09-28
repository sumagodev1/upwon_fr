import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import TrustStrip, { CLIENT_LOGOS } from '../../../../components/shared/TrustStrip/TrustStrip.jsx';
import { fetchClientsRoster } from '../../../../lib/clientsPage.js';

/*
  Client Roster
  "Trusted by India's Leading Food & FMCG Brands." on /clients

  Authored in the admin panel (Clients → Roster Logos): the eyebrow, heading
  and subtext as section copy, and one row per marquee logo. Whatever the page
  puts below the marquee (the deployment map) comes in as `children`.
*/

const EASE = [0.22, 1, 0.3, 1];

const HEADING_VIEWPORT = { once: true, amount: 0.1 };

const HEADING_GROUP = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/*
  The built-in section - what the SSG build prerenders and what renders if the
  API is unreachable. Written in the shape lib/clientsPage.js returns.
*/
const FALLBACK = {
  eyebrow: 'THE UPWON ROSTER',
  headingLines: [
    [
      { text: 'Trusted by India’s Leading ', accent: false },
      { text: 'Food & FMCG Brands.', accent: true },
    ],
  ],
  subtext:
    'Bakery chains, dairy brands, sweet houses, beverage makers, QSR networks and FMCG distributors — running live across 10 states and counting.',
  logos: CLIENT_LOGOS,
};

export default function ClientsRosterSection({ children = null }) {
  // Swapped for the published section once the API answers; null keeps this.
  const [section, setSection] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchClientsRoster().then((published) => {
      if (cancelled || !published) return;
      setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <Container className="relative">
        <motion.div
          variants={HEADING_GROUP}
          initial="hidden"
          whileInView="visible"
          viewport={HEADING_VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          {section.eyebrow && (
            <motion.div variants={FADE_IN}>
              <Eyebrow className="justify-center">{section.eyebrow}</Eyebrow>
            </motion.div>
          )}

          <motion.h2
            variants={FADE_UP}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            <HeadingLines lines={section.headingLines} />
          </motion.h2>

          {section.subtext && (
            <motion.p
              variants={FADE_UP}
              className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              {section.subtext}
            </motion.p>
          )}
        </motion.div>

        {/* Real client artwork rather than TrustStrip's default typographic
            brand marks — this is the roster page, so the logos themselves
            carry it. */}
        <div className="mt-8 lg:mt-10">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-500">
            Trusted by operations leaders at
          </p>
          <div className="mt-6">
            <TrustStrip embedded logos={section.logos} />
          </div>
        </div>

        {children}
      </Container>
    </section>
  );
}
