"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Users, FolderKanban, Cloud, BrainCircuit } from 'lucide-react';
import { useLocale } from "@/components/LocaleContext"; // Импортируем хук

export const ParticipationRulesSection = () => {
    const { t } = useLocale(); // Инициализируем локаль

    // Формируем правила с использованием локализации
    const rules = [
        {
            icon: Code2,
            text: t("RuleText1"),
        },
        {
            icon: BrainCircuit,
            text: t("RuleText2"),
        },
        {
            icon: Cloud,
            text: t("RuleText3"),
        },
        {
            icon: Users,
            text: t("RuleText4"),
        },
        {
            icon: FolderKanban,
            title: t("RuleTitle5"),
            subItems: [
                t("RuleSubItem5_1"),
                t("RuleSubItem5_2"),
                t("RuleSubItem5_3"),
            ],
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section className="relative bg-black text-white py-24 sm:py-32 px-6 overflow-hidden">
            <div
                className="absolute -bottom-40 -left-40 w-[50vw] h-[80vh] bg-gradient-to-tr from-purple-900/80 via-cyan-900/30 to-transparent rounded-full blur-3xl opacity-20 rotate-15"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Локализовано */}
                    {t("RulesTitle")}
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {rules.map((rule, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative flex flex-col p-6 rounded-2xl h-full bg-white/5 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-purple-500/40 hover:-translate-y-2"
                        >
                            <div className="flex-shrink-0 mb-5">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 border border-white/10">
                                    <rule.icon className="w-7 h-7 text-violet-300 transition-colors duration-300 group-hover:text-white" />
                                </div>
                            </div>

                            <div className="flex-grow">
                                {rule.title ? (
                                    <>
                                        <h3 className="text-lg font-semibold text-white/90 mb-3">{rule.title}</h3>
                                        <ul className="space-y-2 pl-1">
                                            {rule.subItems?.map((item, subIndex) => (
                                                <li key={subIndex} className="flex items-start">
                                                    <span className="text-cyan-400 mr-2 mt-1">–</span>
                                                    <span className="text-violet-100/80">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <p className="text-lg text-white/90 leading-relaxed">{rule.text}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};