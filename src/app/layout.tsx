import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { LocaleProvider } from "@/components/LocaleContext";


export const metadata: Metadata = {
  title: "Diffuz.io — Платформа амбасадоров бренда",
  description: "Diffuz.io превращает сотрудников в амбасадоров бренда через активность в соцсетях и креативный шитпостинг.",
  keywords: ["бренд", "амбассадоры", "сотрудники", "корпоративный маркетинг", "Diffuz.io"],
  authors: [{ name: "Diffuz.io", url: "https://diffuz.io" }],
  openGraph: {
    title: "Diffuz.io — Платформа амбасадоров бренда",
    description: "Стань амбасадором бренда вместе с Diffuz.io — используйте соцсети сотрудников для продвижения компании через креативный контент.",
    url: "https://diffuz.io",
    siteName: "Diffuz.io",
    images: [
      {
        url: "https://diffuz.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diffuz.io — платформа амбасадоров",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diffuz.io — Платформа амбасадоров бренда",
    description: "Стань амбасадором бренда с Diffuz.io и продвигай компанию через соцсети сотрудников.",
    images: ["https://diffuz.io/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <Header />
          <main>{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
