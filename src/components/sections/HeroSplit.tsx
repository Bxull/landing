"use client"

import React, { useState, useEffect } from "react";
import NetworkDiffusion from "@/components/visualizations/NetworkDiffusion";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleContext";

export const HeroSplit: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1224);
    }
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("https://my.diffuz.io");
    }, 800);
  };

  return (
    <section className="relative h-full isolate pt-28 md:pt-32 pb-24 overflow-hidden hero-vignette">
      <div className="hero-bg-gradient" />
      <div className="hero-bg-noise" />

      {isMobile && (
        <div className="absolute inset-0 z-0">
          <NetworkDiffusion variant="panel" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center min-h-[60vh]">

          <motion.div
            className="relative z-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white mb-8">
              {t("SplittitleLine1")} <br />
              {t("SplittitleLine2")}{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-violet-400 drop-shadow-[0_0_25px_rgba(200,100,255,0.25)]">
                {t("SplittitleHighlight")}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-violet-100/80 leading-relaxed mb-10 max-w-lg">
              {t("Splitsubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-3 cursor-pointer rounded-xl font-semibold text-sm tracking-wide text-white bg-violet-600 transition-all duration-300 shadow-[0_0_25px_rgba(160,60,255,0.3)] hover:shadow-[0_0_45px_rgba(160,60,255,0.6)] relative"
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="opacity-0">{t("Splitbutton")}</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  </>
                ) : (
                  `${t("Splitbutton")}`
                )}
              </button>
            </div>
          </motion.div>

          {!isMobile && (
            <motion.div
              className="relative h-[580px] sm:h-[520px] md:h-[560px] lg:h-[640px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.3 }}
            >
              <NetworkDiffusion variant="panel" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;
