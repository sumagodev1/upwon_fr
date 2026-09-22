import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MESSAGES = [
  {
    text: 'NEW: UpWon now integrates with Zomato, Swiggy and ONDC',
    link: '/products/fms',
    linkLabel: 'See FMS',
  },
  {
    text: 'Now serving 10 states · 36,500+ daily users',
    link: '/clients',
    linkLabel: 'Our clients',
  },
  {
    text: '50+ enterprise deployments across India',
    link: '/clients',
    linkLabel: 'See clients',
  },
];

const STORAGE_KEY = 'upwon-bar-dismissed';
const BAR_HEIGHT = '36px';

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Initial mount: check storage + sync CSS var
  useEffect(() => {
    let initiallyDismissed = false;
    try {
      initiallyDismissed = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {}
    setDismissed(initiallyDismissed);
    document.documentElement.style.setProperty(
      '--ann-h',
      initiallyDismissed ? '0px' : BAR_HEIGHT,
    );
  }, []);

  // Whenever dismissed state changes, update the CSS var
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--ann-h',
      dismissed ? '0px' : BAR_HEIGHT,
    );
  }, [dismissed]);

  // Rotate messages
  useEffect(() => {
    if (dismissed) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, [dismissed]);

  if (dismissed) return null;

  const m = MESSAGES[index];

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-9 bg-navy-950 text-white">
      <div className="container-max container-px h-full">
        <div className="flex h-full items-center justify-between text-[14px]">
          <span className="hidden h-3 w-px bg-white/10 md:inline-block" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 items-center justify-center gap-3 truncate px-3"
            >
              <span className="truncate text-cream-100/90">{m.text}</span>
              <Link
                to={m.link}
                className="hidden shrink-0 items-center gap-1 font-semibold text-orange-400 hover:text-orange-300 sm:inline-flex"
              >
                {m.linkLabel}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => {
              setDismissed(true);
              try {
                sessionStorage.setItem(STORAGE_KEY, '1');
              } catch {}
            }}
            aria-label="Dismiss"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
