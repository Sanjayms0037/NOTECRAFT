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
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20 bg-gradient-to-b from-slate-50/70 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI-powered text summarization</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] mb-6">
            Too much to read? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900">
              Make it make sense.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 leading-relaxed mb-8">
            Turn long text into concise summaries and clear key ideas in seconds.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/summarize"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-blue-600 active:scale-[0.98] text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-slate-900/10 transition-all duration-200 cursor-pointer"
            >
              <span>Start Summarizing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              <span>See how it works</span>
            </Link>
          </div>

          {/* Interactive Demonstration */}
          <TextTransformDemo />
        </div>
      </section>

      {/* Benefits Section: From reading to understanding */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              From reading to understanding.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-3">
              Designed around a single focus: giving you clarity without the cognitive fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.number}
                  className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 relative group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      {b.number}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section: Built for anything you need to understand */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Built for anything you need to understand.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-3">
              Whether you are scanning reference material or extracting key ideas from a long report.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="p-6 rounded-xl border border-slate-200/70 hover:border-slate-300 bg-white hover:bg-slate-50/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">
                    {uc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Turn what you read into what you remember.
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Paste your text into NoteCraft and extract concise summaries and clear key ideas in seconds.
          </p>
          <Link
            href="/summarize"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-blue-500/20 transition-all duration-200 cursor-pointer"
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
