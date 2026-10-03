"use client";

import React, { useState } from "react";
import {
  FileText,
  RotateCcw,
  ClipboardPaste,
  BookOpen,
  Check,
  Clock,
} from "lucide-react";
import GenerateButton from "./GenerateButton";
import { SAMPLE_TOPICS, SampleTopic } from "@/lib/sampleData";

interface StudyInputProps {
  value: string;
  onChange: (val: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function StudyInput({
  value,
  onChange,
  onGenerate,
  onClear,
  isLoading,
}: StudyInputProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [justPasted, setJustPasted] = useState(false);

  // Compute live metrics
  const wordCount = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = value.length;
  // Estimated reading time at ~200 words per minute
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleSelectSample = (sample: SampleTopic) => {
    setSelectedTopicId(sample.id);
    onChange(sample.text);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
        setJustPasted(true);
        setTimeout(() => setJustPasted(false), 2000);
      }
    } catch {
      // Clipboard access denied or not supported
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (wordCount >= 5 && !isLoading) {
        onGenerate();
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-slate-300">
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base">
              Study Material
            </h2>
            <p className="text-xs text-slate-500">
              Paste or select reference content to summarize
            </p>
          </div>
        </div>

        {/* Quick Paste Button */}
        <button
          type="button"
          onClick={handlePaste}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          title="Paste from clipboard"
        >
          {justPasted ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Pasted!</span>
            </>
          ) : (
            <>
              <ClipboardPaste className="w-3.5 h-3.5" />
              <span>Paste</span>
            </>
          )}
        </button>
      </div>

      {/* Sample Selector Toolbar */}
      <div className="px-5 py-2.5 bg-blue-50/40 border-b border-slate-100 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-500 flex items-center gap-1 mr-1">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Try Sample:</span>
        </span>
        {SAMPLE_TOPICS.map((topic) => {
          const isSelected = selectedTopicId === topic.id && value === topic.text;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => handleSelectSample(topic)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-xs font-semibold"
                  : "bg-white text-slate-700 hover:bg-blue-100/60 border border-slate-200/80"
              }`}
            >
              {topic.title.split("&")[0].trim()}
            </button>
          );
        })}
      </div>

      {/* Textarea Area */}
      <div className="p-5 flex-1 flex flex-col relative">
        <textarea
          id="study-material-input"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (selectedTopicId) setSelectedTopicId("");
          }}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Paste your paragraph here..."
          rows={12}
          className="w-full flex-1 min-h-[260px] p-4 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base leading-relaxed resize-none transition-all"
        />

        {/* Live Counters & Metrics Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-medium">
              Words: <strong className="text-slate-800 font-bold">{wordCount}</strong>
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="font-medium">
              Characters:{" "}
              <strong className="text-slate-800 font-bold">{charCount}</strong>
            </span>
            {wordCount > 0 && (
              <>
                <span className="text-slate-300">&bull;</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>~{readingTime} min read</span>
                </span>
              </>
            )}
          </div>

          {wordCount > 0 && wordCount < 5 && (
            <span className="text-amber-600 font-medium">
              (Need at least 5 words to summarize)
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="px-5 py-4 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            onClear();
            setSelectedTopicId("");
          }}
          disabled={isLoading || (!value && wordCount === 0)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 active:bg-slate-300/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>

        <GenerateButton
          onClick={onGenerate}
          isLoading={isLoading}
          disabled={wordCount < 5}
        />
      </div>
    </div>
  );
}
