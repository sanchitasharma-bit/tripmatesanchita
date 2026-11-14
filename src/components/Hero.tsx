'use client';

import React from 'react';
import { Sparkles, Compass, MapPin, IndianRupee, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-[#FDFBF7] via-[#FAF6F0] to-[#F5EFE6]">
      {/* Subtle decorative glow circles */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FF6B35]/10 via-[#0284C7]/10 to-amber-200/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headings & Call to Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8DEC9] shadow-xs text-xs font-semibold text-slate-800">
              <span className="flex h-2 w-2 rounded-full bg-[#FF6B35] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Next-Gen Travel AI for Indian & Global Trips</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Your Journey, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#EA580C] to-[#0284C7] bg-clip-text text-transparent">
                Your Way.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Plan smarter, travel better with AI. Turn your destination, budget in INR, and travel vibe into a complete day-wise itinerary in under 10 seconds.
            </p>

            {/* Feature Checklist */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-700 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Custom INR Budgeting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Morning to Night Schedules</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Offline Storage & Export</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={onStartPlanning}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#F97316] hover:from-[#EA580C] hover:to-[#EA580C] text-white text-base font-bold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all hover:scale-[1.02] active:scale-98"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Planning Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-base font-bold border border-[#E5DAC9] shadow-xs hover:shadow-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-[#0284C7]" />
                <span>Explore Top Places</span>
              </button>
            </div>

            {/* Trust badge */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
              </div>
              <span className="font-medium text-slate-600">Over <strong>5,000+</strong> itineraries generated across India</span>
            </div>
          </div>

          {/* Right Column: Visual Hero Montage Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80"
                  alt="Manali Himachal Pradesh"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Overlaid Details */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>Featured Getaway</span>
                  </div>
                  <h3 className="text-2xl font-black">Manali & Solang Valley</h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                    Breathtaking snow peaks, river rafting on the Beas, and pine-scented mountain cafes.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold pt-2 border-t border-white/20">
                    <span className="text-[#FFA07A]">3-Day Budget: ₹8,500/person</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/80 backdrop-blur-xs text-white text-[10px]">98% Match</span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1: Budget Optimized */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#E8DEC9] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6B35]">
                  <IndianRupee className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Smart Budget</div>
                  <div className="text-sm font-black text-slate-900">Zero Overspending</div>
                </div>
              </div>

              {/* Floating Stat Card 2: AI Day Schedule */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#E8DEC9] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0284C7]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Day-Wise Plan</div>
                  <div className="text-sm font-black text-slate-900">Morning to Night</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

