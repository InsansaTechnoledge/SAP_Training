import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Users,
    Target,
    Clock,
    Layout,
    Star,
    Zap,
    BookOpen,
    Trophy,
    BarChart,
    Laptop,
    Calendar,
    GraduationCap
} from "lucide-react";

export default function LearningExperience() {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: <Brain className="w-6 h-6" />,
            title: "AI-Powered Learning",
            description: "Adaptive learning paths that evolve with your progress",
            stats: "45% faster learning rate",
            preview: (
                <div className="relative w-64 h-64">
                    <Brain className="w-full h-full text-blue-500 dark:text-blue-400" />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-32 h-32 border-4 border-blue-400 rounded-full" />
                    </motion.div>
                    <GraduationCap className="absolute top-1/4 right-1/4 w-8 h-8 text-green-400" />
                </div>
            )
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Expert Mentorship",
            description: "Direct access to industry professionals and mentors",
            stats: "1000+ expert mentors",
            preview: (
                <div className="relative w-64 h-64">
                    <Users className="w-full h-full text-blue-500 dark:text-blue-400" />
                    <motion.div
                        animate={{
                            y: [-10, 10, -10],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                        className="absolute top-1/4 right-1/4"
                    >
                        <Star className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                </div>
            )
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Project-Based Learning",
            description: "Real-world projects that build your portfolio",
            stats: "50+ hands-on projects",
            preview: (
                <div className="relative w-64 h-64">
                    <Laptop className="w-full h-full text-blue-500 dark:text-blue-400" />
                    <motion.div
                        animate={{
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-1/4 right-1/4"
                    >
                        <Target className="w-12 h-12 text-red-400" />
                    </motion.div>
                </div>
            )
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Flexible Schedule",
            description: "Learn at your own pace, anywhere, anytime",
            stats: "24/7 access",
            preview: (
                <div className="relative w-64 h-64">
                    <Calendar className="w-full h-full text-blue-500 dark:text-blue-400" />
                    <motion.div
                        animate={{
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-1/4 right-1/4"
                    >
                        <Clock className="w-12 h-12 text-purple-400" />
                    </motion.div>
                </div>
            )
        }
    ];

    const benefits = [
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Industry Recognition",
            description: "Our certificates are recognized by top employers worldwide"
        },
        {
            icon: <BarChart className="w-8 h-8" />,
            title: "Career Growth",
            description: "85% of our graduates report career advancement within 6 months"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Rapid Skill Development",
            description: "Accelerated learning through practical, hands-on experience"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-24 px-6">
            <div className="max-w-7xl mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium mb-4">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        Transform Your Learning Experience
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Experience a revolutionary approach to learning that combines cutting-edge technology with expert guidance
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setActiveFeature(index)}
                                className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${activeFeature === index
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${activeFeature === index
                                            ? 'bg-blue-500'
                                            : 'bg-blue-100 dark:bg-gray-700'
                                        }`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                        <p className={`text-sm ${activeFeature === index
                                                ? 'text-blue-100'
                                                : 'text-gray-600 dark:text-gray-300'
                                            }`}>
                                            {feature.description}
                                        </p>
                                        <div className={`mt-2 text-sm font-semibold ${activeFeature === index
                                                ? 'text-blue-200'
                                                : 'text-blue-600 dark:text-blue-400'
                                            }`}>
                                            {feature.stats}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeature}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {features[activeFeature].preview}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
                        >
                            <div className="text-blue-500 dark:text-blue-400 mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}