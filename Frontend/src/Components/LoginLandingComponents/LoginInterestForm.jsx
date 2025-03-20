import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserContext';
import interestForm from '../../assets/interestForm.png';

const LoginInterestForm = (props) => {
  const [formData, setFormData] = useState({
    profession: '',
    interests: [],
    otherProfession: '',
    experience: '',
  });
  const { setUser } = useUser();
 
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
    { id: 'sap', name: 'SAP' },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.profession === '' || formData.profession === 'Select option' || formData.experience === '' || formData.experience === 'Select option' || (formData.profession === 'Other' && formData.otherProfession.trim() === '')){
      alert("Please fill valid data");
      return;
    }
    
    formData.interests = interestedCategories;

    const interestData = {
      profession: formData.profession === 'Other' ? formData.otherProfession : formData.profession,
      interests: formData.interests,
      experience: formData.experience
    };

    console.log('Form submitted:', interestData);
    setUser(prev => ({
      ...prev,
      profession: formData.profession !== 'Other' ? formData.profession : formData.otherProfession
    }));

    props.setShowInterestForm(false);
    props.setshowToggle(true);
  };

  const [interestedCategories, setInterestedCategories] = useState([]);

  const handleInterestedCategoriesChange = (id) => {
    if (!interestedCategories.includes(id)) {
      setInterestedCategories(prev => [
        ...prev,
        id
      ]);
    }
    else {
      setInterestedCategories(interestedCategories.filter(cat => cat !== id));
    }
  };

  useEffect(() => {
    // Effect dependency maintained from original code
  }, [interestedCategories]);

  const InterestChip = ({ category }) => {
    return (
      <div
        onClick={() => handleInterestedCategoriesChange(category.id)}
        className={`text-center flex-grow text-secondary ${interestedCategories.includes(category.id) ? 'bg-card-blue ' : 'bg-secondary'} border-contrast p-2 rounded-full hover:cursor-pointer`}>
        {category.name}
      </div>
    );
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-theme-gradient pt-8 md:pt-16 min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-8">
        {/* Form Content */}
        <div className="space-y-6 md:space-y-8 lg:space-y-10 w-full lg:w-1/2">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Tell us about your interests</h1>
            <h2 className="text-secondary text-base sm:text-lg mt-2">Help us personalize your experience by sharing your profession and interests</h2>
          </div>
          
          <div className="flex flex-col space-y-2 md:space-y-3">
            <label
              htmlFor="profession"
              className="text-secondary text-base md:text-lg font-medium">
              What is your profession? <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.profession}
              id="profession"
              name="profession"
              onChange={(e) => handleInputChange(e)}
              className="text-secondary border-contrast w-full sm:w-4/5 md:w-3/4 rounded-md p-2 bg-secondary">
              <option className="text-secondary">Select option</option>
              {professions.map((profession, idx) => (
                <option className="text-secondary" key={idx}>{profession}</option>
              ))}
            </select>
          </div>
          
          {formData.profession === 'Other' && (
            <div className="flex flex-col space-y-2 md:space-y-3">
              <label
                htmlFor="professionOther"
                className="text-secondary text-base md:text-lg font-medium">
                Enter your profession? <span className="text-red-500">*</span>
              </label>
              <input
                required
                id="professionOther"
                name="otherProfession"
                onChange={(e) => handleInputChange(e)}
                className="text-secondary border-contrast w-full sm:w-4/5 md:w-3/4 rounded-md p-2 bg-secondary">
              </input>
            </div>
          )}

          <div className="flex flex-col space-y-2 md:space-y-3">
            <label
              htmlFor="experience"
              className="text-secondary text-base md:text-lg font-medium">
              What is your experience level? <span className="text-red-500">*</span>
            </label>
            <select
              required
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange(e)}
              className="text-secondary border-contrast w-full sm:w-4/5 md:w-3/4 rounded-md p-2 bg-secondary">
              <option className="text-secondary">Select option</option>
              {experienceLevels.map((experience, idx) => (
                <option className="text-secondary" key={idx}>{experience}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2 md:space-y-3">
            <label
              htmlFor="interests"
              className="text-secondary text-base md:text-lg font-medium">
              What areas are you interested in?
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 w-full sm:w-4/5 md:w-3/4">
              {categories.map((category) => (
                <InterestChip key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Image Container */}
        <div className="hidden lg:block w-1/2">
          <img src={interestForm} className="h-full w-full object-contain" alt="Interest Form" />
        </div>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        className="py-2 px-6 sm:px-8 md:px-10 font-semibold fixed sm:absolute right-4 sm:right-6 md:right-8 lg:right-12 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 hover:cursor-pointer bg-blue-600 text-gray-200 w-fit h-fit rounded-md">
        Next
      </button>
    </form>
  );
};

export default LoginInterestForm;