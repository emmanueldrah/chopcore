import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const MenuManagement: React.FC = () => {
  const { data: categories, isLoading: loadingCats } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/menu/categories').then(res => res.data),
  });

  const { data: items, isLoading: loadingItems } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/menu/items').then(res => res.data),
  });

  if (loadingCats || loadingItems) return <div>Loading menu...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <div className="space-x-2">
          <button className="bg-primary text-white px-4 py-2 rounded">Add Category</button>
          <button className="bg-primary text-white px-4 py-2 rounded">Add Menu Item</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories?.map((cat: any) => (
              <li key={cat.id} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-4">Menu Items</h2>
          <div className="grid grid-cols-3 gap-4">
            {items?.map((item: any) => (
              <div key={item.id} className="border rounded p-4">
                <div className="h-32 bg-gray-200 mb-2 rounded"></div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-primary font-bold mt-2">₵ {(item.price / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
