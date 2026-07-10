import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useCartStore } from '../../store/useCartStore';
import { Phone, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + 500;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/order-tracking/mock-order-id');
    }, 2000);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-display font-bold text-deepPalm">Checkout</h1>

      <section className="space-y-3">
        <h3 className="text-sm font-bold text-charcoalInk/60 uppercase tracking-widest">Delivery Address</h3>
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-harmattanSand rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-marketClay" />
            </div>
            <div>
              <p className="font-bold text-deepPalm">Home</p>
              <p className="text-xs text-charcoalInk/60">Ho Bankoe, near the main market</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-charcoalInk/40" />
        </Card>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-bold text-charcoalInk/60 uppercase tracking-widest">Payment Method</h3>
        <div className="grid grid-cols-1 gap-3">
          {['MTN Mobile Money', 'Telecel Cash', 'AT Money'].map((method, i) => (
            <Card key={method} className={`p-4 flex items-center justify-between border-2 ${i === 0 ? 'border-marketClay' : 'border-harmattanSand'}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-harmattanSand rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-beverageTeal" />
                </div>
                <span className="font-bold text-deepPalm">{method}</span>
              </div>
              {i === 0 && <CheckCircle2 className="h-5 w-5 text-marketClay fill-marketClay text-white" />}
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-bold text-charcoalInk/60 uppercase tracking-widest">Order Summary</h3>
        <Card className="p-4 space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span className="tabular-nums">₵{(item.price * item.quantity / 100).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-harmattanSand pt-2 mt-2 flex justify-between font-bold text-deepPalm">
            <span>Total</span>
            <span className="tabular-nums text-marketClay">₵{(total / 100).toFixed(2)}</span>
          </div>
        </Card>
      </section>

      <div className="pt-4">
        <Button
          className="w-full h-14 text-lg"
          isLoading={isProcessing}
          onClick={handlePlaceOrder}
        >
          Confirm and Pay
        </Button>
      </div>
    </div>
  );
};
