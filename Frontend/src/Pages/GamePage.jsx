import React, { useState, useEffect } from 'react';
import { Play, Pause, Settings, ChevronRight, Award, Clock, Star, X, Monitor, Trophy, BarChart, Book, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ABAPExplorer from '../Games/ABAP/Module/ModuleOne/GameTwo';
import ABAPRunner from '../Games/ABAP/Module/ModuleOne/GameOne';

const GameDashboard = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [currentGame, setCurrentGame] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [activeTab, setActiveTab] = useState('progress');
    const [showTooltip, setShowTooltip] = useState(false);
    const [achievements, setAchievements] = useState([
        { id: 1, title: 'First Steps', description: 'Complete your first ABAP challenge', achieved: true },
        { id: 2, title: 'Speed Demon', description: 'Complete 5 challenges under 10 minutes', achieved: false },
        { id: 3, title: 'Perfect Score', description: 'Get 100% on any module', achieved: false },
    ]);

    useEffect(() => {
        const savedGame = localStorage.getItem('selectedGame');
        if (savedGame) {
            setCurrentGame(savedGame);
        }
    }, []);

    const questionTree = [
        { id: 1, level: 'Basic', title: 'ABAP Syntax Basics', status: 'completed', score: 95 },
        { id: 2, level: 'Basic', title: 'Data Types Overview', status: 'current', score: 0 },
        { id: 3, level: 'Intermediate', title: 'Control Structures', status: 'locked', score: 0 },
        { id: 4, level: 'Intermediate', title: 'Modularization', status: 'locked', score: 0 },
        { id: 5, level: 'Advanced', title: 'Object Oriented ABAP', status: 'locked', score: 0 }
    ];

    const stats = {
        totalTime: '12h 45m',
        completedChallenges: 28,
        averageScore: 85,
        streak: 5
    };

    const GameCard = ({ title, type, description, isActive, onClick, features }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-white rounded-xl transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                }`}
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <Monitor className="w-6 h-6 text-blue-500" />
                </div>

                <div className="mb-4 space-y-3">
                    {features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClick}
                    className={`w-full py-2 px-4 rounded-lg transition-colors ${isActive
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                >
                    {isActive ? 'Currently Selected' : 'Select Game'}
                </motion.button>
            </div>
        </motion.div>
    );

    const StatCard = ({ icon: Icon, title, value }) => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-lg font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    const ProgressTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <StatCard icon={Clock} title="Total Time" value={stats.totalTime} />
                <StatCard icon={Trophy} title="Completed" value={stats.completedChallenges} />
                <StatCard icon={Star} title="Avg. Score" value={`${stats.averageScore}%`} />
                <StatCard icon={Zap} title="Current Streak" value={stats.streak} />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Learning Path Progress</h3>
                <div className="space-y-4">
                    {questionTree.map((question) => (
                        <motion.div
                            key={question.id}
                            whileHover={{ scale: 1.01 }}
                            className={`p-4 rounded-xl transition-all ${question.status === 'current'
                                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
                                    : question.status === 'completed'
                                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                                        : 'bg-gray-50 border border-gray-200'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">{question.level}</p>
                                    <p className="font-medium">{question.title}</p>
                                </div>
                                {question.status === 'completed' ? (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                                        <Award className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium text-green-600">{question.score}%</span>
                                    </div>
                                ) : question.status === 'current' ? (
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <ChevronRight className="w-4 h-4 text-blue-600" />
                                    </div>
                                ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );

    const AchievementsTab = () => (
        <div className="grid gap-4">
            {achievements.map((achievement) => (
                <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border ${achievement.achieved
                            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${achievement.achieved ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                            <Trophy className={`w-6 h-6 ${achievement.achieved ? 'text-yellow-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl pb-2 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        ABAP Learning Game
                    </h1>
                    <p className="text-gray-600 mt-2">Master ABAP programming through interactive challenges</p>
                </div>

                <div className="flex gap-6">
                    {/* Main Game Area */}
                    <div className="w-2/3 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                        {/* Game Controls */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsPaused(!isPaused)}
                                        className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                                    >
                                        {isPaused ? (
                                            <Play className="w-6 h-6 text-white" />
                                        ) : (
                                            <Pause className="w-6 h-6 text-white" />
                                        )}
                                    </motion.button>
                                    <div>
                                        <h2 className="text-xl font-semibold">{currentGame || "Play And Learn"}</h2>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            <span>25 minutes remaining</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg cursor-pointer"
                                        onHoverStart={() => setShowTooltip(true)}
                                        onHoverEnd={() => setShowTooltip(false)}
                                    >
                                        <Star className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-blue-600">{score}</span>
                                    </motion.div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowSettings(true)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <Settings className="w-6 h-6 text-gray-600" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Game Content */}
                        <div className="p-6">
                            {!currentGame ? (
                                <div className="text-center p-12">
                                    <h3 className="text-2xl font-bold mb-4">Choose Your Learning Path</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <GameCard
                                            title="ABAP Explorer"
                                            type="ABAPExplorer"
                                            description="Interactive exploration of ABAP concepts"
                                            features={[
                                                "Visual concept mapping",
                                                "Interactive examples",
                                                "Real-time feedback"
                                            ]}
                                            isActive={false}
                                            onClick={() => setCurrentGame('ABAPExplorer')}
                                        />
                                        <GameCard
                                            title="ABAP Runner"
                                            type="ABAPRunner"
                                            description="Hands-on coding challenges"
                                            features={[
                                                "Live code execution",
                                                "Progressive difficulty",
                                                "Performance tracking"
                                            ]}
                                            isActive={false}
                                            onClick={() => setCurrentGame('ABAPRunner')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                    <div className="p-6">
                                        {!currentGame ? (
                                            <div className="text-center p-12">
                                                <h3 className="text-2xl font-bold mb-4">Choose Your Learning Path</h3>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <GameCard
                                                        title="ABAP Explorer"
                                                        type="ABAPExplorer"
                                                        description="Interactive exploration of ABAP concepts"
                                                        features={["Visual concept mapping", "Interactive examples", "Real-time feedback"]}
                                                        isActive={currentGame === 'ABAPExplorer'}
                                                        onClick={() => setCurrentGame('ABAPExplorer')}
                                                    />
                                                    <GameCard
                                                        title="ABAP Runner"
                                                        type="ABAPRunner"
                                                        description="Hands-on coding challenges"
                                                        features={["Live code execution", "Progressive difficulty", "Performance tracking"]}
                                                        isActive={currentGame === 'ABAPRunner'}
                                                        onClick={() => setCurrentGame('ABAPRunner')}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-100 rounded-xl p-4">
                                                {currentGame === 'ABAPRunner' && <ABAPRunner score={score} setScore={setScore}/>}
                                                {currentGame === 'ABAPExplorer' && <ABAPExplorer score={score} setScore={setScore} />}
                                            </div>
                                        )}
                                    </div>

                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-1/3 space-y-6">
                        {/* Progress Overview */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold">Your Progress</h3>
                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveTab('progress')}
                                        className={`px-4 py-2 rounded-lg ${activeTab === 'progress'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <BarChart className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveTab('achievements')}
                                        className={`px-4 py-2 rounded-lg ${activeTab === 'achievements'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Trophy className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === 'progress' ? <ProgressTab /> : <AchievementsTab />}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Quick Tips */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Book className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-900">Quick Tips</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-blue-800">
                                    <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500" />
                                    Use keyboard shortcuts (Ctrl + Space) for code completion
                                </li>
                                <li className="flex items-start gap-2 text-sm text-blue-800">
                                    <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500" />
                                    Review completed challenges to reinforce learning
                                </li>
                                <li className="flex items-start gap-2 text-sm text-blue-800">
                                    <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500" />
                                    Practice daily to maintain your learning streak
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-500 rounded-2xl w-[800px] max-h-[80vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold">Game Settings</h3>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowSettings(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid gap-6">
                                    {/* Game Preferences */}
                                    <div>
                                        <h4 className="text-lg font-semibold mb-4">Game Preferences</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Difficulty Level
                                                </label>
                                                <select className="w-full p-2 border border-gray-300 rounded-lg">
                                                    <option>Beginner</option>
                                                    <option>Intermediate</option>
                                                    <option>Advanced</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Learning Pace
                                                </label>
                                                <select className="w-full p-2 border border-gray-300 rounded-lg">
                                                    <option>Relaxed</option>
                                                    <option>Balanced</option>
                                                    <option>Intensive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Game Mode Selection */}
                                    <div>
                                        <h4 className="text-lg font-semibold mb-4">Game Mode</h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <GameCard
                                                title="ABAP Explorer"
                                                type="ABAPExplorer"
                                                description="Interactive exploration of ABAP concepts"
                                                features={[
                                                    "Visual concept mapping",
                                                    "Interactive examples",
                                                    "Real-time feedback"
                                                ]}
                                                isActive={currentGame === 'ABAPExplorer'}
                                                onClick={() => {
                                                    if(currentGame!=='ABAPExplorer'){
                                                        setScore(0)
                                                    }
                                                    setCurrentGame('ABAPExplorer');
                                                    setShowSettings(false);
                                                    setScore(0);
                                                }}
                                            />
                                            <GameCard
                                                title="ABAP Runner"
                                                type="ABAPRunner"
                                                description="Hands-on coding challenges"
                                                features={[
                                                    "Live code execution",
                                                    "Progressive difficulty",
                                                    "Performance tracking"
                                                ]}
                                                isActive={currentGame === 'ABAPRunner'}
                                                onClick={() => {
                                                    if(currentGame!=='ABAPRunner'){
                                                        setScore(0)
                                                    }
                                                    setCurrentGame('ABAPRunner');
                                                    setShowSettings(false);
                                                    
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GameDashboard;