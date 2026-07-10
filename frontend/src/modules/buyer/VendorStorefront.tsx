import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Star, Clock, MapPin, ChevronLeft, Plus } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export const VendorStorefront = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  // Mock data for now
  const vendor = {
    id,
    name: "Auntie Mary's Chop Bar",
    category: "food",
    rating: 4.8,
    deliveryTime: "20-30",
    address: "Ho Bankoe, near Market",
    items: [
      { id: '1', name: 'Banku with Tilapia', price: 4500, description: 'Freshly grilled tilapia served with hot banku and pepper sauce.' },
      { id: '2', name: 'Jollof Rice (Large)', price: 3500, description: 'Authentic Ghanaian jollof with chicken and salad.' },
      { id: '3', name: 'Fufu with Light Soup', price: 4000, description: 'Pounded fufu with goat meat light soup.' },
    ]
  };

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
            <h1 className="text-2xl font-display font-bold text-deepPalm">{vendor.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-charcoalInk/60">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-marketClay fill-marketClay" />
                <span className="font-bold text-charcoalInk">{vendor.rating}</span>
                <span>(120 reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{vendor.deliveryTime} mins</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <MapPin className="h-3 w-3" />
              <span>{vendor.address}</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-16 p-4 space-y-6 flex-1">
        <h3 className="text-xl font-display font-bold text-deepPalm border-b-2 border-harmattanSand pb-2">Menu</h3>
        <div className="space-y-4">
          {vendor.items.map((item) => (
            <Card key={item.id} className="p-4 flex gap-4 hover:border-marketClay/30 transition-colors">
              <div className="flex-1 space-y-1">
                <h4 className="font-bold text-deepPalm">{item.name}</h4>
                <p className="text-xs text-charcoalInk/60 line-clamp-2">{item.description}</p>
                <p className="text-marketClay font-bold mt-2 tabular-nums">₵{(item.price / 100).toFixed(2)}</p>
              </div>
              <div className="w-24 h-24 bg-harmattanSand rounded-warm shrink-0 relative overflow-hidden">
                <div className="woven-bg opacity-10" />
                <button
                  onClick={() => addItem(vendor.id as string, { ...item, quantity: 1 })}
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
