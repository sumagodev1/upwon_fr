import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const CHALLENGES = [
  {
    number: '01',
    title: 'Inventory Management',
    description:
      'Tracking perishable ingredients and finished goods is complex, leading to stockouts or overstocking.',
    image: '/images/bakery_inventory.png',
    icon: '/images/bakery_inventary_management.webp',
  },
  {
    number: '02',
    title: 'Production Planning',
    description:
      'Managing multiple batches, recipes, and timelines manually leads to scheduling conflicts and delays.',
    image: '/images/bakery_planning.png',
    icon: '/images/bakery_production_planning.webp',
  },
  {
    number: '03',
    title: 'Wastage & Expiry',
    description:
      'Short shelf life of products causes high wastage and directly impacts profitability.',
    image: '/images/bakery_wastage_and_expiry.png',
    icon: '/images/bakery_wastage_expiry.webp',
  },
  {
    number: '04',
    title: 'Quality Consistency',
    description:
      'Maintaining the same taste, texture, and quality across batches and outlets is a constant challenge.',
    image: '/images/bakery_quality.png',
    icon: '/images/bakery_quality_consistancy.webp',
  },
  {
    number: '05',
    title: 'Multi-Outlet Coordination',
    description:
      'Ensuring the right products reach the right outlet at the right time is difficult without real-time visibility.',
    image: '/images/bakery_multioutlet.png',
    icon: '/images/bakery_multioutlet_cord.webp',
  },
];

function ChallengeIcon({ challenge, active }) {
  return (
    <div
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-all duration-500 sm:h-14 sm:w-14 ${
        active
          ? 'border-[#e7c4a5] bg-[#fff3e8] shadow-[0_10px_30px_rgba(190,105,35,0.12)]'
          : 'border-[#efe4d9] bg-[#fffaf5]'
      }`}
    >
      <img
        src={challenge.icon}
        alt=""
        aria-hidden="true"
        className={`h-6 w-6 object-contain transition-all duration-500 sm:h-8 sm:w-8 ${
          active ? 'opacity-100 scale-105' : 'opacity-65'
        }`}
      />

      {/* Soft overlay keeps the icon image visually subtle */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-white/10" />
    </div>
  );
}

export default function BakeryChallenge() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === CHALLENGES.length - 1 ? 0 : current + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeChallenge = CHALLENGES[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-[#fffdfb] py-10 sm:py-16 md:py-24 lg:py-28">
      {/* ================= SOFT BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#fff0e3]/40 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#fff5ec]/70 blur-[130px]" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid w-full min-w-0 items-center gap-7 sm:gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16 xl:gap-20">
          {/* ================= LEFT IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative min-w-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/4.25] min-h-[280px] overflow-hidden rounded-[20px] border border-[#eadfd3] bg-[#f8eee5] shadow-[0_25px_70px_rgba(82,48,26,0.14)] sm:min-h-[520px] sm:rounded-[28px] lg:min-h-[620px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeChallenge.image}
                  src={activeChallenge.image}
                  alt={activeChallenge.title}
                  initial={{
                    opacity: 0,
                    scale: 1.06,
                    filter: 'blur(4px)',
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.03,
                    filter: 'blur(3px)',
                  }}
                  transition={{
                    duration: 0.75,
                    ease: EASE,
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Bottom Gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

              {/* Image Progress */}
              <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-white/30">
                <motion.div
                  key={`progress-${activeIndex}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: isPaused ? 0 : 4,
                    ease: 'linear',
                  }}
                  className="h-full bg-[#d7792e]"
                />
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT CONTENT ================= */}
          <div
            className="w-full min-w-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <Eyebrow>
                  THE CHALLENGES
                </Eyebrow>
              </div>

              <h2 className="mt-3 h-display text-[28px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36.8px]">
                Key Challenges{' '}
                <span className="gradient-text-orange">
                  Bakery Businesses Face
                </span>
              </h2>
            </motion.div>

            {/* Challenge Cards */}
            <div className="mt-6 w-full min-w-0 space-y-2 sm:mt-8 sm:space-y-3">
              {CHALLENGES.map((challenge, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={challenge.number}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: EASE,
                      delay: index * 0.07,
                    }}
                    className={`group relative flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-[14px] border px-2.5 py-3 text-left transition-all duration-500 sm:gap-4 sm:rounded-[20px] sm:px-4 sm:py-4 ${
                      isActive
                        ? 'border-[#e4c6ac] bg-white shadow-[0_14px_35px_rgba(112,67,35,0.09)]'
                        : 'border-[#efe4da] bg-white/65 hover:border-[#e5c8ae] hover:bg-white'
                    }`}
                  >
                    {/* Active Left Indicator */}
                    <motion.span
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scaleY: isActive ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.35 }}
                      className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[#d7792e] sm:bottom-4 sm:top-4"
                    />

                    {/* Icon */}
                    <ChallengeIcon
                      challenge={challenge}
                      active={isActive}
                    />

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`h-display text-[13px] font-semibold leading-tight transition-colors duration-300 sm:text-base md:text-lg ${
                          isActive
                            ? 'text-navy-950'
                            : 'text-navy-900'
                        }`}
                      >
                        {challenge.title}
                      </h3>

                      <p className="mt-1 text-[10px] leading-relaxed text-navy-600 sm:max-w-[470px] sm:text-xs md:text-sm">
                        {challenge.description}
                      </p>
                    </div>

                    {/* Number */}
                    <div className="flex min-w-[34px] shrink-0 items-center justify-end border-l border-[#eee4db] pl-2 sm:min-w-[54px] sm:pl-4 md:min-w-[70px] md:pl-6">
                      <span
                        className={`h-display text-[20px] font-medium leading-none transition-colors duration-300 sm:text-[28px] md:text-[34px] ${
                          isActive
                            ? 'text-[#d7792e]'
                            : 'text-[#cdbdaf]'
                        }`}
                      >
                        {challenge.number}
                      </span>
                    </div>

                    {/* Active Progress Line */}
                    {isActive && (
                      <motion.span
                        key={`card-progress-${activeIndex}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: 4,
                          ease: 'linear',
                        }}
                        className="absolute bottom-0 left-0 h-[2px] bg-[#d7792e]/70"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}