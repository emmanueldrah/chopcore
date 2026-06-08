import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Utensils, Beaker, Plus, ChevronRight, Edit3 } from 'lucide-react';
import { RecipeEditor } from '../inventory/RecipeEditor';

export const MenuManagement: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/menu/categories').then(res => res.data),
  });

  const { data: items } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/menu/items').then(res => res.data),
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter">Menu Management</h1>
            <p className="text-slate-500 font-medium text-sm">Organize your dishes, pricing, and ingredients</p>
        </div>
        <div className="flex space-x-4">
            <button className="bg-white border-2 border-slate-200 px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:border-primary hover:text-primary transition-all">
                <Plus size={20} />
                <span>New Category</span>
            </button>
            <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all">
                Add Menu Item
            </button>
        </div>
      </header>

      <div className="flex space-x-8">
        <aside className="w-64 space-y-2">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Categories</h2>
            {categories?.map((cat: any) => (
                <button key={cat.id} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all text-left font-bold text-slate-600 group">
                    <div className="flex items-center space-x-3">
                        <Utensils size={18} className="text-slate-300 group-hover:text-primary" />
                        <span>{cat.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300" />
                </button>
            ))}
        </aside>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items?.map((item: any) => (
                <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all">
                    <div className="h-48 bg-slate-100 rounded-3xl mb-6 relative overflow-hidden">
                        {item.image_url ? <img src={item.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-200"><Utensils size={64} /></div>}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-primary shadow-sm">
                            ₵ {(item.price/100).toFixed(2)}
                        </div>
                    </div>

                    <h3 className="font-black text-xl text-slate-800 mb-2 leading-tight">{item.name}</h3>
                    <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-6 h-10">{item.description}</p>

                    <div className="mt-auto flex items-center space-x-3">
                        <button onClick={() => setSelectedItem(item)} className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all">
                            <Beaker size={16} />
                            <span>Edit Recipe</span>
                        </button>
                        <button className="p-3 rounded-xl bg-slate-100 text-slate-400 hover:bg-primary hover:text-white transition-all">
                            <Edit3 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {selectedItem && (
        <RecipeEditor
            menuItem={selectedItem}
            onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};
