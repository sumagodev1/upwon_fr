import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  MapPin,
  Paperclip,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import {
  APPLICATION_NOT_CONNECTED,
  canSubmitApplication,
  submitCareerApplication,
} from '../../../lib/careers.js';
import {
  MAX_FOR,
  RESUME_ACCEPT,
  RESUME_ACCEPTED_LABEL,
  RESUME_MAX_MB,
  checkApplication,
  counterFor,
  formatFileSize,
  isOver,
} from '../../../lib/applicationFields.js';

// VacancyModal — the vacancy details pop-up behind every row in the Open Roles
// list on /careers, and the Apply Now form underneath it.
//
// Same shell conventions as BrochureModal and VideoModal, which are this
// site's two existing dialogs: rendered through a portal on document.body,
// animated with framer-motion, locks body scroll while open, closes on
// backdrop click / ESC / the × button. Two things are added, because this one
// holds a form rather than a set of links:
//
//   a focus trap   Tab and Shift-Tab cycle inside the dialog, focus moves in
//                  when it opens and returns to the row that opened it when it
//                  closes. A form whose Tab key walks off into the page behind
//                  a backdrop is a form a keyboard user cannot fill in.
//   an inner scroll  The body scrolls, not the page, so a long advert plus
//                  eight controls still fits a phone with the header and the
//                  close button always reachable.
//
// THE FORM DELIVERS. It posts to the API's one public careers write and what
// comes back decides what the applicant sees: the success panel only once a
// row and its stored CV have actually committed, and a named failure with
// every typed value — and the picked file — still in place otherwise. This
// replaced a mailto: link, which was worse in most ways but never lied about
// whether anything had been sent; the panel below is held to the same standard.
//
// Every field is checked here before anything is uploaded, against the same
// bounds the server's validator applies (lib/applicationFields.js mirrors it
// rule for rule, the file included), so a 5 MB upload is never spent on a
// submit that was going to be refused. The server stays the authority: a field
// error it reports anyway is shown under that same control, which works
// because the form state is keyed by the API's own field names.

/** An untouched form. Keys are the API's field names — see the note above. */
const EMPTY = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  experience: '',
  resume: null,
  message: '',
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * @param {{open: boolean, vacancy: object|null, onClose: () => void,
 *   onVacancyClosed?: () => void}} props
 *
 * `vacancy` is deliberately still passed while `open` is false: AnimatePresence
 * keeps the dialog mounted through its exit animation, and a null here would
 * blank the panel for the 250ms it spends fading out.
 *
 * `onVacancyClosed` is called when the server refuses the submit because the
 * role has been taken down since this page read the list. The page answers it
 * by re-reading what is published — see CareersPage.
 */
