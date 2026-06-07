import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
  const { data: summary } = useQuery({
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

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Revenue Today" value={`₵ ${(summary?.revenue || 0) / 100}`} icon="💰" color="text-green-600" />
        <StatCard title="Orders Today" value={summary?.orders || 0} icon="📦" color="text-blue-600" />
        <StatCard title="Avg. Order Value" value={`₵ ${((summary?.avg_order_value || 0) / 100).toFixed(2)}`} icon="📊" color="text-purple-600" />
        <StatCard title="Pending Tickets" value="5" icon="🍳" color="text-orange-600" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-6">Hourly Sales</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#c2410c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center space-x-4">
    <div className={`text-4xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);
