import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  VMS "FAQ" — pre-empts the practical questions procurement and
  sourcing leaders ask before adopting a vendor management platform.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'FAQ';
const HEADING_LINES = [
  [
    { text: 'Questions Procurement Leads ', accent: false },
    { text: 'Ask Before They Commit.', accent: true },
  ],
];
const SUBTEXT =
  'Practical, adoption-focused answers to the questions procurement teams ask before bringing vendors onto a new management platform.';

const FAQS = [
  {
    q: 'Will our existing vendors actually use a self-service portal?',
    a: 'Yes. The portal is designed for vendors, not just procurement teams. Vendors get a simple workspace to manage their profile, submit documents, respond to RFQs, update pricing, track purchase orders and invoices, and respond to requests without needing extensive training. The experience is kept focused so suppliers can get started quickly.',
  },
  {
    q: 'Can we start with just our top 20 vendors?',
    a: 'Absolutely. You can start with a focused group of strategic or high-value vendors, prove the workflow, and expand from there. Existing vendor records, documents, contracts and transaction history can continue to build into the same system as you onboard more suppliers.',
  },
  {
    q: "Does this integrate with our existing ERP if we're not on UpWon ERP?",
    a: 'Yes. UpWon VMS can operate independently and connect with your existing ERP environment. Vendor, item, purchase order, pricing and transaction data can be connected through APIs and integration workflows, so you do not need to replace your ERP to start improving vendor management.',
  },
  {
    q: 'How does vendor quality scoring actually work — is it manual or automatic?',
    a: 'It can use both. Operational data such as delivery performance, rejection rates, quality issues, response times and purchase history can contribute to vendor performance scores automatically, while procurement teams can add structured assessments where human judgement is required. This creates a more consistent scorecard without removing buyer oversight.',
  },
  {
    q: 'Is our rate contract and pricing data visible to anyone outside our team?',
    a: 'No. Pricing, rate contracts, commercial terms and vendor information are protected through role-based access controls. Your procurement team decides who can view or manage sensitive commercial information, while vendors only see the information and transactions relevant to their relationship with your business.',
  },
  {
    q: 'What support do vendors get if they struggle with the portal?',
    a: 'Vendors get a guided digital experience with clear workflows and support resources to help them complete common tasks. Your procurement team also has visibility into onboarding progress and can identify vendors who need assistance, making adoption easier without turning every supplier question into a manual process.',
  },
];

export default function VmsFaqSection() {
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

          {subtext && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
              {subtext}
            </p>
          )}
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
                  style={{
                    transform:
                      openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[15px] leading-relaxed text-navy-600">
                      {f.a}
                    </div>
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
