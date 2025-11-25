"use client";

import { SOCIAL_ICONS } from "@/lib/constants";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
// 1. Импортируем хук локали
import { useLocale } from "@/components/LocaleContext";

// Соцсети теперь будут получать имя из локали, если это потребуется,
// но тут мы пока оставим их оригинальные имена, т.к. они используются как ключи.
const socialNetworks = [
    { key: 'linkedin', icon: SOCIAL_ICONS.linkedin },
    { key: 'instagram', icon: SOCIAL_ICONS.instagram },
    { key: 'facebook', icon: SOCIAL_ICONS.facebook },
    { key: 'telegram', icon: SOCIAL_ICONS.telegram },
];

export const DatasetSection = () => {
    // 2. Инициализируем локаль
    const { t } = useLocale();

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" as const },
        },
    };

    const handleDownload = () => {
        // window.location.href = '/path/to/dataset.zip';
        console.log("Downloading dataset...");
    };

    return (
        <section className="relative bg-black text-white py-24 sm:py-32 px-6 overflow-hidden">
            <div
                className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-black via-purple-950/40 to-black"
                aria-hidden="true"
            />
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-gradient-to-r from-fuchsia-900/30 to-cyan-900/30 rounded-full blur-3xl opacity-20"
                aria-hidden="true"
            />

            <motion.div
                className="max-w-4xl mx-auto text-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6"
                >
                    {/* Локализовано */}
                    {t("DatasetTitle")}
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-violet-100/80 leading-relaxed max-w-3xl mx-auto"
                >
                    {/* Локализовано. Используем компоненты для сохранения форматирования */}
                    {t("DatasetDescription1")}
                    <span className="font-bold text-white">{t("DatasetPersonsCount")}</span>.
                    {t("DatasetDescription2")}
                    <span className="font-bold text-white">{t("DatasetPostsCount")}</span>
                    {t("DatasetDescription3")}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="mt-12 flex justify-center flex-wrap gap-4"
                >
                    {socialNetworks.map((social, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center gap-2 p-4 w-32 h-32 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-purple-500/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500/0 to-cyan-500/0 group-hover:from-fuchsia-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
                            <Image
                                src={social.icon}
                                alt={`${social.key} icon`}
                                width={32}
                                height={32}
                                className="w-8 h-8 text-violet-300 transition-colors group-hover:text-white"
                            />
                            {/* Локализовано имя соцсети */}
                            <span className="text-sm text-white/70 transition-colors group-hover:text-white">{t(`Social_${social.key}`)}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="mt-12 text-lg md:text-xl text-violet-100/80"
                >
                    {/* Локализовано */}
                    {t("DatasetFormat")}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="mt-10"
                >
                    <button
                        onClick={handleDownload}
                        className="relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg text-white group"
                    >
                        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 opacity-70 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:-inset-1" />

                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600" />

                        <span className="relative z-10 flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-2"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9" /><path d="M12 3v6" /></svg>
                            {/* Локализовано */}
                            {t("DatasetDownloadButton")}
                        </span>
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
};