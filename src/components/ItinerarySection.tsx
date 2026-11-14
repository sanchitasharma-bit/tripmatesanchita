'use client';

import React, { useState } from 'react';
import { TripPlan, DayItinerary, ActivitySlot } from '@/types/tripmate';
import {
  Sun,
  Sunset,
  Coffee,
  MapPin,
  Utensils,
  ExternalLink,
  Sparkles,
  Compass,
  CheckCircle2,
  IndianRupee,
  Calendar,
} from 'lucide-react';

interface ItinerarySectionProps {
  trip: TripPlan;
}

export const ItinerarySection: React.FC<ItinerarySectionProps> = ({ trip }) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const currentDay: DayItinerary = trip.itinerary[selectedDayIdx] || trip.itinerary[0];

  const getSlotIcon = (slot: string) => {
    switch (slot) {
      case 'Morning':
        return <Coffee className="w-4 h-4 text-amber-500" />;
      case 'Afternoon':
        return <Sun className="w-4 h-4 text-orange-500" />;
      case 'Evening':
        return <Sunset className="w-4 h-4 text-rose-500" />;
      default:
        return <Compass className="w-4 h-4 text-[#FF6B35]" />;
    }
  };

  const getMapsUrl = (location: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${location}, ${trip.destination}`
    )}`;
  };

  const renderActivityCard = (activity: ActivitySlot) => (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EBE2D5] hover:border-[#FF6B35]/50 transition-all hover:shadow-xs group">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-white border border-[#E5DAC9] shadow-2xs">
            {getSlotIcon(activity.timeSlot)}
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-800">
            {activity.timeSlot}
          </span>
          <span className="text-xs text-slate-500 font-medium bg-white px-2 py-0.5 rounded-md border border-[#E5DAC9]">
            {activity.time}
          </span>
        </div>

        <div className="text-xs font-black text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-[#E5DAC9]">
          Est. ₹{activity.costINR.toLocaleString('en-IN')}
        </div>
      </div>

      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#FF6B35] transition-colors mb-1">
        {activity.title}
      </h4>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
        {activity.description}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-[#EAE0D2] text-xs">
        <a
          href={getMapsUrl(activity.location)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0284C7] font-semibold transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span className="truncate max-w-[200px] sm:max-w-xs">{activity.location}</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-[#E5DAC9]">
          {activity.category}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE0D2] shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FF6B35]" />
            <span>Day-by-Day Travel Schedule</span>
          </h3>
          <p className="text-xs text-slate-500">
            {trip.totalDays} Days • Morning, Afternoon & Evening Curated Itinerary
          </p>
        </div>

        <div className="text-xs font-bold text-[#FF6B35] bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200">
          Estimated Day Spend: ₹{currentDay.dayEstimatedCostINR.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {trip.itinerary.map((day, idx) => {
          const isActive = idx === selectedDayIdx;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayIdx(idx)}
              className={`flex-shrink-0 px-5 py-3 rounded-2xl text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#F97316] text-white shadow-md shadow-orange-500/20'
                  : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 border border-[#E5DAC9]'
              }`}
            >
              <div className="text-xs font-black">Day {day.dayNumber}</div>
              <div className={`text-[11px] truncate max-w-[120px] ${isActive ? 'text-orange-100' : 'text-slate-500'}`}>
                {day.theme}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Content */}
      <div className="space-y-4">
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 flex items-center justify-between">
          <div>
            <h4 className="text-base font-black text-amber-950">{currentDay.title}</h4>
            <p className="text-xs text-amber-800/80 mt-0.5">{currentDay.theme}</p>
          </div>
          <div className="text-[11px] font-semibold text-amber-900 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">
            Covering: {currentDay.attractionsCovered.join(' & ')}
          </div>
        </div>

        {/* 3 Activity Slots: Morning, Afternoon, Evening */}
        <div className="space-y-3.5">
          {renderActivityCard(currentDay.morning)}
          {renderActivityCard(currentDay.afternoon)}
          {renderActivityCard(currentDay.evening)}
        </div>

        {/* Recommended Restaurants & Delicacies for this Day */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3">
            <Utensils className="w-4 h-4 text-[#FF6B35]" />
            <span>Recommended Dining & Local Cafes for Day {currentDay.dayNumber}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentDay.recommendedRestaurants.map((r, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#EAE0D2] shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{r.name}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-orange-50 text-[#FF6B35] border border-orange-200">
                      {r.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {r.specialty}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>For Two:</span>
                  <span className="text-emerald-700">₹{r.estimatedCostForTwoINR.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

