'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, MapPin, Calendar, Heart, Menu, X, Sparkles, Luggage, User } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'explore' | 'plan' | 'my-trips';
  onSelectTab: (tab: 'home' | 'explore' | 'plan' | 'my-trips') => void;
  savedTripsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  savedTripsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'explore' | 'plan' | 'my-trips') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EADFCF]/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-transform active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#FFA07A] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:rotate-6 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  Trip<span className="text-[#FF6B35]">Mate</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  AI Trip
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Smart Travel Planner</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F4EFE6]/80 p-1.5 rounded-2xl border border-[#E5DAC9]">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'explore'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#0284C7]" />
              <span>Explore Destinations</span>
            </button>

            <button
              onClick={() => handleNavClick('plan')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'plan'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span>Plan a Trip</span>
            </button>

            <button
              onClick={() => handleNavClick('my-trips')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'my-trips'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Luggage className="w-4 h-4 text-emerald-600" />
              <span>My Trips</span>
              {savedTripsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#FF6B35] text-white text-[10px] font-bold">
                  {savedTripsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-[#FF6B35] text-xs font-bold border border-[#EADFCF] shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5"
            >
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Sign In</span>
            </Link>

            <button
              onClick={() => handleNavClick('plan')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F97316] hover:from-[#EA580C] hover:to-[#EA580C] text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Planning</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('my-trips')}
              className="p-2 rounded-xl bg-white border border-[#EADFCF] text-slate-700 relative"
            >
              <Luggage className="w-5 h-5" />
              {savedTripsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B35] text-white text-[9px] font-bold flex items-center justify-center">
                  {savedTripsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-[#EADFCF] text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#EADFCF] px-4 pt-2 pb-5 space-y-1.5 shadow-lg">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'home' ? 'bg-[#FF6B35] text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('explore')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'explore' ? 'bg-[#FF6B35] text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Explore Destinations
          </button>
          <button
            onClick={() => handleNavClick('plan')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'plan' ? 'bg-[#FF6B35] text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Plan a Trip
          </button>
          <button
            onClick={() => handleNavClick('my-trips')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              activeTab === 'my-trips' ? 'bg-[#FF6B35] text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Luggage className="w-4 h-4" />
              <span>My Trips</span>
            </div>
            {savedTripsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-xs font-bold">
                {savedTripsCount}
              </span>
            )}
          </button>

          <div className="pt-2 border-t border-[#EADFCF]">
            <Link
              href="/login"
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 text-slate-700 hover:bg-slate-100"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Sign In / Create Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
