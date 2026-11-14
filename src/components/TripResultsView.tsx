'use client';

import React, { useState } from 'react';
import { TripPlan } from '@/types/tripmate';
import { BudgetSection } from './BudgetSection';
import { ItinerarySection } from './ItinerarySection';
import {
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Bookmark,
  Check,
  Printer,
  Share2,
  ArrowLeft,
  PlaneTakeoff,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';

interface TripResultsViewProps {
  trip: TripPlan;
  onBackToPlanner: () => void;
  onSaveTrip: (trip: TripPlan) => void;
  isSaved: boolean;
}

export const TripResultsView: React.FC<TripResultsViewProps> = ({
  trip,
  onBackToPlanner,
  onSaveTrip,
  isSaved,
}) => {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    onSaveTrip(trip);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `Check out my ${trip.totalDays}-day trip itinerary to ${trip.destination} (Budget: ₹${trip.budget.targetBudgetINR.toLocaleString('en-IN')}) planned on TripMate!`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="py-10 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation back and Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 no-print">
          <button
            onClick={onBackToPlanner}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E5DAC9] text-slate-700 hover:text-slate-900 font-bold text-xs shadow-2xs hover:shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Details / New Trip</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSave}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
                isSaved || saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FF6B35] hover:bg-[#EA580C] text-white shadow-orange-500/20'
              }`}
            >
              {isSaved || saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved in My Trips</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save Trip to My Trips</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E5DAC9] hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-colors"
              title="Print or Save PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Hero Card Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EAE0D2] bg-slate-900 text-white">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={trip.destinationImage}
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#FF6B35] text-white text-xs font-black uppercase tracking-wider">
                {trip.travelType} Vacation
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                {trip.totalDays} Days / {trip.totalDays - 1} Nights
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                {trip.travelers} Traveler(s)
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {trip.destination} Getaway
            </h1>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-200 mt-2 font-medium">
              <span className="flex items-center gap-1">
                <PlaneTakeoff className="w-4 h-4 text-[#FFA07A]" />
                From {trip.startingLocation}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#FFA07A]" />
                {trip.departureDate} to {trip.returnDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <IndianRupee className="w-4 h-4" />
                Budget: ₹{trip.budget.targetBudgetINR.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Destination Overview Box */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE0D2] shadow-xs flex flex-col md:flex-row items-start gap-4">
          <div className="p-3 rounded-2xl bg-orange-100 text-[#FF6B35] flex-shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 mb-1">Destination Overview</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {trip.destinationOverview}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {trip.preferences.map((p) => (
                <span
                  key={p}
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-slate-700 border border-[#E5DAC9]"
                >
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Budget Breakdown Component */}
        <BudgetSection budget={trip.budget} travelers={trip.travelers} />

        {/* 2. Day-wise Itinerary Component */}
        <ItinerarySection trip={trip} />

        {/* 3. Essential Travel Tips */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE0D2] shadow-xs">
          <h4 className="text-base font-black text-slate-900 flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Curated Travel & Safety Guidelines for {trip.destination}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            {trip.travelTips.map((tip, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EBE2D5] flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

