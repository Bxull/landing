"use client";

import { motion, Variants } from "framer-motion";

const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" stroke="url(#gradient)" strokeWidth="1.5" />
        <motion.path
            d="M8 12.5L10.5 15L16 9.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        />
        <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A855F7" stopOpacity="0.8" />
                <stop offset="1" stopColor="#22D3EE" stopOpacity="0.5" />
            </linearGradient>
        </defs>
    </svg>
);


export const TaskDescriptionSection = () => {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const tasks = [
        {
            text: "<strong>анализирует стиль</strong> конкретного автора,"
        },
        {
            text: "<strong>выделяет особенности</strong> его речи,"
        },
        {
            text: "и <strong>генерирует новый пост</strong>,<br class='hidden md:block' /> который звучит как этот автор, соответствует темам и подходит под выбранную соцсеть."
        }
    ];

    return (
        <section className="relative bg-black text-white py-24 sm:py-32 px-6">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-gradient-to-br from-cyan-900/80 via-purple-900/50 to-transparent rounded-full blur-3xl opacity-20"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">

                <motion.div
                    className="lg:sticky lg:top-32 h-full"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight text-white/95">
                        Что нужно сделать?
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-violet-100/80 leading-relaxed"
                    >
                        У тебя есть тексты реальных персон (от 10 до 60 постов у каждой). Твоя задача — создать систему, которая:
                    </motion.p>

                    <div className="mt-10 space-y-6">
                        {tasks.map((task, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4"
                                variants={itemVariants}
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <CheckIcon />
                                </div>
                                <p
                                    className="text-lg md:text-xl text-violet-100/80 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: task.text.replace(/<strong>(.*?)<\/strong>/g, '<span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">$1</span>') }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-12 p-6 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-sm shadow-lg"
                    >
                        <p className="text-lg text-white/90">
                            Это задание объединяет стиль письма, аналитику, программирование и работу с ИИ.
                        </p>
                        <p className="mt-2 text-base text-violet-300">
                            Идеально для 11 класса.
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};