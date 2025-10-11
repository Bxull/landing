"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";

interface Problem {
  text: string;
}

interface Category {
  number: string;
  title: string;
  problems: Problem[];
  gradient: string;
}

export default function ProblemsSection() {
  const categories: Category[] = [
    {
      number: "01",
      title: "Маркетинг и охват",
      gradient: "from-fuchsia-600/40 via-violet-500/30",
      problems: [
        { text: "Дорого и неэффективно продвигать бренд" },
        { text: "Люди больше верят сотрудникам, чем брендам (88%)" },
        { text: "Токсичный цифровой шум вокруг бренда" },
        { text: "Конкуренты забирают повестку в LinkedIn" },
      ],
    },
    {
      number: "02",
      title: "Сотрудники и экспертиза",
      gradient: "from-cyan-600/40 via-blue-500/30",
      problems: [
        { text: "Сотрудники молчат в соцсетях" },
        { text: "Потеря корпоративной экспертизы" },
        { text: "Сотрудники не чувствуют сопричастности" },
        { text: "Отсутствие «человеческого лица» у проектов" },
      ],
    },
    {
      number: "03",
      title: "HR и бренд работодателя",
      gradient: "from-emerald-600/40 via-teal-500/30",
      problems: [
        { text: "HR не может показать «живую компанию»" },
        { text: "Кандидаты не верят HR-бренду" },
        { text: "Слабая связка между маркетингом и HR" },
      ],
    },
    {
      number: "04",
      title: "Лидерство и управление",
      gradient: "from-amber-600/40 via-orange-500/30",
      problems: [
        { text: "Лидеры компании перегружены" },
        { text: "Падение доверия к топам" },
      ],
    },
    {
      number: "05",
      title: "Операционная эффективность",
      gradient: "from-rose-600/40 via-pink-500/30",
      problems: [
        { text: "Нет системности в амбассадорстве" },
        { text: "Команда маркетинга перегружена" },
        { text: "Трудно управлять репутацией в разных странах" },
        { text: "Бренд выглядит «старомодно»" },
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  const animating = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
          setLocked(true);
        } else if (entry.intersectionRatio < 0.3) {
          setLocked(false);
        }
      },
      { threshold: [0, 0.3, 0.8, 1] }
    );

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!locked) return;

    const handleScroll = (e: WheelEvent) => {
      const delta = e.deltaY;

      // Разблокировать скролл если на первой карточке и скроллим вверх
      if (delta < 0 && current === 0) {
        setLocked(false);
        return;
      }

      // Разблокировать скролл если на последней карточке и скроллим вниз
      if (delta > 0 && current === categories.length - 1) {
        setLocked(false);
        return;
      }

      // Блокируем нативный скролл
      e.preventDefault();

      if (animating.current) return;
      animating.current = true;

      if (delta > 0 && current < categories.length - 1) {
        setCurrent((p) => p + 1);
      } else if (delta < 0 && current > 0) {
        setCurrent((p) => p - 1);
      }

      setTimeout(() => (animating.current = false), 700);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [locked, current, categories.length]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black text-white py-20 px-6"
    >
      {/* Animated background gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${categories[current].gradient} to-transparent blur-3xl opacity-30`}
        />
      </AnimatePresence>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        {/* Left side - Question (sticky) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:sticky lg:top-32"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white/90">
            старые способы коммуникации больше не работают
          </h2>
        </motion.div>

        {/* Right side - Single Category Card */}
        <div className="relative min-h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              {/* Category Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 leading-tight">
                    {categories[current].title}
                  </h3>
                </div>
                <span className="text-6xl md:text-7xl font-black text-white/10">
                  {categories[current].number}
                </span>
              </div>

              {/* Problems List */}
              <div className="space-y-4">
                {categories[current].problems.map((problem, pIndex) => (
                  <motion.div
                    key={pIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: pIndex * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    {/* X Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <X className="w-5 h-5 text-gray-600 group-hover:text-fuchsia-400 transition-colors duration-300" />
                    </div>

                    {/* Problem Text */}
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {problem.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {categories.map((_, i) => (
          <motion.button
            key={i}
            animate={{
              scale: current === i ? 1.4 : 1,
              opacity: current === i ? 1 : 0.4,
            }}
            className="w-2.5 h-2.5 rounded-full bg-white cursor-pointer transition-all"
            onClick={() => {
              if (!animating.current) {
                setCurrent(i);
              }
            }}
            aria-label={`Go to category ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <AnimatePresence>
        {current === categories.length - 1 && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-4xl md:text-5xl font-black tracking-tight text-white z-20"
          >
            мы меняем это
          </motion.h3>
        )}
      </AnimatePresence>
    </section>
  );
}