import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  HRMS "FAQ" — pre-empts the specific questions an HR / payroll buyer asks before
  switching systems. Practical, migration- and compliance-focused answers, in the
  page's standard heading style + accordion.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'FAQ';
const HEADING_LINES = [
  [
    { text: 'Questions HR Leaders ', accent: false },
    { text: 'Ask Before They Commit.', accent: true },
  ],
];
const SUBTEXT =
  'Practical, migration- and compliance-focused answers — the questions HR and payroll leaders actually ask before switching systems.';

const FAQS = [
  {
    q: 'Can this handle our factory shifts and our office staff in one system?',
    a: 'Yes. HREasy runs multi-shift factory rostering with biometric and geo-fenced attendance for the plant, and standard 9-to-5 leave & attendance for office staff — on one platform, one login and one payroll. Field and franchise teams sit on the same system too.',
  },
  {
    q: 'How do you migrate our existing payroll history?',
    a: 'Through a structured migration: we audit your current data, migrate the employee master, salary structures and history, then run your new payroll in parallel with your existing system for a full cycle to reconcile every number. Nothing goes live until it matches.',
  },
  {
    q: 'Is statutory compliance guaranteed to be accurate across every state we operate in?',
    a: 'PF, ESI, PT, TDS and LWF are calculated at current rates with state-specific rules built in, and returns are filing-ready every cycle. Multi-state operations are handled natively — no separate spreadsheets per state, no month-end scramble.',
  },
  {
    q: 'Does it work for contract and casual labour, not just permanent staff?',
    a: 'Yes. Permanent, contract, casual, piecework and daily-wage staff all run in the same payroll cycle, with Factories Act and contract-labour documentation and compliance tracked in one place.',
  },
  {
    q: 'Can we start with just Core and upgrade later?',
    a: 'Absolutely. Start with Core HR & payroll, then move up to Pro or Plus as you grow — your data and history carry forward with no re-implementation or re-entry. You only pay for the depth you need today.',
  },
  {
    q: "What happens if there's an error in a live payroll run?",
    a: 'The parallel-run step is designed to catch issues before anyone is paid, and every live run passes through controlled checks with expert supervision. If a correction is needed, there is a clear audit trail and controlled reprocessing — plus ongoing support from the team that builds the product.',
  },
];

export default function HrmsFaq({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const faqs = section && section.faqs.length > 0 ? section.faqs : FAQS;

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-12 md:py-16">
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <Container className="relative">
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
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-cream-300 rounded-2xl border border-cream-300 bg-white shadow-sm">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-cream-100"
              >
                <span className="h-display text-base font-semibold text-navy-950 md:text-lg">
                  {f.q}
                </span>
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-600 transition-transform"
                  style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[15px] leading-relaxed text-navy-600">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
