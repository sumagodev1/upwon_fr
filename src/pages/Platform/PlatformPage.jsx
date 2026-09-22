import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import PageHero from '../../components/shared/PageHero/PageHero.jsx';
import SectionHeading from '../../components/shared/SectionHeading/SectionHeading.jsx';
import DemoCtaCompact from '../../components/shared/DemoCtaCompact/DemoCtaCompact.jsx';
import { PLATFORM_MODULES, PLATFORM_CAPABILITIES } from '../../data/modules.js';
import Seo from '../../components/shared/Seo/Seo.jsx';

export default function PlatformPage() {
  return (
    <>
      <Seo
        title="The UpWon Platform — One Suite, 8 Products"
        description="ERP, SFA-DMS, FMS, POS, HREasy, WMS, Vendor Portal and Mobile Apps — one platform, one data layer, native integrations. Built for Indian food and FMCG."
        canonical="https://upwon.in/platform"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Products' },
        ]}
        eyebrow="The UpWon Business Growth Suite"
        title={
          <>
            7 Platforms. <br />
            <span className="gradient-text-orange">One Ecosystem.</span>
          </>
        }
        description="Built around how your business actually works. Start with one platform. Add others as you grow. Everything connects."
      />

      {/* Platforms grid */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="The seven platforms"
            title="Each does one thing exceptionally well. Together, they run your business."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_MODULES.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.06 }}
              >
                <Link
                  to={`/products/${m.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all hover:border-orange-500/40 hover:shadow-enterprise"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-cream-300 bg-cream-100 text-orange-600">
                      <m.icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                      {m.code}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy-950 group-hover:text-orange-600">
                    {m.title}
                  </h3>
                  {/* Brief-mandated tagline: italic, light, platform accent (cards use orange master accent for index-page consistency). */}
                  <p
                    className="mt-2 text-[14px] italic text-orange-600"
                    style={{
                      fontFamily: '"Calibri Light", "Arial", "Helvetica Neue", sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    {m.hero}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-charcoal">{m.short}</p>
                  <ul className="mt-4 space-y-1.5">
                    {m.features.slice(0, 2).map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[14px] text-navy-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-orange-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-orange-600">
                    Explore {m.code}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="relative overflow-hidden bg-white section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Platform Capabilities"
            title="The infrastructure underneath the suites."
            description="What separates UpWon from horizontal SaaS — a foundation engineered for food and FMCG operating realities."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-xl border border-cream-300 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-500/40 hover:shadow-enterprise"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-orange-100 text-orange-600">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-navy-950">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <DemoCtaCompact />
    </>
  );
}
