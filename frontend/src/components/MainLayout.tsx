import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useTranslation } from 'react-i18next';
import { LogOut, Home, ShoppingCart, User, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-harmattanSand flex flex-col">
      <header className="bg-deepPalm text-white p-4 flex items-center justify-between shadow-md">
        <Link to="/" className="text-2xl font-display font-bold">Ferako</Link>
        <div className="flex items-center gap-4">
          <Bell className="h-6 w-6 cursor-pointer" />
          <User className="h-6 w-6 cursor-pointer" onClick={() => navigate('/profile')} />
        </div>
      </header>

      <main className="flex-1 pb-20 relative overflow-x-hidden">
        <div className="woven-bg opacity-5" />
        <div className="relative z-10">
          {children}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-harmattanSand flex justify-around p-3 z-50">
        <Link to="/" className="flex flex-col items-center gap-1">
          <Home className="h-6 w-6 text-marketClay" />
          <span className="text-[10px] font-medium">{t('buyer.home')}</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center gap-1">
          <ShoppingCart className="h-6 w-6 text-charcoalInk/60" />
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
        <Link to="/orders" className="flex flex-col items-center gap-1">
          <div className="h-6 w-6 rounded-full border-2 border-charcoalInk/60 flex items-center justify-center text-[10px] font-bold">
            !
          </div>
          <span className="text-[10px] font-medium">Orders</span>
        </Link>
        <button onClick={signOut} className="flex flex-col items-center gap-1">
          <LogOut className="h-6 w-6 text-charcoalInk/60" />
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </nav>
    </div>
  );
};
