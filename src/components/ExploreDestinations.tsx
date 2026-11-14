'use client';

import React, { useState } from 'react';
import { POPULAR_DESTINATIONS } from '@/data/destinationsData';
import { DestinationInfo, PreferenceType } from '@/types/tripmate';
import { MapPin, IndianRupee, Sparkles, ArrowRight, Compass, Search } from 'lucide-react';

interface ExploreDestinationsProps {
  onSelectDestination: (destName: string, estimatedBudget: number) => void;
}

export const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({
  onSelectDestination,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Adventure', 'Nature', 'Food', 'Beaches', 'Historical Places', 'Shopping'];

  const filtered = POPULAR_DESTINATIONS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category.includes(selectedCategory as PreferenceType);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.attractions.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="explore" className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#EAE0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#FF6B35] text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Trending Destinations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore Popular Indian Gateways
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              Hand-picked iconic destinations curated with verified starting budgets, highlight attractions, and instant AI itineraries.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, fort, beach..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E5DAC9] text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6B35] shadow-xs"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#FF6B35] text-white shadow-md shadow-orange-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-[#E5DAC9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 8 Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EAE0D2] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* State Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white text-[11px] font-bold">
                  {dest.state}
                </div>

                {/* Starting Budget Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-slate-200">Starting from</div>
                    <div className="text-base font-black flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      <span>{dest.startingBudgetINR.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] font-normal text-slate-300 ml-1">/person</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-xs text-white">
                    {dest.bestSeason}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#FF6B35] transition-colors">
                      {dest.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  {/* Highlight Attractions */}
                  <div className="space-y-1 mb-5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Must-Visit Attractions:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.attractions.slice(0, 3).map((attr, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-slate-700 border border-[#EBE2D5]"
                        >
                          {attr}
                        </span>
                      ))}
                      {dest.attractions.length > 3 && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded text-slate-500">
                          +{dest.attractions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Explore & Plan Button */}
                <button
                  type="button"
                  onClick={() => onSelectDestination(dest.name, dest.startingBudgetINR)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#FF6B35] text-slate-800 hover:text-white font-bold text-xs border border-[#E5DAC9] hover:border-transparent transition-all shadow-2xs group-hover:bg-[#FF6B35] group-hover:text-white"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plan Trip to {dest.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#EAE0D2]">
            <p className="text-slate-500 text-sm">No destinations matched &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-2 text-xs font-bold text-[#FF6B35] underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

