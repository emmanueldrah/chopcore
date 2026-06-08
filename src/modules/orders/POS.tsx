import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Search, ShoppingBag, CreditCard, Banknote, Smartphone, ChevronLeft, Trash2, Star, Hash, Printer, CheckCircle2, CircleDollarSign } from 'lucide-react';
import { useBusinessStore, BusinessMode } from '../../store/businessStore';
import { SplitBillModal } from '../billing/SplitBillModal';
import { useSearchParams } from 'react-router-dom';

export const POS: React.FC = () => {
  const { mode } = useBusinessStore();
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get('table');
  const tableNumber = searchParams.get('number');

  const [cart, setCart] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [orderType, setOrderType] = useState(tableId ? 'DINE_IN' : 'TAKEAWAY');
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState('Main');
  const [phoneLookup, setPhoneLookup] = useState('');
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const { data: items } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/menu/items').then(res => res.data),
  });

  const lookupCustomer = async () => {
    try {
      const res = await axios.get(`http://localhost:8768/api/v1/loyalty/customers?phone=${phoneLookup}`);
      if (res.data.length > 0) setCustomer(res.data[0]);
      else alert('Customer not found');
    } catch (e) { alert('Error looking up customer'); }
  };

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.course === selectedCourse);
      if (existing) {
        return prev.map(i => (i.id === item.id && i.course === selectedCourse) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, course: selectedCourse }];
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const handlePlaceOrder = useMutation({
    mutationFn: async () => {
      const orderRes = await axios.post('http://localhost:8768/api/v1/orders/', {
        table_id: tableId,
        items: cart.map(i => ({ menu_item_id: i.id, quantity: i.quantity, unit_price: i.price, course: i.course })),
        order_type: orderType,
        customer_name: customer?.name
      });

      const billRes = await axios.post('http://localhost:8768/api/v1/billing/', {
        order_id: orderRes.data.id
      });

      return { order: orderRes.data, bill: billRes.data };
    },
    onSuccess: (data) => {
      setCompletedOrder(data.order);
      setCart([]);
      setCheckoutMode(false);
    }
  });

  const printReceipt = (orderId: string) => {
    window.open(`http://localhost:8768/api/v1/print/receipt/${orderId}`, '_blank');
  };

  if (completedOrder) {
    return (
        <div className="h-screen bg-white flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-40 h-40 bg-green-50 text-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-100/50">
                <CheckCircle2 size={100} strokeWidth={3} />
            </div>
            <div className="text-center">
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Success!</h2>
                <p className="text-slate-400 font-bold mt-4 uppercase tracking-widest text-sm">Order #{completedOrder.order_number} has been fired to kitchen</p>
            </div>
            <div className="flex space-x-4 pt-10">
                <button onClick={() => printReceipt(completedOrder.id)} className="bg-slate-900 text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-sm flex items-center space-x-3 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    <Printer size={20} />
                    <span>Print Receipt</span>
                </button>
                <button onClick={() => setCompletedOrder(null)} className="bg-primary text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    New Order
                </button>
            </div>
        </div>
    );
  }

  if (checkoutMode) {
    return (
      <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
        <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
          <button onClick={() => setCheckoutMode(false)} className="flex items-center text-primary font-black uppercase tracking-widest text-xs mb-10 hover:translate-x-[-4px] transition-transform">
            <ChevronLeft size={20} className="mr-1" /> Back to Terminal
          </button>

          <div className="flex justify-between items-start mb-12">
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Settlement</h2>
            {tableNumber && (
                <div className="bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Serving Table</p>
                    <p className="text-3xl font-black italic tracking-tighter">#{tableNumber}</p>
                </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100">
                <h3 className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] mb-8">Select Payment Method</h3>
                <div className="grid grid-cols-3 gap-6">
                    <PaymentBtn icon={Banknote} label="Cash" active />
                    <PaymentBtn icon={Smartphone} label="MoMo" />
                    <PaymentBtn icon={CreditCard} label="Card" />
                </div>
              </div>

              <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden">
                <div className="relative z-10">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Amount Received (GHS)</label>
                    <div className="flex items-center space-x-6">
                        <span className="text-6xl font-black text-primary italic">₵</span>
                        <input
                            type="number" autoFocus
                            className="bg-transparent text-7xl font-black w-full outline-none placeholder:text-slate-800 tracking-tighter"
                            placeholder="0.00"
                            onChange={e => setReceivedAmount(Number(e.target.value) * 100)}
                        />
                    </div>
                    {receivedAmount > total && (
                        <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Change to Return</p>
                                <p className="text-5xl font-black text-green-400 italic tracking-tighter">₵ {((receivedAmount - total)/100).toFixed(2)}</p>
                            </div>
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                                <CheckCircle2 size={32} />
                            </div>
                        </div>
                    )}
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-slate-50 flex flex-col relative overflow-hidden">
                <h3 className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px] mb-8">Sale Summary</h3>
                <div className="flex-1 space-y-4 overflow-y-auto pr-4 custom-scrollbar">
                    {cart.map(item => (
                        <div key={item.id + item.course} className="flex justify-between items-end pb-4 border-b border-slate-50">
                            <div>
                                <p className="font-black text-slate-800 text-lg leading-tight uppercase italic">{item.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.quantity} x ₵ {(item.price/100).toFixed(2)} • {item.course}</p>
                            </div>
                            <p className="font-black text-slate-800 text-xl tracking-tighter">₵ {(item.price * item.quantity / 100).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-10 pt-10 border-t-8 border-dotted border-slate-100 space-y-4">
                    <div className="flex justify-between text-slate-400 font-black text-xs uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span>₵ {(subtotal/100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 font-black text-xs uppercase tracking-widest">
                        <span>VAT (15%)</span>
                        <span>₵ {(tax/100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-5xl font-black pt-8 text-slate-900 tracking-tighter italic">
                        <span>Total Due</span>
                        <span className="text-primary">₵ {(total/100).toFixed(2)}</span>
                    </div>
                </div>
                <button
                    disabled={handlePlaceOrder.isPending}
                    onClick={() => handlePlaceOrder.mutate()}
                    className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black text-xl mt-12 shadow-2xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-4 uppercase tracking-[0.2em] text-sm"
                >
                    {handlePlaceOrder.isPending ? 'Finalizing Sale...' : (
                        <>
                            <CircleDollarSign size={24} className="text-primary" />
                            <span>Complete Transaction</span>
                        </>
                    )}
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <header className="flex items-center space-x-6 mb-8">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" placeholder="Search menu items..." className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] py-4 pl-12 pr-4 focus:border-primary outline-none transition-all shadow-sm font-bold" />
            </div>
            {mode === BusinessMode.SIT_DOWN && (
                <div className="flex bg-white rounded-[1.5rem] p-1 border-2 border-slate-100 shadow-sm">
                    {['Starter', 'Main', 'Dessert'].map(c => (
                        <button key={c} onClick={() => setSelectedCourse(c)} className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${selectedCourse === c ? 'bg-primary text-white shadow-lg shadow-orange-200' : 'text-slate-400 hover:bg-slate-50'}`}>{c}</button>
                    ))}
                </div>
            )}
        </header>

        <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-6 pr-2 pb-6 custom-scrollbar">
            {items?.map((item: any) => (
                <button key={item.id} onClick={() => addToCart(item)} className="bg-white p-5 rounded-[2.5rem] shadow-sm border-2 border-transparent hover:border-primary hover:shadow-2xl hover:shadow-orange-100/50 transition-all group text-left flex flex-col h-fit">
                    <div className="h-44 bg-slate-100 rounded-[2rem] mb-4 group-hover:scale-[1.03] transition-transform overflow-hidden relative">
                        {item.image_url ? <img src={item.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><ShoppingBag size={48} /></div>}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-black text-xs text-primary shadow-sm tracking-tighter">₵ {(item.price/100).toFixed(2)}</div>
                    </div>
                    <h3 className="font-black text-slate-800 text-lg leading-tight mb-1 uppercase italic">{item.name}</h3>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider line-clamp-2 mb-4 h-8">{item.description || 'Premium Quality'}</p>
                </button>
            ))}
        </div>
      </div>

      <div className="w-[520px] bg-white shadow-2xl flex flex-col z-10 border-l border-slate-100">
        <div className="p-8 border-b border-slate-50">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black flex items-center space-x-3 tracking-tighter uppercase italic">
                    <ShoppingBag className="text-primary" />
                    <span>Current Order</span>
                </h2>
                <div className="flex bg-slate-100 rounded-2xl p-1">
                    {['DINE_IN', 'TAKEAWAY'].map(t => (
                        <button key={t} onClick={() => setOrderType(t)} className={`px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${orderType === t ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}>{t.replace('_', ' ')}</button>
                    ))}
                </div>
            </div>

            <div className="flex space-x-3">
                <div className="relative flex-1">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Lookup phone number..." className="w-full bg-slate-50 border-2 border-transparent focus:border-primary rounded-2xl py-4 pl-12 pr-4 text-sm font-black outline-none transition-all placeholder:text-slate-300" value={phoneLookup} onChange={e => setPhoneLookup(e.target.value)} />
                </div>
                <button onClick={lookupCustomer} className="bg-slate-900 text-white px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Lookup</button>
            </div>
            {customer && (
                <div className="mt-6 p-5 bg-orange-50 rounded-[2rem] border border-orange-100 flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200"><Star size={24} /></div>
                        <div>
                            <p className="font-black text-slate-800 uppercase tracking-tighter">{customer.name}</p>
                            <p className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">{customer.tier} • {customer.loyalty_points} Points</p>
                        </div>
                    </div>
                    <button onClick={() => setCustomer(null)} className="text-slate-300 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-colors p-2">Remove</button>
                </div>
            )}
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            {['Starter', 'Main', 'Dessert'].map(course => {
                const courseItems = cart.filter(i => i.course === course);
                if (courseItems.length === 0) return null;
                return (
                    <div key={course} className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">{course}s</h4>
                            <div className="flex-1 h-px bg-slate-100"></div>
                        </div>
                        {courseItems.map(item => (
                            <div key={item.id + item.course} className="flex justify-between items-center group">
                                <div className="flex-1">
                                    <p className="font-black text-slate-800 leading-none uppercase italic tracking-tighter text-lg">{item.name}</p>
                                    <div className="flex items-center space-x-4 mt-3">
                                        <div className="flex bg-slate-100 rounded-xl p-1">
                                            <button onClick={() => addToCart({ ...item, quantity: -1 })} className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm transition-all flex items-center justify-center font-black text-sm">-</button>
                                            <span className="font-black text-slate-900 w-8 text-center flex items-center justify-center text-sm">{item.quantity}</span>
                                            <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm transition-all flex items-center justify-center font-black text-sm">+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-slate-800 text-xl tracking-tighter italic">₵ {(item.price * item.quantity / 100).toFixed(2)}</p>
                                    <button onClick={() => setCart(cart.filter(i => !(i.id === item.id && i.course === item.course)))} className="text-slate-100 hover:text-red-500 transition-colors p-2"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}
            {cart.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-200 space-y-6 pt-10">
                    <ShoppingBag size={100} strokeWidth={1} className="opacity-10" />
                    <p className="font-black uppercase tracking-[0.3em] text-[10px]">No Items In Service</p>
                </div>
            )}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setIsSplitModalOpen(true)} className="flex items-center justify-center space-x-3 py-4 rounded-2xl bg-white border-2 border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all shadow-sm">
                    <Hash size={16} />
                    <span>Split Bill</span>
                </button>
                <button className="flex items-center justify-center space-x-3 py-4 rounded-2xl bg-white border-2 border-slate-200 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:border-primary hover:text-primary transition-all shadow-sm">
                    <Star size={16} />
                    <span>Redeem Pts</span>
                </button>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                    <span>Subtotal</span>
                    <span className="text-slate-600 tracking-tighter">₵ {(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-4xl font-black pt-6 border-t-4 border-double border-slate-200 mt-4 text-slate-900 tracking-tighter italic">
                    <span className="uppercase text-xl mt-2">Total Due</span>
                    <span className="text-primary text-5xl">₵ {(total / 100).toFixed(2)}</span>
                </div>
            </div>
            <button
                disabled={cart.length === 0}
                onClick={() => setCheckoutMode(true)}
                className="w-full bg-primary text-white py-8 rounded-[2.5rem] font-black text-xl shadow-[0_20px_50px_-12px_rgba(194,65,12,0.4)] hover:bg-orange-700 hover:scale-[1.02] active:scale-95 transition-all disabled:bg-slate-200 disabled:shadow-none uppercase tracking-[0.2em] text-sm"
            >
                Confirm Settlement
            </button>
        </div>
      </div>

      {isSplitModalOpen && (
        <SplitBillModal
            total={total}
            items={cart}
            onClose={() => setIsSplitModalOpen(false)}
            onComplete={(splits) => {
                console.log('Splits:', splits);
                setIsSplitModalOpen(false);
            }}
        />
      )}
    </div>
  );
};

const PaymentBtn = ({ icon: Icon, label, active }: any) => (
  <button className={`p-8 rounded-3xl border-4 transition-all flex flex-col items-center space-y-4 ${active ? 'border-primary bg-orange-50 text-primary shadow-2xl shadow-orange-100 scale-105' : 'border-slate-50 text-slate-300 hover:border-slate-200'}`}>
    <Icon size={40} />
    <span className="font-black text-[10px] uppercase tracking-widest">{label}</span>
  </button>
);
