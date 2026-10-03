"use client";

import React from "react";
import { BookOpen, Cpu, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About Project */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                SMART STUDY NOTES GENERATOR
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md">
              Generative AI Based Text Summarization using Python. Designed as a college mini-project demonstrating practical integration of Hugging Face Transformers, FastAPI, and Next.js.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>Core AI Engine: Python 3.12 + Transformers + FastAPI</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#generator" className="hover:text-blue-600 transition-colors">
                  Workspace Generator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-blue-600 transition-colors">
                  System Architecture
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-600 transition-colors">
                  About & Viva Objectives
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Viva Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Academic Viva
            </h4>
            <div className="space-y-2 text-xs text-slate-500">
              <p>
                <strong>Evaluation:</strong> College Mini-Project
              </p>
              <p>
                <strong>AI Model:</strong> facebook/bart-large-cnn
              </p>
              <p>
                <strong>Deployment:</strong> Vercel + GitHub
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Smart Study Notes Generator. Built for Academic Demonstration.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
              <span>in Python & Next.js</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
