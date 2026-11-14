'use client';

import React from 'react';
import { BudgetBreakdown } from '@/types/tripmate';
import {
  IndianRupee,
  Bus,
  Bed,
  Utensils,
  Camera,
  ShoppingBag,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  PieChart,
} from 'lucide-react';

interface BudgetSectionProps {
  budget: BudgetBreakdown;
  travelers: number;
}

export const BudgetSection: React.FC<BudgetSectionProps> = ({ budget, travelers }) => {
  const categories = [
    { label: 'Accommodation', amount: budget.accommodationINR, icon: Bed, color: 'bg-indigo-500', barColor: '#6366F1', border: 'border-indigo-100', text: 'text-indigo-600' },
    { label: 'Food & Dining', amount: budget.foodINR, icon: Utensils, color: 'bg-amber-500', barColor: '#F59E0B', border: 'border-amber-100', text: 'text-amber-600' },
    { label: 'Sightseeing & Entry', amount: budget.sightseeingINR, icon: Camera, color: 'bg-emerald-500', barColor: '#10B981', border: 'border-emerald-100', text: 'text-emerald-600' },
    { label: 'Transportation', amount: budget.transportationINR, icon: Bus, color: 'bg-blue-500', barColor: '#3B82F6', border: 'border-blue-100', text: 'text-blue-600' },
    { label: 'Shopping', amount: budget.shoppingINR, icon: ShoppingBag, color: 'bg-pink-500', barColor: '#EC4899', border: 'border-pink-100', text: 'text-pink-600' },
    { label: 'Miscellaneous', amount: budget.miscellaneousINR, icon: Sparkles, color: 'bg-purple-500', barColor: '#A855F7', border: 'border-purple-100', text: 'text-purple-600' },
  ];

  const total = budget.totalEstimatedCostINR || 1;
  const perPersonCost = Math.round(budget.totalEstimatedCostINR / (travelers || 1));

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE0D2] shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-orange-100 text-[#FF6B35]">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Trip Budget & Expense Planner</h3>
              <p className="text-xs text-slate-500">Itemized calculation in Indian Rupees (INR)</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold uppercase">Cost per traveler</div>
            <div className="text-lg font-black text-slate-900">
              ₹{perPersonCost.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-500 ml-1">({travelers} pax)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning if over budget */}
      {budget.isOverBudget && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold block text-sm">Budget Warning: Estimated Expenses Exceed Your Target!</span>
            Estimated trip expenses (₹{budget.totalEstimatedCostINR.toLocaleString('en-IN')}) exceed your target budget of ₹{budget.targetBudgetINR.toLocaleString('en-IN')} by <strong>₹{budget.overBudgetAmountINR.toLocaleString('en-IN')}</strong>. Consider reducing travel duration or opting for hostel accommodation.
          </div>
        </div>
      )}

      {/* If within budget */}
      {!budget.isOverBudget && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Well-Paced Budget! Within your ₹{budget.targetBudgetINR.toLocaleString('en-IN')} limit.</span>
          </div>
          <div className="font-bold text-emerald-900">
            ₹{budget.remainingBudgetINR.toLocaleString('en-IN')} Surplus
          </div>
        </div>
      )}

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE2D5]">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Total Target Budget
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{budget.targetBudgetINR.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Assigned by user</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE2D5]">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Estimated Total Expenses
          </div>
          <div className={`text-2xl font-black ${budget.isOverBudget ? 'text-rose-600' : 'text-slate-900'}`}>
            ₹{budget.totalEstimatedCostINR.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Calculated all-inclusive</div>
        </div>

        <div className={`p-4 rounded-2xl border ${budget.isOverBudget ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-600">
            {budget.isOverBudget ? 'Deficit (Over Budget)' : 'Remaining Savings'}
          </div>
          <div className={`text-2xl font-black ${budget.isOverBudget ? 'text-rose-600' : 'text-emerald-700'}`}>
            {budget.isOverBudget ? `-₹${budget.overBudgetAmountINR.toLocaleString('en-IN')}` : `₹${budget.remainingBudgetINR.toLocaleString('en-IN')}`}
          </div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5">
            {budget.isOverBudget ? 'Requires budget top-up' : 'Available for shopping/buffer'}
          </div>
        </div>
      </div>

      {/* Multi-color Expense Breakdown Visual Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
          <span>Expense Distribution Percentage</span>
          <span>100% Total Calculated</span>
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-full flex overflow-hidden shadow-inner p-0.5">
          {categories.map((c, i) => {
            const pct = Math.max(Math.round((c.amount / total) * 100), 2);
            return (
              <div
                key={i}
                style={{ width: `${pct}%`, backgroundColor: c.barColor }}
                className="h-full first:rounded-l-full last:rounded-r-full transition-all"
                title={`${c.label}: ₹${c.amount.toLocaleString('en-IN')} (${pct}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* Itemized 6-Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const percentage = Math.round((cat.amount / total) * 100);
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl bg-white border ${cat.border} shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className={`p-1.5 rounded-xl ${cat.color} text-white`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {percentage}%
                </span>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-500 truncate">{cat.label}</div>
                <div className="text-sm font-black text-slate-900 mt-0.5">
                  ₹{cat.amount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400 italic">
        * Note: Prices shown are realistic market averages calculated for {travelers} traveler(s). Actual rates may fluctuate based on seasonal peak demand and booking timing.
      </p>
    </div>
  );
};

