"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import { summarizeText, SummarizeResponse } from "@/lib/api";
import { SAMPLE_TOPICS, SampleTopic } from "@/lib/sampleData";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Download,
  Volume2,
  VolumeX,
  FileText,
  BookOpen,
  AlertCircle,
} from "lucide-react";

export default function SummarizePage() {
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SummarizeResponse | null>(null);

  // Copy feedback states
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedKeyIdeas, setCopiedKeyIdeas] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Lightweight progress step messages
  const progressMessages = [
    "Reading your text...",
    "Finding the important ideas...",
    "Condensing the content...",
    "Preparing your notes...",
  ];
  const [progressIndex, setProgressIndex] = useState(0);

  // Live counts
  const wordCount = inputText.trim()
    ? inputText.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = inputText.length;

  useEffect(() => {
    if (!isLoading) return;
    const timer = setInterval(() => {
      setProgressIndex((prev) => (prev + 1) % progressMessages.length);
    }, 1600);
    return () => clearInterval(timer);
  }, [isLoading, progressMessages.length]);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please paste some text before generating a summary.");
      return;
    }
    if (wordCount < 5) {
      setError("Please provide at least 5 words so NoteCraft can extract meaningful ideas.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = await summarizeText(inputText);
      setResults(data);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "We couldn't generate your summary right now. Try again in a moment.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setResults(null);
    setError(null);
    if (isSpeaking && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSelectSample = (sample: SampleTopic) => {
    setInputText(sample.text);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (wordCount >= 5 && !isLoading) {
        handleGenerate();
      }
    }
  };

  const handleCopySummary = async () => {
    if (!results) return;
    try {
      await navigator.clipboard.writeText(results.summary);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyKeyIdeas = async () => {
    if (!results) return;
    try {
      const formatted = results.key_points
        .map((p, i) => `${i + 1}. ${p}`)
        .join("\n");
      await navigator.clipboard.writeText(formatted);
      setCopiedKeyIdeas(true);
      setTimeout(() => setCopiedKeyIdeas(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleToggleAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !results) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(results.summary);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleDownloadNotes = () => {
    if (!results) return;
    const content = `NOTECRAFT SUMMARY\n\n` +
      `Summary:\n${results.summary}\n\n` +
      `Key Ideas:\n${results.key_points.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\n` +
      `Stats:\nOriginal: ${results.original_word_count} words | Summary: ${results.summary_word_count} words | Reduced: ${results.reduction_percentage}%\n\n` +
      `---\nGenerated with NoteCraft (https://smart-study-notes-generator.vercel.app)\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NoteCraft_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Workspace Title */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Make your text easier to understand.
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mt-2.5">
              Paste your content below and let NoteCraft extract the essentials.
            </p>
          </div>

          {/* Two-Column Responsive Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LEFT: Input Area */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col h-full overflow-hidden">
              {/* Header Toolbar */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Input Text</span>
                </span>

                {/* Sample Selector */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 hidden sm:inline">Try sample:</span>
                  {SAMPLE_TOPICS.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleSelectSample(topic)}
                      className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-slate-300 text-xs font-medium transition-colors cursor-pointer"
                    >
                      {topic.title.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="p-5 flex-1 flex flex-col">
                <textarea
                  id="notecraft-text-input"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    if (error) setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder="Paste your text here..."
                  rows={13}
                  className="w-full flex-1 min-h-[300px] p-4 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base leading-relaxed resize-none transition-all"
                />

                {/* Live Count Bar */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>
                      Words: <strong className="text-slate-700">{wordCount}</strong>
                    </span>
                    <span>&bull;</span>
                    <span>
                      Characters: <strong className="text-slate-700">{charCount}</strong>
                    </span>
                  </div>

                  <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
                    Ctrl + Enter to run
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-5 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isLoading || (!inputText && wordCount === 0)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-30 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isLoading || wordCount < 5}
                  className={`relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-200 cursor-pointer shadow-sm ${
                    isLoading || wordCount < 5
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-slate-900 hover:bg-blue-600 active:scale-[0.98] shadow-md shadow-slate-900/10"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>{progressMessages[progressIndex]}</span>
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-blue-300" />
                      <span>Generate Summary</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT: Results Area */}
            <div className="flex flex-col min-h-[460px]">
              {isLoading ? (
                /* Lightweight Progress State */
                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-[460px]">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 animate-pulse">
                    <Sparkles className="w-6 h-6 animate-spin [animation-duration:6s]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {progressMessages[progressIndex]}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    NoteCraft is reading your text and extracting essential takeaways.
                  </p>
                  <div className="w-48 h-1 bg-slate-100 rounded-full mt-6 overflow-hidden">
                    <div className="h-full bg-blue-600 animate-shimmer" />
                  </div>
                </div>
              ) : error ? (
                /* Polished Error State */
                <div className="bg-red-50/70 rounded-2xl border border-red-200/80 p-8 flex flex-col items-center justify-center text-center min-h-[460px]">
                  <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-red-950 mb-1">
                    Notice
                  </h3>
                  <p className="text-xs sm:text-sm text-red-800 max-w-sm mb-6 leading-relaxed">
                    {error}
                  </p>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Try again</span>
                  </button>
                </div>
              ) : results ? (
                /* Generated Notes Results */
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* SECTION 1: YOUR SUMMARY */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        YOUR SUMMARY
                      </span>
                      <div className="flex items-center gap-2">
                        {typeof window !== "undefined" && "speechSynthesis" in window && (
                          <button
                            type="button"
                            onClick={handleToggleAudio}
                            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                              isSpeaking
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-slate-600 hover:text-blue-600 border-slate-200"
                            }`}
                            title={isSpeaking ? "Stop audio" : "Listen aloud"}
                          >
                            {isSpeaking ? (
                              <VolumeX className="w-3.5 h-3.5" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {copiedSummary ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copy Summary</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                        {results.summary}
                      </p>
                    </div>
                  </div>

                  {/* SECTION 2: KEY IDEAS */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                    <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        KEY IDEAS
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyKeyIdeas}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {copiedKeyIdeas ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Key Ideas</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-5 sm:p-6 space-y-2.5">
                      {results.key_points.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100/90"
                          style={{
                            animationDelay: `${idx * 100}ms`,
                          }}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-slate-800 text-sm leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: TEXT REDUCTION */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
                      <span>TEXT REDUCTION</span>
                      <span className="text-[11px] font-mono text-slate-400 font-normal">
                        Verified by Python Engine
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          ORIGINAL
                        </span>
                        <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                          <AnimatedCounter target={results.original_word_count} />
                        </div>
                        <span className="text-[11px] text-slate-400">words</span>
                      </div>

                      <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          SUMMARY
                        </span>
                        <div className="text-xl sm:text-2xl font-extrabold text-blue-600">
                          <AnimatedCounter target={results.summary_word_count} />
                        </div>
                        <span className="text-[11px] text-slate-400">words</span>
                      </div>

                      <div className="p-3 sm:p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                          REDUCED
                        </span>
                        <div className="text-xl sm:text-2xl font-extrabold text-emerald-700">
                          <AnimatedCounter
                            target={results.reduction_percentage}
                            decimals={1}
                            suffix="%"
                          />
                        </div>
                        <span className="text-[11px] text-emerald-600 font-semibold">shorter</span>
                      </div>
                    </div>

                    {/* Result Footer Toolbar */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <button
                        type="button"
                        onClick={handleClear}
                        className="text-slate-500 hover:text-slate-900 font-medium cursor-pointer"
                      >
                        Start Over
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleDownloadNotes}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Notes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Initial Idle State */
                <div className="bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[460px]">
                  <div className="w-12 h-12 rounded-xl bg-white text-slate-400 border border-slate-200 flex items-center justify-center mb-3.5 shadow-2xs">
                    <BookOpen className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    Your notes will appear here.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                    Paste content into the box on the left, then click <strong>Generate Summary</strong> to condense it.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
