import { GoogleGenerativeAI } from '@google/generative-ai';
import { IAIProvider } from './ai-interface';
import { TripGenerationRequest, TripItinerary, TripModificationRequest } from '@/types';
import { TripItinerarySchema } from '../schemas/trip-schema';

export class GeminiTripProvider implements IAIProvider {
  readonly providerName = 'Google Gemini AI';
  private genAI: GoogleGenerativeAI;
  private modelName: string;

  constructor(apiKey: string, modelName = 'gemini-1.5-flash') {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = modelName;
  }

  async generateTrip(request: TripGenerationRequest): Promise<TripItinerary> {
    const model = this.genAI.getGenerativeModel({
      model: this.modelName,
      generationConfig: {
        responseMimeType: 'application/json',
      },
      systemInstruction: `You are an elite travel architect and Indian travel expert.
Your job is to generate a complete, realistic, day-wise travel itinerary in pure JSON according to the schema provided.
CRITICAL RULES:
1. All monetary figures MUST be in Indian Rupees (INR) and formatted as pure numbers (e.g. 1500, not "₹1500").
2. The total sum of budgetBreakdown (accommodationINR + foodAndDiningINR + activitiesAndEntryINR + localTransitINR + emergencyBufferINR) MUST equal or be less than targetBudgetINR.
3. Every day must contain 3-4 structured activities categorized across morning, afternoon, evening, and night.
4. Highlight at least one genuine 'hidden gem' activity in the trip.
5. Provide actionable packing list items, regional cuisines to sample, and sensible do's and don'ts.
6. Return ONLY valid JSON matching the exact schema. Do not include markdown code fence formatting.`,
    });

    const prompt = `Plan a ${request.durationDays}-day trip to "${request.destination}"${request.origin ? ` starting from "${request.origin}"` : ''}.
Budget: ₹${request.budgetINR.toLocaleString('en-IN')} total for ${request.travelerCount} traveler(s).
Travel Style: ${request.travelStyle || 'balanced'}.
${request.customNotes ? `Additional requirements: ${request.customNotes}` : ''}

Expected JSON Schema Structure:
{
  "title": string,
  "destination": string,
  "origin": string,
  "durationDays": number,
  "travelerCount": number,
  "travelStyle": "budget" | "balanced" | "luxury" | "adventure" | "family",
  "overview": string,
  "targetBudgetINR": number,
  "budgetBreakdown": {
    "accommodationINR": number,
    "foodAndDiningINR": number,
    "activitiesAndEntryINR": number,
    "localTransitINR": number,
    "emergencyBufferINR": number,
    "totalEstimatedCostINR": number,
    "targetBudgetINR": number
  },
  "days": [
    {
      "dayNumber": number,
      "title": string,
      "theme": string,
      "estimatedDayCostINR": number,
      "activities": [
        {
          "timeSlot": "morning" | "afternoon" | "evening" | "night",
          "timeRange": string,
          "title": string,
          "description": string,
          "locationName": string,
          "estimatedCostINR": number,
          "category": "sightseeing" | "food" | "stay" | "transit" | "leisure",
          "isHiddenGem": boolean,
          "travelTips": string
        }
      ]
    }
  ],
  "packingList": [
    {
      "category": "Essentials" | "Clothing" | "Electronics" | "Toiletries" | "Documents",
      "name": string,
      "isPacked": false,
      "reason": string
    }
  ],
  "localCuisineToTry": [string],
  "importantDoAndDonts": [string]
}`;

    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const rawData = JSON.parse(text);
    return TripItinerarySchema.parse(rawData);
  }

  async modifyTrip(request: TripModificationRequest): Promise<TripItinerary> {
    const model = this.genAI.getGenerativeModel({
      model: this.modelName,
      generationConfig: {
        responseMimeType: 'application/json',
      },
      systemInstruction: `You are an expert travel assistant. You receive an existing JSON itinerary and a user modification request.
Update the JSON itinerary strictly respecting the user's instructions (e.g. swap an activity, reduce costs, change dining spots).
Return ONLY the updated valid JSON itinerary matching the schema.`,
    });

    const prompt = `CURRENT ITINERARY:
${JSON.stringify(request.currentTrip)}

USER MODIFICATION REQUEST:
"${request.userInstruction}"

Return the complete modified JSON itinerary.`;

    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const rawData = JSON.parse(text);
    return TripItinerarySchema.parse(rawData);
  }
}

