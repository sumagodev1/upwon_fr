import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { X, PhoneCall, MessageCircle, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../../data/company.js';

// Mobile sticky bottom CTA bar — brief SG09 #29 / §7.2. Mobile + tablet only
// (lg:hidden); desktop keeps the persistent nav "Book Free Demo" instead.
// Appears after 40% scroll, dismissible per session. While visible it sets a
// `--sticky-h` CSS variable so the floating action buttons lift above it
// instead of overlapping.
const STORAGE_KEY = 'upwon-sticky-dismissed';
const BAR_H = '60px';

const TOLL_FREE = COMPANY.contact.tollFree || '';
const TOLL_FREE_TEL = TOLL_FREE.replace(/\D/g, '');
const WA = (COMPANY.contact.whatsapp || '').replace(/[^0-9]/g, '');

function setStickyVar(v) {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--sticky-h', v);
  }
}

export default function ScrollStickyBar() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') {
        setDismissed(true);
        return;
      }
    } catch {}

    const onScroll = () => {
      const pct =
        window.scrollY /
        Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setShow(pct > 0.4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep the floating-buttons offset in sync with the bar — but only on small
  // screens, since the bar itself is lg:hidden. Without the media check the
  // desktop floating buttons would lift for a bar that isn't visible.
  useEffect(() => {
    const isSmall =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 1023px)').matches;
    setStickyVar(isSmall && show && !dismissed ? BAR_H : '0px');
    return () => setStickyVar('0px');
  }, [show, dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950/95 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          role="region"
          aria-label="Quick actions"
        >
          <div className="flex items-stretch gap-2 px-3 py-2.5">
            {TOLL_FREE_TEL && (
              <a
                href={`tel:${TOLL_FREE_TEL}`}
                className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/15 bg-white/[0.05] py-2 text-white"
                aria-label={`Call ${TOLL_FREE}`}
              >
                <PhoneCall className="h-4 w-4 text-orange-300" />
                <span className="text-[14px] font-semibold">Call</span>
              </a>
            )}
            {WA && (
              <a
                href={`https://wa.me/${WA}?text=Hi%20UpWon%2C%20I%27d%20like%20to%20know%20more`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border border-white/15 bg-white/[0.05] py-2 text-white"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span className="text-[14px] font-semibold">WhatsApp</span>
              </a>
            )}
            <Link
              to="/demo"
              className="flex flex-[1.4] flex-col items-center justify-center gap-0.5 rounded-lg bg-orange-500 py-2 text-white shadow-glow-orange"
            >
              <CalendarDays className="h-4 w-4" />
              <span className="text-[14px] font-bold">Book Free Demo</span>
            </Link>
            <button
              onClick={() => {
                setDismissed(true);
                setStickyVar('0px');
                try {
                  sessionStorage.setItem(STORAGE_KEY, '1');
                } catch {}
              }}
              aria-label="Dismiss"
              className="grid w-8 shrink-0 place-items-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
