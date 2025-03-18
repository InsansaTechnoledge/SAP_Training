import React, { useState } from 'react'
import login from '../../assets/loginLanding.png';
import { Pause, Play } from 'lucide-react';

const PurchasedCourse = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(43);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = Math.round((clickPosition / rect.width) * 100);
    setProgress(Math.min(100, Math.max(0, newProgress)));
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='flex flex-col rounded-lg bg-card p-3 shadow-lg h-fit'>

      <div className="relative">

        <img src={login} className='w-full' />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-card bg-opacity-30 transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-0'}`}
          onClick={handlePlayClick}
        >
          <div className="bg-theme p-3 rounded-full">
            {isPlaying ?
              <Pause className="text-contrast h-6 w-6" /> :
              <Play className="text-contrast h-6 w-6" fill="currentColor" />
            }
          </div>
        </div>
      </div>

      <div>
        <div className='col-span-2 flex flex-col justify-between '>
          <div className='font-semibold text-left text-md text-secondary'>Course Title</div>
          <div className='font-semibold text-left text-sm text-gray'>Course category</div>

          <div className='text-left mt-5 text-xs mb-2 text-secondary'>43% completed</div>
          <div className='bg-gray-300 w-full h-1 rounded-md'>
            <div className='bg-blue-400 w-[43%] h-1 rounded-md'></div>
          </div>

          <div className='flex justify-between mt-5'>
            <div className='text-xs text-gray'>valid till 17-04-2025</div>
            {/* <div className='my-auto text-xs bg-amber-200 w-fit px-3 py-1 rounded-full'>Pending</div> */}
            <button
              className={`text-xs px-3 py-1 rounded-full border border-blue-400 transition-all duration-300 ${isHovered ? 'bg-blue-400 text-white' : 'text-blue-400'}`}
              onClick={(e) => {
                e.stopPropagation();
                alert('Resuming course...');
              }}
            >
              View course
            </button>
          </div>
        </div>
        {/* <button className='bg-blue-600 text-white w-fit h-fit my-auto p-2 rounded-lg'>View course</button> */}
      </div>
    </button>
  )
}

export default PurchasedCourse