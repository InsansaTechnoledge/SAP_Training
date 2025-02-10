import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Brain, Globe, ArrowRight, PlayCircle } from 'lucide-react';

const HeroSection = () => {
    const floatingIcons = [
        { icon: <Code className="w-8 h-8" />, delay: 0 },
        { icon: <Brain className="w-8 h-8" />, delay: 0.2 },
        { icon: <Globe className="w-8 h-8" />, delay: 0.4 },
        { icon: <Rocket className="w-8 h-8" />, delay: 0.6 },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-blue-500/10"
                        style={{
                            width: Math.random() * 300 + 50 + 'px',
                            height: Math.random() * 300 + 50 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `float ${Math.random() * 10 + 10}s infinite linear`
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
                {/* Left side content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex-1 text-white"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-block px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm mb-6"
                    >
                        🚀 The Future of Tech Learning
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
                    >
                        Advance Your
                        <span className="block bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                            Tech Career Today
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-blue-100 text-lg mb-8 max-w-xl"
                    >
                        Join our dynamic learning platform and master cutting-edge technologies through interactive courses, real-world projects, and expert mentorship.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-blue-800/50 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-blue-700/50 transition-all flex items-center gap-2">
                            Watch Demo
                            <PlayCircle className="w-5 h-5" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="mt-12 p-4 bg-blue-800/30 backdrop-blur-sm rounded-xl inline-flex items-center gap-4"
                    >
                        <div className="flex -space-x-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-blue-400/20 border-2 border-white/20" />
                            ))}
                        </div>
                        <div className="text-sm">
                            <div className="font-semibold">Join 50,000+ learners</div>
                            <div className="text-blue-200">Rated 4.9/5 from 10,000+ reviews</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right side visual content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex-1 relative"
                >
                    {/* Main visual element */}
                    <div className="relative w-full aspect-square max-w-2xl mx-auto">
                        <div className="absolute inset-0 bg-blue-600/30 backdrop-blur-xl rounded-3xl transform rotate-6 scale-95" />
                        <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-xl rounded-3xl transform -rotate-3" />
                        <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-8 shadow-2xl">
                            {/* Code editor mockup */}
                            <div className="bg-gray-900 rounded-lg p-4 h-full">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-4 bg-blue-700/50 rounded"
                                            style={{ width: `${Math.random() * 40 + 60}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating technology icons */}
                    {floatingIcons.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: item.delay + 1 }}
                            className="absolute text-blue-200"
                            style={{
                                top: `${index * 25}%`,
                                right: `${index * 20}%`,
                                animation: `float ${3 + index}s infinite ease-in-out alternate`
                            }}
                        >
                            {item.icon}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Add keyframes for floating animation */}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
            `}</style>
        </div>
    );
};

export default HeroSection;