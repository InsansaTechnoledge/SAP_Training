import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Star, Clock, Users, Sparkles, Heart, ShoppingCart, ChevronDown,
    ChevronRight, Tag, TrendingUp, Award, BookOpen, Filter, X, Shield,
    Zap, Gift, Briefcase, Code, Database, ChartBar, BookType,
    GraduationCap, Layout, Brain, Cloud
} from 'lucide-react';
import { useWishlist } from '../Context/WishlistContext';
import Courses from '../Components/Courses';

const PlacementTrainingShop = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [announcement, setAnnouncement] = useState('');

    const { wishlist } = useWishlist();

    useEffect(() => {
        if (announcement) {
            const timeout = setTimeout(() => setAnnouncement(''), 1000);
            return () => clearTimeout(timeout);
        }
    }, [announcement]);

    const categories = [
        {
            id: 'crash',
            name: 'Crash Courses',
            icon: Zap,
            description: 'Quick, intensive learning paths',
            courses: 5,
            features: ['Short Duration', 'Focused Learning', 'Quick Certification']
        },
        {
            id: 'standalone',
            name: 'Standalone Courses',
            icon: BookOpen,
            description: 'Comprehensive individual courses',
            courses: 8,
            features: ['In-depth Learning', 'Flexible Timelines', 'Detailed Curriculum']
        },
        {
            id: 'combined',
            name: 'Combined Courses',
            icon: Code,
            description: 'Integrated learning paths',
            courses: 3,
            features: ['Multiple Skillsets', 'Bundled Savings', 'Comprehensive Training']
        }
    ];

    return (
        <div className="bg-primary min-h-screen mt-20">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                {/* Accessibility announcer */}
                <div
                    role="status"
                    aria-live="polite"
                    className="sr-only"
                >
                    {announcement}
                </div>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-secondary mb-6"
                    >
                        Accelerate{' '}
                        <span className="text-blue">Your Learning Journey</span>
                    </motion.h1>
                    <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                        Flexible learning paths designed to fit your career goals and schedule
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <label htmlFor="search" className="sr-only">
                            Search courses
                        </label>
                        <input
                            id="search"
                            type="search"
                            placeholder="Search for courses, skills, and learning paths..."
                            className="w-full bg-card text-secondary px-6 py-4 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-blue"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setAnnouncement(`Searching for ${e.target.value}`);
                            }}
                        />
                        <Search
                            className="w-5 h-5 text-secondary absolute left-4 top-1/2 transform -translate-y-1/2"
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Categories Grid */}
                <section
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    aria-label="Course categories"
                >
                    {categories.map(category => (
                        <motion.div
                            key={category.id}
                            whileHover={{ y: -5 }}
                            className="bg-card rounded-xl p-6 hover:shadow-lg transition-all"
                            onClick={() => {
                                setActiveCategory(category.id);
                                setAnnouncement(`Showing ${category.name}`);
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="card-theme-gradient p-3 rounded-lg border-contrast">
                                    <category.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="card-blue text-sm font-medium px-3 py-1 rounded-full">
                                    {category.courses} Courses
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">{category.name}</h3>
                            <p className="text-secondary text-sm mb-4">{category.description}</p>
                            <div className="space-y-2">
                                {category.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-secondary text-sm">
                                        <ChevronRight className="w-4 h-4 text-blue" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Courses Component */}
                <Courses category={activeCategory} />
            </div>
        </div>
    );
};

export default PlacementTrainingShop;