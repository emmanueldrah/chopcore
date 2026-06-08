import React, { useState } from 'react';
import { X, Users, List, CircleDollarSign } from 'lucide-react';

export const SplitBillModal: React.FC<{ total: number; items: any[]; onClose: () => void; onComplete: (splits: any[]) => void }> = ({ total, items, onClose, onComplete }) => {
  const [splitType, setSplitType] = useState<'equal' | 'item'>('equal');
  const [numSplits, setNumSplits] = useState(2);

  const equalAmount = total / numSplits;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden border border-white/20">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Split Bill</h2>
            <p className="text-slate-500 font-bold mt-1">Total to split: ₵ {(total/100).toFixed(2)}</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 space-y-10">
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setSplitType('equal')}
              className={`p-8 rounded-[2rem] border-4 transition-all flex flex-col items-center space-y-4 ${splitType === 'equal' ? 'border-primary bg-orange-50 ring-8 ring-orange-100/50' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${splitType === 'equal' ? 'bg-primary text-white shadow-xl shadow-orange-900/20' : 'bg-slate-100 text-slate-400'}`}>
                <Users size={32} />
              </div>
              <div className="text-center">
                <p className="font-black text-xl text-slate-800">Split Equally</p>
                <p className="text-sm font-bold text-slate-400 mt-1">Divide total by customers</p>
              </div>
            </button>

            <button
              onClick={() => setSplitType('item')}
              className={`p-8 rounded-[2rem] border-4 transition-all flex flex-col items-center space-y-4 ${splitType === 'item' ? 'border-primary bg-orange-50 ring-8 ring-orange-100/50' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${splitType === 'item' ? 'bg-primary text-white shadow-xl shadow-orange-900/20' : 'bg-slate-100 text-slate-400'}`}>
                <List size={32} />
              </div>
              <div className="text-center">
                <p className="font-black text-xl text-slate-800">Split by Item</p>
                <p className="text-sm font-bold text-slate-400 mt-1">Assign items to customers</p>
              </div>
            </button>
          </div>

          {splitType === 'equal' && (
            <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-100 animate-in fade-in slide-in-from-bottom-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Number of People</label>
              <div className="flex items-center space-x-6">
                <div className="flex bg-white rounded-2xl p-2 border-2 border-slate-200 shadow-sm">
                  {[2, 3, 4, 5, 6].map(n => (
                    <button key={n} onClick={() => setNumSplits(n)} className={`w-14 h-14 rounded-xl font-black text-lg transition-all ${numSplits === n ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>{n}</button>
                  ))}
                </div>
                <div className="flex-1 text-right">
                  <p className="text-slate-400 font-bold text-sm">Each person pays:</p>
                  <p className="text-4xl font-black text-primary tracking-tighter italic">₵ {(equalAmount/100).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-10 bg-slate-50 border-t border-slate-100 flex space-x-4">
          <button onClick={onClose} className="flex-1 py-5 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Cancel</button>
          <button
            onClick={() => onComplete(Array(numSplits).fill({ amount: equalAmount }))}
            className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
          >
            <CircleDollarSign size={24} />
            <span>Confirm Split & Pay</span>
          </button>
        </div>
      </div>
    </div>
  );
};
