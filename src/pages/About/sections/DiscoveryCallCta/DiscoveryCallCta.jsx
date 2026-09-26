import { useMemo, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import { COMPANY } from '../../../../data/company.js';
import { trackEvent } from '../../../../lib/analytics.js';
import {
  canSubmitDiscoveryCall,
  submitDiscoveryCall,
  DISCOVERY_CALL_NOT_CONNECTED,
} from '../../../../lib/aboutPage.js';
import { checkDiscoveryCall, counterFor, isOver, MAX_FOR } from '../../../../lib/discoveryFields.js';

// Brief §19.6 — Discovery Call CTA.
// Deliberately LOWER commitment than the demo CTA — the About-page visitor
// is reading "who built this" not "show me a demo". The brief calls for
// "Book a 20-Minute Discovery Call — no pitch, just understanding your
// business" with a tighter form (just enough to schedule).
//
// Two lanes:
//   1. Quick WhatsApp tap — instant, owner-friendly
//   2. Tiny 3-field form (name + phone + business) → POST to the About API,
//      which stores the booking in about_discovery_calls and shows it in the
//      admin panel's About Us → Discovery Call Applications tab.
//
// None of the copy here is authored: this section's words and layout stay in
// this file, and the admin tab behind it is an inbox, not a section.
//
// WHAT THIS REPLACED, because it explains why the submit is written the way it
// is. The form called submitLead('discovery_call', …), which fires an analytics
// event and then posts to VITE_LEAD_ENDPOINT — and resolves `{ ok: true }` when
// that endpoint is not configured, which it is not. The success panel below was
// shown unconditionally, one frame after the request that never happened, so
// every discovery call this page has ever taken was congratulated on screen and
// thrown away. Now the row IS the delivery: the panel is shown only for a 2xx,
// every failure is named beside the button, and nothing the visitor typed is
// discarded when one happens.
//
// submitLead is not called alongside the API on purpose — see the note above
// submitDiscoveryCall in lib/aboutPage.js. The one thing it did that mattered,
// the `lead_submit` funnel event, is fired here once the API has accepted the
// row. lib/leads.js itself is untouched and every other form that uses it is
// unaffected.
//
// Renders below the Nashik Pride band as the page's conversion close.

/*
  An untouched form.

  Every key is the API's own field name, so the body posted to the endpoint is
  this object trimmed, and a field error the server reports lands under the right
  input with nothing in between to translate it.
*/
const emptyForm = () => ({ name: '', phone: '', business: '' });

export default function DiscoveryCallCta() {
  /*
    The submit's own state.

    `sent` is set only by a 2xx from the API, which is the whole point: the
    success panel is a statement that a row exists.
    `sending` blocks a second press while the first request is in flight.
    `attempted` makes every field's error visible from the first press, the way a
    blur does for one field.
    `serverErrors` holds what the API named in a 422; each entry survives until
    its own field is edited, so a message never sits under a box it is no longer
    about.
    `submitError` is the one line beside the button explaining the last failed
    attempt. It stays until the next press rather than clearing on the next
    keystroke: "wait a few minutes" has to still be on screen when the visitor
    looks back at the button.
  */
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  /** The in-flight latch. See onSubmit for why this is a ref and not state. */
  const inFlight = useRef(false);

  /*
    Whether a booking can be delivered at all in this build. False means no
    VITE_API_BASE_URL, so there is nowhere to post to: the form says so before
    the visitor fills anything in, and the button is disabled. The alternative —
    three fields and a success panel over a request that never happened — is
    exactly what this section used to do.
  */
  const deliverable = canSubmitDiscoveryCall();

  /*
    Every field's error, recomputed each render. Cheap, and it means the button
    and the inline messages can never disagree about whether the form is ready.
  */
  const errors = useMemo(() => checkDiscoveryCall(form), [form]);
  const hasErrors = Object.values(errors).some(Boolean);

  /**
   * A server error shows until its field changes; a local one once the field has
   * been left, or once the button has been pressed.
   */
  const errorFor = (name) =>
    serverErrors[name] ?? (attempted || touched[name] ? (errors[name] ?? undefined) : undefined);

  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  /** An edited field no longer carries the last attempt's error from the API. */
  const patch = (changes) => {
    setForm((f) => ({ ...f, ...changes }));
    setServerErrors((current) => {
      const next = { ...current };
      Object.keys(changes).forEach((field) => delete next[field]);
      return next;
    });
  };

  /*
    The submit.

    Three things have to hold every time: it never books the same call twice, it
    never shows the success panel for a request that did not succeed, and it
    never discards what the visitor typed.
  */
  async function onSubmit(event) {
    event.preventDefault();

    /*
      A second press while the first request is in flight would file the booking
      twice. Three things stop that, and the ref is the one that actually has to
      hold: the button is disabled while `sending`, but `sending` is a state flag,
      so two submit events raised in the same tick — a double click, Enter on top
      of a click, a password manager submitting the form — both run against the
      render where it was still false. A ref changes immediately.
    */
    if (inFlight.current) return;

    setAttempted(true);
    setSubmitError(null);

    // Nothing is sent while a field is wrong. setAttempted above has already put
    // every message on screen, so the visitor can see why.
    if (hasErrors) return;

    inFlight.current = true;
    setSending(true);
    try {
      const result = await submitDiscoveryCall(form);

      if (result.ok) {
        // The funnel event the old submitLead call fired, now fired only for a
        // booking that actually landed.
        trackEvent('lead_submit', { source: 'discovery_call' });
        setServerErrors({});
        setSent(true);
        return;
      }

      // Every value the visitor typed stays exactly where it is — `form` is
      // untouched here on purpose — so pressing the button again is one tap away.
      setSubmitError(result.message);
      setServerErrors(result.fieldErrors);
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  // What is said beside the button, in order of what the visitor most needs to
  // know: the form is not connected at all, then why the last press failed, then
  // that something above is still wrong.
  const buttonNotice = !deliverable
    ? DISCOVERY_CALL_NOT_CONNECTED
    : (submitError ?? (attempted && hasErrors ? 'Fix the highlighted fields above to continue.' : null));

  /*
    COMPANY.contact.whatsapp, not COMPANY.whatsapp — there is no such top-level
    key, so this read used to resolve to '' and the button pointed at
    https://wa.me/?text=…, which WhatsApp answers with "this link is invalid".
    Three of the failure messages this form now shows send the visitor to exactly
    this button ("Please WhatsApp us instead"), so a recipient-less link loses the
    booking a second time.
  */
  const waNumber = (COMPANY?.contact?.whatsapp || '').replace(/[^0-9]/g, '');
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

              {!sent ? (
                /*
                  noValidate: the browser's own check would open a native bubble
                  over the first empty box and stop the handler running, so the
                  inline messages below would never appear. The `type` and
                  `required` attributes stay for the keyboard they choose and for
                  what they tell a screen reader; the checks that actually decide
                  are the ones mirroring the server's.
                */
                <form onSubmit={onSubmit} noValidate className="relative">
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
                      name="name"
                      value={form.name}
                      onChange={(v) => patch({ name: v })}
                      onBlur={() => touch('name')}
                      error={errorFor('name')}
                      disabled={sending}
                      required
                      placeholder="Your name"
                    />
                    <DarkField
                      label="Phone / WhatsApp"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => patch({ phone: v })}
                      onBlur={() => touch('phone')}
                      error={errorFor('phone')}
                      disabled={sending}
                      required
                      placeholder="+91 9xx xxx xxxx"
                    />
                    <DarkField
                      label="Business (optional)"
                      name="business"
                      value={form.business}
                      onChange={(v) => patch({ business: v })}
                      onBlur={() => touch('business')}
                      error={errorFor('business')}
                      disabled={sending}
                      placeholder="Bakery, FMCG, QSR, etc."
                    />
                  </div>

                  {buttonNotice && (
                    <p
                      role="alert"
                      className="mt-4 flex items-start gap-1.5 text-[13px] font-medium text-orange-300"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{buttonNotice}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending || !deliverable || (attempted && hasErrors)}
                    aria-busy={sending}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3.5 text-[14px] font-bold text-white transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                    style={{
                      boxShadow: '0 16px 40px -10px rgba(232,93,38,0.55)',
                    }}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <PhoneCall className="h-4 w-4" />
                        Book my 20-min call
                      </>
                    )}
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

function DarkField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  required = false,
  placeholder,
  disabled = false,
}) {
  const id = `discovery-${name}`;
  const max = MAX_FOR[name];

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id}>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
            {label}
            {required && <span className="ml-0.5 text-orange-300">*</span>}
          </span>
        </label>
        {/*
          The counter instead of a `maxLength` attribute: the browser truncates a
          paste at maxLength with no event and no message, which silently loses
          the tail of a pasted value and makes the "must be N characters or fewer"
          message unreachable.
        */}
        <span
          className={`shrink-0 text-[11px] tabular-nums ${
            isOver(value, max) ? 'font-medium text-orange-300' : 'text-white/40'
          }`}
        >
          {counterFor(value, max)}
        </span>
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1.5 w-full rounded-md border bg-white/[0.06] px-3 py-2.5 text-[14px] text-white placeholder:text-white/50 focus:outline-none disabled:opacity-60 ${
          error
            ? 'border-orange-400/70 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30'
            : 'border-white/15 focus:border-white/30 focus:ring-2 focus:ring-orange-500/30'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-orange-300">
          {error}
        </p>
      )}
    </div>
  );
}
