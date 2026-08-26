import { m as motion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const CAPABILITIES = [
  {
    number: '01',
    title: 'Smarter Procurement',
    description:
      'Plan purchases based on production needs and current stock levels while maintaining better control over suppliers and approvals.',
    icon: '/images/smarter_procurement.webp',
    accent: '#f97316',
  },
  {
    number: '02',
    title: 'Inventory Visibility',
    description:
      'Track raw materials, packaging, semi-finished goods, and finished products across every operational location.',
    icon: '/images/inventory_visibility.webp',
    accent: '#168b88',
  },
  {
    number: '03',
    title: 'Production Planning',
    description:
      'Align ingredient availability, recipes, production schedules, and expected demand to improve daily production planning.',
    icon: '/images/prod_planning.webp',
    accent: '#d99200',
  },
  {
    number: '04',
    title: 'Batch-Level Control',
    description:
      'Maintain clearer visibility into material consumption, production output, and operational movement across batches.',
    icon: '/images/batch_level_control.webp',
    accent: '#7551a8',
  },
  {
    number: '05',
    title: 'Multi-Location Operations',
    description:
      'Connect your central kitchen, warehouse, retail stores, and distribution points through a unified operational view.',
    icon: '/images/multi_loc_oper.webp',
    accent: '#719b32',
  },
  {
    number: '06',
    title: 'Real-Time Business Insights',
    description:
      'Access reports and dashboards that help teams understand inventory movement, purchasing, production performance, and operational trends.',
    icon: '/images/real_time_buiness.webp',
    accent: '#1678aa',
  },
];

export default function BakeryCoreCapabilities() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">

      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/images/bakery_core_cap_back.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* ================= SUBTLE OVERLAY ================= */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 via-white/10 to-white/15" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(255,255,255,0.14))]" />

      <Container className="relative z-10">

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <Eyebrow className="justify-center">
            CORE CAPABILITIES
          </Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[25px] md:text-[31px] lg:text-[36.8px]">
            Everything You Need to Run a{' '}
            <span className="gradient-text-orange">
              Smarter
            </span>{' '}
            Bakery Business
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base lg:text-[17px]">
            End-to-end capabilities that help bakery and confectionery
            businesses operate with greater visibility, control, and
            confidence across every stage of their operations.
          </p>
        </motion.div>

        {/* ================= CAPABILITY CARDS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          {CAPABILITIES.map((capability, index) => (
            <motion.article
              key={capability.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: index * 0.07,
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 },
              }}
              className="group relative min-h-[250px] overflow-hidden rounded-[22px] border border-white/50 bg-white/72 p-5 shadow-[0_12px_35px_rgba(25,35,55,0.12)] backdrop-blur-[3px] sm:p-6"
            >
              {/* ================= NUMBER ================= */}
              <span
                className="absolute right-5 top-3 h-display text-[42px] font-semibold leading-none opacity-30 sm:text-[48px]"
                style={{ color: capability.accent }}
              >
                {capability.number}
              </span>

              <div className="flex h-full items-start gap-5">

                {/* ================= ICON IMAGE ================= */}
                <div
                  className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] border shadow-sm transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: `${capability.accent}12`,
                    borderColor: `${capability.accent}30`,
                  }}
                >
                  <img
                    src={capability.icon}
                    alt={capability.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-3"
                  />
                </div>

                {/* ================= DIVIDER ================= */}
                <div className="h-[185px] w-px shrink-0 bg-navy-950/10" />

                {/* ================= CONTENT ================= */}
                <div className="flex-1 pr-1">
                  <h3 className="h-display max-w-[210px] text-[21px] font-semibold leading-[1.25] text-navy-950">
                    {capability.title}
                  </h3>

                  <span
                    className="mt-3 block h-[2px] w-8 rounded-full"
                    style={{
                      backgroundColor: capability.accent,
                    }}
                  />

                  <p className="mt-4 text-[14px] leading-[1.7] text-navy-600">
                    {capability.description}
                  </p>
                </div>
              </div>

              {/* ================= BOTTOM RIGHT ACCENT ================= */}
              <div
                className="absolute bottom-0 right-0 h-0 w-0 border-l-[32px] border-t-[32px] border-l-transparent"
                style={{
                  borderTopColor: capability.accent,
                  borderRightColor: capability.accent,
                }}
              />
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}