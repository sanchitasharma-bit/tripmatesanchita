'use client';

import React, { useState, useEffect } from 'react';
import { TripFormData, TravelType, PreferenceType } from '@/types/tripmate';
import { POPULAR_DESTINATIONS } from '@/data/destinationsData';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Compass,
  Heart,
  User,
  AlertCircle,
  Check,
  PlaneTakeoff,
  Luggage,
} from 'lucide-react';

interface TripPlannerFormProps {
  onGenerate: (data: TripFormData) => void;
  isLoading: boolean;
  prefilledDestination?: string;
  prefilledBudget?: number;
}

const PREFERENCES_LIST: { name: PreferenceType; icon: string }[] = [
  { name: 'Adventure', icon: '🧗‍♂️' },
  { name: 'Nature', icon: '🌲' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Food', icon: '🍲' },
  { name: 'Beaches', icon: '🏖️' },
  { name: 'Historical Places', icon: '🏛️' },
];

const TRAVEL_TYPES: { type: TravelType; label: string; desc: string; icon: any }[] = [
  { type: 'Solo', label: 'Solo', desc: 'Me, myself & the road', icon: User },
  { type: 'Couple', label: 'Couple', desc: 'Romantic getaway', icon: Heart },
  { type: 'Friends', label: 'Friends', desc: 'Group fun & thrills', icon: Users },
  { type: 'Family', label: 'Family', desc: 'Comfort & leisure', icon: Luggage },
];

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  onGenerate,
  isLoading,
  prefilledDestination,
  prefilledBudget,
}) => {
  // Form State
  const [startingLocation, setStartingLocation] = useState('Delhi');
  const [destination, setDestination] = useState('Manali');
  
  // Set default dates: tomorrow to +4 days
  const todayStr = new Date().toISOString().split('T')[0];
  const nextWeekStr = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const [departureDate, setDepartureDate] = useState(todayStr);
  const [returnDate, setReturnDate] = useState(nextWeekStr);
  const [travelers, setTravelers] = useState(2);
  const [budgetINR, setBudgetINR] = useState(15000);
  const [travelType, setTravelType] = useState<TravelType>('Friends');
  const [preferences, setPreferences] = useState<PreferenceType[]>(['Adventure', 'Nature', 'Food']);

  // Error validation state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Sync prefilled destination
  useEffect(() => {
    if (prefilledDestination) {
      setDestination(prefilledDestination);
    }
    if (prefilledBudget) {
      setBudgetINR(prefilledBudget * travelers);
    }
  }, [prefilledDestination, prefilledBudget, travelers]);

  const togglePreference = (pref: PreferenceType) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!startingLocation.trim()) {
      errors.startingLocation = 'Please enter your starting location';
    }
    if (!destination.trim()) {
      errors.destination = 'Please enter or select a destination';
    }
    if (!departureDate) {
      errors.departureDate = 'Select a departure date';
    }
    if (!returnDate) {
      errors.returnDate = 'Select a return date';
    }
    if (departureDate && returnDate && new Date(departureDate) > new Date(returnDate)) {
      errors.returnDate = 'Return date cannot be earlier than departure date';
    }
    if (travelers < 1) {
      errors.travelers = 'At least 1 traveler required';
    }
    if (budgetINR < 2000) {
      errors.budgetINR = 'Budget must be at least ₹2,000';
    }
    if (preferences.length === 0) {
      errors.preferences = 'Select at least one travel preference';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onGenerate({
      startingLocation: startingLocation.trim(),
      destination: destination.trim(),
      departureDate,
      returnDate,
      travelers,
      budgetINR,
      travelType,
      preferences,
    });
  };

  return (
    <section id="planner" className="py-16 sm:py-20 bg-gradient-to-b from-[#FDFBF7] to-[#F5EFE6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#FF6B35] text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Trip Builder</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Plan Your Perfect Trip
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto font-medium">
            Fill in your trip details and let TripMate calculate day-by-day itineraries, verified budgets in INR, and recommended local spots.
          </p>
        </div>

        {/* Main Planning Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE0D2] shadow-xl space-y-8"
        >
          {/* Row 1: Starting Location & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Origin */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <PlaneTakeoff className="w-4 h-4 text-[#FF6B35]" />
                <span>Starting Location (From)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={startingLocation}
                  onChange={(e) => setStartingLocation(e.target.value)}
                  placeholder="e.g. Delhi, Mumbai, Chandigarh, Ludhiana"
                  className={`w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border text-sm text-slate-900 placeholder-slate-400 font-semibold focus:outline-none transition-colors ${
                    validationErrors.startingLocation
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-[#E5DAC9] focus:border-[#FF6B35]'
                  }`}
                />
              </div>
              {validationErrors.startingLocation && (
                <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.startingLocation}</span>
                </p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0284C7]" />
                <span>Destination (Where to?)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Manali, Goa, Jaipur, Kashmir..."
                  className={`w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border text-sm text-slate-900 placeholder-slate-400 font-semibold focus:outline-none transition-colors ${
                    validationErrors.destination
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-[#E5DAC9] focus:border-[#FF6B35]'
                  }`}
                />
              </div>
              {validationErrors.destination && (
                <p className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{validationErrors.destination}</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Destination Pill Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Quick Select:</span>
            {POPULAR_DESTINATIONS.slice(0, 6).map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setDestination(p.name)}
                className={`text-xs px-2.5 py-1 rounded-full font-semibold border transition-all ${
                  destination.toLowerCase() === p.name.toLowerCase()
                    ? 'bg-[#FF6B35] text-white border-transparent'
                    : 'bg-[#FAF7F2] text-slate-600 border-[#E5DAC9] hover:bg-slate-100'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Row 2: Dates, Travelers & Budget in INR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-slate-100">
            {/* Departure Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#FF6B35]" />
                <span>Departure Date</span>
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DAC9] text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#FF6B35]"
              />
              {validationErrors.departureDate && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{validationErrors.departureDate}</p>
              )}
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0284C7]" />
                <span>Return Date</span>
              </label>
              <input
                type="date"
                value={returnDate}
                min={departureDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DAC9] text-sm text-slate-900 font-semibold focus:outline-none focus:border-[#FF6B35]"
              />
              {validationErrors.returnDate && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{validationErrors.returnDate}</p>
              )}
            </div>

            {/* Travelers Count */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Travelers</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-12 h-11 rounded-2xl bg-[#FAF8F5] border border-[#E5DAC9] text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                >
                  -
                </button>
                <div className="flex-1 text-center font-black text-slate-900 text-base py-2.5 bg-[#FAF8F5] rounded-2xl border border-[#E5DAC9]">
                  {travelers} {travelers === 1 ? 'Person' : 'People'}
                </div>
                <button
                  type="button"
                  onClick={() => setTravelers(travelers + 1)}
                  className="w-12 h-11 rounded-2xl bg-[#FAF8F5] border border-[#E5DAC9] text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Total Budget in INR with Quick Chips */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-[#FF6B35]" />
                <span>Total Budget in INR (₹)</span>
              </label>
              <span className="text-xs font-bold text-slate-500">
                ~₹{Math.round(budgetINR / travelers).toLocaleString('en-IN')} per traveler
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-6 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  step={500}
                  min={2000}
                  value={budgetINR}
                  onChange={(e) => setBudgetINR(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DAC9] text-base text-slate-900 font-black focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              {/* Quick Budget Presets */}
              <div className="sm:col-span-6 flex flex-wrap gap-2">
                {[8000, 15000, 25000, 40000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setBudgetINR(amt)}
                    className={`text-xs px-3 py-2 rounded-xl font-bold border transition-colors ${
                      budgetINR === amt
                        ? 'bg-slate-900 text-white border-transparent'
                        : 'bg-[#FAF8F5] text-slate-700 border-[#E5DAC9] hover:bg-slate-100'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>
            {validationErrors.budgetINR && (
              <p className="mt-1 text-xs text-rose-500 font-medium">{validationErrors.budgetINR}</p>
            )}
          </div>

          {/* Row 4: Travel Type (Solo, Couple, Friends, Family) */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Travel Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TRAVEL_TYPES.map((item) => {
                const Icon = item.icon;
                const isSelected = travelType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      setTravelType(item.type);
                      if (item.type === 'Solo') setTravelers(1);
                      if (item.type === 'Couple') setTravelers(2);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-orange-50/70 border-[#FF6B35] ring-2 ring-[#FF6B35]/20 shadow-xs'
                        : 'bg-[#FAF8F5] border-[#E5DAC9] hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#FF6B35] text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#FF6B35]" />}
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">{item.label}</div>
                      <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 5: Preferences Multi-select */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Preferences & Interests (Select All That Apply)
              </label>
              <span className="text-[11px] font-semibold text-slate-400">
                {preferences.length} selected
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PREFERENCES_LIST.map((p) => {
                const isSelected = preferences.includes(p.name);
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => togglePreference(p.name)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50 border-[#0284C7] ring-1 ring-[#0284C7]/20 text-slate-900'
                        : 'bg-[#FAF8F5] border-[#E5DAC9] text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-xs sm:text-sm font-bold">{p.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#0284C7]" />}
                  </button>
                );
              })}
            </div>
            {validationErrors.preferences && (
              <p className="mt-1 text-xs text-rose-500 font-medium">{validationErrors.preferences}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B35] via-[#F97316] to-[#0284C7] hover:from-[#EA580C] hover:to-[#0369A1] text-white font-black text-base sm:text-lg shadow-xl shadow-orange-500/25 hover:shadow-2xl transition-all hover:scale-[1.01] active:scale-99 disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>TripMate AI is Generating Your Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate My Trip</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Instant generation • Powered by TripMate Local AI Engine • Zero external API keys needed
            </p>
          </div>
        </form>

      </div>
    </section>
  );
};

