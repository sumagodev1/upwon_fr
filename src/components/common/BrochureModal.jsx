import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Download,
  Layers,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PLATFORM_MODULES, PLATFORM_THEMES } from '../../data/modules.js';
import { submitLead } from '../../lib/leads.js';

// BrochureModal — the "Download Product Brochure (PDF)" pop-up that replaces
// the inline dropdown in HeroSection.
//
// UX flow:
//   STEP 1 — Browse: visitor picks one of 9 brochures (Suite Overview pinned
//            on top + 8 product brochures).
//   STEP 2 — Capture: 2-field form (name + email + optional company) so the
//            PDF link is gated. Captures a real lead via `submitLead`.
//   STEP 3 — Deliver: shows download button + opens PDF in a new tab. The
//            same link is also emailed (when CRM webhook is wired).
//
// Why a modal instead of a dropdown:
//   - More visual breathing room — visitor can see all 9 options + thumbnails.
//   - The popover was easy to dismiss; a centred modal commits the visitor
//     to the action long enough to actually convert.
//   - Email capture turns the brochure download into a real lead-gen surface
//     (currently the brochure was a free PDF with no capture).
//
// Open it from any component with:
//   const [open, setOpen] = useState(false);
//   <button onClick={() => setOpen(true)}>Download brochure</button>
//   <BrochureModal open={open} onClose={() => setOpen(false)} />
export default function BrochureModal({ open, onClose }) {
  const [step, setStep] = useState('browse'); // 'browse' | 'capture' | 'delivered'
  const [picked, setPicked] = useState(null); // { slug, title, sub, href }
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [submitting, setSubmitting] = useState(false);

  // Lock body scroll while open. Restore on close. ESC also closes.
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Reset flow whenever the modal opens fresh.
  useEffect(() => {
    if (open) {
      setStep('browse');
      setPicked(null);
      setSubmitting(false);
    }
  }, [open]);

  if (typeof document === 'undefined') return null;

  const BROCHURES = [
    {
      slug: 'suite',
      title: 'UpWon Suite — Overview',
      sub: 'All 8 products in one PDF · 32 pages',
      href: '/brochures/upwon-suite.pdf',
      pinned: true,
    },
    ...PLATFORM_MODULES.map((m) => {
      // Each tile carries its platform's brand accent so the modal becomes a
      // colour-coded mini directory: ERP blue, SFA-DMS green, FMS purple,
      // POS crimson, HREasy teal, WMS deep-orange, Vendor Portal slate.
      // Same palette as the Products mega-menu in the navbar — keeps the
      // brand language consistent across surfaces.
      const theme = PLATFORM_THEMES[m.slug] || {};
      return {
        slug: m.slug,
        title: m.code,
        sub: m.short,
        href: `/brochures/upwon-${m.slug}.pdf`,
        icon: m.icon,
        accent: theme.accent || '#E85A2A',
        accentSoft: theme.accentSoft || '#FF7340',
        tint: theme.tint || '#FFF1EC',
      };
    }),
  ];

  function handlePick(b) {
    setPicked(b);
    setStep('capture');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    await submitLead('brochure_download', {
      ...form,
      brochure: picked?.slug,
      brochureTitle: picked?.title,
    });
    setSubmitting(false);
    setStep('delivered');
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/65 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Download UpWon brochure"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-enterprise-lg"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy-700 shadow-sm transition-colors hover:bg-cream-100"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="border-b border-cream-200 bg-gradient-to-r from-orange-50 to-cream-100 px-7 py-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-700">
                <Download className="h-3 w-3" />
                Brochure library
              </p>
              <h2 className="mt-3 font-display text-xl font-bold text-navy-950 md:text-2xl">
                {step === 'browse' && 'Pick a brochure to download.'}
                {step === 'capture' && (
                  <>
                    Almost there —{' '}
                    <span className="gradient-text-orange">{picked?.title}</span>
                  </>
                )}
                {step === 'delivered' && 'Your brochure is ready.'}
              </h2>
              <p className="mt-1 text-[14px] text-navy-700">
                {step === 'browse' &&
                  'One PDF per product, plus the full Suite overview. Tap any tile to continue.'}
                {step === 'capture' &&
                  'We send a copy to your inbox so you can share it with your team. Two fields, 10 seconds.'}
                {step === 'delivered' &&
                  'Opening now. We also emailed a copy and added matching product cheatsheets.'}
              </p>
            </div>

            {/* Body */}
            <div className="max-h-[64vh] overflow-y-auto px-5 py-5 md:px-7">
              {step === 'browse' && <BrowseStep brochures={BROCHURES} onPick={handlePick} />}
              {step === 'capture' && (
                <CaptureStep
                  picked={picked}
                  form={form}
                  setForm={setForm}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  onBack={() => setStep('browse')}
                />
              )}
              {step === 'delivered' && (
                <DeliveredStep picked={picked} onPickAnother={() => setStep('browse')} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Step 1: Browse ──────────────────────────────────────────────────────────
function BrowseStep({ brochures, onPick }) {
  const pinned = brochures.find((b) => b.pinned);
  const rest = brochures.filter((b) => !b.pinned);
  return (
    <div>
      {pinned && (
        <button
          type="button"
          onClick={() => onPick(pinned)}
          className="group flex w-full items-start gap-4 rounded-2xl border border-orange-300 bg-gradient-to-br from-orange-50 via-white to-orange-50/50 p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-enterprise md:p-5"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-500 text-white shadow-glow-orange">
            <Layers className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-orange-700">
              <Sparkles className="h-2.5 w-2.5" />
              Most downloaded
            </span>
            <p className="mt-1.5 font-display text-[15px] font-bold text-navy-950">
              {pinned.title}
            </p>
            <p className="mt-0.5 text-[14px] text-navy-600">{pinned.sub}</p>
          </span>
          <ArrowRight className="mt-3 h-4 w-4 text-orange-500 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}

      <p className="mt-6 text-[10.5px] font-bold uppercase tracking-[0.22em] text-navy-500">
        Or pick by product
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {rest.map((b) => {
          const Icon = b.icon || FileText;
          const accent = b.accent || '#E85A2A';
          const tint = b.tint || '#FFF1EC';
          return (
            <button
              key={b.slug}
              type="button"
              onClick={() => onPick(b)}
              className="group flex min-w-0 items-start gap-3 rounded-xl border bg-white p-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-enterprise"
              style={{
                borderColor: '#E4E7EB',
                ['--brochure-accent']: accent,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent}55`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E4E7EB')}
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg ring-1 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: tint,
                  color: accent,
                  ['--tw-ring-color']: `${accent}33`,
                }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block truncate text-[14px] font-bold transition-colors"
                  style={{ color: accent }}
                >
                  {b.title}
                </span>
                <span className="mt-0.5 block text-[14px] leading-snug text-navy-600 line-clamp-2 sm:line-clamp-1">
                  {b.sub}
                </span>
              </span>
              <FileText
                className="ml-1 mt-1 h-3 w-3 shrink-0 transition-colors"
                style={{ color: `${accent}80` }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Capture ─────────────────────────────────────────────────────────
function CaptureStep({ picked, form, setForm, onSubmit, submitting, onBack }) {
  return (
    <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-[1fr_280px]">
      <div>
        <div className="grid gap-3">
          <Field
            label="Full name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            required
            placeholder="Your name"
          />
          <Field
            label="Work email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
            placeholder="you@company.com"
          />
          <Field
            label="Company (optional)"
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
            placeholder="Your business"
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary !px-6 !py-3 disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {submitting ? 'Preparing…' : `Send me the ${picked?.title?.split(' — ')[0] || 'brochure'}`}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-[14px] font-semibold text-navy-700 hover:text-navy-950"
          >
            ← Pick a different brochure
          </button>
        </div>
        <p className="mt-3 text-[14px] text-navy-500">
          We email a copy + add you to the UpWon insiders list. Unsubscribe anytime.
        </p>
      </div>
      {/* Side card — what they'll receive */}
      <aside className="rounded-2xl border border-cream-300 bg-cream-100 p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-600">
          What you'll get
        </p>
        <ul className="mt-3 space-y-2 text-[14px] text-navy-800">
          {[
            'Full PDF — instant download',
            'Copy emailed to you for sharing',
            'Matching product cheatsheets',
            'No sales call until you ask',
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
              {t}
            </li>
          ))}
        </ul>
      </aside>
    </form>
  );
}

// ─── Step 3: Delivered ───────────────────────────────────────────────────────
function DeliveredStep({ picked, onPickAnother }) {
  // Auto-trigger the download once we land on this step.
  useEffect(() => {
    if (!picked?.href) return;
    const t = setTimeout(() => {
      window.open(picked.href, '_blank', 'noopener,noreferrer');
    }, 200);
    return () => clearTimeout(t);
  }, [picked]);

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_240px]">
      <div>
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-display text-[14px] font-bold text-navy-950">
              {picked?.title} is opening now.
            </p>
            <p className="mt-1 text-[14px] text-navy-700">
              If the PDF didn't open, click the button below. We've also emailed a copy.
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={picked?.href}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn-primary !px-6 !py-3"
          >
            <Download className="h-4 w-4" />
            Open the PDF again
          </a>
          <button
            type="button"
            onClick={onPickAnother}
            className="text-[14px] font-semibold text-navy-700 hover:text-navy-950"
          >
            Download another brochure →
          </button>
        </div>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[14px] text-navy-500">
          <Mail className="h-3 w-3" /> Sent to your inbox · check spam if you don't see it
        </p>
      </div>
      <aside className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-700">
          Want a live walkthrough?
        </p>
        <p className="mt-2 text-[14px] text-navy-800">
          Get a 30-min demo of {picked?.title?.split(' — ')[0]} for your business — no slides.
        </p>
        <a
          href="/demo"
          className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-orange-700 hover:text-orange-800"
        >
          Book a demo <ArrowRight className="h-3 w-3" />
        </a>
      </aside>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-600">
        {label}
        {required && <span className="ml-0.5 text-orange-600">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-md border border-cream-300 bg-white px-3 py-2.5 text-[14px] text-navy-900 placeholder:text-navy-400 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
      />
    </label>
  );
}
