import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveWeather } from '@/lib/weather/open-meteo';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get('destination') || 'Manali';

  try {
    const weather = await fetchLiveWeather(destination);
    return NextResponse.json({ success: true, data: weather });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch weather' },
      { status: 500 }
    );
  }
}

