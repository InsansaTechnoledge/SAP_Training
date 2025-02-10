import React, { useState } from 'react';
import { X, Mail, Lock, UserPlus, LogIn, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthBanner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Animation variants
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

    const Modal = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;

        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative z-50 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
                    >
                        {children}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            onClick={onClose}
                            className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    };

    const InputField = ({ icon: Icon, type, id, placeholder, showPasswordToggle }) => (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="relative group"
        >
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
                type={type}
                id={id}
                className="block w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                placeholder={placeholder}
            />
            {showPasswordToggle && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
            )}
        </motion.div>
    );

    const AuthForm = ({ type }) => (
        <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5 p-6"
        >
            <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email
                </label>
                <InputField icon={Mail} type="email" id="email" placeholder="your@email.com" />
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Password
                </label>
                <InputField
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    showPasswordToggle
                />
            </motion.div>

            {type === 'signup' && (
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Confirm Password
                    </label>
                    <InputField
                        icon={Lock}
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="••••••••"
                        showPasswordToggle
                    />
                </motion.div>
            )}

            <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-3 mt-6 flex items-center justify-center space-x-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                {type === 'login' ? (
                    <>
                        <LogIn className="w-5 h-5" />
                        <span>Login</span>
                    </>
                ) : (
                    <>
                        <UserPlus className="w-5 h-5" />
                        <span>Create Account</span>
                    </>
                )}
                <ChevronRight className="w-5 h-5" />
            </motion.button>
        </motion.form>
    );

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

            {/* Auth Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="w-full">
                    {/* Tabs */}
                    <div className="flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-t-2xl">
                        {['login', 'signup'].map((tab) => (
                            <motion.button
                                key={tab}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2
                                    ${activeTab === tab
                                        ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {tab === 'login' ? (
                                    <>
                                        <LogIn className="w-5 h-5" />
                                        <span>Login</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5" />
                                        <span>Sign Up</span>
                                    </>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Form */}
                    <AuthForm type={activeTab} />

                    {/* Additional Links */}
                    <motion.div
                        variants={itemVariants}
                        className="px-6 pb-6 text-center text-sm text-gray-600 dark:text-gray-400"
                    >
                        {activeTab === 'login' ? (
                            <p>
                                Don't have an account?{' '}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setActiveTab('signup')}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                >
                                    Sign up here
                                </motion.button>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setActiveTab('login')}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                >
                                    Login here
                                </motion.button>
                            </p>
                        )}
                    </motion.div>
                </div>
            </Modal>
        </div>
    );
};

export default AuthBanner;