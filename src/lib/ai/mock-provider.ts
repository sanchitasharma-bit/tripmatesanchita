import { IAIProvider } from './ai-interface';
import { TripGenerationRequest, TripItinerary, TripModificationRequest } from '@/types';

export class MockTripProvider implements IAIProvider {
  readonly providerName = 'Demo / Offline Engine';

  async generateTrip(request: TripGenerationRequest): Promise<TripItinerary> {
    const destLower = request.destination.toLowerCase();
    const days = Math.min(Math.max(request.durationDays || 3, 1), 7);
    const budget = request.budgetINR || 12000;
    const travelers = request.travelerCount || 1;

    // Budget allocation logic
    const accommodation = Math.round(budget * 0.35);
    const food = Math.round(budget * 0.25);
    const activities = Math.round(budget * 0.20);
    const transit = Math.round(budget * 0.15);
    const buffer = budget - (accommodation + food + activities + transit);

    const isManali = destLower.includes('manali');
    const isGoa = destLower.includes('goa');
    const isJaipur = destLower.includes('jaipur');

    let title = `Exciting ${days}-Day Getaway to ${request.destination}`;
    let overview = `A carefully curated ${days}-day trip to ${request.destination} designed to stay comfortably within your ₹${budget.toLocaleString('en-IN')} budget for ${travelers} traveler(s).`;
    
    if (isManali) {
      title = `${days} Days in Snowy Manali & Solang Valley`;
      overview = `Breathtaking Himalayan mountain escape featuring river walks, hot springs, authentic Himachali siddu, and snow adventures in Solang.`;
    } else if (isGoa) {
      title = `Sun, Sand & Heritage: ${days} Days in Goa`;
      overview = `A balanced coastal retreat blending serene South Goa beaches, Portuguese architecture in Fontainhas, and lively beach shacks.`;
    } else if (isJaipur) {
      title = `Royal Pink City Heritage: ${days} Days in Jaipur`;
      overview = `Immerse yourself in Rajasthani majesty with majestic hill forts, royal palaces, bazaars, and traditional dal baati churma.`;
    }

    const generatedDays = Array.from({ length: days }, (_, i) => {
      const dayNum = i + 1;
      return {
        dayNumber: dayNum,
        title: `Day ${dayNum}: ${this.getDayTheme(request.destination, dayNum)}`,
        theme: this.getDayTheme(request.destination, dayNum),
        estimatedDayCostINR: Math.round((food + activities + transit) / days),
        activities: this.getActivitiesForDay(request.destination, dayNum, budget / days),
      };
    });

    return {
      id: `trip_mock_${Date.now()}`,
      title,
      destination: request.destination,
      origin: request.origin || 'Nearby Transit Hub',
      durationDays: days,
      travelerCount: travelers,
      travelStyle: request.travelStyle || 'balanced',
      overview,
      targetBudgetINR: budget,
      budgetBreakdown: {
        accommodationINR: accommodation,
        foodAndDiningINR: food,
        activitiesAndEntryINR: activities,
        localTransitINR: transit,
        emergencyBufferINR: Math.max(buffer, 0),
        totalEstimatedCostINR: budget,
        targetBudgetINR: budget,
      },
      weatherOverview: {
        temperatureC: isManali ? 12 : isGoa ? 29 : isJaipur ? 26 : 24,
        condition: isManali ? 'Cool Mountain Breeze' : isGoa ? 'Sunny Coastal' : 'Pleasant & Clear',
        rainProbabilityPercent: isManali ? 15 : 5,
        advisory: isManali ? 'Carry light woolens and comfortable walking boots.' : 'Carry sunscreen, shades, and hydration.',
        highC: isManali ? 18 : isGoa ? 33 : isJaipur ? 30 : 26,
        lowC: isManali ? 6 : isGoa ? 24 : isJaipur ? 16 : 18,
      },
      days: generatedDays,
      packingList: this.getPackingList(request.destination),
      localCuisineToTry: isManali 
        ? ['Siddu with Ghee', 'Trout Fish', 'Kullu Dham', 'Thukpa & Momos']
        : isGoa
        ? ['Goan Fish Curry Thali', 'Bebinca', 'Prawn Balchão', 'Poi bread with Choriz']
        : ['Dal Baati Churma', 'Pyaaz Kachori', 'Laal Maas', 'Ghevar'],
      importantDoAndDonts: [
        'Keep digital copies of photo IDs and hotel reservations on your phone.',
        'Use local prepaid cabs or rented two-wheelers for economical transit.',
        'Respect local heritage rules and temple dress codes.',
        'Always keep at least ₹1,500 cash handy for local street vendors and rural areas.',
      ],
      createdAt: new Date().toISOString(),
    };
  }

