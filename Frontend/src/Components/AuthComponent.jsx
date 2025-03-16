import React, { useState } from 'react';
import { X, Mail, Lock, UserPlus, LogIn, ChevronRight, Eye, EyeOff, User, Type, User2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useUser } from '../Context/UserContext';
import AuthForm from './AuthForm';

const AuthBanner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };



    return (
        <div className="relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
                animate={{
                    background: isHovered
                        ? "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)"
                        : "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)"
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)] opacity-70" />
                <div className="absolute inset-0 bg-grid-white/[0.15]" />
            </motion.div>

            {/* Main Banner */}
            <div className="relative px-6 lg:px-20 py-20">
                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="flex flex-col lg:flex-row items-center justify-between gap-12"
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        {/* Left side content */}
                        <motion.div
                            variants={itemVariants}
                            className="text-center lg:text-left space-y-6"
                        >
                            <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                                Join Our Learning
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                    Community
                                </span>
                            </h2>
                            <p className="text-xl text-blue-100 opacity-90">
                                Unlock premium courses and expand
                                <br />
                                your knowledge today.
                            </p>
                        </motion.div>

                        {/* Right side buttons */}
                        <motion.div variants={itemVariants} className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setActiveTab('login');
                                    setIsModalOpen(true);
                                }}
                                className="px-8 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                                <LogIn className="w-5 h-5" />
                                <span>Login</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setActiveTab('signup');
                                    setIsModalOpen(true);
                                }}
                                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Sign Up</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            {
                isModalOpen
                    ?
                    <AuthForm activeTab={activeTab} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
                    :
                    null
            }
        </div>
    );
};

export default AuthBanner;