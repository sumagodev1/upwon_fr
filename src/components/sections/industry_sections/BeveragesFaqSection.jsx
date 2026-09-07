import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

/*
  Beverages & juices "FAQ" — the practical questions beverage teams ask before
  moving operations onto one platform.

  The brief gave the first answer as finished copy and the rest as positioning
  notes ("Position UpWon around…"), so those five are written out here in the
  site's voice. The notes on production, quality and shelf life also ask for
  the exact product capabilities to be validated before publication.
*/

const EASE = [0.22, 1, 0.3, 1];

const FAQS = [
  {
    q: 'What is beverage and juice ERP software?',
    a: 'A connected business platform that can bring together workflows such as procurement, ingredients, recipes, production, quality inspection, inventory, packaging, warehousing, sales, finance, reporting, and distribution.',
  },
  {
    q: 'Can UpWon help manage ingredients, recipes, and production workflows?',
    a: 'Yes. Ingredient availability, recipe requirements, bills of materials, production activity, inventory movement and finished-product workflows run through one system, so what is on hand, what is being made and where it has moved stay visible together rather than across separate registers.',
  },
  {
    q: 'Can the platform support quality inspection and packaging workflows?',
    a: 'Yes. Quality inspection touchpoints connect to the production and packaging workflows they cover, so checks stay attached to what is moving through the line instead of being reconstructed from paper afterwards.',
  },
  {
    q: 'Can UpWon help manage inventory and shelf-life related workflows?',
    a: 'Yes. Stock, inventory movement and freshness-related operational requirements stay visible in the same system, so what is held where — and how long it has been there — can be seen per location rather than assembled from separate sheets.',
  },
  {
    q: 'Can UpWon support sales and distribution operations?',
    a: 'Yes. Sales orders, inventory availability, distributors, retailers, customers and dispatch activity run through connected workflows, so distribution stays visible to your team alongside what is actually in stock.',
  },
  {
    q: 'Can we start with selected solutions and expand later?',
    a: 'Yes. The suite is modular and connected, so most businesses start with whichever area is causing the most friction and adopt the rest as they go. Because the workflows share one platform, the data built up in the first phase carries into the next.',
  },
];

export default function BeveragesFaqSection() {
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
            Questions Beverage Teams{' '}
            <span className="gradient-text-orange">Ask Before They Switch.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base">
            Practical answers to what beverage and juice teams want to know
            before moving production, quality and distribution onto one
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
