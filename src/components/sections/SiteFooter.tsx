"use client";

import { motion } from "framer-motion";

export default function Footer({ scrollToSection, refs }: any) {
  return (
    <footer className="relative bg-black pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-cyan-900/10" />
      <motion.div
        className="absolute -top-20 left-1/3 w-[25rem] h-[25rem] bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[22rem] h-[22rem] bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 mb-6"
        >
          бренд звучит громче, когда говорит команда
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/50 text-base md:text-lg mb-10"
        >
          создаём доверие через голоса сотрудников
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8 text-white/40 text-sm mb-12">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(refs.howItWorks); }} className="hover:text-white/80 transition">как это работает</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(refs.features); }} className="hover:text-white/80 transition">демо</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(refs.network); }} className="hover:text-white/80 transition">о нас</a>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        <div className="text-white/30 text-xs">
          © {new Date().getFullYear()} diffuz.ai — создано с заботой о брендах
        </div>
      </div>
    </footer>
  );
}
