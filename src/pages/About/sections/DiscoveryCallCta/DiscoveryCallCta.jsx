import { useState } from 'react';
import { color, m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import { COMPANY } from '../../../../data/company.js';
import { submitLead } from '../../../../lib/leads.js';

// Brief §19.6 — Discovery Call CTA.
// Deliberately LOWER commitment than the demo CTA — the About-page visitor
// is reading "who built this" not "show me a demo". The brief calls for
// "Book a 20-Minute Discovery Call — no pitch, just understanding your
// business" with a tighter form (just enough to schedule).
//
// Two lanes:
//   1. Quick WhatsApp tap — instant, owner-friendly
//   2. Tiny 3-field form (name + phone + business) → submitLead with
//      source 'discovery_call'. Lower fields than the demo form so the
//      About-page conversion rate stays higher than /demo.
//
// Renders below the Nashik Pride band as the page's conversion close.
export default function DiscoveryCallCta() {
  const [form, setForm] = useState({ name: '', phone: '', business: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    await submitLead('discovery_call', form);
    setSubmitting(false);
    setDone(true);
  }

  const waNumber = (COMPANY?.whatsapp || '').replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hi UpWon — I'd like to book a 20-min discovery call.",
  )}`;

  return (
    <section
      id="discovery-call"
      className="relative overflow-hidden bg-cream-100 section-pad scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-orange-500/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-teal-500/[0.08] blur-[140px]" />

      <Container className="relative">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-enterprise">
          <div className="grid items-stretch md:grid-cols-[1.1fr_1fr]">
            {/* LEFT — pitch */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 md:p-10"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-700">
                <Clock className="h-3 w-3" />
                20 minutes · No pitch
              </p>
              <h2 className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]">
                Ready to work with a team that{' '}
                <span className="gradient-text-orange">gets your industry?</span>
              </h2>
              <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]">
                Book a 20-minute discovery call — no pitch, no slides, no
                pressure. Just one of our domain leads asking honest questions
                about your business and telling you whether UpWon is the right
                fit.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Honest "yes / no / not yet" answer',
                  'Talk to a domain lead — not an SDR',
                  'We map your problem before suggesting any product',
                  'You decide if a demo is worth your time',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[14px] text-navy-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#25D366] px-4 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe57]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Quick chat on WhatsApp
                </a>
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-700 hover:text-navy-950"
                >
                  Skip the call — book a 30-min demo instead →
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — form */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-[#0a0e26] p-8 text-white md:p-10"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />

              {!done ? (
                <form onSubmit={onSubmit} className="relative">
                  <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-300">
                    <Sparkles className="h-3 w-3" />
                    Book a discovery call
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold md:text-2xl">
                    Three fields. 20 seconds.
                  </h3>
                  <p className="mt-1.5 text-[14px] text-white">
                    We reply within 4 hours, India business hours.
                  </p>

                  <div className="mt-5 grid gap-3.5">
                    <DarkField
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                      placeholder="Your name"
                    />
                    <DarkField
                      label="Phone / WhatsApp"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                      required
                      placeholder="+91 9xx xxx xxxx"
                    />
                    <DarkField
                      label="Business (optional)"
                      value={form.business}
                      onChange={(v) => setForm({ ...form, business: v })}
                      placeholder="Bakery, FMCG, QSR, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3.5 text-[14px] font-bold text-white transition-transform duration-300 hover:scale-[1.01] disabled:opacity-60"
                    style={{
                      boxShadow: '0 16px 40px -10px rgba(232,93,38,0.55)',
                    }}
                  >
                    <PhoneCall className="h-4 w-4" />
                    {submitting ? 'Sending…' : 'Book my 20-min call'}
                  </button>

                  <p className="mt-3 text-center text-[14px] text-white">
                    No spam. No automated sequences. One human reply within 4 hours.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative grid place-items-center text-center"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
                    <CheckCircle2 className="h-7 w-7 text-emerald-300" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">
                    Talk soon, {form.name?.split(' ')[0] || 'friend'}.
                  </h3>
                  <p className="mt-2 max-w-sm text-[14px] text-white/70">
                    One of our domain leads will reach out within 4 hours to
                    confirm your discovery call. Check WhatsApp + email.
                  </p>
                  <Link
                    to="/resources"
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-300 hover:text-orange-200"
                  >
                    While you wait — browse the resources hub
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DarkField({ label, value, onChange, type = 'text', required, placeholder }) {
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
