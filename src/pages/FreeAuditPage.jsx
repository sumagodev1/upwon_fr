import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Clock, Shield, FileText, Phone } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import Seo from '../components/common/Seo.jsx';

const STEPS = [
  { icon: Phone, title: '15-min discovery call', desc: 'You share your business model and biggest operational pain.' },
  { icon: FileText, title: 'Operational audit', desc: 'We map your current systems, workflows and friction points.' },
  { icon: Shield, title: 'Blueprint delivered', desc: 'A 6-page document showing what UpWon would do — specific to you.' },
  { icon: Clock, title: 'No-pressure decision', desc: 'You decide if a demo or POC makes sense. We don\'t chase.' },
];

const AUDIT_OUTPUTS = [
  'Current state map: systems, workflows, data flow',
  'Top 5 operational risks identified',
  'Top 5 margin leakage areas with rupee estimates',
  'Recommended UpWon platforms (which, in what order)',
  'Projected go-live timeline and 12-month ROI',
  'Specific industry benchmarks you can compare against',
];

export default function FreeAuditPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    mobile: '',
    revenue: '₹25–200 Crore',
    pain: '',
  });

  return (
    <>
      <Seo
        title="Free Operations Audit — Top 3 Leaks, Highest-ROI Fix"
        description="Share your setup. Our food-industry team returns a one-page audit with the top 3 operational leaks and the highest-ROI fix to prioritise. No cost, no pitch."
        canonical="https://upwon.in/free-audit"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Free Business Audit' },
        ]}
        eyebrow="Free · 60 minutes · No commitment"
        title={
          <>
            A free operational audit for your <br />
            <span className="gradient-text-orange">food or FMCG business.</span>
          </>
        }
        description="Not a sales call. A genuine audit of where your operations are leaking margin — and what a fix would look like. You walk away with a written blueprint either way."
      />

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            {/* Form */}
            <div className="rounded-2xl border border-cream-300 bg-white p-7 shadow-enterprise md:p-10">
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mt-6 h-display text-3xl text-navy-950">
                    Audit request received.
                  </h2>
                  <p className="mt-3 text-sm text-charcoal">
                    A solution lead will reach out within 2 business hours to schedule your 15-minute discovery call.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                  <div>
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
                      Request your audit
                    </p>
                    <h2 className="mt-3 h-display text-2xl text-navy-950 md:text-3xl">
                      Tell us about your business.
                    </h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label="Company" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <Field label="Your role" placeholder="COO, CFO, Operations Head…" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
                    <Field label="Mobile" required value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
                    <Field label="Work email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} className="sm:col-span-2" />
                  </div>

                  <div>
                    <Label>Revenue range</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['< ₹25 Crore', '₹25–200 Crore', '₹200–1,000 Crore', '₹1,000 Crore+'].map((r) => (
                        <button
                          type="button"
                          key={r}
                          onClick={() => setForm({ ...form, revenue: r })}
                          className={`rounded-full border px-3 py-1.5 text-[14px] font-medium transition-all ${
                            form.revenue === r
                              ? 'border-orange-500 bg-orange-500 text-white'
                              : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Your single biggest operational pain</Label>
                    <textarea
                      value={form.pain}
                      onChange={(e) => setForm({ ...form, pain: e.target.value })}
                      rows={4}
                      placeholder="e.g. We can't see secondary sales · We lose 15% to wastage · Franchise outlets run on WhatsApp…"
                      className="mt-2 w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <button type="submit" className="btn-primary-glow w-full !py-3.5">
                    Request my free audit
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[14px] text-navy-500">
                    No spam · Response within 2 hours · No obligation
                  </p>
                </form>
              )}
            </div>

            {/* Side */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-cream-300 bg-white p-6 shadow-sm">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  How the audit works
                </p>
                <ul className="mt-4 space-y-4">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="flex items-start gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-100 text-orange-600">
                        <s.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-950">
                          {String(i + 1).padStart(2, '0')}. {s.title}
                        </p>
                        <p className="mt-0.5 text-[14px] text-charcoal">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-orange-300 bg-orange-50 p-6">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                  What you receive
                </p>
                <ul className="mt-4 space-y-2.5">
                  {AUDIT_OUTPUTS.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-[14px] text-navy-900">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-600" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({ label, required, type = 'text', placeholder, value, onChange, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <Label>
        {label}
        {required && <span className="ml-1 text-orange-500">*</span>}
      </Label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-cream-400 bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
      />
    </label>
  );
}

function Label({ children }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-600">
      {children}
    </span>
  );
}
