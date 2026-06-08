import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Users, MapPin, Calendar, Clock, CheckCircle2, DollarSign, ListTodo, Plus, ChevronRight } from 'lucide-react';
import { LoadingSkeleton } from '../../components/shared/States';

export const EventManagement: React.FC = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/events/').then(res => res.data),
  });

  if (isLoading) return <div className="p-8"><LoadingSkeleton count={3} /></div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-10 font-sans">
      <header className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Catering</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Enterprise event management</p>
        </div>
        <button className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3">
            <Plus size={18} />
            <span>Book New Event</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events?.map((event: any) => (
          <div key={event.id} className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-50 flex flex-col group hover:scale-[1.02] transition-all overflow-hidden">
            <div className="p-8 pb-0">
                <div className="flex justify-between items-start mb-6">
                    <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-blue-100">{event.status}</span>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Event Date</p>
                        <p className="font-black text-slate-800">{new Date(event.event_date).toLocaleDateString()}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2 uppercase italic">{event.event_type}</h2>
                <p className="text-slate-500 font-bold text-sm mb-8">{event.client_name}</p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <MapPin size={18} className="text-primary" />
                        <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Venue</p>
                            <p className="font-black text-slate-800 text-xs">{event.venue}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Guests</p>
                            <p className="font-black text-slate-800 text-lg">{event.expected_guests}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Per Head</p>
                            <p className="font-black text-slate-800 text-lg">₵ {((event.per_head_price || 0)/100).toFixed(0)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto bg-slate-900 p-8 text-white">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Budget</p>
                        <p className="text-2xl font-black text-primary italic">₵ {((event.total_budget || 0)/100).toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Deposit</p>
                        <p className="text-lg font-black text-green-400">Paid</p>
                    </div>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full mb-8 overflow-hidden">
                    <div className="bg-primary h-full w-[65%]"></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/5">
                        <ListTodo size={16} />
                        <span>Checklist</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-primary text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20">
                        <span>Details</span>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
