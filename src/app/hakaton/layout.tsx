import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Хакатон — Генерация постов в стиле автора | Diffuz.io",
    description:
        "Хакатон для старших классов: анализ стиля, генерация текста, работа с ИИ. Участникам выдаются датасеты реальных авторов в соцсетях. Призы и публикации лучших работ.",
    keywords: [
        "хакатон",
        "ИИ хакатон",
        "AI hackathon",
        "школьный хакатон",
        "генерация текста",
        "анализ стиля",
        "ML",
        "machine learning",
        "Diffuz.io",
    ],
    authors: [{ name: "Diffuz.io", url: "https://diffuz.io" }],
    openGraph: {
        title: "AI Хакатон — Создай модель, которая пишет в стиле автора",
        description:
            "Хакатон для школьников (РФМШ, НИШ): анализ стиля и генерация текста с помощью ИИ. Готовый датасет, задания, призы.",
        url: "https://diffuz.io/hakaton",
        siteName: "Diffuz.io Hackathon",
    }
};

export default function HakatonLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main>{children}</main>
    );
}