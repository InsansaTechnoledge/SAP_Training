import React, { useState } from 'react';
import {
    BookOpen, Star, Timer, Trophy, ChevronRight,
    CheckCircle, Clock, NotebookPen, Medal, Users,
    BarChart, GraduationCap, ChevronDown, Brain,
    Target, Zap, CheckCircle2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('progress');
    const [expandedModule, setExpandedModule] = useState(null);

    const userProgress = {
        name: "Alex Johnson",
        email: "alex.j@example.com",
        overallProgress: 68,
        totalScore: 825,
        requiredScore: 1000,
        percentile: 85,
        activeStudents: 1240,
        progressHistory: [
            { week: 'Week 1', score: 200 },
            { week: 'Week 2', score: 350 },
            { week: 'Week 3', score: 580 },
            { week: 'Week 4', score: 825 }
        ],
        modules: [
            {
                id: 1,
                title: "ABAP Fundamentals",
                progress: 100,
                completedVideos: 3,
                totalVideos: 3,
                icon: Brain,
                color: "text-purple-500",
                bgColor: "bg-purple-100",
                notes: [
                    { timestamp: "2:15", content: "Important: Data types in ABAP", videoTitle: "Introduction to ABAP" },
                    { timestamp: "5:30", content: "Remember syntax for declarations", videoTitle: "Data Types & Variables" }
                ],
                testScores: [
                    { title: "Basics Quiz", score: 90 },
                    { title: "Variables Test", score: 85 },
                    { title: "Final Test", score: 95 }
                ]
            },
            {
                id: 2,
                title: "Advanced ABAP",
                progress: 75,
                completedVideos: 3,
                totalVideos: 4,
                icon: Target,
                color: "text-blue-500",
                bgColor: "bg-blue-100",
                notes: [
                    { timestamp: "3:45", content: "OOP concepts implementation", videoTitle: "Object-Oriented Programming" },
                    { timestamp: "7:20", content: "Design pattern best practices", videoTitle: "Design Patterns" }
                ],
                testScores: [
                    { title: "OOP Quiz", score: 88 },
                    { title: "Design Patterns Test", score: 82 }
                ]
            },
            {
                id: 3,
                title: "Database Programming",
                progress: 30,
                completedVideos: 1,
                totalVideos: 3,
                icon: Zap,
                color: "text-yellow-500",
                bgColor: "bg-yellow-100",
                notes: [
                    { timestamp: "1:30", content: "Database table structure", videoTitle: "ABAP Dictionary" }
                ],
                testScores: [
                    { title: "Dictionary Basics", score: 85 }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* User Header with Glassmorphism */}
                <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-3xl font-bold text-white">
                                    {userProgress.name.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    {userProgress.name}
                                </h1>
                                <p className="text-gray-500 flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" />
                                    {userProgress.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center mb-1">
                                    <span className="text-xl font-bold text-blue-600">{userProgress.overallProgress}%</span>
                                </div>
                                <p className="text-sm text-gray-500">Progress</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center mb-1">
                                    <span className="text-xl font-bold text-green-600">
                                        {100 - userProgress.percentile}%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Rank</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Graph */}
                <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
                    <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userProgress.progressHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#4F46E5"
                                    strokeWidth={2}
                                    dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { icon: Trophy, title: 'Total Score', value: userProgress.totalScore, subtext: `Required: ${userProgress.requiredScore}`, color: 'from-yellow-400 to-orange-500' },
                        { icon: Medal, title: 'Percentile', value: `${userProgress.percentile}th`, subtext: `Among ${userProgress.activeStudents} students`, color: 'from-blue-400 to-blue-600' },
                        { icon: BookOpen, title: 'Videos Completed', value: userProgress.modules.reduce((acc, module) => acc + module.completedVideos, 0), subtext: `of ${userProgress.modules.reduce((acc, module) => acc + module.totalVideos, 0)} total`, color: 'from-green-400 to-green-600' },
                        { icon: NotebookPen, title: 'Notes Taken', value: userProgress.modules.reduce((acc, module) => acc + module.notes.length, 0), subtext: 'Across all modules', color: 'from-purple-400 to-purple-600' }
                    ].map((stat, index) => (
                        <div key={index} className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl p-6 border border-white/20 transform hover:scale-105 transition-transform duration-200">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
                            <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            <p className="text-sm text-gray-500 mt-1">{stat.subtext}</p>
                        </div>
                    ))}
                </div>

                {/* Modules Section */}
                <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl overflow-hidden border border-white/20">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        {['progress', 'notes', 'performance'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 font-medium transition-colors duration-200 ${activeTab === tab
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {activeTab === 'progress' && (
                            <div className="space-y-6">
                                {userProgress.modules.map((module) => {
                                    const ModuleIcon = module.icon;
                                    return (
                                        <div key={module.id}
                                            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
                                        >
                                            <div
                                                className="flex items-center justify-between cursor-pointer"
                                                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 ${module.bgColor} rounded-xl flex items-center justify-center`}>
                                                        <ModuleIcon className={`h-6 w-6 ${module.color}`} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <span className="text-sm text-gray-500">
                                                                {module.completedVideos}/{module.totalVideos} videos
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                {module.progress}% complete
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${expandedModule === module.id ? 'rotate-180' : ''
                                                    }`} />
                                            </div>

                                            {expandedModule === module.id && (
                                                <div className="mt-6 pl-16">
                                                    <div className="space-y-4">
                                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                                style={{ width: `${module.progress}%` }}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            {module.notes.map((note, idx) => (
                                                                <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                                    <span className="text-sm text-gray-700">{note.videoTitle}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div className="space-y-8">
                                {userProgress.modules.map((module) => (
                                    <div key={module.id}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-8 h-8 ${module.bgColor} rounded-lg flex items-center justify-center`}>
                                                <module.icon className={`h-4 w-4 ${module.color}`} />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {module.notes.map((note, idx) => (
                                                <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-sm font-medium text-gray-700">{note.videoTitle}</span>
                                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {note.timestamp}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">{note.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'performance' && (
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-semibold text-blue-900">Overall Performance</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                                <span className="text-sm text-blue-900">Current: {userProgress.totalScore}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                                                <span className="text-sm text-blue-900">Required: {userProgress.requiredScore}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative pt-2">
                                        <div className="w-full bg-blue-200 rounded-full h-4">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-500 relative"
                                                style={{ width: `${(userProgress.totalScore / userProgress.requiredScore) * 100}%` }}
                                            >
                                                <span className="absolute -right-4 -top-6 bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                                                    {Math.round((userProgress.totalScore / userProgress.requiredScore) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {userProgress.modules.map((module) => (
                                    <div key={module.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`w-10 h-10 ${module.bgColor} rounded-lg flex items-center justify-center`}>
                                                <module.icon className={`h-5 w-5 ${module.color}`} />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                                        </div>

                                        <div className="space-y-6">
                                            {module.testScores.map((test, idx) => (
                                                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium text-gray-700">{test.title}</span>
                                                        <span className="text-sm font-bold text-gray-900">{test.score}%</span>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full transition-all duration-500 ${test.score >= 90 ? 'bg-green-500' :
                                                                        test.score >= 80 ? 'bg-blue-500' :
                                                                            test.score >= 70 ? 'bg-yellow-500' :
                                                                                'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${test.score}%` }}
                                                            />
                                                        </div>
                                                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                                                            <span>0%</span>
                                                            <span>50%</span>
                                                            <span>100%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;