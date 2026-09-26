import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { AlertCircle, ArrowRight, ArrowUpRight, CheckCircle2, Building2, Loader2, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import ContactHeroSection from './sections/ContactHeroSection/ContactHeroSection.jsx';
import ContactCtaSection from './sections/ContactCtaSection/ContactCtaSection.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import {
  ENQUIRY_NOT_CONNECTED,
  ENQUIRY_OPTIONS_CHANGED,
  ENQUIRY_OPTIONS_STALE,
  canSubmitEnquiry,
  fetchContactDetails,
  fetchContactForm,
  submitContactEnquiry,
} from '../../lib/contactPage.js';
import { MAX_FOR, checkEnquiry, counterFor, isOver } from '../../lib/enquiryFields.js';

/*
  /contact

  Three sections are authored in the admin panel's Contact tabs: the hero owns
  its own file, and the enquiry form's copy and the two side cards are read
  here. The closing CTA below is not authored — it is static, and reads
  data/company.js as it always has.

  What the admin owns is what a visitor can read: the copy around the form, the
  three choice lists, the footnote, the success copy, the card titles, the
  offices and the direct lines. The form's inputs, its field labels, its submit
  button and the success buttons are behaviour and stay in code.

  Both content blocks below start from the built-in content — what the SSG
  build bakes into the prerendered HTML and what renders if the API is
  unreachable — and swap to the published content once the API answers, the way
  the Insider sections do.

  THE FORM ITSELF DELIVERS. It posts to the API's one public write, and what
  comes back decides what the visitor sees: the success panel only once a row
  has actually been filed, and a named failure with every typed value still in
  place otherwise. It used to call setSubmitted(true) and throw the answers
  away — there is no mail transport behind this endpoint, so the row in
  contact_enquiries is the only delivery there is, and a submit that failed
  quietly was a lead lost without anyone knowing.

  Every field is checked here before anything is sent, against the same bounds
  the server's validator applies (lib/enquiryFields.js mirrors it rule for
  rule), so a visitor fixes a typo under the input rather than in a 422. The
  server stays the authority: a field error it reports anyway is shown under
  that same input, which works because the form state is keyed by the API's own
  field names.
*/

/*
  The built-in enquiry-form copy, written in the shape lib/contactPage.js
  returns.

  The heading is authored with the home hero's markers — a newline for a line
  break, `**like this**` for the orange accent — and arrives parsed into
  `headingLines`, so the built-in one is written in that same parsed shape and
  the two render through one path. This one carries no accent.
*/
const FALLBACK_FORM = {
  eyebrow: 'Tell us about your business',
  headingLines: [
    [{ text: 'One conversation. We take it from there.', accent: false }],
  ],
  businessTypes: [
    'Manufacturing',
    'Distribution',
    'Franchise / Retail',
    'Cloud Kitchen / QSR',
    'Multi-vertical Group',
    'Other',
  ],
  revenueRanges: ['< ₹25 Cr', '₹25 – 200 Cr', '₹200 – 1,000 Cr', '₹1,000 Cr+'],
  platforms: [
    'UpWon ERP',
    'UpWon SFA-DMS',
    'UpWon FMS & POS',
    'UpWon HREasy',
    'UpWon WMS',
    'UpWon Vendor Portal',
    'UpWon Mobile Apps',
  ],
  footnote: 'No spam · Response within 2 business hours · No obligation',
  successHeading: "We've got your message.",
  successBody:
    'A UpWon solution lead will reach out within 2 business hours. In the meantime, feel free to explore the platform.',
};

/*
  The built-in contact details. These used to be read from data/company.js;
  the admin panel owns them now, so the values live here as the fallback and
  COMPANY is left untouched for the rest of the site — including this page's
  own closing CTA, which still reads its WhatsApp number from there.
*/
const FALLBACK_DETAILS = {
  officesTitle: 'Where we are',
  offices: [
    { name: 'Nashik · HQ', detail: "Maharashtra · India's food processing belt" },
    {
      name: 'Byte Elephants Technologies Pvt Ltd',
      detail: 'Founded 2016 · 30 senior domain experts',
    },
  ],
  directTitle: 'Direct lines',
  email: 'hello@upwon.in',
  phone: '+91 93568 98277',
  whatsapp: '+919356898277',
};

// The two chips the form opens on, as it always has. Once published content
// arrives, a selection that is no longer offered moves to the first option —
// see the reconcile effect below.
const INITIAL_BUSINESS_TYPE = 'Manufacturing';
const INITIAL_REVENUE_RANGE = '₹25 – 200 Cr';

