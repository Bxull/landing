"use client"

import React, { useState } from "react";
import NetworkDiffusion from "@/components/visualizations/NetworkDiffusion";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export const HackathonHero: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, 
                delayChildren: 0.3,   
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const },
        },
    };

    return (
        <section className="relative h-full isolate pt-32 md:pt-40 pb-24 overflow-hidden hero-vignette">
            <div className="hero-bg-gradient" />
            <div className="hero-bg-noise" />
            <div className="absolute inset-0 z-0 opacity-70">
                <NetworkDiffusion variant="panel" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">

                    <motion.div
                        className="relative z-10 flex flex-col items-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p
                            variants={itemVariants}
                            className="mb-4 text-base sm:text-lg font-semibold tracking-widest text-violet-300/90 uppercase"
                        >
                            Diffuzio x NIS AI Hackathon 2025
                        </motion.p>

                        <motion.h1
                            variants={itemVariants}
                            className="text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-[1.1] tracking-tight text-white mb-8 max-w-4xl"
                        >
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-violet-400 drop-shadow-[0_0_25px_rgba(200,100,255,0.3)]">
                                Tone of Voice
                            </span>
                            Generation Challenge
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg md:text-xl text-violet-100/80 leading-relaxed mb-12 max-w-2xl"
                        >
                            Создай ИИ, который пишет как настоящий человек.
                            <br className="hidden sm:block" />
                            Анализируй стиль. Генерируй посты. Соревнуйся.
                        </motion.p>

                    </motion.div>

                </div>
            </div>
        </section>
    );
};