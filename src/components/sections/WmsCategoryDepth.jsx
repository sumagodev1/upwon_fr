import { useEffect, useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import Eyebrow from '../ui/Eyebrow.jsx';
import {
  BadgeCheck,
  ChevronRight,
  CircleCheck,
  Factory,
  Gauge,
  HeartPulse,
  Leaf,
  Milk,
  PackageCheck,
  Plug,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Warehouse,
  Wheat,
} from 'lucide-react';
import Container from '../ui/Container.jsx';

const EASE = [0.22, 1, 0.3, 1];
const AUTO_SCROLL_MS = 4200;

const CATEGORY_RULES = [
  {
    title: 'Bakery & Confectionery',
    short: 'Short shelf-life finished goods, expiry-critical FEFO.',
    img: '/images/wms_bakery_confectionery.webp',
    icon: Wheat,
    bullets: [
      'Strict FEFO-based putaway and picking',
      'Expiry alerts and auto block on near-expiry stock',
      'Batch-wise traceability from production to dispatch',
      'Temperature-aware storage where required',
      'Real-time stock visibility across locations',
    ],
  },
  {
    title: 'Dairy & Dairy Products',
    short:
      'Cold-chain and temperature-zone storage with the strictest FEFO enforcement.',
    img: '/images/wms_dairy_icecream.webp',
    icon: Milk,
    bullets: [
      'Ambient, chilled and frozen zone control',
      'Mandatory FEFO validation at dispatch',
      'Lot-level visibility across plants and depots',
      'Cold-chain handling rules by SKU',
      'Fast recall support for sensitive batches',
    ],
  },
  {
    title: 'Beverages & Juices',
    short: 'Returnable container tracking and high-volume multi-SKU storage.',
    img: '/images/wms_beverages_juices.webp',
    icon: Gauge,
    bullets: [
      'Crate, bottle and container movement tracking',
      'High-volume pick waves by route or channel',
      'Batch and expiry visibility by SKU',
      'Depot-wise stock accuracy for fast dispatch',
      'Returns mapped back into usable inventory',
    ],
  },
  {
    title: 'Snacks & Processed Foods',
    short:
      'High SKU-count packaging inventory and GT/MT-split finished goods.',
    img: '/images/wms_snacks_processedfood.webp',
    icon: PackageCheck,
    bullets: [
      'Packaging material and finished goods control',
      'Channel-wise allocation for GT and MT orders',
      'SKU-dense bin mapping and replenishment',
      'Expiry-first picking for finished goods',
      'Batch traceability across dispatch lots',
    ],
  },
  {
    title: 'Nutraceuticals & Healthcare Distribution',
    short: 'Batch, expiry, cold-chain and licence-based compliance.',
    img: '/images/wms_nutraceuticals_healthcare_distribution.webp',
    icon: HeartPulse,
    bullets: [
      'Batch and expiry tracking for regulated SKUs',
      'Cold-chain zones for sensitive products',
      'Licence-aware storage and dispatch checks',
      'Audit-ready lot movement history',
      'FEFO enforcement across warehouses',
    ],
  },
  {
    title: 'Agro-Inputs',
    short:
      'Seeds, fertilizers and agrochemicals with expiry-relevant distribution.',
    img: '/images/wms_agro_inputs.webp',
    icon: Leaf,
    bullets: [
      'Expiry controls for seeds and agrochemicals',
      'Seasonal demand and depot movement visibility',
      'Distributor-style stock allocation',
      'Batch and lot tracking by product family',
      'Network-wide inventory visibility',
    ],
  },
  {
    title: 'Personal Care & Home Care',
    short:
      'The non-food FMCG half with batch, lot, expiry and multi-channel distribution.',
    img: '/images/wms_personal_care_home_care.webp',
    icon: Sparkles,
    bullets: [
      'Batch and lot tracking for cosmetics and toiletries',
      'Expiry alerts for shelf-life-sensitive SKUs',
      'Multi-channel allocation across GT, MT and ecommerce',
      'Distributor and depot stock visibility',
      'Recall support by batch and location',
    ],
  },
  {
    title: 'Electricals & FMEG',
    short: 'Warranty-linked stock and multi-brand distributor networks.',
    img: '/images/wms_electricals_FMEG.webp',
    icon: Plug,
    bullets: [
      'SKU and model-wise storage control',
      'Warranty-linked movement visibility',
      'Multi-brand distributor stock management',
      'Fast picking for route and dealer orders',
      'Location-wise inventory accuracy',
    ],
  },
  {
    title: 'Auto Components & Spare Parts Distribution',
    short:
      'High SKU count and multi-location control with serial-heavy logic.',
    img: '/images/wms_auto_components_spare_parts_distribution.webp',
    icon: Factory,
    bullets: [
      'High SKU-count bin and location mapping',
      'Serial-aware stock movement where required',
      'Branch and depot stock visibility',
      'Fast spare-part picking and replenishment',
      'Traceable dispatch history by item',
    ],
  },
  {
    title: '3PL & Contract Warehousing',
    short: 'A roadmap conversation for multi-tenant warehouse operations.',
    img: '/images/wms_3PL_contract_warehousing.webp',
    icon: Warehouse,
    bullets: [
      'Client-wise stock separation and visibility',
      'Multi-tenant warehouse workflow planning',
      'Inbound, storage and dispatch accountability',
      'Service-level reporting by account',
      'Roadmap fitment for contract warehouse logic',
    ],
  },
];

const OUTCOMES = [
  {
    title: 'FEFO First',
    desc: 'Always pick the right stock',
    icon: Snowflake,
  },
  {
    title: 'Expiry Control',
    desc: 'Reduce waste and write-offs',
    icon: CircleCheck,
  },
  {
    title: 'Full Traceability',
    desc: 'Track every batch end-to-end',
    icon: BadgeCheck,
  },
  {
    title: 'Faster Dispatch',
    desc: 'Accurate picking, on-time delivery',
    icon: ShieldCheck,
  },
];

export default function WmsCategoryDepth() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = CATEGORY_RULES[activeIndex];
  const ActiveIcon = active.icon;

  const splitTitle = useMemo(
    () => ({
      first: 'Cold Storage, Dry Storage, Raw Material',
      second: 'Each Needs Different Rules. UpWon Knows the Difference.',
    }),
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % CATEGORY_RULES.length);
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f8f9fb] py-12 md:py-16">
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-5xl text-center"
        >
          <Eyebrow>Complete Warehousing</Eyebrow>

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            {splitTitle.first} -{' '}
            <span className="text-orange-600">{splitTitle.second}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-navy-600 md:text-lg">
            Every industry. Every product. Every rule. UpWon WMS adapts to the
            way you store, so you can focus on what you deliver.
          </p>
        </motion.div>

        {/* BOTH COLUMNS SAME HEIGHT */}
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[0.95fr_1.75fr]">
          {/* LEFT CATEGORY LIST */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="h-full overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
          >
            <div className="flex h-full flex-col">
              {CATEGORY_RULES.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group flex flex-1 items-center gap-3 border-b border-orange-100 px-4 py-3 text-left transition-colors last:border-b-0 ${
                      isActive
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-white text-navy-950 hover:bg-cream-100'
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border ${
                        isActive
                          ? 'border-orange-300 bg-white text-orange-600'
                          : 'border-orange-100 text-orange-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-50 text-sm font-semibold text-orange-600">
                      {index + 1}
                    </span>

                    <span className="min-w-0 flex-1 text-sm font-semibold leading-snug md:text-[15px]">
                      {item.title}
                    </span>

                    <ChevronRight
                      className={`h-5 w-5 shrink-0 transition-transform ${
                        isActive
                          ? 'translate-x-1 text-orange-600'
                          : 'text-orange-300 group-hover:translate-x-1'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT ACTIVE CONTENT */}
          <motion.article
            key={active.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="h-full min-h-[720px] rounded-2xl border border-orange-100 bg-white p-5 shadow-sm md:min-h-[650px] md:p-7 xl:min-h-[520px]"
          >
            <div className="grid min-h-[480px] gap-7 xl:grid-cols-[0.78fr_1fr]">
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-full border border-orange-200 bg-orange-50 text-orange-600">
                  <ActiveIcon className="h-7 w-7" />
                </div>

                <h3 className="mt-4 h-display text-2xl leading-tight text-navy-950 md:text-3xl">
                  {active.title}
                </h3>

                <p className="mt-3 text-base font-medium leading-relaxed text-navy-700">
                  {active.short}
                </p>

                <ul className="mt-7 space-y-4">
                  {active.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[15px] leading-relaxed text-navy-700"
                    >
                      <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-h-[280px] overflow-hidden rounded-2xl bg-cream-100 xl:h-[360px] xl:min-h-0">
                <img
                  src={active.img}
                  alt={`${active.title} warehouse management`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-7 grid gap-4 border-t border-orange-100 pt-6 sm:grid-cols-2 xl:grid-cols-4">
              {OUTCOMES.map((outcome) => {
                const Icon = outcome.icon;

                return (
                  <div key={outcome.title} className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-orange-200 text-orange-600">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span>
                      <span className="block text-sm font-bold text-navy-950">
                        {outcome.title}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-navy-600">
                        {outcome.desc}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}