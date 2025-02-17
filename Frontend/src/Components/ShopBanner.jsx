import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
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
import Shop from '../assets/Shop.png'

const ShopBanner = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        window.location.href = '/shop';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    const features = [
        {
            icon: BarChart,
            text: "Track your progress with interactive charts"
        },
        {
            icon: BookOpen,
            text: "Access comprehensive learning modules"
        },
        {
            icon: Users,
            text: "Compare with peer rankings"
        },
        {
            icon: Star,
            text: "Monitor test performance"
        }
    ];

    return (
        <div
            role="banner"
            aria-label="Shop promotion banner"
            className="
             rounded-tl-full
             mt-6
            relative w-full bg-theme-gradient outline-none px-26 grid grid-cols-2 pb-24 pt-36"
            // style={{ "background": "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
        >
            <div className="relative w-lg">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-blue-100 rounded-xl transform rotate-3"></div>
                <div className="absolute -bottom-4 -left-4 w-full h-full bg-indigo-100 rounded-xl transform -rotate-3"></div>

                {/* Main image */}
                <div className="relative bg-white rounded-xl shadow-xl p-4">
                    <img
                        src={Shop}
                        alt="Dashboard Preview"
                        className="rounded-lg w-full"
                    />

                    {/* Floating stats cards */}
                    <div className="absolute -right-8 -top-8 bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center gap-2">
                            <BarChart className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold">Latest courses</span>
                        </div>
                    </div>

                    <div className="absolute -left-8 -bottom-8 bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            <span className="font-semibold">Top Rated</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center justify-between gap-6">
                {/* Content Section */}
                <div className="flex-1 min-w-0">

                    {/* Main Content */}
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-secondary tracking-tight">
                            Discover Our Latest Collection
                        </h2>
                        <p className="text-secondary text-base sm:text-lg max-w-xl">
                            Explore premium products with exclusive offers
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <feature.icon className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-secondary">{feature.text}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div
                    className={`mt-6 hover:cursor-pointer hover:scale-105 flex items-center gap-2 text-white font-medium transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'
                        }`}
                    aria-hidden="true"
                    onClick={() => { navigate('/shop') }}
                >
                    <span className='text-xl font-semibold text-secondary'>Shop Now</span>
                    <ArrowRight className="w-5 h-5 text-secondary" />
                </div>
            </div>

            {/* Progress Indicator */}
            <div
                className={`absolute bottom-0 left-0 h-0.5 bg-blue transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'
                    }`}
                aria-hidden="true"
            />
        </div>
    );
};

export default ShopBanner;