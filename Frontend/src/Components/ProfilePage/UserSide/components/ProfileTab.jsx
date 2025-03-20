import React from 'react';
import { User, Mail, Phone, Edit } from 'lucide-react';
import PasswordSection from './PasswordSection';

const ProfileTab = ({ user, updateUserData }) => {
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState({...user});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({...editedUser, [name]: value});
  };

  const saveProfileChanges = () => {
    updateUserData({
      name: editedUser.name,
      email: editedUser.email,
      phone: editedUser.phone
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Personal Information</h3>
          <button 
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <Edit size={16} className="mr-1" /> {isEditingProfile ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        {isEditingProfile ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleProfileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleProfileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                type="tel"
                name="phone"
                value={editedUser.phone}
                onChange={handleProfileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button 
              onClick={saveProfileChanges}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User size={20} className="text-gray-500 mr-2" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-500 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="text-gray-500 mr-2" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <PasswordSection />
    </div>
  );
};

export default ProfileTab;