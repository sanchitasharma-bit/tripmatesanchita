export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export type ActivityCategory = 'sightseeing' | 'food' | 'stay' | 'transit' | 'leisure';

export interface Activity {
  id: string;
  timeSlot: TimeSlot;
  timeRange: string; // e.g. "09:00 AM - 11:30 AM"
  title: string;
  description: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  estimatedCostINR: number;
  category: ActivityCategory;
  isHiddenGem?: boolean;
  travelTips?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  estimatedDayCostINR: number;
  activities: Activity[];
}

export interface BudgetBreakdown {
  accommodationINR: number;
  foodAndDiningINR: number;
  activitiesAndEntryINR: number;
  localTransitINR: number;
  emergencyBufferINR: number;
  totalEstimatedCostINR: number;
  targetBudgetINR: number;
}

export interface PackingItem {
  id: string;
  category: 'Essentials' | 'Clothing' | 'Electronics' | 'Toiletries' | 'Documents';
  name: string;
  isPacked: boolean;
  reason?: string;
}

export interface DestinationWeather {
  temperatureC: number;
  condition: string;
  rainProbabilityPercent: number;
  advisory?: string;
  highC: number;
  lowC: number;
}

export interface TripItinerary {
  id: string;
  title: string;
  destination: string;
  origin?: string;
  durationDays: number;
  travelerCount: number;
  travelStyle: 'budget' | 'balanced' | 'luxury' | 'adventure' | 'family';
  overview: string;
  targetBudgetINR: number;
  budgetBreakdown: BudgetBreakdown;
  weatherOverview?: DestinationWeather;
  days: ItineraryDay[];
  packingList: PackingItem[];
  localCuisineToTry: string[];
  importantDoAndDonts: string[];
  createdAt: string;
}

export interface TripGenerationRequest {
  destination: string;
  origin?: string;
  durationDays: number;
  budgetINR: number;
  travelerCount: number;
  travelStyle?: 'budget' | 'balanced' | 'luxury' | 'adventure' | 'family';
  interests?: string[];
  customNotes?: string;
}

export interface TripModificationRequest {
  currentTrip: TripItinerary;
  userInstruction: string;
}

