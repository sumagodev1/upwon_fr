import React from 'react';
import { m as motion } from 'framer-motion';
import {
  Mail,
  Star,
  CreditCard,
  FileCheck,
  ChevronRight,
} from 'lucide-react';

import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const PAIN_POINTS = [
  {
    id: 'rfq',
    number: '01',
    title: 'RFQs Over Email & WhatsApp',
    description:
      'RFQs, quotes, follow-ups, and vendor responses scattered across inboxes and chat threads.',
    icon: Mail,
    image: '/images/vms_rfq.webp',
  },
  {
    id: 'quality',
    number: '02',
    title: 'Vendor Quality Tracked in Someone’s Head',
    description:
      'Vendor reliability is judged informally instead of being consistently scored against every delivery.',
    icon: Star,
    image: '/images/vms_tracked.webp',
  },
  {
    id: 'payment',
    number: '03',
    title: 'Payment Status Requires a Phone Call',
    description:
      'Vendors repeatedly call your team to ask about payment status, purchase orders, and pending updates.',
    icon: CreditCard,
    image: '/images/vms_phone_call.webp',
  },
  {
    id: 'compliance',
    number: '04',
    title: 'KYC & Compliance Documents Everywhere',
    description:
      'Certificates, KYC records, approvals, and compliance documents are scattered across folders.',
    icon: FileCheck,
    image: '/images/vms_document_everywhere.webp',
  },
];

export default function VmsOperationalReality() {
  const [activeId, setActiveId] = React.useState('rfq');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = PAIN_POINTS.findIndex(
          (item) => item.id === currentId
        );

        const nextIndex =
          currentIndex === PAIN_POINTS.length - 1
            ? 0
            : currentIndex + 1;

        return PAIN_POINTS[nextIndex].id;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const activeItem =
    PAIN_POINTS.find((item) => item.id === activeId) || PAIN_POINTS[0];

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
          className="max-w-[860px]"
        >
          <Eyebrow>
            OPERATIONAL REALITY
          </Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36.8px]">
            Sound Familiar?{' '}
            <span className="gradient-text-orange">
              Your Procurement Reality
            </span>{' '}
            Is Running Across Too Many Places.
          </h2>

          <p className="mt-5 max-w-[800px] text-[15px] leading-[1.55] text-[#344561] sm:text-base lg:text-[17px]">
            RFQs and quotes scattered across email threads. Vendor reliability
            judged from memory instead of measured performance. Payment updates
            answered through phone calls. KYC and compliance documents buried
            across folders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: EASE,
          }}
          className="mx-auto mt-12 grid max-w-[1240px] grid-cols-1 overflow-hidden lg:h-[608px] lg:grid-cols-[670px_1fr]"
        >
          {/* Left Image */}
          <div className="relative overflow-hidden bg-white lg:h-full">
            <motion.img
              key={activeItem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={activeItem.image}
              alt={activeItem.title}
              className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-cover lg:object-center"
            />
          </div>

          {/* Right 4 Cards */}
          <div className="grid h-full grid-rows-4 bg-white">
            {PAIN_POINTS.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`group relative flex min-h-[152px] items-start border-b border-[#dce1ea] px-7 py-6 text-left transition-all duration-300 sm:px-8 lg:min-h-0 lg:px-7 ${
                    isActive
                      ? 'bg-[#ffffff]'
                      : 'bg-[#ffffff] hover:bg-[#fafbfe]'
                  } ${item.number === '04' ? 'border-b-0' : ''}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 h-[3px] w-full bg-[#31559b]" />
                  )}

                  <div
                    className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[13px] transition-all duration-300 ${
                      isActive
                        ? 'bg-[#31559b] text-white'
                        : 'bg-[#eef1f5] text-[#53657c]'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.7} />
                  </div>

                  <div className="ml-5 flex-1 pr-5">
                    <span className="block text-[9px] font-bold tracking-[0.2em] text-[#6e7e95]">
                      {item.number}
                    </span>

                    <h3 className="mt-2 text-[18px] font-bold leading-[1.3] tracking-tight text-[#1e2e49] sm:text-[19px]">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-[490px] text-[13px] leading-[1.65] text-[#607087] sm:text-[14px]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-1 flex shrink-0 items-center text-[#7f8da0] transition-all duration-300 group-hover:translate-x-1">
                    <ChevronRight size={17} strokeWidth={1.5} />
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}