'use client';

import React, { useState } from 'react';
import { TripItinerary } from '@/types';
import { Sparkles, Send, Bot, RefreshCw, MessageSquare } from 'lucide-react';

interface AiAssistantChatProps {
  currentTrip: TripItinerary;
  onTripUpdated: (updated: TripItinerary) => void;
  isMockMode?: boolean;
}

export const AiAssistantChat: React.FC<AiAssistantChatProps> = ({
  currentTrip,
  onTripUpdated,
  isMockMode = false,
}) => {
  const [instruction, setInstruction] = useState('');
  const [isModifying, setIsModifying] = useState(false);
  const [history, setHistory] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Hello! I am your AI travel companion for ${currentTrip.destination}. Need any changes? You can ask me to swap activities, reduce budget, or find vegetarian dining.`,
    },
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim() || isModifying) return;

    const userText = instruction.trim();
    setInstruction('');
    setHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsModifying(true);

    try {
      const res = await fetch('/api/trip/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentTrip,
          userInstruction: userText,
          forceMock: isMockMode,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        onTripUpdated(json.data);
        setHistory((prev) => [
          ...prev,
          {
            sender: 'assistant',
            text: `Updated! I have adjusted your itinerary to incorporate: "${userText}". Check the updated schedule and budget.`,
          },
        ]);
      } else {
        throw new Error(json.error || 'Failed to update itinerary');
      }
    } catch (err: any) {
      setHistory((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: `Sorry, I encountered an issue updating your itinerary: ${err.message}. Please try again.`,
        },
      ]);
    } finally {
      setIsModifying(false);
    }
  };

  const quickPrompts = [
    'Reduce budget by 15%',
    'Replace dinner with local street food',
    'Add an early sunrise viewpoint',
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col h-[420px]">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="p-2 bg-brand-600 text-white rounded-xl shadow-sm">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">In-Context AI Assistant</h4>
          <p className="text-xs text-slate-500">Ask natural edits to your current plan</p>
        </div>
      </div>

      {/* Message history */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
        {history.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isModifying && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-600 rounded-2xl rounded-bl-none px-3.5 py-2.5 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-600" />
              <span>Updating your itinerary...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="py-2 flex flex-wrap gap-1.5 border-t border-slate-100">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setInstruction(qp)}
            className="text-[11px] px-2 py-1 rounded-md bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-600 border border-slate-200/60 transition-colors truncate max-w-full"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="e.g. &quot;Replace Day 2 dinner with street food&quot;..."
          disabled={isModifying}
          className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={isModifying || !instruction.trim()}
          className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-medium disabled:opacity-50 transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

