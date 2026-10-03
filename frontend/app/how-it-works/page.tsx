"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ClipboardList,
  Cpu,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Paste your text",
      description:
        "Drop in long-form text from articles, research papers, lecture notes, meeting transcripts, or documentation. No complex formatting required.",
      icon: ClipboardList,
    },
    {
      num: "02",
      title: "NoteCraft reads it",
      description:
        "Our backend engine sanitizes the input, handles whitespace, and maps linguistic boundaries to prepare the content for deep comprehension.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "AI finds the essential ideas",
      description:
        "Neural attention layers evaluate relationships between clauses, isolating primary claims and contextual evidence while filtering out verbal filler.",
      icon: Sparkles,
    },
    {
      num: "04",
      title: "Your concise notes appear",
      description:
        "Within seconds, you receive a concise summary, 3–5 high-yield key ideas, and an exact word reduction breakdown.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
              The Process
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-3">
              How NoteCraft Works
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              From dense, overwhelming reading material to clear, actionable essentials in four transparent steps.
            </p>
          </div>

          {/* Step-by-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="p-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-3 py-1 rounded-md border border-blue-100 dark:border-blue-900/50">
                      Step {s.num}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Before & After Comparison Showcase */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 mb-20 transition-colors">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                The NoteCraft Difference
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                Preserving core information while cutting the fluff by more than half.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2 font-mono">
                    BEFORE: Uncondensed Material (240 words)
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-6">
                    Autonomous vehicular networks rely upon heterogeneous sensors including LiDAR, radar, high-definition optical cameras, and ultrasonic rangefinders to synthesize real-time point clouds of surrounding dynamic environments. These multi-modal data streams are ingested by embedded inference hardware running convolutional networks that classify road obstacles, estimate relative velocity, and project collision trajectories within sub-50 millisecond control loops...
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-between">
                  <span>Reading time: ~1.5 min</span>
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Unfiltered</span>
                </div>
              </div>

              {/* After */}
              <div className="p-5 rounded-xl bg-white dark:bg-slate-900/90 border-2 border-blue-600 dark:border-blue-500 shadow-md shadow-blue-500/10 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2 font-mono">
                    AFTER: NoteCraft Summary (62 words)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                    Autonomous vehicles integrate multi-modal sensors—LiDAR, radar, and cameras—processed through sub-50ms inference loops to classify obstacles and prevent collisions. Standardized sensor fusion and redundant compute failovers ensure navigational safety across volatile road conditions.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center justify-between">
                  <span>Reading time: ~20 sec</span>
                  <span className="bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    74.2% Reduced
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link
              href="/summarize"
              className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-slate-900/10 dark:shadow-blue-600/20 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Try NoteCraft Yourself</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