export default function VacancyModal({ open, vacancy, onClose, onVacancyClosed }) {
  const [form, setForm] = useState(EMPTY);

  /*
    The submit's own state, and it mirrors ContactPage's for the same reasons.

    `sent` is set only by a 2xx, which is the whole point: the success panel is
    a statement that a row exists and a CV is stored against it.
    `sending` blocks a second press while the first request is in flight.
    `attempted` makes every field's error visible from the first press, the way
    a blur does for one field.
    `serverErrors` holds what the API named in a 422; each entry survives until
    its own field is edited, so a message never sits under a control it is no
    longer about.
    `submitError` is the line beside the button explaining the last failed
    attempt. It stays until the next press rather than clearing on the next
    keystroke: "wait an hour" has to still be on screen when the applicant
    looks back at the button.
    `roleClosed` latches the one refusal no edit can fix — the advert came down
    while the form was being filled in — and takes the button with it.
  */
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [roleClosed, setRoleClosed] = useState(false);

  /** The in-flight latch. See handleSubmit for why this is a ref and not state. */
  const inFlight = useRef(false);
  const dialogRef = useRef(null);
  const fileRef = useRef(null);
  /** The element that had focus when the dialog opened, to hand it back to. */
  const restoreRef = useRef(null);

  const vacancyId = vacancy?.id ?? null;

  /*
    Whether an application can be delivered at all in this build. False means
    no VITE_API_BASE_URL, so there is nowhere to post to: the popup says so
    above the form and the button is disabled, rather than walking somebody
    through seven fields and a file picker over a request that never happens.
  */
  const deliverable = canSubmitApplication();

  /*
    A fresh form every time the dialog opens, and again if it is somehow
    re-pointed at a different role without closing. Nothing typed for one
    vacancy may be carried into an application for another — least of all the
    file, which would then be filed against a job it was not written for.
  */
  useEffect(() => {
    if (!open) return;
    setForm(EMPTY);
    setTouched({});
    setAttempted(false);
    setServerErrors({});
    setSubmitError(null);
    setRoleClosed(false);
    setSent(false);
    setSending(false);
    inFlight.current = false;
    // The input's own value is DOM state, not React state, so clearing `form`
    // leaves the last filename sitting in the control.
    if (fileRef.current) fileRef.current.value = '';
  }, [open, vacancyId]);

  /*
    A dismissal, if one is allowed right now.

    Nothing may close this dialog while a request is in flight. The POST carries
    up to 5 MB, so the window between pressing Send and hearing back is seconds
    on a phone — long enough to look stuck, and the first thing anybody does
    with a stuck dialog is tap outside it. Doing so used to close the panel over
    a request that then returned 201: the row and the CV committed, the success
    state painted into a dialog that was already unmounting, and reopening the
    role cleared the form. The applicant, having seen nothing, fills all seven
    fields in again, re-picks their CV, and files a second application — two
    rows, two 5 MB blobs, and two of their hourly attempts for one job.

    So all three dismissals — backdrop, ESC and the × — go through here.
  */
  const requestClose = useCallback(() => {
    if (inFlight.current) return;
    onClose?.();
  }, [onClose]);

  /*
    `onClose` as this effect last saw it.

    The lock/listener/restore effect below must NOT depend on the prop. Its
    cleanup calls restore.focus(), so any re-render of the parent that passes a
    fresh arrow function would tear the effect down and back up while the dialog
    is still on screen — un-locking and re-locking body.overflow, and pulling
    focus out of the open panel. That is not hypothetical: `onVacancyClosed`
    re-reads the published list, which re-renders CareersPage, and the row that
    opened this dialog is exactly the row that has just gone, so the element
    focus was handed back to is detached, .focus() does nothing, and the user is
    left on <body> with the one message they need to read inside a panel they
    are no longer in. The ref keeps the handler current without being a
    dependency; CareersPage also memoises what it passes.
  */
  const closeRef = useRef(requestClose);
  useEffect(() => {
    closeRef.current = requestClose;
  }, [requestClose]);

  /*
    Body scroll lock, ESC to close, and the focus trap — one effect, because
    all three start and end with the dialog.

    The trap reads the focusable elements on each Tab rather than once on open:
    the panel's contents change as the form does (the success panel replaces
    eight controls with two, and `disabled` while sending takes the rest out of
    the tab order), and a list captured on mount would send focus to a control
    that is no longer there.
  */
  useEffect(() => {
    if (!open || typeof document === 'undefined') return undefined;

    restoreRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event) => {
      if (event.key === 'Escape') {
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const root = dialogRef.current;
      if (!root) return;

      const all = [...root.querySelectorAll(FOCUSABLE)];
      // offsetParent is null for anything display:none — a control inside a
      // collapsed branch must not be a stop on the way round.
      const items = all.filter((el) => el.offsetParent !== null);
      const stops = items.length > 0 ? items : all;

      if (stops.length === 0) {
        event.preventDefault();
        root.focus();
        return;
      }

      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;
      const outside = !root.contains(active);

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      // Back to the row that opened this, so a keyboard user carries on from
      // where they were rather than at the top of the document.
      const restore = restoreRef.current;
      if (restore && typeof restore.focus === 'function') restore.focus();
    };
    // `open` alone. See closeRef above for why the handler must not be here.
  }, [open]);

  /*
    Focus moves into the panel itself rather than onto the first input: a
    screen reader then reads the dialog's label and the role's title before the
    applicant is dropped into a text box, and the close button is one Tab away.
  */
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => dialogRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  /*
    Every field's error, recomputed each render. Cheap, and it means the Send
    button and the inline messages can never disagree about whether the form is
    ready.
  */
  const errors = useMemo(() => checkApplication(form), [form]);
  const hasErrors = Object.values(errors).some(Boolean);

  /**
   * A server error shows until its field changes; a local one once the field
   * has been left, or once Send has been pressed.
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

  const pickResume = (event) => {
    touch('resume');
    patch({ resume: event.target.files?.[0] ?? null });
  };

  const clearResume = () => {
    if (fileRef.current) fileRef.current.value = '';
    touch('resume');
    patch({ resume: null });
  };

  /*
    The submit.

    Three things have to hold every time: it never files the same application
    twice, it never shows the success panel for a request that did not succeed,
    and it never discards what was typed or the file that was picked.
  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
      A second press while the first request is in flight would file the
      application twice and store the CV twice. Three things stop that, and the
      ref is the one that actually has to hold: the button is disabled while
      `sending`, but `sending` is a state flag, so two submit events raised in
      the same tick — a double click, Enter on top of a click, a password
      manager submitting the form — both run against the render where it was
      still false. A ref changes immediately. It matters more here than on the
      contact form: a duplicate costs a second 5 MB blob on disk, and it spends
      one of the attempts an hour this endpoint allows.
    */
    if (inFlight.current) return;
    if (!vacancyId || roleClosed) return;

    setAttempted(true);
    setSubmitError(null);

    // Nothing is uploaded while a field is wrong. setAttempted above has
    // already put every message on screen, so the applicant can see why.
    if (hasErrors) return;

    inFlight.current = true;
    setSending(true);
    try {
      const result = await submitCareerApplication({ ...form, vacancyId });

      if (result.ok) {
        setSent(true);
        setServerErrors({});
        return;
      }

      /*
        The role was ACTIVE when this page read the list and is not now — an
        admin unpublished or deleted it while the form was open. No edit can
        fix that, and re-pressing Send would return the identical 422 forever,
        so the button goes and the page is told to re-read what is published.
      */
      if (result.reason === 'closed') {
        setRoleClosed(true);
        setServerErrors(result.fieldErrors);
        setSubmitError(result.message);
        onVacancyClosed?.();
        return;
      }

      // Every value stays exactly where it is — `form` is untouched here on
      // purpose, and the File object with it — so Send again is one press away
      // and nobody has to find their CV a second time.
      setSubmitError(result.message);
      setServerErrors(result.fieldErrors);
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  if (typeof document === 'undefined') return null;

  // What is said beside the button, in order of what the applicant most needs
  // to know: the form cannot deliver at all, then why the last press failed,
  // then that something above is still wrong.
  const buttonNotice = !deliverable
    ? APPLICATION_NOT_CONNECTED
    : (submitError ??
      (attempted && hasErrors ? 'Fix the highlighted fields above to continue.' : null));

  const blocked = !deliverable || roleClosed;

  return createPortal(
    <AnimatePresence>
      {open && vacancy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-950/65 px-4 py-6 backdrop-blur-sm sm:items-center"
          onClick={requestClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vacancy-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-enterprise-lg outline-none"
          >
            {/*
              aria-disabled rather than disabled while sending: a disabled
              button leaves the tab order, which would drop a keyboard user out
              of the trap mid-upload. It stays focusable and says it will not
              act, the way Send already does.
            */}
            <button
              type="button"
              onClick={requestClose}
              aria-label="Close"
              aria-disabled={sending || undefined}
              className={`absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy-700 shadow-sm transition-colors hover:bg-cream-100 ${
                sending ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header — the four facts about the role, always visible. */}
            <div className="shrink-0 border-b border-cream-200 bg-gradient-to-r from-orange-50 to-cream-100 px-6 py-6 pr-16 md:px-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-700">
                <Briefcase className="h-3 w-3" />
                {vacancy.department}
              </p>
              <h2
                id="vacancy-modal-title"
                className="mt-3 font-display text-xl font-bold text-navy-950 md:text-2xl"
              >
                {vacancy.title}
              </h2>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] text-navy-700">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orange-500" />
                  {vacancy.location} · {vacancy.workMode}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-orange-500" />
                  {vacancy.experience}
                </span>
              </div>
            </div>

            {/* Body — scrolls on its own so the header and × stay reachable. */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-7">
              <section>
                <SectionLabel>About the role</SectionLabel>
                <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-charcoal">
                  {vacancy.description}
                </p>
              </section>

              {/* Both lists may legitimately be empty — see lib/careers.js. */}
              {vacancy.requirements.length > 0 && (
                <section className="mt-6">
                  <SectionLabel>What we are looking for</SectionLabel>
                  <ul className="mt-2.5 space-y-2">
                    {/*
                      Keyed on the index, because requirements MAY repeat — the
                      panel allows it deliberately and the API keeps it, since
                      these are sentences and a repeated line can be meant. The
                      list is rendered once and never reordered, so the index is
                      a stable key here.
                    */}
                    {vacancy.requirements.map((item, index) => (
                      <li
                        key={`${index}-${item}`}
                        className="flex items-start gap-2.5 text-sm text-charcoal"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {vacancy.skills.length > 0 && (
                <section className="mt-6">
                  <SectionLabel>Skills</SectionLabel>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {vacancy.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-cream-400 bg-cream-100 px-3 py-1 text-[13px] font-medium text-navy-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Apply Now */}
              <section className="mt-8 border-t border-cream-300 pt-7">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-orange-300 bg-orange-100 text-orange-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
                      Your application is in.
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-charcoal">
                      We have your CV against{' '}
                      <span className="font-semibold text-navy-950">{vacancy.title}</span>. Our team
                      reads every application and will be in touch if there is a fit.
                    </p>
                    <button type="button" onClick={onClose} className="btn-primary mt-6 !px-6 !py-3">
                      Back to open roles
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ) : (
                  /*
                    noValidate: the browser's own check would open a native
                    bubble over the first empty box and stop the handler
                    running, so the inline messages below would never appear.
                    The `type` and `required` attributes stay for the keyboard
                    they choose and for what they tell a screen reader; the
                    checks that decide are the ones mirroring the server's.
                  */
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-orange-600" />
                      <h3 className="font-display text-lg font-bold text-navy-950">Apply now</h3>
                    </div>
                    <p className="mt-1 text-[14px] text-navy-600">
                      Seven fields and your CV. We read every one.
                    </p>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Name"
                        name="fullName"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={(v) => patch({ fullName: v })}
                        onBlur={() => touch('fullName')}
                        error={errorFor('fullName')}
                        disabled={sending}
                        required
                      />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(v) => patch({ email: v })}
                        onBlur={() => touch('email')}
                        error={errorFor('email')}
                        disabled={sending}
                        required
                      />
                      <Field
                        label="Phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(v) => patch({ phone: v })}
                        onBlur={() => touch('phone')}
                        error={errorFor('phone')}
                        disabled={sending}
                        required
                      />
                      <Field
                        label="Location"
                        name="location"
                        autoComplete="address-level2"
                        placeholder="Where you are based"
                        value={form.location}
                        onChange={(v) => patch({ location: v })}
                        onBlur={() => touch('location')}
                        error={errorFor('location')}
                        disabled={sending}
                        required
                      />
                      <Field
                        label="Experience"
                        name="experience"
                        placeholder="5 years, or Fresher"
                        value={form.experience}
                        onChange={(v) => patch({ experience: v })}
                        onBlur={() => touch('experience')}
                        error={errorFor('experience')}
                        disabled={sending}
                        required
                        className="sm:col-span-2"
                      />
                    </div>

                    {/* Resume */}
                    <div className="mt-5">
                      <label htmlFor="apply-resume">
                        <Label>
                          Resume
                          <span className="ml-1 text-orange-500">*</span>
                        </Label>
                      </label>
                      <input
                        ref={fileRef}
                        id="apply-resume"
                        name="resume"
                        type="file"
                        accept={RESUME_ACCEPT}
                        onChange={pickResume}
                        onBlur={() => touch('resume')}
                        disabled={sending}
                        required
                        aria-invalid={errorFor('resume') ? true : undefined}
                        aria-describedby={
                          errorFor('resume') ? 'apply-resume-error' : 'apply-resume-hint'
                        }
                        className={`mt-2 block w-full cursor-pointer rounded-lg border bg-white text-sm text-navy-800 outline-none file:mr-4 file:cursor-pointer file:border-0 file:bg-cream-200 file:px-4 file:py-3 file:text-[13px] file:font-semibold file:text-navy-800 hover:file:bg-cream-300 disabled:cursor-not-allowed disabled:bg-cream-200 disabled:text-navy-500 ${
                          errorFor('resume')
                            ? 'border-orange-600 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20'
                            : 'border-cream-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                        }`}
                      />
                      {/*
                        The picked file, restated by this component rather than
                        left to the control: a failed submit keeps the File in
                        state and the input keeps its own value, and the chip is
                        what says out loud that the CV is still attached and the
                        upload does not have to be repeated.
                      */}
                      {form.resume && !errorFor('resume') && (
                        <p className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-navy-700">
                          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-800">
                            <Paperclip className="h-3 w-3 shrink-0" />
                            <span className="truncate">{form.resume.name}</span>
                            <span className="shrink-0 text-emerald-700/80">
                              {formatFileSize(form.resume.size)}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={clearResume}
                            disabled={sending}
                            className="font-semibold text-navy-600 underline-offset-2 hover:text-orange-700 hover:underline disabled:opacity-60"
                          >
                            Remove
                          </button>
                        </p>
                      )}
                      <p id="apply-resume-hint" className="mt-2 text-[13px] text-navy-500">
                        {RESUME_ACCEPTED_LABEL} · up to {RESUME_MAX_MB} MB
                      </p>
                      <FieldError id="apply-resume-error" message={errorFor('resume')} />
                    </div>

                    {/* Message */}
                    <div className="mt-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <label htmlFor="apply-message">
                          <Label>Message</Label>
                        </label>
                        <Counter value={form.message} max={MAX_FOR.message} />
                      </div>
                      <textarea
                        id="apply-message"
                        name="message"
                        value={form.message}
                        onChange={(e) => patch({ message: e.target.value })}
                        onBlur={() => touch('message')}
                        disabled={sending}
                        aria-invalid={errorFor('message') ? true : undefined}
                        aria-describedby={errorFor('message') ? 'apply-message-error' : undefined}
                        placeholder="Anything you want us to read first — what you have built, why this role, when you could start…"
                        rows={4}
                        className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-navy-950 outline-none disabled:bg-cream-200 disabled:text-navy-500 ${
                          errorFor('message')
                            ? 'border-orange-600 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20'
                            : 'border-cream-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                        }`}
                      />
                      <FieldError id="apply-message-error" message={errorFor('message')} />
                    </div>

                    {/*
                      Stacked on a phone, side by side from `sm`. Left to wrap,
                      the notice column squeezes itself to six words a line
                      rather than giving the button its own row.
                    */}
                    <div className="mt-6 flex flex-col items-stretch gap-4 border-t border-cream-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 space-y-1.5 sm:flex-1">
                        <p className="flex items-start gap-1.5 text-[13px] text-navy-500">
                          <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          <span>Your CV is stored for this role only and is never published.</span>
                        </p>
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
                        disabled={sending || blocked || (attempted && hasErrors)}
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
                            Send application
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-600">{children}</p>
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
  autoComplete,
  required = false,
  disabled = false,
  className = '',
}) {
  const id = `apply-${name}`;

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
        autoComplete={autoComplete}
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
  which silently loses the tail of a pasted covering letter and makes the "must
  be N characters or fewer (currently M)" message unreachable. This shows the
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
