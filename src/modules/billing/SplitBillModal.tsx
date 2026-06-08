import React, { useState } from 'react';
import { X, Users, List, CircleDollarSign, Plus, Check } from 'lucide-react';

export const SplitBillModal: React.FC<{ total: number; items: any[]; onClose: () => void; onComplete: (splits: any[]) => void }> = ({ total, items, onClose, onComplete }) => {
  const [splitType, setSplitType] = useState<'equal' | 'item'>('equal');
  const [numSplits, setNumSplits] = useState(2);
  const [activeCustomer, setActiveCustomer] = useState(0);
  const [assignments, setAssignments] = useState<Record<string, number>>({});

  const equalAmount = total / numSplits;

  const toggleAssignment = (itemId: string, itemCourse: string) => {
    const key = `${itemId}-${itemCourse}`;
    setAssignments(prev => ({
        ...prev,
        [key]: activeCustomer
    }));
  };

  const calculateCustomerTotal = (index: number) => {
    return items.reduce((acc, item) => {
        const key = `${item.id}-${item.course}`;
        return assignments[key] === index ? acc + (item.price * item.quantity) : acc;
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
      <div className="bg-white rounded-[4rem] shadow-2xl w-full max-w-6xl h-[85vh] overflow-hidden border border-white/20 flex flex-col">
        <div className="p-12 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Split Bill</h2>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-xs">Total to distribute: ₵ {(total/100).toFixed(2)}</p>
          </div>
          <button onClick={onClose} className="w-16 h-16 rounded-[2rem] bg-white border-2 border-slate-100 flex items-center justify-center text-slate-300 hover:text-red-500 hover:border-red-100 transition-all shadow-xl hover:scale-110 active:scale-95">
            <X size={32} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Controls */}
          <div className="w-96 border-r border-slate-50 p-10 space-y-8 bg-slate-50/10">
            <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Method</p>
                <button onClick={() => setSplitType('equal')} className={`w-full p-6 rounded-3xl border-4 text-left transition-all ${splitType === 'equal' ? 'border-primary bg-orange-50 ring-8 ring-orange-100/30' : 'border-white bg-white shadow-sm'}`}>
                    <Users className={splitType === 'equal' ? 'text-primary' : 'text-slate-300'} size={24} />
                    <p className="font-black text-slate-800 mt-3">Equal Division</p>
                </button>
                <button onClick={() => setSplitType('item')} className={`w-full p-6 rounded-3xl border-4 text-left transition-all ${splitType === 'item' ? 'border-primary bg-orange-50 ring-8 ring-orange-100/30' : 'border-white bg-white shadow-sm'}`}>
                    <List className={splitType === 'item' ? 'text-primary' : 'text-slate-300'} size={24} />
                    <p className="font-black text-slate-800 mt-3">Split by Item</p>
                </button>
            </div>

            {splitType === 'equal' && (
                <div className="pt-8 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Quantity</p>
                    <div className="grid grid-cols-3 gap-3">
                        {[2, 3, 4, 5, 6, 8].map(n => (
                            <button key={n} onClick={() => setNumSplits(n)} className={`py-4 rounded-2xl font-black transition-all ${numSplits === n ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400'}`}>{n}</button>
                        ))}
                    </div>
                </div>
            )}

            {splitType === 'item' && (
                <div className="pt-8 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Customers</p>
                    <div className="space-y-3">
                        {[0, 1, 2, 3].map(n => {
                            const custTotal = calculateCustomerTotal(n);
                            return (
                                <button key={n} onClick={() => setActiveCustomer(n)} className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${activeCustomer === n ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-white bg-white text-slate-400'}`}>
                                    <span className="font-black">Customer {n+1}</span>
                                    <span className={`font-bold text-xs ${activeCustomer === n ? 'text-primary' : ''}`}>₵ {(custTotal/100).toFixed(2)}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
          </div>

          {/* Main Area */}
          <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
            {splitType === 'equal' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                    <div className="w-32 h-32 bg-orange-50 text-primary rounded-full flex items-center justify-center">
                        <Users size={64} />
                    </div>
                    <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">Each person pays</p>
                        <p className="text-8xl font-black text-slate-900 tracking-tighter italic">₵ {(equalAmount/100).toFixed(2)}</p>
                        <p className="text-slate-300 font-medium mt-4 italic">Split across {numSplits} equal payments</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-6">
                    {items.map(item => {
                        const key = `${item.id}-${item.course}`;
                        const assignedTo = assignments[key];
                        return (
                            <button
                                key={key}
                                onClick={() => toggleAssignment(item.id, item.course)}
                                className={`p-6 rounded-[2rem] border-2 text-left transition-all flex items-center space-x-4 ${assignedTo === activeCustomer ? 'border-primary bg-orange-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${assignedTo === activeCustomer ? 'bg-primary text-white' : 'bg-slate-100 text-slate-300'}`}>
                                    {assignedTo !== undefined ? <Check size={24} strokeWidth={3} /> : <Plus size={24} />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-slate-800 leading-tight uppercase italic">{item.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.quantity}x • {item.course}</p>
                                </div>
                                <p className="font-black text-slate-800 tracking-tighter">₵ {(item.price*item.quantity/100).toFixed(2)}</p>
                            </button>
                        );
                    })}
                </div>
            )}
          </div>
        </div>

        <div className="p-12 bg-slate-900 flex justify-between items-center text-white">
          <div className="flex items-center space-x-10">
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Selected Method</p>
                <p className="text-xl font-black uppercase italic text-primary">{splitType === 'equal' ? 'Equal Division' : 'Item-by-Item'}</p>
            </div>
            {splitType === 'equal' && (
                <div className="border-l border-white/10 pl-10">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Num. People</p>
                    <p className="text-xl font-black uppercase italic">{numSplits}</p>
                </div>
            )}
          </div>
          <button
            onClick={() => onComplete([])}
            className="bg-white text-slate-900 px-12 py-6 rounded-[2.5rem] font-black text-lg uppercase tracking-widest shadow-2xl hover:scale-[1.05] active:scale-95 transition-all flex items-center space-x-4"
          >
            <CircleDollarSign size={24} />
            <span>Process Split Payments</span>
          </button>
        </div>
      </div>
    </div>
  );
};
