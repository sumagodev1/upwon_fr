import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Globe, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

// "Who We Are" — Made in India, for the world. The world-map artwork lives in
// the section background image; the left column is rebuilt as real content so
// the copy stays crisp, accessible and editable.

const EASE = [0.16, 1, 0.3, 1];

const FEATURES = [
  {
    icon: Code2,
    title: 'Built in India',
    desc: 'Engineered with innovation, precision and global standards.',
  },
  {
    icon: Globe,
    title: 'Trusted Worldwide',
    desc: 'Delivering value to 25+ countries and growing every day.',
  },
  {
    icon: Users,
    title: 'Enterprise Focused',
    desc: 'Solutions that empower businesses across multiple industries.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable & Secure',
    desc: 'Built for scale with security, compliance and 99.9% uptime.',
  },
];

export default function WhoWeAreSection() {
  return (
    <section className="relative overflow-hidden bg-[#eef1f7] py-10 md:py-14">
      {/* Full-bleed background artwork — the dotted world map + India origin.
          `bg-fixed` on desktop pins it to the viewport, so the map stays still
          while the text column scrolls over it (parallax). Mobile keeps a
          normal scrolling background — iOS Safari doesn't honour bg-fixed and
          it causes repaint jank on phones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-fixed lg:[background-size:100%_auto]"
        style={{ backgroundImage: "url('/images/who%20we%20are.webp')" }}
      />
      {/* Left scrim — keeps the copy readable over the artwork while the map
          on the right stays visible. Fades out toward the centre. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#eef1f7] via-[#eef1f7]/85 to-transparent lg:via-[#eef1f7]/70" />

      <Container className="relative">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Eyebrow>Who We Are</Eyebrow>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mt-3 h-display text-[2rem] leading-[1.1] tracking-tight text-navy-950 md:text-[2.5rem]"
          >
            Software Solutions
            <br />
            Made In India
            <br />
            <span className="gradient-text-orange">For The World</span>
          </motion.h2>

          {/* Intro paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-navy-600 md:text-base"
          >
            UPWON Cloud ERP Platform is a leading enterprise IT solutions
            provider specializing in streamlining and automating end-to-end business
            processes. Our solutions are built with advanced technology, manufactured
            in India and trusted by businesses worldwide.
          </motion.p>

          {/* Feature list */}
          <div className="mt-7 space-y-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: EASE }}
                  className="flex items-start gap-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cream-300 bg-white text-orange-500 shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-navy-950 md:text-base">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-navy-600">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
            className="mt-8"
          >
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-navy-950"
            >
              Know More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
