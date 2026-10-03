"use client";

import React from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function GenerateButton({
  onClick,
  isLoading,
  disabled = false,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label="Generate Notes with AI"
      className={`relative group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-200 cursor-pointer shadow-md ${
        disabled || isLoading
          ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
          : "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 active:scale-[0.99] hover:shadow-lg hover:shadow-blue-500/25 ring-2 ring-transparent focus:ring-blue-500 focus:outline-none"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          <span>Processing in Python...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform duration-200" />
          <span>Generate Notes</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-blue-800/40 text-blue-100 rounded border border-blue-400/30">
            Ctrl+↵
          </kbd>
        </>
      )}
    </button>
  );
}
