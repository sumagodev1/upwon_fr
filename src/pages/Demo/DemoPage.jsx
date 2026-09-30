import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Clock, ShieldCheck, MessageCircle, Calendar } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import { TRUST_LOGOS } from '../../data/metrics.js';
import { submitLead } from '../../lib/leads.js';
import { checkDemoRequest, counterFor, isOver, MAX_FOR } from '../../lib/leadFields.js';
import Seo from '../../components/shared/Seo/Seo.jsx';

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    mobile: '',
    email: '',
    industry: 'Bakery & Confectionery',
    challenge: '',
  });
  /*
    `attempted` puts every message on screen from the first press; until then a
    field the visitor has not left yet is not reported as wrong.
  */
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = checkDemoRequest(form);
  const hasErrors = Object.values(errors).some(Boolean);
  const errorFor = (name) =>
    attempted || touched[name] ? (errors[name] ?? undefined) : undefined;
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  return (
    <>
    <Seo
      title="Book a Free 30-Minute Demo"
      description="See UpWon working on your business — 30 minutes, your industry, no generic tour. Book directly with our product team."
      canonical="https://upwon.in/demo"
    />
    <section className="relative min-h-screen overflow-hidden bg-cream-100 pt-44 pb-16 md:pt-52">
      <div className="absolute inset-0 grid-bg-light opacity-50" />

      <Container className="relative">
        <div className="grid gap-0 overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-enterprise-lg lg:grid-cols-[1.2fr_1fr]">
          {/* Left — form */}
          <div className="p-8 md:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
              Step 1 of 2 — Tell us about your business
            </p>
            <h1 className="mt-3 h-display text-3xl text-navy-950 md:text-4xl">
              Book your <span className="gradient-text-orange">free 30-minute demo</span>
            </h1>
            <p className="mt-3 text-sm text-charcoal">
              No generic tour. No sales pressure. We demo your industry, your pain points, your use case.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="mt-4 h-display text-2xl text-navy-950">Demo request received</h2>
                <p className="mt-2 text-sm text-charcoal">
                  Your consultant will reach out within <strong>2 business hours</strong> to confirm
                  the time and share a brief pre-call questionnaire. We come prepared on your
                  industry.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/919356898277"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !text-[14px]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Chat with us on WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  setAttempted(true);
                  // Nothing is sent while a field is wrong. setAttempted above
                  // has already put every message on screen.
                  if (hasErrors) return;
                  // Fire-and-forget so success is instant; the lead is
                  // delivered to the CRM endpoint when configured and a
                  // `lead_submit` analytics event always fires.
                  submitLead('demo', {
                    name: form.name,
                    company: form.company,
                    mobile: form.mobile,
                    email: form.email,
                    industry: form.industry,
                  });
                  setSubmitted(true);
                }}
                className="mt-8 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <DemoInput label="Full name" name="name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} onBlur={() => touch('name')} error={errorFor('name')} />
                  <DemoInput label="Company" name="company" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} onBlur={() => touch('company')} error={errorFor('company')} />
                  <DemoInput label="Mobile" name="mobile" type="tel" inputMode="numeric" placeholder="10-digit mobile" required value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} onBlur={() => touch('mobile')} error={errorFor('mobile')} />
                  <DemoInput label="Work email" name="email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} onBlur={() => touch('email')} error={errorFor('email')} />
                </div>

                <div>
                  <DemoLabel>Industry</DemoLabel>
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-cream-400 bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500"
                  >
                    {[
                      'Bakery & Confectionery',
                      'Dairy & Ice Cream',
                      'Beverages & Juices',
                      'Spices & Agro',
                      'Sweets & Namkeen',
                      'FMCG Distribution',
                      'QSR & Franchise F&B',
                      'Food Processing',
                      'Non-Food FMCG',
                      'Other',
                    ].map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <DemoLabel>Your biggest operational challenge (optional)</DemoLabel>
                    <span
                      className={`shrink-0 text-[11px] tabular-nums ${
                        isOver(form.challenge, MAX_FOR.challenge)
                          ? 'font-medium text-orange-600'
                          : 'text-navy-400'
                      }`}
                    >
                      {counterFor(form.challenge, MAX_FOR.challenge)}
                    </span>
                  </div>
                  <textarea
                    id="demo-challenge"
                    name="challenge"
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    onBlur={() => touch('challenge')}
                    rows={3}
                    placeholder="e.g. We lose 15% to wastage and don't know where…"
                    aria-invalid={errorFor('challenge') ? true : undefined}
                    aria-describedby={errorFor('challenge') ? 'demo-challenge-error' : undefined}
                    className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      errorFor('challenge')
                        ? 'border-orange-400 focus:border-orange-400'
                        : 'border-cream-400 focus:border-orange-500'
                    }`}
                  />
                  {errorFor('challenge') && (
                    <p id="demo-challenge-error" className="mt-1.5 text-[13px] text-orange-600">
                      {errorFor('challenge')}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={attempted && hasErrors}
                  className="btn-primary-glow w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Book My Free Demo
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-navy-500">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-orange-500" /> No spam
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-orange-500" /> Response within 2 hours
                  </span>
                  <span>No obligation</span>
                </div>
              </form>
            )}
          </div>

          {/* Right — what happens + social proof */}
          <div className="relative overflow-hidden bg-navy-950 p-8 text-white md:p-12">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-navy-400/18 blur-3xl" />

            <div className="relative">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                What happens in your demo
              </p>
              <ul className="mt-6 space-y-5">
                {[
                  { n: 1, t: 'We review your industry before the call', d: 'No cold pitch. We come prepared on your operational reality.' },
                  { n: 2, t: 'Live walkthrough of relevant modules', d: 'We show only the platforms that fit your business — not a generic tour.' },
                  { n: 3, t: 'Personalised ROI estimate', d: 'Before the call ends, you have a number you can defend internally.' },
                  { n: 4, t: 'No pressure', d: 'If it fits, we outline timeline and next steps. If not, that\'s fine too.' },
                ].map((s) => (
                  <li key={s.n} className="flex items-start gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-orange-500/30 bg-orange-500/10 text-[14px] font-bold text-orange-300">
                      {s.n}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{s.t}</p>
                      <p className="mt-0.5 text-[14px] text-cream-100/70">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-white/[0.06] pt-8">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-cream-100/60">
                  Already trusted by
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TRUST_LOGOS.slice(0, 8).map((logo) => (
                    <span
                      key={logo}
                      className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[14px] font-medium text-cream-100"
                    >
                      {logo}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-[14px] italic text-cream-100/80">
                  "93% of clients who took a demo signed within 30 days."
                </p>
              </div>

              <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                  <Calendar className="h-3.5 w-3.5" />
                  Prefer to pick a time?
                </p>
                <p className="mt-2 text-[14px] text-cream-100/70">
                  After form submission, you'll receive a calendar link to self-schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}

function DemoInput({
  label,
  name,
  required,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  inputMode,
}) {
  const id = `demo-${name}`;
  const max = MAX_FOR[name];

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id}>
          <DemoLabel>
            {label}
            {required && <span className="ml-1 text-orange-500">*</span>}
          </DemoLabel>
        </label>
        {/*
          A counter rather than a `maxLength` attribute: the browser truncates a
          paste at maxLength with no event and no message, which silently loses
          the tail and makes the "N characters or fewer" message unreachable.
        */}
        {max !== undefined && (
          <span
            className={`shrink-0 text-[11px] tabular-nums ${
              isOver(value, max) ? 'font-medium text-orange-600' : 'text-navy-400'
            }`}
          >
            {counterFor(value, max)}
          </span>
        )}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:ring-2 focus:ring-orange-500/20 ${
          error ? 'border-orange-400 focus:border-orange-400' : 'border-cream-400 focus:border-orange-500'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-orange-600">
          {error}
        </p>
      )}
    </div>
  );
}

function DemoLabel({ children }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-600">
      {children}
    </span>
  );
}
