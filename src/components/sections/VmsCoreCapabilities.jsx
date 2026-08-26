import { m as motion } from 'framer-motion';
import {
    UserRoundPlus,
    Workflow,
    FileText,
    ShieldCheck,
    ChartNoAxesCombined,
    LayoutDashboard,
    CheckCircle2,
    Clock3,
    ShieldAlert,
    UsersRound,
    TrendingUp,
    BadgeCheck,
    ArrowRight,
} from 'lucide-react';

import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const capabilities = [
    {
        number: '01',
        icon: UserRoundPlus,
        title: 'Vendor Onboarding & Profiles',
        desc: 'Bring every vendor into one structured system with complete and accurate information.',
        points: [
            'Centralized vendor profiles',
            'Vendor categorization',
            'Structured information capture',
            'Complete vendor history',
        ],
        accent: 'emerald',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-700',
        numberColor: 'text-emerald-700',
        lineColor: 'bg-emerald-600',
        arrowColor: 'text-emerald-700',
        pointColor: 'text-emerald-700',
        panelBg: 'bg-emerald-50/60',
    },
    {
        number: '02',
        icon: Workflow,
        title: 'Approval & Workflow Management',
        desc: 'Keep every request moving with defined workflows, clear ownership and real-time status visibility.',
        points: [
            'Configurable approval flows',
            'Status tracking',
            'Clear ownership',
            'Reduced delays',
        ],
        accent: 'blue',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-700',
        numberColor: 'text-blue-700',
        lineColor: 'bg-blue-600',
        arrowColor: 'text-blue-700',
        pointColor: 'text-blue-700',
        panelBg: 'bg-blue-50/60',
    },
    {
        number: '03',
        icon: FileText,
        title: 'Document Management',
        desc: 'Store, organize and manage all critical vendor documents in one connected place.',
        points: [
            'Centralized document storage',
            'Easy record access',
            'Document categorization',
            'Connected documentation',
        ],
        accent: 'orange',
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-600',
        numberColor: 'text-orange-600',
        lineColor: 'bg-orange-500',
        arrowColor: 'text-orange-600',
        pointColor: 'text-orange-600',
        panelBg: 'bg-orange-50/60',
    },
    {
        number: '04',
        icon: ShieldCheck,
        title: 'Compliance & Renewal Tracking',
        desc: 'Stay ahead of expiry dates and compliance requirements with better visibility and alerts.',
        points: [
            'Validity tracking',
            'Compliance status visibility',
            'Renewal reminders',
            'Requirement monitoring',
        ],
        accent: 'violet',
        iconBg: 'bg-violet-50',
        iconColor: 'text-violet-700',
        numberColor: 'text-violet-700',
        lineColor: 'bg-violet-600',
        arrowColor: 'text-violet-700',
        pointColor: 'text-violet-700',
        panelBg: 'bg-violet-50/60',
    },
    {
        number: '05',
        icon: ChartNoAxesCombined,
        title: 'Vendor Performance Visibility',
        desc: 'Maintain visibility into vendor activity, service history and performance for better decisions.',
        points: [
            'Vendor status monitoring',
            'Historical visibility',
            'Performance tracking',
            'Better vendor oversight',
        ],
        accent: 'emerald',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-700',
        numberColor: 'text-emerald-700',
        lineColor: 'bg-emerald-600',
        arrowColor: 'text-emerald-700',
        pointColor: 'text-emerald-700',
        panelBg: 'bg-emerald-50/60',
    },
    {
        number: '06',
        icon: LayoutDashboard,
        title: 'Centralized Vendor Operations',
        desc: 'Bring records, workflows, approvals, documents and compliance together in one unified system.',
        points: [
            'Unified operational visibility',
            'Reduced spreadsheet dependency',
            'Connected workflows',
            'Better cross-team coordination',
        ],
        accent: 'blue',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-700',
        numberColor: 'text-blue-700',
        lineColor: 'bg-blue-600',
        arrowColor: 'text-blue-700',
        pointColor: 'text-blue-700',
        panelBg: 'bg-blue-50/60',
    },
];

const benefits = [
    {
        icon: Clock3,
        title: 'Save Valuable Time',
        desc: 'Automate manual tasks and reduce time spent chasing information.',
    },
    {
        icon: ShieldAlert,
        title: 'Reduce Risk',
        desc: 'Maintain compliance and data accuracy with better visibility and alerts.',
    },
    {
        icon: UsersRound,
        title: 'Improve Collaboration',
        desc: 'Bring teams and vendors together with clear workflows and communication.',
    },
    {
        icon: TrendingUp,
        title: 'Drive Better Outcomes',
        desc: 'Make informed decisions with complete data and performance insights.',
    },
];

