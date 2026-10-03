"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextTransformDemo from "@/components/TextTransformDemo";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  BarChart2,
  BookOpen,
  FileText,
  Bookmark,
  Users,
  Code2,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const benefits = [
    {
      number: "01",
      title: "Summarize faster",
      description:
        "Condense dense articles, long reports, and study material into readable essentials in seconds.",
      icon: Zap,
    },
    {
      number: "02",
      title: "Find the important ideas",
      description:
        "Surface the most critical insights into clean, structured takeaways ready for quick review.",
      icon: Target,
    },
    {
      number: "03",
      title: "See exactly how much you reduced",
      description:
        "Transparent original vs. summary word counts and verified reduction percentages on every run.",
      icon: BarChart2,
    },
  ];

  const useCases = [
    {
      title: "Study Material",
      desc: "Textbook chapters, lecture transcripts, and study guides.",
      icon: BookOpen,
    },
    {
      title: "Articles & Essays",
      desc: "Long-form journalism, newsletters, and opinion pieces.",
      icon: FileText,
    },
    {
      title: "Research Papers",
      desc: "Abstracts, academic publications, and literature reviews.",
      icon: Bookmark,
    },
    {
      title: "Technical Documentation",
      desc: "System specs, developer manuals, and API guides.",
      icon: Code2,
    },
    {
      title: "Meeting Notes",
      desc: "Transcripts, stakeholder summaries, and action logs.",
      icon: Users,
    },
    {
      title: "Long Explanations",
      desc: "Lengthy email threads, customer briefs, and proposals.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20 bg-gradient-to-b from-slate-50/70 via-white to-white dark:from-slate-950/60 dark:via-[#090d16] dark:to-[#090d16]">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>AI-powered text summarization</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08] mb-6">
            Too much to read? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 dark:from-blue-400 dark:via-indigo-400 dark:to-white">
              Make it make sense.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Turn long text into concise summaries and clear key ideas in seconds.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/summarize"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-[0.98] text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-slate-900/10 dark:shadow-blue-600/20 transition-all duration-200 cursor-pointer"
            >
              <span>Start Summarizing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              <span>See how it works</span>
            </Link>
          </div>

          {/* Interactive Demonstration with Floating Pop-Up Badges */}
          <div className="relative mt-8">
            {/* Pop-up Floating Badge 1 (Left) */}
            <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-black/40 backdrop-blur-md absolute -top-4 -left-4 z-20 animate-float-slow">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                ⚡ 56% reduced in 1.2s
              </span>
            </div>

            {/* Pop-up Floating Badge 2 (Right) */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-black/40 backdrop-blur-md absolute top-10 -right-4 z-20 animate-float-delayed">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 animate-spin-slow" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                ✨ Key ideas isolated
              </span>
            </div>

            <TextTransformDemo />
          </div>
        </div>
      </section>

      {/* Benefits Section: From reading to understanding */}
      <section className="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/60 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              From reading to understanding.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3">
              Designed around a single focus: giving you clarity without the cognitive fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.number}
                  className="bg-white dark:bg-slate-900/90 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/50">
                      {b.number}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section: Built for anything you need to understand */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#090d16] border-t border-slate-100 dark:border-slate-800/60 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Built for anything you need to understand.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3">
              Whether you are scanning reference material or extracting key ideas from a long report.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="p-6 rounded-xl border border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/70 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                    {uc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-slate-950 dark:bg-black text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Turn what you read into what you remember.
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Paste your text into NoteCraft and extract concise summaries and clear key ideas in seconds.
          </p>
          <Link
            href="/summarize"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer"
          >
            <span>Start Summarizing Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

