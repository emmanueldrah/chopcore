import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const StaffManagement: React.FC = () => {
  const { data: staff } = useQuery({
    queryKey: ['staff'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/staff/').then(res => res.data),
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Directory</h1>
        <button className="bg-primary text-white px-4 py-2 rounded">Add Staff</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staff?.map((s: any) => (
          <div key={s.id} className="bg-white p-6 rounded-xl shadow border text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h2 className="font-bold text-lg">{s.full_name}</h2>
            <p className="text-primary text-sm font-medium mb-4">{s.role}</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>ID: {s.staff_id}</p>
              <p>Status: <span className="text-green-600 font-bold">{s.status}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
