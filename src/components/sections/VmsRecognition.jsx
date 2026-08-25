import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  VMS "Recognition & Trust" — highlights the four core areas where vendor
  operations need structure: centralized vendor records, accountable workflows,
  compliance visibility and operational continuity.
*/

const EASE = [0.22, 1, 0.3, 1];

const VMS_TYPES = [
  {
    title: 'One Vendor Record',
    desc: 'All vendor information, contacts, documents and history in one connected record.',
    img: '/images/vms_one_vendor_record.png',
  },
  {
    title: 'Workflow Accountability',
    desc: 'Define workflows, clear ownership and real-time status for every approval and update.',
    img: '/images/vms_workflow_accountability.png',
  },
  {
    title: 'Compliance Visibility',
    desc: 'Track document validity, renewals and compliance requirements with intelligent alerts.',
    img: '/images/vms_compliance_visibility.png',
  },
  {
    title: 'Operational Continuity',
    desc: 'Reduce manual follow-ups and spreadsheet dependency across vendor operations.',
    img: '/images/vms_operational_continuity.png',
  },
];

const TRUST_ITEMS = [
  {
    title: 'Enterprise Grade',
    desc: 'Secure, scalable and built for complex operations.',
    img: '/images/vms_enterprise.png',
  },
  {
    title: 'Data Security',
    desc: 'Role-based access and compliance by design.',
    img: '/images/vms_data_security.png',
  },
  {
    title: 'Cloud Ready',
    desc: 'Accessible anytime, anywhere with high availability.',
    img: '/images/vms_cloud_ready.png',
  },
  {
    title: 'Customer Confidence',
    desc: 'Designed for long-term value and operational control.',
    img: '/images/vms_customer_confidence.png',
  },
];

function TypeCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: EASE,
      }}
      className="group flex w-full flex-col items-center rounded-2xl border border-cream-300 bg-white/85 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
    >
      {/* VMS Feature Image */}
      <div className="relative flex h-36 w-full items-center justify-center overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="h-32 w-full object-contain transition-transform duration-500 group-hover:scale-105 md:h-36"
        />
      </div>

      {/* Number */}
      <span className="mt-4 text-sm font-bold tracking-[0.14em] text-orange-500">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title */}
      <h3 className="mt-2 text-[1.08rem] font-bold leading-tight tracking-tight text-navy-950">
        {item.title}
      </h3>



      {/* Description */}
      <p className="mt-3 text-[14px] leading-snug text-navy-600">
        {item.desc}
      </p>
    </motion.div>
  );
}

function TrustItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: EASE,
      }}
      className="flex flex-1 items-start gap-4"
    >
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="h-12 w-12 shrink-0 object-contain"
      />

      <div>
        <h4 className="text-[15px] font-bold text-navy-950">
          {item.title}
        </h4>

        <p className="mt-1 text-[13px] leading-relaxed text-navy-600">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function VmsRecognition() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
     

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">
            Recognition & Trust
          </Eyebrow>

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Built for Vendor Operations That{' '}
            <span className="gradient-text-orange">
              Can’t Run on Spreadsheets
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            UpWon VMS brings structure, accountability and visibility to every
            step of your vendor lifecycle — from onboarding to ongoing
            performance.
          </p>
        </motion.div>

        {/* Four Recognition Cards */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {VMS_TYPES.map((item, index) => (
            <TypeCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-8 rounded-2xl border border-cream-300 bg-white/85 p-6 shadow-sm backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Trust Heading */}
            <div className="flex shrink-0 items-center gap-4 border-b border-cream-300 pb-6 lg:w-[28%] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <img
                src="/images/vms_verified.png"
                alt="Verified"
                loading="lazy"
                decoding="async"
                className="h-16 w-16 object-contain"
              />

              <h3 className="text-xl font-bold leading-tight text-navy-950">
                Trusted by teams
                <br />
                across industries
              </h3>
            </div>

            {/* Trust Points */}
            <div className="grid flex-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" >
              {TRUST_ITEMS.map((item, index) => (
                <TrustItem
                
                  key={item.title}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>

       
      </Container>
    </section>
  );
}