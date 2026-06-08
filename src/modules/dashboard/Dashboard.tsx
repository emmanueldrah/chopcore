import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LayoutDashboard, TrendingUp, ShoppingBag, Clock, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LoadingSkeleton } from '../../components/shared/States';

export const Dashboard: React.FC = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['daily-summary'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/reports/daily-summary').then(res => res.data),
  });

  const mockChartData = [
    { name: '08:00', sales: 400 },
    { name: '10:00', sales: 700 },
    { name: '12:00', sales: 1200 },
    { name: '14:00', sales: 900 },
    { name: '16:00', sales: 500 },
    { name: '18:00', sales: 1100 },
    { name: '20:00', sales: 1500 },
  ];

  if (isLoading) return <div className="p-8"><LoadingSkeleton count={4} /></div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-10 font-sans">
      <header className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Overview</h1>
            <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-[10px]">Real-time operational insights</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-slate-100 shadow-sm flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="font-black text-xs text-slate-800 uppercase tracking-widest">System Live</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`₵ ${((summary?.revenue || 0) / 100).toFixed(2)}`} icon={TrendingUp} trend="+12.5%" color="text-green-600" bg="bg-green-50" />
        <StatCard title="Total Orders" value={summary?.orders || 0} icon={ShoppingBag} trend="+5.2%" color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="Avg. Order" value={`₵ ${((summary?.avg_order_value || 0) / 100).toFixed(2)}`} icon={LayoutDashboard} trend="-1.2%" color="text-purple-600" bg="bg-purple-50" />
        <StatCard title="Pending" value="5" icon={Clock} trend="Normal" color="text-orange-600" bg="bg-orange-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Sales Analytics</h2>
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button className="px-4 py-2 rounded-lg bg-white shadow-sm font-black text-[10px] uppercase">Today</button>
                    <button className="px-4 py-2 rounded-lg text-slate-400 font-black text-[10px] uppercase">Weekly</button>
                </div>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                        <Tooltip
                            cursor={{fill: '#f8fafc', radius: 10}}
                            contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="sales" fill="#c2410c" radius={[10, 10, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden flex flex-col">
            <div className="relative z-10">
                <h2 className="text-2xl font-black mb-1 tracking-tight">Quick Action</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-10">Jump into service</p>

                <div className="space-y-4">
                    <ActionButton label="New Order" desc="Open POS Terminal" color="bg-primary" />
                    <ActionButton label="Floor Plan" desc="Manage Tables" color="bg-slate-800" />
                    <ActionButton label="Inventory" desc="Check Stock" color="bg-slate-800" />
                </div>
            </div>

            <div className="mt-auto pt-10 border-t border-white/5 relative z-10 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">System Health</p>
                <div className="mt-4 flex justify-center items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-bold">All services operational</span>
                </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color, bg }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-200/40 group hover:scale-[1.02] transition-all">
    <div className="flex justify-between items-start mb-6">
        <div className={`${bg} ${color} p-4 rounded-2xl shadow-inner group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-black ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            <span>{trend}</span>
        </div>
    </div>
    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">{title}</p>
    <p className="text-3xl font-black text-slate-800 tracking-tighter italic">{value}</p>
  </div>
);

const ActionButton = ({ label, desc, color }: any) => (
    <button className={`w-full ${color} p-5 rounded-2xl text-left flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all`}>
        <div>
            <p className="font-black text-sm uppercase tracking-wider">{label}</p>
            <p className="text-[10px] font-bold opacity-50 uppercase">{desc}</p>
        </div>
        <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-opacity" />
    </button>
);

import { ChevronRight } from 'lucide-react';
