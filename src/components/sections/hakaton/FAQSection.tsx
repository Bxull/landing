"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/components/LocaleContext"; // Импортируем хук локали


const AccordionItem = ({ item, isOpen, onClick }: { item: { question: string; answer: string }; isOpen: boolean; onClick: () => void; }) => {
    return (
        <div className="border-b border-purple-500/20">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-6 text-lg font-medium text-white/90 hover:text-white transition-colors"
            >
                <span>{item.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-6 h-6 text-violet-300" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: "0rem" }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-base text-violet-100/80 leading-relaxed pr-8">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { t } = useLocale(); // Инициализируем локаль

    // Формируем faqData с использованием локализации
    const faqData = [
        {
            question: t("FAQ_Q1"),
            answer: t("FAQ_A1"),
        },
        {
            question: t("FAQ_Q2"),
            answer: t("FAQ_A2"),
        },
        {
            question: t("FAQ_Q3"),
            answer: t("FAQ_A3"),
        },
        {
            question: t("FAQ_Q4"),
            answer: t("FAQ_A4"),
        },
        {
            question: t("FAQ_Q5"),
            answer: t("FAQ_A5"),
        },
    ];

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative bg-black text-white py-24 sm:py-32 px-6">
            <div
                className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-black to-black"
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
                    {t("FAQTitle")}
                </motion.h2>

                <motion.div
                    className="bg-black/20 border border-purple-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {faqData.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};