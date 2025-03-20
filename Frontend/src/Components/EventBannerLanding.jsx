import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt'

const EventsPromo = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  
  const featuredEvents = [
    {
      id: 1,
      title: "Annual Hackathon 2025",
      date: "April 15-17",
      description: "Join our 48-hour coding challenge and build innovative solutions.",
      registrationOpen: true,
    },
    {
      id: 2,
      title: "Future Tech Ideathon",
      date: "May 23-24",
      description: "Brainstorm the next big technological breakthrough with industry experts.",
      registrationOpen: true,
    },
    {
      id: 3,
      title: "Global Tech Connect Conference",
      date: "October 10-12",
      description: "Our flagship annual event bringing together tech enthusiasts worldwide.",
      registrationOpen: true,
    },
  ];

  const benefitsList = [
    {
      title: "Expand Your Network",
      description: "Connect with like-minded professionals, industry leaders, and potential collaborators or employers."
    },
    {
      title: "Accelerate Your Learning",
      description: "Gain hands-on experience and practical skills in a condensed timeframe with expert guidance."
    },
    {
      title: "Showcase Your Talents",
      description: "Demonstrate your creativity and technical abilities to a wider audience and potential employers."
    },
    {
      title: "Win Exciting Prizes",
      description: "Compete for recognition, cash prizes, mentorship opportunities, and career advancements."
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prevEvent) => (prevEvent + 1) % featuredEvents.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval); // Clean up on unmount
  }, [featuredEvents.length]);

  return (
    <div className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main section with two columns */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Column - Why Participate */}
          <div className="w-full lg:w-1/2">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
                Why Participate in Our Events?
              </h2>
              <div className="h-1 w-24 bg-blue-600 mb-6 mx-auto lg:mx-0"></div>
              <p className="text-blue-700 text-lg mb-8">
                Our tech events are designed to inspire innovation, foster collaboration, and accelerate your professional growth.
              </p>
            </div>
            
            <div className="space-y-6">
              {benefitsList.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-blue-600 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-blue-800">{benefit.title}</h3>
                    <p className="mt-1 text-blue-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <button className="bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 rounded-lg font-medium shadow-md transition-all duration-300 inline-flex items-center">
                Learn More About Our Events
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
             <Tilt className="w-1/2 lg:w-1/2">
          {/* Right Column - Events Promo with Tilt Effect */}
          <div className=" transform hover:scale-105 transition-transform duration-500 rotate-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Enhanced Header */}
              <div className="text-center p-6 bg-gradient-to-r from-blue-700 to-blue-500">
                <div className="mb-3 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-blue-900 text-xs px-4 py-1 rounded-full uppercase tracking-wider font-bold">
                    Don't Miss Out
                  </div>
                  <div className="h-8"></div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    EXTRAORDINARY EVENTS
                  </h2>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <div className="h-1 w-8 bg-white"></div>
                  <div className="mx-4 text-white font-bold text-sm">ELEVATE YOUR TECH JOURNEY</div>
                  <div className="h-1 w-8 bg-white"></div>
                </div>
              </div>

              {/* Featured Event Carousel */}
              <div className="relative">
                <img 
                  src="/api/placeholder/800/300" 
                  alt="Featured Event" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {featuredEvents[activeEvent].title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                    <span>{featuredEvents[activeEvent].date}, 2025</span>
                  </div>
                  <p className="text-sm text-blue-100">
                    {featuredEvents[activeEvent].description}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-2">
                    {featuredEvents.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveEvent(index)}
                        className={`w-3 h-3 rounded-full ${activeEvent === index ? 'bg-blue-600' : 'bg-blue-200'}`}
                        aria-label={`View event ${index + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-blue-500 font-medium">
                    {activeEvent + 1} of {featuredEvents.length}
                  </span>
                </div>
                
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 text-sm">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          </Tilt>
          
        </div>
      </div>
    </div>
  );
};

export default EventsPromo;