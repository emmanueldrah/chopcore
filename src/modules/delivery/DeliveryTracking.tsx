import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Truck, MapPin, Phone, Clock, ChevronRight, User, CheckCircle2, Navigation } from 'lucide-react';
import { LoadingSkeleton } from '../../components/shared/States';

export const DeliveryTracking: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: deliveries, isLoading } = useQuery({
    queryKey: ['deliveries'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/delivery/').then(res => res.data),
  });

  const { data: riders } = useQuery({
    queryKey: ['riders'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/staff/').then(res => res.data.filter((s:any) => s.role === 'DELIVERY_RIDER')),
  });

  const updateDelivery = useMutation({
    mutationFn: ({ id, status, riderId }: any) =>
        axios.patch(`http://localhost:8768/api/v1/delivery/${id}`, { status, rider_id: riderId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['deliveries'] })
  });

  if (isLoading) return <div className="p-8"><LoadingSkeleton count={3} /></div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-10 font-sans">
      <header className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic text-primary">Logistics</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Rider dispatch & delivery tracking</p>
        </div>
        <div className="bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-xl flex items-center space-x-4">
            <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Active Riders</p>
                <p className="text-xl font-black italic tracking-tighter">{riders?.length || 0} Online</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                <Navigation size={20} />
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-6">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-6">Active Deliveries</h2>
            <div className="grid grid-cols-1 gap-4">
                {deliveries?.map((del: any) => (
                    <div key={del.id} className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-50 flex items-center justify-between group hover:scale-[1.01] transition-all">
                        <div className="flex items-center space-x-8">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-primary relative">
                                <Truck size={32} />
                                <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border-2 border-white">#{del.order?.order_number.replace('#','')}</div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-3 mb-1">
                                    <h3 className="font-black text-slate-800 text-xl tracking-tighter uppercase italic">{del.order?.customer_name || 'Guest Customer'}</h3>
                                    <span className="bg-orange-50 text-primary px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest border border-orange-100">{del.status}</span>
                                </div>
                                <div className="flex items-center space-x-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    <div className="flex items-center space-x-1">
                                        <MapPin size={12} className="text-primary" />
                                        <span>{del.customer_address}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock size={12} />
                                        <span>Ordered 12m ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-8">
                            {del.rider ? (
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Assigned Rider</p>
                                    <p className="font-black text-slate-800 text-lg tracking-tighter italic">{del.rider.full_name}</p>
                                </div>
                            ) : (
                                <div className="flex space-x-2">
                                    <select
                                        className="bg-slate-50 border-2 border-transparent focus:border-primary rounded-xl px-4 py-2 font-black text-[10px] uppercase outline-none transition-all"
                                        onChange={(e) => updateDelivery.mutate({ id: del.id, riderId: e.target.value, status: 'OUT_FOR_DELIVERY' })}
                                    >
                                        <option value="">Assign Rider...</option>
                                        {riders?.map((r:any) => <option key={r.id} value={r.id}>{r.full_name}</option>)}
                                    </select>
                                </div>
                            )}
                            <button className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-black transition-all shadow-xl shadow-slate-900/20">
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <aside className="space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
                <h3 className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] mb-8">Rider Performance</h3>
                <div className="space-y-6">
                    {riders?.map((r: any) => (
                        <div key={r.id} className="flex items-center justify-between group">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black">
                                    {r.full_name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-black text-slate-800 uppercase tracking-tighter">{r.full_name}</p>
                                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Available</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-slate-800 italic">14</p>
                                <p className="text-[8px] font-black text-slate-400 uppercase">Drops</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full"></div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl text-white">
                <h3 className="font-black text-slate-500 uppercase tracking-[0.2em] text-[10px] mb-8">Logistics Summary</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg. Delivery</span>
                        <span className="text-2xl font-black italic tracking-tighter text-primary">28m</span>
                    </div>
                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Zone Peak</span>
                        <span className="text-2xl font-black italic tracking-tighter">Osu / Accra</span>
                    </div>
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
};
