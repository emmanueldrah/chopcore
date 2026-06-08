import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LogIn, LogOut, Briefcase, DollarSign, Clock, Users, ChevronRight } from 'lucide-react';
import { LoadingSkeleton } from '../../components/shared/States';

export const StaffManagement: React.FC = () => {
  const { data: staff, isLoading } = useQuery({
    queryKey: ['staff'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/staff/').then(res => res.data),
  });

  const clockIn = useMutation({
    mutationFn: (id: string) => axios.post('http://localhost:8768/api/v1/attendance/clock-in', { staff_id: id }),
    onSuccess: () => alert('Clocked in successfully'),
  });

  const clockOut = useMutation({
    mutationFn: (id: string) => axios.post('http://localhost:8768/api/v1/attendance/clock-out', { staff_id: id }),
    onSuccess: () => alert('Clocked out successfully'),
  });

  if (isLoading) return <div className="p-8"><LoadingSkeleton count={3} /></div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-10 font-sans">
      <header className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Team</h1>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Staff management & payroll</p>
        </div>
        <button className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3">
            <Users size={18} />
            <span>Onboard Staff</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staff?.map((s: any) => (
          <div key={s.id} className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-50 flex flex-col group hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-8">
                <div className="w-24 h-24 bg-slate-100 rounded-[2rem] relative overflow-hidden ring-4 ring-slate-50 shadow-inner">
                    {s.photo_url ? <img src={s.photo_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-3xl">{s.full_name.charAt(0)}</div>}
                    <div className={`absolute bottom-0 right-0 w-8 h-8 border-4 border-white rounded-full ${s.status === 'ACTIVE' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee ID</p>
                    <p className="font-black text-slate-800 text-lg">#{s.staff_id}</p>
                </div>
            </div>

            <h2 className="font-black text-2xl text-slate-800 tracking-tight leading-none mb-2">{s.full_name}</h2>
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl w-fit mb-8">
                <Briefcase size={12} className="text-primary" />
                <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">{s.role}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Rate</p>
                    <p className="font-black text-slate-800">₵ {((s.hourly_rate || 0)/100).toFixed(2)}/hr</p>
                </div>
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Performance</p>
                    <p className="font-black text-green-600 tracking-tighter">98.2%</p>
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-slate-50">
                <button onClick={() => clockIn.mutate(s.id)} className="flex items-center justify-center space-x-3 bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black shadow-lg shadow-slate-900/20 transition-all">
                    <LogIn size={16} className="text-primary" />
                    <span>Clock In</span>
                </button>
                <button onClick={() => clockOut.mutate(s.id)} className="flex items-center justify-center space-x-3 bg-white border-2 border-slate-200 text-slate-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all">
                    <LogOut size={16} />
                    <span>Clock Out</span>
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
