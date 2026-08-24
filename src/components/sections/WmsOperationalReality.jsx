import { m as motion } from 'framer-motion';
import {
  Warehouse,
  Smartphone,
  ScanBarcode,
  RefreshCw,
  BarChart3,
  ClipboardList,
  Brain,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import Container from '../ui/Container.jsx';

/*
  WMS "Operational Reality" — mirrors the food-warehouse manager's actual floor
  back to them. A hero banner (worker scanning bins, live app + rule badges baked
  into the background art) carries the promise and the four in-app capabilities;
  below it, the four daily pain-points of running a food warehouse WITHOUT a
  purpose-built WMS; a closing summary bar ties it to Automate · Track · Perform.
*/

const EASE = [0.22, 1, 0.3, 1];

// In-app capabilities shown beneath the headline (left column of the banner).
const CAPS = [
  {
    icon: Smartphone,
    title: 'Mobile App for Workers',
    desc: 'Real-time tasks, scanning & updates on the go.',
  },
  {
    icon: ScanBarcode,
    title: 'Scan Bin & Track Inventory',
    desc: 'Accurate scanning for every movement.',
  },
  {
    icon: RefreshCw,
    title: 'Enforce FEFO, FIFO, FMFO',
    desc: 'System-driven rules reduce manual errors.',
  },
  {
    icon: BarChart3,
    title: 'Track Performance in Real Time',
    desc: 'Monitor fill rates, errors & productivity instantly.',
  },
];

// The four pain-points of a food warehouse without a purpose-built WMS.
// Pain-point cards use navy only.
const NAVY = '#0F1535';
const NAVY_TINT = 'rgba(15,21,53,0.08)';

const PAINS = [
  {
    num: '01',
    icon: ClipboardList,
    accent: NAVY,
    tint: NAVY_TINT,
    title: 'Manual Stock Counting',
    desc: 'Time-consuming manual counts lead to inaccuracies and delays.',
    img: '/images/manul_stock_counting.webp',
  },
  {
    num: '02',
    icon: Brain,
    accent: NAVY,
    tint: NAVY_TINT,
    title: 'FEFO Depends on Memory',
    desc: 'Staff rely on memory to pick the oldest stock, leading to mistakes.',
    img: '/images/fefo_memory.webp',
  },
  {
    num: '03',
    icon: MapPin,
    accent: NAVY,
    tint: NAVY_TINT,
    title: 'No Multi-Location Visibility',
    desc: 'No real-time visibility across plants and depots creates stock blind spots.',
    img: '/images/muliloc_visibility.webp',
  },
  {
    num: '04',
    icon: AlertTriangle,
    accent: NAVY,
    tint: NAVY_TINT,
    title: 'Wastage Found Too Late',
    desc: 'Expired or ageing stock is discovered only during physical audits.',
    img: '/images/wastage_found.webp',
  },
];

function PainCard({ p, i }) {
  const Icon = p.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
      className="relative flex flex-col rounded-3xl border border-cream-300 bg-white p-6 pt-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise"
    >
      <span
        className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full text-[13px] font-bold text-white"
        style={{ background: p.accent }}
      >
        {p.num}
      </span>

      <span
        className="mx-auto grid h-16 w-16 place-items-center rounded-full"
        style={{ background: p.tint }}
      >
        <Icon
          className="h-8 w-8"
          style={{ color: p.accent }}
          strokeWidth={1.8}
        />
      </span>

      <h3
        className="mt-4 text-center text-[1.15rem] font-bold leading-tight tracking-tight"
        style={{ color: p.accent }}
      >
        {p.title}
      </h3>

      <span
        className="mx-auto mt-2 block h-[3px] w-8 rounded-full"
        style={{ background: p.accent }}
      />

      <p className="mt-3 text-center text-[14px] leading-snug text-navy-600">
        {p.desc}
      </p>

      <div className="mt-5 overflow-hidden rounded-xl">
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="h-40 w-full object-cover grayscale transition-all duration-500 hover:scale-105 hover:grayscale-0"
        />
      </div>
    </motion.div>
  );
}

export default function WmsOperationalReality() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* ===== Hero banner ===== */}
        <div className="relative overflow-hidden rounded-[2rem] border border-cream-300 shadow-sm">
          {/* ===== Responsive Background Image ===== */}
          {/* Mobile: 320px to 767px */}
          <picture className="absolute inset-0 h-full w-full">
            <source
              media="(max-width: 767px)"
              srcSet="/images/oper_reality_back_mb.webp"
            />
            {/* Desktop: 768px and above */}
            <img
              src="/images/oper_reality_back.webp"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center md:object-right"
            />
          </picture>

          {/* left legibility wash — confined to the text zone so the photo stays crisp */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.92) 26%, rgba(255,255,255,0) 52%)',
            }}
          />

          <div className="relative grid min-h-[460px] gap-8 p-7 md:min-h-[560px] md:p-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-600">
                <Warehouse className="h-4 w-4" />
                Operational Reality
              </p>

              <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
                Automated Warehouses.{' '}
                <span className="gradient-text-orange">
                  More Productive Warehouses.
                </span>
              </h2>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-600">
                From counting to compliance — automate every step, empower your
                workforce with real-time visibility.
              </p>

              {/* In-app capabilities */}
              <div className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6">
                {CAPS.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + i * 0.1,
                      ease: EASE,
                    }}
                    className="group"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-900/[0.06] text-navy-800 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>

                    <h3 className="mt-3 text-[14px] font-bold leading-tight text-navy-950">
                      {title}
                    </h3>

                    <p className="mt-1 text-[12.5px] leading-snug text-navy-500">
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ===== Challenges divider ===== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-14 flex items-center justify-center gap-4"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: EASE,
            }}
            className="h-px w-10 origin-right bg-navy-200"
          />

          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-navy-500">
            The Challenges You Face Every Day
          </p>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: EASE,
            }}
            className="h-px w-10 origin-left bg-navy-200"
          />
        </motion.div>

        {/* ===== Pain-point cards ===== */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map((p, i) => (
            <PainCard key={p.num} p={p} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}