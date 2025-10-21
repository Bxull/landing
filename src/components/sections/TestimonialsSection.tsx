"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/components/LocaleContext";

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
  const { t, locale } = useLocale();

  const gradients = [
    "from-fuchsia-600/40 via-violet-500/30",
    "from-cyan-600/40 via-blue-500/30",
    "from-emerald-600/40 via-teal-500/30",
    "from-amber-600/40 via-orange-500/30",
    "from-rose-600/40 via-pink-500/30",
  ];

  const getCategoriesData = () => {
    if (locale === "ru") {
      return [
        {
          number: "01",
          title: "Маркетинг и охват",
          problems: [
            { text: "Дорого и неэффективно продвигать бренд" },
            { text: "Люди больше верят сотрудникам, чем брендам (88%)" },
            { text: "Токсичный цифровой шум вокруг бренда" },
            { text: "Конкуренты забирают повестку в LinkedIn" }
          ]
        },
        {
          number: "02",
          title: "Сотрудники и экспертиза",
          problems: [
            { text: "Сотрудники молчат в соцсетях" },
            { text: "Потеря корпоративной экспертизы" },
            { text: "Сотрудники не чувствуют сопричастности" },
            { text: "Отсутствие «человеческого лица» у проектов" }
          ]
        },
        {
          number: "03",
          title: "HR и бренд работодателя",
          problems: [
            { text: "HR не может показать «живую компанию»" },
            { text: "Кандидаты не верят HR-бренду" },
            { text: "Слабая связка между маркетингом и HR" }
          ]
        },
        {
          number: "04",
          title: "Лидерство и управление",
          problems: [
            { text: "Лидеры компании перегружены" },
            { text: "Падение доверия к топам" }
          ]
        },
        {
          number: "05",
          title: "Операционная эффективность",
          problems: [
            { text: "Нет системности в амбассадорстве" },
            { text: "Команда маркетинга перегружена" },
            { text: "Трудно управлять репутацией в разных странах" },
            { text: "Бренд выглядит «старомодно»" }
          ]
        }
      ];
    } else if (locale === "kz") {
      return [
        {
          number: "01",
          title: "Маркетинг және қамту",
          problems: [
            { text: "Брендті жылжыту қымбат және тиімсіз" },
            { text: "Адамдар брендтерге қарағанда қызметкерлерге көбірек сенеді (88%)" },
            { text: "Бренд айналасында улы цифрлық шу" },
            { text: "Бәсекелестер LinkedIn-де күн тәртібін алып жатыр" }
          ]
        },
        {
          number: "02",
          title: "Қызметкерлер және сараптама",
          problems: [
            { text: "Қызметкерлер әлеуметтік желілерде үнсіз" },
            { text: "Корпоративтік сараптаманың жоғалуы" },
            { text: "Қызметкерлер өздерін қатысты сезінбейді" },
            { text: "Жобаларда «адами бет» жоқ" }
          ]
        },
        {
          number: "03",
          title: "HR және жұмыс беруші бренді",
          problems: [
            { text: "HR «тірі компанияны» көрсете алмайды" },
            { text: "Үміткерлер HR-брендке сенбейді" },
            { text: "Маркетинг пен HR арасында әлсіз байланыс" }
          ]
        },
        {
          number: "04",
          title: "Көшбасшылық және басқару",
          problems: [
            { text: "Компания көшбасшылары шамадан тыс жүктелген" },
            { text: "Топ-менеджерлерге сенімнің төмендеуі" }
          ]
        },
        {
          number: "05",
          title: "Операциялық тиімділік",
          problems: [
            { text: "Елшілікте жүйелілік жоқ" },
            { text: "Маркетинг тобы шамадан тыс жүктелген" },
            { text: "Әр түрлі елдерде беделді басқару қиын" },
            { text: "Бренд «ескірген» көрінеді" }
          ]
        }
      ];
    } else {
      // English
      return [
        {
          number: "01",
          title: "Marketing and Reach",
          problems: [
            { text: "Expensive and ineffective brand promotion" },
            { text: "People trust employees more than brands (88%)" },
            { text: "Toxic digital noise around the brand" },
            { text: "Competitors are taking over the agenda on LinkedIn" }
          ]
        },
        {
          number: "02",
          title: "Employees and Expertise",
          problems: [
            { text: "Employees are silent on social media" },
            { text: "Loss of corporate expertise" },
            { text: "Employees don't feel involved" },
            { text: "Projects lack a 'human face'" }
          ]
        },
        {
          number: "03",
          title: "HR and Employer Brand",
          problems: [
            { text: "HR can't show a 'living company'" },
            { text: "Candidates don't trust the HR brand" },
            { text: "Weak connection between marketing and HR" }
          ]
        },
        {
          number: "04",
          title: "Leadership and Management",
          problems: [
            { text: "Company leaders are overloaded" },
            { text: "Declining trust in top management" }
          ]
        },
        {
          number: "05",
          title: "Operational Efficiency",
          problems: [
            { text: "No systematic approach to ambassadorship" },
            { text: "Marketing team is overloaded" },
            { text: "Hard to manage reputation across countries" },
            { text: "Brand looks 'outdated'" }
          ]
        }
      ];
    }
  };

  const categories: Category[] = getCategoriesData().map((cat, idx) => ({
    ...cat,
    gradient: gradients[idx],
  }));

  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAutoRotation = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrent(prev => (prev === categories.length - 1 ? 0 : prev + 1));
        }
      }, 2500);
    };

    startAutoRotation();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, categories.length]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black text-white py-20 px-6"
    >
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

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:sticky lg:top-32"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white/90">
            {t("problemsMainTitle")}
          </h2>
        </motion.div>

        <div className="relative min-h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
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

              <div className="space-y-4">
                {categories[current].problems.map((problem, pIndex) => (
                  <motion.div
                    key={pIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: pIndex * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <X className="w-5 h-5 text-gray-600 group-hover:text-fuchsia-400 transition-colors duration-300" />
                    </div>

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
              setCurrent(i);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 2500);
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label={`Go to category ${i + 1}`}
          />
        ))}
      </div>

      <AnimatePresence>
        {current === categories.length - 1 && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-4xl md:text-5xl font-black tracking-tight text-white z-20"
          >
            {t("problemsFinalMessage")}
          </motion.h3>
        )}
      </AnimatePresence>
    </section>
  );
}
