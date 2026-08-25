import { m as motion } from 'framer-motion';
import {
    Send,
    ContactRound,
    Workflow,
    ShieldCheck,
    MonitorCog,
    Check,
    Target,
    Clock3,
    ShieldAlert,
    UsersRound,
    TrendingUp,
    Info,
} from 'lucide-react';

import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const approachSteps = [
    {
        number: '01',
        icon: ContactRound,
        title: (
            <>
                Structure
                <br />
                the Foundation
            </>
        ),
        description:
            'Bring every vendor into one connected system and create a reliable foundation for all operations.',
        points: [
            'Centralized vendor profiles',
            'Organized vendor documentation',
            'Consistent information capture',
        ],
        color: 'emerald',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        numberColor: 'text-emerald-700',
        bottomColor: 'bg-emerald-600',
    },
    {
        number: '02',
        icon: Workflow,
        title: (
            <>
                Define
                <br />
                the Workflow
            </>
        ),
        description:
            'Configure onboarding, approvals, reviews, and updates around your operational process.',
        points: [
            'Defined approval workflows',
            'Clear ownership',
            'Real-time status visibility',
        ],
        color: 'emerald',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        numberColor: 'text-emerald-700',
        bottomColor: 'bg-emerald-600',
    },
    {
        number: '03',
        icon: ShieldCheck,
        title: (
            <>
                Keep Compliance
                <br />
                Visible
            </>
        ),
        description:
            'Track important documents, validity periods, renewals, and compliance requirements.',
        points: [
            'Document validity tracking',
            'Renewal visibility',
            'Compliance alerts & follow-ups',
        ],
        color: 'blue',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-700',
        borderColor: 'border-blue-200',
        numberColor: 'text-blue-700',
        bottomColor: 'bg-blue-600',
    },
    {
        number: '04',
        icon: MonitorCog,
        title: (
            <>
                Maintain
                <br />
                Operational Control
            </>
        ),
        description:
            'Monitor records, workflow progress, compliance status, and performance as vendor relationships evolve.',
        points: [
            'Connected operational records',
            'Continuous status visibility',
            'Better vendor oversight',
        ],
        color: 'violet',
        iconBg: 'bg-violet-50',
        iconColor: 'text-violet-700',
        borderColor: 'border-violet-200',
        numberColor: 'text-violet-700',
        bottomColor: 'bg-violet-600',
    },
];

const outcomes = [
    {
        icon: Clock3,
        title: 'Save Valuable Time',
        desc: 'Reduce manual follow-ups and information chasing across teams.',
    },
    {
        icon: ShieldAlert,
        title: 'Lower Operational Risk',
        desc: 'Stay ahead of expiries, compliance gaps and process delays.',
    },
    {
        icon: UsersRound,
        title: 'Improve Team Productivity',
        desc: 'Clear workflows and visibility help teams focus on high-value work.',
    },
    {
        icon: TrendingUp,
        title: 'Strengthen Vendor Relationships',
        desc: 'Better communication, visibility and performance lead to stronger partnerships.',
    },
];

function ApproachCard({ item, index }) {
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: EASE,
            }}
            className={`group relative rounded-[22px] border ${item.borderColor} bg-white px-6 pb-7 pt-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise`}
        >
            {/* Step Number */}
            <div
                className={`absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border ${item.borderColor} bg-white shadow-sm`}
            >
                <span
                    className={`text-lg font-bold ${item.numberColor}`}
                >
                    {item.number}
                </span>
            </div>

            {/* Icon */}
            <div
                className={`mx-auto flex h-[82px] w-[82px] items-center justify-center rounded-[20px] ${item.iconBg}`}
            >
                <Icon
                    className={`h-10 w-10 ${item.iconColor}`}
                    strokeWidth={1.8}
                />
            </div>

            {/* Title */}
            <h3 className="mt-5 min-h-[56px] text-center text-[18px] font-bold leading-snug text-navy-950">
                {item.title}
            </h3>

            {/* Description */}
            <p className="mt-3 min-h-[76px] text-center text-[14px] leading-relaxed text-navy-600">
                {item.description}
            </p>

            <div className="my-5 h-px bg-navy-100" />

            {/* Points */}
            <ul className="space-y-3">
                {item.points.map((point) => (
                    <li
                        key={point}
                        className="flex items-center gap-3 text-[14px] font-medium text-navy-600"
                    >
                        <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${item.borderColor} ${item.iconColor}`}
                        >
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                        </span>

                        {point}
                    </li>
                ))}
            </ul>

            {/* Bottom accent */}
            <div
                className={`absolute bottom-0 left-0 h-[2px] w-full rounded-b-[22px] ${item.bottomColor}`}
            />
        </motion.div>
    );
}

function Outcome({ item, index }) {
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: EASE,
            }}
            className="flex items-start gap-3 border-navy-100 px-5 py-5 lg:border-r last:border-r-0"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                <Icon className="h-5 w-5 text-navy-700" />
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

export default function VmsApproch() {
    return (
        <section className="relative overflow-hidden bg-white py-16 md:py-20">

            {/* Background */}
            <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-orange-50/50 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-blue-50/60 blur-3xl" />

            <Container className="relative">

                {/* ================= HEADER ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mx-auto max-w-6xl text-center"
                >
                    <Eyebrow icon={Send}>
                        THE UPWON APPROACH
                    </Eyebrow>

                    <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
                        Vendor Management, Designed Around
                        <span className="block gradient-text-orange">
                            How Operations Actually Work.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-4xl text-[16px] leading-relaxed text-navy-600 md:text-[18px]">
                        UpWon brings vendor information, onboarding, approvals,
                        documents, compliance, and ongoing performance into one
                        connected operational workflow—so teams spend less time
                        chasing updates and more time keeping vendor operations moving.
                    </p>
                </motion.div>

                {/* ================= STEPS ================= */}
                <div className="relative mt-16">

                    {/* Connection line */}
                    <div className="absolute left-[12%] right-[12%] top-0 hidden border-t border-dashed border-navy-200 lg:block" />

                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                        {approachSteps.map((item, index) => (
                            <ApproachCard
                                key={item.number}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* ================= OUTCOMES ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mt-8 overflow-hidden rounded-[22px] border border-navy-200/70 bg-white shadow-sm"
                >
                    <div className="grid lg:grid-cols-[340px_1fr]">

                        {/* Intro */}
                        <div className="flex items-center gap-4 border-b border-navy-100 p-6 lg:border-b-0 lg:border-r">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-50">
                                <Target
                                    className="h-7 w-7 text-orange-600"
                                    strokeWidth={1.8}
                                />
                            </div>

                            <p className="text-[14px] leading-relaxed text-navy-600">
                                From first vendor details to ongoing operational
                                visibility—
                                <span className="font-bold text-navy-950">
                                    {' '}UpWon creates a more structured and
                                    accountable way to manage the vendor lifecycle.
                                </span>
                            </p>
                        </div>

                        {/* Outcomes */}
                        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
                            {outcomes.map((item, index) => (
                                <Outcome
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