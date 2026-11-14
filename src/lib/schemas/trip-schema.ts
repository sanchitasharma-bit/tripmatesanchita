import { z } from 'zod';

export const ActivitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  timeSlot: z.enum(['morning', 'afternoon', 'evening', 'night']),
  timeRange: z.string().default('Flexible'),
  title: z.string().min(2),
  description: z.string(),
  locationName: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  estimatedCostINR: z.number().nonnegative().default(0),
  category: z.enum(['sightseeing', 'food', 'stay', 'transit', 'leisure']).default('sightseeing'),
  isHiddenGem: z.boolean().default(false),
  travelTips: z.string().optional(),
});

export const ItineraryDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  title: z.string(),
  theme: z.string(),
  estimatedDayCostINR: z.number().nonnegative().default(0),
  activities: z.array(ActivitySchema),
});

export const BudgetBreakdownSchema = z.object({
  accommodationINR: z.number().nonnegative(),
  foodAndDiningINR: z.number().nonnegative(),
  activitiesAndEntryINR: z.number().nonnegative(),
  localTransitINR: z.number().nonnegative(),
  emergencyBufferINR: z.number().nonnegative(),
  totalEstimatedCostINR: z.number().nonnegative(),
  targetBudgetINR: z.number().nonnegative(),
});

export const PackingItemSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  category: z.enum(['Essentials', 'Clothing', 'Electronics', 'Toiletries', 'Documents']),
  name: z.string(),
  isPacked: z.boolean().default(false),
  reason: z.string().optional(),
});

export const TripItinerarySchema = z.object({
  id: z.string().default(() => `trip_${Date.now()}`),
  title: z.string(),
  destination: z.string(),
  origin: z.string().optional(),
  durationDays: z.number().int().positive(),
  travelerCount: z.number().int().positive().default(1),
  travelStyle: z.enum(['budget', 'balanced', 'luxury', 'adventure', 'family']).default('balanced'),
  overview: z.string(),
  targetBudgetINR: z.number().nonnegative(),
  budgetBreakdown: BudgetBreakdownSchema,
  days: z.array(ItineraryDaySchema),
  packingList: z.array(PackingItemSchema).default([]),
  localCuisineToTry: z.array(z.string()).default([]),
  importantDoAndDonts: z.array(z.string()).default([]),
  createdAt: z.string().default(() => new Date().toISOString()),
});

export const TripPromptInputSchema = z.object({
  prompt: z.string().min(3),
  origin: z.string().optional(),
  destination: z.string().optional(),
  durationDays: z.number().int().min(1).max(30).optional(),
  budgetINR: z.number().min(1000).optional(),
  travelerCount: z.number().int().min(1).max(20).optional(),
  travelStyle: z.enum(['budget', 'balanced', 'luxury', 'adventure', 'family']).optional(),
});

