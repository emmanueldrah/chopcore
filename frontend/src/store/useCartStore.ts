import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      vendorId: null,
      items: [],
      addItem: (vendorId, item) => set((state: CartState) => {
        if (state.vendorId && state.vendorId !== vendorId) {
          if (!confirm("Your cart contains items from another vendor. Clear cart to switch?")) {
            return state;
          }
          return { vendorId, items: [item] };
        }

        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            vendorId,
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          };
        }
        return { vendorId, items: [...state.items, item] };
      }),
      removeItem: (itemId) => set((state: CartState) => ({
        items: state.items.filter((i) => i.id !== itemId),
        vendorId: state.items.length <= 1 ? null : state.vendorId
      })),
      clearCart: () => set({ vendorId: null, items: [] }),
    }),
    { name: 'ferako-cart' }
  )
);
