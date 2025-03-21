import { ChevronRight, GemIcon } from 'lucide-react'
import React from 'react'

const ExploreCategories = () => {
  return (
    <div className='rounded-lg shadow-xl bg-card  p-5 space-y-4 hover:scale-105 transition-all duration-500'>
        <GemIcon 
        className='bg-blue rounded-full text-contrast w-12 h-12 p-3'/>
        <div className='font-bold text-2xl text-secondary'>Category Name</div>
        <div className='text-gray'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, doloribus. lorem30</div>
        <div className='flex justify-between mt-12'>
          <div className='my-auto text-lg text-secondary'>12 Courses</div>
          <ChevronRight className='w-10 h-10 text-secondary'/>
        </div>
    </div>
  )
}

export default ExploreCategories