import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Calendar, UserPlus, Clock, Phone, Trash2, CheckCircle2 } from 'lucide-react';
import { LoadingSkeleton } from '../../components/shared/States';

export const ReservationList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: reservations, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/reservations/').then(res => res.data),
  });

  const { data: waitlist } = useQuery({
    queryKey: ['waitlist'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/waitlist/').then(res => res.data),
  });

  const updateWaitlistStatus = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) =>
        axios.patch(`http://localhost:8768/api/v1/waitlist/${id}/status?status=${status}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['waitlist'] })
  });

  if (isLoading) return <div className="p-8"><LoadingSkeleton count={3} /></div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-10 font-sans">
      <header className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Bookings</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Reservations & waiting list</p>
        </div>
        <button className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3">
            <UserPlus size={18} />
            <span>New Reservation</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Guest</th>
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Schedule</th>
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Table</th>
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {reservations?.map((res: any) => (
                            <tr key={res.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="p-8">
                                    <p className="font-black text-slate-800 uppercase italic tracking-tighter text-lg">{res.customer_name}</p>
                                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-xs mt-1">
                                        <Phone size={12} />
                                        <span>{res.customer_phone}</span>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <p className="font-black text-slate-800 tracking-tighter">{new Date(res.reservation_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(res.reservation_date).toLocaleDateString()}</p>
                                </td>
                                <td className="p-8">
                                    <div className="bg-slate-100 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-slate-500">
                                        {res.table_id ? `#${res.table_id}` : '?'}
                                    </div>
                                </td>
                                <td className="p-8">
                                    <span className="bg-green-50 text-green-600 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-green-100">{res.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <aside className="space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-black mb-1 tracking-tight uppercase italic text-primary">Waitlist</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10">Walk-in management</p>

                    <div className="space-y-4">
                        {waitlist?.map((entry: any) => (
                            <div key={entry.id} className="bg-white/5 p-5 rounded-2xl border border-white/10 flex justify-between items-center group">
                                <div>
                                    <p className="font-black text-sm uppercase italic">{entry.customer_name}</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{entry.party_size} Guests • {entry.customer_phone}</p>
                                </div>
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => updateWaitlistStatus.mutate({id: entry.id, status: 'SEATED'})} className="p-2 bg-green-500 text-white rounded-lg hover:scale-110 transition-transform">
                                        <CheckCircle2 size={16} />
                                    </button>
                                    <button onClick={() => updateWaitlistStatus.mutate({id: entry.id, status: 'CANCELLED'})} className="p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {(!waitlist || waitlist.length === 0) && (
                            <div className="flex items-center justify-center py-10 border-2 border-dashed border-white/10 rounded-[2rem]">
                                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest font-black">No one waiting</p>
                            </div>
                        )}
                    </div>

                    <button className="w-full mt-8 bg-primary text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-orange-900/20">
                        Add to Waitlist
                    </button>
                </div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px]"></div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
                <h3 className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] mb-8">Capacity Stats</h3>
                <div className="space-y-6">
                    <StatRow label="Avg. Turnover" value="42m" />
                    <StatRow label="Booked Seats" value="142" />
                    <StatRow label="Wait Time" value="12m" />
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
};

const StatRow = ({ label, value }: any) => (
    <div className="flex justify-between items-end pb-4 border-b border-slate-50">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="text-2xl font-black italic tracking-tighter text-slate-800">{value}</span>
    </div>
);
