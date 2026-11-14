'use client';

import React from 'react';
import { TripPlan } from '@/types/tripmate';
import {
  Luggage,
  Calendar,
  IndianRupee,
  MapPin,
  Trash2,
  ArrowRight,
  PlaneTakeoff,
  Users,
  Compass,
} from 'lucide-react';

interface MyTripsViewProps {
  savedTrips: TripPlan[];
  onOpenTrip: (trip: TripPlan) => void;
  onDeleteTrip: (tripId: string) => void;
  onPlanNewTrip: () => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  savedTrips,
  onOpenTrip,
  onDeleteTrip,
  onPlanNewTrip,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAE0D2]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Luggage className="w-3.5 h-3.5" />
              <span>Saved Itineraries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              My Saved Trips
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Your saved travel plans are stored in your browser so you can access them anytime.
            </p>
          </div>

          <button
            onClick={onPlanNewTrip}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FF6B35] hover:bg-[#EA580C] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all self-start sm:self-auto"
          >
            <Compass className="w-4 h-4" />
            <span>Plan Another Trip</span>
          </button>
        </div>

        {/* Empty State */}
        {savedTrips.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-[#EAE0D2] shadow-xs">
            <div className="w-16 h-16 rounded-3xl bg-orange-100 text-[#FF6B35] flex items-center justify-center mx-auto mb-4">
              <Luggage className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No Saved Trips Yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              You haven&apos;t saved any trip itineraries. Use the Trip Planner to create an AI-powered travel plan and save it here.
            </p>
            <button
              onClick={onPlanNewTrip}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#EA580C] shadow-md shadow-orange-500/20 transition-all"
            >
              <span>Create Your First Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Saved Trips Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EAE0D2] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={trip.destinationImage}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white text-[11px] font-bold">
                    {trip.travelType} Trip
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Remove "${trip.destination}" from your saved trips?`)) {
                        onDeleteTrip(trip.id);
                      }
                    }}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-white/80 hover:bg-rose-600 text-slate-700 hover:text-white backdrop-blur-md transition-colors"
                    title="Delete Saved Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-2xl font-black">{trip.destination}</h3>
                    <div className="text-[11px] text-slate-200 flex items-center gap-1.5 mt-0.5">
                      <PlaneTakeoff className="w-3.5 h-3.5 text-[#FFA07A]" />
                      <span>From {trip.startingLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> Duration
                      </span>
                      <span className="font-bold text-slate-900">{trip.totalDays} Days</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> Travelers
                      </span>
                      <span className="font-bold text-slate-900">{trip.travelers} Person(s)</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-slate-500 flex items-center gap-1">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400" /> Budget
                      </span>
                      <span className="font-black text-emerald-700">
                        ₹{trip.budget.targetBudgetINR.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Open Trip Details Action */}
                  <button
                    onClick={() => onOpenTrip(trip)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#FF6B35] text-slate-800 hover:text-white font-bold text-xs border border-[#E5DAC9] hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:bg-[#FF6B35] group-hover:text-white"
                  >
                    <span>View Complete Itinerary</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

