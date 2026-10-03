"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Check, Play, RotateCcw } from "lucide-react";

export default function TextTransformDemo() {
  const [stage, setStage] = useState<"long" | "condensing" | "summary">("long");
  const [progress, setProgress] = useState(0);

  const handleStartTransform = () => {
    setStage("condensing");
    setProgress(0);
  };

  const handleReset = () => {
    setStage("long");
    setProgress(0);
  };

  useEffect(() => {
    if (stage === "condensing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("summary");
            return 100;
          }
          return prev + 12;
        });
      }, 140);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-100 overflow-hidden">
      {/* Demo Window Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="w-3 h-3 rounded-full bg-slate-300" />
          <span className="text-xs font-semibold text-slate-500 ml-2 font-mono">
            Interactive Transformation Demo
          </span>
        </div>

        <div className="flex items-center gap-2">
          {stage === "summary" ? (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset Demo</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStartTransform}
              disabled={stage === "condensing"}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-xs cursor-pointer disabled:opacity-60"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{stage === "condensing" ? "Condensing..." : "See Transformation"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Demo Body */}
      <div className="p-6 sm:p-8 relative min-h-[300px] flex flex-col justify-center">
        {/* Progress Bar during condensation */}
        {stage === "condensing" && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {stage === "long" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">DENSE INPUT MATERIAL</span>
              <span>184 words &bull; ~1.2 min read</span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Global supply chain architectures have increasingly migrated toward distributed cloud orchestration systems to handle peak variability across maritime routing, automated warehousing, and cross-border customs fulfillment. Traditional monolithic scheduling tools often struggle with real-time exception handling during volatile geopolitical or extreme climate events, resulting in unexpected port congestion and cascading production halts. Modern resilient networks address these bottlenecks by deploying asynchronous event streams and predictive telemetry across freight hubs, giving logistics planners immediate visibility into supply deviations. Concurrently, rigorous supplier audit protocols, localized redundant warehousing buffers, and multi-carrier contracts allow enterprises to absorb localized disruptions without compromising customer delivery SLAs or incurring punitive demurrage fees.
            </p>
          </div>
        )}

        {stage === "condensing" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-blue-600 font-mono pb-2 border-b border-blue-100">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                EXTRACTING ESSENTIAL CONCEPTS ({progress}%)
              </span>
              <span>Distilling core thesis...</span>
            </div>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed filter blur-[0.6px] transition-all">
              <span className="text-blue-700 font-semibold bg-blue-50 px-1 rounded transition-colors">
                Global supply chains are migrating toward distributed cloud systems
              </span>{" "}
              to eliminate bottlenecks.{" "}
              <span className="opacity-30">
                Traditional monolithic scheduling tools often struggle with real-time exception handling during volatile geopolitical events, resulting in unexpected port congestion.
              </span>{" "}
              <span className="text-blue-700 font-semibold bg-blue-50 px-1 rounded transition-colors">
                Modern networks deploy asynchronous telemetry and localized buffers
              </span>{" "}
              <span className="opacity-30">
                to absorb disruptions without compromising delivery SLAs.
              </span>
            </p>
          </div>
        )}

        {stage === "summary" && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-emerald-100 font-mono">
              <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                CONDENSED TO ESSENTIALS
              </span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                71.7% text reduced &bull; 52 words
              </span>
            </div>

            {/* Generated Summary Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Summary
              </h4>
              <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
                Global supply chains are transitioning to distributed cloud systems to eliminate single points of failure. By combining asynchronous telemetry with localized redundant buffers, modern enterprises absorb geopolitical and climate disruptions while preserving delivery reliability.
              </p>
            </div>

            {/* Key Ideas */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Ideas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-slate-700">
                  <strong>1. Modern Migration:</strong> Shift from monolithic tools to cloud orchestration for volatile logistics.
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 text-slate-700">
                  <strong>2. Resilience Strategy:</strong> Telemetry and redundant regional buffers protect customer delivery SLAs.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Demo Footer Metric Indicator */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span className="font-medium">
          {stage === "summary" ? "Transformed in 0.8s" : "Click 'See Transformation' to preview NoteCraft in action"}
        </span>
        <span className="font-semibold text-slate-700">
          Paste &rarr; Generate &rarr; Understand
        </span>
      </div>
    </div>
  );
}
