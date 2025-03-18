import React from 'react'

import login from '../../assets/loginLanding.png'
import { ChevronRight } from 'lucide-react'

const ContinueWatching = () => {
  return (
    <div className='flex shadow-lg rounded-md bg-gray-100 hover:scale-105 transition-all duration-500 py-2'>
        <img 
        className='w-44'
        src={login} />
        <div className='flex flex-col justify-between p-3 w-full'>
            <div className='flex justify-between'>
                <div className='font-semibold'>Course Title</div>
                <ChevronRight/>
            </div>
            <div className='font-semibold text-left text-sm text-gray-500'>Course category</div>

            <div className='mt-5'>
            <span className='mb-2 text-xs'>43% completed</span>
            <div className='bg-gray-300 w-full h-1 rounded-md'>
              <div className='bg-blue-400 w-[43%] h-1 rounded-md'></div>
            </div>
            </div>

            <div className='text-xs text-gray-500 mt-5 text-end'>valid till 17-04-2025</div>
        </div>
    </div>
  )
}

export default ContinueWatching