import { useEffect, useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { CheckCircle2, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/shared/Container/Container.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import HeadingLines from '../../components/shared/HeadingLines/HeadingLines.jsx';
import SectionIntro from '../../components/shared/SectionIntro/SectionIntro.jsx';
import ComparisonMatrix from '../../components/shared/ComparisonMatrix/ComparisonMatrix.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import { fetchVsSapAnswer, fetchVsSapComparison, fetchVsSapHero } from '../../lib/vsSapPage.js';

// The UpWon vs SAP Business One comparison page.
//
// Authored in the admin panel under Resource Page → UpWon vs SAP: the hero
// slides, "The straight answer" section (its heading and both cards) and the
// "Capability comparison" matrix (its copy, its capability rows and its "Total
// Cost of Ownership" labels) come from lib/vsSapPage.js once the API answers.
// Until then — and for good whenever it cannot answer — each is the built-in
// one below (and data/metrics.js's COMPETITORS for the matrix's rows), which is
// also exactly what the prerender bakes in, so hydration always matches. See
// lib/vsSapPage.js for the three rules every read follows.
//
// Not authored, deliberately: "THE MATH" band and its button, the SEO tags and
// the hero's two buttons stay in this file; the matrix's column headings, star
// legend and colours stay in ComparisonMatrix.jsx.

/* "The straight answer" — the built-in section. Its heading is the JSX in the
   section itself: the built-in render is the page exactly as it always was,
   and a published heading takes HeadingLines instead. */
const ANSWER_EYEBROW = 'The straight answer';
const WINS_TITLE = 'Why food & FMCG operators choose UpWon';
const WHEN_SAP_TITLE = 'When SAP B1 is the right choice';
const CLOSING_LINE = 'For 95% of Indian food & FMCG manufacturers, UpWon is the better fit.';

const WINS = [
  'Does 80% of what SAP B1 does for food manufacturers — at 20% of the cost',
  '5-year implementation becomes 30-45 day go-live',
  'No hidden consulting fees — domain depth reduces customisation to near-zero',
  'Indian regulatory compliance native — SAP requires costly Indianisation',
  'Sub-vertical editions for bakery, dairy, spices — unique to UpWon',
  'CEO can call the product team — SAP B1 clients cannot',
];

const WHEN_SAP = [
  'Global multi-currency operations across 20+ countries',
  'Manufacturing at scale beyond food/FMCG (heavy industry, automotive)',
  'A dedicated 10+ person IT team to maintain the deployment',
  'Budget approved at Fortune 500 levels with 18-month rollout patience',
];


const HERO_ACCENT = '#E85A2A';

/* Hero backdrops — the site’s shared hero artwork: the built-in slide's, and
   the one a published slide with no picture of its own falls back to. This
   page has never had dedicated hero photography of its own; an upload in the
   admin panel's Hero Section is how it gets some. */
const HERO_BG_A = '/images/hero%20bg.webp';

/* Hero buttons — the same two on every slide, built-in or published. They
   are not authored in the admin panel. */
const HERO_CTA = { label: 'Request a Demo', to: '/demo' };
const HERO_SECONDARY_CTA = { label: 'Calculate Your ROI', to: '/roi-calculator' };

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'HONEST COMPARISON',
    headline:
      'UpWon vs SAP Business One — Where Each One Wins.',
    subhead:
      'The straight comparison most vendors won\'t give you. Built for Food & FMCG operators making a real evaluation decision.',
    bg: HERO_BG_A,
    accent: HERO_ACCENT,
    cta: HERO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
];

/*
  The published slides in the shape of HERO_SLIDES.

  Only the words and the pictures are authored; the accent and the two buttons
  are the page's own and stay put. A field lib/vsSapPage.js could not vouch for
  arrives as null and takes its built-in value — the eyebrow the built-in
  slide's, the backdrop HERO_BG_A.
*/
function toHeroSlides(published) {
  if (!published) return HERO_SLIDES;

  const [builtIn] = HERO_SLIDES;
  return published.map((slide) => ({
    eyebrow: slide.eyebrow ?? builtIn.eyebrow,
    headline: slide.heading,
    subhead: slide.subtext,
    bg: slide.image ?? HERO_BG_A,
    // Null means no phone crop; HeroSlider then serves `bg` to every viewport.
    mobileBg: slide.mobileImage,
    accent: HERO_ACCENT,
    cta: HERO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  }));
}

/* The matrix's columns on this page — UpWon, SAP B1 and Oracle NetSuite. */
const MATRIX_SUBSET = ['upwon', 'sap', 'netsuite'];

/*
  The published matrix as ComparisonMatrix's OPTIONAL props — or none at all,
  which is the matrix exactly as it always rendered here.

  WHICH ROWS WIN. The published ones whenever the matrix HAS capability rows —
  and that includes an empty list. `hasCapabilities` is the API saying whether
  any capability row exists at all, ACTIVE or not, so "every row is switched
  off" (render no rows — somebody chose that) stops being the same answer as
  "no row exists" (nothing authored, keep data/metrics.js's COMPETITORS, which
  is what leaving `rows` out does). See lib/vsSapPage.js.

  The copy and the TCO labels are the section's own and swap whenever it is
  published; a null eyebrow or TCO label keeps the matrix's built-in one.
*/
function toMatrixProps(comparison) {
  if (!comparison) return {};

  return {
    copy: {
      eyebrow: comparison.eyebrow,
      heading: comparison.heading,
      subtext: comparison.subtext,
    },
    tco: comparison.tco,
    ...(comparison.hasCapabilities ? { rows: comparison.capabilities } : {}),
  };
}

export default function VsSapPage() {
  /*
    Each section starts as the built-in one and is swapped for the published
    one once the API answers — the same order as every other authored page on
    the site. Every fetch resolves to null for every failure (unconfigured,
    offline, CORS, nothing authored), and null means "keep what you have".
    The three are independent, so each lands on its own.
  */
  const [hero, setHero] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchVsSapHero().then((published) => {
      if (!cancelled && published) setHero(published);
    });
    fetchVsSapAnswer().then((published) => {
      if (!cancelled && published) setAnswer(published);
    });
    fetchVsSapComparison().then((published) => {
      if (!cancelled && published) setComparison(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const heroSlides = useMemo(() => toHeroSlides(hero), [hero]);
  const matrixProps = useMemo(() => toMatrixProps(comparison), [comparison]);

  // The two cards' words, published or built-in. The points are keyed by
  // position below: they are authored strings, and the server does not promise
  // two of them are never the same.
  const winsTitle = answer?.upwonTitle ?? WINS_TITLE;
  const wins = answer?.upwonPoints ?? WINS;
  const whenSapTitle = answer?.sapTitle ?? WHEN_SAP_TITLE;
  const whenSap = answer?.sapPoints ?? WHEN_SAP;
  const closingLine = answer?.closingLine ?? CLOSING_LINE;

  return (
    <>
      <Seo
        title="UpWon vs SAP Business One — Honest Comparison for Food Manufacturers"
        description="Side-by-side on cost, time-to-go-live, food fit and multi-plant — when SAP wins, when UpWon wins. An honest comparison from an Indian food-ERP team."
        canonical="https://upwon.in/compare/upwon-vs-sap"
      />
      <HeroSlider
        slides={heroSlides}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      {/* Side-by-side honest cards */}
      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionIntro
            eyebrow={answer?.eyebrow ?? ANSWER_EYEBROW}
            title={
              answer ? (
                <HeadingLines lines={answer.headingLines} />
              ) : (
                <>
                  When UpWon Wins. When SAP Wins.{' '}
                  <span className="gradient-text-orange">No Spin.</span>
                </>
              )
            }
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-orange-300 bg-orange-50 p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                {winsTitle}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-navy-900">
                {wins.map((w, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                    {w}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="rounded-2xl border border-cream-300 bg-white p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-700">
                {whenSapTitle}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-navy-700">
                {whenSap.map((w, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] italic text-navy-600">
                {closingLine}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <ComparisonMatrix subset={MATRIX_SUBSET} {...matrixProps} />

      {/* Cost / Time visual */}
      <section className="relative overflow-hidden bg-navy-950 py-10 text-white sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <Container className="relative">
          <SectionIntro
            variant="dark"
            eyebrow="THE MATH"
            title={
              <>
                SAP B1: 18 Months, ₹2-5 Cr to Go Live.{' '}
                <span className="gradient-text-orange">
                  UpWon: 30-45 Days, a Fraction of the Cost.
                </span>
              </>
            }
            description="The two numbers that decide most evaluations, side by side — before a single feature is compared."
          />

          <div className="mt-8 grid gap-4 lg:mt-10 md:grid-cols-3">
            {[
              { label: 'Time to go-live', upwon: '30-45 days', sap: '12-18 months' },
              { label: 'Customisation depth needed', upwon: 'Near-zero', sap: 'Heavy' },
              { label: 'Ongoing consultant dependency', upwon: 'None', sap: 'Yes' },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-cream-100/60">
                  {row.label}
                </p>
                <p className="num-display mt-3 text-xl text-orange-400">{row.upwon}</p>
                <p className="text-[14px] text-cream-100/50">UpWon</p>
                <div className="mt-3 h-px bg-white/10" />
                {/* <p className="num-display mt-3 text-xl text-cream-100/70">{row.sap}</p> */}
                <p className="num-display mt-3 text-xl text-white/85">{row.sap}</p>
                <p className="text-[14px] text-cream-100/50">SAP B1</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/demo" className="btn-primary-glow">
              See UpWon vs your current ERP — live
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* <DemoCtaCompact title="See the comparison live on your data." /> */}
    </>
  );
}
