"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLocale } from "@/components/LocaleContext";

export function FeaturesSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  const getVideoSource = () => {
    switch (locale) {
      case 'en':
        return "/demo_video_en.MOV";
      case 'ru':
        return "/demo_video.mp4";
      default:
        return "/demo_video.mp4";
    }
  };

  const handleVideoClick = () => {
    setIsFullscreen(true);
    const videoElement = document.getElementById("feature-video") as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = false;
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if ((videoElement as any).webkitRequestFullscreen) {
        (videoElement as any).webkitRequestFullscreen();
      } else if ((videoElement as any).msRequestFullscreen) {
        (videoElement as any).msRequestFullscreen();
      }
      videoElement.play();
    }
  };

  const handleFullscreenExit = () => {
    setIsFullscreen(false);
    const videoElement = document.getElementById("feature-video") as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = true;
    }
  };

  if (typeof document !== "undefined") {
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) handleFullscreenExit();
    });
    document.addEventListener("webkitfullscreenchange", () => {
      if (!(document as any).webkitFullscreenElement) handleFullscreenExit();
    });
    document.addEventListener("mozfullscreenchange", () => {
      if (!(document as any).mozFullScreenElement) handleFullscreenExit();
    });
    document.addEventListener("MSFullscreenChange", () => {
      if (!(document as any).msFullscreenElement) handleFullscreenExit();
    });
  }

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">

        <motion.h2
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-snug text-white/90 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t("Feattitle")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-violet-400">
            {t("FeattitleHighlight")}
          </span>{" "}
          {t("FeattitleEnd")}
        </motion.h2>

        <motion.div
          className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(160,60,255,0.15)] border border-white/10 cursor-pointer"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={handleVideoClick}
        >
          <video
            id="feature-video"
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-2xl"
          >
            <source src={getVideoSource()} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 to-transparent pointer-events-none" />

          {!isFullscreen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          )}
        </motion.div>

        <motion.p
          className="text-sm text-violet-100/60 mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("Featdemo")}
        </motion.p>
      </div>
    </section>
  );
}
