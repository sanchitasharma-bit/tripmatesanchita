'use client';

import React from 'react';
import { BudgetBreakdown as IBudgetBreakdown } from '@/types';
import { IndianRupee, Bed, Utensils, Compass, Bus, ShieldCheck } from 'lucide-react';

interface BudgetBreakdownProps {
  breakdown: IBudgetBreakdown;
  travelerCount: number;
}

export const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({ breakdown, travelerCount }) => {
  const total = breakdown.totalEstimatedCostINR || 1;
  const perPerson = Math.round(total / (travelerCount || 1));

  const items = [
    { label: 'Stay & Hotels', amount: breakdown.accommodationINR, icon: Bed, color: 'bg-indigo-500', text: 'text-indigo-600' },
    { label: 'Food & Dining', amount: breakdown.foodAndDiningINR, icon: Utensils, color: 'bg-amber-500', text: 'text-amber-600' },
    { label: 'Activities & Entry', amount: breakdown.activitiesAndEntryINR, icon: Compass, color: 'bg-emerald-500', text: 'text-emerald-600' },
    { label: 'Local Transit', amount: breakdown.localTransitINR, icon: Bus, color: 'bg-blue-500', text: 'text-blue-600' },
    { label: 'Safety Buffer', amount: breakdown.emergencyBufferINR, icon: ShieldCheck, color: 'bg-purple-500', text: 'text-purple-600' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-brand-600" />
            <span>Smart Budget Allocation</span>
          </h3>
          <p className="text-xs text-slate-500">Estimated plan based on current market averages</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-slate-900">
            ₹{total.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] font-medium text-slate-500">
            ~₹{perPerson.toLocaleString('en-IN')} per traveler ({travelerCount} pax)
          </div>
        </div>
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden mb-4 shadow-inner">
        {items.map((item, idx) => {
          const pct = Math.max(Math.round((item.amount / total) * 100), 2);
          return (
            <div
              key={idx}
              style={{ width: `${pct}%` }}
              className={`${item.color} h-full transition-all`}
              title={`${item.label}: ₹${item.amount.toLocaleString('en-IN')} (${pct}%)`}
            />
          );
        })}
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {items.map((item, idx) => {
          const pct = Math.round((item.amount / total) * 100);
          const Icon = item.icon;
          return (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                <Icon className={`w-3.5 h-3.5 ${item.text}`} />
                <span className="truncate font-medium">{item.label}</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                ₹{item.amount.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">{pct}% of budget</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

