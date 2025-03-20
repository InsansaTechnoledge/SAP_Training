import React, { useState } from 'react';
import { Edit } from 'lucide-react';

const PasswordSection = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({...passwordData, [name]: value});
  };

  const savePasswordChanges = () => {
    // In a real app, this would validate and update the password
    alert("Password successfully updated!");
    setPasswordData({currentPassword: '', newPassword: '', confirmPassword: ''});
    setIsChangingPassword(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Password</h3>
        <button 
          onClick={() => setIsChangingPassword(!isChangingPassword)}
          className="flex items-center text-primary-600 hover:text-primary-800"
        >
          <Edit size={16} className="mr-1" /> {isChangingPassword ? 'Cancel' : 'Change'}
        </button>
      </div>
      
      {isChangingPassword ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input 
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input 
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button 
            onClick={savePasswordChanges}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Password
          </button>
        </div>
      ) : (
        <p className="text-gray-600">••••••••••••</p>
      )}
    </div>
  );
};

export default PasswordSection;