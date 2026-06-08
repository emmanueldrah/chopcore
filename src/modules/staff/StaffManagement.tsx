import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, LogIn, LogOut, CheckCircle2 } from 'lucide-react';

export const StaffManagement: React.FC = () => {
  const [selectedStaff, setSelectedCourse] = useState<string | null>(null);

  const { data: staff } = useQuery({
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

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-3xl font-black text-slate-800">Staff & Attendance</h1>
            <p className="text-slate-500 font-medium">Manage your team and track working hours</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all">Add New Staff</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staff?.map((s: any) => (
          <div key={s.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all">
            <div className="w-24 h-24 bg-slate-100 rounded-full mb-6 relative overflow-hidden">
                {s.photo_url ? <img src={s.photo_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-2xl">{s.full_name.charAt(0)}</div>}
                <div className={`absolute bottom-0 right-0 w-6 h-6 border-4 border-white rounded-full ${s.status === 'ACTIVE' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
            </div>

            <h2 className="font-black text-xl text-slate-800 mb-1">{s.full_name}</h2>
            <p className="text-primary font-black text-xs uppercase tracking-widest mb-6">{s.role}</p>

            <div className="w-full grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-slate-50">
                <button onClick={() => clockIn.mutate(s.id)} className="flex items-center justify-center space-x-2 bg-green-50 text-green-600 py-3 rounded-xl font-black text-xs hover:bg-green-500 hover:text-white transition-all">
                    <LogIn size={16} />
                    <span>Clock In</span>
                </button>
                <button onClick={() => clockOut.mutate(s.id)} className="flex items-center justify-center space-x-2 bg-slate-50 text-slate-400 py-3 rounded-xl font-black text-xs hover:bg-slate-900 hover:text-white transition-all">
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
