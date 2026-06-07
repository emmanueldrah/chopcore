import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const POS: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const { data: items } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/menu/items').then(res => res.data),
  });

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4">
          {items?.map((item: any) => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition text-left"
            >
              <div className="h-24 bg-gray-100 rounded mb-2"></div>
              <p className="font-bold">{item.name}</p>
              <p className="text-primary font-bold">₵ {(item.price / 100).toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-96 bg-white shadow-xl flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Current Order</h2>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {cart.length === 0 && <p className="text-gray-500 text-center mt-10">Cart is empty</p>}
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.quantity} x ₵ {(item.price / 100).toFixed(2)}</p>
              </div>
              <p className="font-bold">₵ {(item.price * item.quantity / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 space-y-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₵ {(subtotal / 100).toFixed(2)}</span>
          </div>
          <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};