/*
  An untouched form.

  Every key is the API's own field name — fullName, not name; revenueRange, not
  scale; platforms, not modules — so the body posted to the endpoint is this
  object trimmed, and a field error the server reports lands under the right
  input with nothing in between to translate it. Renaming a field here means
  renaming it on the server, which is the point.

  The two opening chips are checked against the copy in hand rather than set
  blind. A fresh form is built twice — once on mount against the built-in copy,
  and again behind "Submit another request", by which time the published copy
  has arrived — and an admin who has renamed "Manufacturing" would otherwise
  leave that second form opening on a chip that no longer exists: nothing lit,
  and an error on a choice the visitor never made.
*/
const emptyEnquiry = (copy) => ({
  fullName: '',
  workEmail: '',
  phone: '',
  company: '',
  role: '',
  businessType: copy.businessTypes.includes(INITIAL_BUSINESS_TYPE)
    ? INITIAL_BUSINESS_TYPE
    : copy.businessTypes[0],
  revenueRange: copy.revenueRanges.includes(INITIAL_REVENUE_RANGE)
    ? INITIAL_REVENUE_RANGE
    : copy.revenueRanges[0],
  platforms: [],
  message: '',
});

/*
  The fields whose legal values are published content rather than anything the
  visitor typed. A server error on one of these is not a typo to correct — it
  means the list on screen is out of date — so handleSubmit answers it by
  re-reading the copy rather than by asking the visitor to try again.
*/
const CHOICE_FIELDS = ['businessType', 'revenueRange', 'platforms'];

/*
  One authored heading, rendered line by line with the accented parts in the
  orange gradient — the same renderer the home hero and the Insider feature
  section use.
*/
function Heading({ lines }) {
  return lines.map((parts, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {parts.map((part, partIndex) =>
        part.accent ? (
          <span key={partIndex} className="gradient-text-orange">
            {part.text}
          </span>
        ) : (
          <Fragment key={partIndex}>{part.text}</Fragment>
        ),
      )}
    </Fragment>
  ));
}

