import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChefHat, Clock, CheckCircle2, ChevronRight, BellRing, Square, CheckSquare } from 'lucide-react';

export const KitchenDisplay: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchTickets = () => {
    axios.get('http://localhost:8768/api/v1/kitchen/tickets').then(res => {
      setTickets(res.data);
      setLastUpdate(new Date());
    });
  };

  useEffect(() => {
    fetchTickets();
    const ws = new WebSocket('ws://localhost:8768/api/v1/kitchen/ws');
    ws.onmessage = () => fetchTickets();
    return () => ws.close();
  }, []);

  const updateItemStatus = async (id: string, status: string) => {
    await axios.patch(`http://localhost:8768/api/v1/kitchen/items/${id}/status?status=${status}`);
    fetchTickets();
  };

  const updateTicketStatus = async (id: string, status: string) => {
    await axios.patch(`http://localhost:8768/api/v1/kitchen/tickets/${id}/status?status=${status}`);
    fetchTickets();
  };

  const getAgingColor = (createdAt: string) => {
    const mins = (new Date().getTime() - new Date(createdAt).getTime()) / 60000;
    if (mins > 10) return 'border-red-500 bg-red-50 text-red-900';
    if (mins > 5) return 'border-amber-500 bg-amber-50 text-amber-900';
    return 'border-green-500 bg-green-50 text-green-900';
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col font-sans">
      <header className="bg-slate-800 p-6 border-b border-slate-700 flex justify-between items-center shadow-2xl">
        <div className="flex items-center space-x-4 text-white">
          <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-orange-900/20">
            <ChefHat size={32} />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">Kitchen Display</h1>
        </div>
        <div className="bg-slate-900 px-6 py-2 rounded-full border border-slate-700 text-slate-400 text-sm font-black flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>LIVE • {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </header>

      <div className="flex-1 p-8 flex space-x-8 overflow-x-auto">
        {['PENDING', 'IN_PROGRESS', 'READY'].map(colStatus => (
          <div key={colStatus} className="flex-1 min-w-[450px] flex flex-col bg-slate-800/30 rounded-[2.5rem] p-6 border border-slate-700/50 backdrop-blur-sm">
            <div className={`flex items-center justify-between mb-8 p-4 rounded-3xl ${
              colStatus === 'PENDING' ? 'bg-blue-500/10 text-blue-400' :
              colStatus === 'IN_PROGRESS' ? 'bg-orange-500/10 text-orange-400' :
              'bg-green-500/10 text-green-400'
            }`}>
              <h2 className="font-black text-xl uppercase tracking-widest pl-2">{colStatus}</h2>
              <span className="bg-slate-900/80 px-5 py-2 rounded-2xl text-lg font-black border border-white/5">
                {tickets.filter(t => t.status === colStatus).length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {tickets.filter(t => t.status === colStatus).map(ticket => (
                <div key={ticket.id} className={`p-6 rounded-[2rem] border-l-[16px] shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 ${getAgingColor(ticket.created_at)}`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Ticket ID</span>
                      <h3 className="text-4xl font-black tracking-tighter">#{ticket.order?.order_number.replace('#', '')}</h3>
                    </div>
                    <div className="text-right">
                      <div className="bg-black/5 px-3 py-1 rounded-full inline-flex items-center space-x-2 mb-2">
                        <Clock size={14} className="opacity-50" />
                        <span className="font-black text-sm">{Math.floor((new Date().getTime() - new Date(ticket.created_at).getTime()) / 60000)}m</span>
                      </div>
                      {ticket.order?.table && <p className="font-black text-2xl uppercase italic tracking-tighter">Table {ticket.order.table.number}</p>}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 bg-white/40 p-4 rounded-3xl border border-black/5">
                    {ticket.order?.items.map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => updateItemStatus(item.id, item.status === 'READY' ? 'PREPARING' : 'READY')}
                        className={`w-full flex items-start space-x-4 p-3 rounded-2xl transition-all ${item.status === 'READY' ? 'opacity-30 line-through grayscale' : 'hover:bg-white/60'}`}
                      >
                        {item.status === 'READY' ? <CheckSquare className="mt-1" /> : <Square className="mt-1" />}
                        <div className="flex-1 text-left">
                          <div className="flex justify-between items-center">
                            <p className="font-black text-xl leading-tight">{item.quantity}x {item.menu_item.name}</p>
                          </div>
                          {item.modifiers.length > 0 && (
                            <p className="text-xs font-bold opacity-60 mt-1 uppercase tracking-wider">+ {item.modifiers.map((m: any) => m.name).join(', ')}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    {colStatus === 'PENDING' && (
                        <button onClick={() => updateTicketStatus(ticket.id, 'IN_PROGRESS')} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/30 flex items-center justify-center space-x-2">
                            <span>Start Order</span>
                            <ChevronRight size={20} />
                        </button>
                    )}
                    {colStatus === 'IN_PROGRESS' && (
                        <button onClick={() => updateTicketStatus(ticket.id, 'READY')} className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-900/30 flex items-center justify-center space-x-2">
                            <BellRing size={20} />
                            <span>Notify Waiter</span>
                        </button>
                    )}
                    {colStatus === 'READY' && (
                        <button onClick={() => updateTicketStatus(ticket.id, 'DISMISSED')} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-2">
                            <CheckCircle2 size={20} />
                            <span>Bump Ticket</span>
                        </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
