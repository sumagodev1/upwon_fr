// Knowledgebase content + lookups. Scalable, slug-driven architecture:
//
//   /knowledgebase                                  → hub (all categories)
//   /knowledgebase/:categorySlug                    → category (its articles)
//   /knowledgebase/:categorySlug/:articleSlug       → article
//
// To publish: add a category to KB_CATEGORIES (once) and an article to
// KB_ARTICLES with that category's slug. The route table (getStaticPaths) and
// the sitemap (src/seo/routes.js) both read from here, so new content is
// prerendered and indexed automatically — no route edits needed.
//
// Body blocks mirror the blog renderer: { type: 'p' | 'h2' | 'ul' | 'quote' }.

import { Boxes, ShieldCheck, Truck } from 'lucide-react';

export const KB_CATEGORIES = [
  {
    slug: 'inventory-management',
    name: 'Inventory Management',
    icon: Boxes,
    description:
      'Real-time stock control, FEFO/FIFO, expiry and multi-warehouse visibility for perishable food and FMCG inventory.',
    keywords:
      'inventory management software, FEFO, FIFO, stock tracking, expiry management, perishable inventory',
  },
  {
    slug: 'compliance',
    name: 'Compliance & Food Safety',
    icon: ShieldCheck,
    description:
      'FSSAI, GST, e-invoicing and batch-traceability workflows that keep food manufacturers audit-ready.',
    keywords:
      'FSSAI compliance, GST e-invoicing, batch traceability, food safety audit, statutory compliance',
  },
  {
    slug: 'distribution',
    name: 'Distribution & Sales',
    icon: Truck,
    description:
      'Beat planning, secondary-sales capture, distributor stock visibility and scheme control for FMCG distribution.',
    keywords:
      'secondary sales, distributor management, beat planning, SFA, DMS, FMCG distribution',
  },
];

