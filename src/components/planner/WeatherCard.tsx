'use client';

import React from 'react';
import { DestinationWeather } from '@/types';
import { CloudSun, Droplets, Thermometer, Info } from 'lucide-react';

interface WeatherCardProps {
  weather?: DestinationWeather;
  destination: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, destination }) => {
  if (!weather) return null;

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50/50 rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500 text-white rounded-xl shadow-sm">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Live Weather Forecast</h4>
            <p className="text-xs text-slate-500">{destination} (Real-time)</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-black text-slate-900">{weather.temperatureC}°C</div>
          <div className="text-[11px] text-slate-500 font-medium">H: {weather.highC}°C | L: {weather.lowC}°C</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-700 bg-white/80 rounded-xl p-2.5 border border-sky-100/60">
        <div className="flex items-center gap-1.5 font-medium">
          <Thermometer className="w-4 h-4 text-amber-500" />
          <span>{weather.condition}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Droplets className="w-4 h-4 text-sky-500" />
          <span>{weather.rainProbabilityPercent}% Rain Chance</span>
        </div>
      </div>

      {weather.advisory && (
        <div className="mt-2.5 flex items-start gap-1.5 text-xs text-sky-900 bg-sky-100/60 rounded-lg p-2">
          <Info className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{weather.advisory}</span>
        </div>
      )}
    </div>
  );
};

