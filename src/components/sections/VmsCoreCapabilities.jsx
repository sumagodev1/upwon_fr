import { useCallback, useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import {
    BadgeCheck,
    Target,
    ArrowRight,
} from 'lucide-react';

import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const capabilities = [
    {
        number: '01',
        title: 'RFQ Management & Comparative Analysis',
        desc: 'Compare supplier quotes side by side and choose the best value with complete transparency.',
        image: '/images/vms_rfq_management.webp',
        imageAlt: 'RFQ Management and Comparative Analysis',
    },
    {
        number: '02',
        title: 'Rate Contracts',
        desc: 'Negotiate, finalize and lock in terms. Track contract validity and rate revisions over time.',
        image: '/images/vms_rate_contracts.webp',
        imageAlt: 'Rate Contracts',
    },
    {
        number: '03',
        title: 'Individual Vendor Login',
        desc: 'Vendors manage their profile, documents, POs and QC reports from their dedicated portal.',
        image: '/images/vms_vendor_login.webp',
        imageAlt: 'Individual Vendor Login',
    },
    {
        number: '04',
        title: 'PO Status Tracking',
        desc: 'Real-time visibility for both buyers and vendors. No more status-check phone calls.',
        image: '/images/vms_status_logging.webp',
        imageAlt: 'PO Status Tracking',
    },
    {
        number: '05',
        title: 'QC Process',
        desc: 'Quality inspections linked directly to orders and vendors with digital records and outcomes.',
        image: '/images/vms_qc_process.webp',
        imageAlt: 'QC Process',
    },
    {
        number: '06',
        title: 'Vendor Performance Matrix',
        desc: 'Vendors are scored across key metrics—quality, delivery, responsiveness and more.',
        image: '/images/vms_performance_matrix.webp',
        imageAlt: 'Vendor Performance Matrix',
    },
    {
        number: '07',
        title: 'Payment Management',
        desc: 'Vendors see their own payment status and history without chasing your team.',
        image: '/images/vms_payment_management.webp',
        imageAlt: 'Payment Management',
    },
];




function CapabilityItem({ item, index, activeIndex, onActive }) {
    const ref = useRef(null);
    const isActive = activeIndex === index;
    const isLast = index === capabilities.length - 1;

    useEffect(() => {
        const element = ref.current;

        if (!element) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onActive(index);
                    }
                });
            },
            {
                // Same center-area scroll detection behavior
                rootMargin: '-45% 0px -45% 0px',
                threshold: 0,
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [index, onActive]);

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: true,
                margin: '-70px',
            }}
            transition={{
                duration: 0.55,
                delay: index * 0.05,
                ease: EASE,
            }}
            className="relative grid grid-cols-1 gap-6 pb-7 md:grid-cols-[64px_minmax(210px,0.85fr)_minmax(0,1.55fr)] md:gap-8 lg:gap-10"
        >
            {/* TIMELINE NUMBER + LINE */}
            <div className="relative hidden justify-center md:flex">
                {!isLast && (
                    <div className="absolute left-1/2 top-[54px] h-[calc(100%+28px)] w-px -translate-x-1/2 bg-gradient-to-b from-blue-300 via-navy-200 to-navy-100" />
                )}

                <div
                    className={`relative z-10 flex h-[54px] w-[54px] items-center justify-center rounded-full border text-[18px] font-semibold transition-all duration-300 ${
                        isActive
                            ? 'border-blue-500 bg-blue-600 text-white shadow-[0_0_0_5px_rgba(37,99,235,0.08),0_8px_25px_rgba(37,99,235,0.2)]'
                            : 'border-navy-200 bg-white text-navy-700 shadow-sm'
                    }`}
                >
                    {item.number}
                </div>
            </div>


            {/* TEXT CONTENT */}
            <div className="relative pt-1 md:pt-3">

                {/* Mobile Number */}
                <div className="mb-4 flex items-center gap-3 md:hidden">
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full border text-[15px] font-semibold transition-all duration-300 ${
                            isActive
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-navy-200 bg-white text-navy-700'
                        }`}
                    >
                        {item.number}
                    </div>

                    <div className="h-px flex-1 bg-navy-200" />
                </div>


                <h3 className="max-w-[280px] text-[18px] font-bold leading-[1.4] text-navy-950 lg:text-[19px]">
                    {item.title}
                </h3>

                <div
                    className={`mt-4 h-[2px] w-9 rounded-full transition-colors duration-300 ${
                        isActive ? 'bg-blue-600' : 'bg-orange-500'
                    }`}
                />

                <p className="mt-4 max-w-[280px] text-[14px] leading-[1.7] text-navy-600">
                    {item.desc}
                </p>
            </div>


            {/* IMAGE CARD */}
            <div className="group relative overflow-hidden rounded-[16px] border border-navy-200/80 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]">

                {/* Soft blue glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-100/50 blur-3xl" />

                <div className="relative overflow-hidden rounded-[10px] bg-navy-50">
                    <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading={index < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="block h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                </div>
            </div>
        </motion.article>
    );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function VmsCoreCapabilities() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleActive = useCallback((index) => {
        setActiveIndex((currentIndex) => {
            if (currentIndex === index) return currentIndex;
            return index;
        });
    }, []);

    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-28">

            {/* BACKGROUND DECORATIONS */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                {/* Left orange glow */}
                <div className="absolute -left-40 top-32 h-[450px] w-[450px] rounded-full bg-orange-50/70 blur-[120px]" />

                {/* Right blue glow */}
                <div className="absolute -right-48 top-[20%] h-[550px] w-[550px] rounded-full bg-blue-50/70 blur-[150px]" />

                {/* Bottom glow */}
                <div className="absolute bottom-[-250px] left-[25%] h-[500px] w-[600px] rounded-full bg-sky-50/80 blur-[150px]" />
            </div>


            <Container className="relative">
                <div className="grid gap-14 xl:grid-cols-[410px_minmax(0,1fr)] xl:gap-16">

                    {/* =================================================
                        LEFT STICKY CONTENT
                    ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.65,
                            ease: EASE,
                        }}
                        className="xl:sticky xl:top-28 xl:h-fit"
                    >
                        <Eyebrow icon={BadgeCheck}>
                            CORE CAPABILITIES
                        </Eyebrow>

                        <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36.8px]">
                            From First Quote to Final Payment-

                            <span className="gradient-text-orange">
                                In One System.
                            </span>
                        </h2>


                        {/* Supporting Text */}
                        <div className="mt-7 space-y-1 text-[16px] leading-[1.65] text-navy-700 md:text-[17px]">
                            <p>Every stage connected.</p>
                            <p>Every vendor interaction visible.</p>
                            <p>Every decision backed by data.</p>
                        </div>
                    </motion.div>


                    {/* =================================================
                        RIGHT TIMELINE
                    ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.65,
                            delay: 0.1,
                            ease: EASE,
                        }}
                        className="relative"
                    >
                        {/* Outer Timeline Frame */}
                        <div className="relative overflow-hidden rounded-[22px] border border-navy-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-7 lg:p-8">

                            {/* Top Highlight */}
                            <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />

                            {/* Left border */}
                            <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-blue-400/60 via-navy-100 to-transparent" />

                            <div className="relative">
                                {capabilities.map((item, index) => (
                                    <CapabilityItem
                                        key={item.number}
                                        item={item}
                                        index={index}
                                        activeIndex={activeIndex}
                                        onActive={handleActive}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}