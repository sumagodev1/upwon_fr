import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Quote } from 'lucide-react';
import Container from '../ui/Container.jsx';
import { ALL_CASES } from '../../data/caseStudy.js';

// Pick the single most-punchy metric from each case for the hero stat
const HEADLINE_METRIC = {
  monginis:     { value: '35 → 200+', label: 'Outlets · no extra back-office' },
  'kaka-halwai':{ value: '18%',       label: 'Wastage cut in 60 days' },
  'u2-cake':    { value: '₹23 L',     label: 'Daily transactions handled' },
};

const BADGE = 'bg-orange-100 text-orange-700';

function CaseCard({ c }) {
  const metric = HEADLINE_METRIC[c.slug];
  const initial = c.brand.charAt(0);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl md:p-7">
      {/* Header: brand initial + category */}
      <div className="relative flex items-center gap-3">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl font-display text-lg font-bold ${BADGE}`}>
          {initial}
        </div>
        <div>
          <p className="font-display text-base font-bold leading-tight text-navy-950">{c.brand}</p>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-navy-500">
            {c.location} · {c.category}
          </p>
        </div>
      </div>

      {/* The big headline metric */}
      <div className="relative mt-4">
        <p className="num-display text-4xl font-bold leading-none text-orange-600 md:text-5xl">
          {metric.value}
        </p>
        <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-700">
          {metric.label}
        </p>
      </div>

      {/* Short testimonial */}
      <div className="relative mt-4 rounded-xl border border-cream-300 bg-cream-100/50 p-3.5">
        <Quote className="absolute right-3 top-3 h-3.5 w-3.5 text-navy-300" />
        <p className="text-[14px] italic leading-relaxed text-navy-800">
          &ldquo;{c.testimonial.quote.split('.')[0]}.&rdquo;
        </p>
      </div>

      {/* Footer CTA — pinned to the bottom so it aligns across all cards. */}
      <div className="relative mt-auto pt-5">
        <Link
          to={`/clients/${c.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-orange-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-700"
        >
          Read the {c.brand.split(' ')[0]} story
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function CaseStudyHighlight() {
  return (
    <section className="relative bg-white py-10 md:py-14">
      <Container className="relative">
        {/* Centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
            Real Outcomes · Real Businesses
          </p>
 <h2 className="mt-3 h-display text-[36.8px] text-balance leading-[1.1] tracking-tight text-navy-950">
            The proof is in the{' '}
            <span className="gradient-text-orange">numbers.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-navy-600">
            Three live stories. Three different stages of scale. Same operational spine.
          </p>
        </motion.div>

        {/* Three cards in a row */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ALL_CASES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <CaseCard c={c} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
