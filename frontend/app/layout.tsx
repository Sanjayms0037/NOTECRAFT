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
    url: "https://smart-study-notes-generator.vercel.app",
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
    <html lang="en" className={`${plusJakarta.variable} font-sans scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
