import { Badge, ChevronFirst, ChevronRight, Download, GemIcon, LucideMedal, MedalIcon } from 'lucide-react'
import React from 'react'

const CertificatesEarned = () => {
  return (
    <div className='rounded-lg shadow-xl bg-gray-100 p-5 space-y-4 hover:scale-105 transition-all duration-500'>
        <MedalIcon 
        className='bg-blue-200 rounded-full text-blue-600 w-12 h-12 p-3'/>
        <div className='font-bold text-2xl'>Certification Name</div>
        <div className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, doloribus. lorem30</div>
        <div className='flex justify-between mt-12'>
          <div className='my-auto text-xs text-gray-500'>received on 13-04-2025</div>
          <div className='bg-green-200 px-5 py-2 rounded-full text-green-900'>View certificate</div>
        </div>
    </div>
  )
}

export default CertificatesEarned