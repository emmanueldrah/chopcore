import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  vendorId: string | null;
  items: CartItem[];
  addItem: (vendorId: string, item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      vendorId: null,
      items: [],
      addItem: (vendorId, item) => set((state) => {
        if (state.vendorId && state.vendorId !== vendorId) {
          // Single-vendor cart enforcement (Bible Requirement)
          return { vendorId, items: [item] };
        }
        const existing = state.items.find(i => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
          };
        }
        return { vendorId, items: [...state.items, item] };
      }),
      clearCart: () => set({ vendorId: null, items: [] }),
    }),
    {
      name: 'ferako-cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
