import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Search, Star } from 'lucide-react';
import { useVendors } from '../../hooks/useVendors';
import { Link } from 'react-router-dom';
import { SkeletonLoader } from '../../components/SkeletonLoader';

export const BuyerHome = () => {
  const { t } = useTranslation();
  const { data: vendors, isLoading } = useVendors();

  const categories = [
    { id: 'food', name: t('buyer.categories.food'), color: 'bg-marketClay' },
    { id: 'pharmacy_otc', name: t('buyer.categories.pharmacy'), color: 'bg-beverageTeal' },
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
          {isLoading ? (
            [1, 2, 3].map(i => (
              <SkeletonLoader key={i} className="h-24" />
            ))
          ) : (
            vendors?.map((vendor: any) => (
              <Link key={vendor.id} to={`/vendor/${vendor.id}`}>
                <Card className="p-3 flex gap-4">
                  <div className="h-20 w-20 bg-harmattanSand rounded-warm shrink-0 relative overflow-hidden">
                     <div className="woven-bg opacity-10" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-deepPalm">{vendor.business_name}</h4>
                    <p className="text-sm text-charcoalInk/60 capitalize">{vendor.category} • 25-35 mins</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-marketClay fill-marketClay" />
                      <span className="text-xs font-bold text-marketClay">{vendor.avg_rating || '5.0'}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
