import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { getPlatformVocabulary } from '../../data/modules.js';

// Renders the per-platform expert glossary block beneath IntegrationsSection.
// Driven by PLATFORM_VOCABULARY in src/data/modules.js — each platform owns a
// 15-25 term lexicon. The section is meant to feel like a quick-reference
// drawer the buyer can scan to confirm "this vendor speaks my language."
//
// Behaviour:
//   - Search filter on top (filters term, full form, context)
//   - Click-to-expand each term to reveal the full form + context line
//   - Theme accent threaded through so each platform's block matches its
//     hero / dashboard palette
export default function PlatformVocabularySection({ slug, theme }) {
  const block = getPlatformVocabulary(slug);
  const [query, setQuery] = useState('');
  const [openTerm, setOpenTerm] = useState(null);

  if (!block) return null;

  const accent = theme?.accent || '#E85A2A';
  const accentSoft = theme?.accentSoft || '#FF7340';
  const tint = theme?.tint || '#FFF1EC';

  const q = query.trim().toLowerCase();
  const filtered = q
    ? block.terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.full.toLowerCase().includes(q) ||
          t.context.toLowerCase().includes(q),
      )
    : block.terms;

  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-30" />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: `${accent}14` }}
      />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Speak the language"
          title={
            <>
              The exact vocabulary{' '}
              <span style={{ color: accent }}>{block.label}</span> teams use.
            </>
          }
          description={block.blurb}
        />

        {/* Search + count */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a term, abbreviation or context…"
              className="w-full rounded-xl border border-cream-300 bg-white py-2.5 pl-10 pr-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-navy-300 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': `${accent}33` }}
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cream-100 px-3 py-1.5 text-[14px] font-semibold text-navy-700">
            <BookOpen className="h-3.5 w-3.5" />
            {filtered.length} of {block.terms.length} terms
          </div>
        </div>

        {/* Terms grid */}
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => {
            const id = `${slug}-${t.term}`;
            const isOpen = openTerm === id;
            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => setOpenTerm(isOpen ? null : id)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.03, 0.5),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col items-start gap-1.5 rounded-2xl border bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-enterprise"
                style={{
                  borderColor: isOpen ? accent : '#E4E7EB',
                  boxShadow: isOpen ? `0 12px 32px -12px ${accent}55` : undefined,
                }}
              >
                <span
                  className="inline-flex items-center gap-2 rounded-md px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.18em]"
                  style={{ backgroundColor: tint, color: accent }}
                >
                  Term
                </span>
                <span className="font-display text-[15px] font-bold leading-tight text-navy-950">
                  {t.term}
                </span>
                <span className="text-[14px] font-medium leading-snug text-navy-700">
                  {t.full}
                </span>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-1.5 text-[14px] leading-relaxed text-navy-600"
                  >
                    {t.context}
                  </motion.span>
                )}
                {/* Accent underline grows on hover */}
                <span
                  className="absolute inset-x-3 -bottom-px h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                  style={{
                    background: `linear-gradient(90deg, ${accent}, ${accentSoft}, transparent)`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-navy-500">
            No terms match “{query}”. Try a different abbreviation or context word.
          </p>
        )}

        <p className="mt-8 text-center text-[14px] text-navy-500">
          Tap any term for the in-context definition. Glossary refreshed quarterly with input from deployed customers.
        </p>
      </Container>
    </section>
  );
}
