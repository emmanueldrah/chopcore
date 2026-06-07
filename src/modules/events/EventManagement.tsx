import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const EventManagement: React.FC = () => {
  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/events/').then(res => res.data),
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Catering & Events</h1>
        <button className="bg-primary text-white px-4 py-2 rounded">Book Event</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event: any) => (
          <div key={event.id} className="bg-white p-6 rounded-xl shadow border">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{event.status}</span>
              <p className="text-sm text-gray-500">{new Date(event.event_date).toLocaleDateString()}</p>
            </div>
            <h2 className="text-xl font-bold mb-2">{event.event_type}</h2>
            <p className="text-gray-600 mb-4">{event.client_name}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Venue:</span>
                <span className="font-medium">{event.venue}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Guests:</span>
                <span className="font-medium">{event.expected_guests}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-gray-500">Budget:</span>
                <span className="font-bold text-primary">₵ {(event.total_budget / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
