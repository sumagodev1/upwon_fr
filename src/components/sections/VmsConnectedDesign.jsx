import React from 'react';
import { m as motion } from 'framer-motion';
import {
    BellRing,
    FileText,
    ShoppingCart,
    Factory,
    BarChart3,
    ArrowUpRight,
    Check,
    Eye,
    ShieldCheck,
    Users,
    TrendingUp,
    ChevronDown,
} from 'lucide-react';

import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const FLOW_ITEMS = [
    {
        id: 'rate',
        step: '1',
        title: 'Vendor Rate Update',
        description: 'ABC Steel Co. updates the latest rate for Steel Coil – HR Grade.',
        icon: FileText,
        color: 'blue',
    },
    {
        id: 'alert',
        step: '2',
        title: 'Rate Change Alert',
        description: 'The system immediately identifies the price movement.',
        icon: BellRing,
        color: 'red',
    },
    {
        id: 'rfq',
        step: '3',
        title: 'RFQ & Purchase Plan',
        description: 'Latest vendor pricing is reflected before the next purchase decision.',
        icon: ShoppingCart,
        color: 'blue',
    },
    {
        id: 'quality',
        step: '4',
        title: 'Goods Receipt & QC',
        description: 'Delivered material quality is recorded against the vendor.',
        icon: Factory,
        color: 'green',
    },
    {
        id: 'score',
        step: '5',
        title: 'Vendor Performance',
        description: 'Price, quality and delivery outcomes update one live vendor score.',
        icon: BarChart3,
        color: 'purple',
    },
];

const colorClasses = {
    blue: {
        icon: 'bg-[#e8eef9] text-[#315da8]',
        number: 'bg-[#315da8]',
        border: 'border-[#cbd9ef]',
        value: 'text-[#244f93]',
        glow: 'bg-[#dbe7fa]',
    },
    red: {
        icon: 'bg-[#fff0ef] text-[#d94b43]',
        number: 'bg-[#d94b43]',
        border: 'border-[#f4b8b4]',
        value: 'text-[#d94b43]',
        glow: 'bg-[#ffe0dd]',
    },
    green: {
        icon: 'bg-[#e9f5ee] text-[#27834e]',
        number: 'bg-[#27834e]',
        border: 'border-[#b9dfc7]',
        value: 'text-[#267344]',
        glow: 'bg-[#d9f0e1]',
    },
    purple: {
        icon: 'bg-[#f0edfb] text-[#6651b5]',
        number: 'bg-[#6651b5]',
        border: 'border-[#d9d0f4]',
        value: 'text-[#57419d]',
        glow: 'bg-[#e8e1fa]',
    },
};

