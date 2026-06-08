import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Trash2, AlertCircle, Save, X } from 'lucide-react';

export const WasteTracker: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [ingredientId, setIngredientId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState('');

  const { data: ingredients } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/inventory/ingredients').then(res => res.data),
  });

  const recordWaste = useMutation({
    mutationFn: () => axios.post('http://localhost:8768/api/v1/inventory/stock', {
        ingredient_id: ingredientId,
        quantity: -quantity,
        type: 'WASTE',
        reason: reason
    }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ingredients'] });
        queryClient.invalidateQueries({ queryKey: ['valuation'] });
        onClose();
    }
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-red-50/30">
          <div>
            <h2 className="text-3xl font-black text-red-600 tracking-tighter uppercase italic">Record Waste</h2>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Log spoiled or damaged items</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-300 hover:text-red-500 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Ingredient</label>
            <select
                className="w-full bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl p-4 font-bold outline-none transition-all"
                value={ingredientId}
                onChange={e => setIngredientId(e.target.value)}
            >
                <option value="">Select ingredient...</option>
                {ingredients?.map((ing: any) => (
                    <option key={ing.id} value={ing.id}>{ing.name} ({ing.unit})</option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Quantity to Deduct</label>
            <input
                type="number"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl p-4 font-black text-2xl outline-none transition-all"
                placeholder="0.00"
                onChange={e => setQuantity(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Reason for Waste</label>
            <textarea
                className="w-full bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl p-4 font-bold outline-none transition-all h-32 resize-none"
                placeholder="e.g. Expired, Spilled, Preparation error..."
                value={reason}
                onChange={e => setReason(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="p-10 bg-slate-50 border-t border-slate-100 flex space-x-4">
          <button onClick={onClose} className="flex-1 py-5 font-black text-slate-400 uppercase tracking-widest text-xs">Cancel</button>
          <button
            disabled={!ingredientId || !quantity}
            onClick={() => recordWaste.mutate()}
            className="flex-[2] bg-red-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center space-x-3 disabled:bg-slate-200 disabled:shadow-none"
          >
            <AlertCircle size={18} />
            <span>Confirm Deduct</span>
          </button>
        </div>
      </div>
    </div>
  );
};
