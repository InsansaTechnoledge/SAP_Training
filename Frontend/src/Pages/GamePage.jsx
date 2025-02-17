import React, { useState } from 'react';
import { Play, Pause, Settings, ChevronRight, Award, Clock, Star } from 'lucide-react';
import ABAPRunner from '../Games/ABAP/Module/ModuleOne/GameOne';

const GameDashboard = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [score,setScore] = useState(0);

    const questionTree = [
        { id: 1, level: 'Basic', title: 'ABAP Syntax Basics', status: 'completed', score: 95 },
        { id: 2, level: 'Basic', title: 'Data Types Overview', status: 'current', score: 0 },
        { id: 3, level: 'Intermediate', title: 'Control Structures', status: 'locked', score: 0 },
        { id: 4, level: 'Intermediate', title: 'Modularization', status: 'locked', score: 0 },
        { id: 5, level: 'Advanced', title: 'Object Oriented ABAP', status: 'locked', score: 0 }
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6 mt-20">
            <div className="max-w-7xl mx-auto flex gap-6">
                {/* Left side - Game View */}
                <div className="w-2/3 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                                {isPaused ?
                                    <Play className="w-6 h-6 text-blue-600" /> :
                                    <Pause className="w-6 h-6 text-blue-600" />
                                }
                            </button>
                            <div>
                                <h2 className="text-xl font-bold">ABAP Learning Game</h2>
                                <p className="text-gray-500">Level 2: Data Types</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <span className="font-medium">15:45</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <span className="font-medium">{score}</span>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Settings className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                    </div>


                    <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl">
                        <div class="rounded-xl">

                            <div className="relative w-full">
                                <ABAPRunner setScore={setScore} score={score}/>
                            </div>
                        </div>
                    </div>
                    <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px]"></div>
                    <div class="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"></div>


                



                    {/* Game Content Area */}
                </div>

                {/* Right side - Question Controls */}
                <div className="w-1/3 space-y-6">
                    {/* Progress Overview */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="font-bold mb-4">Learning Progress</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full w-2/5 bg-blue-600 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">40%</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Module 2/5</span>
                            <span>25 mins left</span>
                        </div>
                    </div>

                    {/* Question Tree */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="font-bold mb-4">Question Progression</h3>
                        <div className="space-y-3">
                            {questionTree.map((question) => (
                                <div
                                    key={question.id}
                                    className={`p-4 rounded-lg border ${question.status === 'current' ? 'border-blue-500 bg-blue-50' :
                                        question.status === 'completed' ? 'border-green-500 bg-green-50' :
                                            'border-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">{question.level}</p>
                                            <p className="font-medium">{question.title}</p>
                                        </div>
                                        {question.status === 'completed' ? (
                                            <div className="flex items-center gap-1 text-green-600">
                                                <Award className="w-4 h-4" />
                                                <span className="text-sm font-medium">{question.score}%</span>
                                            </div>
                                        ) : question.status === 'current' ? (
                                            <ChevronRight className="w-5 h-5 text-blue-600" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDashboard;