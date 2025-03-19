import { Clock, Group, GroupIcon, LogInIcon, Users } from 'lucide-react'
import React, { Profiler } from 'react'

const UpcomingEvent = () => {
  return (
    <div className='flex flex-col border-contrast rounded-lg p-5 bg-card'>
        <div className='space-x-1 mb-3 text-secondary'>
            <span className='text-3xl'>29</span>
            <span className='text-lg'>Mar</span>
        </div>
        <h1 className='text-secondary font-bold text-lg mb-2'>Event Name</h1>
        <div className='flex flex-row text-sm space-x-2 text-gray'>
            <Clock className='w-4'/>
            <span className='my-auto'>
                10:00 - 12:00
            </span>
        </div>
        <div className='flex flex-row text-sm space-x-2 text-gray'>
            <Users className='w-4'/>
            <span className='my-auto'>
                25K+ Regsitrations
            </span>
        </div>
        <div className='flex mt-5'>
                <button className='w-full bg-blue py-1 px-3 rounded-lg text-white font-semibold'>Register</button>
            </div>
    </div>
  )
}

export default UpcomingEvent