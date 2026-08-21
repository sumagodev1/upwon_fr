import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function IndustryFaq({
  faqs,
  eyebrow = 'Industry-Specific Questions',
  title,
  description = 'Verbatim from real conversations with operators in this vertical.',
}) {
  const [openIndex, setOpenIndex] = useState(0); // first one open by default

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream-100 py-10 md:py-14">
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow={eyebrow}
          title={title || 'Questions we hear — answered honestly.'}
          description={description}
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-cream-300 rounded-2xl border border-cream-300 bg-white shadow-sm">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-cream-100"
              >
                <span className="h-display text-base font-semibold text-navy-950 md:text-lg">
                  {f.q}
                </span>
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-600 transition-transform"
                  style={{
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
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
                    <div className="px-6 pb-6 text-sm leading-relaxed text-charcoal md:text-[15px]">
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
