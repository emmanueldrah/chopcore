import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShoppingBag, TrendingUp, List, Settings } from 'lucide-react';

export const VendorDashboard = () => {
  const stats = [
    { label: 'Today Orders', value: '12', icon: ShoppingBag, color: 'text-marketClay' },
    { label: 'Today Earnings', value: '₵450.00', icon: TrendingUp, color: 'text-beverageTeal' },
    { label: 'Active Items', value: '24', icon: List, color: 'text-deepPalm' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-deepPalm">Vendor Dashboard</h1>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Store is Open" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 flex items-center gap-4 border-none shadow-sm bg-white">
            <div className={`h-12 w-12 rounded-warm bg-harmattanSand flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-charcoalInk/40 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold text-deepPalm">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-deepPalm">Recent Orders</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold text-deepPalm">Order #FR-{1000 + i}</p>
                <p className="text-xs text-charcoalInk/60">3 items • ₵{(4500/100).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-marketClay/10 text-marketClay text-[10px] font-bold rounded-full uppercase">
                  Preparing
                </span>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-harmattanSand transition-colors">
          <ShoppingBag className="h-8 w-8 text-marketClay" />
          <span className="font-bold text-sm text-deepPalm">Manage Menu</span>
        </Card>
        <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-harmattanSand transition-colors">
          <Settings className="h-8 w-8 text-beverageTeal" />
          <span className="font-bold text-sm text-deepPalm">Settings</span>
        </Card>
      </section>
    </div>
  );
};
