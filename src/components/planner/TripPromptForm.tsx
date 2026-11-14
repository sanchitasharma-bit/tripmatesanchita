'use client';

import React, { useState } from 'react';
import { Sparkles, Send, MapPin, Calendar, IndianRupee, Users, Compass, ChevronDown, ChevronUp } from 'lucide-react';

interface TripPromptFormProps {
  onGenerate: (data: {
    prompt: string;
    destination?: string;
    origin?: string;
    durationDays?: number;
    budgetINR?: number;
    travelerCount?: number;
    travelStyle?: 'budget' | 'balanced' | 'luxury' | 'adventure' | 'family';
  }) => void;
  isLoading: boolean;
}

const PRESET_CHIPS = [
  { label: '🏔️ 3 Days in Manali under ₹10,000', prompt: 'Plan a 3-day budget trip to Manali under ₹10,000 for 2 friends' },
  { label: '🏖️ 4 Days in Goa with Beach Cafes', prompt: 'Plan a 4-day trip to Goa under ₹20,000 for a couple focused on beaches and seafood' },
  { label: '🏰 3 Days Royal Heritage in Jaipur', prompt: 'Plan a 3-day cultural heritage trip to Jaipur under ₹12,000' },
  { label: '🌴 5 Days Kerala Backwaters & Tea Gardens', prompt: 'Plan a 5-day relaxing family trip to Kerala under ₹30,000' },
];

export const TripPromptForm: React.FC<TripPromptFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Advanced fields
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [durationDays, setDurationDays] = useState(3);
  const [budgetINR, setBudgetINR] = useState(15000);
  const [travelerCount, setTravelerCount] = useState(2);
  const [travelStyle, setTravelStyle] = useState<'budget' | 'balanced' | 'luxury' | 'adventure' | 'family'>('balanced');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !destination.trim()) return;

    onGenerate({
      prompt: prompt.trim() || `Plan a ${durationDays}-day ${travelStyle} trip to ${destination} under ₹${budgetINR} for ${travelerCount} people`,
      destination: destination.trim() || undefined,
      origin: origin.trim() || undefined,
      durationDays,
      budgetINR,
      travelerCount,
      travelStyle,
    });
  };

  const handleChipClick = (chipPrompt: string) => {
    setPrompt(chipPrompt);
    onGenerate({ prompt: chipPrompt });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/80">
        {/* Main conversational search box */}
        <div className="relative">
          <div className="flex items-start gap-3">
            <div className="mt-2.5 text-brand-600 hidden sm:block">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask naturally: &quot;Plan a 3-day budget trip to Manali under ₹10,000 for 2 friends&quot; or &quot;4-day Goa vacation with beach shacks&quot;..."
                rows={2}
                className="w-full text-slate-800 placeholder-slate-400 text-base sm:text-lg resize-none border-0 focus:ring-0 p-1.5 focus:outline-none"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-slate-600 hover:text-brand-600 flex items-center gap-1 transition-colors"
            >
              <span>{showAdvanced ? 'Hide Detailed Filters' : 'Set Exact Dates & Budget Filters'}</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              type="submit"
              disabled={isLoading || (!prompt.trim() && !destination.trim())}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-700 hover:to-teal-600 text-white font-medium shadow-md shadow-brand-500/20 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Designing Your Trip...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Itinerary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Advanced Controls */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-brand-600" /> Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Manali, Goa, Jaipur"
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-1">
                <Compass className="w-3.5 h-3.5 text-brand-600" /> Starting From (Origin)
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Delhi, Chandigarh, Mumbai"
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-brand-600" /> Duration (Days)
              </label>
              <input
                type="number"
                min={1}
                max={15}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-brand-600" /> Total Budget (INR)
              </label>
              <input
                type="number"
                step={500}
                min={2000}
                value={budgetINR}
                onChange={(e) => setBudgetINR(Number(e.target.value))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5 text-brand-600" /> Travelers
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={travelerCount}
                onChange={(e) => setTravelerCount(Number(e.target.value))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-1">
                Style & Vibe
              </label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value as any)}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500 bg-white"
              >
                <option value="budget">Budget-Friendly (Economical)</option>
                <option value="balanced">Balanced & Comfortable</option>
                <option value="luxury">Luxury & Premium</option>
                <option value="adventure">Adventure & Outdoors</option>
                <option value="family">Family & Child-Friendly</option>
              </select>
            </div>
          </div>
        )}
      </form>

      {/* Preset Inspiration Chips */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-medium text-slate-400">Popular Ideas:</span>
        {PRESET_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(chip.prompt)}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 transition-all shadow-sm"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
};

