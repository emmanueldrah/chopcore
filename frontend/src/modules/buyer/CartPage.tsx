import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { items, removeItem, addItem, vendorId, clearCart } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] p-6 space-y-4">
        <div className="h-24 w-24 bg-harmattanSand rounded-full flex items-center justify-center relative overflow-hidden">
          <div className="woven-bg opacity-20" />
          <ShoppingBag className="h-10 w-10 text-marketClay z-10" />
        </div>
        <h2 className="text-2xl font-display font-bold text-deepPalm">Your cart is empty</h2>
        <p className="text-charcoalInk/60 text-center">Browse local vendors to add items to your cart.</p>
        <Button onClick={() => navigate('/')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-deepPalm">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-ripePepper font-medium">Clear All</button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="p-4 flex gap-4">
            <div className="flex-1 space-y-1">
              <h4 className="font-bold text-deepPalm">{item.name}</h4>
              <p className="text-marketClay font-medium">₵{(item.price / 100).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-harmattanSand rounded-warm overflow-hidden">
                <button
                  className="p-1 hover:bg-harmattanSand"
                  onClick={() => removeItem(item.id)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-3 py-1 font-bold text-sm">{item.quantity}</span>
                <button
                  className="p-1 hover:bg-harmattanSand"
                  onClick={() => vendorId && addItem(vendorId, { ...item, quantity: 1 })}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-ripePepper/40 hover:text-ripePepper">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-deepPalm text-white space-y-4 shadow-xl">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span className="font-bold tabular-nums">₵{(total / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-white/60">
          <span>Delivery Fee (Ho Central)</span>
          <span className="tabular-nums">₵5.00</span>
        </div>
        <div className="border-t border-white/20 pt-4 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="tabular-nums">₵{((total + 500) / 100).toFixed(2)}</span>
        </div>
        <Button
          className="w-full bg-marketClay border-none text-white hover:bg-marketClay/90 h-14 text-lg group"
          onClick={() => navigate('/checkout')}
        >
          Go to Checkout
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Card>
    </div>
  );
};
