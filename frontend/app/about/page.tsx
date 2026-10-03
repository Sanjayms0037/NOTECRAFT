"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Feather,
  ArrowRight,
  Shield,
  Eye,
  Zap,
  Target,
} from "lucide-react";

export default function AboutPage() {
  const principles = [
    {
      title: "Clarity over volume",
      desc: "More information doesn't mean more knowledge. NoteCraft isolates the core thesis so you can grasp the point immediately.",
      icon: Target,
    },
    {
      title: "Transparent reduction",
      desc: "Every summary is paired with verified word counts and reduction percentages, so you always know the exact compression ratio.",
      icon: Eye,
    },
    {
      title: "Fast, focused utility",
      desc: "No bloated dashboards, complex settings, or endless rabbit holes. We built one tool and engineered it to work cleanly.",
      icon: Zap,
    },
    {
      title: "Privacy conscious",
      desc: "Your content is processed securely server-side for text condensation and is never sold, traded, or used to build tracking profiles.",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center mx-auto mb-6 shadow-xs shadow-blue-500/20">
              <Feather className="w-6 h-6 text-blue-400 dark:text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              ABOUT NOTECRAFT
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-3">
              Less reading. More understanding.
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              We built NoteCraft because modern knowledge workers, researchers, and curious minds spend too much time wading through dense prose to find a few essential insights.
            </p>
          </div>

          {/* Product Story */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed mb-16 space-y-5 text-base sm:text-lg">
            <p>
              Every day, we encounter articles, newsletters, technical manuals, research papers, and meeting notes that run thousands of words longer than they need to be. The result isn’t deeper comprehension—it is cognitive fatigue and skim-reading.
            </p>
            <p>
              <strong>NoteCraft was designed to solve one specific problem:</strong> turning dense, voluminous text into concise, high-fidelity summaries and structured key takeaways in seconds.
            </p>
            <p>
              Under the hood, NoteCraft pairs advanced neural sequence-to-sequence transformers with a deterministic Python text metric engine. When you paste an article, it doesn’t just truncate sentences; it analyzes semantic attention, identifies the central thesis, and produces concise notes you can actually remember.
            </p>
          </div>

          {/* Guiding Principles */}
          <div className="mb-20">
            <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight text-center mb-10">
              Our Guiding Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xs transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-slate-950 dark:text-white text-base mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 dark:bg-black border border-slate-800 text-white text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-3">
              Ready to clear the reading backlog?
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Paste your next article or chapter into NoteCraft and experience the clarity.
            </p>
            <Link
              href="/summarize"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-blue-600/30 transition-colors cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

