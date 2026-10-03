"use client";

import React, { useState } from "react";
import { ListChecks, Copy, Check } from "lucide-react";

interface KeyPointsCardProps {
  keyPoints: string[];
}

export default function KeyPointsCard({ keyPoints }: KeyPointsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const formattedPoints = keyPoints.map((p, i) => `${i + 1}. ${p}`).join("\n");
      await navigator.clipboard.writeText(formattedPoints);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <ListChecks className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
            KEY POINTS
          </h3>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          aria-label="Copy key points to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Key Points</span>
            </>
          )}
        </button>
      </div>

      {/* Points List */}
      <div className="p-5 sm:p-6 space-y-3">
        {keyPoints.map((point, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/60 border border-slate-100/90 hover:bg-blue-50/40 hover:border-blue-100 transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {index + 1}
            </span>
            <p className="text-slate-800 text-sm leading-relaxed font-normal">
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
