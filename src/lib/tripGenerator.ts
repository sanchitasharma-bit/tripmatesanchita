import { TripFormData, TripPlan, DayItinerary, BudgetBreakdown } from '@/types/tripmate';
import { POPULAR_DESTINATIONS } from '@/data/destinationsData';

export function calculateDaysBetween(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 3;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive of start and end
  return Math.max(1, Math.min(diffDays, 14)); // clamp between 1 and 14
}

export function generateTripPlan(formData: TripFormData): TripPlan {
  const totalDays = calculateDaysBetween(formData.departureDate, formData.returnDate);
  const travelers = Math.max(1, formData.travelers || 1);
  const userBudget = Math.max(1000, formData.budgetINR || 15000);

  // Match destination info if in list, or generate custom
  const matchedDest = POPULAR_DESTINATIONS.find(
    (d) => d.name.toLowerCase() === formData.destination.toLowerCase()
  );

  const destinationName = matchedDest ? matchedDest.name : formData.destination;
  const destinationImage = matchedDest
    ? matchedDest.image
    : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80';

  const destinationOverview = matchedDest
    ? matchedDest.description
    : `A captivating journey to ${destinationName}, customized for a ${formData.travelType} trip focusing on ${formData.preferences.join(', ') || 'sightseeing and local exploration'}.`;

  // Dynamic realistic cost modeling based on travel style and travelers
  // Base cost per day per traveler in India
  let baseDailyStayPerTraveler = 1200;
  let baseDailyFoodPerTraveler = 700;
  let baseDailySightseeingPerTraveler = 400;
  let baseDailyTransitPerTraveler = 500;
  let baseShoppingPerTraveler = 1200;
  let baseMiscPerTraveler = 600;

  if (formData.travelType === 'Couple') {
    baseDailyStayPerTraveler = 1600;
    baseDailyFoodPerTraveler = 900;
  } else if (formData.travelType === 'Family') {
    baseDailyStayPerTraveler = 1400;
    baseDailyFoodPerTraveler = 800;
    baseDailyTransitPerTraveler = 650;
  } else if (formData.travelType === 'Solo') {
    baseDailyStayPerTraveler = 900; // Hostel / guesthouse
    baseDailyFoodPerTraveler = 600;
  }

  // Adjust for destination cost factor
  const lowerDest = destinationName.toLowerCase();
  let costMultiplier = 1.0;
  if (lowerDest.includes('goa') || lowerDest.includes('kashmir')) costMultiplier = 1.25;
  if (lowerDest.includes('manali') || lowerDest.includes('shimla')) costMultiplier = 1.1;
  if (lowerDest.includes('delhi') || lowerDest.includes('amritsar')) costMultiplier = 0.95;

  const totalStay = Math.round(baseDailyStayPerTraveler * travelers * totalDays * costMultiplier);
  const totalFood = Math.round(baseDailyFoodPerTraveler * travelers * totalDays * costMultiplier);
  const totalSightseeing = Math.round(baseDailySightseeingPerTraveler * travelers * totalDays * costMultiplier);
  const totalTransit = Math.round(baseDailyTransitPerTraveler * travelers * totalDays * costMultiplier);
  const totalShopping = Math.round(baseShoppingPerTraveler * travelers * costMultiplier);
  const totalMisc = Math.round(baseMiscPerTraveler * travelers * totalDays * 0.3 * costMultiplier);

  const totalEstimatedCost = totalStay + totalFood + totalSightseeing + totalTransit + totalShopping + totalMisc;
  const isOverBudget = totalEstimatedCost > userBudget;
  const overBudgetAmount = isOverBudget ? totalEstimatedCost - userBudget : 0;
  const remainingBudget = isOverBudget ? 0 : userBudget - totalEstimatedCost;

  const budgetBreakdown: BudgetBreakdown = {
    transportationINR: totalTransit,
    accommodationINR: totalStay,
    foodINR: totalFood,
    sightseeingINR: totalSightseeing,
    shoppingINR: totalShopping,
    miscellaneousINR: totalMisc,
    totalEstimatedCostINR: totalEstimatedCost,
    targetBudgetINR: userBudget,
    remainingBudgetINR: remainingBudget,
    isOverBudget,
    overBudgetAmountINR: overBudgetAmount,
  };

  // Generate day-wise activities
  const days: DayItinerary[] = [];
  const attractionsList = matchedDest ? matchedDest.attractions : [
    `${destinationName} City Center`,
    `${destinationName} Heritage Monument`,
    `${destinationName} Scenic Viewpoint`,
    `${destinationName} Local Artisan Market`,
    `${destinationName} Sunset Point`,
  ];

  for (let i = 1; i <= totalDays; i++) {
    const dayTheme = getDayTheme(destinationName, i, totalDays, formData.preferences);
    const dayAttraction1 = attractionsList[(i * 2 - 2) % attractionsList.length];
    const dayAttraction2 = attractionsList[(i * 2 - 1) % attractionsList.length];

    const morningCost = Math.round((totalSightseeing / totalDays) * 0.4);
    const afternoonCost = Math.round((totalFood / totalDays) * 0.4 + (totalSightseeing / totalDays) * 0.3);
    const eveningCost = Math.round((totalFood / totalDays) * 0.6 + (totalShopping / totalDays) * 0.5);

    days.push({
      dayNumber: i,
      title: `Day ${i}: ${dayTheme}`,
      theme: dayTheme,
      morning: {
        timeSlot: 'Morning',
        time: '08:30 AM - 12:00 PM',
        title: `Explore ${dayAttraction1}`,
        description: `Kickstart the day early with a guided visit to ${dayAttraction1}. Enjoy morning sunlight and photo opportunities before tourist crowds arrive.`,
        location: dayAttraction1,
        costINR: morningCost,
        category: formData.preferences[0] || 'Sightseeing',
        highlight: true,
      },
      afternoon: {
        timeSlot: 'Afternoon',
        time: '12:30 PM - 04:00 PM',
        title: `Local Lunch & Cultural Walk at ${dayAttraction2}`,
        description: `Relish regional cuisine at recommended dining spots, followed by a relaxed exploration of ${dayAttraction2} and historic architecture.`,
        location: dayAttraction2,
        costINR: afternoonCost,
        category: 'Food & Heritage',
      },
      evening: {
        timeSlot: 'Evening',
        time: '05:00 PM - 09:30 PM',
        title: `Sunset Experience, Local Bazaars & Dinner`,
        description: `Watch the sunset over the valley or horizon, explore vibrant shopping alleys for souvenirs, and enjoy a curated dinner.`,
        location: `${destinationName} Promenade / Mall Area`,
        costINR: eveningCost,
        category: 'Shopping & Dining',
        highlight: i === 1 || i === totalDays,
      },
      recommendedRestaurants: getRestaurantsForDestination(destinationName, i),
      attractionsCovered: [dayAttraction1, dayAttraction2],
      dayEstimatedCostINR: morningCost + afternoonCost + eveningCost + Math.round(totalStay / totalDays),
    });
  }

  return {
    id: `tripmate_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    destination: destinationName,
    startingLocation: formData.startingLocation || 'Home City',
    departureDate: formData.departureDate,
    returnDate: formData.returnDate,
    totalDays,
    travelers,
    travelType: formData.travelType,
    preferences: formData.preferences,
    destinationOverview,
    destinationImage,
    budget: budgetBreakdown,
    itinerary: days,
    travelTips: getTravelTips(destinationName, formData.travelType),
    createdAt: new Date().toISOString(),
  };
}

function getDayTheme(dest: string, day: number, total: number, prefs: string[]): string {
  if (day === 1) return `Arrival, Iconic Orientation & Evening Stroll`;
  if (day === total) return `Morning Souvenirs, Farewell Delights & Departure`;

  const pref = prefs[(day - 2) % (prefs.length || 1)] || 'Exploration';
  const themes = [
    `Deep Dive into ${pref} & Hidden Gems`,
    `Scenic Escapes & Cultural Heritage`,
    `Outdoor Adventures & Local Artisan Crafts`,
    `Gastronomy Trails & Sunset Panoramas`,
  ];
  return themes[(day - 2) % themes.length];
}

function getRestaurantsForDestination(dest: string, day: number) {
  const d = dest.toLowerCase();
  if (d.includes('manali')) {
    return [
      { name: 'Cafe 1947 (Old Manali)', specialty: 'Riverside Italian, Trout & Fresh Baked Pizzas', estimatedCostForTwoINR: 900, type: 'Cafe / Scenic' },
      { name: 'Johnson’s Cafe & Bar', specialty: 'Signature Wood-Smoked Trout & Himachali Platters', estimatedCostForTwoINR: 1200, type: 'Fine Dining' },
      { name: 'Chopsticks Restaurant', specialty: 'Steaming Tibetan Momos, Thukpa & Herbal Teas', estimatedCostForTwoINR: 500, type: 'Budget Local' },
    ];
  }
  if (d.includes('goa')) {
    return [
      { name: 'Fisherman’s Wharf', specialty: 'Goan Fish Curry, Prawn Balchão & Bebinca', estimatedCostForTwoINR: 1400, type: 'Seafood Specialist' },
      { name: 'Vinayak Family Restaurant', specialty: 'Authentic Budget Goan Fish Thali', estimatedCostForTwoINR: 600, type: 'Local Authentic' },
      { name: 'Curlies Beach Shack', specialty: 'Sunset Cocktails & Continental Beach Bites', estimatedCostForTwoINR: 1100, type: 'Beach Shack' },
    ];
  }
  if (d.includes('jaipur')) {
    return [
      { name: 'Chokhi Dhani Ethnic Resort', specialty: 'Unlimited Traditional Rajasthani Thali & Folk Show', estimatedCostForTwoINR: 1800, type: 'Cultural Experience' },
      { name: 'Laxmi Mishthan Bhandar (LMB)', specialty: 'World-famous Pyaaz Kachori & Royal Ghevar', estimatedCostForTwoINR: 500, type: 'Heritage Sweets' },
      { name: '1135 AD (Amer Fort)', specialty: 'Royal Rajputana Dum Pukht & Palace Ambiance', estimatedCostForTwoINR: 2500, type: 'Heritage Luxury' },
    ];
  }
  if (d.includes('amritsar')) {
    return [
      { name: 'Bhai Kulwant Singh Kulchian Wale', specialty: 'Crispy Butter-drenched Amritsari Aloo Kulcha', estimatedCostForTwoINR: 350, type: 'Street Legend' },
      { name: 'Kesar Da Dhaba', specialty: 'Slow-cooked Dal Makhani & Phirni in Clay Pots', estimatedCostForTwoINR: 650, type: 'Historic Dhaba' },
      { name: 'Gurdas Ram Jalebi Wala', specialty: 'Hot Crisp Desi Ghee Jalebis & Rabri', estimatedCostForTwoINR: 200, type: 'Dessert Icon' },
    ];
  }
  if (d.includes('delhi')) {
    return [
      { name: 'Karim’s (Jama Masjid)', specialty: 'Mutton Seekh Kebab, Butter Naan & Nihari', estimatedCostForTwoINR: 950, type: 'Mughlai Landmark' },
      { name: 'Saravana Bhavan (Connaught Place)', specialty: 'Crispy Ghee Roast Dosa & Filter Coffee', estimatedCostForTwoINR: 600, type: 'South Indian' },
      { name: 'Gulati (Pandara Road)', specialty: 'Rich Murgh Makhani & Garlic Naan', estimatedCostForTwoINR: 1500, type: 'North Indian' },
    ];
  }
  // Generic high-rated options
  return [
    { name: `${dest} Heritage Kitchen`, specialty: 'Regional Traditional Thali & Local Specialties', estimatedCostForTwoINR: 750, type: 'Traditional' },
    { name: 'The Travelers Cafe & Bistro', specialty: 'Wood-fired Pizzas, Fresh Salads & Specialty Coffee', estimatedCostForTwoINR: 850, type: 'Cafe' },
    { name: 'Street Food Boulevard', specialty: 'Famous Regional Street Snacks & Desserts', estimatedCostForTwoINR: 350, type: 'Street Food' },
  ];
}

function getTravelTips(dest: string, travelType: string): string[] {
  const tips = [
    `Book internal activities and tourist tickets at least 24 hours in advance to bypass long queues.`,
    `Keep at least ₹2,000 in cash handy as street markets and mountain vendors often have patchy UPI connectivity.`,
    `Always negotiate auto-rickshaw fares or prefer metered/app-based cabs for transparent pricing.`,
  ];

  if (travelType === 'Solo') {
    tips.push(`Share your live location with a trusted friend and stay in verified hostels with high safety ratings.`);
  } else if (travelType === 'Family') {
    tips.push(`Schedule midday rests between activities to keep children and seniors refreshed.`);
  } else if (travelType === 'Couple') {
    tips.push(`Reserve sunset viewpoints and dinner tables early for optimal romantic views.`);
  } else if (travelType === 'Friends') {
    tips.push(`Use Splitwise or common pooled cash for seamless group food and cab payments.`);
  }

  return tips;
}

