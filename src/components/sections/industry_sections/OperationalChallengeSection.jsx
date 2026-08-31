import { m as motion, useReducedMotion } from 'framer-motion';
import {
    Warehouse,
    ClipboardCheck,
    Network,
    CalendarClock,
    TrendingUp,
    ArrowLeftRight,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const CHALLENGES = [
    {
        number: '01',
        title: 'Inventory Visibility Across Locations',
        description:
            'Maintain better visibility of stock across warehouses, distribution centers, branches, and other storage locations.',
        Icon: Warehouse,
        color: '#12234a',
        tint: '#eef1f7',
    },
    {
        number: '02',
        title: 'Fast & Accurate Order Fulfillment',
        description:
            'Manage high volumes of sales orders while improving coordination between order processing, picking, dispatch, and delivery teams.',
        Icon: ClipboardCheck,
        color: '#f26522',
        tint: '#fff1e8',
    },
    {
        number: '03',
        title: 'Distributor & Channel Coordination',
        description:
            'Keep distributor, retailer, and channel operations better connected with clearer visibility into orders, stock movement, and transactions.',
        Icon: Network,
        color: '#f0ad1c',
        tint: '#fff8e6',
    },
    {
        number: '04',
        title: 'Expiry & Batch Management',
        description:
            'Track products by batch and maintain better visibility into expiry-sensitive inventory to support smarter stock movement and reduce avoidable losses.',
        Icon: CalendarClock,
        color: '#7c3aed',
        tint: '#f4efff',
    },
    {
        number: '05',
        title: 'Demand & Replenishment Planning',
        description:
            'Use sales trends and inventory insights to make better replenishment decisions and reduce the risk of stockouts or excess inventory.',
        Icon: TrendingUp,
        color: '#3fa34d',
        tint: '#eef8ef',
    },
    {
        number: '06',
        title: 'Warehouse & Stock Movement Control',
        description:
            'Track inward, outward, transfer, and return movements with greater accuracy across the distribution network.',
        Icon: ArrowLeftRight,
        color: '#2563eb',
        tint: '#eef3fe',
    },
];

// Bookmark-style tab that overlaps the top-left corner of each card
const TAB_SHAPE = 'polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)';

const VIEWPORT = { once: true, amount: 0.2 };

export default function OperationalChallengeSection() {
    const reduceMotion = useReducedMotion();

    // Distance helper — collapses every offset to 0 when the user prefers reduced motion
    const d = (value) => (reduceMotion ? 0 : value);
    const stagger = (value) => (reduceMotion ? 0 : value);

    /* ================= VARIANTS ================= */

    const leftGroup = {
        hidden: {},
        visible: {
            transition: { staggerChildren: stagger(0.12), delayChildren: 0.05 },
        },
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
    };

    const ruleGrow = {
        hidden: { opacity: 0, width: reduceMotion ? '3rem' : '0rem' },
        visible: {
            opacity: 1,
            width: '3rem',
            transition: { duration: 0.65, ease: EASE },
        },
    };

    const fadeFromLeft = {
        hidden: { opacity: 0, x: d(-20) },
        visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: d(14) },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
    };

    const cardsGroup = {
        hidden: {},
        visible: {
            transition: { staggerChildren: stagger(0.14), delayChildren: 0.05 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: d(35), scale: reduceMotion ? 1 : 0.97 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: EASE,
                delayChildren: 0.18,
                staggerChildren: stagger(0.08),
            },
        },
        hover: { y: d(-7), transition: { duration: 0.28, ease: EASE } },
    };

    const ribbonVariants = {
        hidden: { opacity: 0, y: d(-15) },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: reduceMotion
                ? { duration: 0.3, ease: EASE }
                : { type: 'spring', stiffness: 240, damping: 20, mass: 0.6 },
        },
        hover: {
            scale: reduceMotion ? 1 : 1.05,
            transition: { duration: 0.28, ease: EASE },
        },
    };

    return (
        <section className="relative w-full overflow-hidden bg-[#fdf9f5] pb-[170px] pt-12 sm:pb-[200px] sm:pt-16 md:pt-20 lg:pb-[120px]">
            {/* ================= BACKGROUND IMAGE ================= */}
            <div className="pointer-events-none absolute inset-0">
                <motion.img
                    src="/images/fmcg_oper_challenge.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    initial={{ opacity: 0.7, scale: reduceMotion ? 1 : 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.6, ease: EASE }}
                    className="h-full w-full object-cover object-left-bottom"
                />
                {/* Mobile: heavier wash, the copy stacks right over the artwork */}
                <div className="absolute inset-0 bg-[#fdf9f5]/88 lg:hidden" />
                {/* Desktop: top-weighted wash so the forklift stays visible at the bottom */}
                <div className="absolute inset-0 hidden bg-gradient-to-b from-[#fdf9f5]/90 via-[#fdf9f5]/40 to-transparent lg:block" />
                <div className="absolute inset-y-0 right-0 hidden w-[68%] bg-gradient-to-l from-[#fdf9f5] via-[#fdf9f5]/92 to-transparent lg:block" />
            </div>

            <Container className="relative z-10 w-full">
                <div className="grid w-full min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.35fr)] lg:gap-14 xl:gap-20">
                    {/* ================= LEFT ================= */}
                    <motion.div
                        variants={leftGroup}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        className="min-w-0"
                    >
                        <motion.div variants={fadeIn}>
                            <Eyebrow>OPERATIONAL CHALLENGES</Eyebrow>
                        </motion.div>

                        <motion.div
                            variants={ruleGrow}
                            className="mt-4 h-[3px] w-12 rounded-full bg-orange-500"
                        />

                        <motion.h2
                            variants={fadeFromLeft}
                            className="mt-4 h-display text-[30px] leading-[1.12] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
                        >
                            Key Operational Challenges in{' '}
                            <span className="gradient-text-orange">FMCG Distribution</span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="mt-4 max-w-md text-sm leading-relaxed text-navy-600 sm:text-[15px]"
                        >
                            From inventory to delivery, FMCG operations involve many moving
                            parts. Solving these challenges is key to building a faster,
                            smarter and more efficient distribution network.
                        </motion.p>
                    </motion.div>

                    {/* ================= CARDS ================= */}
                    <motion.div
                        variants={cardsGroup}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        className="grid min-w-0 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3"
                    >
                        {CHALLENGES.map(
                            ({ number, title, description, Icon, color, tint }) => (
                                <motion.article
                                    key={number}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="group relative rounded-[18px] border border-[#f0e8e0] bg-white pb-6 pl-5 pr-8 pt-8 shadow-[0_14px_40px_rgba(25,35,55,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(25,35,55,0.13)]"
                                >
                                    {/* Number tab */}
                                    <motion.span
                                        variants={ribbonVariants}
                                        className="absolute -top-3 left-5 flex h-[52px] w-[52px] items-end justify-center pb-3"
                                        style={{ backgroundColor: color, clipPath: TAB_SHAPE }}
                                    >
                                        <span className="h-display text-[20px] font-semibold leading-none text-white">
                                            {number}
                                        </span>
                                    </motion.span>

                                    <div className="flex min-w-0 items-start gap-4">
                                        {/* Icon */}
                                        <motion.span
                                            variants={iconVariants}
                                            className="mt-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                                            style={{
                                                backgroundColor: tint,
                                                border: `1px solid ${color}22`,
                                            }}
                                        >
                                            <Icon
                                                className="h-7 w-7"
                                                strokeWidth={1.5}
                                                style={{ color }}
                                            />
                                        </motion.span>

                                        {/* Text */}
                                        <div className="min-w-0 flex-1">
                                            <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                                                {title}
                                            </h3>

                                            <span
                                                className="mt-3 block h-[2px] w-7 rounded-full"
                                                style={{ backgroundColor: color }}
                                            />

                                            <p className="mt-3 text-[12.5px] leading-relaxed text-navy-600 sm:text-[13px]">
                                                {description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right rail + dot */}
                                    <span
                                        className="pointer-events-none absolute bottom-7 right-3 top-9 w-px"
                                        style={{ backgroundColor: `${color}33` }}
                                    />
                                    <span
                                        className="pointer-events-none absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-[calc(50%-0.5px)] rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                </motion.article>
                            )
                        )}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
