import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  Engineering & manufacturing "FAQ" — the practical questions manufacturing
  teams ask before moving operations onto one platform.

  The brief gave the first answer as finished copy and the rest as positioning
  notes ("Position UpWon around…"), so those five are written out here in the
  site's voice. The notes on planning, bill of materials and quality also ask
  for the exact product and scheduling capabilities to be validated before
  publication.
*/

const EASE = [0.22, 1, 0.3, 1];

const FAQS = [
  {
    q: 'What is engineering and manufacturing ERP software?',
    a: 'A connected business platform that can bring together workflows such as procurement, raw materials, bill of materials, production planning, quality inspection, inventory, warehousing, sales, finance, reporting, and dispatch.',
  },
  {
    q: 'Can UpWon help manage production planning and scheduling?',
    a: 'Yes. Production requirements, material availability, resource planning, production activity and work progress run through one system, so what is planned, what is available and how far a job has moved stay visible together rather than across separate registers.',
  },
  {
    q: 'Can the platform support bill of materials and inventory workflows?',
    a: 'Yes. Bills of materials connect to material requirements, raw-material availability, inventory movement and finished-product workflows, so what a product needs and what is actually in stock sit in the same place.',
  },
  {
    q: 'Can UpWon support quality inspection in manufacturing?',
    a: 'Yes. Quality inspection touchpoints connect to the procurement and production workflows they cover, so checks stay attached to the materials and products moving through the plant instead of being reconstructed from paper afterwards.',
  },
  {
    q: 'Can UpWon support warehouse operations for manufacturing businesses?',
    a: 'Yes. Receiving, inventory, storage, transfers, picking, packing, shipping and material movement run through connected workflows, so stock position and movement can be seen per location rather than assembled from separate sheets.',
  },
  {
    q: 'Can we start with selected solutions and expand later?',
    a: 'Yes. The suite is modular and connected, so most businesses start with whichever area is causing the most friction and adopt the rest as they go. Because the workflows share one platform, the data built up in the first phase carries into the next.',
  },
];

export default function EngineeringFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-10 md:py-12">
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
            Questions Manufacturing Teams{' '}
            <span className="gradient-text-orange">Ask Before They Switch.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base">
            Practical answers to what engineering and manufacturing teams want
            to know before moving procurement, production and dispatch onto one
            platform.
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
