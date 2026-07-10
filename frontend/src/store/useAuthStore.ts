import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  role: 'buyer' | 'vendor_owner' | 'vendor_staff' | 'admin' | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: AuthState['role']) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setRole: (role) => set({ role }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, role: null });
  },
}));
