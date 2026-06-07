import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const InventoryManagement: React.FC = () => {
  const { data: ingredients, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/inventory/ingredients').then(res => res.data),
  });

  if (isLoading) return <div>Loading inventory...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory & Stock</h1>
        <button className="bg-primary text-white px-4 py-2 rounded">Add Ingredient</button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Ingredient</th>
              <th className="p-4">Unit</th>
              <th className="p-4">Current Stock</th>
              <th className="p-4">Reorder Level</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients?.map((ing: any) => (
              <tr key={ing.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{ing.name}</td>
                <td className="p-4">{ing.unit}</td>
                <td className="p-4">0</td>
                <td className="p-4">{ing.reorder_level}</td>
                <td className="p-4">
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">Low Stock</span>
                </td>
                <td className="p-4 text-primary cursor-pointer hover:underline">Manage Stock</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
