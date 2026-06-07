import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const ReportsDashboard: React.FC = () => {
  const { data: summary } = useQuery({
    queryKey: ['daily-summary'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/reports/daily-summary').then(res => res.data),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-gray-500 font-medium mb-4">Daily Revenue Summary</h2>
          <div className="flex justify-between items-end">
            <p className="text-4xl font-bold text-primary">₵ {((summary?.revenue || 0) / 100).toFixed(2)}</p>
            <p className="text-green-600 text-sm font-bold">↑ 12% vs yesterday</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-gray-500 font-medium mb-4">Total Orders</h2>
          <div className="flex justify-between items-end">
            <p className="text-4xl font-bold">{summary?.orders || 0}</p>
            <p className="text-blue-600 text-sm font-bold">Peak: 12 PM - 2 PM</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="font-bold mb-6">Top Selling Items</h2>
        <div className="space-y-4">
          {[
            { name: 'Jollof Rice with Chicken', sales: 45, revenue: 157500 },
            { name: 'Banku with Tilapia', sales: 32, revenue: 192000 },
            { name: 'Waakye Special', sales: 28, revenue: 84000 },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 font-bold">#{idx + 1}</span>
                <p className="font-medium">{item.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{item.sales} sold</p>
                <p className="text-xs text-gray-500">₵ {(item.revenue / 100).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
