import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, Store, Gavel, BarChart3, ShieldAlert } from 'lucide-react';

export const AdminDashboard = () => {
  const stats = [
    { label: 'Pending Vendors', value: '4', icon: Store, color: 'text-marketClay' },
    { label: 'Active Disputes', value: '2', icon: Gavel, color: 'text-ripePepper' },
    { label: 'Today GMV', value: '₵1,240.00', icon: BarChart3, color: 'text-beverageTeal' },
    { label: 'Total Users', value: '156', icon: Users, color: 'text-deepPalm' },
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-display font-bold text-deepPalm">Admin Control Center</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 flex flex-col gap-2 border-none shadow-sm bg-white">
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
            <div>
              <p className="text-xl font-bold text-deepPalm">{stat.value}</p>
              <p className="text-[10px] font-bold text-charcoalInk/40 uppercase tracking-widest">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-deepPalm">Vendor Approvals</h3>
            <Button size="sm" variant="ghost">View Queue</Button>
          </div>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <Card key={i} className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-deepPalm">Local Produce Store {i}</p>
                    <p className="text-xs text-charcoalInk/60">Category: Produce • Applied 2h ago</p>
                  </div>
                  <ShieldAlert className="h-5 w-5 text-marketClay" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">Review Docs</Button>
                  <Button size="sm" className="flex-1">Approve</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-deepPalm">Dispute Resolution</h3>
            <Button size="sm" variant="ghost">View All</Button>
          </div>
          <div className="space-y-3">
            {[1].map(i => (
              <Card key={i} className="p-4 border-2 border-ripePepper/20">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-deepPalm">Order #FR-9023</p>
                  <span className="text-[10px] font-bold text-ripePepper bg-ripePepper/10 px-2 py-0.5 rounded-full">URGENT</span>
                </div>
                <p className="text-xs text-charcoalInk/80 line-clamp-2 italic">"Items were delivered damaged and vendor is not responding to chat."</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="danger" className="flex-1">Refund Buyer</Button>
                  <Button size="sm" variant="secondary" className="flex-1">Release to Vendor</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
