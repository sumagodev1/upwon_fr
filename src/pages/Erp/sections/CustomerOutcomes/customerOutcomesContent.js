/**
 * "What Changed After UPWON - In Their Own Words" - the section's built-in
 * content.
 *
 * Written in exactly the shape the CMS returns, so the component renders one
 * thing and never has to know which source it came from. It is the fallback,
 * not the source of truth: the admin panel owns this content, and this copy is
 * what the page shows while the fetch is in flight, during the SSG build, and
 * whenever the API is unreachable.
 *
 * Quotes carry no quotation marks - the card draws its own, so keeping them
 * here would show two sets.
 *
 * ⚠️ PUBLICATION FLAG — the quotes and stats below are PARAPHRASED placeholders
 * drawn from research, NOT verbatim customer statements cleared for publication.
 * Before this goes live with a customer's name attached, get direct written
 * sign-off (or a short recorded quote) on the exact wording from each named
 * customer. Do not publish paraphrased research quotes as direct testimonials.
 * The same applies to anything written in their place through the admin panel.
 */

/** The eyebrow and heading above the carousel. This section has no subtext. */
export const FALLBACK_COPY = {
  eyebrow: 'Customer Outcomes',
  headingLines: [
    [
      { text: 'What Changed After UPWON — ', accent: false },
      { text: 'In Their Own Words.', accent: true },
    ],
  ],
};

export const FALLBACK_CARDS = [
  {
    industry: 'FMCG Distribution',
    stat: '3 routes',
    statLabel: 'under-performing territories identified and cut',
    quote:
      'For the first time we could see profitability by territory — and actually act on it.',
    authorRole: 'National Sales Head',
    authorCompany: 'Regional FMCG brand',
    image:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=70',
    imageAlt: 'Regional FMCG brand',
  },
  {
    industry: 'Bakery & Confectionery',
    stat: 'Same-day',
    statLabel: 'credit notes — down from 5–6 days and 3 staff',
    quote: 'Credit notes that used to take days and three people now close the same day.',
    authorRole: 'Finance Director',
    authorCompany: 'Monginis',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=70',
    imageAlt: 'Monginis',
  },
  {
    industry: 'Sweets & Namkeen',
    stat: '6 tools → 1',
    statLabel: 'disconnected systems consolidated onto one platform',
    quote: 'We replaced a stack of disconnected tools with one system the whole plant trusts.',
    authorRole: 'Plant Operations Head',
    authorCompany: 'Kaka Foods',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=70',
    imageAlt: 'Kaka Foods',
  },
  {
    industry: 'Food Manufacturing',
    stat: '18%',
    statLabel: 'wastage reduction within the first year',
    quote: 'Batch-level costing showed us exactly where the loss was — and how to stop it.',
    authorRole: 'Operations Director',
    authorCompany: 'Mid-cap food manufacturer',
    image:
      'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&w=900&q=70',
    imageAlt: 'Mid-cap food manufacturer',
  },
];