export const KB_ARTICLES = [
  {
    slug: 'how-to-track-stock',
    category: 'inventory-management',
    title: 'How to Track Stock in Real Time Across Plants and Warehouses',
    description:
      'A practical guide to real-time stock tracking for food and FMCG operations — batch-level visibility, multi-warehouse views and scanner-based accuracy.',
    keywords:
      'real time stock tracking, multi warehouse inventory, batch level stock, food inventory software',
    datePublished: '2026-01-12',
    dateModified: '2026-02-04',
    readTime: '6 min read',
    excerpt:
      'Month-end stock surprises come from a single root cause: stock that is recorded after it moves, not as it moves. Here is how to close that gap.',
    body: [
      { type: 'p', text: 'If you only learn your true stock position at month-end, you are not tracking inventory — you are reconstructing it. For perishable food and high-velocity FMCG, that lag is where wastage, stockouts and write-offs hide.' },
      { type: 'h2', text: 'Record stock as it moves, not after' },
      { type: 'p', text: 'The fix is to capture every movement at the point it happens — goods receipt at the gate, putaway to a bin, picking, dispatch — on a scanner, so the system position always matches the physical position.' },
      { type: 'ul', items: [
        'Scan-based GRN at inward, tied to the purchase order',
        'Putaway confirmation to a specific bin or zone',
        'FEFO-enforced picking so the oldest batch leaves first',
        'Dispatch confirmation with batch + quantity',
      ] },
      { type: 'h2', text: 'Make it batch- and expiry-aware' },
      { type: 'p', text: 'A quantity number alone is not enough for food. You need to know which batch, with which expiry, sits in which location — so near-expiry stock surfaces daily instead of as a month-end write-off.' },
      { type: 'quote', text: 'You cannot manage what you can only see 30 days late. Live stock is the difference between deciding and reacting.' },
      { type: 'h2', text: 'Roll it up across locations' },
      { type: 'p', text: 'Once each plant and warehouse records movement live, a single multi-warehouse view shows total available-to-promise stock by SKU and batch — the foundation for accurate planning, procurement and dispatch.' },
    ],
    faqs: [
      { q: 'What is real-time stock tracking?', a: 'Recording every inventory movement (receipt, putaway, pick, dispatch) at the moment it happens — usually via a scanner — so the system stock position always matches the physical stock, instead of being reconciled at month-end.' },
      { q: 'How does batch-level tracking reduce wastage?', a: 'It surfaces near-expiry stock daily and enforces FEFO at picking, so older batches ship first and fewer units expire on the shelf.' },
    ],
    related: ['what-is-fefo', 'fssai-compliance-checklist'],
  },
  {
    slug: 'what-is-fefo',
    category: 'inventory-management',
    title: 'What Is FEFO and Why It Matters for Food Inventory',
    description:
      'FEFO (First Expiry, First Out) explained for food manufacturers — how enforced FEFO cuts expiry write-offs and why "reporting" FEFO is not enough.',
    keywords:
      'FEFO, first expiry first out, FEFO vs FIFO, expiry management, food warehouse',
    datePublished: '2026-01-20',
    dateModified: '2026-01-20',
    readTime: '5 min read',
    excerpt:
      'FEFO sounds obvious, yet most food ERPs only report on it. Enforcement at the scanner is what actually stops expiry write-offs.',
    body: [
      { type: 'p', text: 'FEFO — First Expiry, First Out — means the batch that expires soonest is dispatched first. It sounds obvious enough that you would assume every food ERP enforces it. Most do not. They report on it. They alert on it. They do not strictly prevent a picker from grabbing a newer batch while older stock waits to expire.' },
      { type: 'h2', text: 'FEFO vs FIFO' },
      { type: 'p', text: 'FIFO (First In, First Out) ships the oldest received batch first. That works for non-perishables, but a batch received earlier can have a later expiry. For food, expiry date — not receipt date — is what matters, which is exactly what FEFO optimises for.' },
      { type: 'h2', text: 'Reporting FEFO vs enforcing FEFO' },
      { type: 'p', text: 'The difference that moves numbers is enforcement at the scanner. If a picker scans an out-of-FEFO batch, the app should reject the pick and show the correct one — no override without a documented reason and a manager approval.' },
      { type: 'ul', items: [
        'Expiry alerts at 7 / 15 / 30-day windows',
        'Quarantine workflow for near-expiry stock',
        'Hard FEFO enforcement at picking, not just on the picklist',
      ] },
      { type: 'quote', text: 'If a vendor talks about FEFO as a "report" rather than an "enforcement," that is a red flag.' },
    ],
    faqs: [
      { q: 'What does FEFO stand for?', a: 'First Expiry, First Out — the inventory rule that the batch with the earliest expiry date is picked and dispatched first.' },
      { q: 'Is FEFO better than FIFO for food?', a: 'Yes. FIFO uses receipt order, but a batch received earlier can expire later. FEFO uses expiry order, which is what matters for perishable food, so it minimises write-offs.' },
    ],
    related: ['how-to-track-stock', 'fssai-compliance-checklist'],
  },
  {
    slug: 'fssai-compliance-checklist',
    category: 'compliance',
    title: 'FSSAI Compliance Checklist for Food Manufacturers',
    description:
      'A practical FSSAI compliance checklist — licensing, batch traceability, labelling, recall readiness and audit documentation for Indian food manufacturers.',
    keywords:
      'FSSAI compliance checklist, food safety audit, batch traceability, FSSAI license renewal, food labelling',
    datePublished: '2026-02-02',
    dateModified: '2026-02-10',
    readTime: '7 min read',
    excerpt:
      'FSSAI inspections have shifted to unannounced, risk-based audits. This checklist is what audit-ready actually looks like.',
    body: [
      { type: 'p', text: 'FSSAI inspections increasingly arrive unannounced and demand batch traceability proof within minutes. Audit-readiness is no longer a once-a-year exercise — it is a daily state. Here is the working checklist.' },
      { type: 'h2', text: 'Licensing & renewals' },
      { type: 'ul', items: [
        'Valid FSSAI license for every premises and activity',
        'Renewal alerts at 90 / 60 / 30-day windows',
        'Product approvals mapped to the licensed categories',
      ] },
      { type: 'h2', text: 'Traceability & recall' },
      { type: 'ul', items: [
        'Batch-level traceability from raw lot to finished good',
        'One-click identification of affected stock for recall',
        'Allergen flags propagated through every BOM',
      ] },
      { type: 'h2', text: 'Documentation' },
      { type: 'p', text: 'The single biggest audit accelerator is a document vault that surfaces the right paperwork by batch ID — turning a 24-48 hour paper-chase into one query, one PDF, one click.' },
      { type: 'quote', text: 'Compliance should live in the system — not in a senior employee’s head.' },
    ],
    faqs: [
      { q: 'How often must an FSSAI license be renewed?', a: 'FSSAI licenses are issued for 1 to 5 years and must be renewed before expiry. Set renewal alerts at 90, 60 and 30 days so a lapse never triggers a compliance gap or production stoppage.' },
      { q: 'What does batch traceability mean for FSSAI audits?', a: 'It is the ability to trace any finished-goods batch back to its raw-material lot, vendor and production shift — and forward to where it was dispatched — within minutes, which is what risk-based inspections now demand.' },
    ],
    related: ['how-to-track-stock', 'what-is-fefo'],
  },
  {
    slug: 'capture-secondary-sales',
    category: 'distribution',
    title: 'How to Capture Secondary Sales in Real Time',
    description:
      'Move distribution visibility from 30 days to same-day — how FMCG companies capture retailer-level secondary sales on mobile and why it matters.',
    keywords:
      'secondary sales capture, FMCG distribution visibility, distributor stock, beat plan, SFA DMS',
    datePublished: '2026-02-08',
    dateModified: '2026-02-08',
    readTime: '6 min read',
    excerpt:
      'Primary sales tell you what you billed. Secondary sales tell you what actually sold. Closing that gap is the highest-leverage move in distribution.',
    body: [
      { type: 'p', text: 'Primary sales — what you billed to distributors — is what most FMCG companies can see. Secondary sales — what distributors actually sold through to retailers — is what they win or lose on. The gap between the two is usually 30 days of blind guesswork.' },
      { type: 'h2', text: 'Capture at the outlet, on mobile' },
      { type: 'p', text: 'The move is to capture retailer-level sales on a mobile app at the point of the visit, so the visibility window collapses from monthly to same-day.' },
      { type: 'ul', items: [
        'Beat plans assigning the right outlets to the right rep',
        'Order booking with live inventory and scheme application',
        'GPS-tagged outlet check-in for beat compliance',
        'Distributor stock visible SKU-wise, live',
      ] },
      { type: 'h2', text: 'Turn the data into discipline' },
      { type: 'p', text: 'Real-time data only pays off when paired with disciplined review — weekly beat-plan meetings, every territory, every rep. Tools surface the gaps; the operating rhythm closes them.' },
      { type: 'quote', text: 'Secondary sales visible same day — not on the 10th of next month.' },
    ],
    faqs: [
      { q: 'What is the difference between primary and secondary sales?', a: 'Primary sales are what a company bills to its distributors. Secondary sales are what those distributors sell through to retailers. Secondary sales reflect real market demand, which is why same-day visibility into them is so valuable.' },
      { q: 'How is secondary sales data captured?', a: 'Through a mobile sales-force app used at the outlet during the rep visit — order booking, retailer-level billing and GPS-tagged check-ins feed a live distribution dashboard.' },
    ],
    related: ['how-to-track-stock'],
  },
];

