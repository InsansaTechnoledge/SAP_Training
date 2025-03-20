import React from 'react'
import AIimage from '../../assets/AI.jpg'

const OngoingEvent = () => {
  return (
    <div className='flex flex-col rounded-xl border bg-card-blue border-blue-400'>
        <img src={AIimage} className='w-full rounded-t-xl'/>
        <div className='p-5 relative'>
            <h1 className='text-secondary font-bold text-lg'>Event Name</h1>
            <div className='text-xs text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
            <h2 className='mt-3 text-secondary text-sm font-semibold'>19th Mar, 2025 | 11:00 - 16:00</h2>
            <div className='flex justify-end mt-5'>
                <button className='bg-blue py-1 px-3 rounded-lg text-white font-semibold'>Join Now</button>
            </div>
        </div>
    </div>
  )
}

export default OngoingEvent