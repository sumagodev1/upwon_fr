import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import PageHero from '../../components/shared/PageHero/PageHero.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import { PLATFORM_MODULES } from '../../data/modules.js';
import { checkProposalRequest, counterFor, isOver, MAX_FOR } from '../../lib/leadFields.js';

export default function ProposalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    email: '',
    mobile: '',
    revenue: '₹25–200 Crore',
    timeline: 'Next 3 months',
    platforms: [],
    notes: '',
  });
  /*
    `attempted` puts every message on screen from the first press; until then a
    field the visitor has not left yet is not reported as wrong.
  */
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = checkProposalRequest(form);
  const hasErrors = Object.values(errors).some(Boolean);
  const errorFor = (name) =>
    attempted || touched[name] ? (errors[name] ?? undefined) : undefined;
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const togglePlatform = (id) =>
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(id)
        ? f.platforms.filter((x) => x !== id)
        : [...f.platforms, id],
    }));

  return (
    <>
      <Seo
        title="Request a Proposal"
        description="Request a formal, fixed-price UpWon proposal for your food or FMCG business — delivered within 24 business hours."
        canonical="https://upwon.in/proposal"
        noindex
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Request a Proposal' },
        ]}
        eyebrow="Formal proposal request"
        title={
          <>
            Request a formal{' '}
            <span className="gradient-text-orange">UpWon proposal.</span>
          </>
        }
        description="For procurement-led evaluations. We deliver a written proposal with scope, pricing, timeline, SLAs and references within 5 business days."
      />

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cream-300 bg-white p-7 shadow-enterprise md:p-10">
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mt-6 h-display text-3xl text-navy-950">
                  Proposal request received.
                </h2>
                <p className="mt-3 text-sm text-charcoal">
                  Your dedicated solution lead is being assigned. Expect a formal scoping call within
                  2 business days, and a written proposal within 5 business days.
                </p>
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
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                    <FileText className="h-3.5 w-3.5" />
                    Proposal details
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <I label="Full name" name="name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} onBlur={() => touch('name')} error={errorFor('name')} />
                  <I label="Role" name="role" placeholder="CFO, IT Head, Procurement" value={form.role} onChange={(v) => setForm({ ...form, role: v })} onBlur={() => touch('role')} error={errorFor('role')} />
                  <I label="Company" name="company" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} onBlur={() => touch('company')} error={errorFor('company')} />
                  <I label="Mobile" name="mobile" type="tel" inputMode="numeric" placeholder="10-digit mobile" required value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} onBlur={() => touch('mobile')} error={errorFor('mobile')} />
                  <I label="Work email" name="email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} onBlur={() => touch('email')} error={errorFor('email')} className="sm:col-span-2" />
                </div>

                <div>
                  <L>Revenue range</L>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['< ₹25 Cr', '₹25–200 Cr', '₹200–1,000 Cr', '₹1,000 Cr+'].map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setForm({ ...form, revenue: r })}
                        className={chipCls(form.revenue === r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <L>Decision timeline</L>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Immediate', 'Next 30 days', 'Next 3 months', '6+ months'].map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setForm({ ...form, timeline: r })}
                        className={chipCls(form.timeline === r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <L>UpWon platforms in scope</L>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {PLATFORM_MODULES.map((p) => {
                      const active = form.platforms.includes(p.id);
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => togglePlatform(p.id)}
                          className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-[14px] font-medium transition-all ${
                            active
                              ? 'border-orange-500 bg-orange-50 text-navy-950'
                              : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
                          }`}
                        >
                          <span>{p.code}</span>
                          {active && <CheckCircle2 className="h-3.5 w-3.5 text-orange-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <L>Scope, RFP requirements, or specific notes</L>
                    <span
                      className={`shrink-0 text-[11px] tabular-nums ${
                        isOver(form.notes, MAX_FOR.notes)
                          ? 'font-medium text-orange-600'
                          : 'text-navy-400'
                      }`}
                    >
                      {counterFor(form.notes, MAX_FOR.notes)}
                    </span>
                  </div>
                  <textarea
                    id="proposal-notes"
                    name="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    onBlur={() => touch('notes')}
                    rows={5}
                    placeholder="Tell us anything specific — number of plants, distributor count, outlet count, integration list, compliance requirements…"
                    aria-invalid={errorFor('notes') ? true : undefined}
                    aria-describedby={errorFor('notes') ? 'proposal-notes-error' : undefined}
                    className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      errorFor('notes')
                        ? 'border-orange-400 focus:border-orange-400'
                        : 'border-cream-400 focus:border-orange-500'
                    }`}
                  />
                  {errorFor('notes') && (
                    <p id="proposal-notes-error" className="mt-1.5 text-[13px] text-orange-600">
                      {errorFor('notes')}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={attempted && hasErrors}
                  className="btn-primary-glow w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Request formal proposal
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-[14px] text-navy-500">
                  Procurement-grade response · MSA-ready · Reference customers available
                </p>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

function I({
  label,
  name,
  required,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  inputMode,
  className = '',
}) {
  const id = `proposal-${name}`;
  const max = MAX_FOR[name];

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id}>
          <L>
            {label}
            {required && <span className="ml-1 text-orange-500">*</span>}
          </L>
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
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
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

function L({ children }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-600">
      {children}
    </span>
  );
}

function chipCls(active) {
  return `rounded-full border px-3 py-1.5 text-[14px] font-medium transition-all ${
    active
      ? 'border-orange-500 bg-orange-500 text-white'
      : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
  }`;
}
