'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ExploreDestinations } from '@/components/ExploreDestinations';
import { TripPlannerForm } from '@/components/TripPlannerForm';
import { TripResultsView } from '@/components/TripResultsView';
import { MyTripsView } from '@/components/MyTripsView';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Footer } from '@/components/Footer';
import { TripFormData, TripPlan } from '@/types/tripmate';
import { generateTripPlan } from '@/lib/tripGenerator';

export default function TripMateApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'plan' | 'my-trips'>('home');
  const [currentTrip, setCurrentTrip] = useState<TripPlan | null>(null);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prefilledDestination, setPrefilledDestination] = useState<string>('');
  const [prefilledBudget, setPrefilledBudget] = useState<number | undefined>(undefined);

  // Load saved trips from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tripmate_saved_trips');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedTrips(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
  }, []);

  // Save trips helper
  const handleSaveTrip = (tripToSave: TripPlan) => {
    setSavedTrips((prev) => {
      const exists = prev.some((t) => t.id === tripToSave.id);
      const updated = exists ? prev : [tripToSave, ...prev];
      try {
        localStorage.setItem('tripmate_saved_trips', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not write to localStorage:', err);
      }
      return updated;
    });
  };

  // Delete trip helper
  const handleDeleteTrip = (tripId: string) => {
    setSavedTrips((prev) => {
      const updated = prev.filter((t) => t.id !== tripId);
      try {
        localStorage.setItem('tripmate_saved_trips', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not update localStorage:', err);
      }
      return updated;
    });
  };

  // Open a saved trip in the planner results view
  const handleOpenTrip = (trip: TripPlan) => {
    setCurrentTrip(trip);
    setActiveTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form submit handler with smooth generation state
  const handleGenerateTrip = (formData: TripFormData) => {
    setIsLoading(true);

    // Realistic synthesis delay for AI feel (800ms)
    setTimeout(() => {
      const plan = generateTripPlan(formData);
      setCurrentTrip(plan);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 850);
  };

  // When clicking explore on a card
  const handleSelectDestinationFromCard = (destName: string, estimatedBudget: number) => {
    setPrefilledDestination(destName);
    setPrefilledBudget(estimatedBudget);
    setCurrentTrip(null);
    setActiveTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if current trip is already saved
  const isCurrentTripSaved = currentTrip
    ? savedTrips.some((t) => t.id === currentTrip.id)
    : false;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans selection:bg-[#FF6B35] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        savedTripsCount={savedTrips.length}
      />

      {/* 2. Main Content Views based on activeTab */}
      <main className="flex-1">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onStartPlanning={() => {
                setActiveTab('plan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreClick={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Popular & Trending Destinations Section */}
            <ExploreDestinations
              onSelectDestination={handleSelectDestinationFromCard}
            />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Why Choose TripMate Section */}
            <WhyChooseUs />
          </>
        )}

        {/* TAB 2: EXPLORE DESTINATIONS */}
        {activeTab === 'explore' && (
          <ExploreDestinations
            onSelectDestination={handleSelectDestinationFromCard}
          />
        )}

        {/* TAB 3: PLAN A TRIP */}
        {activeTab === 'plan' && (
          <>
            {currentTrip ? (
              <TripResultsView
                trip={currentTrip}
                onBackToPlanner={() => setCurrentTrip(null)}
                onSaveTrip={handleSaveTrip}
                isSaved={isCurrentTripSaved}
              />
            ) : (
              <TripPlannerForm
                onGenerate={handleGenerateTrip}
                isLoading={isLoading}
                prefilledDestination={prefilledDestination}
                prefilledBudget={prefilledBudget}
              />
            )}
          </>
        )}

        {/* TAB 4: MY TRIPS */}
        {activeTab === 'my-trips' && (
          <MyTripsView
            savedTrips={savedTrips}
            onOpenTrip={handleOpenTrip}
            onDeleteTrip={handleDeleteTrip}
            onPlanNewTrip={() => {
              setCurrentTrip(null);
              setActiveTab('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
