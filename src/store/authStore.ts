import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any | null;
  role: string | null;
  setAuth: (token: string, role: string, user?: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: null,
      setAuth: (token, role, user) => set({ token, role, user }),
      logout: () => set({ token: null, role: null, user: null }),
    }),
    {
      name: 'chopcore-auth',
    }
  )
);
