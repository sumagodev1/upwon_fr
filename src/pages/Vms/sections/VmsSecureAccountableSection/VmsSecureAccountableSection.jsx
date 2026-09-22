import { m as motion } from 'framer-motion';
import {
    LockKeyhole,
    UserRoundCog,
    ShieldCheck,
    BarChart3,
    FileCheck2,
} from 'lucide-react';

import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const SECURITY_IMAGE = '/images/vms_secure_sec.webp';

const SECURITY_POINTS = [
    {
        icon: LockKeyhole,
        title: 'Encrypted vendor data',
        description:
            'Data encrypted in transit and at rest using modern cryptographic standards.',
        image: '/images/encrypted_vendor_data.webp',
    },
    {
        icon: UserRoundCog,
        title: 'Role-based access control',
        description:
            'Granular permissions ensure users only access data relevant to their role.',
        image: '/images/role_base_access_control.webp',
    },
    {
        icon: ShieldCheck,
        title: 'ISO-aligned',
        description:
            'Controls and practices aligned with globally recognized ISO principles.',
        image: '/images/iso_aligned.webp',
    },
    {
        icon: BarChart3,
        title: 'CMM Level 3 process rigour',
        description:
            'Defined, institutionalized processes monitored for consistency and quality.',
        image: '/images/cmm_level.webp',
    },
];

export default function VmsSecureAccountableSection() {
    return (
        <section className="relative w-full overflow-hidden bg-[#fdf9f4] py-16 sm:py-20 lg:py-24">

            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-48 top-20 h-[460px] w-[460px] rounded-full bg-[#fff0e8]/80 blur-[135px]" />

                <div className="absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-white/80 blur-[150px]" />

                <div className="absolute bottom-[-260px] left-[30%] h-[420px] w-[620px] rounded-full bg-[#fff5ed]/80 blur-[150px]" />
            </div>

            {/* Main Security Illustration */}
            <img
                src={SECURITY_IMAGE}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[32vw] max-w-[500px] object-contain object-top lg:block"
            />

            <Container className="relative z-10">

                {/* =========================================================
                    HEADING
                ========================================================== */}
                <div className="max-w-[760px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                            once: true,
                            margin: '-60px',
                        }}
                        transition={{
                            duration: 0.65,
                            ease: EASE,
                        }}
                        className="max-w-[760px]"
                    >
                        <Eyebrow className="!justify-start">
                            SECURE, COMPLIANT, ACCOUNTABLE
                        </Eyebrow>

                        <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36.8px]">
                            Vendor Data Protected.
                            <br />
                            Rate Contracts Confidential.
                            <br />
                            <span className="gradient-text-orange">
                                Access Controlled by Role.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-[720px] text-[15px] leading-[1.55] text-[#344561] sm:text-base lg:text-[17px]">
                            Sensitive vendor, pricing, and rate-contract information is
                            protected through controlled access, secure handling, and
                            process-led governance - not generic reassurance.
                        </p>
                    </motion.div>
                </div>

                {/* =========================================================
                    SECURITY CARDS
                ========================================================== */}
                <div className="relative z-20 mt-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {SECURITY_POINTS.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.1,
                                }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.08,
                                    ease: EASE,
                                }}
                                whileHover={{
                                    y: -5,
                                }}
                                className="group relative overflow-hidden rounded-[16px] border border-[#eadfd4] bg-white shadow-[0_10px_30px_rgba(38,27,18,0.05)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(38,27,18,0.09)]"
                            >

                                {/* Orange Top Hover Line */}
                                <div className="absolute left-5 right-5 top-0 z-20 h-[2px] origin-left scale-x-0 bg-[#f26722] transition-transform duration-300 group-hover:scale-x-100" />

                                {/* =================================================
                                    IMAGE
                                ================================================== */}
                                <div className="relative w-full overflow-hidden px-3 pt-3 sm:px-4 sm:pt-4">

                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px]">

                                        <img
                                            src={item.image}
                                            alt=""
                                            aria-hidden="true"
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />

                                    </div>
                                </div>

                                {/* =================================================
                                    CARD CONTENT
                                ================================================== */}
                                <div className="px-4 pb-5 pt-4 sm:px-5 sm:pb-6">

                                    {/* Small Icon */}
                                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#fff1e8] text-[#f26722]">
                                        <Icon
                                            className="h-[18px] w-[18px]"
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="h-display text-[17px] font-bold leading-[1.2] text-navy-950 sm:text-[18px]">
                                        {item.title}
                                    </h3>

                                    {/* Orange Divider */}
                                    <div className="mt-3 h-[2px] w-[55px] bg-[#f26722] transition-all duration-300 group-hover:w-[85px]" />

                                    {/* Description */}
                                    <p className="mt-3 text-[13px] leading-[1.55] text-[#344561] sm:text-[14px]">
                                        {item.description}
                                    </p>

                                </div>
                            </motion.div>
                        );
                    })}

                </div>

                {/* =========================================================
                    KYC & COMPLIANCE CARD
                ========================================================== */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        margin: '-60px',
                    }}
                    transition={{
                        duration: 0.65,
                        delay: 0.15,
                        ease: EASE,
                    }}
                    className="relative z-20 mt-6 overflow-hidden rounded-[16px] border border-[#eadfd4] bg-white/90 shadow-[0_8px_35px_rgba(38,27,18,0.04)] backdrop-blur-sm md:mt-8"
                >

                    {/* Dot Pattern */}
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-[300px] opacity-50">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle, rgba(242,103,34,0.6) 1.2px, transparent 1.2px)',
                                backgroundSize: '18px 18px',
                                maskImage:
                                    'linear-gradient(to left, black, transparent)',
                                WebkitMaskImage:
                                    'linear-gradient(to left, black, transparent)',
                            }}
                        />
                    </div>

                    <div className="relative flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:gap-7 md:px-8 md:py-6">

                        {/* Icon */}
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white text-[#f26722]">
                            <FileCheck2
                                className="h-12 w-12"
                                strokeWidth={1.5}
                            />
                        </div>

                        {/* Divider */}
                        <div className="hidden h-20 w-px bg-[#f26722] md:block" />

                        {/* Content */}
                        <div className="relative z-10">

                            <h3 className="h-display text-[19px] font-bold uppercase tracking-[0.01em] text-[#e85f1d] sm:text-[21px] md:text-[23px]">
                                KYC &amp; COMPLIANCE DOCUMENT HANDLING
                            </h3>

                            <p className="mt-2 max-w-[900px] text-[14px] leading-[1.6] text-navy-600 sm:text-[15px] md:text-base">
                                KYC records and compliance documents are handled through
                                controlled submission, restricted visibility, and auditable
                                access throughout the review process.
                            </p>

                        </div>
                    </div>
                </motion.div>

            </Container>
        </section>
    );
}