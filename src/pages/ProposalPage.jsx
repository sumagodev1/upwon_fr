import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import Seo from '../components/common/Seo.jsx';
import { PLATFORM_MODULES } from '../data/modules.js';

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
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                    <FileText className="h-3.5 w-3.5" />
                    Proposal details
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <I label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <I label="Role" placeholder="CFO, IT Head, Procurement" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
                  <I label="Company" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                  <I label="Mobile" required value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
                  <I label="Work email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} className="sm:col-span-2" />
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
                  <L>Scope, RFP requirements, or specific notes</L>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={5}
                    placeholder="Tell us anything specific — number of plants, distributor count, outlet count, integration list, compliance requirements…"
                    className="mt-2 w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <button type="submit" className="btn-primary-glow w-full !py-3.5">
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

function I({ label, required, type = 'text', placeholder, value, onChange, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <L>
        {label}
        {required && <span className="ml-1 text-orange-500">*</span>}
      </L>
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
