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
  title: "Smart Study Notes Generator | AI Text Summarization & Key Points",
  description:
    "Turn long study material into concise summaries, key revision points, and measurable word reduction metrics powered by Python, FastAPI, and Hugging Face Transformers.",
  keywords: [
    "AI Study Notes",
    "Text Summarization",
    "Generative AI",
    "Python FastAPI",
    "Hugging Face",
    "College Mini Project",
    "Student Productivity",
  ],
  authors: [{ name: "Smart Study Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} font-sans scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
