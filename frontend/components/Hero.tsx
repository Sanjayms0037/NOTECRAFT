"use client";

import React from "react";
import { Sparkles, Cpu, BookOpenCheck, ArrowDown, Gauge, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-10 md:pt-16 md:pb-14 bg-gradient-to-b from-white to-slate-50/50 border-b border-slate-200/60">
      {/* Subtle radial glow in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-56 bg-blue-100/40 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>POWERED BY GENERATIVE AI</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-5">
          Turn long study material into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
            clear notes.
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
          Paste your study material and use Generative AI to create a concise summary, key points and measurable text reduction.
        </p>

        <p className="text-xs sm:text-sm font-medium text-slate-500 mb-8">
          Generative AI Based Text Summarization using Python &bull; College Mini-Project & Viva Demonstration
        </p>

        {/* Value Proposition Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-700 mb-8">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>Python FastAPI Inference</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <Gauge className="w-4 h-4 text-emerald-600" />
            <span>Precise Word & % Reduction</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <BookOpenCheck className="w-4 h-4 text-indigo-600" />
            <span>Key Revision Bullet Points</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Verifiable Academic Output</span>
          </div>
        </div>

        {/* Scroll CTA Indicator */}
        <div className="flex justify-center">
          <a
            href="#generator"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <span>Jump to Workspace</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
