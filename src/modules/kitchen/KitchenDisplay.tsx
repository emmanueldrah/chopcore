import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const KitchenDisplay: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    // Initial fetch
    axios.get('http://localhost:8768/api/v1/kitchen/tickets').then(res => setTickets(res.data));

    // WebSocket connection
    const ws = new WebSocket('ws://localhost:8768/api/v1/kitchen/ws');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'TICKET_UPDATED' || data.type === 'NEW_TICKET') {
        axios.get('http://localhost:8768/api/v1/kitchen/tickets').then(res => setTickets(res.data));
      }
    };

    return () => ws.close();
  }, []);

  const getTicketColor = (createdAt: string) => {
    const age = (new Date().getTime() - new Date(createdAt).getTime()) / 60000;
    if (age > 10) return 'border-red-500 bg-red-50';
    if (age > 5) return 'border-yellow-500 bg-yellow-50';
    return 'border-green-500 bg-green-50';
  };

  return (
    <div className="h-screen bg-gray-900 p-6 overflow-x-auto flex space-x-6">
      <div className="flex-1 flex flex-col">
        <h2 className="text-white font-bold text-xl mb-4 bg-blue-600 p-2 rounded">PENDING</h2>
        <div className="space-y-4">
          {tickets.filter(t => t.status === 'PENDING').map(ticket => (
            <div key={ticket.id} className={`p-4 border-l-8 rounded shadow-lg ${getTicketColor(ticket.created_at)}`}>
              <div className="flex justify-between font-bold text-lg mb-2">
                <span>Order {ticket.order?.order_number}</span>
                <span>{new Date(ticket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <ul className="space-y-1 border-t pt-2">
                {ticket.order?.items.map((item: any) => (
                  <li key={item.id} className="text-gray-800">
                    <span className="font-bold">{item.quantity}x</span> {item.menu_item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-white font-bold text-xl mb-4 bg-orange-600 p-2 rounded">IN PROGRESS</h2>
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-white font-bold text-xl mb-4 bg-green-600 p-2 rounded">READY</h2>
      </div>
    </div>
  );
};
