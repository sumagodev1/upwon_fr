import { useEffect, useMemo, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  FileText,
  Phone,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import Eyebrow from '../../components/shared/Eyebrow/Eyebrow.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import {
  canSubmitFreeAuditApplication,
  fetchFreeAuditHero,
  submitFreeAuditApplication,
  FREE_AUDIT_NOT_CONNECTED,
} from '../../lib/freeAudit.js';
import { checkFreeAuditApplication, REVENUE_RANGES } from '../../lib/freeAuditFields.js';

// The Free Operational Audit page.
//
// Authored in the admin panel under Resource Page → Free Operational Audit: the
// hero slides come from lib/freeAudit.js once the API answers. Until then — and
// for good whenever it cannot answer — the hero is the built-in slide below,
// which is also exactly what the prerender bakes in, so hydration always
// matches. See lib/freeAudit.js for the three rules the read follows.
//
// The request form POSTs to the API, which stores each request in
// free_audit_applications and shows it in the admin panel's Free Operational
// Audit → Free Audit Applications tab. None of the form's copy, the steps or the
// "What you receive" list is authored: they stay in this file, and the admin
// tab behind the form is an inbox, not a section.
//
// WHAT THIS REPLACED, because it explains why the submit is written the way it
// is. The form's submit handler only set `submitted` — nothing was posted
// anywhere — so every audit request this page has ever taken was congratulated
// on screen and thrown away. Now the row IS the delivery: the success view is
// shown only for a 2xx, every failure is named beside the button, and nothing
// the visitor typed is discarded when one happens.

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


const HERO_ACCENT = '#E85A2A';

/* Hero backdrops — the site’s shared hero artwork: the built-in slide's, and
   the one a published slide with no picture of its own falls back to. This
   page has never had dedicated hero photography of its own; an upload in the
   admin panel's Hero Section is how it gets some. */
const HERO_BG_A = '/images/home_hero_bg.webp';

/* Hero buttons — the same two on every slide, built-in or published. They
   are not authored in the admin panel. */
const HERO_CTA = { label: 'Book the Audit', to: '/demo' };
const HERO_SECONDARY_CTA = { label: 'Take the Self-Evaluation', to: '/self-evaluation' };

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'FREE · 60 MINUTES · NO COMMITMENT',
    headline:
      'A Free Operational Audit for Your Food or FMCG Business.',
    subhead:
      'Not a sales call. A genuine audit of where your operations are leaking margin — and what a fix would look like. You walk away with a written blueprint either way.',
    bg: HERO_BG_A,
    accent: HERO_ACCENT,
    cta: HERO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
];

/*
  The published slides in the shape of HERO_SLIDES.

  Only the words and the pictures are authored; the accent and the two buttons
  are the page's own and stay put. A field lib/freeAudit.js could not vouch for
  arrives as null and takes its built-in value — the eyebrow the built-in
  slide's, the backdrop HERO_BG_A.
*/
function toHeroSlides(published) {
  if (!published) return HERO_SLIDES;

  const [builtIn] = HERO_SLIDES;
  return published.map((slide) => ({
    eyebrow: slide.eyebrow ?? builtIn.eyebrow,
    headline: slide.heading,
    subhead: slide.subtext,
    bg: slide.image ?? HERO_BG_A,
    // Null means no phone crop; HeroSlider then serves `bg` to every viewport.
    mobileBg: slide.mobileImage,
    accent: HERO_ACCENT,
    cta: HERO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  }));
}

/*
  An untouched form, with the revenue chip the page has always preselected.

  These keys are the page's own, not the API's — `mobile` is posted as `phone`
  and `revenue` as `revenueRange`. lib/freeAudit.js owns that translation both
  ways, so everything in this file speaks the form's keys only.
*/
const emptyForm = () => ({
  name: '',
  company: '',
  role: '',
  email: '',
  mobile: '',
  revenue: REVENUE_RANGES[1],
  pain: '',
});

