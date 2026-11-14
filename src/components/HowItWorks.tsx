'use client';

import React from 'react';
import { Sliders, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Enter Your Trip Details',
      desc: 'Pick your destination, departure dates, group size, and your desired budget in INR. Choose what you love—beaches, trekking, food or culture.',
      icon: Sliders,
      color: 'from-orange-500 to-amber-500',
    },
    {
      step: '02',
      title: 'AI Generates Itinerary',
      desc: 'Our intelligent engine structures morning-to-night activities, allocates your budget across stay, food and transport, and flags hidden gems.',
      icon: Sparkles,
      color: 'from-blue-600 to-sky-500',
    },
    {
      step: '03',
      title: 'Save, Share & Travel',
      desc: 'Save your plan to your browser, export as a clean printable PDF travel pass, or share the plan with your travel buddies on WhatsApp.',
      icon: CheckCircle2,
      color: 'from-emerald-600 to-teal-500',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#EAE0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0284C7] text-xs font-bold mb-3">
            <span>Seamless 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How TripMate Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            From an idea to a fully budgeted day-by-day travel blueprint in seconds.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#FAF7F2] rounded-3xl p-8 border border-[#EAE0D2] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 font-mono">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

