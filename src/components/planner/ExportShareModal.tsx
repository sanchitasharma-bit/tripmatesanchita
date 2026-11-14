'use client';

import React, { useState } from 'react';
import { TripItinerary } from '@/types';
import { Share2, Printer, Check, Copy, MessageCircle, X } from 'lucide-react';

interface ExportShareModalProps {
  trip: TripItinerary;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportShareModal: React.FC<ExportShareModalProps> = ({ trip, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out my ${trip.durationDays}-day trip plan to ${trip.destination} (Budget: ₹${trip.targetBudgetINR.toLocaleString('en-IN')}) generated with SafarAI!`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(waUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-bold text-slate-900">Share & Export Itinerary</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trip Overview Pill */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 mb-4 text-xs">
          <div className="font-bold text-slate-800">{trip.title}</div>
          <div className="text-slate-500 mt-0.5">
            {trip.durationDays} Days • ₹{trip.targetBudgetINR.toLocaleString('en-IN')} Budget • {trip.travelerCount} Traveler(s)
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* Print / Save as PDF */}
          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Download / Print PDF Travel Pass</span>
          </button>

          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share to WhatsApp Group</span>
          </button>

          {/* Copy Link */}
          <div className="pt-2">
            <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Shareable Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 text-xs px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

