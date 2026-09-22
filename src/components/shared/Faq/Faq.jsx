import { Head } from 'vite-react-ssg';
import { Plus } from 'lucide-react';
import { faqJsonLd } from '../Seo/Seo.jsx';

// Reusable, SEO-first FAQ accordion. Two deliberate choices:
//
//  1. Native <details>/<summary> — fully crawlable (answers are in the HTML
//     even when collapsed), accessible and zero-JS, so it works in the
//     prerendered output with no hydration mismatch.
//  2. `withSchema` (default on) emits a matching FAQPage JSON-LD into <head>
//     via the same faqJsonLd() builder, so the structured data is generated
//     from the exact same array the UI renders — they can never drift.
//
// Usage:
//   <Faq
//     faqs={[{ q: '…', a: '…' }, …]}
//     heading="Common questions"
//   />
export default function Faq({
  faqs = [],
  heading,
  withSchema = true,
  className = '',
}) {
  if (!faqs.length) return null;

  return (
    <section className={className} aria-label={heading || 'Frequently asked questions'}>
      {withSchema && (
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(faqJsonLd(faqs))}
          </script>
        </Head>
      )}

      {heading && (
        <h2 className="h-display text-2xl font-bold text-navy-950 md:text-3xl">
          {heading}
        </h2>
      )}

      <div className="mt-6 space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={faq.q || i}
            className="group rounded-2xl border border-cream-300 bg-white open:border-orange-200 open:bg-orange-50/40 open:shadow-enterprise"
          >
            <summary className="flex cursor-pointer list-none items-start gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
              <h3 className="min-w-0 flex-1 font-display text-[15.5px] font-bold leading-snug text-navy-950 md:text-[17px]">
                {faq.q}
              </h3>
              <span
                aria-hidden
                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cream-400 bg-white text-navy-700 transition-transform duration-300 group-open:rotate-45 group-open:border-orange-300 group-open:bg-orange-500 group-open:text-white"
              >
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
              <p className="mt-4 text-[14px] leading-relaxed text-navy-700 md:text-[15px]">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
