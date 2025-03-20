import React from 'react';
import { Calendar } from 'lucide-react';

const EventsTab = ({ events }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Events Participation</h3>
        <div className="flex items-center">
          <Calendar size={18} className="text-gray-500 mr-1" />
          <span>{events.length} Events</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{event.name}</h4>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                {event.achievement}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {new Date(event.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsTab;