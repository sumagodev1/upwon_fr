import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import { BarChart3, Workflow, Lightbulb, Settings } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchWhyUpwonProofSection } from '../../../../lib/whyUpwonPage.js';
import { whyUpwonIcon } from '../../../../lib/whyUpwonIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/* ============================================================
   Product proof

   why_product_proof.webp carries the dashboard plus four dashed
   connectors that run out to a coloured dot near each corner. The four
   callouts are laid over that artwork so each card's inner edge lands on
   its own dot, which makes the baked-in lines read as though they were
   drawn to the copy.

   Geometry: the artwork sits at 66% of the wrapper width, centred, so it
   spans 17% -> 83%. `left` and `width` below are percentages of the
   wrapper; `top` is a percentage of the artwork's height (the wrapper
   takes its height from the artwork), read off each dot and then pulled
   back by half a card.

   The copy, artwork and callouts are the CMS's now; these are what the
   section shows during the SSG build, while the fetch is in flight, and
   whenever the API is unreachable. A published callout keeps the corner -
   its box, colours and entrance - of the position it is published in.
   ============================================================ */

const ARTWORK_SRC = '/images/why_product_proof.webp';
const ARTWORK_ALT =
  'The UpWon dashboard showing sales, purchase, customer and product figures alongside performance charts and recent activity';
const SUBTEXT =
  'UpWon gives your teams a connected view of the information and workflows that matter most. From daily operations to high-level business decisions, the platform helps bring critical information into one place.';

const CALLOUTS = [
  {
    title: 'Complete Business Visibility',
    detail:
      'Get a clearer view of important business activity from one platform.',
    Icon: BarChart3,
    tile: 'bg-[#e8f1fe]',
    ink: 'text-[#2f6fed]',
    // blue dot — 3.97% / 6.45% of the artwork
    box: { left: '0%', width: '19.6%', top: '6.45%' },
    from: -22,
  },
  {
    title: 'Connected Workflows',
    detail:
      'Follow processes across teams and departments without switching between disconnected systems.',
    Icon: Workflow,
    tile: 'bg-[#f0ecfe]',
    ink: 'text-[#7c5cf0]',
    // purple dot — 96.8% / 11.6%
    box: { left: '80.9%', width: '19.1%', top: '11.6%' },
    from: 22,
  },
  {
    title: 'Actionable Insights',
    detail:
      'Turn operational information into insights that support better decisions.',
    Icon: Lightbulb,
    tile: 'bg-[#e8f5ee]',
    ink: 'text-[#1c9f6b]',
    // green dot — 3.3% / 59.2%
    box: { left: '0%', width: '19.2%', top: '59.2%' },
    from: -22,
  },
  {
    title: 'Centralized Control',
    detail:
      'Manage important workflows and business information from one connected environment.',
    Icon: Settings,
    tile: 'bg-[#fff0e4]',
    ink: 'text-[#f97316]',
    // orange dot — 96.7% / 61.6%
    box: { left: '80.8%', width: '19.2%', top: '61.6%' },
    from: 22,
  },
];

/* Sized against the wrapper so the cards track the artwork instead of
   jumping at breakpoints */
const CARD_PAD = 'clamp(12px, 1.15cqw, 20px)';
const CARD_TITLE = 'clamp(12.5px, 1.05cqw, 17px)';
const CARD_DETAIL = 'clamp(10.5px, 0.82cqw, 13.2px)';
const TILE = 'clamp(28px, 2.4cqw, 42px)';
const TILE_ICON = 'clamp(14px, 1.2cqw, 21px)';

