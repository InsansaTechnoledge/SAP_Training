import React, { useState, useEffect } from 'react';
import { Play, Pause, Settings, ChevronRight, Award, Clock, Star, X, Monitor, Trophy, BarChart, Book, Zap, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ABAPExplorer from '../Games/ABAP/Module/ModuleOne/GameTwo';
import ABAPRunner from '../Games/ABAP/Module/ModuleOne/GameOne';
import RealisticShooterGame from '../Games/ABAP/Module/ModuleOne/GameThree';

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
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showQuitConfirmation, setShowQuitConfirmation] = useState(false);

    useEffect(() => {
        const savedGame = localStorage.getItem('selectedGame');
        if (savedGame) {
            setCurrentGame(savedGame);
        }
    }, []);

    // Handle escape key for game exit
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isFullScreen) {
                e.preventDefault();
                setShowQuitConfirmation(true);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isFullScreen]);


    // Handle game quit
    const handleQuitGame = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setIsFullScreen(false);
        setShowQuitConfirmation(false);
        setCurrentGame(null);
    };


    // Modify the game selection logic to handle full-screen mode
   const handleGameSelect = (gameName) => {
        setCurrentGame(gameName);

        if (gameName === 'AimABAP') {
            // Wait for the state update before going full screen
            setTimeout(() => {
                setIsFullScreen(true);
                document.documentElement.requestFullscreen().catch((err) => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            }, 50);  // Delay ensures state is set first
        }
    };

    const renderGameContent = () => {
        if (!currentGame) return <p className="text-center text-gray-600">Select a game to start playing.</p>;

        if (currentGame === 'AimABAP' && isFullScreen) {
            return null;
        }

        if (currentGame === 'ABAPRunner') {
            return <ABAPRunner score={score} setScore={setScore} audioSettings={audioSettings} />;
        }

        if (currentGame === 'ABAPExplorer') {
            return <ABAPExplorer score={score} setScore={setScore} />;
        }

        return <p className="text-center text-gray-600">Invalid game selected.</p>;
    };



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

    const [audioSettings, setAudioSettings] = useState({
        masterVolume: 80,
        backgroundMusic: 60,
        jumpSound: 70,
        correctSound: 75,
        wrongSound: 65,
        gameoverSound: 60,
        isMuted: false
    });

    useEffect(() => {
        // If the game is muted, set all volumes to 0
        const volumeMultiplier = audioSettings.isMuted ? 0 : audioSettings.masterVolume / 100;

        // Update all sound volumes
        if (window.sounds) {
            window.sounds.background.volume(audioSettings.backgroundMusic / 100 * volumeMultiplier);
            window.sounds.jump.volume(audioSettings.jumpSound / 100 * volumeMultiplier);
            window.sounds.correct.volume(audioSettings.correctSound / 100 * volumeMultiplier);
            window.sounds.wrong.volume(audioSettings.wrongSound / 100 * volumeMultiplier);
            window.sounds.gameover.volume(audioSettings.gameoverSound / 100 * volumeMultiplier);
        }
    }, [audioSettings]);

    // Function to handle volume changes
    const handleVolumeChange = (setting, value) => {
        setAudioSettings(prev => {
            const newSettings = {
                ...prev,
                [setting]: value
            };

            // Calculate new volume
            const masterVolume = newSettings.isMuted ? 0 : newSettings.masterVolume / 100;

            // Update the sound volume directly if it exists
            if (window.sounds) {
                const soundKey = setting.replace('Sound', '');
                if (window.sounds[soundKey]) {
                    const newVolume = (value / 100) * masterVolume;
                    window.sounds[soundKey].volume(newVolume);
                }
            }

            return newSettings;
        });
    };

    // Function to toggle mute
    const toggleMute = () => {
        setAudioSettings(prev => ({
            ...prev,
            isMuted: !prev.isMuted
        }));
    };

    // Volume Slider Component
    const VolumeSlider = ({ label, value, onChange }) => (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <span className="text-sm text-gray-500">{value}%</span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>
    );

    const GameCard = ({ title, type, description, isActive, onClick, features }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-card rounded-xl transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                }`}
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
                        <p className="text-sm text-secondary">{description}</p>
                    </div>
                    <Monitor className="w-6 h-6 text-blue" />
                </div>

                <div className="mb-4 space-y-3">
                    {features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-secondary">
                            <Zap className="w-4 h-4 text-blue" />
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
        <div className="bg-card p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <p className="text-sm text-secondary">{title}</p>
                    <p className="text-lg font-semibold text-secondary">{value}</p>
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

            <div className="bg-card rounded-xl p-6 shadow-sm ">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Learning Path Progress</h3>
                <div className="space-y-4">
                    {questionTree.map((question) => (
                        <motion.div
                            key={question.id}
                            whileHover={{ scale: 1.01 }}
                            className={`p-4 rounded-xl transition-all ${question.status === 'current'
                                ? 'card-blue'
                                : question.status === 'completed'
                                    ? 'card-green'
                                    : 'bg-card border-contrast text-secondary'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-secondary">{question.level}</p>
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
                        ? 'card-green'
                        : 'bg-card border-contrast'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${achievement.achieved ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                            <Trophy className={`w-6 h-6 ${achievement.achieved ? 'text-yellow-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                            <h4 className="font-medium text-secondary">{achievement.title}</h4>
                            <p className="text-sm text-secondary">{achievement.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-theme-gradient p-6 mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl pb-2 font-bold text-primary">
                        ABAP Learning Game
                    </h1>
                    <p className="text-secondary mt-2">Master ABAP programming through interactive challenges</p>
                </div>

                <div className="flex gap-6">
                    {/* Main Game Area */}
                    <div className="w-2/3 bg-primary rounded-2xl shadow-xl overflow-hidden border border-gray-200">
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
                                        <h2 className="text-xl font-semibold text-secondary">{currentGame || "Play And Learn"}</h2>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span className='text-gray-500'>25 minutes remaining</span>
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
                                        <Settings className="w-6 h-6 text-gray-500" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Game Content */}
                        <div className="p-6">
                            {!currentGame ? (
                                <div className="text-center p-12">
                                    <h3 className="text-2xl font-bold mb-4 text-secondary">Choose Your Learning Path</h3>
                                    <div className="grid grid-cols-3 gap-6">
                                        <GameCard
                                            title="ABAP Explorer"
                                            type="learning based game"
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
                                            type="running game"
                                            description="Hands-on coding challenges"
                                            features={[
                                                "Live code execution",
                                                "Progressive difficulty",
                                                "Performance tracking"
                                            ]}
                                            isActive={false}
                                            onClick={() => setCurrentGame('ABAPRunner')}
                                        />
                                        <GameCard
                                            title="AimABAP"
                                            type="shooting game"
                                            description="Realistic ABAP development simulation"
                                            features={[
                                                "Real-world scenarios",
                                                "Debugger practice",
                                                "System integration"
                                            ]}
                                            isActive={false}
                                            onClick={() => setCurrentGame('AimABAP')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-100 rounded-xl p-4">
                                        {renderGameContent()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Full-Screen Game Overlay */}
                    <AnimatePresence>
                        {currentGame === 'AimABAP' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black z-50"
                            >
                                <div className="relative w-full h-full">
                                    <RealisticShooterGame
                                        score={score}
                                        setScore={setScore}
                                        audioSettings={audioSettings}
                                        isFullScreen={true}
                                    />
                                    <button
                                        onClick={() => setShowQuitConfirmation(true)}
                                        className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg z-[51]"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* Quit Confirmation Dialog */}
                    <AnimatePresence>
                        {showQuitConfirmation && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[60] flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
                                >
                                    <h3 className="text-xl font-bold mb-4">Quit Game?</h3>
                                    <p className="text-gray-600 mb-6">
                                        Are you sure you want to quit? Your current progress will be lost.
                                    </p>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={() => setShowQuitConfirmation(false)}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleQuitGame}
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                        >
                                            Quit Game
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Sidebar */}
                    <div className="w-1/3 space-y-6">
                        {/* Progress Overview */}
                        <div className="bg-primary rounded-2xl shadow-xl p-6 border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-secondary">Your Progress</h3>
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
                            className="bg-card rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Book className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-secondary">Quick Tips</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-secondary">
                                    <ChevronRight className="w-4 h-4 mt-0.5 text-blue" />
                                    Use keyboard shortcuts (Ctrl + Space) for code completion
                                </li>
                                <li className="flex items-start gap-2 text-sm text-secondary">
                                    <ChevronRight className="w-4 h-4 mt-0.5 text-blue" />
                                    Review completed challenges to reinforce learning
                                </li>
                                <li className="flex items-start gap-2 text-sm text-secondary">
                                    <ChevronRight className="w-4 h-4 mt-0.5 text-blue" />
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
                        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-blue-50 rounded-2xl w-[800px] max-h-[80vh] overflow-y-auto"
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
                                {/* Audio Settings Section */}
                                <div className="border-b border-gray-200 pb-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="text-lg font-semibold">Audio Settings</h4>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={toggleMute}
                                            className={`p-2 rounded-lg ${audioSettings.isMuted ? 'bg-red-100' : 'bg-blue-100'}`}
                                        >
                                            {audioSettings.isMuted ? (
                                                <VolumeX className="w-5 h-5 text-red-600" />
                                            ) : (
                                                <Volume2 className="w-5 h-5 text-blue-600" />
                                            )}
                                        </motion.button>
                                    </div>
                                    <div className="flex justify-between items-end gap-4 px-4 py-8">
                                        <VolumeSlider
                                            label="Master Volume"
                                            value={audioSettings.masterVolume}
                                            onChange={(value) => handleVolumeChange('masterVolume', value)}
                                        />
                                        <VolumeSlider
                                            label="Background Music"
                                            value={audioSettings.backgroundMusic}
                                            onChange={(value) => handleVolumeChange('backgroundMusic', value)}
                                        />
                                        <VolumeSlider
                                            label="Jump Sound"
                                            value={audioSettings.jumpSound}
                                            onChange={(value) => handleVolumeChange('jumpSound', value)}
                                        />
                                        <VolumeSlider
                                            label="Correct Sound"
                                            value={audioSettings.correctSound}
                                            onChange={(value) => handleVolumeChange('correctSound', value)}
                                        />
                                        <VolumeSlider
                                            label="Wrong Sound"
                                            value={audioSettings.wrongSound}
                                            onChange={(value) => handleVolumeChange('wrongSound', value)}
                                        />
                                        <VolumeSlider
                                            label="Game Over"
                                            value={audioSettings.gameoverSound}
                                            onChange={(value) => handleVolumeChange('gameoverSound', value)}
                                        />
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
                                            <div className="grid grid-cols-3 gap-4">
                                                <GameCard
                                                    title="ABAP Explorer"
                                                    type="learning based game"
                                                    description="Interactive exploration of ABAP concepts"
                                                    features={[
                                                        "Visual concept mapping",
                                                        "Interactive examples",
                                                        "Real-time feedback"
                                                    ]}
                                                    isActive={currentGame === 'ABAPExplorer'}
                                                    onClick={() => {
                                                        if (currentGame !== 'ABAPExplorer') {
                                                            setScore(0);
                                                        }
                                                        setCurrentGame('ABAPExplorer');
                                                        setShowSettings(false);
                                                    }}
                                                />
                                                <GameCard
                                                    title="ABAP Runner"
                                                    type="runnig game"
                                                    description="Hands-on coding challenges"
                                                    features={[
                                                        "Live code execution",
                                                        "Progressive difficulty",
                                                        "Performance tracking"
                                                    ]}
                                                    isActive={currentGame === 'ABAPRunner'}
                                                    onClick={() => {
                                                        if (currentGame !== 'ABAPRunner') {
                                                            setScore(0);
                                                        }
                                                        setCurrentGame('ABAPRunner');
                                                        setShowSettings(false);
                                                    }}
                                                />
                                                <GameCard
                                                    title="AimABAP"
                                                    type="shooting game"
                                                    description="Realistic ABAP development simulation"
                                                    features={[
                                                        "Real-world scenarios",
                                                        "Debugger practice",
                                                        "System integration"
                                                    ]}
                                                    isActive={currentGame === 'AimABAP'}
                                                    onClick={() => {
                                                        if (currentGame !== 'AimABAP') {
                                                            setScore(0);
                                                        }
                                                        setCurrentGame('AimABAP');
                                                        setShowSettings(false);
                                                    }}
                                                />
                                            </div>
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