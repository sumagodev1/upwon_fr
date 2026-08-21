import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { X, Sparkles, ArrowUpRight, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'upwon-exit-dismissed';
const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

// Headline stats from the Monginis case — the proof points that make the
// "before you go" message feel concrete, not generic.
const PROOF = [
  { value: '35 → 200+', label: 'Outlets scaled' },
  { value: 'Zero', label: 'Extra back-office staff' },
  { value: '₹20 L+', label: 'Daily transactions' },
];

const MONGINIS_IMG =
  'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=900&q=70';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  // Whether the 30s arming delay has elapsed.
  const armedRef = useRef(false);
  // One-shot guard: once the popup has opened (or been suppressed) this page
  // load, it must never open again. Without this, the cursor crossing the top
  // edge repeatedly — reaching for browser tabs, the address bar or devtools —
  // re-fires the exit-intent and the modal keeps popping back, even after the
  // user dismisses it (dismiss writes localStorage, but the listener doesn't
  // re-read it within the same session).
  const triggeredRef = useRef(false);

  useEffect(() => {
    try {
      const ts = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (ts && Date.now() - ts < DISMISS_TTL) {
        triggeredRef.current = true; // dismissed within the last 7 days — never arm
        return;
      }
    } catch {}

    const armTimer = setTimeout(() => {
      armedRef.current = true;
    }, 30000);

    const onLeave = (e) => {
      if (armedRef.current && !triggeredRef.current && e.clientY < 20) {
        triggeredRef.current = true;
        setShow(true);
      }
    };
    document.addEventListener('mouseleave', onLeave);

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-950/75 backdrop-blur-md"
            onClick={dismiss}
          />

          {/* Modal — split layout: visual story on left, message + CTAs on right */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[860px] overflow-hidden rounded-3xl border border-white/10 bg-white shadow-enterprise-lg"
          >
            {/* Close button — sits over both panels */}
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy-700 shadow-md backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-navy-950 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid lg:grid-cols-[1fr_1.15fr]">
              {/* LEFT — visual story panel */}
              <div className="relative hidden min-h-[420px] overflow-hidden lg:block">
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: 'linear' }}
                  src={MONGINIS_IMG}
                  alt="Monginis bakery story"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/55 to-navy-950/20" />

                {/* Brand badge top-left */}
                <div className="absolute left-5 top-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300/40 bg-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200 backdrop-blur">
                    <Sparkles className="h-3 w-3" />
                    Flagship customer
                  </span>
                </div>

                {/* Bottom block: brand name + the headline stat */}
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-display text-2xl font-bold text-white">
                    Monginis
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-white/70">
                    India's flagship bakery brand · 16 plants · 200+ outlets
                  </p>

                  {/* Proof strip — 3 inline stats */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {PROOF.map((p) => (
                      <div
                        key={p.label}
                        className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-2 backdrop-blur"
                      >
                        <p className="num-display text-[14px] font-bold leading-none text-orange-300">
                          {p.value}
                        </p>
                        <p className="mt-1 text-[14px] leading-tight text-white/70">
                          {p.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — message + CTAs */}
              <div className="flex flex-col p-5 sm:p-7 md:p-9">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-700"
                >
                  <TrendingUp className="h-3 w-3" />
                  Before you go
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 h-display text-balance text-[1.6rem] leading-[1.1] text-navy-950 md:text-[1.9rem]"
                >
                  One story that could change{' '}
                  <span className="gradient-text-orange">your business this year.</span>
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28 }}
                  className="mt-3 text-[14px] leading-relaxed text-navy-700"
                >
                  Monginis scaled from <span className="font-semibold text-navy-950">35 to 200+ outlets</span> — without growing their back-office team. Real numbers. Real timeline. Real playbook you can copy.
                </motion.p>

                {/* Stat strip — visible on mobile too (the left panel is hidden) */}
                <div className="mt-5 grid grid-cols-3 gap-2 lg:hidden">
                  {PROOF.map((p) => (
                    <div
                      key={p.label}
                      className="rounded-xl border border-cream-300 bg-cream-100/60 px-3 py-2 text-center"
                    >
                      <p className="num-display text-[14px] font-bold leading-none text-orange-600">
                        {p.value}
                      </p>
                      <p className="mt-1 text-[14px] leading-tight text-navy-600">
                        {p.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.36 }}
                  className="mt-7 flex flex-col gap-2.5 sm:flex-row"
                >
                  <Link
                    to="/clients/monginis"
                    onClick={dismiss}
                    className="btn-primary flex-1 !justify-center !text-[14px]"
                  >
                    Read the Monginis story
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/demo"
                    onClick={dismiss}
                    className="btn-secondary flex-1 !justify-center !text-[14px]"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Book Free Demo
                  </Link>
                </motion.div>

                {/* Dismiss link */}
                <button
                  onClick={dismiss}
                  className="mt-4 text-center text-[14px] text-navy-500 underline-offset-2 transition-colors hover:text-navy-900 hover:underline"
                >
                  No thanks, I'll figure it out on my own
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
