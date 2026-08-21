import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Clock, Quote, Sparkles, AlertCircle } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { srcSet } from '../../lib/img.js';

// Featured videos. Posters point directly at hosted Unsplash images so they
// always load on the first attempt — once you have real local posters /
// captures, swap the `poster` and `src` fields to public/videos/ paths.
const VIDEOS = [
  {
    id: 'product-walkthrough',
    type: 'Walkthrough',
    title: '90-Second UpWon Product Walkthrough',
    sub: 'Tour the platform — production, distribution and outlet POS — in 90 seconds.',
    customer: 'UpWon Platform',
    role: 'Guided product tour',
    duration: '1:32',
    src: '/videos/upwon-product-walkthrough.mp4',
    poster:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80',
    urlPath: 'tour',
    accent: 'orange',
  },
  {
    id: 'monginis',
    type: 'Customer Story',
    title: 'How Monginis scaled from 35 to 200+ outlets — same back-office team.',
    sub: 'Operations Leadership at Monginis on running 16 plants on one platform.',
    customer: 'Monginis',
    role: 'Bakery · Sambhajinagar',
    duration: '2:14',
    src: '/videos/monginis-testimonial.mp4',
    poster:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2000&q=80',
    urlPath: 'monginis',
    accent: 'orange',
  },
  {
    id: 'kaka-halwai',
    type: 'Customer Story',
    title: '130-year sweets brand cuts wastage 18% and billing time 48%.',
    sub: 'Plant Operations Head at Kaka Halwai on FEFO and counter POS.',
    customer: 'Kaka Halwai',
    role: 'Heritage Sweets · Pune',
    duration: '1:58',
    src: '/videos/kaka-halwai-testimonial.mp4',
    poster:
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=2000&q=80',
    urlPath: 'kaka-halwai',
    accent: 'amber',
  },
  {
    id: 'u2-cake',
    type: 'Customer Story',
    title: '250+ outlets · ₹23L daily · native Swiggy / Zomato / ONDC.',
    sub: 'Franchise Operations at U2 Cake & Burger on running QSR at scale.',
    customer: 'U2 Cake & Burger',
    role: 'QSR Franchise · Mumbai',
    duration: '2:31',
    src: '/videos/u2-cake-testimonial.mp4',
    poster:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=2000&q=80',
    urlPath: 'u2-cake',
    accent: 'rose',
  },
];

