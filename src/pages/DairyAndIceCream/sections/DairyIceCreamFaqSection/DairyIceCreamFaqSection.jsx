import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  Dairy & ice cream "FAQ" — the practical questions plant and distribution
  teams ask before moving operations onto one platform.
*/

const EASE = [0.22, 1, 0.3, 1];

const FAQS = [
  {
    q: 'What is dairy and ice cream ERP software?',
    a: 'A connected business platform that brings together the core workflows of a dairy or ice cream business — procurement, raw materials, production, quality, inventory, cold storage, warehouses, sales, distribution, finance and reporting — so those teams work from shared information rather than separate tools and registers.',
  },
  {
    q: 'Can UpWon help manage production batches and quality workflows?',
    a: 'Yes. Production batches, quality inspection touchpoints, inventory movement and finished-product workflows connect to the same system, so what was produced, under which batch, and how it tested stay together instead of being reconstructed from paper after the fact.',
  },
  {
    q: 'Can the platform support multiple plants and storage locations?',
    a: 'Yes. Inventory and activity are tracked across plants, production facilities, cold storage, warehouses, distribution points and other operational locations in one system, so stock position and movement can be seen per location rather than assembled from separate sheets.',
  },
  {
    q: 'Can UpWon support dairy and ice cream sales and distribution?',
    a: 'Yes. Sales orders, inventory availability, distributors, retailers, customers and distribution activity run through connected workflows, so dispatch and channel movement stay visible to your team alongside what is actually in stock.',
  },
  {
    q: 'Can we start with selected solutions and expand later?',
    a: 'Yes. The suite is modular and connected, so most businesses start with whichever area is causing the most friction and adopt the rest as they go. Because the workflows share one platform, the data built up in the first phase carries into the next.',
  },
];

export default function DairyIceCreamFaqSection() {
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
            Questions Dairy Teams{' '}
            <span className="gradient-text-orange">Ask Before They Switch.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base">
            Practical answers to what dairy and ice cream teams want to know
            before moving production, quality and distribution onto one platform.
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
