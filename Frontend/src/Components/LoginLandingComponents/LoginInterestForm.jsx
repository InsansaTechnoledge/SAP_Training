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
  const {setUser} = useUser();
 
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

  // const handleCheckboxChange = (e) => {
  //   const { value, checked } = e.target;

  //   if (checked) {
  //     setFormData({
  //       ...formData,
  //       interests: [...formData.interests, value]
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       interests: formData.interests.filter(interest => interest !== value)
  //     });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.profession==='' || formData.profession==='Select option' || formData.experience==='' || formData.experience==='Select option' || (formData.profession==='Other' && formData.otherProfession.trim()==='')){
      alert("Please fill valid data");
      return
    }
    
    formData.interests = interestedCategories;

    const interestData = {
      profession: formData.profession==='Other' ? formData.otherProfession : formData.profession,
      interests: formData.interests,
      experience: formData.experience
    }

    console.log('Form submitted:', interestData);
    setUser(prev => ({
      ...prev,
      profession: formData.profession!=='Other' ? formData.profession : formData.otherProfession
    }))

    props.setShowInterestForm(false);
  };

  const [interestedCategories, setInterestedCategories] = useState([]);

  const handleInterestedCategoriesChange = (id) => {
    if (!interestedCategories.includes(id)) {
      setInterestedCategories(prev => [
        ...prev,
        id
      ])
    }
    else {
      setInterestedCategories(interestedCategories.filter(cat => cat !== id));
    }
  }

  useEffect(() => {
  }, [interestedCategories])

  const InterestChip = ({ category }) => {
    return (
      <button
        onClick={() => handleInterestedCategoriesChange(category.id)}
        className={`text-center flex-grow text-secondary ${interestedCategories.includes(category.id) ? 'bg-card-blue ' : 'bg-secondary'} border-contrast p-2 rounded-full hover:cursor-pointer`}>{category.name}</button>
    )
  }

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    //   <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
    //     <button
    //       className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
    //       onClick={onClose}
    //     >
    //       &times;
    //     </button>

    //     <h2 className="text-2xl font-semibold mb-6 text-center">Tell us about your interests</h2>
    //     <p className="text-gray-600 mb-6 text-center">
    //       Help us personalize your experience by sharing your profession and interests
    //     </p>

    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-6">
    //         <label className="block text-gray-700 text-sm font-bold mb-2">
    //           What is your profession?
    //         </label>
    //         <select
    //           name="profession"
    //           value={formData.profession}
    //           onChange={handleInputChange}
    //           className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           required
    //         >
    //           <option value="">Select your profession</option>
    //           {professions.map(profession => (
    //             <option key={profession} value={profession}>{profession}</option>
    //           ))}
    //         </select>
    //       </div>

    //       {formData.profession === 'Other' && (
    //         <div className="mb-6">
    //           <label className="block text-gray-700 text-sm font-bold mb-2">
    //             Please specify your profession
    //           </label>
    //           <input
    //             type="text"
    //             name="otherProfession"
    //             value={formData.otherProfession}
    //             onChange={handleInputChange}
    //             className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //             placeholder="Enter your profession"
    //             required
    //           />
    //         </div>
    //       )}

    //       <div className="mb-6">
    //         <label className="block text-gray-700 text-sm font-bold mb-2">
    //           What is your experience level?
    //         </label>
    //         <select
    //           name="experience"
    //           value={formData.experience}
    //           onChange={handleInputChange}
    //           className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           required
    //         >
    //           <option value="">Select your experience level</option>
    //           {experienceLevels.map(level => (
    //             <option key={level} value={level}>{level}</option>
    //           ))}
    //         </select>
    //       </div>

    //       <div className="mb-6">
    //         <label className="block text-gray-700 text-sm font-bold mb-2">
    //           Which areas are you interested in? (Select all that apply)
    //         </label>
    //         <div className="mt-2 space-y-2">
    //           {categories.map(category => (
    //             <div key={category.id} className="flex items-center">
    //               <input
    //                 type="checkbox"
    //                 id={category.id}
    //                 name="interests"
    //                 value={category.id}
    //                 onChange={handleCheckboxChange}
    //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    //               />
    //               <label htmlFor={category.id} className="ml-2 block text-gray-700">
    //                 {category.name}
    //               </label>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       <button
    //         type="submit"
    //         className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       >
    //         Save Preferences
    //       </button>
    //     </form>
    //   </div>
    // </div>

    <>
      <form 
      onSubmit={handleSubmit}
      className='space-y-9 relative px-6 md:px-12 lg:px-24 xl:px-36 bg-theme-gradient pt-16 h-lvh grid grid-cols-2'>
        {/* <div className=''> */}
        <div className='space-y-10'>
          <div>
            <h1 className='text-4xl font-bold text-primary'>Tell us about your interests</h1>
            <h2 className='text-secondary text-lg mt-2'>Help us personalize your experience by sharing your profession and interests</h2>
          </div>
          <div className='flex flex-col space-y-3'>
            <label
              htmlFor='profession'
              className='text-secondary text-lg font-medium'>What is your profession? <span className='text-red-500'>*</span></label>
            <select
              required
              value={formData.profession}
              id='profession'
              name='profession'
              onChange={(e) => handleInputChange(e)}
              className='text-secondary border-contrast w-[70%] rounded-md p-2 bg-secondary'>
                <option className='text-secondary'>Select option</option>
              {professions.map((profession, idx) => (
                <option className='text-secondary' key={idx}>{profession}</option>
              ))}
            </select>

          </div>
          {
            formData.profession === 'Other'
              ?
              <div className='flex flex-col space-y-3'>
                <label
                  htmlFor='professionOther'
                  className='text-secondary text-lg font-medium'>Enter your profession? <span className='text-red-500'>*</span></label>
                <input
                  required
                  id='professionOther'
                  name='otherProfession'
                  onChange={(e) => handleInputChange(e)}
                  className='text-secondary border-contrast w-[70%] rounded-md p-2 bg-secondary'>

                </input>

              </div>
              :
              null
          }

          <div className='flex flex-col space-y-3'>
            <label
              htmlFor='experience'
              className='text-secondary text-lg font-medium'>What is your experience level? <span className='text-red-500'>*</span></label>
            <select
              required
              id='experience'
              name='experience'
              value={formData.experience}
              onChange={(e) => handleInputChange(e)}
              className='text-secondary border-contrast w-[70%] rounded-md p-2 bg-secondary'>
              <option className='text-secondary'>Select option</option>
              {experienceLevels.map((experience, idx) => (
                <option className='text-secondary' key={idx}>{experience}</option>
              ))}
            </select>

          </div>

          <div className='flex flex-col space-y-3'>
            <label
              htmlFor='interests'
              className='text-secondary text-lg font-medium'>What areas are you interested in?</label>
            <div className='flex flex-wrap gap-5 w-[70%]'>
              {categories.map((category) => (
                <InterestChip key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
        <div>
              <img src={interestForm} className='h-full'/>
        </div>
        <button
        type='submit'
          // onClick={handleSubmit}
          className='py-2 px-10 font-semibold absolute right-10 bottom-10 hover:cursor-pointer bg-blue-600 text-gray-200 w-fit h-fit rounded-md'>Next</button>
        {/* </div> */}
      </form>
    </>
  );
};

export default LoginInterestForm;