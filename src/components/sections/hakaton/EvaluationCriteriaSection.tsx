"use client";

import { motion, Variants } from "framer-motion";
import { useLocale } from "@/components/LocaleContext"; // Импортируем хук локали

export const EvaluationCriteriaSection = () => {
    const { t } = useLocale(); // Инициализируем локаль

    // Данные теперь генерируются с использованием функции t()
    const criteria = [
        {
            percentage: "40%",
            title: t("CriteriaTitle1"),
            description: t("CriteriaDesc1"),
            details: t("CriteriaDetails1"),
        },
        {
            percentage: "20%",
            title: t("CriteriaTitle2"),
            description: t("CriteriaDesc2"),
            details: null, // Оставляем null, если нет деталей
        },
        {
            percentage: "20%",
            title: t("CriteriaTitle3"),
            description: t("CriteriaDesc3"),
            details: null,
        },
        {
            percentage: "20%",
            title: t("CriteriaTitle4"),
            description: t("CriteriaDesc4"),
            details: null,
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95] },
        },
    };

    return (
        <section className="relative bg-black text-white py-24 sm:py-32 px-6">
            <div
                className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-t from-black via-violet-950/30 to-transparent"
                aria-hidden="true"
            />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Локализовано */}
                    {t("EvaluationTitle")}
                </motion.h2>

                <motion.div
                    className="flex flex-col gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {criteria.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative flex flex-col md:flex-row items-start gap-6 p-6 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-900/20"
                        >
                            <div className="absolute top-4 left-6 text-7xl font-black text-white/5 -z-10 transition-transform duration-300 group-hover:scale-110">
                                0{index + 1}
                            </div>

                            <div className="flex-shrink-0 w-full md:w-32 text-center md:text-left">
                                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-cyan-400">
                                    {item.percentage}
                                </span>
                            </div>

                            <div className="w-full">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    {/* Локализовано */}
                                    {item.title}
                                </h3>
                                <p className="text-base md:text-lg text-violet-100/80 leading-relaxed">
                                    {/* Локализовано */}
                                    {item.description}
                                </p>
                                {item.details && (
                                    <p className="mt-2 text-sm text-white/60">
                                        {/* Локализовано */}
                                        {item.details}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};