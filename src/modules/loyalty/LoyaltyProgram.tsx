import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const LoyaltyProgram: React.FC = () => {
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/loyalty/customers').then(res => res.data),
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Loyalty & Rewards</h1>
        <button className="bg-primary text-white px-4 py-2 rounded">Register Customer</button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Tier</th>
              <th className="p-4">Points</th>
              <th className="p-4">Total Spend</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((c: any) => (
              <tr key={c.id} className="border-b">
                <td className="p-4 font-bold">{c.name}</td>
                <td className="p-4">{c.phone}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    c.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    c.tier === 'Silver' ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {c.tier}
                  </span>
                </td>
                <td className="p-4 font-bold text-primary">{c.loyalty_points} pts</td>
                <td className="p-4">₵ {(c.total_spend / 100).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
