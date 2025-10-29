"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "en" | "ru" | "kz";
type Translations = Record<string, string>;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translationCache: Record<Locale, Translations> = {
  en: {},
  ru: {},
  kz: {}
};

const criticalTranslations: Record<Locale, Translations> = {
  en: {
    "Splitbutton": "Launch App",
    "SplittitleLine1": "Decentralized AI",
    "SplittitleLine2": "Inference Platform",
    "SplittitleHighlight": "Powered by You",
    "Splitsubtitle": "Join the decentralized AI revolution..."
  },
  ru: {
    "Splitbutton": "Запустить",
    "SplittitleLine1": "Децентрализованный ИИ",
    "SplittitleLine2": "Платформа для",
    "SplittitleHighlight": "Инференса",
    "Splitsubtitle": "Присоединяйтесь к революции..."
  },
  kz: {
    "Splitbutton": "Істуді іске қосу",
    "SplittitleLine1": "Орталықсыздандырылған ЖС",
    "SplittitleLine2": "Платформасы",
    "SplittitleHighlight": "Сізбен жұмыс істейді",
    "Splitsubtitle": "Орталықсыздандырылған ЖС революциясына қосылыңыз..."
  }
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale;
      return savedLocale || "en";
    }
    return "en";
  });

  const [translations, setTranslations] = useState<Translations>(() => ({
    ...criticalTranslations[locale],
    ...translationCache[locale]
  }));

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

  useEffect(() => {
    let mounted = true;

    const loadTranslations = async () => {
      if (Object.keys(translationCache[locale]).length > 0) {
        setTranslations({
          ...criticalTranslations[locale],
          ...translationCache[locale]
        });
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`/locales/locale.${locale}.json?t=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to load translations');

        const data = await response.json();

        if (mounted) {
          translationCache[locale] = data;
          setTranslations({
            ...criticalTranslations[locale],
            ...data
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        if (mounted) {
          setTranslations(criticalTranslations[locale]);
          setIsLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      mounted = false;
    };
  }, [locale]);

  const t = (key: string) => translations[key] || key;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
};