export default function ContactPage() {
  const [form, setForm] = useState(() => emptyEnquiry(FALLBACK_FORM));

  /*
    The submit's own state.

    `sent` is set only by a 2xx from the API, which is the whole point of this
    change — the success panel is a statement that a row exists.
    `sending` blocks a second press while the first request is in flight.
    `attempted` makes every field's error visible from the first press, the way
    a blur does for one field.
    `serverErrors` holds what the API named in a 422; each entry survives until
    its own field is edited, so a message never sits under a box it is no
    longer about.
    `submitError` is the one line beside the button explaining the last failed
    attempt. It stays until the next press rather than clearing on the next
    keystroke: "wait a few minutes" has to still be on screen when the visitor
    looks back at the button.
  */
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  /** The in-flight latch. See handleSubmit for why this is a ref and not state. */
  const inFlight = useRef(false);

  /*
    Published content, or the built-in content until the API answers. Both
    fetches resolve to null for every failure — unconfigured, offline, CORS,
    nothing published — and null means "keep what you have".
  */
  const [formCopy, setFormCopy] = useState(FALLBACK_FORM);
  const [details, setDetails] = useState(FALLBACK_DETAILS);

  /*
    Whether an enquiry can be delivered at all in this build. False means no
    VITE_API_BASE_URL, so there is nowhere to post to: the form says so before
    the visitor fills anything in, and the button is disabled. The alternative
    — nine fields and a success panel over a request that never happened — is
    exactly what this page used to do.
  */
  const deliverable = canSubmitEnquiry();

  useEffect(() => {
    let cancelled = false;

    fetchContactForm().then((published) => {
      if (!cancelled && published) setFormCopy(published);
    });
    fetchContactDetails().then((published) => {
      if (!cancelled && published) setDetails(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
    The choice lists are content, so they can change under a half-filled form —
    when the published ones arrive, or if an admin republishes while the page
    is open. A selection that is no longer offered would sit in the form state
    invisibly, with no chip lit, so it is moved to the first option; ticked
    platforms that are gone are dropped. Both lists are guaranteed non-empty:
    lib/contactPage.js refuses published copy that has an empty one.

    This matters more now than it did: the server validates the three choice
    fields against the options it is publishing right now, so a stale selection
    left in place would come back as a 422 on a chip the visitor never saw.
  */
  useEffect(() => {
    setForm((f) => {
      const businessType = formCopy.businessTypes.includes(f.businessType)
        ? f.businessType
        : formCopy.businessTypes[0];
      const revenueRange = formCopy.revenueRanges.includes(f.revenueRange)
        ? f.revenueRange
        : formCopy.revenueRanges[0];
      const platforms = f.platforms.filter((m) => formCopy.platforms.includes(m));

      // Same selections, same object: nothing to re-render.
      if (
        businessType === f.businessType &&
        revenueRange === f.revenueRange &&
        platforms.length === f.platforms.length
      ) {
        return f;
      }
      return { ...f, businessType, revenueRange, platforms };
    });
  }, [formCopy]);

  /*
    Every field's error, recomputed each render. Cheap, and it means the Send
    button and the inline messages can never disagree about whether the form is
    ready. The chips are checked against the copy currently on screen, which is
    the same list the server checks them against.
  */
  const errors = useMemo(() => checkEnquiry(form, formCopy), [form, formCopy]);
  const hasErrors = Object.values(errors).some(Boolean);

  /**
   * A server error shows until its field changes; a local one once the field
   * has been left, or once Send has been pressed.
   */
  const errorFor = (name) =>
    serverErrors[name] ??
    (attempted || touched[name] ? (errors[name] ?? undefined) : undefined);

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

  const togglePlatform = (platform) => {
    touch('platforms');
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(platform)
        ? f.platforms.filter((x) => x !== platform)
        : [...f.platforms, platform],
    }));
    setServerErrors((current) => {
      const next = { ...current };
      delete next.platforms;
      return next;
    });
  };

  /*
    The submit.

    Three things have to hold every time: it never files the same enquiry
    twice, it never shows the success panel for a request that did not succeed,
    and it never discards what the visitor typed.
  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
      A second press while the first request is in flight would file the
      enquiry twice. Three things stop that, and the ref is the one that
      actually has to hold: the button is disabled while `sending`, but
      `sending` is a state flag, so two submit events raised in the same tick —
      a double click, Enter on top of a click, a password manager submitting
      the form — both run against the render where it was still false. A ref
      changes immediately.
    */
    if (inFlight.current) return;

    setAttempted(true);
    setSubmitError(null);

    // Nothing is sent while a field is wrong. setAttempted above has already
    // put every message on screen, so the visitor can see why.
    if (hasErrors) return;

    inFlight.current = true;
    setSending(true);
    try {
      const result = await submitContactEnquiry(form);

      if (result.ok) {
        setSent(true);
        setServerErrors({});
        return;
      }

      /*
        A 422 naming one of the three choice fields is the one failure the
        visitor cannot fix by editing anything: those values are published
        content, and the server checks them against what it is publishing right
        now, while this page read that list once at mount and never again. When
        the two disagree — an admin saved the Enquiry Form tab while this page
        was open, or the first read failed and the built-in list is on screen —
        every chip the visitor can click is refused.

        And it would loop. Editing a field clears its server error, the local
        check then passes against the stale list, Send re-enables, and the next
        press returns the identical 422 on a chip they had no way to change.
        The only escape was a manual reload, and since the row IS the delivery,
        the lead is lost in the meantime.

        So re-read the published copy here. The reconcile effect above then
        moves the selection onto an option that exists and Send again can
        succeed. If that read fails too, the choices cannot be trusted at all,
        so say "refresh" rather than "try again".
      */
      if (result.reason === 'invalid' && CHOICE_FIELDS.some((f) => f in result.fieldErrors)) {
        const published = await fetchContactForm();

        // Errors on the other fields are still the visitor's to fix, so they
        // stay; the choice ones are about to be answered by the new list.
        const rest = { ...result.fieldErrors };
        CHOICE_FIELDS.forEach((f) => delete rest[f]);
        setServerErrors(rest);

        if (published) setFormCopy(published);
        setSubmitError(published ? ENQUIRY_OPTIONS_CHANGED : ENQUIRY_OPTIONS_STALE);
        return;
      }

      // Every value the visitor typed stays exactly where it is — `form` is
      // untouched here on purpose — so Send again is one press away.
      setSubmitError(result.message);
      setServerErrors(result.fieldErrors);
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  /** A second enquiry starts from a clean form, not from the last one's answers. */
  const startAnother = () => {
    setForm(emptyEnquiry(formCopy));
    setTouched({});
    setAttempted(false);
    setServerErrors({});
    setSubmitError(null);
    setSent(false);
  };

  const whatsappHref = `https://wa.me/${details.whatsapp.replace(/[^0-9]/g, '')}`;

  // What is said beside the button, in order of what the visitor most needs to
  // know: the form is not connected at all, then why the last press failed,
  // then that something above is still wrong.
  const buttonNotice = !deliverable
    ? ENQUIRY_NOT_CONNECTED
    : (submitError ?? (attempted && hasErrors
        ? 'Fix the highlighted fields above to continue.'
        : null));

  return (
    <>
      <Seo
        title="Contact UpWon Sales"
        description="Call our toll-free sales line, WhatsApp us or send a message — Indian-time response. Nashik, Pune and Mumbai offices."
        canonical="https://upwon.in/contact"
      />
      <ContactHeroSection />

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />

        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* Form */}
            <div className="relative overflow-hidden rounded-2xl border border-cream-300 bg-white p-7 shadow-enterprise md:p-10">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-orange-300 bg-orange-100 text-orange-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mt-6 h-display text-3xl text-navy-950 md:text-4xl">
                    {formCopy.successHeading}
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-charcoal">
                    {formCopy.successBody}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href="/platform" className="btn-primary">
                      Explore Platform
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button onClick={startAnother} className="btn-secondary">
                      Submit another request
                    </button>
                  </div>
                </motion.div>
              ) : (
                /*
                  noValidate: the browser's own check would open a native
                  bubble over the first empty box and stop the handler running,
                  so the inline messages below would never appear. The `type`
                  and `required` attributes stay for the keyboard they choose
                  and for what they tell a screen reader; the checks that
                  actually decide are the ones mirroring the server's.
                */
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <div>
                    {formCopy.eyebrow && (
                      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
                        {formCopy.eyebrow}
                      </p>
                    )}
                    <h2 className="mt-4 h-display text-2xl text-navy-950 md:text-3xl">
                      <Heading lines={formCopy.headingLines} />
                    </h2>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      name="fullName"
                      value={form.fullName}
                      onChange={(v) => patch({ fullName: v })}
                      onBlur={() => touch('fullName')}
                      error={errorFor('fullName')}
                      disabled={sending}
                      required
                    />
                    <Field
                      label="Work email"
                      name="workEmail"
                      type="email"
                      value={form.workEmail}
                      onChange={(v) => patch({ workEmail: v })}
                      onBlur={() => touch('workEmail')}
                      error={errorFor('workEmail')}
                      disabled={sending}
                      required
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={(v) => patch({ phone: v })}
                      onBlur={() => touch('phone')}
                      error={errorFor('phone')}
                      disabled={sending}
                    />
                    <Field
                      label="Company"
                      name="company"
                      value={form.company}
                      onChange={(v) => patch({ company: v })}
                      onBlur={() => touch('company')}
                      error={errorFor('company')}
                      disabled={sending}
                      required
                    />
                    <Field
                      label="Your role"
                      name="role"
                      placeholder="COO, Head of Operations, IT Director…"
                      value={form.role}
                      onChange={(v) => patch({ role: v })}
                      onBlur={() => touch('role')}
                      error={errorFor('role')}
                      disabled={sending}
                      className="sm:col-span-2"
                    />
                  </div>

                  <fieldset disabled={sending} className="min-w-0">
                    <legend>
                      <Label>Business type</Label>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formCopy.businessTypes.map((b) => (
                        <button
                          type="button"
                          key={b}
                          aria-pressed={form.businessType === b}
                          onClick={() => {
                            touch('businessType');
                            patch({ businessType: b });
                          }}
                          className={`rounded-full border px-3.5 py-1.5 text-[14px] font-medium transition-all disabled:opacity-60 ${
                            form.businessType === b
                              ? 'border-orange-500 bg-orange-500 text-white'
                              : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                    <FieldError message={errorFor('businessType')} />
                  </fieldset>

                  <fieldset disabled={sending} className="min-w-0">
                    <legend>
                      <Label>Revenue range</Label>
                    </legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      {formCopy.revenueRanges.map((s) => (
                        <button
                          type="button"
                          key={s}
                          aria-pressed={form.revenueRange === s}
                          onClick={() => {
                            touch('revenueRange');
                            patch({ revenueRange: s });
                          }}
                          className={`rounded-lg border px-3 py-2.5 text-[14px] font-medium transition-all disabled:opacity-60 ${
                            form.revenueRange === s
                              ? 'border-orange-500 bg-orange-500 text-white'
                              : 'border-cream-400 bg-white text-navy-700 hover:border-navy-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <FieldError message={errorFor('revenueRange')} />
                  </fieldset>

                  <fieldset disabled={sending} className="min-w-0">
                    <legend>
                      <Label>UpWon platforms of interest</Label>
                    </legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {formCopy.platforms.map((m) => {
                        const active = form.platforms.includes(m);
                        return (
                          <button
                            type="button"
                            key={m}
                            aria-pressed={active}
                            onClick={() => togglePlatform(m)}
                            className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-[14px] font-medium transition-all disabled:opacity-60 ${
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
                    <FieldError message={errorFor('platforms')} />
                  </fieldset>

                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <label htmlFor="enquiry-message">
                        <Label>What are you trying to solve?</Label>
                      </label>
                      <Counter value={form.message} max={MAX_FOR.message} />
                    </div>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      value={form.message}
                      onChange={(e) => patch({ message: e.target.value })}
                      onBlur={() => touch('message')}
                      disabled={sending}
                      aria-invalid={errorFor('message') ? true : undefined}
                      aria-describedby={errorFor('message') ? 'enquiry-message-error' : undefined}
                      placeholder="Briefly describe your current operational pain points and what success looks like…"
                      rows={5}
                      className={`mt-3 w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 outline-none disabled:bg-cream-200 disabled:text-navy-500 ${
                        errorFor('message')
                          ? 'border-orange-600 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20'
                          : 'border-cream-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                    />
                    <FieldError id="enquiry-message-error" message={errorFor('message')} />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream-300 pt-6">
                    <div className="min-w-0 flex-1 space-y-1.5">
                      {/* The footnote can be left unpublished; the button then
                          keeps its place at the right of the row on its own. */}
                      {formCopy.footnote && (
                        <p className="text-[14px] text-navy-500">{formCopy.footnote}</p>
                      )}
                      {buttonNotice && (
                        <p
                          role="alert"
                          className="flex items-start gap-1.5 text-[13px] font-medium text-orange-700"
                        >
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          <span>{buttonNotice}</span>
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={sending || !deliverable || (attempted && hasErrors)}
                      aria-busy={sending}
                      className="btn-primary-glow !px-6 !py-3 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                    >
                      {sending ? (
                        <>
                          Sending…
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Side info */}
            <div className="space-y-5">
              <SideCard
                icon={Building2}
                title={details.officesTitle}
                content={
                  <div className="space-y-3 text-sm text-navy-800">
                    {details.offices.map((office, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        <div>
                          <p className="font-semibold text-navy-950">{office.name}</p>
                          <p className="text-[14px] text-navy-600">{office.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />

              <SideCard
                icon={Mail}
                title={details.directTitle}
                content={
                  <div className="space-y-2.5 text-sm">
                    <a href={`mailto:${details.email}`} className="flex items-center gap-2.5 text-navy-800 hover:text-orange-600">
                      <Mail className="h-4 w-4 text-orange-500" />
                      {details.email}
                    </a>
                    {/* The one line that can be left unpublished; the row goes
                        with it rather than showing an empty tel: link. */}
                    {details.phone && (
                      <a href={`tel:${details.phone}`} className="flex items-center gap-2.5 text-navy-800 hover:text-orange-600">
                        <Phone className="h-4 w-4 text-orange-500" />
                        {details.phone}
                      </a>
                    )}
                    <a
                      href={whatsappHref}
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

      {/* Closing CTA, directly above the footer */}
      <ContactCtaSection />
    </>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
}) {
  const id = `enquiry-${name}`;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id}>
          <Label>
            {label}
            {required && <span className="ml-1 text-orange-500">*</span>}
          </Label>
        </label>
        <Counter value={value} max={MAX_FOR[name]} />
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 outline-none disabled:bg-cream-200 disabled:text-navy-500 ${
          error
            ? 'border-orange-600 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20'
            : 'border-cream-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
        }`}
      />
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

/*
  The counter beside a capped field's label: "12/120".

  Every capped field carries one instead of a `maxLength` attribute, because
  the browser truncates a paste at `maxLength` with no event and no message —
  which silently loses the tail of a pasted paragraph and makes the "must be N
  characters or fewer (currently M)" message unreachable. This shows the
  overflow and the check blocks the submit on it.
*/
function Counter({ value, max }) {
  return (
    <span
      className={`shrink-0 text-[11px] tabular-nums ${
        isOver(value, max) ? 'font-medium text-orange-700' : 'text-navy-400'
      }`}
    >
      {counterFor(value, max)}
    </span>
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
