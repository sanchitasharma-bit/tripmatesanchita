'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, MapPin, IndianRupee } from 'lucide-react';

interface NavbarProps {
  isMockMode?: boolean;
  onToggleMockMode?: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMockMode = false, onToggleMockMode }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900">Safar<span className="text-brand-600">AI</span></span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-brand-100 text-brand-700">v1.0</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Smart Travel Planner</p>
          </div>
        </Link>

        {/* Currency & Demo Mode Toggles */}
        <div className="flex items-center gap-3">
          {/* Currency Pill */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            <IndianRupee className="w-3.5 h-3.5 text-brand-600" />
            <span>INR (₹)</span>
          </div>

          {/* Offline/Demo Mode Badge */}
          {onToggleMockMode && (
            <button
              onClick={() => onToggleMockMode(!isMockMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                isMockMode
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
              title="Toggle between AI Provider and Demo Engine"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMockMode ? 'Demo Mode Active' : 'AI Engine Ready'}</span>
            </button>
          )}

          {/* Guest Mode Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Guest Planner</span>
          </div>
        </div>
      </div>
    </header>
  );
};