export default function FreeAuditPage() {
  /*
    The hero starts as the built-in slide and is swapped for the published ones
    once the API answers — the same order as every other authored page on the
    site. The fetch resolves to null for every failure (unconfigured, offline,
    CORS, nothing authored), and null means "keep what you have".
  */
  const [hero, setHero] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchFreeAuditHero().then((published) => {
      if (!cancelled && published) setHero(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const heroSlides = useMemo(() => toHeroSlides(hero), [hero]);

  /*
    The submit's own state.

    `submitted` is set only by a 2xx from the API, which is the whole point: the
    success view is a statement that a row exists.
    `sending` blocks a second press while the first request is in flight.
    `attempted` makes every field's error visible from the first press, the way a
    blur does for one field.
    `serverErrors` holds what the API named in a 422, under the form's keys; each
    entry survives until its own field is edited, so a message never sits under a
    box it is no longer about.
    `submitError` is the one line beside the button explaining the last failed
    attempt. It stays until the next press rather than clearing on the next
    keystroke: "wait a few minutes" has to still be on screen when the visitor
    looks back at the button.
  */
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  /** The in-flight latch. See onSubmit for why this is a ref and not state. */
  const inFlight = useRef(false);

  /*
    Whether a request can be delivered at all in this build. False means no
    VITE_API_BASE_URL, so there is nowhere to post to: the form says so before
    the visitor fills anything in, and the button is disabled. The alternative —
    seven fields and a success view over a request that never happened — is
    exactly what this page used to do.
  */
  const deliverable = canSubmitFreeAuditApplication();

  /*
    Every field's error, recomputed each render. Cheap, and it means the button
    and the inline messages can never disagree about whether the form is ready.
  */
  const errors = useMemo(() => checkFreeAuditApplication(form), [form]);
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

    Three things have to hold every time: it never files the same request twice,
    it never shows the success view for a request that did not succeed, and it
    never discards what the visitor typed.
  */
  async function onSubmit(event) {
    event.preventDefault();

    /*
      A second press while the first request is in flight would file the request
      twice. The button is disabled while `sending`, but `sending` is a state
      flag, so two submit events raised in the same tick — a double click, Enter
      on top of a click, a password manager submitting the form — both run
      against the render where it was still false. A ref changes immediately.
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
      const result = await submitFreeAuditApplication(form);

      if (result.ok) {
        setServerErrors({});
        setSubmitted(true);
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
    ? FREE_AUDIT_NOT_CONNECTED
    : (submitError ?? (attempted && hasErrors ? 'Fix the highlighted fields above to continue.' : null));

  const revenueError = errorFor('revenue');
  const painError = errorFor('pain');

  return (
    <>
      <Seo
        title="Free Operations Audit — Top 3 Leaks, Highest-ROI Fix"
        description="Share your setup. Our food-industry team returns a one-page audit with the top 3 operational leaks and the highest-ROI fix to prioritise. No cost, no pitch."
        canonical="https://upwon.in/free-audit"
      />
      <HeroSlider
        slides={heroSlides}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
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
                  <h2 className="mt-6 h-display text-[22px] leading-[1.2] tracking-tight text-navy-950 sm:text-[26px]">
                    Audit request received.
                  </h2>
                  <p className="mt-3 text-sm text-charcoal">
                    A solution lead will reach out within 2 business hours to schedule your 15-minute discovery call.
                  </p>
                </motion.div>
              ) : (
                /*
                  noValidate: the browser's own check would open a native bubble
                  over the first empty box and stop the handler running, so the
                  inline messages below would never appear. The `type` and
                  `required` attributes stay for the keyboard they choose and for
                  what they tell a screen reader; the checks that actually decide
                  are the ones mirroring the server's, in lib/freeAuditFields.js.
                */
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div>
                    <Eyebrow>REQUEST YOUR AUDIT</Eyebrow>
                    <h2 className="mt-3 h-display text-[22px] leading-[1.2] tracking-tight text-navy-950 sm:text-[26px]">
                      Tell us about your business.
                    </h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      name="name"
                      required
                      value={form.name}
                      onChange={(v) => patch({ name: v })}
                      onBlur={() => touch('name')}
                      error={errorFor('name')}
                      disabled={sending}
                    />
                    <Field
                      label="Company"
                      name="company"
                      required
                      value={form.company}
                      onChange={(v) => patch({ company: v })}
                      onBlur={() => touch('company')}
                      error={errorFor('company')}
                      disabled={sending}
                    />
                    <Field
                      label="Your role"
                      name="role"
                      placeholder="COO, CFO, Operations Head…"
                      value={form.role}
                      onChange={(v) => patch({ role: v })}
                      onBlur={() => touch('role')}
                      error={errorFor('role')}
                      disabled={sending}
                    />
                    <Field
                      label="Mobile"
                      name="mobile"
                      required
                      value={form.mobile}
                      onChange={(v) => patch({ mobile: v })}
                      onBlur={() => touch('mobile')}
                      error={errorFor('mobile')}
                      disabled={sending}
                    />
                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(v) => patch({ email: v })}
                      onBlur={() => touch('email')}
                      error={errorFor('email')}
                      disabled={sending}
                      className="sm:col-span-2"
                    />
                  </div>

                  <div>
                    <Label>Revenue range</Label>
                    {/* The chips are drawn from REVENUE_RANGES, the same four
                        strings the server accepts — see lib/freeAuditFields.js. */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {REVENUE_RANGES.map((r) => (
                        <button
                          type="button"
                          key={r}
                          onClick={() => patch({ revenue: r })}
                          disabled={sending}
                          className={`rounded-full border px-3 py-1.5 text-[14px] font-medium transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
                            form.revenue === r
                              ? 'border-orange-500 bg-orange-500 text-white'
                              : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    <FieldError id="free-audit-revenue-error" message={revenueError} />
                  </div>

                  <div>
                    <Label>Your single biggest operational pain</Label>
                    <textarea
                      id="free-audit-pain"
                      name="pain"
                      value={form.pain}
                      onChange={(e) => patch({ pain: e.target.value })}
                      onBlur={() => touch('pain')}
                      disabled={sending}
                      aria-invalid={painError ? true : undefined}
                      aria-describedby={painError ? 'free-audit-pain-error' : undefined}
                      rows={4}
                      placeholder="e.g. We can't see secondary sales · We lose 15% to wastage · Franchise outlets run on WhatsApp…"
                      className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 outline-none disabled:bg-cream-200 disabled:text-navy-500 ${
                        painError
                          ? 'border-orange-600 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20'
                          : 'border-cream-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                    />
                    <FieldError id="free-audit-pain-error" message={painError} />
                  </div>

                  {buttonNotice && (
                    <p
                      role="alert"
                      className="flex items-start gap-1.5 text-[13px] font-medium text-orange-700"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>{buttonNotice}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending || !deliverable || (attempted && hasErrors)}
                    aria-busy={sending}
                    className="btn-primary-glow w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                  >
                    {sending ? (
                      <>
                        Sending…
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Request my free audit
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
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

/*
  One text input. The wrapping <label> is what it always was; the wrapper <div>
  around it exists only so the inline message can sit under the input without
  being inside the label (a <p> is not allowed there).
*/
function Field({
  label,
  name,
  required,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = '',
}) {
  const id = `free-audit-${name}`;

  return (
    <div className={className}>
      <label className="block">
        <Label>
          {label}
          {required && <span className="ml-1 text-orange-500">*</span>}
        </Label>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`mt-2 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-navy-950 outline-none disabled:bg-cream-200 disabled:text-navy-500 ${
            error
              ? 'border-orange-600 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20'
              : 'border-cream-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
          }`}
        />
      </label>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** One field's inline message. Renders nothing when the field is fine. */
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] text-orange-700">
      {message}
    </p>
  );
}

function Label({ children }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-600">
      {children}
    </span>
  );
}
