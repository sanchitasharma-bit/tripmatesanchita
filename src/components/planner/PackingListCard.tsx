'use client';

import React, { useState } from 'react';
import { PackingItem } from '@/types';
import { Backpack, CheckSquare, Square, Plus } from 'lucide-react';

interface PackingListCardProps {
  initialItems: PackingItem[];
}

export const PackingListCard: React.FC<PackingListCardProps> = ({ initialItems }) => {
  const [items, setItems] = useState<PackingItem[]>(initialItems);
  const [filter, setFilter] = useState<string>('All');
  const [newItemName, setNewItemName] = useState('');

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPacked: !item.isPacked } : item))
    );
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: PackingItem = {
      id: `custom_${Date.now()}`,
      category: 'Essentials',
      name: newItemName.trim(),
      isPacked: false,
    };
    setItems((prev) => [...prev, newItem]);
    setNewItemName('');
  };

  const categories = ['All', 'Essentials', 'Clothing', 'Electronics', 'Toiletries', 'Documents'];
  const filtered = filter === 'All' ? items : items.filter((i) => i.category === filter);
  const packedCount = items.filter((i) => i.isPacked).length;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-sm">
            <Backpack className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Smart Packing Checklist</h4>
            <p className="text-xs text-slate-500">
              {packedCount} of {items.length} items packed
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          {Math.round((packedCount / (items.length || 1)) * 100)}% Ready
        </span>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
              filter === cat
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs border border-transparent hover:border-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              {item.isPacked ? (
                <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
              )}
              <span className={item.isPacked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>
                {item.name}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
              {item.category}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Add Form */}
      <form onSubmit={addItem} className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add custom packing item..."
          className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={!newItemName.trim()}
          className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

