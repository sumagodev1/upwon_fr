import { m as motion } from 'framer-motion';
import {
    ArrowRight,
    Target,
    ShieldCheck,
    BarChart3,
    TrendingUp,
} from 'lucide-react';

import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

/* =========================================================
   PROCUREMENT FLOW
========================================================= */

const procurementSteps = [
    {
        id: 'rfq',
        title: 'RFQ Responses',
        image: '/images/vms_rfq_approch.webp',
        alt: 'RFQ Responses',
    },
    {
        id: 'rate-contract',
        title: 'Rate Contract',
        image: '/images/vms_rate_contract.webp',
        alt: 'Rate Contract',
    },
    {
        id: 'purchase-order',
        title: 'Purchase Order',
        image: '/images/vms_purchase_order.webp',
        alt: 'Purchase Order',
    },
    {
        id: 'goods-receipt',
        title: 'Goods Receipt and QC',
        image: '/images/vms_goods_reciept.webp',
        alt: 'Goods Receipt and QC',
    },
    {
        id: 'vendor-performance',
        title: 'Vendor Performance',
        image: '/images/vms_vendor performance.webp',
        alt: 'Vendor Performance',
    },
];

/* =========================================================
   BOTTOM OUTCOMES
========================================================= */

const outcomes = [
    {
        icon: Target,
        title: 'Right Price',
        description: 'Competitively negotiated rates',
    },
    {
        icon: ShieldCheck,
        title: 'Right Quality',
        description: 'QC outcomes linked to every delivery',
    },
    {
        icon: BarChart3,
        title: 'Full Visibility',
        description: 'End-to-end transparency in one system',
    },
    {
        icon: TrendingUp,
        title: 'Better Decisions',
        description: 'Data-driven vendor performance score',
    },
];

/* =========================================================
   FLOW NODE
========================================================= */

function ProcurementNode({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: EASE,
            }}
            className="relative z-10 flex shrink-0 flex-col items-center"
        >
            {/* Circular image - NO OUTER BORDER */}
            <div
                className="
                    group relative flex
                    h-[180px] w-[180px]
                    shrink-0 items-center justify-center
                    overflow-hidden rounded-full
                    bg-white
                    transition-all duration-500

                    sm:h-[195px] sm:w-[195px]
                    lg:h-[210px] lg:w-[210px]
                    xl:h-[230px] xl:w-[230px]
                "
            >
                <img
                    src={item.image}
                    alt={item.alt}
                    className="
                        absolute inset-0
                        h-full w-full
                        object-cover object-center
                        scale-[1.08]
                        transition-transform duration-700
                        group-hover:scale-[1.14]
                    "
                />

                {/* Very subtle image overlay */}
                <div
                    className="
                        pointer-events-none absolute inset-0 z-[2]
                        rounded-full
                        bg-[radial-gradient(circle_at_center,transparent_65%,rgba(15,23,42,0.05)_100%)]
                    "
                />
            </div>
        </motion.div>
    );
}

/* =========================================================
   ARROW BETWEEN NODES
========================================================= */

function FlowArrow({ index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.45,
                delay: 0.25 + index * 0.1,
                ease: EASE,
            }}
            className="
                relative z-20 hidden
                shrink-0 items-center justify-center
                xl:flex
            "
        >
            <div className="h-px w-[18px] bg-gradient-to-r from-[#4c8fde]/30 to-[#3b82f6]" />

            <ArrowRight
                className="-ml-1 h-6 w-6 shrink-0 text-[#3b82f6]"
                strokeWidth={1.8}
            />
        </motion.div>
    );
}

/* =========================================================
   OUTCOME CARD
========================================================= */

