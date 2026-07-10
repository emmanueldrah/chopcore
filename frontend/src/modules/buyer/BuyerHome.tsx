import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Search } from 'lucide-react';

export const BuyerHome = () => {
  const { t } = useTranslation();

  const categories = [
    { id: 'food', name: t('buyer.categories.food'), color: 'bg-marketClay' },
    { id: 'pharmacy', name: t('buyer.categories.pharmacy'), color: 'bg-beverageTeal' },
    { id: 'produce', name: t('buyer.categories.produce'), color: 'bg-deepPalm' },
    { id: 'beverages', name: t('buyer.categories.beverages'), color: 'bg-charcoalInk' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoalInk/40 h-5 w-5" />
        <Input placeholder="Search vendors or items..." className="pl-10" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            className={`aspect-square flex flex-col items-center justify-center p-4 cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden relative group`}
          >
            <div className={`absolute inset-0 ${cat.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            <span className="font-display font-bold text-lg text-deepPalm text-center z-10">
              {cat.name}
            </span>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-display font-bold text-deepPalm">Nearby Vendors</h3>
        <div className="space-y-4">
          {/* Skeleton/List of vendors would go here */}
          {[1, 2, 3].map(i => (
            <Card key={i} className="p-3 flex gap-4">
              <div className="h-20 w-20 bg-harmattanSand rounded-warm shrink-0" />
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-deepPalm">Market Vendor {i}</h4>
                <p className="text-sm text-charcoalInk/60">Food • 25-35 mins</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs font-bold text-marketClay">★ 4.8</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
