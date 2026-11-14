'use client';

import React, { useState } from 'react';
import { TripItinerary, Activity } from '@/types';
import {
  Sun,
  Sunset,
  Moon,
  Coffee,
  MapPin,
  ExternalLink,
  Sparkles,
  Trash2,
  Tag,
  IndianRupee,
  Navigation,
} from 'lucide-react';

interface ItineraryTimelineProps {
  trip: TripItinerary;
  onUpdateTrip: (updated: TripItinerary) => void;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ trip, onUpdateTrip }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const currentDay = trip.days[activeDayIndex] || trip.days[0];

  const getTimeSlotIcon = (slot: string) => {
    switch (slot) {
      case 'morning':
        return <Coffee className="w-4 h-4 text-amber-500" />;
      case 'afternoon':
        return <Sun className="w-4 h-4 text-orange-500" />;
      case 'evening':
        return <Sunset className="w-4 h-4 text-rose-500" />;
      case 'night':
        return <Moon className="w-4 h-4 text-indigo-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-brand-500" />;
    }
  };

  const handleDeleteActivity = (actId: string) => {
    const updatedDays = trip.days.map((d, idx) => {
      if (idx !== activeDayIndex) return d;
      return {
        ...d,
        activities: d.activities.filter((a) => a.id !== actId),
      };
    });

    onUpdateTrip({
      ...trip,
      days: updatedDays,
    });
  };

  const getGoogleMapsSearchUrl = (locationName: string, destination: string) => {
    const query = encodeURIComponent(`${locationName}, ${destination}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-slate-100 no-scrollbar">
        {trip.days.map((day, idx) => {
          const isActive = idx === activeDayIndex;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDayIndex(idx)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
              }`}
            >
              <div className="text-xs font-semibold">Day {day.dayNumber}</div>
              <div className={`text-[11px] truncate max-w-[140px] ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {day.theme || `Day ${day.dayNumber}`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{currentDay.title}</h3>
          <p className="text-xs text-slate-500">{currentDay.theme}</p>
        </div>
        <div className="text-xs font-medium px-3 py-1.5 rounded-lg bg-brand-50 text-brand-800 border border-brand-200">
          Est. Day Spend: ₹{currentDay.estimatedDayCostINR.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
        {currentDay.activities.map((act) => (
          <div key={act.id} className="relative pl-12 group">
            {/* Slot Icon Node */}
            <div className="absolute left-2.5 top-3 w-5 h-5 -translate-x-1/2 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center shadow-sm">
              {getTimeSlotIcon(act.timeSlot)}
            </div>

            {/* Card Content */}
            <div className="bg-slate-50/80 hover:bg-slate-50 rounded-xl p-4 border border-slate-200/70 transition-all group-hover:border-slate-300 group-hover:shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                    {act.timeSlot}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{act.timeRange}</span>

                  {act.isHiddenGem && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Hidden Gem
                    </span>
                  )}
                </div>

                {/* Estimated Cost Pill */}
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  <IndianRupee className="w-3 h-3 text-brand-600" />
                  <span>{act.estimatedCostINR.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h4 className="text-sm font-bold text-slate-900 mb-1">{act.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{act.description}</p>

              {/* Travel Tips if available */}
              {act.travelTips && (
                <div className="mb-3 text-[11px] text-slate-600 bg-white/80 rounded-lg p-2 border border-slate-200/60 flex items-start gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Tip:</strong> {act.travelTips}</span>
                </div>
              )}

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                {/* Google Maps Link */}
                <a
                  href={getGoogleMapsSearchUrl(act.locationName, trip.destination)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-brand-600 font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span className="truncate max-w-[200px]">{act.locationName}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                {/* Delete Activity */}
                <button
                  type="button"
                  onClick={() => handleDeleteActivity(act.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                  title="Remove activity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

