import React from 'react';
import { ArrowRight, Calendar, Star, Clock, MapPin } from 'lucide-react';
import { useUser } from '../../Context/UserContext';


const EventBanner = ({ userEvents = [], upcomingEvents = [] }) => {
  const { user } = useUser();
    
  const sampleUserEvents = userEvents.length > 0 ? userEvents : [
    { id: 1, name: "AI Conference 2025", role: "Attendee" },
    { id: 2, name: "Web Dev Summit", role: "Attendee" }
  ];
  
  const sampleUpcomingEvents = upcomingEvents.length > 0 ? upcomingEvents : [
    { id: 3, name: "React Workshop", date: "April 5 2025", time: "10:00 AM", location: "Online" },
    { id: 4, name: "UX Design Meetup", date: "April 12 2025", time: "2:00 PM", location: "Online" }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg shadow-lg p-6 text-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute top-1/2 -right-16 w-64 h-64 rounded-full bg-white"></div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-stretch">
        <div className="mb-6 md:mb-0 md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-3">
              <Star className="h-4 w-4 text-blue-800" />
            </div>
            {user.name}'s Event Journey
          </h2>
          <h6 className=" font-bold mb-4 flex text-gray-300 items-center">
            
            required email to register: {user.email} 
          </h6>
          
          <div className="mb-6">
            <h3 className="font-semibold text-blue-200 mb-3">
              Participated Events
            </h3>
            <div className="flex flex-wrap gap-2">
              {sampleUserEvents.map(event => (
                <div key={event.id} className="bg-blue-700 bg-opacity-50 px-4 py-2 rounded-lg text-sm flex items-center group hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
                  <span>{event.name}</span>
                  {event.role && (
                    <span className="ml-2 px-2 py-1 bg-blue-200 text-blue-900 rounded-full text-xs">
                      {event.role}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="text-blue-200 text-sm mb-2">Event impact</div>
            <div className="h-2 bg-blue-900 bg-opacity-50 rounded-full w-full mb-1">
              <div className="h-2 bg-blue-200 rounded-full w-3/4"></div>
            </div>
            <div className="text-xs text-blue-200">75% toward next achievement</div>
          </div>
        </div>
        
        <div className="border-t md:border-l md:border-t-0 border-blue-300 border-opacity-30 md:pl-8 pt-6 md:pt-0 w-full md:w-1/2">
          <h3 className="font-semibold text-blue-200 mb-3 flex items-center">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-3">
              <Calendar className="h-4 w-4 text-blue-800" />
            </div>
            Upcoming Events
          </h3>
          
          <div className="space-y-4 mb-6">
            {sampleUpcomingEvents.map(event => (
              <div key={event.id} className="bg-blue-700 bg-opacity-40 p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{event.name}</span>
                  <span className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded-full">
                    {event.date}
                  </span>
                </div>
                <div className="flex text-xs text-blue-200">
                  {event.time && (
                    <div className="flex items-center mr-4">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => window.location.href = '/events'} 
            className="w-full bg-blue-100 text-blue-800 hover:bg-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 group"
          >
            Explore All Events
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;