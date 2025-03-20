import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProfileTab from './components/ProfileTab';
import StreakTab from './components/StreakTab';
import InvoicesTab from './components/InvoicesTab';
import EventsTab from './components/EventsTab';
import { generateStreakData } from './utils/streakUtils';

const UserProfileDashboard = () => {
  // Sample user data
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/api/placeholder/150/150",
    streak: 5, // current streak in days
  streakData: {
    "2025-03-20": 3,
    "2025-03-19": 2,
    "2025-03-18": 4,
    "2025-03-17": 1,
    "2025-03-16": 3,
    "2025-03-15": 2,
    "2025-03-14": 0
  },
    invoices: [
      { id: 1, courseName: "Advanced React Development", date: "2025-02-15", amount: 79.99 },
      { id: 2, courseName: "Tailwind CSS Masterclass", date: "2025-01-20", amount: 49.99 },
      { id: 3, courseName: "Full Stack Web Development", date: "2024-12-05", amount: 129.99 },
    ],
    events: [
      { id: 1, name: "Web Development Hackathon", date: "2025-01-10", achievement: "2nd Place" },
      { id: 2, name: "React Conference 2024", date: "2024-11-20", achievement: "Participant" },
      { id: 3, name: "Coding Challenge: Algorithm Edition", date: "2024-09-15", achievement: "Finalist" },
    ]
  });

  const [currentTab, setCurrentTab] = useState('profile');

  // Handle avatar change
  const handleAvatarChange = () => {
    // In a real app, this would open a file picker and upload the image
    alert("In a real app, this would allow you to upload a new avatar image");
  };

  // Update user data
  const updateUserData = (updatedData) => {
    setUser({...user, ...updatedData});
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Sidebar 
              user={user} 
              currentTab={currentTab} 
              setCurrentTab={setCurrentTab}
              handleAvatarChange={handleAvatarChange}
            />
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            {currentTab === 'profile' && <ProfileTab user={user} updateUserData={updateUserData} />}
            {currentTab === 'streak' && <StreakTab user={user} />}
            {currentTab === 'invoices' && <InvoicesTab invoices={user.invoices} />}
            {currentTab === 'events' && <EventsTab events={user.events} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDashboard;