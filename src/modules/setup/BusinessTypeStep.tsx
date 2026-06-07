import React from 'react';
import { BusinessMode } from '../../store/businessStore';

const modes = [
  { id: BusinessMode.FAST_FOOD, title: 'Fast Food', desc: 'Quick counter ordering, takeaway & delivery focus.' },
  { id: BusinessMode.SIT_DOWN, title: 'Sit-down Restaurant', desc: 'Table management, waiters, courses, and reservations.' },
  { id: BusinessMode.CHOP_BAR, title: 'Chop Bar', desc: 'Counter + basic table service for local joints.' },
  { id: BusinessMode.CATERING, title: 'Catering', desc: 'Event bookings, per-head pricing, and large orders.' },
];

export const BusinessTypeStep: React.FC<{ onNext: (data: any) => void; onPrev: () => void }> = ({ onNext, onPrev }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Step 2 — Business Type</h2>
      <div className="grid grid-cols-2 gap-4">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => onNext({ mode: mode.id })}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary text-left transition"
          >
            <h3 className="font-bold text-lg">{mode.title}</h3>
            <p className="text-sm text-gray-600">{mode.desc}</p>
          </button>
        ))}
      </div>
      <p className="text-xs text-red-500 font-medium">Warning: Business type cannot be changed after setup.</p>
      <button
        onClick={onPrev}
        className="w-full text-gray-500 py-2 hover:underline"
      >
        Back
      </button>
    </div>
  );
};
