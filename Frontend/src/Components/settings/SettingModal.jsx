import React, { useState, useEffect } from 'react';
import { Settings, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsModal = ({
    isOpen,
    onClose,
    audioSettings,
    setAudioSettings,
    currentGame,
    setCurrentGame,
    setScore
}) => {
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

    // Update sound volumes when audio settings change
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
            className={`bg-card rounded-xl transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`}
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
                        <p className="text-sm text-secondary">{description}</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-full">
                        <Monitor className="w-5 h-5 text-blue-500" />
                    </div>
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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-blue-50 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto m-4"
                    >
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold">Game Settings</h3>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
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
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4 py-4">
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

                            <div className="space-y-6">
                                {/* Game Preferences */}
                                <div>
                                    <h4 className="text-lg font-semibold mb-4">Game Preferences</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                                onClose();
                                            }}
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
                                            isActive={currentGame === 'ABAPRunner'}
                                            onClick={() => {
                                                if (currentGame !== 'ABAPRunner') {
                                                    setScore(0);
                                                }
                                                setCurrentGame('ABAPRunner');
                                                onClose();
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
                                                onClose();
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
    );
};

// Missing imports definition for components used in the component
// Make sure to import these in your main file or wherever you use SettingsModal
const Monitor = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
);

const Zap = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

export default SettingsModal;