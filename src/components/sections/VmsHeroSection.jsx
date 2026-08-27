import HeroSlider from '../ui/HeroSlider';

/*
  Vendor Management System Hero Section
  Dedicated 5-slide hero for:
  /products/vendor-management
*/

const heroSlides = [
  {
    eyebrow: 'UPWON VENDOR MANAGEMENT',

    headline: 'Not Just L1 — Know Which Vendor Actually Delivers Quality.',

    subhead:
      'Go beyond comparing the lowest quote. Track vendor quality, delivery performance, and reliability to make smarter procurement decisions.',

    bg: '/images/vms_deliver_quality.webp',

    accent: '#E85A2A',

    cta: {
      label: 'Talk to a Procurement Specialist',
      to: '/contact',
    },

    secondaryCta: {
      label: 'Watch 2-Min Product Tour',
      to: '/products/vendor-management',
    },
  },

  {
    eyebrow: 'UPWON VENDOR PORTAL',

    headline: 'Don’t Chase Vendors — Let Them Manage Their Own Updates.',

    subhead:
      'Vendors can log in, submit quotes, respond to RFQs, and update their own status from one connected portal—reducing manual follow-ups for your procurement team.',

    bg: '/images/vms_one_dashboard.webp',

    accent: '#E85A2A',

    cta: {
      label: 'Talk to a Procurement Specialist',
      to: '/contact',
    },

    secondaryCta: {
      label: 'Watch 2-Min Product Tour',
      to: '/products/vendor-management',
    },
  },

  {
    eyebrow: 'UPWON VENDOR PERFORMANCE',

    headline: 'All Vendor Performance — On One Dashboard.',

    subhead:
      'Get a complete view of vendor activity, delivery performance, quality trends, and procurement insights without switching between spreadsheets and disconnected systems.',

    bg: '/images/vms_one_dashboard.webp',

    accent: '#E85A2A',

    cta: {
      label: 'Talk to a Procurement Specialist',
      to: '/contact',
    },

    secondaryCta: {
      label: 'Watch 2-Min Product Tour',
      to: '/products/vendor-management',
    },
  },

  {
    eyebrow: 'UPWON QUALITY SCORING',

    headline: 'Vendor Quality Scored Against Every Delivery, Automatically.',

    subhead:
      'Build a clearer picture of supplier performance by tracking delivery quality over time, helping your team identify which vendors consistently meet your standards.',

    bg: '/images/vms_quality_score.webp',

    accent: '#E85A2A',

    cta: {
      label: 'Talk to a Procurement Specialist',
      to: '/contact',
    },

    secondaryCta: {
      label: 'Watch 2-Min Product Tour',
      to: '/products/vendor-management',
    },
  },

  {
    eyebrow: 'UPWON RFQ MANAGEMENT',

    headline: 'Every RFQ, Every Quote, Every Vendor Response — In One Place.',

    subhead:
      'Stop searching through multiple email threads. Manage RFQs, vendor quotations, responses, and procurement communication from one connected workspace.',

    bg: '/images/vms_quote.webp',

    accent: '#E85A2A',

    cta: {
      label: 'Talk to a Procurement Specialist',
      to: '/contact',
    },

    secondaryCta: {
      label: 'Watch 2-Min Product Tour',
      to: '/products/vendor-management',
    },
  },
];

export default function VmsHeroSection() {
  return (
    <HeroSlider
      slides={heroSlides}
      variant="dark"
      intervalMs={5000}
      minHeight="min-h-[520px] sm:min-h-[560px] md:min-h-[620px]"
      topPad="pt-32 md:pt-40"
    />
  );
}