import React, { useState } from 'react';

const LoginInterestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    profession: '',
    interests: [],
    otherProfession: '',
    experience: '',
  });

  const professions = [
    'Software Engineer',
    'Data Scientist',
    'IT Administrator',
    'Student',
    'Business Analyst',
    'Project Manager',
    'Other'
  ];

  const categories = [
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'development', name: 'Development' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'sap', name: 'SAP' }
  ];

  const experienceLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        interests: [...formData.interests, value]
      });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter(interest => interest !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose(); // Close popup after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-semibold mb-6 text-center">Tell us about your interests</h2>
        <p className="text-gray-600 mb-6 text-center">
          Help us personalize your experience by sharing your profession and interests
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              What is your profession?
            </label>
            <select 
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your profession</option>
              {professions.map(profession => (
                <option key={profession} value={profession}>{profession}</option>
              ))}
            </select>
          </div>

          {formData.profession === 'Other' && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Please specify your profession
              </label>
              <input
                type="text"
                name="otherProfession"
                value={formData.otherProfession}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your profession"
                required
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              What is your experience level?
            </label>
            <select 
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your experience level</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Which areas are you interested in? (Select all that apply)
            </label>
            <div className="mt-2 space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.id}
                    name="interests"
                    value={category.id}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={category.id} className="ml-2 block text-gray-700">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginInterestForm;