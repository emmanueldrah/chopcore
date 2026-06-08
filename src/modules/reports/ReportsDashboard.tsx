import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FileDown, TrendingUp, Users, ShoppingBag, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const ReportsDashboard: React.FC = () => {
  const { data: summary } = useQuery({
    queryKey: ['daily-summary'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/reports/daily-summary').then(res => res.data),
  });

  const exportPDF = () => {
    window.open('http://localhost:8768/api/v1/print/report/daily', '_blank');
  };

  const salesData = [
    { name: 'Mon', amount: 4000 },
    { name: 'Tue', amount: 3000 },
    { name: 'Wed', amount: 2000 },
    { name: 'Thu', amount: 2780 },
    { name: 'Fri', amount: 1890 },
    { name: 'Sat', amount: 2390 },
    { name: 'Sun', amount: 3490 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Business Intelligence</h1>
          <p className="text-gray-500 font-medium">Detailed analytics and performance reports</p>
        </div>
        <button
          onClick={exportPDF}
          className="bg-white border-2 border-gray-200 px-6 py-3 rounded-2xl font-bold flex items-center space-x-3 hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          <FileDown size={20} />
          <span>Export PDF Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ReportStat title="Gross Revenue" value={`₵ ${((summary?.revenue || 0) / 100).toFixed(2)}`} trend="+12.5%" icon={TrendingUp} color="text-green-600" bg="bg-green-50" />
        <ReportStat title="Total Orders" value={summary?.orders || 0} trend="+5.2%" icon={ShoppingBag} color="text-blue-600" bg="bg-blue-50" />
        <ReportStat title="Staff Active" value="8" trend="Normal" icon={Users} color="text-purple-600" bg="bg-purple-50" />
        <ReportStat title="Avg. Prep Time" value="18m" trend="-2m" icon={Clock} color="text-orange-600" bg="bg-orange-50" />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-black mb-8 text-gray-800">Weekly Revenue Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                <Tooltip
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="amount" stroke="#c2410c" strokeWidth={4} dot={{r: 6, fill: '#c2410c', strokeWidth: 3, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-black mb-8 text-gray-800">Top Selling Categories</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold'}} />
                <Tooltip />
                <Bar dataKey="amount" fill="#f97316" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportStat = ({ title, value, trend, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`${bg} ${color} p-3 rounded-2xl`}>
        <Icon size={24} />
      </div>
      <span className={`text-xs font-black px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
        {trend}
      </span>
    </div>
    <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">{title}</p>
    <p className="text-3xl font-black text-gray-800 mt-1">{value}</p>
  </div>
);
