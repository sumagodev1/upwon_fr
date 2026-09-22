import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, MessageCircle, ArrowUpRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import SectionHeading from '../../../../components/shared/SectionHeading/SectionHeading.jsx';

// Category styling — each tag gets a distinct tone so the eye can group
// related questions at a glance. All classes are literal (no template
// strings) so Tailwind's JIT picks them up.
const CAT_TONES = {
  Platform:      { chip: 'bg-orange-50 text-orange-700 border-orange-200' },
  Pricing:       { chip: 'bg-amber-50 text-amber-800 border-amber-200' },
  Implementation:{ chip: 'bg-blue-50 text-blue-700 border-blue-200' },
  Compliance:    { chip: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  Support:       { chip: 'bg-violet-50 text-violet-700 border-violet-200' },
  Customization: { chip: 'bg-rose-50 text-rose-700 border-rose-200' },
};

// Exported so the homepage can emit a matching FAQPage schema (SG03 §9.2)
// without duplicating the copy.
export const FAQS = [
  {
    category: 'Platform',
    q: 'What exactly is UpWon and which businesses is it built for?',
    a: 'UpWon is an integrated enterprise suite — ERP + DMS + POS + WMS + SFA + HR + FMS — built specifically for Indian food manufacturers, FMCG distributors and franchise networks. Typical customers do ₹2 Cr to ₹500 Cr in revenue: bakeries, dairies, sweets and namkeen, spices, beverages, QSR/franchise chains. It is not a generic ERP with a "food module" — every workflow is shaped around how Indian Food/FMCG operations actually run.',
  },
  // {
  //   category: 'Platform',
  //   q: 'How is UpWon different from SAP, NetSuite or Tally?',
  //   a: 'SAP / NetSuite-class suites are genuinely enterprise-grade — but priced and timed for billion-dollar conglomerates, not Indian SMBs. Tally / Marg / Busy are great accounting tools that stop at the trial balance. UpWon sits exactly in the middle: native Food/FMCG vertical depth, India-native compliance (FSSAI, GST, e-invoicing) and a 30-45 day go-live versus 6-18 months for global suites. See our /compare pages for honest, side-by-side scoring.',
  // },
  // {
  //   category: 'Platform',
  //   q: 'Can UpWon handle multi-plant, multi-outlet operations?',
  //   a: 'Yes — it is designed for it. Monginis runs 16 plants and 200+ outlets on a single UpWon spine; Kaka Halwai unifies 3 plants and 25+ outlets; U2 Cake & Burger operates 250+ outlets with native Swiggy/Zomato/ONDC integration. Hub-spoke ordering, central kitchen consolidation, outlet POS rollups and royalty calculation are all built in.',
  // },
  // {
  //   category: 'Platform',
  //   q: 'Is UpWon cloud-based or on-premise?',
  //   a: 'Cloud-native, hosted on AWS Mumbai (so your data stays in India). Field teams get offline-capable mobile apps — they keep working through patchy connectivity at outlets or on routes and sync automatically when back online. No server room, no IT team required to maintain it.',
  // },
  {
    category: 'Pricing',
    q: 'How much does UpWon cost?',
    a: 'Pricing is segmented by business size — Starter (₹2-25 Cr revenue), Growth (₹25-200 Cr) and Enterprise (₹200 Cr+). Each tier has a published starting price and a custom component based on plants / outlets / modules. We send a fixed-price proposal within 24 business hours of your first call — no drawn-out sales cycle to find out the number.',
  },
  // {
  //   category: 'Pricing',
  //   q: 'Is there a free trial or pilot program?',
  //   a: 'We offer a free FSSAI / Operations Audit instead of a generic trial — because in food manufacturing, software value only shows up once it touches real batches and real outlets. The audit is a 60-minute deep-dive where we map your current workflows and show exactly where UpWon would move numbers. For larger commitments, paid pilots are scoped on a per-customer basis.',
  // },
  // {
  //   category: 'Pricing',
  //   q: 'What is included in the subscription?',
  //   a: 'All modules in your chosen tier, implementation, train-the-trainer, 90-day hyper-care, ongoing support, statutory updates, mobile apps and standard integrations (Tally / Swiggy / Zomato / Pine Labs / Paytm and more). No per-user-per-feature pricing games, no surprise integration invoices.',
  // },
  // {
  //   category: 'Implementation',
  //   q: 'How long does UpWon take to go live?',
  //   a: '30 to 45 days for most deployments. 93% of our 50+ implementations have gone live on the committed date. Monginis went live across 16 plants in 30 days; Kaka Halwai across 3 plants in 45. The fast timeline is possible because UpWon ships food/FMCG workflows out-of-box — we configure, not custom-build.',
  // },
  // {
  //   category: 'Implementation',
  //   q: 'What does the implementation process look like?',
  //   a: 'Four phases over 4-6 weeks. Week 1 — Discovery: we walk your plants and outlets, map SOPs. Weeks 2-3 — Configuration: modules wired, master data migrated, integrations built. Week 4 — UAT + train-the-trainer: your operations leaders run scenario tests. Day 30-45 — Go-live with on-site SPOC + 90-day hyper-care wave rollout. Zero P1 incidents across our last 20 deployments.',
  // },
  {
    category: 'Implementation',
    q: 'Do you handle data migration from our current system?',
    a: 'Yes — Tally, Marg, Busy, Excel, custom-built systems, and SAP migrations are all standard. We map your existing data model, clean it, migrate masters first, then transactions, then run parallel validation for a week before cutover. You sign off only when reconciliation hits 100%.',
  },
  {
    category: 'Compliance',
    q: 'Is UpWon FSSAI, GST and e-invoicing compliant?',
    a: 'Yes — natively, not bolt-on. FSSAI license tracker with renewal alerts, GST e-invoicing via the IRP, e-way bill auto-generation, statutory return calendar, Form 16 / 24Q automation. Compliance is built into the data model, so audit-ready documents are one click away — not one week of paper-chase.',
  },
  // {
  //   category: 'Compliance',
  //   q: 'How secure is our data?',
  //   a: 'ISO/IEC 27001:2022 certified for information security management. Hosted on AWS Mumbai region for data residency. Role-based access controls down to module level, audit logs on every transaction, encryption at rest (AES-256) and in transit (TLS 1.3). Backed up across three availability zones with 4-hour RPO and 24-hour RTO.',
  // },
  {
    category: 'Support',
    q: 'What kind of support do you get after go-live?',
    a: '90-day hyper-care included by default — a dedicated SPOC on call, daily check-ins, P1 SLA of 1 hour, P2 SLA of 4 hours. Beyond that, every customer gets a named Customer Success Manager, ticketed support with priority SLAs, and 24x7 emergency support for plant-floor and outlet-billing issues. We do not disappear after launch.',
  },
  // {
  //   category: 'Support',
  //   q: 'Will our team need training, and who runs it?',
  //   a: 'Yes — and we run it. Train-the-trainer for plant operators, outlet managers, sales reps and CFOs, plus role-specific learning modules in our learning library. Refresher sessions every quarter at no extra cost. Most operational users are productive within 7 days of training; CFO-level dashboards typically click within the first hyper-care week.',
  // },
  {
    category: 'Customization',
    q: 'Can UpWon be customized to our specific workflows?',
    a: 'Out-of-box UpWon covers 80%+ of typical food/FMCG workflows. The remaining 20% is handled through configuration — toggles, forms, rules, dashboards — not custom code. This is deliberate: configuration upgrades cleanly when we ship new versions, where custom code breaks. For genuinely novel workflows we build extensions on a documented API. The platform stays maintainable as you scale.',
  },
];

function FaqItem({ faq, isOpen, onToggle, index }) {
  const tone = CAT_TONES[faq.category] || CAT_TONES.Platform;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className={`flex min-h-[140px] flex-col overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? 'border-orange-200 bg-orange-50/40 shadow-enterprise'
          : 'border-cream-300 bg-white hover:border-orange-200 hover:bg-cream-100'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-4 p-5 text-left md:p-6"
      >
        <div className="min-w-0 flex-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${tone.chip}`}
          >
            {faq.category}
          </span>
          <h3 className="mt-2 font-display text-[15.5px] font-bold leading-snug text-navy-950 md:text-[17px]">
            {faq.q}
          </h3>
        </div>

        {/* + / × icon — rotates 45° to become × when open */}
        <span
          aria-hidden
          className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'rotate-45 border-orange-300 bg-orange-500 text-white'
              : 'border-cream-400 bg-white text-navy-700'
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
              <p className="mt-4 text-[14px] leading-relaxed text-navy-700 md:text-[15px]">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  // Single-open accordion — opening any question auto-closes the previous
  // one. Click the open question again to close it (no question open).
  // First question opens by default so the section never looks empty.
  const [openIdx, setOpenIdx] = useState(0);
  const toggle = (i) => {
    setOpenIdx((prev) => (prev === i ? -1 : i));
  };

  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.05] blur-[120px]" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Frequently Asked"
          title={
            <>
              Questions buyers usually ask{' '}
              <span className="gradient-text-orange">before signing.</span>
            </>
          }
          description="If your question is not here, our pre-sales team replies within 2 working hours."
        />

        {/* Accordion — single column on mobile, 2-column grid on tablet+.
            `items-start` + `auto-rows-min` keep each item at its natural
            height so an expanded card on one side does not stretch the
            collapsed card next to it. */}
        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-3 auto-rows-min md:grid-cols-2 md:gap-4">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={i === openIdx}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Bottom contact card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-cream-300 bg-cream-100 p-6 text-center md:flex-row md:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-600">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-navy-950">
                Still have questions?
              </p>
              <p className="text-[14px] text-navy-600">
                Our pre-sales team replies within 2 working hours.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/contact" className="btn-secondary !px-5 !py-2.5 !text-[14px]">
              Talk to sales
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/demo" className="btn-primary !py-2.5 !text-[14px]">
              Book Free Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
