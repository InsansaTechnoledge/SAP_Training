import React, { useState, useEffect } from 'react';
import { Play, Pause, Settings, ChevronRight, Award, Clock, Star, X, Monitor, Trophy, BarChart, Book, Zap, Volume2, VolumeX, ArrowLeft, Maximize2, Minimize2, Home } from 'lucide-react';
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
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showQuitConfirmation, setShowQuitConfirmation] = useState(false);
    const [animatingCard, setAnimatingCard] = useState(null);

    const [achievements, setAchievements] = useState([
        { id: 1, title: 'First Steps', description: 'Complete your first ABAP challenge', achieved: true },
        { id: 2, title: 'Speed Demon', description: 'Complete 5 challenges under 10 minutes', achieved: false },
        { id: 3, title: 'Perfect Score', description: 'Get 100% on any module', achieved: false },
        { id: 4, title: 'Consistency King', description: 'Play for 7 days in a row', achieved: false },
        { id: 5, title: 'Mastermind', description: 'Solve a complex challenge without hints', achieved: true },
    ]);

    const games = [
        {
            id: 'ABAPExplorer',
            title: 'ABAP Explorer',
            description: 'Interactive exploration of ABAP concepts',
            color: 'from-blue-400 to-indigo-600',
            gradient: 'bg-gradient-to-br from-blue-400 to-indigo-600',
            icon: '🧩',
            difficulty: 'Beginner',
            time: '15-30 min'
        },
        {
            id: 'ABAPRunner',
            title: 'ABAP Runner',
            description: 'Hands-on coding challenges',
            color: 'from-emerald-400 to-teal-600',
            gradient: 'bg-gradient-to-br from-emerald-400 to-teal-600',
            icon: '🏃',
            difficulty: 'Intermediate',
            time: '20-40 min'
        },
        {
            id: 'AimABAP',
            title: 'AimABAP',
            description: 'Realistic ABAP development simulation',
            color: 'from-purple-400 to-pink-600',
            gradient: 'bg-gradient-to-br from-purple-400 to-pink-600',
            icon: '🎯',
            difficulty: 'Advanced',
            time: '30-60 min'
        }
    ];

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
            document.exitFullscreen().catch(err => {
                console.error(`Error exiting fullscreen: ${err.message}`);
            });
        }
        setIsFullScreen(false);
        setShowQuitConfirmation(false);
        setCurrentGame(null);
    };

    // Handle game selection and launch in fullscreen
    const handleGameSelect = (gameId) => {
        setAnimatingCard(gameId);

        setTimeout(() => {
            setCurrentGame(gameId);
            setAnimatingCard(null);

            setTimeout(() => {
                setIsFullScreen(true);
                const element = document.documentElement;

                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) { // Firefox
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) { // Chrome, Safari
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) { // IE/Edge
                    element.msRequestFullscreen();
                }
            }, 300);
        }, 500);
    };

    const renderGameContent = () => {
        if (!currentGame || !isFullScreen) return null;

        return (
            <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-black">
                {currentGame === 'ABAPRunner' && <ABAPRunner score={score} setScore={setScore} audioSettings={audioSettings} />}
                {currentGame === 'ABAPExplorer' && <ABAPExplorer score={score} setScore={setScore} />}
                {currentGame === 'AimABAP' && <RealisticShooterGame score={score} setScore={setScore} audioSettings={audioSettings} isFullScreen={true} />}
            </div>
        );
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

    // Volume Slider Component with improved UI
    const VolumeSlider = ({ label, value, onChange }) => (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <span className="text-sm font-medium text-blue-600">{value}%</span>
            </div>
            <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    style={{ width: `${value}%` }}
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );

    const StatCard = ({ icon: Icon, title, value }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
        >
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">{title}</p>
                        <p className="text-lg font-bold text-gray-800">{value}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const ProgressTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Clock} title="Total Time" value={stats.totalTime} />
                <StatCard icon={Trophy} title="Completed" value={stats.completedChallenges} />
                <StatCard icon={Star} title="Avg. Score" value={`${stats.averageScore}%`} />
                <StatCard icon={Zap} title="Current Streak" value={stats.streak} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-bold mb-6 text-gray-800">Learning Path Progress</h3>
                <div className="space-y-4">
                    {questionTree.map((question, index) => (
                        <motion.div
                            key={question.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className={`p-4 rounded-xl transition-all ${question.status === 'current'
                                    ? 'bg-blue-50 border border-blue-200'
                                    : question.status === 'completed'
                                        ? 'bg-emerald-50 border border-emerald-200'
                                        : 'bg-gray-50 border border-gray-200'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className={`text-sm ${question.status === 'current'
                                            ? 'text-blue-600'
                                            : question.status === 'completed'
                                                ? 'text-emerald-600'
                                                : 'text-gray-500'
                                        }`}>{question.level}</p>
                                    <p className="font-medium text-gray-800">{question.title}</p>
                                </div>
                                {question.status === 'completed' ? (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full">
                                        <Award className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-medium text-emerald-600">{question.score}%</span>
                                    </div>
                                ) : question.status === 'current' ? (
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <ChevronRight className="w-4 h-4 text-blue-600" />
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="w-2 h-2 rounded-full bg-gray-300"
                                        />
                                    </div>
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
            {achievements.map((achievement, index) => (
                <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border ${achievement.achieved
                            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${achievement.achieved ? 'bg-gradient-to-br from-amber-400 to-yellow-300' : 'bg-gray-200'}`}>
                            <Trophy className={`w-6 h-6 ${achievement.achieved ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <div>
                            <h4 className={`font-bold ${achievement.achieved ? 'text-amber-700' : 'text-gray-400'}`}>{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.achieved && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="ml-auto"
                            >
                                <div className="bg-amber-200 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Completed
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Game card component with enhanced visuals
    const GameCard = ({ game }) => (
        <motion.div
            layoutId={`game-card-${game.id}`}
            whileHover={{ y: -8 }}
            animate={animatingCard === game.id ? { scale: 1.05, y: -20 } : {}}
            onClick={() => handleGameSelect(game.id)}
            className="flex flex-col rounded-3xl shadow-lg overflow-hidden cursor-pointer bg-white border border-gray-100"
        >
            <div className={`w-full h-48 flex items-center justify-center ${game.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id={`grid-${game.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#grid-${game.id})`} />
                    </svg>
                </div>
                <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5
                    }}
                    className="text-8xl relative z-10"
                >
                    {game.icon}
                </motion.span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
                        <div className="flex items-center gap-1 text-blue-600">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 text-gray-300" />
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">{game.description}</p>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-500">{game.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{game.time}</span>
                        </div>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform transition-all active:scale-95">
                        Play Now
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 pt-20">
            <div className="max-w-7xl mx-auto">
                {/* Header with glass morphism effect */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg border border-white border-opacity-40"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                                ABAP Learning Game
                            </h1>
                            <p className="text-gray-600 mt-2">Master ABAP programming through interactive challenges</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 15 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMute}
                                className={`p-3 rounded-2xl ${audioSettings.isMuted ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}
                            >
                                {audioSettings.isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 15 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowSettings(true)}
                                className="p-3 bg-blue-100 text-blue-600 rounded-2xl"
                            >
                                <Settings className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                {!isFullScreen && (
                    <div className="flex flex-col gap-8">
                        {/* Games Grid with glass morphism */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-white border-opacity-40"
                        >
                            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Choose Your Game</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Progress Overview with glass morphism */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-white border-opacity-40"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Your Progress</h3>
                                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveTab('progress')}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'progress'
                                                ? 'bg-white text-blue-600 shadow-md'
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        <BarChart className="w-5 h-5" />
                                        <span className="hidden md:inline">Progress</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveTab('achievements')}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'achievements'
                                                ? 'bg-white text-blue-600 shadow-md'
                                                : 'text-gray-600'
                                            }`}
                                    >
                                        <Trophy className="w-5 h-5" />
                                        <span className="hidden md:inline">Achievements</span>
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
                        </motion.div>
                    </div>
                )}

                {/* Full-Screen Game */}
                <AnimatePresence>
                    {isFullScreen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-50 flex flex-col w-screen h-screen"
                        >
                            {/* Game header with glass morphism */}
                            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg p-4 flex justify-between items-center border-b border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl ${games.find(game => game.id === currentGame)?.gradient || 'bg-blue-600'}`}>
                                        {games.find(game => game.id === currentGame)?.icon || '🎮'}
                                    </div>
                                    <h2 className="text-xl font-bold text-white">
                                        {games.find(game => game.id === currentGame)?.title || 'Game'}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-xl"
                                    >
                                        <Star className="w-5 h-5 text-yellow-400" />
                                        <span className="font-bold text-white">{score}</span>
                                    </motion.div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={toggleMute}
                                        className="p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700"
                                    >
                                        {audioSettings.isMuted ? (
                                            <VolumeX className="w-5 h-5" />
                                        ) : (
                                            <Volume2 className="w-5 h-5" />
                                        )}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowSettings(true)}
                                        className="p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700"
                                    >
                                        <Settings className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05, rotate: 90 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowQuitConfirmation(true)}
                                        className="p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Game content - Ensure full coverage */}
                            <div className="flex-grow w-full h-full relative">
                                {renderGameContent()}
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
                            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[60] flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl"
                            >
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                                        <X className="w-8 h-8 text-red-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Quit Game?</h3>
                                    <p className="text-gray-600">
                                        Are you sure you want to quit? Your current progress will be lost.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowQuitConfirmation(false)}
                                        className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
                                    >
                                        Resume
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleQuitGame}
                                        className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700"
                                    >
                                        Quit Game
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Settings Dialog */}
                <AnimatePresence>
                    {showSettings && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[60] flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <Settings className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-bold">Game Settings</h3>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowSettings(false)}
                                        className="p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <X className="w-5 h-5 text-gray-600" />
                                    </motion.button>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {audioSettings.isMuted ? (
                                                <VolumeX className="w-5 h-5 text-gray-600" />
                                            ) : (
                                                <Volume2 className="w-5 h-5 text-gray-600" />
                                            )}
                                            <span className="font-medium">Master Volume</span>
                                        </div>
                                        <button
                                            onClick={toggleMute}
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${audioSettings.isMuted
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-blue-100 text-blue-600'
                                                }`}
                                        >
                                            {audioSettings.isMuted ? 'Muted' : 'Enabled'}
                                        </button>
                                    </div>

                                    <div className="space-y-4">
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
                                            label="Game Over Sound"
                                            value={audioSettings.gameoverSound}
                                            onChange={(value) => handleVolumeChange('gameoverSound', value)}
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => setShowSettings(false)}
                                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform transition-all active:scale-95"
                                        >
                                            Save Settings
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer with credits */}
                {!isFullScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-center text-sm text-gray-500"
                    >
                        <p>© 2025 ABAP Learning Games | Version 1.0.0</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GameDashboard;