import { useRef, useState, useEffect } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  HRMS "Recognition" — a Keka-style module showcase. The heading scrolls away,
  the left nav stays sticky, and the right column stacks every module screenshot
  so they scroll past one after another. A scroll-spy (IntersectionObserver)
  highlights the nav item whose screenshot is centered in the viewport; clicking
  a nav item scrolls its screenshot into view. Signals a mixed-workforce platform
  across the full recruit-to-retire lifecycle. Navy/minimalist: flat cards, navy
  text, orange kept to the eyebrow + active accent only.
*/

const EASE = [0.22, 1, 0.3, 1];

const MODULES = [
  { nav: 'Recruitment & Onboarding', img: '/images/recruitment.webp' },
  { nav: 'Attendance & Leave', img: '/images/Attendance_leave.webp' },
  { nav: 'Payroll & Statutory Compliance', img: '/images/Payroll_Statutory%20Compliance.webp' },
  { nav: 'Employee Self-Service', img: '/images/Employee%20Self-Service.webp' },
  { nav: 'Training & Performance', img: '/images/Training_Performance.webp' },
  { nav: 'Expense Management', img: '/images/Expense%20Management.webp' },
  { nav: 'Offboarding', img: '/images/Offboarding.webp' },
];

// Left-aligned heading — reused by the desktop and mobile views.
function Heading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="max-w-3xl"
    >
      <Eyebrow>Every HR Need</Eyebrow>
      <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
        Advanced Platform for Every HR Need —{' '}
        <span className="gradient-text-orange">From Recruitment to Retirement.</span>
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
        One platform that understands a mixed workforce — office, plant and field — across the full
        employee lifecycle.
      </p>
    </motion.div>
  );
}

// Vertical nav list. `active` highlights the current module; clicking calls onPick.
function ModuleNav({ active, onPick }) {
  return (
    <nav className="flex flex-col">
      {MODULES.map((m, i) => {
        const isActive = i === active;
        return (
          <button
            key={m.nav}
            type="button"
            onClick={() => onPick(i)}
            className={`group flex items-center justify-between gap-3 border-b border-cream-300 py-4 text-left transition-colors ${
              isActive ? 'border-b-orange-500' : ''
            }`}
          >
            <span
              className={`text-[15px] font-bold transition-colors ${
                isActive ? 'text-navy-950' : 'text-navy-400 group-hover:text-navy-600'
              }`}
            >
              {m.nav}
            </span>
            <span
              className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                isActive ? 'bg-orange-500' : 'bg-navy-200 group-hover:bg-navy-300'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

// Framed screenshot — each image already carries its own module heading/description.
function ModuleVisual({ m }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-enterprise">
      <img
        src={m.img}
        alt={m.nav}
        loading="lazy"
        decoding="async"
        className="w-full object-cover"
      />
    </div>
  );
}

export default function HrmsModules() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef([]);

  // Scroll-spy: whichever screenshot is centered in the viewport sets the active
  // nav item. The thin center band (rootMargin) keeps exactly one panel active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    panelRefs.current.filter(Boolean).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Click a nav item → scroll its screenshot into view (offset for the navbar).
  const scrollToIndex = (i) => {
    const el = panelRefs.current[i];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white pb-12 pt-2 md:pb-16 md:pt-4">
      {/* ===== Desktop — sticky nav (left) + stacked scrolling screenshots (right) ===== */}
      <div className="hidden lg:block">
        <Container>
          <Heading />

          <div className="mt-10 grid grid-cols-[minmax(0,300px)_1fr] gap-12">
            {/* Sticky nav */}
            <div>
              <div className="sticky top-32">
                <ModuleNav active={active} onPick={scrollToIndex} />
              </div>
            </div>

            {/* Stacked screenshots — scroll one after another */}
            <div className="flex flex-col gap-10">
              {MODULES.map((m, i) => (
                <div
                  key={m.nav}
                  data-index={i}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className="flex min-h-[80vh] items-center"
                >
                  <ModuleVisual m={m} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ===== Mobile — heading + stacked cards ===== */}
      <Container className="lg:hidden">
        <Heading />
        <div className="mt-10 flex flex-col gap-12">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.nav}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-400">
                <span className="num-display text-orange-600">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-navy-700">{m.nav}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
              <ModuleVisual m={m} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
