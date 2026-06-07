import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const DeliveryTracking: React.FC = () => {
  const { data: deliveries } = useQuery({
    queryKey: ['deliveries'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/delivery/').then(res => res.data),
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Delivery & Takeaway</h1>
      <div className="grid grid-cols-1 gap-4">
        {deliveries?.map((del: any) => (
          <div key={del.id} className="bg-white p-4 rounded shadow border flex items-center justify-between">
            <div>
              <p className="font-bold">Order {del.order?.order_number}</p>
              <p className="text-sm text-gray-500">{del.customer_address}</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium">Rider: {del.rider?.full_name || 'Unassigned'}</p>
                <p className="text-xs text-gray-500">Status: {del.status}</p>
              </div>
              <button className="bg-primary text-white px-3 py-1 rounded text-sm">Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
