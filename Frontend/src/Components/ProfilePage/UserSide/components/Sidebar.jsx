import React from 'react';
import { User, Clock, CreditCard, Calendar, LogOut, Camera, CheckCircle } from 'lucide-react';

const Sidebar = ({ user, currentTab, setCurrentTab, handleAvatarChange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <div className="relative inline-block mb-4">
        <img 
          src={user.avatar} 
          alt="User Avatar" 
          className="w-24 h-24 rounded-full mx-auto"
        />
        <button 
          onClick={handleAvatarChange}
          className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full"
        >
          <Camera size={16} />
        </button>
      </div>
      <h2 className="text-xl font-bold mb-1">{user.name}</h2>
      <p className="text-gray-500 text-sm mb-4">{user.email}</p>
      
      <div className="flex items-center justify-center text-yellow-500 mb-6">
        <CheckCircle size={18} className="mr-1" />
        <span className="font-medium">{user.streak} Day Streak</span>
      </div>
      
      <nav className="space-y-1">
        <button 
          onClick={() => setCurrentTab('profile')}
          className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
            currentTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <User size={18} className="mr-2" />
          Profile
        </button>
        <button 
          onClick={() => setCurrentTab('streak')}
          className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
            currentTab === 'streak' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Clock size={18} className="mr-2" />
          Streak
        </button>
        <button 
          onClick={() => setCurrentTab('invoices')}
          className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
            currentTab === 'invoices' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <CreditCard size={18} className="mr-2" />
          Purchases
        </button>
        <button 
          onClick={() => setCurrentTab('events')}
          className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
            currentTab === 'events' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Calendar size={18} className="mr-2" />
          Events
        </button>
      </nav>
      
      {/* <button 
        className="flex items-center justify-center w-full mt-6 text-gray-700 hover:text-red-600"
      >
        <LogOut size={18} className="mr-1" />
        Sign Out
      </button> */}
    </div>
  );
};

export default Sidebar;