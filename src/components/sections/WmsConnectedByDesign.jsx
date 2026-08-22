 import { m as motion } from 'framer-motion';
import {
  Factory,
  Warehouse,
  ArrowRight,
  PackageCheck,
  Truck,
  Boxes,
  ScanLine,
  Scale,
  Smartphone,
  MonitorSmartphone,
} from 'lucide-react';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const CONNECTORS = [
  {
    name: 'Zomato',
    img: '/images/platform_integration_client/zomato.webp',
    className: 'left-[4%] top-[14%] hidden lg:flex',
    size: 'h-20 w-20',
    delay: 0,
  },
  {
    name: 'Tally',
    img: '/images/platform_integration_client/Tally.webp',
    className: 'left-[18%] top-[4%] hidden lg:flex',
    size: 'h-24 w-24',
    delay: 0.1,
  },
  {
    name: 'Swiggy',
    img: '/images/platform_integration_client/swiggy.webp',
    className: 'left-[14%] bottom-[20%] hidden lg:flex',
    size: 'h-24 w-24',
    delay: 0.2,
  },
  {
    name: 'UPI',
    img: '/images/platform_integration_client/upi.webp',
    className: 'left-[29%] bottom-[7%] hidden xl:flex',
    size: 'h-20 w-20',
    delay: 0.3,
  },
  {
    name: 'SAP',
    img: '/images/platform_integration_client/SAP.webp',
    className: 'right-[10%] top-[14%] hidden lg:flex',
    size: 'h-24 w-24',
    delay: 0.1,
  },
  {
    name: 'Oracle',
    img: '/images/platform_integration_client/Oracle.webp',
    className: 'right-[24%] top-[4%] hidden lg:flex',
    size: 'h-24 w-24',
    delay: 0.2,
  },
  {
    name: 'PhonePe',
    img: '/images/platform_integration_client/PhonePe.webp',
    className: 'right-[19%] bottom-[18%] hidden lg:flex',
    size: 'h-20 w-20',
    delay: 0.3,
  },
  {
    name: 'Dynamics',
    img: '/images/platform_integration_client/Dynamics.webp',
    className: 'right-[6%] bottom-[6%] hidden xl:flex',
    size: 'h-24 w-24',
    delay: 0.4,
  },
];

const MORE_CONNECTORS = [
  {
    name: 'Paytm',
    img: '/images/platform_integration_client/paytm.webp',
  },
  {
    name: 'ONDC',
    img: '/images/platform_integration_client/ondc.webp',
  },
  {
    name: 'Google Pay',
    img: '/images/platform_integration_client/Gpay.webp',
  },
  {
    name: 'BharatPe',
    img: '/images/platform_integration_client/BharatPe.webp',
  },
  {
    name: 'eSSL',
    img: '/images/platform_integration_client/eSSL.webp',
  },
  {
    name: 'EPSON',
    img: '/images/platform_integration_client/EPSON.webp',
  },
  {
    name: 'TCS iON',
    img: '/images/platform_integration_client/Tcsion.webp',
  },
  {
    name: 'Unzo',
    img: '/images/platform_integration_client/unzo.webp',
  },
];

const FLOW_STEPS = [
  {
    num: '01',
    title: 'Production Batch Completed',
    desc: 'Batch, quantity and expiry details captured at source.',
    icon: Factory,
  },
  {
    num: '02',
    title: 'Warehouse Stock Updated',
    desc: 'Inventory updates instantly without manual stock entry.',
    icon: Warehouse,
  },
  {
    num: '03',
    title: 'FEFO-Ranked for Putaway',
    desc: 'Stock is prioritised using expiry-aware warehouse logic.',
    icon: PackageCheck,
  },
  {
    num: '04',
    title: 'Ready for Dispatch',
    desc: 'The right inventory is ready for the next order movement.',
    icon: Truck,
  },
];

function ConnectorLogo({ connector }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: connector.delay,
        ease: EASE,
      }}
      className={`absolute items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm ${connector.size} ${connector.className}`}
    >
      <img
        src={connector.img}
        alt={connector.name}
        loading="lazy"
        decoding="async"
        className="max-h-[48%] max-w-[62%] object-contain"
      />
    </motion.div>
  );
}

