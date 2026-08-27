import { m as motion } from 'framer-motion';
import {
  TrendingUp,
  FlaskConical,
  Factory,
  Package,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VENDOR_TYPES = {
  commodity: {
    number: '01',
    title: 'Raw Material & Commodity Vendors',
    desc: 'Track commodity price volatility, supplier trends, and purchasing visibility before changing costs impact production.',
    img: '/images/vms_commodity.webp',
    icon: TrendingUp,
    reality: 'Price volatility alerts and hedging visibility',
  },

  additive: {
    number: '02',
    title: 'Ingredient & Additive Vendors',
    desc: 'Keep ingredient quality, compliance documents, approvals, and supplier performance visible in one connected workflow.',
    img: '/images/vms_addective.webp',
    icon: FlaskConical,
    reality: 'Quality, compliance and approval control',
  },

  manufacturing: {
    number: '03',
    title: 'Contract Manufacturing & Co-Packers',
    desc: 'Coordinate production partners, specifications, delivery timelines, and operational performance with greater control.',
    img: '/images/vms_manfacturing.webp',
    icon: Factory,
    reality: 'Production coordination and partner performance',
  },

  packaging: {
    number: '04',
    title: 'Packaging Suppliers',
    desc: 'Manage packaging specifications, quality requirements, supplier commitments, and delivery expectations in one place.',
    img: '/images/vms_packaging.webp',
    icon: Package,
    reality: 'Specifications, quality and supply reliability',
  },
};



function FeaturedVendorCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative min-h-[560px] overflow-hidden rounded-[30px] bg-[#142044] shadow-[0_25px_70px_rgba(15,25,55,0.18)] lg:min-h-[650px]"
    >

      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />


      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1738]/95 via-[#10204a]/82 via-[38%] to-[#10204a]/15" />

      {/* Top subtle gradient */}
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#0a1532]/25 to-transparent" />

      {/* Bottom subtle gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#0a1532]/35 to-transparent" />


      <div className="relative z-10 flex min-h-[560px] w-full flex-col justify-center px-7 py-10 sm:px-10 lg:min-h-[650px] lg:w-[40%] lg:px-14 xl:px-16">

        {/* Title */}
        <h3 className="mt-6 max-w-[350px] text-[25px] font-bold leading-[1.18] tracking-tight text-white lg:text-[29px]">
          {item.title}
        </h3>

        {/* White line */}
        <div className="mt-6 h-[3px] w-14 rounded-full bg-white/90" />

        {/* Description */}
        <p className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-white/85 sm:text-[16px]">
          {item.desc}
        </p>

        {/* Procurement Reality */}
        <div className="mt-8 flex items-start gap-4">
          <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-white" />

          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
              Procurement Reality
            </span>

            <p className="mt-2 text-[14px] font-semibold leading-relaxed text-white">
              {item.reality}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}


function VendorCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: EASE,
      }}
      className="group relative min-h-[500px] overflow-hidden rounded-[26px] bg-[#142044] shadow-[0_20px_55px_rgba(20,28,50,0.16)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(20,28,50,0.24)]"
    >
      {/* Full Background Image */}
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />

      {/* Main dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1738]/82 via-[#0d1b3f]/50 to-[#091530]/88" />

      {/* Left readability gradient */}
      <div className="absolute inset-y-0 left-0 w-[75%] bg-gradient-to-r from-[#0b1738]/35 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[500px] flex-col px-7 py-8 sm:px-8">

        {/* Header */}
        <div className="flex items-center justify-between">
        </div>

        {/* Fixed Title Area - SAME LEVEL */}
        <div className="mt-6 min-h-[68px]">
          <h3 className="max-w-[350px] text-[25px] font-bold leading-[1.18] tracking-tight text-white lg:text-[29px]">
            {item.title}
          </h3>
        </div>

        {/* Line */}
        <div className="mt-5 h-[2px] w-12 rounded-full bg-white/90" />

        {/* Fixed Description Area - SAME LEVEL */}
        <div className="mt-5 min-h-[190px]">
          <p className="max-w-[130px] text-[14px] leading-[1.7] text-white/85">
            {item.desc}
          </p>
        </div>

        {/* Bottom Reality */}
        <div className="mt-auto pt-8">
          <div className="flex items-start gap-3">
            <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-white" />

            <div>
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-white/55">
                Procurement Reality
              </span>

              <p className="mt-2 text-[11px] font-semibold leading-relaxed text-white">
                {item.reality}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}



export default function VmsRecognition() {
  const featuredVendor = VENDOR_TYPES.commodity;

  const bottomVendors = [
    VENDOR_TYPES.additive,
    VENDOR_TYPES.manufacturing,
    VENDOR_TYPES.packaging,
  ];

  return (
    <section className="relative overflow-hidden bg-[#f5f6f8] py-16 sm:py-20 lg:py-24">


      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[180px] h-[420px] w-[420px] rounded-full bg-[#dce3f3]/50 blur-[130px]" />

        <div className="absolute bottom-[-220px] right-[-180px] h-[500px] w-[500px] rounded-full bg-[#e3e8f5]/60 blur-[140px]" />
      </div>

      <Container className="relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.6,
            ease: EASE,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <Eyebrow className="justify-center">
            BUILT FOR EVERY VENDOR TYPE
          </Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36.8px]">
            Built for Businesses Handling{' '}
            <span className="gradient-text-orange">
              Variety of Vendors
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base lg:text-[17px]">
            Different vendor categories come with different procurement
            realities, quality requirements, compliance needs, and performance
            expectations. UpWon VMS helps manage them all with greater
            visibility and control.
          </p>
        </motion.div>

  
        <div className="mx-auto mt-12 max-w-[1380px]">
          <FeaturedVendorCard item={featuredVendor} />
        </div>

    
        <div className="mx-auto mt-5 grid max-w-[1380px] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bottomVendors.map((item, index) => (
            <VendorCard
              key={item.number}
              item={item}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}