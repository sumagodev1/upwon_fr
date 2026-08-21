import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  "Our Values. Your Foundation." — a scroll-driven layout: a sticky left column
  (heading + a number that increments as you scroll) paired with a right column
  of value blocks, each a beveled photo + title + one-line subtext. Light/white
  theme (the reference is navy — this is the white variant).

  PLACEHOLDER: the photos below are stand-ins (existing product imagery). Swap in
  real team / office photos before launch.
*/

const EASE = [0.16, 1, 0.3, 1];

const VALUES = [
  {
    title: 'Genuine Advice',
    sub: 'UPWON values honest and transparent communication to provide practical, well-researched solutions tailored to your needs. Honesty is the basis of our advice.',
    photo: '/images/fms_hero1.webp',
  },
  {
    title: 'Proactive Approach',
    sub: 'We anticipate challenges and proactively address potential issues before they arise, ensuring smooth and efficient project execution.',
    photo: '/images/fms_hero2.webp',
  },
  {
    title: 'Result Oriented, Time-Bound Working',
    sub: 'We focus on delivering measurable results within agreed timelines and maintaining efficiency while ensuring quality outcomes.',
    photo: '/images/fms_hero3.webp',
  },
  {
    title: 'Comprehensive Product Range',
    sub: 'UPWON offers a wide range of software solutions to meet the diverse needs of the FMCG sector, giving clients integrated tools that cover every operational aspect.',
    photo: '/images/discovery1.webp',
  },
  {
    title: 'Dedicated Support',
    sub: 'We offer continuous and reliable support to our customers, ensuring the system is always optimized and functioning, with a team ready to help.',
    photo: '/images/onboarding1.webp',
  },
  {
    title: 'Personalized Assistance',
    sub: "We offer customized solutions and services. Every customer's requirements are different, so we provide a single point of contact after implementation and individual training.",
    photo: '/images/distrubutor_rollout1.webp',
  },
];

function ValueBlock({ v, index, onActive }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && onActive(index)),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onActive]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="overflow-hidden rounded-3xl bg-cream-100 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.28)]">
        <img
          src={v.photo}
          alt={v.title}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <h3 className="mt-6 h-display text-[1.7rem] font-bold tracking-tight text-navy-950 md:text-[2rem]">
        {v.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-navy-600 md:text-base">{v.sub}</p>
    </motion.div>
  );
}

export default function ValuesWorkCulture() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-white py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — sticky heading + scrolling number */}
          <div className="lg:sticky lg:top-32 lg:self-start lg:py-10">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-navy-300 text-lg font-semibold text-navy-800">
              {active + 1}
            </span>
            <div className="mt-10">
              <Eyebrow>Our Customers Appreciate Us</Eyebrow>
            </div>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
              Values &amp;{' '}
              <span className="gradient-text-orange">Work Culture</span>
            </h2>
            <p className="mt-6 max-w-sm text-[14.5px] font-semibold leading-relaxed text-navy-700 md:text-base">
              These core values guide how we work, grow, and lead:
            </p>
          </div>

          {/* Right — scrolling value blocks */}
          <div className="space-y-20 md:space-y-28 lg:border-l lg:border-cream-300 lg:pl-16">
            {VALUES.map((v, i) => (
              <ValueBlock key={v.title} v={v} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
