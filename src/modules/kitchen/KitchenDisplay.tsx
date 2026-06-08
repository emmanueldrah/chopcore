import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChefHat, Clock, CheckCircle2, ChevronRight, BellRing } from 'lucide-react';

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
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'TICKET_UPDATED' || data.type === 'NEW_TICKET') {
        fetchTickets();
        if (data.type === 'NEW_TICKET') new Audio('/sounds/alert.mp3').play().catch(() => {});
      }
    };
    return () => ws.close();
  }, []);

  const updateStatus = async (id: string, status: string) => {
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
    <div className="h-screen bg-slate-900 flex flex-col">
      <header className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center space-x-3 text-white">
          <ChefHat size={32} className="text-primary" />
          <h1 className="text-2xl font-black uppercase tracking-tighter">Kitchen Display System</h1>
        </div>
        <div className="text-slate-400 text-sm font-mono">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </header>

      <div className="flex-1 p-6 flex space-x-6 overflow-x-auto">
        {['PENDING', 'IN_PROGRESS', 'READY'].map(colStatus => (
          <div key={colStatus} className="flex-1 min-w-[400px] flex flex-col bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
            <div className={`flex items-center justify-between mb-4 p-3 rounded-xl ${
              colStatus === 'PENDING' ? 'bg-blue-500/10 text-blue-400' :
              colStatus === 'IN_PROGRESS' ? 'bg-orange-500/10 text-orange-400' :
              'bg-green-500/10 text-green-400'
            }`}>
              <h2 className="font-black text-lg">{colStatus}</h2>
              <span className="bg-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                {tickets.filter(t => t.status === colStatus).length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {tickets.filter(t => t.status === colStatus).map(ticket => (
                <div key={ticket.id} className={`p-5 rounded-2xl border-l-[12px] shadow-2xl transition-all hover:scale-[1.02] ${getAgingColor(ticket.created_at)}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest opacity-60">Order</span>
                      <h3 className="text-3xl font-black">{ticket.order?.order_number}</h3>
                    </div>
                    <div className="text-right">
                      <Clock size={16} className="inline mr-1 opacity-60" />
                      <span className="font-bold">{Math.floor((new Date().getTime() - new Date(ticket.created_at).getTime()) / 60000)}m</span>
                      {ticket.order?.table && <p className="font-black text-xl mt-1">Table {ticket.order.table.number}</p>}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 border-t border-black/5 pt-4">
                    {ticket.order?.items.map((item: any) => (
                      <li key={item.id} className="flex items-start space-x-3">
                        <span className="bg-black/10 px-2 py-1 rounded font-black">{item.quantity}</span>
                        <div className="flex-1">
                          <p className="font-bold text-lg leading-tight">{item.menu_item.name}</p>
                          {item.modifiers.length > 0 && (
                            <p className="text-sm opacity-70 italic">+ {item.modifiers.map((m: any) => m.name).join(', ')}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {colStatus === 'PENDING' && (
                    <button onClick={() => updateStatus(ticket.id, 'IN_PROGRESS')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/20">
                      <span>Start Cooking</span>
                      <ChevronRight size={20} />
                    </button>
                  )}
                  {colStatus === 'IN_PROGRESS' && (
                    <button onClick={() => updateStatus(ticket.id, 'READY')} className="w-full bg-green-600 text-white py-3 rounded-xl font-black flex items-center justify-center space-x-2 shadow-lg shadow-green-900/20">
                      <BellRing size={20} />
                      <span>Order Ready</span>
                    </button>
                  )}
                  {colStatus === 'READY' && (
                    <button onClick={() => updateStatus(ticket.id, 'DISMISSED')} className="w-full bg-slate-900 text-white py-3 rounded-xl font-black flex items-center justify-center space-x-2">
                      <CheckCircle2 size={20} />
                      <span>Bump Ticket</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
