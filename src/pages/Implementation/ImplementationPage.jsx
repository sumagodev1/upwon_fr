import { m as motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, UserCheck, ClipboardCheck, Gauge, Headset, Timer, GitFork } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import HeroSlider from '../../components/shared/HeroSlider/HeroSlider.jsx';
import SectionIntro from '../../components/shared/SectionIntro/SectionIntro.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';
import { IMPLEMENTATION_PHASES, GOVERNANCE } from '../../data/implementation.js';
import Seo from '../../components/shared/Seo/Seo.jsx';

const SLAS = [
  { icon: Timer, label: 'P1 Response', value: '15 min' },
  { icon: Gauge, label: 'Platform uptime', value: '99.95%' },
  { icon: Headset, label: 'Enterprise on-call', value: '24×7' },
  { icon: GitFork, label: 'Release cadence', value: 'Fortnightly' },
];


const HERO_ACCENT = '#E85A2A';

/* Hero backdrops — the site’s shared hero artwork. This page has never
   had dedicated hero photography of its own; drop a local webp in here
   when it does and nothing else needs to change. */
const HERO_BG_A = '/images/hero%20bg3.webp';

/* Hero slides — the page's own copy, on the site's standard slider. */
const HERO_SLIDES = [
  {
    eyebrow: 'IMPLEMENTATION METHODOLOGY',
    headline:
      'From Contract Signed to Fully Live — In 30 to 45 Days.',
    subhead:
      '93% of UpWon projects go live on time. Implementation, training, and 90-day hyper-care are included as standard — not added as line items.',
    bg: HERO_BG_A,
    accent: HERO_ACCENT,
    cta: { label: 'Request a Demo', to: '/demo' },
    secondaryCta: { label: 'Read the Case Studies', to: '/clients' },
  },
];

export default function ImplementationPage() {
  return (
    <>
      <Seo
        title="Implementation — Live in 30-45 Days"
        description="The UpWon go-live playbook — discovery, configuration, data migration, training and go-live. Indian food ops in 30-45 days, not 18 months."
        canonical="https://upwon.in/implementation"
      />
      <HeroSlider
        slides={HERO_SLIDES}
        variant="dark"
        intervalMs={5000}
        minHeight="min-h-[440px] sm:min-h-[480px] md:min-h-[520px]"
        topPad="pt-32 md:pt-40"
      />

      {/* 4 Phases */}
      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionIntro
            eyebrow="The four phases"
            title={
              <>
                From Kickoff to Scale,{' '}
                <span className="gradient-text-orange">Every Phase Is Governed.</span>
              </>
            }
            description="Each phase has named owners, signed-off artefacts, and a defined exit criteria. No phase begins until the previous one's gate is cleared."
          />

          <div className="relative mt-16">
            <div className="absolute left-[35px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-orange-500 via-cream-400 to-cream-400 md:block" />
            <div className="space-y-6">
              {IMPLEMENTATION_PHASES.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: i * 0.05 }}
                  className="relative grid gap-5 md:grid-cols-[72px_1fr]"
                >
                  <div className="relative z-10 mx-auto md:mx-0">
                    <div className="grid h-[72px] w-[72px] place-items-center rounded-2xl border border-cream-300 bg-white shadow-enterprise">
                      <p.icon className="h-7 w-7 text-orange-600" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-cream-300 bg-white p-6 shadow-sm md:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                        Phase {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14px] font-medium text-navy-600">{p.week}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-navy-950 md:text-2xl">{p.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-charcoal">
                      {p.description}
                    </p>
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {p.deliverables.map((d) => (
                        <div
                          key={d}
                          className="flex items-start gap-2 rounded-lg border border-cream-300 bg-cream-100 px-3 py-2 text-[14px] text-navy-800"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-600" />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Governance */}
      <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
        <Container className="relative">
          <SectionIntro
            eyebrow="Enterprise Governance"
            title={
              <>
                Accountability,{' '}
                <span className="gradient-text-orange">Not Aspiration.</span>
              </>
            }
            description="UpWon implementations are governed by named accountability, fortnightly executive review, and quarterly business reviews."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {GOVERNANCE.map((g, i) => {
              const icons = [UserCheck, ClipboardCheck, ShieldCheck, Headset];
              const Icon = icons[i % icons.length];
              return (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all hover:border-orange-500/40 hover:shadow-enterprise"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-cream-300 bg-cream-100 text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-navy-950">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">{g.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SLAs */}
      <section className="relative overflow-hidden bg-cream-200 py-10 sm:py-12 lg:py-14">
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <SectionIntro
              align="left"
              eyebrow="Enterprise SLAs"
              title={
                <>
                  Operations Don&rsquo;t Sleep.{' '}
                  <span className="gradient-text-orange">Neither Does UpWon.</span>
                </>
              }
              description="Every UpWon deployment is backed by defined response, resolution and uptime SLAs."
            />
            <div className="grid gap-px overflow-hidden rounded-2xl border border-cream-300 bg-cream-300 shadow-enterprise sm:grid-cols-2">
              {SLAS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative bg-white p-7"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-orange-100 text-orange-600">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <p className="num-display mt-5 text-3xl text-navy-950">{s.value}</p>
                  <p className="mt-1 text-[14px] text-navy-600">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* <DemoCtaCompact
        eyebrow="See the methodology in action"
        title="Book your free demo. We'll walk you through the exact go-live plan for your business."
      /> */}
    </>
  );
}
