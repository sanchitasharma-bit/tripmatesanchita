import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/ai-factory';
import { TripModificationRequest } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: TripModificationRequest & { forceMock?: boolean } = await req.json();

    if (!body.currentTrip || !body.userInstruction) {
      return NextResponse.json(
        { success: false, error: 'currentTrip and userInstruction are required' },
        { status: 400 }
      );
    }

    const provider = getAIProvider(body.forceMock === true);
    const updatedItinerary = await provider.modifyTrip({
      currentTrip: body.currentTrip,
      userInstruction: body.userInstruction,
    });

    return NextResponse.json({
      success: true,
      provider: provider.providerName,
      data: updatedItinerary,
    });
  } catch (error: any) {
    console.error('Trip modification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to modify itinerary' },
      { status: 500 }
    );
  }
}

