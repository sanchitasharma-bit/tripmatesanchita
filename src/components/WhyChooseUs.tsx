'use client';

import React from 'react';
import { IndianRupee, Zap, ShieldCheck, HeartHandshake, Map, Compass } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const perks = [
    {
      icon: IndianRupee,
      title: 'INR Budget Precision',
      desc: 'All calculations are custom-calibrated for Indian traveling costs: hotels, street food, autos, and state entry tickets.',
      bg: 'bg-orange-100 text-[#FF6B35]',
    },
    {
      icon: Zap,
      title: 'Lightning Fast AI Engine',
      desc: 'No waiting 2 minutes for slow LLMs. TripMate creates structured schedules in seconds using our high-speed engine.',
      bg: 'bg-blue-100 text-[#0284C7]',
    },
    {
      icon: Compass,
      title: 'Morning to Night Pacing',
      desc: 'Balanced activity slots ensure you don’t exhaust yourself with unrealistic rush, leaving room for sunset views and dinner.',
      bg: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Overspending Alerts',
      desc: 'Instant visual progress warnings whenever your chosen preferences exceed your declared target budget.',
      bg: 'bg-rose-100 text-rose-600',
    },
    {
      icon: HeartHandshake,
      title: 'Solo, Friends, Couple & Family Modes',
      desc: 'Dynamic customization adapts hotel styles, meal budgets, and activity pacing to match who you are traveling with.',
      bg: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Map,
      title: 'Google Maps Navigation Ready',
      desc: 'Every suggested landmark and cafe comes with instant one-click Google Maps links for seamless on-ground transit.',
      bg: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#FF6B35] text-xs font-bold mb-3">
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Designed for Modern Indian Travelers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Forget wrestling with 20 browser tabs. TripMate centralizes planning, budgeting, and scheduling in one intuitive platform.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#EAE0D2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${p.bg} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
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

