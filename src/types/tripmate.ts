export type TravelType = 'Solo' | 'Friends' | 'Family' | 'Couple';

export type PreferenceType = 
  | 'Adventure' 
  | 'Nature' 
  | 'Shopping' 
  | 'Food' 
  | 'Beaches' 
  | 'Historical Places';

export interface DestinationInfo {
  id: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  image: string;
  startingBudgetINR: number;
  attractions: string[];
  bestSeason: string;
  category: PreferenceType[];
}

export interface ActivitySlot {
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  time: string;
  title: string;
  description: string;
  location: string;
  costINR: number;
  category: string;
  highlight?: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  theme: string;
  morning: ActivitySlot;
  afternoon: ActivitySlot;
  evening: ActivitySlot;
  recommendedRestaurants: {
    name: string;
    specialty: string;
    estimatedCostForTwoINR: number;
    type: string;
  }[];
  attractionsCovered: string[];
  dayEstimatedCostINR: number;
}

export interface BudgetBreakdown {
  transportationINR: number;
  accommodationINR: number;
  foodINR: number;
  sightseeingINR: number;
  shoppingINR: number;
  miscellaneousINR: number;
  totalEstimatedCostINR: number;
  targetBudgetINR: number;
  remainingBudgetINR: number;
  isOverBudget: boolean;
  overBudgetAmountINR: number;
}

export interface TripPlan {
  id: string;
  destination: string;
  startingLocation: string;
  departureDate: string;
  returnDate: string;
  totalDays: number;
  travelers: number;
  travelType: TravelType;
  preferences: PreferenceType[];
  destinationOverview: string;
  destinationImage: string;
  budget: BudgetBreakdown;
  itinerary: DayItinerary[];
  travelTips: string[];
  createdAt: string;
}

export interface TripFormData {
  startingLocation: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  budgetINR: number;
  travelType: TravelType;
  preferences: PreferenceType[];
}

