import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

/*
  FMCG distribution "FAQ" — the practical questions distribution and
  supply chain teams ask before moving operations onto one platform.
*/

const EASE = [0.22, 1, 0.3, 1];

const FAQS = [
  {
    q: 'Can UpWon handle stock across multiple warehouses, branches and distribution points?',
    a: 'Yes. Inventory is managed across warehouses, distribution centers, branches and other storage locations in one system, so teams can see product availability and stock movement per location rather than reconciling separate registers. Stock transfers, inward and outward movements, and returns are tracked across the network.',
  },
  {
    q: 'How does batch and expiry tracking work for fast-moving products?',
    a: 'Products can be tracked at batch level through the distribution cycle, with visibility into expiry-sensitive inventory. That helps teams prioritise the right stock for dispatch, spot ageing inventory earlier, and reduce avoidable losses instead of discovering issues at the point of delivery.',
  },
  {
    q: 'We work through distributors and retailers. Does the platform cover that?',
    a: 'Yes. Distributor and channel operations connect to the same system as your internal workflows, so orders, stock movement and transactions across the channel stay visible to your team rather than sitting in separate spreadsheets or email threads.',
  },
  {
    q: 'Do we have to move every workflow across at once?',
    a: 'No. Most teams start with the area causing the most friction — commonly inventory visibility or order fulfillment — and connect procurement, warehousing, distribution and reporting as they go. Because the workflows share one platform, data built up in the first phase carries into the next.',
  },
  {
    q: 'Can it connect with the systems we already run?',
    a: 'Yes. UpWon can operate alongside your existing environment and connect through APIs and integration workflows for master data, orders, inventory and transactions, so adopting it does not require replacing everything you already have in place.',
  },
  {
    q: 'What visibility do managers get without asking the team for reports?',
    a: 'Dashboards and reports cover inventory, orders, warehouse movement, sales activity and overall distribution performance. The intent is that operational questions can be answered from the system directly, rather than through a manual consolidation exercise at the end of every week or month.',
  },
];

export default function FmcgFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-12 md:py-16">
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">FAQ</Eyebrow>

          <h2 className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]">
            Questions Distribution Teams{' '}
            <span className="gradient-text-orange">Ask Before They Switch.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base">
            Practical answers to what FMCG distribution teams want to know before
            moving inventory, orders and channel operations onto one platform.
          </p>
        </motion.div>

        {/* ================= ACCORDION ================= */}
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-cream-300 rounded-2xl border border-cream-300 bg-white shadow-sm md:mt-12">
          {FAQS.map((faq, index) => (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-cream-100 sm:p-6"
              >
                <span className="h-display text-[15px] font-semibold text-navy-950 sm:text-base md:text-lg">
                  {faq.q}
                </span>

                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-600 transition-transform"
                  style={{
                    transform:
                      openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-[14px] leading-relaxed text-navy-600 sm:px-6 sm:pb-6 sm:text-[15px]">
                      {faq.a}
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
