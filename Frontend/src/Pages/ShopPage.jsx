import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Clock, Users, Sparkles, Gift, Moon, Sun, Filter, BookOpen, DollarSign, Bookmark, ChevronDown } from 'lucide-react';

const EnhancedCourseShop = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [priceFilter, setPriceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [showFilters, setShowFilters] = useState(false);
    const [savedCourses, setSavedCourses] = useState([]);

    const courses = [
        {
            id: 1,
            title: "SAP S/4HANA Implementation",
            category: "major",
            price: 999,
            duration: "12 weeks",
            rating: 4.8,
            students: 1250,
            image: "/api/placeholder/400/225",
            description: "Master SAP S/4HANA implementation with hands-on projects",
            highlight: "Best Seller",
            level: "Advanced",
            modules: 24
        },
        {
            id: 2,
            title: "SAP FICO Professional",
            category: "major",
            price: 899,
            duration: "10 weeks",
            rating: 4.7,
            students: 980,
            image: "/api/placeholder/400/225",
            description: "Become an expert in SAP Financial Accounting",
            highlight: "Popular",
            level: "Intermediate",
            modules: 20
        },
        {
            id: 3,
            title: "SAP MM Master Course",
            category: "minor",
            price: 299,
            duration: "4 weeks",
            rating: 4.5,
            students: 2100,
            image: "/api/placeholder/400/225",
            description: "Perfect starting point for SAP beginners",
            highlight: "Beginner Friendly",
            level: "Beginner",
            modules: 12
        }
    ];

    const filteredCourses = courses.filter(course => {
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = priceFilter === 'all' ||
            (priceFilter === 'under500' && course.price < 500) ||
            (priceFilter === 'over500' && course.price >= 500);
        return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
        if (sortBy === 'popular') return b.students - a.students;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        return 0;
    });

    const toggleSavedCourse = (courseId) => {
        setSavedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const CourseCard = ({ course }) => (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="group relative rounded-xl overflow-hidden card-theme-gradient"
        >
            <div className="relative">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                />
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSavedCourse(course.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow-lg"
                >
                    <Bookmark
                        className={`w-5 h-5 ${savedCourses.includes(course.id) ? 'text-blue' : 'text-secondary'}`}
                        fill={savedCourses.includes(course.id) ? 'currentColor' : 'none'}
                    />
                </motion.button>
                {course.highlight && (
                    <div className="absolute top-4 left-4 card-blue px-3 py-1 rounded-full text-sm font-medium">
                        <div className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            {course.highlight}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 bg-card">
                <div className="flex items-center gap-2 mb-3">
                    <span className="card-green px-2 py-1 rounded-full text-xs font-medium">
                        {course.level}
                    </span>
                    <span className="text-secondary text-sm">
                        {course.modules} modules
                    </span>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-blue transition-colors">
                    {course.title}
                </h3>
                <p className="text-secondary mb-4">{course.description}</p>

                <div className="flex items-center gap-4 text-secondary mb-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {course.rating}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue">${course.price}</span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="nav-theme-gradient text-white px-6 py-2 rounded-full transition-colors"
                    >
                        Enroll Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className={`min-h-screen bg-primary transition-colors duration-300`}>
           
            {/* Header Section */}
            <div className="nav-theme-gradient py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Discover Your Next Learning Journey
                    </h1>
                    <p className="text-white/80 text-lg mb-8">
                        Expert-led courses to advance your career in SAP
                    </p>

                    {/* Search Bar */}
                    <div className="bg-card rounded-xl shadow-xl p-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 text-secondary" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue text-secondary"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="container mx-auto max-w-6xl px-4 -mt-8">
                <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-primary text-secondary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                            >
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                                <option value="priceAsc">Price: Low to High</option>
                                <option value="priceDesc">Price: High to Low</option>
                            </select>

                            <select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="bg-primary text-secondary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                            >
                                <option value="all">All Prices</option>
                                <option value="under500">Under $500</option>
                                <option value="over500">$500 and above</option>
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === 'all'
                                        ? 'nav-theme-gradient text-white'
                                        : 'bg-primary text-secondary'
                                    }`}
                            >
                                All Courses
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory('major')}
                                className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === 'major'
                                        ? 'nav-theme-gradient text-white'
                                        : 'bg-primary text-secondary'
                                    }`}
                            >
                                Major Courses
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory('minor')}
                                className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === 'minor'
                                        ? 'nav-theme-gradient text-white'
                                        : 'bg-primary text-secondary'
                                    }`}
                            >
                                Minor Courses
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="container mx-auto max-w-6xl px-4 py-8">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-secondary mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-primary mb-2">No Courses Found</h3>
                        <p className="text-secondary">Try adjusting your filters or search query</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedCourseShop;