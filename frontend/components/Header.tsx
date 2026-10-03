"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Terminal, ChevronRight } from "lucide-react";

export default function Header() {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    // Quick non-blocking ping to health check
    fetch("/health")
      .then((res) => (res.ok ? setBackendOnline(true) : setBackendOnline(false)))
      .catch(() => setBackendOnline(false));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                SMART STUDY
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/60">
                GENERATIVE AI TOOL
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Terminal className="w-3 h-3 text-emerald-600" />
              <span>Python 3.12 + FastAPI + Hugging Face</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a
            href="#generator"
            className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
          >
            Generator
          </a>
          <a
            href="#how-it-works"
            className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
          >
            How It Works
          </a>
          <a
            href="#architecture"
            className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
          >
            Architecture
          </a>
          <a
            href="#about"
            className="hover:text-blue-600 transition-colors py-1 cursor-pointer"
          >
            About
          </a>
        </nav>

        {/* Action / CTA & Status */}
        <div className="flex items-center gap-3">
          {backendOnline !== null && (
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                backendOnline
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
              title={backendOnline ? "Python API connected" : "Connecting to Python API..."}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span>{backendOnline ? "Python API Active" : "API Ready"}</span>
            </div>
          )}

          <a
            href="#generator"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
          >
            <span>Try It</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
