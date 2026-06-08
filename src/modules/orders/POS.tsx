import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Search, ShoppingBag, CreditCard, Banknote, Smartphone, ChevronLeft, Trash2 } from 'lucide-react';

export const POS: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('DINE_IN');
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState(0);

  const { data: items } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/menu/items').then(res => res.data),
  });

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const change = receivedAmount > total ? receivedAmount - total : 0;

  const placeOrder = useMutation({
    mutationFn: (data: any) => axios.post('http://localhost:8768/api/v1/orders/', data),
    onSuccess: () => {
      setCart([]);
      setCheckoutMode(false);
      alert('Order placed successfully!');
    }
  });

  if (checkoutMode) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 p-10">
          <button onClick={() => setCheckoutMode(false)} className="flex items-center text-primary font-bold mb-8 hover:underline">
            <ChevronLeft /> Back to Menu
          </button>

          <h2 className="text-3xl font-black mb-10">Payment & Checkout</h2>

          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-6">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <PaymentBtn icon={Banknote} label="Cash" active />
                <PaymentBtn icon={Smartphone} label="Mobile Money" />
                <PaymentBtn icon={CreditCard} label="Bank Card" />
              </div>

              <div className="mt-10">
                <label className="block text-sm font-bold text-gray-700 mb-2">Amount Received (GHS)</label>
                <input
                  type="number"
                  className="w-full text-4xl font-black p-4 border-2 border-gray-100 rounded-2xl focus:border-primary outline-none"
                  value={receivedAmount / 100}
                  onChange={e => setReceivedAmount(Number(e.target.value) * 100)}
                />
                {change > 0 && (
                  <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                    <p className="text-green-600 font-bold">Change Due</p>
                    <p className="text-3xl font-black text-green-700">₵ {(change / 100).toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-6">Order Summary</h3>
              <div className="flex-1 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between font-medium">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₵ {(item.price * item.quantity / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-6 mt-6 space-y-2">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₵ {(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>VAT (15%)</span>
                  <span>₵ {(tax / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4">
                  <span>Total</span>
                  <span className="text-primary">₵ {(total / 100).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => placeOrder.mutate({
                  items: cart.map(i => ({ menu_item_id: i.id, quantity: i.quantity, unit_price: i.price })),
                  order_type: orderType,
                  customer_name: customerName
                })}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl mt-10 hover:bg-orange-700 transition"
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text" placeholder="Search menu items..."
              className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:border-primary outline-none transition"
            />
          </div>
          <div className="flex bg-white rounded-2xl p-1 border-2 border-gray-100">
            {['DINE_IN', 'TAKEAWAY', 'DELIVERY'].map(t => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition ${orderType === t ? 'bg-primary text-white' : 'text-gray-500'}`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-6 pr-2">
          {items?.map((item: any) => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:border-primary hover:shadow-xl transition-all group text-left flex flex-col"
            >
              <div className="h-40 bg-gray-100 rounded-2xl mb-4 group-hover:scale-105 transition-transform overflow-hidden">
                {item.image_url ? <img src={item.image_url} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ShoppingBag size={48} /></div>}
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-primary font-black mt-auto text-lg">₵ {(item.price / 100).toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-[450px] bg-white shadow-2xl border-l flex flex-col">
        <div className="p-8 border-b">
          <h2 className="text-2xl font-black flex items-center space-x-3">
            <ShoppingBag className="text-primary" />
            <span>Current Order</span>
          </h2>
          <input
            type="text" placeholder="Customer Name (Optional)"
            className="w-full mt-4 bg-gray-50 border-none rounded-xl p-3 focus:ring-2 ring-primary outline-none"
            value={customerName} onChange={e => setCustomerName(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p className="font-bold">Your cart is empty</p>
            </div>
          )}
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center group">
              <div className="flex-1">
                <p className="font-bold text-gray-800">{item.name}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <button onClick={() => addToCart({ ...item, quantity: -1 })} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-black">-</button>
                  <span className="font-black text-primary">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-black">+</button>
                </div>
              </div>
              <div className="text-right flex items-center space-x-4">
                <p className="font-black text-gray-800">₵ {(item.price * item.quantity / 100).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-gray-50 border-t space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-500 font-bold">
              <span>Subtotal</span>
              <span>₵ {(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-black pt-4 border-t">
              <span>Total Amount</span>
              <span className="text-primary font-black">₵ {(total / 100).toFixed(2)}</span>
            </div>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={() => setCheckoutMode(true)}
            className="w-full bg-primary text-white py-6 rounded-3xl font-black text-2xl shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all disabled:bg-gray-300 disabled:shadow-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentBtn = ({ icon: Icon, label, active }: any) => (
  <button className={`p-6 rounded-2xl border-2 flex flex-col items-center space-y-2 transition-all ${active ? 'border-primary bg-orange-50 text-primary shadow-lg shadow-orange-100 scale-105' : 'border-gray-100 hover:border-gray-300 text-gray-500'}`}>
    <Icon size={32} />
    <span className="font-bold text-sm">{label}</span>
  </button>
);