  async modifyTrip(request: TripModificationRequest): Promise<TripItinerary> {
    const updated = JSON.parse(JSON.stringify(request.currentTrip)) as TripItinerary;
    const instruction = request.userInstruction.toLowerCase();

    // Check if user requested budget reduction
    if (instruction.includes('reduce') || instruction.includes('cheap') || instruction.includes('lower budget')) {
      updated.targetBudgetINR = Math.round(updated.targetBudgetINR * 0.85);
      updated.budgetBreakdown.foodAndDiningINR = Math.round(updated.budgetBreakdown.foodAndDiningINR * 0.85);
      updated.budgetBreakdown.accommodationINR = Math.round(updated.budgetBreakdown.accommodationINR * 0.85);
      updated.overview += ` (Adjusted for a tighter economical budget).`;
    }

    // Check if user requested food modification
    if (instruction.includes('food') || instruction.includes('street food') || instruction.includes('cafe')) {
      if (updated.days.length > 0 && updated.days[0].activities.length > 1) {
        updated.days[0].activities[1].title = 'Local Street Food Walk & Famous Eateries';
        updated.days[0].activities[1].description = 'Explore top-rated local food stalls tasting regional specialties on a budget.';
        updated.days[0].activities[1].estimatedCostINR = 250;
      }
    }

    // Default note
    updated.title = `${updated.title} (Updated)`;
    return updated;
  }

  private getDayTheme(dest: string, day: number): string {
    const d = dest.toLowerCase();
    if (d.includes('manali')) {
      return ['Old Manali Charm & Cafes', 'Solang Adventure & Rohtang Road', 'Naggar Castle & River Retreat'][day - 1] || 'Scenic Valley Exploration';
    }
    if (d.includes('goa')) {
      return ['North Beaches & Sunset Forts', 'Old Goa Cathedrals & Spice Farm', 'South Goa Peaceful Coves'][day - 1] || 'Coastal Relaxation';
    }
    return ['Historic Landmarks & Architecture', 'Cultural Markets & Street Delicacies', 'Scenic Viewpoints & Relaxation'][day - 1] || 'Local Discovery';
  }

  private getActivitiesForDay(dest: string, day: number, approxDayBudget: number) {
    return [
      {
        id: `act_${day}_1`,
        timeSlot: 'morning' as const,
        timeRange: '08:30 AM - 11:30 AM',
        title: `Explore iconic spots of ${dest}`,
        description: `Early morning visit to avoid crowds. Take scenic photographs and discover local heritage.`,
        locationName: `${dest} Main Landmark`,
        latitude: 32.2432,
        longitude: 77.1892,
        estimatedCostINR: Math.round(approxDayBudget * 0.2),
        category: 'sightseeing' as const,
        isHiddenGem: false,
        travelTips: 'Carry water and wear walking sneakers.',
      },
      {
        id: `act_${day}_2`,
        timeSlot: 'afternoon' as const,
        timeRange: '12:30 PM - 03:00 PM',
        title: `Authentic Regional Lunch & Market Stroll`,
        description: `Taste local favorites at high-rated budget-friendly diners loved by locals.`,
        locationName: `${dest} Heritage Bazaar`,
        estimatedCostINR: Math.round(approxDayBudget * 0.25),
        category: 'food' as const,
        isHiddenGem: true,
        travelTips: 'Try the house specialties recommended by the chef.',
      },
      {
        id: `act_${day}_3`,
        timeSlot: 'evening' as const,
        timeRange: '04:30 PM - 07:00 PM',
        title: `Sunset Viewpoint & Cultural Experience`,
        description: `Relax with panoramic sunset vistas and tea at a scenic vantage point.`,
        locationName: `${dest} Sunset Point`,
        estimatedCostINR: Math.round(approxDayBudget * 0.15),
        category: 'leisure' as const,
        isHiddenGem: false,
        travelTips: 'Arrive 30 minutes before golden hour.',
      },
      {
        id: `act_${day}_4`,
        timeSlot: 'night' as const,
        timeRange: '08:00 PM - 10:30 PM',
        title: `Dinner & Night Ambience`,
        description: `A relaxed evening dinner with warm music and local ambiance.`,
        locationName: `${dest} Riverside / Downtown Area`,
        estimatedCostINR: Math.round(approxDayBudget * 0.3),
        category: 'food' as const,
        isHiddenGem: false,
      },
    ];
  }

  private getPackingList(dest: string) {
    const isCold = dest.toLowerCase().includes('manali') || dest.toLowerCase().includes('shimla') || dest.toLowerCase().includes('ladakh');
    return [
      { id: 'p1', category: 'Clothing' as const, name: isCold ? 'Warm Fleece & Thermal Innerwear' : 'Breathable Cotton T-Shirts & Shorts', isPacked: false },
      { id: 'p2', category: 'Clothing' as const, name: 'Comfortable Walking / Trekking Shoes', isPacked: false },
      { id: 'p3', category: 'Essentials' as const, name: 'Government ID Cards (Aadhaar / Passport)', isPacked: false },
      { id: 'p4', category: 'Electronics' as const, name: 'Power Bank (10,000mAh+) & Chargers', isPacked: false },
      { id: 'p5', category: 'Toiletries' as const, name: 'Sunscreen (SPF 50+) & Lip Balm', isPacked: false },
      { id: 'p6', category: 'Essentials' as const, name: 'Basic First-Aid & Motion Sickness Pills', isPacked: false },
    ];
  }
}

