import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// VideoModal — the "Watch 2-Min Product Video" pop-up triggered from the hero.
//
// Renders the product walkthrough(s) in a centred, 16:9 modal over a dark
// blurred backdrop. Same shell conventions as BrochureModal: rendered through a
// portal on document.body, animated with framer-motion, locks body scroll while
// open and closes on backdrop click / ESC / the × button.
//
// Supports MULTIPLE videos: when more than one is listed below, prev/next
// scroll buttons appear on the video stage and a chip rail shows under it, so
// visitors can browse the full set without leaving the modal. ← / → arrow keys
// also navigate. With a single video the scroll controls are hidden automatically.
//
// Swap PRODUCT_VIDEOS below for the real assets. Each entry is:
//   - a self-hosted file:    { type: 'file',  src: '/videos/tour.mp4', title }
//   - a YouTube/Vimeo embed: { type: 'embed', src: '<embed-url>',      title }
// For embeds, append ?autoplay=1 so the clip starts when you switch to it.
// NOTE: embeds MUST be a real /embed/<id> URL — the plain https://www.youtube.com
// homepage refuses to load in an <iframe> (X-Frame-Options) and renders as a
// broken-image box. Add 2+ entries here to make the prev/next scroll buttons +
// chip rail appear (they're hidden when there's only one video).
const PRODUCT_VIDEOS = [
  {
    // Placeholder software/ERP clips — replace with UpWon's own product videos.
    type: 'embed', // 'embed' (YouTube/Vimeo iframe) | 'file' (self-hosted mp4)
    title: 'What is ERP software?',
    src: 'https://www.youtube.com/embed/eM9Sfg9E3KU?autoplay=1&rel=0&modestbranding=1',
  },
  {
    type: 'embed',
    title: 'How cloud business software works',
    src: 'https://www.youtube.com/embed/M988_fsOSWo?autoplay=1&rel=0&modestbranding=1',
  },
  {
    type: 'embed',
    title: 'SaaS product demo walkthrough',
    src: 'https://www.youtube.com/embed/Qs1zamI7iJ8?autoplay=1&rel=0&modestbranding=1',
  },
];

export default function VideoModal({ open, onClose }) {
  const [active, setActive] = useState(0);
  const count = PRODUCT_VIDEOS.length;
  const hasMany = count > 1;

  const go = (delta) => setActive((i) => (i + delta + count) % count);

  // Reset to the first video each time the modal opens fresh.
  useEffect(() => {
    if (open) setActive(0);
  }, [open]);

  // Lock body scroll while open + close on ESC, navigate with ← / →.
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      else if (hasMany && e.key === 'ArrowRight') go(1);
      else if (hasMany && e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, hasMany, count]);

  if (typeof document === 'undefined') return null;

  const video = PRODUCT_VIDEOS[active];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="UpWon product video"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-enterprise-lg"
          >
            {/* Close button — solid navy with a white ring so it stays visible
                on the dark video AND on the light "video unavailable" state the
                browser shows when an embed fails to load. */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-navy-950 text-white shadow-md ring-2 ring-white/80 transition-colors hover:bg-orange-500"
            >
              <X className="h-4 w-4" />
            </button>

            {/* 16:9 video stage */}
            <div className="relative aspect-video w-full bg-black">
              {/* Re-mount the player on every switch (keyed by active index) so
                  the new src actually loads + autoplays. */}
              {open && video.type === 'file' ? (
                <video
                  key={active}
                  src={video.src}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full"
                >
                  <track kind="captions" />
                </video>
              ) : open ? (
                <iframe
                  key={active}
                  src={video.src}
                  title={video.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}

              {/* Prev / next scroll buttons — only when there's more than one */}
              {hasMany && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous video"
                    className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white shadow-sm backdrop-blur transition-colors hover:bg-orange-500"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next video"
                    className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white shadow-sm backdrop-blur transition-colors hover:bg-orange-500"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption + position strip */}
            <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3">
              <PlayCircle className="h-4 w-4 shrink-0 text-orange-500" />
              <p className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                {video.title}
              </p>
              {hasMany && (
                <span className="num-display shrink-0 text-[14px] font-bold text-white/60">
                  {active + 1} / {count}
                </span>
              )}
            </div>

            {/* Chip rail — quick jump to any video */}
            {hasMany && (
              <div className="flex items-center gap-2 overflow-x-auto border-t border-white/10 px-5 py-3">
                {PRODUCT_VIDEOS.map((v, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Play: ${v.title}`}
                    aria-current={i === active}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-semibold transition-colors ${
                      i === active
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <PlayCircle className="h-3 w-3" />
                    <span className="max-w-[140px] truncate">{v.title}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
