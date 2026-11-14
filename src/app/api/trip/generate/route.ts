import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/ai-factory';
import { fetchLiveWeather } from '@/lib/weather/open-meteo';
import { TripGenerationRequest } from '@/types';

// Helper to extract duration, destination, budget from natural prompt
function parsePromptToRequest(prompt: string): TripGenerationRequest {
  const p = prompt.toLowerCase();
  
  // Extract days
  const daysMatch = p.match(/(\d+)\s*(-|\s)?(day|days)/);
  const durationDays = daysMatch ? parseInt(daysMatch[1], 10) : 3;

  // Extract budget in INR
  const budgetMatch = p.match(/(?:rs\.?|inr|₹)\s*([\d,]+)/i) || p.match(/under\s*([\d,]+)/i) || p.match(/budget\s*(?:of)?\s*([\d,]+)/i);
  let budgetINR = 15000;
  if (budgetMatch) {
    const rawNum = budgetMatch[1].replace(/,/g, '');
    const parsed = parseInt(rawNum, 10);
    if (!isNaN(parsed) && parsed > 500) {
      budgetINR = parsed;
    }
  }

  // Extract destination
  let destination = 'Manali';
  const knownPlaces = ['manali', 'goa', 'jaipur', 'udaipur', 'kerala', 'munnar', 'rishikesh', 'leh', 'varanasi', 'agra', 'shimla', 'kasol', 'ooty', 'coorg', 'darjeeling'];
  for (const place of knownPlaces) {
    if (p.includes(place)) {
      destination = place.charAt(0).toUpperCase() + place.slice(1);
      break;
    }
  }

  // Extract travelers
  const travelerMatch = p.match(/(\d+)\s*(people|person|travelers|friends|adults)/i);
  const travelerCount = travelerMatch ? parseInt(travelerMatch[1], 10) : (p.includes('couple') ? 2 : 1);

  // Extract travel style
  let travelStyle: 'budget' | 'balanced' | 'luxury' | 'adventure' | 'family' = 'balanced';
  if (p.includes('budget') || p.includes('cheap') || p.includes('economical')) travelStyle = 'budget';
  else if (p.includes('luxury') || p.includes('premium')) travelStyle = 'luxury';
  else if (p.includes('adventure') || p.includes('trek')) travelStyle = 'adventure';
  else if (p.includes('family') || p.includes('kids')) travelStyle = 'family';

  return {
    destination,
    durationDays,
    budgetINR,
    travelerCount,
    travelStyle,
    customNotes: prompt,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let request: TripGenerationRequest;

    if (body.prompt && (!body.destination || !body.budgetINR)) {
      request = parsePromptToRequest(body.prompt);
    } else {
      request = {
        destination: body.destination || 'Manali',
        origin: body.origin,
        durationDays: Number(body.durationDays) || 3,
        budgetINR: Number(body.budgetINR) || 15000,
        travelerCount: Number(body.travelerCount) || 1,
        travelStyle: body.travelStyle || 'balanced',
        customNotes: body.customNotes || body.prompt,
      };
    }

    const provider = getAIProvider(body.forceMock === true);
    let itinerary = await provider.generateTrip(request);

    // Augment with real live weather
    try {
      const weather = await fetchLiveWeather(itinerary.destination);
      itinerary.weatherOverview = weather;
    } catch (weatherErr) {
      console.warn('Weather fetch skipped:', weatherErr);
    }

    return NextResponse.json({
      success: true,
      provider: provider.providerName,
      data: itinerary,
    });
  } catch (error: any) {
    console.error('Trip generation error, using fallback:', error);
    // If AI generation throws, gracefully fall back to mock
    try {
      const fallbackProvider = getAIProvider(true);
      const fallbackItinerary = await fallbackProvider.generateTrip({
        destination: 'Manali',
        durationDays: 3,
        budgetINR: 10000,
        travelerCount: 2,
        travelStyle: 'budget',
      });
      return NextResponse.json({
        success: true,
        provider: 'Demo / Offline Engine (Fallback)',
        data: fallbackItinerary,
      });
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: error.message || 'Failed to generate itinerary' },
        { status: 500 }
      );
    }
  }
}

