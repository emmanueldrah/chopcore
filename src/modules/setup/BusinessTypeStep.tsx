import React, { useState } from 'react';
import { BusinessMode } from '../../store/businessStore';
import { FastForward, UtensilsCrossed, Beer, PartyPopper } from 'lucide-react';

const modes = [
  { id: BusinessMode.FAST_FOOD, title: 'Fast Food', desc: 'Quick counter ordering, takeaway & delivery focus.', icon: FastForward },
  { id: BusinessMode.SIT_DOWN, title: 'Sit-down Restaurant', desc: 'Table management, waiters, courses, and reservations.', icon: UtensilsCrossed },
  { id: BusinessMode.CHOP_BAR, title: 'Chop Bar', desc: 'Counter + basic table service for local joints.', icon: Beer },
  { id: BusinessMode.CATERING, title: 'Catering', desc: 'Event bookings, per-head pricing, and large orders.', icon: PartyPopper },
];

export const BusinessTypeStep: React.FC<{ onNext: (data: any) => void; onPrev: () => void; initialMode: string }> = ({ onNext, onPrev, initialMode }) => {
  const [selected, setSelected] = useState(initialMode);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setSelected(mode.id)}
            className={`p-6 border-2 rounded-xl text-left transition-all ${
              selected === mode.id ? 'border-primary bg-orange-50 ring-4 ring-orange-100' : 'border-gray-100 hover:border-gray-300 bg-white'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${selected === mode.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
              <mode.icon size={24} />
            </div>
            <h3 className="font-bold text-lg mb-1">{mode.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{mode.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <p className="text-sm text-red-700 font-medium">
          Warning: Once confirmed, the business type cannot be changed without a complete system reset by a Super Admin.
        </p>
      </div>

      <div className="flex space-x-4 pt-4">
        <button onClick={onPrev} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition">
          Back
        </button>
        <button
          onClick={() => onNext({ mode: selected })}
          disabled={!selected}
          className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
