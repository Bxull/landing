"use client";

import { motion, Variants } from "framer-motion";
import { Linkedin, Instagram, Facebook, Send, FileText } from 'lucide-react';

const socialNetworks = [
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'Instagram', icon: Instagram },
    { name: 'Facebook', icon: Facebook },
    { name: 'Telegram', icon: Send },
];

export const DatasetSection = () => {
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
                    Датасет
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-violet-100/80 leading-relaxed max-w-3xl mx-auto"
                >
                    Вам предоставляются тексты <span className="font-bold text-white">10–15 персон</span>.
                    У каждой — от <span className="font-bold text-white">10 до 60 постов</span>, опубликованных в разных соцсетях:
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
                            <social.icon className="w-8 h-8 text-violet-300 transition-colors group-hover:text-white" />
                            <span className="text-sm text-white/70 transition-colors group-hover:text-white">{social.name}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="mt-12 text-lg md:text-xl text-violet-100/80"
                >
                    Формат данных — JSON, чистый, структурированный.
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
                            Скачать датасет
                        </span>
                    </button>
                </motion.div>

            </motion.div>
        </section>
    );
};