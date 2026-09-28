// WmsFaqSection.jsx
import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  WMS "FAQ" — pre-empts the practical questions warehouse and plant heads
  ask before committing. Focused on rollout, integration, hardware,
  temperature-controlled operations and FEFO enforcement.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'FAQ';
const HEADING_LINES = [
  [
    { text: 'Questions Warehouse & Plant Heads ', accent: false },
    { text: 'Ask Before They Commit.', accent: true },
  ],
];
const SUBTEXT =
  'Practical answers to the rollout, integration and operational questions warehouse leaders ask before choosing a WMS.';

const FAQS = [
  {
    q: 'Does this handle multiple temperature zones in one warehouse?',
    a: 'Yes. UPWON WMS can manage inventory across ambient, chilled, frozen and other defined storage zones within the same warehouse. Stock movements, storage locations and operational rules can be configured around each zone so teams always know where inventory belongs.',
  },
  {
    q: 'Can we roll this out warehouse by warehouse instead of all at once?',
    a: 'Absolutely. You can begin with one warehouse or plant, stabilise the processes and workflows, and then expand to additional locations in phases. This reduces operational risk and allows your team to build confidence before a wider rollout.',
  },
  {
    q: "Does it integrate with our existing ERP if we're not on UPWON ERP?",
    a: 'Yes. UPWON WMS is designed to connect with existing ERP and business systems through configurable integrations and APIs. You do not need to replace your current ERP to improve warehouse operations — the WMS can exchange the required inventory, order and movement data with your existing systems.',
  },
  {
    q: 'What hardware do we need for barcode or RFID operations?',
    a: 'The exact setup depends on your workflow, but most barcode operations require compatible handheld scanners, mobile devices or fixed scanning points along with label printers where needed. For RFID, compatible RFID readers and tags are required. We help define the hardware setup based on your warehouse process and tracking requirements.',
  },
  {
    q: 'How is FEFO actually enforced — automatically, or as a suggestion?',
    a: 'FEFO rules can be configured into the operational workflow so the system identifies the stock with the earliest eligible expiry for allocation and picking. Depending on your process controls, the recommended stock can be enforced through validation rather than treated as only a manual suggestion, helping reduce expiry-related errors.',
  },
  {
    q: 'Can we go live in one plant first and expand later?',
    a: 'Yes. A single-plant go-live is a practical way to validate master data, integrations, scanning workflows and team adoption in a live environment. Once the process is stable, the same foundation can be extended to additional plants, warehouses and depots without starting the implementation again.',
  },
];

export default function WmsFaqSection({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const faqs = section && section.faqs.length > 0 ? section.faqs : FAQS;

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-12 md:py-16">
      {/* Background */}
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
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
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-cream-100"
                >
                  <span className="h-display text-base font-semibold text-navy-950 md:text-lg">
                    {faq.q}
                  </span>

                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-600 transition-transform duration-300"
                    style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: EASE },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[15px] leading-relaxed text-navy-600">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}