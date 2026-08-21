import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, PhoneCall } from 'lucide-react';
import { COMPANY } from '../../data/company.js';

// Toll-free formatted display + tel:-ready digits (non-digits stripped).
const TOLL_FREE_DISPLAY = COMPANY.contact.tollFree || '';
const TOLL_FREE_TEL = TOLL_FREE_DISPLAY.replace(/\D/g, '');

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-3 z-40 flex flex-col items-end gap-2 md:right-5 md:gap-3"
      // Lift above the mobile sticky CTA bar when it's visible (it sets
      // --sticky-h); falls back to the normal bottom inset otherwise.
      style={{ bottom: 'calc(var(--sticky-h, 0px) + 0.75rem)' }}
    >
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${COMPANY.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20UpWon%2C%20I%27d%20like%20to%20know%20more`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp UpWon"
        className="pointer-events-auto group relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-enterprise-lg animate-whatsapp-pulse transition-transform hover:scale-105 md:h-14 md:w-14"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 md:h-7 md:w-7"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
        </svg>
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy-950 px-3 py-1.5 text-[14px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>

      {/* Toll-free phone — tap-to-call. Sits directly below the WhatsApp
          button so the two contact methods live together at the bottom-right. */}
      {TOLL_FREE_TEL && (
        <a
          href={`tel:${TOLL_FREE_TEL}`}
          aria-label={`Call toll-free ${TOLL_FREE_DISPLAY}`}
          className="pointer-events-auto group relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-enterprise-lg transition-transform hover:scale-105 md:h-14 md:w-14"
        >
          {/* Subtle attention ping — orange ring expanding outward */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-orange-500/40 animate-ping"
          />
          <PhoneCall className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />

          {/* Hover tooltip — shows the actual number so callers see who they're
              calling before they tap. Two-line: label + number. */}
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 flex -translate-y-1/2 flex-col items-end whitespace-nowrap rounded-md bg-navy-950 px-3 py-1.5 text-right opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-orange-300">
              Toll-Free · Sales
            </span>
            <span className="num-display text-[14px] font-bold text-white">
              {TOLL_FREE_DISPLAY}
            </span>
          </span>
        </a>
      )}

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-white text-navy-700 shadow-enterprise transition-colors hover:bg-cream-100 hover:text-navy-950"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
