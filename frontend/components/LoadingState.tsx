"use client";

import React, { useState, useEffect } from "react";
import {
  BrainCircuit,
  Sparkles,
  Cpu,
  Layers,
  BookOpen,
} from "lucide-react";

const STEPS = [
  {
    title: "Analyzing study material...",
    detail: "Python text preprocessing & token normalization",
    icon: Layers,
  },
  {
    title: "Finding the important ideas...",
    detail: "Hugging Face BART neural attention layers",
    icon: BrainCircuit,
  },
  {
    title: "Generating concise summary & key points...",
    detail: "Synthesizing salient concepts into actionable notes",
    icon: Sparkles,
  },
  {
    title: "Computing reduction metrics...",
    detail: "Python metric engine calculating exact word reduction",
    icon: Cpu,
  },
];

const TIPS = [
  "Tip: Summarizing complex chapters into core bullets boosts retention by up to 40%.",
  "BART is a transformer encoder-decoder trained on bidirectional and auto-regressive tasks.",
  "Python FastAPI enables asynchronous request handling with zero-overhead schemas.",
  "Active recall using generated key points is the most effective revision strategy.",
];

export default function LoadingState() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentTip, setCurrentTip] = useState(TIPS[0]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 1800);

    const tipInterval = setInterval(() => {
      setCurrentTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
    }, 3500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-lg p-6 sm:p-8 flex flex-col justify-between min-h-[460px] relative overflow-hidden">
      {/* Background glowing ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Header Loading Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider text-blue-700">
            Generative AI Engine Active
          </span>
        </div>
        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          Python 3.12 Process
        </span>
      </div>

      {/* Central Visual AI Pipeline Animation */}
      <div className="relative z-10 my-6 py-4 flex flex-col items-center justify-center text-center">
        {/* Pulsing AI Core Circle */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 animate-pulse">
            <BrainCircuit className="w-10 h-10 animate-pulse" />
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-blue-400/40 animate-spin [animation-duration:8s] pointer-events-none" />
        </div>

        {/* Dynamic Status Text */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-1 transition-all duration-300">
          {STEPS[currentStepIndex].title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm transition-all duration-300">
          {STEPS[currentStepIndex].detail}
        </p>

        {/* Multi-stage Progress Stepper */}
        <div className="grid grid-cols-4 gap-2 w-full max-w-md mt-6">
          {STEPS.map((_step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-full h-1.5 rounded-full transition-all duration-500 ${
                    isCompleted
                      ? "bg-emerald-500"
                      : isCurrent
                      ? "bg-blue-600 animate-pulse"
                      : "bg-slate-200"
                  }`}
                />
                <span className="text-[10px] font-medium text-slate-400 mt-1 truncate max-w-full">
                  Step {idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shimmering Skeleton Mock Output */}
      <div className="relative z-10 space-y-2.5 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
        <div className="h-3 w-1/3 bg-slate-200 rounded animate-pulse" />
        <div className="h-3 w-full bg-slate-200/80 rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-slate-200/60 rounded animate-pulse" />
        <div className="h-3 w-4/6 bg-slate-200/50 rounded animate-pulse" />
      </div>

      {/* Rotating Study Tip Footer */}
      <div className="relative z-10 mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
        <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
        <span className="italic truncate">{currentTip}</span>
      </div>
    </div>
  );
}
