import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteCraft — Turn What You Read Into What You Remember",
  description:
    "NoteCraft turns long text into concise summaries and clear key ideas in seconds. Powered by intelligent Python AI processing.",
  keywords: [
    "NoteCraft",
    "text summarization",
    "AI summarizer",
    "key ideas extraction",
    "reading assistant",
    "productivity tool",
    "article summarizer",
  ],
  authors: [{ name: "NoteCraft Team" }],
  openGraph: {
    title: "NoteCraft — Turn What You Read Into What You Remember",
    description:
      "NoteCraft turns long text into concise summaries and clear key ideas in seconds.",
    url: "https://notecraft-beta.vercel.app",
    siteName: "NoteCraft",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteCraft — Turn What You Read Into What You Remember",
    description:
      "NoteCraft turns long text into concise summaries and clear key ideas in seconds.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable} font-sans scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-100 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-blue-200 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}

