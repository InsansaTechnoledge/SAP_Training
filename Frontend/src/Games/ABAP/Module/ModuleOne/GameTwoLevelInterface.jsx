import React, { useState } from 'react';
import { Trophy, Lock, Play } from 'lucide-react';

// Custom Button component to replace shadcn/ui button
const Button = ({ children, onClick, className }) => (
    <button
        onClick={onClick}
        className={`
      px-4 py-2 
      rounded-lg 
      font-medium 
      transition-colors 
      duration-200 
      focus:outline-none 
      focus:ring-2 
      focus:ring-blue-500 
      focus:ring-opacity-50
      ${className}`}
    >
        {children}
    </button>
);

const GameTwoLevelInterface = ({ proceedToNextChallenge, setLevelDisplay, setCurrentLevel, currentLevel, startGame }) => {
    const completedLevel = currentLevel

    const levels = [
        { id: 1, x: 'left', name: 'Level 1' },
        { id: 2, x: 'center', name: 'Level 2' },
        { id: 3, x: 'right', name: 'Level 3' }
    ];

    const handleStartLevel = () => {
        console.log(currentLevel);
        if (currentLevel <= 3) {
            // Simulate level completion
            startGame();
            setLevelDisplay(false);

            
        }
    };

    const getLevelStatus = (levelId) => {

        if (completedLevel > levelId) return 'completed';
        if (levelId === currentLevel) return 'current';
        return 'locked';
    };

    const getPositionClass = (position) => {
        switch (position) {
            case 'left': return 'ml-8';
            case 'center': return 'ml-64 -mt-16';
            case 'right': return 'ml-[28rem] mt-4';
            default: return '';
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-8">
            {/* Background map */}
            <div className="relative bg-transparent border border-white shadow-md shadow-gray-400 rounded-lg h-96 p-4">
                {/* Path connecting levels */}
                <svg className="absolute top-0 left-0 w-full h-full">
                    <path
                        d="M 100 150 Q 250 50 400 150 Q 550 250 700 150"
                        stroke="#CBD5E1"
                        strokeWidth="4"
                        fill="none"
                    />
                </svg>

                {/* Level markers */}
                {
                <div className="relative h-full">
                    {levels.map((level) => (
                        <div
                            key={level.id}
                            className={`absolute top-32 ${getPositionClass(level.x)} transition-all duration-300`}
                        >
                            <div className={`
                relative w-16 h-16 rounded-full 
                flex items-center justify-center
                ${getLevelStatus(level.id) === 'completed' ? 'bg-green-500' :
                                    getLevelStatus(level.id) === 'current' ? 'bg-blue-500' : 'bg-gray-400'}
                transition-colors duration-300
                cursor-pointer
                hover:opacity-90
              `}>
                                {getLevelStatus(level.id) === 'completed' ? (
                                    <Trophy className="w-8 h-8 text-white" />
                                ) : getLevelStatus(level.id) === 'current' ? (
                                    <Play className="w-8 h-8 text-white" />
                                ) : (
                                    <Lock className="w-8 h-8 text-white" />
                                )}
                                <span className="text-white w-14 absolute -bottom-12 left-1/2 transform -translate-x-1/2 font-medium">
                                    {level.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                }
                {/* Start level button */}
                {currentLevel <= 3 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <Button
                            onClick={handleStartLevel}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-lg shadow-lg hover:shadow-xl"
                        >
                            Start Level {currentLevel}
                        </Button>
                    </div>
                )}

                {/* Game completed message */}
                {currentLevel > 3 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-green-500 font-bold text-xl">
                        Congratulations! All levels completed!
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameTwoLevelInterface;