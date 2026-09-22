import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Factory,
  Zap,
  Layers,
  MapPin,
  Users,
  IndianRupee,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';

// The three pillars of the brand statement, distilled from the long-form copy
const PILLARS = [
  {
    icon: Factory,
    eyebrow: 'Built for food',
    title: 'Built for food from day one. Not patched later.',
    detail:
      "Batch production, FEFO inventory, recipe and BOM management, FSSAI compliance, franchise hub-spoke operations — it's all native, not bolted on.",
  },
  {
    icon: Zap,
    eyebrow: 'Live in 30 days',
    title: 'Live in 30 days. Not 18 months.',
    detail:
      "A dedicated SPOC, clean data migration, and ready-to-deploy SOP playbooks mean you're up and running before most ERPs finish their kickoff meeting.",
  },
  {
    icon: Layers,
    eyebrow: 'Scales with you',
    title: 'First plant to fiftieth outlet — same platform.',
    detail:
      "Upwon's modular architecture lets you add locations, channels, and business entities as you grow — no migrations, no re-platforming, no starting over.",
  },
];

const PROOF_STATS = [
  { icon: MapPin, value: '10', suffix: 'states', label: 'Operating today' },
  { icon: Users, value: '36,500+', label: 'Daily users on UpWon' },
  { icon: IndianRupee, value: '16 Cr+', label: 'Processed daily' },
];

export default function MasterBrandStatement() {
  return (
    <section className="relative overflow-hidden bg-cream-200 section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-navy-500/[0.06] blur-3xl" />

      <Container className="relative">
        <div className="mx-auto max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
            The UpWon Brand Statement
          </motion.p>

          {/* Distilled headline + supporting line */}
          {/* <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-4xl text-center h-display text-balance text-3xl leading-[1.1] text-navy-950 md:text-5xl lg:text-[3.4rem]"
          >
            India's enterprise suite for food businesses{' '}
            <span className="gradient-text-orange">serious about scale.</span>
          </motion.h2> */}


           <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-4xl text-center h-display text-balance text-3xl leading-[1.1] text-navy-950 md:text-5xl lg:text-[3.4rem]"
          >
            India's only enterprise suite built for food businesses — {' '}
            <span className="gradient-text-orange">not adapted for them.</span>
          </motion.h2>

          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-center text-base leading-relaxed text-navy-700 md:text-lg"
          >
            Built from the ground up for how food and FMCG actually operate — not
            retrofitted from a generic ERP. Speaks the language of your operations,
            integrates with everything you already use.
          </motion.p> */}

            <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-center text-base leading-relaxed text-navy-700 md:text-lg"
          >
            Most ERPs are built for manufacturing and stretched to fit food. 
            Upwon isn't. It's designed around how food and FMCG businesses actually run — 
            and connects with the tools your team already uses every day. 
          </motion.p>

          {/* Three pillars */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-500 hover:border-orange-500/40 hover:bg-white hover:shadow-enterprise-lg md:p-7"
              >
                {/* Accent ribbon on hover */}
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/0 blur-2xl transition-colors duration-700 group-hover:bg-orange-500/10" />

                <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-orange-100 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                  <p.icon className="h-5 w-5" />
                </div>

                <p className="relative mt-5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-orange-600">
                  {p.eyebrow}
                </p>
                <h3 className="relative mt-2 font-display text-lg font-bold leading-snug text-navy-950 md:text-xl">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-navy-700">
                  {p.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Proof stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="shine-effect mt-10 rounded-2xl border border-navy-100 bg-navy-950 shadow-enterprise"
          >
            <div className="grid divide-y divide-white/[0.08] md:grid-cols-[auto_repeat(3,1fr)] md:divide-x md:divide-y-0">
              <div className="flex items-center gap-3 px-6 py-4 md:py-6">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse-slow" />
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-cream-100/70">
                  Live proof
                </p>
              </div>
              {PROOF_STATS.map((s) => (
                <div
                  key={s.label}
                  className="group flex items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-white/[0.04] md:py-6"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-orange-500/15 text-orange-300 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="num-display text-2xl font-bold text-white md:text-3xl">
                      {s.value}
                      {s.suffix && (
                        <span className="ml-1 text-base font-medium text-cream-100/70">
                          {s.suffix}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 truncate text-[14px] text-cream-100/60">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Closing tagline */}
          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 text-center font-display text-3xl italic text-orange-600 md:text-4xl"
          >
            Outdo. <span className="text-navy-950 not-italic">·</span> Scale.{' '}
            <span className="text-navy-950 not-italic">·</span> Win.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {/* <Link to="/demo" className="btn-primary !px-6 !py-3.5">
              Book Free Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link> */}
            {/* <Link to="/about" className="btn-secondary !px-6 !py-3.5">
              The UpWon Story
            </Link> */}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
