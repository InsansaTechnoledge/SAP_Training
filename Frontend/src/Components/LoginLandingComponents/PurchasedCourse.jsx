import React from 'react'
import login from '../../assets/loginLanding.png';

const PurchasedCourse = () => {
  return (
    <button className='flex flex-col rounded-lg bg-gray-100 p-3 shadow-lg h-fit hover:scale-105 duration-500'>
      <img src={login} className='w-full' />
      <div>
        <div className='col-span-2 flex flex-col justify-between'>
          <div className='font-semibold text-left text-md'>Course Title</div>
          <div className='font-semibold text-left text-sm text-gray-500'>Course category</div>

          <div className='text-left mt-5 text-xs mb-2'>43% completed</div>
          <div className='bg-gray-300 w-full h-1 rounded-md'>
              <div className='bg-blue-400 w-[43%] h-1 rounded-md'></div>
            </div>
          
          <div className='flex justify-between mt-5'>
            <div className='text-xs text-gray-500'>valid till 17-04-2025</div>
            <div className='my-auto text-xs bg-amber-200 w-fit px-3 py-1 rounded-full'>Pending</div>

          </div>
        </div>
        {/* <button className='bg-blue-600 text-white w-fit h-fit my-auto p-2 rounded-lg'>View course</button> */}
      </div>
    </button>
  )
}

export default PurchasedCourse