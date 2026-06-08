import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBusinessStore, BusinessMode } from '../../store/businessStore';
import { useTerminology } from '../../hooks/useTerminology';
import { LayoutDashboard, Utensils, Package, Table, ShoppingCart, ChefHat, Calendar, Users, Truck, Star, BarChart3, Settings } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { mode } = useBusinessStore();
  const t = useTerminology(mode);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', modes: 'all' },
    { icon: Utensils, label: 'Menu', path: '/menu', modes: 'all' },
    { icon: Package, label: 'Inventory', path: '/inventory', modes: 'all' },
    { icon: Table, label: t('tables'), path: '/tables', modes: [BusinessMode.SIT_DOWN, BusinessMode.CHOP_BAR] },
    { icon: ShoppingCart, label: t('pos'), path: '/pos', modes: [BusinessMode.FAST_FOOD, BusinessMode.SIT_DOWN, BusinessMode.CHOP_BAR] },
    { icon: ChefHat, label: 'Kitchen', path: '/kitchen', modes: 'all' },
    { icon: Calendar, label: t('reservation'), path: '/reservations', modes: [BusinessMode.SIT_DOWN, BusinessMode.CATERING] },
    { icon: Users, label: 'Events', path: '/events', modes: [BusinessMode.CATERING] },
    { icon: Truck, label: 'Delivery', path: '/delivery', modes: [BusinessMode.FAST_FOOD, BusinessMode.SIT_DOWN, BusinessMode.CHOP_BAR] },
    { icon: Star, label: 'Loyalty', path: '/loyalty', modes: [BusinessMode.FAST_FOOD, BusinessMode.SIT_DOWN, BusinessMode.CHOP_BAR] },
    { icon: Users, label: t('staff'), path: '/staff', modes: 'all' },
    { icon: BarChart3, label: 'Reports', path: '/reports', modes: 'all' },
  ];

  const filteredItems = menuItems.filter(item =>
    item.modes === 'all' || (mode && item.modes.includes(mode))
  );

  return (
    <div className="w-64 bg-primary text-white h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold italic tracking-tighter">ChopCore</h1>
        <p className="text-xs text-orange-200 uppercase tracking-widest mt-1">Management System</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-2">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                isActive ? 'bg-orange-800 text-white shadow-inner' : 'hover:bg-orange-600 text-orange-100'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-orange-800">
        <button className="flex items-center space-x-3 px-4 py-3 w-full hover:bg-orange-600 rounded-lg transition text-orange-100">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};
