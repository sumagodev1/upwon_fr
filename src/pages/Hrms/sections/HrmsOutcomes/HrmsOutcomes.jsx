import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  HRMS "Customer Outcomes" — specific, named proof. Luft Food as the flagship
  story, Monginis / Galadhar Foods as the second — both real, named and already
  published. Case-study cards adapted from the reference: a branded stat panel
  (in place of a screenshot), the story, and a read-more link.
  FLAG: sign-off on exact quote wording before republishing with names attached.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Customer Outcomes';
const HEADING_LINES = [
  [
    { text: '95% Fewer HR Errors. 40% Less Admin Time. ', accent: false },
    { text: 'One System, Three Business Verticals.', accent: true },
  ],
];
const SUBTEXT =
  'Named, published results from manufacturers running their whole workforce on HREasy — office, plant and field, on one platform.';

const CASES = [
  {
    name: 'Luft Food',
    logo: null,
    tag: 'Flagship Story',
    heroStat: '95%',
    heroLabel: 'fewer HR errors',
    mini: [
      { v: '250+', l: 'Employees' },
      { v: '3', l: 'Verticals' },
      { v: '40%', l: 'Less admin' },
    ],
    desc: 'Luft Food runs 250+ employees across three business verticals — office, plant and field — on one HREasy system. Manual HR errors fell sharply and month-end stopped being a compliance emergency.',
    linkLabel: 'Read story',
    to: '/resources',
  },
  {
    name: 'Monginis',
    logo: '/images/testimonial/mongignis.webp',
    tag: 'Franchise Scale',
    heroStat: '140',
    heroLabel: 'outlets on one HR system',
    mini: [
      { v: '3', l: 'Factories' },
      { v: '7 yrs', l: 'Partnership' },
      { v: '1', l: 'Platform' },
    ],
    desc: 'Monginis (Galadhar Foods) manages 3 factories and 140 retail outlets on one HR system — a seven-year journey scaling HR across plants and franchise outlets without stitching separate tools together.',
    linkLabel: 'Read story',
    to: '/resources',
  },
];

function CaseCard({ c, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
      className="flex flex-col rounded-3xl border border-cream-300 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise md:p-7"
    >
      {/* Branded stat panel */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 p-8 text-white md:p-9">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
          style={{ background: 'rgba(232,90,42,0.25)' }}
        />
        <p className="num-display text-6xl text-orange-500">{c.heroStat}</p>
        <p className="mt-1.5 text-base text-cream-100/80">{c.heroLabel}</p>
        {/* The rule and the small figures only when there are any to draw. */}
        {c.mini.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-white/15 pt-5">
            {c.mini.map((m) => (
              <div key={m.l}>
                <p className="num-display text-lg text-white">{m.v}</p>
                <p className="text-[11px] uppercase tracking-wide text-cream-100/55">{m.l}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Client + tag */}
      <div className="mt-5 flex items-center justify-between gap-3">
        {c.logo ? (
          <img src={c.logo} alt={c.name} className="h-7 w-auto max-w-[130px] object-contain" />
        ) : (
          <span className="h-display text-xl tracking-tight text-navy-950">{c.name}</span>
        )}
        {c.tag && (
          <span className="rounded-md bg-orange-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-orange-600">
            {c.tag}
          </span>
        )}
      </div>

      {/* Story */}
      <p className="mt-3 text-[15px] leading-relaxed text-navy-600">{c.desc}</p>

      {/* Read story */}
      <div className="mt-auto pt-5">
        <Link
          to={c.to}
          className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-950"
        >
          {c.linkLabel}
          <ArrowRight className="h-4 w-4 text-orange-500 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function HrmsOutcomes({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const cases = section && section.cases.length > 0 ? section.cases : CASES;

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          {subtext && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
              {subtext}
            </p>
          )}
        </motion.div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-8 md:grid-cols-2">
          {cases.map((c, i) => (
            <CaseCard key={c.name} c={c} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
