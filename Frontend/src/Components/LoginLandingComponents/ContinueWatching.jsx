import React, { useState } from 'react';
import login from '../../assets/loginLanding.png';
import { ChevronRight, Play, Pause } from 'lucide-react';
 
const ContinueWatching = () => {
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
    <div
      className="p-2 flex flex-col md:flex-row shadow-lg rounded-md bg-card hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          className="w-full md:w-44 h-48 md:h-full object-cover"
          src={login}
          alt="Course thumbnail"
        />
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
 
      <div className="flex flex-col justify-between p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg text-secondary transition-colors">Course Title</div>
          <ChevronRight className={`text-gray-400 transition-transform duration-300 ${isHovered ? 'transform translate-x-1' : ''}`}/>
        </div>
        <div className="font-semibold text-left text-sm text-gray-400">Course category</div>
 
        <div className="mt-5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-secondary">{progress}% completed</span>
            <span className="text-xs text-blue-400">{Math.floor(progress * 0.45)} / 45 minutes</span>
          </div>
          <div
            className="bg-gray-300 w-full h-2 rounded-md overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="bg-blue-400 h-2 rounded-md transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
 
        <div className="flex justify-between items-center mt-5">
          <button
            className={`text-xs px-3 py-1 rounded-full border border-blue-400 transition-all duration-300 ${isHovered ? 'bg-blue-400 text-white' : 'text-blue-400'}`}
            onClick={(e) => {
              e.stopPropagation();
              alert('Resuming course...');
            }}
          >
            Resume
          </button>
          <div className="text-xs text-gray">valid till 17-04-2025</div>
        </div>
      </div>
    </div>
  );
};
 
export default ContinueWatching;