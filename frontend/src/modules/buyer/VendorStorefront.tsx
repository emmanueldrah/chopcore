import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Star, Clock, MapPin, ChevronLeft, Plus } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useVendorDetail } from '../../hooks/useVendors';

export const VendorStorefront = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { data, isLoading } = useVendorDetail(id as string);

  if (isLoading) return <div className="p-8 text-center font-display text-marketClay">Loading store...</div>;
  if (!data) return <div className="p-8 text-center">Store not found</div>;

  const { vendor, items } = data;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-48 bg-deepPalm">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className="h-6 w-6 text-deepPalm" />
        </button>
        <div className="woven-bg opacity-10" />
        <div className="absolute -bottom-10 left-4 right-4">
          <Card className="p-4 shadow-xl border-none">
            <h1 className="text-2xl font-display font-bold text-deepPalm">{vendor.business_name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-charcoalInk/60">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-marketClay fill-marketClay" />
                <span className="font-bold text-charcoalInk">{vendor.avg_rating || '5.0'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>25-35 mins</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <MapPin className="h-3 w-3" />
              <span>{vendor.address_text}</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-16 p-4 space-y-6 flex-1">
        <h3 className="text-xl font-display font-bold text-deepPalm border-b-2 border-harmattanSand pb-2">Menu</h3>
        <div className="space-y-4">
          {items.map((item: any) => (
            <Card key={item.id} className="p-4 flex gap-4 hover:border-marketClay/30 transition-colors">
              <div className="flex-1 space-y-1">
                <h4 className="font-bold text-deepPalm">{item.name}</h4>
                <p className="text-xs text-charcoalInk/60 line-clamp-2">{item.description}</p>
                <p className="text-marketClay font-bold mt-2 tabular-nums">₵{(item.price_pesewas / 100).toFixed(2)}</p>
              </div>
              <div className="w-24 h-24 bg-harmattanSand rounded-warm shrink-0 relative overflow-hidden">
                <div className="woven-bg opacity-10" />
                <button
                  onClick={() => addItem(vendor.id, { id: item.id, name: item.name, price: item.price_pesewas, quantity: 1 })}
                  className="absolute bottom-2 right-2 h-8 w-8 bg-marketClay text-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