export default function VideoShowcaseSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // Track which video src failed to load. We show a "Video coming soon"
  // overlay rather than letting the browser flicker / sit on a black frame.
  const [missingSrc, setMissingSrc] = useState(false);
  const videoRef = useRef(null);
  const active = VIDEOS[activeIdx];

  // Reset state whenever the user switches to a different video.
  useEffect(() => {
    setIsPlaying(false);
    setMissingSrc(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeIdx]);

  const switchTo = (i) => setActiveIdx(i);

  return (
    <section className="relative overflow-hidden bg-navy-950 section-pad">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.12] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="dark"
          eyebrow="See it. Hear it."
          title={
            <>
              From the people who{' '}
              <span className="gradient-text-orange">run on it.</span>
            </>
          }
          description="A 90-second product tour and three customers explaining — in their own words — what changed after UpWon went live."
        />

        {/* FEATURED PLAYER — browser-framed, 16:9 */}
        <div className="mx-auto mt-12 w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900 ring-1 ring-white/5">
            {/* Glow behind frame */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-orange-500/15 blur-2xl" />

            {/* Browser chrome — URL updates per active video */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-navy-900 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`url-${active.id}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="ml-3 flex items-center gap-2 rounded-md bg-white/[0.06] px-3 py-0.5 text-[14px] font-medium text-white/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  upwon.in / videos / {active.urlPath}
                </motion.div>
              </AnimatePresence>
              <span className="ml-auto hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300 md:inline">
                {active.type}
              </span>
            </div>

            {/* Stage — 16:9 */}
            <div className="relative aspect-video w-full bg-navy-950">
              {/* Poster image — always rendered; hidden once playing */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`poster-${active.id}`}
                  src={active.poster}
                  srcSet={srcSet(active.poster)}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  alt={`${active.customer} — ${active.title}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isPlaying ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 block h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Vignette to keep play button + caption readable */}
              {!isPlaying && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-950/70 via-navy-950/20 to-transparent" />
              )}

              {/* Real video element — receives a key so it remounts per active.
                  `preload="none"` stops the browser from fetching the file
                  in the background before the user explicitly hits play. */}
              <video
                key={`video-${active.id}`}
                ref={videoRef}
                src={active.src}
                controls={isPlaying}
                playsInline
                preload="none"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                  setIsPlaying(false);
                  setMissingSrc(true);
                }}
                className={`absolute inset-0 h-full w-full bg-navy-950 transition-opacity duration-300 ${
                  isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />

              {/* "Video coming soon" overlay — shown only when the video file
                  is missing AND the user has attempted to play. Polite
                  fallback so the section never appears broken. */}
              {missingSrc && !isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy-950/85 backdrop-blur-sm"
                >
                  <div className="rounded-2xl border border-white/15 bg-white/[0.05] px-6 py-5 text-center backdrop-blur-md">
                    <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-orange-500/20 text-orange-300 ring-1 ring-orange-400/30">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <p className="mt-3 font-display text-base font-bold text-white">
                      Video coming soon
                    </p>
                    <p className="mt-1 max-w-xs text-[14px] leading-snug text-white/65">
                      The capture is being edited. Book a demo to see this
                      walkthrough live with our team.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Play affordance — overlays poster, hidden during playback
                  and hidden once we know the file is missing. */}
              {!isPlaying && !missingSrc && (
                <button
                  type="button"
                  aria-label={`Play ${active.title}`}
                  onClick={() => {
                    setIsPlaying(true);
                    videoRef.current?.play().catch(() => {
                      // If the file can't load, drop back to poster + mark missing.
                      setIsPlaying(false);
                      setMissingSrc(true);
                    });
                  }}
                  className="group/play absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/30 bg-navy-950/55 backdrop-blur-md transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-orange-500/80 group-hover/play:border-orange-200 md:h-24 md:w-24">
                    <PlayCircle
                      className="h-9 w-9 text-white transition-transform duration-500 group-hover/play:rotate-12 md:h-12 md:w-12"
                      strokeWidth={1.4}
                    />
                    <span className="pointer-events-none absolute -inset-2 rounded-full border border-white/15 opacity-0 transition-opacity duration-500 group-hover/play:opacity-100" />
                  </div>
                </button>
              )}

              {/* Bottom caption — visible only on poster state */}
              {!isPlaying && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`caption-${active.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-8"
                  >
                    <div className="max-w-[80%]">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300 ring-1 ring-orange-400/30">
                        <Sparkles className="h-3 w-3" />
                        {active.type}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold leading-tight text-white md:text-2xl">
                        {active.title}
                      </h3>
                      <p className="mt-1 text-[14px] text-white/70 md:text-sm">
                        {active.customer} <span className="mx-1 text-white/60">·</span>{' '}
                        {active.role}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/20 bg-navy-950/60 px-2.5 py-1 text-[14px] font-semibold text-white backdrop-blur-md">
                      <Clock className="h-3 w-3 text-orange-300" />
                      {active.duration}
                    </span>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* THUMBNAIL ROW — click to switch active video */}
        <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {VIDEOS.map((v, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => switchTo(i)}
                aria-pressed={isActive}
                className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition-all duration-300 ${
                  isActive
                    ? 'border-orange-300 bg-navy-900 shadow-glow-orange'
                    : 'border-white/10 bg-white/[0.03] hover:border-orange-300/60 hover:bg-white/[0.06]'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={v.poster}
                    alt={`${v.customer} thumbnail`}
                    loading="lazy" decoding="async"
                    className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play badge */}
                  <div className="absolute inset-0 grid place-items-center bg-navy-950/30 transition-opacity duration-300 group-hover:bg-navy-950/15">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-colors duration-300 ${
                        isActive
                          ? 'bg-orange-500 text-white'
                          : 'bg-navy-950/60 text-white group-hover:bg-orange-500/80'
                      }`}
                    >
                      <PlayCircle className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                  </div>
                  {/* Duration chip */}
                  <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-navy-950/80 px-1.5 py-0.5 text-[14px] font-semibold text-white backdrop-blur">
                    <Clock className="h-2.5 w-2.5" />
                    {v.duration}
                  </span>
                  {/* Active rail underline */}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
                  )}
                </div>

                {/* Meta */}
                <div className="px-3 py-2.5">
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-orange-300">
                    {v.type}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[14px] font-semibold leading-tight text-white">
                    {v.customer}
                  </p>
                  <p className="mt-0.5 text-[14px] leading-snug text-white/60 line-clamp-2 lg:truncate">{v.role}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quote line under thumbnails — references the active video's sub */}
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 text-center">
          <Quote className="hidden h-6 w-6 shrink-0 text-orange-400/60 md:block" />
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${active.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="flex-1 text-balance text-[14px] italic text-white/70 md:text-[14px]"
            >
              {active.sub}
            </motion.p>
            <Quote className="hidden h-6 w-6 shrink-0 rotate-180 text-orange-400/60 md:block" />
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
