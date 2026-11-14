'use client';

import React from 'react';
import { Compass, Heart, MapPin, IndianRupee, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'explore' | 'plan' | 'my-trips') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-[#EAE0D2] pt-12 pb-8 text-slate-600 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B35] to-[#FFA07A] flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-black text-slate-900">
                Trip<span className="text-[#FF6B35]">Mate</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Your autonomous travel architect. Generating custom day-by-day itineraries, verified INR budget breakdowns, and curated dining spots for Indian and global trips.
            </p>
            <div className="text-[11px] text-slate-400 font-medium">
              Made with precision for smart travelers.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
              Explore TripMate
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <button onClick={() => { onSelectTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF6B35] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF6B35] transition-colors">
                  Explore Destinations
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectTab('plan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF6B35] transition-colors">
                  Plan a Trip
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectTab('my-trips'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF6B35] transition-colors">
                  My Saved Trips
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
              Popular Gateways
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>🏔️ Manali & Solang Valley</li>
              <li>🏖️ North & South Goa</li>
              <li>🏰 Jaipur Pink City</li>
              <li>❄️ Kashmir & Gulmarg</li>
              <li>🌊 Rishikesh Ganges</li>
              <li>🛕 Amritsar Golden Temple</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 TripMate. All rights reserved.</p>
          <p className="text-[11px] text-slate-400 text-center sm:text-right">
            * Estimated budgets and recommendations are dynamic market approximations for planning guidance.
          </p>
        </div>
      </div>
    </footer>
  );
};