function OutcomeCard({ item, index }) {
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: EASE,
            }}
            className={`
                flex items-center gap-4 px-5 py-5
                md:px-7
                ${index !== outcomes.length - 1
                    ? 'border-b border-slate-200 lg:border-b-0 lg:border-r'
                    : ''
                }
            `}
        >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                <Icon
                    className="h-10 w-10 text-[#2f80ed]"
                    strokeWidth={1.65}
                />
            </div>

            <div>
                <h4 className="text-[15px] font-bold text-[#0f172a]">
                    {item.title}
                </h4>

                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function VmsApproch() {
    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-28">

            {/* =====================================================
                LIGHT BACKGROUND
            ===================================================== */}
            <div className="pointer-events-none absolute inset-0">

                {/* Soft blue background glow */}
                <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-100/30 blur-[140px]" />

                <div className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-blue-100/25 blur-[120px]" />

                <div className="absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-blue-100/25 blur-[120px]" />

                {/* Light grid */}
                <div
                    className="
                        absolute inset-0 opacity-[0.45]
                        [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)]
                        [background-size:80px_80px]
                    "
                />
            </div>

            <Container className="relative z-10">

                {/* =====================================================
                    HEADER
                ===================================================== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.65,
                        ease: EASE,
                    }}
                    className="mx-auto max-w-5xl text-center"
                >
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />

                        <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#ea6b2d]">
                            UPWON&apos;S APPROACH
                        </span>
                    </div>

                    <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36.8px]">
                        Making Procurement{' '}
                        <span className="gradient-text-orange">
                            Seamless.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-4xl text-[16px] leading-relaxed text-[#344561] md:text-[18px]">
                        Vendor rate contracts, RFQ responses and QC outcomes live
                        in one system, so a vendor&apos;s{' '}price and their delivered{' '}quality
                        are always seen together.
                    </p>
                </motion.div>

                {/* =====================================================
                    PROCUREMENT FLOW
                ===================================================== */}
                <div className="relative mt-14 md:mt-16">

                    {/* Desktop Flow */}
                    <div
                        className="
                            mx-auto hidden
                            max-w-[1320px]
                            items-center justify-center
                            xl:flex
                        "
                    >
                        {procurementSteps.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-center"
                            >
                                <ProcurementNode
                                    item={item}
                                    index={index}
                                />

                                {index < procurementSteps.length - 1 && (
                                    <FlowArrow index={index} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tablet / Mobile Flow */}
                    <div className="grid gap-8 sm:grid-cols-2 xl:hidden">
                        {procurementSteps.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex flex-col items-center"
                            >
                                <ProcurementNode
                                    item={item}
                                    index={index}
                                />

                                {index < procurementSteps.length - 1 && (
                                    <div className="mt-4 flex justify-center sm:hidden">
                                        <ArrowRight
                                            className="h-7 w-7 rotate-90 text-[#3b82f6]"
                                            strokeWidth={1.7}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* =================================================
                        CONNECTED PROCUREMENT LOOP - DESKTOP
                    ================================================= */}
                    <div
                        className="
                            relative mx-auto mt-5 hidden
                            max-w-[1250px]
                            xl:block
                        "
                    >
                        {/* Left vertical return */}
                        <div
                            className="
                                absolute left-[3.5%] top-0
                                h-16
                                border-l-2 border-dashed
                                border-[#60a5fa]
                            "
                        />

                        {/* Right vertical return */}
                        <div
                            className="
                                absolute right-[3.5%] top-0
                                h-16
                                border-r-2 border-dashed
                                border-[#60a5fa]
                            "
                        />

                        {/* Bottom dashed feedback line */}
                        <div
                            className="
                                mx-[3.5%] mt-16 h-[2px]
                                border-t-2 border-dashed
                                border-[#60a5fa]
                            "
                        />

                        {/* Return arrow */}
                        <div className="absolute left-[2.4%] top-[-7px]">
                            <ArrowRight
                                className="-rotate-90 text-[#3b82f6]"
                                strokeWidth={1.8}
                            />
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    OUTCOMES
                ===================================================== */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.65,
                        delay: 0.15,
                        ease: EASE,
                    }}
                    className="
                        mt-12 overflow-hidden rounded-2xl
                        border border-slate-200
                        bg-white
                        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
                    "
                >
                    <div className="grid lg:grid-cols-4">
                        {outcomes.map((item, index) => (
                            <OutcomeCard
                                key={item.title}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </motion.div>

            </Container>
        </section>
    );
}