function CapabilityCard({ item, index }) {
    const Icon = item.icon;

    
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
                duration: 0.55,
                delay: index * 0.07,
                ease: EASE,
            }}
            className="group relative overflow-hidden rounded-[22px] border border-navy-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise"
        >
            {/* Top Content */}
            <div className="flex gap-5">

                {/* Icon */}
                <div
                    className={`flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-[22px] ${item.iconBg}`}
                >
                    <Icon
                        className={`h-14 w-14 ${item.iconColor}`}
                        strokeWidth={1.7}
                    />
                </div>

                {/* Heading Content */}
                <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <span
                                className={`block text-[32px] font-bold leading-none ${item.numberColor}`}
                            >
                                {item.number}
                            </span>

                            <h3 className="mt-1 text-[19px] font-bold leading-snug text-navy-950">
                                {item.title}
                            </h3>
                        </div>

                        <ArrowRight
                            className={`mt-5 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${item.arrowColor}`}
                        />
                    </div>

                    <div
                        className={`mt-3 h-[2px] w-8 rounded-full ${item.lineColor}`}
                    />

                    <p className="mt-3 text-[13px] leading-relaxed text-navy-600">
                        {item.desc}
                    </p>
                </div>
            </div>

            {/* Points Panel */}
            <div
                className={`mt-5 grid grid-cols-2 gap-x-5 gap-y-3 rounded-xl ${item.panelBg} px-4 py-4`}
            >
                {item.points.map((point) => (
                    <div
                        key={point}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle2
                            className={`h-3.5 w-3.5 shrink-0 ${item.pointColor}`}
                            strokeWidth={2.5}
                        />

                        <span className="text-[12px] font-medium leading-snug text-navy-600">
                            {point}
                        </span>
                    </div>
                ))}
            </div>
        </motion.article>
    );
}

function BenefitItem({ item, index }) {
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: EASE,
            }}
            className="flex items-start gap-3 px-5 py-4 lg:border-r lg:border-navy-100 last:border-r-0"
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                <Icon
                    className="h-6 w-6 text-navy-700"
                    strokeWidth={1.8}
                />
            </div>

            <div>
                <h4 className="text-[14px] font-bold text-navy-950">
                    {item.title}
                </h4>

                <p className="mt-1 text-[12px] leading-relaxed text-navy-600">
                    {item.desc}
                </p>
            </div>
        </motion.div>
    );
}

export default function VmsCoreCapabilities() {
    return (
        <section className="relative overflow-hidden bg-white py-16 md:py-20">

            {/* Background decoration - same style as other VMS sections */}
            <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-orange-50/50 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-blue-50/60 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-50/50 blur-3xl" />

            <Container className="relative">

                {/* ================= HEADER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        ease: EASE,
                    }}
                    className="mx-auto max-w-5xl text-center"
                >
                    <Eyebrow icon={BadgeCheck}>
                        CORE CAPABILITIES
                    </Eyebrow>

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
                        Everything You Need to Keep
                        <span className="block gradient-text-orange">
                            Vendor Operations Moving.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-4xl text-[16px] leading-relaxed text-navy-600 md:text-[18px]">
                        UpWon VMS connects the core processes behind vendor management—
                        from onboarding and approvals to documentation, compliance,
                        and performance visibility—so teams can manage the complete
                        vendor lifecycle with greater structure and control.
                    </p>
                </motion.div>

                {/* ================= CAPABILITY CARDS ================= */}
                <div className="mt-12 grid gap-5 lg:grid-cols-3">
                    {capabilities.map((item, index) => (
                        <CapabilityCard
                            key={item.number}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>

                {/* ================= BOTTOM BENEFIT STRIP ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        ease: EASE,
                    }}
                    className="mt-6 overflow-hidden rounded-[22px] border border-navy-200/70 bg-white shadow-sm"
                >
                    <div className="grid lg:grid-cols-[320px_1fr]">

                        {/* Left Statement */}
                        <div className="flex items-center gap-4 border-b border-navy-100 px-6 py-6 lg:border-b-0 lg:border-r">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                                <ShieldCheck
                                    className="h-8 w-8 text-orange-600"
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>
                                <p className="text-[16px] font-bold text-navy-950">
                                    Built for Control.
                                </p>

                                <p className="mt-1 text-[16px] text-navy-600">
                                    Designed for Operations.
                                </p>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
                            {benefits.map((item, index) => (
                                <BenefitItem
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