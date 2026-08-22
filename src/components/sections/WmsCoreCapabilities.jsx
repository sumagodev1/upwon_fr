import { m as motion } from 'framer-motion';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const CAPABILITIES = [
  {
    num: '01',
    title: 'Picking & Packing',
    desc: 'Web and mobile-guided workflows for faster, more accurate order fulfilment.Guide every picker through the right steps, from item selection to final packing.Reduce errors, speed up dispatch, and keep every order moving efficiently.',
    img: '/images/picking_and_packing.webp',
  },
  {
    num: '02',
    title: 'Inventory Visibility',
    desc: 'Real-time stock across every location, not a weekly count.See exactly what is available, where it is stored, and how inventory is moving.Make faster decisions with accurate, up-to-date visibility across your entire network.',
    img: '/images/inventry_visibility.webp',
  },
  {
    num: '03',
    title: 'Shipping & Returns',
    desc: 'Optimised dispatch and return handling in one connected workflow.Streamline every shipment from order confirmation to final delivery and return receipt.Reduce delays, simplify reverse logistics, and keep every movement fully traceable.',
    img: '/images/shipping_and_returns.webp',
  },
  {
    num: '04',
    title: 'Reporting & Analytics',
    desc: 'Warehouse performance and inventory trends, always current.Track key metrics, monitor stock movement, and uncover trends as they happen.Turn real-time operational data into clear insights for faster, smarter decisions.',
    img: '/images/reporting_and_analytics.webp',
  },
  {
    num: '05',
    title: 'Multilocation Integration',
    desc: 'Stock synchronised across every plant and depot.Manage inventory, transfers, and movements across all locations from one connected system.Keep every site aligned with accurate stock data and complete operational visibility.',
    img: '/images/multilocation_integration.webp',
  },
  {
    num: '06',
    title: 'Barcode & RFID',
    desc: 'Faster, more accurate tracking at every inventory movement.Capture stock movements instantly with barcode scanning and RFID-enabled workflows.Reduce manual errors, improve traceability, and maintain accurate inventory at every step.',
    img: '/images/barcode_rifid.webp',
  },
  {
    num: '07',
    title: 'Scalability & Customisation',
    desc: 'The system adapts as your warehouse network grows.Configure workflows, processes, and features around the way your operations work.Scale seamlessly across new locations, users, and evolving business requirements.',
    img: '/images/scalability_cust.webp',
  },
];

function CapabilityRow({ item, index }) {
  const imageRight = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        ease: EASE,
      }}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* Text Content */}
      <motion.div
        initial={{
          opacity: 0,
          x: imageRight ? -28 : 28,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: EASE,
        }}
        className={
          imageRight
            ? 'order-2 lg:order-1'
            : 'order-2 lg:order-2'
        }
      >
        <h3 className="h-display text-[2.3rem] leading-[1.08] tracking-tight text-navy-950 md:text-[2.75rem]">
          {item.title}
        </h3>

        <p className="mt-5 max-w-sm text-base leading-relaxed text-navy-600">
          {item.desc}
        </p>
      </motion.div>

      {/* Image - Full Image Display Without Cropping */}
      <motion.div
        initial={{
          opacity: 0,
          x: imageRight ? 28 : -28,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: EASE,
        }}
        className={
          imageRight
            ? 'order-1 lg:order-2'
            : 'order-1 lg:order-1'
        }
      >
        <div className="group flex w-full items-center justify-center">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-auto w-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function WmsCoreCapabilities() {
  return (
    <section
      id="core-capabilities"
      className="relative overflow-hidden bg-[#f5f6fa] py-12 md:py-16"
    >
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.6,
            ease: EASE,
          }}
          className="max-w-3xl"
        >
          <Eyebrow>Core Capabilities</Eyebrow>

          <h2 className="mt-4 h-display text-[2.3rem] leading-[1.08] tracking-tight text-navy-950 md:text-[2.75rem]">
            Everything From the Receiving Dock to the{' '}
            <span className="gradient-text-orange">
              Dispatch Bay — In One Flow.
            </span>
          </h2>

          <p className="mt-5 max-w-sm text-base leading-relaxed text-navy-600">
            Seven connected capabilities that bring visibility, speed and
            control to every movement inside your warehouse.
          </p>
        </motion.div>

        {/* Capability Rows */}
        <div className="mt-16 space-y-20 md:mt-20 md:space-y-24 lg:space-y-28">
          {CAPABILITIES.map((item, index) => (
            <CapabilityRow
              key={item.num}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}