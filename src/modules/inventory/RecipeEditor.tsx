import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Plus, Trash2, Beaker, Save } from 'lucide-react';

export const RecipeEditor: React.FC<{ menuItem: any; onClose: () => void }> = ({ menuItem, onClose }) => {
  const queryClient = useQueryClient();
  const [recipeItems, setRecipeItems] = useState<any[]>(menuItem.recipes || []);

  const { data: ingredients } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/inventory/ingredients').then(res => res.data),
  });

  const addIngredient = (ingId: string) => {
    const ing = ingredients.find((i: any) => i.id === ingId);
    if (ing && !recipeItems.find(r => r.ingredient_id === ingId)) {
      setRecipeItems([...recipeItems, { ingredient_id: ingId, quantity: 0, ingredient: ing }]);
    }
  };

  const updateQty = (id: string, qty: number) => {
    setRecipeItems(recipeItems.map(r => r.ingredient_id === id ? { ...r, quantity: qty } : r));
  };

  const saveRecipe = useMutation({
    mutationFn: () => axios.post(`http://localhost:8768/api/v1/inventory/recipes/${menuItem.id}`, {
      items: recipeItems.map(r => ({ ingredient_id: r.ingredient_id, quantity: r.quantity }))
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
      onClose();
    }
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="p-8 border-b bg-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-800">Recipe Management</h2>
            <p className="text-gray-500 font-medium">Ingredients for {menuItem.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">Close</button>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex space-x-4">
            <select
              className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-xl p-3 outline-none focus:border-primary font-bold"
              onChange={(e) => addIngredient(e.target.value)}
              value=""
            >
              <option value="">Add ingredient to recipe...</option>
              {ingredients?.map((ing: any) => (
                <option key={ing.id} value={ing.id}>{ing.name} ({ing.unit})</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {recipeItems.map((item) => (
              <div key={item.ingredient_id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                <Beaker className="text-primary" size={20} />
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{item.ingredient?.name}</p>
                  <p className="text-xs text-gray-500 uppercase font-black">Unit: {item.ingredient?.unit}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="w-24 bg-white border-2 border-gray-200 rounded-lg p-2 text-right font-black"
                    value={item.quantity}
                    onChange={e => updateQty(item.ingredient_id, Number(e.target.value))}
                  />
                  <span className="text-gray-400 font-bold w-12">{item.ingredient?.unit}</span>
                </div>
                <button onClick={() => setRecipeItems(recipeItems.filter(r => r.ingredient_id !== item.ingredient_id))} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {recipeItems.length === 0 && <p className="text-center py-10 text-gray-400 font-medium italic">No ingredients added yet.</p>}
          </div>
        </div>

        <div className="p-8 bg-gray-50 border-t flex space-x-4">
          <button onClick={onClose} className="flex-1 py-4 font-bold text-gray-500">Cancel</button>
          <button
            onClick={() => saveRecipe.mutate()}
            className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black flex items-center justify-center space-x-2 shadow-lg shadow-orange-200"
          >
            <Save size={20} />
            <span>Save Recipe & Link Ingredients</span>
          </button>
        </div>
      </div>
    </div>
  );
};
