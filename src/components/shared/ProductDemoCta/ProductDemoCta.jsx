import { useState } from 'react';
import { m as motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
} from 'lucide-react';
import Container from '../Container/Container.jsx';
import { COMPANY } from '../../../data/company.js';

// Brief §2.13 — Final Conversion CTA / Demo Booking.
// Full-width navy in-page section with:
//   • short form (5 fields) sized to the platform's typical sub-industry mix
//   • trust micro-copy (no credit card, no commitment, 4-hour response)
//   • "What happens next" 3-step timeline (removes anxiety pre-click)
//   • secondary WhatsApp / Phone / Email lanes for low-friction entry
//
// Submitting writes to /demo with the slug + form data carried via query
// string so the existing DemoPage flow can pre-populate.
export default function ProductDemoCta({ slug, productCode, theme, subIndustries }) {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    company: '',
    subIndustry: subIndustries?.[0] || '',
    challenge: '',
  });

  const accent = theme?.accent || '#E85A2A';
  const accentSoft = theme?.accentSoft || '#FF7340';

  function onChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // Route to /demo with prefill in query string. DemoPage can read and
    // hydrate its full form. Avoids forking conversion handling.
    const params = new URLSearchParams({
      product: slug,
      ...form,
    });
    window.location.href = `/demo?${params.toString()}`;
  }

  return (
    <section
      id="book-demo"
      className="relative overflow-hidden bg-navy-950 text-white section-pad scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{ background: `${accent}28` }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[440px] w-[440px] rounded-full blur-[160px]"
        style={{ background: `${accentSoft}1f` }}
      />

      <Container className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* LEFT — pitch */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em]"
              style={{
                background: `${accent}1f`,
                borderColor: `${accent}66`,
                color: accentSoft,
              }}
            >
              <Sparkles className="h-3 w-3" />
              See it in your business context
            </p>
 <h2 className="mt-5 font-display text-[36.8px] text-balance font-bold leading-[1.05]">
              See {productCode} running in a business{' '}
              <span style={{ color: accentSoft }}>like yours — live.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75">
              Every demo is prepared for your industry, your size and your
              team's real questions. Not a generic walkthrough.
            </p>

            {/* Trust line */}
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                'No credit card. No commitment.',
                'Response within 4 hours.',
                'Demo prepared for YOUR business.',
                '30 minutes — no sales theatre.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-[14px] text-white/80">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: accentSoft }}
                  />
                  {t}
                </li>
              ))}
            </ul>

            {/* "What happens next" 3-step timeline */}
            <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
              <p
                className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                style={{ color: accentSoft }}
              >
                <ClipboardList className="mr-1 inline-block h-3 w-3" /> What happens next
              </p>
              <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { n: 1, h: 'We review your details', s: 'Within 4 hours of submitting.' },
                  { n: 2, h: 'We prep your demo', s: 'For your industry, size, modules.' },
                  { n: 3, h: '30-min live demo', s: 'Your team asks anything, live.' },
                ].map((step) => (
                  <li
                    key={step.n}
                    className="relative rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <span
                      className="absolute -top-3 left-3 grid h-6 w-6 place-items-center rounded-full text-[14px] font-bold text-white"
                      style={{ background: accent }}
                    >
                      {step.n}
                    </span>
                    <p className="mt-2 text-[14px] font-bold text-white">
                      {step.h}
                    </p>
                    <p className="mt-1 text-[14px] text-white/65">
                      {step.s}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Alternative lanes — WhatsApp / Phone / Email */}
            <div className="mt-7 flex flex-wrap items-center gap-3 text-[14px]">
              <span className="text-white/55">Prefer something else?</span>
              <a
                href={`https://wa.me/${(COMPANY?.whatsapp || '').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-semibold text-emerald-200 hover:bg-emerald-400/20"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a
                href={`tel:${COMPANY?.phone || ''}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 font-semibold text-white/85 hover:bg-white/10"
              >
                <Phone className="h-3.5 w-3.5" /> Call us
              </a>
              <a
                href={`mailto:${COMPANY?.email || ''}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 font-semibold text-white/85 hover:bg-white/10"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md md:p-9"
            style={{ boxShadow: `0 32px 80px -32px ${accent}55` }}
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
              style={{ background: `${accent}26` }}
            />

            <p
              className="relative text-[10.5px] font-bold uppercase tracking-[0.22em]"
              style={{ color: accentSoft }}
            >
              Book your personalised demo
            </p>
            <h3 className="relative mt-1 font-display text-xl font-bold leading-tight md:text-2xl">
              Five fields. 60 seconds.
            </h3>

            <div className="relative mt-6 grid gap-3.5">
              <Field
                label="Full name"
                placeholder="Your name"
                value={form.name}
                onChange={(v) => onChange('name', v)}
                required
              />
              <Field
                label="Mobile"
                placeholder="+91 9xx xxx xxxx"
                value={form.mobile}
                onChange={(v) => onChange('mobile', v)}
                required
                type="tel"
              />
              <Field
                label="Company"
                placeholder="Your business name"
                value={form.company}
                onChange={(v) => onChange('company', v)}
                required
              />
              {subIndustries && subIndustries.length > 0 && (
                <Select
                  label="Sub-industry"
                  value={form.subIndustry}
                  onChange={(v) => onChange('subIndustry', v)}
                  options={subIndustries}
                />
              )}
              <Field
                label="What's your biggest challenge right now?"
                placeholder="One line. Be specific."
                value={form.challenge}
                onChange={(v) => onChange('challenge', v)}
              />
            </div>

            <button
              type="submit"
              className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3.5 text-[14px] font-bold text-white transition-transform duration-300 hover:scale-[1.01]"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${accentSoft})`,
                boxShadow: `0 16px 40px -10px ${accent}88`,
              }}
            >
              Book my demo
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="relative mt-3 text-center text-[14px] text-white/55">
              We reply within 4 hours, India business hours. Your data stays
              with UpWon — no third-party sharing.
            </p>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
        {label}
        {required && <span className="ml-0.5 text-orange-300">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-md border border-white/15 bg-white/[0.06] px-3 py-2.5 text-[14px] text-white placeholder:text-white/50 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-md border border-white/15 bg-white/[0.06] px-3 py-2.5 text-[14px] text-white focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-navy-950 text-white">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
