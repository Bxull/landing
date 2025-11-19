"use client";

import { motion, Variants } from "framer-motion";
import { Send, Mail } from 'lucide-react';

const contacts = [
    {
        icon: Send,
        name: "Telegram",
        value: "@username",
        href: "https://t.me/username", 
    },
    {
        icon: Mail,
        name: "Email",
        value: "info@something.kz",
        href: "mailto:info@something.kz",
    },
];

export const OrganizersSection = () => {

    const supportingText = "Хакатон проводится при поддержке: <span class='font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400'>iMean, НИШ, менторов индустрии, invited speakers.</span>";

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const },
        },
    };


    return (
        <section className="relative bg-gradient-to-t from-gray-950 to-black text-white py-24 sm:py-32 px-6">
            <div
                className="absolute bottom-0 right-0 w-[50vw] h-[70vh] bg-gradient-to-tl from-violet-950/50 to-transparent rounded-full blur-3xl opacity-50"
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
                        Организаторы
                    </h2>
                    <p
                        className="text-lg md:text-xl text-violet-100/80 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: supportingText }}
                    />
                </motion.div>

                <motion.div
                    className="flex flex-col gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {contacts.map((contact, index) => (
                        <motion.a
                            key={index}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            className="group relative flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-purple-500/40 hover:-translate-y-1"
                        >
                            <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-white/10 transition-transform duration-300 group-hover:scale-110">
                                <contact.icon className="w-7 h-7 text-violet-300 transition-colors duration-300 group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white/90">{contact.name}</h3>
                                <p className="text-base text-violet-100/70 transition-colors duration-300 group-hover:text-cyan-300">{contact.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};