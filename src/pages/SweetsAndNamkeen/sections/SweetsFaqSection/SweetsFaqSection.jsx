import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  Sweets and namkeen "FAQ" — the practical questions owners and production
  teams ask before moving operations onto one platform.
*/

const EASE = [0.22, 1, 0.3, 1];

const FAQS = [
  {
    q: 'How does the platform help us plan for festival peaks?',
    a: 'Production and procurement planning work from your own sales and inventory history rather than memory, so a Diwali or Eid ramp can be modelled ahead of the season. Peaks will always be demanding, but the aim is to enter them knowing what needs to be produced, packed and stocked at each outlet.',
  },
  {
    q: 'Can we track batches and expiry across perishable sweets?',
    a: 'Yes. Products can be tracked at batch level with visibility into expiry-sensitive inventory and quality inspection touchpoints, so older stock moves first and ageing inventory is visible before it becomes a write-off rather than being discovered at the counter.',
  },
  {
    q: 'We sell loose by weight in many pack sizes. Does billing handle that?',
    a: 'Counter billing supports weight-based selling across multi-size SKUs, so the same product sold loose, in a 250g box or in a festival pack stays one item in your catalogue with its own pricing. That keeps the counter fast and keeps outlet sales reconciling back to stock.',
  },
  {
    q: 'How do we keep quality consistent across outlets?',
    a: 'Recipes are held with controlled, versioned access and central-kitchen to outlet flows are managed in one place. Combined with batch-level traceability, that gives you a record of what was produced where and to which version — which is also what a food-safety recall needs.',
  },
  {
    q: 'We work through outlets and distributors. Does the platform cover both?',
    a: 'Yes. Outlet operations and distributor movement connect to the same system as production and inventory, so orders, dispatch and stock across the channel stay visible to your team instead of sitting in separate registers or chat threads.',
  },
  {
    q: 'Do we have to replace our billing or accounting system to start?',
    a: 'No. Most businesses start with the area causing the most friction — commonly inventory, production planning or outlet coordination — and connect the rest as they go. UpWon can operate alongside your current environment and connect through APIs and integration workflows for master data, orders and transactions.',
  },
];

export default function SweetsFaqSection() {
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
            Questions Sweets &amp; Namkeen Owners{' '}
            <span className="gradient-text-orange">Ask Before They Switch.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base">
            Practical answers to what sweets and namkeen teams want to know before
            moving production, inventory and outlet operations onto one platform.
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
