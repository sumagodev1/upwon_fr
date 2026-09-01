import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

/*
  Bakery & Confectionery "FAQ" — the practical questions bakery owners and
  production teams ask before moving operations onto one platform.
*/

const EASE = [0.22, 1, 0.3, 1];

const FAQS = [
  {
    q: 'Can we see what a product actually costs when ingredient prices keep moving?',
    a: 'Yes. Recipes and formulations are held in the system with their ingredient quantities, so when purchase rates for inputs like sugar, maida or ghee change, the cost impact can be seen against the products that use them. Ingredient substitutions can be modelled the same way, rather than reworking costing sheets by hand.',
  },
  {
    q: 'How does the platform help reduce daily wastage?',
    a: 'Shelf life and expiry are tracked at batch level with FEFO dispatch, so older stock moves first and ageing inventory is visible before it becomes a write-off. Production, dispatch and outlet stock sit in the same system, which makes it easier to see where wastage is actually occurring instead of discovering it at month-end.',
  },
  {
    q: 'Our custom cake orders come in over calls and WhatsApp. Can those be managed here?',
    a: 'Yes. Custom and special orders can be recorded as structured orders with their delivery date, specification and outlet, so they carry through to production planning and dispatch. The intent is that an order stops living only in a chat thread where it can be missed or entered twice.',
  },
  {
    q: 'How do we keep quality consistent across multiple outlets?',
    a: 'Recipes are versioned with controlled access, and central-kitchen to outlet flows are managed in one place. Combined with batch-level traceability, that gives you a record of what was produced where and to which version of the recipe — which is also what a food-safety recall needs.',
  },
  {
    q: 'What happens during festival and wedding-season peaks?',
    a: 'Production and procurement planning work from your own sales and inventory history rather than memory, so seasonal ramps can be planned ahead. Peaks will always be demanding, but the aim is to enter them with visibility into what needs to be produced, packed and stocked at each outlet.',
  },
  {
    q: 'Do we have to replace our existing billing or accounting system to start?',
    a: 'No. Most bakeries start with the area causing the most friction — commonly inventory, production planning or outlet coordination — and connect the rest as they go. UpWon can operate alongside your current environment and connect through APIs and integration workflows for master data, orders and transactions.',
  },
];

export default function BakeryFaqSection() {
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
            Questions Bakery Owners{' '}
            <span className="gradient-text-orange">Ask Before They Switch.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base">
            Practical answers to what bakery and confectionery teams want to know
            before moving production, inventory and outlet operations onto one
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
