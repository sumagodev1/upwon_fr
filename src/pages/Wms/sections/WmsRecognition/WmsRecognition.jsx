import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  WMS "Recognition" — a quick category map so every food/FMCG warehouse buyer sees
  themselves immediately: cold-storage manager, multi-plant FG head, raw-material
  stores manager, 3PL operator. Seven warehouse-type cards (icon + title + one
  line on its specific stock-handling reality), over a faint warehouse line-art
  background, closed by a compliance / excellence / scale trust bar.
*/

const EASE = [0.22, 1, 0.3, 1];

const TYPES = [
  {
    title: 'Cold Storage & Dairy',
    desc: 'End-to-end visibility for temperature-controlled inventory and compliance.',
    img: '/images/cold_storage.webp',
  },
  {
    title: 'Bakery & Confectionery FG Warehousing',
    desc: 'Track batches, shelf-life and FEFO for finished goods seamlessly.',
    img: '/images/bakeryandconf.webp',
  },
  {
    title: 'Raw Material & Stores',
    desc: 'Streamline GRN, inward, stock control and material availability.',
    img: '/images/raw_material.webp',
  },
  {
    title: 'Multi-Plant Distribution Warehousing',
    desc: 'Centralized inventory visibility across plants and regional DCs.',
    img: '/images/multi_plant_distribution.webp',
  },
  {
    title: 'WIP / In-Process Storage',
    desc: 'Track, manage and move WIP across stages with precision.',
    img: '/images/wip_process_storage.webp',
  },
  {
    title: 'Bonded / Import-Export Warehouse',
    desc: 'Ensure compliance with customs, bonded flows and documentation.',
    img: '/images/import_export.webp',
  },
  {
    title: 'Co-Packer / 3PL-Managed Warehouse',
    desc: 'Operate efficiently with client-wise segregation and SLA tracking.',
    img: '/images/co_packer.webp',
  },
];

function TypeCard({ t, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: EASE }}
      className="flex w-full flex-col items-center rounded-2xl border border-cream-300 bg-white/85 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
    >
      <img
        src={t.img}
        alt={t.title}
        loading="lazy"
        decoding="async"
        className="h-32 w-full object-contain md:h-36"
      />
      <h3 className="mt-4 text-[1.05rem] font-bold leading-tight tracking-tight text-navy-950">
        {t.title}
      </h3>
      <span className="mt-3 block h-[3px] w-8 rounded-full bg-orange-500" />
      <p className="mt-3 text-[14px] leading-snug text-navy-600">{t.desc}</p>
    </motion.div>
  );
}

export default function WmsRecognition() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      {/* Warehouse line-art background — clearly visible */}
      <img
        src="/images/wms_recback.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Recognition</Eyebrow>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Built for All Types <span className="gradient-text-orange">of Warehouses</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            From cold-storage managers to multi-plant FG warehouse heads and raw-material stores
            managers — our platform is built to help you see yourself in every workflow.
          </p>
        </motion.div>

        {/* Card grid — four across, final three centered */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {TYPES.map((t, i) => (
            <TypeCard key={t.title} t={t} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
