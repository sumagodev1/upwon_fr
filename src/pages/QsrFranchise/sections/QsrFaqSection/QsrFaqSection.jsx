import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchQsrFranchiseFaqSection } from '../../../../lib/qsrFranchisePage.js';

/*
  QSR & franchise F&B "FAQ" — the practical questions multi-outlet and
  franchise teams ask before moving operations onto one platform.

  The brief gave the first answer as finished copy and the rest as positioning
  notes ("Position UpWon around…"), so those four are written out here in the
  site's voice. The note on central kitchens also asks for the exact product
  capabilities to be validated before publication.

  The fallback now: the published list is the CMS's, and this is what the
  section shows while the fetch is in flight, during the SSG build, and
  whenever the API is unreachable.
*/

const EASE = [0.22, 1, 0.3, 1];

const FAQS = [
  {
    q: 'What is QSR and franchise management software?',
    a: 'A connected business platform that can bring together core workflows such as procurement, recipes, production, inventory, central kitchens, outlets, workforce, sales, finance, reporting, and multi-location operations.',
  },
  {
    q: 'Can UpWon help manage central kitchens and multiple outlets?',
    a: 'Yes. Central production, inventory, stock movement and outlet requirements run through connected workflows, so what is produced centrally and what each outlet needs stay visible in the same system rather than being reconciled across separate sheets.',
  },
  {
    q: 'Can the platform support franchise and company-owned outlets?',
    a: 'Yes. Franchise-led, company-owned and multi-location outlets sit on one connected system, so head office and location teams work from the same operational information rather than reporting up through separate tools.',
  },
  {
    q: 'Can UpWon help manage inventory across outlets?',
    a: 'Yes. Ingredients, packaging materials, semi-finished goods and finished products stay visible as they move between warehouses, central kitchens and outlet locations, so stock position can be seen per location instead of assembled after the fact.',
  },
  {
    q: 'Can we start with selected solutions and expand later?',
    a: 'Yes. The suite is modular and connected, so most businesses start with whichever area is causing the most friction and adopt the rest as they go. Because the workflows share one platform, the data built up in the first phase carries into the next.',
  },
];

export default function QsrFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchQsrFranchiseFaqSection().then((section) => {
      if (!cancelled && section) setCms(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const faqs = cms ? cms.faqs : FAQS;

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
          {(!cms || cms.eyebrow) && (
            <Eyebrow className="justify-center">{cms ? cms.eyebrow : 'FAQ'}</Eyebrow>
          )}

          <h2 className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]">
            {cms ? (
              <HeadingLines lines={cms.headingLines} />
            ) : (
              <>
                Questions Food Brands{' '}
                <span className="gradient-text-orange">Ask Before They Switch.</span>
              </>
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base">
            {cms
              ? cms.subtext
              : 'Practical answers to what QSR and franchise teams want to know before moving kitchens, outlets and reporting onto one platform.'}
          </p>
        </motion.div>

        {/* ================= ACCORDION ================= */}
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-cream-300 rounded-2xl border border-cream-300 bg-white shadow-sm md:mt-12">
          {faqs.map((faq, index) => (
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