export default function VmsConnectedDesign() {
    const [activeStep, setActiveStep] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((current) =>
                current === FLOW_ITEMS.length - 1 ? 0 : current + 1
            );
        }, 2800);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#f7f8fa] py-16 sm:py-20 lg:py-24">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-[-180px] top-[70px] h-[460px] w-[460px] rounded-full bg-[#e4eaf6]/70 blur-[140px]" />

                <div className="absolute right-[-160px] top-[140px] h-[420px] w-[420px] rounded-full bg-[#eef1f8]/90 blur-[130px]" />

                <div className="absolute bottom-[-250px] left-[35%] h-[420px] w-[620px] rounded-full bg-[#e8edf7]/70 blur-[150px]" />
            </div>

            <Container className="relative z-10">
                {/* Top Area */}
                <div className="grid items-start gap-10 xl:grid-cols-[1.22fr_0.82fr] xl:gap-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{
                            duration: 0.65,
                            ease: EASE,
                        }}
                        className="max-w-[800px] pt-1"
                    >
                        <Eyebrow>CONNECTED BY DESIGN</Eyebrow>

                        <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36.8px]">
                            One Vendor Update Moves Through{' '}
                            <span className="gradient-text-orange">Your Entire Decision Flow.</span>
                        </h2>

                        <p className="mt-5 max-w-[800px] text-[15px] leading-[1.55] text-[#344561] sm:text-base lg:text-[17px]">
                            A vendor’s latest rate, RFQ response, delivered quality and
                            performance outcome live in the same connected system — so every
                            team works from the same information, not separate spreadsheets
                            and conversations.
                        </p>
                    </motion.div>

                    {/* Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{
                            duration: 0.7,
                            delay: 0.08,
                            ease: EASE,
                        }}
                        className="rounded-[20px] border border-[#d8dee8] bg-white/80 p-4 shadow-[0_22px_60px_rgba(41,62,99,0.09)] backdrop-blur-sm sm:p-5"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[15px] font-bold text-[#26344a] sm:text-[16px]">
                                    Vendor Performance Trend
                                </h3>

                                <span className="rounded-md bg-[#eaf5ee] px-2 py-1 text-[10px] font-semibold text-[#338055]">
                                    Live
                                </span>
                            </div>

                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-lg border border-[#dbe1ea] bg-white px-3 py-2 text-[12px] font-medium text-[#47566b]"
                            >
                                Last 30 Days
                                <ChevronDown size={14} />
                            </button>
                        </div>

                        <div className="mt-5">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-[16px] font-semibold text-[#26344a]">
                                        ABC Steel Co.
                                    </p>

                                    <p className="mt-1 text-[12px] text-[#66758a]">
                                        Overall Vendor Score
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[#dce3ed] bg-[#fafbfc] px-4 py-3 text-right shadow-[0_8px_20px_rgba(32,51,82,0.05)]">
                                    <div className="flex items-center justify-end gap-1 text-[#2b7d4d]">
                                        <ArrowUpRight size={16} strokeWidth={2.1} />

                                        <span className="text-[22px] font-bold leading-none">
                                            8.7
                                        </span>

                                        <span className="text-[12px] font-semibold">/10</span>
                                    </div>

                                    <p className="mt-2 text-[11px] text-[#66758a]">
                                        +12% vs last period
                                    </p>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="relative mt-5 h-[150px] overflow-hidden">
                                <div className="absolute left-0 right-0 top-[10%] border-t border-[#edf0f5]" />
                                <div className="absolute left-0 right-0 top-[37%] border-t border-[#edf0f5]" />
                                <div className="absolute left-0 right-0 top-[64%] border-t border-[#edf0f5]" />
                                <div className="absolute bottom-[10px] left-0 right-0 border-t border-[#edf0f5]" />

                                <div className="absolute left-0 top-0 flex h-full w-[36px] flex-col justify-between pb-2 text-[10px] text-[#718096]">
                                    <span>10</span>
                                    <span>9</span>
                                    <span>8</span>
                                    <span>7</span>
                                </div>

                                <svg
                                    viewBox="0 0 430 150"
                                    preserveAspectRatio="none"
                                    className="absolute bottom-0 left-[38px] h-full w-[calc(100%-38px)] overflow-visible"
                                >
                                    <defs>
                                        <linearGradient
                                            id="scoreFill"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#315da8"
                                                stopOpacity="0.2"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#315da8"
                                                stopOpacity="0"
                                            />
                                        </linearGradient>
                                    </defs>

                                    <path
                                        d="M0 115 L32 103 L55 108 L82 88 L112 96 L145 73 L176 82 L207 67 L238 78 L270 51 L302 56 L333 38 L365 42 L400 21 L430 27 L430 145 L0 145 Z"
                                        fill="url(#scoreFill)"
                                    />

                                    <path
                                        d="M0 115 L32 103 L55 108 L82 88 L112 96 L145 73 L176 82 L207 67 L238 78 L270 51 L302 56 L333 38 L365 42 L400 21 L430 27"
                                        fill="none"
                                        stroke="#315da8"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {[
                                        [0, 115],
                                        [32, 103],
                                        [55, 108],
                                        [82, 88],
                                        [112, 96],
                                        [145, 73],
                                        [176, 82],
                                        [207, 67],
                                        [238, 78],
                                        [270, 51],
                                        [302, 56],
                                        [333, 38],
                                        [365, 42],
                                        [400, 21],
                                        [430, 27],
                                    ].map(([cx, cy], index) => (
                                        <circle
                                            key={index}
                                            cx={cx}
                                            cy={cy}
                                            r={index === 14 ? 4.5 : 3}
                                            fill={index === 14 ? '#d94b43' : '#315da8'}
                                        />
                                    ))}
                                </svg>
                            </div>

                            <div className="ml-[38px] mt-1 flex justify-between text-[10px] text-[#718096]">
                                <span>May 02</span>
                                <span>May 09</span>
                                <span>May 16</span>
                                <span>May 23</span>
                                <span>May 30</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Connected Workflow */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{
                        duration: 0.75,
                        delay: 0.1,
                        ease: EASE,
                    }}
                    className="relative mt-14 min-h-[660px] lg:mt-16 lg:min-h-[430px]"
                >
                    {/* Desktop dotted connections */}
                    <svg
                        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
                        viewBox="0 0 1400 430"
                        preserveAspectRatio="none"
                    >
                        {/* Rate -> Alert */}
                        <path
                            d="M295 218 H390"
                            fill="none"
                            stroke="#315da8"
                            strokeWidth="2.2"
                            strokeDasharray="2 6"
                            strokeLinecap="round"
                        />

                        {/* Alert -> RFQ */}
                        <path
                            d="M590 218 H640 V95 H700"
                            fill="none"
                            stroke="#315da8"
                            strokeWidth="2.2"
                            strokeDasharray="2 6"
                            strokeLinecap="round"
                        />

                        {/* Alert -> QC */}
                        <path
                            d="M590 218 H640 V330 H700"
                            fill="none"
                            stroke="#27834e"
                            strokeWidth="2.2"
                            strokeDasharray="2 6"
                            strokeLinecap="round"
                        />

                        {/* RFQ -> Score */}
                        <path
                            d="M1020 95 H1060 V218 H1120"
                            fill="none"
                            stroke="#315da8"
                            strokeWidth="2.2"
                            strokeDasharray="2 6"
                            strokeLinecap="round"
                        />

                        {/* QC -> Score */}
                        <path
                            d="M1020 330 H1060 V218 H1120"
                            fill="none"
                            stroke="#27834e"
                            strokeWidth="2.2"
                            strokeDasharray="2 6"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Mobile / Tablet connector hint */}
                    <div className="absolute left-1/2 top-[150px] hidden h-[300px] border-l-2 border-dotted border-[#b7c5df] lg:hidden" />

                    <div className="relative grid gap-7 lg:grid-cols-[0.95fr_0.72fr_1.05fr_0.95fr] lg:grid-rows-2 lg:items-center lg:gap-x-[65px] lg:gap-y-6">
                        {/* Step 1 */}
                        <WorkflowCard
                            item={FLOW_ITEMS[0]}
                            active={activeStep === 0}
                            onClick={() => setActiveStep(0)}
                            className="lg:row-span-2"
                        >
                            <div className="mt-6 rounded-xl bg-[#f3f5f8] px-4 py-3">
                                <div className="flex items-center justify-between text-[13px]">
                                    <span className="text-[#718096]">Previous</span>
                                    <span className="font-medium text-[#7b8798]">
                                        ₹12,400 / MT
                                    </span>
                                </div>

                                <div className="my-2 h-px bg-[#dde3ec]" />

                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] font-semibold text-[#315da8]">
                                        Updated Rate
                                    </span>

                                    <span className="text-[17px] font-bold text-[#244f93]">
                                        ₹14,100 / MT
                                    </span>
                                </div>
                            </div>
                        </WorkflowCard>

                        {/* Step 2 */}
                        <WorkflowCard
                            item={FLOW_ITEMS[1]}
                            active={activeStep === 1}
                            onClick={() => setActiveStep(1)}
                            className="lg:row-span-2"
                            centered
                        >
                            <div className="mt-5 border-t border-[#ece3e2] pt-4 text-center">
                                <div className="text-[25px] font-bold text-[#d94b43]">
                                    ↑ 13.7%
                                </div>

                                <p className="mt-2 text-[12px] leading-[1.55] text-[#5d6878]">
                                    Steel Coil price increased significantly.
                                </p>
                            </div>
                        </WorkflowCard>

                        {/* Step 3 */}
                        <WorkflowCard
                            item={FLOW_ITEMS[2]}
                            active={activeStep === 2}
                            onClick={() => setActiveStep(2)}
                        >
                            <div className="mt-4 rounded-lg bg-[#eef3fb] px-4 py-2.5 text-center">
                                <span className="text-[17px] font-bold text-[#244f93]">
                                    ₹14,100 / MT
                                </span>
                            </div>
                        </WorkflowCard>

                        {/* Step 5 */}
                        <WorkflowCard
                            item={FLOW_ITEMS[4]}
                            active={activeStep === 4}
                            onClick={() => setActiveStep(4)}
                            className="lg:col-start-4 lg:row-span-2"
                        >
                            <div className="mt-4 rounded-lg bg-[#f0edfb] px-4 py-2.5 text-center">
                                <span className="text-[17px] font-bold text-[#57419d]">
                                    8.7 / 10 Score
                                </span>
                            </div>
                        </WorkflowCard>

                        {/* Step 4 */}
                        <WorkflowCard
                            item={FLOW_ITEMS[3]}
                            active={activeStep === 3}
                            onClick={() => setActiveStep(3)}
                            className="lg:col-start-3"
                        >
                            <div className="mt-4 rounded-lg bg-[#edf7f0] px-4 py-2.5 text-center">
                                <span className="text-[16px] font-bold text-[#267344]">
                                    Quality Score: 96%
                                </span>
                            </div>
                        </WorkflowCard>
                    </div>
                </motion.div>

                {/* Bottom Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        delay: 0.15,
                        ease: EASE,
                    }}
                    className="mt-10 rounded-[18px] border border-[#d9e0e9] bg-white/75 px-6 py-5 shadow-[0_14px_45px_rgba(39,58,91,0.06)] backdrop-blur-sm lg:mt-12 lg:px-7"
                >
                    <div className="grid items-center gap-6 lg:grid-cols-[1.25fr_auto_1.35fr]">
                        <div className="flex items-center gap-4">
                            <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#e9eef7] text-[#315da8]">
                                <Users size={26} strokeWidth={1.7} />
                            </div>

                            <div>
                                <p className="text-[17px] font-medium text-[#28364b]">
                                    No separate vendor spreadsheets nobody trusts.
                                </p>

                                <p className="mt-1 text-[17px] font-bold text-[#31559b]">
                                    One vendor record, connected to every decision.
                                </p>
                            </div>
                        </div>

                        <div className="hidden h-[58px] w-px bg-[#d9e0e9] lg:block" />

                        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                            <Benefit
                                icon={Eye}
                                label={
                                    <>
                                        Real-time
                                        <br />
                                        Visibility
                                    </>
                                }
                            />

                            <Benefit
                                icon={ShieldCheck}
                                label={
                                    <>
                                        Single Source
                                        <br />
                                        of Truth
                                    </>
                                }
                            />

                            <Benefit
                                icon={Users}
                                label={
                                    <>
                                        Better Vendor
                                        <br />
                                        Decisions
                                    </>
                                }
                            />

                            <Benefit
                                icon={TrendingUp}
                                label={
                                    <>
                                        Smarter Planning,
                                        <br />
                                        Stronger Margins
                                    </>
                                }
                            />
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

function WorkflowCard({
    item,
    active,
    onClick,
    children,
    className = '',
    centered = false,
}) {
    const Icon = item.icon;
    const styles = colorClasses[item.color];

    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={`relative w-full rounded-[18px] border bg-white/90 p-5 text-left shadow-[0_15px_35px_rgba(44,61,92,0.07)] backdrop-blur-sm transition-all duration-300 sm:p-6 ${active
                ? `${styles.border} shadow-[0_18px_45px_rgba(44,61,92,0.12)]`
                : 'border-[#d7dee8] hover:border-[#b9c7da]'
                } ${className}`}
        >
            {active && (
                <motion.div
                    layoutId="activeWorkflowGlow"
                    className={`pointer-events-none absolute inset-0 rounded-[18px] opacity-[0.18] ${styles.glow}`}
                    transition={{ duration: 0.35 }}
                />
            )}

            <div className="relative">
                <div
                    className={`flex ${centered ? 'flex-col items-center text-center' : 'items-start'
                        } gap-4`}
                >
                    <div
                        className={`flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full ${styles.icon}`}
                    >
                        <Icon size={28} strokeWidth={1.7} />
                    </div>

                    <div className={centered ? 'mt-1' : 'flex-1'}>
                        <div
                            className={`flex items-center ${centered ? 'justify-center' : ''
                                } gap-2`}
                        >
                            <span
                                className={`flex h-[25px] w-[25px] items-center justify-center rounded-full text-[12px] font-bold text-white ${styles.number}`}
                            >
                                {item.step}
                            </span>

                            <h3 className="text-[17px] font-bold leading-[1.3] text-[#29364a] sm:text-[18px]">
                                {item.title}
                            </h3>
                        </div>

                        <p
                            className={`mt-2 text-[13px] leading-[1.55] text-[#536176] ${centered ? 'max-w-[190px]' : 'max-w-[280px]'
                                }`}
                        >
                            {item.description}
                        </p>
                    </div>
                </div>

                {children}
            </div>
        </motion.button>
    );
}

function Benefit({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#edf1f7] text-[#315da8]">
                <Icon size={23} strokeWidth={1.7} />
            </div>

            <p className="text-[12px] leading-[1.45] text-[#3f4c60]">{label}</p>
        </div>
    );
}