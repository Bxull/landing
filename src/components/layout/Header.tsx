"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from "@/components/LocaleContext";
import Image from 'next/image';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  const isBeforeDecember = new Date().getMonth() < 11; 

  const links = [
    { href: 'https://my.diffuz.io', label: t("demo") },
  ];

  const allLinks = isBeforeDecember ? 
    [{ href: '/hakaton', label: 'Hakaton 28-30' }, ...links] : 
    links;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open && !contactOpen) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setContactOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open, contactOpen]);


  useEffect(() => {
    if (contactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [contactOpen]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContactOpen(true);
  };
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
        <motion.a
          href="/"
          className="text-2xl font-black tracking-tight text-white flex items-center gap-3 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image src="/logo_white.png" alt="diffuz.io" width={50} height={50} />
        </motion.a>

        <nav className="hidden md:flex items-center gap-2">
          {allLinks.map((l, idx) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
              className="relative px-6 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-colors group"
            >
              {l.label}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-cyan-500/20 transition-all duration-300 -z-10" />
            </motion.a>
          ))}

          <motion.a
            href="#"
            onClick={handleContactClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 relative group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold">
              {t("contact")}
            </div>
          </motion.a>

          <div className="ml-4 relative bg-white/5 rounded-full p-1 backdrop-blur-sm border border-purple-500/20">
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600"
              initial={false}
              animate={{
                left: locale === "en" ? "4px" : locale === "ru" ? "calc(33.33% + 2px)" : "calc(66.66%)",
                width: "calc(33.33% - 4px)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            {["en", "ru", "kz"].map(l => (
              <button
                key={l}
                onClick={() => setLocale(l as any)}
                className={`relative z-10 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${locale === l ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

        </nav>
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

          <span className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-300" />
        </motion.button>
      </div>

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
              {allLinks.map((l, idx) => (
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
              <motion.a
                href="#"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  setContactOpen(true);
                }}
                className="mt-4 relative group"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-base font-semibold text-center">
                  {t("contact")}
                </div>
              </motion.a>

              <div className="mt-6 flex justify-center gap-3">
                {["en", "ru", "kz"].map(l => (
                  <button
                    key={l}
                    onClick={() => setLocale(l as any)}
                    className={`px-3 py-2 rounded transition-all duration-300 ${locale === l
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                      : "bg-white/10 text-white/70"
                      }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setContactOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-6 w-full max-w-md z-50 shadow-[0_0_40px_rgba(168,85,247,0.3)]"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t("contact")}</h3>
                <button
                  onClick={() => setContactOpen(false)}
                  className="text-white/70 hover:text-white p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <a
                  href="https://t.me/diffuzio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-purple-500/20 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white group-hover:text-purple-300 transition-colors">Telegram</div>
                    <div className="text-sm text-white/60">@diffuzio</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/77017430008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-purple-500/20 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white group-hover:text-green-300 transition-colors">WhatsApp</div>
                    <div className="text-sm text-white/60">+7 701 743 00 08</div>
                  </div>
                </a>

                <a
                  href="mailto:info@diffuz.io"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-purple-500/20 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white group-hover:text-pink-300 transition-colors">Email</div>
                    <div className="text-sm text-white/60">info@diffuz.io</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
