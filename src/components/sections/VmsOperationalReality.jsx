import { m as motion } from 'framer-motion';
import {
    Database,
    UserRoundCheck,
    ShieldAlert,
    BellRing,
    SearchCheck,
    FileSpreadsheet,
    Mail,
    FolderOpen,
    MoreHorizontal,
    CheckCircle2,
    CircleAlert,
    ArrowRight,
    Clock3,
    Award,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const realities = [
    {
        number: '01',
        icon: Database,
        title: 'Vendor Information Lives Everywhere',
        desc: 'Profiles, contacts, bank details, documents, and communication history often sit across multiple files, systems, and inboxes.',
        type: 'sources',
    },
    {
        number: '02',
        icon: UserRoundCheck,
        title: 'Approvals Lose Clear Ownership',
        desc: 'Without structured workflows, teams struggle to identify who needs to review, approve, or take the next action.',
        type: 'workflow',
    },
    {
        number: '03',
        icon: ShieldAlert,
        title: 'Compliance Is Easy to Miss',
        desc: 'Document expiries, renewals, certificates, and regulatory requirements can go unnoticed until they create operational risk.',
        type: 'compliance',
    },
    {
        number: '04',
        icon: BellRing,
        title: 'Follow-Ups Become Manual Work',
        desc: 'Teams spend valuable time chasing vendors and internal stakeholders for updates, missing documents, and approvals.',
        type: 'followup',
    },
];

const trustItems = [
    {
        icon: SearchCheck,
        title: 'One Connected View',
        desc: 'Bring vendor onboarding, documents, approvals, compliance, and pending actions into one operational view.',
    },
    {
        icon: CheckCircle2,
        title: 'Clear Next Actions',
        desc: 'Make ownership and follow-ups easier to understand across every stage of the vendor lifecycle.',
    },
];

function VisualPanel({ type }) {
    if (type === 'sources') {
        return (
            <div className="mt-6 flex items-center justify-between rounded-xl border border-navy-100 bg-navy-50/70 px-4 py-4">
                <div className="flex flex-col items-center gap-1 text-[10px] font-semibold text-navy-600">
                    <FileSpreadsheet className="h-6 w-6 text-emerald-600" />
                    <span>Excel Files</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-[10px] font-semibold text-navy-600">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <span>Emails</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-[10px] font-semibold text-navy-600">
                    <FolderOpen className="h-6 w-6 text-orange-500" />
                    <span>Shared Drives</span>
                </div>

                <div className="flex flex-col items-center gap-1 text-[10px] font-semibold text-navy-600">
                    <MoreHorizontal className="h-6 w-6" />
                    <span>Others</span>
                </div>
            </div>
        );
    }

    if (type === 'workflow') {
        return (
            <div className="mt-6 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-4">
                {[
                    { icon: UserRoundCheck, label: 'Submitted' },
                    { icon: UserRoundCheck, label: 'In Review' },
                    { icon: SearchCheck, label: 'Who Next?' },
                    { icon: SearchCheck, label: 'Approved By?' },
                ].map((step, index) => {
                    const StepIcon = step.icon;

                    return (
                        <div key={step.label} className="flex items-center gap-2">
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white">
                                    <StepIcon className="h-4 w-4 text-emerald-700" />
                                </div>
                                <span className="whitespace-nowrap text-[9px] font-semibold text-navy-600">
                                    {step.label}
                                </span>
                            </div>

                            {index < 3 && (
                                <ArrowRight className="mb-4 h-4 w-4 text-navy-300" />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    if (type === 'compliance') {
        return (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50/70 px-4 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                    <CircleAlert className="h-6 w-6 text-orange-600" />
                </div>

                <div>
                    <p className="text-xs font-bold text-navy-950">
                        GST Certificate
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-orange-600">
                        03 Days Left
                    </p>
                    <p className="mt-1 text-[10px] text-navy-500">
                        Expires soon • Action required
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-4">
            {[
                { icon: BellRing, label: 'Follow Up' },
                { icon: Mail, label: 'Reminder' },
                { icon: Clock3, label: 'Follow Up Again' },
                { icon: Clock3, label: 'Still Pending' },
            ].map((step, index) => {
                const StepIcon = step.icon;

                return (
                    <div key={step.label} className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                            <StepIcon className="h-5 w-5 text-violet-600" />
                            <span className="max-w-[50px] text-center text-[9px] font-semibold leading-tight text-navy-600">
                                {step.label}
                            </span>
                        </div>

                        {index < 3 && (
                            <ArrowRight className="h-4 w-4 text-navy-300" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function RealityCard({ item, index }) {
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
            className="group rounded-[22px] border border-navy-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise"
        >
            <div className="flex items-start gap-4">
                {/* Number */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-navy-100 bg-navy-50">
                    <span className="text-lg font-bold text-navy-700">
                        {item.number}
                    </span>
                </div>

                <div className="flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-100">
                        <Icon className="h-5 w-5 text-navy-700" />
                    </div>

                    <h3 className="mt-4 text-[18px] font-bold leading-snug text-navy-950">
                        {item.title}
                    </h3>

                    <p className="mt-3 text-[14px] leading-relaxed text-navy-600">
                        {item.desc}
                    </p>
                </div>
            </div>

            <VisualPanel type={item.type} />
        </motion.div>
    );
}

function TrustItem({ item, index }) {
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: EASE,
            }}
            className="flex items-start gap-3"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                <Icon className="h-5 w-5 text-navy-700" />
            </div>

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

export default function VmsOperationalReality() {
    return (
        <section className="relative overflow-hidden bg-white py-16 md:py-20">
            {/* Background decoration */}
            <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-orange-50/50 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-blue-50/60 blur-3xl" />

            <Container className="relative">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">

                    {/* LEFT SIDE - LIKE FIRST IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="flex flex-col lg:sticky lg:top-28 lg:h-fit"
                    >
                        <Eyebrow>
                            Operational Reality of VMS
                        </Eyebrow>

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
                            Vendor Operations Get Complicated{' '}
                            <span className="gradient-text-orange">
                                Faster Than Spreadsheets Can Handle.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-md text-[16px] leading-relaxed text-navy-600">
                            Vendor management is rarely difficult because of one major problem.
                            It becomes difficult when onboarding, documents, approvals,
                            compliance renewals, ownership, and follow-ups are managed
                            across emails, spreadsheets, and disconnected teams.
                        </p>

                        <div className="mt-8">
                            <button className="inline-flex items-center gap-3 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]">
                                See VMS in Action
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Bottom supporting information */}
                        <div className="mt-14 grid gap-6 border-t border-navy-100 pt-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            {trustItems.map((item, index) => (
                                <TrustItem
                                    key={item.title}
                                    item={item}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Small trust badges */}
                        <div className="mt-8 flex items-center gap-4 border-t border-navy-100 pt-6">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200">
                                <Award className="h-5 w-5 text-navy-700" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-navy-950">
                                    Built for controlled vendor operations
                                </p>
                                <p className="mt-1 text-[11px] text-navy-500">
                                    Structured. Traceable. Accountable.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - 2 x 2 CARDS */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {realities.map((item, index) => (
                            <RealityCard
                                key={item.title}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}