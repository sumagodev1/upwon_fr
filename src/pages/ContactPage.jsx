import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Calendar, CheckCircle2, Building2, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import { COMPANY } from '../data/company.js';
import Seo from '../components/common/Seo.jsx';

const BUSINESS_TYPES = [
  'Manufacturing',
  'Distribution',
  'Franchise / Retail',
  'Cloud Kitchen / QSR',
  'Multi-vertical Group',
  'Other',
];

const SCALE_OPTIONS = ['< ₹25 Cr', '₹25 – 200 Cr', '₹200 – 1,000 Cr', '₹1,000 Cr+'];

const MODULES = [
  'UpWon ERP',
  'UpWon SFA-DMS',
  'UpWon FMS & POS',
  'UpWon HREasy',
  'UpWon WMS',
  'UpWon Vendor Portal',
  'UpWon Mobile Apps',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    workEmail: '',
    phone: '',
    company: '',
    role: '',
    businessType: 'Manufacturing',
    scale: '₹25 – 200 Cr',
    modules: [],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleModule = (m) =>
    setForm((f) => ({
      ...f,
      modules: f.modules.includes(m)
        ? f.modules.filter((x) => x !== m)
        : [...f.modules, m],
    }));

  return (
    <>
      <Seo
        title="Contact UpWon Sales"
        description="Call our toll-free sales line, WhatsApp us or send a message — Indian-time response. Nashik, Pune and Mumbai offices."
        canonical="https://upwon.in/contact"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Contact' },
        ]}
        eyebrow="Get in touch"
        title={
          <>
            Let's talk about your{' '}
            <span className="gradient-text-orange">operations.</span>
          </>
        }
        description="Tell us your industry and your biggest pain point. A solution lead from the UpWon team will get back to you within 2 business hours."
      />

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />

        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* Form */}
            <div className="relative overflow-hidden rounded-2xl border border-cream-300 bg-white p-7 shadow-enterprise md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-orange-300 bg-orange-100 text-orange-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mt-6 h-display text-3xl text-navy-950 md:text-4xl">
                    We've got your message.
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-charcoal">
                    A UpWon solution lead will reach out within 2 business hours. In the meantime,
                    feel free to explore the platform.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href="/platform" className="btn-primary">
                      Explore Platform
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary"
                    >
                      Submit another request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-7">
                  <div>
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
                      Tell us about your business
                    </p>
                    <h2 className="mt-4 h-display text-2xl text-navy-950 md:text-3xl">
                      One conversation. We take it from there.
                    </h2>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                    <Field label="Work email" type="email" value={form.workEmail} onChange={(v) => setForm({ ...form, workEmail: v })} required />
                    <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
                    <Field label="Your role" placeholder="COO, Head of Operations, IT Director…" value={form.role} onChange={(v) => setForm({ ...form, role: v })} className="sm:col-span-2" />
                  </div>

                  <div>
                    <Label>Business type</Label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {BUSINESS_TYPES.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm({ ...form, businessType: b })}
                          className={`rounded-full border px-3.5 py-1.5 text-[14px] font-medium transition-all ${
                            form.businessType === b
                              ? 'border-orange-500 bg-orange-500 text-white'
                              : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Revenue range</Label>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      {SCALE_OPTIONS.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setForm({ ...form, scale: s })}
                          className={`rounded-lg border px-3 py-2.5 text-[14px] font-medium transition-all ${
                            form.scale === s
                              ? 'border-orange-500 bg-orange-500 text-white'
                              : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>UpWon platforms of interest</Label>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {MODULES.map((m) => {
                        const active = form.modules.includes(m);
                        return (
                          <button
                            type="button"
                            key={m}
                            onClick={() => toggleModule(m)}
                            className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-[14px] font-medium transition-all ${
                              active
                                ? 'border-orange-500 bg-orange-50 text-navy-950'
                                : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
                            }`}
                          >
                            <span>{m}</span>
                            {active && <CheckCircle2 className="h-3.5 w-3.5 text-orange-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label>What are you trying to solve?</Label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly describe your current operational pain points and what success looks like…"
                      rows={5}
                      className="mt-3 w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream-300 pt-6">
                    <p className="text-[14px] text-navy-500">
                      No spam · Response within 2 business hours · No obligation
                    </p>
                    <button type="submit" className="btn-primary-glow !px-6 !py-3">
                      Send message
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Side info */}
            <div className="space-y-5">
              <SideCard
                icon={Calendar}
                title="Faster path: Book a demo"
                content={
                  <div>
                    <p className="text-sm text-charcoal">
                      Skip the message form. Book a 30-minute demo directly.
                    </p>
                    <a href="/demo" className="mt-4 btn-primary !text-[14px]">
                      Book Free Demo
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                }
              />

              <SideCard
                icon={Building2}
                title="Where we are"
                content={
                  <div className="space-y-3 text-sm text-navy-800">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                      <div>
                        <p className="font-semibold text-navy-950">Nashik · HQ</p>
                        <p className="text-[14px] text-navy-600">
                          Maharashtra · India's food processing belt
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                      <div>
                        <p className="font-semibold text-navy-950">{COMPANY.parent}</p>
                        <p className="text-[14px] text-navy-600">
                          Founded 2016 · {COMPANY.team} senior domain experts
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />

              <SideCard
                icon={Mail}
                title="Direct lines"
                content={
                  <div className="space-y-2.5 text-sm">
                    <a href={`mailto:${COMPANY.contact.email}`} className="flex items-center gap-2.5 text-navy-800 hover:text-orange-600">
                      <Mail className="h-4 w-4 text-orange-500" />
                      {COMPANY.contact.email}
                    </a>
                    <a href={`tel:${COMPANY.contact.phone}`} className="flex items-center gap-2.5 text-navy-800 hover:text-orange-600">
                      <Phone className="h-4 w-4 text-orange-500" />
                      {COMPANY.contact.phone}
                    </a>
                    <a
                      href={`https://wa.me/${COMPANY.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-navy-800 hover:text-orange-600"
                    >
                      <MessageCircle className="h-4 w-4 text-orange-500" />
                      Chat on WhatsApp
                    </a>
                  </div>
                }
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '', required = false, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <Label>{label}{required && <span className="ml-1 text-orange-500">*</span>}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-lg border border-cream-400 bg-white px-4 py-3 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
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

function SideCard({ icon: Icon, title, content }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange-100 text-orange-600">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold text-navy-950">{title}</p>
      </div>
      <div className="mt-5">{content}</div>
    </div>
  );
}
