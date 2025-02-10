import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Award, CheckCircle, Shield, AlertCircle, Sparkles, ArrowRight } from "lucide-react";

function CertificateSection() {
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const [isPreviewHovered, setIsPreviewHovered] = useState(false);

    const features = [
        {
            icon: <Award className="w-8 h-8" />,
            text: "Industry-Recognized",
            description: "Valued by top employers worldwide"
        },
        {
            icon: <CheckCircle className="w-8 h-8" />,
            text: "Lifetime Valid",
            description: "No renewal fees or expiration date"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            text: "Verified Skills",
            description: "Backed by practical assessments"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative min-h-screen py-24 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-indigo-950 dark:to-black overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                        animate={{
                            x: ["0%", "100%", "0%"],
                            y: ["0%", "100%", "0%"],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-6xl mx-auto"
            >
                {/* Header section */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-6"
                    >
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-blue-700 dark:text-blue-300 font-medium">Unlock Your Potential</span>
                    </motion.div>

                    <h2 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-200">
                        Earn Your Professional Certificate
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Join our community of certified professionals and take your career to new heights
                    </p>
                </motion.div>

                {/* Features grid */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            onHoverStart={() => setHoveredFeature(index)}
                            onHoverEnd={() => setHoveredFeature(null)}
                            whileHover={{ scale: 1.02 }}
                            className="relative group"
                        >
                            <motion.div
                                className="h-full p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-blue-100 dark:border-blue-900 shadow-lg"
                                animate={{
                                    boxShadow: hoveredFeature === index
                                        ? "0 20px 40px rgba(0,0,0,0.2)"
                                        : "0 4px 6px rgba(0,0,0,0.1)"
                                }}
                            >
                                <motion.div
                                    className="text-blue-500 dark:text-blue-400 mb-4"
                                    animate={{
                                        rotate: hoveredFeature === index ? 360 : 0
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    {feature.text}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Certificate preview */}
                <motion.div
                    variants={itemVariants}
                    className="relative max-w-4xl mx-auto"
                    onHoverStart={() => setIsPreviewHovered(true)}
                    onHoverEnd={() => setIsPreviewHovered(false)}
                >
                    <div className="relative rounded-3xl overflow-hidden">
                        <motion.div
                            className="relative h-80 bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950"
                            animate={{
                                scale: isPreviewHovered ? 1.02 : 1
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Certificate design elements */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full max-w-2xl p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <Award className="w-16 h-16 text-blue-500/30" />
                                        <Shield className="w-16 h-16 text-blue-500/30" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-3 bg-blue-200/30 rounded-full w-3/4" />
                                        <div className="h-3 bg-blue-200/30 rounded-full w-1/2" />
                                        <div className="h-3 bg-blue-200/30 rounded-full w-2/3" />
                                    </div>
                                </div>
                            </div>

                            {/* Locked overlay */}
                            <motion.div
                                className="absolute inset-0 backdrop-blur-xl bg-white/50 dark:bg-black/50 flex items-center justify-center"
                                animate={{
                                    opacity: isPreviewHovered ? 0.9 : 0.7
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="bg-blue-600 dark:bg-blue-500 p-6 rounded-full shadow-2xl"
                                >
                                    <Lock className="w-8 h-8 text-white" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Call to action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
                        >
                            Start Your Journey
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default CertificateSection;