// --- Lookups -------------------------------------------------------------

// Format an ISO date (YYYY-MM-DD) as "12 Jan 2026" for display.
export function formatKbDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d} ${months[(m || 1) - 1]} ${y}`;
}

export function getCategory(slug) {
  return KB_CATEGORIES.find((c) => c.slug === slug) || null;
}

export function getArticlesByCategory(categorySlug) {
  return KB_ARTICLES.filter((a) => a.category === categorySlug);
}

export function findArticle(categorySlug, articleSlug) {
  return (
    KB_ARTICLES.find(
      (a) => a.category === categorySlug && a.slug === articleSlug,
    ) || null
  );
}

// Resolve an article's `related` slugs into full article records.
export function getRelatedArticles(article, limit = 3) {
  if (!article?.related?.length) return [];
  return article.related
    .map((slug) => KB_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean)
    .slice(0, limit);
}

// Build-time path list — consumed by src/seo/routes.js (sitemap) and the route
// table's getStaticPaths so every KB URL is prerendered + indexed.
export function getKnowledgebasePaths() {
  const paths = ['/knowledgebase'];
  KB_CATEGORIES.forEach((c) => paths.push(`/knowledgebase/${c.slug}`));
  KB_ARTICLES.forEach((a) =>
    paths.push(`/knowledgebase/${a.category}/${a.slug}`),
  );
  return paths;
}
