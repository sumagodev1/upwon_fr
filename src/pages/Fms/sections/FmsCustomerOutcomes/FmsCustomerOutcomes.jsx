import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  FMS "Customer Outcomes" — the specific, named proof this category's buyers trust
  most. A case-study carousel: a full photo with an overlapping stat/quote card,
  cycling between Monginis (flagship) and U2 Cake.

  FLAG: quotes and named attribution are placeholders — confirm exact wording and
  publication consent before this goes live.
*/

const EASE = [0.22, 1, 0.3, 1];

const STORIES = [
  {
    key: 'monginis',
    name: 'Monginis',
    logo: '/images/testimonial/mongignis.webp',
    image: '/images/fms_hero1.webp',
    stats: [
      { value: '35→200+', label: 'Outlets, same back-office team' },
      { value: '16', label: 'Plants connected to the network' },
      { value: '₹1.5 Cr+', label: 'Order value processed daily' },
    ],
    quote:
      'We scaled from 35 to 200+ outlets on this system — and the same back-office team still runs the whole network.',
    person: 'Back-Office Operations',
    role: 'Monginis',
  },
  {
    key: 'u2cake',
    name: 'U2 Cake',
    logo: '/images/testimonial/u2cake.webp',
    image: '/images/fms_hero2.webp',
    stats: [
      { value: '250+', label: 'Outlets, real-time visibility' },
      { value: '6,000+', label: 'Orders processed daily' },
      { value: '₹23L', label: 'Order value processed daily' },
    ],
    quote:
      'Every outlet reports into one place in real time — we see the whole chain and act on the same day.',
    person: 'Operations Team',
    role: 'U2 Cake',
  },
];

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function FmsCustomerOutcomes() {
  const [active, setActive] = useState(0);
  const story = STORIES[active];

  const go = (dir) => setActive((prev) => (prev + dir + STORIES.length) % STORIES.length);

  // Auto-advance through the stories; resets whenever `active` changes (incl. manual nav).
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STORIES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Customer Outcomes</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.12] tracking-tight text-navy-950">
            35 Outlets Became 200.{' '}
            <span className="gradient-text-orange">The Back-Office Team Didn&apos;t Grow at All.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Named proof from the networks running on UpWon — the challenge, what changed, and the
            numbers.
          </p>
        </motion.div>
      </Container>

      {/* Case-study composition — full width with a 20px side gap */}
      <div className="relative mt-12 w-full px-5">
        {/* Photo */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-3xl bg-navy-950 md:h-[460px] lg:h-[600px]">
          <AnimatePresence initial={false}>
            <motion.img
              key={story.image}
              src={story.image}
              alt={`${story.name} network`}
              loading="eager"
              decoding="async"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1.05, 1.12], x: ['0%', '-1.5%'] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.8, ease: EASE },
                scale: { duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                x: { duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Floating card */}
        <div className="mt-[-2rem] px-4 lg:absolute lg:right-[4%] lg:top-1/2 lg:mt-0 lg:w-[42%] lg:max-w-xl lg:-translate-y-1/2 lg:px-0">
            <div className="rounded-3xl bg-white p-7 shadow-enterprise-lg md:p-10 lg:py-12">
              {/* Logo + arrows */}
              <div className="flex items-center justify-between">
                <img
                  src={story.logo}
                  alt={`${story.name} logo`}
                  className="h-8 w-auto max-w-[130px] object-contain"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous story"
                    className="grid h-9 w-9 place-items-center rounded-full border border-cream-300 text-navy-700 transition-colors hover:border-navy-900 hover:text-navy-900"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next story"
                    className="grid h-9 w-9 place-items-center rounded-full border border-cream-300 text-navy-700 transition-colors hover:border-navy-900 hover:text-navy-900"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={story.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {/* Stats */}
                  <div className="mt-9 grid grid-cols-3 gap-4">
                    {story.stats.map((s) => (
                      <div key={s.label}>
                        <p className="num-display text-2xl text-navy-950 md:text-[1.7rem]">
                          {s.value}
                        </p>
                        <p className="mt-1 text-[14px] leading-snug text-navy-500">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <hr className="my-8 border-cream-300" />

                  {/* Quote */}
                  <p className="text-[15px] font-medium leading-relaxed text-navy-800 md:text-[17px]">
                    “{story.quote}”
                  </p>

                  {/* Person */}
                  <div className="mt-8 flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-900 text-[14px] font-bold text-white">
                      {initials(story.name)}
                    </span>
                    <div>
                      <p className="text-[14px] font-bold text-navy-950">{story.person}</p>
                      <p className="text-[14px] text-navy-500">{story.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Watch link */}
              <Link
                to="/demo"
                className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-bold text-navy-950 underline-offset-4 hover:underline"
              >
                Watch the case study
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
    </section>
  );
}
