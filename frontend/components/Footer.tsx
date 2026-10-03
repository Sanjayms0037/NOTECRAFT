"use client";

import React from "react";
import Link from "next/link";
import { Feather, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090d16] py-12 text-slate-600 dark:text-slate-400 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Feather className="w-3.5 h-3.5 text-blue-400 dark:text-white" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                NOTECRAFT
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Turn what you read into what you remember. A lightweight AI-powered summarization tool built for clarity and speed.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/summarize" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Summarizer
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Source / Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/Sanjayms0037/NOTECRAFT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Version 2.0.0 &bull; Fast & Focused
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} NoteCraft. All rights reserved.
          </p>
          <p className="text-slate-400 dark:text-slate-500">
            Paste &bull; Generate &bull; Understand
          </p>
        </div>
      </div>
    </footer>

  );
}
