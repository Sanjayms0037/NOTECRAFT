"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StudyInput from "@/components/StudyInput";
import SummaryCard from "@/components/SummaryCard";
import KeyPointsCard from "@/components/KeyPointsCard";
import StatsCards from "@/components/StatsCards";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import Footer from "@/components/Footer";
import { summarizeText, SummarizeResponse } from "@/lib/api";
import {
  BookOpen,
  Terminal,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SummarizeResponse | null>(null);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please paste or type study material before generating notes.");
      return;
    }

    const words = inputText.trim().split(/\s+/).filter(Boolean);
    if (words.length < 5) {
      setError("Please provide at least 5 words for a meaningful summary.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = await summarizeText(inputText);
      setResults(data);

      // Trigger celebratory confetti on success
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#2563eb", "#3b82f6", "#10b981", "#f59e0b"],
        });
      } catch {
        // Confetti quiet fail
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "We couldn't generate your notes right now. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Main Study Workspace Section */}
      <main id="generator" className="py-10 sm:py-14 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>AI Study Workspace</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Interactive
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Input reference study paragraphs on the left; view generated notes and Python metrics on the right.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <Terminal className="w-3.5 h-3.5 text-blue-600" />
              <span>FastAPI &bull; Transformers</span>
            </div>
          </div>

          {/* Two-Column Responsive Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* LEFT COLUMN: Study Material Input */}
            <div className="flex flex-col min-h-[500px]">
              <StudyInput
                value={inputText}
                onChange={(val) => {
                  setInputText(val);
                  if (error) setError(null);
                }}
                onGenerate={handleGenerate}
                onClear={handleClear}
                isLoading={isLoading}
              />
            </div>

            {/* RIGHT COLUMN: Generated Notes / Loading / Initial State */}
            <div className="flex flex-col min-h-[500px]">
              {isLoading ? (
                /* Dynamic Loading State */
                <LoadingState />
              ) : error ? (
                /* User-Friendly Error State */
                <ErrorState message={error} onRetry={handleGenerate} />
              ) : results ? (
                /* Generated Notes Results Dashboard */
                <div className="space-y-5 animate-in fade-in duration-300">
                  {/* Summary Card */}
                  <SummaryCard summary={results.summary} />

                  {/* Key Points Card */}
                  <KeyPointsCard keyPoints={results.key_points} />

                  {/* Python Statistics & Metrics */}
                  <StatsCards
                    originalWords={results.original_word_count}
                    summaryWords={results.summary_word_count}
                    reductionPercentage={results.reduction_percentage}
                    model={results.model}
                    summaryText={results.summary}
                    keyPoints={results.key_points}
                  />
                </div>
              ) : (
                /* Initial Idle State */
                <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200/90 p-8 sm:p-12 flex flex-col items-center justify-center text-center flex-1 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-xs">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1.5">
                    Your notes will appear here.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
                    Paste your study paragraph on the left or select a sample topic, then click{" "}
                    <strong>Generate Notes</strong> to run the Python AI pipeline.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                      &bull; Concise Summary
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                      &bull; Actionable Key Points
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                      &bull; Word Reduction %
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-14 sm:py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Pipeline Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              How the AI Note Generator Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From raw academic text to structured revision cards in 4 engineered stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 relative">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-4 shadow-sm">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                Input & Preprocessing
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Python cleans unicode whitespace, validates word count thresholds, and normalizes sentence boundaries.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 relative">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-4 shadow-sm">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                Transformer Inference
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hugging Face BART large model analyzes cross-attention weights to condense paragraphs without losing core semantics.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 relative">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-4 shadow-sm">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                Key Points Extraction
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Salient concept extraction identifies the highest-yield factual takeaways and formats them into numbered revision points.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 relative">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-4 shadow-sm">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                Python Metric Engine
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Python computes original words, summary words, and exact reduction percentage with zero division protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE SECTION */}
      <section id="architecture" className="py-14 sm:py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
              System Design & Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Full-Stack System Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              End-to-end communication from Next.js client to Python AI inference engine.
            </p>
          </div>

          {/* Visual Architecture Flow Diagram */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto shadow-2xl">
            <div className="text-emerald-400 mb-2 font-semibold">{"// System Architecture Flow Diagram"}</div>
            <pre className="text-slate-300">
{`USER
 │
 ▼
NEXT.JS FRONTEND (React + TypeScript + Tailwind CSS)
 │
 │  HTTP POST /api/summarize  { "text": "..." }
 ▼
PYTHON FASTAPI BACKEND (main.py + Pydantic Schemas)
 │
 ├──▶ TEXT PREPROCESSING (text_utils.py: clean_text)
 │
 ├──▶ HUGGING FACE TRANSFORMERS (summarizer.py: pipeline)
 │     │
 │     ▼
 │    PRETRAINED AI MODEL (facebook/bart-large-cnn)
 │     │
 │     ▼
 │    SUMMARY + KEY POINTS GENERATION
 │
 ├──▶ PYTHON METRIC ENGINE (text_utils.py)
 │     ├── count_words(original_text)
 │     ├── count_words(summary_text)
 │     └── calculate_reduction(orig, summ)
 │
 ▼
JSON RESPONSE { summary, key_points, word_counts, reduction_percentage, model }
 │
 ▼
NEXT.JS FRONTEND (Results Dashboard)
 │
 ▼
INTERACTIVE RESULTS DISPLAY (SummaryCard + KeyPointsCard + StatsCards)`}
            </pre>
          </div>
        </div>
      </section>

      {/* ABOUT & VIVA SECTION */}
      <section id="about" className="py-14 sm:py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Academic Demonstration
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-4">
                Why Python as the AI & Backend Core?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Python is the industry standard for Artificial Intelligence, Natural Language Processing, and scientific computation. In this mini-project, Python is strictly responsible for:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Exposing high-performance asynchronous API endpoints via FastAPI.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Running Hugging Face Transformers model inference.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Computing word counts, text sanitization, and reduction percentages.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Validating data payloads via Pydantic models with robust exception safety.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 border border-blue-100 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Viva Examination Highlights</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <strong className="text-slate-900 block mb-1">Pretrained Model Used:</strong>
                  <code>facebook/bart-large-cnn</code> (Sequence-to-sequence bidirectional autoregressive transformer).
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <strong className="text-slate-900 block mb-1">Reduction Metric Formula:</strong>
                  <code>((original_words - summary_words) / original_words) * 100</code> rounded to 1 decimal place.
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <strong className="text-slate-900 block mb-1">Architectural Separation:</strong>
                  Next.js is strictly for UI/UX interaction; all generative AI and metric calculations reside in Python.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
