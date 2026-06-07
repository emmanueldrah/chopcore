import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const ReservationList: React.FC = () => {
  const { data: reservations } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/reservations/').then(res => res.data),
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <button className="bg-primary text-white px-4 py-2 rounded">New Reservation</button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Party Size</th>
              <th className="p-4">Table</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations?.map((res: any) => (
              <tr key={res.id} className="border-b">
                <td className="p-4">
                  <p className="font-bold">{res.customer_name}</p>
                  <p className="text-sm text-gray-500">{res.customer_phone}</p>
                </td>
                <td className="p-4">{new Date(res.reservation_date).toLocaleString()}</td>
                <td className="p-4">{res.party_size} people</td>
                <td className="p-4">Table {res.table_id || 'TBD'}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{res.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
