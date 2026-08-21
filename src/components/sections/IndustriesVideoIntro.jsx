import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  Industries video intro — heading + subtext over a product video, showcased
  with an Odoo-style playback bar underneath: a pause/play toggle and a
  draggable progress scrubber. Sits above the "Your System" (AiPlatformFinder)
  section.
*/

const EASE = [0.22, 1, 0.3, 1];
const VIDEO = '/video/video_test.mp4';

export default function IndustriesVideoIntro({
  eyebrow = 'Industries We Serve',
  heading = (
    <>
      Built for Food. Proven for FMCG.{' '}
      <span className="gradient-text-orange">Ready for everything that follows.</span>
    </>
  ),
  subtext = 'Every industry we serve, from food manufacturing to everyday FMCG — organised by depth.',
  video = VIDEO,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0–100

  // Keep the scrubber in sync with playback.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const pct = Number(e.target.value);
    v.currentTime = (pct / 100) * v.duration;
    setProgress(pct);
  };

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Video showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mt-10 max-w-6xl md:mt-12"
        >
          <div className="overflow-hidden rounded-3xl border border-cream-300 shadow-enterprise-lg">
            <video
              ref={videoRef}
              src={video}
              muted
              loop
              autoPlay
              playsInline
              onClick={toggle}
              className="block aspect-video w-full cursor-pointer object-cover"
            />
          </div>

          {/* Odoo-style playback bar */}
          <div className="mx-auto mt-6 flex max-w-3xl items-center gap-4 px-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? 'Pause video' : 'Play video'}
              className="grid h-10 w-10 flex-none place-items-center rounded-full text-navy-700 transition-colors hover:bg-cream-200 hover:text-navy-950"
            >
              {playing ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={seek}
              aria-label="Seek video"
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:shadow [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow"
              style={{
                background: `linear-gradient(to right, #E85A2A ${progress}%, #E3DED4 ${progress}%)`,
              }}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
