"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#how', label: 'как это работает' },
  { href: '#contact', label: 'демо' },
  { href: '#team', label: 'о нас' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={
        `fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b 
        ${scrolled
          ? 'bg-black/90 backdrop-blur-xl border-purple-500/20 shadow-[0_8px_32px_-8px_rgba(168,85,247,0.3)]'
          : 'bg-transparent border-transparent'
        }`
      }
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="text-2xl font-black tracking-tight text-white flex items-center gap-3 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
            diffuz.io
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((l, idx) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
              className="relative px-6 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-colors group"
            >
              {l.label}
              {/* Glow effect on hover */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-cyan-500/20 transition-all duration-300 -z-10" />
            </motion.a>
          ))}

          {/* CTA Button */}
          <motion.a
            href="https://t.me/diffuzio"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 relative group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold">
              связаться
            </div>
          </motion.a>
        </nav>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation"
          onClick={() => setOpen(o => !o)}
          className="md:hidden relative inline-flex items-center justify-center w-12 h-12 rounded-xl border border-purple-500/30 text-white hover:bg-purple-500/10 transition-colors overflow-hidden group"
        >
          <span className="sr-only">Menu</span>
          <div className="relative z-10 flex flex-col items-center justify-center gap-1.5">
            <motion.span
              className="block h-0.5 w-6 bg-current rounded-full"
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-current rounded-full"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-current rounded-full"
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          {/* Hover glow */}
          <span className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-300" />
        </motion.button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden backdrop-blur-xl bg-black/95 border-t border-purple-500/20"
          >
            <nav className="flex flex-col px-6 py-6 gap-1">
              {links.map((l, idx) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setOpen(false)}
                  className="relative px-4 py-3 text-base font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-purple-500/10 group"
                >
                  <span className="relative z-10">{l.label}</span>
                </motion.a>
              ))}
              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setOpen(false)}
                className="mt-4 relative group"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-base font-semibold text-center">
                  связаться
                </div>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}