function FlowStep({ step, index }) {
  const Icon = step.icon;

  return (
    <div className="flex flex-1 items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
          ease: EASE,
        }}
        className="group flex min-w-0 flex-1 flex-col items-center text-center"
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-cream-200 bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
          <Icon
            className="h-6 w-6 text-orange-500"
            strokeWidth={1.8}
          />

          <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-navy-950 px-1 text-[10px] font-bold text-white">
            {step.num}
          </span>
        </div>

        <h3 className="mt-4 max-w-[180px] text-sm font-extrabold leading-snug text-navy-950">
          {step.title}
        </h3>

        <p className="mt-2 max-w-[190px] text-xs leading-relaxed text-navy-600">
          {step.desc}
        </p>
      </motion.div>

      {index < FLOW_STEPS.length - 1 && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.25 + index * 0.12,
            ease: EASE,
          }}
          className="mx-2 hidden w-12 origin-left items-center text-cream-400 md:flex lg:w-20"
        >
          <span className="h-px flex-1 bg-cream-300" />
          <ArrowRight
            className="ml-1 h-4 w-4 shrink-0"
            strokeWidth={1.5}
          />
        </motion.div>
      )}
    </div>
  );
}

export default function WmsConnectedByDesign() {
  return (
    <section
      id="connected-by-design"
      className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/20 blur-3xl" />

        <div className="absolute left-[8%] top-[30%] h-40 w-40 rounded-full bg-blue-100/20 blur-3xl" />

        <div className="absolute bottom-[15%] right-[8%] h-48 w-48 rounded-full bg-orange-100/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-10">

        {/* Main Connector Area */}
        <div className="relative min-h-[620px] lg:min-h-[680px]">

          {/* Floating Logos */}
          {CONNECTORS.map((connector) => (
            <ConnectorLogo
              key={connector.name}
              connector={connector}
            />
          ))}

          {/* Center Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              ease: EASE,
            }}
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center pt-10 text-center lg:pt-20"
          >
            <Eyebrow>Connected by Design</Eyebrow>

            <h2 className="mt-4 h-display text-[2.3rem] leading-[1.08] tracking-tight text-navy-950 md:text-[2.75rem]">
              UPWON{' '}
              <span className="gradient-text-orange">
                Connectors
              </span>
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-600">
              Connect your warehouse with the systems, platforms and tools that
              already run your business. From ERP and finance systems to HRMS,
              DMS, FMS, hardware devices, mobile apps and operational dashboards.
            </p>

            {/* Connector Categories */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-sm">
                <Boxes className="h-4 w-4 text-orange-500" />
                ERP & Business Systems
              </div>

              <div className="flex items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-sm">
                <ScanLine className="h-4 w-4 text-orange-500" />
                Barcode & Third-Party Tools
              </div>

              <div className="flex items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-sm">
                <Scale className="h-4 w-4 text-orange-500" />
                Weighing & Hardware
              </div>

              <div className="flex items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-sm">
                <Smartphone className="h-4 w-4 text-orange-500" />
                Mobile Apps
              </div>

              <div className="flex items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-sm">
                <MonitorSmartphone className="h-4 w-4 text-orange-500" />
                Dashboards
              </div>
            </div>

            {/* Mobile / Tablet Logo Grid */}
            <div className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-8 lg:hidden">
              {MORE_CONNECTORS.slice(0, 8).map((connector, index) => (
                <motion.div
                  key={connector.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: EASE,
                  }}
                  className="flex aspect-square items-center justify-center rounded-2xl border border-cream-200 bg-white p-3 shadow-sm"
                >
                  <img
                    src={connector.img}
                    alt={connector.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Extra Desktop Logos */}
          <div className="absolute bottom-0 left-1/2 hidden w-full max-w-4xl -translate-x-1/2 justify-center gap-4 xl:flex">
            {MORE_CONNECTORS.slice(0, 8).map((connector, index) => (
              <motion.div
                key={connector.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: EASE,
                }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white/90 p-3 shadow-sm"
              >
                <img
                  src={connector.img}
                  alt={connector.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-6xl border-t border-cream-200" />

        {/* Production to Warehouse Flow */}
        <div className="mx-auto max-w-6xl py-14 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-500">
              One Connected Flow
            </p>

            <h3 className="mt-3 h-display text-[1.8rem] leading-[1.12] tracking-tight text-navy-950 md:text-[2.2rem]">
              From Production Floor to{' '}
              <span className="gradient-text-orange">
                Warehouse Ready.
              </span>
            </h3>
          </motion.div>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
            {FLOW_STEPS.map((step, index) => (
              <FlowStep
                key={step.num}
                step={step}
                index={index}
              />
            ))}
          </div>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: EASE,
            }}
            className="mx-auto mt-12 max-w-3xl rounded-2xl border border-orange-100 bg-orange-50/60 px-6 py-5 text-center"
          >
            <p className="text-base font-semibold leading-relaxed text-navy-950">
              “No manual stock entry. No mismatch between what was made and
              what&apos;s on the shelf.”
            </p>

            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              UPWON is already built to connect, when you&apos;re ready.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}