export default function WhyUpwonProductProof() {
  const reduceMotion = useReducedMotion();
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchWhyUpwonProofSection().then((section) => {
      if (!cancelled && section) setCms(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // The artwork has four connectors, so at most four callouts; each takes the
  // corner of the built-in callout at its position.
  const callouts = cms
    ? cms.callouts.slice(0, CALLOUTS.length).map((callout, index) => ({
        ...CALLOUTS[index],
        title: callout.title,
        detail: callout.description,
        Icon: whyUpwonIcon(callout.icon),
      }))
    : CALLOUTS;
  // A CMS without artwork of its own keeps the shipped one.
  const artworkSrc = cms?.image ?? ARTWORK_SRC;
  const artworkAlt = cms?.image ? (cms.imageAlt ?? ARTWORK_ALT) : ARTWORK_ALT;

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.1), delayChildren: 0.05 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const artwork = {




    
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const calloutGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.09), delayChildren: 0.25 },
    },
  };

  const calloutFrom = (offset) => ({
    hidden: { opacity: 0, x: d(offset) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6f9ff] to-white py-10 sm:py-12 lg:py-14">
      {/* Soft light behind the dashboard, as in the layout */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#eaf0fd] opacity-60 blur-[110px]"
      />

      <Container className="relative z-10 !max-w-[1700px]">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          {(!cms || cms.eyebrow) && (
            <motion.div variants={fadeIn}>
              <Eyebrow className="justify-center">
                {cms ? cms.eyebrow : 'BUILT FOR VISIBILITY'}
              </Eyebrow>
            </motion.div>
          )}

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            {cms ? (
              <HeadingLines lines={cms.headingLines} />
            ) : (
              <>
                See Everything.{' '}
                <span className="gradient-text-orange">Control Everything.</span>
              </>
            )}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            {cms ? cms.subtext : SUBTEXT}
          </motion.p>
        </motion.div>

        {/* ================= DASHBOARD + CALLOUTS ================= */}
        <motion.div
          variants={calloutGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative mx-auto mt-8 w-full max-w-[1600px] [container-type:inline-size] lg:mt-10"
        >
          <motion.img
            variants={artwork}
            src={artworkSrc}
            alt={artworkAlt}
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto w-full lg:w-[66%]"
          />

          {/* ---------- Callouts pinned to the connectors (lg and up) ---------- */}
          {callouts.map(({ title, detail, Icon, tile, ink, box, from }, index) => (
            <div
              key={`${index}-${title}`}
              className="absolute hidden -translate-y-1/2 lg:block"
              style={box}
            >
              <motion.article
                variants={calloutFrom(from)}
                className="rounded-[14px] bg-white shadow-[0_12px_34px_rgba(25,35,55,0.09)] ring-1 ring-navy-950/[0.06]"
                style={{ padding: CARD_PAD }}
              >
                <span
                  className={`flex items-center justify-center rounded-[10px] ${tile}`}
                  style={{ width: TILE, height: TILE }}
                >
                  <Icon
                    className={ink}
                    strokeWidth={1.9}
                    style={{ width: TILE_ICON, height: TILE_ICON }}
                  />
                </span>

                <span
                  className="mt-3 block h-display font-bold leading-[1.2] tracking-tight text-navy-950"
                  style={{ fontSize: CARD_TITLE }}
                >
                  {title}
                </span>

                <span
                  className="mt-1.5 block leading-[1.45] text-navy-600"
                  style={{ fontSize: CARD_DETAIL }}
                >
                  {detail}
                </span>
              </motion.article>
            </div>
          ))}
        </motion.div>

        {/* ---------- Stacked callouts (below lg) ---------- */}
        <motion.div
          variants={calloutGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {callouts.map(({ title, detail, Icon, tile, ink }, index) => (
            <motion.article
              key={`${index}-${title}`}
              variants={fadeUp}
              className="rounded-[14px] bg-white p-5 shadow-[0_10px_28px_rgba(25,35,55,0.07)] ring-1 ring-navy-950/[0.06]"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${tile}`}
              >
                <Icon className={`h-5 w-5 ${ink}`} strokeWidth={1.9} />
              </span>

              <h3 className="mt-3 h-display text-[16px] font-bold leading-tight tracking-tight text-navy-950">
                {title}
              </h3>

              <p className="mt-1.5 text-[13.5px] leading-relaxed text-navy-600">
                {detail}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* ================= FOOTER RULE ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mt-8 flex max-w-3xl items-center gap-4 lg:mt-10"
        >
         
        </motion.div>
      </Container>
    </section>
  );
}
