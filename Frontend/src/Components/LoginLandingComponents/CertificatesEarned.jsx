import { Badge, ChevronFirst, ChevronRight, Download, GemIcon, LucideMedal, MedalIcon } from 'lucide-react'
import React from 'react'

const CertificatesEarned = () => {
  return (
    <div className='bg-card rounded-lg shadow-xl  p-5 space-y-4 hover:scale-105 transition-all duration-500'>
        <MedalIcon 
        className='bg-blue rounded-full text-contrast w-12 h-12 p-3'/>
        <div className='font-bold text-2xl text-secondary'>Certification Name</div>
        <div className='text-gray'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, doloribus. lorem30</div>
        <div className='flex justify-between mt-12'>
          <div className='my-auto text-xs text-gray'>received on 13-04-2025</div>
          <button className='card-green px-5 py-2 rounded-full'>View certificate</button>
        </div>
    </div>
  )
}

export default CertificatesEarned