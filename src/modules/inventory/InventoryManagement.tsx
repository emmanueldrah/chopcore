import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Package, TrendingUp, AlertTriangle, Calendar, Plus, Trash2, BarChart2 } from 'lucide-react';
import { LoadingSkeleton } from '../../components/shared/States';
import { WasteTracker } from './WasteTracker';

export const InventoryManagement: React.FC = () => {
  const [isWasteTrackerOpen, setIsWasteTrackerOpen] = useState(false);

  const { data: ingredients, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/inventory/ingredients').then(res => res.data),
  });

  const { data: valuation } = useQuery({
    queryKey: ['valuation'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/inventory/valuation').then(res => res.data),
  });

  if (isLoading) return <div className="p-8"><LoadingSkeleton count={5} /></div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-10 font-sans">
      <header className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic text-primary">Inventory</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Stock levels & asset valuation</p>
        </div>
        <div className="flex space-x-4">
            <div className="bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-xl flex flex-col justify-center">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Total Asset Value</span>
                <span className="text-2xl font-black italic tracking-tighter text-primary">₵ {((valuation?.total_valuation || 0) / 100).toFixed(2)}</span>
            </div>
            <button
                onClick={() => setIsWasteTrackerOpen(true)}
                className="bg-white border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:border-red-500 hover:text-red-500 transition-all flex items-center space-x-3"
            >
                <Trash2 size={16} />
                <span>Record Waste</span>
            </button>
            <button className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3">
                <Plus size={18} />
                <span>Restock Items</span>
            </button>
        </div>
      </header>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-50/50">
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ingredient</th>
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quantity</th>
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit Cost</th>
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Expiry</th>
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="p-8"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {ingredients?.map((ing: any) => (
                    <tr key={ing.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="p-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                    <Package size={20} />
                                </div>
                                <div>
                                    <p className="font-black text-slate-800 uppercase italic tracking-tighter text-lg">{ing.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Unit: {ing.unit}</p>
                                </div>
                            </div>
                        </td>
                        <td className="p-8">
                            <p className="font-black text-slate-800 text-xl tracking-tighter">0.00 <span className="text-xs uppercase text-slate-400">{ing.unit}</span></p>
                        </td>
                        <td className="p-8 font-black text-slate-800 tracking-tighter">₵ 0.00</td>
                        <td className="p-8">
                            <div className="flex items-center space-x-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                <Calendar size={14} className="text-primary opacity-40" />
                                <span>No Date Set</span>
                            </div>
                        </td>
                        <td className="p-8">
                            <span className="bg-red-50 text-red-500 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-red-100 flex items-center w-fit space-x-2">
                                <AlertTriangle size={12} />
                                <span>Low Stock</span>
                            </span>
                        </td>
                        <td className="p-8 text-right">
                            <button className="p-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-300 hover:border-primary hover:text-primary transition-all shadow-sm">
                                <BarChart2 size={20} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {isWasteTrackerOpen && <WasteTracker onClose={() => setIsWasteTrackerOpen(false)} />}
    </div>
  );
};
